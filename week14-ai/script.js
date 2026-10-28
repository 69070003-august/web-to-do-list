const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    const todos = JSON.parse(saved);
    todos.forEach(text => addTodoElement(text));
  }
}

function saveTodos() {
  const items = todoList.querySelectorAll('li span');
  const todos = Array.from(items).map(span => span.textContent);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodoElement(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'ลบ';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTodos();
  });
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    addTodoElement(text);
    todoInput.value = '';
    saveTodos();
  }
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

loadTodos();