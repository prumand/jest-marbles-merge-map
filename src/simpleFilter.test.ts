import { TestScheduler } from 'rxjs/testing'
import { catchError, map, filter } from 'rxjs/operators'
import { of } from 'rxjs';

it("temp", () => {
    const testScheduler = new TestScheduler((a, b) => { expect(a).toMatchObject(b); });
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold("a");
      const result = source.pipe(
        filter(() => { throw new Error("kaboom!"); }),
        map(() => of("m")),
        catchError(() => of("c"))
      );
      expectObservable(result).toBe("(c|)");
    });
  });