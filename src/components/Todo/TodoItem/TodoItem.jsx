import classes from "./TodoItem.module.css";
import CustomButton from "../../Common/button/CustomButton";
import { TODO_ENTITY_STATUS, TodosThunk } from "../../../store/todoSlice";
import PropTypes from "prop-types";
import { useCallback } from "react";

const TodoItem = ({ todo, isRemoving, handleRemoveTodo }) => {
  const removeButtonText = isRemoving ? "Removing..." : "Remove";

  const handleClickRemoveButton = useCallback(() => {
    handleRemoveTodo(todo);
  }, [todo]);

  return (
    <li className={classes.todoItem}>
      <span className={classes.todoItemTitle}>{todo.title}</span>
      <CustomButton onClick={handleClickRemoveButton} disabled={isRemoving}>
        {removeButtonText}
      </CustomButton>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(TODO_ENTITY_STATUS)),
    segmentPath: PropTypes.string.isRequired,
  }).isRequired,
  isRemoving: PropTypes.bool.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
};

export default TodoItem;
