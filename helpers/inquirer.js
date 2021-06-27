
const inquirer = require('inquirer')
require('colors')


const iniquirerMenu = async () => {
    console.clear()
    console.log('========================'.green)
    console.log('Seleccione una opción'.green)
    console.log('========================\n'.green)


const preguntas = [
    {
        name: 'options',
        type: 'list',
        message: '¿que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} crear tarea`
            },
            {
                value: '2',
                name: '2. listar tarea'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tareas'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
]
    
    const {options} = await inquirer.prompt(preguntas)

    return options
}


const pausaInput = async () => {

    const pausaOptions = [
        {
            name: 'options',
            type: 'input',
            message: `Presione ${'Enter'.green} para continuar`
            
        }
    ]
    const pausa = await inquirer.prompt(pausaOptions)
    
    return pausa
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0){
                    return 'por favor ingrese un valor';

                }
                return true;
            }
        }
    ]
    const {desc} = await inquirer.prompt(question);
    return desc

}

const tareasBorrar = async(tarea ) =>{
    const choices = tarea.map( (tarea, index) => {
        return {
            value: tarea.id,
            name: `${index+1}. ${tarea.desc}`
        }
    })
    choices.unshift({
        value: '0',
        name: '0. Cancelar'
    })

    const preguntas =[
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas)
    return id
}

const mostrarListado = async(tarea ) =>{
    const choices = tarea.map( (tarea, index) => {
        return {
            value: tarea.id,
            name: `${index+1}. ${tarea.desc}`,
            checked: (tarea.completadoEn)? true : false
        }
    })


    const preguntas =[
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas)
    return ids
}

const confirm = async (message)=> {
    const question =[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(question)
    return ok

}






module.exports= {
    iniquirerMenu,
    pausaInput,
    leerInput,
    tareasBorrar, 
    confirm,
    mostrarListado
}