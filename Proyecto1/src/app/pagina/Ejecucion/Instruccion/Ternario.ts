import { NodoAST } from "../AST/NodoAST"
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
import { Continue } from "../Expresion/Continue";
import { Break } from "../Expresion/Break";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */

export class Ternario extends NodoAST {
    condicion:NodoAST;
    primero:NodoAST;
    segundo:NodoAST;

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(condicion:NodoAST, primero:NodoAST, segundo:NodoAST, fila:number, columna:number){
        super(null, fila, columna);
        this.condicion = condicion;
        this.primero = primero;
        this.segundo = segundo;
    }

    ejecutar(tabla:Tabla, ast:AST){
        const nuevoEntorno = new Tabla(tabla);
        let result:NodoAST;
        result = this.condicion.ejecutar(nuevoEntorno, ast);
        if (result instanceof Error) {
            return result;
        }

        if (this.condicion.tipo.tipo != Tipos.BOOLEAN) {
            const error = new Error("Semantico", "Se esperaba una expresion booleana para la condicion", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }

        if (result) {
            const res = this.primero.ejecutar(nuevoEntorno, ast);
            this.tipo = this.primero.tipo;
            return res;
            
        } else {
            const res = this.segundo.ejecutar(nuevoEntorno, ast);
            this.tipo = this.segundo.tipo;
            return res;
            
        }

    }
}