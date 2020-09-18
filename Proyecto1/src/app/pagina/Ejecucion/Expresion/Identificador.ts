import {NodoAST} from "../AST/NodoAST";
import {Tabla} from "../AST/Tabla";
import {AST} from "../AST/AST";
import {Simbolo} from "../AST/Simbolo";
import {Error} from "../AST/Error";
import {Tipo,Tipos} from "../AST/Tipo";

/**
 * @class Nodo expresion identificador que obtendra el valor de una variable
 */
export class Identificador extends NodoAST {
    identificador:string;
    valor:NodoAST

    /**
     * @constructor Retorna el objeto identificador creado
     * @param identifier nombre de la variable
     * @param line Linea del identificador
     * @param column Columna del identificador
     */

    constructor(identificador:string, tipo:Tipo, valor:NodoAST, fila:number, columna:number){
        //tipo null porque aun no se el tipo
        super(tipo, fila, columna);
        this.identificador = identificador;
        this.valor = valor;
    }

    ejecutar(tabla:Tabla, ast:AST){
        let variable:Simbolo;
        variable = tabla.getVariable(this.identificador);
        if (variable == null) {
            const error = new Error("Semantico","No se ha encontrado la variable " + this.identificador, this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }else if (variable.valor == null) {
            const error = new Error("Semantico","Variable no inicializada " + this.identificador, this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        this.tipo = variable.tipo;
        return variable.valor;
   }
}