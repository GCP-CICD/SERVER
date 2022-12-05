/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'invoices',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'id',
        },
      },
      invoice_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tax: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: '0.0000',
      },
      shipping: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: '0.0000',
      },
      amount_due: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: '0.0000',
      },
    },
    {
      tableName: 'invoices',
    }
  );

  Model.associate = function () {};

  return Model;
};
