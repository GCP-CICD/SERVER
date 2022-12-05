/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'purchase_orders',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'suppliers',
          key: 'id',
        },
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'id',
        },
      },
      submitted_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      creation_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: '0',
        references: {
          model: 'purchase_order_status',
          key: 'id',
        },
      },
      expected_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      shipping_fee: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: '0.0000',
      },
      taxes: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: '0.0000',
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      payment_amount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: '0.0000',
      },
      payment_method: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      approved_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      submitted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'purchase_orders',
    }
  );

  Model.associate = function () {};

  return Model;
};
