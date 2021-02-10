import { Pipe, PipeTransform } from '@angular/core';
import { MovieDb } from 'src/app/models/MovieDb';

@Pipe({
name: 'dateFitler'
})
export class DateFilterPipe implements PipeTransform {
transform(moviesDbs: Array<MovieDb>, title: string): any {
if (!moviesDbs || !title) {
return moviesDbs;
}
console.log(title)
console.log(moviesDbs)
console.log(moviesDbs.filter(movieDb => movieDb.title.indexOf(title) >=0));
return moviesDbs.filter(movieDb => movieDb.title.indexOf(title) >=0) ;
}
}
