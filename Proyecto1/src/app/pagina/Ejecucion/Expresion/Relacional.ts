import { NodoAST } from "../AST/NodoAST";
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";

/**
 * @class Genera un nuevo nodo expresion para realizar operaciones relacionales
 */

export class Relacional extends NodoAST {
    izquierdo:NodoAST;
    derecho:NodoAST;
    operador:string;

    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param izquierdo Nodo expresion izquierdo
     * @param derecho Nodo expresion derecho
     * @param operador Operador
     * @param fila filaa de la operacion
     * @param columna columnaa de la operacion
     */

    constructor(izquierdo:NodoAST, derecho:NodoAST, operador:string, fila:number, columna:number) {
        super(new Tipo(Tipos.BOOLEAN), fila, columna);
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.operador = operador;
    }

    ejecutar(tabla:Tabla, ast:AST) {
        const LeftResult = this.izquierdo.ejecutar(tabla, ast);
        if (LeftResult instanceof Error) {
            return LeftResult;
        }

        /*if(this.derecho == null){
            if(this.operador == '!'){
                if (this.izquierdo.tipo.tipo == Tipos.BOOLEAN) {
                    return !LeftResult;
                }else {
                    const error = new Error("Semantico", "Error de tipo en NEGACION se esta tratando de operar " + this.izquierdo.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }
        }else{*/
            const RightResult = this.derecho.ejecutar(tabla, ast);
            if (RightResult instanceof Error) {
                return RightResult;
            }

            if (this.operador == '<') {
                if (this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER) {
                    return LeftResult < RightResult;
                } else {
                    const error = new Error("Semantico", "Error de tipos en MENOR QUE se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(),this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            } else if (this.operador == '>') {
                if (this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER) {
                    return LeftResult > RightResult;
                } else {
                    const error = new Error("Semantico", "Error de tipos en MAYOR QUE se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            } else if (this.operador == '>=') {
                if (this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER) {
                    return LeftResult >= RightResult;
                } else {
                    const error = new Error("Semantico", "Error de tipos en MAYOR IGUAL se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            } else if (this.operador == '<=') {
                if (this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER) {
                    return LeftResult <= RightResult;
                } else {
                    const error = new Error("Semantico", "Error de tipos en MENOR IGUAL se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            } else if (this.operador == '!=') {
                if (this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER) {
                    return LeftResult != RightResult;
                } else if (this.izquierdo.tipo.tipo == Tipos.STRING && this.derecho.tipo.tipo == Tipos.STRING) {
                    return LeftResult != RightResult;
                }else if(this.izquierdo.tipo.tipo == Tipos.BOOLEAN && this.derecho.tipo.tipo == Tipos.BOOLEAN) {
                    return LeftResult != RightResult;
                } else {
                    const error = new Error("Semantico", "Error de tipos en DIFERENTE QUE se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            } else if (this.operador == '==') {
                if (this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER) {
                    return LeftResult == RightResult;
                }else if(this.izquierdo.tipo.tipo == Tipos.STRING && this.derecho.tipo.tipo == Tipos.STRING) {
                    return LeftResult == RightResult;
                }else if(this.izquierdo.tipo.tipo == Tipos.BOOLEAN && this.derecho.tipo.tipo == Tipos.BOOLEAN) {
                    return LeftResult == RightResult;
                } else {
                    const error = new Error("Semantico", "Error de tipos en IGUAL IGUAL se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }else{
                const error = new Error("Semantico", "Error operador desconocido", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }

        /*}*/
    }
}