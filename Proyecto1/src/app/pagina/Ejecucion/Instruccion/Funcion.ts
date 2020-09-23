import { NodoAST } from "../AST/NodoAST"
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
import { Continue } from "../Expresion/Continue";
import { Break } from "../Expresion/Break";
import { Simbolo } from '../AST/Simbolo';
import { Identificador } from '../Expresion/Identificador';

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
*/

export class Funcion extends NodoAST {
    identificador:string;
    parametros:NodoAST[];
    tipo:Tipo;
    sentencias:NodoAST[];

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(identificador:string, parametros:NodoAST[], tipo:Tipo, sentencias:NodoAST[], fila:number, columna:number){
        super(tipo, fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
        this.sentencias = sentencias;
    }

    ejecutar(tabla:Tabla, ast:AST){
        let retorno = null;
        
        let nombre = "function_"+this.identificador;

        if(this.parametros != null){
            this.parametros.map((m:Identificador) =>{
                nombre += "_" + m.tipo.tipo;
            });
        }

        let simbolo:Simbolo;
        simbolo = new Simbolo(this.tipo, nombre, this, false);
        const res = tabla.setVariable(simbolo);
        if (res != null){
            const error = new Error("Semantico", res, this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            retorno = error;
            return error;
        }

        return retorno;
    }
}