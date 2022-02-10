import classes from "./TodoList.module.css";
import TodoItem from "./TodoItem/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodoSortedIds,
  selectTodoNextLoadSegmentPath,
  selectTodoStatus,
  TodosThunk,
  TODO_LIST_STATUS,
} from "../../store/todoSlice";
import CustomLoader from "../Common/loader/CustomLoader";
import CustomButton from "../Common/button/CustomButton";
import { useEffect } from "react";

const TodoList = () => {
  const dispatch = useDispatch();
  const sortedTodoIds = useSelector(selectTodoSortedIds);
  const status = useSelector(selectTodoStatus);
  const nextLoadSegmentPath = useSelector(selectTodoNextLoadSegmentPath);

  useEffect(() => {
    dispatch(TodosThunk.getAll());
  }, [dispatch]);

  const isLoading = status === TODO_LIST_STATUS.LOADING;

  const handleLoadMore = () => {
    dispatch(TodosThunk.getAll(nextLoadSegmentPath));
  };

  const renderLoader = isLoading ? (
    <CustomLoader classnames={[classes.loadMoreLoader]} />
  ) : null;

  const renderListItems = sortedTodoIds.map((todoId) => {
    return <TodoItem key={todoId} id={todoId} />;
  });

  const loadMoreButton =
    !isLoading && nextLoadSegmentPath ? (
      <CustomButton
        onClick={handleLoadMore}
        disabled={isLoading}
        classnames={[classes.loadMoreButton]}
      >
        Load more
      </CustomButton>
    ) : null;

  return (
    <div className={classes.todoListWrapper}>
      <ul className={classes.todoList}>
        {renderListItems}
        {renderLoader}
      </ul>
      {loadMoreButton}
    </div>
  );
};

export default TodoList;
