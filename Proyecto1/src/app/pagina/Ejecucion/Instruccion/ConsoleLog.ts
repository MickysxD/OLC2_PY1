import { NodoAST } from "../AST/NodoAST";
import  {Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";

/**
 * Permite imprimir expresiones en la consola
 */

export class ConsoleLog extends NodoAST{
    expresion:NodoAST;

    /**
     * @constructor Retorna el objeto Print
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */

    constructor(expresion:NodoAST, fila:number, columna:number){
        super(new Tipo(Tipos.VOID), fila, columna);
        this.expresion = expresion;
    }

    ejecutar(tabla:Tabla, ast:AST){
        const value = this.expresion.ejecutar(tabla, ast);
        
        if(!(value instanceof Error) && value != null){    
            ast.consola.push(value);
        }
        return null;
    }

    traducir(tab:string, ast:AST){
        const value = this.expresion.traducir(tab, ast);
        
        return tab + "console.log(" + value + ");\n";
    }
}