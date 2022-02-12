import classes from "./TodoList.module.css";
import TodoItem from "./TodoItem/TodoItem";
import CustomLoader from "../Common/loader/CustomLoader";
import CustomButton from "../Common/button/CustomButton";
import { useEffect } from "react";
import PropTypes from "prop-types";

const TodoList = ({
  sortedTodos,
  isLoading,
  nextLoadSegmentPath,
  handleGetAll,
  handleLoadMore,
  handleRemoveTodo,
}) => {
  useEffect(() => {
    handleGetAll();
  }, []);

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

TodoList.propTypes = {
  sortedTodos: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  nextLoadSegmentPath: PropTypes.object,
  handleGetAll: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  nextLoadSegmentPath: null,
};

export default TodoList;
