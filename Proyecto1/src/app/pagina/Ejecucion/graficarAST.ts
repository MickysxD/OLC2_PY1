//Carpeta AST
import { AST } from "./AST/AST";
import { Error } from "./AST/Error";
import { NodoAST } from "./AST/NodoAST";
import { Simbolo } from "./AST/Simbolo";
import { Tabla } from "./AST/Tabla";
import { Tipo,Tipos } from "./AST/Tipo";

//Carpeta Expresion
import { Aritmetica } from "./Expresion/Aritmetica";
import { Primitivo } from "./Expresion/Primitivo";
import { Logica } from "./Expresion/Logica";
import { Relacional } from "./Expresion/Relacional";
import { Identificador } from "./Expresion/Identificador";
import { Continue } from "./Expresion/Continue";
import { Break } from "./Expresion/Break";
import { Return } from "./Expresion/Return";

//Carpeta Instruccion
import { ConsoleLog } from "./Instruccion/ConsoleLog";
import { Declaracion } from './Instruccion/Declaracion';
import { Asignacion } from './Instruccion/Asignacion';
import { If } from './Instruccion/If';
import { While } from './Instruccion/While';
import { DoWhile } from './Instruccion/DoWhile';
import { For } from './Instruccion/For';
import { Switch } from './Instruccion/Switch';
import { Case } from './Instruccion/Case';
import { Ternario } from './Instruccion/Ternario';
import { Funcion } from './Instruccion/Funcion';
import { UsoFuncion } from './Instruccion/UsoFuncion';
import { graficar_ts } from './Instruccion/graficar_ts';



import { relative } from 'path';
import { ParsedEvent } from '@angular/compiler';

export class graficarAST{
    ast:AST;
    nodo:Nodo;
    root:Nodo;

    constructor(ast:AST){
        this.ast = ast;
        this.root = new Nodo("Root", null, []);
        let lista = new Nodo("Lista de instrucciones", this.root, []);
        for(let i = 0; i < ast.instrucciones.length; i++){
          if(!(ast.instrucciones[i] instanceof Error)){
            lista.children.push(this.instruccion(ast.instrucciones[i]));
          }
        }
        this.root.children.push(lista);
        this.root.children.push(new Nodo("#", this.root, []));
    }

    instruccion(m:NodoAST):Nodo{
      let padre = new Nodo("Instruccion", null, []);

      if(m instanceof Declaracion){
        padre.children.push(this.declaracion(m));

      }else if(m instanceof Asignacion){
        padre.children.push(this.asignacion(m));

      }else if(m instanceof ConsoleLog){
        padre.children.push(this.consolelog(m));
        
      }else  if(m instanceof DoWhile){
        padre.children.push(this.dowhile(m));
        
      }else if(m instanceof For){
        padre.children.push(this.for(m));
        
      }else  if(m instanceof If){
        this.if(m, padre);
        
      }else if(m instanceof Switch){
        padre.children.push(this.switch(m));
        
      }else if(m instanceof While){
        padre.children.push(this.while(m));
        
      }else if(m instanceof Break){
        padre.children.push(this.break(m));

      }else if(m instanceof Continue){
        padre.children.push(this.continue(m));

      }else if(m instanceof Return){
        padre.children.push(this.valor(m));

      }else if(m instanceof Funcion){
        padre.children.push(this.funcion(m));
        
      }else if(m instanceof UsoFuncion){
        padre.children.push(this.usofuncion(m));
        
      }else if(m instanceof graficar_ts){
        padre.children.push(this.graficar_ts(m));
        
      }
  
      return padre;
    }

    graficar_ts(m:graficar_ts){
      let padre = new Nodo("graficar_ts", null, []);
      return padre;
    }
    
    usofuncion(m:UsoFuncion){
      let padre = new Nodo("Uso de funcion", null, []);
      
      padre.children.push(new Nodo("Identificador", null, [new Nodo(m.identificador, null, [])]));
      
      let lista = new Nodo("Lista de parametros", padre, []);
      m.parametros.map((p) => {
        let parametro = new Nodo("Parametro", padre, []);
        parametro.children.push(this.valor(p));
        lista.children.push(parametro);
      });
      padre.children.push(lista);

      return padre;
    }

