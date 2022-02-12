import classes from "./TodoList.module.css";
import TodoItem from "./TodoItem/TodoItem";
import CustomLoader from "../Common/loader/CustomLoader";
import CustomButton from "../Common/button/CustomButton";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { TODO_ENTITY_STATUS } from "../../store/todoSlice";
import TodoItemContainer from "./TodoItem/TodoItemContainer";

const TodoList = ({
  sortedTodos,
  isLoading,
  nextLoadSegmentPath,
  handleGetAll,
  handleLoadMore,
}) => {
  useEffect(() => {
    handleGetAll();
  }, []);

  const renderLoader = isLoading ? (
    <CustomLoader className={`${classes.loadMoreLoader}`} />
  ) : null;

  const renderListItems = sortedTodos.map((todo) => {
    return <TodoItemContainer key={todo.id} todo={todo} />;
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
  sortedTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.oneOf(Object.values(TODO_ENTITY_STATUS)),
      segmentPath: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  nextLoadSegmentPath: PropTypes.object,
  handleGetAll: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  nextLoadSegmentPath: null,
};

export default TodoList;
