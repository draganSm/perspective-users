# Backend Engineer Worksample

This project skeleton contains a basic Express setup one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.

## Scripts

`npm start` starts the server

`npm test` executes the tests

## Goal

1. Adjust one endpoint so it accepts a user and stores it in a database.
2. Adjust one endpoint so it returns (all) users from the database.
   - This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.

Feel free to add or change this project as you like.

# Dragan's comments

### Added dependencies

- @types/cors
- @types/express
- @types/knex
- @types/ramda
- @types/pg
- @types/supertest
- knex
- pg
- ramda
- express
- cors
- dotenv
- zod
- testcontainers
- supertest

### Install PG

```
docker run --name postgresql-container -p 5432:5432 -e POSTGRES_PASSWORD=admin -d postgres
```

Check that DB is running

```
# open a new terminal
docker exec -it postgresql-container /bin/sh
psql -U postgres
\l

##                                                List of databases
##   Name    |  Owner   | Encoding |  Collate   |   Ctype    | ICU Locale | Locale Provider |   Access privileges
##-----------+----------+----------+------------+------------+------------+-----------------+-----------------------
## postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |
## template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
##           |          |          |            |            |            |                 | postgres=CTc/postgres
## template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
##           |          |          |            |            |            |                 | postgres=CTc/postgres
## (4 rows)

exit
exit
```

### Configure db

Used

```
knex init -x ts
```

in order to create the `knexfile.ts` file.

Execute db migrations:

```
npx knex migrate:latest
```

Verify creation of table:

```
# connect to new DB
\c postgres

# dump table creation data
\d+ users

##                                                          Table "public.users"
##   Column   |           Type           | Collation | Nullable |      Default      | Storage  | Compression | Stats target | Description
##------------+--------------------------+-----------+----------+-------------------+----------+-------------+--------------+-------------
## id         | uuid                     |           | not null |                   | plain    |             |              |
## first_name | character varying(255)   |           | not null |                   | extended |             |              |
## last_name  | character varying(255)   |           | not null |                   | extended |             |              |
## email      | character varying(255)   |           | not null |                   | extended |             |              |
## address    | character varying(255)   |           | not null |                   | extended |             |              |
## zip_code   | character varying(255)   |           | not null |                   | extended |             |              |
## city       | character varying(255)   |           | not null |                   | extended |             |              |
## country    | character varying(255)   |           | not null |                   | extended |             |              |
## created_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP | plain    |             |              |
## updated_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP | plain    |             |              |
##Indexes:
##    "user_pkey" PRIMARY KEY, btree (id)
##    "user_email_unique" UNIQUE CONSTRAINT, btree (email)

```

Used https://www.mockaroo.com/ (used it just as it was a first match in a google search) to generate the initial USERS table

Issue

```
npx knex migrate:rollback --all
```

in order to rollback the migrations.

Some of websites used to find the necessarily lengths of fields used in demo.

### Alphabetical list of countries

https://www.worldometers.info/geography/alphabetical-list-of-countries/

### List of long place names

https://en.wikipedia.org/wiki/List_of_long_place_names

### The Shortest Place Names In The World

https://www.worldatlas.com/articles/the-shortest-place-names-in-the-world.html

### Postal codes

- DE: https://www.spotzi.com/en/data-catalog/categories/postal-codes/germany/
- UK: https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom
- US: https://www.spotzi.com/en/data-catalog/categories/postal-codes/united-states/

### Create a user CURL command

```
curl -X POST -H "Content-Type: application/json" -d '{
  "first_name": "Karl-Heinz",
  "last_name": "Rummenigge",
  "email": "khr+002@fifa.com",
  "address": "Street 123",
  "zip_code": "12345",
  "city": "City",
  "country": "Country"
}' http://localhost:4111/users
```

Please note that email should be unique, zip code shorter than 7 chars, city shorter than 85, country than 32, address than 100 and first and last name shorter than 50 characters.

# Finish

Please use

```
yarn
```

to update the dependencies,

```
yarn start
```

to run the service. The app requires the Postgres DB provided by a docker container.
Section `Install PG` describes how to install and run the container.

Run the tests by

```
yarn test
```

(make sure that Docker is running as tests spawn a temporary PG container)

The app is structured such that a new repositories can be easily added:

- create a model
- add the corresponding repo to DAL
- add controller (constructor accepts an instance of knex object) and export the corresponding routes
  Purpose of `RepositoryFactory` object is to inject the knex instance to repos and to create a single instance of different repos
  In order to share exposed random port of PG container, the TEST_PG_PORT env. variable is created (check testContainerSetup.ts#10).
  Environment.ts#10 picks the PG port based on whether we are running the app (PORT) or tests (TEST_PG_PORT)

## Open improvements

- there is no general error handler
- POST('/user') doesn't return ID of created object or a new user object
- the length of all text fields is 255 chars
- if create query param is not provided or if the value is misspelled the '/user' EP will return list of users in ascending order
- there is no pagination (didn't add it as it wasn't required)

## Test coverage

```
--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------------|---------|----------|---------|---------|-------------------
All files                 |   96.55 |    92.85 |     100 |   96.25 |
```

A few files have been excluded from test coverage as there was no value in writing tests for them.
