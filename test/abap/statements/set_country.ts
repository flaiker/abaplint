import {statementType} from "../_utils";
import * as Statements from "../../../src/abap/statements/";

let tests = [
  "set country 'DE'.",
];

statementType(tests, "SET COUNTRY", Statements.SetCountry);