import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext.jsx";
import { toast } from 'react-toastify';
import { useAbortController } from "@/hooks/useAbortController.jsx";
import { loadProduct } from './scripts.jsx';
import { useRouter } from "next/navigation.js";

export const useProductLogic = ({ id }) => {
    const [initialLoad, setInitialLoad] = useState(true);
    const router = useRouter();
    const { addToCart, isInCart } = useCart();
    // const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const signal = useAbortController();
    const [selectedOption, setSelectedOption] = useState(1);


    const options = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 9, label: "9" },
        { value: 10, label: "10" },
    ];

    let isBtnActive = true;
    if (isInCart(id)) {
        isBtnActive = false;
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setInitialLoad(false);
        }, 500); // 0.5s
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        loadProduct({ id, setProduct, setIsLoading, signal, toast, router });
    }, [id]);

    const handleAddToBasket = () => {
        addToCart({
            id: id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            qty: selectedOption,
            oldPrice: product.oldPrice || null,
            promoLabel: product.promoLabel || null,
            promoBadge: product.promoBadge || null,
        });
    };

    return {
        initialLoad,
        product,
        isLoading,
        selectedOption,
        setSelectedOption,
        options,
        isBtnActive,
        handleAddToBasket,
    }
}












































// const ProductImages = ({ images = [], id, isInWishList }) => {
//   const width = useWindowWidth();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [hovered, setHovered] = useState(false);
//   const [whished, setWhished] = useState(isInWishList);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
//   };

//   const removeFromWishList = async (id) => {
//     // romove from bd
//     setWhished(false);
//   }

//   const addToWishList = async (id) => {
//     // add to bd
//     setWhished(true);
//   }

//   const settings = {
//     dots: width <= 768,
//     arrows: width > 768,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <RightArrowIcon className={styles.arrowLeft} />,
//     prevArrow: <RightArrowIcon className={styles.arrowRight} />,
//     // swipe: width <= 768,
//   };

//   const [sliderKey, setSliderKey] = useState(0);

//   useEffect(() => {
//     if (images.length) {
//       setSliderKey((k) => k + 1);
//     }
//   }, [images]);

//   return (
//     <div className={styles.productImages}>
//       <div className={styles.imgContainer}>
//         <Slider key={sliderKey} {...settings} className={styles.slickSlider}>
//           {images.map((image, index) => (
//             <div key={index}>
//               {/* <ProductImg src={image} size="fill" alt="Image" /> */}
//               <img src={image || defaultProductImg} alt="Image" className={styles.img} />
//             </div>
//           ))}
//         </Slider>
//       </div>

//       <div className={styles.heartButton} onClick={() => { whished ? removeFromWishList(id) : addToWishList(id) }}>
//         {whished ? (
//           <HeartIconFilled />
//         ) : (
//           <HeartIcon />
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div
//       className={styles.productImages}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <ProductImg src={images[currentIndex]} size="fill" alt="Image" />

//       <div className={styles.heartButton} onClick={() => { whished ? removeFromWishList(id) : addToWishList(id) }}>
//         {whished ? (
//           <HeartIconFilled />
//         ) : (
//           <HeartIcon />
//         )}
//       </div>

//       {hovered && images.length > 1 && (
//         <>
//           <div className={styles.arrowLeft} onClick={handlePrev}>
//             <RightArrowIcon />
//           </div>
//           <div className={styles.arrowRight} onClick={handleNext}>
//             <RightArrowIcon />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };