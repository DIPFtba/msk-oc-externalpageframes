#!/bin/bash

function copy_branch {
    local BRANCH=$1
    local DEST_DIR="docs/${BRANCH}"

    TDIR=$(mktemp -d /tmp/temp_repo_XXXX)
    [[ -d "$TDIR" ]] || { echo "Failed to create temporary directory"; exit 1; }

    git stash push -m "Stash before copying docs" || { echo "Failed to stash changes"; rm -rf "$TDIR"; exit 1; }
    git checkout ${BRANCH} || { echo "Failed to checkout branch ${BRANCH}"; rm -rf "$TDIR"; exit 1; }
    cp -v docs/* ${TDIR} || { echo "Failed to copy documentation to temporary directory"; rm -rf "$TDIR"; exit 1; }
    echo "Copied documentation to branch ${BRANCH} in directory ${TDIR}"

    git checkout jsonEditor || { echo "Failed to checkout main branch"; rm -rf "$TDIR"; exit 1; }
    git stash pop || { echo "Failed to pop stashed changes"; rm -rf "$TDIR"; exit 1; }
    mkdir -p ${DEST_DIR} || { echo "Failed to create destination directory ${DEST_DIR}"; rm -rf "$TDIR"; exit 1; }
    cp -v ${TDIR}/* ${DEST_DIR}/ || { echo "Failed to copy documentation from temporary directory to ${DEST_DIR}"; rm -rf "$TDIR"; exit 1; }
    echo "Copied documentation from branch ${BRANCH} to ${DEST_DIR}"

    rm -rf "$TDIR"
}

echo
echo
echo "Copying docs of other branches..."
echo

copy_branch "jsonEditor_Scoring_evalVarNames"
