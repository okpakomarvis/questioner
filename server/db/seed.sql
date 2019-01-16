CREATE TABLE public.meetups
(
    meetup_id bigserial NOT NULL,
    "createdOn" date NOT NULL,
    location character varying(80) NOT NULL,
    "imagePath" character varying(200) NOT NULL,
    topic character varying(50) NOT NULL,
    "happeningOn" date NOT NULL,
    tags character varying(50) NOT NULL,
    PRIMARY KEY (meetup_id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.meetups
    OWNER to postgres;