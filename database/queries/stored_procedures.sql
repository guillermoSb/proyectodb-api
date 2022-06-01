-- Reporte 6
CREATE OR REPLACE PROCEDURE get_top_movies_hour() 
LANGUAGE PLPGSQL 
AS $$
DECLARE
		date_min	DATE;
		date_max	DATE;
		hour_min	TIME;
		hour_max	TIME;
BEGIN

	DROP TABLE IF EXISTS top_movies_hour;	
	CREATE TABLE top_movies_hour (
		movieCode INT,
		views INT,
		hour INT,
		month INT
	);
	
	CREATE INDEX	index_month
	ON				top_movies_hour(month);
	
	FOR month_no IN 1..12 LOOP
	IF month_no = 1 THEN 
		date_min = '2022-01-01';
		date_max = '2022-01-31'; 
	ELSEIF month_no = 2 THEN
		date_min = '2022-02-01';
		date_max = '2022-02-28';
	ELSEIF month_no = 3 THEN 
		date_min = '2022-03-01';
	    date_max = '2022-03-31';
	ELSEIF month_no = 4 THEN
		date_min = '2022-04-01';
		date_max = '2022-04-30';
	ELSEIF month_no = 5 THEN
		date_min = '2022-05-01';
		date_max = '2022-05-31';
	ELSEIF month_no = 6 THEN 
		date_min = '2022-06-01';
		date_max = '2022-06-30';
	ELSEIF month_no = 7 THEN
		date_min = '2022-07-01';
		date_max = '2022-07-31';
	ELSEIF month_no = 8 THEN
		date_min = '2022-08-01'; 
		date_max = '2022-08-31';
	ELSEIF month_no = 9 THEN
		date_min = '2022-09-01';
		date_max = '2022-09-30';
	ELSEIF month_no = 10 THEN
		date_min = '2022-10-01';
		date_max = '2022-10-31';
	ELSEIF month_no = 11 THEN
		date_min = '2022-11-01';
		date_max = '2022-11-30';
	ELSEIF month_no = 12 THEN
		date_min = '2022-12-01';
		date_max = '2022-12-31';
	END IF;
		
	FOR counter IN 9..13 LOOP
		IF counter = 9 THEN
			hour_min = '9:00:00';
			hour_max = '9:59:59.59';
		ELSEIF counter = 10 THEN 
			hour_min = '10:00:00.0';
			hour_max = '10:59:59.59';
		ELSEIF counter = 11 THEN 
			hour_min = '11:00:00.0';
			hour_max = '11:59:59.59';
		ELSEIF counter = 12 THEN
			hour_min = '12:00:00.0';
			hour_max = '12:59:59.59';
		ELSEIF counter = 13 THEN
			hour_min = '13:00:00.0';
			hour_max = '13:59:59.59';
		END IF;
	
		INSERT INTO top_movies_hour
			SELECT "movieCode", COUNT("movieCode"), counter, month_no
			FROM "userMovieActivities"
			WHERE "startedAt"::DATE >= date_min 
			AND "startedAt"::DATE <= date_max  
			AND "startedAt"::TIME >= hour_min
			AND "startedAt"::TIME <= hour_max
			GROUP BY "movieCode"
			ORDER BY COUNT("movieCode") DESC
			LIMIT 5;
	END LOOP;
	END LOOP;
END;
$$


-- Reporte 


CREATE TABLE searches(
	date	TIMESTAMP WITH TIME ZONE,
	search	TEXT
);

DROP TABLE searches;

SELECT	*
FROM	searches;

CREATE VIEW search_view AS
SELECT		search, COUNT(search) as search_count
FROM		searches
GROUP BY	search
ORDER BY	search_count DESC
LIMIT 10;
