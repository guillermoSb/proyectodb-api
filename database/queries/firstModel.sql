-- Universidad del Valle de Guatemala
-- Bases de Datos 1 - Proyecto 02
-- 15/03/2022

-- Users
-- todo: implement roles
CREATE TABLE users(
	userCode BIGSERIAL PRIMARY KEY,
	userName VARCHAR(20) UNIQUE NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	names VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	active BOOLEAN NOT NULL,
	profileCount INTEGER NOT NULL
);

-- Profiles
CREATE TABLE profiles(
	profileCode BIGSERIAL PRIMARY KEY,
	userCode BIGINT NOT NULL,
	name VARCHAR(50) NOT NULL,
	photo TEXT,
	active BOOLEAN NOT NULL,
	CONSTRAINT fkUserCode
		FOREIGN KEY(userCode)
			REFERENCES users(userCode)
);

-- Movies
CREATE TABLE movies(
	movieCode BIGSERIAL PRIMARY KEY,
	genre VARCHAR NOT NULL,
	category VARCHAR NOT NULL,
	studioCode INTEGER NOT NULL,
	directorCode INTEGER NOT NULL,
	title VARCHAR(50) NOT NULL,
	description TEXT,
	duration NUMERIC(5,2) NOT NULL,
	publishedAt DATE NOT NULL,
	url TEXT,
	rating SMALLINT,
	ratingCount INTEGER,
	coverUrl TEXT,
	CONSTRAINT fkCategory
		FOREIGN KEY(category)
			REFERENCES categories(name),
	CONSTRAINT fkGenre
		FOREIGN KEY(genre)
			REFERENCES genres(name),
	CONSTRAINT fkStudio
		FOREIGN KEY(studioCode)
			REFERENCES studios(studioCode),
	CONSTRAINT fkDirector
		FOREIGN KEY(directorCode)
			REFERENCES directors(directorCode)
);

-- Categories
CREATE TABLE categories(
	name VARCHAR PRIMARY KEY
);

-- Genres
CREATE TABLE genres(
	name VARCHAR PRIMARY KEY
);

-- Studios
CREATE TABLE studios(
	studioCode BIGSERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	country VARCHAR(50) NOT NULL
);

-- Directors
CREATE TABLE directors(
	directorCode BIGSERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL
);

-- Actors
CREATE TABLE actors(
	actorCode BIGSERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL
);


-- CastRoles
CREATE TABLE castRoles(
	title VARCHAR(10) PRIMARY KEY
);

-- CastingMovies
-- implementar fk compuesta
CREATE TABLE castingMovies(
	actorCode BIGSERIAL NOT NULL,
	movieCode INTEGER NOT NULL,
	roleTitle VARCHAR(10) NOT NULL,
	CONSTRAINT fkCastRole
		FOREIGN KEY(roleTitle)
			REFERENCES castRoles(title),
	CONSTRAINT fkMovieCode
		FOREIGN KEY(movieCode)
			REFERENCES movies(movieCode)
);

-- UserMovieActivities
CREATE TABLE userMovieActivities(
	profileCode BIGINT NOT NULL,
	movieCode BIGINT NOT NULL,
	startedAt TIMESTAMP NOT NULL,
	endedAt TIMESTAMP NOT NULL,
	finished BOOLEAN,
	CONSTRAINT fkMovie
		FOREIGN KEY(movieCode)
			REFERENCES movies(movieCode),
	CONSTRAINT fkProfileCode
		FOREIGN KEY(profileCode)
			REFERENCES profiles(profileCode)
);



-- TEST DATA
INSERT INTO actors(name, lastName) VALUES 
('Leonardo', 'DiCaprio');

INSERT INTO directors(name, lastName) VALUES 
('Martin', 'Scorsese');

INSERT INTO directors(name, lastName) VALUES 
('Alejandro', 'Gonzalez');

INSERT INTO categories VALUES
('B');

INSERT INTO genres VALUES
('drama');

INSERT INTO studios(name, country) VALUES
('Paramount Pictures', 'USA')

INSERT INTO castingMovies VALUES
	(1, 1, 'star'),
	(1, 2, 'star');

INSERT INTO movies(
	genre,
	category,
	studioCode,
	directorCode,
	title,
	publishedAt,
	duration
) VALUES
('comedy', 'B', 1, 1, 'The Wolf of Wall Street', '2013/12/25', 100),
('drama', 'B', 1, 2, 'El Renacido', '2015/12/16', 100);

INSERT INTO castRoles VALUES
('star');

INSERT INTO users(
	userName,
	email,
	password,
	names,
	lastName,
	active,
	profileCount
) VALUES
('guilleSantos', 'guillermo@test.com', '34424', 'Guillermo', 'Santos', TRUE, 1);

INSERT INTO profiles(
	userCode,
	name,
	active
) VALUES
(1, 'Guille', TRUE)

INSERT INTO profiles(
	userCode,
	name,
	active
) VALUES
(1, 'Joaquin', TRUE)


INSERT INTO userMovieActivities(
	profileCode,
	movieCode,
	startedAt,
	endedAt,
	finished
) VALUES
(1,1, current_timestamp,  current_timestamp + '50 minutes'::interval, false),
(1,2, current_timestamp,  current_timestamp + '50 minutes'::interval, false),
(3,2, current_timestamp,  current_timestamp + '50 minutes'::interval, false);


-- Respuesta a pregunta
SELECT 	profileCode, 
		(
			SELECT name FROM profiles WHERE profiles.profileCode = userMovieActivities.profileCode
		),
		ROUND(SUM(EXTRACT( EPOCH FROM (endedAt - startedAt)))/60, 2) AS minutes
FROM userMovieActivities
WHERE movieCode IN (
	SELECT movieCode 
	FROM castingMovies
	WHERE actorCode = 1
)
GROUP BY profileCode
ORDER BY minutes DESC
LIMIT 1;


