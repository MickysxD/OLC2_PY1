/*imports var nombre = require("direccion")*/
%{
    //Carpeta AST
    var {AST} = require("./AST/AST");
    var {Error} = require("./AST/Error");
    var {NodoAST} = require("./AST/NodoAST");
    var {Simbolo} = require("./AST/Simbolo");
    var {Tabla} = require("./AST/Tabla");
    var {Tipo,Tipos} = require("./AST/Tipo");
    

    //Carpeta Expresion
    var {Aritmetica} = require("./Expresion/Aritmetica");
    var {Primitivo} = require("./Expresion/Primitivo");
    var {Identificador} = require("./Expresion/Identificador");
    var {Relacional} = require("./Expresion/Relacional");
    var {Logica} = require("./Expresion/Logica");
    var {Continue} = require("./Expresion/Continue");
    var {Break} = require("./Expresion/Break");
    var {Return} = require("./Expresion/Return");
    
    
    //Carpeta Instruccion
    var {ConsoleLog} = require("./Instruccion/ConsoleLog");
    var {Declaracion} = require("./Instruccion/Declaracion");
    var {Asignacion} = require("./Instruccion/Asignacion");
    var {If} = require("./Instruccion/If");
    var {While} = require("./Instruccion/While");
    var {DoWhile} = require("./Instruccion/DoWhile");
    var {For} = require("./Instruccion/For");
    var {Switch} = require("./Instruccion/Switch");
    var {Case} = require("./Instruccion/Case");
    var {Ternario} = require("./Instruccion/Ternario");
    var {Funcion} = require("./Instruccion/Funcion");
    var {UsoFuncion} = require("./Instruccion/UsoFuncion");


    var errores = [];
%}

%options case-sensitive

/*analizador lexico*/
%lex
%%

//comentarios
"//"[^\n]*                      return 'TK_CL';
"/*"("*"|"/"|[^"*/"])*"*/"      return 'TK_CM';


//Tipos de datos
"string"                        return 'TK_STRING';
"number"                        return 'TK_NUMBER';
"boolean"                       return 'TK_BOOLEAN';
"void"                          return 'TK_VOID';
"Array"                         return 'TK_ARRAY';
"type"                          return 'TK_ARRAY';


//Tipos de operadores
"++"                            return '++';
"--"                            return '--';
"**"                            return '^';
"+"                             return '+';
"-"                             return '-';
"*"                             return '*';
"/"                             return '/';
"%"                             return '%';


//Tipos de relacionales y logicos
"=="                            return '==';
"!="                            return '!=';
">="                            return '>=';
">"                             return '>';
"<="                            return '<=';
"<"                             return '<';
"&&"                            return '&&';
"||"                            return '||';
"!"                             return '!';


//Simbolos
"("                             return '(';
")"                             return ')';
"{"                             return '{';
"}"                             return '}';
";"                             return ';';
":"                             return ':';
","                             return ',';
"="                             return '=';
"."                             return '.';
"?"                             return '?';

//Palabras reservadas
"function"                      return 'TK_FUNCTION';

"if"                            return 'TK_IF';
"else"                          return 'TK_ELSE';

"switch"                        return 'TK_SWITCH';
"case"                          return 'TK_CASE';

"do"                            return 'TK_DO';
"while"                         return 'TK_WHILE';

"for"                           return 'TK_FOR';
"in"                            return 'TK_IN';
"of"                            return 'TK_OF';

"continue"                      return 'TK_CONTINUE';
"return"                        return 'TK_RETURN';
"break"                         return 'TK_BREAK';
"default"                       return 'TK_DEFAULT';

"push"                          return 'TK_PUSH';
"pop"                           return 'TK_POP';
"length"                        return 'TK_LENGTH';
"let"                           return 'TK_LET';
"const"                         return 'TK_CONST';

"console.log"                   return 'TK_CONSOLE';
"graficar_ts"                   return 'TK_GRAFICAR';

"true"                          return 'TK_TRUE';
"false"                         return 'TK_FALSE';


