import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pontuacao',
  templateUrl: './pontuacao.component.html',
  styleUrls: ['./pontuacao.component.css']
})
export class PontuacaoComponent implements OnInit {

  indice:number = 0;
  @Input('valor') indiceSelecionado:number = 0;
  @Input('label-font-size') labelFontSize:number = 1;
  @Input('label') label:string = '';
  @Input('margin-bottom') marginBottom:number = 0;
  @Input('star-font-size') starFontSize:number = 1.5;
  @Input('height-px') heightPixels:number = 60;
  @Input('readonly') readonly:boolean = false;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  selecionarIndice(indice:number){
    if(!this.readonly){
      if(this.indiceSelecionado == indice)
        this.indiceSelecionado = 0;
      else
        this.indiceSelecionado = indice;
      this.change.emit(this.indiceSelecionado);
    }
  }

  isMaior(indice:number){
    if(this.indice == 0)
      return this.indiceSelecionado >= indice;
    return this.indice >= indice;
  }

}
