function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function extend() {
  var newObj = {};

  for (var i = 0; i < arguments.length; i++) {
    var obj = arguments[i];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key];
      }
    }
  }

  return newObj;
}

exports.store = (namespace, data) => {
  if (data) {
    return localStorage.setItem(namespace, JSON.stringify(data));
  }

  var store = localStorage.getItem(namespace);

  return (store && JSON.parse(store)) || []; // Coupled to array of todos
}

exports.guid = uuidv4;
exports.extend = extend;