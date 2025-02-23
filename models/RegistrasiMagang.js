const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const Lowongan = require('./Lowongan');
const Users = require('./Users');

const RegistrasiMagang = sequelize.define(
  "RegistrasiMagang",
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
    status: {
      type: DataTypes.ENUM("pending", "disetujui", "ditolak"),
      defaultValue: "pending",
    },
    alasan_penolakan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "registrasi_magang",
    timestamps: false, 
  }
);


RegistrasiMagang.belongsTo(Users, { foreignKey: "user_id" });
RegistrasiMagang.belongsTo(Lowongan, { foreignKey: "job_id" });

module.exports = RegistrasiMagang;
