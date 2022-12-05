const toInt = require('./toInt');
const { Op, fn, col } = require('sequelize');
module.exports = queryOrigin => {
  const query = {
    limit: toInt(queryOrigin.limit),
    offset: toInt(queryOrigin.offset),
    // attributes: ['*'],
    where: {},
  };
  for (const iterator of Object.keys(queryOrigin)) {
    switch (iterator) {
      case 'limit':
      case 'offset':
        break;
      default:
        query.where[iterator] = {
          [Op.like]: `%${queryOrigin[iterator]}%`,
        };
        break;
    }
  }
  return query;
};
