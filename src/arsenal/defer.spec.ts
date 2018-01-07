import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/defer';

describe('defer', function() {

  it('create observable for each subscriber', function() {
    const results = [];
    const obs$ = Observable
      .defer(() => Observable.from([1, 2]))
      .do((x) => results.push(x))

      obs$.subscribe();
      obs$.subscribe();

    expect(results).toEqual([1, 2, 1, 2]);
  });
});
