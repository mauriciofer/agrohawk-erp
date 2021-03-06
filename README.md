# agrohawk-erp

> Admin system for Agrohawcr.com

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

# Plugins
ESLint - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
GitLens - https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
Document This - https://marketplace.visualstudio.com/items?itemName=oouo-diogo-perdigao.docthis

# Git Hooks
- Pre-Commit - instructions

cd /.git/hooks
vim pre-commit
copy in the code below
chmod +x pre-commit

```
#!/bin/sh
 
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")
ESLINT="$(git rev-parse --show-toplevel)/node_modules/.bin/eslint"
 
if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi
 
PASS=true
 
printf "\nValidating Javascript:\n"
 
# Check for eslint
if [[ ! -x "$ESLINT" ]]; then
  printf "\t\033[41mPlease install ESlint\033[0m (npm i --save-dev eslint)"
  exit 1
fi
 
for FILE in $STAGED_FILES
do
  "$ESLINT" "$FILE"
 
  if [[ "$?" == 0 ]]; then
    printf "\t\033[32mESLint Passed: $FILE\033[0m"
  else
    printf "\t\033[41mESLint Failed: $FILE\033[0m"
    PASS=false
  fi
done
 
printf "\nJavascript validation completed!\n"
 
if ! $PASS; then
  printf "\033[41mCOMMIT FAILED:\033[0m Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again.\n"
  exit 1
else
  printf "\033[42mCOMMIT SUCCEEDED\033[0m\n"
fi
 
exit $?
```

BASH Command for auto lint fixes

```
$ git status | grep 'new file\|modified\|added' | awk -F':' '{print $2}' | xargs ./node_modules/.bin/eslint --fix
```
