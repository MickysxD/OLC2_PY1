import {NodoAST} from "../AST/NodoAST"
import {Tabla} from "../AST/Tabla";
import {AST} from "../AST/AST";
import {Error} from "../AST/Error";
import {Tipo, Tipos} from "../AST/Tipo";
import {Simbolo} from "../AST/Simbolo";
import { Identificador } from '../Expresion/Identificador';
import { Return } from "../Expresion/Return";
import { Declaracion } from './Declaracion';
import { Type } from './Type';

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class TypeDeclaracion extends NodoAST {
    identificador:string;
    typeNombre:string;
    declaraciones:NodoAST[];
    constante:boolean;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param valor valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identificador:string, typeNombre:string, declaraciones:NodoAST[], constante:boolean, fila:number, columna:number) {
        super(null, fila, columna);
        this.identificador = identificador;
        this.typeNombre = typeNombre;
        this.declaraciones = declaraciones;
        this.constante = constante;
    }

    ejecutar(tabla:Tabla, ast:AST) {
        let retorno = null;
        let entorno = new Tabla(null);
        let bandera = true;
        this.declaraciones.map((m:Identificador) =>{
            if(m.valor == null){
                const error = new Error("Semantico", "Valor en  type " + m.identificador + " no inicializado ", m.fila, m.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                retorno = error;
                return error;

            }else{
                let result = m.valor.ejecutar(tabla, ast);
                if (result instanceof Error) {
                    retorno = result;
                    return result;
                }

                if(m.tipo == null){
                    m.tipo = m.valor.tipo;
                }else if (m.tipo.tipo != m.valor.tipo.tipo) {
                    const error = new Error("Semantico", "No se puede declarar la variable " + m.identificador + " los tipos no coinciden", m.fila, m.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    retorno = error;
                    return error;
                }

                if (m.tipo.tipo == Tipos.VOID) {
                    const error = new Error("Semantico", "No se puede declarar la variable con tipo void", m.fila, m.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    retorno = error;
                    return error;
                }

                const base = tabla.getVariable(this.typeNombre);
                if (base == null) {
                    const error = new Error("Semantico", "Type no declarado", m.fila, m.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    retorno = error;
                    return error;
                }else{
                    if(base.valor instanceof Type){
                        for(let i=0; i<base.valor.declaraciones.length; i++){
                            let p = base.valor.declaraciones[i];
                            if(p instanceof Identificador){
                                if(p.identificador == m.identificador){
                                    if(p.tipo.tipo == m.tipo.tipo){
                                        let simbolo:Simbolo;
                                        simbolo = new Simbolo(m.tipo, m.identificador, result, this.constante);
                                        const res = entorno.setVariable(simbolo);
                                        if (res != null) {
                                            bandera = false;
                                            const error = new Error("Semantico", res, m.fila, m.columna);
                                            ast.errores.push(error);
                                            //ast.consola.push(error.toString());
                                            retorno = error;
                                            return error;
                                        }
                                        return retorno;
                                    }
                                }else if(base.valor.declaraciones.length == i+1){
                                    bandera = false;
                                    const error = new Error("Semantico", "Error " + m.identificador + " no existe en el type " + m.identificador, m.fila, m.columna);
                                    ast.errores.push(error);
                                    //ast.consola.push(error.toString());
                                    retorno = error;
                                    return error;
                                }

                            }
                        }

                        return retorno;

                    }else {
                        const error = new Error("Semantico", "Variable " + base.id + " no es del tipo type", m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        retorno = error;
                        return error;
                    }

                }

            }
            
        });

        if(bandera){
            let simbolo:Simbolo;
            simbolo = new Simbolo(new Tipo(Tipos.TYPE), this.identificador, entorno, this.constante);
            const res = tabla.setVariable(simbolo);
            if (res != null) {
                const error = new Error("Semantico", res, this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                retorno = error;
                return error;
            }
        }

        return retorno;
    }

    getConstante(){
        if(this.constante){
            return "const ";
        }else{
            return "let ";
        }
    }

    traducir(tab:string, ast:AST) {
        let cadena = tab + this.getConstante() + this.identificador + ":" + this.typeNombre + " = {\n";
        let bandera = true;
        this.declaraciones.map((m:Identificador) =>{
            if(bandera){
                cadena += tab + "  "+ m.identificador;
                bandera = false;
            }else{
                cadena += ",\n" + tab + "  " + m.identificador;
            }

            if(m.valor != null){
                cadena += ":" + m.valor.traducir(tab,ast);
            }

        });

        cadena += "\n" + tab + "};\n"
        return cadena;
    }
}