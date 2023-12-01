import Sequelize from 'sequelize';
import process from 'process';
import path from 'path';
import { join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import HotelModel from './HotelModel.js';
import config from '../configurations/sequelize.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');  // Use '..' to get the directory containing the current module
const basename = path.basename(__filename);
const db = {
  Hotel: HotelModel
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true
    }
  });
}

const importModels = async () => {
  await Promise.all(
    (await fs.readdir(__dirname)).filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      );
    }).map(async file => {
      const modelModule = await import(`file://${join(__dirname, file)}`);
      const model =new modelModule.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    })
  );
};

// Call the function to import models asynchronously
importModels().then(() => {
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
});

export default db;
