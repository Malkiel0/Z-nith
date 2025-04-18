// categories.ts
// Requêtes et mutations GraphQL pour la gestion des catégories (admin)
// Clean code, ultra commenté, à utiliser avec Apollo Client
import { gql } from "@apollo/client";

// Query : liste toutes les catégories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
      is_active
    }
  }
`;

// Mutation : création d’une catégorie
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      name
      description
      is_active
    }
  }
`;

// Mutation : édition d’une catégorie
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: Int!, $data: UpdateCategoryInput!) {
    updateCategory(id: $id, data: $data) {
      id
      name
      description
      is_active
    }
  }
`;

// Mutation : suppression d’une catégorie
export const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($id: Int!) {
    removeCategory(id: $id) {
      id
    }
  }
`;
