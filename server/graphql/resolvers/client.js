import errors from 'http-errors';

import { Client } from '../../models/Client.js';

import { validateInput } from '../../utils/validateInput.js';
import { NewClientSchema } from '../../validation/client.js';

const getAllClients = async (parent, args) => {
  const clients = await Client.findAll();

  return clients;
};

const getClientById = async (parent, args) => {
  const client = await Client.findByPk(args.id);
  if (!client) {
    throw new errors.NotFound('Client not found!');
  }

  return client;
};

const addClient = async (parent, { newClient: { name, email, phone } }) => {
  await validateInput(NewClientSchema, { name, email, phone });

  const newClient = await Client.create({
    name,
    email,
    phone,
  });

  return newClient;
};

const deleteClient = async (parent, { id }) => {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new errors.NotFound('Client not found!');
  }

  return !!(await Client.destroy({ where: { id: client.id } }));
};

export default { getAllClients, getClientById, addClient, deleteClient };
