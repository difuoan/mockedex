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
    name = "test 1";
    axios = {
      get: async () => ({
        data: {
          names: [
            { name: "not the right value", language: { name: "it", url: "" } },
            { name: "test 5", language: { name: "test 4", url: "" } },
            { name: "test 2", language: { name: "test 3", url: "" } },
            { name: "not the right value", language: { name: "de", url: "" } },
            { name: "not the right value", language: { name: "en", url: "" } }
          ]
        }
      })
    };
    axiosSpy = jest.spyOn(axios, "get");
    store = createStore({
      state: {
        apiUrl: "test 4",
        language: "test 3"
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
    expect(wrapper.text()).toStrictEqual("test 1"); // the text we display while loading
    await flushPromises(); // await axios response
    expect(axiosSpy).toHaveBeenCalledTimes(1); // check whether axios has been called
    expect(wrapper.text()).toStrictEqual("test 2"); // text after loading
    wrapper.vm.$store.state.language = "test 4"; // change language
    await wrapper.vm.$nextTick(); // await changes
    expect(wrapper.text()).toStrictEqual("test 5"); // text after language change
    expect(axiosSpy).toHaveBeenCalledTimes(1); // check whether axios has NOT been called another time
  });
  // TEST 1 - END //////////////////////////////////////////////////////////////////////////////////////////
  // TEST 2 - START //////////////////////////////////////////////////////////////////////////////////////////
  // use await so jest doesn't get confused when chaining the tests
  it(`set up the Name component and check the pre-loader,
      then await the mocked axios call and check the displayed response`, async () => {
    name = "test 10";
    axios = {
      get: async () => ({
        data: {
          names: [
            { name: "not the right value", language: { name: "it", url: "" } },
            { name: "test 6", language: { name: "test 8", url: "" } },
            { name: "test 7", language: { name: "test 9", url: "" } },
            { name: "not the right value", language: { name: "de", url: "" } },
            { name: "not the right value", language: { name: "en", url: "" } }
          ]
        }
      })
    };
    axiosSpy = jest.spyOn(axios, "get");
    store = createStore({
      state: { apiUrl: "", language: "test 8" }
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
    expect(wrapper.text()).toStrictEqual("test 10"); // the text we display while loading
    await flushPromises(); // await axios response
    expect(axiosSpy).toHaveBeenCalledTimes(1); // check whether axios has been called
    await wrapper.vm.$nextTick(); // await changes
    expect(wrapper.text()).toStrictEqual("test 6"); // text after loading
    wrapper.vm.$store.state.language = "test 9"; // change language
    await wrapper.vm.$nextTick(); // await changes
    expect(wrapper.text()).toStrictEqual("test 7"); // text after language change
    expect(axiosSpy).toHaveBeenCalledTimes(1); // check whether axios has NOT been called another time
  });
  // TEST 2 - END //////////////////////////////////////////////////////////////////////////////////////////
});
