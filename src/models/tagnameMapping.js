'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friendlyTagNameLookup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  friendlyTagNameLookup.init({
    friendlyname: DataTypes.STRING,
    uniqueID: DataTypes.STRING,
    tablename: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'friendlyTagNameLookup',
    schema: 'Logger'
  });
  friendlyTagNameLookup.removeAttribute('id');
  friendlyTagNameLookup.removeAttribute('createdAt');
  friendlyTagNameLookup.removeAttribute('updatedAt');
  return friendlyTagNameLookup;
};