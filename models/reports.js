

import { DatabaseManager } from '../database/manager.js';
export const createReport1 = async (startDate, endDate) => {
    const report = await DatabaseManager.knex.select('*').fromRaw(`
    (SELECT genre, SUM(totalMinutes) AS total
    FROM
    (
        SELECT genre, duration as totalMinutes
        FROM "userMovieActivities"
        JOIN movies ON movies."movieCode" = "userMovieActivities"."movieCode"
        WHERE finished = true AND "startedAt" > ? AND "startedAt" < ?
        UNION ALL
        SELECT genre, duration as totalMinutes
        FROM "userSeriesActivities"
        LEFT JOIN episodes ON episodes."episodeCode" = "userSeriesActivities"."episodeCode"
        LEFT JOIN series ON series."seriesCode" = episodes."seriesCode"
        WHERE finished = true AND "startedAt" > ? AND "startedAt" < ?
    ) AS data
    GROUP BY genre
    ORDER BY total DESC
    LIMIT 10) AS t
    `, [startDate, endDate, startDate, endDate])
    return report;
}

export const createReport4 = async () => {
    const report = await DatabaseManager.knex.select('*').fromRaw(`
    (SELECT    count(*)
FROM    users
WHERE      plan = 'advanced'
AND        NOW() - "createdAt" <= INTERVAL '6 MONTHS') AS t
    `,)
    return report;
}


export const createReport5 = async (date) => {

    const start = new Date(date);
    const end = new Date(date);
    start.setHours(0);
    start.setMinutes(0)
    end.setHours(23);
    end.setMinutes(59)
    const report = await DatabaseManager.knex.select('*').fromRaw(`
    (SELECT hora, SUM(total_hours) AS t
FROM (SELECT        DATE_PART('hour', "startedAt") as hora, count(*) as total_hours
from         "userMovieActivities"
WHERE        "startedAt" >=  ?
AND            "startedAt" <= ?
GROUP BY    DATE_PART('hour', "startedAt")
UNION ALL
SELECT        DATE_PART('hour', "startedAt") as hora, count(*) as total_hours
from         "userSeriesActivities"
WHERE        "startedAt" >= ?
AND            "startedAt" <= ?
GROUP BY    DATE_PART('hour', "startedAt")) AS data
GROUP BY hora
ORDER BY t DESC) AS t
    `, [start, end, start, end])
    return report;
}