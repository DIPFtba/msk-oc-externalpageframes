"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["sce"],{

/***/ "../../node_modules/expr-eval/dist/index.mjs":
/*!***************************************************!*\
  !*** ../../node_modules/expr-eval/dist/index.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Expression": () => (/* binding */ Expression),
/* harmony export */   "Parser": () => (/* binding */ Parser),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var INUMBER = 'INUMBER';
var IOP1 = 'IOP1';
var IOP2 = 'IOP2';
var IOP3 = 'IOP3';
var IVAR = 'IVAR';
var IVARNAME = 'IVARNAME';
var IFUNCALL = 'IFUNCALL';
var IFUNDEF = 'IFUNDEF';
var IEXPR = 'IEXPR';
var IEXPREVAL = 'IEXPREVAL';
var IMEMBER = 'IMEMBER';
var IENDSTATEMENT = 'IENDSTATEMENT';
var IARRAY = 'IARRAY';

function Instruction(type, value) {
  this.type = type;
  this.value = (value !== undefined && value !== null) ? value : 0;
}

Instruction.prototype.toString = function () {
  switch (this.type) {
    case INUMBER:
    case IOP1:
    case IOP2:
    case IOP3:
    case IVAR:
    case IVARNAME:
    case IENDSTATEMENT:
      return this.value;
    case IFUNCALL:
      return 'CALL ' + this.value;
    case IFUNDEF:
      return 'DEF ' + this.value;
    case IARRAY:
      return 'ARRAY ' + this.value;
    case IMEMBER:
      return '.' + this.value;
    default:
      return 'Invalid Instruction';
  }
};

function unaryInstruction(value) {
  return new Instruction(IOP1, value);
}

function binaryInstruction(value) {
  return new Instruction(IOP2, value);
}

function ternaryInstruction(value) {
  return new Instruction(IOP3, value);
}

function simplify(tokens, unaryOps, binaryOps, ternaryOps, values) {
  var nstack = [];
  var newexpression = [];
  var n1, n2, n3;
  var f;
  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    var type = item.type;
    if (type === INUMBER || type === IVARNAME) {
      if (Array.isArray(item.value)) {
        nstack.push.apply(nstack, simplify(item.value.map(function (x) {
          return new Instruction(INUMBER, x);
        }).concat(new Instruction(IARRAY, item.value.length)), unaryOps, binaryOps, ternaryOps, values));
      } else {
        nstack.push(item);
      }
    } else if (type === IVAR && values.hasOwnProperty(item.value)) {
      item = new Instruction(INUMBER, values[item.value]);
      nstack.push(item);
    } else if (type === IOP2 && nstack.length > 1) {
      n2 = nstack.pop();
      n1 = nstack.pop();
      f = binaryOps[item.value];
      item = new Instruction(INUMBER, f(n1.value, n2.value));
      nstack.push(item);
    } else if (type === IOP3 && nstack.length > 2) {
      n3 = nstack.pop();
      n2 = nstack.pop();
      n1 = nstack.pop();
      if (item.value === '?') {
        nstack.push(n1.value ? n2.value : n3.value);
      } else {
        f = ternaryOps[item.value];
        item = new Instruction(INUMBER, f(n1.value, n2.value, n3.value));
        nstack.push(item);
      }
    } else if (type === IOP1 && nstack.length > 0) {
      n1 = nstack.pop();
      f = unaryOps[item.value];
      item = new Instruction(INUMBER, f(n1.value));
      nstack.push(item);
    } else if (type === IEXPR) {
      while (nstack.length > 0) {
        newexpression.push(nstack.shift());
      }
      newexpression.push(new Instruction(IEXPR, simplify(item.value, unaryOps, binaryOps, ternaryOps, values)));
    } else if (type === IMEMBER && nstack.length > 0) {
      n1 = nstack.pop();
      nstack.push(new Instruction(INUMBER, n1.value[item.value]));
    } /* else if (type === IARRAY && nstack.length >= item.value) {
      var length = item.value;
      while (length-- > 0) {
        newexpression.push(nstack.pop());
      }
      newexpression.push(new Instruction(IARRAY, item.value));
    } */ else {
      while (nstack.length > 0) {
        newexpression.push(nstack.shift());
      }
      newexpression.push(item);
    }
  }
  while (nstack.length > 0) {
    newexpression.push(nstack.shift());
  }
  return newexpression;
}

function substitute(tokens, variable, expr) {
  var newexpression = [];
  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    var type = item.type;
    if (type === IVAR && item.value === variable) {
      for (var j = 0; j < expr.tokens.length; j++) {
        var expritem = expr.tokens[j];
        var replitem;
        if (expritem.type === IOP1) {
          replitem = unaryInstruction(expritem.value);
        } else if (expritem.type === IOP2) {
          replitem = binaryInstruction(expritem.value);
        } else if (expritem.type === IOP3) {
          replitem = ternaryInstruction(expritem.value);
        } else {
          replitem = new Instruction(expritem.type, expritem.value);
        }
        newexpression.push(replitem);
      }
    } else if (type === IEXPR) {
      newexpression.push(new Instruction(IEXPR, substitute(item.value, variable, expr)));
    } else {
      newexpression.push(item);
    }
  }
  return newexpression;
}

function evaluate(tokens, expr, values) {
  var nstack = [];
  var n1, n2, n3;
  var f, args, argCount;

  if (isExpressionEvaluator(tokens)) {
    return resolveExpression(tokens, values);
  }

  var numTokens = tokens.length;

  for (var i = 0; i < numTokens; i++) {
    var item = tokens[i];
    var type = item.type;
    if (type === INUMBER || type === IVARNAME) {
      nstack.push(item.value);
    } else if (type === IOP2) {
      n2 = nstack.pop();
      n1 = nstack.pop();
      if (item.value === 'and') {
        nstack.push(n1 ? !!evaluate(n2, expr, values) : false);
      } else if (item.value === 'or') {
        nstack.push(n1 ? true : !!evaluate(n2, expr, values));
      } else if (item.value === '=') {
        f = expr.binaryOps[item.value];
        nstack.push(f(n1, evaluate(n2, expr, values), values));
      } else {
        f = expr.binaryOps[item.value];
        nstack.push(f(resolveExpression(n1, values), resolveExpression(n2, values)));
      }
    } else if (type === IOP3) {
      n3 = nstack.pop();
      n2 = nstack.pop();
      n1 = nstack.pop();
      if (item.value === '?') {
        nstack.push(evaluate(n1 ? n2 : n3, expr, values));
      } else {
        f = expr.ternaryOps[item.value];
        nstack.push(f(resolveExpression(n1, values), resolveExpression(n2, values), resolveExpression(n3, values)));
      }
    } else if (type === IVAR) {
      if (item.value in expr.functions) {
        nstack.push(expr.functions[item.value]);
      } else if (item.value in expr.unaryOps && expr.parser.isOperatorEnabled(item.value)) {
        nstack.push(expr.unaryOps[item.value]);
      } else {
        var v = values[item.value];
        if (v !== undefined) {
          nstack.push(v);
        } else {
          throw new Error('undefined variable: ' + item.value);
        }
      }
    } else if (type === IOP1) {
      n1 = nstack.pop();
      f = expr.unaryOps[item.value];
      nstack.push(f(resolveExpression(n1, values)));
    } else if (type === IFUNCALL) {
      argCount = item.value;
      args = [];
      while (argCount-- > 0) {
        args.unshift(resolveExpression(nstack.pop(), values));
      }
      f = nstack.pop();
      if (f.apply && f.call) {
        nstack.push(f.apply(undefined, args));
      } else {
        throw new Error(f + ' is not a function');
      }
    } else if (type === IFUNDEF) {
      // Create closure to keep references to arguments and expression
      nstack.push((function () {
        var n2 = nstack.pop();
        var args = [];
        var argCount = item.value;
        while (argCount-- > 0) {
          args.unshift(nstack.pop());
        }
        var n1 = nstack.pop();
        var f = function () {
          var scope = Object.assign({}, values);
          for (var i = 0, len = args.length; i < len; i++) {
            scope[args[i]] = arguments[i];
          }
          return evaluate(n2, expr, scope);
        };
        // f.name = n1
        Object.defineProperty(f, 'name', {
          value: n1,
          writable: false
        });
        values[n1] = f;
        return f;
      })());
    } else if (type === IEXPR) {
      nstack.push(createExpressionEvaluator(item, expr));
    } else if (type === IEXPREVAL) {
      nstack.push(item);
    } else if (type === IMEMBER) {
      n1 = nstack.pop();
      nstack.push(n1[item.value]);
    } else if (type === IENDSTATEMENT) {
      nstack.pop();
    } else if (type === IARRAY) {
      argCount = item.value;
      args = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
      }
      nstack.push(args);
    } else {
      throw new Error('invalid Expression');
    }
  }
  if (nstack.length > 1) {
    throw new Error('invalid Expression (parity)');
  }
  // Explicitly return zero to avoid test issues caused by -0
  return nstack[0] === 0 ? 0 : resolveExpression(nstack[0], values);
}

function createExpressionEvaluator(token, expr, values) {
  if (isExpressionEvaluator(token)) return token;
  return {
    type: IEXPREVAL,
    value: function (scope) {
      return evaluate(token.value, expr, scope);
    }
  };
}

function isExpressionEvaluator(n) {
  return n && n.type === IEXPREVAL;
}

function resolveExpression(n, values) {
  return isExpressionEvaluator(n) ? n.value(values) : n;
}

function expressionToString(tokens, toJS) {
  var nstack = [];
  var n1, n2, n3;
  var f, args, argCount;
  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    var type = item.type;
    if (type === INUMBER) {
      if (typeof item.value === 'number' && item.value < 0) {
        nstack.push('(' + item.value + ')');
      } else if (Array.isArray(item.value)) {
        nstack.push('[' + item.value.map(escapeValue).join(', ') + ']');
      } else {
        nstack.push(escapeValue(item.value));
      }
    } else if (type === IOP2) {
      n2 = nstack.pop();
      n1 = nstack.pop();
      f = item.value;
      if (toJS) {
        if (f === '^') {
          nstack.push('Math.pow(' + n1 + ', ' + n2 + ')');
        } else if (f === 'and') {
          nstack.push('(!!' + n1 + ' && !!' + n2 + ')');
        } else if (f === 'or') {
          nstack.push('(!!' + n1 + ' || !!' + n2 + ')');
        } else if (f === '||') {
          nstack.push('(function(a,b){ return Array.isArray(a) && Array.isArray(b) ? a.concat(b) : String(a) + String(b); }((' + n1 + '),(' + n2 + ')))');
        } else if (f === '==') {
          nstack.push('(' + n1 + ' === ' + n2 + ')');
        } else if (f === '!=') {
          nstack.push('(' + n1 + ' !== ' + n2 + ')');
        } else if (f === '[') {
          nstack.push(n1 + '[(' + n2 + ') | 0]');
        } else {
          nstack.push('(' + n1 + ' ' + f + ' ' + n2 + ')');
        }
      } else {
        if (f === '[') {
          nstack.push(n1 + '[' + n2 + ']');
        } else {
          nstack.push('(' + n1 + ' ' + f + ' ' + n2 + ')');
        }
      }
    } else if (type === IOP3) {
      n3 = nstack.pop();
      n2 = nstack.pop();
      n1 = nstack.pop();
      f = item.value;
      if (f === '?') {
        nstack.push('(' + n1 + ' ? ' + n2 + ' : ' + n3 + ')');
      } else {
        throw new Error('invalid Expression');
      }
    } else if (type === IVAR || type === IVARNAME) {
      nstack.push(item.value);
    } else if (type === IOP1) {
      n1 = nstack.pop();
      f = item.value;
      if (f === '-' || f === '+') {
        nstack.push('(' + f + n1 + ')');
      } else if (toJS) {
        if (f === 'not') {
          nstack.push('(' + '!' + n1 + ')');
        } else if (f === '!') {
          nstack.push('fac(' + n1 + ')');
        } else {
          nstack.push(f + '(' + n1 + ')');
        }
      } else if (f === '!') {
        nstack.push('(' + n1 + '!)');
      } else {
        nstack.push('(' + f + ' ' + n1 + ')');
      }
    } else if (type === IFUNCALL) {
      argCount = item.value;
      args = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
      }
      f = nstack.pop();
      nstack.push(f + '(' + args.join(', ') + ')');
    } else if (type === IFUNDEF) {
      n2 = nstack.pop();
      argCount = item.value;
      args = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
      }
      n1 = nstack.pop();
      if (toJS) {
        nstack.push('(' + n1 + ' = function(' + args.join(', ') + ') { return ' + n2 + ' })');
      } else {
        nstack.push('(' + n1 + '(' + args.join(', ') + ') = ' + n2 + ')');
      }
    } else if (type === IMEMBER) {
      n1 = nstack.pop();
      nstack.push(n1 + '.' + item.value);
    } else if (type === IARRAY) {
      argCount = item.value;
      args = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
      }
      nstack.push('[' + args.join(', ') + ']');
    } else if (type === IEXPR) {
      nstack.push('(' + expressionToString(item.value, toJS) + ')');
    } else if (type === IENDSTATEMENT) ; else {
      throw new Error('invalid Expression');
    }
  }
  if (nstack.length > 1) {
    if (toJS) {
      nstack = [ nstack.join(',') ];
    } else {
      nstack = [ nstack.join(';') ];
    }
  }
  return String(nstack[0]);
}

function escapeValue(v) {
  if (typeof v === 'string') {
    return JSON.stringify(v).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  }
  return v;
}

function contains(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      return true;
    }
  }
  return false;
}

function getSymbols(tokens, symbols, options) {
  options = options || {};
  var withMembers = !!options.withMembers;
  var prevVar = null;

  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    if (item.type === IVAR || item.type === IVARNAME) {
      if (!withMembers && !contains(symbols, item.value)) {
        symbols.push(item.value);
      } else if (prevVar !== null) {
        if (!contains(symbols, prevVar)) {
          symbols.push(prevVar);
        }
        prevVar = item.value;
      } else {
        prevVar = item.value;
      }
    } else if (item.type === IMEMBER && withMembers && prevVar !== null) {
      prevVar += '.' + item.value;
    } else if (item.type === IEXPR) {
      getSymbols(item.value, symbols, options);
    } else if (prevVar !== null) {
      if (!contains(symbols, prevVar)) {
        symbols.push(prevVar);
      }
      prevVar = null;
    }
  }

  if (prevVar !== null && !contains(symbols, prevVar)) {
    symbols.push(prevVar);
  }
}

function Expression(tokens, parser) {
  this.tokens = tokens;
  this.parser = parser;
  this.unaryOps = parser.unaryOps;
  this.binaryOps = parser.binaryOps;
  this.ternaryOps = parser.ternaryOps;
  this.functions = parser.functions;
}

Expression.prototype.simplify = function (values) {
  values = values || {};
  return new Expression(simplify(this.tokens, this.unaryOps, this.binaryOps, this.ternaryOps, values), this.parser);
};

Expression.prototype.substitute = function (variable, expr) {
  if (!(expr instanceof Expression)) {
    expr = this.parser.parse(String(expr));
  }

  return new Expression(substitute(this.tokens, variable, expr), this.parser);
};

Expression.prototype.evaluate = function (values) {
  values = values || {};
  return evaluate(this.tokens, this, values);
};

Expression.prototype.toString = function () {
  return expressionToString(this.tokens, false);
};

Expression.prototype.symbols = function (options) {
  options = options || {};
  var vars = [];
  getSymbols(this.tokens, vars, options);
  return vars;
};

Expression.prototype.variables = function (options) {
  options = options || {};
  var vars = [];
  getSymbols(this.tokens, vars, options);
  var functions = this.functions;
  return vars.filter(function (name) {
    return !(name in functions);
  });
};

Expression.prototype.toJSFunction = function (param, variables) {
  var expr = this;
  var f = new Function(param, 'with(this.functions) with (this.ternaryOps) with (this.binaryOps) with (this.unaryOps) { return ' + expressionToString(this.simplify(variables).tokens, true) + '; }'); // eslint-disable-line no-new-func
  return function () {
    return f.apply(expr, arguments);
  };
};

var TEOF = 'TEOF';
var TOP = 'TOP';
var TNUMBER = 'TNUMBER';
var TSTRING = 'TSTRING';
var TPAREN = 'TPAREN';
var TBRACKET = 'TBRACKET';
var TCOMMA = 'TCOMMA';
var TNAME = 'TNAME';
var TSEMICOLON = 'TSEMICOLON';

function Token(type, value, index) {
  this.type = type;
  this.value = value;
  this.index = index;
}

Token.prototype.toString = function () {
  return this.type + ': ' + this.value;
};

function TokenStream(parser, expression) {
  this.pos = 0;
  this.current = null;
  this.unaryOps = parser.unaryOps;
  this.binaryOps = parser.binaryOps;
  this.ternaryOps = parser.ternaryOps;
  this.consts = parser.consts;
  this.expression = expression;
  this.savedPosition = 0;
  this.savedCurrent = null;
  this.options = parser.options;
  this.parser = parser;
}

TokenStream.prototype.newToken = function (type, value, pos) {
  return new Token(type, value, pos != null ? pos : this.pos);
};

TokenStream.prototype.save = function () {
  this.savedPosition = this.pos;
  this.savedCurrent = this.current;
};

TokenStream.prototype.restore = function () {
  this.pos = this.savedPosition;
  this.current = this.savedCurrent;
};

TokenStream.prototype.next = function () {
  if (this.pos >= this.expression.length) {
    return this.newToken(TEOF, 'EOF');
  }

  if (this.isWhitespace() || this.isComment()) {
    return this.next();
  } else if (this.isRadixInteger() ||
      this.isNumber() ||
      this.isOperator() ||
      this.isString() ||
      this.isParen() ||
      this.isBracket() ||
      this.isComma() ||
      this.isSemicolon() ||
      this.isNamedOp() ||
      this.isConst() ||
      this.isName()) {
    return this.current;
  } else {
    this.parseError('Unknown character "' + this.expression.charAt(this.pos) + '"');
  }
};

TokenStream.prototype.isString = function () {
  var r = false;
  var startPos = this.pos;
  var quote = this.expression.charAt(startPos);

  if (quote === '\'' || quote === '"') {
    var index = this.expression.indexOf(quote, startPos + 1);
    while (index >= 0 && this.pos < this.expression.length) {
      this.pos = index + 1;
      if (this.expression.charAt(index - 1) !== '\\') {
        var rawString = this.expression.substring(startPos + 1, index);
        this.current = this.newToken(TSTRING, this.unescape(rawString), startPos);
        r = true;
        break;
      }
      index = this.expression.indexOf(quote, index + 1);
    }
  }
  return r;
};

TokenStream.prototype.isParen = function () {
  var c = this.expression.charAt(this.pos);
  if (c === '(' || c === ')') {
    this.current = this.newToken(TPAREN, c);
    this.pos++;
    return true;
  }
  return false;
};

TokenStream.prototype.isBracket = function () {
  var c = this.expression.charAt(this.pos);
  if ((c === '[' || c === ']') && this.isOperatorEnabled('[')) {
    this.current = this.newToken(TBRACKET, c);
    this.pos++;
    return true;
  }
  return false;
};

TokenStream.prototype.isComma = function () {
  var c = this.expression.charAt(this.pos);
  if (c === ',') {
    this.current = this.newToken(TCOMMA, ',');
    this.pos++;
    return true;
  }
  return false;
};

TokenStream.prototype.isSemicolon = function () {
  var c = this.expression.charAt(this.pos);
  if (c === ';') {
    this.current = this.newToken(TSEMICOLON, ';');
    this.pos++;
    return true;
  }
  return false;
};

TokenStream.prototype.isConst = function () {
  var startPos = this.pos;
  var i = startPos;
  for (; i < this.expression.length; i++) {
    var c = this.expression.charAt(i);
    if (c.toUpperCase() === c.toLowerCase()) {
      if (i === this.pos || (c !== '_' && c !== '.' && (c < '0' || c > '9'))) {
        break;
      }
    }
  }
  if (i > startPos) {
    var str = this.expression.substring(startPos, i);
    if (str in this.consts) {
      this.current = this.newToken(TNUMBER, this.consts[str]);
      this.pos += str.length;
      return true;
    }
  }
  return false;
};

TokenStream.prototype.isNamedOp = function () {
  var startPos = this.pos;
  var i = startPos;
  for (; i < this.expression.length; i++) {
    var c = this.expression.charAt(i);
    if (c.toUpperCase() === c.toLowerCase()) {
      if (i === this.pos || (c !== '_' && (c < '0' || c > '9'))) {
        break;
      }
    }
  }
  if (i > startPos) {
    var str = this.expression.substring(startPos, i);
    if (this.isOperatorEnabled(str) && (str in this.binaryOps || str in this.unaryOps || str in this.ternaryOps)) {
      this.current = this.newToken(TOP, str);
      this.pos += str.length;
      return true;
    }
  }
  return false;
};

