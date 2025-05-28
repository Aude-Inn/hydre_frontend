// Notif type / Message type
export interface GameNotificationData {
    _id: string;
    name: string;
    timestamp: string;
  }
  
 export interface MessageData {
    _id: string;
    userId: string;
    userName: string;
    text: string;
    timestamp: string;
  }
