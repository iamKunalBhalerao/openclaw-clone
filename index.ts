#!/usr/bin/env bun
import { Command } from "commander";
import { runWakeUp } from "./tui/wakeup";

const program = new Command();

program
  .name("codeclaw")
  .description("openclaw clone project.")
  .version("0.0.1");

program
  .command("wakeup")
  .description("show the banner and pick cli or telegram mode")
  .action(async () => {
    await runWakeUp();
  });

await program.parseAsync(process.argv);
