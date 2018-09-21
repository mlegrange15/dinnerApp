module.exports = function(sequelize, DataTypes) {
  
  var Search = sequelize.define("Search", {
    inorout: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spend: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return Search;
};
