export interface GameNotificationData {
    name: string;
    timestamp: string;
  }
  
 export interface MessageData {
    _id: string;
    userId: string;
    userName: string;
    text: string;
    timestamp: string;
    fromAdmin?: boolean;
    replyTo?: string | null;
    toUserId?: string | null;
  }
