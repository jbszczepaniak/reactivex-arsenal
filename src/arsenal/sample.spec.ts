import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/sample';

describe('sample', function() {
  let sampler;
  let obs;

  beforeEach(() => {
    sampler = new Subject();
    obs = new Subject();
  });


  it('should sample itself', function() {
    const results = [];

    obs.sample(obs)
      .subscribe((x) => results.push(x));

    obs.next(1);
    expect(results).toEqual([1]);
  });

  it('should yield last value from observable when sampling signal comes', () => {
    const results = [];

    obs.sample(sampler)
      .subscribe((x) => results.push(x));

    obs.next('not yielded');
    obs.next('1');
    sampler.next('sample');
    obs.next('not yielded');
    obs.next('not yielded');
    obs.next('not yielded');
    obs.next('not yielded');
    obs.next('2');
    sampler.next('sample');
    sampler.next('sample');

    expect(['1', '2']).toEqual(results);
  });


});
