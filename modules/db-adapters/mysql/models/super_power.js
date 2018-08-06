module.exports = (sequelize, DataTypes) => {
    const superPower = sequelize.define('super_power', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(256),
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

    return superPower;
};
