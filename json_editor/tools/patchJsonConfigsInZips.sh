#!/bin/bash

# Sucht in allen neue ExtRes die JSON Configs

#
# Durchsucht alle ZIPs in allen Unterverzeichnissen, packt diese
# temporär aus und durchsucht alle JSON-Dateien, die "config" im
# Dateinamen enthalten und gibt den relativen Pfad und die
# Variable .dataSettings.___jsonSchemaData.___name des JSONs aus
#
# Patcht und ZIP ggf.
#
# Dieses SKript gibt es mit/ohne ZIP unpack/pack in
# msk-oc-externalpageframes/tools und Maco_Json/json_editor/tools
# !!! Änderungen immer in beiden machen !!!
#

preserveLongJsons=0

patch() {
    JSONFILE="$1"
    PATCH="$2"
    IFNULL="$3"

    if [[ -n "$IFNULL" ]]; then
        if [[ $(jq -r "$IFNULL" "$JSONFILE") != "null" ]]; then
            # echo "!!!!! $IFNULL ist null, ABBRUCH !!!!!" >&2
            return 1
        fi
    fi

    [[ $preserveLongJsons -gt 0 && $(cat "$JSONFILE" | wc -l) -gt 2 ]] && compressArg="" || compressArg="-c"

    jq "$PATCH" "$JSONFILE" $compressArg > "$JSONFILE.tmp" || { echo "!!!!! jq Fehler, ABBRUCH !!!!!" >&2; exit 1; }
    echo
    diff -u <(jq '.' "$JSONFILE") <(jq '.' "$JSONFILE.tmp") && echo "Nichts gepatcht ($PATCH)!" >&2 && rm "$JSONFILE.tmp" && return 1
    echo
    mv -vf "$JSONFILE.tmp" "$JSONFILE" || { echo "ABBRUCH!" >&2; exit 1; }

    return 0
}

