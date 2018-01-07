import { Subject } from 'rxjs/Subject';

describe('do', function() {

  it('should do additional thing', () => {
    let counter = 0;
    const subj = new Subject();

    subj.do(() => counter++).subscribe()

    subj.next(1);
    subj.next(1);

    expect(counter).toEqual(2);
  });
});

