import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';

describe('catch', () => {
  let functionSpy;

  beforeEach(() => {
    functionSpy = jasmine.createSpy('functionSpy');
  });

  it('should be called when Observable throws error', () => {
    const observable = Observable.throw(new Error());

    observable
      .catch((err) => {
        functionSpy();
        return Observable.empty();
      })
      .do(x => console.log(x))
      .subscribe();

    expect(functionSpy).toHaveBeenCalled();
  });

  it('should be called instead of error observer', () => {
    const observable = Observable.throw(new Error());
    const catchFunctionSpy = jasmine.createSpy('catchFunctionSpy');
    const errorObserverFunctionSpy = jasmine.createSpy('errorObserverFunctionSpy');

    observable.catch(
      (err) => {
        catchFunctionSpy();
        return Observable.empty();
      }
    ).subscribe(
      () => {},
      err => errorObserverFunctionSpy()
      );
    expect(catchFunctionSpy).toHaveBeenCalled();
    expect(errorObserverFunctionSpy).not.toHaveBeenCalled();
  });

  it('can rethrow an error', () => {
    const observable = Observable.throw(new Error());
    const catchFunctionSpy = jasmine.createSpy('catchFunctionSpy');
    const errorObserverFunctionSpy = jasmine.createSpy('errorObserverFunctionSpy');

    observable.catch(
      (err) => {
        catchFunctionSpy();
        throw err;
      }
    ).
    subscribe(
      () => {},
      err => errorObserverFunctionSpy()
      );
    expect(catchFunctionSpy).toHaveBeenCalled();
    expect(errorObserverFunctionSpy).toHaveBeenCalled();
  });

  it('can retry Observable that caused error');
  it('should return fallback observable when it catches error');
  it('should work with pipe with name catchError');
});
