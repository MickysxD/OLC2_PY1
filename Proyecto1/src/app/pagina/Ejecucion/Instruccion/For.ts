import { NodoAST } from "../AST/NodoAST"
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
import { Continue } from "../Expresion/Continue";
import { Break } from "../Expresion/Break";
import { Declaracion } from './Declaracion';
import { Asignacion } from './Asignacion';

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */

export class For extends NodoAST {
    comienzo:NodoAST;
    condicion:NodoAST;
    iterador:NodoAST;
    sentencias:NodoAST[];

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(comienzo:NodoAST, condicion:NodoAST, iterador:NodoAST, sentencias:NodoAST[], fila:number, columna:number){
        super(null, fila, columna);
        this.comienzo = comienzo;
        this.condicion = condicion;
        this.iterador = iterador;
        this.sentencias = sentencias;
    }

    ejecutar(tabla:Tabla, ast:AST){
        let retorno = null;
        const entorno = new Tabla(tabla);
        if(this.comienzo instanceof Declaracion || this.comienzo instanceof Asignacion){
            this.comienzo.ejecutar(entorno, ast);
        }else{
            const error = new Error("Semantico", "Se esperaba una asignacion o declaracion en la sentencia For", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            retorno = error;
            return error;
        }

        let enciclado = 0;
        for (let index = 0; index <= 5000; index++){
            const nuevoEntorno = new Tabla(entorno);

            let result:NodoAST;
            result = this.condicion.ejecutar(entorno, ast);
            if (result instanceof Error) {
                retorno = result;
                return result;
            }

            if (this.condicion.tipo.tipo != Tipos.BOOLEAN) {
                const error = new Error("Semantico", "Se esperaba una expresion booleana para la condicion", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                retorno = error;
                return error;
            }

            if (result) {
                if(this.sentencias != null){
                    this.sentencias.map((m) =>{
                        const res = m.ejecutar(nuevoEntorno, ast);
                        if(res instanceof Continue || res instanceof Break || res instanceof Error){
                            index = 5000;
                            retorno = res;
                            return res;
                        }
                    });
                    if(retorno instanceof Continue || retorno instanceof Break || retorno instanceof Error){
                        return retorno;
                    }
                }
            }else{
                break;
            }

            this.iterador.ejecutar(entorno, ast);
            enciclado = index;
        }

        if(enciclado == 5000){
            const error = new Error("Semantico", "Se ha enciclado la sentencia for", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            retorno = error;
            return error;
        }else{
            return retorno;
        }
    }
}