    funcion(m:Funcion){
      let padre = new Nodo("Funcion "+m.identificador, null, []);
      
      let lm = new Nodo("Lista de parametros", padre, []);

      m.parametros.map((p) => {
        let lista = new Nodo("Parametro", padre, []);
        lista.children.push(this.valor(p));
        lista.children.push(new Nodo("Tipo", padre, [new Nodo(p.tipo.toString(), padre, [])]));
        lm.children.push(lista);
      });
      padre.children.push(lm);

      if(m.tipo != null){
        padre.children.push(new Nodo("Tipo", padre, [new Nodo(m.tipo.toString(), null, [])]));
      }

      let listas = new Nodo("Lista de instrucciones", padre, []);
      m.sentencias.map((p) => {
        listas.children.push(this.instruccion(p));
      });
      padre.children.push(listas);
      
      return padre;
    }

    ternario(m:Ternario){
      let padre = new Nodo("Ternario", null, []);
      
      let w = new Nodo("Condicion", null, []);
      w.children.push(this.valor(m.condicion));
      padre.children.push(w);

      let w1 = new Nodo("Eleccion 1", null, []);
      w1.children.push(this.valor(m.primero));
      padre.children.push(w1);

      let w2 = new Nodo("Eleccion 2", null, []);
      w2.children.push(this.valor(m.segundo));
      padre.children.push(w2);
      
      return padre;
    }

    while(m:While){
      let padre = new Nodo("While", null, []);
      
      let w = new Nodo("Condicion", null, []);
      w.children.push(this.valor(m.condicion));
      padre.children.push(w);

      let lista = new Nodo("Lista de instrucciones", padre, []);
      m.sentencias.map((p) => {
        lista.children.push(this.instruccion(p));
      });
      padre.children.push(lista);
      
      return padre;
    }

    switch(m:Switch){
      let padre = new Nodo("Switch", null, []);

      let c = new Nodo("Condicion", padre, []);
      c.children.push(this.valor(m.condicion));
      padre.children.push(c);

      let listacases = new Nodo("Lista cases", padre, []);
      m.cases.map((p:Case) => {
        let i:Nodo = null;
        if(p.esDefault){
          i = new Nodo("Default", listacases, []);
        }else{
          i = new Nodo("Case", listacases, []);
          
          let con = new Nodo("Condicion", i, []);
          con.children.push(this.valor(p.condicion));
          i.children.push(con);
        }

        let listains = new Nodo("Lista de instrucciones", i, []);
        p.sentencias.map((t) => {
          listains.children.push(this.instruccion(t));
        });
        i.children.push(listains);

        listacases.children.push(i);
      });
      padre.children.push(listacases);
      
      return padre;
    }

    if(m:If, padre:Nodo){
      let ifp = new Nodo("If", null, []);
      padre.children.push(ifp);

      let condicion = new Nodo("Condicion", ifp, []);
      condicion.children.push(this.valor(m.condicion));
      ifp.children.push(condicion);

      let lista = new Nodo("Lista de instrucciones", ifp, []);
      m.sentenciasIF.map((p) => {
        lista.children.push(this.instruccion(p));
      });
      ifp.children.push(lista);

      let elseiflista = new Nodo("Lista else if", ifp, []);
      m.listaIFS.map((p:If) => {
        let elseif = new Nodo("Else if", elseiflista, []);
        
        let cef = new Nodo("Condicion", elseif, []);
        cef.children.push(this.valor(m.condicion));
        elseif.children.push(cef);

        let listaef = new Nodo("Lista de instrucciones", elseif, []);
        p.sentenciasIF.map((t) => {
          listaef.children.push(this.instruccion(t));
        });
        elseif.children.push(listaef);

        elseiflista.children.push(elseif);
      });
      padre.children.push(elseiflista);

      let elselista = new Nodo("Else", ifp, []);
      m.sentenciasELSE.map((p) => {
        elselista.children.push(this.instruccion(p));
      });
      padre.children.push(elselista);
      
    }

    for(m:For){
      let padre = new Nodo("For", null, []);

      let c = new Nodo("Control", padre, []);
      c.children.push(this.instruccion(m.comienzo));
      padre.children.push(c);

      let d = new Nodo("Condicion", padre, []);
      d.children.push(this.valor(m.condicion));
      padre.children.push(d);

      let i = new Nodo("Iterador", padre, []);
      i.children.push(this.instruccion(m.iterador));
      padre.children.push(i);

      let lista = new Nodo("Lista de instrucciones", padre, []);
      m.sentencias.map((p) => {
        lista.children.push(this.instruccion(p));
      });
      padre.children.push(lista);
      
      return padre;
    }

    dowhile(m:DoWhile){
      let padre = new Nodo("Do While", null, []);
      let lista = new Nodo("Lista de instrucciones", padre, []);
      m.sentencias.map((p) => {
        lista.children.push(this.instruccion(p));
      });
      padre.children.push(lista);
      
      let w = new Nodo("Condicion", null, []);
      w.children.push(this.valor(m.condicion));
      padre.children.push(w);
      return padre;
    }

