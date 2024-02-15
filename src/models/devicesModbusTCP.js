'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DevicesModbusTCP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DevicesModbusTCP.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    deviceIPAdd: DataTypes.STRING,
    devicePort: DataTypes.STRING,
    deviceId: DataTypes.STRING,
    scanrate: DataTypes.INTEGER,
    connectTimeout: DataTypes.STRING,
    status: DataTypes.STRING,
    tags: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DevicesModbusTCP',
  });
  return DevicesModbusTCP;
};