// Fichier centralisant toutes les requêtes et mutations GraphQL pour les commandes (orders)
// Clean code, commentaires détaillés pour chaque opération

import { gql } from '@apollo/client';

/**
 * Requête pour récupérer toutes les commandes
 */
export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      status
      total
      createdAt
      updatedAt
      client {
        id
        name
        email
      }
      products {
        id
        name
        quantity
        price
      }
      ...
    }
  }
`;

/**
 * Mutation pour mettre à jour une commande
 */
export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $data: UpdateOrderInput!) {
    updateOrder(id: $id, data: $data) {
      id
      status
      total
      updatedAt
    }
  }
`;

/**
 * Mutation pour supprimer une commande
 */
export const REMOVE_ORDER = gql`
  mutation RemoveOrder($id: ID!) {
    removeOrder(id: $id) {
      id
    }
  }
`;
