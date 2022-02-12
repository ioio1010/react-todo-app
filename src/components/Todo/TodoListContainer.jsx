import TodoList from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
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

  const handleGetAll = useCallback(() => {
    dispatch(TodosThunk.getAll());
  }, []);

  const handleLoadMore = useCallback(() => {
    dispatch(TodosThunk.getAll(nextLoadSegmentPath));
  }, [nextLoadSegmentPath]);

  return (
    <TodoList
      sortedTodos={sortedTodos}
      isLoading={status === TODO_LIST_STATUS.LOADING}
      nextLoadSegmentPath={nextLoadSegmentPath}
      handleGetAll={handleGetAll}
      handleLoadMore={handleLoadMore}
    />
  );
};

export default TodoListContainer;
