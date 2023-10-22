---
title: "Managing Postgres schema changes with Migra"
slug: "managing-postgres-schema-changes-with-migra"
publishedAt: "2022-11-05"
pin: true
keywords: "postgres, migra, schema"
---

[`migra`](https://github.com/djrobstep/migra) is a great tool for tracking
changes in a Postgres schema for ORM-less setups.

It generates schema diffs between two different Postgres instances. **i.e.**,
on an instance A with the desired schema, and instance B with current schema,
`migra` will generate a SQL file that you can apply to instance B that will
bring its schema up to parity with A.

Here's a diagram to help visualize this:

```sh
.         (current)                       (new)
.      ---------------               ---------------
.      | Instance $A |               | Instance $A |
.      | Schema V0   | -- Change --> | Schema V1   |
.      ---------------               ---------------
.                                          |
.                          |---------------|
.                          |
.                          v
.     ===============================================
.     |               $ migra diff                  |
.     |         Against Instance B (current)        |
.     ===============================================
.                          |
.                          |
.                          v
.                      (current)
.                   -----------------
.                   |  Instance $B  |
.                   |  Schema V0    |
.                   -----------------
.                          |
.                          |
.                          v
.     ===============================================
.     | Produces an upgrade SQL script to Schema V1 |
.     |             >> changes.sql                  |
.     ===============================================
.                          |
.                          |
.                          v
.     ===============================================
.     |           Review and apply to $B            |
.     |   $ psql postgresql://$B -1 -f changes.sql  |
.     ===============================================
.                          |
.                          |
.                          v
.                        (new)
.                   -----------------
.                   |  Instance $B  |
.                   |  Schema V1    |
.                   -----------------
```

This allows us to make schema tweaks on a local or dev instance, generate a diff against production, review and apply the generated diff to production, and keep the generated diff in source control.

<H2A id="usage">Usage</H2A>

`migra` is easy to use:
```bash
# $1 = Instance with current schema
# $2 = Instance with desired schema
# `changes.sql` => the diff between $1 and $2
$ migra postgresql://$1 postgresql://$2 > changes.sql
```

Let's assume that both instances (`$1` and `$2`) have this schema:
```sql
# 0000.sql
CREATE SCHEMA IF NOT EXISTS app;
CREATE TABLE IF NOT EXISTS app.users (
	username TEXT NOT NULL,
	password TEXT NOT NULL
);
```

Since both instances have the same schema, running `migra` generates nothing:
```bash
$ migra \
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres \
    postgresql://postgresprod:postgresprod@localhost:5433/postgres
```

Now let's make a change to one of the instances:
```sql
ALTER TABLE app.users ADD COLUMN last_login TIMESTAMP NULL;
```

And run `migra` both ways:

```bash
$ migra --unsafe \
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres \
    postgresql://postgresprod:postgresprod@localhost:5433/postgres
alter table "app"."users" drop column "last_login";

# Switch the connection string around:
$ migra --unsafe \
    postgresql://postgresprod:postgresprod@localhost:5433/postgres \
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres
alter table "app"."users" add column "last_login" timestamp without time zone;
```

Now you can see why it's a schema diff tool. You can then pipe the output to
a file, review and/or modify it, and apply the changes when you're satisfied:

```bash
# Output to file
$ migra --unsafe \
    postgresql://postgresprod:postgresprod@localhost:5433/postgres \
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres \
    > 0001.sql
alter table "app"."users" add column "last_login" timestamp without time zone;

# Review
$ cat 0001.sql
alter table "app"."users" add column "last_login" timestamp without time zone;

# Apply
$ psql postgresql://postgresprod:postgresprod@localhost:5433/postgres \
    -1 -f 0001.sql
ALTER TABLE

# Run migra again (prod->local)
$ migra --unsafe \
    postgresql://postgresprod:postgresprod@localhost:5433/postgres \
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres
#   => No output, because both instances are at parity

# Run migra again (local->prod)
$ migra --unsafe \
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres \
    postgresql://postgresprod:postgresprod@localhost:5433/postgres
#   => No output, because both instances are at parity
```

<H2A id="why-unsafe-flag">Why unsafe flag?</H2A>

Without `--unsafe`, `migra` will not generate destructive statements. We want
them because dropping columns/indexes/etc. is a valid schema tweak, so the
flag allows us to (intentionally) retain destructive commands such as
`DROP ...`.

Check out https://databaseci.com/docs/migra/options for more information.

<H2A id="warning-renames">Usage warning: Be careful about renames!</H2A>

Most rename operations are generated as a `DROP foo;` -> `CREATE foo;`
statement, meaning that it **re-creates** the object instead of renaming it
in-place. This will happen if when you rename a table, column, primary key,
etc.

Check out [migra/issues/29](https://github.com/djrobstep/migra/issues/29) and
[migra/issues/213](https://github.com/djrobstep/migra/issues/213) for more
information.

## On tracking schema changes

Tracking changes in source control can be achieved with just a single
version-controlled SQL file, but in my opinion, it leaves much to be desired:

- If there are incompatible changes between different database versions,
local/dev environments may need to get nuked in order to apply the full
schema again
- Browsing through a series of sequential files to view point-in-time changes
is more ergonomical than `$ git blame`

As a counterpoint, a single file helps maintain a single source-of-truth for
the _current state_ of the schema, which is a desireable trait.

Only if there were Git for databases!

## Appendix: Demostration set-up

1. Spin up two Postgres instances using Docker:

```yml
# docker-compose-local-pg.yml
version: '3.8'
services:
  postgres:
    image: postgres:14
    restart: always
    environment:
      - POSTGRES_USER=postgreslocal
      - POSTGRES_PASSWORD=postgreslocal
      - POSTGRES_DB=postgres
    ports:
      - 5432:5432
    volumes:
      - ./postgres-local-data:/var/lib/postgresql/data

# docker-compose-prod-pg.yml
version: '3.8'
services:
  postgres:
    image: postgres:14
    restart: always
    environment:
      - POSTGRES_USER=postgresprod
      - POSTGRES_PASSWORD=postgresprod
      - POSTGRES_DB=postgres
    ports:
      - 5433:5432
    volumes:
      - ./postgres-prod-data:/var/lib/postgresql/data
```

2. Use example starting schema:
```sql
# 0000.sql
CREATE SCHEMA IF NOT EXISTS app;
CREATE TABLE IF NOT EXISTS app.users (
	username TEXT NOT NULL,
	password TEXT NOT NULL
);
```

3. Apply example schema to both instances:
```bash
$ psql postgresql://postgreslocal:postgreslocal@localhost:5433/postgres -1 -f 0000.sql
CREATE SCHEMA
CREATE TABLE
$ psql postgresql://postgresprod:postgresprod@localhost:5433/postgres -1 -f 0000.sql
CREATE SCHEMA
CREATE TABLE
```

