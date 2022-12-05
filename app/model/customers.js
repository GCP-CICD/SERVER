/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'customers',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      company: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email_address: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      job_title: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      business_phone: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      home_phone: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      mobile_phone: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      fax_number: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      state_province: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      zip_postal_code: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      country_region: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      web_page: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      attachments: {
        type: 'LONGBLOB',
        allowNull: true,
      },
    },
    {
      tableName: 'customers',
    }
  );

  Model.associate = function () {};

  return Model;
};
