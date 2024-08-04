import { ISession } from 'common';
import React, { useEffect, useState } from 'react';
import { sessionCollection } from './util/SessionsCollection';
interface Props {
  name?: string;
}

const Sidebar: React.FC<Props> = () => {
  // const roomsList = useRoomList();
  const [rooms, setRooms] = useState<ISession[]>([])
  const collection = sessionCollection.collection
  useEffect(() => {
    // Listener function to force re-render
    const handleCollectionChange = () => {
      const x = collection.find()
      if (x) {
        setRooms(x)
      }
    };

    // Subscribe to collection changes
    collection.subscribe(handleCollectionChange);

    // Cleanup subscription on component unmount
    return () => {
      collection.unsubscribe(handleCollectionChange);
    };
  }, [collection]);

  return (
    <div>
      {
        rooms.map((r: ISession) => <div key={r.id}>{JSON.stringify(r)}</div>)
      }
    </div>
  );
};

export default Sidebar;