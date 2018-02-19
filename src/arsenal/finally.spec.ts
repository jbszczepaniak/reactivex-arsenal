import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

describe('finally', () => {
  let functionSpy;

  beforeEach(() => {
    functionSpy = jasmine.createSpy('functionSpy');
  });

  it('should be called after observable completes', () => {
    Observable.create(observer => observer.complete())
      .finally(() => functionSpy())
      .subscribe(
        () => expect(functionSpy).toHaveBeenCalled()
      );
  });

  it('should not be called when observable never completes', () => {
    Observable.create(observer => observer.next(1))
      .finally(() => functionSpy())
      .subscribe(
        () => expect(functionSpy).not.toHaveBeenCalled()
      );
  });

  it('should be called on complete when observable throws error', () => {
    Observable.throw(new Error())
      .finally(() => functionSpy())
      .subscribe(
        () => {},
        () => {},
        () => expect(functionSpy).toHaveBeenCalled()
      );
  });
});
