-- Create the schema and tables

-- CREATE SCHEMA hmphoto;

CREATE TABLE hmphoto.media (
    mediaID SERIAL NOT NULL PRIMARY KEY,
    service VARCHAR(26) NOT NULL
);

CREATE TABLE hmphoto.packages (
    packageID SERIAL NOT NULL PRIMARY KEY,
    mediaID INT NOT NULL REFERENCES hmphoto.media(mediaID),
    packageName VARCHAR(26) NOT NULL,
    packagePrice decimal(10,0) NOT NULL,
    packageHours VARCHAR(26) NOT NULL,
    packageImg VARCHAR(50) NOT NULL,
    packageLocationCount SMALLINT NOT NULL,
    packageDescription TEXT NOT NULL
);

CREATE TABLE hmphoto.user (
    userID SERIAL NOT NULL PRIMARY KEY,
    userName VARCHAR(26) NOT NULL,
    userPassword VARCHAR(26) NOT NULL
);




-- INSERT data into tables
INSERT INTO hmphoto.media (service) VALUES
('Photo'),
('Video'),
('Photo and Video');

INSERT INTO hmphoto.user (userName, userPassword) VALUES
('Admin','Pa$$word1');

INSERT INTO hmphoto.packages (mediaID, packageName, packagePrice, packageHours, packageImg, packageLocationCount, packageDescription) VALUES
(1, 'Bronze Photo', 200, '0-1', '/images/noImage.png', 1, 'This package is perfect for quick family, bridals, engagement and senior photo sessions.'),
(1, 'Silver Photo', 550, '2-3', '/images/noImage.png', 2, 'This package is good for famiy, bridals, engagement and senior pictures where you want more locations and have to switch outfits. This would also be good for a quick temple or cerimony. '),
(1, 'Gold Photo', 1000, '4-6', '/images/noImage.png', 3, 'This package is good for full day weddings and receptions.'),
(2, 'Bronze Video', 150, '0-1', '/images/noImage.png', 1, 'This package is perfect for quick family, bridals, engagement and senior video sessions.'),
(2, 'Silver Video', 400, '2-3', '/images/noImage.png', 2, 'This package is good for famiy, bridals, engagement and senior pictures where you want more locations and have to switch outfits. This would also be good for a quick temple or cerimony. '),
(2, 'Gold Video', 800, '4-6', '/images/noImage.png', 3, 'This package is good for full day weddings and receptions.'),
(3, 'Bronze Photo and Video', 350, '0-1', '/images/noImage.png', 1, 'This package is perfect for quick family, bridals, engagement and senior photo and video sessions.'),
(3, 'Silver Photo and Video', 900, '2-3', '/images/noImage.png', 2, 'This package is good for famiy, bridals, engagement and senior pictures where you want more locations and have to switch outfits. This would also be good for a quick temple or cerimony. '),
(3, 'Gold Photo and Video', 1700, '4-6', '/images/noImage.png', 3, 'This package is good for full day weddings and receptions.'); 




-- update
UPDATE hmphoto.packages SET packageImg = '/hannahmacphoto/imagesH/dunes.jpg' WHERE packageID = 1;
UPDATE hmphoto.packages SET packageImg = '/hannahmacphoto/imagesH/bridal.jpg' WHERE packageID = 2;
UPDATE hmphoto.packages SET packageImg = '/hannahmacphoto/imagesH/weddingday2.jpg' WHERE packageID = 3;
UPDATE hmphoto.packages SET packageImg = '/hannahmacphoto/imagesH/engagement2.jpg' WHERE packageID = 4;
UPDATE hmphoto.packages SET packageImg = '/hannahmacphoto/imagesH/family.jpg' WHERE packageID = 5;
UPDATE hmphoto.packages SET packageImg = '/hannahmacphoto/imagesH/weddingday.jpg' WHERE packageID = 6;
UPDATE hmphoto.packages SET packageImg = '/hannahmacphoto/imagesH/engagement.jpg' WHERE packageID = 7;
UPDATE hmphoto.packages SET packageImg = '/hannahmacphoto/imagesH/bridal2.jpg' WHERE packageID = 8;
UPDATE hmphoto.packages SET packageImg = '/hannahmacphoto/imagesH/weddingday3.jpg' WHERE packageID = 9;