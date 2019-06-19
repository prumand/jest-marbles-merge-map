import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap, filter } from 'rxjs/operators'
import { Action } from 'redux'

interface Test {
    type: string,
    status: string,
}

export default function basicMergeMapObs(
    action$: Observable<Action>
) : Observable<any> {
    return action$.pipe(
        filter((val: Test) => {
            throw new Error('We stop here')
        }),
        map((val: any) => ({
            type: 'WE_FINISH',
        })),
        catchError(() => of({
            type: 'MY_NEW_ERROR',
        }))
    )
}
