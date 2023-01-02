const brandRepository = require('./brandRepository');

exports.countAllBrand = async () => {
  return brandRepository.countAllBrand();
}

exports.getAllBrand = async (page = 1) => {
  return brandRepository.getAllBrand(page);
}

exports.filter = async (page = 1, cate_id = 0, nameFilter, min, max) => {
  return brandRepository.filter(page, cate_id, nameFilter, min, max)
}

exports.checkBrandExisted = async (name) => {
  return brandRepository.checkBrandExisted(name);
}

exports.addBrand = async (name, image) => {
  const status = await this.checkBrandExisted(name);
  if (status) throw new Error("brand existed");
  return brandRepository.addBrand(name, image);
}

exports.getBrandById = async (id) => {
  return brandRepository.getBrandById(id);
};

exports.editBrand = async (id, name, image) => {
  return brandRepository.updateBrand(id, name, image);
};