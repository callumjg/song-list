# Song-List App

An app for tracking the metrics of songs as they are used in a church context.

## Installation

Requires npm and node to be installed.

Install the package dependencies by running the following in the root directory:

```bash
npm install
```

The app requires a connection to a postgres database. After the database has been created, the script in [01-tables.sql](./db-scripts/01-tables.sql) can be used to create the required tables. The connection to the database is configured via environment variables.

If running tests, a second postgres database should be set up with a different name (on the same host). Anything stored in this database is dropped when running the test suite. There is no need to set up the tables for the test database.

## Environment variables

Environment variables should be stored in a .env file in the root directory. See [example.env](./example.env) for an example. The following variables are required:

| Variable             | Example          | Notes                                                                           |
| :------------------- | :--------------- | :------------------------------------------------------------------------------ |
| NODE_ENV             | 'development'    | Should either be 'development', 'production', or 'test                          |
| PGUSER               | 'postgres'       | The postgres user. If undefined it will default to the currently logged in user |
| PGHOST               | 'db.example.com' | The postgres host. If undefined defaults to localhost                           |
| PGPORT               | 5432             | The postgres port on the host open for connections                              |
| PGDATABASE           | 'gpcsongs'       | The name of the postgres database                                               |
| PGPASSWORD           | 'password'       | The password for the postgres user                                              |
| TEST_DATABASE        | 'test'           | The name of the postgres database for running tests.                            |
| REFRESH_TOKEN_EXPIRY | 604800           | 1 Week in seconds                                                               |
| BEARER_TOKEN_EXPIRY  | 900              | 15 minutes in seconds                                                           |
| JWT_SECRET           | 'secret'         | For signing web tokens. This should not be shared.                              |

## Scripts

All scripts are run from the root directory.

Install project dependencies:

```bash
npm install
```

Run the project in development mode:

```bash
npm run dev
```

Compile the project:

```bash
npm run build
```

Start the server (the project must be built first):

```bash
npm start
```

Run tests:

```bash
npm test
```
