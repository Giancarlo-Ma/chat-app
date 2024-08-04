/* eslint-disable @typescript-eslint/no-explicit-any */

import { AbstractCachedCollection } from "./CachedCollection";

class CachedCollectionManager {
  private collections: AbstractCachedCollection<any>[] = [];

  public addCollection<T extends { id: string }>(cachedCollection: AbstractCachedCollection<T>) {

    this.collections.push(cachedCollection);
  }

  public async init() {
    await Promise.all(this.collections.map(collection => collection.init()));
  }
}

export const cachedCollectionManager = new CachedCollectionManager()