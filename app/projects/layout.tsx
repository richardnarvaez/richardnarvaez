import { SiteFooter } from "@/components/site-footer"

interface ProjectsLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function ProjectsLayout({
  children,
  modal,
}: ProjectsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <main className="flex-1">{children}</main>
      {modal}
      <SiteFooter />
    </div>
  )
}
