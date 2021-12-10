function cov_yv42pmxmk() {
  var path = "/Users/joy/Documents/projekte/013_web_orderAndPay/order-and-pay-frontend-admin/src/services/axios.ts";
  var hash = "5a0aa19aad2fd150282f53dfdd13e04b0a7b05f1";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/joy/Documents/projekte/013_web_orderAndPay/order-and-pay-frontend-admin/src/services/axios.ts",
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
    hash: "5a0aa19aad2fd150282f53dfdd13e04b0a7b05f1"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_yv42pmxmk = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_yv42pmxmk();
import axios from "axios";
import { Config } from "../config.global";
export const request = (cov_yv42pmxmk().s[0]++, axios.create({
  baseURL: Config.api.baseApiUrl
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF4aW9zLnRzIl0sIm5hbWVzIjpbImF4aW9zIiwiQ29uZmlnIiwicmVxdWVzdCIsImNyZWF0ZSIsImJhc2VVUkwiLCJhcGkiLCJiYXNlQXBpVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZVk7Ozs7Ozs7OztBQWZaLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxNQUFULFFBQXVCLGtCQUF2QjtBQUVBLE9BQU8sTUFBTUMsT0FBTyw0QkFBR0YsS0FBSyxDQUFDRyxNQUFOLENBQWE7QUFDaENDLEVBQUFBLE9BQU8sRUFBRUgsTUFBTSxDQUFDSSxHQUFQLENBQVdDO0FBRFksQ0FBYixDQUFILENBQWIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnLmdsb2JhbFwiO1xuXG5leHBvcnQgY29uc3QgcmVxdWVzdCA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgYmFzZVVSTDogQ29uZmlnLmFwaS5iYXNlQXBpVXJsXG59KSJdfQ==