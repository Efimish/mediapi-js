import { buildApplication, buildRouteMap } from "@stricli/core";
import { name, version, description } from "../package.json";
import { anime } from "./commands/anime";

const routes = buildRouteMap({
  routes: {
    anime,
  },
  docs: {
    brief: description,
  },
});

export const app = buildApplication(routes, {
  name,
  versionInfo: {
    currentVersion: version,
  },
});
