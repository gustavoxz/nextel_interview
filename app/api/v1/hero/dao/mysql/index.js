const clientMysql = require('./../../../../../../modules/db-adapters').mysql;

const insertUser = (userData) => { // eslint-disable-line
    return clientMysql.user.create(userData);
};


const createSuperHero = (heroData) => clientMysql.super_hero.create(heroData); // eslint-disable-line

const createSuperPower = (powerData) => clientMysql.super_power.create(powerData); // eslint-disable-line

const findSuperHeroById = (id) => clientMysql.super_hero.findOne({ where: { id }}); // eslint-disable-line

const findSuperPowerById = (id) => clientMysql.super_power.findOne({ where: { id }}); // eslint-disable-line

const findUserByUsername = (username) => { // eslint-disable-line
    return clientMysql.user.findOne({
        where: {
            username,
        },
    });
};

const findUser = ((userData) => {  // eslint-disable-line
    return clientMysql.user.findOne({
        where: userData,
    });
});


const updateSuperHero = (heroData) => { // eslint-disable-line
    return clientMysql.super_hero.update(
        heroData,
        {
            where: {
                id: heroData.id,
            },
        },
    );
};

const updateSuperPower = (powerData) => { // eslint-disable-line
    return clientMysql.super_power.update(
        powerData,
        {
            where: {
                id: powerData.id,
            },
        },
    );
};

const updateUser = (userData) => { // eslint-disable-line
    return clientMysql.user.update(
        userData,
        {
            where: {
                id: userData.id,
            },
        },
    );
};

const getAllSuperHeroes = () => { // eslint-disable-line
    return clientMysql.super_hero.findAll();
};

const getAllSuperPowers = () => { // eslint-disable-line
    return clientMysql.super_power.findAll();
};

const getAllSuperHeroesSuperPowersIdBySuperHeroId = (id) => { // eslint-disable-line
    return clientMysql.super_hero_x_super_power.findAll({
        where: {
            super_hero_id: id,
        },
    });
};

const getAllUsers = () => { // eslint-disable-line
    return clientMysql.user.findAll();
};

const deleteSuperHeroById = (id) => { // eslint-disable-line
    return clientMysql.super_hero.destroy({
        where: {
            id,
        },
    });
};

const deleteSuperPowerById = (id) => { // eslint-disable-line
    return clientMysql.super_power.destroy({
        where: {
            id,
        },
    });
};

const deleteUserById = (id) => { // eslint-disable-line
    return clientMysql.user.destroy({
        where: {
            id,
        },
    });
};

const giveSuperHeroSuperPower = (params) => { // eslint-disable-line
    return clientMysql.super_hero_x_super_power.create({
        super_hero_id: params.superHeroId,
        super_power_id: params.superPowerId,
    });
};

module.exports = {
    insertUser,
    getUsers,
    createSuperHero,
    createSuperPower,
    updateSuperHero,
    updateSuperPower,
    updateUser,
    findUser,
    findUserByUsername,
    findSuperHeroById,
    findSuperPowerById,
    deleteSuperHeroById,
    deleteSuperPowerById,
    deleteUserById,
    getAllSuperHeroes,
    getAllSuperPowers,
    getAllSuperHeroesSuperPowersIdBySuperHeroId,
    getAllUsers,
    giveSuperHeroSuperPower,
};
