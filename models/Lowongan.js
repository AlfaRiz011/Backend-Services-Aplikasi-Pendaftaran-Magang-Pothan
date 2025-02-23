const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');

const Lowongan = sequelize.define(
  "Lowongan", 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    posisi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    jabatan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    periode_magang: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    closed_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "lowongan",
    timestamps: false, 
  }
);

module.exports =  Lowongan;