TokenStream.prototype.isName = function () {
  var startPos = this.pos;
  var i = startPos;
  var hasLetter = false;
  for (; i < this.expression.length; i++) {
    var c = this.expression.charAt(i);
    if (c.toUpperCase() === c.toLowerCase()) {
      if (i === this.pos && (c === '$' || c === '_')) {
        if (c === '_') {
          hasLetter = true;
        }
        continue;
      } else if (i === this.pos || !hasLetter || (c !== '_' && (c < '0' || c > '9'))) {
        break;
      }
    } else {
      hasLetter = true;
    }
  }
  if (hasLetter) {
    var str = this.expression.substring(startPos, i);
    this.current = this.newToken(TNAME, str);
    this.pos += str.length;
    return true;
  }
  return false;
};

TokenStream.prototype.isWhitespace = function () {
  var r = false;
  var c = this.expression.charAt(this.pos);
  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
    r = true;
    this.pos++;
    if (this.pos >= this.expression.length) {
      break;
    }
    c = this.expression.charAt(this.pos);
  }
  return r;
};

var codePointPattern = /^[0-9a-f]{4}$/i;

TokenStream.prototype.unescape = function (v) {
  var index = v.indexOf('\\');
  if (index < 0) {
    return v;
  }

  var buffer = v.substring(0, index);
  while (index >= 0) {
    var c = v.charAt(++index);
    switch (c) {
      case '\'':
        buffer += '\'';
        break;
      case '"':
        buffer += '"';
        break;
      case '\\':
        buffer += '\\';
        break;
      case '/':
        buffer += '/';
        break;
      case 'b':
        buffer += '\b';
        break;
      case 'f':
        buffer += '\f';
        break;
      case 'n':
        buffer += '\n';
        break;
      case 'r':
        buffer += '\r';
        break;
      case 't':
        buffer += '\t';
        break;
      case 'u':
        // interpret the following 4 characters as the hex of the unicode code point
        var codePoint = v.substring(index + 1, index + 5);
        if (!codePointPattern.test(codePoint)) {
          this.parseError('Illegal escape sequence: \\u' + codePoint);
        }
        buffer += String.fromCharCode(parseInt(codePoint, 16));
        index += 4;
        break;
      default:
        throw this.parseError('Illegal escape sequence: "\\' + c + '"');
    }
    ++index;
    var backslash = v.indexOf('\\', index);
    buffer += v.substring(index, backslash < 0 ? v.length : backslash);
    index = backslash;
  }

  return buffer;
};

TokenStream.prototype.isComment = function () {
  var c = this.expression.charAt(this.pos);
  if (c === '/' && this.expression.charAt(this.pos + 1) === '*') {
    this.pos = this.expression.indexOf('*/', this.pos) + 2;
    if (this.pos === 1) {
      this.pos = this.expression.length;
    }
    return true;
  }
  return false;
};

TokenStream.prototype.isRadixInteger = function () {
  var pos = this.pos;

  if (pos >= this.expression.length - 2 || this.expression.charAt(pos) !== '0') {
    return false;
  }
  ++pos;

  var radix;
  var validDigit;
  if (this.expression.charAt(pos) === 'x') {
    radix = 16;
    validDigit = /^[0-9a-f]$/i;
    ++pos;
  } else if (this.expression.charAt(pos) === 'b') {
    radix = 2;
    validDigit = /^[01]$/i;
    ++pos;
  } else {
    return false;
  }

  var valid = false;
  var startPos = pos;

  while (pos < this.expression.length) {
    var c = this.expression.charAt(pos);
    if (validDigit.test(c)) {
      pos++;
      valid = true;
    } else {
      break;
    }
  }

  if (valid) {
    this.current = this.newToken(TNUMBER, parseInt(this.expression.substring(startPos, pos), radix));
    this.pos = pos;
  }
  return valid;
};

TokenStream.prototype.isNumber = function () {
  var valid = false;
  var pos = this.pos;
  var startPos = pos;
  var resetPos = pos;
  var foundDot = false;
  var foundDigits = false;
  var c;

  while (pos < this.expression.length) {
    c = this.expression.charAt(pos);
    if ((c >= '0' && c <= '9') || (!foundDot && c === '.')) {
      if (c === '.') {
        foundDot = true;
      } else {
        foundDigits = true;
      }
      pos++;
      valid = foundDigits;
    } else {
      break;
    }
  }

  if (valid) {
    resetPos = pos;
  }

  if (c === 'e' || c === 'E') {
    pos++;
    var acceptSign = true;
    var validExponent = false;
    while (pos < this.expression.length) {
      c = this.expression.charAt(pos);
      if (acceptSign && (c === '+' || c === '-')) {
        acceptSign = false;
      } else if (c >= '0' && c <= '9') {
        validExponent = true;
        acceptSign = false;
      } else {
        break;
      }
      pos++;
    }

    if (!validExponent) {
      pos = resetPos;
    }
  }

  if (valid) {
    this.current = this.newToken(TNUMBER, parseFloat(this.expression.substring(startPos, pos)));
    this.pos = pos;
  } else {
    this.pos = resetPos;
  }
  return valid;
};

TokenStream.prototype.isOperator = function () {
  var startPos = this.pos;
  var c = this.expression.charAt(this.pos);

  if (c === '+' || c === '-' || c === '*' || c === '/' || c === '%' || c === '^' || c === '?' || c === ':' || c === '.') {
    this.current = this.newToken(TOP, c);
  } else if (c === '∙' || c === '•') {
    this.current = this.newToken(TOP, '*');
  } else if (c === '>') {
    if (this.expression.charAt(this.pos + 1) === '=') {
      this.current = this.newToken(TOP, '>=');
      this.pos++;
    } else {
      this.current = this.newToken(TOP, '>');
    }
  } else if (c === '<') {
    if (this.expression.charAt(this.pos + 1) === '=') {
      this.current = this.newToken(TOP, '<=');
      this.pos++;
    } else {
      this.current = this.newToken(TOP, '<');
    }
  } else if (c === '|') {
    if (this.expression.charAt(this.pos + 1) === '|') {
      this.current = this.newToken(TOP, '||');
      this.pos++;
    } else {
      return false;
    }
  } else if (c === '=') {
    if (this.expression.charAt(this.pos + 1) === '=') {
      this.current = this.newToken(TOP, '==');
      this.pos++;
    } else {
      this.current = this.newToken(TOP, c);
    }
  } else if (c === '!') {
    if (this.expression.charAt(this.pos + 1) === '=') {
      this.current = this.newToken(TOP, '!=');
      this.pos++;
    } else {
      this.current = this.newToken(TOP, c);
    }
  } else {
    return false;
  }
  this.pos++;

  if (this.isOperatorEnabled(this.current.value)) {
    return true;
  } else {
    this.pos = startPos;
    return false;
  }
};

TokenStream.prototype.isOperatorEnabled = function (op) {
  return this.parser.isOperatorEnabled(op);
};

TokenStream.prototype.getCoordinates = function () {
  var line = 0;
  var column;
  var newline = -1;
  do {
    line++;
    column = this.pos - newline;
    newline = this.expression.indexOf('\n', newline + 1);
  } while (newline >= 0 && newline < this.pos);

  return {
    line: line,
    column: column
  };
};

TokenStream.prototype.parseError = function (msg) {
  var coords = this.getCoordinates();
  throw new Error('parse error [' + coords.line + ':' + coords.column + ']: ' + msg);
};

function ParserState(parser, tokenStream, options) {
  this.parser = parser;
  this.tokens = tokenStream;
  this.current = null;
  this.nextToken = null;
  this.next();
  this.savedCurrent = null;
  this.savedNextToken = null;
  this.allowMemberAccess = options.allowMemberAccess !== false;
}

ParserState.prototype.next = function () {
  this.current = this.nextToken;
  return (this.nextToken = this.tokens.next());
};

ParserState.prototype.tokenMatches = function (token, value) {
  if (typeof value === 'undefined') {
    return true;
  } else if (Array.isArray(value)) {
    return contains(value, token.value);
  } else if (typeof value === 'function') {
    return value(token);
  } else {
    return token.value === value;
  }
};

ParserState.prototype.save = function () {
  this.savedCurrent = this.current;
  this.savedNextToken = this.nextToken;
  this.tokens.save();
};

ParserState.prototype.restore = function () {
  this.tokens.restore();
  this.current = this.savedCurrent;
  this.nextToken = this.savedNextToken;
};

ParserState.prototype.accept = function (type, value) {
  if (this.nextToken.type === type && this.tokenMatches(this.nextToken, value)) {
    this.next();
    return true;
  }
  return false;
};

ParserState.prototype.expect = function (type, value) {
  if (!this.accept(type, value)) {
    var coords = this.tokens.getCoordinates();
    throw new Error('parse error [' + coords.line + ':' + coords.column + ']: Expected ' + (value || type));
  }
};

ParserState.prototype.parseAtom = function (instr) {
  var unaryOps = this.tokens.unaryOps;
  function isPrefixOperator(token) {
    return token.value in unaryOps;
  }

  if (this.accept(TNAME) || this.accept(TOP, isPrefixOperator)) {
    instr.push(new Instruction(IVAR, this.current.value));
  } else if (this.accept(TNUMBER)) {
    instr.push(new Instruction(INUMBER, this.current.value));
  } else if (this.accept(TSTRING)) {
    instr.push(new Instruction(INUMBER, this.current.value));
  } else if (this.accept(TPAREN, '(')) {
    this.parseExpression(instr);
    this.expect(TPAREN, ')');
  } else if (this.accept(TBRACKET, '[')) {
    if (this.accept(TBRACKET, ']')) {
      instr.push(new Instruction(IARRAY, 0));
    } else {
      var argCount = this.parseArrayList(instr);
      instr.push(new Instruction(IARRAY, argCount));
    }
  } else {
    throw new Error('unexpected ' + this.nextToken);
  }
};

ParserState.prototype.parseExpression = function (instr) {
  var exprInstr = [];
  if (this.parseUntilEndStatement(instr, exprInstr)) {
    return;
  }
  this.parseVariableAssignmentExpression(exprInstr);
  if (this.parseUntilEndStatement(instr, exprInstr)) {
    return;
  }
  this.pushExpression(instr, exprInstr);
};

ParserState.prototype.pushExpression = function (instr, exprInstr) {
  for (var i = 0, len = exprInstr.length; i < len; i++) {
    instr.push(exprInstr[i]);
  }
};

ParserState.prototype.parseUntilEndStatement = function (instr, exprInstr) {
  if (!this.accept(TSEMICOLON)) return false;
  if (this.nextToken && this.nextToken.type !== TEOF && !(this.nextToken.type === TPAREN && this.nextToken.value === ')')) {
    exprInstr.push(new Instruction(IENDSTATEMENT));
  }
  if (this.nextToken.type !== TEOF) {
    this.parseExpression(exprInstr);
  }
  instr.push(new Instruction(IEXPR, exprInstr));
  return true;
};

ParserState.prototype.parseArrayList = function (instr) {
  var argCount = 0;

  while (!this.accept(TBRACKET, ']')) {
    this.parseExpression(instr);
    ++argCount;
    while (this.accept(TCOMMA)) {
      this.parseExpression(instr);
      ++argCount;
    }
  }

  return argCount;
};

ParserState.prototype.parseVariableAssignmentExpression = function (instr) {
  this.parseConditionalExpression(instr);
  while (this.accept(TOP, '=')) {
    var varName = instr.pop();
    var varValue = [];
    var lastInstrIndex = instr.length - 1;
    if (varName.type === IFUNCALL) {
      if (!this.tokens.isOperatorEnabled('()=')) {
        throw new Error('function definition is not permitted');
      }
      for (var i = 0, len = varName.value + 1; i < len; i++) {
        var index = lastInstrIndex - i;
        if (instr[index].type === IVAR) {
          instr[index] = new Instruction(IVARNAME, instr[index].value);
        }
      }
      this.parseVariableAssignmentExpression(varValue);
      instr.push(new Instruction(IEXPR, varValue));
      instr.push(new Instruction(IFUNDEF, varName.value));
      continue;
    }
    if (varName.type !== IVAR && varName.type !== IMEMBER) {
      throw new Error('expected variable for assignment');
    }
    this.parseVariableAssignmentExpression(varValue);
    instr.push(new Instruction(IVARNAME, varName.value));
    instr.push(new Instruction(IEXPR, varValue));
    instr.push(binaryInstruction('='));
  }
};

ParserState.prototype.parseConditionalExpression = function (instr) {
  this.parseOrExpression(instr);
  while (this.accept(TOP, '?')) {
    var trueBranch = [];
    var falseBranch = [];
    this.parseConditionalExpression(trueBranch);
    this.expect(TOP, ':');
    this.parseConditionalExpression(falseBranch);
    instr.push(new Instruction(IEXPR, trueBranch));
    instr.push(new Instruction(IEXPR, falseBranch));
    instr.push(ternaryInstruction('?'));
  }
};

ParserState.prototype.parseOrExpression = function (instr) {
  this.parseAndExpression(instr);
  while (this.accept(TOP, 'or')) {
    var falseBranch = [];
    this.parseAndExpression(falseBranch);
    instr.push(new Instruction(IEXPR, falseBranch));
    instr.push(binaryInstruction('or'));
  }
};

ParserState.prototype.parseAndExpression = function (instr) {
  this.parseComparison(instr);
  while (this.accept(TOP, 'and')) {
    var trueBranch = [];
    this.parseComparison(trueBranch);
    instr.push(new Instruction(IEXPR, trueBranch));
    instr.push(binaryInstruction('and'));
  }
};

var COMPARISON_OPERATORS = ['==', '!=', '<', '<=', '>=', '>', 'in'];

ParserState.prototype.parseComparison = function (instr) {
  this.parseAddSub(instr);
  while (this.accept(TOP, COMPARISON_OPERATORS)) {
    var op = this.current;
    this.parseAddSub(instr);
    instr.push(binaryInstruction(op.value));
  }
};

var ADD_SUB_OPERATORS = ['+', '-', '||'];

ParserState.prototype.parseAddSub = function (instr) {
  this.parseTerm(instr);
  while (this.accept(TOP, ADD_SUB_OPERATORS)) {
    var op = this.current;
    this.parseTerm(instr);
    instr.push(binaryInstruction(op.value));
  }
};

var TERM_OPERATORS = ['*', '/', '%'];

ParserState.prototype.parseTerm = function (instr) {
  this.parseFactor(instr);
  while (this.accept(TOP, TERM_OPERATORS)) {
    var op = this.current;
    this.parseFactor(instr);
    instr.push(binaryInstruction(op.value));
  }
};

ParserState.prototype.parseFactor = function (instr) {
  var unaryOps = this.tokens.unaryOps;
  function isPrefixOperator(token) {
    return token.value in unaryOps;
  }

  this.save();
  if (this.accept(TOP, isPrefixOperator)) {
    if (this.current.value !== '-' && this.current.value !== '+') {
      if (this.nextToken.type === TPAREN && this.nextToken.value === '(') {
        this.restore();
        this.parseExponential(instr);
        return;
      } else if (this.nextToken.type === TSEMICOLON || this.nextToken.type === TCOMMA || this.nextToken.type === TEOF || (this.nextToken.type === TPAREN && this.nextToken.value === ')')) {
        this.restore();
        this.parseAtom(instr);
        return;
      }
    }

    var op = this.current;
    this.parseFactor(instr);
    instr.push(unaryInstruction(op.value));
  } else {
    this.parseExponential(instr);
  }
};

ParserState.prototype.parseExponential = function (instr) {
  this.parsePostfixExpression(instr);
  while (this.accept(TOP, '^')) {
    this.parseFactor(instr);
    instr.push(binaryInstruction('^'));
  }
};

ParserState.prototype.parsePostfixExpression = function (instr) {
  this.parseFunctionCall(instr);
  while (this.accept(TOP, '!')) {
    instr.push(unaryInstruction('!'));
  }
};

ParserState.prototype.parseFunctionCall = function (instr) {
  var unaryOps = this.tokens.unaryOps;
  function isPrefixOperator(token) {
    return token.value in unaryOps;
  }

  if (this.accept(TOP, isPrefixOperator)) {
    var op = this.current;
    this.parseAtom(instr);
    instr.push(unaryInstruction(op.value));
  } else {
    this.parseMemberExpression(instr);
    while (this.accept(TPAREN, '(')) {
      if (this.accept(TPAREN, ')')) {
        instr.push(new Instruction(IFUNCALL, 0));
      } else {
        var argCount = this.parseArgumentList(instr);
        instr.push(new Instruction(IFUNCALL, argCount));
      }
    }
  }
};

ParserState.prototype.parseArgumentList = function (instr) {
  var argCount = 0;

  while (!this.accept(TPAREN, ')')) {
    this.parseExpression(instr);
    ++argCount;
    while (this.accept(TCOMMA)) {
      this.parseExpression(instr);
      ++argCount;
    }
  }

  return argCount;
};

ParserState.prototype.parseMemberExpression = function (instr) {
  this.parseAtom(instr);
  while (this.accept(TOP, '.') || this.accept(TBRACKET, '[')) {
    var op = this.current;

    if (op.value === '.') {
      if (!this.allowMemberAccess) {
        throw new Error('unexpected ".", member access is not permitted');
      }

      this.expect(TNAME);
      instr.push(new Instruction(IMEMBER, this.current.value));
    } else if (op.value === '[') {
      if (!this.tokens.isOperatorEnabled('[')) {
        throw new Error('unexpected "[]", arrays are disabled');
      }

      this.parseExpression(instr);
      this.expect(TBRACKET, ']');
      instr.push(binaryInstruction('['));
    } else {
      throw new Error('unexpected symbol: ' + op.value);
    }
  }
};

function add(a, b) {
  return Number(a) + Number(b);
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

function mod(a, b) {
  return a % b;
}

function concat(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b);
  }
  return '' + a + b;
}

function equal(a, b) {
  return a === b;
}

function notEqual(a, b) {
  return a !== b;
}

function greaterThan(a, b) {
  return a > b;
}

function lessThan(a, b) {
  return a < b;
}

function greaterThanEqual(a, b) {
  return a >= b;
}

function lessThanEqual(a, b) {
  return a <= b;
}

function andOperator(a, b) {
  return Boolean(a && b);
}

function orOperator(a, b) {
  return Boolean(a || b);
}

function inOperator(a, b) {
  return contains(b, a);
}

function sinh(a) {
  return ((Math.exp(a) - Math.exp(-a)) / 2);
}

function cosh(a) {
  return ((Math.exp(a) + Math.exp(-a)) / 2);
}

function tanh(a) {
  if (a === Infinity) return 1;
  if (a === -Infinity) return -1;
  return (Math.exp(a) - Math.exp(-a)) / (Math.exp(a) + Math.exp(-a));
}

function asinh(a) {
  if (a === -Infinity) return a;
  return Math.log(a + Math.sqrt((a * a) + 1));
}

function acosh(a) {
  return Math.log(a + Math.sqrt((a * a) - 1));
}

function atanh(a) {
  return (Math.log((1 + a) / (1 - a)) / 2);
}

function log10(a) {
  return Math.log(a) * Math.LOG10E;
}

function neg(a) {
  return -a;
}

function not(a) {
  return !a;
}

function trunc(a) {
  return a < 0 ? Math.ceil(a) : Math.floor(a);
}

function random(a) {
  return Math.random() * (a || 1);
}

function factorial(a) { // a!
  return gamma(a + 1);
}

function isInteger(value) {
  return isFinite(value) && (value === Math.round(value));
}

var GAMMA_G = 4.7421875;
var GAMMA_P = [
  0.99999999999999709182,
  57.156235665862923517, -59.597960355475491248,
  14.136097974741747174, -0.49191381609762019978,
  0.33994649984811888699e-4,
  0.46523628927048575665e-4, -0.98374475304879564677e-4,
  0.15808870322491248884e-3, -0.21026444172410488319e-3,
  0.21743961811521264320e-3, -0.16431810653676389022e-3,
  0.84418223983852743293e-4, -0.26190838401581408670e-4,
  0.36899182659531622704e-5
];

// Gamma function from math.js
function gamma(n) {
  var t, x;

  if (isInteger(n)) {
    if (n <= 0) {
      return isFinite(n) ? Infinity : NaN;
    }

    if (n > 171) {
      return Infinity; // Will overflow
    }

    var value = n - 2;
    var res = n - 1;
    while (value > 1) {
      res *= value;
      value--;
    }

    if (res === 0) {
      res = 1; // 0! is per definition 1
    }

    return res;
  }

  if (n < 0.5) {
    return Math.PI / (Math.sin(Math.PI * n) * gamma(1 - n));
  }

  if (n >= 171.35) {
    return Infinity; // will overflow
  }

  if (n > 85.0) { // Extended Stirling Approx
    var twoN = n * n;
    var threeN = twoN * n;
    var fourN = threeN * n;
    var fiveN = fourN * n;
    return Math.sqrt(2 * Math.PI / n) * Math.pow((n / Math.E), n) *
      (1 + (1 / (12 * n)) + (1 / (288 * twoN)) - (139 / (51840 * threeN)) -
      (571 / (2488320 * fourN)) + (163879 / (209018880 * fiveN)) +
      (5246819 / (75246796800 * fiveN * n)));
  }

  --n;
  x = GAMMA_P[0];
  for (var i = 1; i < GAMMA_P.length; ++i) {
    x += GAMMA_P[i] / (n + i);
  }

  t = n + GAMMA_G + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
}

