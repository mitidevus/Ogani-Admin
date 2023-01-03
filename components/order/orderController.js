const orderService = require("./orderService");
const qs = require("qs");

exports.list_orders = async (req, res) => {
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
        listOrders = await orderService.getAllOrder(currentPage);
    }
    if (nameFilter) {
        listOrders = await orderService.filter(nameFilter);
        console.log("listOrders Filter", listOrders);
    }

    if (filter === "default") {
        listOrders = await orderService.getAllOrder(currentPage);
    } else if (filter === "time-new") {
        listOrders = await orderService.getAllOrderAccepted(currentPage);
    } else if (filter === "time-old") {
        listOrders = await orderService.getAllOrderCancelled(currentPage);
    }

    const sumPage = listOrders.total_page;

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

    res.render("order/list_order", {
        url_sort,
        url_filter,
        listOrders,
        listLeftPage,
        listcurrentPage,
        listRightPage,
        sumPage,
    });
};

// exports.list_orders = async (req, res) => {
//     res.render("order/list_order");
// };

exports.accept_order = async (req, res) => {
    const id = req.params.id;
    const order = await orderService.getOrderById(id);
    order.status = "Accepted";
    await orderService.updateOrder(order);
    res.redirect("/order");
};

exports.cancel_order = async (req, res) => {
    const id = req.params.id;
    const order = await orderService.getOrderById(id);
    order.status = "Cancelled";
    await orderService.updateOrder(order);
    res.redirect("/order");
};
