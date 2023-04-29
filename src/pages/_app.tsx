import Footer from '@/components/footer'
import Nav from '@/components/nav'
import StyledComponentsRegistry from '@/lib/styled-components-registry'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentsRegistry>
      <div className="mx-auto max-w-3xl p-3">
        <Nav />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </StyledComponentsRegistry>
  )
}
