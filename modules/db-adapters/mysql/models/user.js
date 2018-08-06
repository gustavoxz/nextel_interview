module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING(10),
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

    return User;
};
