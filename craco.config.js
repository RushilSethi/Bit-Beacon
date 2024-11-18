const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#20B2AA', // Soft Teal
              '@text-color': '#36454F',    // Charcoal
              '@body-background': '#F2F2F2', // Light Gray
              '@component-background': '#E8F5E9', // Soft Mint Green
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
