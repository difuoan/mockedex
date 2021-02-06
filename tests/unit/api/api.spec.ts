import axios from "axios";

describe("Name.vue", () => {
  // use await so jest doesn't get confused when chaining the tests
  it(`simply test the status of the v2 api because we need it
      (we don't test the actual data-structure because it should stay the same within v2)`, async () => {
    const axiosSpy = jest.spyOn(axios, "get");
    await axios.get("https://pokeapi.co/api/v2/pokemon/1").then(response => {
      expect(response.status).toStrictEqual(200);
    });
    expect(axiosSpy).toHaveBeenCalledTimes(1);
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1&offset=0")
      .then(response => {
        expect(response.status).toStrictEqual(200);
      });
    expect(axiosSpy).toHaveBeenCalledTimes(2);
  });
});
