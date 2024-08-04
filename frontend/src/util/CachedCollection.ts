import { ReactiveCollection } from "./ReactiveCollection";

const hasId = <T>(record: T): record is T & { id: string } => typeof record === 'object' && record !== null && 'id' in record;


export abstract class AbstractCachedCollection<T extends { id: string }> {
  public collection!: ReactiveCollection<T>; // Use ! to indicate that it will be initialized

  protected abstract callLoad(): Promise<T[]>;

  protected abstract setupListener(): void;

  private async loadFromServerAndPopulate() {
    await this.loadFromServer();
    // await this.save();
  }

  protected handleLoadFromServer(record: T): T {
    return record as unknown as T;
  }
  private async loadFromServer() {
    // const startTime = new Date();
    // const lastTime = this.updatedAt;
    const data = await this.callLoad();
    console.log(`${data.length} records loaded from server`);

    data.forEach((record) => {
      const newRecord = this.handleLoadFromServer(record);
      if (!hasId(newRecord)) {
        return;
      }

      const { id } = newRecord;
      this.collection.upsert(id, newRecord);
      // this.emit('changed', newRecord as any); // TODO: investigate why this is needed

      // if (hasUpdatedAt(newRecord) && newRecord._updatedAt > this.updatedAt) {
      // 	this.updatedAt = newRecord._updatedAt;
      // }
    });
    // this.updatedAt = this.updatedAt === lastTime ? startTime : this.updatedAt;
  }


  async init() {
    await this.loadFromServerAndPopulate();
    this.setupListener()
  }
}