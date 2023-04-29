import Footer from '@/components/footer'
import Nav from '@/components/nav'
import StyledComponentsRegistry from '@/lib/styled-components-registry'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
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
        <Nav />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </Container>
    </StyledComponentsRegistry>
  )
}
