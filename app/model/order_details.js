/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'order_details',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
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
        defaultValue: '0.0000',
      },
      unit_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: '0.0000',
      },
      discount: {
        type: 'DOUBLE',
        allowNull: false,
        defaultValue: '0',
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'order_details_status',
          key: 'id',
        },
      },
      date_allocated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      purchase_order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      inventory_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'order_details',
    }
  );

  Model.associate = function () {};

  return Model;
};
