
Promise = require('bluebird')
{exec}  = require('shelljs')
uid     = require('uid')

_module = ->

    process = (block, opts) ->
      new Promise (resolve, preject) ->

        if opts.target-mode != "pdf"

              temp-file = "#{opts.tmpdir}/#{uid(7)}.dot"
              block.to(temp-file)
              cmd = "dot -Tsvg #temp-file"
              exec cmd, {+async, +silent}, (code, output) ->

                if not code
                  resolve(output)

                else
                  preject(code)

        else
          resolve("```{dot #params}#block```")

    iface = {

      process: process

    }
              
    return iface
               
module.exports = _module()






