const { colors } = require('@lookback/lookbook');
const {
  version,
} = require('../../node_modules/@lookback/lookbook/package.json');
const fs = require('fs');

module.exports = () => {
  const variables = fs.readFileSync(__dirname + '/vars', { encoding: 'utf8' }).trim();

  return { colors, version, variables };
};
