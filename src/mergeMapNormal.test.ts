import { TestScheduler } from 'rxjs/testing'
import basicMergeMapObs from './mergeMap'
import { Observable, of } from 'rxjs'

const scheduler = new TestScheduler((actual, expected) => {
    // asserting the two objects are equal
    // e.g. using chai.
    expect(actual).toMatchObject(expected)
})

const scheduler2 = new TestScheduler((actual, expected) => {
    // asserting the two objects are equal
    // e.g. using chai.
    expect(actual).toMatchObject(expected)
})


it('standard empty stream', () => {
    const source = of({
        type: 'TEST',
        status: 'OLD'
    })

    scheduler.run(helpers => {
        const { cold, expectObservable } = helpers

        expectObservable(
            basicMergeMapObs(
                source,
                {
                    customOperator: () => (obs: Observable<any>) => cold('a')
                }
            )
        ).toBe(
            '-'
        )
    })
})

it('standard WE_FINISH event', () => {
    const source = of({
        type: 'TEST',
        status: 'NEW'
    })

    scheduler2.run(helpers => {
        const { expectObservable, cold } = helpers
        expectObservable(
            basicMergeMapObs(
                source,
                {
                    customOperator: () => (obs: Observable<any>) => cold('a')
                }
            )
        ).toBe(
            't',
            {
                t: { type: 'WE_FINISH' }
            }
        )
    })
})
