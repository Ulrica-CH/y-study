function fn(a, b, c) {
  console.log(arguments);
}

/**
 * [Arguments] { '0': 1, '1': 2, '2': 3 }
 * [Arguments] { '0': 0, '1': null, '2': [ 1, 2 ] }
 */
fn(1, 2, 3);
fn(0, null, [1, 2]);


function fn2(...args) {
  console.log(args,...args);
}

/** 
 * [ 1, 2, 3 ] 1 2 3
 * [ 0, null, [ 1, 2 ] ] 0 null [ 1, 2 ]
 */
fn2(1, 2, 3);
fn2(0, null, [1, 2]);