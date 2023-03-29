import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'receber-email-usuario',
  templateUrl: './receber-email-usuario.component.html',
  styleUrls: ['./receber-email-usuario.component.css']
})
export class ReceberEmailUsuarioComponent implements OnInit {

  listaUsuarios = [] as any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(){
    this.usuarioService.usersAgreed().subscribe((response)=>{
      this.listaUsuarios = response;
    })
  }

}
