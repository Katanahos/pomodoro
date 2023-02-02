import { state } from "./state.js";

const titleElem = document.querySelector(".title");
const todoListElem = document.querySelector(".todo__list");

const li = document.createElement("li");
li.classList.add("todo__item");

export const initTodo = () => {
  const todoList = getTodo();
  if (!todoList.length) {
    state.activeTodo = [
      {
        id: "default",
        pomodoro: 0,
        title: "Помодоро",
      },
    ];
  } else {
    state.activeTodo = todoList[todoList.length - 1];
  }
  renderTodoList(todoList);
  showTodo();
  addTodoBtn.addEventListener("click", () => {
    const title = prompt("Введите имя задачи");
    const todo = addTodo(title);
    createTodoListItem(todo);
  });
};

const addTodoBtn = document.createElement("button");
addTodoBtn.classList.add("todo__add");
addTodoBtn.textContent = "Добавить новую задачу...";
li.append(addTodoBtn);

const addTodo = (title) => {
  const todo = {
    title,
    pomodoro: 0,
    id: Math.random().toString(16).substring(2, 8),
  };

  const todoList = getTodo();
  todoList.push(todo);

  localStorage.setItem("pomodoro", JSON.stringify(todoList));
  return todo;
};

const getTodo = () => {
  const todoList = JSON.parse(localStorage.getItem("pomodoro") || "[]");
  return todoList;
};

const showTodo = () => {
  titleElem.textContent = state.activeTodo.title;
};

const renderTodoList = (list) => {
  todoListElem.textContent = "";
  list.forEach(createTodoListItem);
  todoListElem.append(li);
};

const createTodoListItem = (todo) => {
  if (todo.id !== "default") {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo__item");

    const todoItemWrapper = document.createElement("div");
    todoItemWrapper.classList.add("todo__item-wrapper");
    todoItem.append(todoItemWrapper);

    const todoBtn = document.createElement("button");
    todoBtn.classList.add("todo__btn");
    todoBtn.textContent = todo.title;

    const editBtn = document.createElement("button");
    editBtn.classList.add("todo__edit");
    editBtn.ariaLabel = "Редактировать задачу";

    const delBtn = document.createElement("button");
    delBtn.classList.add("todo__del");
    delBtn.ariaLabel = "Удалить задачу";

    todoItemWrapper.append(todoBtn, editBtn, delBtn);

    todoListElem.prepend(todoItem);
  }
};
