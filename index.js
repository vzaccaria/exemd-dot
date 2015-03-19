"use strict";

require("shelljs");

var picnum = 0;

var generateSvg = function () {
  "use strict";
  return {
    cmd: function (block, file, dir, params) {
      var fn = "" + dir + "/" + file + ".dot";
      block.to(fn);
      return "dot -Tsvg " + params + " '" + fn + "'";
    },
    output: function (file, dir, output) {
      return output;
    }
  };
};

var generatePng = function () {
  "use strict";
  return {
    cmd: function (block, file, dir, params) {
      var fn = "" + dir + "/" + file + ".dot";
      block.to(fn);
      return "dot -Tpng " + params + " '" + fn + "' | base64";
    },
    output: function (file, dir, output) {
      return "\n <img class=\"exemd--diagram exemd--diagram__dot\" src=\"data:image/png;base64," + output + "\" /> \n";
    }
  };
};

var generatePdf = function () {
  "use strict";
  return {
    cmd: function (block, file, dir, params) {
      var fn = "" + dir + "/" + file + ".dot";
      block.to(fn);
      var cc = ["dot -Tsvg " + params + " '" + dir + "/" + file + ".dot' > '" + dir + "/" + file + ".svg'", "mkdir -p '" + process.cwd() + "/figures'", "cat '" + dir + "/" + file + ".svg' | rsvg-convert -z 0.5 -f pdf > '" + process.cwd() + "/figures/f-dot-" + picnum + ".pdf'", "echo '" + process.cwd() + "/figures/f-dot-" + picnum + ".pdf'"];
      picnum = picnum + 1;
      return cc.join(" && ");
    },
    output: function (file, dir, output) {
      var fname = output;
      return "![](" + fname + ")";
    }
  };
};

var _module = function () {
  "use strict";

  var getTargets = function () {
    var targets = {
      "default": generateSvg(),
      svg: generateSvg(),
      pdf: generatePdf(),
      png: generatePng()
    };
    return targets;
  };

  var process = function (block, opts) {
    return opts.pluginTemplate(getTargets(), block, opts);
  };

  return {
    getTargets: getTargets,
    process: process
  };
};

module.exports = _module();
