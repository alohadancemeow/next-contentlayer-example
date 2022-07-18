import Head from "next/head";
import { allPosts, Post } from "contentlayer/generated";

import { PostCard } from "pages";
import { useRouter } from "next/router";

export async function getStaticPaths() {
    const paths: string[] = []

    allPosts.forEach((post) =>
        post.tags.forEach(tag => (
            paths.push(`/tags/${tag.split(" ").join('-')}`)
        ))
    )
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const posts: Post[] = []

    allPosts.forEach(post => (
        post.tags.forEach(tag => {
            if (tag.split(' ').join('-') === params.slug) {
                posts.push(post)
            }
        })
    ))
    return {
        props: {
            posts,
        },
    };
}

const PostLayout = ({ posts }: { posts: Post[] }) => {

    const { query, asPath } = useRouter()
    // console.log(query);

    return (
        <>
            <Head>
                <title>{`Tag: ${asPath}`}</title>
            </Head>

            <div className="max-w-xl py-8 mx-auto">
                <div className="my-5">
                    {`Tag: ${query.slug}`}
                </div>
                <div >
                    {posts.map((post, idx) => (
                        <PostCard key={idx} {...post} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default PostLayout;
