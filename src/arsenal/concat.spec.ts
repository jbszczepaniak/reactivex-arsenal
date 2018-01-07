import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

describe('concat', function() {
  let odds;
  let evens;
  let letters;
  let neverEndingStory;
  let errorProne;

  beforeEach(() => {
    odds = Observable.from([1, 3, 5, 7]);
    evens = Observable.from([2, 4]);
    letters = Observable.from(['a', 'b', 'c', 'd']);
    neverEndingStory = Observable.create(
      (observer) => {
        observer.next(1);
        observer.next(1);
      });
    errorProne = Observable.throw(Error('I am error prone'));
  });

  it('should susbscribe to next observable when previous completes', () => {
    const results = [];

    Observable.concat(odds, evens, letters)
      .do((x) => results.push(x))
      .subscribe();

    expect(results).toEqual([1, 3, 5, 7, 2, 4, 'a', 'b', 'c', 'd']);
  });

  it ('should not subscribe to next observable, when first will not complete', () => {
    const results = [];

    Observable.concat(neverEndingStory, odds)
      .do((x) => results.push(x))
      .subscribe();

    expect(results).toEqual([1, 1]);

  });

  it ('should not subscribe to next observable, when first will throws error', () => {
    const results = [];

    Observable.concat(errorProne, odds)
      .do((x) => results.push(x))
      .subscribe(
        () => {},
        () => {},
        () => {}
    );
    expect(results).toEqual([]);
  });
});
