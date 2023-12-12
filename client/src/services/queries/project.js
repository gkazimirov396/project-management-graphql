import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetAllProjects {
    projects {
      id
      name
      status
    }
  }
`;

export const GET_PROJECT = gql`
  query GetSingleProject($id: ID!) {
    project(id: $id) {
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
