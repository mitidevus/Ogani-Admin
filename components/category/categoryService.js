const categoryRepository = require('./categoryRepository');

exports.countAllCategory = async () => {
  return categoryRepository.countAllCategory();
}

exports.getAllCategory = async (page = 1) => {
  return categoryRepository.getAllCategory(page);
}

exports.filter = async (page = 1, cate_id = 0, nameFilter, min, max) => {
  return categoryRepository.filter(page, cate_id, nameFilter, min, max)
}

exports.checkCategoryExisted = async (name) => {
  return categoryRepository.checkCategoryExisted(name);
}

exports.addCategory = async (name, image) => {
  const status = await this.checkCategoryExisted(name);
  if (status) throw new Error("Category existed");
  return categoryRepository.addCategory(name, image);
}

exports.getCategoryById = async (id) => {
  return categoryRepository.getCategoryById(id);
};

exports.editCategory = async (id, name, image) => {
  return categoryRepository.updateCategory(id, name, image);
};