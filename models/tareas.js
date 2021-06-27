const Tarea = require("./tarea");
require('colors')

class Tareas {
    constructor(){
        this._listado= {};
    }
    get listadoArr (){
        const listado= [];
        Object.keys(this._listado).forEach( key => listado.push(this._listado[key]))
        // Object.values(this._listado).forEach( item => listado.push(item))
        return listado
    }

    cargarTareasFromArray (tareas ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(desc){
        const tarea =  new Tarea(desc);
        this._listado[tarea.id]= tarea;
    }

    listadoCompleto(){
       this.listadoArr.forEach( (tarea, index) =>{
           const i = `${index+1}`.green;
           const {desc, completadoEn} = tarea;
           const estado = (completadoEn)? 'Completado'. green: 'Pendiente'.red;
           console.log(`${i} ${desc} :: ${estado}`)
       })
    }

    listarTareasCompletadas(value){
        if (value == true){

            const completadas = this.listadoArr.filter(tarea => {
                return Boolean(tarea.completadoEn) == true
            }).forEach((tarea, index) => console.log(`${index+1}. ${tarea.desc} :: completado el ${(tarea.completadoEn).green}`))

        }else {
            const completadas = this.listadoArr.filter(tarea => {
                return Boolean(tarea.completadoEn) == false
            }).forEach((tarea, index) => console.log(`${index+1}. ${tarea.desc}`))
        }

    }

    borrarTarea( id){
        if (this._listado[id]){
            delete this._listado[id]
        }
    }

    toggleComplete(ids){
        ids.forEach( id => {
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null

            }
        })
    }
}

module.exports = Tareas