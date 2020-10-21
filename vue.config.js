const path = require('path');
module.exports = {
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  },
  devServer: {
    host: '0.0.0.0',
		port: 9527, // 端口号
		https: false, // https:{type:Boolean}
    hotOnly: true, // 热更新
    proxy: 'http://localhost:9527',
    public: '192.168.30.180:9527',
		compress: true,
		disableHostCheck: true // webpack4.0 开启热更新
	},
   pluginOptions: {
   'style-resources-loader': {
     preProcessor: 'scss',
     patterns: [
       // 加上自己的文件路径，不能使用别名
       path.resolve(__dirname, 'src/scss/scss_common/func.scss'),
       path.resolve(__dirname, 'src/scss/scss_common/color.scss'),
       path.resolve(__dirname, 'src/scss/scss_common/initalize.scss')

     ]
   }
 }
 };