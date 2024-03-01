import { ThemeProvider } from "@/components/providers/theme"
import { Button } from "@/components/ui/button"
import "@/lib/globals.css"
import { Book, Scroll } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Story Ai",
  description: "",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full py-5 backdrop-blur-xl sticky top-0 border-b  px-5">
           <div className="h-full w-full flex items-center justify-between max-w-6xl mx-auto">
              <h1 className="flex gap-3 text-primary font-bold text-lg">
                <Scroll />
                Story Ai
              </h1>
              <Link href="/">
                <Button>Login</Button>
              </Link>
            </div> 
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
