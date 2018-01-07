import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

describe('first', function() {
  let observable;

  beforeEach(() => {
    observable = Observable.create(
    (observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
    });
  });

  it('without operator all values of observable are yielded', function() {
    const results = [];
    observable.subscribe(
      (x) => results.push(x)
    );
    expect(results).toEqual([1, 2, 3, 4]);
  });

  it('first operator should yield only first value of observable', function() {
    const results = [];
    observable.first().subscribe(
      (x) => results.push(x)
    );
    expect(results).toEqual([1]);
  });

  it('first operator with predicate function yields first value matching condition based on value', function() {
    const results = [];
    observable.first((x, idx, obs) =>  x > 2 ).subscribe(
      (x) => results.push(x)
    );


  });

  it('first operator with predicate function yields first value matching condition based on index', function() {
    const results = [];
    observable.first((x, idx, obs) =>  idx > 2).subscribe(
      (x) => results.push(x)
    );
    expect(results).toEqual([4]);
  });

});
