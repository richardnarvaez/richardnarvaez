import Image from "next/image"
import Link from "next/link"
import { allAuthors, type Post } from "contentlayer/generated"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import GoBackButton from "@/components/GoBackButton"
import { Icons } from "@/components/icons"
import { Mdx } from "@/components/mdx-components"

interface ProjectDetailProps {
  post: Post
  variant?: "page" | "drawer"
}

export default function ProjectDetail({
  post,
  variant = "page",
}: ProjectDetailProps) {
  const isDrawer = variant === "drawer"
  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <article
      className={cn(
        "relative",
        isDrawer
          ? "mx-auto max-w-3xl pb-2"
          : "container max-w-3xl py-6 lg:py-10"
      )}
    >
      {!isDrawer ? <GoBackButton /> : null}

      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1
          className={cn(
            "mt-2 inline-block font-heading leading-tight",
            isDrawer ? "text-3xl lg:text-4xl" : "text-4xl lg:text-5xl"
          )}
        >
          {post.title}
        </h1>
        {authors?.length ? (
          <div className="mt-4 flex flex-wrap gap-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className={cn(
            "rounded-md border bg-muted transition-colors",
            isDrawer ? "my-6" : "my-8"
          )}
          priority
        />
      )}

      <Mdx code={post.body.code} />

      {isDrawer ? (
        <div className="mt-8 border-t pt-4">
          <a
            href={post.slug}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Open standalone page
          </a>
        </div>
      ) : (
        <>
          <hr className="mt-12" />
          <div className="flex justify-center py-6 lg:py-10">
            <Link
              href="/projects"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Icons.chevronLeft className="mr-2 size-4" />
              See all posts
            </Link>
          </div>
        </>
      )}
    </article>
  )
}
