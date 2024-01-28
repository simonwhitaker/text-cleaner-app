/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";
import { text_to_tokens } from "./utils";

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const input = <HTMLTextAreaElement>document.getElementById("input");
input.addEventListener("input", generateOutput);
const sortOutput = <HTMLInputElement>document.getElementById("sort-output");
sortOutput.addEventListener("change", generateOutput);
const dedupeOutput = <HTMLInputElement>document.getElementById("dedupe-output");
dedupeOutput.addEventListener("change", generateOutput);

const output = <HTMLTextAreaElement>document.getElementById("output");

function generateOutput() {
  let tokens = text_to_tokens(input.value);
  if (sortOutput.checked) {
    tokens.sort();
  }
  if (dedupeOutput.checked) {
    const dedupedTokens: string[] = [];
    tokens.forEach((elem) => {
      if (!dedupedTokens.includes(elem)) {
        dedupedTokens.push(elem);
      }
    });
    tokens = dedupedTokens;
  }
  output.value = tokens.join("\n");
}
