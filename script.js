
var todoList = {
    todos: [],
    displayTodos: function() {
        console.log('My Todos:');
        if(this.todos.length === 0){
            console.log('Your todo list is empty.');
        } else {
            for(var i = 0; i < this.todos.length; i++){
                if(this.todos[i].completed === true){
                    console.log('(x)',this.todos[i].todoText); 
                }else{
                    console.log('( )',this.todos[i].todoText); 
                }
            } 
        }
    },
    addTodo: function(todoText) {
        this.todos.push({ //Add a itemObject
            todoText: todoText,
            completed: false
        });
        view.displayTodos();
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
        view.displayTodos();
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        view.displayTodos();
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
        view.displayTodos();
    },
    toggleAll: function(){
        var totalTodos = this.todos.length;
        var todosCompleted = 0;
        
        for(var i = 0; i < totalTodos; i++){
            if(this.todos[i].completed === true){
                todosCompleted++;
            }
        }
        //Case 1: If everything's true, make everything false.
        if(todosCompleted === totalTodos){
            for(i = 0; i < totalTodos; i++){
                this.todos[i].completed = false;
            }
        //Case 2: Otherwise, make everything true.
        } else {
            for(i = 0; i < totalTodos; i++){
                this.todos[i].completed = true;
            }
        }
        view.displayTodos();
    }
};

//Object to handle events
var handlers = {
    //Display Todos botton must run displayTodoList()
    displayTodos: function() {
        view.displayTodos();
    },
    //Toggle Todos botton must run toggleAll()
    toggleAll: function() { 
        todoList.toggleAll();
    },
    addTodo: function(event) {
        if (event.key === "Enter") {
            var addTodoInputText = document.getElementById('addTodoInputText');
            todoList.addTodo(addTodoInputText.value);
            addTodoInputText.value = '';
        } 
    },
    changeTodo: function(position, changeTodoTextInput) {      
        todoList.changeTodo(position, changeTodoTextInput);
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
    },
    toggleCompleteTodo: function(position) {
        todoList.toggleCompleted(position);
    }
};

var view = {
    createDeleteButton: function() {
        var buttonDelete = document.createElement('img');
        
        //buttonDelete.textContent = 'Delete';
        buttonDelete.src = 'img/delete.png';
        buttonDelete.className = 'deleteBtn';

        return buttonDelete;
    },
    createCompletedButton: function(completed) {
        var buttonCompleted = document.createElement('img');
        
        if(completed === true) {
            buttonCompleted.src = 'img/checked.png';
            buttonCompleted.className = 'completedBtn';
        } else {
            buttonCompleted.src = 'img/unchecked.png';
            buttonCompleted.className = 'completedBtn';
        }
        
        return buttonCompleted;
    },
    displayTodos: function() {
        //debugger;
        var todoUL = document.querySelector('ul.todos');
        var todos = todoList.todos;
        //Replaces the ul content with an empty string
        todoUL.innerHTML = '';
        
        todos.forEach(function(todo, position) {
            var todoLI = document.createElement('li'); 

            todoLI.appendChild(this.createCompletedButton(todo.completed));          
            
            if(todo.completed === true) {  
                todoLI.append(todo.todoText); 
            } else {
                todoLI.append(todo.todoText);
            }
            
            todoLI.id = position;
            todoLI.appendChild(this.createDeleteButton());
            todoUL.appendChild(todoLI);
        }, this);

        if(todos.length === 0) {
            var todoListIsEmpty = document.createElement('p');

            todoListIsEmpty.className = 'todoListIsEmpty';
            todoListIsEmpty.textContent = 'Your todo list is empty';
            todoUL.appendChild(todoListIsEmpty);
        }
    },
    clickToDelete: function() {
        var todoUL = document.querySelector('ul.todos');
        
        todoUL.addEventListener('click', function(event) {
            //Get the element that was clicked
            var elementClicked = event.target;
            
            if(elementClicked.className === 'deleteBtn') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            } else if(elementClicked.className === 'completedBtn' ||
                      elementClicked.className === 'completedBtn') {
                handlers.toggleCompleteTodo(parseInt(elementClicked.parentNode.id));
            } 
        });

        todoUL.addEventListener('dblclick', function(event) {
            //debugger;
            var elementClicked = event.target;
            var position = parseInt(elementClicked.id);
            var changeTodoTextInput = document.createElement('input');

            changeTodoTextInput.className = 'changeTodoTextInput';
            changeTodoTextInput.value = elementClicked.textContent;
            elementClicked.textContent = '';
            elementClicked.appendChild(changeTodoTextInput);

            changeTodoTextInput.focus();
            changeTodoTextInput.select();

            changeTodoTextInput.addEventListener('keydown', function(event) {
                //debugger;
                //console.log(position, changeTodoTextInput);
                if(event.key === 'Enter') {
                    handlers.changeTodo(position, changeTodoTextInput.value);
                    elementClicked.removeChild(changeTodoTextInput); 
                }
            }); 
        });
    }
};

//Waiting for the click on 'Delete' button to delete
view.displayTodos();
view.clickToDelete();

