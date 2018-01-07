import { Subject } from 'rxjs/Subject';

function random_fun() {
  console.log('Random stuff happening');
}

describe('doing stuff in subscribe, or as an operator', function() {
  it('can do bunch of things in observer', () => {
    let counter = 0;
    const subj = new Subject();
    let flag = true;

    subj.subscribe(
      (x) => {
        counter += x / 2;
        console.log('The value is ', x, ' the counter is: ', counter);
        if (flag) {
          random_fun();
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('Completed');
      }
    );

    subj.next(1);
    flag = false;
    subj.next(5);
    subj.next(10);
    subj.complete();

  });


  it('observer can just call observable', () => {
    let counter = 0;
    const subj = new Subject();
    let flag = true;

    subj
      .do((x) => counter += x / 2)
      .do((x) => console.log('The value is ', x, ' the counter is: ', counter))
      .do(() => {if (flag) {random_fun(); }})
    .subscribe(
        (x) => {},
        (err) => {console.log(err); },
        () => {console.log('Completed'); }
      );

    subj.next(1);
    flag = false;
    subj.next(5);
    subj.next(10);
    subj.complete();

  });

});
