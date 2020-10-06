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

export class If extends NodoAST {
    condicion:NodoAST;
    sentenciasIF:NodoAST[];
    listaIFS:NodoAST[];
    sentenciasELSE:NodoAST[];
    entro:boolean;


    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */

    constructor(condicion:NodoAST, sentenciasIF:NodoAST[], listaIFS:NodoAST[], sentenciasELSE:NodoAST[], fila:number, columna:number){
        super(null, fila, columna);
        this.condicion = condicion;
        this.sentenciasIF = sentenciasIF;
        this.listaIFS = listaIFS;
        this.sentenciasELSE = sentenciasELSE;
        this.entro = false;
    }

    ejecutar(tabla:Tabla, ast:AST){
        this.entro = false;
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
            for(let i = 0; i < this.sentenciasIF.length; i++){
                let m = this.sentenciasIF[i];
                const res = m.ejecutar(nuevoEntorno, ast);
                if(res instanceof Continue || res instanceof Break || res instanceof Error || res instanceof Return){
                    return res;
                }
                if(m instanceof Return){
                    return m;
                }
            }
            this.entro = true;
            
        } else {
            for(let i = 0; i < this.listaIFS.length; i++){
                let m = this.listaIFS[i];
                if(m instanceof If){
                    const res = m.ejecutar(nuevoEntorno, ast);
                    if(m.entro){
                        this.entro = true;
                        return res;
                    }
                    if (res instanceof Error || res instanceof Return) {
                        return res;
                    }
                }
            }
            
            if(!this.entro){
                for(let i = 0; i < this.sentenciasELSE.length; i++){
                    let m = this.sentenciasELSE[i];
                    const res = m.ejecutar(nuevoEntorno, ast);
                    if(res instanceof Continue || res instanceof Break || res instanceof Error || res instanceof Return){
                        return res;
                    }
                    if(m instanceof Return){
                        return m;
                    }
                    this.entro = true;
                }
            }
            
        }

        return null;
    }

    traducir(tab:string, ast:AST){
        let cadena = tab + "if(";

        cadena += this.condicion.traducir(tab, ast);

        cadena += "){\n";

        for(let i = 0; i < this.sentenciasIF.length; i++){
            let m = this.sentenciasIF[i];
            if(m instanceof Declaracion || m instanceof Asignacion || m instanceof UsoFuncion){
                cadena += tab + "  ";
            }
            cadena += m.traducir(tab+"  ", ast);
            if(m instanceof Declaracion || m instanceof Asignacion || m instanceof UsoFuncion){
                cadena += ";\n";
            }

        }
        
        cadena += tab + "}"

        for(let i = 0; i < this.listaIFS.length; i++){
            let m = this.listaIFS[i];
            if(m instanceof If){
                cadena += "else if("+m.condicion.traducir(tab, ast);
                cadena += "){\n"
                for(let i = 0; i < m.sentenciasIF.length; i++){
                    let p = m.sentenciasIF[i];
                    if(p instanceof Declaracion || p instanceof Asignacion || p instanceof UsoFuncion){
                        cadena += tab + "  ";
                    }
                    cadena += p.traducir(tab+"  ", ast);
                    if(m instanceof Declaracion || p instanceof Asignacion || p instanceof UsoFuncion){
                        cadena += ";\n";
                    }
                }
                cadena += tab + "}"
                
            }
        }
        
        if(this.sentenciasELSE.length > 0){
            cadena += "else{\n"
            for(let i = 0; i < this.sentenciasELSE.length; i++){
                let m = this.sentenciasELSE[i];
                if(m instanceof Declaracion || m instanceof Asignacion || m instanceof UsoFuncion){
                    cadena += tab + "  ";
                }
                cadena += m.traducir(tab+"  ", ast);
                if(m instanceof Declaracion || m instanceof Asignacion || m instanceof UsoFuncion){
                    cadena += ";\n";
                }
            }
            cadena += tab + "}"
        }
        
        cadena += "\n\n"
        
        return cadena;
    }c
}