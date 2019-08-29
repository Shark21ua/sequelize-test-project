module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define('User', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        isEmail: true,
        notEmpty: true
      }
    }
  });

  User.associate = ({ Order }) => {
    User.hasMany(Order)
  };

  return User;
};
