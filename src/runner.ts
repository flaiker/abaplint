import Report from "./report";
import Lexer from "./lexer";
import Parser from "./parser";
import Check01 from "./check01";

export default class Runner {
    private report: Report;

    constructor(filename: string, report?: Report) {
        if (report) {
            this.report = report;
        } else {
            this.report = new Report();
        }
        this.run(filename);
    }

    public get_report(): Report {
        return this.report;
    }

    private run(filename: string) {
        let buf = require("fs").readFileSync(filename, "utf8");
        let parser = new Parser(new Lexer(buf));
        let check01 = new Check01(this.report);
        check01.run(filename, parser);
    }
}