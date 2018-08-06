
const HandleResponse = require('../../../utils/handle_response');
const BaseBusiness = require('../../../base/business');
const dao = require('./dao');
const I18n = require('../../../i18n');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserBusiness extends BaseBusiness {
    constructor() {
        super();
        this.dao = dao;
        this.i18n = I18n;
    }

    login(loginData) {
        return new Promise((resolve, reject) => {
            this.dao.mysql.findUser({ username: loginData.username })
                .then((userData) => { // eslint-disable-line
                    if (!userData) {
                        return reject(HandleResponse.notFound(this.i18n.__('User not found')));
                    }

                    const hashPassword = userData.password.replace(/^\$2y(.+)$/i, '$2a$1');
                    const isValidPassword = bcrypt.compareSync(loginData.password, hashPassword);

                    console.log(userData);

                    if (isValidPassword) {
                        jwt.sign({ username: userData.username, id: userData.id, role: userData.role }, 'nextel_application', {}, (err, token) => {
                            if (err) {
                                console.log('damn');
                                return reject(err);
                            }
                            console.log('-------------');
                            console.log(token);
                            console.log('-------------');
                            return resolve(token);
                        });
                    } else {
                        return reject(HandleResponse.notFound(this.i18n.__('User not found')));
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    insertUser(userData) {
        return new Promise((resolve, reject) => {
            console.log('boa noite');
            this.dao.mysql.findUserByUsername(userData.username)
                .then((superHeroData) => {
                    console.log(superHeroData);
                    if (superHeroData) {
                        return reject(HandleResponse.notFound(this.i18n.__('Username already in use')));
                    }

                    userData.password = bcrypt.hashSync(userData.password, 10).replace('$2a$', '$2y$');
                    userData.role = 'standard';

                    return this.dao.mysql.insertUser(userData);
                })
                .then(() => {
                    resolve();
                });
        });
    }

    getAllUsers() {
        return this.dao.mysql.getAllUsers();
    }

    createSuperHero(heroData) {
        return this.dao.mysql.createSuperHero(heroData);
    }

    createSuperPower(powerData) {
        return this.dao.mysql.createSuperPower(powerData);
    }

    createProtectionArea(areaProtectionData) {
        return new Promise((resolve, reject) => {
            this.dao.mysql.findSuperHeroById(areaProtectionData.superHeroId)
                .then((superHero) => {
                    if (!superHero) {
                        return reject(HandleResponse.notFound(this.i18n.__('Super Hero not found')));
                    }

                    return this.dao.elasticsearch.createIndexAndMappingProtectionArea();
                })
                .then(() => this.dao.elasticsearch.insertProtectionArea(areaProtectionData))
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getSuperHero(id) {
        return this.dao.mysql.findSuperHeroById(id);
    }

    getSuperPower(id) {
        return this.dao.mysql.findSuperPowerById(id);
    }

    deleteSuperHero(id) {
        return new Promise((resolve, reject) => {
            this.dao.mysql.findSuperHeroById(id)
                .then((superHeroData) => {
                    if (!superHeroData) {
                        return reject(HandleResponse.notFound(this.i18n.__('Super Hero not found')));
                    }

                    return this.dao.mysql.getAllSuperHeroesSuperPowersIdBySuperHeroId(id);
                })
                .then((superPowerIdResult) => {
                    if (superPowerIdResult) {
                        return reject(HandleResponse.notFound(this.i18n.__('Can\'t delete super hero with super power')));
                    }

                    return this.dao.mysql.deleteSuperHeroById(id);
                })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    deleteSuperPower(id) {
        return this.dao.mysql.deleteSuperPowerById(id);
    }

    deleteUser(id) {
        return this.dao.mysql.deleteUserById(id);
    }

    updateSuperHero(heroData) {
        return new Promise((resolve, reject) => {
            this.dao.mysql.findSuperHeroById(heroData.id)
                .then((superHero) => {
                    if (!superHero) {
                        return reject(HandleResponse.notFound(this.i18n.__('Super Hero not found')));
                    }
                    return this.dao.mysql.updateSuperHero(heroData);
                }).then(updateResult => resolve(updateResult))
                .catch(error => reject(error));
        });
    }

    updateSuperPower(heroData) {
        return new Promise((resolve, reject) => {
            this.dao.mysql.findSuperPowerById(heroData.id)
                .then((superPower) => {
                    if (!superPower) {
                        return reject(HandleResponse.notFound(this.i18n.__('Super Power not found')));
                    }
                    return this.dao.mysql.updateSuperPower(heroData);
                }).then(updateResult => resolve(updateResult))
                .catch(error => reject(error));
        });
    }

    updateUser(userData) {
        return new Promise((resolve, reject) => {
            this.dao.mysql.findUser({ id: userData.id })
                .then((superPower) => {
                    if (!superPower) {
                        return reject(HandleResponse.notFound(this.i18n.__('User not found')));
                    }

                    userData.password = bcrypt.hashSync(userData.password, 10).replace('$2a$', '$2y$');
                    return this.dao.mysql.updateUser(userData);
                }).then(updateResult => resolve(updateResult))
                .catch(error => reject(error));
        });
    }

    // TODO: paginate
    getAllSuperHeroes() {
        return this.dao.mysql.getAllSuperHeroes();
    }

    // TODO: paginate
    getAllSuperPowers() {
        return this.dao.mysql.getAllSuperPowers();
    }

    giveSuperHeroSuperPower(params) {
        return new Promise((resolve, reject) => {
            this.dao.mysql.findSuperHeroById(params.superHeroId)
                .then((superHeroData) => {
                    if (!superHeroData) {
                        throw HandleResponse.notFound(this.i18n.__('Super Hero not found'));
                    }

                    return this.dao.mysql.findSuperPowerById(params.superPowerId);
                })
                .then((superPowerData) => {
                    if (!superPowerData) {
                        throw HandleResponse.notFound(this.i18n.__('Super Power not found'));
                    }

                    return this.dao.mysql.giveSuperHeroSuperPower(params);
                })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    helpMe(params) {
        return new Promise((resolve, reject) => {
            this.dao.elasticsearch.findNearestSuperheroes(params)
                .then((data) => {
                    const dataFormatted = data.map((protectionAreaData) => { // eslint-disable-line
                        return {
                            superHeroId: protectionAreaData._source.super_hero_id, // eslint-disable-line
                            distance: `${protectionAreaData.sort[0].toFixed(3)}km`, // eslint-disable-line
                        };
                    });
                    resolve(dataFormatted);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}

module.exports = UserBusiness;
