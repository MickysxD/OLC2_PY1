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
/* harmony import */ var _AST_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Tipo */ "EsxH");


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
        super(new _AST_Tipo__WEBPACK_IMPORTED_MODULE_1__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_1__["Tipos"].VOID), fila, columna);
        this.expresion = expresion;
    }
    ejecutar(tabla, ast) {
        const value = this.expresion.ejecutar(tabla, ast);
        ast.consola.push(value);
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
            return 'boolean';
        }
        else if (this.tipo === Tipos.NUMBER) {
            return 'numeric';
        }
        else if (this.tipo === Tipos.STRING) {
            return 'string';
        }
        else if (this.tipo === Tipos.VOID) {
            return 'void';
        }
        else if (this.tipo === Tipos.TYPE) {
            return 'type';
        }
        else if (this.tipo === Tipos.ARRAY) {
            return 'Array';
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[5,11],$V2=[1,18],$V3=[1,11],$V4=[1,12],$V5=[1,13],$V6=[1,14],$V7=[1,15],$V8=[1,16],$V9=[1,17],$Va=[1,21],$Vb=[1,20],$Vc=[1,22],$Vd=[1,23],$Ve=[14,15,17,18,19],$Vf=[14,15,17];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"INSTRUCCIONES":4,"EOF":5,"ERR":6,"}":7,";":8,"INSTRUCCION":9,"CONSOLE":10,"TK_CONSOLE":11,"(":12,"EXPRESION":13,")":14,"-":15,"!":16,"+":17,"*":18,"/":19,"TK_NUMERO":20,"TK_TRUE":21,"TK_FALSE":22,"TK_CADENAC":23,"TK_CADENAS":24,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"}",8:";",11:"TK_CONSOLE",12:"(",14:")",15:"-",16:"!",17:"+",18:"*",19:"/",20:"TK_NUMERO",21:"TK_TRUE",22:"TK_FALSE",23:"TK_CADENAC",24:"TK_CADENAS"},
productions_: [0,[3,2],[3,1],[6,2],[6,2],[4,2],[4,1],[9,1],[10,5],[13,2],[13,2],[13,3],[13,3],[13,3],[13,3],[13,1],[13,1],[13,1],[13,1],[13,1],[13,3]],
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
this.$ = new Error("Sintactico", $$[$0-1].yyreport_syntax_error, _$[$0-1].first_line, _$[$0-1].first_column);
break;
case 5:
this.$ = $$[$0-1]; this.$.push($$[$0]);
break;
case 6:
this.$ = [$$[$0]];
break;
case 7:
this.$ = $$[$0];
break;
case 8:
this.$ = new ConsoleLog($$[$0-2], _$[$0-4].first_line, _$[$0-4].first_column);
break;
case 9:
 this.$ = new Aritmetica($$[$0-1], null, '-', _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 10:
 this.$ = new Aritmetica($$[$0-1], null, '!', _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 11:
 this.$ = new Aritmetica($$[$0-2], $$[$0], '+', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 12:
 this.$ = new Aritmetica($$[$0-2], $$[$0], '-', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 13:
 this.$ = new Aritmetica($$[$0-2], $$[$0], '*', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 14:
 this.$ = new Aritmetica($$[$0-2], $$[$0], '/', _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 15:
 this.$ = new Primitivo(new Tipo(Tipos.NUMBER), Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 16:
 this.$ = new Primitivo(new Tipo(Tipos.BOOLEAN), true, _$[$0].first_line, _$[$0].first_column); 
break;
case 17:
 this.$ = new Primitivo(new Tipo(Tipos.BOOLEAN), false, _$[$0].first_line, _$[$0].first_column); 
break;
case 18:
 this.$ = new Primitivo(new Tipo(Tipos.STRING), $$[$0].replace(/\"/g,""), _$[$0].first_line, _$[$0].first_column); 
break;
case 19:
 this.$ = new Primitivo(new Tipo(Tipos.STRING), $$[$0].replace(/\'/g,""), _$[$0].first_line, _$[$0].first_column); 
break;
case 20:
 this.$ = $$[$0-1]; 
break;
}
},
table: [{3:1,4:2,5:[1,3],9:4,10:5,11:$V0},{1:[3]},{5:[1,7],9:8,10:5,11:$V0},{1:[2,2]},o($V1,[2,6]),o($V1,[2,7]),{12:[1,9]},{1:[2,1]},o($V1,[2,5]),{12:$V2,13:10,15:$V3,16:$V4,20:$V5,21:$V6,22:$V7,23:$V8,24:$V9},{14:[1,19],15:$Va,17:$Vb,18:$Vc,19:$Vd},{12:$V2,13:24,15:$V3,16:$V4,20:$V5,21:$V6,22:$V7,23:$V8,24:$V9},{12:$V2,13:25,15:$V3,16:$V4,20:$V5,21:$V6,22:$V7,23:$V8,24:$V9},o($Ve,[2,15]),o($Ve,[2,16]),o($Ve,[2,17]),o($Ve,[2,18]),o($Ve,[2,19]),{12:$V2,13:26,15:$V3,16:$V4,20:$V5,21:$V6,22:$V7,23:$V8,24:$V9},{8:[1,27]},{12:$V2,13:28,15:$V3,16:$V4,20:$V5,21:$V6,22:$V7,23:$V8,24:$V9},{12:$V2,13:29,15:$V3,16:$V4,20:$V5,21:$V6,22:$V7,23:$V8,24:$V9},{12:$V2,13:30,15:$V3,16:$V4,20:$V5,21:$V6,22:$V7,23:$V8,24:$V9},{12:$V2,13:31,15:$V3,16:$V4,20:$V5,21:$V6,22:$V7,23:$V8,24:$V9},o($Ve,[2,9]),o($Ve,[2,10]),{14:[1,32],15:$Va,17:$Vb,18:$Vc,19:$Vd},o($V1,[2,8]),o($Vf,[2,11],{18:$Vc,19:$Vd}),o($Vf,[2,12],{18:$Vc,19:$Vd}),o($Ve,[2,13]),o($Ve,[2,14]),o($Ve,[2,20])],
defaultActions: {3:[2,2],7:[2,1]},
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
    
    
    //Carpeta Instruccion
    var {ConsoleLog} = __webpack_require__(/*! ./Instruccion/ConsoleLog */ "BLdb");


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
case 0:return 'TK_CL';
break;
case 1:return 'TK_CM';
break;
case 2:return 'TK_STRING';
break;
case 3:return 'TK_NUMBER';
break;
case 4:return 'TK_BOOLEAN';
break;
case 5:return 'TK_VOID';
break;
case 6:return 'TK_ARRAY';
break;
case 7:return 'TK_ARRAY';
break;
case 8:return '++';
break;
case 9:return '--';
break;
case 10:return 17;
break;
case 11:return 15;
break;
case 12:return 18;
break;
case 13:return 19;
break;
case 14:return '^';
break;
case 15:return '%';
break;
case 16:return '==';
break;
case 17:return '!=';
break;
case 18:return '>=';
break;
case 19:return '>';
break;
case 20:return '<=';
break;
case 21:return '<';
break;
case 22:return '&&';
break;
case 23:return '||';
break;
case 24:return 16;
break;
case 25:return 12;
break;
case 26:return 14;
break;
case 27:return '{';
break;
case 28:return 7;
break;
case 29:return 8;
break;
case 30:return ':';
break;
case 31:return ',';
break;
case 32:return '=';
break;
case 33:return '.';
break;
case 34:return 'TK_FUNCTION';
break;
case 35:return 'TK_IF';
break;
case 36:return 'TK_ELSE';
break;
case 37:return 'TK_SWITCH';
break;
case 38:return 'TK_CASE';
break;
case 39:return 'TK_DO';
break;
case 40:return 'TK_WHILE';
break;
case 41:return 'TK_FOR';
break;
case 42:return 'TK_IN';
break;
case 43:return 'TK_OF';
break;
case 44:return 'TK_CONTINUE';
break;
case 45:return 'TK_RETURN';
break;
case 46:return 'TK_BREAK';
break;
case 47:return 'TK_DEFAULT';
break;
case 48:return 'TK_PUSH';
break;
case 49:return 'TK_POP';
break;
case 50:return 'TK_LENGTH';
break;
case 51:return 'TK_LET';
break;
case 52:return 'TK_CONST';
break;
case 53:return 11;
break;
case 54:return 'TK_GRAFICAR';
break;
case 55:return 21;
break;
case 56:return 22;
break;
case 57:return 23;
break;
case 58:return 'TK_ID';
break;
case 59:return 20;
break;
case 60:return 24;
break;
case 61:
break;
case 62:errores.push(new Error("Lexico", yy_.yytext+" No pertenece al lenguaje", yy_.yylloc.first_line, yy_.yylloc.first_column));
break;
case 63:return 5;
break;
}
},
rules: [/^(?:\/\/[^\n]*)/,/^(?:\/\*(\*|\/|[^"*/"])*\*\/)/,/^(?:string\b)/,/^(?:number\b)/,/^(?:boolean\b)/,/^(?:void\b)/,/^(?:Array\b)/,/^(?:type\b)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:\^)/,/^(?:%)/,/^(?:==)/,/^(?:!=)/,/^(?:>=)/,/^(?:>)/,/^(?:<=)/,/^(?:<)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:;)/,/^(?::)/,/^(?:,)/,/^(?:=)/,/^(?:\.)/,/^(?:function\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:do\b)/,/^(?:while\b)/,/^(?:for\b)/,/^(?:in\b)/,/^(?:of\b)/,/^(?:continue\b)/,/^(?:return\b)/,/^(?:break\b)/,/^(?:default\b)/,/^(?:push\b)/,/^(?:pop\b)/,/^(?:length\b)/,/^(?:let\b)/,/^(?:const\b)/,/^(?:console\.log\b)/,/^(?:graficar_ts\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:"((\\")?|[^\"])*")/,/^(?:[A-Za-z"_"][A-Za-z"_"0-9]*)/,/^(?:[0-9]+(\.[0-9]+)?)/,/^(?:'((\\')|[^"'"])*')/,/^(?:[ \r\t\n]+)/,/^(?:.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],"inclusive":true}}
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
        return `${this.tipo} ${this.descripcion} ${this.fila} ${this.columna}`;
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
            if (this.operacion === '+') {
                if (this.izquierdo.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    return operacionIzq + operacionDer;
                }
                else if (this.izquierdo.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].STRING || this.derecho.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].STRING) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].STRING);
                    return operacionIzq + operacionDer;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', `Error de Tipos en la suma se esta tratando de operar ${this.izquierdo.tipo.tipo} y ${this.derecho.tipo.tipo}`, this.fila, this.columna);
                    ast.errores.push(error);
                    ast.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operacion === '-') {
                if (this.izquierdo.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    return operacionIzq - operacionDer;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', `Error de Tipos en la resta se esta tratando de operar ${this.izquierdo.tipo.tipo} y ${this.derecho.tipo.tipo}`, this.fila, this.columna);
                    ast.errores.push(error);
                    ast.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operacion === '*') {
                if (this.izquierdo.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    return operacionIzq * operacionDer;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', `Error de Tipos en la multiplicacion se esta tratando de operar ${this.izquierdo.tipo.tipo} y ${this.derecho.tipo.tipo}`, this.fila, this.columna);
                    ast.errores.push(error);
                    ast.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operacion === '/') {
                if (this.izquierdo.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER && this.derecho.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    if (operacionDer === 0) {
                        const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', `Error aritmetico, La division con cero no esta permitida`, this.fila, this.columna);
                        ast.errores.push(error);
                        ast.consola.push(error.toString());
                        return error;
                    }
                    return operacionIzq / operacionDer;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', `Error de Tipos en la division se esta tratando de operar ${this.izquierdo.tipo.tipo} y ${this.derecho.tipo.tipo}`, this.fila, this.columna);
                    ast.errores.push(error);
                    ast.consola.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', `Error, Operador desconocido`, this.fila, this.columna);
                ast.errores.push(error);
                ast.consola.push(error.toString());
                return error;
            }
        }
        else {
            const operacionIzq = this.izquierdo.ejecutar(tabla, ast);
            if (operacionIzq instanceof _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
                return operacionIzq;
            }
            if (this.operacion === '-') {
                if (this.izquierdo.tipo.tipo === _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER) {
                    this.tipo = new _AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_AST_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipos"].NUMBER);
                    return -1 * operacionIzq;
                }
                else {
                    const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', `Error de Tipos en el operador unario se esta tratando de operar ${this.izquierdo.tipo.tipo}`, this.fila, this.columna);
                    ast.errores.push(error);
                    ast.consola.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new _AST_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', `Error, Operador desconocido`, this.fila, this.columna);
                ast.errores.push(error);
                ast.consola.push(error.toString());
                return error;
            }
        }
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
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _pagina_pagina_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pagina/pagina.component */ "beja");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _pagina_pagina_component__WEBPACK_IMPORTED_MODULE_4__["PaginaComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _pagina_pagina_component__WEBPACK_IMPORTED_MODULE_4__["PaginaComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


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
/* harmony import */ var _Ejecucion_Instruccion_ConsoleLog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ejecucion/Instruccion/ConsoleLog */ "BLdb");


//Carpeta Instruccion


//Analizador
var parser = __webpack_require__(/*! ./Ejecucion/gramatica.js */ "I4SB");
class PaginaComponent {
    constructor() { }
    ngOnInit() {
    }
    //aqui va todo el codigo xd
    exec() {
        var entrada = document.getElementById("txtEntrada").value;
        let ast = parser.parse(entrada);
        let tabla = new _Ejecucion_AST_Tabla__WEBPACK_IMPORTED_MODULE_1__["Tabla"](null);
        ast.instrucciones.map((m) => {
            if (m instanceof _Ejecucion_Instruccion_ConsoleLog__WEBPACK_IMPORTED_MODULE_2__["ConsoleLog"]) {
                m.ejecutar(tabla, ast);
            }
        });
        let a = "";
        //console.log(2+2);
        ast.consola.map((m) => {
            a += m + "\n";
        });
        var json = JSON.stringify(ast, null, 3);
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
PaginaComponent.ɵfac = function PaginaComponent_Factory(t) { return new (t || PaginaComponent)(); };
PaginaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PaginaComponent, selectors: [["app-pagina"]], decls: 27, vars: 0, consts: [[1, "navbar", "navbar-light", "bg-secondary"], [1, "container"], ["href", "#", 1, "navbar-brand"], ["role", "group", 1, "card-group", "p-5"], [1, "card", "bg-success"], ["_ngcontent-srk-c16", "", 1, "list-group-item", "list-group-item-primary", "text-center", "text-success", "bg-light"], ["_ngcontent-srk-c16", "", 1, "card-body", "p-3", "mb-2", "bg-transparent"], ["_ngcontent-srk-c16", "", "id", "txtEntrada", "rows", "15", 1, "form-control", "ng-pristine", "ng-valid", "ng-touched", "bg-dark", "text-light"], ["_ngcontent-srk-c16", "", "type", "button", "id", "btnEjecutar", 1, "btn", "p-2", "mb-1", "btn-outline-success", "btn-lg", "bg-warning", "text-light", 3, "click"], ["_ngcontent-srk-c16", "", "type", "button", "id", "tbnTraducir", 1, "btn", "p-2", "mb-1", "btn-outline-success", "btn-lg", "bg-info", "text-light"], ["_ngcontent-srk-c16", "", 1, "card", "bg-danger"], ["_ngcontent-srk-c16", "", 1, "list-group-item", "list-group-item-primary", "text-center", "text-danger", "bg-light"], ["_ngcontent-srk-c16", "", 1, "card-body", "bg-secondary", "btn-lg", "bg-danger"], ["_ngcontent-srk-c16", "", "readonly", "", "id", "txtSalida", "rows", "15", 1, "form-control", "ng-pristine", "ng-valid", "ng-touched", "bg-dark", "text-light"], ["_ngcontent-srk-c16", "", "type", "button", "id", "btnAST", 1, "btn", "p-2", "mb-1", "btn-outline-danger", "btn-lg", "bg-primary", "text-light"], ["_ngcontent-srk-c16", "", "type", "button", "id", "btnErrores", 1, "btn", "p-2", "mb-1", "btn-outline-danger", "btn-lg", "bg-secondary", "text-light"], ["id", "salidaAST", 1, "card", "bg-transparent"]], template: function PaginaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "MatrioshTS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h4", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Entrada");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "textarea", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "console.log(2+2);\n                console.log(2+2);\n            ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PaginaComponent_Template_button_click_12_listener() { return ctx.exec(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Ejecutar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Traducir");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Salida");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "textarea", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "AST");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Errores");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2luYS9wYWdpbmEuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PaginaComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pagina',
                templateUrl: './pagina.component.html',
                styleUrls: ['./pagina.component.css']
            }]
    }], function () { return []; }, null); })();


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
        let env;
        for (env = this; env != null; env = env.anterior) {
            for (let key of Array.from(env.variables.keys())) {
                if (key === simbolo.id) {
                    return `La variable ${key} ya ha sido declarada.`;
                }
            }
        }
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
                if (key === id) {
                    return env.variables.get(key);
                }
            }
        }
        return null;
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
    constructor(tipo, id, valor) {
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
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
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
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