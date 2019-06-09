module.exports = {
  proxy: {
    '/api': {
      target: 'http://5427.iiio.top',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': '/'
      }
    }
  }
}