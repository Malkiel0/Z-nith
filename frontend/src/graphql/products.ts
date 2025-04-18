// products.ts
// Requêtes et mutations GraphQL pour les produits (admin)
// Clean code, ultra commenté, à utiliser avec Apollo Client
import { gql } from "@apollo/client";

// Query : liste tous les produits
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      stock_quantity
      sku
      is_active
    }
  }
`;

// Mutation : création d’un produit
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($data: CreateProductInput!) {
    createProduct(data: $data) {
      id
      name
      description
      price
      stock_quantity
      sku
      is_active
    }
  }
`;

// Mutation : édition d’un produit
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $data: UpdateProductInput!) {
    updateProduct(id: $id, data: $data) {
      id
      name
      description
      price
      stock_quantity
      sku
      is_active
    }
  }
`;

// Mutation : suppression d’un produit
export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id) {
      id
    }
  }
`;
