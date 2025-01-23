module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
  });
};
