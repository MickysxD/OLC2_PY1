(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+1g/":
/*!*************************************************!*\
  !*** ./src/app/pagina/Ejecucion/AST/NodoAST.ts ***!
  \*************************************************/
/*! exports provided: NodoAST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodoAST", function() { return NodoAST; });
class NodoAST {
    /**
     *
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param type Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param line Linea de la instruccion o expresion
     * @param column Columna de la instruccion o expresion
     */
    constructor(tipo, fila, columna) {
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Micky\Documents\CodeBlocks.git\OLC2_PY1\proyecto1\src\main.ts */"zUnb");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2YA2":
/*!*************************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/graficar_ts.ts ***!
  \*************************************************************/
/*! exports provided: graficar_ts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graficar_ts", function() { return graficar_ts; });
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pdfmake/build/vfs_fonts */ "TruH");
/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pdfmake_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pdfmake-wrapper */ "oNuZ");
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pdfmake/build/pdfmake */ "5JmO");
/* harmony import */ var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Tabla__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AST/Tabla */ "fK0c");
/* harmony import */ var _Funcion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Funcion */ "7rph");






class graficar_ts extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"] {
    constructor(fila, columna) {
        super(null, fila, columna);
        this.tabla = null;
    }
    ejecutar(tabla, ast) {
        this.tabla = tabla;
        this.otro2();
        return null;
    }
    ;
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
    graficarEntornos() {
        pdfmake_wrapper__WEBPACK_IMPORTED_MODULE_1__["PdfMakeWrapper"].setFonts(pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_0___default.a);
        const pdf = new pdfmake_wrapper__WEBPACK_IMPORTED_MODULE_1__["PdfMakeWrapper"]();
        let titulo = "Tabla De Simbolos";
        let tituloPDF = new pdfmake_wrapper__WEBPACK_IMPORTED_MODULE_1__["Txt"](titulo).alignment("center").end;
        pdf.add(tituloPDF);
        pdf.add("\n");
        if (this.tabla instanceof _AST_Tabla__WEBPACK_IMPORTED_MODULE_4__["Tabla"]) {
            let tablas = this.tabla;
            let booleano = true;
            while (tablas != null) {
                if (booleano) {
                    let tabla1 = new pdfmake_wrapper__WEBPACK_IMPORTED_MODULE_1__["Table"]([["Entorno Actual"]]).widths([507]).alignment("center").end;
                    pdf.add(tabla1);
                    booleano = false;
                }
                else if (!booleano) {
                    let tabla1 = new pdfmake_wrapper__WEBPACK_IMPORTED_MODULE_1__["Table"]([["Entorno Anterior"]]).widths([507]).alignment("center").end;
                    pdf.add(tabla1);
                }
                if (tablas.anterior == null) {
                    let tabla1 = new pdfmake_wrapper__WEBPACK_IMPORTED_MODULE_1__["Table"]([["Entorno Global"]]).widths([507]).alignment("center").end;
                    pdf.add(tabla1);
                }
                let tabla = new pdfmake_wrapper__WEBPACK_IMPORTED_MODULE_1__["Table"]([["Tipo de declaracion", "Tipo", "Identificador", "Valor"]]).widths([110, 130, 250]).alignment("center").end;
                pdf.add(tabla);
                tablas.variables.forEach(element => {
                    if (element.valor instanceof _Funcion__WEBPACK_IMPORTED_MODULE_5__["Funcion"]) {
                        let t = element.valor;
                        let tabla = new pdfmake_wrapper__WEBPACK_IMPORTED_MODULE_1__["Table"]([["  ", t.tipo.toString(), t.identificador, "   "]]).widths([110, 130, 250]).alignment("center").end;
                        pdf.add(tabla);
                    }
                    else {
                        let tabla = new pdfmake_wrapper__WEBPACK_IMPORTED_MODULE_1__["Table"]([[element.getconstante(), element.tipo.toString(), element.id, element.valor]]).widths([110, 130, 250]).alignment("center").end;
                        pdf.add(tabla);
                    }
                });
                //let tabla2=new Table([ [ val1,"Funcion -> "+dato,element.identifier]]).widths([ 110, 130 ,250]).alignment('center').end;    pdf.add(tabla2);
                pdf.add("\n");
                pdf.add("\n");
                tablas = tablas.anterior;
            }
        }
        const pdfDocGenerator = pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_2___default.a.createPdf(pdf);
        var win = window.open('', '_blank');
        pdfDocGenerator.open({}, win);
        //var win = window.open('', '_blank');
        //pdf.create().open(win);
        //pdfMake.createPdf(pdf).open(win);
    }
    otro() {
        var tb = document.getElementById('tablaambitos');
        /*      let tr = "<tr>";
                tr += "<td>" + error.tipo + "</td>";
                tr += "<td>" + error.descripcion + "</td>";
                tr += "<td>" + error.fila + "</td>";
                tr += "<td>" + error.columna + "</td>";
                tr += "</tr>";
                document.getElementById("infoTabla").innerHTML += tr ;*/
        if (this.tabla instanceof _AST_Tabla__WEBPACK_IMPORTED_MODULE_4__["Tabla"]) {
            let tablas = this.tabla;
            let booleano = true;
            let tr = "<h1><th scope=\"col\">TABLA DE SIMBOLOS</th></h1>";
            //tb.innerHTML += tr ;
            while (tablas != null) {
                if (booleano) {
                    tr += "<thead><tr><th scope=\"col\">TABLA DE ACTUAL</th></tr></thead>";
                    booleano = false;
                }
                else if (!booleano) {
                    tr += "<thead><tr><th scope=\"col\">TABLA DE ANTERIOR</th></tr></thead>";
                }
                if (tablas.anterior == null) {
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
                    if (element.valor instanceof _Funcion__WEBPACK_IMPORTED_MODULE_5__["Funcion"]) {
                        let t = element.valor;
                        tr += "<tr>";
                        tr += "<td>Funcion</td>";
                        tr += "<td>" + t.tipo.toString() + "</td>";
                        tr += "<td>" + t.identificador + "</td>";
                        tr += "<td> </td>";
                        tr += "</tr>";
                    }
                    else {
                        tr += "<tr>";
                        tr += "<td>" + element.getconstante() + "</td>";
                        tr += "<td>" + element.tipo.toString() + "</td>";
                        tr += "<td>" + element.id + "</td>";
                        tr += "<td>" + element.valor + "</td>";
                        tr += "</tr>";
                    }
                });
                tr += "<tr></tr>";
                tr += "</tbody>";
                //let tabla2=new Table([ [ val1,"Funcion -> "+dato,element.identifier]]).widths([ 110, 130 ,250]).alignment('center').end;    pdf.add(tabla2);
                tablas = tablas.anterior;
            }
            tb.innerHTML += tr;
        }
    }
    otro2() {
        var tb = document.getElementById('tablaambitos');
        /*      let tr = "<tr>";
                tr += "<td>" + error.tipo + "</td>";
                tr += "<td>" + error.descripcion + "</td>";
                tr += "<td>" + error.fila + "</td>";
                tr += "<td>" + error.columna + "</td>";
                tr += "</tr>";
                document.getElementById("infoTabla").innerHTML += tr ;*/
        //tb.innerHTML = "";
        if (this.tabla instanceof _AST_Tabla__WEBPACK_IMPORTED_MODULE_4__["Tabla"]) {
            let tablas = this.tabla;
            let booleano = true;
            let tr = "<h1 class=\"text-center\"><th scope=\"col\">TABLA DE SIMBOLOS</th></h1>";
            //tb.innerHTML += tr ;
            while (tablas != null) {
                if (booleano) {
                    tr += "<h2 class=\"text-center\"><th scope=\"col\">TABLA ACTUAL</th></h2>";
                    booleano = false;
                }
                else if (!booleano) {
                    tr += "<h2 class=\"text-center\"><th scope=\"col\">TABLA ANTERIOR</th></h2>";
                }
                if (tablas.anterior == null) {
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
                    if (element.valor instanceof _Funcion__WEBPACK_IMPORTED_MODULE_5__["Funcion"]) {
                        let t = element.valor;
                        tr += "<tr>";
                        tr += "<td>Funcion</td>";
                        tr += "<td>" + t.identificador + "</td>";
                        tr += "<td>" + t.tipo.toString() + "</td>";
                        tr += "<td> </td>";
                        tr += "</tr>";
                    }
                    else {
                        tr += "<tr>";
                        tr += "<td>" + element.getconstante() + "</td>";
                        tr += "<td>" + element.id + "</td>";
                        tr += "<td>" + element.tipo.toString() + "</td>";
                        tr += "<td>" + element.valor + "</td>";
                        tr += "</tr>";
                    }
                });
                tr += "<tr></tr>";
                tr += "</tbody></table>";
                //let tabla2=new Table([ [ val1,"Funcion -> "+dato,element.identifier]]).widths([ 110, 130 ,250]).alignment('center').end;    pdf.add(tabla2);
                tablas = tablas.anterior;
            }
            tb.innerHTML += tr;
        }
    }
}


/***/ }),

/***/ "5rMc":
/*!********************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/Switch.ts ***!
  \********************************************************/
/*! exports provided: Switch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return Switch; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Tabla */ "fK0c");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");
/* harmony import */ var _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Expresion/Continue */ "vBMQ");
/* harmony import */ var _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Expresion/Break */ "Px3t");
/* harmony import */ var _Case__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Case */ "hH/0");
/* harmony import */ var _Expresion_Return__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Expresion/Return */ "NOVw");








/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class Switch extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */
    constructor(condicion, cases, fila, columna) {
        super(null, fila, columna);
        this.condicion = condicion;
        this.cases = cases;
    }
    ejecutar(tabla, ast) {
        const nuevoEntorno = new _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](tabla);
        let result;
        result = this.condicion.ejecutar(nuevoEntorno, ast);
        if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
            return result;
        }
        if (this.condicion.tipo.tipo != _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__["Tipos"].NUMBER && this.condicion.tipo.tipo != _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__["Tipos"].STRING) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Se esperaba una expresion booleana para la condicion", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        for (let i = 0; i < this.cases.length; i++) {
            let m = this.cases[i];
            if (m instanceof _Case__WEBPACK_IMPORTED_MODULE_6__["Case"] && m.esDefault != true) {
                let resultC;
                resultC = m.condicion.ejecutar(nuevoEntorno, ast);
                if (resultC instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
                    return resultC;
                }
                if (this.condicion.tipo.tipo != m.condicion.tipo.tipo) {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Los tipos no coinciden sentencia Switch", this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
                if (resultC == result) {
                    const res = m.ejecutar(nuevoEntorno, ast);
                    if (res instanceof _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__["Break"]) {
                        return null;
                    }
                    if (res instanceof _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__["Continue"] || res instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"] || res instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_7__["Return"]) {
                        return res;
                    }
                    if (m instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_7__["Return"]) {
                        return m;
                    }
                }
            }
        }
        for (let i = 0; i < this.cases.length; i++) {
            let m = this.cases[i];
            if (m instanceof _Case__WEBPACK_IMPORTED_MODULE_6__["Case"] && m.esDefault == true) {
                const res = m.ejecutar(nuevoEntorno, ast);
                if (res instanceof _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__["Continue"] || res instanceof _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__["Break"] || res instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"] || res instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_7__["Return"]) {
                    return res;
                }
                if (m instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_7__["Return"]) {
                    return m;
                }
            }
        }
        return null;
    }
}


/***/ }),

/***/ "7IgX":
/*!*****************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/For.ts ***!
  \*****************************************************/
/*! exports provided: For */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "For", function() { return For; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Tabla */ "fK0c");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");
/* harmony import */ var _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Expresion/Continue */ "vBMQ");
/* harmony import */ var _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Expresion/Break */ "Px3t");
/* harmony import */ var _Declaracion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Declaracion */ "NP5J");
/* harmony import */ var _Asignacion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Asignacion */ "WLoS");








