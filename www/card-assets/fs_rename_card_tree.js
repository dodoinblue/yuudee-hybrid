var fs = require('fs');
var path = require('path');

String.prototype.endsWith = function (suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var rename_card_tree = function (dir) {
  var list = fs.readdirSync(dir);
  var pattern = new RegExp(/^\d\d-\S+/);
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      var subdir = path.join(dir, list[i]);
      var isdirectory = fs.lstatSync(subdir).isDirectory();
      var iscard = subdir.endsWith('.xydcard');

      // if it is a valid ydcard or ydcard stack path
      if (list[i] && pattern.test(list[i])) {
        if (iscard) {
          // put a name.txt file inside it.
          console.log('writing name.txt for ' + list[i]);
          var name = list[i].replace(/\d\d-/, "").replace(".xydcard", "");
          fs.writeFileSync(path.join(subdir, 'name.txt'), name);

          var number = list[i].match(/\d\d/)[0];

          // then rename it.
          fs.renameSync(subdir, path.join(dir, number + '.xydcard'));

        } else {
          somefunction(subdir);
        }

      }
    }

    // when all sub folders are done. rename the current one.
    console.log(dir + 'done!');
    if (dir !== '.') {
      console.log('dirname: ' + path.dirname(dir));
      console.log('basename: ' + path.basename(dir));
      var seq = path.basename(dir).match(/\d\d/)[0];
      var name = path.basename(dir).replace(/\d\d-/, "");
      console.log('seq: ' + seq + " name: " + name);
      console.log("renameing: " + path.join(path.dirname(dir), path.basename(dir)) + " to: " + path.join(path.dirname(dir), seq));
      fs.renameSync(path.join(path.dirname(dir), path.basename(dir)), path.join(path.dirname(dir), seq));
    }

  }
};


rename_card_tree('.');

// var rename_sub_level_folders = function (dir) {
//
//   var list = fs.readdirSync(dir);
//   var pattern = new RegExp(/^\d\d-\S+/);
//   if (list.length > 0) {
//     for (var i = 0; i < list.length; i++) {
//       var subdir = path.join(dir, list[i]);
//       var isdirectory = fs.lstatSync(subdir).isDirectory();
//
//       if (isdirectory) {
//         var sublist = fs.readdirSync(subdir);
//
//         if (sublist.length > 0) {
//           for (var j = 0; j < sublist.length; j++) {
//             if (fs.lstatSync(path.join(subdir, sublist[j])).isDirectory()) {
//               console.log('renameing: ' + path.join(subdir, sublist[j]) + ' to: ' + path.join(subdir, sublist[j] + '.xydcard'));
//               fs.renameSync(path.join(subdir, sublist[j]), path.join(subdir, sublist[j] + '.xydcard'));
//             }
//           }
//         }
//       }
//
//     }
//   }
// };
//
// rename_sub_level_folders('.');
