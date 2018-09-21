/* global Buffer */
var fs = require('fs');

function UTF8BOMPlugin(addBOM, fileMask){
  this.fileMask = fileMask || /\.(html|htm|css|js|map)$/;
  this.addBOM = addBOM;
}

UTF8BOMPlugin.prototype.apply = function(compiler) {
	var self = this;
  compiler.plugin('done', function(Stats, callback){
		var files = Stats.compilation.assets;
    for(var fileName in files) {
      var path = files[fileName]['existsAt'];
      if(!path) {
        return;
      }

      if(!fileName.match(self.fileMask)) {      
        continue;
      }

      // Whether add or remove BOM head
      var isAdd = self.addBOM;
      
      var buff = fs.readFileSync(path);
      
      if(isAdd) {
        console.log('add bom:'+fileName);
        if (buff.length < 3 
          || buff[0].toString(16).toLowerCase() != "ef" 
          || buff[1].toString(16).toLowerCase() != "bb" 
          || buff[2].toString(16).toLowerCase() != "bf") {
        
          var bom = new Buffer([0xEF, 0xBB, 0xBF]);
          buff = bom + buff;
          fs.writeFile(path, buff.toString(), "utf8", function(err) {
            if (err) throw err;
          });
          
        }
                
      } else {
        console.log('remove bom'+fileName);
        if (buff.length >= 3 
          && buff[0].toString(16).toLowerCase() == "ef" 
          && buff[1].toString(16).toLowerCase() == "bb" 
          && buff[2].toString(16).toLowerCase() == "bf") {          
          buff = buff.slice(3);
          fs.writeFile(path, buff.toString(), "utf8", function(err) {
            if (err) throw err;
          });
        }
      }
      
      
      
      
    }
  });
}

module.exports = UTF8BOMPlugin;