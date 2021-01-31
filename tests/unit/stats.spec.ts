import { DOMWrapper, shallowMount } from "@vue/test-utils";
import Stats from "@/components/Stats.vue";

describe("Stats.vue", () => {
  it("renders props.stats when passed", () => {
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
    const smallElements = wrapper.findAll("small") as Array<
      DOMWrapper<HTMLElement>
    >;
    expect(smallElements[0].html()).toContain("test 1");
    expect(smallElements[1].html()).toContain("test 2");
    expect(smallElements[2].html()).toContain("test 3");
    expect(smallElements[3].html()).toContain("test 4");
    expect(smallElements[4].html()).toContain("test 5");
    expect(smallElements[5].html()).toContain("23%");
    expect(smallElements[6].html()).toContain("test 6");
    const bElements = wrapper.findAll("b") as Array<DOMWrapper<HTMLElement>>;
    expect(bElements[0].html()).toContain("10");
    expect(bElements[1].html()).toContain("20");
    expect(bElements[2].html()).toContain("30");
    expect(bElements[3].html()).toContain("40");
    expect(bElements[4].html()).toContain("50");
    expect(bElements[5].html()).toContain("60");
  });
});
