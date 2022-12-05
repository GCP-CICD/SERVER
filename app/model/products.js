/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'products',
    {
      supplier_ids: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      product_code: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      product_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      standard_cost: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: '0.0000',
      },
      list_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: '0.0000',
      },
      reorder_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      target_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity_per_unit: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      discontinued: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: '0',
      },
      minimum_reorder_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      attachments: {
        type: 'LONGBLOB',
        allowNull: true,
      },
    },
    {
      tableName: 'products',
    }
  );

  Model.associate = function () {};

  return Model;
};
