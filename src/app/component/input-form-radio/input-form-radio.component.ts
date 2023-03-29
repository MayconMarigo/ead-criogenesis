import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'input-form-radio',
  templateUrl: './input-form-radio.component.html',
  styleUrls: ['./input-form-radio.component.css']
})
export class InputFormRadioComponent implements OnInit {
  @Input() radios:any[] = [];
  @Input() value: any | undefined;
  @Input() disabled: boolean = false;
  @Input() submitted: boolean | null = false;

  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  selecionar(indice: any){
    if(!this.disabled)
      this.value = this.estaSelecionado(indice) ? undefined : indice;
      this.change.emit(this.value);
  }

  estaSelecionado(indice: any){
    return this.value == indice;
  }

}
