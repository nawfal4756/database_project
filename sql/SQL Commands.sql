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

INSERT INTO campus (campus_name, campus_city_name) VALUES ("Main Campus", "Karachi");
INSERT INTO campus (campus_name, campus_city_name) VALUES ("City Campus", "Karachi");
INSERT INTO campus (campus_name, campus_city_name) VALUES ("Main Campus", "Lahore");
INSERT INTO campus (campus_name, campus_city_name) VALUES ("Main Campus", "Islamabad");

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

SELECT campus_id, campus_name || ' - ' || campus_city_name as campus_name_joined FROM campus;
SELECT campus_id, concat_ws(' - ', campus_name, campus_city_name) as campus_name FROM campus;

CREATE TABLE document (
	course_code VARCHAR(10),
    document_id int unsigned auto_increment,
    document_uploaded_date timestamp default now(),
	document_name VARCHAR(200) not null,
    document_type VARCHAR(20) not null,
    document_verified boolean default false,
    document_anonymous boolean,
    document_student boolean,
    document_teacher boolean,
    campus_id int,
    document_uploader_email VARCHAR(100) not null,
    document_uploader_type VARCHAR(10) not null,
    document_date_semester VARCHAR(20) not null,
    document_date_year int not null,
    primary key(course_code, document_id),
    foreign key(course_code) references course(course_code),
    foreign key(campus_id) references campus(campus_id)
)Engine=MyISAM;

DROP TABLE document;
SELECT * FROM document;
SELECT d.document_id, d.document_type, d.document_date_semester, d.document_date_year, c.course_code, c.course_name FROM document d JOIN course c ON d.course_code = c.course_code ORDER BY document_uploaded_date DESC LIMIT 20;
SELECT * FROM document WHERE course_code = ? AND document_id = ?;
SELECT document_id, document_type, document_date_semester, document_date_year, course_code FROM document where document_verified = ?;
SELECT COUNT(document_id) as count FROM document WHERE document_verified = true;

INSERT INTO document (course_code, document_name, document_type, document_anonymous, document_student, document_teacher, campus_id, document_uploader_email, document_uploader_type, document_date_semester, document_date_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

SELECT d.document_id, d.course_code, document_name, d.document_type, co.course_name, concat_ws(' - ', ca.campus_name, ca.campus_city_name) as 'campus', d.document_date_semester, d.document_date_year, d.document_verified FROM document d JOIN course co ON d.course_code = co.course_code JOIN campus ca ON d.campus_id = ca.campus_id WHERE d.course_id = ? AND d.document_id = ?;

UPDATE document SET document_verified = true WHERE course_code = ? AND document_id = ?;

DELETE FROM document WHERE course_code = ? AND document_id = ?;