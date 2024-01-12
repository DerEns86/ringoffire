import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule , GameComponent, PlayerComponent, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;
  constructor() {
   
    

  }

ngOnInit(): void {
   this.newGame();
}

newGame(){
 this.game = new Game();
 console.log(this.game);
}

  takeCard() {
     if(!this.pickCardAnimation){   
    let poppedCard = this.game.stack.pop();
  if (poppedCard !== undefined) {
    this.currentCard = poppedCard;
    
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
}
