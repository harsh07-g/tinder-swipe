
'use client'
import './globals.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <nav style={{ display: 'flex', gap: '16px', padding: '20px', background:' #ff9a9e' }}>
            <Link href="/">Home</Link>
            <Link href="/liked">Liked Users</Link>
          </nav>
          <main style={{ padding: '16px' }}>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

