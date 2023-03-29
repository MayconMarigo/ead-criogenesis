import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
  selecionado: boolean = false;
  @ViewChild('input') input: any;

  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() inputTextValue: string = '';

  @Output() inputTextValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() blur = new EventEmitter();
  @Output() keyup = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  focusInput() {
    this.input.nativeElement.focus();
  }

  focusFunction() {
    this.selecionado = true;
  }

  focusOutFunction() {
    this.selecionado = false;
  }
}
