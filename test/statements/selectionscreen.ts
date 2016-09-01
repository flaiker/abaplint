import {statementType} from "../utils";
import * as Statements from "../../src/statements/";

let tests = [
  "SELECTION-SCREEN BEGIN OF BLOCK b1 WITH FRAME TITLE TEXT-001.",
  "SELECTION-SCREEN BEGIN OF SCREEN 1001.",
  "SELECTION-SCREEN BEGIN OF LINE.",
  "SELECTION-SCREEN END OF LINE.",
  "SELECTION-SCREEN FUNCTION KEY 1.",
  "SELECTION-SCREEN SKIP 1.",
  "SELECTION-SCREEN SKIP.",
  "SELECTION-SCREEN INCLUDE BLOCKS b6.",
  "SELECTION-SCREEN BEGIN OF TABBED BLOCK block FOR 20 LINES.",
  "SELECTION-SCREEN POSITION 33.",
  "SELECTION-SCREEN BEGIN OF BLOCK blo WITH FRAME.",
  "SELECTION-SCREEN BEGIN OF SCREEN 400 AS SUBSCREEN.",
  "SELECTION-SCREEN END OF BLOCK b1.",
  "SELECTION-SCREEN COMMENT (60) cmt_dump FOR FIELD cb_dump.",
  "SELECTION-SCREEN COMMENT (30) FOR FIELD p_del.",
  "SELECTION-SCREEN COMMENT 5(13) text-002 FOR FIELD p_non.",
  "selection-screen comment (24) txt_path  for field p_path  modif id pth.",
  "SELECTION-SCREEN BEGIN OF SCREEN 1002 TITLE s_title.",
  "SELECTION-SCREEN COMMENT /1(35) text-001.",
];

statementType(tests, "SELECTION-SCREEN", Statements.SelectionScreen);