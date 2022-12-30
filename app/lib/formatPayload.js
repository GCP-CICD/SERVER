const toInt = require('./toInt');
const { Op, fn, col } = require('sequelize');
module.exports = info => {
  const { type, payload: inPayload, id } = info;
  let outPayload = {};
  //1. 如果有傳空的就清掉
  Object.entries(inPayload).forEach(v => {
    if (!v[1]) {
      delete inPayload[v[0]];
    }
  });

  //2.
  if (type === 'get') {
    outPayload = {
      limit: toInt(inPayload.limit),
      offset: toInt(inPayload.offset),
      // attributes: ['*'],
      where: {},
    };
    for (const iterator of Object.keys(inPayload)) {
      switch (iterator) {
        case 'limit':
        case 'offset':
          break;
        case 'created_at': //https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#applying-where-clauses
        case 'updated_at':
        case 'deleted_at':
          const timeArray = JSON.parse(inPayload[iterator]);
          outPayload.where[iterator] = {
            [Op.gt]: timeArray[0],
            [Op.lt]: timeArray[1],
          };
          break;
        default:
          outPayload.where[iterator] = {
            [Op.like]: `%${inPayload[iterator]}%`,
          };
          break;
      }
    }
  } else {
    outPayload = inPayload;
  }
  return outPayload;
};
