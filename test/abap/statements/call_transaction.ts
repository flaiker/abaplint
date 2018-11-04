import {statementType} from "../_utils";
import * as Statements from "../../../src/abap/statements/";

let tests = [
  "CALL TRANSACTION 'FOO'.",
  "CALL TRANSACTION 'FOO' AND SKIP FIRST SCREEN.",
  "CALL TRANSACTION 'FOO' WITH AUTHORITY-CHECK AND SKIP FIRST SCREEN.",
  "CALL TRANSACTION 'FOO' WITH AUTHORITY-CHECK USING lt_bdcdata MODE lv_mode.",
  "CALL TRANSACTION 'FOO' WITH AUTHORITY-CHECK USING bdcdata OPTIONS FROM opt.",
  "CALL TRANSACTION 'FOO' USING BDCDATA MODE 'E' UPDATE 'A'.",
  "CALL TRANSACTION 'FOO' USING BDCDATA MODE lv_mode MESSAGES INTO lt_messages.",
  "CALL TRANSACTION 'FOO' WITHOUT AUTHORITY-CHECK USING lt_data OPTIONS FROM ls_opt MESSAGES INTO lt_mess.",
  "CALL TRANSACTION 'FOO' USING mt_bdcdata UPDATE 'S' MODE 'E'.",
];

statementType(tests, "CALL TRANSACTION", Statements.CallTransaction);