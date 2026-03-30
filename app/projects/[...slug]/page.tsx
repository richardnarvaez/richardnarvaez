import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getProjectPostFromParams,
  getProjectStaticParams,
} from "@/lib/project-posts"
import { absoluteUrl } from "@/lib/utils"
import ProjectDetail from "@/components/projects/project-detail"

import "@/styles/mdx.css"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = getProjectPostFromParams(params)

  if (!post) {
    return {}
  }

  const url = process.env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)

  ogUrl.searchParams.set("heading", post.title)
  ogUrl.searchParams.set("type", "PRODUCT")
  ogUrl.searchParams.set("mode", "light")
  ogUrl.searchParams.set("status", post.status ? post.status[0] : "LIVE")

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      // images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return getProjectStaticParams()
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getProjectPostFromParams(params)

  if (!post) {
    notFound()
  }

  return <ProjectDetail post={post} />
}
