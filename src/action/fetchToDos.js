import {
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  FETCHING_TODOS,
} from '../config/Constants';

export function fetchToDos() {
  return async dispatch => {
    dispatch(getToDos());

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');

      const json = await res.json();
      return dispatch(getToDosSuccess(json));
    } catch (err) {
      return dispatch(getToDosFailure(err));
    }
  };
}

function getToDos() {
  return {
    type: FETCHING_TODOS,
  };
}

function getToDosSuccess(data) {
  return {
    type: FETCH_TODOS_SUCCESS,
    data,
  };
}

function getToDosFailure() {
  return {
    type: FETCH_TODOS_FAILURE,
  };
}
