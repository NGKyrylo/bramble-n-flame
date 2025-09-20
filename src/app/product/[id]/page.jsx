import Product from "./Product";
import he from 'he';

export async function generateMetadata({ params }) {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const { id } = await params;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch product. Status: ${res.status}`);
        }

        const data = await res.json();
        const product = data.product;

        const title = `Bramble & Flame – ${product.name}${product.type ? ` | ${product.type}` : ''}`;

        const rawDescription = product.description || "";

        const withoutTags = rawDescription.replace(/<[^>]+>/g, '');
        const decoded = he.decode(withoutTags);

        const maxLength = 160;
        const cleanDescription = decoded.length > maxLength
            ? decoded.slice(0, maxLength).trimEnd() + '...'
            : decoded;

        return {
            title: title,
            description: cleanDescription,
            robots: "index, follow",
            alternates: {
                canonical: `https://bramble-n-flame.co.uk/product/${id}`,
            },
            openGraph: {
                title,
                description: cleanDescription,
                images: product.images ? [product.images] : [],
            },
        };
    } catch (error) {
        console.error('generateMetadata error:', error);

        // Фолбек metadata на випадок помилки
        return {
            title: 'Bramble & Flame',
            description: 'Handcrafted soy wax candles inspired by Derbyshire.',
            robots: "index, follow",
        };
    }
}

export default async function Page({ params }) {
    const { id } = await params;
    return <Product id={id} />
}