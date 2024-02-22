import Head from "next/head";
import PostContent from "../../components/posts/postDetail/postContent";
import { getPostData, getPostsFiles } from "../../lib/postUtil";

export default function PostDetailPage({ post }) {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt} />
            </Head>
            <PostContent post={post} />
        </>
    );
}

export function getStaticProps({ params }) {
    const { slug } = params;
    const postData = getPostData(slug);

    return {
        props: {
            post: postData,
        },
        revalidate: 600,
    };
}

export function getStaticPaths() {
    const postFileNames = getPostsFiles();

    const slug = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

    return {
        paths: slug.map((slug) => ({ params: { slug: slug } })),
        fallback: false,
    };
}
