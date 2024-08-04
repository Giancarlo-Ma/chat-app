import { cachedCollectionManager } from "./util/CachedCollectionManager";
import { messagesCollection } from "./util/ChatMessagesCollection";
import { sessionCollection } from "./util/SessionsCollection";

// new AbstractCachedCollection({
//   collection: roomCollection
// }).init()

cachedCollectionManager.addCollection(messagesCollection)
cachedCollectionManager.addCollection(sessionCollection)

cachedCollectionManager.init()