#!/usr/bin/env bash
set -e

webpack --config scripts/webpack.prod.js
sed -i '1i\\#!/usr/bin/env node' bin/index.js
chmod +x bin/index.js
