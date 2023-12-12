import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
} from 'graphql';

import {
  AddProjectInputType,
  ProjectType,
  UpdateProjectInputType,
} from './project.js';
import { AddClientInputType, ClientType } from './client.js';

import projectResolvers from '../resolvers/project.js';
import clientResolvers from '../resolvers/client.js';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: projectResolvers.getAllProjects,
    },
    project: {
      type: ProjectType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: projectResolvers.getProjectById,
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: clientResolvers.getAllClients,
    },
    client: {
      type: ClientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: clientResolvers.getClientById,
    },
  },
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addClient: {
      type: new GraphQLNonNull(ClientType),
      args: {
        newClient: { type: new GraphQLNonNull(AddClientInputType) },
      },
      resolve: clientResolvers.addClient,
    },
    deleteClient: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: clientResolvers.deleteClient,
    },
    addProject: {
      type: new GraphQLNonNull(ProjectType),
      args: {
        newProject: { type: new GraphQLNonNull(AddProjectInputType) },
      },
      resolve: projectResolvers.addProject,
    },
    deleteProject: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: projectResolvers.deleteProject,
    },
    updateProject: {
      type: ProjectType,
      args: {
        updatedProject: { type: new GraphQLNonNull(UpdateProjectInputType) },
      },
      resolve: projectResolvers.updateProject,
    },
  },
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
