// Gateway Notifications pour WebSocket admin (Socket.io + NestJS)
// Clean code, export minimal pour éviter l'erreur de module
import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class NotificationsGateway {
  /**
   * Envoie une notification à l’admin via WebSocket
   */
  sendAdminNotification(...args: any[]): void {
    // TODO: Implémenter l’émission de notification WebSocket côté admin
  }
}

