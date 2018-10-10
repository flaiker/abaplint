import {Statement} from "./statement";
import {str, IRunnable} from "../combi";

export class Enddo extends Statement {

  public static get_matcher(): IRunnable {
    return str("ENDDO");
  }

}