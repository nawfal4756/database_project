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

CREATE TABLE course (
	course_code VARCHAR(10) primary key,
    course_name VARCHAR(100) not null,
    course_description VARCHAR(500) not null,
    course_level VARCHAR(500) not null
);

INSERT INTO course VALUES ('CS2005', 'Database Systems', 'Database Systems', 'Bachelors');
INSERT INTO course VALUES ('SE3001', 'Software Construction and Development', 'Software Construction and Development', 'Bachelors');
INSERT INTO course VALUES ('CS2009', 'Design and Analysis of Algorithms', 'Design and Analysis of Algorithms', 'Bachelors');

SELECT * FROM course;

DROP TABLE course;

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

-- Personal
CREATE TABLE student (
	student_email VARCHAR(100) primary key,
    student_fname VARCHAR(50),
	student_lname VARCHAR(50),
    student_DOB Date,
    student_degree_level VARCHAR(50),
    basicForm boolean default false
);

DROP TABLE admin;

CREATE TABLE teacher (
	teacher_email VARCHAR(100) primary key,
    teacher_fname VARCHAR(50),
	teacher_lname VARCHAR(50),
    teacher_DOB Date,
    basicForm boolean default false
);

CREATE TABLE campus (
	campus_id int primary key auto_increment,
    campus_name VARCHAR(50) not null,
    campus_city_name VARCHAR(50) not null
);

CREATE TABLE admin (
	admin_email VARCHAR(100) primary key,
    admin_fname VARCHAR(50),
	admin_lname VARCHAR(50),
    basicForm boolean default false
);

INSERT INTO student (student_email) VALUES (?);
INSERT INTO teacher (teacher_email) VALUES (?);
INSERT INTO admin (admin_email) VALUES (?);

UPDATE student SET student_fname = ?, student_lname = ?, student_degree_level = ?, basicForm = true WHERE student_email = ?;
UPDATE teacher SET teacher_fname = ?, teacher_lname = ?, basicForm = true WHERE teacher_email = ?;
UPDATE admin SET admin_fname = ?, admin_lname = ?, basicForm = true WHERE admin_email = ?;

SELECT * FROM admin WHERE admin_email = ?;
SELECT * FROM student WHERE student_email = ?;
SELECT * FROM teacher WHERE teacher_email = ?;