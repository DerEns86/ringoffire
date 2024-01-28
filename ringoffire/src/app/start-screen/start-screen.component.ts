import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);
  game!: Game;
  constructor(private router : Router, public firebaseService: FirebaseService) {

  }

  async newGame(){
    //newGame
    let game = new Game();
    await addDoc(this.firebaseService.getGamesRef(), game.toJSon()).then((gameInfo) =>
    this.router.navigateByUrl('/game/' + gameInfo.id));
  }


}
