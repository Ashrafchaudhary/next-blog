import Head from "next/head";
import AllPosts from "../../components/posts/allPosts";
import { getAllPosts } from "../../lib/postUtil";

export default function AllPostsPage({ posts }) {
    return (
        <>
            <Head>
                <title>All Posts</title>
                <meta
                    name="description"
                    content="A list of all programming related tutorial and posts!"
                />
            </Head>
            <AllPosts posts={posts} />
        </>
    );
}

export function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts,
        },
        revalidate: 60,
    };
}