function stringOrArrayLength(s) {
  if (Array.isArray(s)) {
    return s.length;
  }
  return String(s).length;
}

function hypot() {
  var sum = 0;
  var larg = 0;
  for (var i = 0; i < arguments.length; i++) {
    var arg = Math.abs(arguments[i]);
    var div;
    if (larg < arg) {
      div = larg / arg;
      sum = (sum * div * div) + 1;
      larg = arg;
    } else if (arg > 0) {
      div = arg / larg;
      sum += div * div;
    } else {
      sum += arg;
    }
  }
  return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
}

function condition(cond, yep, nope) {
  return cond ? yep : nope;
}

/**
* Decimal adjustment of a number.
* From @escopecz.
*
* @param {Number} value The number.
* @param {Integer} exp  The exponent (the 10 logarithm of the adjustment base).
* @return {Number} The adjusted value.
*/
function roundTo(value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math.round(value);
  }
  value = +value;
  exp = -(+exp);
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

function setVar(name, value, variables) {
  if (variables) variables[name] = value;
  return value;
}

function arrayIndex(array, index) {
  return array[index | 0];
}

function max(array) {
  if (arguments.length === 1 && Array.isArray(array)) {
    return Math.max.apply(Math, array);
  } else {
    return Math.max.apply(Math, arguments);
  }
}

function min(array) {
  if (arguments.length === 1 && Array.isArray(array)) {
    return Math.min.apply(Math, array);
  } else {
    return Math.min.apply(Math, arguments);
  }
}

function arrayMap(f, a) {
  if (typeof f !== 'function') {
    throw new Error('First argument to map is not a function');
  }
  if (!Array.isArray(a)) {
    throw new Error('Second argument to map is not an array');
  }
  return a.map(function (x, i) {
    return f(x, i);
  });
}

function arrayFold(f, init, a) {
  if (typeof f !== 'function') {
    throw new Error('First argument to fold is not a function');
  }
  if (!Array.isArray(a)) {
    throw new Error('Second argument to fold is not an array');
  }
  return a.reduce(function (acc, x, i) {
    return f(acc, x, i);
  }, init);
}

function arrayFilter(f, a) {
  if (typeof f !== 'function') {
    throw new Error('First argument to filter is not a function');
  }
  if (!Array.isArray(a)) {
    throw new Error('Second argument to filter is not an array');
  }
  return a.filter(function (x, i) {
    return f(x, i);
  });
}

function stringOrArrayIndexOf(target, s) {
  if (!(Array.isArray(s) || typeof s === 'string')) {
    throw new Error('Second argument to indexOf is not a string or array');
  }

  return s.indexOf(target);
}

function arrayJoin(sep, a) {
  if (!Array.isArray(a)) {
    throw new Error('Second argument to join is not an array');
  }

  return a.join(sep);
}

function sign(x) {
  return ((x > 0) - (x < 0)) || +x;
}

var ONE_THIRD = 1/3;
function cbrt(x) {
  return x < 0 ? -Math.pow(-x, ONE_THIRD) : Math.pow(x, ONE_THIRD);
}

function expm1(x) {
  return Math.exp(x) - 1;
}

function log1p(x) {
  return Math.log(1 + x);
}

function log2(x) {
  return Math.log(x) / Math.LN2;
}

function Parser(options) {
  this.options = options || {};
  this.unaryOps = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    sinh: Math.sinh || sinh,
    cosh: Math.cosh || cosh,
    tanh: Math.tanh || tanh,
    asinh: Math.asinh || asinh,
    acosh: Math.acosh || acosh,
    atanh: Math.atanh || atanh,
    sqrt: Math.sqrt,
    cbrt: Math.cbrt || cbrt,
    log: Math.log,
    log2: Math.log2 || log2,
    ln: Math.log,
    lg: Math.log10 || log10,
    log10: Math.log10 || log10,
    expm1: Math.expm1 || expm1,
    log1p: Math.log1p || log1p,
    abs: Math.abs,
    ceil: Math.ceil,
    floor: Math.floor,
    round: Math.round,
    trunc: Math.trunc || trunc,
    '-': neg,
    '+': Number,
    exp: Math.exp,
    not: not,
    length: stringOrArrayLength,
    '!': factorial,
    sign: Math.sign || sign
  };

  this.binaryOps = {
    '+': add,
    '-': sub,
    '*': mul,
    '/': div,
    '%': mod,
    '^': Math.pow,
    '||': concat,
    '==': equal,
    '!=': notEqual,
    '>': greaterThan,
    '<': lessThan,
    '>=': greaterThanEqual,
    '<=': lessThanEqual,
    and: andOperator,
    or: orOperator,
    'in': inOperator,
    '=': setVar,
    '[': arrayIndex
  };

  this.ternaryOps = {
    '?': condition
  };

  this.functions = {
    random: random,
    fac: factorial,
    min: min,
    max: max,
    hypot: Math.hypot || hypot,
    pyt: Math.hypot || hypot, // backward compat
    pow: Math.pow,
    atan2: Math.atan2,
    'if': condition,
    gamma: gamma,
    roundTo: roundTo,
    map: arrayMap,
    fold: arrayFold,
    filter: arrayFilter,
    indexOf: stringOrArrayIndexOf,
    join: arrayJoin
  };

  this.consts = {
    E: Math.E,
    PI: Math.PI,
    'true': true,
    'false': false
  };
}

Parser.prototype.parse = function (expr) {
  var instr = [];
  var parserState = new ParserState(
    this,
    new TokenStream(this, expr),
    { allowMemberAccess: this.options.allowMemberAccess }
  );

  parserState.parseExpression(instr);
  parserState.expect(TEOF, 'EOF');

  return new Expression(instr, this);
};

Parser.prototype.evaluate = function (expr, variables) {
  return this.parse(expr).evaluate(variables);
};

var sharedParser = new Parser();

Parser.parse = function (expr) {
  return sharedParser.parse(expr);
};

Parser.evaluate = function (expr, variables) {
  return sharedParser.parse(expr).evaluate(variables);
};

var optionNameMap = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  '%': 'remainder',
  '^': 'power',
  '!': 'factorial',
  '<': 'comparison',
  '>': 'comparison',
  '<=': 'comparison',
  '>=': 'comparison',
  '==': 'comparison',
  '!=': 'comparison',
  '||': 'concatenate',
  'and': 'logical',
  'or': 'logical',
  'not': 'logical',
  '?': 'conditional',
  ':': 'conditional',
  '=': 'assignment',
  '[': 'array',
  '()=': 'fndef'
};

function getOptionName(op) {
  return optionNameMap.hasOwnProperty(op) ? optionNameMap[op] : op;
}

Parser.prototype.isOperatorEnabled = function (op) {
  var optionName = getOptionName(op);
  var operators = this.options.operators || {};

  return !(optionName in operators) || !!operators[optionName];
};

/*!
 Based on ndef.parser, by Raphael Graf(r@undefined.ch)
 http://www.undefined.ch/mparser/index.html

 Ported to JavaScript and modified by Matthew Crumley (email@matthewcrumley.com, http://silentmatt.com/)

 You are free to use and modify this code in anyway you find useful. Please leave this comment in the code
 to acknowledge its original source. If you feel like it, I enjoy hearing about projects that use my code,
 but don't feel like you have to let me know or ask permission.
*/

