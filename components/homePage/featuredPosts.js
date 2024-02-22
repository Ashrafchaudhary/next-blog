import classes from "../../styles/featuredPosts.module.css";
import PostGrid from "../posts/postGrid";

export default function FeaturedPosts(props) {
    return (
        <section className={classes.latest}>
            <h2>Featured Posts</h2>
            <PostGrid posts={props.posts} />
        </section>
    );
}
