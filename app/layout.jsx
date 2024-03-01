import { ThemeProvider } from "@/components/providers/theme"
import Navbar from "@/components/root/Navbar"
import { Toaster } from "@/components/ui/sonner"
import "@/lib/globals.css"

export const metadata = {
  title: "Story Ai",
  description: "",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen relative  ">
        <Toaster />
        <div className="back fixed top-0 right-0 h-full w-full -z-50" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="min-h-[86svh] flex h-max">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
