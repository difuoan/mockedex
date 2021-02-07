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
  // the props we want to pass into the abilities-component
  const abilities: Array<Ability> = [
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
  // create a store with the necessary values
  const store: Store<{
    apiUrl: string;
    language: string;
  }> = createStore({
    state: {
      apiUrl: "url 4",
      language: "lang 1"
    }
  });
  // prepare the response from axios
  const axios = {
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
    all: realAxios.all // get all from the real axios since it only handles the requests we already simulated, so no need to simulate that too
  };
  // spy on axios so we can see what it does
  const axiosSpy = jest.spyOn(axios, "get");
  // prepare the vue-wrapper/-instance
  const wrapper: VueWrapper<any> = shallowMount(Abilities, {
    props: { abilities },
    global: {
      plugins: [store],
      mixins: [methods],
      mocks: { axios: axios }
    }
  } as any);
  // unmount the wrapper after each test so jest doesn't get confused
  afterEach(() => {
    wrapper.unmount(); // don't forget to unmount the wrapper
  });
  // use await so jest doesn't get confused when chaining the tests
  it(`passes abilities to load to the abilities-component,
      mocks the response of axios
      and checks the components state in multiple languages`, async () => {
    // instantiate the wrapper inside the it-function so we can check on the initial state of the app
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
