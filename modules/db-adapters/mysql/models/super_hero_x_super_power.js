module.exports = ((sequelize, DataTypes) => {
    const superHeroXSuperPower = sequelize.define('super_hero_x_super_power', {
        super_hero_id: {
            type: DataTypes.INTEGER,
        },
        super_power_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        freezeTableName: true,
        timstamps: false,
    });

    return superHeroXSuperPower;
});
