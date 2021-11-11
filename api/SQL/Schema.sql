create table design_plans
(
	plan_id serial
		constraint design_plans_pk
			primary key,
	description varchar,
	last_edited date
);

alter table design_plans owner to isaac_wickham;

create table school
(
	school_id serial
		constraint school_pk
			primary key,
	name varchar
);

alter table school owner to isaac_wickham;

create table "user"
(
	user_id serial
		constraint user_pk
			primary key,
	full_name varchar not null,
	username varchar not null,
	password varchar not null,
	email varchar not null,
	role boolean default false not null,
	school_id integer not null
		constraint user_school_school_id_fk
			references school
);

alter table "user" owner to isaac_wickham;

create unique index user_email_uindex
	on "user" (email);

create unique index user_username_uindex
	on "user" (username);

create table favorites
(
	user_id integer not null
		constraint favs_user_user_id_fk
			references "user",
	plan_id integer not null
		constraint favorites_design_plans_plan_id_fk
			references design_plans,
	stars integer not null,
	comments varchar
);

alter table favorites owner to isaac_wickham;

create table ownership
(
	user_id integer
		constraint ownership_user_user_id_fk
			references "user",
	plan_id integer
		constraint ownership_design_plans_plan_id_fk
			references design_plans
);

alter table ownership owner to isaac_wickham;

create table dorm
(
	dorm_id serial
		constraint dorm_pk
			primary key,
	name varchar not null,
	saftey regdictionary,
	mail_address varchar not null,
	school_id integer
		constraint dorm_school_school_id_fk
			references school
);

alter table dorm owner to isaac_wickham;

create unique index dorm_dorm_id_uindex
	on dorm (dorm_id);

create table room
(
	number integer not null
		constraint room_pk
			primary key,
	floor integer not null,
	length integer not null,
	width integer not null,
	height integer not null,
	occupancy integer not null,
	dorm_id integer not null
		constraint room_dorm_dorm_id_fk
			references dorm
);

alter table room owner to isaac_wickham;

create table furniture
(
	furniture_id serial
		constraint furniture_pk
			primary key,
	name varchar not null,
	length real not null,
	width real not null,
	height real not null,
	lat_long real not null,
	required boolean default false not null
);

alter table furniture owner to isaac_wickham;

create unique index furniture_furniture_id_uindex
	on furniture (furniture_id);

create table room_furniture
(
	"furniture-id" integer not null
		constraint room_furniture_furniture_furniture_id_fk
			references furniture,
	room_number integer not null
		constraint room_furniture_room_number_fk
			references room,
	dorm_id integer not null
		constraint room_furniture_dorm_dorm_id_fk
			references dorm,
	num_of_items integer not null
);

alter table room_furniture owner to isaac_wickham;

create table user_friends
(
	user_id integer not null
		constraint user_friends_user_user_id_fk
			references "user"
);

alter table user_friends owner to isaac_wickham;


