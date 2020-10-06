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
        let retorno = null;
        this.asignaciones.map((m:Identificador) =>{
            const result = m.valor.ejecutar(tabla, ast);
            if (result instanceof Error) {
                retorno = result;
                return result;
            }

            let variable:Simbolo;
            variable = tabla.getVariable(m.identificador);
            if (variable == null) {
                const error = new Error("Semantico","No se ha encontrado la variable " + m.identificador, m.fila, m.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                retorno = error;
                return error;
            }else if(variable.constante == true){
                const error = new Error("Semantico","No se puede asignar un nuevo valor a la constante " + m.identificador, m.fila, m.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                retorno = error;
                return error;
            }

            if(variable.tipo == null){
                variable.tipo = m.valor.tipo;
            }else if (m.valor.tipo.tipo != variable.tipo.tipo) {
                const error = new Error("Semantico","No se puede asignar la variable porque los tipos no coinciden", m.fila, m.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                retorno = error;
                return error;
            }

            variable.valor = result;
            return retorno;
            
        });
        
        return retorno;
    }

    traducir(tab:string, ast:AST) {
        let bandera = true;
        let cadena = "";
        this.asignaciones.map((m:Identificador) =>{
            if(bandera){
                cadena += m.traducir(tab, ast);
                bandera = false;
            }else{
                cadena += ", " + m.traducir(tab, ast);
            }
            
        });

        return cadena;
    }
}