import { NodoAST } from "../AST/NodoAST";
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Tipo,Tipos } from "../AST/Tipo";

/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class Primitivo extends NodoAST{
    valor:object;

    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param tipo Tipo del valor, puede ser numero, cadena o booleano
     * @param valor Valor primitivo que crear
     * @param fila Fila de donde se creo la sentencia
     * @param columna columnaa donde se creo la sentencia
     */
    constructor(tipo:Tipo, valor:object, fila:number, columna:number){
        super(tipo, fila, columna);
        this.valor = valor;
    }

    /**
     * Devuelve el valor inicial e.g. 4
     * @param table Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */

    ejecutar(tabla:Tabla, ast:AST) {
        return this.valor;
    }
}