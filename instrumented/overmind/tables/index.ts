function cov_keu8z5ds5() {
  var path = "/Users/joy/Documents/projekte/013_web_orderAndPay/order-and-pay-frontend-admin/src/overmind/tables/index.ts";
  var hash = "e9da8f9e8e05215568a26c66a9ead2c26fafe43a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/joy/Documents/projekte/013_web_orderAndPay/order-and-pay-frontend-admin/src/overmind/tables/index.ts",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "e9da8f9e8e05215568a26c66a9ead2c26fafe43a"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_keu8z5ds5 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_keu8z5ds5();
import { state } from "./state";
import * as actions from './actions';
import * as effects from './effects';
export { state, actions, effects };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbInN0YXRlIiwiYWN0aW9ucyIsImVmZmVjdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVZOzs7Ozs7Ozs7QUFmWixTQUFTQSxLQUFULFFBQXNCLFNBQXRCO0FBQ0EsT0FBTyxLQUFLQyxPQUFaLE1BQXlCLFdBQXpCO0FBQ0EsT0FBTyxLQUFLQyxPQUFaLE1BQXlCLFdBQXpCO0FBRUEsU0FDSUYsS0FESixFQUVJQyxPQUZKLEVBR0lDLE9BSEoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdGF0ZSB9IGZyb20gXCIuL3N0YXRlXCJcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJ1xuaW1wb3J0ICogYXMgZWZmZWN0cyBmcm9tICcuL2VmZmVjdHMnXG5cbmV4cG9ydCB7XG4gICAgc3RhdGUsXG4gICAgYWN0aW9ucyxcbiAgICBlZmZlY3RzXG59Il19