# Scoring-Werte: Allgemeine Hinweise für die Syntax in "Bedingung"

Prinzipiell funktioniert jede Javascript Syntax, s.u.

Klammern () können beliebig zur Gruppierung verwendet werden

## JavaScript Vergleichsoperatoren

| Operator        | Beschreibung                                                                                     |
|-----------------|-------------------------------------------------------------------------------------------------|
| == | Gleichheitsoperator |
| != | Ungleichheitsoperator |
| >  | Größer-als-Operator  |
| < | Kleiner-als-Operator |
| >= | Größer-oder-gleich-Operator |
| <= | Kleiner-oder-gleich-Operator |

## JavaScript Logische Operatoren

| Operator        | Beschreibung                                                                                     |
|-----------------|-------------------------------------------------------------------------------------------------|
| && | Der logische UND-Operator gibt `true` zurück, wenn beide Operanden `true` sind. |
| || | Der logische ODER-Operator gibt `true` zurück, wenn mindestens einer der Operanden `true` ist. |
| ! | Der logische NICHT-Operator invertiert den Wert eines Operanden. |

## JavaScript Operanden

| Operand        | Beschreibung                                                                                     |
|-----------------|-------------------------------------------------------------------------------------------------|
| + | Der Addition-Operator addiert zwei Werte.                                  |
| - | Der Subtraktions-Operator subtrahiert einen Wert von einem anderen.                              |
| * | Der Multiplikations-Operator multipliziert zwei Werte. |
| / | Der Divisions-Operator teilt einen Wert durch einen anderen. |
| % | Der Modulo-Operator gibt den Rest der Division zweier Werte zurück. |

## Funktionen

folgende Funktionen sind in allen EWK definiert:

| Funktion | Bsp |Beschreibung |
|----------|-----|-------------|
| strEqual( s1, s2 ) | strEqual( ${Input_1}, "text" ) | Überprüft Gleichheit von s1 und s2 ohne Groß-/Kleinschreibung |
| isBetween( v, w1, w2 ) | isBetween( ${Value_1}, 50, 80 ) | Überprüft, ob w1 <= v <= w2 |
| match( s, r ) | match( ${Input}, /^Ganzer Text$/i ) | Testet String s mit RegExp r |
| isNumUnit( s, num, unitRE, unitOpt, orEmpty ) | isNumUnit( ${Input_1}, 80, "[mM][bB]", true, false ) | Überprüft, ob String s die numerischen Wert num und die Einheit unitRE (als RegExp) als "num Unit" oder "Unit num" enthält (unitOpt=true bedeutet, die Einheit ist optional; orEmpty=true bedeutet, der ganze String darf leer sein) |