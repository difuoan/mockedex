import { DOMWrapper, shallowMount, VueWrapper } from "@vue/test-utils";
import Stats from "@/components/Stats.vue";

type DomWrapperArray = Array<DOMWrapper<HTMLElement>>;

describe("Stats.vue", () => {
  let stats; // the stats we need to inject
  let wrapper: VueWrapper<any>; // the vue instance
  // unmount the wrapper after each test for performance and so that jest doesn't get confused
  afterEach(() => {
    wrapper.unmount(); // don't forget to unmount the wrapper
  });
  // TEST 1 - START //////////////////////////////////////////////////////////////////////////////////////////
  it(`pass some props to the Stats component,
      then test whether they are displayed in the order we expect`, () => {
    // prepare the stats
    stats = [
      { stat: { name: "stat 1" }, base_stat: 10 },
      { stat: { name: "stat 2" }, base_stat: 20 },
      { stat: { name: "stat 3" }, base_stat: 30 },
      { stat: { name: "stat 4" }, base_stat: 40 },
      { stat: { name: "stat 5" }, base_stat: 50 },
      { stat: { name: "stat 6" }, base_stat: 60 }
    ];
    // instantiate the wrapper inside the it-function so we can check on the initial state of the app
    wrapper = shallowMount(Stats, { props: { stats } });
    // check the stat-names and percentages
    const smallElements = wrapper.findAll("small") as DomWrapperArray;
    expect(smallElements[0].text()).toStrictEqual("stat 1");
    expect(smallElements[1].text()).toStrictEqual("stat 2");
    expect(smallElements[2].text()).toStrictEqual("stat 3");
    expect(smallElements[3].text()).toStrictEqual("stat 4");
    expect(smallElements[4].text()).toStrictEqual("stat 5");
    expect(smallElements[5].text()).toStrictEqual("23%");
    expect(smallElements[6].text()).toStrictEqual("stat 6");
    // check the stat-values
    const bElements = wrapper.findAll("b") as DomWrapperArray;
    expect(bElements[0].text()).toStrictEqual("10");
    expect(bElements[1].text()).toStrictEqual("20");
    expect(bElements[2].text()).toStrictEqual("30");
    expect(bElements[3].text()).toStrictEqual("40");
    expect(bElements[4].text()).toStrictEqual("50");
    expect(bElements[5].text()).toStrictEqual("60");
  });
  // TEST 1 - END //////////////////////////////////////////////////////////////////////////////////////////
  // TEST 2 - START //////////////////////////////////////////////////////////////////////////////////////////
  it(`pass some props to the Stats component,
  then test whether they are displayed in the order we expect`, () => {
    // prepare the stats
    stats = [
      { stat: { name: "stat 12" }, base_stat: 70 },
      { stat: { name: "stat 11" }, base_stat: 80 },
      { stat: { name: "stat 10" }, base_stat: 90 },
      { stat: { name: "stat 9" }, base_stat: 100 },
      { stat: { name: "stat 8" }, base_stat: 110 },
      { stat: { name: "stat 7" }, base_stat: 120 }
    ];
    // instantiate the wrapper inside the it-function so we can check on the initial state of the app
    wrapper = shallowMount(Stats, { props: { stats } });
    // check the stat-names and percentages
    const smallElements = wrapper.findAll("small") as DomWrapperArray;
    expect(smallElements[0].text()).toStrictEqual("27%");
    expect(smallElements[1].text()).toStrictEqual("stat 12");
    expect(smallElements[2].text()).toStrictEqual("31%");
    expect(smallElements[3].text()).toStrictEqual("stat 11");
    expect(smallElements[4].text()).toStrictEqual("35%");
    expect(smallElements[5].text()).toStrictEqual("stat 10");
    expect(smallElements[6].text()).toStrictEqual("39%");
    expect(smallElements[7].text()).toStrictEqual("stat 9");
    expect(smallElements[8].text()).toStrictEqual("43%");
    expect(smallElements[9].text()).toStrictEqual("stat 8");
    expect(smallElements[10].text()).toStrictEqual("47%");
    expect(smallElements[11].text()).toStrictEqual("stat 7");
    // check the stat-values
    const bElements = wrapper.findAll("b") as DomWrapperArray;
    expect(bElements[0].text()).toStrictEqual("70");
    expect(bElements[1].text()).toStrictEqual("80");
    expect(bElements[2].text()).toStrictEqual("90");
    expect(bElements[3].text()).toStrictEqual("100");
    expect(bElements[4].text()).toStrictEqual("110");
    expect(bElements[5].text()).toStrictEqual("120");
  });
  // TEST 2 - END //////////////////////////////////////////////////////////////////////////////////////////
  // TEST 3 - START //////////////////////////////////////////////////////////////////////////////////////////
  it(`pass some props to the Stats component,
  then test whether they are displayed in the order we expect`, () => {
    // prepare the stats
    stats = [
      { stat: { name: "stat 13" }, base_stat: 255 },
      { stat: { name: "stat 14" }, base_stat: 245 },
      { stat: { name: "stat 15" }, base_stat: 235 },
      { stat: { name: "stat 16" }, base_stat: 225 },
      { stat: { name: "stat 17" }, base_stat: 215 },
      { stat: { name: "stat 18" }, base_stat: 205 }
    ];
    // instantiate the wrapper inside the it-function so we can check on the initial state of the app
    wrapper = shallowMount(Stats, { props: { stats } });
    // check the stat-names and percentages
    const smallElements = wrapper.findAll("small") as DomWrapperArray;
    expect(smallElements[0].text()).toStrictEqual("100%");
    expect(smallElements[1].text()).toStrictEqual("stat 13");
    expect(smallElements[2].text()).toStrictEqual("96%");
    expect(smallElements[3].text()).toStrictEqual("stat 14");
    expect(smallElements[4].text()).toStrictEqual("92%");
    expect(smallElements[5].text()).toStrictEqual("stat 15");
    expect(smallElements[6].text()).toStrictEqual("88%");
    expect(smallElements[7].text()).toStrictEqual("stat 16");
    expect(smallElements[8].text()).toStrictEqual("84%");
    expect(smallElements[9].text()).toStrictEqual("stat 17");
    expect(smallElements[10].text()).toStrictEqual("80%");
    expect(smallElements[11].text()).toStrictEqual("stat 18");
    // check the stat-values
    const bElements = wrapper.findAll("b") as DomWrapperArray;
    expect(bElements[0].text()).toStrictEqual("255");
    expect(bElements[1].text()).toStrictEqual("245");
    expect(bElements[2].text()).toStrictEqual("235");
    expect(bElements[3].text()).toStrictEqual("225");
    expect(bElements[4].text()).toStrictEqual("215");
    expect(bElements[5].text()).toStrictEqual("205");
  });
  // TEST 3 - END //////////////////////////////////////////////////////////////////////////////////////////
});
