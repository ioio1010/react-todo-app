import "./index.css";
import TodoForm from "./components/Todo/TodoForm/TodoForm";
import TodoListContainer from "./components/Todo/TodoListContainer";

function App() {
  return (
    <div className="App">
      <TodoForm />
      <TodoListContainer />
    </div>
  );
}

export default App;
