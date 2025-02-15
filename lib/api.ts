export async function api(url: string) {
  const res = await fetch(process.env.API_URL + "/items" + url, {
    next: { tags: ["collection"] },
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }

  return res.json()
}
