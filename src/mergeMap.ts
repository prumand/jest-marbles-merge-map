import { Observable, of } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, map, mergeMap, filter } from 'rxjs/operators'
import { Action } from 'redux'

interface Test {
    type: string,
    status: string,
}


export default function basicMergeMapObs(
    action$: Observable<any>,
    {customOperator} : {
        customOperator: () =>
            (obs: Observable<any>) => Observable<any>
    }
) {
    return action$.pipe(
        ofType<Action, Test>('TEST'),
        mergeMap((val: Action) => {
            return of(val).pipe(
                filter((val: Test) => val.status === 'NEW'),
                customOperator(),
                map((val: any) => ({
                    type: 'WE_FINISH',
                })),
                catchError(() => of({
                    type: 'MY_NEW_ERROR',
                }))
            )
        })
    )
}
