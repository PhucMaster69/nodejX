'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  People.init({
    IdPerson: DataTypes.STRING,
    Userid: DataTypes.STRING,
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Address: DataTypes.STRING,
    Position: DataTypes.STRING,
    Role: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'People',
  });
  People.removeAttribute('id');
  People.removeAttribute('createdAt');
  People.removeAttribute('updatedAt');
  return People;
};