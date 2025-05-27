-- MySQL 데이터베이스 생성 스크립트
-- 이 스크립트를 MySQL에서 실행하여 데이터베이스를 생성하세요

-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS blogdb 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 데이터베이스 사용
USE blogdb;

-- 사용자 생성 (선택사항 - root 사용자 대신 전용 사용자를 만들고 싶다면)
-- CREATE USER 'bloguser'@'localhost' IDENTIFIED BY 'blogpassword';
-- GRANT ALL PRIVILEGES ON blogdb.* TO 'bloguser'@'localhost';
-- FLUSH PRIVILEGES;

-- 테이블은 Spring Boot JPA가 자동으로 생성합니다
-- ddl-auto=update 설정으로 인해 애플리케이션 시작 시 자동 생성됩니다 