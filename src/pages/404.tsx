import * as React from 'react'
import type { PageProps } from 'gatsby'
import Layout from '@lekoarts/gatsby-theme-minimal-blog/src/components/layout'

const NotFound = (_props: PageProps) => (
  <Layout>
    <h1>404 - Page Not Found</h1>
    <p>This page does not exist. How did you get here?!</p>
  </Layout>
)

export default NotFound
