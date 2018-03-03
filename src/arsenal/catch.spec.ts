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

  it('should return fallback observable when it catches error', () => {
    const fallback = Observable.create(observer => observer.next(1));
    const observable = Observable.throw(new Error());

    observable
      .catch(err => fallback)
      .subscribe(x => expect(x).toEqual(1));
  });

  it('should work with pipe with name catchError', () => {
    const observable = Observable.concat(Observable.of(1), Observable.throw(new Error()));

    observable.pipe(
      catchError(err => {
        functionSpy();
        return Observable.empty();
      })
    ).subscribe();

    expect(functionSpy).toHaveBeenCalled();
  });

  it('can retry Observable that caused error');
});
