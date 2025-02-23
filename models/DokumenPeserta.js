const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const Users = require('./Users');

const DokumenPeserta = sequelize.define(
  "DokumenPeserta",
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
    jenis_dokumen: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "diterima", "ditolak"),
      defaultValue: "pending",
    },
    uploaded_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "dokumen_peserta",
    timestamps: false, 
  }
);


DokumenPeserta.belongsTo(Users, { foreignKey: "user_id" });

module.exports = DokumenPeserta;
