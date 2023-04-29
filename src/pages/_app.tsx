import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import StyledComponentsRegistry from '@/lib/styled-components-registry'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
  padding: 1px 25px;
  max-width: 960px;
`

const Main = styled.main`
  margin: 0 auto;
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentsRegistry>
      <Container>
        <Main>
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </Main>
      </Container>
    </StyledComponentsRegistry>
  )
}
