import errors from 'http-errors';

import { Client } from '../../models/Client.js';
import { Project } from '../../models/Project.js';

import { validateInput } from '../../utils/validateInput.js';
import {
  NewProjectSchema,
  UpdateProjectSchema,
} from '../../validation/project.js';

const getProjectClient = async (parent, args) => {
  const client = await Client.findByPk(parent.clientId);
  if (!client) {
    console.log(parent);
    throw new errors.NotFound('Client not found!');
  }

  return client;
};

const getAllProjects = async (parent, args) => {
  const projects = await Project.findAll();

  return projects;
};

const getProjectById = async (parent, args) => {
  const project = await Project.findByPk(args.id);
  if (!project) {
    throw new errors.NotFound('Project not found!');
  }

  return project;
};

const addProject = async (
  parent,
  { newProject: { name, description, status, clientId } }
) => {
  await validateInput(NewProjectSchema, {
    name,
    description,
    status,
    clientId,
  });

  const newProject = await Project.create({
    name,
    description,
    status,
    clientId,
  });

  return newProject;
};

const updateProject = async (
  parent,
  { updatedProject: { id, name, description, status } }
) => {
  await validateInput(UpdateProjectSchema, {
    id,
    name,
    description,
    status,
  });

  const project = await Project.findByPk(id);
  if (!project) {
    throw new errors.NotFound('Project not found!');
  }

  project.set({ name, description, status });

  return await project.save();
};

const deleteProject = async (parent, { id }) => {
  const project = await Project.findByPk(id);
  if (!project) {
    throw new errors.NotFound('Project not found!');
  }

  return !!(await Project.destroy({ where: { id: project.id } }));
};

export default {
  getProjectClient,
  getAllProjects,
  getProjectById,
  addProject,
  deleteProject,
  updateProject,
};
