"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                email: "test@gmail.com",
                password: "123456",
                firstName: "John",
                lastName: "Doe",
                address: "123 Ha Dong",
                phoneNumber: "123456123",
                gender: 1,
                roleId: "1",
                positionId: "2",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    },
};
