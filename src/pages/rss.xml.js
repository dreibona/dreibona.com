import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { config } from "@/config/config";

export async function GET(context) {
  const posts = await getCollection("posts");

  return rss({
    title: config.meta.title,
    description: config.meta.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: post.data.customData,
      link: `/lab/${post.id}/`,
    })),
  });
}
