/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'employee_privileges',
    {
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'employees',
          key: 'id',
        },
      },
      privilege_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'privileges',
          key: 'id',
        },
      },
    },
    {
      tableName: 'employee_privileges',
    }
  );

  Model.associate = function () {};

  return Model;
};
