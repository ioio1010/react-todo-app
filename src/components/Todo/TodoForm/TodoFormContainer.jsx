import React, { useCallback, useState } from "react";
import TodoForm from "./TodoForm";
import { idGenerator } from "../../../utils/idGenerator";
import { TodoAPI } from "../../../api/todoAPI";
import { todoAdded, TodosThunk } from "../../../store/todoSlice";
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

  const handleChangeTitle = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [title]
  );

  const handleKeyDownTitle = useCallback(
    (e) => {
      if (e.which === 13) {
        e.preventDefault();
        addTodo();
      }
    },
    [title]
  );

  const handleClickAddButton = useCallback(
    (e) => {
      e.preventDefault();
      addTodo();
    },
    [title]
  );

  return (
    <TodoForm
      title={title}
      isAdding={isAdding}
      handleChangeTitle={handleChangeTitle}
      handleKeyDownTitle={handleKeyDownTitle}
      handleClickAddButton={handleClickAddButton}
    />
  );
};

export default TodoFormContainer;
