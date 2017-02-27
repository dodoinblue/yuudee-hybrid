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
  if (fs.existsSync(path.join(dir, 'name.txt'))) {
    dirobj.name = fs.readFileSync(path.join(dir, 'name.txt')).toString();
  } else {
    console.log(path.join(dir, 'name.txt') + 'does not exist');
  }



  var list = fs.readdirSync(dir);
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      var subdir = path.join(dir, list[i]);
      var isdirectory = fs.lstatSync(subdir).isDirectory();
      var iscard = subdir.endsWith('.xydcard');
      // // if (isdirectory && !iscard) {
      // //   dirobj.children.push(generate(subdir));
      // // } else if (isdirectory && iscard) {
      // //   dirobj.children.push(subdir);
      // // }
      // if (isdirectory) {
      //   dirobj.children.push(generate(subdir));
      // } else {
      //   dirobj.children.push(subdir);
      // }

      // If it is a directory, and it starts with 2 digits number
      if (isdirectory && list[i].match(/\d\d/)) {
        // Else, write all the xydcards info to jsonobj
        if (list[i].endsWith('.xydcard')) {
          // Read cards name from subdir/name.txt first
          var name = fs.readFileSync(path.join(subdir, 'name.txt')).toString();
          var childobj = {
            path: subdir,
            name: name
          };
          dirobj.children.push(childobj);

        } else {
          // If this is a stack, call generate on that subfolder.
          dirobj.children.push(generate(subdir));

        }
      }
    }
  }
  return dirobj;
};

var obj = generate('.');

console.log(JSON.stringify(obj, null, 2));

