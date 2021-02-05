import { DOMWrapper, shallowMount } from "@vue/test-utils";
import Stats from "@/components/Stats.vue";

type DomWrapperArray = Array<DOMWrapper<HTMLElement>>;

describe("Stats.vue", () => {
  it("pass some props to the component and thest whether they are displayed in the order we expect", () => {
    const stats = [
      {
        stat: {
          name: "test 1"
        },
        base_stat: 10
      },
      {
        stat: {
          name: "test 2"
        },
        base_stat: 20
      },
      {
        stat: {
          name: "test 3"
        },
        base_stat: 30
      },
      {
        stat: {
          name: "test 4"
        },
        base_stat: 40
      },
      {
        stat: {
          name: "test 5"
        },
        base_stat: 50
      },
      {
        stat: {
          name: "test 6"
        },
        base_stat: 60
      }
    ];
    const wrapper = shallowMount(Stats, {
      props: { stats }
    });
    const smallElements = wrapper.findAll("small") as DomWrapperArray;
    expect(smallElements[0].text()).toStrictEqual("test 1");
    expect(smallElements[1].text()).toStrictEqual("test 2");
    expect(smallElements[2].text()).toStrictEqual("test 3");
    expect(smallElements[3].text()).toStrictEqual("test 4");
    expect(smallElements[4].text()).toStrictEqual("test 5");
    expect(smallElements[5].text()).toStrictEqual("23%");
    expect(smallElements[6].text()).toStrictEqual("test 6");
    const bElements = wrapper.findAll("b") as DomWrapperArray;
    expect(bElements[0].text()).toStrictEqual("10");
    expect(bElements[1].text()).toStrictEqual("20");
    expect(bElements[2].text()).toStrictEqual("30");
    expect(bElements[3].text()).toStrictEqual("40");
    expect(bElements[4].text()).toStrictEqual("50");
    expect(bElements[5].text()).toStrictEqual("60");
  });
});
