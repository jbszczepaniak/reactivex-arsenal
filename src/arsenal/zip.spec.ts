import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import { Subject } from 'rxjs/Subject';

describe('zip', function() {
  let first_subject;
  let second_subject;

  beforeEach(() => {
    first_subject = new Subject();
    second_subject = new Subject();
  });

  it('should not pass any value when one of observable is idle', () => {
    const results = [];
    Observable.zip(
      first_subject,
      second_subject
    ).subscribe((x) => results.push(x));

    first_subject.next(1);
    first_subject.next(2);
    first_subject.next(3);

    expect(results).toEqual([]);

  });

  it('can zip the same observable with itself', () =>{
    const results = [];
    Observable.zip(
      first_subject,
      first_subject
    ).subscribe((x) => results.push(x));
    first_subject.next(1);
    expect(results).toEqual([[1, 1]]);
  });

  it('zips corresponding values from observables', () => {
    const results = [];
    Observable
      .zip(
        first_subject,
        second_subject
      )
      .do((x) => results.push(x[0] + x[1]))
      .subscribe();

    first_subject.next(1);
    second_subject.next(1);

    first_subject.next(10);
    first_subject.next(10);
    first_subject.next(10);
    first_subject.next(10);
    first_subject.next(10);

    second_subject.next(0);

    expect(results).toEqual([2, 10]);
  });
});
