// coupons.ts
// Requêtes et mutations GraphQL pour la gestion des coupons (admin)
// Clean code, ultra commenté, à utiliser avec Apollo Client
import { gql } from "@apollo/client";

// Query : liste tous les coupons
export const GET_COUPONS = gql`
  query GetCoupons {
    coupons {
      id
      code
      discount
      type
      expiration_date
      is_active
    }
  }
`;

// Mutation : création d’un coupon
export const CREATE_COUPON = gql`
  mutation CreateCoupon($data: CreateCouponInput!) {
    createCoupon(data: $data) {
      id
      code
      discount
      type
      expiration_date
      is_active
    }
  }
`;

// Mutation : édition d’un coupon
export const UPDATE_COUPON = gql`
  mutation UpdateCoupon($id: Int!, $data: UpdateCouponInput!) {
    updateCoupon(id: $id, data: $data) {
      id
      code
      discount
      type
      expiration_date
      is_active
    }
  }
`;

// Mutation : suppression d’un coupon
export const REMOVE_COUPON = gql`
  mutation RemoveCoupon($id: Int!) {
    removeCoupon(id: $id) {
      id
    }
  }
`;
