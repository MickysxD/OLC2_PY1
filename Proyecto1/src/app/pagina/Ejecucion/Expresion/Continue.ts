import { NodoAST } from "../AST/NodoAST";
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";

/**
 * @class Nodo expresion ontinue, nos indica cuando terminar un ciclo
 */

export class Continue extends NodoAST {

    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    
    constructor(fila:number, columna:number) {
        super(null, fila, columna);
    }

    ejecutar(tabla:Tabla, ast:AST){
        return this;
    }
}