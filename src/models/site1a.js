'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Site1ds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  Site1ds.init({
    TAG_ID: DataTypes.INTEGER,
    TAG_NAME: DataTypes.STRING,
    VALUE: DataTypes.STRING,
    TIMESTAMP: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Site1ds',
    timestamps: false,
  });
  return Site1ds;
};