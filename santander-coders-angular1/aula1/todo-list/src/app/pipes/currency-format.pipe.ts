import { Pipe, PipeTransform } from '@angular/core';

interface IProps {
  style: string;
  currency: string;
  minimumFractionDigits: number;
}

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: string, args: IProps): unknown {
    console.log(args);

    const formattedValue = Number(value).toLocaleString('pt-BR', args);

    return formattedValue;
  }
}
