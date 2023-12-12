import { gql } from '@apollo/client';

export const GET_CLIENTS = gql`
  query GetAllClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;