/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class For extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */
    constructor(comienzo, condicion, iterador, sentencias, fila, columna) {
        super(null, fila, columna);
        this.comienzo = comienzo;
        this.condicion = condicion;
        this.iterador = iterador;
        this.sentencias = sentencias;
    }
    ejecutar(tabla, ast) {
        const entorno = new _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](tabla);
        if (this.comienzo instanceof _Declaracion__WEBPACK_IMPORTED_MODULE_6__["Declaracion"] || this.comienzo instanceof _Asignacion__WEBPACK_IMPORTED_MODULE_7__["Asignacion"]) {
            this.comienzo.ejecutar(entorno, ast);
        }
        else {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Se esperaba una asignacion o declaracion en la sentencia For", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        let enciclado = 0;
        for (let index = 0; index <= 10000; index++) {
            const nuevoEntorno = new _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](entorno);
            let result;
            result = this.condicion.ejecutar(entorno, ast);
            if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
                return result;
            }
            if (this.condicion.tipo.tipo != _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__["Tipos"].BOOLEAN) {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Se esperaba una expresion booleana para la condicion", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
            if (result) {
                for (let i = 0; i < this.sentencias.length; i++) {
                    let m = this.sentencias[i];
                    const res = m.ejecutar(nuevoEntorno, ast);
                    if (res instanceof _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__["Continue"] || res instanceof _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__["Break"] || res instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
                        index = 10000;
                        return res;
                    }
                }
            }
            else {
                break;
            }
            this.iterador.ejecutar(entorno, ast);
            enciclado = index;
        }
        if (enciclado == 10000) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Se ha enciclado la sentencia for", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        else {
            return null;
        }
    }
}


/***/ }),

/***/ "7rph":
/*!*********************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/Funcion.ts ***!
  \*********************************************************/
/*! exports provided: Funcion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Funcion", function() { return Funcion; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Simbolo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Simbolo */ "w77F");



/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
*/
class Funcion extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */
    constructor(identificador, parametros, tipo, sentencias, fila, columna) {
        super(tipo, fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
        this.sentencias = sentencias;
    }
    ejecutar(tabla, ast) {
        let nombre = "function_" + this.identificador;
        /*
                this.parametros.map((m:Identificador) =>{
                    nombre += "_" + m.tipo.tipo;
                });
        */
        for (let i = 0; i < this.parametros.length; i++) {
            let m = this.parametros[i];
            nombre += '_' + m.tipo.tipo;
        }
        let simbolo;
        simbolo = new _AST_Simbolo__WEBPACK_IMPORTED_MODULE_2__["Simbolo"](this.tipo, nombre, this, false);
        const res = tabla.setVariable(simbolo);
        if (res != null) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", res, this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        return null;
    }
}


/***/ }),

/***/ "Afb6":
/*!*************************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Expresion/Identificador.ts ***!
  \*************************************************************/
/*! exports provided: Identificador */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Identificador", function() { return Identificador; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Error */ "RfN4");


/**
 * @class Nodo expresion identificador que obtendra el valor de una variable
 */
class Identificador extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Retorna el objeto identificador creado
     * @param identifier nombre de la variable
     * @param line Linea del identificador
     * @param column Columna del identificador
     */
    constructor(identificador, tipo, valor, fila, columna) {
        //tipo null porque aun no se el tipo
        super(tipo, fila, columna);
        this.identificador = identificador;
        this.valor = valor;
    }
    ejecutar(tabla, ast) {
        let variable;
        variable = tabla.getVariable(this.identificador);
        if (variable == null) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "No se ha encontrado la variable " + this.identificador, this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        else if (variable.valor == null) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Variable no inicializada " + this.identificador, this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        this.tipo = variable.tipo;
        return variable.valor;
    }
}


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "BLdb":
/*!************************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/ConsoleLog.ts ***!
  \************************************************************/
/*! exports provided: ConsoleLog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsoleLog", function() { return ConsoleLog; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");



/**
 * Permite imprimir expresiones en la consola
 */
class ConsoleLog extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Retorna el objeto Print
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(expresion, fila, columna) {
        super(new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].VOID), fila, columna);
        this.expresion = expresion;
    }
    ejecutar(tabla, ast) {
        const value = this.expresion.ejecutar(tabla, ast);
        if (!(value instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) && value != null) {
            ast.consola.push(value);
        }
        return null;
    }
}


/***/ }),

/***/ "EsxH":
/*!**********************************************!*\
  !*** ./src/app/pagina/Ejecucion/AST/Tipo.ts ***!
  \**********************************************/
/*! exports provided: Tipos, Tipo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tipos", function() { return Tipos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tipo", function() { return Tipo; });
var Tipos;
(function (Tipos) {
    Tipos[Tipos["NUMBER"] = 0] = "NUMBER";
    Tipos[Tipos["STRING"] = 1] = "STRING";
    Tipos[Tipos["BOOLEAN"] = 2] = "BOOLEAN";
    Tipos[Tipos["VOID"] = 3] = "VOID";
    Tipos[Tipos["TYPE"] = 4] = "TYPE";
    Tipos[Tipos["ARRAY"] = 5] = "ARRAY";
})(Tipos || (Tipos = {}));
/**
 *
 * @class Permite llevar el control de los tipos del lenguaje
 */
class Tipo {
    /**
     *
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param type Tipo seleccionado para la variable o funcion
     *
     */
    constructor(tipo) {
        this.tipo = tipo;
    }
    toString() {
        if (this.tipo === Tipos.BOOLEAN) {
            return "boolean";
        }
        else if (this.tipo === Tipos.NUMBER) {
            return "number";
        }
        else if (this.tipo === Tipos.STRING) {
            return "string";
        }
        else if (this.tipo === Tipos.VOID) {
            return "void";
        }
        else if (this.tipo === Tipos.TYPE) {
            return "type";
        }
        else if (this.tipo === Tipos.ARRAY) {
            return "Array";
        }
    }
}


/***/ }),

