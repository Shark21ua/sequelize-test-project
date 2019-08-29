module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    completedAt: {
      type: DataTypes.DATE
    }
  });

  Order.associate = ({ Detail }) => {
    Order.belongsToMany(Detail, { through: 'DetailToOrderMapping' });
  };

  return Order;
};
