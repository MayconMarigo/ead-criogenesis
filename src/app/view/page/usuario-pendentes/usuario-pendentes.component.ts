import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EstadosEnum } from 'src/app/model/enums/estados-enum';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'usuario-pendentes',
  templateUrl: './usuario-pendentes.component.html',
  styleUrls: ['./usuario-pendentes.component.css']
})
export class UsuarioPendentesComponent implements OnInit {

  listaUsuarios = [] as any;
  listaExpandido: number[] = [];
  listaEstados = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.listaEstados = JSON.parse(JSON.stringify(EstadosEnum.estados));
    this.carregarUsuariosPendentes()
  }
  carregarUsuariosPendentes() {
    this.usuarioService.usersPending().subscribe((response: any) => {
      this.listaUsuarios = response;
    })
  }
  recusarUsuario(usuario: any, indice: number) {
    this.usuarioService.userPendingAction(usuario.id, '2').subscribe((response) => {
      if (this.listaExpandido.includes(indice))
        this.selecionarUsuario(indice)
      this.carregarUsuariosPendentes()
    }, (error) => {
      if (error.status == 200) {
        if (this.listaExpandido.includes(indice))
          this.selecionarUsuario(indice)
        this.carregarUsuariosPendentes()
      }
    })
  }
  aprovarUsuario(usuario: any, indice: number) {
    this.usuarioService.userPendingAction(usuario.id, '1').subscribe((response) => {
      if (this.listaExpandido.includes(indice))
        this.selecionarUsuario(indice)
      this.carregarUsuariosPendentes()
    }, (error) => {
      if (error.status == 200) {
        if (this.listaExpandido.includes(indice))
          this.selecionarUsuario(indice)
        this.carregarUsuariosPendentes()
      }
    })
  }

  formatarEstado(sigla: string) {
    const estado: any = this.listaEstados.find((e: any) => e.sigla == sigla);
    return estado ? estado.nome : "";

  }

  selecionarUsuario(indice: number) {
    if (!this.listaExpandido.includes(indice)) {
      this.listaExpandido.push(indice);
    } else {
      const indiceRemover = this.listaExpandido.findIndex(e => e == indice);
      this.listaExpandido.splice(indiceRemover, 1);
    }
  }

  expandirUsuario(indice: number) {
    return this.listaExpandido.filter(e => e == indice).length > 0;
  }
}
