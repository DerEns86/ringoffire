import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore = inject(Firestore);
  // unsubList;
  constructor() {



  }


  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
    //         -> Datenbankzugriff-<
  }


  snapShotGameList() {
    onSnapshot(this.getGamesRef(), (list) => {
      list.forEach(element => {
        console.log('from service-id:', element.id);
        console.log('from service-data:', element.data()['game']);
      });
    })

  }

  async addGame(item: {}) {
    await addDoc(this.getGamesRef(), item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => { console.warn("Document written with ID: ", docRef) }
    )
  }

  async updateGame(docId: string, item: {}) {
    await updateDoc(this.getSingleDocRef('games', docId), item).catch(
      (err) => { console.error(err) }
    ).then();
  }

  async deleteGame(colId: string, docId: string) {
    await deleteDoc(this.getSingleDocRef(colId, docId)).catch(
      (err) => { console.error(err) }
    )
  }
}