/***/ "I4SB":
/*!***********************************************!*\
  !*** ./src/app/pagina/Ejecucion/gramatica.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,40],$V1=[1,39],$V2=[1,37],$V3=[1,38],$V4=[1,22],$V5=[1,31],$V6=[1,32],$V7=[1,33],$V8=[1,23],$V9=[1,24],$Va=[1,36],$Vb=[1,26],$Vc=[1,49],$Vd=[1,27],$Ve=[1,28],$Vf=[1,30],$Vg=[1,29],$Vh=[1,35],$Vi=[1,42],$Vj=[1,43],$Vk=[1,44],$Vl=[1,45],$Vm=[1,46],$Vn=[1,47],$Vo=[1,48],$Vp=[2,5,7,26,27,28,29,31,32,33,35,37,40,48,52,56,57,58,61,62,64,65,74,86,89,90,91,92,93],$Vq=[63,74,75,76,77,78,79,80,81,82,83,84,85,87,88],$Vr=[2,98],$Vs=[2,99],$Vt=[1,58],$Vu=[1,61],$Vv=[1,67],$Vw=[1,72],$Vx=[1,77],$Vy=[1,79],$Vz=[1,78],$VA=[1,80],$VB=[1,81],$VC=[1,82],$VD=[1,83],$VE=[1,84],$VF=[1,85],$VG=[1,86],$VH=[1,87],$VI=[1,88],$VJ=[1,89],$VK=[1,90],$VL=[1,91],$VM=[2,105],$VN=[1,94],$VO=[1,95],$VP=[1,96],$VQ=[1,93],$VR=[8,38,53],$VS=[8,38,41,53,54,63,74,75,76,77,78,79,80,81,82,83,84,85,87,88],$VT=[1,104],$VU=[8,38],$VV=[1,108],$VW=[1,143],$VX=[1,144],$VY=[1,145],$VZ=[1,146],$V_=[2,5,7,26,27,28,29,31,32,33,35,37,40,48,51,52,56,57,58,61,62,64,65,74,86,89,90,91,92,93],$V$=[1,158],$V01=[1,159],$V11=[8,38,41,53,54,63,74,75,80,81,82,83,84,85,87,88],$V21=[8,38,41,53,54,63,74,75,76,77,80,81,82,83,84,85,87,88],$V31=[8,38,41,53,54,63,80,81,82,83,84,85,87,88],$V41=[8,38,41,53,54,63,84,85,87,88],$V51=[1,166],$V61=[38,53],$V71=[8,38,43,53,54],$V81=[1,173],$V91=[7,61,62],$Va1=[41,54];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"INSTRUCCIONES":4,"EOF":5,"ERROR":6,"}":7,";":8,"INSTRUCCION":9,"CONSOLE":10,"DECLARACION":11,"ASIGNACION":12,"IF":13,"WHILE":14,"DOWHILE":15,"FOR":16,"SWITCH":17,"BREAK":18,"CONTINUE":19,"RETURN":20,"TERNARIO":21,"FUNCION":22,"USOFUNCION":23,"COMENTARIO":24,"GRAFICAR":25,"TK_GRAFICAR":26,"TK_CL":27,"TK_CM":28,"TK_CONSOLE":29,"CONDICION":30,"TK_BREAK":31,"TK_CONTINUE":32,"TK_RETURN":33,"EXPRESION":34,"TK_CONST":35,"LISTA_DECLARACION":36,"TK_LET":37,",":38,"ID_DECLARACION":39,"TK_ID":40,":":41,"TIPO":42,"=":43,"LISTA_ASIGNACION":44,"ID_ASIGNACION":45,"++":46,"--":47,"TK_IF":48,"BLOQUE_INSTRUCCIONES":49,"LISTA_IF":50,"TK_ELSE":51,"(":52,")":53,"{":54,"ELSE_IF":55,"TK_WHILE":56,"TK_DO":57,"TK_SWITCH":58,"LISTA_CASE":59,"CASE":60,"TK_CASE":61,"TK_DEFAULT":62,"?":63,"TK_FOR":64,"TK_FUNCTION":65,"PFUNCION":66,"LISTA_PARAMETROS":67,"PARAMETRO":68,"LISTA_IDS":69,"TK_STRING":70,"TK_BOOLEAN":71,"TK_NUMBER":72,"TK_VOID":73,"-":74,"+":75,"*":76,"/":77,"^":78,"%":79,"<":80,">":81,">=":82,"<=":83,"==":84,"!=":85,"!":86,"||":87,"&&":88,"TK_NUMERO":89,"TK_TRUE":90,"TK_FALSE":91,"TK_CADENAC":92,"TK_CADENAS":93,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"}",8:";",26:"TK_GRAFICAR",27:"TK_CL",28:"TK_CM",29:"TK_CONSOLE",31:"TK_BREAK",32:"TK_CONTINUE",33:"TK_RETURN",35:"TK_CONST",37:"TK_LET",38:",",40:"TK_ID",41:":",43:"=",46:"++",47:"--",48:"TK_IF",51:"TK_ELSE",52:"(",53:")",54:"{",56:"TK_WHILE",57:"TK_DO",58:"TK_SWITCH",61:"TK_CASE",62:"TK_DEFAULT",63:"?",64:"TK_FOR",65:"TK_FUNCTION",70:"TK_STRING",71:"TK_BOOLEAN",72:"TK_NUMBER",73:"TK_VOID",74:"-",75:"+",76:"*",77:"/",78:"^",79:"%",80:"<",81:">",82:">=",83:"<=",84:"==",85:"!=",86:"!",87:"||",88:"&&",89:"TK_NUMERO",90:"TK_TRUE",91:"TK_FALSE",92:"TK_CADENAC",93:"TK_CADENAS"},
productions_: [0,[3,2],[3,1],[6,2],[6,2],[4,2],[4,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,1],[9,2],[9,1],[9,2],[9,1],[25,1],[24,1],[24,1],[10,3],[18,2],[19,2],[20,3],[20,2],[11,2],[11,2],[36,3],[36,1],[39,5],[39,3],[39,3],[39,1],[12,1],[44,3],[44,1],[45,3],[45,2],[45,2],[13,6],[13,4],[13,5],[13,3],[30,3],[49,3],[49,2],[50,2],[50,1],[55,4],[14,3],[15,5],[17,5],[17,4],[59,2],[59,1],[60,4],[60,3],[21,5],[16,9],[16,9],[22,6],[22,4],[66,3],[66,2],[67,3],[67,1],[68,3],[23,4],[23,3],[69,3],[69,1],[42,1],[42,1],[42,1],[42,1],[34,2],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,2],[34,3],[34,3],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
this.$ = new AST($$[$0-1], errores); errores = []; return this.$;
break;
case 2:
this.$ = new AST([], errores); errores = []; return this.$;
break;
case 3: case 4:
errores.push(new Error("Sintactico", "Recuperado en: " + $$[$0-1].yyreport_syntax_error + $$[$0-1], _$[$0].first_line, _$[$0].first_column));
break;
case 5:
 this.$ = $$[$0-1];
                                            if($$[$0] instanceof NodoAST){
                                                this.$ = $$[$0-1]; this.$.push($$[$0]);
                                            }
                                          
break;
case 6:
 if($$[$0] instanceof NodoAST){
                                                this.$ = [$$[$0]];
                                            }else{
                                                this.$ = [];
                                            }
                                          
break;
case 7: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 19: case 23: case 98: case 99:
this.$ = $$[$0];
break;
case 8: case 9: case 18: case 20: case 50: case 51: case 69: case 106:
this.$ = $$[$0-1];
break;
case 22:
this.$ =$$[$0-1];
break;
case 24:
this.$ = new graficar_ts(_$[$0].first_line, _$[$0].first_column);
break;
case 27:
this.$ = new ConsoleLog($$[$0-1], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 28:
this.$ = new Break(_$[$0-1].first_line, _$[$0-1].first_column);
break;
case 29:
this.$ = new Continue(_$[$0-1].first_line, _$[$0-1].first_column);
break;
case 30:
this.$ = new Return($$[$0-1], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 31:
this.$ = new Return(null, _$[$0-1].first_line, _$[$0-1].first_column);
break;
case 32:
this.$ = new Declaracion(true, $$[$0], _$[$0-1].first_line, _$[$0-1].first_column);
break;
case 33:
this.$ = new Declaracion(false, $$[$0], _$[$0-1].first_line, _$[$0-1].first_column);
break;
case 34: case 71: case 76:
this.$ = $$[$0-2]; this.$.push($$[$0]);
break;
case 35: case 42: case 54: case 61: case 72: case 77:
this.$ = [$$[$0]];
break;
case 36:
this.$ = new Identificador($$[$0-4], $$[$0-2], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column);
break;
case 37: case 73:
this.$ = new Identificador($$[$0-2], $$[$0], null, _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 38: case 43:
this.$ = new Identificador($$[$0-2], null, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 39: case 105:
this.$ = new Identificador($$[$0], null, null, _$[$0].first_line, _$[$0].first_column);
break;
case 40:
this.$ = new Asignacion($$[$0], _$[$0].first_line, _$[$0].first_column);
break;
case 41:
this.$ = $$[$0-2]; this.$.push($$[$0-1]);
break;
case 44:
this.$ = new Identificador($$[$0-1], null,  new Aritmetica(new Identificador($$[$0-1], null, null, _$[$0-1].first_line, _$[$0-1].first_column), new Primitivo(new Tipo(Tipos.NUMBER), Number(1), _$[$0].first_line, _$[$0].first_column), '+', _$[$0-1].first_line, _$[$0-1].first_column), _$[$0-1].first_line, _$[$0-1].first_column);
break;
case 45:
this.$ = new Identificador($$[$0-1], null,  new Aritmetica(new Identificador($$[$0-1], null, null, _$[$0-1].first_line, _$[$0-1].first_column), new Primitivo(new Tipo(Tipos.NUMBER), Number(1), _$[$0].first_line, _$[$0].first_column), '-', _$[$0-1].first_line, _$[$0-1].first_column), _$[$0-1].first_line, _$[$0-1].first_column);
break;
case 46:
this.$ = new If($$[$0-4], $$[$0-3], $$[$0-2], $$[$0], _$[$0-5].first_line, _$[$0-5].first_column);
break;
case 47:
this.$ = new If($$[$0-2], $$[$0-1], $$[$0], [], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 48:
this.$ = new If($$[$0-3], $$[$0-2], [], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column);
break;
case 49:
this.$ = new If($$[$0-1], $$[$0], [], [], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 52: case 70:
this.$ = [];
break;
case 53:
this.$ =$$[$0-1]; this.$.push($$[$0]);
break;
case 55:
this.$ = new If($$[$0-1], $$[$0], [], [], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 56:
this.$ = new While($$[$0-1], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 57:
this.$ = new DoWhile($$[$0-1], $$[$0-3], _$[$0-4].first_line, _$[$0-4].first_column);
break;
case 58:
this.$ = new Switch($$[$0-3], $$[$0-1], $$[$0-2], _$[$0-4].first_line, _$[$0-4].first_column);
break;
case 59:
this.$ = new Switch($$[$0-2], $$[$0], [], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 60:
this.$ = $$[$0-1]; this.$.push($$[$0])
break;
case 62:
this.$ = new Case(false, $$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 63:
this.$ = new Case(true, null, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 64:
this.$ = new Ternario($$[$0-4], $$[$0-2], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column);
break;
case 65: case 66:
this.$ = new For($$[$0-6], $$[$0-4], $$[$0-2], $$[$0], _$[$0-8].first_line, _$[$0-8].first_column);
break;
case 67:
this.$ = new Funcion($$[$0-4], $$[$0-3], $$[$0-1], $$[$0], _$[$0-5].first_line, _$[$0-5].first_column);
break;
case 68:
this.$ = new Funcion($$[$0-2], $$[$0-1], new Tipo(Tipos.VOID), $$[$0], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 74:
this.$ = new UsoFuncion($$[$0-3], $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 75:
this.$ = new UsoFuncion($$[$0-2], [], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 78:
this.$ = new Tipo(Tipos.STRING);
break;
case 79:
this.$ = new Tipo(Tipos.BOOLEAN);
break;
case 80:
this.$ = new Tipo(Tipos.NUMBER);
break;
case 81:
this.$ = new Tipo(Tipos.VOID);
break;
case 82:
this.$ = new Aritmetica($$[$0], null, '-', _$[$0-1].first_line, _$[$0-1].first_column);
break;
case 83:
this.$ = new Aritmetica($$[$0-2], $$[$0], '+', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 84:
this.$ = new Aritmetica($$[$0-2], $$[$0], '-', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 85:
this.$ = new Aritmetica($$[$0-2], $$[$0], '*', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 86:
this.$ = new Aritmetica($$[$0-2], $$[$0], '/', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 87:
this.$ = new Aritmetica($$[$0-2], $$[$0], '^', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 88:
this.$ = new Aritmetica($$[$0-2], $$[$0], '%', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 89:
this.$ = new Relacional($$[$0-2], $$[$0], '<', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 90:
this.$ = new Relacional($$[$0-2], $$[$0], '>', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 91:
this.$ = new Relacional($$[$0-2], $$[$0], '>=', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 92:
this.$ = new Relacional($$[$0-2], $$[$0], '<=', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 93:
this.$ = new Relacional($$[$0-2], $$[$0], '==', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 94:
this.$ = new Relacional($$[$0-2], $$[$0], '!=', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 95:
this.$ = new Logica($$[$0], null, '!', _$[$0-1].first_line, _$[$0-1].first_column);
break;
case 96:
this.$ = new Logica($$[$0-2], $$[$0], '||', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 97:
this.$ = new Logica($$[$0-2], $$[$0], '&&', _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 100:
this.$ = new Primitivo(new Tipo(Tipos.NUMBER), Number($$[$0]), _$[$0].first_line, _$[$0].first_column);
break;
case 101:
this.$ = new Primitivo(new Tipo(Tipos.BOOLEAN), true, _$[$0].first_line, _$[$0].first_column);
break;
case 102:
this.$ = new Primitivo(new Tipo(Tipos.BOOLEAN), false, _$[$0].first_line, _$[$0].first_column);
break;
case 103:
this.$ = new Primitivo(new Tipo(Tipos.STRING), $$[$0].slice(1, -1).replace(/\\"/g,"\""), _$[$0].first_line, _$[$0].first_column);
break;
case 104:
this.$ = new Primitivo(new Tipo(Tipos.STRING), $$[$0].slice(1, -1).replace(/\\'/g,"'"), _$[$0].first_line, _$[$0].first_column);
break;
}
},
table: [{2:$V0,3:1,4:2,5:[1,3],6:21,9:4,10:5,11:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:20,26:$V1,27:$V2,28:$V3,29:$V4,31:$V5,32:$V6,33:$V7,34:34,35:$V8,37:$V9,40:$Va,44:25,45:41,48:$Vb,52:$Vc,56:$Vd,57:$Ve,58:$Vf,64:$Vg,65:$Vh,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{1:[3]},{2:$V0,5:[1,50],6:21,9:51,10:5,11:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:20,26:$V1,27:$V2,28:$V3,29:$V4,31:$V5,32:$V6,33:$V7,34:34,35:$V8,37:$V9,40:$Va,44:25,45:41,48:$Vb,52:$Vc,56:$Vd,57:$Ve,58:$Vf,64:$Vg,65:$Vh,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{1:[2,2]},o($Vp,[2,6]),o($Vp,[2,7]),{8:[1,52]},{8:[1,53]},o($Vp,[2,10]),o($Vp,[2,11]),o($Vp,[2,12]),o($Vp,[2,13]),o($Vp,[2,14]),o($Vp,[2,15]),o($Vp,[2,16]),o($Vp,[2,17]),o($Vq,$Vr,{8:[1,54]}),o($Vp,[2,19]),o($Vq,$Vs,{8:[1,55]}),o($Vp,[2,21]),{8:[1,56]},o($Vp,[2,23]),{30:57,52:$Vt},{36:59,39:60,40:$Vu},{36:62,39:60,40:$Vu},o([8,53],[2,40],{38:[1,63]}),{30:64,52:$Vt},{30:65,52:$Vt},{49:66,54:$Vv},{52:[1,68]},{21:70,23:71,34:69,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{8:[1,73]},{8:[1,74]},{8:[1,76],21:70,23:71,34:75,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL},{40:[1,92]},o($Vq,$VM,{43:$VN,46:$VO,47:$VP,52:$VQ}),o($Vp,[2,25]),o($Vp,[2,26]),{8:[2,24]},{7:[1,97],8:[1,98]},o($VR,[2,42]),{21:70,23:71,34:99,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:100,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},o($VS,[2,100]),o($VS,[2,101]),o($VS,[2,102]),o($VS,[2,103]),o($VS,[2,104]),{21:70,23:71,34:101,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{1:[2,1]},o($Vp,[2,5]),o($Vp,[2,8]),o($Vp,[2,9]),o($Vp,[2,18]),o($Vp,[2,20]),o($Vp,[2,22]),{8:[1,102]},{21:70,23:71,34:103,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{8:[2,32],38:$VT},o($VU,[2,35]),o($VU,[2,39],{41:[1,105],43:[1,106]}),{8:[2,33],38:$VT},{40:$VV,45:107},{49:109,54:$Vv},{49:110,54:$Vv},{56:[1,111]},{2:$V0,4:112,6:21,7:[1,113],9:4,10:5,11:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:20,26:$V1,27:$V2,28:$V3,29:$V4,31:$V5,32:$V6,33:$V7,34:34,35:$V8,37:$V9,40:$Va,44:25,45:41,48:$Vb,52:$Vc,56:$Vd,57:$Ve,58:$Vf,64:$Vg,65:$Vh,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{11:114,12:115,35:$V8,37:$V9,40:$VV,44:25,45:41},{54:[1,116],63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL},o($VS,$Vr),o($VS,$Vs),o($VS,$VM,{52:$VQ}),o($Vp,[2,28]),o($Vp,[2,29]),{8:[1,117],63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL},o($Vp,[2,31]),{21:70,23:71,34:118,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:119,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:120,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:121,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:122,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:123,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:124,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:125,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:126,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:127,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:128,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:129,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:130,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:131,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:132,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{52:[1,134],66:133},{21:70,23:71,34:137,40:$Vw,52:$Vc,53:[1,136],69:135,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:138,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},o($VR,[2,44]),o($VR,[2,45]),o($Vp,[2,3]),o($Vp,[2,4]),o($VS,[2,82]),o($VS,[2,95]),{53:[1,139],63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL},o($Vp,[2,27]),{53:[1,140],63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL},{39:141,40:$Vu},{42:142,70:$VW,71:$VX,72:$VY,73:$VZ},{21:70,23:71,34:147,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},o($VR,[2,41]),{43:$VN,46:$VO,47:$VP},o($Vp,[2,49],{50:148,55:150,51:[1,149]}),o($Vp,[2,56]),{30:151,52:$Vt},{2:$V0,6:21,7:[1,152],9:51,10:5,11:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:20,26:$V1,27:$V2,28:$V3,29:$V4,31:$V5,32:$V6,33:$V7,34:34,35:$V8,37:$V9,40:$Va,44:25,45:41,48:$Vb,52:$Vc,56:$Vd,57:$Ve,58:$Vf,64:$Vg,65:$Vh,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},o($V_,[2,52]),{8:[1,153]},{8:[1,154]},{7:[1,156],59:155,60:157,61:$V$,62:$V01},o($Vp,[2,30]),{41:[1,160],63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL},o($V11,[2,83],{76:$VA,77:$VB,78:$VC,79:$VD}),o($V11,[2,84],{76:$VA,77:$VB,78:$VC,79:$VD}),o($V21,[2,85],{78:$VC,79:$VD}),o($V21,[2,86],{78:$VC,79:$VD}),o($VS,[2,87]),o($VS,[2,88]),o($V31,[2,89],{74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD}),o($V31,[2,90],{74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD}),o($V31,[2,91],{74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD}),o($V31,[2,92],{74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD}),o($V41,[2,93],{74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH}),o($V41,[2,94],{74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH}),o([8,38,41,53,54,63,87],[2,96],{74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,88:$VL}),o([8,38,41,53,54,63,87,88],[2,97],{74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ}),{41:[1,161],49:162,54:$Vv},{40:$V51,53:[1,164],67:163,68:165},{38:[1,168],53:[1,167]},o($VS,[2,75]),o($V61,[2,77],{63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL}),o($VR,[2,43],{63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL}),o($VS,[2,106]),o([8,54],[2,50]),o($VU,[2,34]),o($VU,[2,37],{43:[1,169]}),o($V71,[2,78]),o($V71,[2,79]),o($V71,[2,80]),o($V71,[2,81]),o($VU,[2,38],{63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL}),o($Vp,[2,47],{55:171,51:[1,170]}),{48:$V81,49:172,54:$Vv},o($V_,[2,54]),{8:[1,174]},o($V_,[2,51]),{21:70,23:71,34:175,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:176,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{7:[1,177],60:178,61:$V$,62:$V01},o($Vp,[2,59]),o($V91,[2,61]),{21:70,23:71,34:179,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{41:[1,180]},{21:70,23:71,34:181,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{42:182,70:$VW,71:$VX,72:$VY,73:$VZ},o($Vp,[2,68]),{38:[1,184],53:[1,183]},o($Va1,[2,70]),o($V61,[2,72]),{41:[1,185]},o($VS,[2,74]),{21:70,23:71,34:186,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{21:70,23:71,34:187,40:$Vw,52:$Vc,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},{48:$V81,49:188,54:$Vv},o($V_,[2,53]),o($Vp,[2,48]),{30:189,52:$Vt},o($Vp,[2,57]),{8:[1,190],63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL},{8:[1,191],63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL},o($Vp,[2,58]),o($V91,[2,60]),{41:[1,192],63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL},{2:$V0,4:193,6:21,9:4,10:5,11:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:20,26:$V1,27:$V2,28:$V3,29:$V4,31:$V5,32:$V6,33:$V7,34:34,35:$V8,37:$V9,40:$Va,44:25,45:41,48:$Vb,52:$Vc,56:$Vd,57:$Ve,58:$Vf,64:$Vg,65:$Vh,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},o([8,38,41,53,54,63],[2,64],{74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL}),{49:194,54:$Vv},o($Va1,[2,69]),{40:$V51,68:195},{42:196,70:$VW,71:$VX,72:$VY,73:$VZ},o($V61,[2,76],{63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL}),o($VU,[2,36],{63:$Vx,74:$Vy,75:$Vz,76:$VA,77:$VB,78:$VC,79:$VD,80:$VE,81:$VF,82:$VG,83:$VH,84:$VI,85:$VJ,87:$VK,88:$VL}),o($Vp,[2,46]),{49:197,54:$Vv},{12:198,40:$VV,44:25,45:41},{12:199,40:$VV,44:25,45:41},{2:$V0,4:200,6:21,9:4,10:5,11:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:20,26:$V1,27:$V2,28:$V3,29:$V4,31:$V5,32:$V6,33:$V7,34:34,35:$V8,37:$V9,40:$Va,44:25,45:41,48:$Vb,52:$Vc,56:$Vd,57:$Ve,58:$Vf,64:$Vg,65:$Vh,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo},o($V91,[2,63],{10:5,11:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:20,6:21,44:25,34:34,45:41,9:51,2:$V0,26:$V1,27:$V2,28:$V3,29:$V4,31:$V5,32:$V6,33:$V7,35:$V8,37:$V9,40:$Va,48:$Vb,52:$Vc,56:$Vd,57:$Ve,58:$Vf,64:$Vg,65:$Vh,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo}),o($Vp,[2,67]),o($V61,[2,71]),o($V61,[2,73]),o($V_,[2,55]),{53:[1,201]},{53:[1,202]},o($V91,[2,62],{10:5,11:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:20,6:21,44:25,34:34,45:41,9:51,2:$V0,26:$V1,27:$V2,28:$V3,29:$V4,31:$V5,32:$V6,33:$V7,35:$V8,37:$V9,40:$Va,48:$Vb,52:$Vc,56:$Vd,57:$Ve,58:$Vf,64:$Vg,65:$Vh,74:$Vi,86:$Vj,89:$Vk,90:$Vl,91:$Vm,92:$Vn,93:$Vo}),{49:203,54:$Vv},{49:204,54:$Vv},o($Vp,[2,65]),o($Vp,[2,66])],
defaultActions: {3:[2,2],39:[2,24],50:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    //Carpeta AST
    var {AST} = __webpack_require__(/*! ./AST/AST */ "sCyZ");
    var {Error} = __webpack_require__(/*! ./AST/Error */ "RfN4");
    var {NodoAST} = __webpack_require__(/*! ./AST/NodoAST */ "+1g/");
    var {Simbolo} = __webpack_require__(/*! ./AST/Simbolo */ "w77F");
    var {Tabla} = __webpack_require__(/*! ./AST/Tabla */ "fK0c");
    var {Tipo,Tipos} = __webpack_require__(/*! ./AST/Tipo */ "EsxH");
    

    //Carpeta Expresion
    var {Aritmetica} = __webpack_require__(/*! ./Expresion/Aritmetica */ "UO5A");
    var {Primitivo} = __webpack_require__(/*! ./Expresion/Primitivo */ "LRvX");
    var {Identificador} = __webpack_require__(/*! ./Expresion/Identificador */ "Afb6");
    var {Relacional} = __webpack_require__(/*! ./Expresion/Relacional */ "LqoN");
    var {Logica} = __webpack_require__(/*! ./Expresion/Logica */ "lcmB");
    var {Continue} = __webpack_require__(/*! ./Expresion/Continue */ "vBMQ");
    var {Break} = __webpack_require__(/*! ./Expresion/Break */ "Px3t");
    var {Return} = __webpack_require__(/*! ./Expresion/Return */ "NOVw");
    
    
    //Carpeta Instruccion
    var {ConsoleLog} = __webpack_require__(/*! ./Instruccion/ConsoleLog */ "BLdb");
    var {Declaracion} = __webpack_require__(/*! ./Instruccion/Declaracion */ "NP5J");
    var {Asignacion} = __webpack_require__(/*! ./Instruccion/Asignacion */ "WLoS");
    var {If} = __webpack_require__(/*! ./Instruccion/If */ "Ipbx");
    var {While} = __webpack_require__(/*! ./Instruccion/While */ "cBpo");
    var {DoWhile} = __webpack_require__(/*! ./Instruccion/DoWhile */ "rKrl");
    var {For} = __webpack_require__(/*! ./Instruccion/For */ "7IgX");
    var {Switch} = __webpack_require__(/*! ./Instruccion/Switch */ "5rMc");
    var {Case} = __webpack_require__(/*! ./Instruccion/Case */ "hH/0");
    var {Ternario} = __webpack_require__(/*! ./Instruccion/Ternario */ "ZgSS");
    var {Funcion} = __webpack_require__(/*! ./Instruccion/Funcion */ "7rph");
    var {UsoFuncion} = __webpack_require__(/*! ./Instruccion/UsoFuncion */ "NOfk");
    var {graficar_ts} = __webpack_require__(/*! ./Instruccion/graficar_ts */ "2YA2");


    var errores = [];
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 27;
break;
case 1:return 28;
break;
case 2:return 70;
break;
case 3:return 72;
break;
case 4:return 71;
break;
case 5:return 73;
break;
case 6:return 'TK_ARRAY';
break;
case 7:return 'TK_ARRAY';
break;
case 8:return 46;
break;
case 9:return 47;
break;
case 10:return 78;
break;
case 11:return 75;
break;
case 12:return 74;
break;
case 13:return 76;
break;
case 14:return 77;
break;
case 15:return 79;
break;
case 16:return 84;
break;
case 17:return 85;
break;
case 18:return 82;
break;
case 19:return 81;
break;
case 20:return 83;
break;
case 21:return 80;
break;
case 22:return 88;
break;
case 23:return 87;
break;
case 24:return 86;
break;
case 25:return 52;
break;
case 26:return 53;
break;
case 27:return 54;
break;
case 28:return 7;
break;
case 29:return 8;
break;
case 30:return 41;
break;
case 31:return 38;
break;
case 32:return 43;
break;
case 33:return '.';
break;
case 34:return 63;
break;
case 35:return 65;
break;
case 36:return 48;
break;
case 37:return 51;
break;
case 38:return 58;
break;
case 39:return 61;
break;
case 40:return 57;
break;
case 41:return 56;
break;
case 42:return 64;
break;
case 43:return 'TK_IN';
break;
case 44:return 'TK_OF';
break;
case 45:return 32;
break;
case 46:return 33;
break;
case 47:return 31;
break;
case 48:return 62;
break;
case 49:return 'TK_PUSH';
break;
case 50:return 'TK_POP';
break;
case 51:return 'TK_LENGTH';
break;
case 52:return 37;
break;
case 53:return 35;
break;
case 54:return 29;
break;
case 55:return 26;
break;
case 56:return 90;
break;
case 57:return 91;
break;
case 58:return 92;
break;
case 59:return 40;
break;
case 60:return 89;
break;
case 61:return 93;
break;
case 62:
break;
case 63:errores.push(new Error("Lexico", yy_.yytext+" No pertenece al lenguaje", yy_.yylloc.first_line, yy_.yylloc.first_column));
break;
case 64:return 5;
break;
}
},
rules: [/^(?:\/\/[^\n]*)/,/^(?:\/\*(\*|\/|[^"*/"])*\*\/)/,/^(?:string\b)/,/^(?:number\b)/,/^(?:boolean\b)/,/^(?:void\b)/,/^(?:Array\b)/,/^(?:type\b)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\*\*)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:==)/,/^(?:!=)/,/^(?:>=)/,/^(?:>)/,/^(?:<=)/,/^(?:<)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:;)/,/^(?::)/,/^(?:,)/,/^(?:=)/,/^(?:\.)/,/^(?:\?)/,/^(?:function\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:do\b)/,/^(?:while\b)/,/^(?:for\b)/,/^(?:in\b)/,/^(?:of\b)/,/^(?:continue\b)/,/^(?:return\b)/,/^(?:break\b)/,/^(?:default\b)/,/^(?:push\b)/,/^(?:pop\b)/,/^(?:length\b)/,/^(?:let\b)/,/^(?:const\b)/,/^(?:console\.log\b)/,/^(?:graficar_ts\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:"((\\")?|[^\"])*")/,/^(?:[A-Za-z"_"][A-Za-z"_"0-9]*)/,/^(?:[0-9]+(\.[0-9]+)?)/,/^(?:'((\\')|[^"'"])*')/,/^(?:[ \r\t\n]+)/,/^(?:.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = gramatica;
exports.Parser = gramatica.Parser;
exports.parse = function () { return gramatica.parse.apply(gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "Ipbx":
/*!****************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/If.ts ***!
  \****************************************************/
/*! exports provided: If */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "If", function() { return If; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Tabla */ "fK0c");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");
/* harmony import */ var _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Expresion/Continue */ "vBMQ");
/* harmony import */ var _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Expresion/Break */ "Px3t");
/* harmony import */ var _Expresion_Return__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Expresion/Return */ "NOVw");







