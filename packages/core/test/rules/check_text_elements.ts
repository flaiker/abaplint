import {MemoryFile} from "../../src/files/memory_file";
import {Registry} from "../../src/registry";
import {expect} from "chai";
import {CheckTextElements} from "../../src/rules";

describe("Rule: check_text_elements", () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<abapGit version="v1.0.0" serializer="LCL_OBJECT_PROG" serializer_version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <PROGDIR>
    <NAME>/ABC/SAPLDEF_FG</NAME>
    <DBAPL>S</DBAPL>
    <DBNA>D$</DBNA>
    <SUBC>F</SUBC>
    <APPL>S</APPL>
    <RLOAD>D</RLOAD>
    <FIXPT>X</FIXPT>
    <LDBNAME>D$S</LDBNAME>
    <UCCHECK>X</UCCHECK>
   </PROGDIR>
   <TPOOL>
    <item>
     <ID>I</ID>
     <KEY>001</KEY>
     <ENTRY>hello world 1</ENTRY>
     <LENGTH>22</LENGTH>
    </item>
    <item>
     <ID>I</ID>
     <KEY>ABC</KEY>
     <ENTRY>hello world 2</ENTRY>
     <LENGTH>22</LENGTH>
    </item>
    <item>
     <ID>I</ID>
     <KEY>111</KEY>
     <ENTRY>&apos;Editor Lock&apos; is set.</ENTRY>
     <LENGTH>42</LENGTH>
    </item>
   </TPOOL>
  </asx:values>
 </asx:abap>
</abapGit>`;

  it("test 1", () => {
    const abap = "WRITE: / text-001, 'hello world 1'(001).";
    const reg = new Registry();
    reg.addFile(new MemoryFile("#abc#def_fg.fugr.#abc#ldef_fgp01.abap", abap));
    reg.addFile(new MemoryFile("#abc#def_fg.fugr.#abc#sapldef_fg.xml", xml));
    reg.parse();
    const issues = new CheckTextElements().run(reg.getObjects()[0], reg);
    expect(issues.length).to.equal(0);
  });
});