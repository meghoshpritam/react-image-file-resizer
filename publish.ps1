# Remove-Item -Recurse -Force node_modules
# Remove-Item -Recurse -Force build
rimraf.cmd node_modules
rimraf.cmd build

# Install npm packages
npm install

# Run the build script
npm run build

# Publish the package
npm publish