# laravel-elixir-css-url-replace

An extension package for laravel elixir to replace relative url path with absolute path

# Install:

```shell
$ npm install laravel-elixir-css-url-replace --save-dev
```

# Params:

### sourceFiles
Type: `Array`

### outputPath
Type: `string`

### staticRoot
Type: `String`
Default value: `public`

## Example:

```javascript

var elixir = require('laravel-elixir');

require('laravel-elixir-css-url-replace');

elixir(function(mix) {
    mix.css_url_replace([
      'public/styles/test.css',
      'public/styles/test1.css'
    ], 'public/build/css_url_replace');
});


```

# License:

MIT