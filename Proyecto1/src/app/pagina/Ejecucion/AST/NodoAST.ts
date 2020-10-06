import { Tipo } from "./Tipo";
import { AST } from "./AST";
import { Tabla } from './Tabla';

export abstract class NodoAST{
    tipo:Tipo;
    fila:number;
    columna:number;

    /**
     * @abstract Metodo que sirver para ejecutar una instruccion o expresion
     * si fuera instruccion devuelve nulo y si fuera expresion devuelve un valor
     */

    abstract ejecutar(tabla:Tabla, ast:AST);
 
    abstract traducir(tab:string, ast:AST);

    /**
     * 
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param type Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param line Linea de la instruccion o expresion
     * @param column Columna de la instruccion o expresion
     */

    constructor(tipo:Tipo, fila:number, columna:number) {
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

}
