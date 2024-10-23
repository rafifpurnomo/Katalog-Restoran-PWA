module.exports = {
	globDirectory: 'src/',
	globPatterns: ['**/*.{html,js,css,png,jpg,json}'],
	swDest: 'src/scripts/config/service-worker.js',
	runtimeCaching: [
	  {
		urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/list\//,
		handler: 'StaleWhileRevalidate',
		options: {
		  cacheName: 'mensa-api',
		},
	  },
	  {
		urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/detail\//,
		handler: 'StaleWhileRevalidate',
		options: {
		  cacheName: 'mensa-api-detail',
		},
	  },
	  {
		urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/images\/medium\//,
		handler: 'StaleWhileRevalidate',
		options: {
		  cacheName: 'mensa-image-api',
		},
	  },
	],
  };
  