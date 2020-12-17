import {AbstractControl} from '@angular/forms';
import {Observable, Observer, of } from 'rxjs';


// @ts-ignore
// @ts-ignore
export const mimeType = (
    control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> =>
{
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<{ [key: string]: any }>) => {
  fileReader.addEventListener('loadend', () => {
  // @ts-ignore

    const arr = new Uint8Array(fileReader.result).subarray(0, 4);
    let isValid: boolean;
    let header = '';

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < arr.length; i++) {
  header += arr[i].toString(16);
  }
    switch (header) {
    case '89504e47':
      isValid = true;
      break;
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      isValid = true;
      break;
    default:
      isValid = false;
      break;
  }
    if (isValid) {
    observer.next(null);

  } else {
    observer.next({invalidMimeType: true});
  }
    // tslint:disable-next-line:no-unused-expression
    observer.complete();
  });
  fileReader.readAsArrayBuffer(file);
  });
  return frObs;


};

