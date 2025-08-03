function walk(astNode, { enter, leave }) {
    // console.log(astNode)
  visit(astNode, null, enter, leave);
};

function visit(node, parent, enter, leave) {
  if (enter) {
    enter.call(null, node, parent);
  }
  const keys = Object.keys(node).filter(
      key => typeof node[key] === "object"
  );
//   console.log(keys)
  keys.forEach(key => {
    const value = node[key];

    if(Array.isArray(value)) {
      value.forEach((item, index) => {
        visit(item, node, enter, leave);
      });
    } else if(value && value.type) {
      visit(value, node, enter, leave);
    }
  });
  if (leave) {
    leave.call(null, node, parent);
  }
}
module.exports = walk