//Texto Id Num Char
\"((\\\")?|[^\"])*\"           return 'TK_CADENAC';
[A-Za-z"_"][A-Za-z"_"0-9]*     return 'TK_ID';
[0-9]+("."[0-9]+)?             return 'TK_NUMERO';
"'"((\\\')|[^"'"])*"'"         return 'TK_CADENAS';

//info a oviar
[ \r\t\n]+                      {}


//Terminacion y erroes
//.                           {console.log(yytext);}
.                              {errores.push(new Error("Lexico", yytext+" No pertenece al lenguaje", yylloc.first_line, yylloc.first_column));}
<<EOF>>                        {return 'EOF';}


/lex


/*Precedencias*/
%left   '?' //':' ','
%left   '||'
%left   '&&'

%left   '!=' '=='
%left   '<' '>' '<=' '>='

%left   '+' '-'
%left   '*' '/'
%left   '^' '%'

%left   '!'

%left   UMENOS

/*analizador sintactico*/
%start S

%%

//Comienzo
S: INSTRUCCIONES EOF     {$$ = new AST($1, errores); errores = []; return $$;}
 | EOF                   {$$ = new AST([], errores); errores = []; return $$;}
;


//Deteccion de errores
ERROR: error '}'              {errores.push(new Error("Sintactico", "Recuperado en: " + $1.yyreport_syntax_error + $1, @2.first_line, @2.first_column));}
     | error ';'              {errores.push(new Error("Sintactico", "Recuperado en: " + $1.yyreport_syntax_error + $1, @2.first_line, @2.first_column));}
;


//Comienzo de la lista de instrucciones
INSTRUCCIONES: INSTRUCCIONES INSTRUCCION  { $$ = $1;
                                            if($2 instanceof NodoAST){
                                                $$ = $1; $$.push($2);
                                            }
                                          }
             | INSTRUCCION                { if($1 instanceof NodoAST){
                                                $$ = [$1];
                                            }else{
                                                $$ = [];
                                            }
                                          }
;

INSTRUCCION: CONSOLE                        {$$ = $1;}
           | DECLARACION ';'                {$$ = $1;}
           | ASIGNACION ';'                 {$$ = $1;}
           | IF                             {$$ = $1;}
           | WHILE                          {$$ = $1;}
           | DOWHILE                        {$$ = $1;}
           | FOR                            {$$ = $1;}
           | SWITCH                         {$$ = $1;}
           | BREAK                          {$$ = $1;}
           | CONTINUE                       {$$ = $1;}
           | RETURN                         {$$ = $1;}
           | TERNARIO ';'                   {$$ = $1;}
           | FUNCION                        {$$ = $1;}
           | USOFUNCION ';'                 {$$ = $1;}
           | COMENTARIO                     {}
           /*| ERROR                        {$$ = $1;}*/
;

//Comentarios
COMENTARIO: TK_CL                           {}
          | TK_CM                           {}
;

//Console.log
CONSOLE: TK_CONSOLE CONDICION ';'              {$$ = new ConsoleLog($2, @1.first_line, @1.first_column);}
;

//Break
BREAK: TK_BREAK ';'                            {$$ = new Break(@1.first_line, @1.first_column);}
;

//Continue
CONTINUE: TK_CONTINUE ';'                      {$$ = new Continue(@1.first_line, @1.first_column);}
;

//Return
RETURN: TK_RETURN EXPRESION ';'                {$$ = new Return($2, @1.first_line, @1.first_column);}
      | TK_RETURN ';'                          {$$ = new Return(null, @1.first_line, @1.first_column);}
;

//Declaracion y su listado
DECLARACION: TK_CONST LISTA_DECLARACION     {$$ = new Declaracion(true, $2, @1.first_line, @1.first_column);}
           | TK_LET LISTA_DECLARACION       {$$ = new Declaracion(false, $2, @1.first_line, @1.first_column);}
;

LISTA_DECLARACION: LISTA_DECLARACION ',' ID_DECLARACION      {$$ = $1; $$.push($3);}
                 | ID_DECLARACION                            {$$ = [$1];}
;

ID_DECLARACION: TK_ID ':' TIPO '=' EXPRESION			     {$$ = new Identificador($1, $3, $5, @1.first_line, @1.first_column);}
              | TK_ID ':' TIPO			                     {$$ = new Identificador($1, $3, null, @1.first_line, @1.first_column);}
              | TK_ID '=' EXPRESION                          {$$ = new Identificador($1, null, $3, @1.first_line, @1.first_column);}
              | TK_ID                                        {$$ = new Identificador($1, null, null, @1.first_line, @1.first_column);}
;


//Asignacion y su listado
ASIGNACION: LISTA_ASIGNACION                             {$$ = new Asignacion($1, @1.first_line, @1.first_column);}
;

LISTA_ASIGNACION: LISTA_ASIGNACION ',' ID_ASIGNACION         {$$ = $1; $$.push($2);}
                | ID_ASIGNACION                              {$$ = [$1];}
;

ID_ASIGNACION: TK_ID '=' EXPRESION        {$$ = new Identificador($1, null, $3, @1.first_line, @1.first_column);}
             | TK_ID '++'                 {$$ = new Identificador($1, null,  new Aritmetica(new Identificador($1, null, null, @1.first_line, @1.first_column), new Primitivo(new Tipo(Tipos.NUMBER), Number(1), @2.first_line, @2.first_column), '+', @1.first_line, @1.first_column), @1.first_line, @1.first_column);}
             | TK_ID '--'       		  {$$ = new Identificador($1, null,  new Aritmetica(new Identificador($1, null, null, @1.first_line, @1.first_column), new Primitivo(new Tipo(Tipos.NUMBER), Number(1), @2.first_line, @2.first_column), '-', @1.first_line, @1.first_column), @1.first_line, @1.first_column);}
;


//If y listas
IF: TK_IF CONDICION BLOQUE_INSTRUCCIONES LISTA_IF TK_ELSE BLOQUE_INSTRUCCIONES  {$$ = new If($2, $3, $4, $6, @1.first_line, @1.first_column);}
  | TK_IF CONDICION BLOQUE_INSTRUCCIONES LISTA_IF                               {$$ = new If($2, $3, $4, [], @1.first_line, @1.first_column);}
  | TK_IF CONDICION BLOQUE_INSTRUCCIONES TK_ELSE BLOQUE_INSTRUCCIONES           {$$ = new If($2, $3, [], $5, @1.first_line, @1.first_column);}
  | TK_IF CONDICION BLOQUE_INSTRUCCIONES                                        {$$ = new If($2, $3, [], [], @1.first_line, @1.first_column);}
;

CONDICION: '(' EXPRESION ')'        {$$ = $2;}
;

BLOQUE_INSTRUCCIONES: '{' INSTRUCCIONES '}'                   {$$ = $2;}
                    | '{' '}'                                 {$$ = [];}
;

LISTA_IF: LISTA_IF ELSE_IF             {$$ =$1; $$.push($2);}
        | ELSE_IF                      {$$ = [$1];}
;

ELSE_IF: TK_ELSE TK_IF CONDICION BLOQUE_INSTRUCCIONES          {$$ = new If($3, $4, [], [], @1.first_line, @1.first_column);}
;


//While y do while
WHILE: TK_WHILE CONDICION BLOQUE_INSTRUCCIONES                  {$$ = new While($2, $3, @1.first_line, @1.first_column);}
;

DOWHILE: TK_DO BLOQUE_INSTRUCCIONES TK_WHILE CONDICION ';'     {$$ = new DoWhile($4, $2, @1.first_line, @1.first_column);}
;


//Swich case
SWITCH: TK_SWITCH EXPRESION '{' LISTA_CASE '}'                  {$$ = new Switch($2, $4, $3, @1.first_line, @1.first_column);}
      | TK_SWITCH EXPRESION '{' '}'                             {$$ = new Switch($2, $4, [], @1.first_line, @1.first_column);}
;

LISTA_CASE: LISTA_CASE CASE                                     {$$ = $1; $$.push($2)}
          | CASE                                                {$$ = [$1];}
;

CASE: TK_CASE EXPRESION ':' INSTRUCCIONES                       {$$ = new Case(false, $2, $4, @1.first_line, @1.first_column);}
    | TK_DEFAULT ':' INSTRUCCIONES                              {$$ = new Case(true, null, $3, @1.first_line, @1.first_column);}
;


//Ternario
TERNARIO: EXPRESION '?' EXPRESION ':' EXPRESION        {$$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column);}
;


//For
FOR: TK_FOR '(' DECLARACION ';' EXPRESION ';' ASIGNACION ')' BLOQUE_INSTRUCCIONES     {$$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column);}
   | TK_FOR '(' ASIGNACION ';' EXPRESION ';' ASIGNACION ')' BLOQUE_INSTRUCCIONES      {$$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column);}
