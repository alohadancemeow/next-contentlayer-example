import Link from "next/link";
import { NextPage } from "next";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

import Tags from "components/Tags";
import Menu from "components/Menu";

import { UserButton } from "@clerk/clerk-react";

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { posts } };
}

export const PostCard = (post: Post) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl">
        <Link href={post.url}>
          <a className="text-blue-700 hover:text-blue-900">{post.title}</a>
        </Link>
      </h2>
      <time dateTime={post.date} className="block mb-2 text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>

      <Tags tags={post.tags} />

      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />
    </div>
  );
};

const Home: NextPage = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="max-w-xl py-8 mx-auto">
      <Menu />
      <UserButton />
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
};

export default Home;
