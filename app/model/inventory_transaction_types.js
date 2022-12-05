/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'inventory_transaction_types',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      type_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: 'inventory_transaction_types',
    }
  );

  Model.associate = function () {};

  return Model;
};
