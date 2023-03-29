import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'input-form-text',
  templateUrl: './input-form-text.component.html',
  styleUrls: ['./input-form-text.component.css']
})
export class InputFormTextComponent implements OnInit {
  selected: boolean = false;
  @ViewChild('input') input: any;

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputTextValue: string = '';
  @Input() disabled: string | boolean = false;
  @Input() mask: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() id: string = '';

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
    this.selected = true;
  }

  focusOutFunction() {
    this.selected = false;
  }
}
