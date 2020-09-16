export enum Tipos{
    NUMBER,
    STRING,
    BOOLEAN,
    VOID,
    TYPE,
    ARRAY
}

/**
 * 
 * @class Permite llevar el control de los tipos del lenguaje
 */

export class Tipo{
    tipo : Tipos;

    /**
     * 
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param type Tipo seleccionado para la variable o funcion
     * 
     */

    constructor(tipo: Tipos){
        this.tipo = tipo;
    }

    toString(){
        if(this.tipo === Tipos.BOOLEAN){
            return 'boolean';
        }else if(this.tipo === Tipos.NUMBER){
            return 'numeric';
        }else if(this.tipo === Tipos.STRING){
            return 'string';
        }else if(this.tipo === Tipos.VOID){
            return 'void';
        }else if(this.tipo === Tipos.TYPE){
            return 'type';
        }else if(this.tipo === Tipos.ARRAY){
            return 'Array';
        }
    }
}