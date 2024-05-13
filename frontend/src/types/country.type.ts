import { Continent } from "./continent.type";

export type Country = {
  code: string;
  name: string;
  emoji: string;
  continent?: Continent;
};
