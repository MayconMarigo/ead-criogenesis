import { Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'input-form-select',
  templateUrl: './input-form-select.component.html',
  styleUrls: ['./input-form-select.component.css']
})
export class InputFormSelectComponent implements OnInit {
  selected: boolean = false;
  @ViewChild('teste') teste: any;
  @ViewChild('input') input: any;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputSelectValue: string = '';

  @Output() inputSelectValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() blur = new EventEmitter();
  @Output() keyup = new EventEmitter();
  constructor(@Inject(ElementRef) private element: ElementRef) {
  }

  ngOnInit(): void {
  }

  focusFunction() {
    this.selected = true;
    this.input.nativeElement.focus();
  }

  focusOutFunction() {
    setTimeout(() => {
      this.selected = false;
    }, 100);
  }

}
