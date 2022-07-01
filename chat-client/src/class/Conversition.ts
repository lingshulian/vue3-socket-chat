export default class Conversition {
  sendId: number;
  recipientId: number;
  content: string;
  type: number;
  status: number;
  timestamp: string | number;
  createAt: string;
  isRead: boolean;
  avatar: string;
  constructor(
    sendId: number,
    recipientId: number,
    content: string,
    type: number,
    status: number,
    timestamp: string,
    createAt: string,
    isRead: boolean,
    Avatar: string) {
    this.sendId = sendId;
    this.recipientId = recipientId;
    this.content = content;
    this.type = type;
    this.status = status;
    this.timestamp = timestamp;
    this.createAt = createAt;
    this.isRead = isRead;
    this.avatar = Avatar;
  }
}