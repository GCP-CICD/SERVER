/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'orders',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'id',
        },
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'customers',
          key: 'id',
        },
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      shipped_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      shipper_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'shippers',
          key: 'id',
        },
      },
      ship_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ship_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ship_city: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ship_state_province: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ship_zip_postal_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ship_country_region: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      shipping_fee: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: '0.0000',
      },
      taxes: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: '0.0000',
      },
      payment_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      paid_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tax_rate: {
        type: 'DOUBLE',
        allowNull: true,
        defaultValue: '0',
      },
      tax_status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'orders_tax_status',
          key: 'id',
        },
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: '0',
        references: {
          model: 'orders_status',
          key: 'id',
        },
      },
    },
    {
      tableName: 'orders',
    }
  );

  Model.associate = function () {};

  return Model;
};
