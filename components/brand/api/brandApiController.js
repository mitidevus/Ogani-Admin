const brandService = require("../brandService");
const qs = require("qs");

exports.getApiBrands = async (req, res) => {
    // const filter = req.params.filter
    const { name: nameFilter } = req.query;
    console.log("Query: ", req.query);
    let currentPage = req.query.page || 1;

    currentPage = Number(currentPage);
    //kt nếu có số page

    let listCategories;
    if (!nameFilter) {
        listCategories = await brandService.getAllBrand(currentPage);
        return res.json(listCategories);
    } else {
        listCategories = await brandService.filter(currentPage, nameFilter);
    }

    return res.json(listBrands);
};
