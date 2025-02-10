create table teams_table
(
    team_id      int auto_increment
        primary key,
    team_name    varchar(50) not null,
    rebrand_name varchar(50) null
);

