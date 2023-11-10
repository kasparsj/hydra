import { log } from './log.js'
import { separator } from "./editor";

export default {
  eval: (arg, callback) => {
    arg = arg.split(separator).reverse().join("\n")
    // wrap everything in an async function
  var jsString = `(async() => {
    ${arg}
})().catch(${(err) => log(err.message, "log-error")})`
    var isError = false
    try {
      eval(jsString)
      // log(jsString)
      log('')
    } catch (e) {
      isError = true
      console.log("logging", e)
      // var err = e.constructor('Error in Evaled Script: ' + e.message);
      // console.log(err.lineNumber)
      log(e.message, "log-error")
      //console.log('ERROR', JSON.stringify(e))
    }
  //  console.log('callback is', callback)
    if(callback) callback(jsString, isError)
  }
}
