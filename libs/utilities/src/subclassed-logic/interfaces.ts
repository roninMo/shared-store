
/**
 * Returns a writable type version of type.
 *
 * USAGE:
 * Given:
 * ```
 * interface Person {readonly name: string}
 * ```
 *
 * We would like to get a read/write version of `Person`.
 * ```
 * const WritablePerson = Writable<Person>;
 * ```
 *
 * The result is that you can do:
 *
 * ```
 * const readonlyPerson: Person = {name: 'Marry'};
 * readonlyPerson.name = 'John'; // TypeError
 * (readonlyPerson as WritablePerson).name = 'John'; // OK
 *
 * // Error: Correctly detects that `Person` did not have `age` property.
 * (readonlyPerson as WritablePerson).age = 30;
 * ```
 */
export type Writable<T> = {
  -readonly[K in keyof T]: T[K];
};
