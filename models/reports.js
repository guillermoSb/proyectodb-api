

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

export const createReport2 = async (startDate, endDate) => {
    const report = await DatabaseManager.knex.select('*').fromRaw(`
    (
        (
            SELECT movies."categories" AS category, users."plan" AS plan, COUNT(*) AS views
            FROM "userMovieActivities" AS us
            INNER JOIN movies ON (us."movieCode" = movies."movieCode")
            INNER JOIN profiles ON (us."profileCode" = profiles."profileCode")
            INNER JOIN users ON (profiles."userCode" = users."userCode")
            WHERE us."startedAt" >= ?
            AND us."startedAt" <= ?
            GROUP BY category,plan 
        )
        
        UNION 
        
        (
            SELECT series."categories" AS category, users."plan" AS plan, COUNT(*) AS views
            FROM "userSeriesActivities" AS us
            INNER JOIN episodes ON (us."episodeCode" = episodes."episodeCode")
            INNER JOIN series ON (episodes."seriesCode" = series."seriesCode")
            INNER JOIN profiles ON (us."profileCode" = profiles."profileCode")
            INNER JOIN users ON (profiles."userCode" = users."userCode")
            WHERE us."startedAt" >= ?
            AND us."startedAt" <= ?
            GROUP BY category,plan 
        )
    ) AS t
    `, [startDate, endDate, startDate, endDate])
    return report;
}

export const createReport3Director = async () => {
    const report = await DatabaseManager.knex.select('*').fromRaw(`
    (SELECT movies.director AS name,COUNT(movies."director") AS visitas
	FROM "userMovieActivities" AS us
	INNER JOIN movies ON (us."movieCode" = movies."movieCode")
	INNER JOIN profiles ON (us."profileCode" = profiles."profileCode")
	INNER JOIN users ON (profiles."userCode" = users."userCode")
	WHERE users.plan = 'advanced' OR users.plan = 'standard'
	--LEFT JOIN casting_movies ON (casting_movies."movieCode" = us."movieCode")
	GROUP BY movies.director

	UNION
	
	SELECT series.director AS name,COUNT(series."director") AS visitas
	FROM "userSeriesActivities" AS us
	INNER JOIN episodes ON (us."episodeCode" = episodes."episodeCode")
	INNER JOIN series ON (episodes."seriesCode" = series."seriesCode")
	INNER JOIN profiles ON (us."profileCode" = profiles."profileCode")
	INNER JOIN users ON (profiles."userCode" = users."userCode")
	WHERE users.plan = 'advanced' OR users.plan = 'standard'
	GROUP BY series.director
	
	ORDER BY visitas DESC
	LIMIT 10) as t
    `)
    return report;
}

export const createReport3Actors = async () => {
    const report = await DatabaseManager.knex.select('*').fromRaw(`
    (SELECT *
        FROM 
        (
            SELECT CONCAT(actors.name, ' ', actors."lastName" ) AS name, COUNT(actors.name) AS visitas
            FROM "userMovieActivities" AS us
            INNER JOIN movies ON (us."movieCode" = movies."movieCode")
            INNER JOIN profiles ON (us."profileCode" = profiles."profileCode")
            INNER JOIN users ON (profiles."userCode" = users."userCode")
            LEFT JOIN casting_movies ON (casting_movies."movieCode" = us."movieCode")
            INNER JOIN actors ON (casting_movies."actorCode" = actors."actorCode")
            WHERE users.plan = 'advanced' OR users.plan = 'standard'
            GROUP BY actors.name, actors."lastName"
        ) AS actorsPeliculas
    
        UNION
        
        SELECT *
        FROM (
            SELECT CONCAT(actors.name, ' ', actors."lastName") AS name, COUNT(actors.name) AS visitas 
            FROM "userSeriesActivities" AS us
            INNER JOIN episodes ON (us."episodeCode" = episodes."episodeCode")
            INNER JOIN series ON (episodes."seriesCode" = series."seriesCode")
            INNER JOIN profiles ON (us."profileCode" = profiles."profileCode")
            INNER JOIN users ON (profiles."userCode" = users."userCode")
            LEFT JOIN casting_series ON (casting_series."seriesCode" = series."seriesCode")
            INNER JOIN actors ON (casting_series."actorCode" = actors."actorCode")
            WHERE users.plan = 'advanced' OR users.plan = 'standard'
            GROUP BY actors.name, actors."lastName"
        ) AS actors
        
        ORDER BY visitas DESC
        LIMIT 10) as t
    `)
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


export const createReportEvents = async () => {
    const report = await DatabaseManager.knex.select('*').fromRaw(`
    (SELECT * FROM operations) AS t
    `)
    return report;
}

/**
 * Top 5 peliculas vistas entre 9 y 1
 * @param {*} month 
 */
export const createReport6 = async (month) => {
    await DatabaseManager.knex.schema.raw('CALL get_top_movies_hour()', []);
    const report = await DatabaseManager.knex.select('*').fromRaw(`
        (SELECT	moviecode, title, views, hour, month
        FROM 	top_movies_hour
        JOIN	movies
        ON		movies."movieCode" = top_movies_hour.moviecode
        WHERE month = ?) AS t
    `, [month,])
    return report;
}


export const createReport7 = async () => {
    const report = await DatabaseManager.knex.select('*').fromRaw(`
        (SELECT * FROM search_view) AS t
        `)
    return report;
}