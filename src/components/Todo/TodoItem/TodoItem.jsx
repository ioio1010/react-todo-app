import classes from "./TodoItem.module.css";
import CustomButton from "../../Common/button/CustomButton";
import { TODO_ENTITY_STATUS } from "../../../store/todoSlice";

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

export default TodoItem;