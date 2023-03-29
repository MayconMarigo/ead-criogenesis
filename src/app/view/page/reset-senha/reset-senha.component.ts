import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/service/dialog.service';

import { ToastrService } from 'ngx-toastr';
import { MarketingService } from 'src/app/service/marketing.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  @Input() inputSelectValue: string = '';

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  enviarReset() {
    // console.log(this.inputSelectValue);
    // return alert(this.inputSelectValue);
  }

  recuperarSenha() {
    this.dialogService
      .recuperarSenhaDialog()
      .afterClosed()
      .subscribe((response) => {});
  }
}
