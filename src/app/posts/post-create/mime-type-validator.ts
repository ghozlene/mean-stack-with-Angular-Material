import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from 'rxjs';
export const mineType = (control: AbstractControl): Promise<[[key: string]]> | Observable<[[key: string]: any]> => {
  const file = control.value as File;
  const FileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<[[key: string]]>) => {
    FileReader.addEventListener('loadend', () => {

    });
    FileReader.readAsArrayBuffer(file);

  });
};
