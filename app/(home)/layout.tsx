// import MainNavigation from "@/components/main-navigation"
// import { SiteFooter } from "@/components/site-footer"

export default function MarketingLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* <MainNavigation /> */}
      <main className="flex-1">{children}</main>
      {modal}
      {/* <SiteFooter /> */}
    </div>
  )
}
