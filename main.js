import './main.css';

class Todo {
    constructor(text) {
        this.text = text;
    }
}

class TodoListModel {
    constructor(items) {
        this.todoListe = [...items];
    }

    add(todo) {
        this.todoListe.push(todo);
    }
} 

class TodoListController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    addTodo(text) {
        var newTodo = new Todo(text);
        this.model.add(newTodo);
        this.view.renderTodoList();
    }
}

class TodoListView {
    constructor(model) {
        this.model = model;
        this.renderTodoList();
    }

    renderTodoList() {

        // first remove all todo items
        var container = document.getElementById("todolist");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
          }

          // then add them back to the list
            for (var i = 0; i < this.model.todoListe.length; i++ ) {
                var todoItem = this.model.todoListe[i];

                // newtodo is a li with a span with text 
                var newTodoEntry = document.createElement("li")
                var spanNode = document.createElement("span")
                spanNode.appendChild(document.createTextNode(todoItem.text))
                newTodoEntry.appendChild(spanNode);

                // add the new todo entry to the list
                container.appendChild(newTodoEntry);
        }
    }
}

var existingTodos = [
    new Todo("call peter"),
    new Todo("talk to susi")
]

var todoModel = new TodoListModel(existingTodos);
var todoView = new TodoListView(todoModel);
var todoController = new TodoListController(todoModel, todoView);

// connect the html with the controller
function registerActions() {
    var addButton = document.getElementById("addButton");
    addButton.addEventListener("click", (ev) => {
        ev.preventDefault();

        var input = document.getElementById("newTodoText").value;
        todoController.addTodo(input);
    });
}

registerActions();
