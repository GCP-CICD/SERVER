/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'role',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      test: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'role',
    }
  );

  Model.associate = function () {};

  return Model;
};
