'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkingReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WorkingReport.init({
    title: DataTypes.STRING,
    team: DataTypes.STRING,
    off: DataTypes.STRING,
    count: DataTypes.INTEGER,
    workingPlace: DataTypes.STRING,
    projectId: DataTypes.STRING,
    jobTodayDescription: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'WorkingReport',
  });
  return WorkingReport;
};