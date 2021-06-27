

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
//const {mostrarMenu, pausa} = require('./helpers/mensajes')
const {iniquirerMenu, pausaInput, leerInput, tareasBorrar, confirm, mostrarListado} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main= async()=> {
    
    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if (tareasDB){
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        opt = await iniquirerMenu();

        switch (opt) {
            case '1':
                const descripcion = await leerInput('Descripcion:')
                tareas.crearTarea(descripcion)
                break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listarTareasCompletadas(true)
                break;
            case '4':
                tareas.listarTareasCompletadas(false)
                break;
            case '5':
                const ids= await mostrarListado(tareas.listadoArr)
                tareas.toggleComplete(ids)
                
                break;
            case '6':
                const id = await tareasBorrar(tareas.listadoArr)
                if(id !== '0'){
                    const ok = await confirm('¿estás seguro?')
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log('tarea borrada'.red)
                    }
                }
                
                break;

    
            
        }

        guardarDB(tareas.listadoArr)


    

        await pausaInput()


    } while (opt !== '0');
}

main()