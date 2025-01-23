const { getDevices, addDevice, getDevice, updateDevice, deleteDevice } = require('../server/controllers/devices');

module.exports = app => {
  app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'src', 'index.html')); 
  });

  app.route('/api/devices')
    .get(getDevices)
    .post(addDevice);

  app.route('/devices/:id')
    .get(getDevice)
    .put(updateDevice)
    .delete(deleteDevice);
};