import { NodoAST } from "../AST/NodoAST";
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";

/**
 * @class Genera un nuevo nodo expresion para realizar operaciones logicas
 */

 export class Logica extends NodoAST {
    izquierdo:NodoAST;
    derecho:NodoAST;
    operador: string;

    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param izquierdo Nodo expresion izquierdo
     * @param derecho Nodo expresion derecho
     * @param operador Operador
     * @param fila filaa de la operacion
     * @param columna columnaa de la operacion
     */
    constructor(izquierdo: NodoAST, derecho: NodoAST, operador: string, fila: number, columna: number) {
        super(new Tipo(Tipos.BOOLEAN), fila, columna);
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.operador = operador;
    }

    ejecutar(tabla: Tabla, ast: AST) {
        if (this.derecho != null) {
            const LeftResult = this.izquierdo.ejecutar(tabla, ast);
            if (LeftResult instanceof Error) {
                return LeftResult;
            }

            const RightResult = this.derecho.ejecutar(tabla, ast);
            if (RightResult instanceof Error) {
                return RightResult;
            }

            if (this.operador == '||') {
                if (this.izquierdo.tipo.tipo == Tipos.BOOLEAN && this.derecho.tipo.tipo == Tipos.BOOLEAN) {
                    return LeftResult || RightResult;
                } else {
                    const error = new Error("Semantico", "Error de tipos en OR se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.tostring());
                    return error;
                }
            } else if (this.operador == '&&') {
                if (this.izquierdo.tipo.tipo == Tipos.BOOLEAN && this.derecho.tipo.tipo == Tipos.BOOLEAN) {
                    return LeftResult && RightResult;
                } else {
                    const error = new Error("Semantico", "Error de tipos en AND se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.tostring());
                    return error;
                }
            } else {
                const error = new Error("Semantico", "Error, Operador desconocido", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.tostring());
                return error;
            }

        } else {
            const LeftResult = this.izquierdo.ejecutar(tabla, ast);
            if (LeftResult instanceof Error) {
                return LeftResult;
            }

            if (this.operador == '!') {
                if (this.izquierdo.tipo.tipo == Tipos.BOOLEAN) {
                    return !LeftResult;
                } else {
                    const error = new Error("Semantico", "Error de tipos en el operador NOT se esta tratando de operar" + this.izquierdo.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.tostring());
                    return error;
                }
            } else {
                const error = new Error("Semantico", "Error, Operador desconocido", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.tostring());
                return error;
            }
            
        }
    }
}