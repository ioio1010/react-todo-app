import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { idGenerator } from "../../../utils/idGenerator";
import { TodoAPI } from "../../../api/todoAPI";
import { todoAdded } from "../../../store/todoSlice";
import { useDispatch } from "react-redux";

export const TODO_FORM_STATUS = {
  IDLE: "idle",
  ADDING: "adding",
  ADDING_ERROR: "adding_error",
};

const TodoFormContainer = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(TODO_FORM_STATUS.IDLE);
  const isAdding = status === TODO_FORM_STATUS.ADDING;

  const addTodo = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const todo = {
      id: idGenerator(),
      title: trimmedTitle,
      createdAt: Date.now(),
    };

    setStatus(TODO_FORM_STATUS.ADDING);

    TodoAPI.add(todo)
      .then((response) => {
        dispatch(todoAdded(response));
        setStatus(TODO_FORM_STATUS.IDLE);
        setTitle("");
      })
      .catch(() => {
        setStatus(TODO_FORM_STATUS.ADDING_ERROR);
      });
  };

  const props = {
    title: title,
    isAdding: isAdding,
    handleChangeTitle: (e) => {
      return setTitle(e.target.value);
    },
    handleKeyDownTitle: (e) => {
      if (e.which === 13) {
        e.preventDefault();
        addTodo();
      }
    },
    handleClickAddButton: (e) => {
      e.preventDefault();
      addTodo();
    },
  };

  return <TodoForm {...props} />;
};

export default TodoFormContainer;
