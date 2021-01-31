import { shallowMount } from "@vue/test-utils";
import Name from "@/components/Name.vue";

describe("Name.vue", () => {
  it("loads the pokémons name and displays it int the correct language", async () => {
    const name = "test 1";
    const $axios = jest.mock("axios", () => ({
      get: Promise.resolve({
        data: {
          names: [
            {
              language: {
                name: "de",
                url: "testUrl"
              },
              name: "test 2 de"
            },
            {
              language: {
                name: "en",
                url: "testUrl"
              },
              name: "test 2 en"
            }
          ]
        }
      })
    }));
    const wrapper = shallowMount(Name, {
      props: { name },
      mocks: { $axios }
    } as any);
    expect(wrapper.html()).toContain("test 1");
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(wrapper.html()).toContain("test 2");
  });
});
