// clients.ts
// Requêtes et mutations GraphQL pour la gestion des clients (admin)
// Clean code, ultra commenté, à utiliser avec Apollo Client
import { gql } from "@apollo/client";

// Query : liste tous les clients
export const GET_CLIENTS = gql`
  query GetClients {
    users {
      id
      name
      email
      phone
      status
      role
    }
  }
`;

// Mutation : création d’un client
export const CREATE_CLIENT = gql`
  mutation CreateClient($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      email
      phone
      status
      role
    }
  }
`;

// Mutation : édition d’un client
export const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: Int!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      name
      email
      phone
      status
      role
    }
  }
`;

// Mutation : suppression d’un client
export const REMOVE_CLIENT = gql`
  mutation RemoveClient($id: Int!) {
    removeUser(id: $id) {
      id
    }
  }
`;
