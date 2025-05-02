# Table of Contents

- [Table of Contents](#table-of-contents)
- [Scoring (alle EWK)](#scoring-alle-ewk)
  - [Scoring: Bedingungen](#scoring-bedingungen)
      - [Vergleichsoperatoren](#vergleichsoperatoren)
      - [Logische Operatoren](#logische-operatoren)
      - [Math. Operatoren](#math-operatoren)
      - [Funktionen](#funktionen)
- [Liste der Events (alle EWK)](#liste-der-events-alle-ewk)
    - [barPlot](#barplot)
    - [barSliderFull](#barsliderfull)
    - [freePaintMulti](#freepaintmulti)
    - [freePaintRecog](#freepaintrecog)
    - [inputGrid](#inputgrid)
    - [inputInserts](#inputinserts)
    - [numberLineWithAnnotations](#numberlinewithannotations)
    - [numberLineWithArcs](#numberlinewitharcs)
    - [textAreaInserts](#textareainserts)
- [Markierbarer Balken (filledBar)](#markierbarer-balken-filledbar)
- [Freihand Malen/Markieren (freePaint)](#freihand-malenmarkieren-freepaint)
- [Eingabefeld mit Buttons (inputInserts)](#eingabefeld-mit-buttons-inputinserts)
- [Zahlenstrahl mit Bögen (numberLineWithArcs)](#zahlenstrahl-mit-bögen-numberlinewitharcs)
- [freePaint mit externen Buttons (freePaintMult)](#freepaint-mit-externen-buttons-freepaintmult)

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
| `isNull( v )` | `isNull( ${Value_1} )` | Überprüft, ob v===null ist |
| `isBetween( v, w1, w2 )` | `isBetween( ${Value_1}, 50, 80 )` | Überprüft, ob w1 <= v <= w2 |
| `match( s, r, fl )` | `match( ${Input}, '^Ganzer Text$' ,'i' )` | Testet String s mit RegExp r und RegExp-Flags fl |
| `isNumUnit( s, num, unitRE, unitOpt, orEmpty )` | `isNumUnit( ${Input_1}, 80, "[mM][bB]", true, false )` | Überprüft, ob String s die numerischen Wert num und die Einheit unitRE (als RegExp) als "num Unit" oder "Unit num" enthält (unitOpt=true bedeutet, die Einheit ist optional; orEmpty=true bedeutet, der ganze String darf leer sein) |




# Liste der Events (alle EWK)

Folgende EWK triggern Events

### barPlot
|Event|Bedeutung|
|:----|:--------|
|`ev_InputValidation_ExtRes` und<br>`ev_InputValidation_<pref>`|Es wurde versucht, eine unerlaubte Eingabe zu machen (definiert durch Angabe von `Vorkomma-Stellen` und/oder `Nachkomma-Stellen` bei editierbaren y-Achsen-Labels oder Bar-Labels)|

### barSliderFull
|Event|Bedeutung|
|:----|:--------|
|`ev_InputValidation_ExtRes` und<br>`ev_InputValidation_<pref>`|Es wurde versucht, eine unerlaubte Eingabe zu machen (definiert durch Angabe von `Vorkomma-Stellen` und/oder `Nachkomma-Stellen` bei editierbaren Labels)|

### freePaintMulti
|Event|Bedeutung|
|:----|:--------|
|`EV_InitDone_ExtRes` und<br>`EV_InitDone_<pref>`|Initialisierung der EWK ist abgeschlossen|
|`EV_CAN_UNDO`|'Undo' & 'ClearAll' stehen zur Verfügung|
|`EV_CANNOT_UNDO`|'Undo' & 'ClearAll' stehen nicht zur Verfügung|
|`EV_CAN_REDO`|'Redo' steht zur Verfügung|
|`EV_CANNOT_REDO`|'Redo' steht nicht zur Verfügung|

### freePaintRecog
Alle Events von `freePaintMulti`und **zusätzllich:**
|Event|Bedeutung|
|:----|:--------|
|`EV_NewRecog` und<br>`EV_NewRecog_<pref>`|Es wurde ein neuer Text erkannt und in die Variable `V_RecogTxt_<pref>` geschrieben|

### inputGrid
|Event|Bedeutung|
|:----|:--------|
|`ev_InputValidation_ExtRes` und<br>`ev_InputValidation_<pref>`|Es wurde versucht, eine unerlaubte Eingabe zu machen, z.B. im "Carry"-Mode (nur 2 Ziffern erlaubt) oder im normalen "Text"-Mode (falls dort Beschränkung konfiguriert ist, was derzeit über JSON-Editor nicht möglich ist)|
|`EV_ClickWithoutIconBarMode_<userDefId>`|Ohne aktiverten Modus (Text, Paint) wurde ins grid geklickt|
|`EV_IconBarSwitchText_<userDefId>`|Modus "Text" wurde gewählt|
|`EV_IconBarSwitchPaint_<userDefId>`|Modus "Paint" wurde gewählt|
|`EV_IconBarSwitchOff_<userDefId>`|Aktueller Modus wurde deaktiviert|

### inputInserts
|Event|Bedeutung|
|:----|:--------|
|`ev_InputValidation_ExtRes` und<br>`ev_InputValidation_<pref>`|Es wurde versucht, eine unerlaubte Eingabe zu machen, es sind nur Dezimalzahlen und Rechenzeichen in beliebigen Reihenfolgen erlaubt|

### numberLineWithAnnotations
|Event|Bedeutung|
|:----|:--------|
|`ev_InputValidation_ExtRes` und<br>`ev_InputValidation_<pref>`|Es wurde versucht, eine unerlaubte Eingabe zu machen (definiert durch Angabe von `Vorkomma-Stellen` und/oder `Nachkomma-Stellen` bei editierbaren Eingabefeldern)|

### numberLineWithArcs
|Event|Bedeutung|
|:----|:--------|
|`ev_InputValidation_ExtRes` und<br>`ev_InputValidation_<pref>`|Es wurde versucht, eine unerlaubte Eingabe zu machen (definiert durch Angabe von `Vorkomma-Stellen` und/oder `Nachkomma-Stellen` bei editierbaren Achsenlabels)|

### textAreaInserts
|Event|Bedeutung|
|:----|:--------|
|`ev_InputValidation_ExtRes` und<br>`ev_InputValidation_<pref>`|Es wurde versucht, eine unerlaubte Eingabe zu machen (falls dort Beschränkung der Zeichen oider der Länge konfiguriert ist, was derzeit über JSON-Editor nicht möglich ist)|




# Markierbarer Balken (filledBar)

- "**Markierbar nur Vielfache von**" spezifiziert, welche Werte markiert werden können. Zur Auswahl stehen "kleine Ticks" (dann können nur kleine Ticks markiert werden, je nachdem, wie diese definiert sind), "1er", "10er" oder "(frei)" (dann ist Markierung frei wählbar, auch alle Zwischenwerte)

-   Um statt der voreingestellten 100 markierbaren Felder z.B. nur 10 zu haben, gibt es folgende Möglichkeiten:

    1. Die Schrittweite der kleinen Ticks auf 10 stellen und die großen Ticks ausschalten
    2. Den Maximalwert auf 10 setzen, Schrittweite der kleinen Ticks auf 1 lassen
    3. Die kleinen Ticks ausschalten und "Markierung nur Vielfache von" auf 10er setzen

    Das sind alles gleichwertige Lösungen, nur der Wertebereich des gespeicherten "markierten Wert" ist unterschiedlich




# Freihand Malen/Markieren (freePaint)

- Im Reiter `PaintArea` wird der Bereich spezifiziert, in dem Pinsel/Marker verwendet werden können. Der sollte die Icons nicht beinhalten.

- Die PaintArea kann einen Rahmen haben (Rahmendicke>0) und/oder eine Füllung ("Füllung" einschalten). Rahmen/Füllung werden immer im Hintergrund gemalt und sind durch Marker/Pinsel übermalbar. Marker/Pinsel sind standardmäßig aber nur innerhalb des Rahmens verwendbar, sodass der Rahmen der PaintArea normalerweise nicht übermalbar ist.

- Im Reiter `Rechteck / Linien` sind zusätzliche Rechtecke und/oder Linien definierbar. Die Rahmen der Rechtecke und die Linien sind **IMMER im Vordergund**, also nicht mit Pinsel/Marker übermalbar. `Füllg. Ebene` gibt bei Rechtecken an, ob diese keine Füllung haben (=0), oder Füllung im Hintergund (=1, mit Pinsel/Marker übermalbar) oder Füllung im Vordergrund (=2, nicht übermalbar) haben

- Bei Rechtecken kann durch `begr. Pinsel` und/oder `begr. Marker` eingeschaltet werden, dass Pinsel/Marker nur in diesem (und allen anderen mit dieser aktivierten Option) Rechtecken malen und **NICHT** (wie Standard) innerhalb der PaintArea




# Eingabefeld mit Buttons (inputInserts)

- Im Reiter `Daten` können `Scoring-Muster` angegeben werden, die dann unter `Scoring-Werte` beliebig kombiniert werden können

- Ein `Scoring-Muster` besteht aus einem `VarName`, einem `Term` und Optionen. Die Variable mit dem angegebenen Namen wird auf `1` gesetzt, wenn die Eingabe dem `Term` entspricht, ansonsten auf 0

- Ein `Term` besteht aus einer Operation mit zwei oder mehreren Operanden, und optional einem obligatorischem/optionalem Ergebnis. Wird ein obligatorisches Ergebnis mit angegeben `= <Wert>`, muss das Ergebnis auch in der Eingabe enthalten sein, wird ein optionales Ergebnis angegeben `[ = <Wert>]`, dann kann dieses (aber kein anderes) Ergebnis in der EIngabe enthalten sein, um die Variable auf `1` zu setzen. Beispiele: `1 + 3`, `4 * 5 * 2`, `20 / 4 [ = 5]`, `10 - 6 = 4`

- Wird einem Operand/Ergebnis ein `!` vorangestellt, bedeutet dies, das hier JEDER AUßER DEM SPEZIFIZIERTEN Operand als richtig gewertet wird. So können z.B. Muster wie "3 mal [irgendwas außer 4]" geprüft werden: `3 * !4`

- Wird statt eines Zahlen-Operanden/Ergebnisses ein `.` verwendet, bedeutet dies JEDE ZAHL. So können z.B. Muster wie "Irgendeine Multiplikation": `. * .` oder "Multiplikation mit Ergebnis": `. * . = .` oder "3 mal [irgendwas]": `3 * .` geprüft werden

- Die Option `OP-Perm` gibt an, ob die Operanden beliebig vertauscht sein dürfen

- Die Option `Mehr erlaubt` gibt an, ob vor/hinter dem Term auch noch weitere Eingabe erlaubt sind, die die Bewertung nicht beeinflussen




# Zahlenstrahl mit Bögen (numberLineWithArcs)

- Alle Labels und Bögen werden in aufsteigender Reihenfolge sortiert, diese Reihenfolge bestimmt die Zuordnung der Variablen `XYZ_1`, `XYZ_2` etc. So geben `V_Input_<pref>_ArcFrom_1` und `V_Input_<pref>_ArcTo_1` den am weitesten links befindlichen Bogen wieder, nicht den in der JSON Config als ersten definierten Bogen. Falls ein User ein Bogen weiter links definiert, wird der erste Bogen automatisch zu `V_Input_<pref>_ArcFrom_2` und `V_Input_<pref>_ArcTo_2`. Das muss auch beim Scoring beachtet werden.

- Auch die `Von` (`_ArcFom_X`) und `Bis` (`_ArcTo_X`) Werte werden sortiert, sodass immer `Von < Bis` gilt. Die Definition im JSON Configfile ist nicht entscheidend, ebenso ist egal, ob der Bogen von links nach rechts oder von rechts nach links erstellt wird

- Damit die Zuordnung der Variablen klarer ist, sollten also die Labels und Bögen bereits sortiert (Reihenfolge in der Tabelle) im JSON Configfile definiert werden

- Die Option `Keine neuen Bögen zulassen` macht nur Sinn, wenn keine Bögen vordefiniert werden und im Reiter `Achsenlabels` die Option `Labels ohne Bögen nicht löschen` aktiviert wird. Dann können Labels bzw. Beschriftungen am Zahlenstrahl erzeugt, bewegt und beschriftet werden (ohne Bögen). Die Option `Maximalzahl` im Reiter `Achsenlabels` begrenzt dann die mögliche Anzahl




# freePaint mit externen Buttons (freePaintMult)

Die Erweiterung reagiert auf folgende Befehle:

|Befehl IB|Effekt|
|:--------|:-----|
|`callExternalPageFrame( ID, 'undo' )`|Undo des letzten Zeichnens/Radierens/ClearAll|
|`callExternalPageFrame( ID, 'redo' )`|Redo des letzten Undo (außer clearAll)|
|`callExternalPageFrame( ID, 'clearAll' )`|Alles Löschen|
|`callExternalPageFrame( ID, 'setBrush', 'HTMLColor', Breite, 'add\|sub' )`|Setzt Pinsel Farbe (HTMLColor z.B. 'blue', '#ff0080'), Dicke und Mode ('add'=zeichnen, 'sub'=radieren)|

Die Erweiterung sendet folgende Events:

|Event|Bedeutung|
|:----|:--------|
|`EV_InitDone_ExtRes` und<br>`EV_InitDone_<pref>`|Initialisierung der EWK ist abgeschlossen|
|`EV_CAN_UNDO`|'Undo' & 'ClearAll' stehen zur Verfügung|
|`EV_CANNOT_UNDO`|'Undo' & 'ClearAll' stehen nicht zur Verfügung|
|`EV_CAN_REDO`|'Redo' steht zur Verfügung|
|`EV_CANNOT_REDO`|'Redo' steht nicht zur Verfügung|
