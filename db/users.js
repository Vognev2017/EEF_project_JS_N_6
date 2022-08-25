const users = [{
        id: 1,
        name: "Ivan",
        age: 23,
        phone: "12456345"
    },
    {
        id: 2,
        name: "Alexandr",
        age: 26,
        phone: "5545654"
    },
    {
        id: 3,
        name: "Petr",
        age: 24,
        phone: "66546464"
    },
    {
        id: 4,
        name: "Oksana",
        age: 20,
        phone: "77456477"
    },
    {
        id: 5,
        name: "Vera",
        age: 22,
        phone: "87556454"
    },
]
//const users = [];
const getUser = (id) => {
    const result = users.find(item => item.id === id);
    return result;
}
const getAllUsers = () => {

    return users;
}
const PASS = 123
const NAME = "admin"
module.exports = {
    getUser,
    getAllUsers,
    PASS,
    NAME
}