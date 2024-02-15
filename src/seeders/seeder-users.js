'use strict';

module.exports = {
  // email: DataTypes.STRING,
  //   password: DataTypes.STRING,
  //   firstName: DataTypes.STRING,
  //   lastName: DataTypes.STRING,
  //   address: DataTypes.STRING,
  //   gender: DataTypes.BOOLEAN,
  //   roleid: DataTypes.STRING
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'phucsusu@gmail.com',
      password: '123456',
      firstName: 'Phuc',
      lastName: 'Sus',
      address: '69 Xuan Hong P13 Binh Thanh',
      gender: 1,
      typeid: 'ROLE',
      roleid: 'A1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
