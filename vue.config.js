module.exports = {
	runtimeCompiler: true,
	devServer: {
    	port: '8085',
    	proxy: {
      		'/back': {
        		target: 'http://localhost:3000',
        		changeOrigin: true,
        		pathRewrite: {}
      			}
    	}
  	}
}