/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'orders_status',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      status_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: 'orders_status',
    }
  );

  Model.associate = function () {};

  return Model;
};
