import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private http: HttpClient) { }

  consultar(cep:string){
    // viacep.com.br/ws/01001000/json/
    return this.http.get('https://viacep.com.br/ws/'+cep+'/json/')
  }

}
