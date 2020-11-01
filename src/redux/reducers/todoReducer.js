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
  CLEAR_MESSAGE_COMPLETE,
} from "../actions/types";

const initialState = {
  todos: [],
  isLoading: false,
  errors: null,
  toBeEdited: null,
  message: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case (EDIT_TODO_REQUEST,
    DELETE_TODO_REQUEST,
    ADD_TODO_REQUEST,
    DELETE_ALL_TODO_REQUEST,
    ADD_TO_BE_EDITED_TODO_REQUEST,
    CLEAR_TO_BE_EDITED_REQUEST,
    GET_ALL_TODO_REQUEST): {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CLEAR_TO_BE_EDITED_COMPLETE: {
      return {
        ...state,
        toBeEdited: null,
      };
    }
    case (EDIT_TODO_FAILURE,
    DELETE_TODO_FAILURE,
    ADD_TODO_FAILURE,
    DELETE_ALL_TODO_FAILURE,
    GET_ALL_TODO_FAILURE): {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case GET_ALL_TODO_COMPLETE: {
      return {
        ...state,
        isLoading: false,
        todos: [...action.payload],
      };
    }
    case ADD_TODO_COMPLETE: {
      return {
        ...state,
        isLoading: false,
        todos: [...state.todos, action.payload.newTodo],
        message: action.payload.message,
      };
    }
    case DELETE_TODO_COMPLETE: {
      return {
        ...state,
        isLoading: false,
        todos: state.todos.filter((todo) => todo._id !== action.payload.id),
        message: action.payload.message,
      };
    }
    case EDIT_TODO_COMPLETE: {
      return {
        ...state,
        message: action.payload.message,
        isLoading: false,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload.todo._id) {
            todo = { ...action.payload.todo };
          }
          return todo;
        }),
      };
    }
    case ADD_TO_BE_EDITED_TODO_COMPLETE: {
      return {
        ...state,
        toBeEdited: action.payload,
      };
    }
    case CLEAR_MESSAGE_COMPLETE: {
      return {
        ...state,
        message: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default todoReducer;
