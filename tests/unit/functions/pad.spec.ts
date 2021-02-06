import { shallowMount, VueWrapper } from "@vue/test-utils";
import methods from "@/mixins/methods";

describe("Name.vue", () => {
  let wrapper: VueWrapper<any>;
  beforeEach(() => {
    wrapper = shallowMount(
      { template: "<template><div>test</div></template>" },
      {
        global: { mixins: [methods] }
      } as any
    );
  });
  afterEach(() => {
    wrapper.unmount(); // don't forget to unmount the wrapper
  });
  it("just passing some values to the pad function to check the outcome", async () => {
    expect(wrapper.vm.pad("test", 10, "0", true)).toStrictEqual("000000test");
    expect(wrapper.vm.pad("test", 0, "0", true)).toStrictEqual("test");
    expect(wrapper.vm.pad("test", 8, "0", true)).toStrictEqual("0000test");
    expect(wrapper.vm.pad("test", 8, "1", true)).toStrictEqual("1111test");
    expect(wrapper.vm.pad("test2", 8, "1", true)).toStrictEqual("111test2");
    expect(wrapper.vm.pad("test2", 8, "1", false)).toStrictEqual("test2111");
    expect(wrapper.vm.pad("test2", 0, "1", false)).toStrictEqual("test2");
  });
});
