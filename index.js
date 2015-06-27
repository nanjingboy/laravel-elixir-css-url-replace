var path = require('path'),
    gulp = require('gulp'),
    through = require('through2'),
    elixir = require('laravel-elixir');

function replaceUrl(file, staticRoot)
{
    var fileDirectory = path.dirname(file.path);
    return file.contents.toString().replace(/url\s*\(\s*(['"]?)([^"'\)]*)\1\s*\)/gi, function(match, location) {
        var url,
            urlPath;

        match = match.replace(/\s/g, '');
        url = match.slice(4, -1).replace(/"|'/g, '').replace(/\\/g, '/');
        if (/^\/|https:|http:|data:/i.test(url) === false && fileDirectory.indexOf(staticRoot) > -1) {
            urlPath = path.resolve(fileDirectory + '/' + url);
            if (urlPath.indexOf(staticRoot) > -1) {
                url = urlPath.substr(
                  urlPath.indexOf(staticRoot) + staticRoot.length
                ).replace(/\\/g, '/');
            }
        }

        return 'url("' + url + '")';
    });
}

elixir.extend('css_url_replace', function(sourceFiles, outputPath, staticRoot) {
    if (typeof staticRoot === 'undefined') {
        staticRoot = path.join(process.cwd(), 'public');
    } else if (staticRoot.indexOf(process.cwd()) === -1) {
        staticRoot = path.join(process.cwd(), staticRoot);
    }
    gulp.task('css_url_replace', function() {
        sourceFiles.forEach(function(sourceFile) {
            gulp.src(sourceFile).pipe(
                through.obj(function(file, enc, callback) {
                    file.contents = new Buffer(replaceUrl(file, staticRoot));
                    this.push(file);
                    callback();
                })
            ).pipe(gulp.dest(outputPath));
        });
    });

    return this.queueTask('css_url_replace');
});
