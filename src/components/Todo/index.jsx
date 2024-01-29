const Todo = ({ todo, deleteTodo, updateTodo }) => {
  return (
    <>
      <li>
        {todo.title} {todo.description}
      </li>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </>
  );
};

export default Todo;
