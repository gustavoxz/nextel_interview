const BaseController = require('../../../base/base_controller');
const HandleResponse = require('../../../utils/handle_response');
const UserValidator = require('./hero_validator');
const UserBusiness = require('./hero_business');
const AdminValidator = require('../../../utils/admin_validator');
const I18n = require('../../../i18n');

class UserController extends BaseController {
    constructor() {
        super();
        this.userValidator = UserValidator;
        this.userBusiness = new UserBusiness();
        this.handleResponse = new HandleResponse();
        this.i18n = I18n;
    }

    login(req, res, next) {
        const params = {
            username: req.body.username,
            password: req.body.password,
        };

        return this.userBusiness.login(params)
            .then((data) => {
                console.log('oi');
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }

    getAllUsers(req, res, next) {
        if (!AdminValidator.isAdmin(req.user)) {
            return next(HandleResponse.forbidden());
        }

        return this.userBusiness.getAllUsers()
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }

    insertUser(req, res, next) {
        if (!AdminValidator.isAdmin(req.user)) {
            return next(HandleResponse.forbidden());
        }

        const params = {
            username: req.body.username,
            password: req.body.password,
        };

        return this.userBusiness.insertUser(params)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    createSuperHero(req, res, next) {
        if (!AdminValidator.isAdmin(req.user)) {
            return next(HandleResponse.forbidden());
        }

        const params = {
            name: req.body.name,
            alias: req.body.alias,
        };

        return this.userBusiness.createSuperHero(params)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    createSuperPower(req, res, next) {
        if (!AdminValidator.isAdmin(req.user)) {
            return next(HandleResponse.forbidden());
        }

        const params = {
            name: req.body.name,
            description: req.body.description,
        };

        return this.userBusiness.createSuperPower(params)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    createProtectionArea(req, res, next) {
        const params = {
            superHeroId: req.body.superHeroId,
            name: req.body.name,
            lat: parseFloat(req.body.lat),
            lng: parseFloat(req.body.lng),
            radius: parseFloat(req.body.radius),
        };

        return this.userBusiness.createProtectionArea(params)
            .then((result) => {
                res.json(result);
            }).catch((error) => {
                next(error);
            });
    }

    deleteSuperHero(req, res, next) {
        if (!AdminValidator.isAdmin(req.user)) {
            return next(HandleResponse.forbidden());
        }

        const id = req.body.id;

        return this.userBusiness.deleteSuperHero(id)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    deleteSuperPower(req, res, next) {
        if (!AdminValidator.isAdmin(req.user)) {
            return next(HandleResponse.forbidden());
        }

        const id = req.body.id;

        return this.userBusiness.deleteSuperPower(id)
            .then((result) => {
                res.json(result);
            }).catch((error) => {
                next(error);
            });
    }

    deleteUser(req, res, next) {
        const id = req.body.id;

        return this.userBusiness.deleteUser(id)
            .then((result) => {
                res.json(result);
            }).catch((error) => {
                next(error);
            });
    }

    getSuperHero(req, res, next) {
        const id = req.params.id;

        return this.userBusiness.getSuperHero(id)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    getSuperPower(req, res, next) {
        const id = req.params.id;

        return this.userBusiness.getSuperPower(id)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    updateSuperHero(req, res, next) {
        if (!AdminValidator.isAdmin(req.user)) {
            return next(HandleResponse.forbidden());
        }

        const params = {
            id: req.body.id,
            name: req.body.name,
            alias: req.body.alias,
        };

        return this.userBusiness.updateSuperHero(params)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    updateSuperPower(req, res, next) {
        if (!AdminValidator.isAdmin(req.user)) {
            return next(HandleResponse.forbidden());
        }

        const params = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
        };

        return this.userBusiness.updateSuperPower(params)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    updateUser(req, res, next) {
        if (!AdminValidator.isAdmin(req.user)) {
            return next(HandleResponse.forbidden());
        }

        const params = {
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
        };

        return this.userBusiness.updateUser(params)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    getAllSuperHeroes(req, res, next) {
        return this.userBusiness.getAllSuperHeroes()
            .then((result) => {
                res.json(result);
            }).catch((error) => {
                next(error);
            });
    }

    getAllSuperPowers(req, res, next) {
        return this.userBusiness.getAllSuperPowers()
            .then((result) => {
                res.json(result);
            }).catch((error) => {
                next(error);
            });
    }

    giverSuperHeroSuperPower(req, res, next) {
        const params = {
            superHeroId: req.body.superHeroId,
            superPowerId: req.body.superPowerId,
        };

        return this.userBusiness.giveSuperHeroSuperPower(params)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    helpMe(req, res, next) {
        const params = {
            lat: req.query.lat,
            lng: req.query.lng,
        };

        return this.userBusiness.helpMe(params)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                next(error);
            });
    }
}

module.exports = UserController;
