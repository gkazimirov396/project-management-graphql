import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import projectResolvers from '../resolvers/project.js';

import { ClientType } from './client.js';

export const AddProjectInputType = new GraphQLInputObjectType({
  name: 'AddProjectInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    status: {
      type: new GraphQLEnumType({
        name: 'ProjectStatus',
        values: {
          new: { value: 'Not Started' },
          progress: { value: 'In Progress' },
          completed: { value: 'Completed' },
        },
      }),
      defaultValue: 'Not Started',
    },
    clientId: { type: new GraphQLNonNull(GraphQLID) },
  },
});

export const UpdateProjectInputType = new GraphQLInputObjectType({
  name: 'UpdateProjectInput',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: {
      type: new GraphQLEnumType({
        name: 'ProjectStatusUpdate',
        values: {
          new: { value: 'Not Started' },
          progress: { value: 'In Progress' },
          completed: { value: 'Completed' },
        },
      }),
      defaultValue: 'Not Started',
    },
  },
});

export const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    client: {
      type: new GraphQLNonNull(ClientType),
      resolve: projectResolvers.getProjectClient,
    },
  }),
});
