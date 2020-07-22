import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import axios from 'axios';

import App from './App';

import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ];
    case 'SET_PLANT':
      return action.payload;
    default:
      return state;
  }
};

//SAGA STUFF ----
//"Mail sorter"
function* rootSaga(){
  console.log('In root saga');
  yield takeEvery('FETCH_PLANT', getPlantSaga);
  yield takeEvery('ADD_PLANT', addPlantSaga);
  yield takeEvery('DELETE_PLANT', deletePlantSaga);

}

function* addPlantSaga(action){
  try{
    yield axios.post('/api/plant', action.payload);
    // its like getPlantSaga with extra steps?
    yield put({type: 'FETCH_PLANT'});
  }catch(error){
    console.log('Error with Get:', error);
  }
}

function* deletePlantSaga(action){
  try{
    yield axios.delete('/api/plant/' + action.payload);
    yield put({type: 'FETCH_PLANT'});
  }catch(error){
    console.log('Error with DELETE', error);
  }
}

function* getPlantSaga(){
  try{
    const response = yield axios.get('/api/plant');
    yield put({type: 'SET_PLANT', payload: response.data});
  }catch(error){
    console.log('Error with Get:', error);
  }
}

// Saga Setup #2 - create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
