import styles from './page.module.css';

export const metadata = {
    title: "Bramble & Flame - About Us",
    description: "Handcrafted soy wax candles inspired by Derbyshire. Vegan-friendly, cruelty-free, and made with love. Discover unique decorative candles for your home.",
    robots: "index, follow",
    alternates: {
        canonical: "https://bramble-n-flame.co.uk/about-us",
    },
};

const AboutUs = () => {
    return (
        <main className={styles.main}>
            <div className={styles.block}>
                <div className={styles.textContainer}>
                    <h1>About Us</h1>
                    <p>At Bramble&Flame, we believe that scent has the power to tell stories — quiet, comforting stories that live in the corners of memory.</p>
                </div>
                <div className={styles.imgContainer}>
                    <img src='/images/about-us-1.png' />
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.textContainer}>
                    <p>We are a British brand rooted in the rolling hills of Derbyshire, inspired by nature, seasons, and the calm simplicity of handmade beauty. Our candles are more than just objects — they are moments in time, captured through fragrance and crafted with intention.</p>
                </div>
                <div className={styles.imgContainer}>
                    <img src='/images/about-us-2.png' />
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.textContainer}>
                    <p>Each piece is made using natural, eco-conscious materials: soy wax, plant-based oils, cotton and wooden wicks, and recyclable kraft packaging. We care deeply about how things are made — and why. That’s why every candle is thoughtfully designed to bring a gentle glow into your space, without harm to the planet.</p>
                </div>
                <div className={styles.imgContainer}>
                    <img src='/images/about-us-3.png' />
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.textContainer}>
                    <p>Our aesthetic is earthy and comforting, a reflection of the landscapes that surround us and the stillness we seek to share. From scent to design, from wax to wrapping, everything we do is led by the idea of coziness, honesty, and quiet charm.</p>
                </div>
                <div className={styles.imgContainer}>
                    <img src='/images/about-us-4.png' />
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.textContainer}>
                    <p>Bramble&Flame is not just about candles.
                        It’s about creating a feeling — one you’ll want to return to, again and again.</p>
                </div>
            </div>
        </main>
    )
}

export default AboutUs;