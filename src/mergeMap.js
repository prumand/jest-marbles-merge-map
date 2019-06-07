"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var redux_observable_1 = require("redux-observable");
var operators_1 = require("rxjs/operators");
function basicMergeMapObs(action$) {
    return action$.pipe(redux_observable_1.ofType('TEST'), operators_1.mergeMap(function (val) {
        return rxjs_1.of(val).pipe(operators_1.filter(function (val) {
            console.log('in filter action');
            throw new Error('we use filters');
        }), function (obs) { return rxjs_1.of('test'); }, // WE_FINISH! + end
        // (obs: Observable<any>) => obs, // MY_NEW_ERROR (no end!)
        operators_1.map(function (val) { return ({
            type: 'WE_FINISH'
        }); }), operators_1.catchError(function () { return rxjs_1.of({
            type: 'MY_NEW_ERROR'
        }); }));
    }));
}
exports["default"] = basicMergeMapObs;
