import { TestScheduler } from 'rxjs/testing'
import basicMergeMapObs from './mergeMap'
import { Observable, of } from 'rxjs'

it('standard WE_FINISH event', () => {
    const source = of({
        type: 'TEST',
        status: 'NEW'
    })

    getScheduler().run(helpers => {
        const { expectObservable, cold } = helpers
        expectObservable(
            basicMergeMapObs(
                source
            )
        ).toBe(
            '(t|)',
            {
                t: { type: 'MY_NEW_ERROR' }
            }
        )
    })
})

function getScheduler() {
    return new TestScheduler((actual, expected) => {
        expect(actual).toMatchObject(expected);
    });
}