/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class If extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */
    constructor(condicion, sentenciasIF, listaIFS, sentenciasELSE, fila, columna) {
        super(null, fila, columna);
        this.condicion = condicion;
        this.sentenciasIF = sentenciasIF;
        this.listaIFS = listaIFS;
        this.sentenciasELSE = sentenciasELSE;
        this.entro = false;
    }
    ejecutar(tabla, ast) {
        this.entro = false;
        const nuevoEntorno = new _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](tabla);
        let result;
        result = this.condicion.ejecutar(nuevoEntorno, ast);
        if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
            return result;
        }
        if (this.condicion.tipo.tipo != _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__["Tipos"].BOOLEAN) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Se esperaba una expresion booleana para la condicion", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        if (result) {
            for (let i = 0; i < this.sentenciasIF.length; i++) {
                let m = this.sentenciasIF[i];
                const res = m.ejecutar(nuevoEntorno, ast);
                if (res instanceof _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__["Continue"] || res instanceof _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__["Break"] || res instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"] || res instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_6__["Return"]) {
                    return res;
                }
                if (m instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_6__["Return"]) {
                    return m;
                }
            }
            this.entro = true;
        }
        else {
            for (let i = 0; i < this.listaIFS.length; i++) {
                let m = this.listaIFS[i];
                if (m instanceof If) {
                    const res = m.ejecutar(nuevoEntorno, ast);
                    if (m.entro) {
                        this.entro = true;
                        return res;
                    }
                    if (res instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"] || res instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_6__["Return"]) {
                        return res;
                    }
                }
            }
            if (!this.entro) {
                for (let i = 0; i < this.sentenciasELSE.length; i++) {
                    let m = this.sentenciasELSE[i];
                    const res = m.ejecutar(nuevoEntorno, ast);
                    if (res instanceof _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__["Continue"] || res instanceof _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__["Break"] || res instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"] || res instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_6__["Return"]) {
                        return res;
                    }
                    if (m instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_6__["Return"]) {
                        return m;
                    }
                    this.entro = true;
                }
            }
        }
        return null;
    }
}


