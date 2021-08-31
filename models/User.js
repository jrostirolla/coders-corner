const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTERGER,
      allowNullL: false,
      primaryKey: true,
      autoIncrement: true
    },

    Email: {
      type: DataTypes.STRING,
      allowNullL: false
    },

    Password: {
      type:DataTypes.INTERGER,
      allowNullL: false,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false

    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Favourite_coding_languate: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Subscibed_channels: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
),

{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'User',
}

module.exports = User;