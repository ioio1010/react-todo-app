import "./index.css";
import TodoFormContainer from "./components/Todo/TodoForm/TodoFormContainer";
import TodoListContainer from "./components/Todo/TodoListContainer";

function App() {
  return (
    <div className="App">
      <TodoFormContainer />
      <TodoListContainer />
    </div>
  );
}

export default App;
