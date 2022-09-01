// const path = require(`path`);

// module.exports = {
//     configureWebpack: {
//         resolve: {
//             symlinks: false,
//             alias: {
//                 vue: path.resolve(`./node_modules/vue`)
//             }
//         }
//     }
// };

module.exports = {
    devServer: {
      host: '127.0.0.1',
      port: 8080,
      public: 'localhost:8080',
    },
    lintOnSave: false
    // chainWebpack: config => {
    //   config.performance
    //     .maxEntrypointSize(400000)
    //     .maxAssetSize(400000)
    // }
  }