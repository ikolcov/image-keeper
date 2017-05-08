// @flow
import bcrypt from 'bcryptjs';

export default (sequelize: { define: Function }, DataTypes: { [prop: any]: any }) => {
  const User = sequelize.define(
    'User',
    {
      user: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterValidate: user => {
          if (user.password) {
            // eslint-disable-next-line no-param-reassign
            user.password = bcrypt.hashSync(user.password, 10);
          }
        },
      },
      associate(models) {
        User.hasMany(models.RefreshToken);
      },
    },
  );
  return User;
};
