/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'employees',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '1',
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
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '0000',
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '2',
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
      created_at: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      picture: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
    },
    {
      tableName: 'employees',
    }
  );

  Model.associate = function () {};

  return Model;
};
