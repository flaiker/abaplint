import {statementType} from "../_utils";
import * as Statements from "../../../src/abap/statements/";

let tests = [
  "REJECT.",
  "REJECT 'BKPF'.",
];

statementType(tests, "REJECT", Statements.Reject);