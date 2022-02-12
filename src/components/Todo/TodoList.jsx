import classes from "./TodoList.module.css";
import TodoItem from "./TodoItem/TodoItem";
import { TODO_LIST_STATUS } from "../../store/todoSlice";
import CustomLoader from "../Common/loader/CustomLoader";
import CustomButton from "../Common/button/CustomButton";
import { useEffect } from "react";

const TodoList = ({
  sortedTodos,
  status,
  nextLoadSegmentPath,
  handleGetAll,
  handleLoadMore,
  handleRemoveTodo,
}) => {
  useEffect(() => {
    handleGetAll();
  }, []);

  const isLoading = status === TODO_LIST_STATUS.LOADING;

  const renderLoader = isLoading ? (
    <CustomLoader className={`${classes.loadMoreLoader}`} />
  ) : null;

  const renderListItems = sortedTodos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} handleRemoveTodo={handleRemoveTodo} />
    );
  });

  const renderLoadMoreButton =
    !isLoading && nextLoadSegmentPath ? (
      <CustomButton
        onClick={() => handleLoadMore(nextLoadSegmentPath)}
        disabled={isLoading}
        className={`${classes.loadMoreButton}`}
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
      {renderLoadMoreButton}
    </div>
  );
};

export default TodoList;
