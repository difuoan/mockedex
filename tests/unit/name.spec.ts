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
            name: "test 2",
            language: {
              name: "test 3",
              url: ""
            }
          }
        ]
      }
    })
  };
  it("loads the pokémons name and displays it in the correct language", async () => {
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
    expect(wrapper.html()).toContain("test 1");
    await flushPromises();
    expect(wrapper.html()).toContain("test 2");
  });
});
