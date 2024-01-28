import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import {MatDialogModule} from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { AppComponent } from '../app.component';
import { FirebaseService } from '../firebase.service';

import { ActivatedRoute } from '@angular/router';
import { doc, docData } from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, AppComponent , GameComponent, PlayerComponent, GameInfoComponent , MatIconModule, MatDividerModule, MatButtonModule, MatDialogModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy {
  
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;
  gameId:string = '';
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public firebaseService: FirebaseService) {



  }

  ngOnInit(): void {

    this.route.params.subscribe((params)=>{
      console.log('params: ',params['id']);
      this.gameId = params['id'];
      this.firebaseService.snapShotGameList();
      let docRef = doc(this.firebaseService.firestore, 'games',params['id']);
      docData(docRef).subscribe(game => {
        if (game) {
          this.game.stack = game['stack'];
          this.game.currentPlayer = game['currentPlayer'];
          this.game.playedCard = game['playedCard'];
          this.game.players = game['players'];
        }
      });
    })

    this.newGame();
    // console.log(this.firebaseService.getSingleDocRef('games', 'nZfTqIVxT4niY9k72zmO'));
    console.log();
    // this.test();
  }

  ngOnDestroy(): void {
   this.firebaseService.snapShotGameList();
  }

  saveGame(){
    this.firebaseService.updateGame(this.gameId, this.game.toJSon())
  }

  test(){

    // ein neues spiel wird erstellt
    this.firebaseService.addGame(this.game.toJSon());
    console.log('test');
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);

  }

  takeCard() {
    if (!this.pickCardAnimation) {
      let poppedCard = this.game.stack.pop();
      this.saveGame();
      if (poppedCard !== undefined) {
        this.currentCard = poppedCard;

        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

        console.log(this.currentCard);
        console.log('played:' + this.game.playedCard);
      } else {
        console.log('Keine Karte mehr im Stapel.');
      }
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCard.push(this.currentCard)
        this.saveGame();
        this.pickCardAnimation = false;

      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name:string) => {
      console.log('The dialog was closed', name);
      if(name && name.length > 0){
      this.game.players.push(name);
      this.saveGame();
      console.log(this.game)
    }
    });
  }
}
