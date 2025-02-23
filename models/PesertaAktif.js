const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const Lowongan = require('./Lowongan');
const Users = require('./Users');

const PesertaAktif = sequelize.define(
    "PesertaAktif",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Users,
          key: "id",
        },
        onDelete: "CASCADE",
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Lowongan,
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "peserta_aktif",
      timestamps: false, 
    }
  );
  
  PesertaAktif.belongsTo(Users, { foreignKey: "user_id" });
  PesertaAktif.belongsTo(Lowongan, { foreignKey: "job_id" });
  
module.exports = PesertaAktif;