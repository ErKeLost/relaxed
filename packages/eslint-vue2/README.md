# eslint-config-relaxed-vue2

## relaxed's vue2 eslint config presets extends ts config

## Usage

### Install

```bash
pnpm add -D eslint eslint-config-relaxed-vue2
```

### Config eslint (.eslintrc | .eslintrc.js | .eslintrc.json)

```json
{
  "extends": "relaxed-vue2"
}
```

You don't need .eslintignore normally as it has been provided by the preset.

### add import alias

```json
{
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["~", "."],
          ["@", "./src"]
        ],
        "extensions": [".js", ".jsx", ".mjs", ".ts", ".tsx", "mts", ".d.ts"]
      }
    }
  }
}
```

### Add scripts for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```
