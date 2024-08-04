import { IMessage, PushType } from "common";
import { fetchChatMessages } from "../api/room";
import { AbstractCachedCollection } from "./CachedCollection";
import { ws } from "./PubsubWebsocket";
import { ReactiveCollection } from "./ReactiveCollection";

class ChatMessagesCollection extends AbstractCachedCollection<IMessage> {
  constructor() {
    super()
    this.collection = new ReactiveCollection<IMessage>()
  }

  protected async callLoad(): Promise<IMessage[]> {
    // Implement API call specific to chat messages
    return fetchChatMessages() as unknown as IMessage[];
  }

  protected setupListener() {
    ws.subscribe(PushType.ChatMsg, (msg) => {
      console.log('Chat message received:', msg);
    });
  }
}


export const messagesCollection = new ChatMessagesCollection()
