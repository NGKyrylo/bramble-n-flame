import { FiLink, FiMail, FiGlobe } from 'react-icons/fi';
import styles from './page.module.css';
// import { Link } from 'react-router-dom';
import Link from 'next/link';

export const metadata = {
    title: "Bramble & Flame - Contact Us",
    description: "Handcrafted soy wax candles inspired by Derbyshire. Vegan-friendly, cruelty-free, and made with love. Discover unique decorative candles for your home.",
    robots: "index, follow",
    alternates: {
        canonical: "https://bramble-n-flame.co.uk/contact-us",
    },
};

const ContactUs = () => {
    return (
        <main className={styles.main}>
            <div className={styles.textContainer}>
                {/* <div> */}
                <h1>Contact Us</h1>
                <h2>We'd love to hear from you!</h2>
                <p>Whether you have a question, feedback, or simply want to say hello — we're here and happy to connect.</p>
                <p>Feel free to reach out directly using the details below, or, if you'd prefer, you can fill in our <span className={styles.link}><Link href='/contact'>form</Link></span> and we'll get back to you as soon as possible.</p>
                <p className={styles.note}><strong>Please note:</strong> the form is currently under construction and not yet active — but we're working on it!</p>
                {/* </div> */}
            </div>
            <div className={styles.contactBack}>
                <div className={styles.contackContainer}>
                    <div className={styles.container}>
                        <p>Bramble & Flame</p>
                        <p>Natural, Cruelty-Free Aroma Candles</p>
                        <p>Ashbourne, UK</p>
                    </div>
                    <div className={styles.container}>
                        <p><FiMail color='var(--text-default-primary)' style={{ verticalAlign: 'text-bottom' }} /> Email: <a href="mailto:bramble2flame@gmail.com" target="_blank" className={styles.link}>bramble2flame@gmail.com</a></p>
                        <p><FiGlobe color='var(--text-default-primary)' style={{ verticalAlign: 'text-bottom' }} /> Website: <a href="https://bramble-n-flame.co.uk" target="_blank" className={styles.link}>bramble-n-flame.co.uk</a></p>
                    </div>
                    <div className={styles.container}>
                        <p><FiLink color='var(--text-default-primary)' style={{ verticalAlign: 'text-bottom' }} /> Follow us:</p>
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/people/Bramble-Flame/61572474134133/" target="_blank" className={styles.link}>Facebook</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/bramble_and_flame/" target="_blank" className={styles.link}>Instagram</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default ContactUs;