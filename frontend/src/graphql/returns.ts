// returns.ts
// Requêtes et mutations GraphQL pour la gestion des retours (admin)
// Clean code, ultra commenté, à utiliser avec Apollo Client
import { gql } from "@apollo/client";

// Query : liste tous les retours
export const GET_RETURNS = gql`
  query GetReturns {
    returns {
      id
      order_id
      user_id
      status
      reason
      created_at
      updated_at
    }
  }
`;

// Mutation : création d’un retour
export const CREATE_RETURN = gql`
  mutation CreateReturn($data: CreateReturnInput!) {
    createReturn(data: $data) {
      id
      order_id
      user_id
      status
      reason
      created_at
      updated_at
    }
  }
`;

// Mutation : édition d’un retour
export const UPDATE_RETURN = gql`
  mutation UpdateReturn($id: Int!, $data: UpdateReturnInput!) {
    updateReturn(id: $id, data: $data) {
      id
      order_id
      user_id
      status
      reason
      created_at
      updated_at
    }
  }
`;

// Mutation : suppression d’un retour
export const REMOVE_RETURN = gql`
  mutation RemoveReturn($id: Int!) {
    removeReturn(id: $id) {
      id
    }
  }
`;
