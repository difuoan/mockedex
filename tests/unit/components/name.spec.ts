import { shallowMount, flushPromises } from "@vue/test-utils";
import Name from "@/components/Name.vue";
import { createStore } from "vuex";
import methods from "@/mixins/methods";

describe("Name.vue", () => {
  const name = "test 1";
  const store = createStore({
    state: {
      apiUrl: "test 4",
      language: "test 3"
    }
  });
  const axios = {
    get: async () => ({
      data: {
        names: [
          {
            name: "not the right value",
            language: {
              name: "it",
              url: ""
            }
          },
          {
            name: "test 2",
            language: {
              name: "test 3",
              url: ""
            }
          },
          {
            name: "not the right value",
            language: {
              name: "de",
              url: ""
            }
          },
          {
            name: "not the right value",
            language: {
              name: "en",
              url: ""
            }
          }
        ]
      }
    })
  };
  it(`set up the Name component and check the pre-loader,
  then await the mocked axios call and check the displayed response`, async () => {
    const wrapper = shallowMount(Name, {
      props: { name },
      global: {
        plugins: [store],
        mixins: [methods],
        mocks: {
          axios: axios
        }
      }
    } as any);
    expect(wrapper.text()).toStrictEqual("test 1");
    await flushPromises();
    expect(wrapper.text()).toStrictEqual("test 2");
  });
});
