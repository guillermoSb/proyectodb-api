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

-- Reporte 7 - Top 10 de los términos que los usuarios buscan 
CREATE VIEW search_view AS
SELECT		search, COUNT(search) as search_count
FROM		searches
GROUP BY	search
ORDER BY	search_count DESC
LIMIT 10;
