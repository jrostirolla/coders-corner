const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    email: {
      type: DataTypes.STRING,
      allowNullL: false
    },

    password: {
      type:DataTypes.STRING,
      allowNullL: false,
      validate: {
        len: [8],
      }
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false

    },

    city: {
      type: DataTypes.STRING,
      allowNull: false
    },

    coding_language: {
      type: DataTypes.STRING,
      allowNull: false
    }  
  },


  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
      
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);  

module.exports = User;