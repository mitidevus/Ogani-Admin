const adminRepository = require('./adminRepository');

exports.getAdminById = async (id) => {
    return adminRepository.getAdminById(id);
}

exports.updateAdminProfile = async (id, fullname, address, avatar) => {
    return adminRepository.updateAdminProfile(id, fullname, address, avatar);
}