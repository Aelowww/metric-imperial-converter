function ConvertHandler() {
  const units = {
    gal: { returnUnit: 'L', spelled: 'gallons' },
    L: { returnUnit: 'gal', spelled: 'liters' },
    mi: { returnUnit: 'km', spelled: 'miles' },
    km: { returnUnit: 'mi', spelled: 'kilometers' },
    lbs: { returnUnit: 'kg', spelled: 'pounds' },
    kg: { returnUnit: 'lbs', spelled: 'kilograms' }
  };

  // split input into the number part (before the first letter) and unit part
  const split = (input) => {
    const i = input.search(/[a-zA-Z]/);
    return i === -1 ? [input, ''] : [input.slice(0, i), input.slice(i)];
  };

  this.getNum = function (input) {
    const numStr = split(input)[0].trim();
    if (numStr === '') return 1; // no number -> default to 1

    const parts = numStr.split('/');
    if (parts.length > 2) return 'invalid number'; // double fraction

    const isNum = (s) => /^\d*\.?\d+$|^\d+\.$/.test(s);
    if (!parts.every(isNum)) return 'invalid number';

    const result = parts.length === 2
      ? parseFloat(parts[0]) / parseFloat(parts[1])
      : parseFloat(parts[0]);
    return isFinite(result) ? result : 'invalid number';
  };

  this.getUnit = function (input) {
    const unitStr = split(input)[1].trim().toLowerCase();
    if (unitStr === 'l') return 'L';
    return units[unitStr] ? unitStr : 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    const u = initUnit === 'l' ? 'L' : initUnit;
    return units[u] ? units[u].returnUnit : 'invalid unit';
  };

  this.spellOutUnit = function (unit) {
    const u = unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase();
    return units[u] ? units[u].spelled : 'invalid unit';
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const factors = {
      gal: galToL,
      L: 1 / galToL,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
      mi: miToKm,
      km: 1 / miToKm
    };
    const result = initNum * factors[initUnit];
    return parseFloat(result.toFixed(5)); // round to 5 decimals
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
