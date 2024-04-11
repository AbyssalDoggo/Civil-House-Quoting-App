DROP SEQUENCE IF EXISTS SEQ_USER_CODE;

CREATE SEQUENCE SEQ_USER_CODE INCREMENT BY
    1 MINVALUE 1 MAXVALUE 9999999
    START WITH
        1 NO CYCLE;

DROP TABLE IF EXISTS M_USER CASCADE;

CREATE TABLE M_USER(
                       PHONE_NUMBER VARCHAR (11)
    , USER_CODE VARCHAR (10)
    , USER_NAME VARCHAR (100)
    , EMAIL VARCHAR (100)
    , PASSWORD VARCHAR (60)
    , ROLE VARCHAR (10)
    , DELETE_FLAG VARCHAR (1)
    , CREATE_DATETIME TIMESTAMP
    , CREATE_USER_CODE VARCHAR (7)
    , UPDATE_DATETIME TIMESTAMP
    , UPDATE_USER_CODE VARCHAR (7)
    , PRIMARY KEY (PHONE_NUMBER)
);

DROP SEQUENCE IF EXISTS SEQ_NEWS_CODE;

CREATE SEQUENCE SEQ_NEWS_CODE INCREMENT BY
    1 MINVALUE 1 MAXVALUE 9999999
    START WITH
        1 NO CYCLE;

DROP TABLE IF EXISTS NEWS CASCADE;

CREATE TABLE NEWS(
                     NEWS_ID VARCHAR (100)
    , TITLE VARCHAR (100)
    , IMAGE_URL VARCHAR (1000)
    , WRITTEN_BY VARCHAR (100)
    , BODY VARCHAR (50000)
    , CREATE_DATETIME TIMESTAMP
    , CREATE_USER_CODE VARCHAR (20)
    , PRIMARY KEY (NEWS_ID)
);

CREATE SEQUENCE SEQ_PROJECT_CODE INCREMENT BY
    1 MINVALUE 1 MAXVALUE 9999999
    START WITH
        1 NO CYCLE;

DROP TABLE IF EXISTS PROJECTS CASCADE;

CREATE TABLE PROJECTS(
                         PROJECTS_ID VARCHAR (100)
    , TITLE VARCHAR (1000)
    , ARCHITECT VARCHAR (1000)
    , AREA VARCHAR (1000)
    , YEAR VARCHAR (1000)
    , IMAGE_URL VARCHAR (1000)
    , BODY VARCHAR (50000)
    , CREATE_DATETIME TIMESTAMP
    , CREATE_USER_CODE VARCHAR (20)
    , PRIMARY KEY (PROJECTS_ID)
);

DROP TABLE IF EXISTS package CASCADE;

CREATE TABLE package(
                        PACKAGE_ID VARCHAR (10)
    , PACKAGE_NAME VARCHAR (50)
    , UNIT_PRICE VARCHAR (12)
    , PRIMARY KEY (PACKAGE_ID)
);

DROP TABLE IF EXISTS package_detail CASCADE;

CREATE TABLE package_detail(
                               PACKAGE_ID VARCHAR (10)
    , DETAIL_NO VARCHAR (50)
    , IMAGE VARCHAR (100)
    , PACKAGE_DETAIL_NAME VARCHAR (60)
    , DETAIL VARCHAR (500)
    , PRIMARY KEY (PACKAGE_ID, DETAIL_NO)
);

DROP TABLE IF EXISTS package_type CASCADE;

CREATE TABLE package_type(
                             PACKAGE_ID VARCHAR (10)
    , PACKAGE_TYPE_ID VARCHAR (10)
    , PACKAGE_TYPE_NAME VARCHAR (50)
    , PRIMARY KEY (PACKAGE_ID, PACKAGE_TYPE_ID)
);

DROP TABLE IF EXISTS package_type_detail CASCADE;

CREATE TABLE package_type_detail(
                                    PACKAGE_ID VARCHAR (10)
    , PACKAGE_TYPE_ID VARCHAR (10)
    , DETAIL_NO VARCHAR (10)
    , TYPE_DETAIL_NAME VARCHAR (50)
    , COEFFICIENT VARCHAR (12)
    , PRIMARY KEY (PACKAGE_ID, PACKAGE_TYPE_ID, DETAIL_NO)
);
