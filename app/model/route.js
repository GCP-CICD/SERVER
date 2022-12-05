/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'route',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: 'Menu',
      },
      name: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      component: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'route',
    }
  );

  Model.associate = function () {};

  return Model;
};
