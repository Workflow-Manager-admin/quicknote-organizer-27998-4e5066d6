#!/bin/bash
cd /home/kavia/workspace/code-generation/quicknote-organizer-27998-4e5066d6/quicknote_organizer
npm run lint 
$ESLINT_EXIT_CODE
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
  exit 1
fi

