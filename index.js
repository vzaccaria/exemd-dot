#!/usr/bin/env node
// Generated by LiveScript 1.3.1
(function(){
  var Promise, exec, uid, _module;
  Promise = require('bluebird');
  exec = require('shelljs').exec;
  uid = require('uid');
  _module = function(){
    var process, iface;
    process = function(block, opts){
      return new Promise(function(resolve, preject){
        var tempFile, cmd;
        if (opts.targetMode !== "pdf") {
          tempFile = opts.tmpdir + "/" + uid(7) + ".dot";
          block.to(tempFile);
          cmd = "dot -Tsvg " + tempFile;
          return exec(cmd, {
            async: true,
            silent: true
          }, function(code, output){
            if (!code) {
              return resolve(output);
            } else {
              return resolve("```{dot " + params + "}" + block + "```");
            }
          });
        } else {
          return resolve("```{dot " + params + "}" + block + "```");
        }
      });
    };
    iface = {
      process: process
    };
    return iface;
  };
  module.exports = _module();
}).call(this);
