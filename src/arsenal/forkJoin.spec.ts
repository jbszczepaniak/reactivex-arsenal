import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';

describe('forkJoin', function() {
  it('should produce Observable from last values of argument-observables', () => {
    const results = [];
    const observable1 = Observable.from([1, 2, 3]);
    const observable2 = Observable.from([2, 3, 4]);
    Observable.forkJoin(observable1, observable2)
      .do(x => results.push(x))
      .subscribe();
    expect(results).toEqual([[3, 4]]);
  });

  it('should not yield any value if at least one of provided observables does not complete', () => {
    const results = [];
    const observable1 = Observable.create(
      observer => observer.next(1)
    );
    const observable2 = Observable.of(1);
    Observable.forkJoin(observable1, observable2)
      .do(x => results.push(x))
      .subscribe();
      expect(results).toEqual([]);
    });
});
