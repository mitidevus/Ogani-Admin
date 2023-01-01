const categoryService = require("./categoryService");
const qs = require("qs");

exports.list_category = async (req, res) => {
    const filter = req.params.filter;
    const { name: nameFilter } = req.query;
    let currentPage = req.query.page || 1;
    let url_filter = "";

    currentPage = Number(currentPage);

    console.log("currentPage", currentPage);

    console.log("a= " + nameFilter);

    //kt nếu có số page
    if (nameFilter) {
        url_filter = "?name=" + nameFilter;
    }

    let listCategory = [];
    if (!nameFilter) {
        listCategory = await categoryService.getAllCategory(currentPage);
    }
    if (nameFilter) {
        listCategory = await categoryService.filter(nameFilter);
        console.log("listCategory Filter", listCategory);
    }

    const sumPage = listCategory.total_page;

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

    res.render("category/list_category", {
        // url_filter,
        listCategory,
        // listLeftPage,
        // listcurrentPage,
        // listRightPage,
        // originalUrl: `/product/page/1/${qs.stringify(filter)}`,
    });
};
