require('dotenv/config');
const express = require('express');
const app = express();
// const staticMiddleware = require('./static-middleware');

// app.use(staticMiddleware)

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
