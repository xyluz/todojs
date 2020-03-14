window.document.addEventListener("DOMContentLoaded", app);

function app() {
  // create an empty array to store our todos
  let todoItems = [];
  // get all the dom elements we will be working with
  const list2 = document.querySelector("todo-list");
  const info = document.querySelector(".info");
  const todolist = document.querySelector(".todolist");
  const greetings = document.querySelector(".greetings");
  const myform = document.querySelector(".myform");

  // function to add new todos
  function addTodo(text) {
    // create a new todo Object so we can get some details to work with
    const todo = {
      text,
      checked: false,
      id: Date.now()
    };
    // push our new todo object to our todo  array
    todoItems.push(todo);
    // get our ul element to append our li
    const list = document.querySelector(".todo-list");
    // append li using (you can check mdn on how to use this)
    list.insertAdjacentHTML(
      "afterbegin",
      `
        <li class="todo-item flex flex-col border-b border-gray-500" data-value="${todo.id}" >
        <div class="flex w-full">
        <div class="todo-text mr-16 p-2 rounded" data-name="${todo.id}" >
      <span data-task="${todo.id}  class="text-md todotxt">${todo.text}</span>
      </div>
        <div class="c-btn self-center mr-3">
        <button data-key="${todo.id}" class="complete-btn hover:text-white hover:bg-green-400">Complete</button>
      <button data-key="${todo.id}" class="delete-btn hover:text-white hover:bg-red-400">Delete</button>
        </div>
      </div>
    </li>
    </ul>
    `
    );
  }

  // function to delete todo
  function deletetodo(key) {
    // we’ll locate the todo item in the array using its id and remove it.
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-value="${key}"]`);
    const details = document.querySelector(".details");
    const li = document.querySelector(".todo-item");
    // remove the todo
    item.remove();
    if (todoItems.length === 0) {
      info.style.display = "block";
      details.style.display = "none";
      info.classList.add("info");
      myform.classList.remove("myform-lg");
      myform.classList.add("myform");
      todolist.style.width = "50%";
      greetings.innerHTML = "Greetings, comrade.";
    }
  }
  // function to toggle if you're done with todo
  function toggleDone(key) {
    // find the todo with it's ID
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    const item = document.querySelector(`[data-name='${key}']`);
    if (todoItems[index].checked) {
      item.classList.add("strike");
      item.classList.add("done");
    } else {
      item.classList.remove("strike");
      item.classList.remove("done");
    }
  }

  // let's get input from our
  const form = document.querySelector(".myform");
  // by adding an event listener
  form.addEventListener("submit", function(e) {
    // preventdefault so the page doesn't keep reloading
    e.preventDefault();
    // get the value from our input
    const input = document.querySelector(".todoInput");
    // trim any whitespace from our input
    const text = input.value.trim();
    // if input is not an empty string
    if (text != "") {
      // add text to todo array
      addTodo(text);
      // set the input value back to empty
      input.value = "";
      input.focus();
      info.style.display = "none";
      todolist.style.marginBottom = "2rem";
      todolist.style.maxHeight = "20rem";
      greetings.innerHTML = "Your Todos";
      const details = document.querySelector(".details");
      details.style.display = "";
      myform.classList.add("myform-lg");
      todolist.style.width = "100%";
    }
  });
  // get list of our todos shown on the page
  const list = document.querySelector(".todo-list");
  // target our buttons to do their task
  list.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) {
      const item = e.target.dataset.key;
      deletetodo(item);
    }
    if (e.target.classList.contains("complete-btn")) {
      const item = e.target.dataset.key;
      toggleDone(item);
    }
    // this was actually fun :)
  });
}
