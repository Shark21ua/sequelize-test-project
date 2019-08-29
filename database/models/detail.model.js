module.exports = (sequelize, DataTypes) => {
  const Detail = sequelize.define('Detail', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Detail.associate = ({ Order }) => {
    Detail.belongsToMany(Order, { through: 'DetailToOrderMapping' });
  };

  return Detail;
};
