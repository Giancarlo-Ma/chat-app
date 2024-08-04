import { MessageType, Msg, PushMsg, PushType } from 'common';
export function generateRandomPushMsg(): PushMsg {
  const randomMsg: Msg = {
    MessageID: getRandomString(10),
    ReplyMessageID: getRandomString(10),
    MsgType: getRandomEnumValue(MessageType), // Replace with actual MessageType enum
    SessionID: getRandomString(8),
    Inputs: [getRandomString(5), getRandomString(5)],
    Reply: getRandomString(15),
    Feedback: getRandomNumber(100),
    SlotInfo: { key1: getRandomString(5), key2: getRandomString(5) },
    BasicInfo: {
      // Fill in random AutoPusBotBasic properties here
    },
    DelaySecond: getRandomNumber(10),
    CreateTime: Date.now()
  };

  const pushMsg: PushMsg = {
    PushType: getRandomEnumValue(PushType),
    SessionID: getRandomString(8),
    CustomerOpenId: getRandomString(12),
    IsTransferToManual: getRandomBool(),
    IsPause: getRandomBool(),
    Msg: randomMsg
  };

  return pushMsg;
}


function getRandomEnumValue<T extends { [key: string]: string | number }>(enumObj: T): T[keyof T] {
  const enumValues = Object.values(enumObj) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}


function getRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

function getRandomBool(): boolean {
  return Math.random() < 0.5;
}

function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}