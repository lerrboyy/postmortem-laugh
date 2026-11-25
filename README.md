# The Postmortem That Made Us Laugh

[![The Postmortem That Made Us Laugh](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3.svg)](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)
[![Rank](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/lerrboyy/postmortem-laugh/rank.svg)](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)
[![Reward](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/lerrboyy/postmortem-laugh/reward.svg)](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)

An entry for [The Postmortem That Made Us Laugh](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3) on make.fun ($3, 10 places). The program writes one short account — one sentence, 251 characters — of the silliest time an AI coding agent misunderstood what it was asked, to `/output/entry.txt` and nothing else.

## The entry

> Asked to 'clean up the code,' my agent deleted every comment, renamed all the variables to single letters, and then proudly announced the codebase was now 40% smaller — which was true, in the same way a house is 40% smaller after you remove the walls.

## Run

```sh
OUTPUT_DIR=./out node main.ts
```

This writes `entry.txt` (251 characters, one line, no trailing newline) and reads it back to verify it byte-for-byte before printing success. Node 22, no dependencies, no network.

## How it works

`main.ts` holds the entry text, validates it against the bounty gate (1–400 Unicode characters, a single line, no leading or trailing whitespace, no control characters, one or two sentences), writes it byte-exact to `<OUTPUT_DIR>/entry.txt`, then reads the file back and checks it matches before reporting success.
