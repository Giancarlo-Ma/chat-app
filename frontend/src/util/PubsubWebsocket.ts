import { PushMsg, PushType } from "common";

/* eslint-disable @typescript-eslint/no-explicit-any */


type Callback = (data: any) => void;

class PubSubWebSocket {
  private url: string;
  private websocket: WebSocket | null = null;
  private subscriptions: Map<string, Set<Callback>> = new Map();

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect(): void {
    this.websocket = new WebSocket(this.url);

    this.websocket.onmessage = (event: MessageEvent) => {
      const message: PushMsg = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.websocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.websocket.onclose = () => {
      console.log('WebSocket connection closed');
      // Optionally, handle reconnection logic here
    };

    this.websocket.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleMessage(message: PushMsg): void {
    const { PushType } = message;

    if (this.subscriptions.has(String(PushType))) {
      this.subscriptions.get(String(PushType))?.forEach(callback => callback(message));
    }
  }

  public subscribe(topic: PushType, callback: Callback): void {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set());
    }
    this.subscriptions.get(topic)?.add(callback);
  }

  public unsubscribe(topic: PushType, callback: Callback): void {
    if (this.subscriptions.has(topic)) {
      this.subscriptions.get(topic)?.delete(callback);
      if (this.subscriptions.get(topic)?.size === 0) {
        this.subscriptions.delete(topic);
      }
    }
  }

  // public publish(type: PushType, data: any): void {
  //   if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
  //     // const message: PushMsg = { PushType, data };
  //     this.websocket.send(JSON.stringify(message));
  //   } else {
  //     console.error('WebSocket is not open. Cannot publish message.');
  //   }
  // }
}

export const ws = new PubSubWebSocket('/ws')

// // Example usage:
// const pubSub = new PubSubWebSocket('ws://your-websocket-url');

// const handleNews = (data: any) => {
//   console.log('Received news:', data);
// };

// pubSub.subscribe('news', handleNews);

// pubSub.publish('news', { headline: 'Breaking news!', content: 'Details here...' });

// // Don't forget to handle cleanup:
// pubSub.unsubscribe('news', handleNews);
