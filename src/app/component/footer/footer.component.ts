import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() footerUp? = true;
  constructor() { }

  ngOnInit(): void {
  }

  irParaLink(url: string){
    window.open(url, "_blank");
}
}
