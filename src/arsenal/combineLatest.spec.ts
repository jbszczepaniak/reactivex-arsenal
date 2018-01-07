import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

describe('combineLatest', function() {
  let component1;
  let component2;

  beforeEach(() => {
    component1 = new BehaviorSubject(1);
    component2 = new BehaviorSubject(2);

  });

  it('should sum latest numbers from both observables', function() {
    const results = [];

    component1.combineLatest(component2, (s1, s2) => s1 + s2)
      .subscribe((x) => results.push(x));

    component1.next(10);
    component2.next(20);
    component1.next(5);
    expect(results).toEqual([1 + 2, 2 + 10, 10 + 20, 5 + 20]);

  });

  it('should accept more than 2 input streams', () => {
    const multiplicator = new BehaviorSubject(3);
    const results = [];

    component1.combineLatest(component2, multiplicator, (s1, s2, s3) => (s1 + s2) * s3)
      .subscribe((x) => results.push(x));

    expect(results).toEqual([(1 + 2) * 3]);
  });

  it('should accept input streams as an array', () => {
    const multiplicator1 = new BehaviorSubject(3);
    const multiplicator2 = new BehaviorSubject(3);
    const results = [];

    component1.combineLatest(
      [component2, multiplicator1, multiplicator2],
      (s1, s2, s3, s4) => (s1 + s2) * s3 * s4).subscribe((x) => results.push(x)
    );

    expect(results).toEqual([(1 + 2) * 3 * 3]);
  });

});
