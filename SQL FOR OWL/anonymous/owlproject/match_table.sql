create table match_table
(
    match_id       bigint auto_increment
        primary key,
    year           int         not null,
    stage          varchar(50) null,
    date           datetime    null,
    team_one_id    int         not null,
    team_two_id    int         null,
    score_team_one int         null,
    score_team_two int         null
);

