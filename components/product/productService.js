const productRepository = require('./productRepository');

exports.countAllProducts = async () => {
    return productRepository.countAllProducts();
}

exports.getAllProduct = async (page=1) => {
  return productRepository.getAllProduct(page);
}

exports.getProductByCategory = async (page=1, cate_Id) => {
    return productRepository.getProductByCategory(page,cate_Id)
}

exports.getAllCategory = async () => {
    return productRepository.getAllCategory();
}

exports.getSortedProductByPrice_ASC = async (page,cate_Id,nameFilter, min, max) => {
    return productRepository.getSortedProductByPrice_ASC(page,cate_Id,nameFilter, min, max)
}

exports.getSortedProductByPrice_DESC = async (page,cate_Id,nameFilter, min, max) => {
    return productRepository.getSortedProductByPrice_DESC(page,cate_Id,nameFilter, min, max)
}

exports.getSortedProductByRate_Star_ASC = async (page,cate_Id,nameFilter, min, max) => {
    return productRepository.getSortedProductByRate_Star_ASC(page,cate_Id,nameFilter, min, max)
}

exports.getSortedProductByRate_Star_DESC = async (page,cate_Id,nameFilter, min, max) => {
    return productRepository.getSortedProductByRate_Star_DESC(page,cate_Id,nameFilter, min, max)
}

exports.filter = async (page=1, cate_id=0, nameFilter, min, max) => {
    return productRepository.filter(page, cate_id, nameFilter, min, max)
}

exports.getSortedProductByRelease_Date_Latest = () => {
    return productRepository.getSortedProductByRelease_Date_Latest();
}