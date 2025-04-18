// notifications.ts
// Requêtes et mutations GraphQL pour la gestion des notifications (admin)
// Clean code, ultra commenté, à utiliser avec Apollo Client
import { gql } from "@apollo/client";

// Query : liste toutes les notifications
export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      id
      title
      message
      type
      is_read
      user_id
      created_at
    }
  }
`;

// Mutation : création d’une notification
export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($data: CreateNotificationInput!) {
    createNotification(data: $data) {
      id
      title
      message
      type
      is_read
      user_id
      created_at
    }
  }
`;

// Mutation : édition d’une notification
export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification($id: Int!, $data: UpdateNotificationInput!) {
    updateNotification(id: $id, data: $data) {
      id
      title
      message
      type
      is_read
      user_id
      created_at
    }
  }
`;

// Mutation : suppression d’une notification
export const REMOVE_NOTIFICATION = gql`
  mutation RemoveNotification($id: Int!) {
    removeNotification(id: $id) {
      id
    }
  }
`;
