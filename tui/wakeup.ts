import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/cli";

const BANNER_FONT = "ANSI Shadow";
const SHADOW = chalk.hex("#5b4d9e");
const FACE = chalk.hex("#e8dcf8").bold;

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/, "").split("\n");
  const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
  const rowWidth = maxLen + 2;

  for (const line of bannerLines) {
    console.log(SHADOW(("  " + line).padEnd(rowWidth)));
  }
  process.stdout.write(`\x1b[${bannerLines.length}A`);
  for (const line of bannerLines) {
    console.log(FACE(line.padEnd(rowWidth)));
  }
  console.log();
}

export async function runWakeUp() {
  let ascii: string;
  try {
    ascii = figlet.textSync("codeclaw", { font: BANNER_FONT });
  } catch (error) {
    console.log(error);
    ascii = figlet.textSync("codeclaw", { font: "Standard" });
  }
  printBannerWithShadow(ascii);

  const mode = await select({
    message: "Which mode you want to proceed with?",
    options: [
      { value: "cli", label: "CLI", hint: "CLI with agent capabilities" },
      {
        value: "telegram",
        label: "Telegram",
        hint: "Control your codebase with telegram",
      },
      { value: "exit", label: "EXIT" },
    ],
  });

  if (isCancel(mode || mode === "exit")) {
    console.log(chalk.dim("\n GoodBye. \n"));
    return;
  }

  if (mode == "cli") {
    await runCliMode();
  } else if (mode == "telegram") {
    console.log(chalk.dim("Starting telegram mode..."));
  }
}
