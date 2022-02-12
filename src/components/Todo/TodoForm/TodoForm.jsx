import classes from "./TodoForm.module.css";
import CustomInput from "../../Common/input/CustomInput";
import CustomButton from "../../Common/button/CustomButton";
import PropTypes from "prop-types";
import ErrorBanner from "../../Common/banner/ErrorBanner";

const TodoForm = ({
  title,
  isAdding,
  isAddingError,
  handleChangeTitle,
  handleKeyDownTitle,
  handleClickAddButton,
}) => {
  const addButtonText = isAdding ? "Adding..." : "Add";

  const renderErrorBanner = isAddingError ? (
    <ErrorBanner
      text={"Todo adding error"}
      className={`${classes.errorBanner}`}
    />
  ) : null;

  return (
    <div className={classes.todoFormWrapper}>
      <form className={classes.todoForm}>
        <CustomInput
          type="text"
          value={title}
          placeholder="Enter todo..."
          onChange={handleChangeTitle}
          onKeyDown={handleKeyDownTitle}
          disabled={isAdding}
        />
        <CustomButton
          onClick={handleClickAddButton}
          disabled={isAdding}
          className={`${classes.addButton}`}
        >
          {addButtonText}
        </CustomButton>
      </form>
      {renderErrorBanner}
    </div>
  );
};

TodoForm.propTypes = {
  title: PropTypes.string.isRequired,
  isAdding: PropTypes.bool.isRequired,
  isAddingError: PropTypes.bool.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleKeyDownTitle: PropTypes.func.isRequired,
  handleClickAddButton: PropTypes.func.isRequired,
};

export default TodoForm;
