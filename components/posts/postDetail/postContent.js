import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import classes from "../../../styles/post/postContent.module.css";
import PostHeader from "./postHeader";

export default function PostContent({ post }) {
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRenderers = {
        p(paragraph) {
            const { node } = paragraph;
            if (node.children[0].tagName === "img") {
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${image.properties.src}`}
                            alt={image.properties.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }
            return <p>{paragraph.children}</p>;
        },
        code(code) {
            const { className, children } = code;
            const language = className.replace("language-", "");

            return (
                <SyntaxHighlighter
                    language={language}
                    children={children}
                    style={atomDark}
                />
            );
        },
    };

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={customRenderers}>
                {post.content}
            </ReactMarkdown>
        </article>
    );
}
