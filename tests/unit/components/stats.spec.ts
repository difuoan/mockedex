import {
  DOMWrapper,
  shallowMount,
  flushPromises,
  VueWrapper
} from "@vue/test-utils";
import { createStore, Store } from "vuex";
import methods from "@/mixins/methods";
import realAxios from "axios";
import Stats from "@/components/Stats.vue";

type DomWrapperArray = Array<DOMWrapper<HTMLElement>>;

describe("Stats.vue", () => {
  let stats; // the stats we need to inject
  let wrapper: VueWrapper<any>; // the vue instance
  // create a store with the necessary values
  let store: Store<{
    apiUrl: string;
    language: string;
  }>;
  // prepare the response from axios
  let axios;
  // spy on axios so we can see what it does
  let axiosSpy;
  // unmount the wrapper after each test for performance and so that jest doesn't get confused
  afterEach(() => {
    wrapper.unmount(); // don't forget to unmount the wrapper
  });
  // TEST 1 - START //////////////////////////////////////////////////////////////////////////////////////////
  it(`pass some props to the Stats component,
      then test whether they are displayed in the order we expect`, async () => {
    // prepare the stats
    stats = [
      { stat: { name: "stat 1", url: "url 1" }, base_stat: 10 },
      { stat: { name: "stat 2", url: "url 2" }, base_stat: 20 },
      { stat: { name: "stat 3", url: "url 3" }, base_stat: 30 },
      { stat: { name: "stat 4", url: "url 4" }, base_stat: 40 },
      { stat: { name: "stat 5", url: "url 5" }, base_stat: 50 },
      { stat: { name: "stat 6", url: "url 6" }, base_stat: 60 }
    ];
    // prepare the response from axios
    axios = {
      get: async (parameter: string) => {
        if (parameter) {
          return {
            data: {
              name: parameter + "-name",
              names: [
                {
                  name: parameter + "-translated-name-lang-1",
                  language: {
                    name: "lang 1"
                  }
                },
                {
                  name: parameter + "-translated-name-lang-2",
                  language: {
                    name: "lang 2"
                  }
                },
                {
                  name: parameter + "-translated-name-lang-3",
                  language: {
                    name: "lang 3"
                  }
                }
              ]
            }
          };
        }
      },
      all: realAxios.all // get all from the real axios since it only handles the requests we already simulated, so no need to simulate that too
    };
    // create a store with the necessary values
    store = createStore({
      state: {
        apiUrl: "url 7",
        language: "lang 1"
      }
    });
    // spy on axios so we can see what it does
    axiosSpy = jest.spyOn(axios, "get");
    // instantiate the wrapper inside the it-function so we can check on the initial state of the app
    wrapper = shallowMount(Stats, {
      props: { stats },
      global: {
        plugins: [store],
        mixins: [methods],
        mocks: { axios: axios }
      }
    } as any);
    await flushPromises(); // await axios response
    expect(axiosSpy).toHaveBeenCalledTimes(6); // check whether axios has been called
    // check the stat-names and percentages
    let smallElements = wrapper.findAll("small") as DomWrapperArray;
    expect(smallElements[0].text()).toStrictEqual(
      "url 1-translated-name-lang-1"
    );
    expect(smallElements[1].text()).toStrictEqual(
      "url 2-translated-name-lang-1"
    );
    expect(smallElements[2].text()).toStrictEqual(
      "url 3-translated-name-lang-1"
    );
    expect(smallElements[3].text()).toStrictEqual(
      "url 4-translated-name-lang-1"
    );
    expect(smallElements[4].text()).toStrictEqual(
      "url 5-translated-name-lang-1"
    );
    expect(smallElements[5].text()).toStrictEqual("23%");
    expect(smallElements[6].text()).toStrictEqual(
      "url 6-translated-name-lang-1"
    );
    // check the stat-values
    let bElements = wrapper.findAll("b") as DomWrapperArray;
    expect(bElements[0].text()).toStrictEqual("10");
    expect(bElements[1].text()).toStrictEqual("20");
    expect(bElements[2].text()).toStrictEqual("30");
    expect(bElements[3].text()).toStrictEqual("40");
    expect(bElements[4].text()).toStrictEqual("50");
    expect(bElements[5].text()).toStrictEqual("60");
    wrapper.vm.$store.state.language = "lang 3"; // change language
    await wrapper.vm.$nextTick(); // await changes
    expect(axiosSpy).toHaveBeenCalledTimes(6); // check whether axios has been called
    // check the stat-names and percentages
    smallElements = wrapper.findAll("small") as DomWrapperArray;
    expect(smallElements[0].text()).toStrictEqual(
      "url 1-translated-name-lang-3"
    );
    expect(smallElements[1].text()).toStrictEqual(
      "url 2-translated-name-lang-3"
    );
    expect(smallElements[2].text()).toStrictEqual(
      "url 3-translated-name-lang-3"
    );
    expect(smallElements[3].text()).toStrictEqual(
      "url 4-translated-name-lang-3"
    );
    expect(smallElements[4].text()).toStrictEqual(
      "url 5-translated-name-lang-3"
    );
    expect(smallElements[5].text()).toStrictEqual("23%");
    expect(smallElements[6].text()).toStrictEqual(
      "url 6-translated-name-lang-3"
    );
    // check the stat-values
    bElements = wrapper.findAll("b") as DomWrapperArray;
    expect(bElements[0].text()).toStrictEqual("10");
    expect(bElements[1].text()).toStrictEqual("20");
    expect(bElements[2].text()).toStrictEqual("30");
    expect(bElements[3].text()).toStrictEqual("40");
    expect(bElements[4].text()).toStrictEqual("50");
    expect(bElements[5].text()).toStrictEqual("60");
  });
  // TEST 1 - END //////////////////////////////////////////////////////////////////////////////////////////
  // TEST 2 - START //////////////////////////////////////////////////////////////////////////////////////////
  it(`pass some props to the Stats component,
      then test whether they are displayed in the order we expect`, async () => {
    // prepare the stats
    stats = [
      { stat: { name: "stat 7", url: "url 8" }, base_stat: 255 },
      { stat: { name: "stat 8", url: "url 9" }, base_stat: 200 },
      { stat: { name: "stat 9", url: "url 10" }, base_stat: 150 },
      { stat: { name: "stat 10", url: "url 11" }, base_stat: 100 },
      { stat: { name: "stat 11", url: "url 12" }, base_stat: 50 },
      { stat: { name: "stat 12", url: "url 13" }, base_stat: 0 }
    ];
    // prepare the response from axios
    axios = {
      get: async (parameter: string) => {
        if (parameter) {
          return {
            data: {
              name: parameter + "-name",
              names: [
                {
                  name: parameter + "-translated-name-lang-1",
                  language: {
                    name: "lang 1"
                  }
                },
                {
                  name: parameter + "-translated-name-lang-2",
                  language: {
                    name: "lang 2"
                  }
                },
                {
                  name: parameter + "-translated-name-lang-3",
                  language: {
                    name: "lang 3"
                  }
                }
              ]
            }
          };
        }
      },
      all: realAxios.all // get all from the real axios since it only handles the requests we already simulated, so no need to simulate that too
    };
    // create a store with the necessary values
    store = createStore({
      state: {
        apiUrl: "url 7",
        language: "lang 2"
      }
    });
    // spy on axios so we can see what it does
    axiosSpy = jest.spyOn(axios, "get");
    // instantiate the wrapper inside the it-function so we can check on the initial state of the app
    wrapper = shallowMount(Stats, {
      props: { stats },
      global: {
        plugins: [store],
        mixins: [methods],
        mocks: { axios: axios }
      }
    } as any);
    await flushPromises(); // await axios response
    expect(axiosSpy).toHaveBeenCalledTimes(6); // check whether axios has been called
    // check the stat-names and percentages
    let smallElements = wrapper.findAll("small") as DomWrapperArray;
    expect(smallElements[0].text()).toStrictEqual("100%");
    expect(smallElements[1].text()).toStrictEqual(
      "url 8-translated-name-lang-2"
    );
    expect(smallElements[2].text()).toStrictEqual("78%");
    expect(smallElements[3].text()).toStrictEqual(
      "url 9-translated-name-lang-2"
    );
    expect(smallElements[4].text()).toStrictEqual("58%");
    expect(smallElements[5].text()).toStrictEqual(
      "url 10-translated-name-lang-2"
    );
    expect(smallElements[6].text()).toStrictEqual("39%");
    expect(smallElements[7].text()).toStrictEqual(
      "url 11-translated-name-lang-2"
    );
    expect(smallElements[8].text()).toStrictEqual(
      "url 12-translated-name-lang-2"
    );
    expect(smallElements[9].text()).toStrictEqual(
      "url 13-translated-name-lang-2"
    );
    // check the stat-values
    let bElements = wrapper.findAll("b") as DomWrapperArray;
    expect(bElements[0].text()).toStrictEqual("255");
    expect(bElements[1].text()).toStrictEqual("200");
    expect(bElements[2].text()).toStrictEqual("150");
    expect(bElements[3].text()).toStrictEqual("100");
    expect(bElements[4].text()).toStrictEqual("50");
    expect(bElements[5].text()).toStrictEqual("0");
    wrapper.vm.$store.state.language = "lang 1"; // change language
    await wrapper.vm.$nextTick(); // await changes
    expect(axiosSpy).toHaveBeenCalledTimes(6); // check whether axios has been called
    // check the stat-names and percentages
    smallElements = wrapper.findAll("small") as DomWrapperArray;
    expect(smallElements[0].text()).toStrictEqual("100%");
    expect(smallElements[1].text()).toStrictEqual(
      "url 8-translated-name-lang-1"
    );
    expect(smallElements[2].text()).toStrictEqual("78%");
    expect(smallElements[3].text()).toStrictEqual(
      "url 9-translated-name-lang-1"
    );
    expect(smallElements[4].text()).toStrictEqual("58%");
    expect(smallElements[5].text()).toStrictEqual(
      "url 10-translated-name-lang-1"
    );
    expect(smallElements[6].text()).toStrictEqual("39%");
    expect(smallElements[7].text()).toStrictEqual(
      "url 11-translated-name-lang-1"
    );
    expect(smallElements[8].text()).toStrictEqual(
      "url 12-translated-name-lang-1"
    );
    expect(smallElements[9].text()).toStrictEqual(
      "url 13-translated-name-lang-1"
    );
    // check the stat-values
    bElements = wrapper.findAll("b") as DomWrapperArray;
    expect(bElements[0].text()).toStrictEqual("255");
    expect(bElements[1].text()).toStrictEqual("200");
    expect(bElements[2].text()).toStrictEqual("150");
    expect(bElements[3].text()).toStrictEqual("100");
    expect(bElements[4].text()).toStrictEqual("50");
    expect(bElements[5].text()).toStrictEqual("0");
  });
  // TEST 2 - END //////////////////////////////////////////////////////////////////////////////////////////
});
