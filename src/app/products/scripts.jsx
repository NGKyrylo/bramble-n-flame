export const fetchProducts = async ({ search, page, selectedStandalone, selectedSubcategory, selectedOption, selectedCollections, selectedProductTypes, signal, setProducts, setTotalPages, router }) => {
    setProducts();
    const sellectedCategories = [...selectedSubcategory, ...selectedStandalone];
    // setSearchParams({
    //     page,
    //     search,
    //     sort: selectedOption,
    //     collections: selectedCollections.length > 0 ? selectedCollections.join(',') : '',
    //     types: selectedProductTypes.length > 0 ? selectedProductTypes.join(',') : '',
    //     categoriesSub: selectedSubcategory.length > 0 ? selectedSubcategory.join(',') : '',
    //     categoriesStan: selectedStandalone.length > 0 ? selectedStandalone.join(',') : '',
    // });
    
    // Оновлюємо URL пошуковими параметрами
    const params = new URLSearchParams();

    if (page) params.set("page", page);
    if (search) params.set("search", search);
    if (selectedOption) params.set("sort", selectedOption);
    if (selectedCollections.length > 0) params.set("collections", selectedCollections.join(","));
    if (selectedProductTypes.length > 0) params.set("types", selectedProductTypes.join(","));
    if (selectedSubcategory.length > 0) params.set("categoriesSub", selectedSubcategory.join(","));
    if (selectedStandalone.length > 0) params.set("categoriesStan", selectedStandalone.join(","));

    // ⚠️ Це працює ТІЛЬКИ у "use client" компоненті
    router.push(`?${params.toString()}`);

    window.scrollTo(0, 0);

    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/list/${20}/${page}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                searchTerm: search,
                sortBy: selectedOption,
                types: selectedProductTypes,
                collections: selectedCollections,
                categories: sellectedCategories,
            }),
            signal,
        })

        if (resp.ok) {
            const data = await resp.json();
            setProducts(data.products);
            setTotalPages(data.numberOfPages);
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error fetching products: ', error);
        }
    }
};

export const fetchParams = async ({ setLoading, setStandaloneCategories, setParentCategories, setCollections, setProductTypes, signal }) => {
    setLoading(true);
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/filters/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            signal,
        });

        if (resp.ok) {
            const data = await resp.json();

            setStandaloneCategories(data.categories.standaloneCategories);
            setParentCategories(data.categories.parentCategories);
            setCollections(data.collections);
            setProductTypes(data.types);
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error fetching filters: ', error);
        }
    } finally {
        setLoading(false);
    }
}