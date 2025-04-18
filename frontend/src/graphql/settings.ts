// Fichier centralisant toutes les requêtes et mutations GraphQL pour les paramètres (settings)
// Clean code, commentaires détaillés pour chaque opération

import { gql } from '@apollo/client';

/**
 * Requête pour récupérer les paramètres de la boutique
 */
export const GET_SETTINGS = gql`
  query GetSettings {
    settings {
      id
      shopName
      email
      currency
      theme
      maintenance
    }
  }
`;

/**
 * Mutation pour mettre à jour les paramètres
 */
export const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($data: UpdateSettingsInput!) {
    updateSettings(data: $data) {
      id
      shopName
      email
      currency
      theme
      maintenance
    }
  }
`;
