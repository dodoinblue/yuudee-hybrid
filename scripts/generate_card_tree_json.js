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
    console.log(path.join(dir, 'name.txt') + ' does not exist');
  }
  // find cover.jpg
  if (fs.existsSync(path.join(dir, 'cover.jpg'))) {
    dirobj.cover = path.join(dir, 'cover.jpg');
  } else {
    console.log(path.join(dir, 'cover.jpg') + ' does not exist')
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
        // If this is a card, write all the xydcards info to jsonobj
        if (list[i].endsWith('.xydcard')) {
          var childobj = {
            path: subdir,
          };
          // Read cards name from subdir/name.txt first
          if (fs.existsSync(path.join(subdir, 'name.txt'))) {
            childobj.name = fs.readFileSync(path.join(subdir, 'name.txt')).toString();
          }

          // Read image list & audio list
          var imageList = fs.readdirSync(path.join(subdir, 'images'));
          var audioList = fs.readdirSync(path.join(subdir, 'audios'));
          if (imageList && imageList.length > 0) {
            childobj.images = imageList;
          }
          if (audioList && audioList.length > 0) {
            childobj.audios = audioList;
          }
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

fs.writeFileSync('cards.json', JSON.stringify(obj, null, 2));

// console.log(JSON.stringify(obj, null, 2));
