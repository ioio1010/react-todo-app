import classes from "./TodoItem.module.css";
import CustomButton from "../../Common/button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodoById,
  TODO_ENTITY_STATUS,
  TodosThunk,
} from "../../../store/todoSlice";

const TodoItem = ({ id }) => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => selectTodoById(state, id));

  const isRemoving = todo.status === TODO_ENTITY_STATUS.REMOVING;
  const removeButtonText = isRemoving ? "Removing..." : "Remove";

  const handleRemoveTodo = () => dispatch(TodosThunk.remove(todo));

  return (
    <li className={classes.todoItem}>
      <span className={classes.todoItemTitle}>{todo.title}</span>
      <CustomButton onClick={handleRemoveTodo} disabled={isRemoving}>
        {removeButtonText}
      </CustomButton>
    </li>
  );
};

export default TodoItem;
