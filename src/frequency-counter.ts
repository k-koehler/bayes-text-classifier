export default class FrequencyCounter<T> {
  private lookup: Map<T, number>;

  constructor() {
    this.lookup = new Map();
  }

  public accept(t: T) {
    this.lookup.set(t, (this.lookup.get(t) || 0) + 1);
    return this;
  }

  public freq(t: T) {
    return this.lookup.get(t) || 0;
  }

  public get size() {
    return this.lookup.size;
  }

  public dump() {
    return JSON.stringify(Array.from(this.lookup));
  }

  public static load<T>(dumpStr: string) {
    const frequencyCounter = new FrequencyCounter<T>();
    frequencyCounter.lookup = new Map(JSON.parse(dumpStr));
    return frequencyCounter;
  }
}
