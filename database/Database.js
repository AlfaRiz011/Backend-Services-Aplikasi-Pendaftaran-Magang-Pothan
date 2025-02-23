const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected successfully');
  } catch (error) {
    console.error('MySQL connection failed:', error.message);
    process.exit(1);
  }
};

const syncDB = async () => {
  try {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized successfully');
  } catch (error) {
      console.error('Database synchronization failed:', error.message);
  }
};

module.exports = { sequelize, connectDB, syncDB };
