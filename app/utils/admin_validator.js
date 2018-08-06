class AdminValidator {
    static isAdmin(userData) {
        if (userData.role) {
            if (userData.role !== 'standard') {
                return true;
            }
        }
        return false;
    }
}

module.exports = AdminValidator;
