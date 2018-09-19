#!/bin/sh
echo "Bulding contracts..."
npm run clean
truffle compile
npm run parse
echo "Build complete!"