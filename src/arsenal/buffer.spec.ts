import 'rxjs/add/operator/buffer';
import { Subject } from 'rxjs/Subject';

describe('buffer', () => {
  it('should wait with values of one observables until the other emits', () => {
    const tap = new Subject<boolean>();
    const stream = new Subject<number>();
    const values = [];

    stream.buffer(tap).subscribe(c => values.push(c));

    stream.next(1);
    stream.next(2);

    expect(values).toEqual([]);

    stream.next(3);

    expect(values).toEqual([]);

    tap.next(true);

    expect(values).toEqual([[1, 2, 3]]);

    stream.next(3);

    expect(values).toEqual([[1, 2, 3]]);
  });
});
