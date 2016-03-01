create role jobwall

CREATE TABLE public.sponsors
(
  id serial NOT NULL,
  sponsor_name text,
  sponsor_url text,
  CONSTRAINT sponsor_pkey PRIMARY KEY (id)
);

CREATE TABLE public.jobs
(
  id serial NOT NULL,
  sponsor_id integer,
  job_title text,
  job_location text,
  job_description text,
  job text,
  contact_person_name text,
  contact_person_phone text,
  contact_person_email text,
  CONSTRAINT jobs_pkey PRIMARY KEY (id)
)

Grant select on table public.jobs to jobwall
Grant select on table public.sponsors to jobwall