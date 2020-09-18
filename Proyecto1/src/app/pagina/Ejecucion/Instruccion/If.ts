import { NodoAST } from "../AST/NodoAST"
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
/*
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";*/

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
            if(this.sentenciasIF != null){
                this.sentenciasIF.map((m:If) =>{
                    m.ejecutar(nuevoEntorno, ast);
                    //if(res instanceof Continue || res instanceof Break){
                    //    return null;
                    //}
                });
                this.entro = true;
            }
            
        } else {
            if(this.listaIFS != null){
                this.listaIFS.map((m:If) =>{
                    const res = m.ejecutar(nuevoEntorno, ast);
                    
                    if(m.entro){
                        this.entro = true;
                        return null;
                    }

                    if (res instanceof Error) {
                        return res;
                    }
                });

            }
            
            if(this.sentenciasELSE != null && !this.entro){
                this.sentenciasELSE.map((m:If) =>{
                    const res = m.ejecutar(nuevoEntorno, ast);
                    //if(res instanceof Continue || res instanceof Break){
                    //    return null;
                    //}
                });
                this.entro = true;
            }
            
        }

        return null;
    }
}