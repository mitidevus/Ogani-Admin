const orderService = require("../orderService");
const qs = require("qs");

exports.getApiOrders = async (req, res) => {
    // const filter = req.params.filter
    const { name: nameFilter, sort: filter } = req.query;
    console.log("Query: ", req.query);
    let currentPage = req.query.page || 1;

    currentPage = Number(currentPage);
    //kt nếu có số page

    let listOrders;
    if (!nameFilter && !filter) {
        listOrders = await orderService.getAllOrder(currentPage);
        return res.json(listOrders);
    }

    if (filter == "time-new") {
        listOrders = await orderService.getSortedOrderByTime_New(currentPage, nameFilter);
    } else if (filter == "time-old") {
        listOrders = await orderService.getSortedOrderByTime_Old(currentPage, nameFilter);
    } else {
        listOrders = await orderService.filter(currentPage, nameFilter);
    }

    console.log(listOrders)

    return res.json(listOrders);
};
