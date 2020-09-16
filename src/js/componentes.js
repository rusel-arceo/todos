import { Todo } from "../classes";
import {todoList} from "../index.js";

const divTodoList = document.querySelector('.todo-list');  // para conocer el elemento padre y poder agregar y eliminar, es el padre de todas las tareas.
const txtInput = document.querySelector('.new-todo');  // para detectar las teclas sobre la entrada principal
const btnEliminaCompletados = document.querySelector('.clear-completed');  //para agregar EventListener y lanzar la función elimnar compleados
const ulFiltro=document.querySelector('.filters'); // Se obtiene el UL de los filtros para agregar eventos.
const anchorFiltros = document.querySelectorAll('.filtro');
export const contador = document.querySelector('.todo-count');

let filtro="";

export const crearTodoHtml = (todo) =>
{ // ${ }adentro acepta una expresión de javascrip. todo.completado ya es booleano, segun su balor tacha la tarea, debido al estilo ya definido en el css|
    const htmlTodo = `
    <li ${(todo.completado) ? ' class = completed' : ''}  data-id= '${todo.id}' > 
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    
    const div = document.createElement ('div'); // debería de ser lis pero como este list ya tiene valores que vamos a establecer, será mas facil crear un div que lo contenga
    div.innerHTML=htmlTodo;

    divTodoList.append(div.firstElementChild);  // el firstElementChild inserta el primer elemento hijo, aspi insertamos el li pero no el div, ya que este no nos sirve

    return div;
}

txtInput.addEventListener('keyup', ( event) => {  // CON keyup captamos cuando una tecla se levanta pero este evento nos trae información como value que es el valor introducido y keycode que es el número de la tecla presionada, el enter es 13
    console.log(event);
    if(event.keyCode===13  && txtInput.value.length > 0)  //txtInput es la referencia al input principal donde se cargan las tareas y se escribe las nuevas
        {
            const nuevoTodo = new Todo(txtInput.value);
            todoList.nuevoTodo(nuevoTodo);          
            crearTodoHtml(nuevoTodo);
            txtInput.value='';
        }
});

divTodoList.addEventListener('click', ( event ) => {  // el divTodoList contiene la referencia al ul (La lista) donde se insertan los toDO

   // console.log(event.target);  // imprime el codigo html donde clickeo, ej <input class="toogle" type"checkbox">  <button class="destroy"></button>
   const nombreElemento = event.target.localName; // IMPRIME SOLO EL NOMBRE DEL ELEMENTO QUE CLICKEO
   //const todoElemento = event.target.parentElement;  // obtiene una referencia al padre, el div
   const todoElemento = event.target.parentElement.parentElement;  // obtiene una referencia al padre del padre, el li donde está el id que necesitamos
   const todoId = todoElemento.getAttribute('data-id');   // obtiene el valor de un atributo
   
   if(nombreElemento.includes('input'))  // .includes, si la variable incluye el valor (input), es mas para etiquetas e contains para textos o valores de los atributos
   {
        const todo=todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');  // classList es para acceder a todas la clases,En un metodo que alterna la clase, si existe la elimina (devuelve false) y si no existe la crea (devuelve true) puede llevar un segundo arguemento, ver documetación.
        if(todoElemento.classList.contains('completed')) // SI esta completado
        { Todo.numPendientes--; }
        else{ Todo.numPendientes++; } 
        console.log(`El valor de filtro antes de presonar un boton ${filtro}`);
        if(filtro!= 'Todos' && filtro!= "")
        {  todoElemento.classList.toggle('hidden');}

        contador.innerText = `${Todo.numPendientes} pendiente(s)` ;
        
        console.log(todoElemento.classList);
       
   } else if(nombreElemento.includes('button'))
        {
            todoList.eliminarTodo(todoId);
            //todoElemento.parentElement.removeChild(todoElemento);       llama al padre de todoElemento y elimina al hijo ( que es el mismo todoElement) pero como ya teniamos la referencia al padre con divTodoList, lo usaremos como el instructor
            divTodoList.removeChild(todoElemento); //removeChild remueve el elemento hijo pasando su referencia a traves del padre
        }
   //console.log(todoList);
});

btnEliminaCompletados.addEventListener('click', ( event ) => {
    var elemento;
    for (let i = divTodoList.children.length-1; i >= 0; i--)  // con divTodoList.children obtengo ubn arreglo con los hijos del elemento (div)
    {   
        elemento = divTodoList.children[i];
        if(elemento.getAttribute('class')!=null)  // la clase getAttribute devuelve el valor del elemento pero si si ese aributo no existe devuelve null
        //if(elemento.classList.contains('completed'))  // Solución del instructor, contains devuelve true si contiene el elemento y false si no lo contiene, usamos .classList para que revise en las clases, de otra forma buscará mas "arriba" en atributos y marcará error.
            divTodoList.removeChild(elemento);
       
    }
    todoList.eliminarCompletados();
    console.log(todoList);
    
});

ulFiltro.addEventListener('click', (event)=>{
    const filtroLocal = event.target.text; // con target obtenemos el elemento cliqueado, con .text el texto que contiene entre las etiquetas, como el innherText.
    if(!filtroLocal){return;} // si se cliquea donde no hay texto captura undefined, con ! lo volvemos booleano true, con !! booleano false.
    
    /*Para aparecer el filtro, podemos usar el arreglo pero tendriamos que borra todo e ir dibujando con la clase HacerTodoHtml según queramos pero en este caso usaremos el HTML, de todas formas se eliminarán todos y se pondran solo solo filtrados*/
    //divTodoList.clildren.forEach(elemento => { console.log(elemento)});
    for (const elemento of divTodoList.children) //recorre todos los hijos 
    {
        console.log(elemento); 
        //elemento.classList.toggle('hidden');      podemos usarlo pero esto agrega si no tien y quita si tiene y como son varíos elementos podemos perder el control

        //Para saber si esta pendiente o completado
        elemento.classList.remove('hidden');
        const situacion = elemento.classList.contains('completed'); //para saber si lo incluye o no

        anchorFiltros.forEach(element=>{element.classList.remove('selected')});

        event.target.classList.add('selected');
        
        filtro = filtroLocal;

     switch(filtroLocal)
    {
        case 'Pendientes':
            
            if(situacion){
                elemento.classList.add('hidden');
            }
        break;
        
        case 'Completados':
            if(!situacion){
                elemento.classList.add('hidden');
            }
        break;

    }    
    }
   
});