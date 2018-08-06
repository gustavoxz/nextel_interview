module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
        username: {
            type: DataTypes.STRING(50),
            password: DataTypes.STRING(256),
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
        freezeTabelName: true,
        timestamps: false,
    });

    return role;
};
