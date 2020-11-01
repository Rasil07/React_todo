import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";

import {
  getAllTodos,
  createTodo,
  deleteTodo,
  editTodo,
} from "../actions/todoActions";
import {
  EDIT_TODO_FAILURE,
  DELETE_TODO_FAILURE,
  ADD_TODO_FAILURE,
  DELETE_ALL_TODO_FAILURE,
  GET_ALL_TODO_FAILURE,
  EDIT_TODO_COMPLETE,
  DELETE_TODO_COMPLETE,
  ADD_TODO_COMPLETE,
  DELETE_ALL_TODO_COMPLETE,
  GET_ALL_TODO_COMPLETE,
  EDIT_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  ADD_TODO_REQUEST,
  DELETE_ALL_TODO_REQUEST,
  GET_ALL_TODO_REQUEST,
  ADD_TO_BE_EDITED_TODO_REQUEST,
  ADD_TO_BE_EDITED_TODO_COMPLETE,
  CLEAR_TO_BE_EDITED_COMPLETE,
  CLEAR_TO_BE_EDITED_REQUEST,
  CLEAR_MESSAGE,
  CLEAR_MESSAGE_REQUEST,
  CLEAR_MESSAGE_COMPLETE,
} from "../actions/types";

function* clearMessage() {
  yield put({
    type: CLEAR_MESSAGE_COMPLETE,
  });
}

function* getTodos() {
  try {
    const payload = yield call(getAllTodos);
    yield put({ type: GET_ALL_TODO_COMPLETE, payload });
  } catch (e) {
    yield put({ type: GET_ALL_TODO_FAILURE, payload: e });
  }
}

function* createTodos(action) {
  try {
    const responseData = yield call(createTodo, action.payload);
    yield put({ type: ADD_TODO_COMPLETE, payload: responseData });
  } catch (e) {
    yield put({ type: ADD_TODO_FAILURE, payload: e });
  }
}

function* deleteTodos(action) {
  try {
    const responseData = yield call(deleteTodo, action.payload);

    yield put({
      type: DELETE_TODO_COMPLETE,
      payload: { id: action.payload, message: responseData },
    });
  } catch (e) {
    yield put({ type: DELETE_TODO_FAILURE, payload: e });
  }
}

function* editTodos(action) {
  try {
    const responseData = yield call(editTodo, action.payload);
    console.log(responseData);
    yield put({
      type: EDIT_TODO_COMPLETE,
      payload: { message: responseData.message, todo: responseData.updateDoc },
    });
  } catch (e) {
    yield put({ type: EDIT_TODO_FAILURE, payload: e });
  }
}
function* addToBeEdited(action) {
  const todo = action.payload;
  yield put({
    type: ADD_TO_BE_EDITED_TODO_COMPLETE,
    payload: todo,
  });
}
function* clearToBeEdited() {
  yield put({
    type: CLEAR_TO_BE_EDITED_COMPLETE,
  });
}
export default function* todoSagas() {
  yield takeEvery(GET_ALL_TODO_REQUEST, getTodos);
  yield takeLatest(ADD_TODO_REQUEST, createTodos);
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodos);
  yield takeLatest(EDIT_TODO_REQUEST, editTodos);
  yield takeLatest(ADD_TO_BE_EDITED_TODO_REQUEST, addToBeEdited);
  yield takeLatest(CLEAR_TO_BE_EDITED_REQUEST, clearToBeEdited);
  yield takeLatest(CLEAR_MESSAGE_REQUEST, clearMessage);
}
