import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switch';

describe('switch', function() {
  it('Switch operator switches into internal observable each time it gets value', function() {
    const firstObservable = Observable.create(
      (obs) => {
        obs.next('any');
        obs.next('any');
      }
    );


    const internalObserver = (obs) => {
      obs.next(10);
      obs.next(20);
      obs.next(30);
    };

    const higherOrderObservable = firstObservable   // Higher order observable is observable that returns observable.
      .map(() => Observable.create(internalObserver));

    const results = [];

    higherOrderObservable
      .switch()
      .subscribe((x) => results.push(x));

    expect([10, 20, 30, 10, 20, 30]).toEqual(results);

  });

});
