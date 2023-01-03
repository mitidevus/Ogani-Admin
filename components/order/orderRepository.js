const db = require("../../db");
const { ITEM_PER_PAGE_PRODUCT } = require("../../constant/index");

exports.countAllOrders = async () => {
    let data = await db.connection.execute(`select count(*) from orders`);
    return data[0][0]["count(*)"];
};

exports.getAllOrder = async (page = 1) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id limit ${ITEM_PER_PAGE_PRODUCT} offset ${(page - 1) * ITEM_PER_PAGE_PRODUCT}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };
    return result;
};

exports.getAllOrderAccepted = async (page = 1) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id and status = "Accepted" limit ${ITEM_PER_PAGE_PRODUCT} offset ${(page - 1) * ITEM_PER_PAGE_PRODUCT}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };
    return result;
}

exports.getAllOrderCancelled = async (page = 1) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id and status = "Cancelled" limit ${ITEM_PER_PAGE_PRODUCT} offset ${(page - 1) * ITEM_PER_PAGE_PRODUCT}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };
    return result;
}

exports.getAllOrderPending = async (page = 1) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id and status = "Pending" limit ${ITEM_PER_PAGE_PRODUCT} offset ${(page - 1) * ITEM_PER_PAGE_PRODUCT}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };
    return result;
}

exports.getOrderById = async (id) => {
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id and id = ${id}`
    );
    return data[0];
}

exports.getOrderDetailById = async (id) => {
    let data = await db.connection.execute(
        `select * from order_detail where order_Id = ${id}`
    );
    return data[0];
}

exports.getSortedOrderByTime_New = async (page = 1, nameFilter) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id order by orders.release_Date desc limit ${ITEM_PER_PAGE_PRODUCT} offset ${(page - 1) * ITEM_PER_PAGE_PRODUCT}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };
    return result;
}

exports.getSortedOrderByTime_Old = async (page = 1, nameFilter) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id order by orders.release_Date asc limit ${ITEM_PER_PAGE_PRODUCT} offset ${(page - 1) * ITEM_PER_PAGE_PRODUCT}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };
    return result;
}

exports.filter = async (page = 1, nameFilter) => {
    let count = await this.countAllOrders();
    let data = await db.connection.execute(
        `select orders.*, user.fullname, user.address, user.phone from orders, user where orders.user_Id = user.user_Id and user.fullname like "%${nameFilter}%" limit ${ITEM_PER_PAGE_PRODUCT} offset ${(page - 1) * ITEM_PER_PAGE_PRODUCT}`
    );

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_PRODUCT),
        item_per_page: ITEM_PER_PAGE_PRODUCT,
    };
    return result;
}