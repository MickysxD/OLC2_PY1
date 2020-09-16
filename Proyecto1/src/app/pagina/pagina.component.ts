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

//Carpeta Instruccion
import { ConsoleLog } from "./Ejecucion/Instruccion/ConsoleLog";

//Analizador
var parser  = require("./Ejecucion/gramatica.js");

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //aqui va todo el codigo xd
  exec(){
    var entrada = (document.getElementById("txtEntrada") as HTMLInputElement).value;
    
    let ast:AST = parser.parse(entrada);
    let tabla:Tabla= new Tabla(null);
    
    ast.instrucciones.map((m) =>{
      if(m instanceof ConsoleLog){
        m.ejecutar(tabla, ast);
      }
    });
    
    let a:string = "";
    //console.log(2+2);
    ast.consola.map((m:any) =>{
      a += m+"\n";
    });

    var json = JSON.stringify(ast,null,3);
    console.log(json);
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

