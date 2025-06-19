const lookbook = require('@lookback/lookbook');

module.exports = {
  plugins: [
    //
    ...lookbook.foundation({ bundle: !!process.env.BUNDLE }),
  ],
};
