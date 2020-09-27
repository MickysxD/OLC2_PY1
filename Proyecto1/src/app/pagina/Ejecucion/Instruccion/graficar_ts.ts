import pdfFonts from "pdfmake/build/vfs_fonts";
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';

import pdfMake from "pdfmake/build/pdfmake";

export class graficar_ts{

    constructor(){

    }

    generarPDF()
  {
    const pdf = new PdfMakeWrapper();
    let titulo="";
    if(this.ejecutarr){titulo="Reporte De errores En Ejecucion";}
    else{titulo="Reporte De errores En Traduccion";}


    let tituloPDF=new Txt(titulo).alignment('center').end;
  pdf.add(tituloPDF);
  pdf.add("\n");

  let tabla=new Table([ [ "Typo","Descripcion","Linea","Columna"]]).widths([ 60, 350 ,30,50]).alignment('center').end;
  pdf.add(tabla);

  this.listaErroresEjecucion.forEach(element =>
  {

   let tabla=new Table([[ element.type,element.description,element.line,element.column]]).widths([ 60, 350,30,50 ]).alignment('center').end;
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
      if(element.TipoFuncion)
      {
        if(element.TipoPocicion)
        {
          exp.children.push(new Nodo_AST("++",exp,[]));
          exp.children.push(new Nodo_AST(element.id,exp,[]));
        }else {
          exp.children.push(new Nodo_AST(element.id,exp,[]));
          exp.children.push(new Nodo_AST("++",exp,[]));
        }
      }else {
        if(element.TipoPocicion)
        {
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