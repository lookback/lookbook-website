#!/usr/bin/env bash
# 
# Copy all CSS variables generated from the Lookbook dependency. We do this since Tailwind v4 only generates
# variables+utils on-demand, in JIT mode. So they need to be present at build time for its engine to find them.
# This script should be run as a prebuild/prestart npm task.

cp node_modules/@lookback/lookbook/dist/vars src/_data/vars
