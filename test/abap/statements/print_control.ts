import {statementType} from "../_utils";
import * as Statements from "../../../src/abap/statements/";

let tests = [
  "print-control index-line lv_line.",
  "print-control function 'ASDF'.",
];

statementType(tests, "PRINT-CONTROL", Statements.PrintControl);