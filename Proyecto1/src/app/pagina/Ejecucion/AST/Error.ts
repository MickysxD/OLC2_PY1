/**
 * @class Nodo para almacenar errores ya sean lexicos, sintacticos o semanticos
 */

export class Error{
    tipo:string;
    descripcion:string;
    fila:number;
    columna:number;

    /**
     * Devuelve un objeto con un nuevo objeto excepcion
     * @param type Tipo de error, e.g. (lexico, sintactico, semantico)
     * @param description Descripcion del error, e.g. (No se encontro la variable X)
     * @param line Fila donde ocurrio el error
     * @param column Columna donde ocurrio el error
     */

    constructor(tipo:string, descripcion:string, fila:number, columna:number){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }

    toString(){
        return "Tipo:" + this.tipo + " Descripcion:" + this.descripcion + " Fila:" + this.fila + " Columna:" + this.columna;
    }

}