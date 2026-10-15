'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  // GET /api/convert?input=<number><unit>
  app.route('/api/convert').get(function (req, res) {
    const input = req.query.input || '';
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    const badNum = initNum === 'invalid number';
    const badUnit = initUnit === 'invalid unit';
    if (badNum && badUnit) return res.send('invalid number and unit');
    if (badNum) return res.send('invalid number');
    if (badUnit) return res.send('invalid unit');

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });

};
