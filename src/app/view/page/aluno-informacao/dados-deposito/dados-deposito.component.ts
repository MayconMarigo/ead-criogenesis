import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BancosEnum } from 'src/app/model/enums/bancos-enum';
import { ToolsUtils } from 'src/app/model/tools';
import { PagamentoService } from 'src/app/service/pagamento.service';

@Component({
  selector: 'dados-deposito',
  templateUrl: './dados-deposito.component.html',
  styleUrls: ['./dados-deposito.component.css']
})
export class DadosDepositoComponent extends ToolsUtils implements OnInit {
  dadosPessoais: boolean = false;
  contaBancaria: boolean = false;
  listaBancos: any = BancosEnum.bancos;
  listaBancosFiltrados: any = null;
  saveLoading: boolean = false;
  dadosDeposito: any = {
    pix: ''
  } as any;

  constructor(private pagamentoService: PagamentoService, private toastrService: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.carregarPagamento();
    this.listaBancosFiltrados = this.listaBancos;
  }

  triggerEvent(e: any, input: any) {
    if (!e) {
      input.value = ''
      this.filtrarBanco(input)
    }
  }

  filtrarBanco(filtro: any) {
    const valor: string = filtro.value;
    this.listaBancosFiltrados = this.listaBancos.filter((e: any) => this.removerAcentos(e.LongName).toLowerCase().includes(this.removerAcentos(valor).toLowerCase()) || e.COMPE.toLowerCase().includes(valor.toLowerCase()));
  }

  carregarPagamento() {
    this.pagamentoService.getPayments().subscribe((response) => {
      this.dadosDeposito = response ? response : {} as any;
      if (this.dadosDeposito.bank) while (this.dadosDeposito.bank.length < 3) {
        this.dadosDeposito.bank = "0" + this.dadosDeposito.bank;
      }
    })
  }

  salvar() {
    if (!this.saveLoading) {
      this.saveLoading = true;
      this.pagamentoService.postPayments(this.dadosDeposito).subscribe((response) => {
        this.saveLoading = false;
        this.toastrService.success('Informações salvas com sucesso!', 'Sucesso');
      }, (_) => {
        this.toastrService.error('Ocorreu algum erro, por favor entre em contato com o suporte!', 'Falha ao salvar');
        this.saveLoading = false;
      })
    }
  }

  habilitarCamposPessoais() {
    return this.dadosPessoais;
  }

  checkDadosPessoais() {
    this.dadosPessoais = !this.dadosPessoais;
  }
  checkContaBancaria() {
    this.contaBancaria = !this.contaBancaria;
  }
  validarEmail(email: NgModel) {
    if (this.dadosDeposito.pixType == 2) {
      const re = /\S+@\S+\.\S+/;
      const resultado = re.test(email.control.value);
      if (!resultado) {
        email.control.setErrors({ emailInvalido: true })
      } else {
        email.control.setErrors(null)
      }
    }
  }

  validarPix(model: NgModel) {
    if (this.dadosDeposito.pixType == 0) {
      this.validarCpfCnpj(model);
    } else if (this.dadosDeposito.pixType == 2) {
      this.validarEmail(model);
    }
  }

  validarCpfCnpj(model: NgModel) {
    const modelValue = model.control.value;
    if (modelValue.length <= 11) {
      this.validarCpf(model);
    } else {
      this.validarCnpj(model);
    }
  }

  validarCpf(cpfModel: NgModel) {
    const cpf = cpfModel.control.value;
    let soma = 0;
    for (let i = 0; i < cpf.length - 2; i++) {
      let numero = parseInt(cpf[i]);
      soma += numero * (10 - i);
    }
    const restoDigito1 = soma % 11;
    let identificadorDigito1 = 0;
    if (restoDigito1 >= 2) {
      identificadorDigito1 = 11 - restoDigito1;
    }

    if (identificadorDigito1.toString() != cpf[cpf.length - 2]) {
      cpfModel.control.setErrors({ cpfInvalido: true });
      return false;
    }

    soma = 0;
    for (let i = 0; i < cpf.length - 1; i++) {
      let numero = parseInt(cpf[i]);
      soma += numero * (11 - i);
    }

    const restoDigito2 = soma % 11;
    let identificadorDigito2 = 0;
    if (restoDigito2 >= 2) {
      identificadorDigito2 = 11 - restoDigito2;
    }

    if (identificadorDigito2.toString() != cpf[cpf.length - 1]) {
      cpfModel.control.setErrors({ cpfInvalido: true });
      return false;
    }

    cpfModel.control.setErrors(null);
    return true;
  }

  validarCnpj(cnpjModel: NgModel) {
    const cnpj = cnpjModel.control.value;
    let soma = 0;
    for (let i = 0; i < cnpj.length - 10; i++) {
      let numero = parseInt(cnpj[i]);
      soma += numero * (5 - i)
    }

    for (let i = 4; i < cnpj.length - 2; i++) {
      let numero = parseInt(cnpj[i]);
      soma += numero * (9 - (i - 4))
    }

    const restoDigito1 = soma % 11;
    let identificadorDigito1 = 0;

    if (restoDigito1 >= 2) {
      identificadorDigito1 = 11 - restoDigito1;
    }

    if (identificadorDigito1.toString() != cnpj[cnpj.length - 2]) {
      cnpjModel.control.setErrors({ cnpjInvalido: true });
      return false;
    }

    soma = 0;
    for (let i = 0; i < cnpj.length - 9; i++) {
      let numero = parseInt(cnpj[i]);
      soma += numero * (6 - i)
    }

    for (let i = 4; i < cnpj.length - 1; i++) {
      let numero = parseInt(cnpj[i]);
      soma += numero * (9 - (i - 4));
    }

    const restoDigito2 = soma % 11;
    let identificadorDigito2 = 0;

    if (restoDigito2 >= 2) {
      identificadorDigito2 = 11 - restoDigito2;
    }

    if (identificadorDigito2.toString() != cnpj[cnpj.length - 1]) {
      cnpjModel.control.setErrors({ cnpjInvalido: true });
      return false;
    }

    cnpjModel.control.setErrors(null);
    return true;
  }

  isCpf(pix: NgModel) {
    const valor = pix.control.value ? pix.control.value : '';
    if (valor.length <= 11) {
      if (valor.length == 11)
        pix.control.setErrors(null);
      return true;
    }
    // if (valor.length == 12)
    //   pix.control.setErrors({ mask: true });

    // if (valor.length == 14)
    //   pix.control.setErrors(null);

    return false;
  }
}
