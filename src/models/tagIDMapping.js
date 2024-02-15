'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tagIdentifierLookup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tagIdentifierLookup.init({
    tagname: DataTypes.STRING,
    tagidentifier: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tagIdentifierLookup',
    schema: 'Logger'
  });
  // tagIdentifierLookup.removeAttribute('id');
  tagIdentifierLookup.removeAttribute('createdAt');
  tagIdentifierLookup.removeAttribute('updatedAt');
  return tagIdentifierLookup;
};