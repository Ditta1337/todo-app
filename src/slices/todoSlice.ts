import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";

const getInitialTodo = (): Todo[] => {
  // getting todo list
  const localTodoList = window.localStorage.getItem("todoList");
  // if todo list is not empty
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  // if todo list is empty then set empty array in local storage
  window.localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

// initial value of todo list and filter status
const initialValue = {
  filterStatus: "all" as string,
  todoList: getInitialTodo() as Todo[],
};
// creating slice
export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    // adding todo
    addTodo: (state, action: { payload: Todo }) => {
      // adding todo in state
      state.todoList.push(action.payload);
      // getting todo list from local storage
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        // if todo list is not empty, parse todo list and add new todo
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        // set new todo list in local storage
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        // if todo list is empty, set new todo list in local storage
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    // editing todo
    editTodo: (state, action: { payload: Todo }) => {
      // getting todo list from local storage
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        // if todo list is not empty, parse todo list and edit todo
        const todoListArr = JSON.parse(todoList);
        // finding index of todo
        const index = todoListArr.findIndex(
          (item: Todo) => item.id === action.payload.id
        );

        todoListArr[index] = {
          ...action.payload,
        };
        // set new todo list in local storage
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        // setting new todo list in state
        state.todoList = todoListArr;
      }
    },
    // deleting todo
    deleteTodo: (state, action: { payload: Todo }) => {
      // getting todo list from local storage
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        // if todo list is not empty, parse todo list and delete todo
        const todoListArr = JSON.parse(todoList);
        // finding index of todo
        const index = todoListArr.findIndex(
          (item: Todo) => item.id === action.payload.id
        );
        // deleting todo
        todoListArr.splice(index, 1);
        // set new todo list in local storage
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        // setting new todo list in state
        state.todoList = todoListArr;
      }
    },
    // updating filter status
    updateFilterStatus: (state, action: { payload: string }) => {
      // setting filter status in state
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, editTodo, deleteTodo, updateFilterStatus } =
  todoSlice.actions;

export default todoSlice.reducer;
