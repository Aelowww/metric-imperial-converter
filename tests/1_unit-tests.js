const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  test('convertHandler should correctly read a whole number input', function () {
    assert.strictEqual(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input', function () {
    assert.strictEqual(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('convertHandler should correctly read a fractional input', function () {
    assert.strictEqual(convertHandler.getNum('1/2km'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function () {
    assert.strictEqual(convertHandler.getNum('2.5/5gal'), 0.5);
  });

  test('convertHandler should correctly return an error on a double-fraction', function () {
    assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('convertHandler should correctly default to 1 when no numerical input is provided', function () {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function () {
    const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
    const expected = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    input.forEach((u, i) => assert.strictEqual(convertHandler.getUnit('5' + u), expected[i]));
  });

  test('convertHandler should correctly return an error for an invalid input unit', function () {
    assert.strictEqual(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function () {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    input.forEach((u, i) => assert.strictEqual(convertHandler.getReturnUnit(u), expected[i]));
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    input.forEach((u, i) => assert.strictEqual(convertHandler.spellOutUnit(u), expected[i]));
  });

  test('convertHandler should correctly convert gal to L', function () {
    assert.approximately(convertHandler.convert(5, 'gal'), 18.92705, 0.1);
  });

  test('convertHandler should correctly convert L to gal', function () {
    assert.approximately(convertHandler.convert(5, 'L'), 1.32086, 0.1);
  });

  test('convertHandler should correctly convert mi to km', function () {
    assert.approximately(convertHandler.convert(5, 'mi'), 8.0467, 0.1);
  });

  test('convertHandler should correctly convert km to mi', function () {
    assert.approximately(convertHandler.convert(5, 'km'), 3.10686, 0.1);
  });

  test('convertHandler should correctly convert lbs to kg', function () {
    assert.approximately(convertHandler.convert(5, 'lbs'), 2.26796, 0.1);
  });

  test('convertHandler should correctly convert kg to lbs', function () {
    assert.approximately(convertHandler.convert(5, 'kg'), 11.02312, 0.1);
  });

});
