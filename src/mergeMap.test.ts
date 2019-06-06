import mergeMap from './mergeMap'
import { hot, cold } from 'jest-marbles'

it('returns empty stream', () => {
    const source = cold('-a-', {
        a: {
            type: 'TEST',
        }
    })
    expect(
        mergeMap(source)
    ).toBeObservable(
        cold('---')
    )
})
