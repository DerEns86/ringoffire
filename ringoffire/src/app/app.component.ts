import { Component, OnInit, inject ,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { FirebaseService } from './firebase.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'ringoffire';
  firestore = inject(Firestore);
  // unsubList;
constructor(public firebaseService: FirebaseService){
//   this.unsubList = onSnapshot(this.getGamesRef(), (list)=>{
//     list.forEach(element => {
//       console.log(element.id);
//       console.log(element.data());
//     });
//   })


// }

//   ngOnInit(): void {
//     const aCollection = collection(this.firestore, 'games');
//     console.log('test', aCollection);
//   }

//   ngOnDestroy(): void {
      
//   }

//   getGamesRef(){
//     return collection(this.firestore, 'games');
  }


}
