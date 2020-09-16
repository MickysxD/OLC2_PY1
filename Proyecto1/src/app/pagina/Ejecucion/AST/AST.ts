import { NodoAST } from './NodoAST';
import { Error } from "./Error";

/**
 * @class Almacena el ast y ademas la lista de excepciones
 */

export class AST{
    instrucciones:NodoAST[];
    errores:Error[];
    consola:string[];

    /**
     * Retorna un arbol con 2 atributos: 1 ast y 1 lista de excepciones
     * @param instructions AST generado por la gramatica
     */

    constructor(instrucciones:NodoAST[], errores:Error[]) {
        this.instrucciones = instrucciones;
        this.errores = errores;
        this.consola = [];
    }
}