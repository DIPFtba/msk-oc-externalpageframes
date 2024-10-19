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

patch() {
    JSONFILE="$1"
    PATCH="$2"

    jq "$PATCH" "$JSONFILE" -c > "$JSONFILE.tmp" || { echo "!!!!! jq Fehler, ABBRUCH !!!!!" >&2; exit 1; }
    echo
    diff -u <(jq '.' "$JSONFILE") <(jq '.' "$JSONFILE.tmp") && { echo "!!!!! Nichts gepatcht ($PATCH)! ABBRUCH !!!!!" >&2; exit 1; }
    echo
    mv -vf "$JSONFILE.tmp" "$JSONFILE" || { echo "ABBRUCH!" >&2; exit 1; }
}

find . -type f -name "*.zip" | while read -r zipfile; do

    tempdir=$(mktemp -d)
    unzip -q "$zipfile" -d "$tempdir"
    pack=0

    while read -r jsonfile; do
        name=$(jq -r '.dataSettings.___jsonSchemaData.___name' "$jsonfile")
        if [ "$name" != "null" ]; then
            # echo "File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"

            # freePaint:
            if [[ "$name" = "freePaint" ]]
            then
                echo
                echo "======================== File: $zipfile, ExtRes: ${jsonfile#$tempdir/external-resources/}, Name: $name"
                # ___freePaint.doFill=true hinzufügen
                patch "$jsonfile" '.___freePaint.doFill = true'
                #{ .fl=0 } in .___extraLines.extraRects[] hinzufügen
                if [[ $( jq -r '.___extraLines.extraRects | length' "$jsonfile" ) -gt 0 ]]
                then
                    patch "$jsonfile" '.___extraLines.extraRects |= map(. + {"fl": 0})'
                fi

                pack=1
            fi

        fi
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
