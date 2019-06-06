import { Observable, of } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, map, mergeMap, filter } from 'rxjs/operators'
import { Action } from 'redux'


export default function basicMergeMapObs(
    action$: Observable<any>
) {
    return action$.pipe(
        ofType('TEST'),
        mergeMap((val: Action) => {
            return of(val).pipe(
                filter((val: Action) => val.type === 'SOMETHING'),
                map((val: Action) => ({
                    type: 'WE_FINISH',
                })),
                catchError(() => of({
                    type: 'MY_NEW_ERROR',
                }))
            )
        })
    )
}
