/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'inventory_transactions',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      transaction_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'inventory_transaction_types',
          key: 'id',
        },
      },
      transaction_created_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      transaction_modified_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      purchase_order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'purchase_orders',
          key: 'id',
        },
      },
      customer_order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'id',
        },
      },
      comments: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'inventory_transactions',
    }
  );

  Model.associate = function () {};

  return Model;
};
