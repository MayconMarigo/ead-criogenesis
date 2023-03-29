import { BancosEnum } from "./enums/bancos-enum";

export class ToolsUtils {
  listaBancos = BancosEnum.bancos as any;

  formatarBankCodigo(bank:string){
    if(!bank || bank.trim() == "")
      return "";
    while (bank.length < 3) {
      bank = "0"+bank;
    }
    const banco:any = this.listaBancos.filter((e:any)=>e.COMPE == bank)[0];
    return banco.COMPE + ' - ' + banco.LongName;
  }

  removerAcentos(texto: string): string{
    const comAcentos: string = "ÄÅÁÂÀÃäáâàãÉÊËÈéêëèÍÎÏÌíîïìÖÓÔÒÕöóôòõÜÚÛüúûùÇç";
    const semAcentos: string = "AAAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUuuuuCc";

    for (let i = 0; i < comAcentos.length; i++) {
      texto = texto.replace(comAcentos[i].toString(), semAcentos[i].toString());
    }
    return texto;
  }

  converterParaHoraMinutos(cargaHoraria:string){
    const hora = cargaHoraria.toString().split(',')[0];
    const minuto = cargaHoraria.toString().split(',')[1];
    const calculo = Math.ceil((60 * parseInt(minuto))/100);
    const minutoCalculado = calculo.toString().length == 1 ? calculo + '0' : (calculo.toString());

    return minuto ? hora+':'+minutoCalculado : hora+':00';
  }

  formatarPixType(tipo:string){
    switch (tipo) {
      case "0":
        return "CPF / CNPJ";
      case "1":
        return "Celular";
      case "2":
        return "E-mail";
      case "3":
        return "Aleatória";
      default:
        return "";
    }
  }

}
