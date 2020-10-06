import { NodoAST } from "../AST/NodoAST";
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
import { Return } from './Return';

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
        if(this.derecho != null){
            const operacionIzq = this.izquierdo.ejecutar(tabla, ast);
            if(operacionIzq instanceof Error){
                return operacionIzq;
            }
            const operacionDer = this.derecho.ejecutar(tabla, ast);
            if(operacionDer instanceof Error){
                return operacionDer;
            }

            if(this.operacion == '+'){
                if(this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER){
                    this.tipo = new Tipo(Tipos.NUMBER);
                    return operacionIzq + operacionDer;
                }else if(this.izquierdo.tipo.tipo == Tipos.STRING || this.derecho.tipo.tipo == Tipos.STRING){
                    this.tipo = new Tipo(Tipos.STRING);
                    return operacionIzq + operacionDer;
                }else{
                    const error = new Error("Semantico", "Error de Tipos -> se esta tratando de sumar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }else if(this.operacion == '-'){
                if (this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER){
                    this.tipo = new Tipo(Tipos.NUMBER);
                    return operacionIzq - operacionDer;
                }else{
                    const error = new Error("Semantico", "Error de Tipos -> se esta tratando de restar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }else if(this.operacion == '*'){
                if(this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER){
                    this.tipo = new Tipo(Tipos.NUMBER);
                    return operacionIzq * operacionDer;
                }else{
                    const error = new Error("Semantico","Error de Tipos -> se esta tratando de multiplicar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }else if(this.operacion == '/'){
                if(this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER){
                    this.tipo = new Tipo(Tipos.NUMBER);
                    if(operacionDer == 0){
                        const error = new Error("Semantico", "Error aritmetico -> se esta tratando de dividir entre cero ", this.fila, this.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        return error;
                    }
                    return operacionIzq / operacionDer;
                }else{
                    const error = new Error("Semantico", "Error de Tipos -> se esta tratando de dividir " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }else if(this.operacion == '^'){
                if(this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER){
                    this.tipo = new Tipo(Tipos.NUMBER);
                    return operacionIzq ** operacionDer;
                    //return operacionIzq ^ operacionDer;
                }else{
                    const error = new Error("Semantico","Error de Tipos -> se esta tratando de elevar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }else if(this.operacion == '%'){
                if(this.izquierdo.tipo.tipo == Tipos.NUMBER && this.derecho.tipo.tipo == Tipos.NUMBER){
                    this.tipo = new Tipo(Tipos.NUMBER);
                    return operacionIzq % operacionDer;
                }else{
                    const error = new Error("Semantico","Error de Tipos -> se esta tratando de obtener el modulo " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }else{
                const error = new Error("Semantico", "Error, Operador desconocido", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }

        }else{
            const operacionIzq = this.izquierdo.ejecutar(tabla, ast);
            if(operacionIzq instanceof Error){
                return operacionIzq;
            }

            if(this.operacion == '-'){
                if (this.izquierdo.tipo.tipo == Tipos.NUMBER){
                    this.tipo = new Tipo(Tipos.NUMBER);
                    return -1*operacionIzq;
                }else{
                    const error = new Error("Semantico", "Error de Tipos -> el operador unario tratando de operar " + this.izquierdo.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }else{
                const error = new Error("Semantico", "Error -> Operador desconocido", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
        }
    }

    traducir(tab:string, ast:AST) {
        if(this.derecho != null){
            const operacionIzq = this.izquierdo.traducir(tab, ast);
            
            const operacionDer = this.derecho.traducir(tab, ast);

            if(this.operacion == '+'){
                return operacionIzq + "+" + operacionDer;

            }else if(this.operacion == '-'){
                return operacionIzq + "-" + operacionDer;

            }else if(this.operacion == '*'){
                    return operacionIzq + "*" + operacionDer;

            }else if(this.operacion == '/'){
                    return operacionIzq + "/" + operacionDer;

            }else if(this.operacion == '^'){
                    return operacionIzq + "**" + operacionDer;
                    
            }else if(this.operacion == '%'){
                return operacionIzq + "%" + operacionDer;
                    
            }

        }else{
            const operacionIzq = this.izquierdo.traducir(tab, ast);
            
            if(this.operacion == '-'){
                return "-" + operacionIzq;
            }
        }
    }
}