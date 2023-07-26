const baseUrl = "https://fullstack-todo-backend-bbem.onrender.com";

const getAllToDos = async (setTodos) => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  setTodos(data);
};

const addTodo = async (text, setText, setTodos) => {
  fetch(`${baseUrl}/save`, {
    method: "POST",
    body: JSON.stringify({
      text: text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("Nova tarefa adicionada");
  setText("");
  getAllToDos(setTodos);
};

const updateTodo = async (todoId, text, setTodos, setText, setIsUpdating) => {
  fetch(`${baseUrl}/update`, {
    method: "PATCH",
    body: JSON.stringify({
      text: text,
      _id: todoId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("Tarefa atualizada");
  setText("");
  setIsUpdating(false);
  getAllToDos(setTodos);
};

const deleteTodo = async (id, setTodos) => {
  if (confirm("Tem certeza que quer excluir?")) {
    fetch(`${baseUrl}/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        _id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getAllToDos(setTodos);
  } else {
    return;
  }
};

export { getAllToDos, addTodo, updateTodo, deleteTodo };
