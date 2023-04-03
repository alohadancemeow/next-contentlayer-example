import Head from "next/head";
import { format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

import Tags from "components/Tags";
import Reactions from "components/Reactions";
import { useUser } from "@clerk/nextjs";

export async function getStaticPaths() {
  const paths: string[] = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post: Post = allPosts.find(
    (post) => post._raw.flattenedPath === params.slug
  );
  return {
    props: {
      post,
    },
  };
}

const PostLayout = ({ post }: { post: Post }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  // if (!isLoaded || !isSignedIn) {
  //   return null;
  // }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-xl py-8 mx-auto">
        <div className="mb-8 text-center">
          <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <h1>{post.title}</h1>

          <Tags tags={post.tags} />
        </div>
        <div
          className="mb-10 prose"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
        <Reactions username={user && user.fullName} />
      </article>
    </>
  );
};

export default PostLayout;
