const Service = require('../models/Service');
const StatusHistory = require('../models/StatusHistory');

exports.getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

exports.createService = async (req, res) => {
  const service = new Service(req.body);
  await service.save();

  await new StatusHistory({
    serviceId: service._id,
    status: service.status,
    changedBy: req.user.id
  }).save();

  req.app.get('io').emit('statusUpdate', service);
  res.status(201).json(service);
};

exports.updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });

  await new StatusHistory({
    serviceId: service._id,
    status: service.status,
    changedBy: req.user.id
  }).save();

  req.app.get('io').emit('statusUpdate', service);
  res.json(service);
};

exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  req.app.get('io').emit('statusUpdate', { id: req.params.id, deleted: true });
  res.status(204).end();
};

exports.getStatusHistory = async (req, res) => {
  const history = await StatusHistory.find({ serviceId: req.params.id }).populate('changedBy', 'email');
  res.json(history);
};
