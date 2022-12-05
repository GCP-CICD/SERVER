/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'purchase_order_status',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: 'purchase_order_status',
    }
  );

  Model.associate = function () {};

  return Model;
};
