const lookbook = require('@lookback/lookbook');

module.exports = {
  plugins: [
    //
    ...lookbook.foundation({ minify: !!process.env.BUNDLE }),
  ],
};
