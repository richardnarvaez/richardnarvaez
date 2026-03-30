import { notFound } from "next/navigation"

import { getProjectPostFromParams } from "@/lib/project-posts"
import ProjectDetail from "@/components/projects/project-detail"
import ProjectRouteDrawer from "@/components/projects/project-route-drawer"

import "@/styles/mdx.css"

interface ProjectModalPageProps {
  params: {
    slug: string[]
  }
}

export default function ProjectModalPage({ params }: ProjectModalPageProps) {
  const post = getProjectPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <ProjectRouteDrawer title={post.title} description={post.description}>
      <ProjectDetail post={post} variant="drawer" />
    </ProjectRouteDrawer>
  )
}
