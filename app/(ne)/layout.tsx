import { Document, meta } from '@/components/Document'

export const metadata = meta('ne')

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document lang="ne">{children}</Document>
}
