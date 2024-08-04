export interface IMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

export interface ISession {
  id: string;
  name: string;
  createdAt: Date;
  latestMessage: IMessage | null;
}
export enum WsMessageType {
  ROOM_UPDATE = 'ROOM_UPDATE'
}

export enum PushType {
  TransToManual = '1',
  ChatMsg = '2'
}

export enum MessageType {
  MessageTypeUserInputs = '1',           // 用户输入
  MessageTypeAIReply = '2',              // AI回复
  MessageTypePush = '4',                 // 主动推送
  MessageTypeWelcome = '5',              // 欢迎语
  MessageManualService = '6',            // 人工客服回复
  MessageTypeOpenChat = '7',             // 开口消息
  MessageTypeEnterPrivateAutoPush = '8', // EnterPrivateAutoPush
  MessageTypeOther = '999'               // 非text类型消息
}

interface AutoPusBotBasic {
  // Define the properties of AutoPusBotBasic here
}

export interface Msg {
  MessageID?: string;
  ReplyMessageID?: string;
  MsgType?: MessageType;
  SessionID?: string;
  Inputs?: string[];
  Reply?: string;
  Feedback?: number;
  SlotInfo?: { [key: string]: string };
  BasicInfo?: AutoPusBotBasic;
  DelaySecond?: number;
  CreateTime?: number;
}

export interface PushMsg {
  PushType: string;
  SessionID: string;
  CustomerOpenId: string;
  IsTransferToManual?: boolean;
  IsPause?: boolean;
  Msg?: Msg;
}
