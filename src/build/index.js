var fs = require('fs');
var uglify = require("uglify-js");

var code = {
    "servicejs-test.js": fs.readFileSync("./src/frontend/public/js/servedjs-test.js", "utf8")
};

var options = {
    output: {
        comments: /^!/
    }
};

fs.writeFileSync("./src/frontend/public/js/servedjs.min.js", uglify.minify(code, options).code, "utf8");

fs.createReadStream("./src/frontend/public/js/servedjs-test.js").pipe(fs.createWriteStream("./dist/servedjs-test.js"));
fs.createReadStream("./src/frontend/public/js/servedjs-test.min.js").pipe(fs.createWriteStream("./dist/servedjs-test.min.js"));
