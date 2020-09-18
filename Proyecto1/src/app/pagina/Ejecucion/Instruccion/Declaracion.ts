import {NodoAST} from "../AST/NodoAST"
import {Tabla} from "../AST/Tabla";
import {AST} from "../AST/AST";
import {Error} from "../AST/Error";
import {Tipo, Tipos} from "../AST/Tipo";
import {Simbolo} from "../AST/Simbolo";
import { Identificador } from '../Expresion/Identificador';

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Declaracion extends NodoAST {
    constante:boolean;
    declaraciones:NodoAST[];

    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param valor valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(constante:boolean, declaraciones:NodoAST[], fila:number, columna:number) {
        super(null, fila, columna);
        this.constante = constante;
        this.declaraciones = declaraciones;
    }

    ejecutar(tabla:Tabla, ast:AST) {

        this.declaraciones.map((m:Identificador) =>{
            if(this.constante == true){
                if(m.valor == null){
                    const error = new Error("Semantico", "Constante " + m.identificador + " no inicializada ", m.fila, m.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;

                }else{
                    const result = m.valor.ejecutar(tabla, ast);
                    if (result instanceof Error) {
                        return result;
                    }

                    if(m.tipo == null){
                        m.tipo = m.valor.tipo;
                    }else if (m.tipo.tipo != m.valor.tipo.tipo) {
                        const error = new Error("Semantico", "No se puede declarar la variable " + m.identificador + " los tipos no coinciden", m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        return error;
                    }

                    let simbolo:Simbolo;
                    simbolo = new Simbolo(m.tipo, m.identificador, result, this.constante);
                    const res = tabla.setVariable(simbolo);
                    if (res != null) {
                        const error = new Error("Semantico", res, m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                    }
                    return null;
                }

            }else{
                if(m.valor == null){
                    let simbolo:Simbolo;
                    simbolo = new Simbolo(m.tipo, m.identificador, null, this.constante);
                    const res = tabla.setVariable(simbolo);
                    if (res != null) {
                        const error = new Error("Semantico", res, m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                    }
                    return null;

                }else{
                    const result = m.valor.ejecutar(tabla, ast);
                    if (result instanceof Error) {
                        return result;
                    }

                    if(m.tipo == null){
                        m.tipo = m.valor.tipo;
                    }else if (m.tipo.tipo != m.valor.tipo.tipo) {
                        const error = new Error("Semantico", "No se puede declarar la variable " + m.identificador + " porque los tipos no coinciden.", m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        return error;
                    }

                    let simbolo:Simbolo;
                    simbolo = new Simbolo(m.tipo, m.identificador, result, this.constante);
                    const res = tabla.setVariable(simbolo);
                    if (res != null) {
                        const error = new Error("Semantico", res, m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                    }
                    return null;
                }

            }
        });

    }
}