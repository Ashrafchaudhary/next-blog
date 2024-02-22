import Image from "next/image";
import classes from "../../styles/homePage/hero.module.css";

export default function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/Ashraf.jpeg"
                    alt="An image showing Ashraf"
                    width={500}
                    height={500}
                />
            </div>
            <h1>Hi, I'm Ashraf</h1>
            <p>I blog about web development - especially fullstack</p>
        </section>
    );
}
