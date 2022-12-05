/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'route2',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parentid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: 'Menu',
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: 'route2',
    }
  );

  Model.associate = function () {};

  return Model;
};
