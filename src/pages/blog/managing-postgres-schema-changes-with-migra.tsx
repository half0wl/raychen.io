import Article from '@/components/article'
import Link from 'next/link'
import Code from '@/components/code'

const _: React.FC = () => {
  return (
    <Article
      title="Managing Postgres schema changes with Migra"
      description="blah"
      slug="/blog/managing-postgres-schema-changes-with-migra"
      publishedAt={new Date(2023, 2, 20)}
    >
      <p>
        <code>
          <Link href="https://github.com/djrobstep/migra">`migra`</Link>
        </code>{' '}
        is a great tool for tracking changes in a Postgres schema without
        relying on ORMs. It generates schema diffs between two different
        Postgres instances. **i.e.**, on an instance A with the desired schema,
        and instance B with current schema, `migra` will generate a SQL file
        that you can apply to instance B that will bring its schema up to parity
        with A.
      </p>
      <p>Here's a diagram to help visualize this:</p>
      <Code
        lang="text"
        code={`
.               (current)                       (new)
.            ---------------               ---------------
.            | Instance $A |               | Instance $A |
.            | Schema V0   | -- Change --> | Schema V1   |
.            ---------------               ---------------
.                                                |
.                                |---------------|
.                                |
.                                v
.           ===============================================
.           |               $ migra diff                  |
.           |         Against Instance B (current)        |
.           ===============================================
.                                |
.                                |
.                                v
.                            (current)
.                         -----------------
.                         |  Instance $B  |
.                         |  Schema V0    |
.                         -----------------
.                                |
.                                |
.                                v
.           ===============================================
.           | Produces an upgrade SQL script to Schema V1 |
.           |             >> changes.sql                  |
.           ===============================================
.                                |
.                                |
.                                v
.           ===============================================
.           |           Review and apply to $B            |
.           |   $ psql postgresql://$B -1 -f changes.sql  |
.           ===============================================
.                                |
.                                |
.                                v
.                              (new)
.                         -----------------
.                         |  Instance $B  |
.                         |  Schema V1    |
.                         -----------------
        `}
      />
      <p>
        This allows us to make schema tweaks on a local or dev instance,
        generate a diff against production, review and apply the generated diff
        to production, and keep the generated diff in source control.
      </p>
    </Article>
  )
}

export default _
