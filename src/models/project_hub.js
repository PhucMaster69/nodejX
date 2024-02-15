'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectHub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProjectHub.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    status: DataTypes.STRING,
    percent: DataTypes.FLOAT,
    projid: DataTypes.STRING,
    clientinfo: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    teams: DataTypes.STRING,
    documentURL: DataTypes.STRING   
  }, {
    sequelize,
    modelName: 'ProjectHub',
  });
  return ProjectHub;
};