import { NodoAST } from "../AST/NodoAST"
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
import { Continue } from "../Expresion/Continue";
import { Break } from "../Expresion/Break";
import { Return } from "../Expresion/Return";
import { UsoFuncion } from './UsoFuncion';
import { Declaracion } from './Declaracion';
import { Asignacion } from './Asignacion';

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */

export class While extends NodoAST {
    condicion:NodoAST;
    sentencias:NodoAST[];

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(condicion:NodoAST, sentencias:NodoAST[], fila:number, columna:number){
        super(null, fila, columna);
        this.condicion = condicion;
        this.sentencias = sentencias;
    }

    ejecutar(tabla:Tabla, ast:AST){
        let enciclado = 0;

        for (let index = 0; index <= 10000; index++){
            const nuevoEntorno = new Tabla(tabla);
            let result:NodoAST;
            result = this.condicion.ejecutar(nuevoEntorno, ast);
            if (result instanceof Error) {
                return result;
            }

            if (this.condicion.tipo.tipo != Tipos.BOOLEAN) {
                const error = new Error("Semantico", "Se esperaba una expresion booleana para la condicion", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }

            if (result) {
                for(let i = 0; i < this.sentencias.length; i++){
                    let m = this.sentencias[i];
                    const res = m.ejecutar(nuevoEntorno, ast);
                    if(res instanceof Continue || res instanceof Break || res instanceof Error || res instanceof Return){
                        index = 10000;
                        return res;
                    }
                    if(m instanceof Return){
                        return m;
                    }
                }
                
            }else{
                break;
            }

            enciclado = index;
        }

        if(enciclado == 10000){
            const error = new Error("Semantico", "Se ha enciclado la sentencia While", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }else{
            return null;
        }
    }

    traducir(tab:string, ast:AST){
        let cadena = tab + "while(";

        cadena += this.condicion.traducir(tab, ast);
        cadena += "){\n";

        for(let i = 0; i < this.sentencias.length; i++){
            let m = this.sentencias[i];
            if(m instanceof Declaracion || m instanceof Asignacion || m instanceof UsoFuncion){
                cadena += tab + "  ";
            }
            cadena += m.traducir(tab+"  ", ast);
            if(m instanceof Declaracion || m instanceof Asignacion || m instanceof UsoFuncion){
                cadena += ";\n";
            }
        }

        cadena += tab + "}\n"

        return cadena;
    }
}