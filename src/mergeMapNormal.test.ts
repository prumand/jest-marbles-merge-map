import { TestScheduler } from 'rxjs/testing'
import basicMergeMapObs from './mergeMap'

it('standard WE_FINISH event', () => {

    getScheduler().run(helpers => {
        const { expectObservable, cold } = helpers
        const source = cold(
            'e',
            {
                e: {
                    type: 'TEST',
                    status: 'NEW'
                }
            }
        )
        expectObservable(
            basicMergeMapObs(
                source
            )
        ).toBe(
            't',
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
