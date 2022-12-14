---
title: "Managing Postgres Schema Changes With Migra"
date: 2022-11-05T19:00:00+01:00
draft: false
---

Knowing how a schema evolves in a database is important for change tracking, safe rollbacks, and ensuring compatibility with its dependent systems. [`migra`](https://github.com/djrobstep/migra) is a great tool to enable that when working with pure SQL/Postgres, without ORMs or ORM/language-specific migrational tooling (e.g. Alembic, Phinx, Django's ORM etc.)

`migra` generates schema diffs between two different Postgres instances. **i.e.**, on an instance A with the desired schema, and instance B with current schema, `migra` will generate a SQL file that you can apply to instance B that will bring its schema up to parity with A.

```sh
  (current)                       (new)
 ---------------               ---------------
 | Instance $A |               | Instance $A |
 | Schema V0   | -- Change --> | Schema V1   |
 ---------------               ---------------
                                     |
                     |---------------|
                     |
                     v
===============================================
|               $ migra diff                  |
|         Against Instance B (current)        |
===============================================
                     |
                     |
                     v
                 (current)
              -----------------
              |  Instance $B  |
              |  Schema V0    |
              -----------------
                     |
                     |
                     v
===============================================
| Produces an upgrade SQL script to Schema V1 |
|             >> changes.sql                  |
===============================================
                     |
                     |
                     v
===============================================
|           Review and apply to $B            |
|   $ psql postgresql://$B -1 -f changes.sql  |
===============================================
                     |
                     |
                     v
                   (new)
              -----------------
              |  Instance $B  |
              |  Schema V1    |
              -----------------
```

This allows us to make schema tweaks on a local or dev instance, generate a diff against production, review and apply the generated diff to production, and keep the generated diff in source control.

> **P/S**: Tracking changes in source control can be achieved with just a single version-controlled file, but in my opinion, it leaves much to be desired: if there are incompatible changes between different versions, local/dev environments may need to get nuked in order to apply the full schema again, and browsing through a series of sequential files to view point-in-time changes is more ergonomical than `$ git blame`. As a counterpoint, it does maintain a single source-of-truth for the _current state_ of the schema which is a desireable trait. Only if there were Git for databases! Like [PlanetScale](https://planetscale.com)???s [awesome](https://planetscale.com/docs/concepts/planetscale-workflow) [branching](https://planetscale.com/docs/concepts/branching) feature that even works for [data](https://planetscale.com/docs/concepts/data-branching).

---

## Let's see it in action!

`migra` is easy to use:
```sh
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
```sh
$ migra \
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres \
    postgresql://postgresprod:postgresprod@localhost:5433/postgres
```

Now let's make a change to one of the instances:
```sql
ALTER TABLE app.users ADD COLUMN last_login TIMESTAMP NULL;
```

And run `migra` both ways:

```sh
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

Now you can see why it's a ???schema diff??? tool!

You can pipe `migra`'s output to a file, review and/or modify it, and apply the changes when you're satisfied:

```sh
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
$ psql postgresql://postgresprod:postgresprod@localhost:5433/postgres -1 -f 0001.sql
ALTER TABLE

# Run migra again (prod->local)
$ migra --unsafe \
    postgresql://postgresprod:postgresprod@localhost:5433/postgres \
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres
#   => No output, because both instances are on parity :-)

# Run migra again (local->prod)
$ migra --unsafe \
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres \
    postgresql://postgresprod:postgresprod@localhost:5433/postgres
#   => No output, because both instances are on parity :-)
```

(See [Appendix: Demostration set-up](#appendix-demostration-set-up) for how I'm setting up the demo.)

### Why `--unsafe` flag?

Without `--unsafe`, `migra` will not generate destructive statements. We want them because dropping columns/indexes/etc. is a valid schema tweak, so we invoke `migra` with the `--unsafe` flag to intentionally retain destructive commands such as `DROP ...`. (See https://databaseci.com/docs/migra/options)

### Usage warning: Be careful about renames!

Most rename operations are generated as ???drop -> create,??? meaning that it **re-creates** the object instead of renaming it in-place. If you rename a table, column, primary key, etc., it will generate a `DROP ...` statement and `CREATE ...`. (For more information: [migra/issues/29](https://github.com/djrobstep/migra/issues/29), [migra/issues/213](https://github.com/djrobstep/migra/issues/213))

---

## Wrap-up

This is only a short demostration on how you can use `migra` for handling pure SQL migrations. I hope this gives you some idea on how you can incorporate it in your workflow!

I highly recommend checking out the [`migra` documentation](https://databaseci.com/docs/migra) if you're interested in using it.

---

## Appendix: Demostration set-up

Spin up two Postgres instances, using Docker:

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

Use example starting schema:
```sql
# 0000.sql
CREATE SCHEMA IF NOT EXISTS app;
CREATE TABLE IF NOT EXISTS app.users (
	username TEXT NOT NULL,
	password TEXT NOT NULL
);
```

Apply example schema to both instances:
```sh
$ psql postgresql://postgreslocal:postgreslocal@localhost:5433/postgres -1 -f 0000.sql
CREATE SCHEMA
CREATE TABLE
$ psql postgresql://postgresprod:postgresprod@localhost:5433/postgres -1 -f 0000.sql
CREATE SCHEMA
CREATE TABLE
```

