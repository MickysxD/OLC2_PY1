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
import { Identificador } from "./Ejecucion/Expresion/Identificador";
import { Continue } from "./Ejecucion/Expresion/Continue";
import { Break } from "./Ejecucion/Expresion/Break";
import { Return } from "./Ejecucion/Expresion/Return";

//Carpeta Instruccion
import { ConsoleLog } from "./Ejecucion/Instruccion/ConsoleLog";
import { Declaracion } from './Ejecucion/Instruccion/Declaracion';
import { Asignacion } from './Ejecucion/Instruccion/Asignacion';
import { If } from './Ejecucion/Instruccion/If';
import { While } from './Ejecucion/Instruccion/While';
import { DoWhile } from './Ejecucion/Instruccion/DoWhile';
import { For } from './Ejecucion/Instruccion/For';
import { Switch } from './Ejecucion/Instruccion/Switch';
import { Case } from './Ejecucion/Instruccion/Case';
import { Ternario } from './Ejecucion/Instruccion/Ternario';
import { Funcion } from './Ejecucion/Instruccion/Funcion';
import { UsoFuncion } from './Ejecucion/Instruccion/UsoFuncion';
import { graficar_ts } from './Ejecucion/Instruccion/graficar_ts';
import { Type } from './Ejecucion/Instruccion/Type';
import { TypeDeclaracion } from './Ejecucion/Instruccion/TypeDeclaracion';

//Funciones extra
import { graficarAST,Nodo } from "./Ejecucion/graficarAST";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfMake from "pdfmake/build/pdfmake";

//Analizador
var parser  = require("./Ejecucion/gramatica.js");
declare var generateTree;


import { stringify } from 'querystring';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  constructor() {
    
  }

  entrada;
  salida;
  errores:Error[] = [];
  ast:AST = null;
  astR:AST = null;
  tabla:Tabla = null;

  ngOnInit(): void {
  }

  

  //aqui va todo el codigo xd
  ejecutar(){
    //var entrada = (document.getElementById("txtEntrada") as HTMLInputElement).value;
    
    let ast:AST = parser.parse(this.entrada);
    this.astR = parser.parse(this.entrada);
    let tabla:Tabla= new Tabla(null);
    
    ast.instrucciones.map((m) =>{
      if(m instanceof Funcion || m instanceof Type){
        m.ejecutar(tabla, ast);
      }
    });

    ast.instrucciones.map((m) =>{
      if(m instanceof Declaracion || m instanceof TypeDeclaracion){
        m.ejecutar(tabla, ast);
      }
    });

    console.log(tabla);

    try {
      ast.instrucciones.map((m) =>{
        if(!(m instanceof Declaracion) && !(m instanceof Funcion) && !(m instanceof Type) && !(m instanceof TypeDeclaracion)){
          m.ejecutar(tabla, ast);
        }
      });
    } catch (error) {
      
    }
    
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
    this.salida = a;
    this.ast = ast;
    this.tabla = tabla;

  }

  vast = true;
  verAST(){
    var tree = document.getElementById('ast');
    
    if(this.vast && this.astR != null){
      let n = new graficarAST(this.astR);
      let m:Nodo = n.root;
      generateTree([m]);
      tree.setAttribute('class','card-group p-5 visible');
      this.vast = false;
    }else{
      tree.setAttribute('class','card-group p-5 invisible');
      document.getElementById("grafo").setAttribute('width','0');
      document.getElementById("grafo").setAttribute('height','0');
      document.getElementById("grafo").innerHTML = "";
      this.vast = true;
    }
  }

  verrores = true;
  verErrores(){
    var tree = document.getElementById('errores');
    if(this.verrores && this.ast != null){
      for (let index = 0; index < this.ast.errores.length; index++) {
        let error = this.ast.errores[index];
        let tr = "<tr>";
        tr += "<td>" + error.tipo + "</td>";
        tr += "<td>" + error.descripcion + "</td>";
        tr += "<td>" + error.fila + "</td>";
        tr += "<td>" + error.columna + "</td>";
        tr += "</tr>";
        document.getElementById("infoTabla").innerHTML += tr ;
      }
      tree.setAttribute('class','card-group visible');
      this.verrores = false;
    }else{
      document.getElementById("infoTabla").innerHTML = "" ;
      tree.setAttribute('class','card-group invisible');
      this.verrores = true;
    }
  }

  verent = true;
  verEntornos(){
    var tree = document.getElementById('ambitos');
    if(this.verent){
      tree.setAttribute('class','card-group bg-transparent visible');
      this.verent = false;
    }else{
      document.getElementById("tablaambitos").innerHTML = "" ;
      tree.setAttribute('class','card-group bg-transparent invisible');
      this.verent = true;
    }
  }

  traducir(){
    let ast:AST = parser.parse(this.entrada);

    for(let i = 0; i<ast.instrucciones.length; i++){
      let m = ast.instrucciones[i];
      let cadena = "";
      cadena += m.traducir("", ast);
      if(m instanceof Declaracion || m instanceof Asignacion || m instanceof UsoFuncion){
          cadena += ";\n";
      }
      ast.consola.push(cadena);
    }

    let a:string = "";
    ast.consola.map((m) =>{
      a += m;
    });

    this.salida = a;
  }

}

