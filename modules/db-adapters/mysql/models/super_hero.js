module.exports = (sequelize, DataTypes) => {
    const superHero = sequelize.define('super_hero', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        alias: {
            type: DataTypes.STRING(50),
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.DATE,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return superHero;
};
