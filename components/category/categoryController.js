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

exports.show_add_category = (req, res) => {
    res.render("category/add_category");
};

exports.add_category = async (req, res) => {
    const { name: cate_name, image: cate_img } = req.body;
    console.log("cate_name", cate_name);
    console.log("cate_img", cate_img);

    try {
        const result = await categoryService.addCategory(cate_name, cate_img);
        console.log("add_category_result", result);
        res.redirect("/category");
    } catch (err) {
        console.log(err);
        res.render("category/add_category", { error: err.message });
    }

    // const { name } = req.body;
    // categoryService.addCategory(name);
    // res.redirect("/category");
};