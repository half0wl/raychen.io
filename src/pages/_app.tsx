import StyledComponentsRegistry from '@/lib/styled-components-registry'
import Link from '@/components/link'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentsRegistry>
      <div className="flex flex-col space-y-12">
        <aside className="flex items-center justify-between border-b border-slate-700 py-3">
          <span>
            <Link className="text-xl font-extrabold tracking-tighter" href="/">
              raychen.io
            </Link>
          </span>
          <ul className="flex flex-row items-center space-x-4">
            <li>
              <Link href="mailto:ray@raychen.io">e-mail</Link>
            </li>
            <li>
              <Link href="https://github.com/half0wl">github</Link>
            </li>
            <li>
              <Link href="https://twitter.com/rayofbytes">twitter</Link>
            </li>
          </ul>
        </aside>
        <main className="">
          <Component {...pageProps} />
        </main>
        <footer className="pb-4">
          <p className="text-xs font-extralight">
            &copy; Ray Chen, 2024. All rights reserved.
          </p>
        </footer>
      </div>
    </StyledComponentsRegistry>
  )
}
