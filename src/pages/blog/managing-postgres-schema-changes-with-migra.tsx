import Article from '@/components/article'
import CodeBlock from '@/components/code-block'
import H2 from '@/components/h2'
import Link from 'next/link'

const _: React.FC = () => {
  return (
    <Article articleKey="postgres-migra">
      <p>
        <code>
          <Link href="https://github.com/djrobstep/migra">`migra`</Link>
        </code>{' '}
        is a great tool for tracking changes in a Postgres schema without
        relying on ORMs. It generates schema diffs between two different
        Postgres instances. <em>i.e.</em>, on an instance A with the desired
        schema, and instance B with current schema, <code>`migra`</code> will
        generate a SQL file that you can apply to instance B that will bring its
        schema up to parity with A.
      </p>
      <p>Here's a diagram to help visualize this:</p>
      <CodeBlock
        lang="text"
        code={`.            (current)                       (new)
.         ---------------               ---------------
.         | Instance $A |               | Instance $A |
.         | Schema V0   | -- Change --> | Schema V1   |
.         ---------------               ---------------
.                                             |
.                             |---------------|
.                             |
.                             v
.        ===============================================
.        |               $ migra diff                  |
.        |         Against Instance B (current)        |
.        ===============================================
.                             |
.                             |
.                             v
.                         (current)
.                      -----------------
.                      |  Instance $B  |
.                      |  Schema V0    |
.                      -----------------
.                             |
.                             |
.                             v
.        ===============================================
.        | Produces an upgrade SQL script to Schema V1 |
.        |             >> changes.sql                  |
.        ===============================================
.                             |
.                             |
.                             v
.        ===============================================
.        |           Review and apply to $B            |
.        |   $ psql postgresql://$B -1 -f changes.sql  |
.        ===============================================
.                             |
.                             |
.                             v
.                           (new)
.                      -----------------
.                      |  Instance $B  |
.                      |  Schema V1    |
.                      -----------------`}
      />
      <p>
        This gives us an easy workflow for testing schema changes locally before
        applying them to production.
      </p>

      {/* --- */}
      <H2 id="example">Example</H2>
      <p>
        <code>`migra`</code> is easy to use:
      </p>
      <CodeBlock
        lang="bash"
        code={`# $1 = Instance with current schema
# $2 = Instance with desired schema
# \`changes.sql\` => the diff between $1 and $2
$ migra postgresql://$1 postgresql://$2 > changes.sql`}
      />
      <p>
        Let's assume that both instances (<code>`$1`</code> and{' '}
        <code>`$2`</code>) have this schema:
      </p>
      <CodeBlock
        lang="sql"
        code={`# 0000.sql
CREATE SCHEMA IF NOT EXISTS app;
CREATE TABLE IF NOT EXISTS app.users (
	username TEXT NOT NULL,
	password TEXT NOT NULL
);`}
      />
      <p>
        Since both instances have the same schema, running <code>`migra`</code>{' '}
        generates nothing:
      </p>
      <CodeBlock
        lang="bash"
        code={`$ migra \\
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres \\
    postgresql://postgresprod:postgresprod@localhost:5433/postgres
#   => No output, because both instances are at parity`}
      />
      <p>Now let's make a change to one of the instances:</p>
      <CodeBlock
        lang="sql"
        code={`ALTER TABLE app.users ADD COLUMN last_login TIMESTAMP NULL;`}
      />
      <p>
        And run <code>`migra`</code> both ways:
      </p>
      <CodeBlock
        lang="bash"
        code={`$ migra --unsafe \\
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres \\
    postgresql://postgresprod:postgresprod@localhost:5433/postgres
alter table "app"."users" drop column "last_login";

# Switch the connection string around:
$ migra --unsafe \\
    postgresql://postgresprod:postgresprod@localhost:5433/postgres \\
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres
alter table "app"."users" add column "last_login" timestamp without time zone;`}
      />
      <p>
        Now you can see why it's a "schema diff" tool!
        <br />
        <br />
        You can pipe the output to a file for review and modifications, and
        apply the changes when you're satisfied:
      </p>
      <CodeBlock
        lang="bash"
        code={`# Output to file
$ migra --unsafe \\
    postgresql://postgresprod:postgresprod@localhost:5433/postgres \\
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres \\
    > 0001.sql
alter table "app"."users" add column "last_login" timestamp without time zone;

# Review
$ cat 0001.sql
alter table "app"."users" add column "last_login" timestamp without time zone;

# Apply
$ psql postgresql://postgresprod:postgresprod@localhost:5433/postgres \\
    -1 -f 0001.sql
ALTER TABLE

# Run migra again (prod->local)
$ migra --unsafe \\
    postgresql://postgresprod:postgresprod@localhost:5433/postgres \\
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres
#   => No output, because both instances are at parity

# Run migra again (local->prod)
$ migra --unsafe \\
    postgresql://postgreslocal:postgreslocal@localhost:5432/postgres \\
    postgresql://postgresprod:postgresprod@localhost:5433/postgres
#   => No output, because both instances are at parity`}
      />

      <p>
        (See <Link href="#appendix">Appendix: Demostration set-up</Link> for the
        demo set-up.)
      </p>

      {/* --- */}
      <H2 id="why-unsafe">
        Why <code>`--unsafe`</code> flag?
      </H2>
      <p>
        Without <code>`--unsafe`</code>, <code>`migra`</code> will not generate
        destructive SQL statements such as <code>`DROP ...`</code>. We want them
        because dropping stuff is a valid schema tweak, so we invoke{' '}
        <code>`migra`</code> with the <code>`--unsafe`</code> flag to
        intentionally retain destructive commands. For more information, check
        out{' '}
        <Link href="https://databaseci.com/docs/migra/options">
          https://databaseci.com/docs/migra/options
        </Link>
        .
      </p>

      {/* --- */}
      <H2 id="warning-renames">Usage warning: Be careful about renames!</H2>
      <p>
        Most rename operations are generated as "drop {'->'} create," meaning
        that it <strong>re-creates</strong> the object instead of renaming it
        in-place. If you rename a table, column, primary key, etc., it will
        generate a <code>`DROP ...`</code> statement and{' '}
        <code>`CREATE ...`</code>. Check out{' '}
        <Link href="https://github.com/djrobstep/migra/issues/29">
          migra/issues/29
        </Link>{' '}
        &{' '}
        <Link href="https://github.com/djrobstep/migra/issues/213">
          migra/issues/213
        </Link>{' '}
        for more information.
      </p>

      {/* --- */}
      <H2 id="wrap-up">Wrap-up</H2>
      <p>
        This is a short demostration on how you can use <code>`migra`</code> for
        handling pure SQL migrations. I hope this gives you some idea on how you
        can incorporate it in your workflow!
      </p>

      {/* --- */}
      <H2 id="appendix">Appendix: Demostration set-up</H2>
      <p>1. Spin up two Postgres instances using Docker:</p>
      <CodeBlock
        lang="yml"
        code={`# docker-compose-local-pg.yml
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
      - ./postgres-prod-data:/var/lib/postgresql/data`}
      />
      <p>2. Use example starting schema:</p>
      <CodeBlock
        lang="sql"
        code={`# 0000.sql
CREATE SCHEMA IF NOT EXISTS app;
CREATE TABLE IF NOT EXISTS app.users (
	username TEXT NOT NULL,
	password TEXT NOT NULL
);`}
      />
      <p>3. Apply example schema to both instances:</p>
      <CodeBlock
        lang="bash"
        code={`$ psql postgresql://postgreslocal:postgreslocal@localhost:5433/postgres -1 -f 0000.sql
CREATE SCHEMA
CREATE TABLE
$ psql postgresql://postgresprod:postgresprod@localhost:5433/postgres -1 -f 0000.sql
CREATE SCHEMA
CREATE TABLE`}
      />
    </Article>
  )
}

export default _
