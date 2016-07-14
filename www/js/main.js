require.config({
	baseUrl: 'js',
	paths: {
		'jquery': '../node_modules/jquery/dist/jquery',
		'ky': 'public',
		'index': 'index/index'
	}
});
require(['index']);