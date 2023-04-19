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
                gender: 1,
                typeRole: "ROLE",
                keyRole: "R1",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    },
};
