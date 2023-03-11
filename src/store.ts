import { createStore, combineReducers } from 'redux';
import calcReducer from './components/Calc/reducer/CalcReducer';

const store = createStore(
  combineReducers({
    calcState: calcReducer,
  })
);

export default store;

export type RootState = ReturnType<typeof store.getState>;