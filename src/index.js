require('shelljs')
var uid = require('uid')()
var picnum = 0

var generateSvg = () => {
  "use strict"
  return {
    cmd: (block, file, dir, params) => {
      var fn = `${dir}/${file}.dot`
      block.to(fn)
      return `dot -Tsvg ${params} '${fn}'`
    },
    output: (file, dir, output) => {
      return output;
    }
  }
}

var generatePng = () => {
  "use strict"
  return {
    cmd: (block, file, dir, params) => {
      var fn = `${dir}/${file}.dot`
      block.to(fn)
      return `dot -Tpng ${params} '${fn}' | base64`
    },
    output: (file, dir, output) => {
      return `\n <img class="exemd--diagram exemd--diagram__dot" src="data:image/png;base64,${output}" /> \n`;
    }
  }
}

var generatePdf = () => {
  "use strict"
  return {
    cmd: (block, file, dir, params) => {
      var fn = `${dir}/${file}.dot`
      block.to(fn)
      var cc = [
        `dot -Tpdf ${params} '${dir}/${file}.dot' > '${dir}/${file}.pdf'`,
        `mkdir -p './figures'`,
        `cp '${dir}/${file}.pdf' './figures/f-dot-${uid}-${picnum}.pdf'`,
        `echo './figures/f-dot-${uid}-${picnum}.pdf'`
      ]
      picnum = picnum + 1
      return cc.join(' && ')
    },
    output: (file, dir, output) => {
      var fname = output
      return `![](${fname})`
    }
  }
}


var _module = () => {
  "use strict";

  var getTargets = () => {
    var targets = {
      default: generateSvg(),
      svg: generateSvg(),
      pdf: generatePdf(),
      png: generatePng()
    }
    return targets
  }

  var process = (block, opts) => {
    return opts.pluginTemplate(getTargets(), block, opts)
  }

  return {
    getTargets,
    process
  }
}

module.exports = _module()
