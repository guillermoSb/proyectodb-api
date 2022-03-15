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
	duration DECIMAL(2,2) NOT NULL,
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
CREATE TABLE castingMovies(
	actorCode BIGSERIAL NOT NULL,
	movieCode INTEGER NOT NULL,
	roleTitle VARCHAR(10) NOT NULL
	CONSTRAINT fkCastRole
		FOREIGN KEY(roleTitle)
			REFERENCES roles(title),
	CONSTRAINT fkMovieCode
		FOREIGN KEY(movieCode)
			REFERENCES movies(movieCode)
);

-- UserMovieActivities
CREATE TABLE userMovieActivities(
	profileCode BIGINT NOT NULL,
	movieCode BIGINT NOT NULL,
	startedAt DATE NOT NULL,
	endedAt DATE NOT NULL,
	finished BOOLEAN
);

