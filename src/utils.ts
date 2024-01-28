export function split_on_linebreaks(input: string): string[] {
  return input.split(/[\n\r]+/);
}

export function split_on_commas(
  input: string,
  trim_whitespace = true
): string[] {
  const vals = input.split(",");
  if (trim_whitespace) {
    return vals.map((s) => s.trim());
  }
  return vals;
}

export function text_to_tokens(input: string): string[] {
  return split_on_linebreaks(input).flatMap((line) => split_on_commas(line));
}
