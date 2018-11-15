import {Statement} from "./_statement";
import {str, seq, opt, IRunnable} from "../combi";
import {Field} from "../expressions";

export class Interface extends Statement {

  public getMatcher(): IRunnable {
    return seq(str("INTERFACE"),
               new Field(),
               opt(str("PUBLIC")));
  }

}