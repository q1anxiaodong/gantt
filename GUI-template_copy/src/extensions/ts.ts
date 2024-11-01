interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }
  
  interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }
  
type Animal = Cat | Dog;

type Clazz<T = string> = {
    type: T;
}

type Dictionary<U extends Clazz> = {
    [P in U['type']]: U extends Clazz<P> ? U : never;
}

type A = Dictionary<Animal>

type LookUp<Arr extends Clazz, I extends Arr['type']> = Dictionary<Arr>[I];

type ttt = LookUp<Animal, 'dog'>

//------------------------------------------------
type AddOne<T extends number, A extends any[] = []> = T extends A['length'] ? [...A, 1]['length'] : AddOne<T, [...A, 1]>;

type ParseInt<T> = T extends `${infer X extends number}` ? X :  never

type RemoveLeadingZeros<T extends string> = T extends '0' ? T : (
  T extends `${0}${infer Rest}` ? RemoveLeadingZeros<Rest> : T
)

type InnerMinusOne<T extends string> = T extends `${infer X extends number}${infer Y}` ? (
  X extends 0 ? `9${InnerMinusOne<Y>}` : `${[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8][X]}${Y}`
) : ''

type Reverse<T extends string> = T extends `${infer X}${infer Y}` ? `${Reverse<Y>}${X}` : ''

type MinusOne<T extends number> = ParseInt<RemoveLeadingZeros<Reverse<InnerMinusOne<Reverse<`${T}`>>>>>

type InnerGreaterThan<T extends number, U extends number> = T extends U ? true : (
  T extends 0 ? false : InnerGreaterThan<MinusOne<T>, U>
)

type GreaterThan<T extends number, U extends number> = T extends U ? false : (
  U extends 0 ? true : InnerGreaterThan<T, U>
)

type t = GreaterThan<999, 9>;
//------------------------------------------------