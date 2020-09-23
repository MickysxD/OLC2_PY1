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

export class DoWhile extends NodoAST {
    condicion:NodoAST;
    sentencias:NodoAST[];

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(condicion:NodoAST, sentencias:NodoAST[], fila:number, columna:number){
        super(null, fila, columna);
        this.condicion = condicion;
        this.sentencias = sentencias;
    }

    ejecutar(tabla:Tabla, ast:AST){
        let retorno = null;
        let enciclado = 0;
        for (let index = 0; index <= 5000; index++){
            const nuevoEntorno = new Tabla(tabla);

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

            let result:NodoAST;
            result = this.condicion.ejecutar(nuevoEntorno, ast);
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

            if (!result) {
                return retorno;
            }
            enciclado = index;
        }

        if(enciclado == 5000){
            const error = new Error("Semantico", "Se ha enciclado la sentencia Do While", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            retorno = error;
            return error;
        }else{
            return retorno;
        }
    }
}