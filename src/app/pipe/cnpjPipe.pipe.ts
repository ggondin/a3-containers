import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj',
})
export class CnpjPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';

    const cnpj = value.toString().replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cnpj.length !== 14) {
      return value.toString(); // Retorna o valor original se não for um CNPJ válido
    }

    // Formata o CNPJ no padrão: 00.000.000/0000-00
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
}
