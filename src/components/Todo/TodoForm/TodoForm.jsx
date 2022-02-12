import classes from "./TodoForm.module.css";
import CustomInput from "../../Common/input/CustomInput";
import CustomButton from "../../Common/button/CustomButton";

const TodoForm = ({
  title,
  isAdding,
  handleChangeTitle,
  handleKeyDownTitle,
  handleClickAddButton,
}) => {
  const addButtonText = isAdding ? "Adding..." : "Add";

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
    </div>
  );
};

export default TodoForm;
