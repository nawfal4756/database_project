CREATE TABLE user (
	id int primary key auto_increment,
    name VARCHAR(150),
    email VARCHAR(150) unique,
    emailVerified timestamp,
    image VARCHAR(1000)
);

CREATE TABLE session (
	id int primary key auto_increment,
    expires timestamp,
    sessionToken VARCHAR(500),
    userId int,
    foreign key (userId) references user(id)
);

CREATE TABLE account (
	id int primary key auto_increment,
    userId int,
    type VARCHAR(500),
    provider VARCHAR(500),
    providerAccountId VARCHAR(500),
    refresh_token VARCHAR(1500),
    access_token VARCHAR(1500),
    expires_at int,
    token_type VARCHAR(500),
    scope VARCHAR(500),
    id_token VARCHAR(1500),
    session_state VARCHAR(500),
    oauth_token_secret VARCHAR(500),
    oauth_token VARCHAR(500),
    foreign key (userId) references user(id)
);

DROP TABLE account;

INSERT INTO user (name, email, emailVerified, image) VALUES ('Nawfal', 'nawfalmehboob@gmail.com', '2022-12-05 09:21:39', 'image');

truncate table user;

UPDATE user SET name = ?, email = ?, emailVerified = ?, image = ? WHERE id = ?;

DELETE FROM user WHERE id = 2;

SELECT * FROM user;

SELECT * FROM account WHERE providerAccountId = ? AND provider = ?;

INSERT INTO account (userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, oauth_token_secret, oauth_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

DELETE FROM account WHERE id = ?;

INSERT INTO session (expires, sessionToken, userId) VALUES (?, ?, ?);

SELECT * FROM session WHERE sessionToken = ?;

UPDATE session SET expires = ?, sessionToken = ?, userId = ? WHERE sessionToken = ?;

DELETE FROM session WHERE sessionToken = ?;