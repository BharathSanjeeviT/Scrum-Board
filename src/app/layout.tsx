import './globals.css'
import { Montserrat} from "next/font/google"

const kalam = Montserrat({
    weight : '600',
    subsets : ['latin']
})

export const metadata = {
  title: 'Scrum Board',
  description: 'Bharath Mass',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={kalam.className}>
      {children}
      </body>
    </html>
  )
}
