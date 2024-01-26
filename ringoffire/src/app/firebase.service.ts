import { Injectable, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore = inject(Firestore);
  // unsubList;
  constructor() {

    

   }


   getGamesRef(){
    return collection(this.firestore, 'games');
  }

  snapShotGameList(){
   onSnapshot(this.getGamesRef(), (list)=>{
      list.forEach(element => {
        console.log('service: ',element.id);
        console.log(element.data());
      });
    })
    
  }
}
