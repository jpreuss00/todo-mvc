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
    delete(todo) {
        var idx = this.todoListe.indexOf(todo);
        console.log(idx);
        // ... todo
    }
}

class TodoListController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.setDeleteItemHandler((item) => this.deleteTodo(item));
    }

    addTodo(text) {
        var newTodo = new Todo(text);
        this.model.add(newTodo);
        this.view.renderTodoList();
    }

    deleteTodo(todo) {
        this.model.delete(todo); 
    }
}

class TodoListView {
    constructor(model) {
        this.model = model;
        this.deleteItemHandler = null;
        this.renderTodoList();
    }

    setDeleteItemHandler(func) {
        this.deleteItemHandler = func;
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

                var newTodoEntry = document.createElement("li")
                var spanNode = document.createElement("span")
                spanNode.appendChild(document.createTextNode(todoItem.text))
                newTodoEntry.appendChild(spanNode);

                var deleteButton = document.createElement("button")
                deleteButton.appendChild(document.createTextNode(" - "))
                deleteButton.addEventListener("click", () => this.deleteItemHandler(todoItem) )
                newTodoEntry.appendChild(deleteButton);

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
