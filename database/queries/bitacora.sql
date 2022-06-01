CREATE TABLE config_variables (
name VARCHAR,
value TEXT);

INSERT INTO config_variables VALUES('current_admin','');

--SELECT value FROM config_variables WHERE name = 'current_admin';

--UPDATE config_variables SET value = '39' WHERE name = 'current_admin';

CREATE TABLE operations(
	table_name VARCHAR,
	admin_id TEXT,
	admin_name VARCHAR,
	operation VARCHAR,
	operation_Date DATE,
	row_id INT
);


CREATE OR REPLACE PROCEDURE store_admin_user(
		user_id text
) LANGUAGE PLPGSQL AS $$
	BEGIN
		UPDATE config_variables SET value = user_id WHERE name = 'current_admin';
END;$$



CREATE OR REPLACE FUNCTION store_operations_users_function() RETURNS TRIGGER AS $emp_stamp$
	BEGIN
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'DELETE') THEN
			INSERT INTO operations VALUES(
				'users',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" =  CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				OLD."userCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'UPDATE') THEN
            INSERT INTO operations VALUES(
				'users',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."userCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'INSERT') THEN
            INSERT INTO operations VALUES(
				'users',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."userCode"
			);
		END IF;
		RETURN NULL;
    END;
$emp_stamp$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER store_operations_users
	AFTER 	INSERT OR UPDATE OR DELETE 
	ON users
	FOR EACH ROW
	EXECUTE FUNCTION store_operations_users_function()


CREATE OR REPLACE FUNCTION store_operations_profiles_function() RETURNS TRIGGER AS $emp_stamp$
	BEGIN
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'DELETE') THEN
			INSERT INTO operations VALUES(
				'profiles',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" =  CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				OLD."profileCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'UPDATE') THEN
            INSERT INTO operations VALUES(
				'profiles',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."profileCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'INSERT') THEN
            INSERT INTO operations VALUES(
				'profiles',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."profileCode"
			);
		END IF;
		RETURN NULL;
    END;
$emp_stamp$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER store_operations_profiles
	AFTER INSERT OR UPDATE OR DELETE 
	ON profiles
	FOR EACH ROW
	EXECUTE FUNCTION store_operations_profiles_function();
	



CREATE OR REPLACE FUNCTION store_operations_movies_function() RETURNS TRIGGER AS $emp_stamp$
	BEGIN
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'DELETE') THEN
			INSERT INTO operations VALUES(
				'movies',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" =  CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				OLD."movieCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'UPDATE') THEN
            INSERT INTO operations VALUES(
				'movies',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."movieCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'INSERT') THEN
            INSERT INTO operations VALUES(
				'movies',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."movieCode"
			);
		END IF;
		RETURN NULL;
    END;
$emp_stamp$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER store_operations_movies
	AFTER 	INSERT OR UPDATE OR DELETE 
	ON movies
	FOR EACH ROW
	EXECUTE FUNCTION store_operations_movies_function();
	
	
	
	
	
CREATE OR REPLACE FUNCTION store_operations_actors_function() RETURNS TRIGGER AS $emp_stamp$
	BEGIN
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'DELETE') THEN
			INSERT INTO operations VALUES(
				'actors',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" =  CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				OLD."actorCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'UPDATE') THEN
            INSERT INTO operations VALUES(
				'actors',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."actorCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'INSERT') THEN
            INSERT INTO operations VALUES(
				'actors',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."actorCode"
			);
		END IF;
		RETURN NULL;
    END;
$emp_stamp$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER store_operations_actors
	AFTER 	INSERT OR UPDATE OR DELETE 
	ON actors
	FOR EACH ROW
	EXECUTE FUNCTION store_operations_actors_function();
	



CREATE OR REPLACE FUNCTION store_operations_advertisers_function() RETURNS TRIGGER AS $emp_stamp$
	BEGIN
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'DELETE') THEN
			INSERT INTO operations VALUES(
				'advertisers',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" =  CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				OLD."advertiserCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'UPDATE') THEN
            INSERT INTO operations VALUES(
				'advertiser',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."advertiserCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'INSERT') THEN
            INSERT INTO operations VALUES(
				'advertiser',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."advertiserCode"
			);
		END IF;
		RETURN NULL;
    END;
$emp_stamp$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER store_operations_advertisers
	AFTER 	INSERT OR UPDATE OR DELETE 
	ON advertisers
	FOR EACH ROW
	EXECUTE FUNCTION store_operations_advertisers_function();
	
	

	
CREATE OR REPLACE FUNCTION store_operations_ads_function() RETURNS TRIGGER AS $emp_stamp$
	BEGIN
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'DELETE') THEN
			INSERT INTO operations VALUES(
				'ads',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" =  CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				OLD."adCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'UPDATE') THEN
            INSERT INTO operations VALUES(
				'ads',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."adCode"
			);
		END IF;
		IF ((SELECT value FROM config_variables) != '' AND TG_OP = 'INSERT') THEN
            INSERT INTO operations VALUES(
				'ads',
				(SELECT value FROM config_variables),
				(SELECT name FROM users where "userCode" = CAST ((SELECT value FROM config_variables) AS INTEGER)),
				TG_OP,now(),
				NEW."adCode"
			);
		END IF;
		RETURN NULL;
    END;
$emp_stamp$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER store_operations_ads
	AFTER 	INSERT OR UPDATE OR DELETE 
	ON ads
	FOR EACH ROW
	EXECUTE FUNCTION store_operations_ads_function();
	