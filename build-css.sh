#!/bin/sh

set -eo pipefail

src=src/stylesheets/site.css
mode=${LOOKBOOK_MODE:-"dashboard"}

LOOKBOOK_MODE=$mode npx postcss \
    --verbose \
    -o build/assets/site-$mode.css \
    $* \
    $src
