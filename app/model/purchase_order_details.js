/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'purchase_order_details',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      purchase_order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'purchase_orders',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      unit_cost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      date_received: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      posted_to_inventory: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: '0',
      },
      inventory_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'inventory_transactions',
          key: 'id',
        },
      },
    },
    {
      tableName: 'purchase_order_details',
    }
  );

  Model.associate = function () {};

  return Model;
};
