import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation AddClient($newClient: AddClientInput!) {
    addClient(newClient: $newClient) {
      id
      name
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;
