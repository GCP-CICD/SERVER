/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sales_reports', {
    group_by: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    display: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    filter_row_source: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    default: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'sales_reports'
  });

  Model.associate = function() {

  }

  return Model;
};
