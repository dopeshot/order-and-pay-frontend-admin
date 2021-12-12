function cov_12dg067bwr() {
  var path = "C:\\Users\\joy-j\\Desktop\\orderAndPay\\order-and-pay-frontend-admin\\src\\services\\axios.ts";
  var hash = "f5b57c9767f3dc32371a472d4fb02e4c3dd11447";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\joy-j\\Desktop\\orderAndPay\\order-and-pay-frontend-admin\\src\\services\\axios.ts",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 23
        },
        end: {
          line: 6,
          column: 2
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "f5b57c9767f3dc32371a472d4fb02e4c3dd11447"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_12dg067bwr = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_12dg067bwr();
import axios from "axios";
import { Config } from "../config.global";
export const request = (cov_12dg067bwr().s[0]++, axios.create({
  baseURL: Config.api.baseApiUrl
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF4aW9zLnRzIl0sIm5hbWVzIjpbImF4aW9zIiwiQ29uZmlnIiwicmVxdWVzdCIsImNyZWF0ZSIsImJhc2VVUkwiLCJhcGkiLCJiYXNlQXBpVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZVk7Ozs7Ozs7OztBQWZaLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxNQUFULFFBQXVCLGtCQUF2QjtBQUVBLE9BQU8sTUFBTUMsT0FBTyw2QkFBR0YsS0FBSyxDQUFDRyxNQUFOLENBQWE7QUFDaENDLEVBQUFBLE9BQU8sRUFBRUgsTUFBTSxDQUFDSSxHQUFQLENBQVdDO0FBRFksQ0FBYixDQUFILENBQWIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWcuZ2xvYmFsXCI7XHJcblxyXG5leHBvcnQgY29uc3QgcmVxdWVzdCA9IGF4aW9zLmNyZWF0ZSh7XHJcbiAgICBiYXNlVVJMOiBDb25maWcuYXBpLmJhc2VBcGlVcmxcclxufSkiXX0=