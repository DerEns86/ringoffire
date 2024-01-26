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
  constructor(public dialog: MatDialog, public firebaseService: FirebaseService) {



  }

  ngOnInit(): void {
    this.newGame();
    
  }

  ngOnDestroy(): void {
    this.firebaseService.snapShotGameList();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);

    this.firebaseService.snapShotGameList();
    console.log('unsub form game: ', this.firebaseService.snapShotGameList())
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      let poppedCard = this.game.stack.pop();
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
      console.log(this.game)
    }
    });
  }
}
