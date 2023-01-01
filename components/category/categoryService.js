const categoryRepository = require('./categoryRepository');

exports.countAllCategory = async () => {
    return categoryRepository.countAllCategory();
}

exports.getAllCategory = async (page=1) => {
  return categoryRepository.getAllCategory(page);
}

exports.filter = async (page=1, cate_id=0, nameFilter, min, max) => {
    return categoryRepository.filter(page, cate_id, nameFilter, min, max)
}