'use strict';

exports.isUndefinedOrNull = function(v) {
  if(typeof (v) === 'undefined') return true;
  else if (v===null) return true;
  else if (v==='') return true;
  else return false;
};