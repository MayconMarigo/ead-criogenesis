import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/model/aluno';
import { EstadosEnum } from 'src/app/model/enums/estados-enum';
import { ToolsUtils } from 'src/app/model/tools';
import { AlunoService } from 'src/app/service/aluno.service';
import { AuthService } from 'src/app/service/auth.service';
import { ViaCepService } from 'src/app/service/via-cep.service';

@Component({
  selector: 'dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.css']
})
export class DadosCadastraisComponent extends ToolsUtils implements OnInit {
  aluno: Aluno = {} as Aluno;

  variable = '';
  listaEstados: any = [];
  listaEstadosFiltradas: any = [];
  selected: boolean = false;
  @ViewChild('input') input: any;

  customPatterns = { '0': { pattern: new RegExp('\[0-9\]')}, 'X': { pattern: new RegExp('\[X+x+0-9\]')} };

  constructor(private alunoService: AlunoService, private toastrService: ToastrService, private viaCepService: ViaCepService, private authService:AuthService) {
    super();
   }

  ngOnInit(): void {
    this.listaEstados = JSON.parse(JSON.stringify(EstadosEnum.estados));
    this.listaEstadosFiltradas = this.listaEstados;
    this.carregarDados();
  }

  triggerEvent(e: any, input: any) {
    if (!e) {
      input.value = ''
      this.filtrarEstado(input)
    }
  }

  carregarDados() {
    this.alunoService.getFullRegister().subscribe((response: any) => {
      this.aluno = response;
      this.aluno.birthday = this.aluno.birthday ? this.formatarDataFromDB(this.aluno.birthday) : '';
    })
  }

  formatarDataFromDB(data: string) {
    const dataSplitted = data.split('-');
    return dataSplitted[2] + dataSplitted[1] + dataSplitted[0];
  }
  formatarDataToDB(data: string) {
    return data.substring(4, 8) + '-' + data.substring(2, 4) + '-' + data.substring(0, 2);
  }

  consultarCep(cep: NgModel) {
    if (cep.valid)
      this.viaCepService.consultar(cep.control.value).subscribe((response: any) => {
        this.aluno.city = response.localidade;
        this.aluno.state = response.uf;
        this.aluno.address = response.logradouro;
        this.aluno.neighborhood = response.bairro;
      });
  }

  filtrarEstado(filtro: any) {
    const valor: string = filtro.value;
    this.listaEstadosFiltradas = this.listaEstados.filter((e: any) => this.removerAcentos(e.nome).toLowerCase().includes(this.removerAcentos(valor).toLowerCase()));
  }

  confirmar(form: NgForm) {
    if (form.controls['email2'].hasError('emailInvalido') && (form.controls['email2'].value == null || form.controls['email2'].value.trim() == '')) {
      form.controls['email2'].setErrors(null);
    }
    if (form.valid) {
      this.aluno.birthday = this.formatarDataToDB(this.aluno.birthday);
      this.alunoService.saveFullRegister(this.aluno).subscribe((response: any) => {
        this.toastrService.success('Informações salvas com sucesso!', 'Sucesso');
        this.aluno = response;
        this.alunoService.setUser({name: this.aluno.name, email: this.aluno.email});
        this.aluno.birthday = this.aluno.birthday ? this.formatarDataFromDB(this.aluno.birthday) : '';
      }, (error) => {
        this.aluno.birthday = this.aluno.birthday ? this.formatarDataFromDB(this.aluno.birthday) : '';
      })
    } else {
      this.toastrService.warning('Preencha os campos corretamente!', 'Campos inválidos');
    }
    return true
  }

  selecionarEstado(estado: any) {
    this.variable = estado.nome;
  }

  receberRetorno(e: any) {
    return e
  }

  validarEmail(email: NgModel) {
    const re = /\S+@\S+\.\S+/;
    const resultado = re.test(email.control.value);
    if (!resultado) {
      email.control.setErrors({ emailInvalido: true })
      return false;
    }
    email.control.setErrors(null)
    return true;
  }

  validarCpfCnpj(model: NgModel) {
    const modelValue = model.control.value;
    if (modelValue.length <= 11) {
      this.validarCpf(model);
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
    return true;
  }

  // validarCnpj(cnpjModel: NgModel) {
  //   const cnpj = cnpjModel.control.value;
  //   let soma = 0;
  //   console.log(cnpj[5])
  //   for (let i = 0; i < cnpj.length - 10; i++) {
  //     let numero = parseInt(cnpj[i]);
  //     soma += numero * (5 - i)
  //   }

  //   for (let i = 4; i < cnpj.length - 2; i++) {
  //     let numero = parseInt(cnpj[i]);
  //     soma += numero * (9 - (i - 4))
  //   }

  //   const restoDigito1 = soma % 11;
  //   let identificadorDigito1 = 0;

  //   if (restoDigito1 >= 2) {
  //     identificadorDigito1 = 11 - restoDigito1;
  //   }

  //   if (identificadorDigito1.toString() != cnpj[cnpj.length - 2]) {
  //     cnpjModel.control.setErrors({ cnpjInvalido: true });
  //     return false;
  //   }

  //   soma = 0;
  //   for (let i = 0; i < cnpj.length - 9; i++) {
  //     let numero = parseInt(cnpj[i]);
  //     soma += numero * (6 - i)
  //   }

  //   for (let i = 4; i < cnpj.length - 1; i++) {
  //     let numero = parseInt(cnpj[i]);
  //     soma += numero * (9 - (i - 4));
  //   }

  //   const restoDigito2 = soma % 11;
  //   let identificadorDigito2 = 0;

  //   if (restoDigito2 >= 2) {
  //     identificadorDigito2 = 11 - restoDigito2;
  //   }

  //   if (identificadorDigito2.toString() != cnpj[cnpj.length - 1]) {
  //     cnpjModel.control.setErrors({ cnpjInvalido: true });
  //     return false;
  //   }

  //   return true;
  // }

  validarRg(rgModel: NgModel) {
    const rg = rgModel.control.value;
    let soma = 0;
    for (let i = 0; i < rg.length - 1; i++) {
      let numero = parseInt(rg[i]);
      soma += numero * (i + 2)
    }
    const resto = soma % 11;
    const identificador = 11 - resto;

    if (identificador.toString() == rg[rg.length - 1]) {
      rgModel.control.setErrors(null);
      return true;
    }
    rgModel.control.setErrors({ rgInvalido: true });
    return false;
  }

  validarDataPassado(dataNascimentoModel: NgModel) {
    const dataNascimento = dataNascimentoModel.control.value;
    if (dataNascimento.length == 8) {
      const dataNascimentoDate = new Date(this.formatarDataToDB(dataNascimento));
      const dataAtual = new Date();
      if (dataNascimentoDate > dataAtual) {
        dataNascimentoModel.control.setErrors({ dataNaoPassado: true })
      } else {
        dataNascimentoModel.control.setErrors(null)
      }
    }
  }
}
