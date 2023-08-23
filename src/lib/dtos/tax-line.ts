import taxLineItem from '$lib/dtos/tax-line-item';

export class TaxLine {
  static readonly LVL_DICTIONARY = { 0: 'Federal', 1: 'State', 2: 'Country', 3: 'City', 4: 'Unincorporated' } as const;
  static readonly CALC_DICTIONARY = {
    1: 'Rate',
    2: 'Fixed',
    3: 'PerMinute',
    4: 'PerLine',
    5: 'SelfTaxRate',
    6: 'PerBracket',
    7: 'FixedOnTire'
  } as const;

  readonly bill = taxLineItem('Billable');
  readonly name = taxLineItem('Tax Name');
  readonly lvl = taxLineItem('Tax Level', TaxLine.LVL_DICTIONARY);
  readonly calc = taxLineItem('Calculation Type', TaxLine.CALC_DICTIONARY);
  readonly lns = taxLineItem('Number of lines taxed');
  readonly chg = taxLineItem('Charge');
  readonly exm = taxLineItem('Exempt Sale Amount');
  readonly tm = taxLineItem('Taxable Measure');
  readonly rate = taxLineItem('Applicable tax rate');
  readonly tax = taxLineItem('Tax Amount');

  constructor(obj: Record<string, unknown>) {
    Object.keys(this).forEach((e) => (this[e as keyof Omit<TaxLine, 'toJSON'>].value = obj?.[e]));
  }

  toJSON(raw = false) {
    const obj: Record<string, unknown> = {};

    return Object.keys(this).reduce((obj, name) => {
      const item = this[name as keyof Omit<TaxLine, 'toJSON'>];
      return { ...obj, ...item.toJSON(raw) };
    }, obj);
  }
}

export const taxLine = (...args: ConstructorParameters<typeof TaxLine>) => new TaxLine(...args);

export default taxLine;
