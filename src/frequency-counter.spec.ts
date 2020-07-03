import FrequencyCounter from "./frequency-counter";

describe("FrequencyCounter", () => {
  it("should serialize and deserialize", () => {
    const counter = new FrequencyCounter();
    counter.accept("foo");
    counter.accept("foo");
    counter.accept("foo");
    counter.accept("bar");
    const str = counter.dump();
    const newCounter = FrequencyCounter.load(str);
    expect(newCounter.freq("foo")).toBe(3);
    expect(newCounter.freq("bar")).toBe(1);
  });
});
