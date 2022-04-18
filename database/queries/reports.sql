SELECT genre, SUM(totalMinutes) AS total
FROM
(
	SELECT genre, duration as totalMinutes
	FROM "userMovieActivities"
	JOIN movies ON movies."movieCode" = "userMovieActivities"."movieCode"
	WHERE finished = true
	UNION ALL
	SELECT genre, duration as totalMinutes
	FROM "userSeriesActivities"
	LEFT JOIN episodes ON episodes."episodeCode" = "userSeriesActivities"."episodeCode"
	LEFT JOIN series ON series."seriesCode" = episodes."seriesCode"
	WHERE finished = true
) AS data
GROUP BY genre
ORDER BY total DESC
LIMIT 10;