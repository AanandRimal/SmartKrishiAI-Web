import { Document, meta } from '@/components/Document'

export const metadata = meta('en')

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document lang="en">{children}</Document>
}
