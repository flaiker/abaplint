/// <reference path="typings/mocha/mocha.d.ts" />
/// <reference path="typings/chai/chai.d.ts" />

import Runner from "../src/runner";
import * as chai from "chai";

let expect = chai.expect;

describe("errors", function() {
    let tests = [
        {file: "zcheck01_01", errors: 1},
        {file: "zcheck02_01", errors: 1},
        {file: "zcheck02_02", errors: 1},
        {file: "zcheck02_03", errors: 0},
        {file: "zcheck03_01", errors: 1},
        {file: "zcheck03_02", errors: 1},
        {file: "zcheck04_01", errors: 1},
        {file: "zcheck05_01", errors: 1},
        {file: "zcheck06_01", errors: 0},
        {file: "zcheck06_02", errors: 1},
        {file: "zcheck07_01", errors: 1},
    ];

    tests.forEach(function(test) {
        it(test.file + " should have " + test.errors + " error(s)", () => {
            let runner = new Runner("./test/abap/" + test.file + ".prog.abap");
            expect(runner.get_report().get_count()).to.equals(test.errors);
        });
    });
});