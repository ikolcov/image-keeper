// @flow

export default (sequelize: { define: Function }, DataTypes: { [prop: any]: any }) => {
  const RefreshToken = sequelize.define(
    'RefreshToken',
    {
      token: {
        type: DataTypes.STRING,
        unique: true,
      },
      exp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      associate(models) {
        RefreshToken.belongsTo(models.User);
      },
    },
  );
  return RefreshToken;
};
