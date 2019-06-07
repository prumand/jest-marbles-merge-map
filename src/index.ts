import { Action, createStore, applyMiddleware } from 'redux'

import basicMergeMapObs from "./mergeMap"
import { createEpicMiddleware } from 'redux-observable';


const reducer = (state = {}, action : Action) => {
    console.log('action dispatched: ', action)
    return state
}

const epicMiddleware = createEpicMiddleware()

const store = createStore(
    reducer,
    applyMiddleware(epicMiddleware)
)

epicMiddleware.run(basicMergeMapObs)

const testButton = document.createElement('button')
testButton.innerText = 'Test Button'
testButton.onclick = () => store.dispatch({
    type: 'TEST'
})

document.getElementById('app').appendChild(testButton)
