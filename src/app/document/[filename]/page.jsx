// import { useEffect, useState } from "react";
// import styles from "./DocumentViewer.module.css";
// import Loader from "../../components/Loader/Loader";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";
import DocumentViewerClient from "./DocumentViewerClient.jsx";

// Налаштовуємо worker для pdf.js
// pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;  // Розмістіть worker в папці public

export const metadata = {
    title: "Bramble & Flame - Doc",
    description: "Handcrafted soy wax candles inspired by Derbyshire. Vegan-friendly, cruelty-free, and made with love. Discover unique decorative candles for your home.",
    robots: "noindex, nofollow",
};

const DocumentViewer = async ({ params }) => {
    const { filename } = await params;

    return <DocumentViewerClient filename={filename} />;
};

export default DocumentViewer;