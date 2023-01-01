const db = require("../../db");
const { ITEM_PER_PAGE_CATEGORY } = require("../../constant/index");

exports.countAllCategory = async () => {
    let count = await db.connection.execute(`select count(*) from category`);
    return count[0][0]["count(*)"];
};

exports.getAllCategory = async (page = 1) => {
    // const result = await db.connection.execute('select * from Product');
    // return result[0];

    let count = await this.countAllCategory();
    const data = await db.connection.execute(
        `select * from category limit ${ITEM_PER_PAGE_CATEGORY} offset ${(Number(page) - 1) * ITEM_PER_PAGE_CATEGORY}`
    );

    let productsCount = await db.connection.execute(
        `select count(*) from category, product where category.category_Id = product.category_Id group by category.category_Id limit ${ITEM_PER_PAGE_CATEGORY} offset ${(Number(page) - 1) * ITEM_PER_PAGE_CATEGORY}`
    );

    for (let i = 0; i < data[0].length; i++) {
        data[0][i].productsCount = productsCount[0][i]["count(*)"];
    }

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / + ITEM_PER_PAGE_CATEGORY),
        item_per_page: ITEM_PER_PAGE_CATEGORY,
    };
    return result;
};

// exports.getProductByCategory = async (cate_Id) => {
//     const result = await db.connection.execute('select * from Product where category_Id = ?', [cate_Id]);
//     return result[0];
// }

exports.filter = async (page = 1, nameFilter) => {
    let sqlCount = "select count(*) from category";
    let sqlData = "select * from category";
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log(
        "SQL filter method: ",
        `${sqlData} ${nameFilter ? " where " : ""} ${nameFilter ? " name LIKE '%" + nameFilter + "%' " : ""
        } limit ${ITEM_PER_PAGE_CATEGORY} offset ${(Number(page) - 1) * ITEM_PER_PAGE_CATEGORY}`
    );
    count = await db.connection.execute(
        `${sqlCount} ${nameFilter ? " where " : ""} ${nameFilter ? " name LIKE '%" + nameFilter + "%' " : ""
        }`
    );
    data = await db.connection.execute(
        `${sqlData} ${nameFilter ? " where " : ""} ${nameFilter ? " name LIKE '%" + nameFilter + "%' " : ""
        } limit ${ITEM_PER_PAGE_CATEGORY} offset ${(Number(page) - 1) * ITEM_PER_PAGE_CATEGORY}`
    );
    count = count[0][0]["count(*)"];

    let productsCount = await db.connection.execute(
        `select count(*) from category, product where category.category_Id = product.category_Id group by category.category_Id limit ${ITEM_PER_PAGE_CATEGORY} offset ${(Number(page) - 1) * ITEM_PER_PAGE_CATEGORY}`
    );

    for (let i = 0; i < data[0].length; i++) {
        data[0][i].productsCount = productsCount[0][i]["count(*)"];
    }

    console.log("data: ", data[0]);

    const result = {
        data: data[0],
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_CATEGORY),
        item_per_page: ITEM_PER_PAGE_CATEGORY,
    };
    console.log({
        page: page,
        total_page: Math.ceil(count / +ITEM_PER_PAGE_CATEGORY),
        item_per_page: ITEM_PER_PAGE_CATEGORY,
    });

    return result;
};