;


//Funciones
FUNCION: TK_FUNCTION TK_ID PFUNCION ':' TIPO BLOQUE_INSTRUCCIONES        {$$ = new Funcion($2, $3, $5, $6, @1.first_line, @1.first_column);}
       | TK_FUNCTION TK_ID PFUNCION BLOQUE_INSTRUCCIONES                 {$$ = new Funcion($2, $3, new Tipo(Tipos.VOID), $4, @1.first_line, @1.first_column);}
;

PFUNCION: '(' LISTA_PARAMETROS ')'                          {$$ = $2;}
        | '(' ')'                                           {$$ = [];}
;

LISTA_PARAMETROS: LISTA_PARAMETROS ',' PARAMETRO            {$$ = $1; $$.push($3);}
                | PARAMETRO                                 {$$ = [$1];}
;

PARAMETRO: TK_ID ':' TIPO                                     {$$ = new Identificador($1, $3, null, @1.first_line, @1.first_column);}
;

//UsoFuncion
USOFUNCION: TK_ID '(' LISTA_IDS ')'                      {$$ = new UsoFuncion($1, $3, @1.first_line, @1.first_column);}
          | TK_ID '(' ')'                                {$$ = new UsoFuncion($1, [], @1.first_line, @1.first_column);}
;

LISTA_IDS: LISTA_IDS ',' EXPRESION                       {$$ = $1; $$.push($3);}
         | EXPRESION                                     {$$ = [$1];}
