import {NodoAST} from "../AST/NodoAST"
import {Tabla} from "../AST/Tabla";
import {AST} from "../AST/AST";
import {Error} from "../AST/Error";
import {Tipo, Tipos} from "../AST/Tipo";
import {Simbolo} from "../AST/Simbolo";
import { Identificador } from '../Expresion/Identificador';
import { Return } from "../Expresion/Return";

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Type extends NodoAST {
    identificador:string;
    declaraciones:NodoAST[];

    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param valor valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identificador:string, declaraciones:NodoAST[], fila:number, columna:number) {
        super(null, fila, columna);
        this.identificador = identificador;
        this.declaraciones = declaraciones;
    }

    ejecutar(tabla:Tabla, ast:AST) {
        let simbolo:Simbolo;
        simbolo = new Simbolo(new Tipo(Tipos.TYPE), this.identificador, this, false);
        const res = tabla.setVariable(simbolo);
        if (res != null) {
            const error = new Error("Semantico", res, this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        return null;
    }

    traducir(tab:string, ast:AST) {
        let cadena = tab + this.identificador + " = {\n";
        let bandera = true;
        this.declaraciones.map((m:Identificador) =>{
            if(bandera){
                cadena += tab + "  " + m.traducir(tab, ast);
                bandera = false;
            }else{
                cadena += ",\n" + tab + "  " + m.traducir(tab, ast);
            }

            if(m.tipo != null){
                cadena += ":" + m.tipo.toString();
            }

        });

        cadena += "\n" + tab + "};\n"
        return cadena;
    }

}