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
    
    
    //Carpeta Instruccion
    var {ConsoleLog} = require("./Instruccion/ConsoleLog");


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
"type"                         return 'TK_ARRAY';


//Tipos de operadores
"++"                            return '++';
"--"                            return '--';
"+"                             return '+';
"-"                             return '-';
"*"                             return '*';
"/"                             return '/';
"^"                             return '^';
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
ERR: error '}'              {$$ = new Error("Sintactico", $1.yyreport_syntax_error, @1.first_line, @1.first_column);}
   | error ';'              {$$ = new Error("Sintactico", $1.yyreport_syntax_error, @1.first_line, @1.first_column);}
;

//Comienzo de la lista de instrucciones
INSTRUCCIONES: INSTRUCCIONES INSTRUCCION  {$$ = $1; $$.push($2);}
             | INSTRUCCION                {$$ = [$1];}
;

INSTRUCCION: CONSOLE                      {$$ = $1;}
           
;

//Console.log
CONSOLE: TK_CONSOLE '(' EXPRESION ')' ';'       {$$ = new ConsoleLog($3, @1.first_line, @1.first_column);}
;

//Expresion
EXPRESION : '-' EXPRESION %prec UMENOS	  { $$ = new Aritmetica($2, null, '-', @1.first_line, @1.first_column); }
          | '!' EXPRESION	              { $$ = new Aritmetica($2, null, '!', @1.first_line, @1.first_column); }
          | EXPRESION '+' EXPRESION		  { $$ = new Aritmetica($1, $3, '+', @1.first_line, @1.first_column); }
          | EXPRESION '-' EXPRESION		  { $$ = new Aritmetica($1, $3, '-', @1.first_line, @1.first_column); }
          | EXPRESION '*' EXPRESION		  { $$ = new Aritmetica($1, $3, '*', @1.first_line, @1.first_column); }
          | EXPRESION '/' EXPRESION	      { $$ = new Aritmetica($1, $3, '/', @1.first_line, @1.first_column); }
          /*| EXPRESION '<' EXPRESION		  { $$ = new Relational($1, $3, '<', @1.first_line, @1.first_column); }
          | EXPRESION '>' EXPRESION		  { $$ = new Relational($1, $3, '>', @1.first_line, @1.first_column); }
          | EXPRESION '>=' EXPRESION	  { $$ = new Relational($1, $3, '>=', @1.first_line, @1.first_column); }
          | EXPRESION '<=' EXPRESION	  { $$ = new Relational($1, $3, '<=', @1.first_line, @1.first_column); }
          | EXPRESION '==' EXPRESION	  { $$ = new Relational($1, $3, '==', @1.first_line, @1.first_column); }
          | EXPRESION '!=' EXPRESION	  { $$ = new Relational($1, $3, '!=', @1.first_line, @1.first_column); }
          | EXPRESION '||' EXPRESION	  { $$ = new Logic($1, $3, '&&', @1.first_line, @1.first_column); }
          | EXPRESION '&&' EXPRESION	  { $$ = new Logic($1, $3, '||', @1.first_line, @1.first_column); }*/
          | TK_NUMERO				      { $$ = new Primitivo(new Tipo(Tipos.NUMBER), Number($1), @1.first_line, @1.first_column); }
          | TK_TRUE				          { $$ = new Primitivo(new Tipo(Tipos.BOOLEAN), true, @1.first_line, @1.first_column); }
          | TK_FALSE				      { $$ = new Primitivo(new Tipo(Tipos.BOOLEAN), false, @1.first_line, @1.first_column); }
          | TK_CADENAC			          { $$ = new Primitivo(new Tipo(Tipos.STRING), $1.replace(/\"/g,""), @1.first_line, @1.first_column); }
          | TK_CADENAS			          { $$ = new Primitivo(new Tipo(Tipos.STRING), $1.replace(/\'/g,""), @1.first_line, @1.first_column); }
          | TK_ID			              { $$ = new Identificador($1, @1.first_line, @1.first_column); }
          /*| TK_VOID			              { $$ = new Identificador($1, @1.first_line, @1.first_column); }*/
          | '(' EXPRESION ')'		      { $$ = $2; }
;

/*
//Listado de senetencias
SENTENCIAS: SENTENCIAS SENTENCIA  {$$ = $1; $$.push($2);}
          | SENTENCIA             {$$ = []; $$.push($1);}
;

//Tipo de sentencias principales
SENTENCIA: CLASS                        {$$ = new NodoAST.NodoAST( id++, "Clase", @1.first_line, @1.first_column, $1);}
         | IMPORT                       {$$ = new NodoAST.NodoAST( id++, "Import", @1.first_line, @1.first_column, $1);}
         | COMENTARIOS                  {$$ = new NodoAST.NodoAST( id++, "Comentario", @1.first_line, @1.first_column, $1);}
         | ERR                          {$$ = new NodoAST.NodoAST( id++, "ERROR", @1.first_line, @1.first_column, []); errores.push($1);}
;

//Sentencias principales no derivables
IMPORT: TK_IMPORT TK_ID ';'                 {$$ = [new NodoAST.NodoAST(id++, $2, @1.first_line, @1.first_column, [])];}
;

COMENTARIOS: TK_CM                      {$$ = [new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, [])];}
           | TK_CL                      {$$ = [new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, [])];}
;

//Sentencia principal derivable
CLASS: TK_CLASS TK_ID '{' TODOCLASE '}'         {$$ = [new NodoAST.NodoAST(id++, $2, @1.first_line, @1.first_column, []), $4];}
     | TK_CLASS TK_ID '{' '}'                   {$$ = [new NodoAST.NodoAST(id++, $2, @1.first_line, @1.first_column, [])];}
;            

TODOCLASE: TODOS            {$$ = new NodoAST.NodoAST( id++, "Sentencias", @1.first_line, @1.first_column, $1);}
;

TODOS: TODOS TODO       {$$ = $1; $$.push($2);}
     | TODO             {$$ = []; $$.push($1);}
;

//Todo tipo de funcion posible dentro de sentencia principal
TODO: COMENTARIOS       {$$ = new NodoAST.NodoAST( id++, "Comentario", @1.first_line, @1.first_column, $1);}
    | METODO            {$$ = new NodoAST.NodoAST( id++, "Metodo", @1.first_line, @1.first_column, $1);}
    | FUNCION           {$$ = new NodoAST.NodoAST( id++, "Funcion", @1.first_line, @1.first_column, $1);}
    | MAIN              {$$ = new NodoAST.NodoAST( id++, "Main", @1.first_line, @1.first_column, $1);}
    | DECLARACION       {$$ = new NodoAST.NodoAST( id++, "Declaracion", @1.first_line, @1.first_column, $1);}
    | ASIGNACION        {$$ = new NodoAST.NodoAST( id++, "Asignacion", @1.first_line, @1.first_column, $1);}
    | ERR               {$$ = new NodoAST.NodoAST( id++, "ERROR", @1.first_line, @1.first_column, []); errores.push($1);}
;

//Creacion de metodos funicones o main
METODO: VOID TK_ID '(' PARAMETROSGENERAL ')' '{' TODOGENERAL '}'  {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4, $7];}
      | VOID TK_ID '(' PARAMETROSGENERAL ')' '{' '}'              {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4];}
      | VOID TK_ID '(' ')' '{' TODOGENERAL '}'                    {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $6];}
      | VOID TK_ID '(' ')' '{' '}'                                {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, [])];}
;

FUNCION: TIPO TK_ID '(' PARAMETROSGENERAL ')' '{' TODOGENERAL '}'  {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4, $7];}
       | TIPO TK_ID '(' PARAMETROSGENERAL ')' '{' '}'              {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4];}
       | TIPO TK_ID '(' ')' '{' TODOGENERAL '}'                    {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $6];}
       | TIPO TK_ID '(' ')' '{' '}'                                {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, [])];}
;

MAIN: VOID TK_MAIN '(' ')' '{' TODOGENERAL '}'       {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $6];}
    | VOID TK_MAIN '(' ')' '{' '}'                   {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, [])];}
;

VOID: TK_VOID           {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
;

//Estructura de creacion de parametros
PARAMETROSGENERAL: PARAMETROS        {$$ = new NodoAST.NodoAST( id++, "Parametros", @1.first_line, @1.first_column, $1);}
;

PARAMETROS: PARAMETROS ',' PARAMETRO   {$$ = $1; $$.push($3);}
          | PARAMETRO                  {$$ = []; $$.push($1);}
;

PARAMETRO: TIPO TK_ID            {$1.lista = [new NodoAST.NodoAST( id++, $2, @2.first_line, @2.first_column, [])]; $$ = $1;}
;

//Identificacion de tipos de dato
TIPO: TK_INT        {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
    | TK_DOUBLE     {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
    | TK_BOOLEAN    {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
    | TK_STRING     {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
    | TK_CHAR       {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
;

//Estructura para la obtencion de sentencias no del tipo clase
TODOGENERAL: TODOSDENTRO        {$$ = new NodoAST.NodoAST( id++, "Sentencias", @1.first_line, @1.first_column, $1);}
;

TODOSDENTRO: TODOSDENTRO TODODENTRO       {$$ = $1; $$.push($2);}
           | TODODENTRO                   {$$ = [$1];}
;

//todo lo que va dentro de metodos funciones o main
TODODENTRO: COMENTARIOS             {$$ = new NodoAST.NodoAST( id++, "Comentario", @1.first_line, @1.first_column, $1);}
          | ASIGNACION              {$$ = new NodoAST.NodoAST( id++, "Asignacion", @1.first_line, @1.first_column, $1);}
          | DECLARACION             {$$ = new NodoAST.NodoAST( id++, "Declaracion", @1.first_line, @1.first_column, $1);}
          | FOR                     {$$ = new NodoAST.NodoAST( id++, "For", @1.first_line, @1.first_column, $1);}
          | WHILE                   {$$ = new NodoAST.NodoAST( id++, "While", @1.first_line, @1.first_column, $1);}
          | DO                      {$$ = new NodoAST.NodoAST( id++, "Do while", @1.first_line, @1.first_column, $1);}
          | SWITCH                  {$$ = new NodoAST.NodoAST( id++, "Switch", @1.first_line, @1.first_column, $1);}
          | IF                      {$$ = new NodoAST.NodoAST( id++, "If", @1.first_line, @1.first_column, $1);}
          | BCR                     {$$ = $1;}
          | LLAMADAF                {$$ = new NodoAST.NodoAST( id++, "Llamada funcion", @1.first_line, @1.first_column, [$1]);}
          | PRINT                   {$$ = new NodoAST.NodoAST( id++, "Print", @1.first_line, @1.first_column, [$1]);}
          | ERR                     {$$ = new NodoAST.NodoAST( id++, "ERROR", @1.first_line, @1.first_column, []); errores.push($1);}
;

BCR: TK_BREAK ';'                  {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
   | TK_CONTINUE ';'               {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
   | TK_RETURN SEXPRECION ';'      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, [$2]);}
;

PRINT: TK_SYSTEM '.' TK_OUT '.' TK_PRINT '(' SEXPRECION ')' ';'         {$$ = $7;}
     | TK_SYSTEM '.' TK_OUT '.' TK_PRINTLN '(' SEXPRECION ')' ';'       {$$ = $7;}
;
//Estructura de declaraciones
DECLARACION: TIPO LISTA '=' EXPRECION ';'        {$1.lista = $2; $$ = [$1, $4];}
           | TIPO LISTA ';'                      {$1.lista = $2; $$ = [$1];}
;

LISTA: LISTA ',' TK_ID        {$$ = $1; $$.push(new NodoAST.NodoAST( id++, $3, @3.first_line, @3.first_column, []));}
     | TK_ID                  {$$ = []; $$.push(new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []));}
;

//expreciones
EXPRECION: EXPRECIONES        {$$ = new NodoAST.NodoAST( id++, "=", @1.first_line, @1.first_column, $1);}
;

EXPRECIONES: EXPRECIONES E   {$$ = $1; $$.push($2);}
           | E               {$$ = [$1];}   
;

E: E '+' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '-' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '*' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '/' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '^' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '%' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 //| '-' E %prec UMINUS       {$$ = new NodoAST.NodoAST(id, $1, @1.first_line, @1.first_column, [$2]); id++;}
 | '(' E ')'                {$$ = $2;}
 | VALORES                  {$$ = $1;}
;

VALORES: TK_CD      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_CH      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_ID      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_NM      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_BOOL    {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
;

//llamada de funciones no implementado
LLAMADAF: TK_ID '(' SEXPRECION ')' ';'     {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, [$3]);}
        | TK_ID '(' ')' ';'                 {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
;

//Estructura de asignacion
ASIGNACION: TK_ID '=' EXPRECION ';'         {$$ = [new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []), $3];}
;


//estructura for $3, $4, $6, $9
FOR: TK_FOR '(' DECASIG CONDICIONES ';' ITERADORES ')' '{' TODOGENERAL '}'      {$$ = [$3, $4, $6, $9];}
   | TK_FOR '(' DECASIG CONDICIONES ';' ITERADORES ')' '{' '}'                  {$$ = [$3, $4, $6];}
;

//declaracion o asignacion
DECASIG: ASIGNACION              {$$ = new NodoAST.NodoAST( id++, "Asignacion", @1.first_line, @1.first_column, $1);}
       | DECLARACION             {$$ = new NodoAST.NodoAST( id++, "Declaracion", @1.first_line, @1.first_column, $1);}
;   

//condicion de for
CONDICIONES: CONDICION  {$$ = new NodoAST.NodoAST(id++, "Condiciones", @1.first_line, @1.first_column, $1);}
;

CONDICION: CONDICION C  {$$ = $1; $$.push($2);}
         | C            {$$ = [$1];} 
;

C: C '&&' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '||' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | '(' C ')'        {$$ = $2}
 | C '<' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '<=' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '>' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '>=' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '!=' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '==' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '+' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '-' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '*' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '/' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '^' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '%' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | '!' C            {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, [$2]);}
 | VALORES          {$$ = $1}
 //| EXPRECIONES      {$$ = new NodoAST.NodoAST(id++, "Exprecion", @1.first_line, @1.first_column, $1);}
;

//iterador de for
ITERADORES: ITERADOR    {$$ = new NodoAST.NodoAST(id++, "Iterador", @1.first_line, @1.first_column, $1);}
;

ITERADOR: TK_ID '++'   {$$ = [new NodoAST.NodoAST(id++, $1+$2, @1.first_line, @1.first_column, [])];}
        | TK_ID '--'   {$$ = [new NodoAST.NodoAST(id++, $1+$2, @1.first_line, @1.first_column, [])];}
;


//estructura de while
WHILE: TK_WHILE '(' CONDICIONES ')' '{' TODOGENERAL '}'        {$$ = [$3, $6]}
     | TK_WHILE '(' CONDICIONES ')' '{' '}'                    {$$ = [$3]}
;

//estructura do while
DO: TK_DO '{' TODOGENERAL '}' TK_WHILE '(' CONDICIONES ')' ';'       {$$ = [$3, $7]}
  | TK_DO '{' '}' TK_WHILE '(' CONDICIONES ')' ';'                   {$$ = [$6]}
;


//estructura if
IF: TKIF ELSEL        {$$ = $2; $$.unshift($1);}
  | TKIF              {$$ = [$1];}
;

TKIF: TK_IF '(' CONDICIONES ')' '{' TODOGENERAL '}'            {$$ = new NodoAST.NodoAST(id++, "if", @1.first_line, @1.first_column, [$3, $6]);}
    | TK_IF '(' CONDICIONES ')' '{' '}'                        {$$ = new NodoAST.NodoAST(id++, "if", @1.first_line, @1.first_column, [$3]);}
;

ELSEL: ELSEL ELSE           {$$ = $1; $$.push($2);}
     | ELSE                 {$$ = [$1];}
;

ELSE: TK_ELSE TKIF                      {$$ = new NodoAST.NodoAST(id++, "else if", @1.first_line, @1.first_column, $2.lista);}
    | TK_ELSE '{' TODOGENERAL '}'       {$$ = new NodoAST.NodoAST(id++, "else", @1.first_line, @1.first_column, [$3]);}
    | TK_ELSE '{' '}'                   {$$ = new NodoAST.NodoAST(id++, "else", @1.first_line, @1.first_column, []);}
;

//estructura whitch
SWITCH: TK_SWITCH '(' SEXPRECION ')' '{' CASS '}'      {$$ = [$3, $6];}
      | TK_SWITCH '(' SEXPRECION ')' '{' '}'            {$$ = [$3];}
;

SEXPRECION: EXPRECIONES        {$$ = new NodoAST.NodoAST( id++, "Exprecion", @1.first_line, @1.first_column, $1);}
;

CASS: CASES        {$$ = new NodoAST.NodoAST( id++, "Cases", @1.first_line, @1.first_column, $1);}
;

CASES: CASES CASE       {$$ = $1; $$.push($2);}
     | CASE             {$$ = [$1];}
;

CASE: TK_CASE VALORES ':' TODOGENERAL   {$$ = new NodoAST.NodoAST( id++, "Case", @1.first_line, @1.first_column, [$2, $4]);}
    | TK_CASE VALORES ':'               {$$ = new NodoAST.NodoAST( id++, "Case", @1.first_line, @1.first_column, [$2]);}
    | TK_DEFAULT ':' TODOGENERAL        {$$ = new NodoAST.NodoAST( id++, "Default", @1.first_line, @1.first_column, [$3]);}
    | TK_DEFAULT ':'                    {$$ = new NodoAST.NodoAST( id++, "Default", @1.first_line, @1.first_column, []);}
;
*/