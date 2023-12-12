import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
  mutation AddProject($newProject: AddProjectInput!) {
    addProject(newProject: $newProject) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($updatedProject: UpdateProjectInput!) {
    updateProject(updatedProject: $updatedProject) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;
