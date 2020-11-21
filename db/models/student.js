const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('Student', {
  firstName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

Student.beforeCreate((student) => {
  const nameFirst = student.firstName;
  const nameLast = student.lastName;

  student.firstName = nameFirst[0].toUpperCase() + nameFirst.slice(1);
  student.lastName = nameLast[0].toUpperCase() + nameLast.slice(1);
});

module.exports = Student;
