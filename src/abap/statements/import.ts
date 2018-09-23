import {Statement} from "./statement";
import {verNot, str, seq, opt, alt, per, plus, IRunnable} from "../combi";
import {Target, Source, ParameterListT, Dynamic, Field} from "../expressions";
import {Version} from "../../version";

export class Import extends Statement {

  public static get_matcher(): IRunnable {
    let id = seq(str("ID"), new Source());
    let dto = seq(str("TO"), new Target());
    let client = seq(str("CLIENT"), new Source());

    let options = per(str("ACCEPTING PADDING"),
                      str("IGNORING CONVERSION ERRORS"),
                      str("ACCEPTING TRUNCATION"));

    let shared = seq(str("SHARED MEMORY"),
                     new Field(),
                     str("("),
                     new Field(),
                     str(")"),
                     str("ID"),
                     new Field());

    let buffer = seq(str("DATA BUFFER"), new Source());
    let memory = seq(str("MEMORY ID"), new Source());
    let table = seq(str("INTERNAL TABLE"), new Source());

    let database = seq(str("DATABASE"),
                       new Source(),
                       per(dto, id, client),
                       opt(options));

    let source = alt(buffer, memory, database, table, shared);

    let to = plus(seq(new Source(),
                      alt(str("TO"), str("INTO")),
                      new Target()));

    let target = alt(new ParameterListT(),
                     to,
                     new Dynamic(),
                     plus(new Target()));

    let ret = seq(str("IMPORT"), target, str("FROM"), source);

    return verNot(Version.Cloud, ret);
  }

}