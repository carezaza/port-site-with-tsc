const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/auth", "/api", "/graphql", "/port"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
