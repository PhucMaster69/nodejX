'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Numerics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Numerics.init({
    Counter: DataTypes.INTEGER,
    SeqID: DataTypes.STRING,
    TagID: DataTypes.INTEGER,
    Timestamp: DataTypes.DATE,
    VTS_Historian_TS: DataTypes.INTEGER,
    Arbitration: DataTypes.INTEGER,
    Value: DataTypes.FLOAT,
    Value_F3: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Numerics',
    schema: 'Logger'
  });
  Numerics.removeAttribute('id');
  Numerics.removeAttribute('createdAt');
  Numerics.removeAttribute('updatedAt');
  return Numerics;
};