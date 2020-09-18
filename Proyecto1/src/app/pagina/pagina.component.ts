import { Component, OnInit } from '@angular/core';

//Carpeta AST
import { AST } from "./Ejecucion/AST/AST";
import { Error } from "./Ejecucion/AST/Error";
import { NodoAST } from "./Ejecucion/AST/NodoAST";
import { Simbolo } from "./Ejecucion/AST/Simbolo";
import { Tabla } from "./Ejecucion/AST/Tabla";
import { Tipo,Tipos } from "./Ejecucion/AST/Tipo";

//Carpeta Expresion
import { Aritmetica } from "./Ejecucion/Expresion/Aritmetica";
import { Primitivo } from "./Ejecucion/Expresion/Primitivo";
import { Logica } from "./Ejecucion/Expresion/Logica";
import { Relacional } from "./Ejecucion/Expresion/Relacional";

//Carpeta Instruccion
import { ConsoleLog } from "./Ejecucion/Instruccion/ConsoleLog";
import { Declaracion } from './Ejecucion/Instruccion/Declaracion';
import { Asignacion } from './Ejecucion/Instruccion/Asignacion';
import { If } from './Ejecucion/Instruccion/If';

//Analizador
var parser  = require("./Ejecucion/gramatica.js");

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  constructor() {
    
  }

  texto(){
    let a = 'const a =10;\nlet b = false;\nif( !b && a != 10 ){\nconsole.log("ah... :v");\n}else if( true || !true){\nconsole.log("que");\n}else{\nconsole.log("rico");\n}';
    document.getElementById('txtEntrada').innerHTML = a;
  }

  ngOnInit(): void {
  }

  //aqui va todo el codigo xd
  exec(){
    this.texto();

    var entrada = (document.getElementById("txtEntrada") as HTMLInputElement).value;
    
    let ast:AST = parser.parse(entrada);
    let tabla:Tabla= new Tabla(null);
    
    ast.instrucciones.map((m) =>{
      if(m instanceof Declaracion){
        m.ejecutar(tabla, ast);
      }
    });

    console.log(tabla);

    ast.instrucciones.map((m) =>{
      if(!(m instanceof Declaracion)){
        m.ejecutar(tabla, ast);
      }
    });

    console.log(ast);

    let a:string = "";
    ast.consola.map((m) =>{
      a += m+"\n";
    });

    ast.errores.map((m) =>{
      console.log(m.toString());
    });

    //var json = JSON.stringify(ast,null,3);
    //console.log(json);
    document.getElementById('txtSalida').innerHTML = a;

    //json = json.split('lexema').join('text').split('lista').join('children').split('lista').join('children');
    /*
    var e = (document.getElementById("txtEntrada") as HTMLInputElement).value;
    console.log("entro");

    console.log(e);
    document.getElementById('txtSalida').innerHTML = e;

    var ast = parser.parse(entrada);
    */
  }

}