;


//Tipos de datos de variables y funciones
TIPO: TK_STRING                                  {$$ = new Tipo(Tipos.STRING);}
    | TK_BOOLEAN                                 {$$ = new Tipo(Tipos.BOOLEAN);}
    | TK_NUMBER                                  {$$ = new Tipo(Tipos.NUMBER);}
    | TK_VOID                                    {$$ = new Tipo(Tipos.VOID);}
;


//Expresion
EXPRESION : '-' EXPRESION %prec UMENOS	  {$$ = new Aritmetica($2, null, '-', @1.first_line, @1.first_column);}
          | EXPRESION '+' EXPRESION		  {$$ = new Aritmetica($1, $3, '+', @1.first_line, @1.first_column);}
          | EXPRESION '-' EXPRESION		  {$$ = new Aritmetica($1, $3, '-', @1.first_line, @1.first_column);}
          | EXPRESION '*' EXPRESION		  {$$ = new Aritmetica($1, $3, '*', @1.first_line, @1.first_column);}
          | EXPRESION '/' EXPRESION	      {$$ = new Aritmetica($1, $3, '/', @1.first_line, @1.first_column);}
          | EXPRESION '^' EXPRESION	      {$$ = new Aritmetica($1, $3, '^', @1.first_line, @1.first_column);}
          | EXPRESION '%' EXPRESION	      {$$ = new Aritmetica($1, $3, '%', @1.first_line, @1.first_column);}
          | EXPRESION '<' EXPRESION		  {$$ = new Relacional($1, $3, '<', @1.first_line, @1.first_column);}
          | EXPRESION '>' EXPRESION		  {$$ = new Relacional($1, $3, '>', @1.first_line, @1.first_column);}
          | EXPRESION '>=' EXPRESION	  {$$ = new Relacional($1, $3, '>=', @1.first_line, @1.first_column);}
          | EXPRESION '<=' EXPRESION	  {$$ = new Relacional($1, $3, '<=', @1.first_line, @1.first_column);}
          | EXPRESION '==' EXPRESION	  {$$ = new Relacional($1, $3, '==', @1.first_line, @1.first_column);}
          | EXPRESION '!=' EXPRESION	  {$$ = new Relacional($1, $3, '!=', @1.first_line, @1.first_column);}
          | '!' EXPRESION	              {$$ = new Logica($2, null, '!', @1.first_line, @1.first_column);}
          | EXPRESION '||' EXPRESION	  {$$ = new Logica($1, $3, '||', @1.first_line, @1.first_column);}
          | EXPRESION '&&' EXPRESION	  {$$ = new Logica($1, $3, '&&', @1.first_line, @1.first_column);}
          | TERNARIO                      {$$ = $1;}
          | USOFUNCION                    {$$ = $1;}
          | TK_NUMERO				      {$$ = new Primitivo(new Tipo(Tipos.NUMBER), Number($1), @1.first_line, @1.first_column);}
          | TK_TRUE				          {$$ = new Primitivo(new Tipo(Tipos.BOOLEAN), true, @1.first_line, @1.first_column);}
          | TK_FALSE				      {$$ = new Primitivo(new Tipo(Tipos.BOOLEAN), false, @1.first_line, @1.first_column);}
          | TK_CADENAC			          {$$ = new Primitivo(new Tipo(Tipos.STRING), $1.slice(1, -1).replace(/\\"/g,"\""), @1.first_line, @1.first_column);}
          | TK_CADENAS			          {$$ = new Primitivo(new Tipo(Tipos.STRING), $1.slice(1, -1).replace(/\\'/g,"'"), @1.first_line, @1.first_column);}
          | TK_ID			              {$$ = new Identificador($1, null, null, @1.first_line, @1.first_column);}
          | '(' EXPRESION ')'		      {$$ = $2;}
;

