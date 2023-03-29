import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'recuperar-senha-dialog',
  templateUrl: './recuperar-senha-dialog.component.html',
  styleUrls: ['./recuperar-senha-dialog.component.css'],
})
export class RecuperarSenhaDialogComponent implements OnInit {
  emailUsuario: string = '';
  codigoValor: string = '';
  novaSenha: string = '';
  senhaForca: number = 0;

  codigoRecebido: boolean = false;

  constructor(
    private loginService: LoginService,
    private dialogRef: MatDialogRef<RecuperarSenhaDialogComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  enviarEmail(form: NgForm) {
    this.loginService.requestCode(this.emailUsuario).subscribe(
      (response) => {
        form.resetForm();
        this.codigoRecebido = true;
      },
      (_) =>
        this.toastrService.error(
          'Nenhum cadastro com esse e-mail foi encontrado'
        )
    );
  }

  salvarNovaSenha() {
    this.loginService
      .restorePassword(this.codigoValor, this.novaSenha)
      .subscribe(
        (response) => {
          this.toastrService.success('Senha alterada com sucesso!', 'Sucesso');
          this.dialogRef.close(true);
        },
        (_) => {
          this.toastrService.error('Código inválido!');
        }
      );
  }

  verificarForcaSenha(e: any) {
    const letraMinusculo = new RegExp('(?=.*[a-z])');
    const letraMaiusculo = new RegExp('(?=.*[A-Z])');
    const digito = new RegExp('(?=.*[0-9])');
    const caracterEspecial = new RegExp('(?=.*[^A-Za-z0-9])');
    const tamanho8 = new RegExp('(?=.{8,})');
    this.senhaForca = 0;
    const senha: string = e.target.value;
    if (letraMinusculo.test(senha)) this.senhaForca++;
    if (letraMaiusculo.test(senha)) this.senhaForca++;
    if (digito.test(senha)) this.senhaForca++;
    if (caracterEspecial.test(senha)) this.senhaForca++;
    if (tamanho8.test(senha)) this.senhaForca++;
  }

  medidorDeForca(valor: number) {
    if (valor >= 5) return 'Muito Forte';
    if (valor == 4) return 'Forte';
    if (valor == 3 || valor == 2) return 'Médio';
    return 'Fraco';
  }
}
