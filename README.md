# rj.checkout.cli

## NPM commands

| Command | Description                                                                           |
| ------- | ------------------------------------------------------------------------------------- |
| build   | Runs TSC and transpile from Typescript (src directory) to javascript (dist directory) |
| lint    | Runs eslint and fixes on typescript file                                              |
| test    | Runs unit test (written in jest) and generates code coverage report                   |

## Program execution

### Command

```
node ./dist/index.js
```

### Options

```
      --help      Show help                                            [boolean]
      --version   Show version number                                  [boolean]
  -c, --customer  Name of the customer                                [required]
  -i, --items     List of items to be added in the cart with space delimiter
                                                              [array] [required]
```

#### Examples

```
> node ./dist/index.js -c Axil Coffee Roasters -i standout standout standout premium
Total: 1363.96
```

```
> node ./dist/index.js -c SecondBit -i classic standout premium
Total: 987.97
```

```
> node ./dist/index.js -c MYER -i standout standout standout premium standout standout standout standout standout standout standout
Total: 2973.91
```
