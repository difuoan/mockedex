interface ResultItem {
  name: string;
  url: string;
}
interface Pokemon {
  name: string;
  id: number;
  order: number;
  forms: Array<ResultItem>;
  sprites: Array<string>;
}
