import { expect, test, describe } from "bun:test";
import { split_on_commas, split_on_linebreaks, text_to_tokens } from "./utils";

describe("split_on_commas", () => {
  test("trim_whitespace=true (implicit)", () => {
    expect(split_on_commas("foo, bar , baz")).toEqual(["foo", "bar", "baz"]);
  });
  test("trim_whitespace=true (explicit)", () => {
    expect(split_on_commas("foo, bar , baz", true)).toEqual([
      "foo",
      "bar",
      "baz",
    ]);
  });
  test("trim_whitespace=false", () => {
    expect(split_on_commas("foo, bar , baz", false)).toEqual([
      "foo",
      " bar ",
      " baz",
    ]);
  });
});

describe("split_on_linebreaks", () => {
  test("LF (unix-style)", () => {
    expect(split_on_linebreaks("foo\nbar")).toEqual(["foo", "bar"]);
  });
  test("CR (old mac-style)", () => {
    expect(split_on_linebreaks("foo\rbar")).toEqual(["foo", "bar"]);
  });
  test("CRLF (windows-style)", () => {
    expect(split_on_linebreaks("foo\r\nbar")).toEqual(["foo", "bar"]);
  });
});

describe("text_to_tokens", () => {
  test("text_to_tokens", () => {
    const input = "foo \nbar, baz";
    const expected_output = ["foo", "bar", "baz"];
    expect(text_to_tokens(input)).toEqual(expected_output);
  });
});
