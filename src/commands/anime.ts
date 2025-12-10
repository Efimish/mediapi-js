import { buildCommand, type CommandContext } from "@stricli/core";
import { z } from "zod";

const ResponseSchema = z.object({
  data: z.object({
    title: z.string(),
    titles: z.object({
      type: z.string(),
      title: z.string(),
    }).array(),
  }).array(),
}).transform(response => response.data);

export const anime = buildCommand({
  async func(this: CommandContext, _: {}, ...args: string[]) {
    const query = args.join(" ");
    const request = await fetch(`https://api.jikan.moe/v4/anime?limit=5&q=${query}`);
    const json = await request.json();
    const animes = ResponseSchema.parse(json);
    console.log(animes[0]);
  },
  parameters: {
    positional: {
      kind: "array",
      parameter: {
        placeholder: "query",
        brief: "Query to search animes for",
        parse: String,
      },
      minimum: 1,
    },
  },
  docs: {
    brief: "Search Jikan API for animes",
  },
});
