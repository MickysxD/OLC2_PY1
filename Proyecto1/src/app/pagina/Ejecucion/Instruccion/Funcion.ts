import { NodoAST } from "../AST/NodoAST"
import { Tabla } from "../AST/Tabla";
import { AST } from "../AST/AST";
import { Error } from "../AST/Error";
import { Tipo,Tipos } from "../AST/Tipo";
import { Continue } from "../Expresion/Continue";
import { Break } from "../Expresion/Break";
import { Simbolo } from '../AST/Simbolo';
import { Identificador } from '../Expresion/Identificador';
import { UsoFuncion } from './UsoFuncion';
import { Declaracion } from './Declaracion';
import { Asignacion } from './Asignacion';

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
*/

export class Funcion extends NodoAST {
    identificador:string;
    real:string;
    parametros:NodoAST[];
    tipo:Tipo;
    sentencias:NodoAST[];

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(identificador:string, parametros:NodoAST[], tipo:Tipo, sentencias:NodoAST[], fila:number, columna:number){
        super(tipo, fila, columna);
        this.identificador = identificador;
        this.real = identificador;
        this.parametros = parametros;
        this.sentencias = sentencias;
    }

    ejecutar(tabla:Tabla, ast:AST){
        let nombre = "function_"+this.identificador;
/*
        this.parametros.map((m:Identificador) =>{
            nombre += "_" + m.tipo.tipo;
        });
*/
        for(let i = 0; i < this.parametros.length; i++){
            let m = this.parametros[i];
            nombre += '_' + m.tipo.tipo;
        }

        let simbolo:Simbolo;
        simbolo = new Simbolo(this.tipo, nombre, this, false);
        const res = tabla.setVariable(simbolo);
        if (res != null){
            const error = new Error("Semantico", res, this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }

        return null;
    }

    traducir(tab:string, ast:AST){
        for(let i = 0; i < this.sentencias.length; i++){
            let m = this.sentencias[i];
            if(m instanceof Funcion){
                m.identificador = this.identificador + "_" + m.identificador;
                ast.instrucciones.push(m);
                this.sentencias.splice(i, 1);
                i--;
            }
        }

        let cadena = tab + "function "+this.identificador+"(";
        let bandera = true;

        for(let i = 0; i < this.parametros.length; i++){
            let m = this.parametros[i];
            const result = m.traducir(tab, ast) + ":" + m.tipo.toString();
            if(bandera){
                cadena += result;
            }else{
                cadena += ", " + result;
            }
        }

        cadena += ")"

        if(this.tipo != null && this.tipo.tipo != Tipos.VOID){
            cadena += ":"+this.tipo.toString();
        }
        cadena += "{\n"

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

        cadena += tab + "}\n\n";

        return cadena;
    }
}