import Image from "next/image"
import Link from "next/link"

const getColorOfStatus = {
  building: "bg-amber-500 text-amber-800",
  live: "bg-green-500 text-green-800",
  dead: "bg-red-500 text-red-800",
  "open source": "bg-gray-500 text-gray-800",
  proposal: "bg-blue-500 text-blue-800",
  mvp: "border bg-white/10",
}

export default function SectionListOfProjects({ posts }) {
  return (
    <section
      id="products"
      className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-0"
    >
      <div className="col-span-full mx-auto mb-8 mt-32 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <p className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Projects and Products
        </p>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          List of all the featured products or side projects I have
        </p>
      </div>
      {posts?.length ? (
        <>
          {posts.map((post, index) => (
            <Link
              key={"post-" + index}
              href={post.slug}
              className={"col-span-full cursor-pointer "}
            >
              <article
                key={post._id}
                className={
                  "group relative col-span-full flex cursor-pointer flex-col items-center gap-2 space-y-2 py-12 " +
                  (index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")
                }
              >
                <div className=" aspect-video max-w-lg overflow-hidden rounded-xl border  bg-muted ">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={720}
                      height={405}
                      className="transition-transform ease-out group-hover:scale-110"
                      priority={index <= 1}
                    />
                  )}
                </div>
                <div className="inset-x-0 bottom-0 w-full bg-gradient-to-t to-transparent p-6">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 2.99997C18 2.99997 14 3.99997 14 11L14 19C14 20.25 14.756 21.017 16 21L20 21C21.25 21 22 20.25 22 19.028L22 13C22 11.75 21.25 11 20 11C19 11 19 11 19 9.99997L19 8.99997C19 7.99997 20 6.99997 21 6.99997C22 6.99997 22 6.99197 22 5.96897L22 3.99997C22 2.99997 22 2.99997 21 2.99997Z"
                      fill="white"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 2.99997C6 2.99997 2 3.99997 2 11L2 19C2 20.25 2.757 21.017 4 21L8 21C9.25 21 10 20.25 10 19.028L10 13C10 11.75 9.25 11 8 11L7.25 11C7.25 8.74997 7 6.99997 10 6.99997L10 3.99997C10 2.99997 10 2.99997 9 2.99997Z"
                      fill="white"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg> */}
                  <h2 className="text-xl font-extrabold text-white md:text-2xl">
                    {post.description}
                  </h2>

                  {post.title && (
                    <p className="mt-2 flex items-center gap-2 truncate">
                      {" "}
                      {post.title}
                      {" - " + new Date(post.date).getFullYear()}
                      {post.status &&
                        post.status.map((chip, index) => {
                          return (
                            <span
                              key={
                                "status-" + chip + "-" + post._id + "-" + index
                              }
                              className={
                                " max-w-fit truncate rounded-full px-3 py-1 text-sm font-bold uppercase " +
                                (getColorOfStatus[chip] || "")
                              }
                            >
                              {chip}
                            </span>
                          )
                        })}
                    </p>
                  )}
                  {/* {post.date && (
                <p className="text-sm ">
                  {formatDate(post.date)}
                </p>
              )} */}
                </div>
                {/* <Link href={post.slug} className="absolute inset-0">
              <span className="sr-only">View Article</span>
            </Link> */}
              </article>
            </Link>
          ))}

          <div className="col-span-full flex w-full justify-center">
            <Link
              href={"/projects"}
              className="rounded-md bg-white px-4 py-2 font-semibold text-slate-800"
            >
              See More
            </Link>
          </div>
        </>
      ) : (
        <p>No posts published.</p>
      )}
    </section>
  )
}
