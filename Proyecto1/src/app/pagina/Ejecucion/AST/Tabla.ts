import { Simbolo } from "./Simbolo";

/**
 * @class En esta clase es donde vamos a guardar y obtener las variables y funciones
 */

export class Tabla{
    anterior:Tabla;
    variables:Map<String, Simbolo>;

    /**
     * @constructor Crea una nueva tabla
     * @param Previous Tabla anterior para manejar los ambitos
     */

    constructor(anterior:Tabla){
        this.anterior = anterior;
        this.variables = new Map<String, Simbolo>();
    }

    /**
     * 
     * @method setVariable Almacena una variable, si ya existe arroja error
     * @param simbol Simbolo que contiene la informacion de la variable a almacenar
     */

    setVariable(simbolo: Simbolo){
        let env: Tabla;
        for(env = this; env != null; env = env.anterior){
            for(let key of Array.from( env.variables.keys()) ) {
                if(key === simbolo.id){
                    return `La variable ${key} ya ha sido declarada.`;
                }
            }
        }
        this.variables.set(simbolo.id, simbolo);
        return null;
    }


    /**
     * 
     * @method getVariable Obtiene una variable dentro de la tabla de simbolos
     * @param identifier Nombre de la variable a obtener
     */

    getVariable(id:string):Simbolo{
        let env:Tabla;
        for(env = this; env != null; env = env.anterior){
            for(let key of Array.from(env.variables.keys())) {
                if(key === id){
                    return env.variables.get(key);
                }
            }
        }
        return null;
    }

}