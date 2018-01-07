import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';

describe('merge', function() {
  it('should take values from many observable and yield them as if it was single observable', () => {
    const results = [];
    const observable1 = Observable.from([1, 2, 3]);
    const observable2 = Observable.from([2, 3, 4]);
    Observable.merge(observable1, observable2)
      .do(x => results.push(x))
      .subscribe();
    expect(results).toEqual([1, 2, 3, 2, 3, 4]);
  });

  it('should take interleave values from many observables', () => {
    const results = [];
    const s1 = new Subject();
    const s2 = new Subject();
    Observable.merge(s1, s2)
      .do(x => results.push(x))
      .subscribe();
    s1.next(1);
    s2.next(2);
    s1.next(3);
    s2.next(4);
    expect(results).toEqual([1, 2, 3, 4]);
  });

  it('can take array-likes (with length property) as inputs', () => {
    const results = [];
    Observable.merge(
      {
        0: 1,
        1: 2,
        2: 3,
        length: 3
      },
      {
        0: 5,
        1: 7,
        2: 8,
        length: 3
      })
      .do(x => results.push(x))
      .subscribe();
      expect(results).toEqual([1, 2, 3, 5, 7, 8]);
  });
});
