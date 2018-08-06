module.exports = (sequelize, DataTypes) => {
    const auditEvent = sequelize.define('audit_event', {
        entity: {
            type: DataTypes.STRING(50),
        },
        datetime: {
            type: DataTypes.DATE,
        },
        username: {
            type: DataTypes.STRING(50),
        },
        action: {
            type: DataTypes.STRING(50),
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return auditEvent;
};
