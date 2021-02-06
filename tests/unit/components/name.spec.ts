import { shallowMount, flushPromises, VueWrapper } from "@vue/test-utils";
import Name from "@/components/Name.vue";
import { createStore, Store } from "vuex";
import methods from "@/mixins/methods";

describe("Name.vue", () => {
  let name: string;
  let store: Store<{
    apiUrl: string;
    language: string;
  }>;
  let axios;
  let wrapper: VueWrapper<any>;
  let axiosSpy;
  afterEach(() => {
    wrapper.unmount(); // don't forget to unmount the wrapper
  });
  // TEST 1 - START //////////////////////////////////////////////////////////////////////////////////////////
  // use await so jest doesn't get confused when chaining the tests
  it(`set up the Name component and check the pre-loader,
      then await the mocked axios call and check the displayed response`, async () => {
    name = "name 2";
    axios = {
      get: async () => ({
        data: {
          names: [
            {
              name: "translatedName 4",
              language: { name: "lang 6", url: "" }
            },
            { name: "translatedName 1", language: { name: "lang 7", url: "" } },
            { name: "translatedName 2", language: { name: "lang 8", url: "" } },
            {
              name: "translatedName 3",
              language: { name: "lang 9", url: "" }
            },
            {
              name: "translatedName 5",
              language: { name: "lang 10", url: "" }
            }
          ]
        }
      })
    };
    axiosSpy = jest.spyOn(axios, "get");
    store = createStore({
      state: {
        apiUrl: "url 1",
        language: "lang 7"
      }
    });
    // instantiate the wrapper inside the it-function so we can check on the initial state of the app
    wrapper = shallowMount(Name, {
      props: { name },
      global: {
        plugins: [store],
        mixins: [methods],
        mocks: { axios: axios }
      }
    } as any);
    expect(wrapper.text()).toStrictEqual("name 2"); // the text we display while loading
    await flushPromises(); // await axios response
    expect(axiosSpy).toHaveBeenCalledTimes(1); // check whether axios has been called
    expect(wrapper.text()).toStrictEqual("translatedName 1"); // text after loading
    wrapper.vm.$store.state.language = "lang 8"; // change language
    await wrapper.vm.$nextTick(); // await changes
    expect(wrapper.text()).toStrictEqual("translatedName 2"); // text after language change
    expect(axiosSpy).toHaveBeenCalledTimes(1); // check whether axios has NOT been called another time
  });
  // TEST 1 - END //////////////////////////////////////////////////////////////////////////////////////////
  // TEST 2 - START //////////////////////////////////////////////////////////////////////////////////////////
  // use await so jest doesn't get confused when chaining the tests
  it(`set up the Name component and check the pre-loader,
      then await the mocked axios call and check the displayed response`, async () => {
    name = "name 1";
    axios = {
      get: async () => ({
        data: {
          names: [
            {
              name: "translatedName 6",
              language: { name: "lang 1", url: "" }
            },
            { name: "translatedName 7", language: { name: "lang 2", url: "" } },
            { name: "translatedName 8", language: { name: "lang 3", url: "" } },
            {
              name: "translatedName 9",
              language: { name: "lang 4", url: "" }
            },
            {
              name: "translatedName 10",
              language: { name: "lang 5", url: "" }
            }
          ]
        }
      })
    };
    axiosSpy = jest.spyOn(axios, "get");
    store = createStore({
      state: { apiUrl: "", language: "lang 2" }
    });
    // instantiate the wrapper inside the it-function so we can check on the initial state of the app
    wrapper = shallowMount(Name, {
      props: { name },
      global: {
        plugins: [store],
        mixins: [methods],
        mocks: { axios: axios }
      }
    } as any);
    expect(wrapper.text()).toStrictEqual("name 1"); // the text we display while loading
    await flushPromises(); // await axios response
    expect(axiosSpy).toHaveBeenCalledTimes(1); // check whether axios has been called
    await wrapper.vm.$nextTick(); // await changes
    expect(wrapper.text()).toStrictEqual("translatedName 7"); // text after loading
    wrapper.vm.$store.state.language = "lang 3"; // change language
    await wrapper.vm.$nextTick(); // await changes
    expect(wrapper.text()).toStrictEqual("translatedName 8"); // text after language change
    expect(axiosSpy).toHaveBeenCalledTimes(1); // check whether axios has NOT been called another time
  });
  // TEST 2 - END //////////////////////////////////////////////////////////////////////////////////////////
});
