
Promise = require('bluebird')
{exec}  = require('shelljs')
uid     = require('uid')





_module = ->

    process = (block, opts) ->

      default-is-svg = { 

         cmd: (block, tmp-file, tmp-dir, params) -> 
            block.to("#tmp-dir/#tmp-file.dot")
            return "dot -Tsvg #params #tmp-dir/#tmp-file.dot"

         output: (tmp-file, tmp-dir, output) -> output 
         }

      targets = {
        default: default-is-svg
        svg: default-is-svg
        png: {
          cmd: (block, tmp-file, tmp-dir, params) -> 
               block.to("#tmp-dir/#tmp-file.dot")
               return "dot -Tpng #params #tmp-dir/#tmp-file.dot | base64"

          output: (tmp-file, tmp-dir, output) -> '\n <img class="exemd--diagram exemd--diagram__dot" src="data:image/png;base64,' + output + '" /> \n'  
        }
      }

      opts.plugin-template(targets, block, opts)

    iface = {
      process: process
    }
              
    return iface
               
module.exports = _module()










