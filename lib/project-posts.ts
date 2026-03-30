import { allPosts, type Post } from "contentlayer/generated"
import { compareDesc } from "date-fns"

interface ProjectParams {
  slug?: string[]
}

export function getPublishedProjectPosts(): Post[] {
  return allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
}

export function getProjectPostFromParams(
  params: ProjectParams
): Post | undefined {
  const slug = params?.slug?.join("/")

  return allPosts.find((post) => post.slugAsParams === slug)
}

export function getProjectStaticParams(): Array<{ slug: string[] }> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}
