const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    // Defino la clase Type
    class Type extends Model { }
    Type.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,
        modelName: 'Type',
        timestamps: false
    });
};