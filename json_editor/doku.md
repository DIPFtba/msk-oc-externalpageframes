# Table of Contents

- [Table of Contents](#table-of-contents)
- [Scoring (alle EWK)](#scoring-alle-ewk)
  - [Scoring: Bedingungen](#scoring-bedingungen)
      - [Vergleichsoperatoren](#vergleichsoperatoren)
      - [Logische Operatoren](#logische-operatoren)
      - [Math. Operatoren](#math-operatoren)
      - [Funktionen](#funktionen)
- [Markierbarer Balken (filledBar)](#markierbarer-balken-filledbar)
- [Zahlenstrahl mit Bögen (numberLineWithArcs)](#zahlenstrahl-mit-bögen-numberlinewitharcs)

# Scoring (alle EWK)

- In den meisten Komponenten unter Reiter "Daten", Abschnitt "Scoring-Werte"

- Weist `V_Score_<pref>` einen Wert zu, wenn entsprechende Bedingung WAHR ist

- Werte und Bedingungen werden in Reihenfolge der Definition abgearbeitet, bei erster zutreffender Bedingung wird abgebrochen, darauf folgende Werte/Bedingungen werden **nicht** ausgewertet. Reihenfolge der Definition muss daran angepasst werden und muss nicht z.B. nach aufsteigendem Wert sortiert sein

## Scoring: Bedingungen

- Klammern "( )" können beliebig zur Gruppierung verwendet werden

- Variablen müssen durch `${ XYZ }` gekennzeichnet, wobei "XYZ" der komplette oder der letzte Teil eines Variablennamens sein muss, so dass dieser Variablenname eindeutig ist, z.B. `${Lab_1}`, `${ArcCnt}` oder `${Val}`. Nur `${_1}` zu verwenden, wenn es z.B. `V_Variable_1a_Lab_1` und `V_Variable_1a_Val_1` in einer Komponente gibt, reicht nicht aus

- Soll der "Variablen-Prefix" der Komponente mit in einer Variablen-Referfenz enthalten sein (weil der komplette Variablenname angegeben wird), dann nicht den Prefix selbst einsetzen, sondern statt dessen `<pref>` verwenden. Wenn also z.B. der Variablen-Prefix der Komponente `1a` lautet und die Variable `V_Input_1a_Lab_1` referenziert werden soll, dann muss `${V_Input_<pref>_Lab_1}` in der Bedingung verwendet werden

- Um die Eingabe der Variablen zu vereinfachen, wird die komplette Variablen-Referenz in die Zwischenablage kopiert, wenn in der Variablen-Liste rechts auf eine Variable geklickt wird

- Zur Evaluation der Bedingung wird die Bibliothek `expr-eval` verwendet, s. [Doku](https://github.com/silentmatt/expr-eval?tab=readme-ov-file#expression-syntax)

#### Vergleichsoperatoren

| Operator        | Beschreibung                               |
|:---------------:|:-------------------------------------------|
| == | Gleichheitsoperator |
| != | Ungleichheitsoperator |
| >  | Größer-als-Operator  |
| <  | Kleiner-als-Operator |
| >= | Größer-oder-gleich-Operator |
| <= | Kleiner-oder-gleich-Operator |
| in | IN-Operator, ergibt TRUE, wenn linker Operand in rechtem Array-Operand enthalten ist |

#### Logische Operatoren

| Operator        | Beschreibung                              |
|:---------------:|:------------------------------------------|
| and | Der logische UND-Operator gibt `true` zurück, wenn beide Operanden `true` sind. |
| or  | Der logische ODER-Operator gibt `true` zurück, wenn mindestens einer der Operanden `true` ist. |
| not | Der logische NICHT-Operator invertiert den Wert eines Operanden. |

#### Math. Operatoren

| Operand        | Beschreibung                              |
|:--------------:|:------------------------------------------|
| + | Der Addition-Operator addiert zwei Werte.                                  |
| - | Der Subtraktions-Operator subtrahiert einen Wert von einem anderen.                              |
| * | Der Multiplikations-Operator multipliziert zwei Werte. |
| / | Der Divisions-Operator teilt einen Wert durch einen anderen. |
| % | Der Modulo-Operator gibt den Rest der Division zweier Werte zurück. |

#### Funktionen

folgende Funktionen sind in allen EWK definiert:

| Funktion | Bsp |Beschreibung |
|:---------|:----|:------------|
| `length( s )` | `length( ${Val} ) > 5` | Ergibt Länge des Strings s |
| `strEqual( s1, s2 )` | `strEqual( ${Input_1}, "text" )` | Überprüft Gleichheit von s1 und s2 ohne Groß-/Kleinschreibung |
| `isBetween( v, w1, w2 )` | `isBetween( ${Value_1}, 50, 80 )` | Überprüft, ob w1 <= v <= w2 |
| `match( s, r )` | `match( ${Input}, /^Ganzer Text$/i )` | Testet String s mit RegExp r |
| `isNumUnit( s, num, unitRE, unitOpt, orEmpty )` | `isNumUnit( ${Input_1}, 80, "[mM][bB]", true, false )` | Überprüft, ob String s die numerischen Wert num und die Einheit unitRE (als RegExp) als "num Unit" oder "Unit num" enthält (unitOpt=true bedeutet, die Einheit ist optional; orEmpty=true bedeutet, der ganze String darf leer sein) |





# Markierbarer Balken (filledBar)

- "**Markierbar nur Vielfache von**" spezifiziert, welche Werte markiert werden können. Zur Auswahl stehen "kleine Ticks" (dann können nur kleine Ticks markiert werden, je nachdem, wie diese definiert sind), "1er", "10er" oder "(frei)" (dann ist Markierung frei wählbar, auch alle Zwischenwerte)

-   Um statt der voreingestellten 100 markierbaren Felder z.B. nur 10 zu haben, gibt es folgende Möglichkeiten:

    1. Die Schrittweite der kleinen Ticks auf 10 stellen und die großen Ticks ausschalten
    2. Den Maximalwert auf 10 setzen, Schrittweite der kleinen Ticks auf 1 lassen
    3. Die kleinen Ticks ausschalten und "Markierung nur Vielfache von" auf 10er setzen

    Das sind alles gleichwertige Lösungen, nur der Wertebereich des gespeicherten "markierten Wert" ist unterschiedlich




# Zahlenstrahl mit Bögen (numberLineWithArcs)

- Alle Labels und Bögen werden in aufsteigender Reihenfolge sortiert, diese Reihenfolge bestimmt die Zuordnung der Variablen `XYZ_1`, `XYZ_2` etc. So geben `V_Input_<pref>_ArcFrom_1` und `V_Input_<pref>_ArcTo_1` den am weitesten links befindlichen Bogen wieder, nicht den in der JSON Config als ersten definierten Bogen. Falls ein User ein Bogen weiter links definiert, wird der erste Bogen automatisch zu `V_Input_<pref>_ArcFrom_2` und `V_Input_<pref>_ArcTo_2`. Das muss auch beim Scoring beachtet werden.

- Auch die `Von` (`_ArcFom_X`) und `Bis` (`_ArcTo_X`) Werte werden sortiert, sodass immer `Von < Bis` gilt. Die Definition im JSON Configfile ist nicht entscheidend, ebenso ist egal, ob der Bogen von links nach rechts oder von rechts nach links erstellt wird

- Damit die Zuordnung der Variablen klarer ist, sollten also die Labels und Bögen bereits sortiert (Reihenfolge in der Tabelle) im JSON Configfile definiert werden