proc_config() {
    local jsonfile="$1"

    pack=0
    name=$(jq -r '.dataSettings.___jsonSchemaData.___name' "$jsonfile")
    if [ "$name" != "null" ]; then
        # echo "File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"

        # # freePaint:
        # if [[ "$name" = "freePaint" ]]
        # then
        #     echo
        #     echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
        #     # ___freePaint.doFill=true hinzufügen
        #     patch "$jsonfile" '.___freePaint.doFill = true'
        #     #{ .fl=0 } in .___extraLines.extraRects[] hinzufügen
        #     if [[ $( jq -r '.___extraLines.extraRects | length' "$jsonfile" ) -gt 0 ]]
        #     then
        #         patch "$jsonfile" '.___extraLines.extraRects |= map(. + {"fl": 0})'
        #     fi

        #     pack=1
        # fi

        # # textareaInserts
        # if [[ "$name" = "textareaInserts" ]]
        # then
        #     echo
        #     echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
        #     # ___options.toolbar.euro=false hinzufügen
        #     patch "$jsonfile" '.___options.toolbar.euro = false'
        #     pack=1
        # fi

        # numbersByPictures
        if [[ "$name" = "numbersByPictures" ]]
        then
            echo
            echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
            # ___options.toolbar.euro=false hinzufügen
            patch "$jsonfile" '.___defs.picsWidth = 60' '.___defs.picsWidth' && pack=1
        fi

        # numberLineWithAnnotations
        if [[ "$name" = "numberLineWithAnnotations" ]]
        then
            echo
            echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
            # ___options.toolbar.euro=false hinzufügen
            patch "$jsonfile" '.dataSettings.createConnXVars = false' '.dataSettings.createConnXVars' && \
            patch "$jsonfile" '.dataSettings.createInpXVars = false' '.dataSettings.createInpXVars' && \
            pack=1
        fi

        # numberLineWithArcs
        if [[ "$name" = "numberLineWithArcs" ]]
        then
            echo
            echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
            # ___options.toolbar.euro=false hinzufügen
            patch "$jsonfile" '.dataSettings.createInpArcLabAny = false' '.dataSettings.createInpArcLabAny' && \
            patch "$jsonfile" '.dataSettings.createInpArcLabAll = false' '.dataSettings.createInpArcLabAll' && \
            patch "$jsonfile" '.dataSettings.createInpLabAny = false' '.dataSettings.createInpLabAny' && \
            patch "$jsonfile" '.dataSettings.createInpLabAll = false' '.dataSettings.createInpLabAll' && \
            pack=1
        fi

        # pointAreaExt
        if [[ "$name" = "pointAreaExt" ]]
        then
            echo
            echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
            patch "$jsonfile" '.___preSets.preSets = []' '.___preSets.preSets' && pack=1
            patch "$jsonfile" '.___preSets.readonly = false' '.___preSets.readonly' && pack=1
        fi

        # inputInserts
        if [[ "$name" = "inputInserts" ]]
        then
            echo
            echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
            patch "$jsonfile" '.dataSettings.scoringPattern |= map(if has("exp") then . else . + {"exp": true} end)' && pack=1
        fi

        # inputGrid
        if [[ "$name" = "inputGrid" ]]
        then
            echo
            echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
            patch "$jsonfile" '.___basic.insertButtonsBeside = false' '.___basic.insertButtonsBeside' && pack=1
        fi

        # pikasTextEntry
        if [[ "$name" = "pikasTextEntry" ]]
        then
            echo
            echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
            patch "$jsonfile" '.options.fontFile = ""' '.options.fontFile' && pack=1
            patch "$jsonfile" '.options.fontBold = false' '.options.fontBold' && pack=1
            patch "$jsonfile" '.options.navNextOnEnter = true' '.options.navNextOnEnter' && pack=1
            patch "$jsonfile" '.dataSettings.createInpAllVars = false' '.dataSettings.createInpAllVars' && pack=1
            # patch "$jsonfile" '.dataSettings.___fields.fields |= map(if has("navPrev") then . else . + {"navPrev": "",navNext: ""} end)' && pack=1
        fi

        # barSliderFull
        if [[ "$name" = "barSliderFull" ]]
        then
            echo
            echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
            patch "$jsonfile" '.___bar.readonly_bar = false' '.___bar.readonly_bar' && pack=1
            patch "$jsonfile" '.___freePaint.linesChangeState = false' '.___freePaint.linesChangeState' && pack=1
        fi

        # +scoringVariables
        if [[ "$name" = "barPlot" || "$name" = "barSliderFull" || "$name" = "barSlider" || "$name" = "connectedFrames" || "$name" = "filledBar" || "$name" = "inputInserts" || "$name" = "numberLineWithAnnotations" || "$name" = "numberLineWithArcs" || "$name" = "numbersByPictures" || "$name" = "pikasTextEntry" || "$name" = "pointAreaExt" || "$name" = "pointArea" || "$name" = "rectArrayMarkable" ]]
        then
            echo
            echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
            patch "$jsonfile" '.dataSettings.scoringVariables = []' '.dataSettings.scoringVariables' && pack=1
        fi
    fi

    return $pack
}


# ZIPs in den Unterverzeichnissen
find . -type f -name "*.zip" | while read -r zipfile; do

    tempdir=$(mktemp -d)
    unzip -q "$zipfile" -d "$tempdir"
    pack=0

    while read -r jsonfile; do
        proc_config "$jsonfile" || pack=1
    done < <(find "$tempdir" -type f -name "*config*.json")

    # neu packen?
    if [[ $pack -gt 0 ]]
    then
        zipfile=$(realpath "$zipfile")
        rm -f "$zipfile"
        pushd "$tempdir" || { echo "ABBRUCH!" >&2; exit 1; }
        zip -r9q "$zipfile" . || { echo "ABBRUCH!" >&2; exit 1; }
        echo "ZIP erfolgreich abgeschlossen."
        popd || { echo "ABBRUCH!" >&2; exit 1; }
    fi

    rm -rf "$tempdir"
done


# ungezippte JSONs in den Unterverzeichnissen
preserveLongJsons=1

while read -r jsonfile; do
    proc_config "$jsonfile"
done < <(find . -type f -name "*config*.json")
