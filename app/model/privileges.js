/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'privileges',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      privilege_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: 'privileges',
    }
  );

  Model.associate = function () {};

  return Model;
};
