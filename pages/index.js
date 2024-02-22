import Hero from "../components/homePage/hero";
import FeaturedPosts from "../components/homePage/featuredPosts";
import { getFeaturedPosts } from "../lib/postUtil";
import Head from "next/head";

export default function HomePage({ posts }) {
    return (
        <>
            <Head>
                <title>Ashraf' Blog</title>
                <meta
                    name="description"
                    content="I post about programming and web development"
                />
            </Head>
            <Hero />
            <FeaturedPosts posts={posts} />
        </>
    );
}

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts,
        },
        revalidate: 60,
    };
}
