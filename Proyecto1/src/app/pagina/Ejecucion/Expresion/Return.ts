import { NodoAST } from "../AST/NodoAST";
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */

export class Return extends NodoAST {
    valor:NodoAST;
    dato:object;

    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    
    constructor(valor:NodoAST, dato:object, fila:number, columna:number) {
        super(null, fila, columna);
        this.valor = valor;
        this.dato = null;
    }

    ejecutar(tabla:Tabla, ast:AST){
        if(this.valor != null){
            const result = this.valor.ejecutar(tabla, ast);
            if (result instanceof Error) {
                return result;
            }
            this.dato = result;
            this.tipo = this.valor.tipo;
            return result;
        }

        return null;
    }


}