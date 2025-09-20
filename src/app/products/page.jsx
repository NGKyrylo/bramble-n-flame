import Loader from '@/components/Loader/Loader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Products = dynamic(() => import('./Products'), { ssr: 'false' });
// import Products from "./Products";

export const metadata = {
  title: "Bramble & Flame - Products",
  description: "Handcrafted soy wax candles inspired by Derbyshire. Vegan-friendly, cruelty-free, and made with love. Discover unique decorative candles for your home.",
  robots: "index, follow",
  alternates: {
    canonical: "https://bramble-n-flame.co.uk/products",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Products />
    </Suspense>
  )
}