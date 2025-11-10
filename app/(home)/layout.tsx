import MainNavigation from "@/components/main-navigation"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* <MainNavigation /> */}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
