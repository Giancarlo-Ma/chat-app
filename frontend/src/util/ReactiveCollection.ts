import { ISession } from "common";

type Listener = () => void;


export class ReactiveCollection<T> {
    private items: Map<string, T> = new Map<string, T>();
    private listeners: Listener[] = [];

    constructor() { }
    // Subscribe a listener to changes in the collection
    public subscribe(listener: Listener): void {
        this.listeners.push(listener);
    }

    // Unsubscribe a listener from the collection
    public unsubscribe(listener: Listener): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    // Notify all subscribers about a change
    private notify(): void {
        this.listeners.forEach(listener => listener());
    }

    // Find an item by its id or return all items if no id is provided
    public find(): T[] | undefined {
        return Array.from(this.items.values());
        // if (id !== undefined) {
        //     return [this.items.get(id)];
        // } else {
        // }
    }

    // Upsert an item (update if exists, insert if not)
    public upsert(id: string, item: T): void {
        this.items.set(id, item);
        this.notify(); // Notify listeners of the change
    }

    // Remove an item by its id
    public remove(id: string): boolean {
        const result = this.items.delete(id);
        if (result) {
            this.notify(); // Notify listeners if an item was removed
        }
        return result;
    }
}

export const roomCollection = new ReactiveCollection<ISession>()