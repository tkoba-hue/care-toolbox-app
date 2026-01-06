import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'DisCAREvery',
    description: 'Care Tool Box Application',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    )
}
