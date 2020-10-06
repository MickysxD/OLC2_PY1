import pdfFonts from "pdfmake/build/vfs_fonts";
import { PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import pdfMake from "pdfmake/build/pdfmake";

import { AST } from "../AST/AST";
import { NodoAST } from "../AST/NodoAST";
import { Simbolo } from "../AST/Simbolo";
import { Tabla } from "../AST/Tabla";

import { Funcion } from "./Funcion";

export class graficar_ts extends NodoAST{
    tabla:Tabla;

    constructor(fila:number, columna:number){
        super(null, fila, columna);
        this.tabla = null;
    }

    ejecutar(tabla:Tabla, ast:AST){
        this.tabla = tabla;
        this.otro2();
        return null;
    };

    traducir(tab:string, ast:AST){
        return "graficar_ts;\n";
    };

/*
    generarPDF() {
        const pdf = new PdfMakeWrapper();
        let titulo="Reporte De errores En Ejecucion";

        let tituloPDF=new Txt(titulo).alignment("center").end;
        pdf.add(tituloPDF);
        pdf.add("\n");

        let tabla=new Table([ [ "Typo","Descripcion","Linea","Columna"]]).widths([ 60, 350 ,30,50]).alignment("center").end;
        pdf.add(tabla);

        this.listaErroresEjecucion.forEach(element =>{
            let tabla=new Table([[ element.type,element.description,element.line,element.column]]).widths([ 60, 350,30,50 ]).alignment("center").end;
            pdf.add(tabla);
        });

        pdf.create().open();

    }

    ast(element):any{
        let exp = new Nodo_AST("Expresion",null,[]);
        if(element instanceof Arithmetic){
            if(element.leftOperator != null){
                let izq: Nodo_AST= this.ast(element.leftOperator);
                izq.parent = exp;
                exp.children.push(izq);
            }

            exp.children.push(new Nodo_AST(element.Operator,exp,[]));
            if(element.rightOperator != null){
                let der: Nodo_AST= this.ast(element.rightOperator);
                der.parent = exp;
                exp.children.push(der);
            }

        }else if(element instanceof Primitive){
            let hijo = new Nodo_AST(element.value.toString(), null, []);
            return hijo;
        }else if (element instanceof Identificador){
            let hijo = new Nodo_AST(element.identifier, null, []);
            return hijo;
        }else if (element instanceof Incremento){
            if(element.TipoFuncion){
                if(element.TipoPocicion) {
                    exp.children.push(new Nodo_AST("++",exp,[]));
                    exp.children.push(new Nodo_AST(element.id,exp,[]));
                }else {
                    exp.children.push(new Nodo_AST(element.id,exp,[]));
                    exp.children.push(new Nodo_AST("++",exp,[]));
                }
            }else {
                if(element.TipoPocicion) {
                    exp.children.push(new Nodo_AST("--",exp,[]));
                    exp.children.push(new Nodo_AST(element.id,exp,[]));
                }else {
                    exp.children.push(new Nodo_AST(element.id,exp,[]));
                    exp.children.push(new Nodo_AST("--",exp,[]));

                }
            }
        }else if (element instanceof FuncionEjecutar){
            let padre = new Nodo_AST("",null,[]);
            let hijo: Nodo_AST;
            padre.name="Funcion Ejetutar";
            hijo=new Nodo_AST(element.id,padre,[]);

            if(element.ListaExpreciones!=null){
                let hijo2=new Nodo_AST("Expresion",padre,[]);
                element.ListaExpreciones.forEach(element1 => {
                    let aux=this.ast(element1);
                    hijo2.children.push(aux);
                });
                padre.children.push(hijo2);
                return padre;
            }
        }else if (element instanceof ListaIdentificado){
            let padre=new Nodo_AST("Lista ID",exp,[]);
            element.linstaID.forEach(element1 => {
                if(element1.Listaexprecion==null){
                    let aux=new Nodo_AST("ID",padre,[]);
                    aux.children.push(new Nodo_AST(element1.identificador,aux,[]));
                    padre.children.push(aux);
                }else {
                    // aca estara el array
                }
            });
            exp.children.push(padre);

        }else if (element instanceof Ternario){
            let padre=new Nodo_AST("Ternario",exp,[]);
            padre.children.push(this.ast(element.condicion));
            padre.children.push(new Nodo_AST("?",padre,[]));
            padre.children.push(this.ast(element.operadorVerdadero));
            padre.children.push(new Nodo_AST(":",padre,[]));
            padre.children.push(this.ast(element.operadorFalso));
            exp.children.push(padre);
        }
    }
*/

    graficarEntornos(){
        PdfMakeWrapper.setFonts(pdfFonts);
        const pdf = new PdfMakeWrapper();
        let titulo="Tabla De Simbolos";
        
        let tituloPDF=new Txt(titulo).alignment("center").end;
        pdf.add(tituloPDF);
        pdf.add("\n");
        
        if(this.tabla instanceof Tabla){
            let tablas:Tabla = this.tabla;
            let booleano = true;

            while(tablas != null){
                if(booleano) {
                    let tabla1=new Table([["Entorno Actual"]]).widths([ 507]).alignment("center").end;
                    pdf.add(tabla1);
                    booleano = false;
                }else  if(!booleano) {
                    let tabla1=new Table([["Entorno Anterior"]]).widths([ 507]).alignment("center").end;
                    pdf.add(tabla1);
                }
                
                if(tablas.anterior==null){
                    let tabla1=new Table([["Entorno Global"]]).widths([ 507]).alignment("center").end;
                    pdf.add(tabla1);
                }

                let tabla=new Table([ [ "Tipo de declaracion","Tipo","Identificador", "Valor"]]).widths([ 110, 130 ,250]).alignment("center").end;
                pdf.add(tabla);
        
                tablas.variables.forEach(element => {
                    if(element.valor instanceof Funcion){
                        let t = element.valor;
                        let tabla=new Table([[ "  ", t.tipo.toString(), t.identificador, "   "]]).widths([ 110, 130 ,250]).alignment("center").end;
                        pdf.add(tabla);
                    }else{
                        let tabla=new Table([[element.getconstante(), element.tipo.toString(), element.id, element.valor]]).widths([ 110, 130 ,250]).alignment("center").end;
                        pdf.add(tabla);
                    }
                });

                //let tabla2=new Table([ [ val1,"Funcion -> "+dato,element.identifier]]).widths([ 110, 130 ,250]).alignment('center').end;    pdf.add(tabla2);

                pdf.add("\n");
                pdf.add("\n");
        
                tablas=tablas.anterior;
            }
        
        }
        const pdfDocGenerator = pdfMake.createPdf(pdf);
        var win = window.open('', '_blank');
        (pdfDocGenerator as any).open({}, win);

        //var win = window.open('', '_blank');
        //pdf.create().open(win);
        //pdfMake.createPdf(pdf).open(win);
        
    }

    otro(){
        var tb = document.getElementById('tablaambitos');

/*      let tr = "<tr>";
        tr += "<td>" + error.tipo + "</td>";
        tr += "<td>" + error.descripcion + "</td>";
        tr += "<td>" + error.fila + "</td>";
        tr += "<td>" + error.columna + "</td>";
        tr += "</tr>";
        document.getElementById("infoTabla").innerHTML += tr ;*/

        if(this.tabla instanceof Tabla){
            let tablas:Tabla = this.tabla;
            let booleano = true;

            let tr = "<h1><th scope=\"col\">TABLA DE SIMBOLOS</th></h1>";
            //tb.innerHTML += tr ;

            while(tablas != null){
                if(booleano) {
                    tr += "<thead><tr><th scope=\"col\">TABLA DE ACTUAL</th></tr></thead>";
                    booleano = false;
                }else  if(!booleano) {
                    tr += "<thead><tr><th scope=\"col\">TABLA DE ANTERIOR</th></tr></thead>";
                }
                if(tablas.anterior==null){
                    tr += "<thead><tr><th scope=\"col\">TABLA DE ACTUAL</th></tr></thead>";
                }

                tr += "<tr>";
                tr += "<th scope=\"col\">Tipo de declaracion</th>";
                tr += "<th scope=\"col\">Tipo</th>";
                tr += "<th scope=\"col\">Identificador</th>";
                tr += "<th scope=\"col\">Valor</th>";
                tr += "</tr>";

                tr += "<tbody>";
        
                tablas.variables.forEach(element => {
                    if(element.valor instanceof Funcion){
                        let t = element.valor;
                        tr += "<tr>";
                        tr += "<td>Funcion</td>";
                        tr += "<td>" + t.tipo.toString() +"</td>";
                        tr += "<td>" + t.identificador +"</td>";
                        tr += "<td> </td>";
                        tr += "</tr>";
                    }else{
                        tr += "<tr>";
                        tr += "<td>" + element.getconstante() +"</td>";
                        tr += "<td>" + element.tipo.toString() +"</td>";
                        tr += "<td>" + element.id +"</td>";
                        tr += "<td>" + element.valor + "</td>";
                        tr += "</tr>";
                    }
                });

                tr += "<tr></tr>";
                tr += "</tbody>";

                //let tabla2=new Table([ [ val1,"Funcion -> "+dato,element.identifier]]).widths([ 110, 130 ,250]).alignment('center').end;    pdf.add(tabla2);
        
                tablas=tablas.anterior;
            }
            tb.innerHTML += tr ;
        }
        
    }

    otro2(){
        var tb = document.getElementById('tablaambitos');

/*      let tr = "<tr>";
        tr += "<td>" + error.tipo + "</td>";
        tr += "<td>" + error.descripcion + "</td>";
        tr += "<td>" + error.fila + "</td>";
        tr += "<td>" + error.columna + "</td>";
        tr += "</tr>";
        document.getElementById("infoTabla").innerHTML += tr ;*/
        //tb.innerHTML = "";

        if(this.tabla instanceof Tabla){
            let tablas:Tabla = this.tabla;
            let booleano = true;
            
            let tr = "<h1 class=\"text-center\"><th scope=\"col\">TABLA DE SIMBOLOS</th></h1>";
            //tb.innerHTML += tr ;

            while(tablas != null){
                if(booleano) {
                    tr += "<h2 class=\"text-center\"><th scope=\"col\">TABLA ACTUAL</th></h2>";
                    booleano = false;
                }else  if(!booleano) {
                    tr += "<h2 class=\"text-center\"><th scope=\"col\">TABLA ANTERIOR</th></h2>";
                }
                if(tablas.anterior==null){
                    tr += "<h2 class=\"text-center\"><th scope=\"col\">TABLA GLOBAL</th></h2>";
                }

                tr += "<table class=\"table table-bordered table-striped text-center\">";

                tr += "<thead><tr>";
                tr += "<th scope=\"col\">Tipo de declaracion</th>";
                tr += "<th scope=\"col\">Identificador</th>";
                tr += "<th scope=\"col\">Tipo</th>";
                tr += "<th scope=\"col\">Valor</th>";
                tr += "</tr></thead>";

                tr += "<tbody>";
        
                tablas.variables.forEach(element => {
                    if(element.valor instanceof Funcion){
                        let t = element.valor;
                        tr += "<tr>";
                        tr += "<td>Funcion</td>";
                        tr += "<td>" + t.identificador +"</td>";
                        tr += "<td>" + t.tipo.toString() +"</td>";
                        tr += "<td> </td>";
                        tr += "</tr>";
                    }else{
                        tr += "<tr>";
                        tr += "<td>" + element.getconstante() +"</td>";
                        tr += "<td>" + element.id +"</td>";
                        tr += "<td>" + element.tipo.toString() +"</td>";
                        tr += "<td>" + element.valor + "</td>";
                        tr += "</tr>";
                    }
                });

                tr += "<tr></tr>";
                tr += "</tbody></table>";

                //let tabla2=new Table([ [ val1,"Funcion -> "+dato,element.identifier]]).widths([ 110, 130 ,250]).alignment('center').end;    pdf.add(tabla2);
        
                tablas=tablas.anterior;
            }
            tb.innerHTML += tr;
        }
        
    }
}