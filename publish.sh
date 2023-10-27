# !bin/bash

rm -rf node_modules
rm -rf build

npm i
npm run build
npm publish
