import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import methods from "@/mixins/methods";

describe("Name.vue", () => {
  const store = createStore({
    state: {
      language: "test 3"
    }
  });
  const names = [
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
      name: "test 5",
      language: {
        name: "test 4",
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
  ];
  it(`see if the getValueByLanguage-function returns the expected values,
    then change the language and check again
    (we don't really check the filter-function, but the data structure)`, async () => {
    const wrapper = shallowMount(methods, {
      global: {
        plugins: [store]
      }
    } as any);
    expect(wrapper.vm.getValueByLanguage(names)).toStrictEqual([
      {
        name: "test 2",
        language: { name: "test 3", url: "" }
      }
    ]);
    wrapper.vm.$store.state.language = "test 4";
    expect(wrapper.vm.getValueByLanguage(names)).toStrictEqual([
      {
        name: "test 5",
        language: {
          name: "test 4",
          url: ""
        }
      }
    ]);
  });
});
