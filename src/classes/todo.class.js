export class Todo{         // Exportamos a clase porque se utilizará en otra módulo (archivo)
    
   //static numPendientes
    
    constructor (tarea)    // Así se crea en constructor en javascript
    {
        this.tarea = tarea;
        this.id = new Date().getTime();   // con la clase Date con el metodo getTime obtiene una        representación de la hora en hora, minuto, segundo, minisegundo todo junto que usaremos como ID
        this.completado=false;
        this.creado=new Date();  // obtiene la fecha ¿?
        
    }

    static fromJson({id, tarea,completado, creado})  // Recibe un objeto y asigna sus propiedades a una instancias todo. se puede recibir (object) pero se va a desagregar usado {ATRB1, ATRB2, ETC}
    {
        const temporalTodo = new Todo(tarea);
        temporalTodo.id         = id;
        temporalTodo.completado = completado;
        temporalTodo.creado     = creado;

        if(!Todo.numPendientes){Todo.numPendientes=0}; // Inicializo si no lo esta
        
        if(!completado){Todo.numPendientes++;} // Si completado el falso aumento, la negacion evita el else
        
        return temporalTodo;    
    }

    

}