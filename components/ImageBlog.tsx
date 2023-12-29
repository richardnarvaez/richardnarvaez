"use client"
import Image from "next/image"

export default function ImageBlog(props: any) {
  return (
    <Image
      src={""}
      alt="Imagen Blog"
      className="my-8 rounded-md border bg-muted transition-colors"
      {...props}
    />
  )
}
