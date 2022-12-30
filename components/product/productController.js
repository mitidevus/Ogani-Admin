const productService = require("./productService");
const qs = require("qs");

exports.list_product = async (req, res) => {
    const filter = req.params.filter;
    const { name: nameFilter } = req.query;
    let currentPage = req.query.page || 1;
    let url_filter = "";
    let url_sort = "";

    currentPage = Number(currentPage);

    console.log("currentPage", currentPage);

    console.log("a= " + nameFilter);

    //kt nếu có số page
    if (nameFilter) {
        url_filter = "?name=" + nameFilter;
    }
    if (filter) url_sort = "/sort/" + filter;

    let listProducts = [];
    if (!nameFilter && !filter) {
        listProducts = await productService.getAllProduct(currentPage);
    }
    if (nameFilter) {
        listProducts = await productService.filter(nameFilter);
        console.log("listProducts Filter", listProducts);
    }
    if (filter === "price-asc") {
        if (listProducts.length === 0) listProducts = await productService.getSortedProductByPrice_ASC();
        else listProducts.sort((a, b) => a.price - b.price);
        console.log("haha");
    } else if (filter === "price-desc") {
        if (listProducts.length === 0) listProducts = await productService.getSortedProductByPrice_DESC();
        else listProducts.sort((a, b) => b.price - a.price);
    } else if (filter === "rate-star-asc") {
        if (listProducts.length === 0) listProducts = await productService.getSortedProductByRate_Star_ASC();
        else listProducts.sort((a, b) => a.rate_star - b.rate_star);
    } else if (filter === "rate-star-desc") {
        if (listProducts.length === 0) listProducts = await productService.getSortedProductByRate_Star_DESC();
        else listProducts.sort((a, b) => b.rate_star - a.rate_star);
    }
    const sumPage = listProducts.total_page;
    for (let i = 0; i < listProducts.data.length; i++) {
        listProducts.data[i].price = listProducts.data[i].price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    }

    let listCategory = await productService.getAllCategory();

    let latestProduct = await productService.getSortedProductByRelease_Date_Latest();
    latestProduct = latestProduct.slice(0, 5);

    for (let i = 0; i < listProducts.data.length; i++) {
        listProducts.data[i].price = listProducts.data[i].price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    }

    let listcurrentPage = currentPage;
    let listLeftPage = [];
    let listRightPage = [];

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i < currentPage) {
            if (i > 0) listLeftPage.push(i);
        }
        if (i > currentPage) {
            if (i <= sumPage) listRightPage.push(i);
        }
    }

    console.log("currentPage", currentPage);

    res.render("product/list_products", {
        url_sort,
        url_filter,
        listProducts,
        listCategory,
        listLeftPage,
        listcurrentPage,
        listRightPage,
        latestProduct,
        originalUrl: `/product/page/1/${qs.stringify(filter)}`,
    });
};
