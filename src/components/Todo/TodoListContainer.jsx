import TodoList from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSortedTodos,
  selectTodoNextLoadSegmentPath,
  selectTodoStatus,
  TODO_LIST_STATUS,
  TodosThunk,
} from "../../store/todoSlice";

const TodoListContainer = () => {
  const dispatch = useDispatch();
  const sortedTodos = useSelector(selectSortedTodos);
  const status = useSelector(selectTodoStatus);
  const nextLoadSegmentPath = useSelector(selectTodoNextLoadSegmentPath);

  const todoListProps = {
    sortedTodos: sortedTodos,
    isLoading: status === TODO_LIST_STATUS.LOADING,
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

  return <TodoList {...todoListProps} />;
};

export default TodoListContainer;
