import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value:any, filterString: string, PropName: string):any {
    if(!value) {
      return [];
    }
    const resultArray = [];
    for(const item of value) {
      if(item[PropName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
