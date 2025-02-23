const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database'); 

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nim: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    universitas: {
      type: DataTypes.STRING(150),
    },
    no_telp: {
      type: DataTypes.STRING(15),
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
    },
    alamat: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("aktif", "nonaktif"),
      defaultValue: "nonaktif",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,  
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = Users;
