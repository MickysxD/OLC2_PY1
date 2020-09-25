import { NodoAST } from "../AST/NodoAST"
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
import { Simbolo } from "../AST/Simbolo";
import { Identificador } from '../Expresion/Identificador';
import { Funcion } from './Funcion';
import { Return } from '../Expresion/Return';

/**
 * @class Reasigna el valor de una variable existente
 */

export class UsoFuncion extends NodoAST {
    identificador:string;
    parametros:NodoAST[];
    valor:NodoAST;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identificador nombre de la variable
     * @param valor valor de la variable
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(identificador:string, parametros:NodoAST[], fila:number, columna:number) {
        super(null, fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
        this.valor = null;
    }

    ejecutar(tabla:Tabla, ast:AST) {
        const nuevoEntorno = new Tabla(tabla);
        let nombre = "function_"+this.identificador;

        for(let i = 0; i < this.parametros.length; i++){
            let m = this.parametros[i];
            const result = m.ejecutar(tabla, ast);
            if(result instanceof Error){
                return result;
            }
            nombre += '_' + m.tipo.tipo;
        }

        let variable:Simbolo;
        variable = tabla.getVariable(nombre);
        if (variable == null) {
            const error = new Error("Semantico","No se ha encontrado la funcion " + this.identificador, this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }

        let funcion:Funcion;
        if(variable.valor instanceof Funcion){
            funcion = variable.valor;
            this.tipo = funcion.tipo;
        }

        for(let i = 0; i < this.parametros.length; i++){
            let ejec = this.parametros[i];
            let enf = funcion.parametros[i];
            if(enf instanceof Identificador){
                let result = ejec.ejecutar(tabla,ast);
                if (result instanceof Error) {
                    return result;
                }
                if(ejec.tipo.tipo == enf.tipo.tipo){
                    let simbolo:Simbolo;
                    simbolo = new Simbolo(ejec.tipo, enf.identificador, result, false);
                    const res = nuevoEntorno.setVariable(simbolo);
                    if (res != null) {
                        const error = new Error("Semantico", res, this.fila, this.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        return error;
                    }
                }
            }
        }

        for(let i = 0; i < funcion.sentencias.length; i++){
            let m = funcion.sentencias[i];
            let result = m.ejecutar(nuevoEntorno, ast);
            if (result instanceof Error) {
                return result;
            }else if(result instanceof Return || m instanceof Return){
                if(m instanceof Return){
                    result = m;
                }
                if(funcion.tipo.tipo == Tipos.VOID){
                    if(result != null){
                        const error = new Error("Semantico", "Error en return, no puede dovolver valor ", this.fila, this.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        return error;
                    }else{
                        this.tipo = funcion.tipo;
                        return null;
                    }
                }else if(result.tipo.tipo == funcion.tipo.tipo){
                    this.tipo = result.tipo;
                    if(result != null){
                        return result.dato;
                    }
                }
            }
        }

        if(funcion.tipo.tipo != Tipos.VOID){
            const error = new Error("Semantico", "Error, debe haber un return que devuelva un valor", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }

        return null;
    }
}