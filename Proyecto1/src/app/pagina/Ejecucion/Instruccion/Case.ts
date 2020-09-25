import { NodoAST } from "../AST/NodoAST"
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
import { Continue } from "../Expresion/Continue";
import { Break } from "../Expresion/Break";
import { Return } from "../Expresion/Return";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */

export class Case extends NodoAST {
    esDefault:boolean;
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

    constructor(esDefault:boolean, condicion:NodoAST, sentencias:NodoAST[], fila:number, columna:number){
        super(null, fila, columna);
        this.esDefault = esDefault;
        this.condicion = condicion;
        this.sentencias = sentencias;
    }

    ejecutar(tabla:Tabla, ast:AST){
        const nuevoEntorno = new Tabla(tabla);

        for(let i = 0; i < this.sentencias.length; i++){
            let m = this.sentencias[i];
            const res = m.ejecutar(nuevoEntorno, ast);
            if(res instanceof Continue || res instanceof Break || res instanceof Error || res instanceof Return){
                return res;
            }
            if(m instanceof Return){
                return m;
            }
        }

        return null;
    }
}