// Backwards compatibility
var index = {
  Parser: Parser,
  Expression: Expression
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isd0JBQXdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtCQUFrQixlQUFlO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDLDZDQUE2QyxTQUFTO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWLHVDQUF1QyxvRkFBb0Y7QUFDM0gsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RSxtQkFBbUI7QUFDMUYsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNLG1DQUFtQztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLHdIQUF3SCwyRUFBMkUsSUFBSTtBQUN2TTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUyw0QkFBNEI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDRCQUE0QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyw0QkFBNEI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQyxFQUFFOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsU0FBUztBQUNuRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxTQUFTO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLFVBQVUsU0FBUztBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLEtBQUssRUFBQztBQUNTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9leHByLWV2YWwvZGlzdC9pbmRleC5tanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIElOVU1CRVIgPSAnSU5VTUJFUic7XG52YXIgSU9QMSA9ICdJT1AxJztcbnZhciBJT1AyID0gJ0lPUDInO1xudmFyIElPUDMgPSAnSU9QMyc7XG52YXIgSVZBUiA9ICdJVkFSJztcbnZhciBJVkFSTkFNRSA9ICdJVkFSTkFNRSc7XG52YXIgSUZVTkNBTEwgPSAnSUZVTkNBTEwnO1xudmFyIElGVU5ERUYgPSAnSUZVTkRFRic7XG52YXIgSUVYUFIgPSAnSUVYUFInO1xudmFyIElFWFBSRVZBTCA9ICdJRVhQUkVWQUwnO1xudmFyIElNRU1CRVIgPSAnSU1FTUJFUic7XG52YXIgSUVORFNUQVRFTUVOVCA9ICdJRU5EU1RBVEVNRU5UJztcbnZhciBJQVJSQVkgPSAnSUFSUkFZJztcblxuZnVuY3Rpb24gSW5zdHJ1Y3Rpb24odHlwZSwgdmFsdWUpIHtcbiAgdGhpcy50eXBlID0gdHlwZTtcbiAgdGhpcy52YWx1ZSA9ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSA/IHZhbHVlIDogMDtcbn1cblxuSW5zdHJ1Y3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgIGNhc2UgSU5VTUJFUjpcbiAgICBjYXNlIElPUDE6XG4gICAgY2FzZSBJT1AyOlxuICAgIGNhc2UgSU9QMzpcbiAgICBjYXNlIElWQVI6XG4gICAgY2FzZSBJVkFSTkFNRTpcbiAgICBjYXNlIElFTkRTVEFURU1FTlQ6XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICBjYXNlIElGVU5DQUxMOlxuICAgICAgcmV0dXJuICdDQUxMICcgKyB0aGlzLnZhbHVlO1xuICAgIGNhc2UgSUZVTkRFRjpcbiAgICAgIHJldHVybiAnREVGICcgKyB0aGlzLnZhbHVlO1xuICAgIGNhc2UgSUFSUkFZOlxuICAgICAgcmV0dXJuICdBUlJBWSAnICsgdGhpcy52YWx1ZTtcbiAgICBjYXNlIElNRU1CRVI6XG4gICAgICByZXR1cm4gJy4nICsgdGhpcy52YWx1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICdJbnZhbGlkIEluc3RydWN0aW9uJztcbiAgfVxufTtcblxuZnVuY3Rpb24gdW5hcnlJbnN0cnVjdGlvbih2YWx1ZSkge1xuICByZXR1cm4gbmV3IEluc3RydWN0aW9uKElPUDEsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gYmluYXJ5SW5zdHJ1Y3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihJT1AyLCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHRlcm5hcnlJbnN0cnVjdGlvbih2YWx1ZSkge1xuICByZXR1cm4gbmV3IEluc3RydWN0aW9uKElPUDMsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gc2ltcGxpZnkodG9rZW5zLCB1bmFyeU9wcywgYmluYXJ5T3BzLCB0ZXJuYXJ5T3BzLCB2YWx1ZXMpIHtcbiAgdmFyIG5zdGFjayA9IFtdO1xuICB2YXIgbmV3ZXhwcmVzc2lvbiA9IFtdO1xuICB2YXIgbjEsIG4yLCBuMztcbiAgdmFyIGY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSB0b2tlbnNbaV07XG4gICAgdmFyIHR5cGUgPSBpdGVtLnR5cGU7XG4gICAgaWYgKHR5cGUgPT09IElOVU1CRVIgfHwgdHlwZSA9PT0gSVZBUk5BTUUpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0udmFsdWUpKSB7XG4gICAgICAgIG5zdGFjay5wdXNoLmFwcGx5KG5zdGFjaywgc2ltcGxpZnkoaXRlbS52YWx1ZS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKElOVU1CRVIsIHgpO1xuICAgICAgICB9KS5jb25jYXQobmV3IEluc3RydWN0aW9uKElBUlJBWSwgaXRlbS52YWx1ZS5sZW5ndGgpKSwgdW5hcnlPcHMsIGJpbmFyeU9wcywgdGVybmFyeU9wcywgdmFsdWVzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuc3RhY2sucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElWQVIgJiYgdmFsdWVzLmhhc093blByb3BlcnR5KGl0ZW0udmFsdWUpKSB7XG4gICAgICBpdGVtID0gbmV3IEluc3RydWN0aW9uKElOVU1CRVIsIHZhbHVlc1tpdGVtLnZhbHVlXSk7XG4gICAgICBuc3RhY2sucHVzaChpdGVtKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElPUDIgJiYgbnN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgIG4yID0gbnN0YWNrLnBvcCgpO1xuICAgICAgbjEgPSBuc3RhY2sucG9wKCk7XG4gICAgICBmID0gYmluYXJ5T3BzW2l0ZW0udmFsdWVdO1xuICAgICAgaXRlbSA9IG5ldyBJbnN0cnVjdGlvbihJTlVNQkVSLCBmKG4xLnZhbHVlLCBuMi52YWx1ZSkpO1xuICAgICAgbnN0YWNrLnB1c2goaXRlbSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJT1AzICYmIG5zdGFjay5sZW5ndGggPiAyKSB7XG4gICAgICBuMyA9IG5zdGFjay5wb3AoKTtcbiAgICAgIG4yID0gbnN0YWNrLnBvcCgpO1xuICAgICAgbjEgPSBuc3RhY2sucG9wKCk7XG4gICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gJz8nKSB7XG4gICAgICAgIG5zdGFjay5wdXNoKG4xLnZhbHVlID8gbjIudmFsdWUgOiBuMy52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmID0gdGVybmFyeU9wc1tpdGVtLnZhbHVlXTtcbiAgICAgICAgaXRlbSA9IG5ldyBJbnN0cnVjdGlvbihJTlVNQkVSLCBmKG4xLnZhbHVlLCBuMi52YWx1ZSwgbjMudmFsdWUpKTtcbiAgICAgICAgbnN0YWNrLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJT1AxICYmIG5zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICBuMSA9IG5zdGFjay5wb3AoKTtcbiAgICAgIGYgPSB1bmFyeU9wc1tpdGVtLnZhbHVlXTtcbiAgICAgIGl0ZW0gPSBuZXcgSW5zdHJ1Y3Rpb24oSU5VTUJFUiwgZihuMS52YWx1ZSkpO1xuICAgICAgbnN0YWNrLnB1c2goaXRlbSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJRVhQUikge1xuICAgICAgd2hpbGUgKG5zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ld2V4cHJlc3Npb24ucHVzaChuc3RhY2suc2hpZnQoKSk7XG4gICAgICB9XG4gICAgICBuZXdleHByZXNzaW9uLnB1c2gobmV3IEluc3RydWN0aW9uKElFWFBSLCBzaW1wbGlmeShpdGVtLnZhbHVlLCB1bmFyeU9wcywgYmluYXJ5T3BzLCB0ZXJuYXJ5T3BzLCB2YWx1ZXMpKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJTUVNQkVSICYmIG5zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICBuMSA9IG5zdGFjay5wb3AoKTtcbiAgICAgIG5zdGFjay5wdXNoKG5ldyBJbnN0cnVjdGlvbihJTlVNQkVSLCBuMS52YWx1ZVtpdGVtLnZhbHVlXSkpO1xuICAgIH0gLyogZWxzZSBpZiAodHlwZSA9PT0gSUFSUkFZICYmIG5zdGFjay5sZW5ndGggPj0gaXRlbS52YWx1ZSkge1xuICAgICAgdmFyIGxlbmd0aCA9IGl0ZW0udmFsdWU7XG4gICAgICB3aGlsZSAobGVuZ3RoLS0gPiAwKSB7XG4gICAgICAgIG5ld2V4cHJlc3Npb24ucHVzaChuc3RhY2sucG9wKCkpO1xuICAgICAgfVxuICAgICAgbmV3ZXhwcmVzc2lvbi5wdXNoKG5ldyBJbnN0cnVjdGlvbihJQVJSQVksIGl0ZW0udmFsdWUpKTtcbiAgICB9ICovIGVsc2Uge1xuICAgICAgd2hpbGUgKG5zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ld2V4cHJlc3Npb24ucHVzaChuc3RhY2suc2hpZnQoKSk7XG4gICAgICB9XG4gICAgICBuZXdleHByZXNzaW9uLnB1c2goaXRlbSk7XG4gICAgfVxuICB9XG4gIHdoaWxlIChuc3RhY2subGVuZ3RoID4gMCkge1xuICAgIG5ld2V4cHJlc3Npb24ucHVzaChuc3RhY2suc2hpZnQoKSk7XG4gIH1cbiAgcmV0dXJuIG5ld2V4cHJlc3Npb247XG59XG5cbmZ1bmN0aW9uIHN1YnN0aXR1dGUodG9rZW5zLCB2YXJpYWJsZSwgZXhwcikge1xuICB2YXIgbmV3ZXhwcmVzc2lvbiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gdG9rZW5zW2ldO1xuICAgIHZhciB0eXBlID0gaXRlbS50eXBlO1xuICAgIGlmICh0eXBlID09PSBJVkFSICYmIGl0ZW0udmFsdWUgPT09IHZhcmlhYmxlKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGV4cHIudG9rZW5zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBleHByaXRlbSA9IGV4cHIudG9rZW5zW2pdO1xuICAgICAgICB2YXIgcmVwbGl0ZW07XG4gICAgICAgIGlmIChleHByaXRlbS50eXBlID09PSBJT1AxKSB7XG4gICAgICAgICAgcmVwbGl0ZW0gPSB1bmFyeUluc3RydWN0aW9uKGV4cHJpdGVtLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChleHByaXRlbS50eXBlID09PSBJT1AyKSB7XG4gICAgICAgICAgcmVwbGl0ZW0gPSBiaW5hcnlJbnN0cnVjdGlvbihleHByaXRlbS52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXhwcml0ZW0udHlwZSA9PT0gSU9QMykge1xuICAgICAgICAgIHJlcGxpdGVtID0gdGVybmFyeUluc3RydWN0aW9uKGV4cHJpdGVtLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBsaXRlbSA9IG5ldyBJbnN0cnVjdGlvbihleHByaXRlbS50eXBlLCBleHByaXRlbS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3ZXhwcmVzc2lvbi5wdXNoKHJlcGxpdGVtKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElFWFBSKSB7XG4gICAgICBuZXdleHByZXNzaW9uLnB1c2gobmV3IEluc3RydWN0aW9uKElFWFBSLCBzdWJzdGl0dXRlKGl0ZW0udmFsdWUsIHZhcmlhYmxlLCBleHByKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdleHByZXNzaW9uLnB1c2goaXRlbSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdleHByZXNzaW9uO1xufVxuXG5mdW5jdGlvbiBldmFsdWF0ZSh0b2tlbnMsIGV4cHIsIHZhbHVlcykge1xuICB2YXIgbnN0YWNrID0gW107XG4gIHZhciBuMSwgbjIsIG4zO1xuICB2YXIgZiwgYXJncywgYXJnQ291bnQ7XG5cbiAgaWYgKGlzRXhwcmVzc2lvbkV2YWx1YXRvcih0b2tlbnMpKSB7XG4gICAgcmV0dXJuIHJlc29sdmVFeHByZXNzaW9uKHRva2VucywgdmFsdWVzKTtcbiAgfVxuXG4gIHZhciBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtVG9rZW5zOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHRva2Vuc1tpXTtcbiAgICB2YXIgdHlwZSA9IGl0ZW0udHlwZTtcbiAgICBpZiAodHlwZSA9PT0gSU5VTUJFUiB8fCB0eXBlID09PSBJVkFSTkFNRSkge1xuICAgICAgbnN0YWNrLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJT1AyKSB7XG4gICAgICBuMiA9IG5zdGFjay5wb3AoKTtcbiAgICAgIG4xID0gbnN0YWNrLnBvcCgpO1xuICAgICAgaWYgKGl0ZW0udmFsdWUgPT09ICdhbmQnKSB7XG4gICAgICAgIG5zdGFjay5wdXNoKG4xID8gISFldmFsdWF0ZShuMiwgZXhwciwgdmFsdWVzKSA6IGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS52YWx1ZSA9PT0gJ29yJykge1xuICAgICAgICBuc3RhY2sucHVzaChuMSA/IHRydWUgOiAhIWV2YWx1YXRlKG4yLCBleHByLCB2YWx1ZXMpKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS52YWx1ZSA9PT0gJz0nKSB7XG4gICAgICAgIGYgPSBleHByLmJpbmFyeU9wc1tpdGVtLnZhbHVlXTtcbiAgICAgICAgbnN0YWNrLnB1c2goZihuMSwgZXZhbHVhdGUobjIsIGV4cHIsIHZhbHVlcyksIHZhbHVlcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZiA9IGV4cHIuYmluYXJ5T3BzW2l0ZW0udmFsdWVdO1xuICAgICAgICBuc3RhY2sucHVzaChmKHJlc29sdmVFeHByZXNzaW9uKG4xLCB2YWx1ZXMpLCByZXNvbHZlRXhwcmVzc2lvbihuMiwgdmFsdWVzKSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gSU9QMykge1xuICAgICAgbjMgPSBuc3RhY2sucG9wKCk7XG4gICAgICBuMiA9IG5zdGFjay5wb3AoKTtcbiAgICAgIG4xID0gbnN0YWNrLnBvcCgpO1xuICAgICAgaWYgKGl0ZW0udmFsdWUgPT09ICc/Jykge1xuICAgICAgICBuc3RhY2sucHVzaChldmFsdWF0ZShuMSA/IG4yIDogbjMsIGV4cHIsIHZhbHVlcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZiA9IGV4cHIudGVybmFyeU9wc1tpdGVtLnZhbHVlXTtcbiAgICAgICAgbnN0YWNrLnB1c2goZihyZXNvbHZlRXhwcmVzc2lvbihuMSwgdmFsdWVzKSwgcmVzb2x2ZUV4cHJlc3Npb24objIsIHZhbHVlcyksIHJlc29sdmVFeHByZXNzaW9uKG4zLCB2YWx1ZXMpKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJVkFSKSB7XG4gICAgICBpZiAoaXRlbS52YWx1ZSBpbiBleHByLmZ1bmN0aW9ucykge1xuICAgICAgICBuc3RhY2sucHVzaChleHByLmZ1bmN0aW9uc1tpdGVtLnZhbHVlXSk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0udmFsdWUgaW4gZXhwci51bmFyeU9wcyAmJiBleHByLnBhcnNlci5pc09wZXJhdG9yRW5hYmxlZChpdGVtLnZhbHVlKSkge1xuICAgICAgICBuc3RhY2sucHVzaChleHByLnVuYXJ5T3BzW2l0ZW0udmFsdWVdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB2ID0gdmFsdWVzW2l0ZW0udmFsdWVdO1xuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbnN0YWNrLnB1c2godik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmRlZmluZWQgdmFyaWFibGU6ICcgKyBpdGVtLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gSU9QMSkge1xuICAgICAgbjEgPSBuc3RhY2sucG9wKCk7XG4gICAgICBmID0gZXhwci51bmFyeU9wc1tpdGVtLnZhbHVlXTtcbiAgICAgIG5zdGFjay5wdXNoKGYocmVzb2x2ZUV4cHJlc3Npb24objEsIHZhbHVlcykpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElGVU5DQUxMKSB7XG4gICAgICBhcmdDb3VudCA9IGl0ZW0udmFsdWU7XG4gICAgICBhcmdzID0gW107XG4gICAgICB3aGlsZSAoYXJnQ291bnQtLSA+IDApIHtcbiAgICAgICAgYXJncy51bnNoaWZ0KHJlc29sdmVFeHByZXNzaW9uKG5zdGFjay5wb3AoKSwgdmFsdWVzKSk7XG4gICAgICB9XG4gICAgICBmID0gbnN0YWNrLnBvcCgpO1xuICAgICAgaWYgKGYuYXBwbHkgJiYgZi5jYWxsKSB7XG4gICAgICAgIG5zdGFjay5wdXNoKGYuYXBwbHkodW5kZWZpbmVkLCBhcmdzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZiArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElGVU5ERUYpIHtcbiAgICAgIC8vIENyZWF0ZSBjbG9zdXJlIHRvIGtlZXAgcmVmZXJlbmNlcyB0byBhcmd1bWVudHMgYW5kIGV4cHJlc3Npb25cbiAgICAgIG5zdGFjay5wdXNoKChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuMiA9IG5zdGFjay5wb3AoKTtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgdmFyIGFyZ0NvdW50ID0gaXRlbS52YWx1ZTtcbiAgICAgICAgd2hpbGUgKGFyZ0NvdW50LS0gPiAwKSB7XG4gICAgICAgICAgYXJncy51bnNoaWZ0KG5zdGFjay5wb3AoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG4xID0gbnN0YWNrLnBvcCgpO1xuICAgICAgICB2YXIgZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgc2NvcGUgPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZXMpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBzY29wZVthcmdzW2ldXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGV2YWx1YXRlKG4yLCBleHByLCBzY29wZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGYubmFtZSA9IG4xXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCAnbmFtZScsIHtcbiAgICAgICAgICB2YWx1ZTogbjEsXG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB2YWx1ZXNbbjFdID0gZjtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgICB9KSgpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElFWFBSKSB7XG4gICAgICBuc3RhY2sucHVzaChjcmVhdGVFeHByZXNzaW9uRXZhbHVhdG9yKGl0ZW0sIGV4cHIpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElFWFBSRVZBTCkge1xuICAgICAgbnN0YWNrLnB1c2goaXRlbSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJTUVNQkVSKSB7XG4gICAgICBuMSA9IG5zdGFjay5wb3AoKTtcbiAgICAgIG5zdGFjay5wdXNoKG4xW2l0ZW0udmFsdWVdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElFTkRTVEFURU1FTlQpIHtcbiAgICAgIG5zdGFjay5wb3AoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElBUlJBWSkge1xuICAgICAgYXJnQ291bnQgPSBpdGVtLnZhbHVlO1xuICAgICAgYXJncyA9IFtdO1xuICAgICAgd2hpbGUgKGFyZ0NvdW50LS0gPiAwKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChuc3RhY2sucG9wKCkpO1xuICAgICAgfVxuICAgICAgbnN0YWNrLnB1c2goYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBFeHByZXNzaW9uJyk7XG4gICAgfVxuICB9XG4gIGlmIChuc3RhY2subGVuZ3RoID4gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBFeHByZXNzaW9uIChwYXJpdHkpJyk7XG4gIH1cbiAgLy8gRXhwbGljaXRseSByZXR1cm4gemVybyB0byBhdm9pZCB0ZXN0IGlzc3VlcyBjYXVzZWQgYnkgLTBcbiAgcmV0dXJuIG5zdGFja1swXSA9PT0gMCA/IDAgOiByZXNvbHZlRXhwcmVzc2lvbihuc3RhY2tbMF0sIHZhbHVlcyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV4cHJlc3Npb25FdmFsdWF0b3IodG9rZW4sIGV4cHIsIHZhbHVlcykge1xuICBpZiAoaXNFeHByZXNzaW9uRXZhbHVhdG9yKHRva2VuKSkgcmV0dXJuIHRva2VuO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IElFWFBSRVZBTCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICByZXR1cm4gZXZhbHVhdGUodG9rZW4udmFsdWUsIGV4cHIsIHNjb3BlKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzRXhwcmVzc2lvbkV2YWx1YXRvcihuKSB7XG4gIHJldHVybiBuICYmIG4udHlwZSA9PT0gSUVYUFJFVkFMO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRXhwcmVzc2lvbihuLCB2YWx1ZXMpIHtcbiAgcmV0dXJuIGlzRXhwcmVzc2lvbkV2YWx1YXRvcihuKSA/IG4udmFsdWUodmFsdWVzKSA6IG47XG59XG5cbmZ1bmN0aW9uIGV4cHJlc3Npb25Ub1N0cmluZyh0b2tlbnMsIHRvSlMpIHtcbiAgdmFyIG5zdGFjayA9IFtdO1xuICB2YXIgbjEsIG4yLCBuMztcbiAgdmFyIGYsIGFyZ3MsIGFyZ0NvdW50O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gdG9rZW5zW2ldO1xuICAgIHZhciB0eXBlID0gaXRlbS50eXBlO1xuICAgIGlmICh0eXBlID09PSBJTlVNQkVSKSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0udmFsdWUgPT09ICdudW1iZXInICYmIGl0ZW0udmFsdWUgPCAwKSB7XG4gICAgICAgIG5zdGFjay5wdXNoKCcoJyArIGl0ZW0udmFsdWUgKyAnKScpO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZW0udmFsdWUpKSB7XG4gICAgICAgIG5zdGFjay5wdXNoKCdbJyArIGl0ZW0udmFsdWUubWFwKGVzY2FwZVZhbHVlKS5qb2luKCcsICcpICsgJ10nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5zdGFjay5wdXNoKGVzY2FwZVZhbHVlKGl0ZW0udmFsdWUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElPUDIpIHtcbiAgICAgIG4yID0gbnN0YWNrLnBvcCgpO1xuICAgICAgbjEgPSBuc3RhY2sucG9wKCk7XG4gICAgICBmID0gaXRlbS52YWx1ZTtcbiAgICAgIGlmICh0b0pTKSB7XG4gICAgICAgIGlmIChmID09PSAnXicpIHtcbiAgICAgICAgICBuc3RhY2sucHVzaCgnTWF0aC5wb3coJyArIG4xICsgJywgJyArIG4yICsgJyknKTtcbiAgICAgICAgfSBlbHNlIGlmIChmID09PSAnYW5kJykge1xuICAgICAgICAgIG5zdGFjay5wdXNoKCcoISEnICsgbjEgKyAnICYmICEhJyArIG4yICsgJyknKTtcbiAgICAgICAgfSBlbHNlIGlmIChmID09PSAnb3InKSB7XG4gICAgICAgICAgbnN0YWNrLnB1c2goJyghIScgKyBuMSArICcgfHwgISEnICsgbjIgKyAnKScpO1xuICAgICAgICB9IGVsc2UgaWYgKGYgPT09ICd8fCcpIHtcbiAgICAgICAgICBuc3RhY2sucHVzaCgnKGZ1bmN0aW9uKGEsYil7IHJldHVybiBBcnJheS5pc0FycmF5KGEpICYmIEFycmF5LmlzQXJyYXkoYikgPyBhLmNvbmNhdChiKSA6IFN0cmluZyhhKSArIFN0cmluZyhiKTsgfSgoJyArIG4xICsgJyksKCcgKyBuMiArICcpKSknKTtcbiAgICAgICAgfSBlbHNlIGlmIChmID09PSAnPT0nKSB7XG4gICAgICAgICAgbnN0YWNrLnB1c2goJygnICsgbjEgKyAnID09PSAnICsgbjIgKyAnKScpO1xuICAgICAgICB9IGVsc2UgaWYgKGYgPT09ICchPScpIHtcbiAgICAgICAgICBuc3RhY2sucHVzaCgnKCcgKyBuMSArICcgIT09ICcgKyBuMiArICcpJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZiA9PT0gJ1snKSB7XG4gICAgICAgICAgbnN0YWNrLnB1c2gobjEgKyAnWygnICsgbjIgKyAnKSB8IDBdJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbnN0YWNrLnB1c2goJygnICsgbjEgKyAnICcgKyBmICsgJyAnICsgbjIgKyAnKScpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZiA9PT0gJ1snKSB7XG4gICAgICAgICAgbnN0YWNrLnB1c2gobjEgKyAnWycgKyBuMiArICddJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbnN0YWNrLnB1c2goJygnICsgbjEgKyAnICcgKyBmICsgJyAnICsgbjIgKyAnKScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJT1AzKSB7XG4gICAgICBuMyA9IG5zdGFjay5wb3AoKTtcbiAgICAgIG4yID0gbnN0YWNrLnBvcCgpO1xuICAgICAgbjEgPSBuc3RhY2sucG9wKCk7XG4gICAgICBmID0gaXRlbS52YWx1ZTtcbiAgICAgIGlmIChmID09PSAnPycpIHtcbiAgICAgICAgbnN0YWNrLnB1c2goJygnICsgbjEgKyAnID8gJyArIG4yICsgJyA6ICcgKyBuMyArICcpJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgRXhwcmVzc2lvbicpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gSVZBUiB8fCB0eXBlID09PSBJVkFSTkFNRSkge1xuICAgICAgbnN0YWNrLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJT1AxKSB7XG4gICAgICBuMSA9IG5zdGFjay5wb3AoKTtcbiAgICAgIGYgPSBpdGVtLnZhbHVlO1xuICAgICAgaWYgKGYgPT09ICctJyB8fCBmID09PSAnKycpIHtcbiAgICAgICAgbnN0YWNrLnB1c2goJygnICsgZiArIG4xICsgJyknKTtcbiAgICAgIH0gZWxzZSBpZiAodG9KUykge1xuICAgICAgICBpZiAoZiA9PT0gJ25vdCcpIHtcbiAgICAgICAgICBuc3RhY2sucHVzaCgnKCcgKyAnIScgKyBuMSArICcpJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZiA9PT0gJyEnKSB7XG4gICAgICAgICAgbnN0YWNrLnB1c2goJ2ZhYygnICsgbjEgKyAnKScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5zdGFjay5wdXNoKGYgKyAnKCcgKyBuMSArICcpJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZiA9PT0gJyEnKSB7XG4gICAgICAgIG5zdGFjay5wdXNoKCcoJyArIG4xICsgJyEpJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuc3RhY2sucHVzaCgnKCcgKyBmICsgJyAnICsgbjEgKyAnKScpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gSUZVTkNBTEwpIHtcbiAgICAgIGFyZ0NvdW50ID0gaXRlbS52YWx1ZTtcbiAgICAgIGFyZ3MgPSBbXTtcbiAgICAgIHdoaWxlIChhcmdDb3VudC0tID4gMCkge1xuICAgICAgICBhcmdzLnVuc2hpZnQobnN0YWNrLnBvcCgpKTtcbiAgICAgIH1cbiAgICAgIGYgPSBuc3RhY2sucG9wKCk7XG4gICAgICBuc3RhY2sucHVzaChmICsgJygnICsgYXJncy5qb2luKCcsICcpICsgJyknKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElGVU5ERUYpIHtcbiAgICAgIG4yID0gbnN0YWNrLnBvcCgpO1xuICAgICAgYXJnQ291bnQgPSBpdGVtLnZhbHVlO1xuICAgICAgYXJncyA9IFtdO1xuICAgICAgd2hpbGUgKGFyZ0NvdW50LS0gPiAwKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChuc3RhY2sucG9wKCkpO1xuICAgICAgfVxuICAgICAgbjEgPSBuc3RhY2sucG9wKCk7XG4gICAgICBpZiAodG9KUykge1xuICAgICAgICBuc3RhY2sucHVzaCgnKCcgKyBuMSArICcgPSBmdW5jdGlvbignICsgYXJncy5qb2luKCcsICcpICsgJykgeyByZXR1cm4gJyArIG4yICsgJyB9KScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbnN0YWNrLnB1c2goJygnICsgbjEgKyAnKCcgKyBhcmdzLmpvaW4oJywgJykgKyAnKSA9ICcgKyBuMiArICcpJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJTUVNQkVSKSB7XG4gICAgICBuMSA9IG5zdGFjay5wb3AoKTtcbiAgICAgIG5zdGFjay5wdXNoKG4xICsgJy4nICsgaXRlbS52YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJQVJSQVkpIHtcbiAgICAgIGFyZ0NvdW50ID0gaXRlbS52YWx1ZTtcbiAgICAgIGFyZ3MgPSBbXTtcbiAgICAgIHdoaWxlIChhcmdDb3VudC0tID4gMCkge1xuICAgICAgICBhcmdzLnVuc2hpZnQobnN0YWNrLnBvcCgpKTtcbiAgICAgIH1cbiAgICAgIG5zdGFjay5wdXNoKCdbJyArIGFyZ3Muam9pbignLCAnKSArICddJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBJRVhQUikge1xuICAgICAgbnN0YWNrLnB1c2goJygnICsgZXhwcmVzc2lvblRvU3RyaW5nKGl0ZW0udmFsdWUsIHRvSlMpICsgJyknKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IElFTkRTVEFURU1FTlQpIDsgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgRXhwcmVzc2lvbicpO1xuICAgIH1cbiAgfVxuICBpZiAobnN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICBpZiAodG9KUykge1xuICAgICAgbnN0YWNrID0gWyBuc3RhY2suam9pbignLCcpIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIG5zdGFjayA9IFsgbnN0YWNrLmpvaW4oJzsnKSBdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gU3RyaW5nKG5zdGFja1swXSk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZVZhbHVlKHYpIHtcbiAgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KS5yZXBsYWNlKC9cXHUyMDI4L2csICdcXFxcdTIwMjgnKS5yZXBsYWNlKC9cXHUyMDI5L2csICdcXFxcdTIwMjknKTtcbiAgfVxuICByZXR1cm4gdjtcbn1cblxuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIG9iaikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSBvYmopIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFN5bWJvbHModG9rZW5zLCBzeW1ib2xzLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgd2l0aE1lbWJlcnMgPSAhIW9wdGlvbnMud2l0aE1lbWJlcnM7XG4gIHZhciBwcmV2VmFyID0gbnVsbDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gdG9rZW5zW2ldO1xuICAgIGlmIChpdGVtLnR5cGUgPT09IElWQVIgfHwgaXRlbS50eXBlID09PSBJVkFSTkFNRSkge1xuICAgICAgaWYgKCF3aXRoTWVtYmVycyAmJiAhY29udGFpbnMoc3ltYm9scywgaXRlbS52YWx1ZSkpIHtcbiAgICAgICAgc3ltYm9scy5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChwcmV2VmFyICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghY29udGFpbnMoc3ltYm9scywgcHJldlZhcikpIHtcbiAgICAgICAgICBzeW1ib2xzLnB1c2gocHJldlZhcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJldlZhciA9IGl0ZW0udmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2VmFyID0gaXRlbS52YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gSU1FTUJFUiAmJiB3aXRoTWVtYmVycyAmJiBwcmV2VmFyICE9PSBudWxsKSB7XG4gICAgICBwcmV2VmFyICs9ICcuJyArIGl0ZW0udmFsdWU7XG4gICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IElFWFBSKSB7XG4gICAgICBnZXRTeW1ib2xzKGl0ZW0udmFsdWUsIHN5bWJvbHMsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAocHJldlZhciAhPT0gbnVsbCkge1xuICAgICAgaWYgKCFjb250YWlucyhzeW1ib2xzLCBwcmV2VmFyKSkge1xuICAgICAgICBzeW1ib2xzLnB1c2gocHJldlZhcik7XG4gICAgICB9XG4gICAgICBwcmV2VmFyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpZiAocHJldlZhciAhPT0gbnVsbCAmJiAhY29udGFpbnMoc3ltYm9scywgcHJldlZhcikpIHtcbiAgICBzeW1ib2xzLnB1c2gocHJldlZhcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gRXhwcmVzc2lvbih0b2tlbnMsIHBhcnNlcikge1xuICB0aGlzLnRva2VucyA9IHRva2VucztcbiAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIHRoaXMudW5hcnlPcHMgPSBwYXJzZXIudW5hcnlPcHM7XG4gIHRoaXMuYmluYXJ5T3BzID0gcGFyc2VyLmJpbmFyeU9wcztcbiAgdGhpcy50ZXJuYXJ5T3BzID0gcGFyc2VyLnRlcm5hcnlPcHM7XG4gIHRoaXMuZnVuY3Rpb25zID0gcGFyc2VyLmZ1bmN0aW9ucztcbn1cblxuRXhwcmVzc2lvbi5wcm90b3R5cGUuc2ltcGxpZnkgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gIHZhbHVlcyA9IHZhbHVlcyB8fCB7fTtcbiAgcmV0dXJuIG5ldyBFeHByZXNzaW9uKHNpbXBsaWZ5KHRoaXMudG9rZW5zLCB0aGlzLnVuYXJ5T3BzLCB0aGlzLmJpbmFyeU9wcywgdGhpcy50ZXJuYXJ5T3BzLCB2YWx1ZXMpLCB0aGlzLnBhcnNlcik7XG59O1xuXG5FeHByZXNzaW9uLnByb3RvdHlwZS5zdWJzdGl0dXRlID0gZnVuY3Rpb24gKHZhcmlhYmxlLCBleHByKSB7XG4gIGlmICghKGV4cHIgaW5zdGFuY2VvZiBFeHByZXNzaW9uKSkge1xuICAgIGV4cHIgPSB0aGlzLnBhcnNlci5wYXJzZShTdHJpbmcoZXhwcikpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBFeHByZXNzaW9uKHN1YnN0aXR1dGUodGhpcy50b2tlbnMsIHZhcmlhYmxlLCBleHByKSwgdGhpcy5wYXJzZXIpO1xufTtcblxuRXhwcmVzc2lvbi5wcm90b3R5cGUuZXZhbHVhdGUgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gIHZhbHVlcyA9IHZhbHVlcyB8fCB7fTtcbiAgcmV0dXJuIGV2YWx1YXRlKHRoaXMudG9rZW5zLCB0aGlzLCB2YWx1ZXMpO1xufTtcblxuRXhwcmVzc2lvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBleHByZXNzaW9uVG9TdHJpbmcodGhpcy50b2tlbnMsIGZhbHNlKTtcbn07XG5cbkV4cHJlc3Npb24ucHJvdG90eXBlLnN5bWJvbHMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHZhcnMgPSBbXTtcbiAgZ2V0U3ltYm9scyh0aGlzLnRva2VucywgdmFycywgb3B0aW9ucyk7XG4gIHJldHVybiB2YXJzO1xufTtcblxuRXhwcmVzc2lvbi5wcm90b3R5cGUudmFyaWFibGVzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB2YXJzID0gW107XG4gIGdldFN5bWJvbHModGhpcy50b2tlbnMsIHZhcnMsIG9wdGlvbnMpO1xuICB2YXIgZnVuY3Rpb25zID0gdGhpcy5mdW5jdGlvbnM7XG4gIHJldHVybiB2YXJzLmZpbHRlcihmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiAhKG5hbWUgaW4gZnVuY3Rpb25zKTtcbiAgfSk7XG59O1xuXG5FeHByZXNzaW9uLnByb3RvdHlwZS50b0pTRnVuY3Rpb24gPSBmdW5jdGlvbiAocGFyYW0sIHZhcmlhYmxlcykge1xuICB2YXIgZXhwciA9IHRoaXM7XG4gIHZhciBmID0gbmV3IEZ1bmN0aW9uKHBhcmFtLCAnd2l0aCh0aGlzLmZ1bmN0aW9ucykgd2l0aCAodGhpcy50ZXJuYXJ5T3BzKSB3aXRoICh0aGlzLmJpbmFyeU9wcykgd2l0aCAodGhpcy51bmFyeU9wcykgeyByZXR1cm4gJyArIGV4cHJlc3Npb25Ub1N0cmluZyh0aGlzLnNpbXBsaWZ5KHZhcmlhYmxlcykudG9rZW5zLCB0cnVlKSArICc7IH0nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmLmFwcGx5KGV4cHIsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG52YXIgVEVPRiA9ICdURU9GJztcbnZhciBUT1AgPSAnVE9QJztcbnZhciBUTlVNQkVSID0gJ1ROVU1CRVInO1xudmFyIFRTVFJJTkcgPSAnVFNUUklORyc7XG52YXIgVFBBUkVOID0gJ1RQQVJFTic7XG52YXIgVEJSQUNLRVQgPSAnVEJSQUNLRVQnO1xudmFyIFRDT01NQSA9ICdUQ09NTUEnO1xudmFyIFROQU1FID0gJ1ROQU1FJztcbnZhciBUU0VNSUNPTE9OID0gJ1RTRU1JQ09MT04nO1xuXG5mdW5jdGlvbiBUb2tlbih0eXBlLCB2YWx1ZSwgaW5kZXgpIHtcbiAgdGhpcy50eXBlID0gdHlwZTtcbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB0aGlzLmluZGV4ID0gaW5kZXg7XG59XG5cblRva2VuLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudHlwZSArICc6ICcgKyB0aGlzLnZhbHVlO1xufTtcblxuZnVuY3Rpb24gVG9rZW5TdHJlYW0ocGFyc2VyLCBleHByZXNzaW9uKSB7XG4gIHRoaXMucG9zID0gMDtcbiAgdGhpcy5jdXJyZW50ID0gbnVsbDtcbiAgdGhpcy51bmFyeU9wcyA9IHBhcnNlci51bmFyeU9wcztcbiAgdGhpcy5iaW5hcnlPcHMgPSBwYXJzZXIuYmluYXJ5T3BzO1xuICB0aGlzLnRlcm5hcnlPcHMgPSBwYXJzZXIudGVybmFyeU9wcztcbiAgdGhpcy5jb25zdHMgPSBwYXJzZXIuY29uc3RzO1xuICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuICB0aGlzLnNhdmVkUG9zaXRpb24gPSAwO1xuICB0aGlzLnNhdmVkQ3VycmVudCA9IG51bGw7XG4gIHRoaXMub3B0aW9ucyA9IHBhcnNlci5vcHRpb25zO1xuICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcbn1cblxuVG9rZW5TdHJlYW0ucHJvdG90eXBlLm5ld1Rva2VuID0gZnVuY3Rpb24gKHR5cGUsIHZhbHVlLCBwb3MpIHtcbiAgcmV0dXJuIG5ldyBUb2tlbih0eXBlLCB2YWx1ZSwgcG9zICE9IG51bGwgPyBwb3MgOiB0aGlzLnBvcyk7XG59O1xuXG5Ub2tlblN0cmVhbS5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zYXZlZFBvc2l0aW9uID0gdGhpcy5wb3M7XG4gIHRoaXMuc2F2ZWRDdXJyZW50ID0gdGhpcy5jdXJyZW50O1xufTtcblxuVG9rZW5TdHJlYW0ucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucG9zID0gdGhpcy5zYXZlZFBvc2l0aW9uO1xuICB0aGlzLmN1cnJlbnQgPSB0aGlzLnNhdmVkQ3VycmVudDtcbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5wb3MgPj0gdGhpcy5leHByZXNzaW9uLmxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzLm5ld1Rva2VuKFRFT0YsICdFT0YnKTtcbiAgfVxuXG4gIGlmICh0aGlzLmlzV2hpdGVzcGFjZSgpIHx8IHRoaXMuaXNDb21tZW50KCkpIHtcbiAgICByZXR1cm4gdGhpcy5uZXh0KCk7XG4gIH0gZWxzZSBpZiAodGhpcy5pc1JhZGl4SW50ZWdlcigpIHx8XG4gICAgICB0aGlzLmlzTnVtYmVyKCkgfHxcbiAgICAgIHRoaXMuaXNPcGVyYXRvcigpIHx8XG4gICAgICB0aGlzLmlzU3RyaW5nKCkgfHxcbiAgICAgIHRoaXMuaXNQYXJlbigpIHx8XG4gICAgICB0aGlzLmlzQnJhY2tldCgpIHx8XG4gICAgICB0aGlzLmlzQ29tbWEoKSB8fFxuICAgICAgdGhpcy5pc1NlbWljb2xvbigpIHx8XG4gICAgICB0aGlzLmlzTmFtZWRPcCgpIHx8XG4gICAgICB0aGlzLmlzQ29uc3QoKSB8fFxuICAgICAgdGhpcy5pc05hbWUoKSkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wYXJzZUVycm9yKCdVbmtub3duIGNoYXJhY3RlciBcIicgKyB0aGlzLmV4cHJlc3Npb24uY2hhckF0KHRoaXMucG9zKSArICdcIicpO1xuICB9XG59O1xuXG5Ub2tlblN0cmVhbS5wcm90b3R5cGUuaXNTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciByID0gZmFsc2U7XG4gIHZhciBzdGFydFBvcyA9IHRoaXMucG9zO1xuICB2YXIgcXVvdGUgPSB0aGlzLmV4cHJlc3Npb24uY2hhckF0KHN0YXJ0UG9zKTtcblxuICBpZiAocXVvdGUgPT09ICdcXCcnIHx8IHF1b3RlID09PSAnXCInKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5leHByZXNzaW9uLmluZGV4T2YocXVvdGUsIHN0YXJ0UG9zICsgMSk7XG4gICAgd2hpbGUgKGluZGV4ID49IDAgJiYgdGhpcy5wb3MgPCB0aGlzLmV4cHJlc3Npb24ubGVuZ3RoKSB7XG4gICAgICB0aGlzLnBvcyA9IGluZGV4ICsgMTtcbiAgICAgIGlmICh0aGlzLmV4cHJlc3Npb24uY2hhckF0KGluZGV4IC0gMSkgIT09ICdcXFxcJykge1xuICAgICAgICB2YXIgcmF3U3RyaW5nID0gdGhpcy5leHByZXNzaW9uLnN1YnN0cmluZyhzdGFydFBvcyArIDEsIGluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5uZXdUb2tlbihUU1RSSU5HLCB0aGlzLnVuZXNjYXBlKHJhd1N0cmluZyksIHN0YXJ0UG9zKTtcbiAgICAgICAgciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaW5kZXggPSB0aGlzLmV4cHJlc3Npb24uaW5kZXhPZihxdW90ZSwgaW5kZXggKyAxKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHI7XG59O1xuXG5Ub2tlblN0cmVhbS5wcm90b3R5cGUuaXNQYXJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGMgPSB0aGlzLmV4cHJlc3Npb24uY2hhckF0KHRoaXMucG9zKTtcbiAgaWYgKGMgPT09ICcoJyB8fCBjID09PSAnKScpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm5ld1Rva2VuKFRQQVJFTiwgYyk7XG4gICAgdGhpcy5wb3MrKztcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5Ub2tlblN0cmVhbS5wcm90b3R5cGUuaXNCcmFja2V0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYyA9IHRoaXMuZXhwcmVzc2lvbi5jaGFyQXQodGhpcy5wb3MpO1xuICBpZiAoKGMgPT09ICdbJyB8fCBjID09PSAnXScpICYmIHRoaXMuaXNPcGVyYXRvckVuYWJsZWQoJ1snKSkge1xuICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV3VG9rZW4oVEJSQUNLRVQsIGMpO1xuICAgIHRoaXMucG9zKys7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuVG9rZW5TdHJlYW0ucHJvdG90eXBlLmlzQ29tbWEgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjID0gdGhpcy5leHByZXNzaW9uLmNoYXJBdCh0aGlzLnBvcyk7XG4gIGlmIChjID09PSAnLCcpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm5ld1Rva2VuKFRDT01NQSwgJywnKTtcbiAgICB0aGlzLnBvcysrO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5pc1NlbWljb2xvbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGMgPSB0aGlzLmV4cHJlc3Npb24uY2hhckF0KHRoaXMucG9zKTtcbiAgaWYgKGMgPT09ICc7Jykge1xuICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV3VG9rZW4oVFNFTUlDT0xPTiwgJzsnKTtcbiAgICB0aGlzLnBvcysrO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5pc0NvbnN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhcnRQb3MgPSB0aGlzLnBvcztcbiAgdmFyIGkgPSBzdGFydFBvcztcbiAgZm9yICg7IGkgPCB0aGlzLmV4cHJlc3Npb24ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYyA9IHRoaXMuZXhwcmVzc2lvbi5jaGFyQXQoaSk7XG4gICAgaWYgKGMudG9VcHBlckNhc2UoKSA9PT0gYy50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBpZiAoaSA9PT0gdGhpcy5wb3MgfHwgKGMgIT09ICdfJyAmJiBjICE9PSAnLicgJiYgKGMgPCAnMCcgfHwgYyA+ICc5JykpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoaSA+IHN0YXJ0UG9zKSB7XG4gICAgdmFyIHN0ciA9IHRoaXMuZXhwcmVzc2lvbi5zdWJzdHJpbmcoc3RhcnRQb3MsIGkpO1xuICAgIGlmIChzdHIgaW4gdGhpcy5jb25zdHMpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV3VG9rZW4oVE5VTUJFUiwgdGhpcy5jb25zdHNbc3RyXSk7XG4gICAgICB0aGlzLnBvcyArPSBzdHIubGVuZ3RoO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5pc05hbWVkT3AgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGFydFBvcyA9IHRoaXMucG9zO1xuICB2YXIgaSA9IHN0YXJ0UG9zO1xuICBmb3IgKDsgaSA8IHRoaXMuZXhwcmVzc2lvbi5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjID0gdGhpcy5leHByZXNzaW9uLmNoYXJBdChpKTtcbiAgICBpZiAoYy50b1VwcGVyQ2FzZSgpID09PSBjLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGlmIChpID09PSB0aGlzLnBvcyB8fCAoYyAhPT0gJ18nICYmIChjIDwgJzAnIHx8IGMgPiAnOScpKSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGkgPiBzdGFydFBvcykge1xuICAgIHZhciBzdHIgPSB0aGlzLmV4cHJlc3Npb24uc3Vic3RyaW5nKHN0YXJ0UG9zLCBpKTtcbiAgICBpZiAodGhpcy5pc09wZXJhdG9yRW5hYmxlZChzdHIpICYmIChzdHIgaW4gdGhpcy5iaW5hcnlPcHMgfHwgc3RyIGluIHRoaXMudW5hcnlPcHMgfHwgc3RyIGluIHRoaXMudGVybmFyeU9wcykpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV3VG9rZW4oVE9QLCBzdHIpO1xuICAgICAgdGhpcy5wb3MgKz0gc3RyLmxlbmd0aDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5Ub2tlblN0cmVhbS5wcm90b3R5cGUuaXNOYW1lID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhcnRQb3MgPSB0aGlzLnBvcztcbiAgdmFyIGkgPSBzdGFydFBvcztcbiAgdmFyIGhhc0xldHRlciA9IGZhbHNlO1xuICBmb3IgKDsgaSA8IHRoaXMuZXhwcmVzc2lvbi5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjID0gdGhpcy5leHByZXNzaW9uLmNoYXJBdChpKTtcbiAgICBpZiAoYy50b1VwcGVyQ2FzZSgpID09PSBjLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGlmIChpID09PSB0aGlzLnBvcyAmJiAoYyA9PT0gJyQnIHx8IGMgPT09ICdfJykpIHtcbiAgICAgICAgaWYgKGMgPT09ICdfJykge1xuICAgICAgICAgIGhhc0xldHRlciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2UgaWYgKGkgPT09IHRoaXMucG9zIHx8ICFoYXNMZXR0ZXIgfHwgKGMgIT09ICdfJyAmJiAoYyA8ICcwJyB8fCBjID4gJzknKSkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhc0xldHRlciA9IHRydWU7XG4gICAgfVxuICB9XG4gIGlmIChoYXNMZXR0ZXIpIHtcbiAgICB2YXIgc3RyID0gdGhpcy5leHByZXNzaW9uLnN1YnN0cmluZyhzdGFydFBvcywgaSk7XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5uZXdUb2tlbihUTkFNRSwgc3RyKTtcbiAgICB0aGlzLnBvcyArPSBzdHIubGVuZ3RoO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5pc1doaXRlc3BhY2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciByID0gZmFsc2U7XG4gIHZhciBjID0gdGhpcy5leHByZXNzaW9uLmNoYXJBdCh0aGlzLnBvcyk7XG4gIHdoaWxlIChjID09PSAnICcgfHwgYyA9PT0gJ1xcdCcgfHwgYyA9PT0gJ1xcbicgfHwgYyA9PT0gJ1xccicpIHtcbiAgICByID0gdHJ1ZTtcbiAgICB0aGlzLnBvcysrO1xuICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmV4cHJlc3Npb24ubGVuZ3RoKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgYyA9IHRoaXMuZXhwcmVzc2lvbi5jaGFyQXQodGhpcy5wb3MpO1xuICB9XG4gIHJldHVybiByO1xufTtcblxudmFyIGNvZGVQb2ludFBhdHRlcm4gPSAvXlswLTlhLWZdezR9JC9pO1xuXG5Ub2tlblN0cmVhbS5wcm90b3R5cGUudW5lc2NhcGUgPSBmdW5jdGlvbiAodikge1xuICB2YXIgaW5kZXggPSB2LmluZGV4T2YoJ1xcXFwnKTtcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiB2O1xuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IHYuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICB2YXIgYyA9IHYuY2hhckF0KCsraW5kZXgpO1xuICAgIHN3aXRjaCAoYykge1xuICAgICAgY2FzZSAnXFwnJzpcbiAgICAgICAgYnVmZmVyICs9ICdcXCcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgYnVmZmVyICs9ICdcIic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnXFxcXCc6XG4gICAgICAgIGJ1ZmZlciArPSAnXFxcXCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnLyc6XG4gICAgICAgIGJ1ZmZlciArPSAnLyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYic6XG4gICAgICAgIGJ1ZmZlciArPSAnXFxiJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdmJzpcbiAgICAgICAgYnVmZmVyICs9ICdcXGYnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ24nOlxuICAgICAgICBidWZmZXIgKz0gJ1xcbic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncic6XG4gICAgICAgIGJ1ZmZlciArPSAnXFxyJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0JzpcbiAgICAgICAgYnVmZmVyICs9ICdcXHQnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3UnOlxuICAgICAgICAvLyBpbnRlcnByZXQgdGhlIGZvbGxvd2luZyA0IGNoYXJhY3RlcnMgYXMgdGhlIGhleCBvZiB0aGUgdW5pY29kZSBjb2RlIHBvaW50XG4gICAgICAgIHZhciBjb2RlUG9pbnQgPSB2LnN1YnN0cmluZyhpbmRleCArIDEsIGluZGV4ICsgNSk7XG4gICAgICAgIGlmICghY29kZVBvaW50UGF0dGVybi50ZXN0KGNvZGVQb2ludCkpIHtcbiAgICAgICAgICB0aGlzLnBhcnNlRXJyb3IoJ0lsbGVnYWwgZXNjYXBlIHNlcXVlbmNlOiBcXFxcdScgKyBjb2RlUG9pbnQpO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGNvZGVQb2ludCwgMTYpKTtcbiAgICAgICAgaW5kZXggKz0gNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyB0aGlzLnBhcnNlRXJyb3IoJ0lsbGVnYWwgZXNjYXBlIHNlcXVlbmNlOiBcIlxcXFwnICsgYyArICdcIicpO1xuICAgIH1cbiAgICArK2luZGV4O1xuICAgIHZhciBiYWNrc2xhc2ggPSB2LmluZGV4T2YoJ1xcXFwnLCBpbmRleCk7XG4gICAgYnVmZmVyICs9IHYuc3Vic3RyaW5nKGluZGV4LCBiYWNrc2xhc2ggPCAwID8gdi5sZW5ndGggOiBiYWNrc2xhc2gpO1xuICAgIGluZGV4ID0gYmFja3NsYXNoO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZmZlcjtcbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5pc0NvbW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjID0gdGhpcy5leHByZXNzaW9uLmNoYXJBdCh0aGlzLnBvcyk7XG4gIGlmIChjID09PSAnLycgJiYgdGhpcy5leHByZXNzaW9uLmNoYXJBdCh0aGlzLnBvcyArIDEpID09PSAnKicpIHtcbiAgICB0aGlzLnBvcyA9IHRoaXMuZXhwcmVzc2lvbi5pbmRleE9mKCcqLycsIHRoaXMucG9zKSArIDI7XG4gICAgaWYgKHRoaXMucG9zID09PSAxKSB7XG4gICAgICB0aGlzLnBvcyA9IHRoaXMuZXhwcmVzc2lvbi5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5pc1JhZGl4SW50ZWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBvcyA9IHRoaXMucG9zO1xuXG4gIGlmIChwb3MgPj0gdGhpcy5leHByZXNzaW9uLmxlbmd0aCAtIDIgfHwgdGhpcy5leHByZXNzaW9uLmNoYXJBdChwb3MpICE9PSAnMCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgKytwb3M7XG5cbiAgdmFyIHJhZGl4O1xuICB2YXIgdmFsaWREaWdpdDtcbiAgaWYgKHRoaXMuZXhwcmVzc2lvbi5jaGFyQXQocG9zKSA9PT0gJ3gnKSB7XG4gICAgcmFkaXggPSAxNjtcbiAgICB2YWxpZERpZ2l0ID0gL15bMC05YS1mXSQvaTtcbiAgICArK3BvcztcbiAgfSBlbHNlIGlmICh0aGlzLmV4cHJlc3Npb24uY2hhckF0KHBvcykgPT09ICdiJykge1xuICAgIHJhZGl4ID0gMjtcbiAgICB2YWxpZERpZ2l0ID0gL15bMDFdJC9pO1xuICAgICsrcG9zO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciB2YWxpZCA9IGZhbHNlO1xuICB2YXIgc3RhcnRQb3MgPSBwb3M7XG5cbiAgd2hpbGUgKHBvcyA8IHRoaXMuZXhwcmVzc2lvbi5sZW5ndGgpIHtcbiAgICB2YXIgYyA9IHRoaXMuZXhwcmVzc2lvbi5jaGFyQXQocG9zKTtcbiAgICBpZiAodmFsaWREaWdpdC50ZXN0KGMpKSB7XG4gICAgICBwb3MrKztcbiAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHZhbGlkKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5uZXdUb2tlbihUTlVNQkVSLCBwYXJzZUludCh0aGlzLmV4cHJlc3Npb24uc3Vic3RyaW5nKHN0YXJ0UG9zLCBwb3MpLCByYWRpeCkpO1xuICAgIHRoaXMucG9zID0gcG9zO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5pc051bWJlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHZhbGlkID0gZmFsc2U7XG4gIHZhciBwb3MgPSB0aGlzLnBvcztcbiAgdmFyIHN0YXJ0UG9zID0gcG9zO1xuICB2YXIgcmVzZXRQb3MgPSBwb3M7XG4gIHZhciBmb3VuZERvdCA9IGZhbHNlO1xuICB2YXIgZm91bmREaWdpdHMgPSBmYWxzZTtcbiAgdmFyIGM7XG5cbiAgd2hpbGUgKHBvcyA8IHRoaXMuZXhwcmVzc2lvbi5sZW5ndGgpIHtcbiAgICBjID0gdGhpcy5leHByZXNzaW9uLmNoYXJBdChwb3MpO1xuICAgIGlmICgoYyA+PSAnMCcgJiYgYyA8PSAnOScpIHx8ICghZm91bmREb3QgJiYgYyA9PT0gJy4nKSkge1xuICAgICAgaWYgKGMgPT09ICcuJykge1xuICAgICAgICBmb3VuZERvdCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3VuZERpZ2l0cyA9IHRydWU7XG4gICAgICB9XG4gICAgICBwb3MrKztcbiAgICAgIHZhbGlkID0gZm91bmREaWdpdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmICh2YWxpZCkge1xuICAgIHJlc2V0UG9zID0gcG9zO1xuICB9XG5cbiAgaWYgKGMgPT09ICdlJyB8fCBjID09PSAnRScpIHtcbiAgICBwb3MrKztcbiAgICB2YXIgYWNjZXB0U2lnbiA9IHRydWU7XG4gICAgdmFyIHZhbGlkRXhwb25lbnQgPSBmYWxzZTtcbiAgICB3aGlsZSAocG9zIDwgdGhpcy5leHByZXNzaW9uLmxlbmd0aCkge1xuICAgICAgYyA9IHRoaXMuZXhwcmVzc2lvbi5jaGFyQXQocG9zKTtcbiAgICAgIGlmIChhY2NlcHRTaWduICYmIChjID09PSAnKycgfHwgYyA9PT0gJy0nKSkge1xuICAgICAgICBhY2NlcHRTaWduID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGMgPj0gJzAnICYmIGMgPD0gJzknKSB7XG4gICAgICAgIHZhbGlkRXhwb25lbnQgPSB0cnVlO1xuICAgICAgICBhY2NlcHRTaWduID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHBvcysrO1xuICAgIH1cblxuICAgIGlmICghdmFsaWRFeHBvbmVudCkge1xuICAgICAgcG9zID0gcmVzZXRQb3M7XG4gICAgfVxuICB9XG5cbiAgaWYgKHZhbGlkKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5uZXdUb2tlbihUTlVNQkVSLCBwYXJzZUZsb2F0KHRoaXMuZXhwcmVzc2lvbi5zdWJzdHJpbmcoc3RhcnRQb3MsIHBvcykpKTtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnBvcyA9IHJlc2V0UG9zO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5pc09wZXJhdG9yID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhcnRQb3MgPSB0aGlzLnBvcztcbiAgdmFyIGMgPSB0aGlzLmV4cHJlc3Npb24uY2hhckF0KHRoaXMucG9zKTtcblxuICBpZiAoYyA9PT0gJysnIHx8IGMgPT09ICctJyB8fCBjID09PSAnKicgfHwgYyA9PT0gJy8nIHx8IGMgPT09ICclJyB8fCBjID09PSAnXicgfHwgYyA9PT0gJz8nIHx8IGMgPT09ICc6JyB8fCBjID09PSAnLicpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm5ld1Rva2VuKFRPUCwgYyk7XG4gIH0gZWxzZSBpZiAoYyA9PT0gJ+KImScgfHwgYyA9PT0gJ+KAoicpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm5ld1Rva2VuKFRPUCwgJyonKTtcbiAgfSBlbHNlIGlmIChjID09PSAnPicpIHtcbiAgICBpZiAodGhpcy5leHByZXNzaW9uLmNoYXJBdCh0aGlzLnBvcyArIDEpID09PSAnPScpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV3VG9rZW4oVE9QLCAnPj0nKTtcbiAgICAgIHRoaXMucG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV3VG9rZW4oVE9QLCAnPicpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjID09PSAnPCcpIHtcbiAgICBpZiAodGhpcy5leHByZXNzaW9uLmNoYXJBdCh0aGlzLnBvcyArIDEpID09PSAnPScpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV3VG9rZW4oVE9QLCAnPD0nKTtcbiAgICAgIHRoaXMucG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV3VG9rZW4oVE9QLCAnPCcpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjID09PSAnfCcpIHtcbiAgICBpZiAodGhpcy5leHByZXNzaW9uLmNoYXJBdCh0aGlzLnBvcyArIDEpID09PSAnfCcpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubmV3VG9rZW4oVE9QLCAnfHwnKTtcbiAgICAgIHRoaXMucG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYyA9PT0gJz0nKSB7XG4gICAgaWYgKHRoaXMuZXhwcmVzc2lvbi5jaGFyQXQodGhpcy5wb3MgKyAxKSA9PT0gJz0nKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm5ld1Rva2VuKFRPUCwgJz09Jyk7XG4gICAgICB0aGlzLnBvcysrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm5ld1Rva2VuKFRPUCwgYyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGMgPT09ICchJykge1xuICAgIGlmICh0aGlzLmV4cHJlc3Npb24uY2hhckF0KHRoaXMucG9zICsgMSkgPT09ICc9Jykge1xuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5uZXdUb2tlbihUT1AsICchPScpO1xuICAgICAgdGhpcy5wb3MrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5uZXdUb2tlbihUT1AsIGMpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdGhpcy5wb3MrKztcblxuICBpZiAodGhpcy5pc09wZXJhdG9yRW5hYmxlZCh0aGlzLmN1cnJlbnQudmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wb3MgPSBzdGFydFBvcztcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5pc09wZXJhdG9yRW5hYmxlZCA9IGZ1bmN0aW9uIChvcCkge1xuICByZXR1cm4gdGhpcy5wYXJzZXIuaXNPcGVyYXRvckVuYWJsZWQob3ApO1xufTtcblxuVG9rZW5TdHJlYW0ucHJvdG90eXBlLmdldENvb3JkaW5hdGVzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbGluZSA9IDA7XG4gIHZhciBjb2x1bW47XG4gIHZhciBuZXdsaW5lID0gLTE7XG4gIGRvIHtcbiAgICBsaW5lKys7XG4gICAgY29sdW1uID0gdGhpcy5wb3MgLSBuZXdsaW5lO1xuICAgIG5ld2xpbmUgPSB0aGlzLmV4cHJlc3Npb24uaW5kZXhPZignXFxuJywgbmV3bGluZSArIDEpO1xuICB9IHdoaWxlIChuZXdsaW5lID49IDAgJiYgbmV3bGluZSA8IHRoaXMucG9zKTtcblxuICByZXR1cm4ge1xuICAgIGxpbmU6IGxpbmUsXG4gICAgY29sdW1uOiBjb2x1bW5cbiAgfTtcbn07XG5cblRva2VuU3RyZWFtLnByb3RvdHlwZS5wYXJzZUVycm9yID0gZnVuY3Rpb24gKG1zZykge1xuICB2YXIgY29vcmRzID0gdGhpcy5nZXRDb29yZGluYXRlcygpO1xuICB0aHJvdyBuZXcgRXJyb3IoJ3BhcnNlIGVycm9yIFsnICsgY29vcmRzLmxpbmUgKyAnOicgKyBjb29yZHMuY29sdW1uICsgJ106ICcgKyBtc2cpO1xufTtcblxuZnVuY3Rpb24gUGFyc2VyU3RhdGUocGFyc2VyLCB0b2tlblN0cmVhbSwgb3B0aW9ucykge1xuICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcbiAgdGhpcy50b2tlbnMgPSB0b2tlblN0cmVhbTtcbiAgdGhpcy5jdXJyZW50ID0gbnVsbDtcbiAgdGhpcy5uZXh0VG9rZW4gPSBudWxsO1xuICB0aGlzLm5leHQoKTtcbiAgdGhpcy5zYXZlZEN1cnJlbnQgPSBudWxsO1xuICB0aGlzLnNhdmVkTmV4dFRva2VuID0gbnVsbDtcbiAgdGhpcy5hbGxvd01lbWJlckFjY2VzcyA9IG9wdGlvbnMuYWxsb3dNZW1iZXJBY2Nlc3MgIT09IGZhbHNlO1xufVxuXG5QYXJzZXJTdGF0ZS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jdXJyZW50ID0gdGhpcy5uZXh0VG9rZW47XG4gIHJldHVybiAodGhpcy5uZXh0VG9rZW4gPSB0aGlzLnRva2Vucy5uZXh0KCkpO1xufTtcblxuUGFyc2VyU3RhdGUucHJvdG90eXBlLnRva2VuTWF0Y2hlcyA9IGZ1bmN0aW9uICh0b2tlbiwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBjb250YWlucyh2YWx1ZSwgdG9rZW4udmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWx1ZSh0b2tlbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRva2VuLnZhbHVlID09PSB2YWx1ZTtcbiAgfVxufTtcblxuUGFyc2VyU3RhdGUucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc2F2ZWRDdXJyZW50ID0gdGhpcy5jdXJyZW50O1xuICB0aGlzLnNhdmVkTmV4dFRva2VuID0gdGhpcy5uZXh0VG9rZW47XG4gIHRoaXMudG9rZW5zLnNhdmUoKTtcbn07XG5cblBhcnNlclN0YXRlLnByb3RvdHlwZS5yZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnRva2Vucy5yZXN0b3JlKCk7XG4gIHRoaXMuY3VycmVudCA9IHRoaXMuc2F2ZWRDdXJyZW50O1xuICB0aGlzLm5leHRUb2tlbiA9IHRoaXMuc2F2ZWROZXh0VG9rZW47XG59O1xuXG5QYXJzZXJTdGF0ZS5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24gKHR5cGUsIHZhbHVlKSB7XG4gIGlmICh0aGlzLm5leHRUb2tlbi50eXBlID09PSB0eXBlICYmIHRoaXMudG9rZW5NYXRjaGVzKHRoaXMubmV4dFRva2VuLCB2YWx1ZSkpIHtcbiAgICB0aGlzLm5leHQoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5QYXJzZXJTdGF0ZS5wcm90b3R5cGUuZXhwZWN0ID0gZnVuY3Rpb24gKHR5cGUsIHZhbHVlKSB7XG4gIGlmICghdGhpcy5hY2NlcHQodHlwZSwgdmFsdWUpKSB7XG4gICAgdmFyIGNvb3JkcyA9IHRoaXMudG9rZW5zLmdldENvb3JkaW5hdGVzKCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwYXJzZSBlcnJvciBbJyArIGNvb3Jkcy5saW5lICsgJzonICsgY29vcmRzLmNvbHVtbiArICddOiBFeHBlY3RlZCAnICsgKHZhbHVlIHx8IHR5cGUpKTtcbiAgfVxufTtcblxuUGFyc2VyU3RhdGUucHJvdG90eXBlLnBhcnNlQXRvbSA9IGZ1bmN0aW9uIChpbnN0cikge1xuICB2YXIgdW5hcnlPcHMgPSB0aGlzLnRva2Vucy51bmFyeU9wcztcbiAgZnVuY3Rpb24gaXNQcmVmaXhPcGVyYXRvcih0b2tlbikge1xuICAgIHJldHVybiB0b2tlbi52YWx1ZSBpbiB1bmFyeU9wcztcbiAgfVxuXG4gIGlmICh0aGlzLmFjY2VwdChUTkFNRSkgfHwgdGhpcy5hY2NlcHQoVE9QLCBpc1ByZWZpeE9wZXJhdG9yKSkge1xuICAgIGluc3RyLnB1c2gobmV3IEluc3RydWN0aW9uKElWQVIsIHRoaXMuY3VycmVudC52YWx1ZSkpO1xuICB9IGVsc2UgaWYgKHRoaXMuYWNjZXB0KFROVU1CRVIpKSB7XG4gICAgaW5zdHIucHVzaChuZXcgSW5zdHJ1Y3Rpb24oSU5VTUJFUiwgdGhpcy5jdXJyZW50LnZhbHVlKSk7XG4gIH0gZWxzZSBpZiAodGhpcy5hY2NlcHQoVFNUUklORykpIHtcbiAgICBpbnN0ci5wdXNoKG5ldyBJbnN0cnVjdGlvbihJTlVNQkVSLCB0aGlzLmN1cnJlbnQudmFsdWUpKTtcbiAgfSBlbHNlIGlmICh0aGlzLmFjY2VwdChUUEFSRU4sICcoJykpIHtcbiAgICB0aGlzLnBhcnNlRXhwcmVzc2lvbihpbnN0cik7XG4gICAgdGhpcy5leHBlY3QoVFBBUkVOLCAnKScpO1xuICB9IGVsc2UgaWYgKHRoaXMuYWNjZXB0KFRCUkFDS0VULCAnWycpKSB7XG4gICAgaWYgKHRoaXMuYWNjZXB0KFRCUkFDS0VULCAnXScpKSB7XG4gICAgICBpbnN0ci5wdXNoKG5ldyBJbnN0cnVjdGlvbihJQVJSQVksIDApKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ0NvdW50ID0gdGhpcy5wYXJzZUFycmF5TGlzdChpbnN0cik7XG4gICAgICBpbnN0ci5wdXNoKG5ldyBJbnN0cnVjdGlvbihJQVJSQVksIGFyZ0NvdW50KSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCAnICsgdGhpcy5uZXh0VG9rZW4pO1xuICB9XG59O1xuXG5QYXJzZXJTdGF0ZS5wcm90b3R5cGUucGFyc2VFeHByZXNzaW9uID0gZnVuY3Rpb24gKGluc3RyKSB7XG4gIHZhciBleHBySW5zdHIgPSBbXTtcbiAgaWYgKHRoaXMucGFyc2VVbnRpbEVuZFN0YXRlbWVudChpbnN0ciwgZXhwckluc3RyKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnBhcnNlVmFyaWFibGVBc3NpZ25tZW50RXhwcmVzc2lvbihleHBySW5zdHIpO1xuICBpZiAodGhpcy5wYXJzZVVudGlsRW5kU3RhdGVtZW50KGluc3RyLCBleHBySW5zdHIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucHVzaEV4cHJlc3Npb24oaW5zdHIsIGV4cHJJbnN0cik7XG59O1xuXG5QYXJzZXJTdGF0ZS5wcm90b3R5cGUucHVzaEV4cHJlc3Npb24gPSBmdW5jdGlvbiAoaW5zdHIsIGV4cHJJbnN0cikge1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gZXhwckluc3RyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaW5zdHIucHVzaChleHBySW5zdHJbaV0pO1xuICB9XG59O1xuXG5QYXJzZXJTdGF0ZS5wcm90b3R5cGUucGFyc2VVbnRpbEVuZFN0YXRlbWVudCA9IGZ1bmN0aW9uIChpbnN0ciwgZXhwckluc3RyKSB7XG4gIGlmICghdGhpcy5hY2NlcHQoVFNFTUlDT0xPTikpIHJldHVybiBmYWxzZTtcbiAgaWYgKHRoaXMubmV4dFRva2VuICYmIHRoaXMubmV4dFRva2VuLnR5cGUgIT09IFRFT0YgJiYgISh0aGlzLm5leHRUb2tlbi50eXBlID09PSBUUEFSRU4gJiYgdGhpcy5uZXh0VG9rZW4udmFsdWUgPT09ICcpJykpIHtcbiAgICBleHBySW5zdHIucHVzaChuZXcgSW5zdHJ1Y3Rpb24oSUVORFNUQVRFTUVOVCkpO1xuICB9XG4gIGlmICh0aGlzLm5leHRUb2tlbi50eXBlICE9PSBURU9GKSB7XG4gICAgdGhpcy5wYXJzZUV4cHJlc3Npb24oZXhwckluc3RyKTtcbiAgfVxuICBpbnN0ci5wdXNoKG5ldyBJbnN0cnVjdGlvbihJRVhQUiwgZXhwckluc3RyKSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuUGFyc2VyU3RhdGUucHJvdG90eXBlLnBhcnNlQXJyYXlMaXN0ID0gZnVuY3Rpb24gKGluc3RyKSB7XG4gIHZhciBhcmdDb3VudCA9IDA7XG5cbiAgd2hpbGUgKCF0aGlzLmFjY2VwdChUQlJBQ0tFVCwgJ10nKSkge1xuICAgIHRoaXMucGFyc2VFeHByZXNzaW9uKGluc3RyKTtcbiAgICArK2FyZ0NvdW50O1xuICAgIHdoaWxlICh0aGlzLmFjY2VwdChUQ09NTUEpKSB7XG4gICAgICB0aGlzLnBhcnNlRXhwcmVzc2lvbihpbnN0cik7XG4gICAgICArK2FyZ0NvdW50O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcmdDb3VudDtcbn07XG5cblBhcnNlclN0YXRlLnByb3RvdHlwZS5wYXJzZVZhcmlhYmxlQXNzaWdubWVudEV4cHJlc3Npb24gPSBmdW5jdGlvbiAoaW5zdHIpIHtcbiAgdGhpcy5wYXJzZUNvbmRpdGlvbmFsRXhwcmVzc2lvbihpbnN0cik7XG4gIHdoaWxlICh0aGlzLmFjY2VwdChUT1AsICc9JykpIHtcbiAgICB2YXIgdmFyTmFtZSA9IGluc3RyLnBvcCgpO1xuICAgIHZhciB2YXJWYWx1ZSA9IFtdO1xuICAgIHZhciBsYXN0SW5zdHJJbmRleCA9IGluc3RyLmxlbmd0aCAtIDE7XG4gICAgaWYgKHZhck5hbWUudHlwZSA9PT0gSUZVTkNBTEwpIHtcbiAgICAgIGlmICghdGhpcy50b2tlbnMuaXNPcGVyYXRvckVuYWJsZWQoJygpPScpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZnVuY3Rpb24gZGVmaW5pdGlvbiBpcyBub3QgcGVybWl0dGVkJyk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFyTmFtZS52YWx1ZSArIDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgaW5kZXggPSBsYXN0SW5zdHJJbmRleCAtIGk7XG4gICAgICAgIGlmIChpbnN0cltpbmRleF0udHlwZSA9PT0gSVZBUikge1xuICAgICAgICAgIGluc3RyW2luZGV4XSA9IG5ldyBJbnN0cnVjdGlvbihJVkFSTkFNRSwgaW5zdHJbaW5kZXhdLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5wYXJzZVZhcmlhYmxlQXNzaWdubWVudEV4cHJlc3Npb24odmFyVmFsdWUpO1xuICAgICAgaW5zdHIucHVzaChuZXcgSW5zdHJ1Y3Rpb24oSUVYUFIsIHZhclZhbHVlKSk7XG4gICAgICBpbnN0ci5wdXNoKG5ldyBJbnN0cnVjdGlvbihJRlVOREVGLCB2YXJOYW1lLnZhbHVlKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHZhck5hbWUudHlwZSAhPT0gSVZBUiAmJiB2YXJOYW1lLnR5cGUgIT09IElNRU1CRVIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgdmFyaWFibGUgZm9yIGFzc2lnbm1lbnQnKTtcbiAgICB9XG4gICAgdGhpcy5wYXJzZVZhcmlhYmxlQXNzaWdubWVudEV4cHJlc3Npb24odmFyVmFsdWUpO1xuICAgIGluc3RyLnB1c2gobmV3IEluc3RydWN0aW9uKElWQVJOQU1FLCB2YXJOYW1lLnZhbHVlKSk7XG4gICAgaW5zdHIucHVzaChuZXcgSW5zdHJ1Y3Rpb24oSUVYUFIsIHZhclZhbHVlKSk7XG4gICAgaW5zdHIucHVzaChiaW5hcnlJbnN0cnVjdGlvbignPScpKTtcbiAgfVxufTtcblxuUGFyc2VyU3RhdGUucHJvdG90eXBlLnBhcnNlQ29uZGl0aW9uYWxFeHByZXNzaW9uID0gZnVuY3Rpb24gKGluc3RyKSB7XG4gIHRoaXMucGFyc2VPckV4cHJlc3Npb24oaW5zdHIpO1xuICB3aGlsZSAodGhpcy5hY2NlcHQoVE9QLCAnPycpKSB7XG4gICAgdmFyIHRydWVCcmFuY2ggPSBbXTtcbiAgICB2YXIgZmFsc2VCcmFuY2ggPSBbXTtcbiAgICB0aGlzLnBhcnNlQ29uZGl0aW9uYWxFeHByZXNzaW9uKHRydWVCcmFuY2gpO1xuICAgIHRoaXMuZXhwZWN0KFRPUCwgJzonKTtcbiAgICB0aGlzLnBhcnNlQ29uZGl0aW9uYWxFeHByZXNzaW9uKGZhbHNlQnJhbmNoKTtcbiAgICBpbnN0ci5wdXNoKG5ldyBJbnN0cnVjdGlvbihJRVhQUiwgdHJ1ZUJyYW5jaCkpO1xuICAgIGluc3RyLnB1c2gobmV3IEluc3RydWN0aW9uKElFWFBSLCBmYWxzZUJyYW5jaCkpO1xuICAgIGluc3RyLnB1c2godGVybmFyeUluc3RydWN0aW9uKCc/JykpO1xuICB9XG59O1xuXG5QYXJzZXJTdGF0ZS5wcm90b3R5cGUucGFyc2VPckV4cHJlc3Npb24gPSBmdW5jdGlvbiAoaW5zdHIpIHtcbiAgdGhpcy5wYXJzZUFuZEV4cHJlc3Npb24oaW5zdHIpO1xuICB3aGlsZSAodGhpcy5hY2NlcHQoVE9QLCAnb3InKSkge1xuICAgIHZhciBmYWxzZUJyYW5jaCA9IFtdO1xuICAgIHRoaXMucGFyc2VBbmRFeHByZXNzaW9uKGZhbHNlQnJhbmNoKTtcbiAgICBpbnN0ci5wdXNoKG5ldyBJbnN0cnVjdGlvbihJRVhQUiwgZmFsc2VCcmFuY2gpKTtcbiAgICBpbnN0ci5wdXNoKGJpbmFyeUluc3RydWN0aW9uKCdvcicpKTtcbiAgfVxufTtcblxuUGFyc2VyU3RhdGUucHJvdG90eXBlLnBhcnNlQW5kRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIChpbnN0cikge1xuICB0aGlzLnBhcnNlQ29tcGFyaXNvbihpbnN0cik7XG4gIHdoaWxlICh0aGlzLmFjY2VwdChUT1AsICdhbmQnKSkge1xuICAgIHZhciB0cnVlQnJhbmNoID0gW107XG4gICAgdGhpcy5wYXJzZUNvbXBhcmlzb24odHJ1ZUJyYW5jaCk7XG4gICAgaW5zdHIucHVzaChuZXcgSW5zdHJ1Y3Rpb24oSUVYUFIsIHRydWVCcmFuY2gpKTtcbiAgICBpbnN0ci5wdXNoKGJpbmFyeUluc3RydWN0aW9uKCdhbmQnKSk7XG4gIH1cbn07XG5cbnZhciBDT01QQVJJU09OX09QRVJBVE9SUyA9IFsnPT0nLCAnIT0nLCAnPCcsICc8PScsICc+PScsICc+JywgJ2luJ107XG5cblBhcnNlclN0YXRlLnByb3RvdHlwZS5wYXJzZUNvbXBhcmlzb24gPSBmdW5jdGlvbiAoaW5zdHIpIHtcbiAgdGhpcy5wYXJzZUFkZFN1YihpbnN0cik7XG4gIHdoaWxlICh0aGlzLmFjY2VwdChUT1AsIENPTVBBUklTT05fT1BFUkFUT1JTKSkge1xuICAgIHZhciBvcCA9IHRoaXMuY3VycmVudDtcbiAgICB0aGlzLnBhcnNlQWRkU3ViKGluc3RyKTtcbiAgICBpbnN0ci5wdXNoKGJpbmFyeUluc3RydWN0aW9uKG9wLnZhbHVlKSk7XG4gIH1cbn07XG5cbnZhciBBRERfU1VCX09QRVJBVE9SUyA9IFsnKycsICctJywgJ3x8J107XG5cblBhcnNlclN0YXRlLnByb3RvdHlwZS5wYXJzZUFkZFN1YiA9IGZ1bmN0aW9uIChpbnN0cikge1xuICB0aGlzLnBhcnNlVGVybShpbnN0cik7XG4gIHdoaWxlICh0aGlzLmFjY2VwdChUT1AsIEFERF9TVUJfT1BFUkFUT1JTKSkge1xuICAgIHZhciBvcCA9IHRoaXMuY3VycmVudDtcbiAgICB0aGlzLnBhcnNlVGVybShpbnN0cik7XG4gICAgaW5zdHIucHVzaChiaW5hcnlJbnN0cnVjdGlvbihvcC52YWx1ZSkpO1xuICB9XG59O1xuXG52YXIgVEVSTV9PUEVSQVRPUlMgPSBbJyonLCAnLycsICclJ107XG5cblBhcnNlclN0YXRlLnByb3RvdHlwZS5wYXJzZVRlcm0gPSBmdW5jdGlvbiAoaW5zdHIpIHtcbiAgdGhpcy5wYXJzZUZhY3RvcihpbnN0cik7XG4gIHdoaWxlICh0aGlzLmFjY2VwdChUT1AsIFRFUk1fT1BFUkFUT1JTKSkge1xuICAgIHZhciBvcCA9IHRoaXMuY3VycmVudDtcbiAgICB0aGlzLnBhcnNlRmFjdG9yKGluc3RyKTtcbiAgICBpbnN0ci5wdXNoKGJpbmFyeUluc3RydWN0aW9uKG9wLnZhbHVlKSk7XG4gIH1cbn07XG5cblBhcnNlclN0YXRlLnByb3RvdHlwZS5wYXJzZUZhY3RvciA9IGZ1bmN0aW9uIChpbnN0cikge1xuICB2YXIgdW5hcnlPcHMgPSB0aGlzLnRva2Vucy51bmFyeU9wcztcbiAgZnVuY3Rpb24gaXNQcmVmaXhPcGVyYXRvcih0b2tlbikge1xuICAgIHJldHVybiB0b2tlbi52YWx1ZSBpbiB1bmFyeU9wcztcbiAgfVxuXG4gIHRoaXMuc2F2ZSgpO1xuICBpZiAodGhpcy5hY2NlcHQoVE9QLCBpc1ByZWZpeE9wZXJhdG9yKSkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQudmFsdWUgIT09ICctJyAmJiB0aGlzLmN1cnJlbnQudmFsdWUgIT09ICcrJykge1xuICAgICAgaWYgKHRoaXMubmV4dFRva2VuLnR5cGUgPT09IFRQQVJFTiAmJiB0aGlzLm5leHRUb2tlbi52YWx1ZSA9PT0gJygnKSB7XG4gICAgICAgIHRoaXMucmVzdG9yZSgpO1xuICAgICAgICB0aGlzLnBhcnNlRXhwb25lbnRpYWwoaW5zdHIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dFRva2VuLnR5cGUgPT09IFRTRU1JQ09MT04gfHwgdGhpcy5uZXh0VG9rZW4udHlwZSA9PT0gVENPTU1BIHx8IHRoaXMubmV4dFRva2VuLnR5cGUgPT09IFRFT0YgfHwgKHRoaXMubmV4dFRva2VuLnR5cGUgPT09IFRQQVJFTiAmJiB0aGlzLm5leHRUb2tlbi52YWx1ZSA9PT0gJyknKSkge1xuICAgICAgICB0aGlzLnJlc3RvcmUoKTtcbiAgICAgICAgdGhpcy5wYXJzZUF0b20oaW5zdHIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG9wID0gdGhpcy5jdXJyZW50O1xuICAgIHRoaXMucGFyc2VGYWN0b3IoaW5zdHIpO1xuICAgIGluc3RyLnB1c2godW5hcnlJbnN0cnVjdGlvbihvcC52YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucGFyc2VFeHBvbmVudGlhbChpbnN0cik7XG4gIH1cbn07XG5cblBhcnNlclN0YXRlLnByb3RvdHlwZS5wYXJzZUV4cG9uZW50aWFsID0gZnVuY3Rpb24gKGluc3RyKSB7XG4gIHRoaXMucGFyc2VQb3N0Zml4RXhwcmVzc2lvbihpbnN0cik7XG4gIHdoaWxlICh0aGlzLmFjY2VwdChUT1AsICdeJykpIHtcbiAgICB0aGlzLnBhcnNlRmFjdG9yKGluc3RyKTtcbiAgICBpbnN0ci5wdXNoKGJpbmFyeUluc3RydWN0aW9uKCdeJykpO1xuICB9XG59O1xuXG5QYXJzZXJTdGF0ZS5wcm90b3R5cGUucGFyc2VQb3N0Zml4RXhwcmVzc2lvbiA9IGZ1bmN0aW9uIChpbnN0cikge1xuICB0aGlzLnBhcnNlRnVuY3Rpb25DYWxsKGluc3RyKTtcbiAgd2hpbGUgKHRoaXMuYWNjZXB0KFRPUCwgJyEnKSkge1xuICAgIGluc3RyLnB1c2godW5hcnlJbnN0cnVjdGlvbignIScpKTtcbiAgfVxufTtcblxuUGFyc2VyU3RhdGUucHJvdG90eXBlLnBhcnNlRnVuY3Rpb25DYWxsID0gZnVuY3Rpb24gKGluc3RyKSB7XG4gIHZhciB1bmFyeU9wcyA9IHRoaXMudG9rZW5zLnVuYXJ5T3BzO1xuICBmdW5jdGlvbiBpc1ByZWZpeE9wZXJhdG9yKHRva2VuKSB7XG4gICAgcmV0dXJuIHRva2VuLnZhbHVlIGluIHVuYXJ5T3BzO1xuICB9XG5cbiAgaWYgKHRoaXMuYWNjZXB0KFRPUCwgaXNQcmVmaXhPcGVyYXRvcikpIHtcbiAgICB2YXIgb3AgPSB0aGlzLmN1cnJlbnQ7XG4gICAgdGhpcy5wYXJzZUF0b20oaW5zdHIpO1xuICAgIGluc3RyLnB1c2godW5hcnlJbnN0cnVjdGlvbihvcC52YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucGFyc2VNZW1iZXJFeHByZXNzaW9uKGluc3RyKTtcbiAgICB3aGlsZSAodGhpcy5hY2NlcHQoVFBBUkVOLCAnKCcpKSB7XG4gICAgICBpZiAodGhpcy5hY2NlcHQoVFBBUkVOLCAnKScpKSB7XG4gICAgICAgIGluc3RyLnB1c2gobmV3IEluc3RydWN0aW9uKElGVU5DQUxMLCAwKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgYXJnQ291bnQgPSB0aGlzLnBhcnNlQXJndW1lbnRMaXN0KGluc3RyKTtcbiAgICAgICAgaW5zdHIucHVzaChuZXcgSW5zdHJ1Y3Rpb24oSUZVTkNBTEwsIGFyZ0NvdW50KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5QYXJzZXJTdGF0ZS5wcm90b3R5cGUucGFyc2VBcmd1bWVudExpc3QgPSBmdW5jdGlvbiAoaW5zdHIpIHtcbiAgdmFyIGFyZ0NvdW50ID0gMDtcblxuICB3aGlsZSAoIXRoaXMuYWNjZXB0KFRQQVJFTiwgJyknKSkge1xuICAgIHRoaXMucGFyc2VFeHByZXNzaW9uKGluc3RyKTtcbiAgICArK2FyZ0NvdW50O1xuICAgIHdoaWxlICh0aGlzLmFjY2VwdChUQ09NTUEpKSB7XG4gICAgICB0aGlzLnBhcnNlRXhwcmVzc2lvbihpbnN0cik7XG4gICAgICArK2FyZ0NvdW50O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcmdDb3VudDtcbn07XG5cblBhcnNlclN0YXRlLnByb3RvdHlwZS5wYXJzZU1lbWJlckV4cHJlc3Npb24gPSBmdW5jdGlvbiAoaW5zdHIpIHtcbiAgdGhpcy5wYXJzZUF0b20oaW5zdHIpO1xuICB3aGlsZSAodGhpcy5hY2NlcHQoVE9QLCAnLicpIHx8IHRoaXMuYWNjZXB0KFRCUkFDS0VULCAnWycpKSB7XG4gICAgdmFyIG9wID0gdGhpcy5jdXJyZW50O1xuXG4gICAgaWYgKG9wLnZhbHVlID09PSAnLicpIHtcbiAgICAgIGlmICghdGhpcy5hbGxvd01lbWJlckFjY2Vzcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgXCIuXCIsIG1lbWJlciBhY2Nlc3MgaXMgbm90IHBlcm1pdHRlZCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmV4cGVjdChUTkFNRSk7XG4gICAgICBpbnN0ci5wdXNoKG5ldyBJbnN0cnVjdGlvbihJTUVNQkVSLCB0aGlzLmN1cnJlbnQudmFsdWUpKTtcbiAgICB9IGVsc2UgaWYgKG9wLnZhbHVlID09PSAnWycpIHtcbiAgICAgIGlmICghdGhpcy50b2tlbnMuaXNPcGVyYXRvckVuYWJsZWQoJ1snKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgXCJbXVwiLCBhcnJheXMgYXJlIGRpc2FibGVkJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGFyc2VFeHByZXNzaW9uKGluc3RyKTtcbiAgICAgIHRoaXMuZXhwZWN0KFRCUkFDS0VULCAnXScpO1xuICAgICAgaW5zdHIucHVzaChiaW5hcnlJbnN0cnVjdGlvbignWycpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4cGVjdGVkIHN5bWJvbDogJyArIG9wLnZhbHVlKTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGFkZChhLCBiKSB7XG4gIHJldHVybiBOdW1iZXIoYSkgKyBOdW1iZXIoYik7XG59XG5cbmZ1bmN0aW9uIHN1YihhLCBiKSB7XG4gIHJldHVybiBhIC0gYjtcbn1cblxuZnVuY3Rpb24gbXVsKGEsIGIpIHtcbiAgcmV0dXJuIGEgKiBiO1xufVxuXG5mdW5jdGlvbiBkaXYoYSwgYikge1xuICByZXR1cm4gYSAvIGI7XG59XG5cbmZ1bmN0aW9uIG1vZChhLCBiKSB7XG4gIHJldHVybiBhICUgYjtcbn1cblxuZnVuY3Rpb24gY29uY2F0KGEsIGIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYSkgJiYgQXJyYXkuaXNBcnJheShiKSkge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfVxuICByZXR1cm4gJycgKyBhICsgYjtcbn1cblxuZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICByZXR1cm4gYSA9PT0gYjtcbn1cblxuZnVuY3Rpb24gbm90RXF1YWwoYSwgYikge1xuICByZXR1cm4gYSAhPT0gYjtcbn1cblxuZnVuY3Rpb24gZ3JlYXRlclRoYW4oYSwgYikge1xuICByZXR1cm4gYSA+IGI7XG59XG5cbmZ1bmN0aW9uIGxlc3NUaGFuKGEsIGIpIHtcbiAgcmV0dXJuIGEgPCBiO1xufVxuXG5mdW5jdGlvbiBncmVhdGVyVGhhbkVxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIGEgPj0gYjtcbn1cblxuZnVuY3Rpb24gbGVzc1RoYW5FcXVhbChhLCBiKSB7XG4gIHJldHVybiBhIDw9IGI7XG59XG5cbmZ1bmN0aW9uIGFuZE9wZXJhdG9yKGEsIGIpIHtcbiAgcmV0dXJuIEJvb2xlYW4oYSAmJiBiKTtcbn1cblxuZnVuY3Rpb24gb3JPcGVyYXRvcihhLCBiKSB7XG4gIHJldHVybiBCb29sZWFuKGEgfHwgYik7XG59XG5cbmZ1bmN0aW9uIGluT3BlcmF0b3IoYSwgYikge1xuICByZXR1cm4gY29udGFpbnMoYiwgYSk7XG59XG5cbmZ1bmN0aW9uIHNpbmgoYSkge1xuICByZXR1cm4gKChNYXRoLmV4cChhKSAtIE1hdGguZXhwKC1hKSkgLyAyKTtcbn1cblxuZnVuY3Rpb24gY29zaChhKSB7XG4gIHJldHVybiAoKE1hdGguZXhwKGEpICsgTWF0aC5leHAoLWEpKSAvIDIpO1xufVxuXG5mdW5jdGlvbiB0YW5oKGEpIHtcbiAgaWYgKGEgPT09IEluZmluaXR5KSByZXR1cm4gMTtcbiAgaWYgKGEgPT09IC1JbmZpbml0eSkgcmV0dXJuIC0xO1xuICByZXR1cm4gKE1hdGguZXhwKGEpIC0gTWF0aC5leHAoLWEpKSAvIChNYXRoLmV4cChhKSArIE1hdGguZXhwKC1hKSk7XG59XG5cbmZ1bmN0aW9uIGFzaW5oKGEpIHtcbiAgaWYgKGEgPT09IC1JbmZpbml0eSkgcmV0dXJuIGE7XG4gIHJldHVybiBNYXRoLmxvZyhhICsgTWF0aC5zcXJ0KChhICogYSkgKyAxKSk7XG59XG5cbmZ1bmN0aW9uIGFjb3NoKGEpIHtcbiAgcmV0dXJuIE1hdGgubG9nKGEgKyBNYXRoLnNxcnQoKGEgKiBhKSAtIDEpKTtcbn1cblxuZnVuY3Rpb24gYXRhbmgoYSkge1xuICByZXR1cm4gKE1hdGgubG9nKCgxICsgYSkgLyAoMSAtIGEpKSAvIDIpO1xufVxuXG5mdW5jdGlvbiBsb2cxMChhKSB7XG4gIHJldHVybiBNYXRoLmxvZyhhKSAqIE1hdGguTE9HMTBFO1xufVxuXG5mdW5jdGlvbiBuZWcoYSkge1xuICByZXR1cm4gLWE7XG59XG5cbmZ1bmN0aW9uIG5vdChhKSB7XG4gIHJldHVybiAhYTtcbn1cblxuZnVuY3Rpb24gdHJ1bmMoYSkge1xuICByZXR1cm4gYSA8IDAgPyBNYXRoLmNlaWwoYSkgOiBNYXRoLmZsb29yKGEpO1xufVxuXG5mdW5jdGlvbiByYW5kb20oYSkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChhIHx8IDEpO1xufVxuXG5mdW5jdGlvbiBmYWN0b3JpYWwoYSkgeyAvLyBhIVxuICByZXR1cm4gZ2FtbWEoYSArIDEpO1xufVxuXG5mdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSAmJiAodmFsdWUgPT09IE1hdGgucm91bmQodmFsdWUpKTtcbn1cblxudmFyIEdBTU1BX0cgPSA0Ljc0MjE4NzU7XG52YXIgR0FNTUFfUCA9IFtcbiAgMC45OTk5OTk5OTk5OTk5OTcwOTE4MixcbiAgNTcuMTU2MjM1NjY1ODYyOTIzNTE3LCAtNTkuNTk3OTYwMzU1NDc1NDkxMjQ4LFxuICAxNC4xMzYwOTc5NzQ3NDE3NDcxNzQsIC0wLjQ5MTkxMzgxNjA5NzYyMDE5OTc4LFxuICAwLjMzOTk0NjQ5OTg0ODExODg4Njk5ZS00LFxuICAwLjQ2NTIzNjI4OTI3MDQ4NTc1NjY1ZS00LCAtMC45ODM3NDQ3NTMwNDg3OTU2NDY3N2UtNCxcbiAgMC4xNTgwODg3MDMyMjQ5MTI0ODg4NGUtMywgLTAuMjEwMjY0NDQxNzI0MTA0ODgzMTllLTMsXG4gIDAuMjE3NDM5NjE4MTE1MjEyNjQzMjBlLTMsIC0wLjE2NDMxODEwNjUzNjc2Mzg5MDIyZS0zLFxuICAwLjg0NDE4MjIzOTgzODUyNzQzMjkzZS00LCAtMC4yNjE5MDgzODQwMTU4MTQwODY3MGUtNCxcbiAgMC4zNjg5OTE4MjY1OTUzMTYyMjcwNGUtNVxuXTtcblxuLy8gR2FtbWEgZnVuY3Rpb24gZnJvbSBtYXRoLmpzXG5mdW5jdGlvbiBnYW1tYShuKSB7XG4gIHZhciB0LCB4O1xuXG4gIGlmIChpc0ludGVnZXIobikpIHtcbiAgICBpZiAobiA8PSAwKSB7XG4gICAgICByZXR1cm4gaXNGaW5pdGUobikgPyBJbmZpbml0eSA6IE5hTjtcbiAgICB9XG5cbiAgICBpZiAobiA+IDE3MSkge1xuICAgICAgcmV0dXJuIEluZmluaXR5OyAvLyBXaWxsIG92ZXJmbG93XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlID0gbiAtIDI7XG4gICAgdmFyIHJlcyA9IG4gLSAxO1xuICAgIHdoaWxlICh2YWx1ZSA+IDEpIHtcbiAgICAgIHJlcyAqPSB2YWx1ZTtcbiAgICAgIHZhbHVlLS07XG4gICAgfVxuXG4gICAgaWYgKHJlcyA9PT0gMCkge1xuICAgICAgcmVzID0gMTsgLy8gMCEgaXMgcGVyIGRlZmluaXRpb24gMVxuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBpZiAobiA8IDAuNSkge1xuICAgIHJldHVybiBNYXRoLlBJIC8gKE1hdGguc2luKE1hdGguUEkgKiBuKSAqIGdhbW1hKDEgLSBuKSk7XG4gIH1cblxuICBpZiAobiA+PSAxNzEuMzUpIHtcbiAgICByZXR1cm4gSW5maW5pdHk7IC8vIHdpbGwgb3ZlcmZsb3dcbiAgfVxuXG4gIGlmIChuID4gODUuMCkgeyAvLyBFeHRlbmRlZCBTdGlybGluZyBBcHByb3hcbiAgICB2YXIgdHdvTiA9IG4gKiBuO1xuICAgIHZhciB0aHJlZU4gPSB0d29OICogbjtcbiAgICB2YXIgZm91ck4gPSB0aHJlZU4gKiBuO1xuICAgIHZhciBmaXZlTiA9IGZvdXJOICogbjtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KDIgKiBNYXRoLlBJIC8gbikgKiBNYXRoLnBvdygobiAvIE1hdGguRSksIG4pICpcbiAgICAgICgxICsgKDEgLyAoMTIgKiBuKSkgKyAoMSAvICgyODggKiB0d29OKSkgLSAoMTM5IC8gKDUxODQwICogdGhyZWVOKSkgLVxuICAgICAgKDU3MSAvICgyNDg4MzIwICogZm91ck4pKSArICgxNjM4NzkgLyAoMjA5MDE4ODgwICogZml2ZU4pKSArXG4gICAgICAoNTI0NjgxOSAvICg3NTI0Njc5NjgwMCAqIGZpdmVOICogbikpKTtcbiAgfVxuXG4gIC0tbjtcbiAgeCA9IEdBTU1BX1BbMF07XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgR0FNTUFfUC5sZW5ndGg7ICsraSkge1xuICAgIHggKz0gR0FNTUFfUFtpXSAvIChuICsgaSk7XG4gIH1cblxuICB0ID0gbiArIEdBTU1BX0cgKyAwLjU7XG4gIHJldHVybiBNYXRoLnNxcnQoMiAqIE1hdGguUEkpICogTWF0aC5wb3codCwgbiArIDAuNSkgKiBNYXRoLmV4cCgtdCkgKiB4O1xufVxuXG5mdW5jdGlvbiBzdHJpbmdPckFycmF5TGVuZ3RoKHMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocykpIHtcbiAgICByZXR1cm4gcy5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIFN0cmluZyhzKS5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGh5cG90KCkge1xuICB2YXIgc3VtID0gMDtcbiAgdmFyIGxhcmcgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBhcmcgPSBNYXRoLmFicyhhcmd1bWVudHNbaV0pO1xuICAgIHZhciBkaXY7XG4gICAgaWYgKGxhcmcgPCBhcmcpIHtcbiAgICAgIGRpdiA9IGxhcmcgLyBhcmc7XG4gICAgICBzdW0gPSAoc3VtICogZGl2ICogZGl2KSArIDE7XG4gICAgICBsYXJnID0gYXJnO1xuICAgIH0gZWxzZSBpZiAoYXJnID4gMCkge1xuICAgICAgZGl2ID0gYXJnIC8gbGFyZztcbiAgICAgIHN1bSArPSBkaXYgKiBkaXY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1bSArPSBhcmc7XG4gICAgfVxuICB9XG4gIHJldHVybiBsYXJnID09PSBJbmZpbml0eSA/IEluZmluaXR5IDogbGFyZyAqIE1hdGguc3FydChzdW0pO1xufVxuXG5mdW5jdGlvbiBjb25kaXRpb24oY29uZCwgeWVwLCBub3BlKSB7XG4gIHJldHVybiBjb25kID8geWVwIDogbm9wZTtcbn1cblxuLyoqXG4qIERlY2ltYWwgYWRqdXN0bWVudCBvZiBhIG51bWJlci5cbiogRnJvbSBAZXNjb3BlY3ouXG4qXG4qIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSBUaGUgbnVtYmVyLlxuKiBAcGFyYW0ge0ludGVnZXJ9IGV4cCAgVGhlIGV4cG9uZW50ICh0aGUgMTAgbG9nYXJpdGhtIG9mIHRoZSBhZGp1c3RtZW50IGJhc2UpLlxuKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBhZGp1c3RlZCB2YWx1ZS5cbiovXG5mdW5jdGlvbiByb3VuZFRvKHZhbHVlLCBleHApIHtcbiAgLy8gSWYgdGhlIGV4cCBpcyB1bmRlZmluZWQgb3IgemVyby4uLlxuICBpZiAodHlwZW9mIGV4cCA9PT0gJ3VuZGVmaW5lZCcgfHwgK2V4cCA9PT0gMCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgfVxuICB2YWx1ZSA9ICt2YWx1ZTtcbiAgZXhwID0gLSgrZXhwKTtcbiAgLy8gSWYgdGhlIHZhbHVlIGlzIG5vdCBhIG51bWJlciBvciB0aGUgZXhwIGlzIG5vdCBhbiBpbnRlZ2VyLi4uXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgISh0eXBlb2YgZXhwID09PSAnbnVtYmVyJyAmJiBleHAgJSAxID09PSAwKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cbiAgLy8gU2hpZnRcbiAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCdlJyk7XG4gIHZhbHVlID0gTWF0aC5yb3VuZCgrKHZhbHVlWzBdICsgJ2UnICsgKHZhbHVlWzFdID8gKCt2YWx1ZVsxXSAtIGV4cCkgOiAtZXhwKSkpO1xuICAvLyBTaGlmdCBiYWNrXG4gIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnZScpO1xuICByZXR1cm4gKyh2YWx1ZVswXSArICdlJyArICh2YWx1ZVsxXSA/ICgrdmFsdWVbMV0gKyBleHApIDogZXhwKSk7XG59XG5cbmZ1bmN0aW9uIHNldFZhcihuYW1lLCB2YWx1ZSwgdmFyaWFibGVzKSB7XG4gIGlmICh2YXJpYWJsZXMpIHZhcmlhYmxlc1tuYW1lXSA9IHZhbHVlO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXgoYXJyYXksIGluZGV4KSB7XG4gIHJldHVybiBhcnJheVtpbmRleCB8IDBdO1xufVxuXG5mdW5jdGlvbiBtYXgoYXJyYXkpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkoTWF0aCwgYXJyYXkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBNYXRoLm1heC5hcHBseShNYXRoLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1pbihhcnJheSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGFycmF5KSkge1xuICAgIHJldHVybiBNYXRoLm1pbi5hcHBseShNYXRoLCBhcnJheSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIE1hdGgubWluLmFwcGx5KE1hdGgsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXJyYXlNYXAoZiwgYSkge1xuICBpZiAodHlwZW9mIGYgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIG1hcCBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9XG4gIGlmICghQXJyYXkuaXNBcnJheShhKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2Vjb25kIGFyZ3VtZW50IHRvIG1hcCBpcyBub3QgYW4gYXJyYXknKTtcbiAgfVxuICByZXR1cm4gYS5tYXAoZnVuY3Rpb24gKHgsIGkpIHtcbiAgICByZXR1cm4gZih4LCBpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFycmF5Rm9sZChmLCBpbml0LCBhKSB7XG4gIGlmICh0eXBlb2YgZiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gZm9sZCBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9XG4gIGlmICghQXJyYXkuaXNBcnJheShhKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2Vjb25kIGFyZ3VtZW50IHRvIGZvbGQgaXMgbm90IGFuIGFycmF5Jyk7XG4gIH1cbiAgcmV0dXJuIGEucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHgsIGkpIHtcbiAgICByZXR1cm4gZihhY2MsIHgsIGkpO1xuICB9LCBpbml0KTtcbn1cblxuZnVuY3Rpb24gYXJyYXlGaWx0ZXIoZiwgYSkge1xuICBpZiAodHlwZW9mIGYgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIGZpbHRlciBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9XG4gIGlmICghQXJyYXkuaXNBcnJheShhKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2Vjb25kIGFyZ3VtZW50IHRvIGZpbHRlciBpcyBub3QgYW4gYXJyYXknKTtcbiAgfVxuICByZXR1cm4gYS5maWx0ZXIoZnVuY3Rpb24gKHgsIGkpIHtcbiAgICByZXR1cm4gZih4LCBpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ09yQXJyYXlJbmRleE9mKHRhcmdldCwgcykge1xuICBpZiAoIShBcnJheS5pc0FycmF5KHMpIHx8IHR5cGVvZiBzID09PSAnc3RyaW5nJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlY29uZCBhcmd1bWVudCB0byBpbmRleE9mIGlzIG5vdCBhIHN0cmluZyBvciBhcnJheScpO1xuICB9XG5cbiAgcmV0dXJuIHMuaW5kZXhPZih0YXJnZXQpO1xufVxuXG5mdW5jdGlvbiBhcnJheUpvaW4oc2VwLCBhKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2Vjb25kIGFyZ3VtZW50IHRvIGpvaW4gaXMgbm90IGFuIGFycmF5Jyk7XG4gIH1cblxuICByZXR1cm4gYS5qb2luKHNlcCk7XG59XG5cbmZ1bmN0aW9uIHNpZ24oeCkge1xuICByZXR1cm4gKCh4ID4gMCkgLSAoeCA8IDApKSB8fCAreDtcbn1cblxudmFyIE9ORV9USElSRCA9IDEvMztcbmZ1bmN0aW9uIGNicnQoeCkge1xuICByZXR1cm4geCA8IDAgPyAtTWF0aC5wb3coLXgsIE9ORV9USElSRCkgOiBNYXRoLnBvdyh4LCBPTkVfVEhJUkQpO1xufVxuXG5mdW5jdGlvbiBleHBtMSh4KSB7XG4gIHJldHVybiBNYXRoLmV4cCh4KSAtIDE7XG59XG5cbmZ1bmN0aW9uIGxvZzFwKHgpIHtcbiAgcmV0dXJuIE1hdGgubG9nKDEgKyB4KTtcbn1cblxuZnVuY3Rpb24gbG9nMih4KSB7XG4gIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4yO1xufVxuXG5mdW5jdGlvbiBQYXJzZXIob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLnVuYXJ5T3BzID0ge1xuICAgIHNpbjogTWF0aC5zaW4sXG4gICAgY29zOiBNYXRoLmNvcyxcbiAgICB0YW46IE1hdGgudGFuLFxuICAgIGFzaW46IE1hdGguYXNpbixcbiAgICBhY29zOiBNYXRoLmFjb3MsXG4gICAgYXRhbjogTWF0aC5hdGFuLFxuICAgIHNpbmg6IE1hdGguc2luaCB8fCBzaW5oLFxuICAgIGNvc2g6IE1hdGguY29zaCB8fCBjb3NoLFxuICAgIHRhbmg6IE1hdGgudGFuaCB8fCB0YW5oLFxuICAgIGFzaW5oOiBNYXRoLmFzaW5oIHx8IGFzaW5oLFxuICAgIGFjb3NoOiBNYXRoLmFjb3NoIHx8IGFjb3NoLFxuICAgIGF0YW5oOiBNYXRoLmF0YW5oIHx8IGF0YW5oLFxuICAgIHNxcnQ6IE1hdGguc3FydCxcbiAgICBjYnJ0OiBNYXRoLmNicnQgfHwgY2JydCxcbiAgICBsb2c6IE1hdGgubG9nLFxuICAgIGxvZzI6IE1hdGgubG9nMiB8fCBsb2cyLFxuICAgIGxuOiBNYXRoLmxvZyxcbiAgICBsZzogTWF0aC5sb2cxMCB8fCBsb2cxMCxcbiAgICBsb2cxMDogTWF0aC5sb2cxMCB8fCBsb2cxMCxcbiAgICBleHBtMTogTWF0aC5leHBtMSB8fCBleHBtMSxcbiAgICBsb2cxcDogTWF0aC5sb2cxcCB8fCBsb2cxcCxcbiAgICBhYnM6IE1hdGguYWJzLFxuICAgIGNlaWw6IE1hdGguY2VpbCxcbiAgICBmbG9vcjogTWF0aC5mbG9vcixcbiAgICByb3VuZDogTWF0aC5yb3VuZCxcbiAgICB0cnVuYzogTWF0aC50cnVuYyB8fCB0cnVuYyxcbiAgICAnLSc6IG5lZyxcbiAgICAnKyc6IE51bWJlcixcbiAgICBleHA6IE1hdGguZXhwLFxuICAgIG5vdDogbm90LFxuICAgIGxlbmd0aDogc3RyaW5nT3JBcnJheUxlbmd0aCxcbiAgICAnISc6IGZhY3RvcmlhbCxcbiAgICBzaWduOiBNYXRoLnNpZ24gfHwgc2lnblxuICB9O1xuXG4gIHRoaXMuYmluYXJ5T3BzID0ge1xuICAgICcrJzogYWRkLFxuICAgICctJzogc3ViLFxuICAgICcqJzogbXVsLFxuICAgICcvJzogZGl2LFxuICAgICclJzogbW9kLFxuICAgICdeJzogTWF0aC5wb3csXG4gICAgJ3x8JzogY29uY2F0LFxuICAgICc9PSc6IGVxdWFsLFxuICAgICchPSc6IG5vdEVxdWFsLFxuICAgICc+JzogZ3JlYXRlclRoYW4sXG4gICAgJzwnOiBsZXNzVGhhbixcbiAgICAnPj0nOiBncmVhdGVyVGhhbkVxdWFsLFxuICAgICc8PSc6IGxlc3NUaGFuRXF1YWwsXG4gICAgYW5kOiBhbmRPcGVyYXRvcixcbiAgICBvcjogb3JPcGVyYXRvcixcbiAgICAnaW4nOiBpbk9wZXJhdG9yLFxuICAgICc9Jzogc2V0VmFyLFxuICAgICdbJzogYXJyYXlJbmRleFxuICB9O1xuXG4gIHRoaXMudGVybmFyeU9wcyA9IHtcbiAgICAnPyc6IGNvbmRpdGlvblxuICB9O1xuXG4gIHRoaXMuZnVuY3Rpb25zID0ge1xuICAgIHJhbmRvbTogcmFuZG9tLFxuICAgIGZhYzogZmFjdG9yaWFsLFxuICAgIG1pbjogbWluLFxuICAgIG1heDogbWF4LFxuICAgIGh5cG90OiBNYXRoLmh5cG90IHx8IGh5cG90LFxuICAgIHB5dDogTWF0aC5oeXBvdCB8fCBoeXBvdCwgLy8gYmFja3dhcmQgY29tcGF0XG4gICAgcG93OiBNYXRoLnBvdyxcbiAgICBhdGFuMjogTWF0aC5hdGFuMixcbiAgICAnaWYnOiBjb25kaXRpb24sXG4gICAgZ2FtbWE6IGdhbW1hLFxuICAgIHJvdW5kVG86IHJvdW5kVG8sXG4gICAgbWFwOiBhcnJheU1hcCxcbiAgICBmb2xkOiBhcnJheUZvbGQsXG4gICAgZmlsdGVyOiBhcnJheUZpbHRlcixcbiAgICBpbmRleE9mOiBzdHJpbmdPckFycmF5SW5kZXhPZixcbiAgICBqb2luOiBhcnJheUpvaW5cbiAgfTtcblxuICB0aGlzLmNvbnN0cyA9IHtcbiAgICBFOiBNYXRoLkUsXG4gICAgUEk6IE1hdGguUEksXG4gICAgJ3RydWUnOiB0cnVlLFxuICAgICdmYWxzZSc6IGZhbHNlXG4gIH07XG59XG5cblBhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoZXhwcikge1xuICB2YXIgaW5zdHIgPSBbXTtcbiAgdmFyIHBhcnNlclN0YXRlID0gbmV3IFBhcnNlclN0YXRlKFxuICAgIHRoaXMsXG4gICAgbmV3IFRva2VuU3RyZWFtKHRoaXMsIGV4cHIpLFxuICAgIHsgYWxsb3dNZW1iZXJBY2Nlc3M6IHRoaXMub3B0aW9ucy5hbGxvd01lbWJlckFjY2VzcyB9XG4gICk7XG5cbiAgcGFyc2VyU3RhdGUucGFyc2VFeHByZXNzaW9uKGluc3RyKTtcbiAgcGFyc2VyU3RhdGUuZXhwZWN0KFRFT0YsICdFT0YnKTtcblxuICByZXR1cm4gbmV3IEV4cHJlc3Npb24oaW5zdHIsIHRoaXMpO1xufTtcblxuUGFyc2VyLnByb3RvdHlwZS5ldmFsdWF0ZSA9IGZ1bmN0aW9uIChleHByLCB2YXJpYWJsZXMpIHtcbiAgcmV0dXJuIHRoaXMucGFyc2UoZXhwcikuZXZhbHVhdGUodmFyaWFibGVzKTtcbn07XG5cbnZhciBzaGFyZWRQYXJzZXIgPSBuZXcgUGFyc2VyKCk7XG5cblBhcnNlci5wYXJzZSA9IGZ1bmN0aW9uIChleHByKSB7XG4gIHJldHVybiBzaGFyZWRQYXJzZXIucGFyc2UoZXhwcik7XG59O1xuXG5QYXJzZXIuZXZhbHVhdGUgPSBmdW5jdGlvbiAoZXhwciwgdmFyaWFibGVzKSB7XG4gIHJldHVybiBzaGFyZWRQYXJzZXIucGFyc2UoZXhwcikuZXZhbHVhdGUodmFyaWFibGVzKTtcbn07XG5cbnZhciBvcHRpb25OYW1lTWFwID0ge1xuICAnKyc6ICdhZGQnLFxuICAnLSc6ICdzdWJ0cmFjdCcsXG4gICcqJzogJ211bHRpcGx5JyxcbiAgJy8nOiAnZGl2aWRlJyxcbiAgJyUnOiAncmVtYWluZGVyJyxcbiAgJ14nOiAncG93ZXInLFxuICAnISc6ICdmYWN0b3JpYWwnLFxuICAnPCc6ICdjb21wYXJpc29uJyxcbiAgJz4nOiAnY29tcGFyaXNvbicsXG4gICc8PSc6ICdjb21wYXJpc29uJyxcbiAgJz49JzogJ2NvbXBhcmlzb24nLFxuICAnPT0nOiAnY29tcGFyaXNvbicsXG4gICchPSc6ICdjb21wYXJpc29uJyxcbiAgJ3x8JzogJ2NvbmNhdGVuYXRlJyxcbiAgJ2FuZCc6ICdsb2dpY2FsJyxcbiAgJ29yJzogJ2xvZ2ljYWwnLFxuICAnbm90JzogJ2xvZ2ljYWwnLFxuICAnPyc6ICdjb25kaXRpb25hbCcsXG4gICc6JzogJ2NvbmRpdGlvbmFsJyxcbiAgJz0nOiAnYXNzaWdubWVudCcsXG4gICdbJzogJ2FycmF5JyxcbiAgJygpPSc6ICdmbmRlZidcbn07XG5cbmZ1bmN0aW9uIGdldE9wdGlvbk5hbWUob3ApIHtcbiAgcmV0dXJuIG9wdGlvbk5hbWVNYXAuaGFzT3duUHJvcGVydHkob3ApID8gb3B0aW9uTmFtZU1hcFtvcF0gOiBvcDtcbn1cblxuUGFyc2VyLnByb3RvdHlwZS5pc09wZXJhdG9yRW5hYmxlZCA9IGZ1bmN0aW9uIChvcCkge1xuICB2YXIgb3B0aW9uTmFtZSA9IGdldE9wdGlvbk5hbWUob3ApO1xuICB2YXIgb3BlcmF0b3JzID0gdGhpcy5vcHRpb25zLm9wZXJhdG9ycyB8fCB7fTtcblxuICByZXR1cm4gIShvcHRpb25OYW1lIGluIG9wZXJhdG9ycykgfHwgISFvcGVyYXRvcnNbb3B0aW9uTmFtZV07XG59O1xuXG4vKiFcbiBCYXNlZCBvbiBuZGVmLnBhcnNlciwgYnkgUmFwaGFlbCBHcmFmKHJAdW5kZWZpbmVkLmNoKVxuIGh0dHA6Ly93d3cudW5kZWZpbmVkLmNoL21wYXJzZXIvaW5kZXguaHRtbFxuXG4gUG9ydGVkIHRvIEphdmFTY3JpcHQgYW5kIG1vZGlmaWVkIGJ5IE1hdHRoZXcgQ3J1bWxleSAoZW1haWxAbWF0dGhld2NydW1sZXkuY29tLCBodHRwOi8vc2lsZW50bWF0dC5jb20vKVxuXG4gWW91IGFyZSBmcmVlIHRvIHVzZSBhbmQgbW9kaWZ5IHRoaXMgY29kZSBpbiBhbnl3YXkgeW91IGZpbmQgdXNlZnVsLiBQbGVhc2UgbGVhdmUgdGhpcyBjb21tZW50IGluIHRoZSBjb2RlXG4gdG8gYWNrbm93bGVkZ2UgaXRzIG9yaWdpbmFsIHNvdXJjZS4gSWYgeW91IGZlZWwgbGlrZSBpdCwgSSBlbmpveSBoZWFyaW5nIGFib3V0IHByb2plY3RzIHRoYXQgdXNlIG15IGNvZGUsXG4gYnV0IGRvbid0IGZlZWwgbGlrZSB5b3UgaGF2ZSB0byBsZXQgbWUga25vdyBvciBhc2sgcGVybWlzc2lvbi5cbiovXG5cbi8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG52YXIgaW5kZXggPSB7XG4gIFBhcnNlcjogUGFyc2VyLFxuICBFeHByZXNzaW9uOiBFeHByZXNzaW9uXG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbmV4cG9ydCB7IEV4cHJlc3Npb24sIFBhcnNlciB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9