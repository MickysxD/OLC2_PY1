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

export class If extends NodoAST {
    condicion:NodoAST;
    sentenciasIF:NodoAST[];
    listaIFS:NodoAST[];
    sentenciasELSE:NodoAST[];
    entro:boolean;


    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(condicion:NodoAST, sentenciasIF:NodoAST[], listaIFS:NodoAST[], sentenciasELSE:NodoAST[], fila:number, columna:number){
        super(null, fila, columna);
        this.condicion = condicion;
        this.sentenciasIF = sentenciasIF;
        this.listaIFS = listaIFS;
        this.sentenciasELSE = sentenciasELSE;
        this.entro = null;
    }

    ejecutar(tabla:Tabla, ast:AST){
        let retorno = null;
        const nuevoEntorno = new Tabla(tabla);
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

        if (result) {
            if(this.sentenciasIF != null){
                this.sentenciasIF.map((m) =>{
                    const res = m.ejecutar(nuevoEntorno, ast);
                    if(res instanceof Continue || res instanceof Break || res instanceof Error){
                        retorno = res;
                        return res;
                    }
                });
                this.entro = true;
                if(retorno instanceof Continue || retorno instanceof Break || retorno instanceof Error){
                    return retorno;
                }
            }
            
        } else {
            if(this.listaIFS != null){
                this.listaIFS.map((m:If) =>{
                    const res = m.ejecutar(nuevoEntorno, ast);
                    
                    if(m.entro){
                        this.entro = true;
                        retorno = res;
                        return res;
                    }

                    if (res instanceof Error) {
                        retorno = res;
                        return res;
                    }
                });
                if(retorno instanceof Error){
                    return retorno;
                }
            }
            
            if(this.sentenciasELSE != null && !this.entro){
                this.sentenciasELSE.map((m) =>{
                    const res = m.ejecutar(nuevoEntorno, ast);
                    if(res instanceof Continue || res instanceof Break || res instanceof Error){
                        retorno = res;
                        return res;
                    }
                });
                this.entro = true;
                if(retorno instanceof Continue || retorno instanceof Break || retorno instanceof Error){
                    return retorno;
                }
            }
            
        }

        return retorno;
    }
}