/***/ }),

/***/ "LRvX":
/*!*********************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Expresion/Primitivo.ts ***!
  \*********************************************************/
/*! exports provided: Primitivo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Primitivo", function() { return Primitivo; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");

/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
class Primitivo extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param tipo Tipo del valor, puede ser numero, cadena o booleano
     * @param valor Valor primitivo que crear
     * @param fila Fila de donde se creo la sentencia
     * @param columna columnaa donde se creo la sentencia
     */
    constructor(tipo, valor, fila, columna) {
        super(tipo, fila, columna);
        this.valor = valor;
    }
    /**
     * Devuelve el valor inicial e.g. 4
     * @param table Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
    ejecutar(tabla, ast) {
        return this.valor;
    }
}


/***/ }),

/***/ "LqoN":
/*!**********************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Expresion/Relacional.ts ***!
  \**********************************************************/
/*! exports provided: Relacional */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Relacional", function() { return Relacional; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");



/**
 * @class Genera un nuevo nodo expresion para realizar operaciones relacionales
 */
class Relacional extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param izquierdo Nodo expresion izquierdo
     * @param derecho Nodo expresion derecho
     * @param operador Operador
     * @param fila filaa de la operacion
     * @param columna columnaa de la operacion
     */
    constructor(izquierdo, derecho, operador, fila, columna) {
        super(new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN), fila, columna);
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.operador = operador;
    }
    ejecutar(tabla, ast) {
        const LeftResult = this.izquierdo.ejecutar(tabla, ast);
        if (LeftResult instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
            return LeftResult;
        }
        const RightResult = this.derecho.ejecutar(tabla, ast);
        if (RightResult instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
            return RightResult;
        }
        if (this.operador == '<') {
            if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                return LeftResult < RightResult;
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de tipos en MENOR QUE se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
        }
        else if (this.operador == '>') {
            if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                return LeftResult > RightResult;
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de tipos en MAYOR QUE se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
        }
        else if (this.operador == '>=') {
            if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                return LeftResult >= RightResult;
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de tipos en MAYOR IGUAL se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
        }
        else if (this.operador == '<=') {
            if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                return LeftResult <= RightResult;
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de tipos en MENOR IGUAL se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
        }
        else if (this.operador == '!=') {
            if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                return LeftResult != RightResult;
            }
            else if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].STRING && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].STRING) {
                return LeftResult != RightResult;
            }
            else if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN) {
                return LeftResult != RightResult;
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de tipos en DIFERENTE QUE se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
        }
        else if (this.operador == '==') {
            if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                return LeftResult == RightResult;
            }
            else if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].STRING && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].STRING) {
                return LeftResult == RightResult;
            }
            else if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN) {
                return LeftResult == RightResult;
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de tipos en IGUAL IGUAL se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
        }
        else {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error operador desconocido", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
    }
}


/***/ }),

/***/ "NOVw":
/*!******************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Expresion/Return.ts ***!
  \******************************************************/
/*! exports provided: Return */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Return", function() { return Return; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
class Return extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    constructor(valor, dato, fila, columna) {
        super(null, fila, columna);
        this.valor = valor;
        this.dato = null;
    }
    ejecutar(tabla, ast) {
        if (this.valor != null) {
            const result = this.valor.ejecutar(tabla, ast);
            if (result instanceof Error) {
                return result;
            }
            this.dato = result;
            this.tipo = this.valor.tipo;
            return result;
        }
        return null;
    }
}


/***/ }),

/***/ "NOfk":
/*!************************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/UsoFuncion.ts ***!
  \************************************************************/
/*! exports provided: UsoFuncion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsoFuncion", function() { return UsoFuncion; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Tabla */ "fK0c");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");
/* harmony import */ var _AST_Simbolo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AST/Simbolo */ "w77F");
/* harmony import */ var _Expresion_Identificador__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Expresion/Identificador */ "Afb6");
/* harmony import */ var _Funcion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Funcion */ "7rph");
/* harmony import */ var _Expresion_Return__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Expresion/Return */ "NOVw");








/**
 * @class Reasigna el valor de una variable existente
 */
class UsoFuncion extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identificador nombre de la variable
     * @param valor valor de la variable
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */
    constructor(identificador, parametros, fila, columna) {
        super(null, fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
        this.valor = null;
    }
    ejecutar(tabla, ast) {
        const nuevoEntorno = new _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](tabla);
        let nombre = "function_" + this.identificador;
        if (UsoFuncion.global == null) {
            let temp = tabla;
            while (tabla.anterior != null) {
                temp = tabla.anterior;
            }
            UsoFuncion.global = temp;
        }
        for (let i = 0; i < this.parametros.length; i++) {
            let m = this.parametros[i];
            const result = m.ejecutar(tabla, ast);
            if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
                return result;
            }
            nombre += '_' + m.tipo.tipo;
        }
        let variable;
        variable = UsoFuncion.global.getVariable(nombre);
        if (variable == null) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "No se ha encontrado la funcion " + this.identificador, this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        let funcion;
        if (variable.valor instanceof _Funcion__WEBPACK_IMPORTED_MODULE_6__["Funcion"]) {
            funcion = variable.valor;
            this.tipo = funcion.tipo;
        }
        for (let i = 0; i < this.parametros.length; i++) {
            let ejec = this.parametros[i];
            let enf = funcion.parametros[i];
            if (enf instanceof _Expresion_Identificador__WEBPACK_IMPORTED_MODULE_5__["Identificador"]) {
                let result = ejec.ejecutar(tabla, ast);
                if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
                    return result;
                }
                if (ejec.tipo.tipo == enf.tipo.tipo) {
                    let simbolo;
                    simbolo = new _AST_Simbolo__WEBPACK_IMPORTED_MODULE_4__["Simbolo"](ejec.tipo, enf.identificador, result, false);
                    const res = nuevoEntorno.setVariable(simbolo);
                    if (res != null) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", res, this.fila, this.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        return error;
                    }
                }
            }
        }
        for (let i = 0; i < funcion.sentencias.length; i++) {
            let m = funcion.sentencias[i];
            let result = m.ejecutar(nuevoEntorno, ast);
            if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
                return result;
            }
            else if (result instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_7__["Return"] || m instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_7__["Return"]) {
                if (m instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_7__["Return"]) {
                    result = m;
                }
                if (funcion.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__["Tipos"].VOID) {
                    if (result != null) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Error en return, no puede dovolver valor ", this.fila, this.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        return error;
                    }
                    else {
                        this.tipo = funcion.tipo;
                        return null;
                    }
                }
                else if (result.tipo.tipo == funcion.tipo.tipo) {
                    this.tipo = result.tipo;
                    if (result != null) {
                        return result.dato;
                    }
                }
            }
        }
        if (funcion.tipo.tipo != _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__["Tipos"].VOID) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Error, debe haber un return que devuelva un valor", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        return null;
    }
}


/***/ }),

/***/ "NP5J":
/*!*************************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/Declaracion.ts ***!
  \*************************************************************/
/*! exports provided: Declaracion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Declaracion", function() { return Declaracion; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");
/* harmony import */ var _AST_Simbolo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AST/Simbolo */ "w77F");
/* harmony import */ var _Expresion_Return__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Expresion/Return */ "NOVw");





/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Declaracion extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param valor valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(constante, declaraciones, fila, columna) {
        super(null, fila, columna);
        this.constante = constante;
        this.declaraciones = declaraciones;
    }
    ejecutar(tabla, ast) {
        let retorno = null;
        this.declaraciones.map((m) => {
            if (this.constante == true) {
                if (m.valor == null) {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Constante " + m.identificador + " no inicializada ", m.fila, m.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    retorno = error;
                    return error;
                }
                else {
                    let result = m.valor.ejecutar(tabla, ast);
                    if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
                        retorno = result;
                        return result;
                    }
                    if (result instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_4__["Return"] && result.valor != null) {
                        result = result.valor;
                    }
                    else {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error en el return de la funcion", this.fila, this.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        return error;
                    }
                    if (m.tipo == null) {
                        m.tipo = m.valor.tipo;
                    }
                    else if (m.tipo.tipo != m.valor.tipo.tipo) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "No se puede declarar la variable " + m.identificador + " los tipos no coinciden", m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        retorno = error;
                        return error;
                    }
                    if (m.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].VOID) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "No se puede declarar la variable con tipo void", m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        retorno = error;
                        return error;
                    }
                    let simbolo;
                    simbolo = new _AST_Simbolo__WEBPACK_IMPORTED_MODULE_3__["Simbolo"](m.tipo, m.identificador, result, this.constante);
                    const res = tabla.setVariable(simbolo);
                    if (res != null) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", res, m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        retorno = error;
                        return error;
                    }
                    return retorno;
                }
            }
            else {
                if (m.valor == null) {
                    let simbolo;
                    simbolo = new _AST_Simbolo__WEBPACK_IMPORTED_MODULE_3__["Simbolo"](m.tipo, m.identificador, null, this.constante);
                    const res = tabla.setVariable(simbolo);
                    if (res != null) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", res, m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        retorno = error;
                        return error;
                    }
                    return retorno;
                }
                else {
                    const result = m.valor.ejecutar(tabla, ast);
                    if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
                        retorno = result;
                        return result;
                    }
                    if (m.tipo == null) {
                        m.tipo = m.valor.tipo;
                    }
                    else if (m.tipo.tipo != m.valor.tipo.tipo) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "No se puede declarar la variable " + m.identificador + " porque los tipos no coinciden.", m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        retorno = error;
                        return error;
                    }
                    if (m.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].VOID) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "No se puede declarar la variable con tipo void", m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        retorno = error;
                        return error;
                    }
                    let simbolo;
                    simbolo = new _AST_Simbolo__WEBPACK_IMPORTED_MODULE_3__["Simbolo"](m.tipo, m.identificador, result, this.constante);
                    const res = tabla.setVariable(simbolo);
                    if (res != null) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", res, m.fila, m.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        retorno = error;
                        return error;
                    }
                    return retorno;
                }
            }
        });
        return retorno;
    }
    getConstante() {
        if (this.constante) {
            return "const";
        }
        else {
            return "let";
        }
    }
    ;
}


/***/ }),

/***/ "Px3t":
/*!*****************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Expresion/Break.ts ***!
  \*****************************************************/
/*! exports provided: Break */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Break", function() { return Break; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
class Break extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    constructor(fila, columna) {
        super(null, fila, columna);
    }
    ejecutar(tabla, ast) {
        return this;
    }
}


/***/ }),

/***/ "QwGs":
/*!*************************************************!*\
  !*** ./src/app/pagina/Ejecucion/graficarAST.ts ***!
  \*************************************************/
