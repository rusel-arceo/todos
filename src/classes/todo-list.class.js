import { todoList } from "..";
import { crearTodoHtml } from "../js/componentes";
import {Todo} from './todo.class';
import {contador} from '../js/componentes.js';

export class TodoList{

    constructor ()
    {
       // this.todos=[]; // porque en el localStorage se iniccaliza de ser necesario
       this.cargarLocalStorage()
    }

    nuevoTodo (todo)
    {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo( id )
    {
       // Podría hacerse con el for y el if similar que marcarCompletado pero se usará .filter () Está función devuelve una copía de un arreglo menos los elementos que no cumplan con la restricción.
      this.todos = this.todos.filter( ( todo ) => {return todo.id!=id; // recuerda que la funcion de flecha cuando solo retorna se puede escribir todo => {return todo.id!=id; sin los paarentesís OJOTE
        
       })
       this.guardarLocalStorage();
       console.log(this.todos);
    }

    marcarCompletado( id )
    {
        for (const todo of this.todos)
        {
            if(todo.id==id) // porque es probable que los tipos del todos y del obtenido de la pagina sena diferentes
            {
                todo.completado=!todo.completado; // todo apunta al objeto, no se pasa por valor si no por referencia
            }
        }
        this.guardarLocalStorage();
    }

    eliminarCompletados( id )
    {
        this.todos = this.todos.filter( ( todo ) => { return !todo.completado; } ); //El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
        this.guardarLocalStorage();
    }

    guardarLocalStorage()
    {
        localStorage.setItem('todo',JSON.stringify(this.todos));  // agregamos items al localStorage 
        console.log(localStorage);
    }

    cargarLocalStorage()
    {
       //Esta es mi solución pero en el curso piden operadoer ternario, asi que lo haré
        /* if(localStorage.getItem('todo')) //Devuelve false si no existe el Item
        {

            this.todos=JSON.parse(localStorage.getItem('todo'));
            

            for (var todo of this.todos)
                crearTodoHtml(todo);

        } else{
            this.todos = [];
        } */
        
        this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [] ;
       
        
        this.todos = this.todos.map( obj => Todo.fromJson(obj));  //La clase map llama a la infuncion interna hasta acabar con el arreglo, recorriendolo completo y al final devuelve un nuevo arreglo con los valores devueltos. Puede quedar solo => (Todo.fromJson)
       
       /* /* for (var todo of this.todos)
                crearTodoHtml(todo); */

       // this.todos.forEach(element => {
       //     crearTodoHtml(element);
       // });  // es una forma de recorrer un arreglo, se van asignando al element y dentro se hace un callback, tambien se puede hacer */
       
        this.todos.forEach(crearTodoHtml); //Significa que el elemento que recibira el arreglo es el mismo que se le va a mandar a la función, solo puede ser uno
        console.log("Número de completados " + Todo.numPendientes);
        contador.innerText = `${Todo.numPendientes} pendiente(s)` ;
    }


}