import * as yup from 'yup';
import { asyncCatchWrapper } from '../../utils';
import { Service, NamedError } from '../models';

export const createService = asyncCatchWrapper(async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.status(201).send({ service });
});

export const getService = asyncCatchWrapper(async (req, res) => {
  const service = await Service.findById(req.params.serviceId);
  if (!service) throw new NamedError('NotFound');
  res.send({ service });
});

export const getClosestService = asyncCatchWrapper(async (req, res) => {
  const service = await Service.findClosest();
  res.send({ service });
});

export const getServices = asyncCatchWrapper(async (req, res) => {
  const { services, count } = await Service.find(req.query);
  res.send({ services, count });
});
export const updateService = asyncCatchWrapper(async (req, res) => {
  const serviceId = await yup.number().integer().validate(req.params.serviceId);
  const service = await Service.updateById(serviceId, req.body);
  if (!service) throw new Error('NotFound');
  res.send({ service });
});

export const deleteService = asyncCatchWrapper(async (req, res) => {
  const serviceId = await yup.number().integer().validate(req.params.serviceId);
  const count = await Service.deleteById(serviceId);
  if (!count) throw new NamedError('NotFound');
  res.status(204).send();
});
