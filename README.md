# About
An interactive book app that allows the reader to choose their own story.

# Building
To setup project after cloning, run `npm install` in the top level directory.

Execute `npm run build` to package source code into a bundle via webpack. Build artifacts
will appear in the `dist/` directory.

Use `npm run server` or `npx vite` to run server. Should be able to see build artifacts if `dist/` directory is added to url.
use `npx vite build` to build prod version and run in server

# Special Notes
`vendor/` directory contains only the necessary dependencies for runtime