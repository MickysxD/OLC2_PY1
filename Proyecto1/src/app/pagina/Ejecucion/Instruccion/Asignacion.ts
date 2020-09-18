import { NodoAST } from "../AST/NodoAST"
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
import { Simbolo } from "../AST/Simbolo";
import { Identificador } from '../Expresion/Identificador';

/**
 * @class Reasigna el valor de una variable existente
 */

export class Asignacion extends NodoAST {
    asignaciones:NodoAST[];

    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identificador nombre de la variable
     * @param valor valor de la variable
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(asignaciones:NodoAST[], fila:number, columna:number) {
        super(null, fila, columna);
        this.asignaciones = asignaciones;
    }

    ejecutar(tabla:Tabla, ast:AST) {
        this.asignaciones.map((m) =>{
            if(m instanceof Identificador){
                const result = m.valor.ejecutar(tabla, ast);
                if (result instanceof Error) {
                    return result;
                }

                let variable:Simbolo;
                variable = tabla.getVariable(m.identificador);
                if (variable == null) {
                    const error = new Error("Semantico","No se ha encontrado la variable " + m.identificador, m.fila, m.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }else if(variable.constante == true){
                    const error = new Error("Semantico","No se puede asignar un nuevo valor a la constante " + m.identificador, m.fila, m.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }

                if(variable.tipo == null){
                    variable.tipo = m.valor.tipo;
                }else if (m.valor.tipo.tipo != variable.tipo.tipo) {
                    const error = new Error("Semantico","No se puede asignar la variable porque los tipos no coinciden", m.fila, m.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }

                variable.valor = result;
                return null;

            }
        });
/*
        const result = this.valor.ejecutar(tabla, ast);
        if (result instanceof Error) {
            return result;
        }

        let variable:Simbolo;
        variable = tabla.getVariable(this.identificador);
        if (variable == null) {
            const error = new Error('Semantico',
                'No se ha encontrado la variable ' + this.identificador,
                this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }


        if (this.valor.tipo.tipo != variable.tipo.tipo) {
            const error = new Error('Semantico',
                `No se puede asignar la variable porque los tipos no coinciden.`,
                this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }

        variable.valor = result;
        return error;*/
    }
}