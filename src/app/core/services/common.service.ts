import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getSameValueOf<T>(list: T[], criteria: keyof T, value: any): number {
    return list.filter((item) => item[criteria] === value).length;
  }
}