/*! exports provided: graficarAST, Nodo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graficarAST", function() { return graficarAST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nodo", function() { return Nodo; });
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AST/Error */ "RfN4");
/* harmony import */ var _Expresion_Aritmetica__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Expresion/Aritmetica */ "UO5A");
/* harmony import */ var _Expresion_Primitivo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Expresion/Primitivo */ "LRvX");
/* harmony import */ var _Expresion_Logica__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Expresion/Logica */ "lcmB");
/* harmony import */ var _Expresion_Relacional__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Expresion/Relacional */ "LqoN");
/* harmony import */ var _Expresion_Identificador__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Expresion/Identificador */ "Afb6");
/* harmony import */ var _Expresion_Continue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Expresion/Continue */ "vBMQ");
/* harmony import */ var _Expresion_Break__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Expresion/Break */ "Px3t");
/* harmony import */ var _Expresion_Return__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Expresion/Return */ "NOVw");
/* harmony import */ var _Instruccion_ConsoleLog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Instruccion/ConsoleLog */ "BLdb");
/* harmony import */ var _Instruccion_Declaracion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Instruccion/Declaracion */ "NP5J");
/* harmony import */ var _Instruccion_Asignacion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Instruccion/Asignacion */ "WLoS");
/* harmony import */ var _Instruccion_If__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Instruccion/If */ "Ipbx");
/* harmony import */ var _Instruccion_While__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Instruccion/While */ "cBpo");
/* harmony import */ var _Instruccion_DoWhile__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Instruccion/DoWhile */ "rKrl");
/* harmony import */ var _Instruccion_For__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Instruccion/For */ "7IgX");
/* harmony import */ var _Instruccion_Switch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Instruccion/Switch */ "5rMc");
/* harmony import */ var _Instruccion_Ternario__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Instruccion/Ternario */ "ZgSS");
/* harmony import */ var _Instruccion_Funcion__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Instruccion/Funcion */ "7rph");
/* harmony import */ var _Instruccion_UsoFuncion__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Instruccion/UsoFuncion */ "NOfk");
/* harmony import */ var _Instruccion_graficar_ts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Instruccion/graficar_ts */ "2YA2");

//Carpeta Expresion








//Carpeta Instruccion












class graficarAST {
    constructor(ast) {
        this.ast = ast;
        this.root = new Nodo("Root", null, []);
        let lista = new Nodo("Lista de instrucciones", this.root, []);
        for (let i = 0; i < ast.instrucciones.length; i++) {
            if (!(ast.instrucciones[i] instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_0__["Error"])) {
                lista.children.push(this.instruccion(ast.instrucciones[i]));
            }
        }
        this.root.children.push(lista);
        this.root.children.push(new Nodo("#", this.root, []));
    }
    instruccion(m) {
        let padre = new Nodo("Instruccion", null, []);
        if (m instanceof _Instruccion_Declaracion__WEBPACK_IMPORTED_MODULE_10__["Declaracion"]) {
            padre.children.push(this.declaracion(m));
        }
        else if (m instanceof _Instruccion_Asignacion__WEBPACK_IMPORTED_MODULE_11__["Asignacion"]) {
            padre.children.push(this.asignacion(m));
        }
        else if (m instanceof _Instruccion_ConsoleLog__WEBPACK_IMPORTED_MODULE_9__["ConsoleLog"]) {
            padre.children.push(this.consolelog(m));
        }
        else if (m instanceof _Instruccion_DoWhile__WEBPACK_IMPORTED_MODULE_14__["DoWhile"]) {
            padre.children.push(this.dowhile(m));
        }
        else if (m instanceof _Instruccion_For__WEBPACK_IMPORTED_MODULE_15__["For"]) {
            padre.children.push(this.for(m));
        }
        else if (m instanceof _Instruccion_If__WEBPACK_IMPORTED_MODULE_12__["If"]) {
            this.if(m, padre);
        }
        else if (m instanceof _Instruccion_Switch__WEBPACK_IMPORTED_MODULE_16__["Switch"]) {
            padre.children.push(this.switch(m));
        }
        else if (m instanceof _Instruccion_While__WEBPACK_IMPORTED_MODULE_13__["While"]) {
            padre.children.push(this.while(m));
        }
        else if (m instanceof _Expresion_Break__WEBPACK_IMPORTED_MODULE_7__["Break"]) {
            padre.children.push(this.break(m));
        }
        else if (m instanceof _Expresion_Continue__WEBPACK_IMPORTED_MODULE_6__["Continue"]) {
            padre.children.push(this.continue(m));
        }
        else if (m instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_8__["Return"]) {
            padre.children.push(this.valor(m));
        }
        else if (m instanceof _Instruccion_Funcion__WEBPACK_IMPORTED_MODULE_18__["Funcion"]) {
            padre.children.push(this.funcion(m));
        }
        else if (m instanceof _Instruccion_UsoFuncion__WEBPACK_IMPORTED_MODULE_19__["UsoFuncion"]) {
            padre.children.push(this.usofuncion(m));
        }
        else if (m instanceof _Instruccion_graficar_ts__WEBPACK_IMPORTED_MODULE_20__["graficar_ts"]) {
            padre.children.push(this.graficar_ts(m));
        }
        return padre;
    }
    graficar_ts(m) {
        let padre = new Nodo("graficar_ts", null, []);
        return padre;
    }
    usofuncion(m) {
        let padre = new Nodo("Uso de funcion " + m.identificador, null, []);
        let lista = new Nodo("Parametros", padre, []);
        m.parametros.map((p) => {
            lista.children.push(this.valor(p));
        });
        padre.children.push(lista);
        return padre;
    }
    funcion(m) {
        let padre = new Nodo("Funcion " + m.identificador, null, []);
        let lm = new Nodo("Lista de parametros", padre, []);
        m.parametros.map((p) => {
            let lista = new Nodo("Parametro", padre, []);
            lista.children.push(this.valor(p));
            lista.children.push(new Nodo("Tipo", padre, [new Nodo(p.tipo.toString(), padre, [])]));
            lm.children.push(lista);
        });
        padre.children.push(lm);
        if (m.tipo != null) {
            padre.children.push(new Nodo("Tipo", padre, [new Nodo(m.tipo.toString(), null, [])]));
        }
        let listas = new Nodo("Lista de instrucciones", padre, []);
        m.sentencias.map((p) => {
            listas.children.push(this.instruccion(p));
        });
        padre.children.push(listas);
        return padre;
    }
    ternario(m) {
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
    while(m) {
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
    switch(m) {
        let padre = new Nodo("Switch", null, []);
        let c = new Nodo("Condicion", padre, []);
        c.children.push(this.valor(m.condicion));
        padre.children.push(c);
        let listacases = new Nodo("Lista cases", padre, []);
        m.cases.map((p) => {
            let i = null;
            if (p.esDefault) {
                i = new Nodo("Default", listacases, []);
            }
            else {
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
    if(m, padre) {
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
        m.listaIFS.map((p) => {
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
    for(m) {
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
    dowhile(m) {
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
    consolelog(m) {
        let padre = new Nodo("console.log", null, []);
        padre.children.push(this.valor(m.expresion));
        return padre;
    }
    asignacion(m) {
        let padre = new Nodo("Asignacion", null, []);
        let lista = new Nodo("Lista de asignaciones", null, []);
        m.asignaciones.map((p) => {
            let a = new Nodo("asignaciones", null, []);
            a.children.push(this.identificador(p));
            if (p.valor != null) {
                let op = new Nodo("Operador", padre, [new Nodo("=", null, [])]);
                a.children.push(op);
                a.children.push(this.valor(p.valor));
            }
            lista.children.push(a);
        });
        padre.children.push(lista);
        return padre;
    }
    declaracion(m) {
        let padre = new Nodo("Declaracion", null, []);
        padre.children.push(new Nodo(m.getConstante(), padre, []));
        let lista = new Nodo("Lista de declaraciones", null, []);
        m.declaraciones.map((p) => {
            let d = new Nodo("declaracion", null, []);
            d.children.push(this.identificador(p));
            if (p.tipo != null) {
                d.children.push(new Nodo("Tipo", padre, [new Nodo(p.tipo.toString(), null, [])]));
            }
            if (p.valor != null) {
                let op = new Nodo("Operador", padre, [new Nodo("=", null, [])]);
                d.children.push(op);
                d.children.push(this.valor(p.valor));
            }
            lista.children.push(d);
        });
        padre.children.push(lista);
        return padre;
    }
    identificador(m) {
        let padre = new Nodo("Identificador", null, []);
        padre.children.push(new Nodo(m.identificador, padre, []));
        return padre;
    }
    break(m) {
        let padre = new Nodo("Break", null, []);
        return padre;
    }
    continue(m) {
        let padre = new Nodo("Continue", null, []);
        return padre;
    }
    return(m) {
        let padre = new Nodo("Return", null, []);
        if (m.valor != null) {
            padre.children.push(this.valor(m.valor));
        }
        return padre;
    }
    valor(m) {
        if (m instanceof _Expresion_Aritmetica__WEBPACK_IMPORTED_MODULE_1__["Aritmetica"]) {
            return this.aritmetico(m);
        }
        else if (m instanceof _Expresion_Logica__WEBPACK_IMPORTED_MODULE_3__["Logica"]) {
            return this.logica(m);
        }
        else if (m instanceof _Expresion_Relacional__WEBPACK_IMPORTED_MODULE_4__["Relacional"]) {
            return this.relacional(m);
        }
        else if (m instanceof _Expresion_Primitivo__WEBPACK_IMPORTED_MODULE_2__["Primitivo"]) {
            return this.primitivo(m);
        }
        if (m instanceof _Expresion_Identificador__WEBPACK_IMPORTED_MODULE_5__["Identificador"]) {
            return this.identificador(m);
        }
        if (m instanceof _Instruccion_Ternario__WEBPACK_IMPORTED_MODULE_17__["Ternario"]) {
            return this.ternario(m);
        }
        return new Nodo("ERROR", null, []);
    }
    primitivo(m) {
        let padre = new Nodo("Primitivo", null, []);
        padre.children.push(new Nodo(m.valor + "", padre, []));
        return padre;
    }
    aritmetico(m) {
        let padre = new Nodo("Aritmetica", null, []);
        let op = new Nodo("Operador", padre, [new Nodo(m.operacion, null, [])]);
        if (m.derecho != null) {
            padre.children.push(this.valor(m.izquierdo));
            padre.children.push(op);
            padre.children.push(this.valor(m.derecho));
        }
        else {
            padre.children.push(op);
            padre.children.push(this.valor(m.izquierdo));
        }
        return padre;
    }
    logica(m) {
        let padre = new Nodo("Logica", null, []);
        let op = new Nodo("Operador", padre, [new Nodo(m.operador, null, [])]);
        if (m.derecho != null) {
            padre.children.push(this.valor(m.izquierdo));
            padre.children.push(op);
            padre.children.push(this.valor(m.derecho));
        }
        else {
            padre.children.push(op);
            padre.children.push(this.valor(m.izquierdo));
        }
        return padre;
    }
    relacional(m) {
        let padre = new Nodo("Relacional", null, []);
        let op = new Nodo("Operador", padre, [new Nodo(m.operador, null, [])]);
        if (m.derecho != null) {
            padre.children.push(this.valor(m.izquierdo));
            padre.children.push(op);
            padre.children.push(this.valor(m.derecho));
        }
        else {
            padre.children.push(op);
            padre.children.push(this.valor(m.izquierdo));
        }
        return padre;
    }
}
class Nodo {
    constructor(name, parent, children) {
        this.name = name;
        this.parent = parent;
        this.children = children;
    }
}


/***/ }),

/***/ "RfN4":
/*!***********************************************!*\
  !*** ./src/app/pagina/Ejecucion/AST/Error.ts ***!
  \***********************************************/
/*! exports provided: Error */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error", function() { return Error; });
/**
 * @class Nodo para almacenar errores ya sean lexicos, sintacticos o semanticos
 */
class Error {
    /**
     * Devuelve un objeto con un nuevo objeto excepcion
     * @param type Tipo de error, e.g. (lexico, sintactico, semantico)
     * @param description Descripcion del error, e.g. (No se encontro la variable X)
     * @param line Fila donde ocurrio el error
     * @param column Columna donde ocurrio el error
     */
    constructor(tipo, descripcion, fila, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    toString() {
        return "Tipo:" + this.tipo + " Descripcion:" + this.descripcion + " Fila:" + this.fila + " Columna:" + this.columna;
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _pagina_pagina_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagina/pagina.component */ "beja");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class AppComponent {
    constructor() {
        this.title = 'Proyecto1';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-pagina");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
    } }, directives: [_pagina_pagina_component__WEBPACK_IMPORTED_MODULE_1__["PaginaComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "UO5A":
/*!**********************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Expresion/Aritmetica.ts ***!
  \**********************************************************/
/*! exports provided: Aritmetica */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Aritmetica", function() { return Aritmetica; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");



/**
 * @class Genera un nuevo nodo expresion para realizar operaciones aritmeticas
 */
class Aritmetica extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param izquierdo Nodo expresion izquierdo
     * @param derecho Nodo expresion derecho
     * @param operacion Operador
     * @param fila filaa de la operacion
     * @param columna columnaa de la operacion
     */
    constructor(izquierdo, derecho, operacion, fila, columna) {
        // Envio null porque aun no se el tipo de la operación
        super(null, fila, columna);
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.operacion = operacion;
    }
    ejecutar(tabla, ast) {
        if (this.derecho != null) {
            const operacionIzq = this.izquierdo.ejecutar(tabla, ast);
            if (operacionIzq instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
                return operacionIzq;
            }
            const operacionDer = this.derecho.ejecutar(tabla, ast);
            if (operacionDer instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
                return operacionDer;
            }
            if (this.operacion == '+') {
                if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    return operacionIzq + operacionDer;
                }
                else if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].STRING || this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].STRING) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].STRING);
                    return operacionIzq + operacionDer;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de Tipos -> se esta tratando de sumar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operacion == '-') {
                if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    return operacionIzq - operacionDer;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de Tipos -> se esta tratando de restar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operacion == '*') {
                if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    return operacionIzq * operacionDer;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de Tipos -> se esta tratando de multiplicar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operacion == '/') {
                if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    if (operacionDer == 0) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error aritmetico -> se esta tratando de dividir entre cero ", this.fila, this.columna);
                        ast.errores.push(error);
                        //ast.consola.push(error.toString());
                        return error;
                    }
                    return operacionIzq / operacionDer;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de Tipos -> se esta tratando de dividir " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operacion == '^') {
                if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    return Math.pow(operacionIzq, operacionDer);
                    //return operacionIzq ^ operacionDer;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de Tipos -> se esta tratando de elevar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operacion == '%') {
                if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    return operacionIzq % operacionDer;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de Tipos -> se esta tratando de obtener el modulo " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error, Operador desconocido", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
        }
        else {
            const operacionIzq = this.izquierdo.ejecutar(tabla, ast);
            if (operacionIzq instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
                return operacionIzq;
            }
            if (this.operacion == '-') {
                if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    return -1 * operacionIzq;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de Tipos -> el operador unario tratando de operar " + this.izquierdo.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error -> Operador desconocido", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
        }
    }
}


/***/ }),

/***/ "WLoS":
/*!************************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/Asignacion.ts ***!
  \************************************************************/
/*! exports provided: Asignacion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Asignacion", function() { return Asignacion; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Error */ "RfN4");


/**
 * @class Reasigna el valor de una variable existente
 */
class Asignacion extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identificador nombre de la variable
     * @param valor valor de la variable
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */
    constructor(asignaciones, fila, columna) {
        super(null, fila, columna);
        this.asignaciones = asignaciones;
    }
    ejecutar(tabla, ast) {
        let retorno = null;
        this.asignaciones.map((m) => {
            const result = m.valor.ejecutar(tabla, ast);
            if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
                retorno = result;
                return result;
            }
            let variable;
            variable = tabla.getVariable(m.identificador);
            if (variable == null) {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "No se ha encontrado la variable " + m.identificador, m.fila, m.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                retorno = error;
                return error;
            }
            else if (variable.constante == true) {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "No se puede asignar un nuevo valor a la constante " + m.identificador, m.fila, m.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                retorno = error;
                return error;
            }
            if (variable.tipo == null) {
                variable.tipo = m.valor.tipo;
            }
            else if (m.valor.tipo.tipo != variable.tipo.tipo) {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "No se puede asignar la variable porque los tipos no coinciden", m.fila, m.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                retorno = error;
                return error;
            }
            variable.valor = result;
            return retorno;
        });
        return retorno;
    }
}


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ctrl/ngx-codemirror */ "Xl2X");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _pagina_pagina_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pagina/pagina.component */ "beja");









