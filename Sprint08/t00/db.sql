create database ucode_web;
create user 'ovoitenko'@'localhost' identified by 'securepass';
GRANT ALL PRIVILEGES ON ucode_web.* to 'ovoitenko'@'localhost';
FLUSH PRIVILEGES;
