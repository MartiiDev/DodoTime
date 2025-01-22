import "./globals.css"
import { Providers } from "./provider"

export const metadata = {
  title: "DodoTime - Sleep Cycle Calculator",
  description: "Find the best time to sleep based on your wake-up time",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}