    consolelog(m:ConsoleLog){
      let padre = new Nodo("console.log", null, []);
      padre.children.push(this.valor(m.expresion));
      return padre;
    }
    
    asignacion(m:Asignacion){
      let padre = new Nodo("Asignacion", null, []);
      let lista = new Nodo("Lista de asignaciones", null, []);
      m.asignaciones.map((p:Identificador) => {
        let a = new Nodo("asignaciones", null, []);
        a.children.push(this.identificador(p));
        if(p.valor != null){
          let op = new Nodo("Operador", padre, [new Nodo("=", null, [])]);
          a.children.push(op);
          a.children.push(this.valor(p.valor));
        }
        lista.children.push(a);
      });
      padre.children.push(lista);
      return padre;
    }
  
    declaracion(m:Declaracion){
      let padre = new Nodo("Declaracion", null, []);
      padre.children.push(new Nodo(m.getConstante(), padre, []));
      let lista = new Nodo("Lista de declaraciones", null, []);
      m.declaraciones.map((p:Identificador) => {
        let d = new Nodo("declaracion", null, []);
        d.children.push(this.identificador(p));
        if(p.tipo != null){
          d.children.push(new Nodo("Tipo", padre, [new Nodo(p.tipo.toString(), null, [])]));
        }
        if(p.valor != null){
          let op = new Nodo("Operador", padre, [new Nodo("=", null, [])]);
          d.children.push(op);
          d.children.push(this.valor(p.valor));
        }
        lista.children.push(d);
      });
      padre.children.push(lista);
      return padre;
    }

    identificador(m:Identificador){
      let padre = new Nodo("Identificador", null, []);
      padre.children.push(new Nodo(m.identificador, padre, []));
      return padre;
    }

    break(m:Break){
      let padre = new Nodo("Break", null, []);
      return padre;
    }

    continue(m:Continue){
      let padre = new Nodo("Continue", null, []);
      return padre;
    }

    return(m:Return){
      let padre = new Nodo("Return", null, []);
      if(m.valor != null){
        padre.children.push(this.valor(m.valor));
      }
      return padre;
    }

    valor(m:NodoAST){
      if(m instanceof Aritmetica){
        return this.aritmetico(m);

      }else if(m instanceof Logica){
        return this.logica(m);

      }else if(m instanceof Relacional){
        return this.relacional(m);

      }else if(m instanceof Primitivo){
        return this.primitivo(m);

      }if(m instanceof Identificador){
        return this.identificador(m);

      }if(m instanceof Ternario){
        return this.ternario(m); 

      }

      return new Nodo("ERROR", null, []);
    }

    primitivo(m:Primitivo){
      let padre = new Nodo("Primitivo", null, []);
      padre.children.push(new Nodo(m.valor+"", padre, []));
      return padre;
    }

    aritmetico(m:Aritmetica){
      let padre = new Nodo("Aritmetica", null, []);
      let op = new Nodo("Operador", padre, [new Nodo(m.operacion, null, [])]);
      if(m.derecho != null){
        padre.children.push(this.valor(m.izquierdo));
        padre.children.push(op);
        padre.children.push(this.valor(m.derecho));
      }else{
        padre.children.push(op);
        padre.children.push(this.valor(m.izquierdo));
      }
      return padre;
    }

    logica(m:Logica){
      let padre = new Nodo("Logica", null, []);
      let op = new Nodo("Operador", padre, [new Nodo(m.operador, null, [])]);
      if(m.derecho != null){
        padre.children.push(this.valor(m.izquierdo));
        padre.children.push(op);
        padre.children.push(this.valor(m.derecho));
      }else{
        padre.children.push(op);
        padre.children.push(this.valor(m.izquierdo));
      }
      return padre;
    }

    relacional(m:Relacional){
      let padre = new Nodo("Relacional", null, []);
      let op = new Nodo("Operador", padre, [new Nodo(m.operador, null, [])]);
      if(m.derecho != null){
        padre.children.push(this.valor(m.izquierdo));
        padre.children.push(op);
        padre.children.push(this.valor(m.derecho));
      }else{
        padre.children.push(op);
        padre.children.push(this.valor(m.izquierdo));
      }
      return padre;
    }
}

export class Nodo{
    name:String;
    parent:Nodo;
    children:Nodo[];
  
    constructor(name:string, parent:Nodo, children:Nodo[]){
      this.name = name;
      this.parent = parent;
      this.children = children;
    }
}