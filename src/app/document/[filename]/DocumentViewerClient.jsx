"use client";
import { useEffect, useState } from "react";
import styles from "./DocumentViewer.module.css";
import Loader from "@/components/Loader/Loader";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";

// Налаштовуємо worker для pdf.js
// pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;  // Розмістіть worker в папці public

const DocumentViewerClient = ({ filename }) => {
    const [pdf, setPdf] = useState(null);
    const [pages, setPages] = useState([]);

    // Завантажуємо PDF після зміни файлу
    useEffect(() => {
        const fetchPdf = async () => {
            const pdfjsLib = await import("pdfjs-dist/build/pdf");
            // pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
            const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
            pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
            try {
                // Завантажуємо документ
                const pdfFile = await pdfjsLib.getDocument(`/documents/${filename}.pdf`).promise;
                setPdf(pdfFile);

                // Рендеримо сторінки
                const pagePromises = [];
                for (let i = 1; i <= pdfFile.numPages; i++) {
                    pagePromises.push(renderPage(pdfFile, i));
                }

                // Отримуємо усі сторінки
                const pagesContent = await Promise.all(pagePromises);
                setPages(pagesContent);
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        };

        fetchPdf();
    }, [filename]);

    // Рендеримо кожну сторінку PDF
    const renderPage = async (pdf, pageNum) => {
        const page = await pdf.getPage(pageNum);
        const scale = 1.5;  // Масштаб сторінки

        // Створюємо viewport
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Налаштовуємо canvas для рендерингу
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Рендеримо сторінку на canvas
        await page.render({
            canvasContext: context,
            viewport: viewport,
        }).promise;

        // Перетворюємо canvas в зображення для HTML
        return canvas.toDataURL();
    };

    return (
        <main className={styles.main}>
            {pdf ? (
                <div>
                    {pages.map((pageSrc, index) => (
                        <div key={index} className="page">
                            <img src={pageSrc} alt={`Page ${index + 1}`} />
                        </div>
                    ))}
                </div>
            ) : (
                <Loader />
            )}
        </main>
    );
}

export default DocumentViewerClient;