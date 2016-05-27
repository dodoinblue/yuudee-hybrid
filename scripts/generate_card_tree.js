/**
 * Created by Charles on 5/26/16.
 */
var fs = require('fs');
var path = require('path');

String.prototype.endsWith = function (suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var generate = function (dir) {
  var dirobj = {};
  dirobj.path = dir;
  dirobj.children = [];

  var list = fs.readdirSync(dir);
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      var subdir = path.join(dir, list[i]);
      var isdirectory = fs.lstatSync(subdir).isDirectory();
      var iscard = subdir.endsWith('.xydcard');
      // if (isdirectory && !iscard) {
      //   dirobj.children.push(generate(subdir));
      // } else if (isdirectory && iscard) {
      //   dirobj.children.push(subdir);
      // }
      if (isdirectory) {
        dirobj.children.push(generate(subdir));
      } else {
        dirobj.children.push(subdir);
      }
    }
  }

  return dirobj;
};

var obj = generate('../www/card-assets');

console.log(JSON.stringify(obj, null, 2));

