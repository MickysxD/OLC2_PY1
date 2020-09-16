import { Tipo } from "./Tipo";

/**
 * @class Esta clase me permite almacenar nodos en mis tablas de simbolos y de funciones 
 */

export class Simbolo{
    tipo:Tipo;
    id:string
    valor:Object

    /**
     * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
     * @param type Tipo de la varible o funcion
     * @param identifier Nombre de la variable o funcion
     * @param value Valor de la variable u objeto completo de la función
     */

    constructor(tipo:Tipo, id:string, valor:Object) {
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
    }
}