import React, { useCallback } from "react";
import { TODO_ENTITY_STATUS, TodosThunk } from "../../../store/todoSlice";
import { useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const TodoItemContainer = ({ todo }) => {
  const dispatch = useDispatch();

  const handleRemoveTodo = useCallback(
    (todo) => {
      dispatch(TodosThunk.remove(todo));
    },
    [todo]
  );

  return (
    <TodoItem
      todo={todo}
      isRemoving={todo.status === TODO_ENTITY_STATUS.REMOVING}
      handleRemoveTodo={handleRemoveTodo}
    />
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(TODO_ENTITY_STATUS)),
    segmentPath: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoItemContainer;
