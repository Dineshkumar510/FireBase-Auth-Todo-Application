import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(value: any[], searchTerm: any): any[] {
    if(!value || !searchTerm){
      return value;
    }
    searchTerm = searchTerm.toLowerCase();

    return value.filter((mainValue)=> {
      const fullName = `${mainValue.name?.first} ${mainValue.name?.last}`.toLowerCase();
      return fullName.includes(searchTerm);
    });
  }

  }

