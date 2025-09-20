export const loadProduct = async ({ id, setProduct, setIsLoading, signal, toast, router }) => {
    try {
        // const productData = await fetchProduct(id);
        // setProduct(productData);
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            signal,
        });

        const data = await resp.json();

        if (resp.ok) {
            setProduct(data.product);
        }
        else if (resp.status === 404) {
            toast.error(data.message);
            router.push('/404')
        }
        else {
            toast.error(data.message);
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            return;
        }
        console.error("Failed to fetch product:", error);
    }

    setIsLoading(false);
};
