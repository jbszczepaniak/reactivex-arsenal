import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

describe('mergepMap', function() {
  let obs;

  beforeEach(() => {
  obs = Observable.create(
    (observer) => {
      observer.next(1);
      observer.next(2);
    }
  );
  });


  it('should be different from regular map in that it flattens results', function() {
    const mergeMapResults = [];
    obs.mergeMap(
      (x) => [x * 2, x * 3]
    ).subscribe((x) => mergeMapResults.push(x));

    const mapResults = [];
    obs.map(
      (x) => [x * 2, x * 3]
    ).subscribe((x) => mapResults.push(x));

    expect(mergeMapResults).toEqual([2, 3, 4, 6]);
    expect(mapResults).toEqual([[2, 3], [4, 6]]);

  });

  it('should flatten also observables of observables', () => {
    const results = [];
    obs.mergeMap(
      (x) => Observable.of('Number is ' + x)
    ).subscribe((x) => results.push(x));
    expect(results).toEqual(['Number is 1', 'Number is 2']);
  });
});
