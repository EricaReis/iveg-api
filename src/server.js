const app = require('./app');

app.app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server up port: ${process.env.PORT || 3000}`);
});
