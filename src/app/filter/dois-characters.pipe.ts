import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doisCharacters'
})
export class DoisCharactersPipe implements PipeTransform {

  transform(value: string,): string {
    let stringSplitted = value.split(" ");
    if (stringSplitted.length > 1) {
      if (stringSplitted[stringSplitted.length - 1].trim() == "")
        stringSplitted.pop();
      return stringSplitted[0][0].toUpperCase() + stringSplitted[stringSplitted.length - 1][0].toUpperCase();
    } else if (stringSplitted.length == 1) {
      return stringSplitted[0][0].toUpperCase();
    }
    return "Error";
  }

}
