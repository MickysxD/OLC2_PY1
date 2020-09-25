import { NodoAST } from "../AST/NodoAST"
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
import { Continue } from "../Expresion/Continue";
import { Break } from "../Expresion/Break";
import { Case } from "./Case";
import { Return } from "../Expresion/Return";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */

export class Switch extends NodoAST {
    condicion:NodoAST;
    cases:NodoAST[];

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(condicion:NodoAST, cases:NodoAST[], fila:number, columna:number){
        super(null, fila, columna);
        this.condicion = condicion;
        this.cases = cases;
    }

    ejecutar(tabla:Tabla, ast:AST){
        const nuevoEntorno = new Tabla(tabla);
        let result:NodoAST;
        result = this.condicion.ejecutar(nuevoEntorno, ast);
        if (result instanceof Error) {
            return result;
        }

        if (this.condicion.tipo.tipo != Tipos.NUMBER && this.condicion.tipo.tipo != Tipos.STRING) {
            const error = new Error("Semantico", "Se esperaba una expresion booleana para la condicion", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }

        for(let i = 0; i < this.cases.length; i++){
            let m = this.cases[i];
            if(m instanceof Case && m.esDefault != true){
                let resultC:NodoAST;
                resultC = m.condicion.ejecutar(nuevoEntorno, ast);
                if (resultC instanceof Error) {
                    return resultC;
                }

                if (this.condicion.tipo.tipo != m.condicion.tipo.tipo) {
                    const error = new Error("Semantico", "Los tipos no coinciden sentencia Switch", this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }

                if(resultC == result){
                    const res = m.ejecutar(nuevoEntorno, ast);
                    
                    if(res instanceof Break){
                        return null;
                    }
                    if(res instanceof Continue || res instanceof Error || res instanceof Return){
                        return res;
                    }
                    
                    if(m instanceof Return){
                        return m;
                    }
                }
            }
        }

        for(let i = 0; i < this.cases.length; i++){
            let m = this.cases[i];
            if(m instanceof Case && m.esDefault == true){
                const res = m.ejecutar(nuevoEntorno, ast);
                if(res instanceof Continue || res instanceof Break || res instanceof Error || res instanceof Return){
                    return res;
                }
                if(m instanceof Return){
                    return m;
                }
            }
        }

        return null;
        
    }
}