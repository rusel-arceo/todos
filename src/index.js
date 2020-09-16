
import './style.css';
import {Todo, TodoList} from './classes';  // Al no especificar el archivo, automaticamente busca el index.js en la carpeta. en este archivo están todas las importaciónes necesarias y se vueven a exportar, haciendo que aquí solo tegamos que hacer un import y hacer referecia a las clases en una sola linea
import { crearTodoHtml } from './js/componentes.js';

export const todoList = new TodoList();

//const tarea=new Todo("Mi primera Tarea");  Era para probar solamente
//tarea.completado=true;
//todoList.nuevoTodo(tarea);

//crearTodoHtml(tarea);


console.log(todoList)

//localStorage.setItem('mi-key','abc123');
     /* No tiene fecha de expiración, incluso puede soportar un reinicio, el sessiomnStorage es exactamente igual pero se elimina depué de cerrar el navegador, solo funcional para web, para un programa en node no funciona. */
     
/* setTimeout ( ( ) => {            // Ejecuta despues de milesegundos, en este caso es 1.5 s
localStorage.removeItem('mi-key');

}, 1500); */