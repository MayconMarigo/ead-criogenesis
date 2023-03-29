import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'input-form-checkbox',
  templateUrl: './input-form-checkbox.component.html',
  styleUrls: ['./input-form-checkbox.component.css']
})
export class InputFormCheckboxComponent implements OnInit {
  @Input() nome:string = "";
  @Input() valor:boolean = false;
  @Input() disabled:boolean = false;
  @Input() submitted: boolean | null = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  selecionar(){
    if(!this.disabled){
      this.valor = !this.valor;
      this.change.emit(this.valor);
    }
  }

}
