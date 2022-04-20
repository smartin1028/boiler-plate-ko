// const { createProxyMiddleware } = require('http-proxy-middleware');
//
// const apiProxy = createProxyMiddleware('/api', { target: 'http://www.example.org' });
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5500',
            changeOrigin: true,
        })
    );
};