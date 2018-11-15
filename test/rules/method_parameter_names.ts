import {MemoryFile} from "../../src/files/memory_file";
import {Registry} from "../../src/registry";
import {MethodParameterNames} from "../../src/rules/method_parameter_names";
import {expect} from "chai";

function findIssues(abap: string, filename: string) {
  let reg = new Registry().addFile(new MemoryFile(filename, abap)).parse();
  let rule = new MethodParameterNames();
  return rule.run(reg.getObjects()[0], reg);
}

describe("Rule: method parameter names", function() {
  it("positive", function () {
    const abap = "INTERFACE zif_foobar PUBLIC.\n" +
      "  METHODS method1 IMPORTING foo TYPE i.\n" +
      "ENDINTERFACE.";
    let issues = findIssues(abap, "zif_foobar.intf.abap");
    expect(issues.length).to.equal(1);
  });

  it("positive", function () {
    const abap = "INTERFACE zif_foobar PUBLIC.\n" +
      "  METHODS method1 IMPORTING !iv_foo TYPE i.\n" +
      "ENDINTERFACE.";
    let issues = findIssues(abap, "zif_foobar.intf.abap");
    expect(issues.length).to.equal(0);
  });

  it("negative", function () {
    const abap = "INTERFACE zif_foobar PUBLIC.\n" +
      "  METHODS method1 IMPORTING iv_foo TYPE i.\n" +
      "ENDINTERFACE.";
    let issues = findIssues(abap, "zif_foobar.intf.abap");
    expect(issues.length).to.equal(0);
  });

  it("no methods, interface", function () {
    const abap = "INTERFACE zif_foobar PUBLIC.\n" +
      "ENDINTERFACE.";
    let issues = findIssues(abap, "zif_foobar.intf.abap");
    expect(issues.length).to.equal(0);
  });

  it("no methods, class", function () {
    const abap = "CLASS zcl_foobar PUBLIC.\n" +
      "ENDCLASS.";
    let issues = findIssues(abap, "zif_foobar.clas.abap");
    expect(issues.length).to.equal(0);
  });

  it("parser error, class", function () {
    const abap = "sdfsd sdf sdfsd fd";
    let issues = findIssues(abap, "zif_foobar.clas.abap");
    expect(issues.length).to.equal(0);
  });

  it("parser error, interface", function () {
    const abap = "sdfsd sdf sdfsd fd";
    let issues = findIssues(abap, "zif_foobar.intf.abap");
    expect(issues.length).to.equal(0);
  });

  it("skip exception", function () {
    const abap = "CLASS zcx_abapgit_exception DEFINITION\n" +
      "PUBLIC\n" +
      "INHERITING FROM cx_static_check\n" +
      "CREATE PUBLIC.\n" +
      "PUBLIC SECTION.\n" +
      "METHODS constructor IMPORTING foo TYPE C OPTIONAL.\n" +
      "ENDCLASS.\n" +
      "CLASS zcx_abapgit_exception IMPLEMENTATION.\n" +
      "ENDCLASS.";

    let issues = findIssues(abap, "zcx_abapgit_exception.clas.abap");
    expect(issues.length).to.equal(0);
  });

});