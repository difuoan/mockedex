import {
  DOMWrapper,
  shallowMount,
  flushPromises,
  VueWrapper
} from "@vue/test-utils";
import Abilities from "@/components/Abilities.vue";
import { createStore, Store } from "vuex";
import methods from "@/mixins/methods";
import realAxios from "axios";

type DomWrapperArray = Array<DOMWrapper<HTMLElement>>;

describe("Abilities.vue", () => {
  let abilities: Array<Ability>;
  let store: Store<{
    apiUrl: string;
    language: string;
  }>;
  let axios;
  let wrapper: VueWrapper<any>;
  let axiosSpy;
  beforeEach(() => {});
  afterEach(() => {
    wrapper.unmount(); // don't forget to unmount the wrapper
  });
  // use await so jest doesn't get confused when chaining the tests
  it(``, async () => {
    abilities = [
      {
        ability: {
          name: "ability 1",
          url: "url 1"
        }
      },
      {
        ability: {
          name: "ability 2",
          url: "url 2"
        }
      },
      {
        ability: {
          name: "ability 3",
          url: "url 3"
        }
      }
    ];
    axios = {
      get: async (parameter: string) => {
        if (parameter) {
          return {
            data: {
              name: parameter + "-name",
              names: [
                {
                  name: parameter + "-translated lang 1",
                  language: {
                    name: "lang 1"
                  }
                },
                {
                  name: parameter + "-translated lang 2",
                  language: {
                    name: "lang 2"
                  }
                },
                {
                  name: parameter + "-translated lang 3",
                  language: {
                    name: "lang 3"
                  }
                }
              ],
              flavor_text_entries: [
                {
                  flavor_text: parameter + "-text-translation lang 1",
                  language: {
                    name: "lang 1"
                  }
                },
                {
                  flavor_text: parameter + "-text-translation lang 2",
                  language: {
                    name: "lang 2"
                  }
                },
                {
                  flavor_text: parameter + "-text-translation lang 3",
                  language: {
                    name: "lang 3"
                  }
                }
              ]
            }
          };
        }
      },
      all: realAxios.all
    };
    axiosSpy = jest.spyOn(axios, "get");
    store = createStore({
      state: {
        apiUrl: "url 4",
        language: "lang 1"
      }
    });
    // instantiate the wrapper inside the it-function so we can check on the initial state of the app
    wrapper = shallowMount(Abilities, {
      props: { abilities },
      global: {
        plugins: [store],
        mixins: [methods],
        mocks: { axios: axios }
      }
    } as any);
    await flushPromises(); // await axios response
    expect(axiosSpy).toHaveBeenCalledTimes(3); // check whether axios has been called
    const spanElements = wrapper.findAll("span") as DomWrapperArray;
    expect(spanElements[0].text()).toStrictEqual("url 1-translated lang 1");
    expect(spanElements[0].attributes("title")).toStrictEqual(
      "url 1-text-translation lang 1"
    );
    expect(spanElements[1].text()).toStrictEqual("url 2-translated lang 1");
    expect(spanElements[1].attributes("title")).toStrictEqual(
      "url 2-text-translation lang 1"
    );
    expect(spanElements[2].text()).toStrictEqual("url 3-translated lang 1");
    expect(spanElements[2].attributes("title")).toStrictEqual(
      "url 3-text-translation lang 1"
    );
    wrapper.vm.$store.state.language = "lang 3"; // change language
    await wrapper.vm.$nextTick(); // await changes
    expect(spanElements[0].text()).toStrictEqual("url 1-translated lang 3");
    expect(spanElements[0].attributes("title")).toStrictEqual(
      "url 1-text-translation lang 3"
    );
    expect(spanElements[1].text()).toStrictEqual("url 2-translated lang 3");
    expect(spanElements[1].attributes("title")).toStrictEqual(
      "url 2-text-translation lang 3"
    );
    expect(spanElements[2].text()).toStrictEqual("url 3-translated lang 3");
    expect(spanElements[2].attributes("title")).toStrictEqual(
      "url 3-text-translation lang 3"
    );
  });
});
