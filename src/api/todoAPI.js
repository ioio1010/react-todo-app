import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  limit,
  query,
  startAfter,
} from "firebase/firestore/lite";

export class TodoAPI {
  static FIRESTORE_PATH = "todos";

  static async getAll(
    firestoreDB,
    nextLoadSegmentPath,
    orderField = "createdAt",
    orderFieldDirection = "desc",
    limitPerRequest = 5
  ) {
    const buildQuery = () => {
      if (nextLoadSegmentPath) {
        return query(
          collection(firestoreDB, TodoAPI.FIRESTORE_PATH),
          orderBy(orderField, orderFieldDirection),
          startAfter(nextLoadSegmentPath),
          limit(limitPerRequest)
        );
      }
      return query(
        collection(firestoreDB, TodoAPI.FIRESTORE_PATH),
        orderBy(orderField, orderFieldDirection),
        limit(limitPerRequest)
      );
    };

    const dbCollection = buildQuery();

    const docsSnapshots = await getDocs(dbCollection);

    const entities = docsSnapshots.docs.map((doc) => {
      return { ...doc.data(), segmentPath: doc.id };
    });

    return {
      entities: entities,
      nextLoadSegmentPath: docsSnapshots.docs[docsSnapshots.docs.length - 1],
    };
  }

  static async add(todo, firestoreDB) {
    const response = await addDoc(
      collection(firestoreDB, TodoAPI.FIRESTORE_PATH),
      todo
    );

    todo["segmentPath"] = response.id;

    return todo;
  }

  static async remove(segmentPath, firestoreDB) {
    await deleteDoc(doc(firestoreDB, TodoAPI.FIRESTORE_PATH, segmentPath));
  }
}
