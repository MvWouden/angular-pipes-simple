import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  Server
} from './app.component';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: Server [], property: string): Server [] {
    return value.sort((a, b) => {
      return (a[property] > b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0);
    });
  }
}
