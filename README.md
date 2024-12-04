# webpack-start-template

For fresh projects with modular requirements

basic setup includes css-loader, styles-loader, html-webpack-plugin, 

Build optimizations like minify are not included in this setup, don't forget to add them later.

## .gitignore

Make sure to include a `.gitignore` file. You can use a standard template for your project from GitHub's [gitignore repository](https://github.com/github/gitignore).

note that webpack.dev.js config needs const path = require('path') explicitly imported as well, the merge does not account for this.