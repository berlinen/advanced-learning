interface Typea {
  id: number;
  name: string;
  sex: string
}

interface Typeb {
  id: number;
  province: string;
  city: string
}

type Type_a = Partial<Typea>;

const partial: Type_a = {
  id: 1
}

const pick: Pick<Typea, 'id'> = {
  id: 4
}

const omit: Omit<Typea, 'sex'> = {
  id: 5,
  name: 'name'
}

const extract: Extract<keyof Typea, keyof Typeb> = 'id';

const exclude: Exclude<keyof Typea, keyof Typeb> = 'name' || 'sex';

const record: Record<number, Typea> = {
  1: {id: 1, name: 'name', sex: 'sex'},
  2: {id: 1, name: 'name', sex: 'sex'},
  3: {id: 1, name: 'name', sex: 'sex'},
}

type NullOrUndefined = string | number | null | undefined;

const noNullOrUndefined: NonNullable<NullOrUndefined> = 'a' || 10;

// maooed types

type StringMap<T> = {
  [P in keyof T]: string
}

const stringmap: StringMap<Typea> = {
  id: 'id',
  name: 'name',
  sex: 'sex'
}

// typeof instanceof in

type NonNullableCustom<T> = T extends null | undefined ? never : T;




