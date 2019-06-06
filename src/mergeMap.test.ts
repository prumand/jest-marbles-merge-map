import basicMergeMapObs from './mergeMap'
import { hot, cold } from 'jest-marbles'
import { Observable } from 'rxjs';

it('returns empty stream', () => {
    const source = cold('-a-', {
        a: {
            type: 'TEST',
            status: 'OLD'
        }
    })
    expect(
        basicMergeMapObs(
            source,
            {
                customOperator: () => (obs: Observable<any>) => cold('-t')
            }
        )
    ).toBeObservable(
        cold('---')
    )
})

it('returns WE_FINISH event', () => {
    const source = cold('-a-', {
        a: {
            type: 'TEST',
            status: 'NEW'
        }
    })
    expect(
        basicMergeMapObs(
            source,
            {
                customOperator: () => (obs: Observable<any>) => cold('-t')
            }
        )
    ).toBeObservable(
        cold('-n', {
            n: {
                type: 'WE_FINISH'
            }
        })
    )
})
