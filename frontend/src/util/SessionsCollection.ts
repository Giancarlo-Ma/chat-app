import { ISession, PushType } from "common";
import { fetchSessions } from "../api/room";
import { AbstractCachedCollection } from "./CachedCollection";
import { ws } from "./PubsubWebsocket";
import { ReactiveCollection } from "./ReactiveCollection";

class SessionCollection extends AbstractCachedCollection<ISession> {
  constructor() {
    super()
    this.collection = new ReactiveCollection<ISession>()
  }

  protected async callLoad(): Promise<ISession[]> {
    // Implement API call specific to chat messages
    return fetchSessions() as unknown as ISession[];
  }

  protected setupListener() {
    ws.subscribe(PushType.ChatMsg, (msg) => {
      console.log('Chat session received:', msg);
    });
  }
}

export const sessionCollection = new SessionCollection()

