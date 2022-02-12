import TodoList from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSortedTodos,
  selectTodoNextLoadSegmentPath,
  selectTodoStatus,
  TodosThunk,
} from "../../store/todoSlice";

const TodoListContainer = () => {
  const dispatch = useDispatch();
  const sortedTodos = useSelector(selectSortedTodos);
  const status = useSelector(selectTodoStatus);
  const nextLoadSegmentPath = useSelector(selectTodoNextLoadSegmentPath);

  const props = {
    sortedTodos: sortedTodos,
    status: status,
    nextLoadSegmentPath: nextLoadSegmentPath,
    handleGetAll: () => {
      return dispatch(TodosThunk.getAll());
    },
    handleLoadMore: () => {
      return dispatch(TodosThunk.getAll(nextLoadSegmentPath));
    },
    handleRemoveTodo: (todo) => {
      return dispatch(TodosThunk.remove(todo));
    },
  };

  return <TodoList {...props} />;
};

export default TodoListContainer;
