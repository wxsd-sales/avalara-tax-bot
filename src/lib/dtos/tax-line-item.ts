export class TaxLineItem {
  readonly header;
  readonly dictionary;
  protected _value;

  constructor(header: string, dictionary?: Record<number, unknown>, value?: unknown) {
    this.header = header;
    this.dictionary = dictionary;
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(value: unknown) {
    this._value = value;
  }

  toJSON(raw = false) {
    const obj: Record<string, unknown> = {};
    obj[this.header] = raw ? this.value : this?.dictionary?.[Number(this.value)] ?? this.value;

    return obj;
  }
}

export const taxLineItem = (...args: ConstructorParameters<typeof TaxLineItem>) => new TaxLineItem(...args);

export default taxLineItem;
