"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"

export default function ImageCustom({ src, ...props }: ImageProps) {
  const [error, setError] = useState(false)
  return (
    <Image
      src={!error ? src || "" : "/images/placeholder.webp"}
      className="my-8 rounded-md border bg-muted transition-colors"
      {...props}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
      onError={(e) => {
        console.log(e)
        setError(true)
      }}
    />
  )
}
