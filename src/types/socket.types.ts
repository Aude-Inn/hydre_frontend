export interface GameNotificationData {
  name: string;
  timestamp: string;
}

export interface MessageData {
  _id: string;
  userId: string;
  userName?: string;
  text: string;
  timestamp: string | Date;
 toUserId?: string | null;
  replyTo?: string;
  replyText?: string;
  replyTimestamp?: string | Date;
}

