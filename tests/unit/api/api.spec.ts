import axios from "axios";

describe("Name.vue", () => {
  // use await so jest doesn't get confused when chaining the tests
  it(`simply test the status of the v2 api because we need it
      (we don't test the actual data-structure because it should stay the same in v2)`, async () => {
    const axiosSpy = jest.spyOn(axios, "get"); // enlist a spy from within the ranks of axios
    // test the pokemon-api
    await axios.get("https://pokeapi.co/api/v2/pokemon/1").then(response => {
      // check if the server is active and working as expected
      expect(response.status).toStrictEqual(200);
    });
    // check if axios has been called once
    expect(axiosSpy).toHaveBeenCalledTimes(1);
  });
});
