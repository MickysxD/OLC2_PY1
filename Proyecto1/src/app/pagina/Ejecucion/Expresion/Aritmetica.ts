import { NodoAST } from "../AST/NodoAST";
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";

/**
 * @class Genera un nuevo nodo expresion para realizar operaciones aritmeticas
 */

export class Aritmetica extends NodoAST {
    izquierdo:NodoAST;
    derecho:NodoAST;
    operacion:string;

    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param izquierdo Nodo expresion izquierdo
     * @param derecho Nodo expresion derecho
     * @param operacion Operador
     * @param fila filaa de la operacion
     * @param columna columnaa de la operacion
     */

    constructor(izquierdo:NodoAST, derecho:NodoAST, operacion:string, fila:number, columna:number) {
        // Envio null porque aun no se el tipo de la operación
        super(null, fila, columna);
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.operacion = operacion;
    }

    ejecutar(tabla:Tabla, ast:AST) {
        if (this.derecho != null) {
            const operacionIzq = this.izquierdo.ejecutar(tabla, ast);
            if (operacionIzq instanceof Error) {
                return operacionIzq;
            }
            const operacionDer = this.derecho.ejecutar(tabla, ast);
            if (operacionDer instanceof Error) {
                return operacionDer;
            }

            if (this.operacion === '+') {
                if (this.izquierdo.tipo.tipo === Tipos.NUMBER && this.derecho.tipo.tipo === Tipos.NUMBER) {
                    this.tipo = new Tipo(Tipos.NUMBER);
                    return operacionIzq + operacionDer;
                } else if (this.izquierdo.tipo.tipo === Tipos.STRING || this.derecho.tipo.tipo === Tipos.STRING) {
                    this.tipo = new Tipo(Tipos.STRING);
                    return operacionIzq + operacionDer;
                } else {
                    const error = new Error('Semantico',
                        `Error de Tipos en la suma se esta tratando de operar ${this.izquierdo.tipo.tipo} y ${this.derecho.tipo.tipo}`,
                        this.fila, this.columna);
                    ast.errores.push(error);
                    ast.consola.push(error.toString());
                    return error;
                }
            } else if (this.operacion === '-') {
                if (this.izquierdo.tipo.tipo === Tipos.NUMBER && this.derecho.tipo.tipo === Tipos.NUMBER) {
                    this.tipo = new Tipo(Tipos.NUMBER);
                    return operacionIzq - operacionDer;
                } else {
                    const error = new Error('Semantico',
                        `Error de Tipos en la resta se esta tratando de operar ${this.izquierdo.tipo.tipo} y ${this.derecho.tipo.tipo}`,
                        this.fila, this.columna);
                    ast.errores.push(error);
                    ast.consola.push(error.toString());
                    return error;
                }
            } else if (this.operacion === '*') {
                if (this.izquierdo.tipo.tipo === Tipos.NUMBER && this.derecho.tipo.tipo === Tipos.NUMBER) {
                    this.tipo = new Tipo(Tipos.NUMBER);
                    return operacionIzq * operacionDer;
                } else {
                    const error = new Error('Semantico',
                        `Error de Tipos en la multiplicacion se esta tratando de operar ${this.izquierdo.tipo.tipo} y ${this.derecho.tipo.tipo}`,
                        this.fila, this.columna);
                    ast.errores.push(error);
                    ast.consola.push(error.toString());
                    return error;
                }
            } else if (this.operacion === '/') {
                if (this.izquierdo.tipo.tipo === Tipos.NUMBER && this.derecho.tipo.tipo === Tipos.NUMBER) {
                    this.tipo = new Tipo(Tipos.NUMBER);
                    if (operacionDer === 0) {
                        const error = new Error('Semantico',
                            `Error aritmetico, La division con cero no esta permitida`,
                            this.fila, this.columna);
                        ast.errores.push(error);
                        ast.consola.push(error.toString());
                        return error;
                    }
                    return operacionIzq / operacionDer;
                } else {
                    const error = new Error('Semantico',
                        `Error de Tipos en la division se esta tratando de operar ${this.izquierdo.tipo.tipo} y ${this.derecho.tipo.tipo}`,
                        this.fila, this.columna);
                    ast.errores.push(error);
                    ast.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Error('Semantico',
                    `Error, Operador desconocido`,
                    this.fila, this.columna);
                ast.errores.push(error);
                ast.consola.push(error.toString());
                return error;
            }
        } else {
            const operacionIzq = this.izquierdo.ejecutar(tabla, ast);
            if (operacionIzq instanceof Error) {
                return operacionIzq;
            }
            if (this.operacion === '-') {
                if (this.izquierdo.tipo.tipo === Tipos.NUMBER) {
                    this.tipo = new Tipo(Tipos.NUMBER);
                    return -1*operacionIzq;
                } else {
                    const error = new Error('Semantico',
                        `Error de Tipos en el operador unario se esta tratando de operar ${this.izquierdo.tipo.tipo}`,
                        this.fila, this.columna);
                    ast.errores.push(error);
                    ast.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Error('Semantico',
                    `Error, Operador desconocido`,
                    this.fila, this.columna);
                ast.errores.push(error);
                ast.consola.push(error.toString());
                return error;
            }
        }
    }
}