class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
            _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_2__["CodemirrorModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
        _pagina_pagina_component__WEBPACK_IMPORTED_MODULE_7__["PaginaComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
        _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_2__["CodemirrorModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                    _pagina_pagina_component__WEBPACK_IMPORTED_MODULE_7__["PaginaComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
                    _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_2__["CodemirrorModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "ZgSS":
/*!**********************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/Ternario.ts ***!
  \**********************************************************/
/*! exports provided: Ternario */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ternario", function() { return Ternario; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Tabla */ "fK0c");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");




/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class Ternario extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */
    constructor(condicion, primero, segundo, fila, columna) {
        super(null, fila, columna);
        this.condicion = condicion;
        this.primero = primero;
        this.segundo = segundo;
    }
    ejecutar(tabla, ast) {
        const nuevoEntorno = new _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](tabla);
        let result;
        result = this.condicion.ejecutar(nuevoEntorno, ast);
        if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
            return result;
        }
        if (this.condicion.tipo.tipo != _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__["Tipos"].BOOLEAN) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Se esperaba una expresion booleana para la condicion", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        if (result) {
            const res = this.primero.ejecutar(nuevoEntorno, ast);
            this.tipo = this.primero.tipo;
            return res;
        }
        else {
            const res = this.segundo.ejecutar(nuevoEntorno, ast);
            this.tipo = this.segundo.tipo;
            return res;
        }
    }
}


/***/ }),

/***/ "beja":
/*!********************************************!*\
  !*** ./src/app/pagina/pagina.component.ts ***!
  \********************************************/
/*! exports provided: PaginaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginaComponent", function() { return PaginaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _Ejecucion_AST_Tabla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ejecucion/AST/Tabla */ "fK0c");
/* harmony import */ var _Ejecucion_Instruccion_Declaracion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ejecucion/Instruccion/Declaracion */ "NP5J");
/* harmony import */ var _Ejecucion_Instruccion_Funcion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ejecucion/Instruccion/Funcion */ "7rph");
/* harmony import */ var _Ejecucion_graficarAST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Ejecucion/graficarAST */ "QwGs");
/* harmony import */ var _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ctrl/ngx-codemirror */ "Xl2X");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");




//Funciones extra




const _c0 = function () { return { lineNumbers: true, theme: "3024-night", mode: "javascript" }; };
const _c1 = function () { return { lineNumbers: true, theme: "3024-night", mode: "javascript", readOnly: "true" }; };
//Analizador
var parser = __webpack_require__(/*! ./Ejecucion/gramatica.js */ "I4SB");
class PaginaComponent {
    constructor() {
        this.errores = [];
        this.ast = null;
        this.astR = null;
        this.tabla = null;
        this.vast = true;
        this.verrores = true;
        this.verent = true;
    }
    ngOnInit() {
    }
    //aqui va todo el codigo xd
    exec() {
        //var entrada = (document.getElementById("txtEntrada") as HTMLInputElement).value;
        let ast = parser.parse(this.entrada);
        this.astR = parser.parse(this.entrada);
        let tabla = new _Ejecucion_AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](null);
        ast.instrucciones.map((m) => {
            if (m instanceof _Ejecucion_Instruccion_Declaracion__WEBPACK_IMPORTED_MODULE_2__["Declaracion"] || m instanceof _Ejecucion_Instruccion_Funcion__WEBPACK_IMPORTED_MODULE_3__["Funcion"]) {
                m.ejecutar(tabla, ast);
            }
        });
        console.log(tabla);
        try {
            ast.instrucciones.map((m) => {
                if (!(m instanceof _Ejecucion_Instruccion_Declaracion__WEBPACK_IMPORTED_MODULE_2__["Declaracion"]) && !(m instanceof _Ejecucion_Instruccion_Funcion__WEBPACK_IMPORTED_MODULE_3__["Funcion"])) {
                    m.ejecutar(tabla, ast);
                }
            });
        }
        catch (error) {
        }
        console.log(ast);
        let a = "";
        ast.consola.map((m) => {
            a += m + "\n";
        });
        ast.errores.map((m) => {
            console.log(m.toString());
        });
        //var json = JSON.stringify(ast,null,3);
        //console.log(json);
        this.salida = a;
        this.ast = ast;
        this.tabla = tabla;
    }
    verAST() {
        var tree = document.getElementById('ast');
        if (this.vast && this.astR != null) {
            let n = new _Ejecucion_graficarAST__WEBPACK_IMPORTED_MODULE_4__["graficarAST"](this.astR);
            let m = n.root;
            generateTree([m]);
            tree.setAttribute('class', 'card-group p-5 visible');
            this.vast = false;
        }
        else {
            tree.setAttribute('class', 'card-group p-5 invisible');
            document.getElementById("grafo").setAttribute('width', '0');
            document.getElementById("grafo").setAttribute('height', '0');
            document.getElementById("grafo").innerHTML = "";
            this.vast = true;
        }
    }
    verErrores() {
        var tree = document.getElementById('errores');
        if (this.verrores && this.ast != null) {
            for (let index = 0; index < this.ast.errores.length; index++) {
                let error = this.ast.errores[index];
                let tr = "<tr>";
                tr += "<td>" + error.tipo + "</td>";
                tr += "<td>" + error.descripcion + "</td>";
                tr += "<td>" + error.fila + "</td>";
                tr += "<td>" + error.columna + "</td>";
                tr += "</tr>";
                document.getElementById("infoTabla").innerHTML += tr;
            }
            tree.setAttribute('class', 'card-group visible');
            this.verrores = false;
        }
        else {
            document.getElementById("infoTabla").innerHTML = "";
            tree.setAttribute('class', 'card-group invisible');
            this.verrores = true;
        }
    }
    verEntornos() {
        var tree = document.getElementById('ambitos');
        if (this.verent) {
            tree.setAttribute('class', 'card-group bg-transparent visible');
            this.verent = false;
        }
        else {
            document.getElementById("tablaambitos").innerHTML = "";
            tree.setAttribute('class', 'card-group bg-transparent invisible');
            this.verent = true;
        }
    }
    traducir() {
        let ast = parser.parse(this.entrada);
        for (let i = 0; i < ast.instrucciones.length; i++) {
            //this.analizar(ast.instrucciones[i]);
        }
    }
}
PaginaComponent.ɵfac = function PaginaComponent_Factory(t) { return new (t || PaginaComponent)(); };
PaginaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PaginaComponent, selectors: [["app-pagina"]], decls: 45, vars: 6, consts: [[1, "navbar", "navbar-light", "bg-secondary"], [1, "container"], ["role", "group", 1, "card-group", "p-5"], [1, "card", "bg-success"], ["_ngcontent-srk-c16", "", 1, "list-group-item", "list-group-item-primary", "text-center", "text-success", "bg-light"], ["_ngcontent-srk-c16", "", 1, "card-body", "p-3", "mb-2", "bg-transparent"], [3, "ngModel", "options", "ngModelChange"], ["_ngcontent-srk-c16", "", "type", "button", "id", "btnEjecutar", 1, "btn", "p-2", "mb-1", "btn-outline-success", "btn-lg", "bg-warning", "text-light", 3, "click"], ["_ngcontent-srk-c16", "", "type", "button", "id", "tbnTraducir", 1, "btn", "p-2", "mb-1", "btn-outline-success", "btn-lg", "bg-info", "text-light", 3, "click"], ["_ngcontent-srk-c16", "", 1, "card", "bg-danger"], ["_ngcontent-srk-c16", "", 1, "list-group-item", "list-group-item-primary", "text-center", "text-danger", "bg-light"], ["_ngcontent-srk-c16", "", 1, "card-body", "bg-secondary", "btn-lg", "bg-danger"], ["_ngcontent-srk-c16", "", "type", "button", "id", "btnAST", 1, "btn", "p-2", "mb-1", "btn-outline-danger", "btn-lg", "bg-primary", "text-light", 3, "click"], ["_ngcontent-srk-c16", "", "type", "button", "id", "btnErrores", 1, "btn", "p-2", "mb-1", "btn-outline-danger", "btn-lg", "bg-secondary", "text-light", 3, "click"], ["_ngcontent-srk-c16", "", "type", "button", "id", "btnEntorno", 1, "btn", "p-2", "mb-1", "btn-outline-danger", "btn-lg", "bg-success", "text-light", 3, "click"], ["role", "group", "id", "errores", 1, "card-group", "bg-transparent", "invisible"], ["_ngcontent-srk-c16", "", 1, "card", "table-responsive"], ["id", "tablaErrores", 1, "table", "table-bordered", "table-striped", "text-center"], ["scope", "col"], ["id", "infoTabla"], ["role", "group", 1, "card-group", "bg-transparent"], ["role", "group", "id", "ambitos", 1, "card-group", "bg-transparent", "invisible"], ["_ngcontent-srk-c16", "", "id", "tablaambitos", 1, "card", "table-responsive"], ["role", "group", "id", "ast", 1, "card-group", "p-5", "invisible"], ["_ngcontent-srk-c16", "", 1, "card", "bg-transparent"]], template: function PaginaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "MatrioshTS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Entrada");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "ngx-codemirror", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PaginaComponent_Template_ngx_codemirror_ngModelChange_9_listener($event) { return ctx.entrada = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PaginaComponent_Template_button_click_10_listener() { return ctx.exec(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Ejecutar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PaginaComponent_Template_button_click_12_listener() { return ctx.traducir(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Traducir");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h4", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Salida");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "ngx-codemirror", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PaginaComponent_Template_ngx_codemirror_ngModelChange_18_listener($event) { return ctx.salida = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PaginaComponent_Template_button_click_19_listener() { return ctx.verAST(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "AST");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PaginaComponent_Template_button_click_21_listener() { return ctx.verErrores(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Errores");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PaginaComponent_Template_button_click_23_listener() { return ctx.verEntornos(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Entornos");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "table", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "th", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Tipo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "th", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Descripcion");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "th", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Fila");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "th", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Columna");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "tbody", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "svg");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.entrada)("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](4, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.salida)("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c1));
    } }, directives: [_ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__["CodemirrorComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2luYS9wYWdpbmEuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PaginaComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pagina',
                templateUrl: './pagina.component.html',
                styleUrls: ['./pagina.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "cBpo":
/*!*******************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/While.ts ***!
  \*******************************************************/
/*! exports provided: While */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "While", function() { return While; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Tabla */ "fK0c");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");
/* harmony import */ var _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Expresion/Continue */ "vBMQ");
/* harmony import */ var _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Expresion/Break */ "Px3t");
/* harmony import */ var _Expresion_Return__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Expresion/Return */ "NOVw");







