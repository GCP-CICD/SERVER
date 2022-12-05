/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'strings',
    {
      string_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      string_data: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'strings',
    }
  );

  Model.associate = function () {};

  return Model;
};
