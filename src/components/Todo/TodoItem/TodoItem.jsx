import classes from "./TodoItem.module.css";
import CustomButton from "../../Common/button/CustomButton";
import { TODO_ENTITY_STATUS } from "../../../store/todoSlice";
import PropTypes from "prop-types";

const TodoItem = ({ todo, handleRemoveTodo }) => {
  const isRemoving = todo.status === TODO_ENTITY_STATUS.REMOVING;
  const removeButtonText = isRemoving ? "Removing..." : "Remove";

  return (
    <li className={classes.todoItem}>
      <span className={classes.todoItemTitle}>{todo.title}</span>
      <CustomButton
        onClick={() => handleRemoveTodo(todo)}
        disabled={isRemoving}
      >
        {removeButtonText}
      </CustomButton>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    segmentPath: PropTypes.string.isRequired,
  }).isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
};

export default TodoItem;
