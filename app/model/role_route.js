/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'role_route',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      roleid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      routeid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'role_route',
    }
  );

  Model.associate = function () {};

  return Model;
};
