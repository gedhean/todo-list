// Code goes here

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
        this.displayTodos();
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
        this.displayTodos();
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        this.displayTodos();
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
        this.displayTodos();
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
        this.displayTodos();
    }
};

//Object to handle events
var handlers = {
    //Display Todos botton must run displayTodoList()
    displayTodos: function() {
        todoList.displayTodos();
    },
    //Toggle Todos botton must run toggleAll()
    toggleAll: function() { 
        todoList.toggleAll();
    },
    addTodo: function() {
        var addTodoInputText = document.getElementById('addTodoInputText');
        todoList.addTodo(addTodoInputText.value);
        addTodoInputText.value = '';
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
    },
    deleteTodo: function() {
        var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
        todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
        deleteTodoPositionInput.value = '';
    },
    toggleCompleteTodo: function() {
        var toggleCompleteTodoPositionInput = document.getElementById('toggleCompleteTodoPositionInput');
        todoList.toggleCompleted(toggleCompleteTodoPositionInput.valueAsNumber);
        toggleCompleteTodoPositionInput.value = '';
    }
};




