import {ABAPRule} from "./_abap_rule";
import {BasicRuleConfig} from "./_basic_rule_config";
import {Issue} from "../issue";
import {ABAPFile} from "../files";
import * as Statements from "../abap/2_statements/statements";
import {Dash, DashW} from "../abap/1_lexer/tokens";
import {FormName} from "../abap/2_statements/expressions";

export class FormNoDashConf extends BasicRuleConfig {
}

// todo, also check for other characters like %&$, rename rule? and extend to more kinds of identifiers?
export class FormNoDash extends ABAPRule {

  private conf = new FormNoDashConf();

  public getMetadata() {
    return {
      key: "form_no_dash",
      title: "No dashes in FORM names",
      shortDescription: `Checks for a Dash in form names`,
    };
  }

  private getMessage(): string {
    return "No dash allowed in FORM names";
  }

  public getConfig() {
    return this.conf;
  }

  public setConfig(conf: FormNoDashConf): void {
    this.conf = conf;
  }

  public runParsed(file: ABAPFile) {
    const issues: Issue[] = [];

    const struc = file.getStructure();
    if (struc === undefined) {
      return issues;
    }
    for (const form of struc.findAllStatements(Statements.Form)) {
      const expr = form.findFirstExpression(FormName);
      for (const token of expr!.getTokens()) {
        if (token instanceof Dash || token instanceof DashW) {
          const issue = Issue.atToken(file, token, this.getMessage(), this.getMetadata().key);
          issues.push(issue);
          break;
        }
      }
    }
    return issues;
  }

}