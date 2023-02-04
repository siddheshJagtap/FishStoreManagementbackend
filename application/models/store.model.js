module.exports = (sequelize, Sequelize) => {
  const StoreData = sequelize.define("storeData", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    inStock: {
      type: Sequelize.BOOLEAN,
    },
    shelfNumber_tankNumber: {
      type: Sequelize.STRING,
    },
  });

  return StoreData;
};
