import React, { useState } from "react";
import classes from "./TodoForm.module.css";
import CustomInput from "../Common/input/CustomInput";
import { useDispatch } from "react-redux";
import { todoAdded } from "../../store/todoSlice";
import { idGenerator } from "../../utils/idGenerator";
import { TodoAPI } from "../../api/todoAPI";
import { firestoreDB } from "../../config/firebaseConfig";
import CustomButton from "../Common/button/CustomButton";

const TodoForm = () => {
  const TODO_FORM_STATUS = {
    IDLE: "idle",
    ADDING: "adding",
    ADDING_ERROR: "adding_error",
  };

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(TODO_FORM_STATUS.IDLE);

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleKeyDownTitle = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      addTodo();
    }
  };
  const handleClickAddButton = (e) => {
    e.preventDefault();
    addTodo();
  };

  const addTodo = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const todo = {
      id: idGenerator(),
      title: trimmedTitle,
      createdAt: Date.now(),
    };

    setStatus(TODO_FORM_STATUS.ADDING);

    TodoAPI.add(todo, firestoreDB)
      .then((response) => {
        dispatch(todoAdded(response));
        setStatus(TODO_FORM_STATUS.IDLE);
        setTitle("");
      })
      .catch(() => {
        setStatus(TODO_FORM_STATUS.ADDING_ERROR);
      });
  };

  const isAdding = status === TODO_FORM_STATUS.ADDING;
  const addButtonText = isAdding ? "Adding..." : "Add";

  return (
    <div className={classes.todoFormWrapper}>
      <form className={classes.todoForm}>
        <CustomInput
          type="text"
          value={title}
          placeholder="Enter todo..."
          onChange={handleChangeTitle}
          onKeyDown={handleKeyDownTitle}
          disabled={isAdding}
        />
        <CustomButton
          onClick={handleClickAddButton}
          disabled={isAdding}
          className={`${classes.addButton}`}
        >
          {addButtonText}
        </CustomButton>
      </form>
    </div>
  );
};

export default TodoForm;