/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class While extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */
    constructor(condicion, sentencias, fila, columna) {
        super(null, fila, columna);
        this.condicion = condicion;
        this.sentencias = sentencias;
    }
    ejecutar(tabla, ast) {
        let enciclado = 0;
        for (let index = 0; index <= 10000; index++) {
            const nuevoEntorno = new _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](tabla);
            let result;
            result = this.condicion.ejecutar(nuevoEntorno, ast);
            if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
                return result;
            }
            if (this.condicion.tipo.tipo != _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__["Tipos"].BOOLEAN) {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Se esperaba una expresion booleana para la condicion", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
            if (result) {
                for (let i = 0; i < this.sentencias.length; i++) {
                    let m = this.sentencias[i];
                    const res = m.ejecutar(nuevoEntorno, ast);
                    if (res instanceof _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__["Continue"] || res instanceof _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__["Break"] || res instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"] || res instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_6__["Return"]) {
                        index = 10000;
                        return res;
                    }
                    if (m instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_6__["Return"]) {
                        return m;
                    }
                }
            }
            else {
                break;
            }
            enciclado = index;
        }
        if (enciclado == 10000) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Se ha enciclado la sentencia While", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        else {
            return null;
        }
    }
}


/***/ }),

/***/ "fK0c":
/*!***********************************************!*\
  !*** ./src/app/pagina/Ejecucion/AST/Tabla.ts ***!
  \***********************************************/
/*! exports provided: Tabla */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tabla", function() { return Tabla; });
/**
 * @class En esta clase es donde vamos a guardar y obtener las variables y funciones
 */
class Tabla {
    /**
     * @constructor Crea una nueva tabla
     * @param Previous Tabla anterior para manejar los ambitos
     */
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
    }
    /**
     *
     * @method setVariable Almacena una variable, si ya existe arroja error
     * @param simbol Simbolo que contiene la informacion de la variable a almacenar
     */
    setVariable(simbolo) {
        let env = this;
        //for(env = this; env != null; env = env.anterior){
        for (let key of Array.from(env.variables.keys())) {
            if (key == simbolo.id) {
                return "La variable " + key + " ya ha sido declarada";
            }
        }
        //}
        this.variables.set(simbolo.id, simbolo);
        return null;
    }
    /**
     *
     * @method getVariable Obtiene una variable dentro de la tabla de simbolos
     * @param identifier Nombre de la variable a obtener
     */
    getVariable(id) {
        let env;
        for (env = this; env != null; env = env.anterior) {
            for (let key of Array.from(env.variables.keys())) {
                if (key == id) {
                    return env.variables.get(key);
                }
            }
        }
        return null;
    }
}


/***/ }),

/***/ "hH/0":
/*!******************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/Case.ts ***!
  \******************************************************/
/*! exports provided: Case */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Case", function() { return Case; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Tabla */ "fK0c");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _Expresion_Continue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Expresion/Continue */ "vBMQ");
/* harmony import */ var _Expresion_Break__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Expresion/Break */ "Px3t");
/* harmony import */ var _Expresion_Return__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Expresion/Return */ "NOVw");






/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class Case extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */
    constructor(esDefault, condicion, sentencias, fila, columna) {
        super(null, fila, columna);
        this.esDefault = esDefault;
        this.condicion = condicion;
        this.sentencias = sentencias;
    }
    ejecutar(tabla, ast) {
        const nuevoEntorno = new _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](tabla);
        for (let i = 0; i < this.sentencias.length; i++) {
            let m = this.sentencias[i];
            const res = m.ejecutar(nuevoEntorno, ast);
            if (res instanceof _Expresion_Continue__WEBPACK_IMPORTED_MODULE_3__["Continue"] || res instanceof _Expresion_Break__WEBPACK_IMPORTED_MODULE_4__["Break"] || res instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"] || res instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_5__["Return"]) {
                return res;
            }
            if (m instanceof _Expresion_Return__WEBPACK_IMPORTED_MODULE_5__["Return"]) {
                return m;
            }
        }
        return null;
    }
}


/***/ }),

/***/ "lcmB":
/*!******************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Expresion/Logica.ts ***!
  \******************************************************/
/*! exports provided: Logica */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logica", function() { return Logica; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");



/**
 * @class Genera un nuevo nodo expresion para realizar operaciones logicas
 */
class Logica extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param izquierdo Nodo expresion izquierdo
     * @param derecho Nodo expresion derecho
     * @param operador Operador
     * @param fila filaa de la operacion
     * @param columna columnaa de la operacion
     */
    constructor(izquierdo, derecho, operador, fila, columna) {
        super(new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN), fila, columna);
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.operador = operador;
    }
    ejecutar(tabla, ast) {
        if (this.derecho != null) {
            const LeftResult = this.izquierdo.ejecutar(tabla, ast);
            if (LeftResult instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
                return LeftResult;
            }
            const RightResult = this.derecho.ejecutar(tabla, ast);
            if (RightResult instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
                return RightResult;
            }
            if (this.operador == '||') {
                if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN) {
                    return LeftResult || RightResult;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de tipos en OR se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.tostring());
                    return error;
                }
            }
            else if (this.operador == '&&') {
                if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN && this.derecho.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN) {
                    return LeftResult && RightResult;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de tipos en AND se esta tratando de operar " + this.izquierdo.tipo.toString() + " y " + this.derecho.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.tostring());
                    return error;
                }
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error, Operador desconocido", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.tostring());
                return error;
            }
        }
        else {
            const LeftResult = this.izquierdo.ejecutar(tabla, ast);
            if (LeftResult instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
                return LeftResult;
            }
            if (this.operador == '!') {
                if (this.izquierdo.tipo.tipo == _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].BOOLEAN) {
                    return !LeftResult;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error de tipos en el operador NOT se esta tratando de operar" + this.izquierdo.tipo.toString(), this.fila, this.columna);
                    ast.errores.push(error);
                    //ast.consola.push(error.tostring());
                    return error;
                }
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]("Semantico", "Error, Operador desconocido", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.tostring());
                return error;
            }
        }
    }
}


/***/ }),

/***/ "rKrl":
/*!*********************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Instruccion/DoWhile.ts ***!
  \*********************************************************/
/*! exports provided: DoWhile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoWhile", function() { return DoWhile; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");
/* harmony import */ var _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Tabla */ "fK0c");
/* harmony import */ var _AST_Error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AST/Error */ "RfN4");
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");
/* harmony import */ var _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Expresion/Continue */ "vBMQ");
/* harmony import */ var _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Expresion/Break */ "Px3t");






/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class DoWhile extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condicion Condicion que debe ser tipo boolean
     * @param listaIFS Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param sentenciasELSE Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param fila filaa de la sentencia if
     * @param columna columnaa de la sentencia if
     */
    constructor(condicion, sentencias, fila, columna) {
        super(null, fila, columna);
        this.condicion = condicion;
        this.sentencias = sentencias;
    }
    ejecutar(tabla, ast) {
        let enciclado = 0;
        for (let index = 0; index <= 10000; index++) {
            const nuevoEntorno = new _AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](tabla);
            for (let i = 0; i < this.sentencias.length; i++) {
                let m = this.sentencias[i];
                const res = m.ejecutar(nuevoEntorno, ast);
                if (res instanceof _Expresion_Continue__WEBPACK_IMPORTED_MODULE_4__["Continue"] || res instanceof _Expresion_Break__WEBPACK_IMPORTED_MODULE_5__["Break"] || res instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
                    index = 10000;
                    return res;
                }
            }
            let result;
            result = this.condicion.ejecutar(nuevoEntorno, ast);
            if (result instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]) {
                return result;
            }
            if (this.condicion.tipo.tipo != _AST_Tipo__WEBPACK_IMPORTED_MODULE_3__["Tipos"].BOOLEAN) {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Se esperaba una expresion booleana para la condicion", this.fila, this.columna);
                ast.errores.push(error);
                //ast.consola.push(error.toString());
                return error;
            }
            if (!result) {
                return null;
            }
            enciclado = index;
        }
        if (enciclado == 10000) {
            const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_2__["Error"]("Semantico", "Se ha enciclado la sentencia Do While", this.fila, this.columna);
            ast.errores.push(error);
            //ast.consola.push(error.toString());
            return error;
        }
        else {
            return null;
        }
    }
}


/***/ }),

/***/ "sCyZ":
/*!*********************************************!*\
  !*** ./src/app/pagina/Ejecucion/AST/AST.ts ***!
  \*********************************************/
/*! exports provided: AST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AST", function() { return AST; });
/**
 * @class Almacena el ast y ademas la lista de excepciones
 */
class AST {
    /**
     * Retorna un arbol con 2 atributos: 1 ast y 1 lista de excepciones
     * @param instructions AST generado por la gramatica
     */
    constructor(instrucciones, errores) {
        this.instrucciones = instrucciones;
        this.errores = errores;
        this.consola = [];
    }
}


/***/ }),

/***/ "vBMQ":
/*!********************************************************!*\
  !*** ./src/app/pagina/Ejecucion/Expresion/Continue.ts ***!
  \********************************************************/
/*! exports provided: Continue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Continue", function() { return Continue; });
/* harmony import */ var _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/NodoAST */ "+1g/");

/**
 * @class Nodo expresion ontinue, nos indica cuando terminar un ciclo
 */
class Continue extends _AST_NodoAST__WEBPACK_IMPORTED_MODULE_0__["NodoAST"] {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    constructor(fila, columna) {
        super(null, fila, columna);
    }
    ejecutar(tabla, ast) {
        return this;
    }
}


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "w77F":
/*!*************************************************!*\
  !*** ./src/app/pagina/Ejecucion/AST/Simbolo.ts ***!
  \*************************************************/
/*! exports provided: Simbolo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Simbolo", function() { return Simbolo; });
/**
 * @class Esta clase me permite almacenar nodos en mis tablas de simbolos y de funciones
 */
class Simbolo {
    /**
     * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
     * @param type Tipo de la varible o funcion
     * @param identifier Nombre de la variable o funcion
     * @param value Valor de la variable u objeto completo de la función
     */
    constructor(tipo, id, valor, constante) {
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
        this.constante = constante;
    }
    getconstante() {
        if (this.constante) {
            return "const";
        }
        else {
            return "let";
        }
    }
}


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codemirror/mode/javascript/javascript */ "+dQi");
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! codemirror/mode/markdown/markdown */ "lZu9");
/* harmony import */ var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");






if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map