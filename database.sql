
--------------------------USER TABLE--------------------------

--CREATE TABLE
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "image" VARCHAR (500),
    "about" TEXT
);

--DELETE TABLE
DROP TABLE "user";

--DELETE ALL ROWS FROM TABLE
DELETE FROM "user";

--SELECT ALL ROWS FROM TABLE
SELECT * FROM "user" ORDER BY id ASC;

--CREATE NEW USER AND RETURN ID (FOR REGISTRATION)
INSERT INTO "user" (username, password)
    VALUES ('test username', 'test password') RETURNING id;
    
--UPDATE USER IMAGE AND ABOUT
UPDATE "user" SET image = 'test image', about = 'test about' WHERE id = 1;

--------------------------POST TABLE--------------------------

--CREATE TABLE
CREATE TABLE "post" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"lat" VARCHAR(120) NOT NULL,
	"lng" VARCHAR(120) NOT NULL,
	"title" VARCHAR(120) NOT NULL,
	"description" TEXT,
	"audio" VARCHAR(500) NOT NULL,
	"image" VARCHAR(500),
);

--DELETE TABLE
DROP TABLE "post";

--DELETE ALL ROWS FROM TABLE
DELETE FROM "post";

--SELECT ALL ROWS FROM TABLE
SELECT * FROM "post" ORDER BY id ASC;

--CREATE NEW POST
INSERT INTO "post" ("user_id", "lat", "lng", "title", "description", "audio", "image")
VALUES (1, 1, 1, 'test title', 'test description', 'test audio', 'test image'); 

--UPDATE POST
UPDATE "post" SET title = 'test new title' WHERE id = 1;

--DELETE POST
DELETE FROM "post" WHERE id = 1;

--SELECT ALL POSTS FROM A SPECIFIC USER
SELECT * FROM "post" WHERE user_id = 1;

--------------------------FOLLOWER TABLE--------------------------
CREATE TABLE "follower" (
	"id" SERIAL PRIMARY KEY,
	"following_user_id" INT REFERENCES "user" NOT NULL,
	"followed_user_id" INT REFERENCES "user" NOT NULL
);

--SELECT ALL ROWS FROM TABLE
SELECT * FROM "follower" ORDER BY id ASC;

--FOLLOWER USER
INSERT INTO "follower" ("following_user_id", "followed_user_id")
VALUES (5,3);

--UNFOLLOW USER
DELETE FROM "follower" WHERE following_user_id = 5 AND followed_user_id = 3;

--GET ALL POSTS OF FOLLOWED USERS
SELECT  
"follower".followed_user_id,
"user".username,  "user".image as profile_image, "user".about as profile_about,
"post".id, "post".user_id, "post".lat, "post".lng, "post".title, "post".description, "post".audio, "post".image  
FROM "follower"
JOIN "post" ON "post".user_id = "follower".followed_user_id
JOIN "user" ON "user".id = "post".user_id
WHERE "follower".following_user_id = 5;

--------------------------JOIN CALLS--------------------------

SELECT 
"user".username,  "user".image as profile_image, "user".about as profile_about,
"post".id, "post".user_id, "post".lat, "post".lng, "post".title, "post".description, "post".audio, "post".image
FROM "post"
JOIN "user" ON "user".id = "post".user_id
ORDER BY "post".id DESC;