
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model Permission
 * 
 */
export type Permission = $Result.DefaultSelection<Prisma.$PermissionPayload>
/**
 * Model FontAuthor
 * 
 */
export type FontAuthor = $Result.DefaultSelection<Prisma.$FontAuthorPayload>
/**
 * Model SeoModule
 * 
 */
export type SeoModule = $Result.DefaultSelection<Prisma.$SeoModulePayload>
/**
 * Model FontVariant
 * 
 */
export type FontVariant = $Result.DefaultSelection<Prisma.$FontVariantPayload>
/**
 * Model Ingredient
 * 
 */
export type Ingredient = $Result.DefaultSelection<Prisma.$IngredientPayload>
/**
 * Model Formula
 * 
 */
export type Formula = $Result.DefaultSelection<Prisma.$FormulaPayload>
/**
 * Model Prescription
 * 
 */
export type Prescription = $Result.DefaultSelection<Prisma.$PrescriptionPayload>
/**
 * Model AdminSettings
 * 
 */
export type AdminSettings = $Result.DefaultSelection<Prisma.$AdminSettingsPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permission.findMany()
    * ```
    */
  get permission(): Prisma.PermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fontAuthor`: Exposes CRUD operations for the **FontAuthor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FontAuthors
    * const fontAuthors = await prisma.fontAuthor.findMany()
    * ```
    */
  get fontAuthor(): Prisma.FontAuthorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.seoModule`: Exposes CRUD operations for the **SeoModule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SeoModules
    * const seoModules = await prisma.seoModule.findMany()
    * ```
    */
  get seoModule(): Prisma.SeoModuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fontVariant`: Exposes CRUD operations for the **FontVariant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FontVariants
    * const fontVariants = await prisma.fontVariant.findMany()
    * ```
    */
  get fontVariant(): Prisma.FontVariantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ingredient`: Exposes CRUD operations for the **Ingredient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ingredients
    * const ingredients = await prisma.ingredient.findMany()
    * ```
    */
  get ingredient(): Prisma.IngredientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formula`: Exposes CRUD operations for the **Formula** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Formulas
    * const formulas = await prisma.formula.findMany()
    * ```
    */
  get formula(): Prisma.FormulaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prescription`: Exposes CRUD operations for the **Prescription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prescriptions
    * const prescriptions = await prisma.prescription.findMany()
    * ```
    */
  get prescription(): Prisma.PrescriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminSettings`: Exposes CRUD operations for the **AdminSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminSettings
    * const adminSettings = await prisma.adminSettings.findMany()
    * ```
    */
  get adminSettings(): Prisma.AdminSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Role: 'Role',
    Permission: 'Permission',
    FontAuthor: 'FontAuthor',
    SeoModule: 'SeoModule',
    FontVariant: 'FontVariant',
    Ingredient: 'Ingredient',
    Formula: 'Formula',
    Prescription: 'Prescription',
    AdminSettings: 'AdminSettings',
    Tag: 'Tag',
    Post: 'Post'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "role" | "permission" | "fontAuthor" | "seoModule" | "fontVariant" | "ingredient" | "formula" | "prescription" | "adminSettings" | "tag" | "post"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      Permission: {
        payload: Prisma.$PermissionPayload<ExtArgs>
        fields: Prisma.PermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findFirst: {
            args: Prisma.PermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findMany: {
            args: Prisma.PermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          create: {
            args: Prisma.PermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          createMany: {
            args: Prisma.PermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          delete: {
            args: Prisma.PermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          update: {
            args: Prisma.PermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          deleteMany: {
            args: Prisma.PermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          upsert: {
            args: Prisma.PermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          aggregate: {
            args: Prisma.PermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermission>
          }
          groupBy: {
            args: Prisma.PermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionCountAggregateOutputType> | number
          }
        }
      }
      FontAuthor: {
        payload: Prisma.$FontAuthorPayload<ExtArgs>
        fields: Prisma.FontAuthorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FontAuthorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FontAuthorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload>
          }
          findFirst: {
            args: Prisma.FontAuthorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FontAuthorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload>
          }
          findMany: {
            args: Prisma.FontAuthorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload>[]
          }
          create: {
            args: Prisma.FontAuthorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload>
          }
          createMany: {
            args: Prisma.FontAuthorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FontAuthorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload>[]
          }
          delete: {
            args: Prisma.FontAuthorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload>
          }
          update: {
            args: Prisma.FontAuthorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload>
          }
          deleteMany: {
            args: Prisma.FontAuthorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FontAuthorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FontAuthorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload>[]
          }
          upsert: {
            args: Prisma.FontAuthorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontAuthorPayload>
          }
          aggregate: {
            args: Prisma.FontAuthorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFontAuthor>
          }
          groupBy: {
            args: Prisma.FontAuthorGroupByArgs<ExtArgs>
            result: $Utils.Optional<FontAuthorGroupByOutputType>[]
          }
          count: {
            args: Prisma.FontAuthorCountArgs<ExtArgs>
            result: $Utils.Optional<FontAuthorCountAggregateOutputType> | number
          }
        }
      }
      SeoModule: {
        payload: Prisma.$SeoModulePayload<ExtArgs>
        fields: Prisma.SeoModuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SeoModuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SeoModuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload>
          }
          findFirst: {
            args: Prisma.SeoModuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SeoModuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload>
          }
          findMany: {
            args: Prisma.SeoModuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload>[]
          }
          create: {
            args: Prisma.SeoModuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload>
          }
          createMany: {
            args: Prisma.SeoModuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SeoModuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload>[]
          }
          delete: {
            args: Prisma.SeoModuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload>
          }
          update: {
            args: Prisma.SeoModuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload>
          }
          deleteMany: {
            args: Prisma.SeoModuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SeoModuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SeoModuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload>[]
          }
          upsert: {
            args: Prisma.SeoModuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeoModulePayload>
          }
          aggregate: {
            args: Prisma.SeoModuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSeoModule>
          }
          groupBy: {
            args: Prisma.SeoModuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SeoModuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.SeoModuleCountArgs<ExtArgs>
            result: $Utils.Optional<SeoModuleCountAggregateOutputType> | number
          }
        }
      }
      FontVariant: {
        payload: Prisma.$FontVariantPayload<ExtArgs>
        fields: Prisma.FontVariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FontVariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FontVariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload>
          }
          findFirst: {
            args: Prisma.FontVariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FontVariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload>
          }
          findMany: {
            args: Prisma.FontVariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload>[]
          }
          create: {
            args: Prisma.FontVariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload>
          }
          createMany: {
            args: Prisma.FontVariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FontVariantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload>[]
          }
          delete: {
            args: Prisma.FontVariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload>
          }
          update: {
            args: Prisma.FontVariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload>
          }
          deleteMany: {
            args: Prisma.FontVariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FontVariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FontVariantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload>[]
          }
          upsert: {
            args: Prisma.FontVariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FontVariantPayload>
          }
          aggregate: {
            args: Prisma.FontVariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFontVariant>
          }
          groupBy: {
            args: Prisma.FontVariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<FontVariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.FontVariantCountArgs<ExtArgs>
            result: $Utils.Optional<FontVariantCountAggregateOutputType> | number
          }
        }
      }
      Ingredient: {
        payload: Prisma.$IngredientPayload<ExtArgs>
        fields: Prisma.IngredientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IngredientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IngredientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>
          }
          findFirst: {
            args: Prisma.IngredientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IngredientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>
          }
          findMany: {
            args: Prisma.IngredientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>[]
          }
          create: {
            args: Prisma.IngredientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>
          }
          createMany: {
            args: Prisma.IngredientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IngredientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>[]
          }
          delete: {
            args: Prisma.IngredientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>
          }
          update: {
            args: Prisma.IngredientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>
          }
          deleteMany: {
            args: Prisma.IngredientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IngredientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IngredientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>[]
          }
          upsert: {
            args: Prisma.IngredientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>
          }
          aggregate: {
            args: Prisma.IngredientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIngredient>
          }
          groupBy: {
            args: Prisma.IngredientGroupByArgs<ExtArgs>
            result: $Utils.Optional<IngredientGroupByOutputType>[]
          }
          count: {
            args: Prisma.IngredientCountArgs<ExtArgs>
            result: $Utils.Optional<IngredientCountAggregateOutputType> | number
          }
        }
      }
      Formula: {
        payload: Prisma.$FormulaPayload<ExtArgs>
        fields: Prisma.FormulaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormulaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormulaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          findFirst: {
            args: Prisma.FormulaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormulaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          findMany: {
            args: Prisma.FormulaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>[]
          }
          create: {
            args: Prisma.FormulaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          createMany: {
            args: Prisma.FormulaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FormulaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>[]
          }
          delete: {
            args: Prisma.FormulaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          update: {
            args: Prisma.FormulaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          deleteMany: {
            args: Prisma.FormulaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormulaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FormulaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>[]
          }
          upsert: {
            args: Prisma.FormulaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          aggregate: {
            args: Prisma.FormulaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormula>
          }
          groupBy: {
            args: Prisma.FormulaGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormulaGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormulaCountArgs<ExtArgs>
            result: $Utils.Optional<FormulaCountAggregateOutputType> | number
          }
        }
      }
      Prescription: {
        payload: Prisma.$PrescriptionPayload<ExtArgs>
        fields: Prisma.PrescriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrescriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrescriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findFirst: {
            args: Prisma.PrescriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrescriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findMany: {
            args: Prisma.PrescriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          create: {
            args: Prisma.PrescriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          createMany: {
            args: Prisma.PrescriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrescriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          delete: {
            args: Prisma.PrescriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          update: {
            args: Prisma.PrescriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          deleteMany: {
            args: Prisma.PrescriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrescriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrescriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          upsert: {
            args: Prisma.PrescriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          aggregate: {
            args: Prisma.PrescriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrescription>
          }
          groupBy: {
            args: Prisma.PrescriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrescriptionCountArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionCountAggregateOutputType> | number
          }
        }
      }
      AdminSettings: {
        payload: Prisma.$AdminSettingsPayload<ExtArgs>
        fields: Prisma.AdminSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          findFirst: {
            args: Prisma.AdminSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          findMany: {
            args: Prisma.AdminSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>[]
          }
          create: {
            args: Prisma.AdminSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          createMany: {
            args: Prisma.AdminSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>[]
          }
          delete: {
            args: Prisma.AdminSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          update: {
            args: Prisma.AdminSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          deleteMany: {
            args: Prisma.AdminSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>[]
          }
          upsert: {
            args: Prisma.AdminSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          aggregate: {
            args: Prisma.AdminSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminSettings>
          }
          groupBy: {
            args: Prisma.AdminSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<AdminSettingsCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    role?: RoleOmit
    permission?: PermissionOmit
    fontAuthor?: FontAuthorOmit
    seoModule?: SeoModuleOmit
    fontVariant?: FontVariantOmit
    ingredient?: IngredientOmit
    formula?: FormulaOmit
    prescription?: PrescriptionOmit
    adminSettings?: AdminSettingsOmit
    tag?: TagOmit
    post?: PostOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    posts: number
    roles: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | UserCountOutputTypeCountPostsArgs
    roles?: boolean | UserCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    permissions: number
    users: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | RoleCountOutputTypeCountPermissionsArgs
    users?: boolean | RoleCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type PermissionCountOutputType
   */

  export type PermissionCountOutputType = {
    roles: number
  }

  export type PermissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | PermissionCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionCountOutputType
     */
    select?: PermissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
  }


  /**
   * Count Type FontAuthorCountOutputType
   */

  export type FontAuthorCountOutputType = {
    fonts: number
  }

  export type FontAuthorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fonts?: boolean | FontAuthorCountOutputTypeCountFontsArgs
  }

  // Custom InputTypes
  /**
   * FontAuthorCountOutputType without action
   */
  export type FontAuthorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthorCountOutputType
     */
    select?: FontAuthorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FontAuthorCountOutputType without action
   */
  export type FontAuthorCountOutputTypeCountFontsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngredientWhereInput
  }


  /**
   * Count Type IngredientCountOutputType
   */

  export type IngredientCountOutputType = {
    variants: number
    formulas: number
    primaryPrescriptions: number
    secondaryPrescriptions: number
    tags: number
    posts: number
  }

  export type IngredientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | IngredientCountOutputTypeCountVariantsArgs
    formulas?: boolean | IngredientCountOutputTypeCountFormulasArgs
    primaryPrescriptions?: boolean | IngredientCountOutputTypeCountPrimaryPrescriptionsArgs
    secondaryPrescriptions?: boolean | IngredientCountOutputTypeCountSecondaryPrescriptionsArgs
    tags?: boolean | IngredientCountOutputTypeCountTagsArgs
    posts?: boolean | IngredientCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * IngredientCountOutputType without action
   */
  export type IngredientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientCountOutputType
     */
    select?: IngredientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * IngredientCountOutputType without action
   */
  export type IngredientCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FontVariantWhereInput
  }

  /**
   * IngredientCountOutputType without action
   */
  export type IngredientCountOutputTypeCountFormulasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormulaWhereInput
  }

  /**
   * IngredientCountOutputType without action
   */
  export type IngredientCountOutputTypeCountPrimaryPrescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
  }

  /**
   * IngredientCountOutputType without action
   */
  export type IngredientCountOutputTypeCountSecondaryPrescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
  }

  /**
   * IngredientCountOutputType without action
   */
  export type IngredientCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }

  /**
   * IngredientCountOutputType without action
   */
  export type IngredientCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Count Type FormulaCountOutputType
   */

  export type FormulaCountOutputType = {
    fonts: number
    tags: number
  }

  export type FormulaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fonts?: boolean | FormulaCountOutputTypeCountFontsArgs
    tags?: boolean | FormulaCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * FormulaCountOutputType without action
   */
  export type FormulaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaCountOutputType
     */
    select?: FormulaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormulaCountOutputType without action
   */
  export type FormulaCountOutputTypeCountFontsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngredientWhereInput
  }

  /**
   * FormulaCountOutputType without action
   */
  export type FormulaCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }


  /**
   * Count Type PrescriptionCountOutputType
   */

  export type PrescriptionCountOutputType = {
    tags: number
  }

  export type PrescriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | PrescriptionCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * PrescriptionCountOutputType without action
   */
  export type PrescriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrescriptionCountOutputType
     */
    select?: PrescriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PrescriptionCountOutputType without action
   */
  export type PrescriptionCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    prescriptions: number
    ingredients: number
    formulas: number
    posts: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescriptions?: boolean | TagCountOutputTypeCountPrescriptionsArgs
    ingredients?: boolean | TagCountOutputTypeCountIngredientsArgs
    formulas?: boolean | TagCountOutputTypeCountFormulasArgs
    posts?: boolean | TagCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountPrescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountIngredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngredientWhereInput
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountFormulasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormulaWhereInput
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    tags: number
    fonts: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | PostCountOutputTypeCountTagsArgs
    fonts?: boolean | PostCountOutputTypeCountFontsArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountFontsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngredientWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    image: Bytes | null
    imageUrl: string | null
    surname: string | null
    biography: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    image: Bytes | null
    imageUrl: string | null
    surname: string | null
    biography: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    createdAt: number
    updatedAt: number
    image: number
    imageUrl: number
    surname: number
    biography: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    image?: true
    imageUrl?: true
    surname?: true
    biography?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    image?: true
    imageUrl?: true
    surname?: true
    biography?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    image?: true
    imageUrl?: true
    surname?: true
    biography?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    image: Bytes | null
    imageUrl: string | null
    surname: string | null
    biography: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean
    imageUrl?: boolean
    surname?: boolean
    biography?: boolean
    posts?: boolean | User$postsArgs<ExtArgs>
    roles?: boolean | User$rolesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean
    imageUrl?: boolean
    surname?: boolean
    biography?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean
    imageUrl?: boolean
    surname?: boolean
    biography?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean
    imageUrl?: boolean
    surname?: boolean
    biography?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "createdAt" | "updatedAt" | "image" | "imageUrl" | "surname" | "biography", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | User$postsArgs<ExtArgs>
    roles?: boolean | User$rolesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      posts: Prisma.$PostPayload<ExtArgs>[]
      roles: Prisma.$RolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      password: string
      createdAt: Date
      updatedAt: Date
      image: Prisma.Bytes | null
      imageUrl: string | null
      surname: string | null
      biography: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roles<T extends User$rolesArgs<ExtArgs> = {}>(args?: Subset<T, User$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'Bytes'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly surname: FieldRef<"User", 'String'>
    readonly biography: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.roles
   */
  export type User$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    cursor?: RoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      permissions: Prisma.$PermissionPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permissions<T extends Role$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Role$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly createdAt: FieldRef<"Role", 'DateTime'>
    readonly updatedAt: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.permissions
   */
  export type Role$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    cursor?: PermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model Permission
   */

  export type AggregatePermission = {
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  export type PermissionMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PermissionMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permission to aggregate.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permissions
    **/
    _count?: true | PermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionMaxAggregateInputType
  }

  export type GetPermissionAggregateType<T extends PermissionAggregateArgs> = {
        [P in keyof T & keyof AggregatePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermission[P]>
      : GetScalarType<T[P], AggregatePermission[P]>
  }




  export type PermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithAggregationInput | PermissionOrderByWithAggregationInput[]
    by: PermissionScalarFieldEnum[] | PermissionScalarFieldEnum
    having?: PermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionCountAggregateInputType | true
    _min?: PermissionMinAggregateInputType
    _max?: PermissionMaxAggregateInputType
  }

  export type PermissionGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  type GetPermissionGroupByPayload<T extends PermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionGroupByOutputType[P]>
        }
      >
    >


  export type PermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roles?: boolean | Permission$rolesArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["permission"]>
  export type PermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | Permission$rolesArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permission"
    objects: {
      roles: Prisma.$RolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["permission"]>
    composites: {}
  }

  type PermissionGetPayload<S extends boolean | null | undefined | PermissionDefaultArgs> = $Result.GetResult<Prisma.$PermissionPayload, S>

  type PermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionCountAggregateInputType | true
    }

  export interface PermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permission'], meta: { name: 'Permission' } }
    /**
     * Find zero or one Permission that matches the filter.
     * @param {PermissionFindUniqueArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionFindUniqueArgs>(args: SelectSubset<T, PermissionFindUniqueArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Permission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionFindUniqueOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionFindFirstArgs>(args?: SelectSubset<T, PermissionFindFirstArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Permissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permissions
     * const permissions = await prisma.permission.findMany()
     * 
     * // Get first 10 Permissions
     * const permissions = await prisma.permission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionWithIdOnly = await prisma.permission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionFindManyArgs>(args?: SelectSubset<T, PermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Permission.
     * @param {PermissionCreateArgs} args - Arguments to create a Permission.
     * @example
     * // Create one Permission
     * const Permission = await prisma.permission.create({
     *   data: {
     *     // ... data to create a Permission
     *   }
     * })
     * 
     */
    create<T extends PermissionCreateArgs>(args: SelectSubset<T, PermissionCreateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Permissions.
     * @param {PermissionCreateManyArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionCreateManyArgs>(args?: SelectSubset<T, PermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Permissions and returns the data saved in the database.
     * @param {PermissionCreateManyAndReturnArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Permission.
     * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
     * @example
     * // Delete one Permission
     * const Permission = await prisma.permission.delete({
     *   where: {
     *     // ... filter to delete one Permission
     *   }
     * })
     * 
     */
    delete<T extends PermissionDeleteArgs>(args: SelectSubset<T, PermissionDeleteArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Permission.
     * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
     * @example
     * // Update one Permission
     * const permission = await prisma.permission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionUpdateArgs>(args: SelectSubset<T, PermissionUpdateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Permissions.
     * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
     * @example
     * // Delete a few Permissions
     * const { count } = await prisma.permission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionDeleteManyArgs>(args?: SelectSubset<T, PermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionUpdateManyArgs>(args: SelectSubset<T, PermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions and returns the data updated in the database.
     * @param {PermissionUpdateManyAndReturnArgs} args - Arguments to update many Permissions.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Permission.
     * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
     * @example
     * // Update or create a Permission
     * const permission = await prisma.permission.upsert({
     *   create: {
     *     // ... data to create a Permission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permission we want to update
     *   }
     * })
     */
    upsert<T extends PermissionUpsertArgs>(args: SelectSubset<T, PermissionUpsertArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionCountArgs} args - Arguments to filter Permissions to count.
     * @example
     * // Count the number of Permissions
     * const count = await prisma.permission.count({
     *   where: {
     *     // ... the filter for the Permissions we want to count
     *   }
     * })
    **/
    count<T extends PermissionCountArgs>(
      args?: Subset<T, PermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PermissionAggregateArgs>(args: Subset<T, PermissionAggregateArgs>): Prisma.PrismaPromise<GetPermissionAggregateType<T>>

    /**
     * Group by Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionGroupByArgs['orderBy'] }
        : { orderBy?: PermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permission model
   */
  readonly fields: PermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends Permission$rolesArgs<ExtArgs> = {}>(args?: Subset<T, Permission$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Permission model
   */
  interface PermissionFieldRefs {
    readonly id: FieldRef<"Permission", 'String'>
    readonly name: FieldRef<"Permission", 'String'>
    readonly createdAt: FieldRef<"Permission", 'DateTime'>
    readonly updatedAt: FieldRef<"Permission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Permission findUnique
   */
  export type PermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findUniqueOrThrow
   */
  export type PermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findFirst
   */
  export type PermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findFirstOrThrow
   */
  export type PermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findMany
   */
  export type PermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission create
   */
  export type PermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Permission.
     */
    data: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
  }

  /**
   * Permission createMany
   */
  export type PermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
  }

  /**
   * Permission createManyAndReturn
   */
  export type PermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
  }

  /**
   * Permission update
   */
  export type PermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Permission.
     */
    data: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
    /**
     * Choose, which Permission to update.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission updateMany
   */
  export type PermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission updateManyAndReturn
   */
  export type PermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission upsert
   */
  export type PermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Permission to update in case it exists.
     */
    where: PermissionWhereUniqueInput
    /**
     * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
     */
    create: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
    /**
     * In case the Permission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
  }

  /**
   * Permission delete
   */
  export type PermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter which Permission to delete.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission deleteMany
   */
  export type PermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissions to delete
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to delete.
     */
    limit?: number
  }

  /**
   * Permission.roles
   */
  export type Permission$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    cursor?: RoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Permission without action
   */
  export type PermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
  }


  /**
   * Model FontAuthor
   */

  export type AggregateFontAuthor = {
    _count: FontAuthorCountAggregateOutputType | null
    _min: FontAuthorMinAggregateOutputType | null
    _max: FontAuthorMaxAggregateOutputType | null
  }

  export type FontAuthorMinAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    type: string | null
    email: string | null
    supportEmail: string | null
    avatarUrl: string | null
    bannerUrl: string | null
    bio: string | null
    website: string | null
    dafontProfileUrl: string | null
    profileInfoUrl: string | null
    donation: string | null
    nationality: string | null
    languagesSpoken: string | null
    isVerified: boolean | null
    socialLinks: string | null
    metrics: string | null
    businessInfo: string | null
    specialties: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FontAuthorMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    type: string | null
    email: string | null
    supportEmail: string | null
    avatarUrl: string | null
    bannerUrl: string | null
    bio: string | null
    website: string | null
    dafontProfileUrl: string | null
    profileInfoUrl: string | null
    donation: string | null
    nationality: string | null
    languagesSpoken: string | null
    isVerified: boolean | null
    socialLinks: string | null
    metrics: string | null
    businessInfo: string | null
    specialties: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FontAuthorCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    type: number
    email: number
    supportEmail: number
    avatarUrl: number
    bannerUrl: number
    bio: number
    website: number
    dafontProfileUrl: number
    profileInfoUrl: number
    donation: number
    nationality: number
    languagesSpoken: number
    isVerified: number
    socialLinks: number
    metrics: number
    businessInfo: number
    specialties: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FontAuthorMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    type?: true
    email?: true
    supportEmail?: true
    avatarUrl?: true
    bannerUrl?: true
    bio?: true
    website?: true
    dafontProfileUrl?: true
    profileInfoUrl?: true
    donation?: true
    nationality?: true
    languagesSpoken?: true
    isVerified?: true
    socialLinks?: true
    metrics?: true
    businessInfo?: true
    specialties?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FontAuthorMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    type?: true
    email?: true
    supportEmail?: true
    avatarUrl?: true
    bannerUrl?: true
    bio?: true
    website?: true
    dafontProfileUrl?: true
    profileInfoUrl?: true
    donation?: true
    nationality?: true
    languagesSpoken?: true
    isVerified?: true
    socialLinks?: true
    metrics?: true
    businessInfo?: true
    specialties?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FontAuthorCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    type?: true
    email?: true
    supportEmail?: true
    avatarUrl?: true
    bannerUrl?: true
    bio?: true
    website?: true
    dafontProfileUrl?: true
    profileInfoUrl?: true
    donation?: true
    nationality?: true
    languagesSpoken?: true
    isVerified?: true
    socialLinks?: true
    metrics?: true
    businessInfo?: true
    specialties?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FontAuthorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FontAuthor to aggregate.
     */
    where?: FontAuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontAuthors to fetch.
     */
    orderBy?: FontAuthorOrderByWithRelationInput | FontAuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FontAuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontAuthors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontAuthors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FontAuthors
    **/
    _count?: true | FontAuthorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FontAuthorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FontAuthorMaxAggregateInputType
  }

  export type GetFontAuthorAggregateType<T extends FontAuthorAggregateArgs> = {
        [P in keyof T & keyof AggregateFontAuthor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFontAuthor[P]>
      : GetScalarType<T[P], AggregateFontAuthor[P]>
  }




  export type FontAuthorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FontAuthorWhereInput
    orderBy?: FontAuthorOrderByWithAggregationInput | FontAuthorOrderByWithAggregationInput[]
    by: FontAuthorScalarFieldEnum[] | FontAuthorScalarFieldEnum
    having?: FontAuthorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FontAuthorCountAggregateInputType | true
    _min?: FontAuthorMinAggregateInputType
    _max?: FontAuthorMaxAggregateInputType
  }

  export type FontAuthorGroupByOutputType = {
    id: string
    slug: string
    name: string
    type: string
    email: string
    supportEmail: string | null
    avatarUrl: string | null
    bannerUrl: string | null
    bio: string | null
    website: string | null
    dafontProfileUrl: string | null
    profileInfoUrl: string | null
    donation: string | null
    nationality: string | null
    languagesSpoken: string | null
    isVerified: boolean
    socialLinks: string | null
    metrics: string | null
    businessInfo: string | null
    specialties: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: FontAuthorCountAggregateOutputType | null
    _min: FontAuthorMinAggregateOutputType | null
    _max: FontAuthorMaxAggregateOutputType | null
  }

  type GetFontAuthorGroupByPayload<T extends FontAuthorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FontAuthorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FontAuthorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FontAuthorGroupByOutputType[P]>
            : GetScalarType<T[P], FontAuthorGroupByOutputType[P]>
        }
      >
    >


  export type FontAuthorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    type?: boolean
    email?: boolean
    supportEmail?: boolean
    avatarUrl?: boolean
    bannerUrl?: boolean
    bio?: boolean
    website?: boolean
    dafontProfileUrl?: boolean
    profileInfoUrl?: boolean
    donation?: boolean
    nationality?: boolean
    languagesSpoken?: boolean
    isVerified?: boolean
    socialLinks?: boolean
    metrics?: boolean
    businessInfo?: boolean
    specialties?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fonts?: boolean | FontAuthor$fontsArgs<ExtArgs>
    _count?: boolean | FontAuthorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fontAuthor"]>

  export type FontAuthorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    type?: boolean
    email?: boolean
    supportEmail?: boolean
    avatarUrl?: boolean
    bannerUrl?: boolean
    bio?: boolean
    website?: boolean
    dafontProfileUrl?: boolean
    profileInfoUrl?: boolean
    donation?: boolean
    nationality?: boolean
    languagesSpoken?: boolean
    isVerified?: boolean
    socialLinks?: boolean
    metrics?: boolean
    businessInfo?: boolean
    specialties?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fontAuthor"]>

  export type FontAuthorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    type?: boolean
    email?: boolean
    supportEmail?: boolean
    avatarUrl?: boolean
    bannerUrl?: boolean
    bio?: boolean
    website?: boolean
    dafontProfileUrl?: boolean
    profileInfoUrl?: boolean
    donation?: boolean
    nationality?: boolean
    languagesSpoken?: boolean
    isVerified?: boolean
    socialLinks?: boolean
    metrics?: boolean
    businessInfo?: boolean
    specialties?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fontAuthor"]>

  export type FontAuthorSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    type?: boolean
    email?: boolean
    supportEmail?: boolean
    avatarUrl?: boolean
    bannerUrl?: boolean
    bio?: boolean
    website?: boolean
    dafontProfileUrl?: boolean
    profileInfoUrl?: boolean
    donation?: boolean
    nationality?: boolean
    languagesSpoken?: boolean
    isVerified?: boolean
    socialLinks?: boolean
    metrics?: boolean
    businessInfo?: boolean
    specialties?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FontAuthorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "type" | "email" | "supportEmail" | "avatarUrl" | "bannerUrl" | "bio" | "website" | "dafontProfileUrl" | "profileInfoUrl" | "donation" | "nationality" | "languagesSpoken" | "isVerified" | "socialLinks" | "metrics" | "businessInfo" | "specialties" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["fontAuthor"]>
  export type FontAuthorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fonts?: boolean | FontAuthor$fontsArgs<ExtArgs>
    _count?: boolean | FontAuthorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FontAuthorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FontAuthorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FontAuthorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FontAuthor"
    objects: {
      fonts: Prisma.$IngredientPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      name: string
      type: string
      email: string
      supportEmail: string | null
      avatarUrl: string | null
      bannerUrl: string | null
      bio: string | null
      website: string | null
      dafontProfileUrl: string | null
      profileInfoUrl: string | null
      donation: string | null
      nationality: string | null
      languagesSpoken: string | null
      isVerified: boolean
      socialLinks: string | null
      metrics: string | null
      businessInfo: string | null
      specialties: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fontAuthor"]>
    composites: {}
  }

  type FontAuthorGetPayload<S extends boolean | null | undefined | FontAuthorDefaultArgs> = $Result.GetResult<Prisma.$FontAuthorPayload, S>

  type FontAuthorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FontAuthorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FontAuthorCountAggregateInputType | true
    }

  export interface FontAuthorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FontAuthor'], meta: { name: 'FontAuthor' } }
    /**
     * Find zero or one FontAuthor that matches the filter.
     * @param {FontAuthorFindUniqueArgs} args - Arguments to find a FontAuthor
     * @example
     * // Get one FontAuthor
     * const fontAuthor = await prisma.fontAuthor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FontAuthorFindUniqueArgs>(args: SelectSubset<T, FontAuthorFindUniqueArgs<ExtArgs>>): Prisma__FontAuthorClient<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FontAuthor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FontAuthorFindUniqueOrThrowArgs} args - Arguments to find a FontAuthor
     * @example
     * // Get one FontAuthor
     * const fontAuthor = await prisma.fontAuthor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FontAuthorFindUniqueOrThrowArgs>(args: SelectSubset<T, FontAuthorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FontAuthorClient<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FontAuthor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontAuthorFindFirstArgs} args - Arguments to find a FontAuthor
     * @example
     * // Get one FontAuthor
     * const fontAuthor = await prisma.fontAuthor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FontAuthorFindFirstArgs>(args?: SelectSubset<T, FontAuthorFindFirstArgs<ExtArgs>>): Prisma__FontAuthorClient<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FontAuthor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontAuthorFindFirstOrThrowArgs} args - Arguments to find a FontAuthor
     * @example
     * // Get one FontAuthor
     * const fontAuthor = await prisma.fontAuthor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FontAuthorFindFirstOrThrowArgs>(args?: SelectSubset<T, FontAuthorFindFirstOrThrowArgs<ExtArgs>>): Prisma__FontAuthorClient<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FontAuthors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontAuthorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FontAuthors
     * const fontAuthors = await prisma.fontAuthor.findMany()
     * 
     * // Get first 10 FontAuthors
     * const fontAuthors = await prisma.fontAuthor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fontAuthorWithIdOnly = await prisma.fontAuthor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FontAuthorFindManyArgs>(args?: SelectSubset<T, FontAuthorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FontAuthor.
     * @param {FontAuthorCreateArgs} args - Arguments to create a FontAuthor.
     * @example
     * // Create one FontAuthor
     * const FontAuthor = await prisma.fontAuthor.create({
     *   data: {
     *     // ... data to create a FontAuthor
     *   }
     * })
     * 
     */
    create<T extends FontAuthorCreateArgs>(args: SelectSubset<T, FontAuthorCreateArgs<ExtArgs>>): Prisma__FontAuthorClient<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FontAuthors.
     * @param {FontAuthorCreateManyArgs} args - Arguments to create many FontAuthors.
     * @example
     * // Create many FontAuthors
     * const fontAuthor = await prisma.fontAuthor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FontAuthorCreateManyArgs>(args?: SelectSubset<T, FontAuthorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FontAuthors and returns the data saved in the database.
     * @param {FontAuthorCreateManyAndReturnArgs} args - Arguments to create many FontAuthors.
     * @example
     * // Create many FontAuthors
     * const fontAuthor = await prisma.fontAuthor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FontAuthors and only return the `id`
     * const fontAuthorWithIdOnly = await prisma.fontAuthor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FontAuthorCreateManyAndReturnArgs>(args?: SelectSubset<T, FontAuthorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FontAuthor.
     * @param {FontAuthorDeleteArgs} args - Arguments to delete one FontAuthor.
     * @example
     * // Delete one FontAuthor
     * const FontAuthor = await prisma.fontAuthor.delete({
     *   where: {
     *     // ... filter to delete one FontAuthor
     *   }
     * })
     * 
     */
    delete<T extends FontAuthorDeleteArgs>(args: SelectSubset<T, FontAuthorDeleteArgs<ExtArgs>>): Prisma__FontAuthorClient<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FontAuthor.
     * @param {FontAuthorUpdateArgs} args - Arguments to update one FontAuthor.
     * @example
     * // Update one FontAuthor
     * const fontAuthor = await prisma.fontAuthor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FontAuthorUpdateArgs>(args: SelectSubset<T, FontAuthorUpdateArgs<ExtArgs>>): Prisma__FontAuthorClient<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FontAuthors.
     * @param {FontAuthorDeleteManyArgs} args - Arguments to filter FontAuthors to delete.
     * @example
     * // Delete a few FontAuthors
     * const { count } = await prisma.fontAuthor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FontAuthorDeleteManyArgs>(args?: SelectSubset<T, FontAuthorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FontAuthors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontAuthorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FontAuthors
     * const fontAuthor = await prisma.fontAuthor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FontAuthorUpdateManyArgs>(args: SelectSubset<T, FontAuthorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FontAuthors and returns the data updated in the database.
     * @param {FontAuthorUpdateManyAndReturnArgs} args - Arguments to update many FontAuthors.
     * @example
     * // Update many FontAuthors
     * const fontAuthor = await prisma.fontAuthor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FontAuthors and only return the `id`
     * const fontAuthorWithIdOnly = await prisma.fontAuthor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FontAuthorUpdateManyAndReturnArgs>(args: SelectSubset<T, FontAuthorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FontAuthor.
     * @param {FontAuthorUpsertArgs} args - Arguments to update or create a FontAuthor.
     * @example
     * // Update or create a FontAuthor
     * const fontAuthor = await prisma.fontAuthor.upsert({
     *   create: {
     *     // ... data to create a FontAuthor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FontAuthor we want to update
     *   }
     * })
     */
    upsert<T extends FontAuthorUpsertArgs>(args: SelectSubset<T, FontAuthorUpsertArgs<ExtArgs>>): Prisma__FontAuthorClient<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FontAuthors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontAuthorCountArgs} args - Arguments to filter FontAuthors to count.
     * @example
     * // Count the number of FontAuthors
     * const count = await prisma.fontAuthor.count({
     *   where: {
     *     // ... the filter for the FontAuthors we want to count
     *   }
     * })
    **/
    count<T extends FontAuthorCountArgs>(
      args?: Subset<T, FontAuthorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FontAuthorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FontAuthor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontAuthorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FontAuthorAggregateArgs>(args: Subset<T, FontAuthorAggregateArgs>): Prisma.PrismaPromise<GetFontAuthorAggregateType<T>>

    /**
     * Group by FontAuthor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontAuthorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FontAuthorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FontAuthorGroupByArgs['orderBy'] }
        : { orderBy?: FontAuthorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FontAuthorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFontAuthorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FontAuthor model
   */
  readonly fields: FontAuthorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FontAuthor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FontAuthorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fonts<T extends FontAuthor$fontsArgs<ExtArgs> = {}>(args?: Subset<T, FontAuthor$fontsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FontAuthor model
   */
  interface FontAuthorFieldRefs {
    readonly id: FieldRef<"FontAuthor", 'String'>
    readonly slug: FieldRef<"FontAuthor", 'String'>
    readonly name: FieldRef<"FontAuthor", 'String'>
    readonly type: FieldRef<"FontAuthor", 'String'>
    readonly email: FieldRef<"FontAuthor", 'String'>
    readonly supportEmail: FieldRef<"FontAuthor", 'String'>
    readonly avatarUrl: FieldRef<"FontAuthor", 'String'>
    readonly bannerUrl: FieldRef<"FontAuthor", 'String'>
    readonly bio: FieldRef<"FontAuthor", 'String'>
    readonly website: FieldRef<"FontAuthor", 'String'>
    readonly dafontProfileUrl: FieldRef<"FontAuthor", 'String'>
    readonly profileInfoUrl: FieldRef<"FontAuthor", 'String'>
    readonly donation: FieldRef<"FontAuthor", 'String'>
    readonly nationality: FieldRef<"FontAuthor", 'String'>
    readonly languagesSpoken: FieldRef<"FontAuthor", 'String'>
    readonly isVerified: FieldRef<"FontAuthor", 'Boolean'>
    readonly socialLinks: FieldRef<"FontAuthor", 'String'>
    readonly metrics: FieldRef<"FontAuthor", 'String'>
    readonly businessInfo: FieldRef<"FontAuthor", 'String'>
    readonly specialties: FieldRef<"FontAuthor", 'String'>
    readonly status: FieldRef<"FontAuthor", 'String'>
    readonly createdAt: FieldRef<"FontAuthor", 'DateTime'>
    readonly updatedAt: FieldRef<"FontAuthor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FontAuthor findUnique
   */
  export type FontAuthorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
    /**
     * Filter, which FontAuthor to fetch.
     */
    where: FontAuthorWhereUniqueInput
  }

  /**
   * FontAuthor findUniqueOrThrow
   */
  export type FontAuthorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
    /**
     * Filter, which FontAuthor to fetch.
     */
    where: FontAuthorWhereUniqueInput
  }

  /**
   * FontAuthor findFirst
   */
  export type FontAuthorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
    /**
     * Filter, which FontAuthor to fetch.
     */
    where?: FontAuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontAuthors to fetch.
     */
    orderBy?: FontAuthorOrderByWithRelationInput | FontAuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FontAuthors.
     */
    cursor?: FontAuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontAuthors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontAuthors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FontAuthors.
     */
    distinct?: FontAuthorScalarFieldEnum | FontAuthorScalarFieldEnum[]
  }

  /**
   * FontAuthor findFirstOrThrow
   */
  export type FontAuthorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
    /**
     * Filter, which FontAuthor to fetch.
     */
    where?: FontAuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontAuthors to fetch.
     */
    orderBy?: FontAuthorOrderByWithRelationInput | FontAuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FontAuthors.
     */
    cursor?: FontAuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontAuthors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontAuthors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FontAuthors.
     */
    distinct?: FontAuthorScalarFieldEnum | FontAuthorScalarFieldEnum[]
  }

  /**
   * FontAuthor findMany
   */
  export type FontAuthorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
    /**
     * Filter, which FontAuthors to fetch.
     */
    where?: FontAuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontAuthors to fetch.
     */
    orderBy?: FontAuthorOrderByWithRelationInput | FontAuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FontAuthors.
     */
    cursor?: FontAuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontAuthors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontAuthors.
     */
    skip?: number
    distinct?: FontAuthorScalarFieldEnum | FontAuthorScalarFieldEnum[]
  }

  /**
   * FontAuthor create
   */
  export type FontAuthorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
    /**
     * The data needed to create a FontAuthor.
     */
    data: XOR<FontAuthorCreateInput, FontAuthorUncheckedCreateInput>
  }

  /**
   * FontAuthor createMany
   */
  export type FontAuthorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FontAuthors.
     */
    data: FontAuthorCreateManyInput | FontAuthorCreateManyInput[]
  }

  /**
   * FontAuthor createManyAndReturn
   */
  export type FontAuthorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * The data used to create many FontAuthors.
     */
    data: FontAuthorCreateManyInput | FontAuthorCreateManyInput[]
  }

  /**
   * FontAuthor update
   */
  export type FontAuthorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
    /**
     * The data needed to update a FontAuthor.
     */
    data: XOR<FontAuthorUpdateInput, FontAuthorUncheckedUpdateInput>
    /**
     * Choose, which FontAuthor to update.
     */
    where: FontAuthorWhereUniqueInput
  }

  /**
   * FontAuthor updateMany
   */
  export type FontAuthorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FontAuthors.
     */
    data: XOR<FontAuthorUpdateManyMutationInput, FontAuthorUncheckedUpdateManyInput>
    /**
     * Filter which FontAuthors to update
     */
    where?: FontAuthorWhereInput
    /**
     * Limit how many FontAuthors to update.
     */
    limit?: number
  }

  /**
   * FontAuthor updateManyAndReturn
   */
  export type FontAuthorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * The data used to update FontAuthors.
     */
    data: XOR<FontAuthorUpdateManyMutationInput, FontAuthorUncheckedUpdateManyInput>
    /**
     * Filter which FontAuthors to update
     */
    where?: FontAuthorWhereInput
    /**
     * Limit how many FontAuthors to update.
     */
    limit?: number
  }

  /**
   * FontAuthor upsert
   */
  export type FontAuthorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
    /**
     * The filter to search for the FontAuthor to update in case it exists.
     */
    where: FontAuthorWhereUniqueInput
    /**
     * In case the FontAuthor found by the `where` argument doesn't exist, create a new FontAuthor with this data.
     */
    create: XOR<FontAuthorCreateInput, FontAuthorUncheckedCreateInput>
    /**
     * In case the FontAuthor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FontAuthorUpdateInput, FontAuthorUncheckedUpdateInput>
  }

  /**
   * FontAuthor delete
   */
  export type FontAuthorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
    /**
     * Filter which FontAuthor to delete.
     */
    where: FontAuthorWhereUniqueInput
  }

  /**
   * FontAuthor deleteMany
   */
  export type FontAuthorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FontAuthors to delete
     */
    where?: FontAuthorWhereInput
    /**
     * Limit how many FontAuthors to delete.
     */
    limit?: number
  }

  /**
   * FontAuthor.fonts
   */
  export type FontAuthor$fontsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    where?: IngredientWhereInput
    orderBy?: IngredientOrderByWithRelationInput | IngredientOrderByWithRelationInput[]
    cursor?: IngredientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IngredientScalarFieldEnum | IngredientScalarFieldEnum[]
  }

  /**
   * FontAuthor without action
   */
  export type FontAuthorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
  }


  /**
   * Model SeoModule
   */

  export type AggregateSeoModule = {
    _count: SeoModuleCountAggregateOutputType | null
    _min: SeoModuleMinAggregateOutputType | null
    _max: SeoModuleMaxAggregateOutputType | null
  }

  export type SeoModuleMinAggregateOutputType = {
    id: string | null
    metaTitle: string | null
    metaDescription: string | null
    keywords: string | null
    ogTitle: string | null
    ogDescription: string | null
    ogImageUrl: string | null
    ogImageAlt: string | null
    twitterCard: string | null
    twitterTitle: string | null
    twitterDescription: string | null
    twitterImageUrl: string | null
    twitterImageAlt: string | null
    canonicalUrl: string | null
    noIndex: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SeoModuleMaxAggregateOutputType = {
    id: string | null
    metaTitle: string | null
    metaDescription: string | null
    keywords: string | null
    ogTitle: string | null
    ogDescription: string | null
    ogImageUrl: string | null
    ogImageAlt: string | null
    twitterCard: string | null
    twitterTitle: string | null
    twitterDescription: string | null
    twitterImageUrl: string | null
    twitterImageAlt: string | null
    canonicalUrl: string | null
    noIndex: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SeoModuleCountAggregateOutputType = {
    id: number
    metaTitle: number
    metaDescription: number
    keywords: number
    ogTitle: number
    ogDescription: number
    ogImageUrl: number
    ogImageAlt: number
    twitterCard: number
    twitterTitle: number
    twitterDescription: number
    twitterImageUrl: number
    twitterImageAlt: number
    canonicalUrl: number
    noIndex: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SeoModuleMinAggregateInputType = {
    id?: true
    metaTitle?: true
    metaDescription?: true
    keywords?: true
    ogTitle?: true
    ogDescription?: true
    ogImageUrl?: true
    ogImageAlt?: true
    twitterCard?: true
    twitterTitle?: true
    twitterDescription?: true
    twitterImageUrl?: true
    twitterImageAlt?: true
    canonicalUrl?: true
    noIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SeoModuleMaxAggregateInputType = {
    id?: true
    metaTitle?: true
    metaDescription?: true
    keywords?: true
    ogTitle?: true
    ogDescription?: true
    ogImageUrl?: true
    ogImageAlt?: true
    twitterCard?: true
    twitterTitle?: true
    twitterDescription?: true
    twitterImageUrl?: true
    twitterImageAlt?: true
    canonicalUrl?: true
    noIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SeoModuleCountAggregateInputType = {
    id?: true
    metaTitle?: true
    metaDescription?: true
    keywords?: true
    ogTitle?: true
    ogDescription?: true
    ogImageUrl?: true
    ogImageAlt?: true
    twitterCard?: true
    twitterTitle?: true
    twitterDescription?: true
    twitterImageUrl?: true
    twitterImageAlt?: true
    canonicalUrl?: true
    noIndex?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SeoModuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SeoModule to aggregate.
     */
    where?: SeoModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeoModules to fetch.
     */
    orderBy?: SeoModuleOrderByWithRelationInput | SeoModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SeoModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeoModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeoModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SeoModules
    **/
    _count?: true | SeoModuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SeoModuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SeoModuleMaxAggregateInputType
  }

  export type GetSeoModuleAggregateType<T extends SeoModuleAggregateArgs> = {
        [P in keyof T & keyof AggregateSeoModule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSeoModule[P]>
      : GetScalarType<T[P], AggregateSeoModule[P]>
  }




  export type SeoModuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SeoModuleWhereInput
    orderBy?: SeoModuleOrderByWithAggregationInput | SeoModuleOrderByWithAggregationInput[]
    by: SeoModuleScalarFieldEnum[] | SeoModuleScalarFieldEnum
    having?: SeoModuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SeoModuleCountAggregateInputType | true
    _min?: SeoModuleMinAggregateInputType
    _max?: SeoModuleMaxAggregateInputType
  }

  export type SeoModuleGroupByOutputType = {
    id: string
    metaTitle: string | null
    metaDescription: string | null
    keywords: string | null
    ogTitle: string | null
    ogDescription: string | null
    ogImageUrl: string | null
    ogImageAlt: string | null
    twitterCard: string
    twitterTitle: string | null
    twitterDescription: string | null
    twitterImageUrl: string | null
    twitterImageAlt: string | null
    canonicalUrl: string | null
    noIndex: boolean
    createdAt: Date
    updatedAt: Date
    _count: SeoModuleCountAggregateOutputType | null
    _min: SeoModuleMinAggregateOutputType | null
    _max: SeoModuleMaxAggregateOutputType | null
  }

  type GetSeoModuleGroupByPayload<T extends SeoModuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SeoModuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SeoModuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SeoModuleGroupByOutputType[P]>
            : GetScalarType<T[P], SeoModuleGroupByOutputType[P]>
        }
      >
    >


  export type SeoModuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    keywords?: boolean
    ogTitle?: boolean
    ogDescription?: boolean
    ogImageUrl?: boolean
    ogImageAlt?: boolean
    twitterCard?: boolean
    twitterTitle?: boolean
    twitterDescription?: boolean
    twitterImageUrl?: boolean
    twitterImageAlt?: boolean
    canonicalUrl?: boolean
    noIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | SeoModule$postArgs<ExtArgs>
    prescription?: boolean | SeoModule$prescriptionArgs<ExtArgs>
  }, ExtArgs["result"]["seoModule"]>

  export type SeoModuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    keywords?: boolean
    ogTitle?: boolean
    ogDescription?: boolean
    ogImageUrl?: boolean
    ogImageAlt?: boolean
    twitterCard?: boolean
    twitterTitle?: boolean
    twitterDescription?: boolean
    twitterImageUrl?: boolean
    twitterImageAlt?: boolean
    canonicalUrl?: boolean
    noIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["seoModule"]>

  export type SeoModuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    keywords?: boolean
    ogTitle?: boolean
    ogDescription?: boolean
    ogImageUrl?: boolean
    ogImageAlt?: boolean
    twitterCard?: boolean
    twitterTitle?: boolean
    twitterDescription?: boolean
    twitterImageUrl?: boolean
    twitterImageAlt?: boolean
    canonicalUrl?: boolean
    noIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["seoModule"]>

  export type SeoModuleSelectScalar = {
    id?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    keywords?: boolean
    ogTitle?: boolean
    ogDescription?: boolean
    ogImageUrl?: boolean
    ogImageAlt?: boolean
    twitterCard?: boolean
    twitterTitle?: boolean
    twitterDescription?: boolean
    twitterImageUrl?: boolean
    twitterImageAlt?: boolean
    canonicalUrl?: boolean
    noIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SeoModuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "metaTitle" | "metaDescription" | "keywords" | "ogTitle" | "ogDescription" | "ogImageUrl" | "ogImageAlt" | "twitterCard" | "twitterTitle" | "twitterDescription" | "twitterImageUrl" | "twitterImageAlt" | "canonicalUrl" | "noIndex" | "createdAt" | "updatedAt", ExtArgs["result"]["seoModule"]>
  export type SeoModuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | SeoModule$postArgs<ExtArgs>
    prescription?: boolean | SeoModule$prescriptionArgs<ExtArgs>
  }
  export type SeoModuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SeoModuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SeoModulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SeoModule"
    objects: {
      post: Prisma.$PostPayload<ExtArgs> | null
      prescription: Prisma.$PrescriptionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      metaTitle: string | null
      metaDescription: string | null
      keywords: string | null
      ogTitle: string | null
      ogDescription: string | null
      ogImageUrl: string | null
      ogImageAlt: string | null
      twitterCard: string
      twitterTitle: string | null
      twitterDescription: string | null
      twitterImageUrl: string | null
      twitterImageAlt: string | null
      canonicalUrl: string | null
      noIndex: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["seoModule"]>
    composites: {}
  }

  type SeoModuleGetPayload<S extends boolean | null | undefined | SeoModuleDefaultArgs> = $Result.GetResult<Prisma.$SeoModulePayload, S>

  type SeoModuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SeoModuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SeoModuleCountAggregateInputType | true
    }

  export interface SeoModuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SeoModule'], meta: { name: 'SeoModule' } }
    /**
     * Find zero or one SeoModule that matches the filter.
     * @param {SeoModuleFindUniqueArgs} args - Arguments to find a SeoModule
     * @example
     * // Get one SeoModule
     * const seoModule = await prisma.seoModule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SeoModuleFindUniqueArgs>(args: SelectSubset<T, SeoModuleFindUniqueArgs<ExtArgs>>): Prisma__SeoModuleClient<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SeoModule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SeoModuleFindUniqueOrThrowArgs} args - Arguments to find a SeoModule
     * @example
     * // Get one SeoModule
     * const seoModule = await prisma.seoModule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SeoModuleFindUniqueOrThrowArgs>(args: SelectSubset<T, SeoModuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SeoModuleClient<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SeoModule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeoModuleFindFirstArgs} args - Arguments to find a SeoModule
     * @example
     * // Get one SeoModule
     * const seoModule = await prisma.seoModule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SeoModuleFindFirstArgs>(args?: SelectSubset<T, SeoModuleFindFirstArgs<ExtArgs>>): Prisma__SeoModuleClient<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SeoModule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeoModuleFindFirstOrThrowArgs} args - Arguments to find a SeoModule
     * @example
     * // Get one SeoModule
     * const seoModule = await prisma.seoModule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SeoModuleFindFirstOrThrowArgs>(args?: SelectSubset<T, SeoModuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SeoModuleClient<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SeoModules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeoModuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SeoModules
     * const seoModules = await prisma.seoModule.findMany()
     * 
     * // Get first 10 SeoModules
     * const seoModules = await prisma.seoModule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const seoModuleWithIdOnly = await prisma.seoModule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SeoModuleFindManyArgs>(args?: SelectSubset<T, SeoModuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SeoModule.
     * @param {SeoModuleCreateArgs} args - Arguments to create a SeoModule.
     * @example
     * // Create one SeoModule
     * const SeoModule = await prisma.seoModule.create({
     *   data: {
     *     // ... data to create a SeoModule
     *   }
     * })
     * 
     */
    create<T extends SeoModuleCreateArgs>(args: SelectSubset<T, SeoModuleCreateArgs<ExtArgs>>): Prisma__SeoModuleClient<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SeoModules.
     * @param {SeoModuleCreateManyArgs} args - Arguments to create many SeoModules.
     * @example
     * // Create many SeoModules
     * const seoModule = await prisma.seoModule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SeoModuleCreateManyArgs>(args?: SelectSubset<T, SeoModuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SeoModules and returns the data saved in the database.
     * @param {SeoModuleCreateManyAndReturnArgs} args - Arguments to create many SeoModules.
     * @example
     * // Create many SeoModules
     * const seoModule = await prisma.seoModule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SeoModules and only return the `id`
     * const seoModuleWithIdOnly = await prisma.seoModule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SeoModuleCreateManyAndReturnArgs>(args?: SelectSubset<T, SeoModuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SeoModule.
     * @param {SeoModuleDeleteArgs} args - Arguments to delete one SeoModule.
     * @example
     * // Delete one SeoModule
     * const SeoModule = await prisma.seoModule.delete({
     *   where: {
     *     // ... filter to delete one SeoModule
     *   }
     * })
     * 
     */
    delete<T extends SeoModuleDeleteArgs>(args: SelectSubset<T, SeoModuleDeleteArgs<ExtArgs>>): Prisma__SeoModuleClient<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SeoModule.
     * @param {SeoModuleUpdateArgs} args - Arguments to update one SeoModule.
     * @example
     * // Update one SeoModule
     * const seoModule = await prisma.seoModule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SeoModuleUpdateArgs>(args: SelectSubset<T, SeoModuleUpdateArgs<ExtArgs>>): Prisma__SeoModuleClient<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SeoModules.
     * @param {SeoModuleDeleteManyArgs} args - Arguments to filter SeoModules to delete.
     * @example
     * // Delete a few SeoModules
     * const { count } = await prisma.seoModule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SeoModuleDeleteManyArgs>(args?: SelectSubset<T, SeoModuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SeoModules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeoModuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SeoModules
     * const seoModule = await prisma.seoModule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SeoModuleUpdateManyArgs>(args: SelectSubset<T, SeoModuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SeoModules and returns the data updated in the database.
     * @param {SeoModuleUpdateManyAndReturnArgs} args - Arguments to update many SeoModules.
     * @example
     * // Update many SeoModules
     * const seoModule = await prisma.seoModule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SeoModules and only return the `id`
     * const seoModuleWithIdOnly = await prisma.seoModule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SeoModuleUpdateManyAndReturnArgs>(args: SelectSubset<T, SeoModuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SeoModule.
     * @param {SeoModuleUpsertArgs} args - Arguments to update or create a SeoModule.
     * @example
     * // Update or create a SeoModule
     * const seoModule = await prisma.seoModule.upsert({
     *   create: {
     *     // ... data to create a SeoModule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SeoModule we want to update
     *   }
     * })
     */
    upsert<T extends SeoModuleUpsertArgs>(args: SelectSubset<T, SeoModuleUpsertArgs<ExtArgs>>): Prisma__SeoModuleClient<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SeoModules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeoModuleCountArgs} args - Arguments to filter SeoModules to count.
     * @example
     * // Count the number of SeoModules
     * const count = await prisma.seoModule.count({
     *   where: {
     *     // ... the filter for the SeoModules we want to count
     *   }
     * })
    **/
    count<T extends SeoModuleCountArgs>(
      args?: Subset<T, SeoModuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SeoModuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SeoModule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeoModuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SeoModuleAggregateArgs>(args: Subset<T, SeoModuleAggregateArgs>): Prisma.PrismaPromise<GetSeoModuleAggregateType<T>>

    /**
     * Group by SeoModule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeoModuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SeoModuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SeoModuleGroupByArgs['orderBy'] }
        : { orderBy?: SeoModuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SeoModuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSeoModuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SeoModule model
   */
  readonly fields: SeoModuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SeoModule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SeoModuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends SeoModule$postArgs<ExtArgs> = {}>(args?: Subset<T, SeoModule$postArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    prescription<T extends SeoModule$prescriptionArgs<ExtArgs> = {}>(args?: Subset<T, SeoModule$prescriptionArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SeoModule model
   */
  interface SeoModuleFieldRefs {
    readonly id: FieldRef<"SeoModule", 'String'>
    readonly metaTitle: FieldRef<"SeoModule", 'String'>
    readonly metaDescription: FieldRef<"SeoModule", 'String'>
    readonly keywords: FieldRef<"SeoModule", 'String'>
    readonly ogTitle: FieldRef<"SeoModule", 'String'>
    readonly ogDescription: FieldRef<"SeoModule", 'String'>
    readonly ogImageUrl: FieldRef<"SeoModule", 'String'>
    readonly ogImageAlt: FieldRef<"SeoModule", 'String'>
    readonly twitterCard: FieldRef<"SeoModule", 'String'>
    readonly twitterTitle: FieldRef<"SeoModule", 'String'>
    readonly twitterDescription: FieldRef<"SeoModule", 'String'>
    readonly twitterImageUrl: FieldRef<"SeoModule", 'String'>
    readonly twitterImageAlt: FieldRef<"SeoModule", 'String'>
    readonly canonicalUrl: FieldRef<"SeoModule", 'String'>
    readonly noIndex: FieldRef<"SeoModule", 'Boolean'>
    readonly createdAt: FieldRef<"SeoModule", 'DateTime'>
    readonly updatedAt: FieldRef<"SeoModule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SeoModule findUnique
   */
  export type SeoModuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    /**
     * Filter, which SeoModule to fetch.
     */
    where: SeoModuleWhereUniqueInput
  }

  /**
   * SeoModule findUniqueOrThrow
   */
  export type SeoModuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    /**
     * Filter, which SeoModule to fetch.
     */
    where: SeoModuleWhereUniqueInput
  }

  /**
   * SeoModule findFirst
   */
  export type SeoModuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    /**
     * Filter, which SeoModule to fetch.
     */
    where?: SeoModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeoModules to fetch.
     */
    orderBy?: SeoModuleOrderByWithRelationInput | SeoModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SeoModules.
     */
    cursor?: SeoModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeoModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeoModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SeoModules.
     */
    distinct?: SeoModuleScalarFieldEnum | SeoModuleScalarFieldEnum[]
  }

  /**
   * SeoModule findFirstOrThrow
   */
  export type SeoModuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    /**
     * Filter, which SeoModule to fetch.
     */
    where?: SeoModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeoModules to fetch.
     */
    orderBy?: SeoModuleOrderByWithRelationInput | SeoModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SeoModules.
     */
    cursor?: SeoModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeoModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeoModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SeoModules.
     */
    distinct?: SeoModuleScalarFieldEnum | SeoModuleScalarFieldEnum[]
  }

  /**
   * SeoModule findMany
   */
  export type SeoModuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    /**
     * Filter, which SeoModules to fetch.
     */
    where?: SeoModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeoModules to fetch.
     */
    orderBy?: SeoModuleOrderByWithRelationInput | SeoModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SeoModules.
     */
    cursor?: SeoModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeoModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeoModules.
     */
    skip?: number
    distinct?: SeoModuleScalarFieldEnum | SeoModuleScalarFieldEnum[]
  }

  /**
   * SeoModule create
   */
  export type SeoModuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    /**
     * The data needed to create a SeoModule.
     */
    data?: XOR<SeoModuleCreateInput, SeoModuleUncheckedCreateInput>
  }

  /**
   * SeoModule createMany
   */
  export type SeoModuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SeoModules.
     */
    data: SeoModuleCreateManyInput | SeoModuleCreateManyInput[]
  }

  /**
   * SeoModule createManyAndReturn
   */
  export type SeoModuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * The data used to create many SeoModules.
     */
    data: SeoModuleCreateManyInput | SeoModuleCreateManyInput[]
  }

  /**
   * SeoModule update
   */
  export type SeoModuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    /**
     * The data needed to update a SeoModule.
     */
    data: XOR<SeoModuleUpdateInput, SeoModuleUncheckedUpdateInput>
    /**
     * Choose, which SeoModule to update.
     */
    where: SeoModuleWhereUniqueInput
  }

  /**
   * SeoModule updateMany
   */
  export type SeoModuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SeoModules.
     */
    data: XOR<SeoModuleUpdateManyMutationInput, SeoModuleUncheckedUpdateManyInput>
    /**
     * Filter which SeoModules to update
     */
    where?: SeoModuleWhereInput
    /**
     * Limit how many SeoModules to update.
     */
    limit?: number
  }

  /**
   * SeoModule updateManyAndReturn
   */
  export type SeoModuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * The data used to update SeoModules.
     */
    data: XOR<SeoModuleUpdateManyMutationInput, SeoModuleUncheckedUpdateManyInput>
    /**
     * Filter which SeoModules to update
     */
    where?: SeoModuleWhereInput
    /**
     * Limit how many SeoModules to update.
     */
    limit?: number
  }

  /**
   * SeoModule upsert
   */
  export type SeoModuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    /**
     * The filter to search for the SeoModule to update in case it exists.
     */
    where: SeoModuleWhereUniqueInput
    /**
     * In case the SeoModule found by the `where` argument doesn't exist, create a new SeoModule with this data.
     */
    create: XOR<SeoModuleCreateInput, SeoModuleUncheckedCreateInput>
    /**
     * In case the SeoModule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SeoModuleUpdateInput, SeoModuleUncheckedUpdateInput>
  }

  /**
   * SeoModule delete
   */
  export type SeoModuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    /**
     * Filter which SeoModule to delete.
     */
    where: SeoModuleWhereUniqueInput
  }

  /**
   * SeoModule deleteMany
   */
  export type SeoModuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SeoModules to delete
     */
    where?: SeoModuleWhereInput
    /**
     * Limit how many SeoModules to delete.
     */
    limit?: number
  }

  /**
   * SeoModule.post
   */
  export type SeoModule$postArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
  }

  /**
   * SeoModule.prescription
   */
  export type SeoModule$prescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
  }

  /**
   * SeoModule without action
   */
  export type SeoModuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
  }


  /**
   * Model FontVariant
   */

  export type AggregateFontVariant = {
    _count: FontVariantCountAggregateOutputType | null
    _avg: FontVariantAvgAggregateOutputType | null
    _sum: FontVariantSumAggregateOutputType | null
    _min: FontVariantMinAggregateOutputType | null
    _max: FontVariantMaxAggregateOutputType | null
  }

  export type FontVariantAvgAggregateOutputType = {
    weight: number | null
  }

  export type FontVariantSumAggregateOutputType = {
    weight: number | null
  }

  export type FontVariantMinAggregateOutputType = {
    id: string | null
    fontFamilyName: string | null
    weight: number | null
    style: string | null
    woff2Url: string | null
    label: string | null
    ingredientId: string | null
  }

  export type FontVariantMaxAggregateOutputType = {
    id: string | null
    fontFamilyName: string | null
    weight: number | null
    style: string | null
    woff2Url: string | null
    label: string | null
    ingredientId: string | null
  }

  export type FontVariantCountAggregateOutputType = {
    id: number
    fontFamilyName: number
    weight: number
    style: number
    woff2Url: number
    label: number
    ingredientId: number
    _all: number
  }


  export type FontVariantAvgAggregateInputType = {
    weight?: true
  }

  export type FontVariantSumAggregateInputType = {
    weight?: true
  }

  export type FontVariantMinAggregateInputType = {
    id?: true
    fontFamilyName?: true
    weight?: true
    style?: true
    woff2Url?: true
    label?: true
    ingredientId?: true
  }

  export type FontVariantMaxAggregateInputType = {
    id?: true
    fontFamilyName?: true
    weight?: true
    style?: true
    woff2Url?: true
    label?: true
    ingredientId?: true
  }

  export type FontVariantCountAggregateInputType = {
    id?: true
    fontFamilyName?: true
    weight?: true
    style?: true
    woff2Url?: true
    label?: true
    ingredientId?: true
    _all?: true
  }

  export type FontVariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FontVariant to aggregate.
     */
    where?: FontVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontVariants to fetch.
     */
    orderBy?: FontVariantOrderByWithRelationInput | FontVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FontVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FontVariants
    **/
    _count?: true | FontVariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FontVariantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FontVariantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FontVariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FontVariantMaxAggregateInputType
  }

  export type GetFontVariantAggregateType<T extends FontVariantAggregateArgs> = {
        [P in keyof T & keyof AggregateFontVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFontVariant[P]>
      : GetScalarType<T[P], AggregateFontVariant[P]>
  }




  export type FontVariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FontVariantWhereInput
    orderBy?: FontVariantOrderByWithAggregationInput | FontVariantOrderByWithAggregationInput[]
    by: FontVariantScalarFieldEnum[] | FontVariantScalarFieldEnum
    having?: FontVariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FontVariantCountAggregateInputType | true
    _avg?: FontVariantAvgAggregateInputType
    _sum?: FontVariantSumAggregateInputType
    _min?: FontVariantMinAggregateInputType
    _max?: FontVariantMaxAggregateInputType
  }

  export type FontVariantGroupByOutputType = {
    id: string
    fontFamilyName: string
    weight: number
    style: string
    woff2Url: string
    label: string
    ingredientId: string
    _count: FontVariantCountAggregateOutputType | null
    _avg: FontVariantAvgAggregateOutputType | null
    _sum: FontVariantSumAggregateOutputType | null
    _min: FontVariantMinAggregateOutputType | null
    _max: FontVariantMaxAggregateOutputType | null
  }

  type GetFontVariantGroupByPayload<T extends FontVariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FontVariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FontVariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FontVariantGroupByOutputType[P]>
            : GetScalarType<T[P], FontVariantGroupByOutputType[P]>
        }
      >
    >


  export type FontVariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fontFamilyName?: boolean
    weight?: boolean
    style?: boolean
    woff2Url?: boolean
    label?: boolean
    ingredientId?: boolean
    ingredient?: boolean | IngredientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fontVariant"]>

  export type FontVariantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fontFamilyName?: boolean
    weight?: boolean
    style?: boolean
    woff2Url?: boolean
    label?: boolean
    ingredientId?: boolean
    ingredient?: boolean | IngredientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fontVariant"]>

  export type FontVariantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fontFamilyName?: boolean
    weight?: boolean
    style?: boolean
    woff2Url?: boolean
    label?: boolean
    ingredientId?: boolean
    ingredient?: boolean | IngredientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fontVariant"]>

  export type FontVariantSelectScalar = {
    id?: boolean
    fontFamilyName?: boolean
    weight?: boolean
    style?: boolean
    woff2Url?: boolean
    label?: boolean
    ingredientId?: boolean
  }

  export type FontVariantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fontFamilyName" | "weight" | "style" | "woff2Url" | "label" | "ingredientId", ExtArgs["result"]["fontVariant"]>
  export type FontVariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingredient?: boolean | IngredientDefaultArgs<ExtArgs>
  }
  export type FontVariantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingredient?: boolean | IngredientDefaultArgs<ExtArgs>
  }
  export type FontVariantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingredient?: boolean | IngredientDefaultArgs<ExtArgs>
  }

  export type $FontVariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FontVariant"
    objects: {
      ingredient: Prisma.$IngredientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fontFamilyName: string
      weight: number
      style: string
      woff2Url: string
      label: string
      ingredientId: string
    }, ExtArgs["result"]["fontVariant"]>
    composites: {}
  }

  type FontVariantGetPayload<S extends boolean | null | undefined | FontVariantDefaultArgs> = $Result.GetResult<Prisma.$FontVariantPayload, S>

  type FontVariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FontVariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FontVariantCountAggregateInputType | true
    }

  export interface FontVariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FontVariant'], meta: { name: 'FontVariant' } }
    /**
     * Find zero or one FontVariant that matches the filter.
     * @param {FontVariantFindUniqueArgs} args - Arguments to find a FontVariant
     * @example
     * // Get one FontVariant
     * const fontVariant = await prisma.fontVariant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FontVariantFindUniqueArgs>(args: SelectSubset<T, FontVariantFindUniqueArgs<ExtArgs>>): Prisma__FontVariantClient<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FontVariant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FontVariantFindUniqueOrThrowArgs} args - Arguments to find a FontVariant
     * @example
     * // Get one FontVariant
     * const fontVariant = await prisma.fontVariant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FontVariantFindUniqueOrThrowArgs>(args: SelectSubset<T, FontVariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FontVariantClient<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FontVariant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontVariantFindFirstArgs} args - Arguments to find a FontVariant
     * @example
     * // Get one FontVariant
     * const fontVariant = await prisma.fontVariant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FontVariantFindFirstArgs>(args?: SelectSubset<T, FontVariantFindFirstArgs<ExtArgs>>): Prisma__FontVariantClient<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FontVariant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontVariantFindFirstOrThrowArgs} args - Arguments to find a FontVariant
     * @example
     * // Get one FontVariant
     * const fontVariant = await prisma.fontVariant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FontVariantFindFirstOrThrowArgs>(args?: SelectSubset<T, FontVariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__FontVariantClient<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FontVariants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontVariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FontVariants
     * const fontVariants = await prisma.fontVariant.findMany()
     * 
     * // Get first 10 FontVariants
     * const fontVariants = await prisma.fontVariant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fontVariantWithIdOnly = await prisma.fontVariant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FontVariantFindManyArgs>(args?: SelectSubset<T, FontVariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FontVariant.
     * @param {FontVariantCreateArgs} args - Arguments to create a FontVariant.
     * @example
     * // Create one FontVariant
     * const FontVariant = await prisma.fontVariant.create({
     *   data: {
     *     // ... data to create a FontVariant
     *   }
     * })
     * 
     */
    create<T extends FontVariantCreateArgs>(args: SelectSubset<T, FontVariantCreateArgs<ExtArgs>>): Prisma__FontVariantClient<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FontVariants.
     * @param {FontVariantCreateManyArgs} args - Arguments to create many FontVariants.
     * @example
     * // Create many FontVariants
     * const fontVariant = await prisma.fontVariant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FontVariantCreateManyArgs>(args?: SelectSubset<T, FontVariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FontVariants and returns the data saved in the database.
     * @param {FontVariantCreateManyAndReturnArgs} args - Arguments to create many FontVariants.
     * @example
     * // Create many FontVariants
     * const fontVariant = await prisma.fontVariant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FontVariants and only return the `id`
     * const fontVariantWithIdOnly = await prisma.fontVariant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FontVariantCreateManyAndReturnArgs>(args?: SelectSubset<T, FontVariantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FontVariant.
     * @param {FontVariantDeleteArgs} args - Arguments to delete one FontVariant.
     * @example
     * // Delete one FontVariant
     * const FontVariant = await prisma.fontVariant.delete({
     *   where: {
     *     // ... filter to delete one FontVariant
     *   }
     * })
     * 
     */
    delete<T extends FontVariantDeleteArgs>(args: SelectSubset<T, FontVariantDeleteArgs<ExtArgs>>): Prisma__FontVariantClient<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FontVariant.
     * @param {FontVariantUpdateArgs} args - Arguments to update one FontVariant.
     * @example
     * // Update one FontVariant
     * const fontVariant = await prisma.fontVariant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FontVariantUpdateArgs>(args: SelectSubset<T, FontVariantUpdateArgs<ExtArgs>>): Prisma__FontVariantClient<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FontVariants.
     * @param {FontVariantDeleteManyArgs} args - Arguments to filter FontVariants to delete.
     * @example
     * // Delete a few FontVariants
     * const { count } = await prisma.fontVariant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FontVariantDeleteManyArgs>(args?: SelectSubset<T, FontVariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FontVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontVariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FontVariants
     * const fontVariant = await prisma.fontVariant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FontVariantUpdateManyArgs>(args: SelectSubset<T, FontVariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FontVariants and returns the data updated in the database.
     * @param {FontVariantUpdateManyAndReturnArgs} args - Arguments to update many FontVariants.
     * @example
     * // Update many FontVariants
     * const fontVariant = await prisma.fontVariant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FontVariants and only return the `id`
     * const fontVariantWithIdOnly = await prisma.fontVariant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FontVariantUpdateManyAndReturnArgs>(args: SelectSubset<T, FontVariantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FontVariant.
     * @param {FontVariantUpsertArgs} args - Arguments to update or create a FontVariant.
     * @example
     * // Update or create a FontVariant
     * const fontVariant = await prisma.fontVariant.upsert({
     *   create: {
     *     // ... data to create a FontVariant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FontVariant we want to update
     *   }
     * })
     */
    upsert<T extends FontVariantUpsertArgs>(args: SelectSubset<T, FontVariantUpsertArgs<ExtArgs>>): Prisma__FontVariantClient<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FontVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontVariantCountArgs} args - Arguments to filter FontVariants to count.
     * @example
     * // Count the number of FontVariants
     * const count = await prisma.fontVariant.count({
     *   where: {
     *     // ... the filter for the FontVariants we want to count
     *   }
     * })
    **/
    count<T extends FontVariantCountArgs>(
      args?: Subset<T, FontVariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FontVariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FontVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontVariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FontVariantAggregateArgs>(args: Subset<T, FontVariantAggregateArgs>): Prisma.PrismaPromise<GetFontVariantAggregateType<T>>

    /**
     * Group by FontVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FontVariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FontVariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FontVariantGroupByArgs['orderBy'] }
        : { orderBy?: FontVariantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FontVariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFontVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FontVariant model
   */
  readonly fields: FontVariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FontVariant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FontVariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ingredient<T extends IngredientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IngredientDefaultArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FontVariant model
   */
  interface FontVariantFieldRefs {
    readonly id: FieldRef<"FontVariant", 'String'>
    readonly fontFamilyName: FieldRef<"FontVariant", 'String'>
    readonly weight: FieldRef<"FontVariant", 'Int'>
    readonly style: FieldRef<"FontVariant", 'String'>
    readonly woff2Url: FieldRef<"FontVariant", 'String'>
    readonly label: FieldRef<"FontVariant", 'String'>
    readonly ingredientId: FieldRef<"FontVariant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FontVariant findUnique
   */
  export type FontVariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
    /**
     * Filter, which FontVariant to fetch.
     */
    where: FontVariantWhereUniqueInput
  }

  /**
   * FontVariant findUniqueOrThrow
   */
  export type FontVariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
    /**
     * Filter, which FontVariant to fetch.
     */
    where: FontVariantWhereUniqueInput
  }

  /**
   * FontVariant findFirst
   */
  export type FontVariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
    /**
     * Filter, which FontVariant to fetch.
     */
    where?: FontVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontVariants to fetch.
     */
    orderBy?: FontVariantOrderByWithRelationInput | FontVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FontVariants.
     */
    cursor?: FontVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FontVariants.
     */
    distinct?: FontVariantScalarFieldEnum | FontVariantScalarFieldEnum[]
  }

  /**
   * FontVariant findFirstOrThrow
   */
  export type FontVariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
    /**
     * Filter, which FontVariant to fetch.
     */
    where?: FontVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontVariants to fetch.
     */
    orderBy?: FontVariantOrderByWithRelationInput | FontVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FontVariants.
     */
    cursor?: FontVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FontVariants.
     */
    distinct?: FontVariantScalarFieldEnum | FontVariantScalarFieldEnum[]
  }

  /**
   * FontVariant findMany
   */
  export type FontVariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
    /**
     * Filter, which FontVariants to fetch.
     */
    where?: FontVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FontVariants to fetch.
     */
    orderBy?: FontVariantOrderByWithRelationInput | FontVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FontVariants.
     */
    cursor?: FontVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FontVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FontVariants.
     */
    skip?: number
    distinct?: FontVariantScalarFieldEnum | FontVariantScalarFieldEnum[]
  }

  /**
   * FontVariant create
   */
  export type FontVariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
    /**
     * The data needed to create a FontVariant.
     */
    data: XOR<FontVariantCreateInput, FontVariantUncheckedCreateInput>
  }

  /**
   * FontVariant createMany
   */
  export type FontVariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FontVariants.
     */
    data: FontVariantCreateManyInput | FontVariantCreateManyInput[]
  }

  /**
   * FontVariant createManyAndReturn
   */
  export type FontVariantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * The data used to create many FontVariants.
     */
    data: FontVariantCreateManyInput | FontVariantCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FontVariant update
   */
  export type FontVariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
    /**
     * The data needed to update a FontVariant.
     */
    data: XOR<FontVariantUpdateInput, FontVariantUncheckedUpdateInput>
    /**
     * Choose, which FontVariant to update.
     */
    where: FontVariantWhereUniqueInput
  }

  /**
   * FontVariant updateMany
   */
  export type FontVariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FontVariants.
     */
    data: XOR<FontVariantUpdateManyMutationInput, FontVariantUncheckedUpdateManyInput>
    /**
     * Filter which FontVariants to update
     */
    where?: FontVariantWhereInput
    /**
     * Limit how many FontVariants to update.
     */
    limit?: number
  }

  /**
   * FontVariant updateManyAndReturn
   */
  export type FontVariantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * The data used to update FontVariants.
     */
    data: XOR<FontVariantUpdateManyMutationInput, FontVariantUncheckedUpdateManyInput>
    /**
     * Filter which FontVariants to update
     */
    where?: FontVariantWhereInput
    /**
     * Limit how many FontVariants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FontVariant upsert
   */
  export type FontVariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
    /**
     * The filter to search for the FontVariant to update in case it exists.
     */
    where: FontVariantWhereUniqueInput
    /**
     * In case the FontVariant found by the `where` argument doesn't exist, create a new FontVariant with this data.
     */
    create: XOR<FontVariantCreateInput, FontVariantUncheckedCreateInput>
    /**
     * In case the FontVariant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FontVariantUpdateInput, FontVariantUncheckedUpdateInput>
  }

  /**
   * FontVariant delete
   */
  export type FontVariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
    /**
     * Filter which FontVariant to delete.
     */
    where: FontVariantWhereUniqueInput
  }

  /**
   * FontVariant deleteMany
   */
  export type FontVariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FontVariants to delete
     */
    where?: FontVariantWhereInput
    /**
     * Limit how many FontVariants to delete.
     */
    limit?: number
  }

  /**
   * FontVariant without action
   */
  export type FontVariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
  }


  /**
   * Model Ingredient
   */

  export type AggregateIngredient = {
    _count: IngredientCountAggregateOutputType | null
    _avg: IngredientAvgAggregateOutputType | null
    _sum: IngredientSumAggregateOutputType | null
    _min: IngredientMinAggregateOutputType | null
    _max: IngredientMaxAggregateOutputType | null
  }

  export type IngredientAvgAggregateOutputType = {
    userRating: number | null
    userRatingsCount: number | null
  }

  export type IngredientSumAggregateOutputType = {
    userRating: number | null
    userRatingsCount: number | null
  }

  export type IngredientMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    category: string | null
    creator: string | null
    rating: string | null
    symbol: string | null
    formula: string | null
    importedFrom: string | null
    licenseType: string | null
    isVariable: boolean | null
    userRating: number | null
    userRatingsCount: number | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IngredientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    category: string | null
    creator: string | null
    rating: string | null
    symbol: string | null
    formula: string | null
    importedFrom: string | null
    licenseType: string | null
    isVariable: boolean | null
    userRating: number | null
    userRatingsCount: number | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IngredientCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    category: number
    creator: number
    rating: number
    symbol: number
    formula: number
    importedFrom: number
    licenseType: number
    isVariable: number
    userRating: number
    userRatingsCount: number
    authorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IngredientAvgAggregateInputType = {
    userRating?: true
    userRatingsCount?: true
  }

  export type IngredientSumAggregateInputType = {
    userRating?: true
    userRatingsCount?: true
  }

  export type IngredientMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    category?: true
    creator?: true
    rating?: true
    symbol?: true
    formula?: true
    importedFrom?: true
    licenseType?: true
    isVariable?: true
    userRating?: true
    userRatingsCount?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IngredientMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    category?: true
    creator?: true
    rating?: true
    symbol?: true
    formula?: true
    importedFrom?: true
    licenseType?: true
    isVariable?: true
    userRating?: true
    userRatingsCount?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IngredientCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    category?: true
    creator?: true
    rating?: true
    symbol?: true
    formula?: true
    importedFrom?: true
    licenseType?: true
    isVariable?: true
    userRating?: true
    userRatingsCount?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IngredientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredient to aggregate.
     */
    where?: IngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: IngredientOrderByWithRelationInput | IngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ingredients
    **/
    _count?: true | IngredientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IngredientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IngredientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IngredientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IngredientMaxAggregateInputType
  }

  export type GetIngredientAggregateType<T extends IngredientAggregateArgs> = {
        [P in keyof T & keyof AggregateIngredient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIngredient[P]>
      : GetScalarType<T[P], AggregateIngredient[P]>
  }




  export type IngredientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngredientWhereInput
    orderBy?: IngredientOrderByWithAggregationInput | IngredientOrderByWithAggregationInput[]
    by: IngredientScalarFieldEnum[] | IngredientScalarFieldEnum
    having?: IngredientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IngredientCountAggregateInputType | true
    _avg?: IngredientAvgAggregateInputType
    _sum?: IngredientSumAggregateInputType
    _min?: IngredientMinAggregateInputType
    _max?: IngredientMaxAggregateInputType
  }

  export type IngredientGroupByOutputType = {
    id: string
    name: string
    slug: string
    category: string
    creator: string | null
    rating: string
    symbol: string | null
    formula: string | null
    importedFrom: string | null
    licenseType: string | null
    isVariable: boolean
    userRating: number | null
    userRatingsCount: number | null
    authorId: string | null
    createdAt: Date
    updatedAt: Date
    _count: IngredientCountAggregateOutputType | null
    _avg: IngredientAvgAggregateOutputType | null
    _sum: IngredientSumAggregateOutputType | null
    _min: IngredientMinAggregateOutputType | null
    _max: IngredientMaxAggregateOutputType | null
  }

  type GetIngredientGroupByPayload<T extends IngredientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IngredientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IngredientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IngredientGroupByOutputType[P]>
            : GetScalarType<T[P], IngredientGroupByOutputType[P]>
        }
      >
    >


  export type IngredientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    category?: boolean
    creator?: boolean
    rating?: boolean
    symbol?: boolean
    formula?: boolean
    importedFrom?: boolean
    licenseType?: boolean
    isVariable?: boolean
    userRating?: boolean
    userRatingsCount?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | Ingredient$authorArgs<ExtArgs>
    variants?: boolean | Ingredient$variantsArgs<ExtArgs>
    formulas?: boolean | Ingredient$formulasArgs<ExtArgs>
    primaryPrescriptions?: boolean | Ingredient$primaryPrescriptionsArgs<ExtArgs>
    secondaryPrescriptions?: boolean | Ingredient$secondaryPrescriptionsArgs<ExtArgs>
    tags?: boolean | Ingredient$tagsArgs<ExtArgs>
    posts?: boolean | Ingredient$postsArgs<ExtArgs>
    _count?: boolean | IngredientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingredient"]>

  export type IngredientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    category?: boolean
    creator?: boolean
    rating?: boolean
    symbol?: boolean
    formula?: boolean
    importedFrom?: boolean
    licenseType?: boolean
    isVariable?: boolean
    userRating?: boolean
    userRatingsCount?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | Ingredient$authorArgs<ExtArgs>
  }, ExtArgs["result"]["ingredient"]>

  export type IngredientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    category?: boolean
    creator?: boolean
    rating?: boolean
    symbol?: boolean
    formula?: boolean
    importedFrom?: boolean
    licenseType?: boolean
    isVariable?: boolean
    userRating?: boolean
    userRatingsCount?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | Ingredient$authorArgs<ExtArgs>
  }, ExtArgs["result"]["ingredient"]>

  export type IngredientSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    category?: boolean
    creator?: boolean
    rating?: boolean
    symbol?: boolean
    formula?: boolean
    importedFrom?: boolean
    licenseType?: boolean
    isVariable?: boolean
    userRating?: boolean
    userRatingsCount?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IngredientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "category" | "creator" | "rating" | "symbol" | "formula" | "importedFrom" | "licenseType" | "isVariable" | "userRating" | "userRatingsCount" | "authorId" | "createdAt" | "updatedAt", ExtArgs["result"]["ingredient"]>
  export type IngredientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | Ingredient$authorArgs<ExtArgs>
    variants?: boolean | Ingredient$variantsArgs<ExtArgs>
    formulas?: boolean | Ingredient$formulasArgs<ExtArgs>
    primaryPrescriptions?: boolean | Ingredient$primaryPrescriptionsArgs<ExtArgs>
    secondaryPrescriptions?: boolean | Ingredient$secondaryPrescriptionsArgs<ExtArgs>
    tags?: boolean | Ingredient$tagsArgs<ExtArgs>
    posts?: boolean | Ingredient$postsArgs<ExtArgs>
    _count?: boolean | IngredientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type IngredientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | Ingredient$authorArgs<ExtArgs>
  }
  export type IngredientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | Ingredient$authorArgs<ExtArgs>
  }

  export type $IngredientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ingredient"
    objects: {
      author: Prisma.$FontAuthorPayload<ExtArgs> | null
      variants: Prisma.$FontVariantPayload<ExtArgs>[]
      formulas: Prisma.$FormulaPayload<ExtArgs>[]
      primaryPrescriptions: Prisma.$PrescriptionPayload<ExtArgs>[]
      secondaryPrescriptions: Prisma.$PrescriptionPayload<ExtArgs>[]
      tags: Prisma.$TagPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      category: string
      creator: string | null
      rating: string
      symbol: string | null
      formula: string | null
      importedFrom: string | null
      licenseType: string | null
      isVariable: boolean
      userRating: number | null
      userRatingsCount: number | null
      authorId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ingredient"]>
    composites: {}
  }

  type IngredientGetPayload<S extends boolean | null | undefined | IngredientDefaultArgs> = $Result.GetResult<Prisma.$IngredientPayload, S>

  type IngredientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IngredientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IngredientCountAggregateInputType | true
    }

  export interface IngredientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ingredient'], meta: { name: 'Ingredient' } }
    /**
     * Find zero or one Ingredient that matches the filter.
     * @param {IngredientFindUniqueArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IngredientFindUniqueArgs>(args: SelectSubset<T, IngredientFindUniqueArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ingredient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IngredientFindUniqueOrThrowArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IngredientFindUniqueOrThrowArgs>(args: SelectSubset<T, IngredientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ingredient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientFindFirstArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IngredientFindFirstArgs>(args?: SelectSubset<T, IngredientFindFirstArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ingredient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientFindFirstOrThrowArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IngredientFindFirstOrThrowArgs>(args?: SelectSubset<T, IngredientFindFirstOrThrowArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ingredients
     * const ingredients = await prisma.ingredient.findMany()
     * 
     * // Get first 10 Ingredients
     * const ingredients = await prisma.ingredient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ingredientWithIdOnly = await prisma.ingredient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IngredientFindManyArgs>(args?: SelectSubset<T, IngredientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ingredient.
     * @param {IngredientCreateArgs} args - Arguments to create a Ingredient.
     * @example
     * // Create one Ingredient
     * const Ingredient = await prisma.ingredient.create({
     *   data: {
     *     // ... data to create a Ingredient
     *   }
     * })
     * 
     */
    create<T extends IngredientCreateArgs>(args: SelectSubset<T, IngredientCreateArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ingredients.
     * @param {IngredientCreateManyArgs} args - Arguments to create many Ingredients.
     * @example
     * // Create many Ingredients
     * const ingredient = await prisma.ingredient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IngredientCreateManyArgs>(args?: SelectSubset<T, IngredientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ingredients and returns the data saved in the database.
     * @param {IngredientCreateManyAndReturnArgs} args - Arguments to create many Ingredients.
     * @example
     * // Create many Ingredients
     * const ingredient = await prisma.ingredient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ingredients and only return the `id`
     * const ingredientWithIdOnly = await prisma.ingredient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IngredientCreateManyAndReturnArgs>(args?: SelectSubset<T, IngredientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ingredient.
     * @param {IngredientDeleteArgs} args - Arguments to delete one Ingredient.
     * @example
     * // Delete one Ingredient
     * const Ingredient = await prisma.ingredient.delete({
     *   where: {
     *     // ... filter to delete one Ingredient
     *   }
     * })
     * 
     */
    delete<T extends IngredientDeleteArgs>(args: SelectSubset<T, IngredientDeleteArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ingredient.
     * @param {IngredientUpdateArgs} args - Arguments to update one Ingredient.
     * @example
     * // Update one Ingredient
     * const ingredient = await prisma.ingredient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IngredientUpdateArgs>(args: SelectSubset<T, IngredientUpdateArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ingredients.
     * @param {IngredientDeleteManyArgs} args - Arguments to filter Ingredients to delete.
     * @example
     * // Delete a few Ingredients
     * const { count } = await prisma.ingredient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IngredientDeleteManyArgs>(args?: SelectSubset<T, IngredientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ingredients
     * const ingredient = await prisma.ingredient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IngredientUpdateManyArgs>(args: SelectSubset<T, IngredientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ingredients and returns the data updated in the database.
     * @param {IngredientUpdateManyAndReturnArgs} args - Arguments to update many Ingredients.
     * @example
     * // Update many Ingredients
     * const ingredient = await prisma.ingredient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ingredients and only return the `id`
     * const ingredientWithIdOnly = await prisma.ingredient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IngredientUpdateManyAndReturnArgs>(args: SelectSubset<T, IngredientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ingredient.
     * @param {IngredientUpsertArgs} args - Arguments to update or create a Ingredient.
     * @example
     * // Update or create a Ingredient
     * const ingredient = await prisma.ingredient.upsert({
     *   create: {
     *     // ... data to create a Ingredient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ingredient we want to update
     *   }
     * })
     */
    upsert<T extends IngredientUpsertArgs>(args: SelectSubset<T, IngredientUpsertArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientCountArgs} args - Arguments to filter Ingredients to count.
     * @example
     * // Count the number of Ingredients
     * const count = await prisma.ingredient.count({
     *   where: {
     *     // ... the filter for the Ingredients we want to count
     *   }
     * })
    **/
    count<T extends IngredientCountArgs>(
      args?: Subset<T, IngredientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IngredientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ingredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IngredientAggregateArgs>(args: Subset<T, IngredientAggregateArgs>): Prisma.PrismaPromise<GetIngredientAggregateType<T>>

    /**
     * Group by Ingredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IngredientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IngredientGroupByArgs['orderBy'] }
        : { orderBy?: IngredientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IngredientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ingredient model
   */
  readonly fields: IngredientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingredient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IngredientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends Ingredient$authorArgs<ExtArgs> = {}>(args?: Subset<T, Ingredient$authorArgs<ExtArgs>>): Prisma__FontAuthorClient<$Result.GetResult<Prisma.$FontAuthorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    variants<T extends Ingredient$variantsArgs<ExtArgs> = {}>(args?: Subset<T, Ingredient$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FontVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    formulas<T extends Ingredient$formulasArgs<ExtArgs> = {}>(args?: Subset<T, Ingredient$formulasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    primaryPrescriptions<T extends Ingredient$primaryPrescriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Ingredient$primaryPrescriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    secondaryPrescriptions<T extends Ingredient$secondaryPrescriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Ingredient$secondaryPrescriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends Ingredient$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Ingredient$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends Ingredient$postsArgs<ExtArgs> = {}>(args?: Subset<T, Ingredient$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ingredient model
   */
  interface IngredientFieldRefs {
    readonly id: FieldRef<"Ingredient", 'String'>
    readonly name: FieldRef<"Ingredient", 'String'>
    readonly slug: FieldRef<"Ingredient", 'String'>
    readonly category: FieldRef<"Ingredient", 'String'>
    readonly creator: FieldRef<"Ingredient", 'String'>
    readonly rating: FieldRef<"Ingredient", 'String'>
    readonly symbol: FieldRef<"Ingredient", 'String'>
    readonly formula: FieldRef<"Ingredient", 'String'>
    readonly importedFrom: FieldRef<"Ingredient", 'String'>
    readonly licenseType: FieldRef<"Ingredient", 'String'>
    readonly isVariable: FieldRef<"Ingredient", 'Boolean'>
    readonly userRating: FieldRef<"Ingredient", 'Float'>
    readonly userRatingsCount: FieldRef<"Ingredient", 'Int'>
    readonly authorId: FieldRef<"Ingredient", 'String'>
    readonly createdAt: FieldRef<"Ingredient", 'DateTime'>
    readonly updatedAt: FieldRef<"Ingredient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ingredient findUnique
   */
  export type IngredientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    /**
     * Filter, which Ingredient to fetch.
     */
    where: IngredientWhereUniqueInput
  }

  /**
   * Ingredient findUniqueOrThrow
   */
  export type IngredientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    /**
     * Filter, which Ingredient to fetch.
     */
    where: IngredientWhereUniqueInput
  }

  /**
   * Ingredient findFirst
   */
  export type IngredientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    /**
     * Filter, which Ingredient to fetch.
     */
    where?: IngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: IngredientOrderByWithRelationInput | IngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredients.
     */
    cursor?: IngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredients.
     */
    distinct?: IngredientScalarFieldEnum | IngredientScalarFieldEnum[]
  }

  /**
   * Ingredient findFirstOrThrow
   */
  export type IngredientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    /**
     * Filter, which Ingredient to fetch.
     */
    where?: IngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: IngredientOrderByWithRelationInput | IngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredients.
     */
    cursor?: IngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredients.
     */
    distinct?: IngredientScalarFieldEnum | IngredientScalarFieldEnum[]
  }

  /**
   * Ingredient findMany
   */
  export type IngredientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients to fetch.
     */
    where?: IngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: IngredientOrderByWithRelationInput | IngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ingredients.
     */
    cursor?: IngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     */
    skip?: number
    distinct?: IngredientScalarFieldEnum | IngredientScalarFieldEnum[]
  }

  /**
   * Ingredient create
   */
  export type IngredientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    /**
     * The data needed to create a Ingredient.
     */
    data: XOR<IngredientCreateInput, IngredientUncheckedCreateInput>
  }

  /**
   * Ingredient createMany
   */
  export type IngredientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ingredients.
     */
    data: IngredientCreateManyInput | IngredientCreateManyInput[]
  }

  /**
   * Ingredient createManyAndReturn
   */
  export type IngredientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * The data used to create many Ingredients.
     */
    data: IngredientCreateManyInput | IngredientCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ingredient update
   */
  export type IngredientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    /**
     * The data needed to update a Ingredient.
     */
    data: XOR<IngredientUpdateInput, IngredientUncheckedUpdateInput>
    /**
     * Choose, which Ingredient to update.
     */
    where: IngredientWhereUniqueInput
  }

  /**
   * Ingredient updateMany
   */
  export type IngredientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ingredients.
     */
    data: XOR<IngredientUpdateManyMutationInput, IngredientUncheckedUpdateManyInput>
    /**
     * Filter which Ingredients to update
     */
    where?: IngredientWhereInput
    /**
     * Limit how many Ingredients to update.
     */
    limit?: number
  }

  /**
   * Ingredient updateManyAndReturn
   */
  export type IngredientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * The data used to update Ingredients.
     */
    data: XOR<IngredientUpdateManyMutationInput, IngredientUncheckedUpdateManyInput>
    /**
     * Filter which Ingredients to update
     */
    where?: IngredientWhereInput
    /**
     * Limit how many Ingredients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ingredient upsert
   */
  export type IngredientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    /**
     * The filter to search for the Ingredient to update in case it exists.
     */
    where: IngredientWhereUniqueInput
    /**
     * In case the Ingredient found by the `where` argument doesn't exist, create a new Ingredient with this data.
     */
    create: XOR<IngredientCreateInput, IngredientUncheckedCreateInput>
    /**
     * In case the Ingredient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IngredientUpdateInput, IngredientUncheckedUpdateInput>
  }

  /**
   * Ingredient delete
   */
  export type IngredientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    /**
     * Filter which Ingredient to delete.
     */
    where: IngredientWhereUniqueInput
  }

  /**
   * Ingredient deleteMany
   */
  export type IngredientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredients to delete
     */
    where?: IngredientWhereInput
    /**
     * Limit how many Ingredients to delete.
     */
    limit?: number
  }

  /**
   * Ingredient.author
   */
  export type Ingredient$authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontAuthor
     */
    select?: FontAuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontAuthor
     */
    omit?: FontAuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontAuthorInclude<ExtArgs> | null
    where?: FontAuthorWhereInput
  }

  /**
   * Ingredient.variants
   */
  export type Ingredient$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FontVariant
     */
    select?: FontVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FontVariant
     */
    omit?: FontVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FontVariantInclude<ExtArgs> | null
    where?: FontVariantWhereInput
    orderBy?: FontVariantOrderByWithRelationInput | FontVariantOrderByWithRelationInput[]
    cursor?: FontVariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FontVariantScalarFieldEnum | FontVariantScalarFieldEnum[]
  }

  /**
   * Ingredient.formulas
   */
  export type Ingredient$formulasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    where?: FormulaWhereInput
    orderBy?: FormulaOrderByWithRelationInput | FormulaOrderByWithRelationInput[]
    cursor?: FormulaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormulaScalarFieldEnum | FormulaScalarFieldEnum[]
  }

  /**
   * Ingredient.primaryPrescriptions
   */
  export type Ingredient$primaryPrescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    cursor?: PrescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Ingredient.secondaryPrescriptions
   */
  export type Ingredient$secondaryPrescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    cursor?: PrescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Ingredient.tags
   */
  export type Ingredient$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Ingredient.posts
   */
  export type Ingredient$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Ingredient without action
   */
  export type IngredientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
  }


  /**
   * Model Formula
   */

  export type AggregateFormula = {
    _count: FormulaCountAggregateOutputType | null
    _min: FormulaMinAggregateOutputType | null
    _max: FormulaMaxAggregateOutputType | null
  }

  export type FormulaMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    slug: string | null
    fontCategory: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormulaMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    slug: string | null
    fontCategory: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormulaCountAggregateOutputType = {
    id: number
    name: number
    description: number
    slug: number
    fontCategory: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FormulaMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    slug?: true
    fontCategory?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormulaMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    slug?: true
    fontCategory?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormulaCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    slug?: true
    fontCategory?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FormulaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Formula to aggregate.
     */
    where?: FormulaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formulas to fetch.
     */
    orderBy?: FormulaOrderByWithRelationInput | FormulaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormulaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formulas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formulas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Formulas
    **/
    _count?: true | FormulaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormulaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormulaMaxAggregateInputType
  }

  export type GetFormulaAggregateType<T extends FormulaAggregateArgs> = {
        [P in keyof T & keyof AggregateFormula]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormula[P]>
      : GetScalarType<T[P], AggregateFormula[P]>
  }




  export type FormulaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormulaWhereInput
    orderBy?: FormulaOrderByWithAggregationInput | FormulaOrderByWithAggregationInput[]
    by: FormulaScalarFieldEnum[] | FormulaScalarFieldEnum
    having?: FormulaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormulaCountAggregateInputType | true
    _min?: FormulaMinAggregateInputType
    _max?: FormulaMaxAggregateInputType
  }

  export type FormulaGroupByOutputType = {
    id: string
    name: string
    description: string | null
    slug: string
    fontCategory: string
    createdAt: Date
    updatedAt: Date
    _count: FormulaCountAggregateOutputType | null
    _min: FormulaMinAggregateOutputType | null
    _max: FormulaMaxAggregateOutputType | null
  }

  type GetFormulaGroupByPayload<T extends FormulaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormulaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormulaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormulaGroupByOutputType[P]>
            : GetScalarType<T[P], FormulaGroupByOutputType[P]>
        }
      >
    >


  export type FormulaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    slug?: boolean
    fontCategory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fonts?: boolean | Formula$fontsArgs<ExtArgs>
    tags?: boolean | Formula$tagsArgs<ExtArgs>
    _count?: boolean | FormulaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formula"]>

  export type FormulaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    slug?: boolean
    fontCategory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["formula"]>

  export type FormulaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    slug?: boolean
    fontCategory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["formula"]>

  export type FormulaSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    slug?: boolean
    fontCategory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FormulaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "slug" | "fontCategory" | "createdAt" | "updatedAt", ExtArgs["result"]["formula"]>
  export type FormulaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fonts?: boolean | Formula$fontsArgs<ExtArgs>
    tags?: boolean | Formula$tagsArgs<ExtArgs>
    _count?: boolean | FormulaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FormulaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FormulaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FormulaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Formula"
    objects: {
      fonts: Prisma.$IngredientPayload<ExtArgs>[]
      tags: Prisma.$TagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      slug: string
      fontCategory: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["formula"]>
    composites: {}
  }

  type FormulaGetPayload<S extends boolean | null | undefined | FormulaDefaultArgs> = $Result.GetResult<Prisma.$FormulaPayload, S>

  type FormulaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormulaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormulaCountAggregateInputType | true
    }

  export interface FormulaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Formula'], meta: { name: 'Formula' } }
    /**
     * Find zero or one Formula that matches the filter.
     * @param {FormulaFindUniqueArgs} args - Arguments to find a Formula
     * @example
     * // Get one Formula
     * const formula = await prisma.formula.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormulaFindUniqueArgs>(args: SelectSubset<T, FormulaFindUniqueArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Formula that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormulaFindUniqueOrThrowArgs} args - Arguments to find a Formula
     * @example
     * // Get one Formula
     * const formula = await prisma.formula.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormulaFindUniqueOrThrowArgs>(args: SelectSubset<T, FormulaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formula that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaFindFirstArgs} args - Arguments to find a Formula
     * @example
     * // Get one Formula
     * const formula = await prisma.formula.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormulaFindFirstArgs>(args?: SelectSubset<T, FormulaFindFirstArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formula that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaFindFirstOrThrowArgs} args - Arguments to find a Formula
     * @example
     * // Get one Formula
     * const formula = await prisma.formula.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormulaFindFirstOrThrowArgs>(args?: SelectSubset<T, FormulaFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Formulas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Formulas
     * const formulas = await prisma.formula.findMany()
     * 
     * // Get first 10 Formulas
     * const formulas = await prisma.formula.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formulaWithIdOnly = await prisma.formula.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormulaFindManyArgs>(args?: SelectSubset<T, FormulaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Formula.
     * @param {FormulaCreateArgs} args - Arguments to create a Formula.
     * @example
     * // Create one Formula
     * const Formula = await prisma.formula.create({
     *   data: {
     *     // ... data to create a Formula
     *   }
     * })
     * 
     */
    create<T extends FormulaCreateArgs>(args: SelectSubset<T, FormulaCreateArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Formulas.
     * @param {FormulaCreateManyArgs} args - Arguments to create many Formulas.
     * @example
     * // Create many Formulas
     * const formula = await prisma.formula.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormulaCreateManyArgs>(args?: SelectSubset<T, FormulaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Formulas and returns the data saved in the database.
     * @param {FormulaCreateManyAndReturnArgs} args - Arguments to create many Formulas.
     * @example
     * // Create many Formulas
     * const formula = await prisma.formula.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Formulas and only return the `id`
     * const formulaWithIdOnly = await prisma.formula.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FormulaCreateManyAndReturnArgs>(args?: SelectSubset<T, FormulaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Formula.
     * @param {FormulaDeleteArgs} args - Arguments to delete one Formula.
     * @example
     * // Delete one Formula
     * const Formula = await prisma.formula.delete({
     *   where: {
     *     // ... filter to delete one Formula
     *   }
     * })
     * 
     */
    delete<T extends FormulaDeleteArgs>(args: SelectSubset<T, FormulaDeleteArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Formula.
     * @param {FormulaUpdateArgs} args - Arguments to update one Formula.
     * @example
     * // Update one Formula
     * const formula = await prisma.formula.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormulaUpdateArgs>(args: SelectSubset<T, FormulaUpdateArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Formulas.
     * @param {FormulaDeleteManyArgs} args - Arguments to filter Formulas to delete.
     * @example
     * // Delete a few Formulas
     * const { count } = await prisma.formula.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormulaDeleteManyArgs>(args?: SelectSubset<T, FormulaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formulas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Formulas
     * const formula = await prisma.formula.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormulaUpdateManyArgs>(args: SelectSubset<T, FormulaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formulas and returns the data updated in the database.
     * @param {FormulaUpdateManyAndReturnArgs} args - Arguments to update many Formulas.
     * @example
     * // Update many Formulas
     * const formula = await prisma.formula.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Formulas and only return the `id`
     * const formulaWithIdOnly = await prisma.formula.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FormulaUpdateManyAndReturnArgs>(args: SelectSubset<T, FormulaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Formula.
     * @param {FormulaUpsertArgs} args - Arguments to update or create a Formula.
     * @example
     * // Update or create a Formula
     * const formula = await prisma.formula.upsert({
     *   create: {
     *     // ... data to create a Formula
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Formula we want to update
     *   }
     * })
     */
    upsert<T extends FormulaUpsertArgs>(args: SelectSubset<T, FormulaUpsertArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Formulas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaCountArgs} args - Arguments to filter Formulas to count.
     * @example
     * // Count the number of Formulas
     * const count = await prisma.formula.count({
     *   where: {
     *     // ... the filter for the Formulas we want to count
     *   }
     * })
    **/
    count<T extends FormulaCountArgs>(
      args?: Subset<T, FormulaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormulaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Formula.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormulaAggregateArgs>(args: Subset<T, FormulaAggregateArgs>): Prisma.PrismaPromise<GetFormulaAggregateType<T>>

    /**
     * Group by Formula.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FormulaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormulaGroupByArgs['orderBy'] }
        : { orderBy?: FormulaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FormulaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormulaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Formula model
   */
  readonly fields: FormulaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Formula.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormulaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fonts<T extends Formula$fontsArgs<ExtArgs> = {}>(args?: Subset<T, Formula$fontsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends Formula$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Formula$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Formula model
   */
  interface FormulaFieldRefs {
    readonly id: FieldRef<"Formula", 'String'>
    readonly name: FieldRef<"Formula", 'String'>
    readonly description: FieldRef<"Formula", 'String'>
    readonly slug: FieldRef<"Formula", 'String'>
    readonly fontCategory: FieldRef<"Formula", 'String'>
    readonly createdAt: FieldRef<"Formula", 'DateTime'>
    readonly updatedAt: FieldRef<"Formula", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Formula findUnique
   */
  export type FormulaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter, which Formula to fetch.
     */
    where: FormulaWhereUniqueInput
  }

  /**
   * Formula findUniqueOrThrow
   */
  export type FormulaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter, which Formula to fetch.
     */
    where: FormulaWhereUniqueInput
  }

  /**
   * Formula findFirst
   */
  export type FormulaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter, which Formula to fetch.
     */
    where?: FormulaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formulas to fetch.
     */
    orderBy?: FormulaOrderByWithRelationInput | FormulaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Formulas.
     */
    cursor?: FormulaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formulas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formulas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formulas.
     */
    distinct?: FormulaScalarFieldEnum | FormulaScalarFieldEnum[]
  }

  /**
   * Formula findFirstOrThrow
   */
  export type FormulaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter, which Formula to fetch.
     */
    where?: FormulaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formulas to fetch.
     */
    orderBy?: FormulaOrderByWithRelationInput | FormulaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Formulas.
     */
    cursor?: FormulaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formulas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formulas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formulas.
     */
    distinct?: FormulaScalarFieldEnum | FormulaScalarFieldEnum[]
  }

  /**
   * Formula findMany
   */
  export type FormulaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter, which Formulas to fetch.
     */
    where?: FormulaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formulas to fetch.
     */
    orderBy?: FormulaOrderByWithRelationInput | FormulaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Formulas.
     */
    cursor?: FormulaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formulas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formulas.
     */
    skip?: number
    distinct?: FormulaScalarFieldEnum | FormulaScalarFieldEnum[]
  }

  /**
   * Formula create
   */
  export type FormulaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * The data needed to create a Formula.
     */
    data: XOR<FormulaCreateInput, FormulaUncheckedCreateInput>
  }

  /**
   * Formula createMany
   */
  export type FormulaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Formulas.
     */
    data: FormulaCreateManyInput | FormulaCreateManyInput[]
  }

  /**
   * Formula createManyAndReturn
   */
  export type FormulaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * The data used to create many Formulas.
     */
    data: FormulaCreateManyInput | FormulaCreateManyInput[]
  }

  /**
   * Formula update
   */
  export type FormulaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * The data needed to update a Formula.
     */
    data: XOR<FormulaUpdateInput, FormulaUncheckedUpdateInput>
    /**
     * Choose, which Formula to update.
     */
    where: FormulaWhereUniqueInput
  }

  /**
   * Formula updateMany
   */
  export type FormulaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Formulas.
     */
    data: XOR<FormulaUpdateManyMutationInput, FormulaUncheckedUpdateManyInput>
    /**
     * Filter which Formulas to update
     */
    where?: FormulaWhereInput
    /**
     * Limit how many Formulas to update.
     */
    limit?: number
  }

  /**
   * Formula updateManyAndReturn
   */
  export type FormulaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * The data used to update Formulas.
     */
    data: XOR<FormulaUpdateManyMutationInput, FormulaUncheckedUpdateManyInput>
    /**
     * Filter which Formulas to update
     */
    where?: FormulaWhereInput
    /**
     * Limit how many Formulas to update.
     */
    limit?: number
  }

  /**
   * Formula upsert
   */
  export type FormulaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * The filter to search for the Formula to update in case it exists.
     */
    where: FormulaWhereUniqueInput
    /**
     * In case the Formula found by the `where` argument doesn't exist, create a new Formula with this data.
     */
    create: XOR<FormulaCreateInput, FormulaUncheckedCreateInput>
    /**
     * In case the Formula was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormulaUpdateInput, FormulaUncheckedUpdateInput>
  }

  /**
   * Formula delete
   */
  export type FormulaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter which Formula to delete.
     */
    where: FormulaWhereUniqueInput
  }

  /**
   * Formula deleteMany
   */
  export type FormulaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Formulas to delete
     */
    where?: FormulaWhereInput
    /**
     * Limit how many Formulas to delete.
     */
    limit?: number
  }

  /**
   * Formula.fonts
   */
  export type Formula$fontsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    where?: IngredientWhereInput
    orderBy?: IngredientOrderByWithRelationInput | IngredientOrderByWithRelationInput[]
    cursor?: IngredientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IngredientScalarFieldEnum | IngredientScalarFieldEnum[]
  }

  /**
   * Formula.tags
   */
  export type Formula$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Formula without action
   */
  export type FormulaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
  }


  /**
   * Model Prescription
   */

  export type AggregatePrescription = {
    _count: PrescriptionCountAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  export type PrescriptionMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    imageUrl: string | null
    insight: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    primaryFontId: string | null
    secondaryFontId: string | null
    seoId: string | null
  }

  export type PrescriptionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    imageUrl: string | null
    insight: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    primaryFontId: string | null
    secondaryFontId: string | null
    seoId: string | null
  }

  export type PrescriptionCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    imageUrl: number
    insight: number
    published: number
    createdAt: number
    updatedAt: number
    primaryFontId: number
    secondaryFontId: number
    seoId: number
    _all: number
  }


  export type PrescriptionMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    imageUrl?: true
    insight?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    primaryFontId?: true
    secondaryFontId?: true
    seoId?: true
  }

  export type PrescriptionMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    imageUrl?: true
    insight?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    primaryFontId?: true
    secondaryFontId?: true
    seoId?: true
  }

  export type PrescriptionCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    imageUrl?: true
    insight?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    primaryFontId?: true
    secondaryFontId?: true
    seoId?: true
    _all?: true
  }

  export type PrescriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescription to aggregate.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prescriptions
    **/
    _count?: true | PrescriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrescriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrescriptionMaxAggregateInputType
  }

  export type GetPrescriptionAggregateType<T extends PrescriptionAggregateArgs> = {
        [P in keyof T & keyof AggregatePrescription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrescription[P]>
      : GetScalarType<T[P], AggregatePrescription[P]>
  }




  export type PrescriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithAggregationInput | PrescriptionOrderByWithAggregationInput[]
    by: PrescriptionScalarFieldEnum[] | PrescriptionScalarFieldEnum
    having?: PrescriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrescriptionCountAggregateInputType | true
    _min?: PrescriptionMinAggregateInputType
    _max?: PrescriptionMaxAggregateInputType
  }

  export type PrescriptionGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    imageUrl: string | null
    insight: string | null
    published: boolean
    createdAt: Date
    updatedAt: Date
    primaryFontId: string
    secondaryFontId: string
    seoId: string | null
    _count: PrescriptionCountAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  type GetPrescriptionGroupByPayload<T extends PrescriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrescriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrescriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
            : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
        }
      >
    >


  export type PrescriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    imageUrl?: boolean
    insight?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    primaryFontId?: boolean
    secondaryFontId?: boolean
    seoId?: boolean
    primaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    secondaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    tags?: boolean | Prescription$tagsArgs<ExtArgs>
    seo?: boolean | Prescription$seoArgs<ExtArgs>
    _count?: boolean | PrescriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    imageUrl?: boolean
    insight?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    primaryFontId?: boolean
    secondaryFontId?: boolean
    seoId?: boolean
    primaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    secondaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    seo?: boolean | Prescription$seoArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    imageUrl?: boolean
    insight?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    primaryFontId?: boolean
    secondaryFontId?: boolean
    seoId?: boolean
    primaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    secondaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    seo?: boolean | Prescription$seoArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    imageUrl?: boolean
    insight?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    primaryFontId?: boolean
    secondaryFontId?: boolean
    seoId?: boolean
  }

  export type PrescriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "imageUrl" | "insight" | "published" | "createdAt" | "updatedAt" | "primaryFontId" | "secondaryFontId" | "seoId", ExtArgs["result"]["prescription"]>
  export type PrescriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    primaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    secondaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    tags?: boolean | Prescription$tagsArgs<ExtArgs>
    seo?: boolean | Prescription$seoArgs<ExtArgs>
    _count?: boolean | PrescriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PrescriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    primaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    secondaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    seo?: boolean | Prescription$seoArgs<ExtArgs>
  }
  export type PrescriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    primaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    secondaryFont?: boolean | IngredientDefaultArgs<ExtArgs>
    seo?: boolean | Prescription$seoArgs<ExtArgs>
  }

  export type $PrescriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prescription"
    objects: {
      primaryFont: Prisma.$IngredientPayload<ExtArgs>
      secondaryFont: Prisma.$IngredientPayload<ExtArgs>
      tags: Prisma.$TagPayload<ExtArgs>[]
      seo: Prisma.$SeoModulePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      imageUrl: string | null
      insight: string | null
      published: boolean
      createdAt: Date
      updatedAt: Date
      primaryFontId: string
      secondaryFontId: string
      seoId: string | null
    }, ExtArgs["result"]["prescription"]>
    composites: {}
  }

  type PrescriptionGetPayload<S extends boolean | null | undefined | PrescriptionDefaultArgs> = $Result.GetResult<Prisma.$PrescriptionPayload, S>

  type PrescriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrescriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrescriptionCountAggregateInputType | true
    }

  export interface PrescriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prescription'], meta: { name: 'Prescription' } }
    /**
     * Find zero or one Prescription that matches the filter.
     * @param {PrescriptionFindUniqueArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrescriptionFindUniqueArgs>(args: SelectSubset<T, PrescriptionFindUniqueArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prescription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrescriptionFindUniqueOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrescriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, PrescriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrescriptionFindFirstArgs>(args?: SelectSubset<T, PrescriptionFindFirstArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrescriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, PrescriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prescriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prescriptions
     * const prescriptions = await prisma.prescription.findMany()
     * 
     * // Get first 10 Prescriptions
     * const prescriptions = await prisma.prescription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrescriptionFindManyArgs>(args?: SelectSubset<T, PrescriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prescription.
     * @param {PrescriptionCreateArgs} args - Arguments to create a Prescription.
     * @example
     * // Create one Prescription
     * const Prescription = await prisma.prescription.create({
     *   data: {
     *     // ... data to create a Prescription
     *   }
     * })
     * 
     */
    create<T extends PrescriptionCreateArgs>(args: SelectSubset<T, PrescriptionCreateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prescriptions.
     * @param {PrescriptionCreateManyArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrescriptionCreateManyArgs>(args?: SelectSubset<T, PrescriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prescriptions and returns the data saved in the database.
     * @param {PrescriptionCreateManyAndReturnArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prescriptions and only return the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrescriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, PrescriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Prescription.
     * @param {PrescriptionDeleteArgs} args - Arguments to delete one Prescription.
     * @example
     * // Delete one Prescription
     * const Prescription = await prisma.prescription.delete({
     *   where: {
     *     // ... filter to delete one Prescription
     *   }
     * })
     * 
     */
    delete<T extends PrescriptionDeleteArgs>(args: SelectSubset<T, PrescriptionDeleteArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prescription.
     * @param {PrescriptionUpdateArgs} args - Arguments to update one Prescription.
     * @example
     * // Update one Prescription
     * const prescription = await prisma.prescription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrescriptionUpdateArgs>(args: SelectSubset<T, PrescriptionUpdateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prescriptions.
     * @param {PrescriptionDeleteManyArgs} args - Arguments to filter Prescriptions to delete.
     * @example
     * // Delete a few Prescriptions
     * const { count } = await prisma.prescription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrescriptionDeleteManyArgs>(args?: SelectSubset<T, PrescriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrescriptionUpdateManyArgs>(args: SelectSubset<T, PrescriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions and returns the data updated in the database.
     * @param {PrescriptionUpdateManyAndReturnArgs} args - Arguments to update many Prescriptions.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prescriptions and only return the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PrescriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, PrescriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Prescription.
     * @param {PrescriptionUpsertArgs} args - Arguments to update or create a Prescription.
     * @example
     * // Update or create a Prescription
     * const prescription = await prisma.prescription.upsert({
     *   create: {
     *     // ... data to create a Prescription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prescription we want to update
     *   }
     * })
     */
    upsert<T extends PrescriptionUpsertArgs>(args: SelectSubset<T, PrescriptionUpsertArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionCountArgs} args - Arguments to filter Prescriptions to count.
     * @example
     * // Count the number of Prescriptions
     * const count = await prisma.prescription.count({
     *   where: {
     *     // ... the filter for the Prescriptions we want to count
     *   }
     * })
    **/
    count<T extends PrescriptionCountArgs>(
      args?: Subset<T, PrescriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrescriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrescriptionAggregateArgs>(args: Subset<T, PrescriptionAggregateArgs>): Prisma.PrismaPromise<GetPrescriptionAggregateType<T>>

    /**
     * Group by Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrescriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrescriptionGroupByArgs['orderBy'] }
        : { orderBy?: PrescriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrescriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrescriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prescription model
   */
  readonly fields: PrescriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prescription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrescriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    primaryFont<T extends IngredientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IngredientDefaultArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    secondaryFont<T extends IngredientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IngredientDefaultArgs<ExtArgs>>): Prisma__IngredientClient<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tags<T extends Prescription$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Prescription$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    seo<T extends Prescription$seoArgs<ExtArgs> = {}>(args?: Subset<T, Prescription$seoArgs<ExtArgs>>): Prisma__SeoModuleClient<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prescription model
   */
  interface PrescriptionFieldRefs {
    readonly id: FieldRef<"Prescription", 'String'>
    readonly name: FieldRef<"Prescription", 'String'>
    readonly slug: FieldRef<"Prescription", 'String'>
    readonly description: FieldRef<"Prescription", 'String'>
    readonly imageUrl: FieldRef<"Prescription", 'String'>
    readonly insight: FieldRef<"Prescription", 'String'>
    readonly published: FieldRef<"Prescription", 'Boolean'>
    readonly createdAt: FieldRef<"Prescription", 'DateTime'>
    readonly updatedAt: FieldRef<"Prescription", 'DateTime'>
    readonly primaryFontId: FieldRef<"Prescription", 'String'>
    readonly secondaryFontId: FieldRef<"Prescription", 'String'>
    readonly seoId: FieldRef<"Prescription", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Prescription findUnique
   */
  export type PrescriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findUniqueOrThrow
   */
  export type PrescriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findFirst
   */
  export type PrescriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findFirstOrThrow
   */
  export type PrescriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findMany
   */
  export type PrescriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescriptions to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription create
   */
  export type PrescriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Prescription.
     */
    data: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
  }

  /**
   * Prescription createMany
   */
  export type PrescriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
  }

  /**
   * Prescription createManyAndReturn
   */
  export type PrescriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prescription update
   */
  export type PrescriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Prescription.
     */
    data: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
    /**
     * Choose, which Prescription to update.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription updateMany
   */
  export type PrescriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prescriptions.
     */
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyInput>
    /**
     * Filter which Prescriptions to update
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to update.
     */
    limit?: number
  }

  /**
   * Prescription updateManyAndReturn
   */
  export type PrescriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * The data used to update Prescriptions.
     */
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyInput>
    /**
     * Filter which Prescriptions to update
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prescription upsert
   */
  export type PrescriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Prescription to update in case it exists.
     */
    where: PrescriptionWhereUniqueInput
    /**
     * In case the Prescription found by the `where` argument doesn't exist, create a new Prescription with this data.
     */
    create: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
    /**
     * In case the Prescription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
  }

  /**
   * Prescription delete
   */
  export type PrescriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter which Prescription to delete.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription deleteMany
   */
  export type PrescriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescriptions to delete
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to delete.
     */
    limit?: number
  }

  /**
   * Prescription.tags
   */
  export type Prescription$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Prescription.seo
   */
  export type Prescription$seoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    where?: SeoModuleWhereInput
  }

  /**
   * Prescription without action
   */
  export type PrescriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
  }


  /**
   * Model AdminSettings
   */

  export type AggregateAdminSettings = {
    _count: AdminSettingsCountAggregateOutputType | null
    _avg: AdminSettingsAvgAggregateOutputType | null
    _sum: AdminSettingsSumAggregateOutputType | null
    _min: AdminSettingsMinAggregateOutputType | null
    _max: AdminSettingsMaxAggregateOutputType | null
  }

  export type AdminSettingsAvgAggregateOutputType = {
    letterTFontSizePercent: number | null
    heroWordmarkLoopSpeed: number | null
    popupFrequencyDays: number | null
    smtpPort: number | null
    sessionTimeoutMinutes: number | null
    auditRetentionDays: number | null
  }

  export type AdminSettingsSumAggregateOutputType = {
    letterTFontSizePercent: number | null
    heroWordmarkLoopSpeed: number | null
    popupFrequencyDays: number | null
    smtpPort: number | null
    sessionTimeoutMinutes: number | null
    auditRetentionDays: number | null
  }

  export type AdminSettingsMinAggregateOutputType = {
    id: string | null
    siteLanguage: string | null
    siteTimezone: string | null
    maintenanceActive: boolean | null
    maintenanceMessage: string | null
    letterTFontFamily: string | null
    letterTFontSizePercent: number | null
    logoLightModeColor: string | null
    logoDarkModeColor: string | null
    heroWordmarkFonts: string | null
    heroWordmarkLoop: boolean | null
    heroWordmarkLoopSpeed: number | null
    marqueeActive: boolean | null
    marqueeText: string | null
    marqueeType: string | null
    marqueeTextColor: string | null
    marqueeBgColor: string | null
    popupActive: boolean | null
    popupImageUrl: string | null
    popupHeadline: string | null
    popupMessage: string | null
    popupCtaLabel: string | null
    popupCtaLink: string | null
    popupFrequency: string | null
    popupFrequencyDays: number | null
    emailProvider: string | null
    gmailClientId: string | null
    gmailClientSecret: string | null
    gmailSenderName: string | null
    gmailConnected: boolean | null
    gmailConnectedEmail: string | null
    gmailRefreshToken: string | null
    smtpHost: string | null
    smtpPort: number | null
    smtpUser: string | null
    smtpPassword: string | null
    smtpSecure: boolean | null
    smtpFromEmail: string | null
    smtpFromName: string | null
    smtpAuthType: string | null
    smtpOauthClientId: string | null
    smtpOauthClientSecret: string | null
    smtpOauthRefreshToken: string | null
    smtpOauthAccessUrl: string | null
    resendApiKey: string | null
    resendFromEmail: string | null
    resendFromName: string | null
    credentialsVault: string | null
    integrationsConfig: string | null
    notificationChannels: string | null
    slackWebhookUrl: string | null
    require2fa: boolean | null
    sessionTimeoutMinutes: number | null
    ipAllowlist: string | null
    auditRetentionDays: number | null
    cookieBannerActive: boolean | null
    cookieBannerText: string | null
    privacyPolicyUrl: string | null
    termsOfServiceUrl: string | null
    gdprRequestEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminSettingsMaxAggregateOutputType = {
    id: string | null
    siteLanguage: string | null
    siteTimezone: string | null
    maintenanceActive: boolean | null
    maintenanceMessage: string | null
    letterTFontFamily: string | null
    letterTFontSizePercent: number | null
    logoLightModeColor: string | null
    logoDarkModeColor: string | null
    heroWordmarkFonts: string | null
    heroWordmarkLoop: boolean | null
    heroWordmarkLoopSpeed: number | null
    marqueeActive: boolean | null
    marqueeText: string | null
    marqueeType: string | null
    marqueeTextColor: string | null
    marqueeBgColor: string | null
    popupActive: boolean | null
    popupImageUrl: string | null
    popupHeadline: string | null
    popupMessage: string | null
    popupCtaLabel: string | null
    popupCtaLink: string | null
    popupFrequency: string | null
    popupFrequencyDays: number | null
    emailProvider: string | null
    gmailClientId: string | null
    gmailClientSecret: string | null
    gmailSenderName: string | null
    gmailConnected: boolean | null
    gmailConnectedEmail: string | null
    gmailRefreshToken: string | null
    smtpHost: string | null
    smtpPort: number | null
    smtpUser: string | null
    smtpPassword: string | null
    smtpSecure: boolean | null
    smtpFromEmail: string | null
    smtpFromName: string | null
    smtpAuthType: string | null
    smtpOauthClientId: string | null
    smtpOauthClientSecret: string | null
    smtpOauthRefreshToken: string | null
    smtpOauthAccessUrl: string | null
    resendApiKey: string | null
    resendFromEmail: string | null
    resendFromName: string | null
    credentialsVault: string | null
    integrationsConfig: string | null
    notificationChannels: string | null
    slackWebhookUrl: string | null
    require2fa: boolean | null
    sessionTimeoutMinutes: number | null
    ipAllowlist: string | null
    auditRetentionDays: number | null
    cookieBannerActive: boolean | null
    cookieBannerText: string | null
    privacyPolicyUrl: string | null
    termsOfServiceUrl: string | null
    gdprRequestEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminSettingsCountAggregateOutputType = {
    id: number
    siteLanguage: number
    siteTimezone: number
    maintenanceActive: number
    maintenanceMessage: number
    letterTFontFamily: number
    letterTFontSizePercent: number
    logoLightModeColor: number
    logoDarkModeColor: number
    heroWordmarkFonts: number
    heroWordmarkLoop: number
    heroWordmarkLoopSpeed: number
    marqueeActive: number
    marqueeText: number
    marqueeType: number
    marqueeTextColor: number
    marqueeBgColor: number
    popupActive: number
    popupImageUrl: number
    popupHeadline: number
    popupMessage: number
    popupCtaLabel: number
    popupCtaLink: number
    popupFrequency: number
    popupFrequencyDays: number
    emailProvider: number
    gmailClientId: number
    gmailClientSecret: number
    gmailSenderName: number
    gmailConnected: number
    gmailConnectedEmail: number
    gmailRefreshToken: number
    smtpHost: number
    smtpPort: number
    smtpUser: number
    smtpPassword: number
    smtpSecure: number
    smtpFromEmail: number
    smtpFromName: number
    smtpAuthType: number
    smtpOauthClientId: number
    smtpOauthClientSecret: number
    smtpOauthRefreshToken: number
    smtpOauthAccessUrl: number
    resendApiKey: number
    resendFromEmail: number
    resendFromName: number
    credentialsVault: number
    integrationsConfig: number
    notificationChannels: number
    slackWebhookUrl: number
    require2fa: number
    sessionTimeoutMinutes: number
    ipAllowlist: number
    auditRetentionDays: number
    cookieBannerActive: number
    cookieBannerText: number
    privacyPolicyUrl: number
    termsOfServiceUrl: number
    gdprRequestEmail: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminSettingsAvgAggregateInputType = {
    letterTFontSizePercent?: true
    heroWordmarkLoopSpeed?: true
    popupFrequencyDays?: true
    smtpPort?: true
    sessionTimeoutMinutes?: true
    auditRetentionDays?: true
  }

  export type AdminSettingsSumAggregateInputType = {
    letterTFontSizePercent?: true
    heroWordmarkLoopSpeed?: true
    popupFrequencyDays?: true
    smtpPort?: true
    sessionTimeoutMinutes?: true
    auditRetentionDays?: true
  }

  export type AdminSettingsMinAggregateInputType = {
    id?: true
    siteLanguage?: true
    siteTimezone?: true
    maintenanceActive?: true
    maintenanceMessage?: true
    letterTFontFamily?: true
    letterTFontSizePercent?: true
    logoLightModeColor?: true
    logoDarkModeColor?: true
    heroWordmarkFonts?: true
    heroWordmarkLoop?: true
    heroWordmarkLoopSpeed?: true
    marqueeActive?: true
    marqueeText?: true
    marqueeType?: true
    marqueeTextColor?: true
    marqueeBgColor?: true
    popupActive?: true
    popupImageUrl?: true
    popupHeadline?: true
    popupMessage?: true
    popupCtaLabel?: true
    popupCtaLink?: true
    popupFrequency?: true
    popupFrequencyDays?: true
    emailProvider?: true
    gmailClientId?: true
    gmailClientSecret?: true
    gmailSenderName?: true
    gmailConnected?: true
    gmailConnectedEmail?: true
    gmailRefreshToken?: true
    smtpHost?: true
    smtpPort?: true
    smtpUser?: true
    smtpPassword?: true
    smtpSecure?: true
    smtpFromEmail?: true
    smtpFromName?: true
    smtpAuthType?: true
    smtpOauthClientId?: true
    smtpOauthClientSecret?: true
    smtpOauthRefreshToken?: true
    smtpOauthAccessUrl?: true
    resendApiKey?: true
    resendFromEmail?: true
    resendFromName?: true
    credentialsVault?: true
    integrationsConfig?: true
    notificationChannels?: true
    slackWebhookUrl?: true
    require2fa?: true
    sessionTimeoutMinutes?: true
    ipAllowlist?: true
    auditRetentionDays?: true
    cookieBannerActive?: true
    cookieBannerText?: true
    privacyPolicyUrl?: true
    termsOfServiceUrl?: true
    gdprRequestEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminSettingsMaxAggregateInputType = {
    id?: true
    siteLanguage?: true
    siteTimezone?: true
    maintenanceActive?: true
    maintenanceMessage?: true
    letterTFontFamily?: true
    letterTFontSizePercent?: true
    logoLightModeColor?: true
    logoDarkModeColor?: true
    heroWordmarkFonts?: true
    heroWordmarkLoop?: true
    heroWordmarkLoopSpeed?: true
    marqueeActive?: true
    marqueeText?: true
    marqueeType?: true
    marqueeTextColor?: true
    marqueeBgColor?: true
    popupActive?: true
    popupImageUrl?: true
    popupHeadline?: true
    popupMessage?: true
    popupCtaLabel?: true
    popupCtaLink?: true
    popupFrequency?: true
    popupFrequencyDays?: true
    emailProvider?: true
    gmailClientId?: true
    gmailClientSecret?: true
    gmailSenderName?: true
    gmailConnected?: true
    gmailConnectedEmail?: true
    gmailRefreshToken?: true
    smtpHost?: true
    smtpPort?: true
    smtpUser?: true
    smtpPassword?: true
    smtpSecure?: true
    smtpFromEmail?: true
    smtpFromName?: true
    smtpAuthType?: true
    smtpOauthClientId?: true
    smtpOauthClientSecret?: true
    smtpOauthRefreshToken?: true
    smtpOauthAccessUrl?: true
    resendApiKey?: true
    resendFromEmail?: true
    resendFromName?: true
    credentialsVault?: true
    integrationsConfig?: true
    notificationChannels?: true
    slackWebhookUrl?: true
    require2fa?: true
    sessionTimeoutMinutes?: true
    ipAllowlist?: true
    auditRetentionDays?: true
    cookieBannerActive?: true
    cookieBannerText?: true
    privacyPolicyUrl?: true
    termsOfServiceUrl?: true
    gdprRequestEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminSettingsCountAggregateInputType = {
    id?: true
    siteLanguage?: true
    siteTimezone?: true
    maintenanceActive?: true
    maintenanceMessage?: true
    letterTFontFamily?: true
    letterTFontSizePercent?: true
    logoLightModeColor?: true
    logoDarkModeColor?: true
    heroWordmarkFonts?: true
    heroWordmarkLoop?: true
    heroWordmarkLoopSpeed?: true
    marqueeActive?: true
    marqueeText?: true
    marqueeType?: true
    marqueeTextColor?: true
    marqueeBgColor?: true
    popupActive?: true
    popupImageUrl?: true
    popupHeadline?: true
    popupMessage?: true
    popupCtaLabel?: true
    popupCtaLink?: true
    popupFrequency?: true
    popupFrequencyDays?: true
    emailProvider?: true
    gmailClientId?: true
    gmailClientSecret?: true
    gmailSenderName?: true
    gmailConnected?: true
    gmailConnectedEmail?: true
    gmailRefreshToken?: true
    smtpHost?: true
    smtpPort?: true
    smtpUser?: true
    smtpPassword?: true
    smtpSecure?: true
    smtpFromEmail?: true
    smtpFromName?: true
    smtpAuthType?: true
    smtpOauthClientId?: true
    smtpOauthClientSecret?: true
    smtpOauthRefreshToken?: true
    smtpOauthAccessUrl?: true
    resendApiKey?: true
    resendFromEmail?: true
    resendFromName?: true
    credentialsVault?: true
    integrationsConfig?: true
    notificationChannels?: true
    slackWebhookUrl?: true
    require2fa?: true
    sessionTimeoutMinutes?: true
    ipAllowlist?: true
    auditRetentionDays?: true
    cookieBannerActive?: true
    cookieBannerText?: true
    privacyPolicyUrl?: true
    termsOfServiceUrl?: true
    gdprRequestEmail?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminSettings to aggregate.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminSettings
    **/
    _count?: true | AdminSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminSettingsMaxAggregateInputType
  }

  export type GetAdminSettingsAggregateType<T extends AdminSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminSettings[P]>
      : GetScalarType<T[P], AggregateAdminSettings[P]>
  }




  export type AdminSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminSettingsWhereInput
    orderBy?: AdminSettingsOrderByWithAggregationInput | AdminSettingsOrderByWithAggregationInput[]
    by: AdminSettingsScalarFieldEnum[] | AdminSettingsScalarFieldEnum
    having?: AdminSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminSettingsCountAggregateInputType | true
    _avg?: AdminSettingsAvgAggregateInputType
    _sum?: AdminSettingsSumAggregateInputType
    _min?: AdminSettingsMinAggregateInputType
    _max?: AdminSettingsMaxAggregateInputType
  }

  export type AdminSettingsGroupByOutputType = {
    id: string
    siteLanguage: string
    siteTimezone: string
    maintenanceActive: boolean
    maintenanceMessage: string | null
    letterTFontFamily: string | null
    letterTFontSizePercent: number
    logoLightModeColor: string | null
    logoDarkModeColor: string | null
    heroWordmarkFonts: string | null
    heroWordmarkLoop: boolean
    heroWordmarkLoopSpeed: number
    marqueeActive: boolean
    marqueeText: string | null
    marqueeType: string
    marqueeTextColor: string | null
    marqueeBgColor: string | null
    popupActive: boolean
    popupImageUrl: string | null
    popupHeadline: string | null
    popupMessage: string | null
    popupCtaLabel: string | null
    popupCtaLink: string | null
    popupFrequency: string
    popupFrequencyDays: number
    emailProvider: string
    gmailClientId: string | null
    gmailClientSecret: string | null
    gmailSenderName: string | null
    gmailConnected: boolean
    gmailConnectedEmail: string | null
    gmailRefreshToken: string | null
    smtpHost: string | null
    smtpPort: number
    smtpUser: string | null
    smtpPassword: string | null
    smtpSecure: boolean
    smtpFromEmail: string | null
    smtpFromName: string | null
    smtpAuthType: string
    smtpOauthClientId: string | null
    smtpOauthClientSecret: string | null
    smtpOauthRefreshToken: string | null
    smtpOauthAccessUrl: string | null
    resendApiKey: string | null
    resendFromEmail: string | null
    resendFromName: string | null
    credentialsVault: string | null
    integrationsConfig: string | null
    notificationChannels: string | null
    slackWebhookUrl: string | null
    require2fa: boolean
    sessionTimeoutMinutes: number
    ipAllowlist: string | null
    auditRetentionDays: number
    cookieBannerActive: boolean
    cookieBannerText: string | null
    privacyPolicyUrl: string | null
    termsOfServiceUrl: string | null
    gdprRequestEmail: string | null
    createdAt: Date
    updatedAt: Date
    _count: AdminSettingsCountAggregateOutputType | null
    _avg: AdminSettingsAvgAggregateOutputType | null
    _sum: AdminSettingsSumAggregateOutputType | null
    _min: AdminSettingsMinAggregateOutputType | null
    _max: AdminSettingsMaxAggregateOutputType | null
  }

  type GetAdminSettingsGroupByPayload<T extends AdminSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], AdminSettingsGroupByOutputType[P]>
        }
      >
    >


  export type AdminSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteLanguage?: boolean
    siteTimezone?: boolean
    maintenanceActive?: boolean
    maintenanceMessage?: boolean
    letterTFontFamily?: boolean
    letterTFontSizePercent?: boolean
    logoLightModeColor?: boolean
    logoDarkModeColor?: boolean
    heroWordmarkFonts?: boolean
    heroWordmarkLoop?: boolean
    heroWordmarkLoopSpeed?: boolean
    marqueeActive?: boolean
    marqueeText?: boolean
    marqueeType?: boolean
    marqueeTextColor?: boolean
    marqueeBgColor?: boolean
    popupActive?: boolean
    popupImageUrl?: boolean
    popupHeadline?: boolean
    popupMessage?: boolean
    popupCtaLabel?: boolean
    popupCtaLink?: boolean
    popupFrequency?: boolean
    popupFrequencyDays?: boolean
    emailProvider?: boolean
    gmailClientId?: boolean
    gmailClientSecret?: boolean
    gmailSenderName?: boolean
    gmailConnected?: boolean
    gmailConnectedEmail?: boolean
    gmailRefreshToken?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPassword?: boolean
    smtpSecure?: boolean
    smtpFromEmail?: boolean
    smtpFromName?: boolean
    smtpAuthType?: boolean
    smtpOauthClientId?: boolean
    smtpOauthClientSecret?: boolean
    smtpOauthRefreshToken?: boolean
    smtpOauthAccessUrl?: boolean
    resendApiKey?: boolean
    resendFromEmail?: boolean
    resendFromName?: boolean
    credentialsVault?: boolean
    integrationsConfig?: boolean
    notificationChannels?: boolean
    slackWebhookUrl?: boolean
    require2fa?: boolean
    sessionTimeoutMinutes?: boolean
    ipAllowlist?: boolean
    auditRetentionDays?: boolean
    cookieBannerActive?: boolean
    cookieBannerText?: boolean
    privacyPolicyUrl?: boolean
    termsOfServiceUrl?: boolean
    gdprRequestEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminSettings"]>

  export type AdminSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteLanguage?: boolean
    siteTimezone?: boolean
    maintenanceActive?: boolean
    maintenanceMessage?: boolean
    letterTFontFamily?: boolean
    letterTFontSizePercent?: boolean
    logoLightModeColor?: boolean
    logoDarkModeColor?: boolean
    heroWordmarkFonts?: boolean
    heroWordmarkLoop?: boolean
    heroWordmarkLoopSpeed?: boolean
    marqueeActive?: boolean
    marqueeText?: boolean
    marqueeType?: boolean
    marqueeTextColor?: boolean
    marqueeBgColor?: boolean
    popupActive?: boolean
    popupImageUrl?: boolean
    popupHeadline?: boolean
    popupMessage?: boolean
    popupCtaLabel?: boolean
    popupCtaLink?: boolean
    popupFrequency?: boolean
    popupFrequencyDays?: boolean
    emailProvider?: boolean
    gmailClientId?: boolean
    gmailClientSecret?: boolean
    gmailSenderName?: boolean
    gmailConnected?: boolean
    gmailConnectedEmail?: boolean
    gmailRefreshToken?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPassword?: boolean
    smtpSecure?: boolean
    smtpFromEmail?: boolean
    smtpFromName?: boolean
    smtpAuthType?: boolean
    smtpOauthClientId?: boolean
    smtpOauthClientSecret?: boolean
    smtpOauthRefreshToken?: boolean
    smtpOauthAccessUrl?: boolean
    resendApiKey?: boolean
    resendFromEmail?: boolean
    resendFromName?: boolean
    credentialsVault?: boolean
    integrationsConfig?: boolean
    notificationChannels?: boolean
    slackWebhookUrl?: boolean
    require2fa?: boolean
    sessionTimeoutMinutes?: boolean
    ipAllowlist?: boolean
    auditRetentionDays?: boolean
    cookieBannerActive?: boolean
    cookieBannerText?: boolean
    privacyPolicyUrl?: boolean
    termsOfServiceUrl?: boolean
    gdprRequestEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminSettings"]>

  export type AdminSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siteLanguage?: boolean
    siteTimezone?: boolean
    maintenanceActive?: boolean
    maintenanceMessage?: boolean
    letterTFontFamily?: boolean
    letterTFontSizePercent?: boolean
    logoLightModeColor?: boolean
    logoDarkModeColor?: boolean
    heroWordmarkFonts?: boolean
    heroWordmarkLoop?: boolean
    heroWordmarkLoopSpeed?: boolean
    marqueeActive?: boolean
    marqueeText?: boolean
    marqueeType?: boolean
    marqueeTextColor?: boolean
    marqueeBgColor?: boolean
    popupActive?: boolean
    popupImageUrl?: boolean
    popupHeadline?: boolean
    popupMessage?: boolean
    popupCtaLabel?: boolean
    popupCtaLink?: boolean
    popupFrequency?: boolean
    popupFrequencyDays?: boolean
    emailProvider?: boolean
    gmailClientId?: boolean
    gmailClientSecret?: boolean
    gmailSenderName?: boolean
    gmailConnected?: boolean
    gmailConnectedEmail?: boolean
    gmailRefreshToken?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPassword?: boolean
    smtpSecure?: boolean
    smtpFromEmail?: boolean
    smtpFromName?: boolean
    smtpAuthType?: boolean
    smtpOauthClientId?: boolean
    smtpOauthClientSecret?: boolean
    smtpOauthRefreshToken?: boolean
    smtpOauthAccessUrl?: boolean
    resendApiKey?: boolean
    resendFromEmail?: boolean
    resendFromName?: boolean
    credentialsVault?: boolean
    integrationsConfig?: boolean
    notificationChannels?: boolean
    slackWebhookUrl?: boolean
    require2fa?: boolean
    sessionTimeoutMinutes?: boolean
    ipAllowlist?: boolean
    auditRetentionDays?: boolean
    cookieBannerActive?: boolean
    cookieBannerText?: boolean
    privacyPolicyUrl?: boolean
    termsOfServiceUrl?: boolean
    gdprRequestEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminSettings"]>

  export type AdminSettingsSelectScalar = {
    id?: boolean
    siteLanguage?: boolean
    siteTimezone?: boolean
    maintenanceActive?: boolean
    maintenanceMessage?: boolean
    letterTFontFamily?: boolean
    letterTFontSizePercent?: boolean
    logoLightModeColor?: boolean
    logoDarkModeColor?: boolean
    heroWordmarkFonts?: boolean
    heroWordmarkLoop?: boolean
    heroWordmarkLoopSpeed?: boolean
    marqueeActive?: boolean
    marqueeText?: boolean
    marqueeType?: boolean
    marqueeTextColor?: boolean
    marqueeBgColor?: boolean
    popupActive?: boolean
    popupImageUrl?: boolean
    popupHeadline?: boolean
    popupMessage?: boolean
    popupCtaLabel?: boolean
    popupCtaLink?: boolean
    popupFrequency?: boolean
    popupFrequencyDays?: boolean
    emailProvider?: boolean
    gmailClientId?: boolean
    gmailClientSecret?: boolean
    gmailSenderName?: boolean
    gmailConnected?: boolean
    gmailConnectedEmail?: boolean
    gmailRefreshToken?: boolean
    smtpHost?: boolean
    smtpPort?: boolean
    smtpUser?: boolean
    smtpPassword?: boolean
    smtpSecure?: boolean
    smtpFromEmail?: boolean
    smtpFromName?: boolean
    smtpAuthType?: boolean
    smtpOauthClientId?: boolean
    smtpOauthClientSecret?: boolean
    smtpOauthRefreshToken?: boolean
    smtpOauthAccessUrl?: boolean
    resendApiKey?: boolean
    resendFromEmail?: boolean
    resendFromName?: boolean
    credentialsVault?: boolean
    integrationsConfig?: boolean
    notificationChannels?: boolean
    slackWebhookUrl?: boolean
    require2fa?: boolean
    sessionTimeoutMinutes?: boolean
    ipAllowlist?: boolean
    auditRetentionDays?: boolean
    cookieBannerActive?: boolean
    cookieBannerText?: boolean
    privacyPolicyUrl?: boolean
    termsOfServiceUrl?: boolean
    gdprRequestEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "siteLanguage" | "siteTimezone" | "maintenanceActive" | "maintenanceMessage" | "letterTFontFamily" | "letterTFontSizePercent" | "logoLightModeColor" | "logoDarkModeColor" | "heroWordmarkFonts" | "heroWordmarkLoop" | "heroWordmarkLoopSpeed" | "marqueeActive" | "marqueeText" | "marqueeType" | "marqueeTextColor" | "marqueeBgColor" | "popupActive" | "popupImageUrl" | "popupHeadline" | "popupMessage" | "popupCtaLabel" | "popupCtaLink" | "popupFrequency" | "popupFrequencyDays" | "emailProvider" | "gmailClientId" | "gmailClientSecret" | "gmailSenderName" | "gmailConnected" | "gmailConnectedEmail" | "gmailRefreshToken" | "smtpHost" | "smtpPort" | "smtpUser" | "smtpPassword" | "smtpSecure" | "smtpFromEmail" | "smtpFromName" | "smtpAuthType" | "smtpOauthClientId" | "smtpOauthClientSecret" | "smtpOauthRefreshToken" | "smtpOauthAccessUrl" | "resendApiKey" | "resendFromEmail" | "resendFromName" | "credentialsVault" | "integrationsConfig" | "notificationChannels" | "slackWebhookUrl" | "require2fa" | "sessionTimeoutMinutes" | "ipAllowlist" | "auditRetentionDays" | "cookieBannerActive" | "cookieBannerText" | "privacyPolicyUrl" | "termsOfServiceUrl" | "gdprRequestEmail" | "createdAt" | "updatedAt", ExtArgs["result"]["adminSettings"]>

  export type $AdminSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      siteLanguage: string
      siteTimezone: string
      maintenanceActive: boolean
      maintenanceMessage: string | null
      letterTFontFamily: string | null
      letterTFontSizePercent: number
      logoLightModeColor: string | null
      logoDarkModeColor: string | null
      heroWordmarkFonts: string | null
      heroWordmarkLoop: boolean
      heroWordmarkLoopSpeed: number
      marqueeActive: boolean
      marqueeText: string | null
      marqueeType: string
      marqueeTextColor: string | null
      marqueeBgColor: string | null
      popupActive: boolean
      popupImageUrl: string | null
      popupHeadline: string | null
      popupMessage: string | null
      popupCtaLabel: string | null
      popupCtaLink: string | null
      popupFrequency: string
      popupFrequencyDays: number
      emailProvider: string
      gmailClientId: string | null
      gmailClientSecret: string | null
      gmailSenderName: string | null
      gmailConnected: boolean
      gmailConnectedEmail: string | null
      gmailRefreshToken: string | null
      smtpHost: string | null
      smtpPort: number
      smtpUser: string | null
      smtpPassword: string | null
      smtpSecure: boolean
      smtpFromEmail: string | null
      smtpFromName: string | null
      smtpAuthType: string
      smtpOauthClientId: string | null
      smtpOauthClientSecret: string | null
      smtpOauthRefreshToken: string | null
      smtpOauthAccessUrl: string | null
      resendApiKey: string | null
      resendFromEmail: string | null
      resendFromName: string | null
      credentialsVault: string | null
      integrationsConfig: string | null
      notificationChannels: string | null
      slackWebhookUrl: string | null
      require2fa: boolean
      sessionTimeoutMinutes: number
      ipAllowlist: string | null
      auditRetentionDays: number
      cookieBannerActive: boolean
      cookieBannerText: string | null
      privacyPolicyUrl: string | null
      termsOfServiceUrl: string | null
      gdprRequestEmail: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminSettings"]>
    composites: {}
  }

  type AdminSettingsGetPayload<S extends boolean | null | undefined | AdminSettingsDefaultArgs> = $Result.GetResult<Prisma.$AdminSettingsPayload, S>

  type AdminSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminSettingsCountAggregateInputType | true
    }

  export interface AdminSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminSettings'], meta: { name: 'AdminSettings' } }
    /**
     * Find zero or one AdminSettings that matches the filter.
     * @param {AdminSettingsFindUniqueArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminSettingsFindUniqueArgs>(args: SelectSubset<T, AdminSettingsFindUniqueArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminSettingsFindUniqueOrThrowArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsFindFirstArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminSettingsFindFirstArgs>(args?: SelectSubset<T, AdminSettingsFindFirstArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsFindFirstOrThrowArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminSettings
     * const adminSettings = await prisma.adminSettings.findMany()
     * 
     * // Get first 10 AdminSettings
     * const adminSettings = await prisma.adminSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminSettingsWithIdOnly = await prisma.adminSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminSettingsFindManyArgs>(args?: SelectSubset<T, AdminSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminSettings.
     * @param {AdminSettingsCreateArgs} args - Arguments to create a AdminSettings.
     * @example
     * // Create one AdminSettings
     * const AdminSettings = await prisma.adminSettings.create({
     *   data: {
     *     // ... data to create a AdminSettings
     *   }
     * })
     * 
     */
    create<T extends AdminSettingsCreateArgs>(args: SelectSubset<T, AdminSettingsCreateArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminSettings.
     * @param {AdminSettingsCreateManyArgs} args - Arguments to create many AdminSettings.
     * @example
     * // Create many AdminSettings
     * const adminSettings = await prisma.adminSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminSettingsCreateManyArgs>(args?: SelectSubset<T, AdminSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminSettings and returns the data saved in the database.
     * @param {AdminSettingsCreateManyAndReturnArgs} args - Arguments to create many AdminSettings.
     * @example
     * // Create many AdminSettings
     * const adminSettings = await prisma.adminSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminSettings and only return the `id`
     * const adminSettingsWithIdOnly = await prisma.adminSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminSettings.
     * @param {AdminSettingsDeleteArgs} args - Arguments to delete one AdminSettings.
     * @example
     * // Delete one AdminSettings
     * const AdminSettings = await prisma.adminSettings.delete({
     *   where: {
     *     // ... filter to delete one AdminSettings
     *   }
     * })
     * 
     */
    delete<T extends AdminSettingsDeleteArgs>(args: SelectSubset<T, AdminSettingsDeleteArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminSettings.
     * @param {AdminSettingsUpdateArgs} args - Arguments to update one AdminSettings.
     * @example
     * // Update one AdminSettings
     * const adminSettings = await prisma.adminSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminSettingsUpdateArgs>(args: SelectSubset<T, AdminSettingsUpdateArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminSettings.
     * @param {AdminSettingsDeleteManyArgs} args - Arguments to filter AdminSettings to delete.
     * @example
     * // Delete a few AdminSettings
     * const { count } = await prisma.adminSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminSettingsDeleteManyArgs>(args?: SelectSubset<T, AdminSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminSettings
     * const adminSettings = await prisma.adminSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminSettingsUpdateManyArgs>(args: SelectSubset<T, AdminSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminSettings and returns the data updated in the database.
     * @param {AdminSettingsUpdateManyAndReturnArgs} args - Arguments to update many AdminSettings.
     * @example
     * // Update many AdminSettings
     * const adminSettings = await prisma.adminSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminSettings and only return the `id`
     * const adminSettingsWithIdOnly = await prisma.adminSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminSettings.
     * @param {AdminSettingsUpsertArgs} args - Arguments to update or create a AdminSettings.
     * @example
     * // Update or create a AdminSettings
     * const adminSettings = await prisma.adminSettings.upsert({
     *   create: {
     *     // ... data to create a AdminSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminSettings we want to update
     *   }
     * })
     */
    upsert<T extends AdminSettingsUpsertArgs>(args: SelectSubset<T, AdminSettingsUpsertArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsCountArgs} args - Arguments to filter AdminSettings to count.
     * @example
     * // Count the number of AdminSettings
     * const count = await prisma.adminSettings.count({
     *   where: {
     *     // ... the filter for the AdminSettings we want to count
     *   }
     * })
    **/
    count<T extends AdminSettingsCountArgs>(
      args?: Subset<T, AdminSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminSettingsAggregateArgs>(args: Subset<T, AdminSettingsAggregateArgs>): Prisma.PrismaPromise<GetAdminSettingsAggregateType<T>>

    /**
     * Group by AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminSettingsGroupByArgs['orderBy'] }
        : { orderBy?: AdminSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminSettings model
   */
  readonly fields: AdminSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminSettings model
   */
  interface AdminSettingsFieldRefs {
    readonly id: FieldRef<"AdminSettings", 'String'>
    readonly siteLanguage: FieldRef<"AdminSettings", 'String'>
    readonly siteTimezone: FieldRef<"AdminSettings", 'String'>
    readonly maintenanceActive: FieldRef<"AdminSettings", 'Boolean'>
    readonly maintenanceMessage: FieldRef<"AdminSettings", 'String'>
    readonly letterTFontFamily: FieldRef<"AdminSettings", 'String'>
    readonly letterTFontSizePercent: FieldRef<"AdminSettings", 'Int'>
    readonly logoLightModeColor: FieldRef<"AdminSettings", 'String'>
    readonly logoDarkModeColor: FieldRef<"AdminSettings", 'String'>
    readonly heroWordmarkFonts: FieldRef<"AdminSettings", 'String'>
    readonly heroWordmarkLoop: FieldRef<"AdminSettings", 'Boolean'>
    readonly heroWordmarkLoopSpeed: FieldRef<"AdminSettings", 'Float'>
    readonly marqueeActive: FieldRef<"AdminSettings", 'Boolean'>
    readonly marqueeText: FieldRef<"AdminSettings", 'String'>
    readonly marqueeType: FieldRef<"AdminSettings", 'String'>
    readonly marqueeTextColor: FieldRef<"AdminSettings", 'String'>
    readonly marqueeBgColor: FieldRef<"AdminSettings", 'String'>
    readonly popupActive: FieldRef<"AdminSettings", 'Boolean'>
    readonly popupImageUrl: FieldRef<"AdminSettings", 'String'>
    readonly popupHeadline: FieldRef<"AdminSettings", 'String'>
    readonly popupMessage: FieldRef<"AdminSettings", 'String'>
    readonly popupCtaLabel: FieldRef<"AdminSettings", 'String'>
    readonly popupCtaLink: FieldRef<"AdminSettings", 'String'>
    readonly popupFrequency: FieldRef<"AdminSettings", 'String'>
    readonly popupFrequencyDays: FieldRef<"AdminSettings", 'Int'>
    readonly emailProvider: FieldRef<"AdminSettings", 'String'>
    readonly gmailClientId: FieldRef<"AdminSettings", 'String'>
    readonly gmailClientSecret: FieldRef<"AdminSettings", 'String'>
    readonly gmailSenderName: FieldRef<"AdminSettings", 'String'>
    readonly gmailConnected: FieldRef<"AdminSettings", 'Boolean'>
    readonly gmailConnectedEmail: FieldRef<"AdminSettings", 'String'>
    readonly gmailRefreshToken: FieldRef<"AdminSettings", 'String'>
    readonly smtpHost: FieldRef<"AdminSettings", 'String'>
    readonly smtpPort: FieldRef<"AdminSettings", 'Int'>
    readonly smtpUser: FieldRef<"AdminSettings", 'String'>
    readonly smtpPassword: FieldRef<"AdminSettings", 'String'>
    readonly smtpSecure: FieldRef<"AdminSettings", 'Boolean'>
    readonly smtpFromEmail: FieldRef<"AdminSettings", 'String'>
    readonly smtpFromName: FieldRef<"AdminSettings", 'String'>
    readonly smtpAuthType: FieldRef<"AdminSettings", 'String'>
    readonly smtpOauthClientId: FieldRef<"AdminSettings", 'String'>
    readonly smtpOauthClientSecret: FieldRef<"AdminSettings", 'String'>
    readonly smtpOauthRefreshToken: FieldRef<"AdminSettings", 'String'>
    readonly smtpOauthAccessUrl: FieldRef<"AdminSettings", 'String'>
    readonly resendApiKey: FieldRef<"AdminSettings", 'String'>
    readonly resendFromEmail: FieldRef<"AdminSettings", 'String'>
    readonly resendFromName: FieldRef<"AdminSettings", 'String'>
    readonly credentialsVault: FieldRef<"AdminSettings", 'String'>
    readonly integrationsConfig: FieldRef<"AdminSettings", 'String'>
    readonly notificationChannels: FieldRef<"AdminSettings", 'String'>
    readonly slackWebhookUrl: FieldRef<"AdminSettings", 'String'>
    readonly require2fa: FieldRef<"AdminSettings", 'Boolean'>
    readonly sessionTimeoutMinutes: FieldRef<"AdminSettings", 'Int'>
    readonly ipAllowlist: FieldRef<"AdminSettings", 'String'>
    readonly auditRetentionDays: FieldRef<"AdminSettings", 'Int'>
    readonly cookieBannerActive: FieldRef<"AdminSettings", 'Boolean'>
    readonly cookieBannerText: FieldRef<"AdminSettings", 'String'>
    readonly privacyPolicyUrl: FieldRef<"AdminSettings", 'String'>
    readonly termsOfServiceUrl: FieldRef<"AdminSettings", 'String'>
    readonly gdprRequestEmail: FieldRef<"AdminSettings", 'String'>
    readonly createdAt: FieldRef<"AdminSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminSettings findUnique
   */
  export type AdminSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings findUniqueOrThrow
   */
  export type AdminSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings findFirst
   */
  export type AdminSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminSettings.
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingsScalarFieldEnum | AdminSettingsScalarFieldEnum[]
  }

  /**
   * AdminSettings findFirstOrThrow
   */
  export type AdminSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminSettings.
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingsScalarFieldEnum | AdminSettingsScalarFieldEnum[]
  }

  /**
   * AdminSettings findMany
   */
  export type AdminSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminSettings.
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    distinct?: AdminSettingsScalarFieldEnum | AdminSettingsScalarFieldEnum[]
  }

  /**
   * AdminSettings create
   */
  export type AdminSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminSettings.
     */
    data?: XOR<AdminSettingsCreateInput, AdminSettingsUncheckedCreateInput>
  }

  /**
   * AdminSettings createMany
   */
  export type AdminSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminSettings.
     */
    data: AdminSettingsCreateManyInput | AdminSettingsCreateManyInput[]
  }

  /**
   * AdminSettings createManyAndReturn
   */
  export type AdminSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many AdminSettings.
     */
    data: AdminSettingsCreateManyInput | AdminSettingsCreateManyInput[]
  }

  /**
   * AdminSettings update
   */
  export type AdminSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminSettings.
     */
    data: XOR<AdminSettingsUpdateInput, AdminSettingsUncheckedUpdateInput>
    /**
     * Choose, which AdminSettings to update.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings updateMany
   */
  export type AdminSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminSettings.
     */
    data: XOR<AdminSettingsUpdateManyMutationInput, AdminSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AdminSettings to update
     */
    where?: AdminSettingsWhereInput
    /**
     * Limit how many AdminSettings to update.
     */
    limit?: number
  }

  /**
   * AdminSettings updateManyAndReturn
   */
  export type AdminSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The data used to update AdminSettings.
     */
    data: XOR<AdminSettingsUpdateManyMutationInput, AdminSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AdminSettings to update
     */
    where?: AdminSettingsWhereInput
    /**
     * Limit how many AdminSettings to update.
     */
    limit?: number
  }

  /**
   * AdminSettings upsert
   */
  export type AdminSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminSettings to update in case it exists.
     */
    where: AdminSettingsWhereUniqueInput
    /**
     * In case the AdminSettings found by the `where` argument doesn't exist, create a new AdminSettings with this data.
     */
    create: XOR<AdminSettingsCreateInput, AdminSettingsUncheckedCreateInput>
    /**
     * In case the AdminSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminSettingsUpdateInput, AdminSettingsUncheckedUpdateInput>
  }

  /**
   * AdminSettings delete
   */
  export type AdminSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter which AdminSettings to delete.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings deleteMany
   */
  export type AdminSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminSettings to delete
     */
    where?: AdminSettingsWhereInput
    /**
     * Limit how many AdminSettings to delete.
     */
    limit?: number
  }

  /**
   * AdminSettings without action
   */
  export type AdminSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    prescriptions?: boolean | Tag$prescriptionsArgs<ExtArgs>
    ingredients?: boolean | Tag$ingredientsArgs<ExtArgs>
    formulas?: boolean | Tag$formulasArgs<ExtArgs>
    posts?: boolean | Tag$postsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescriptions?: boolean | Tag$prescriptionsArgs<ExtArgs>
    ingredients?: boolean | Tag$ingredientsArgs<ExtArgs>
    formulas?: boolean | Tag$formulasArgs<ExtArgs>
    posts?: boolean | Tag$postsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      prescriptions: Prisma.$PrescriptionPayload<ExtArgs>[]
      ingredients: Prisma.$IngredientPayload<ExtArgs>[]
      formulas: Prisma.$FormulaPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prescriptions<T extends Tag$prescriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$prescriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ingredients<T extends Tag$ingredientsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$ingredientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    formulas<T extends Tag$formulasArgs<ExtArgs> = {}>(args?: Subset<T, Tag$formulasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends Tag$postsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly description: FieldRef<"Tag", 'String'>
    readonly createdAt: FieldRef<"Tag", 'DateTime'>
    readonly updatedAt: FieldRef<"Tag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.prescriptions
   */
  export type Tag$prescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    cursor?: PrescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Tag.ingredients
   */
  export type Tag$ingredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    where?: IngredientWhereInput
    orderBy?: IngredientOrderByWithRelationInput | IngredientOrderByWithRelationInput[]
    cursor?: IngredientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IngredientScalarFieldEnum | IngredientScalarFieldEnum[]
  }

  /**
   * Tag.formulas
   */
  export type Tag$formulasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    where?: FormulaWhereInput
    orderBy?: FormulaOrderByWithRelationInput | FormulaOrderByWithRelationInput[]
    cursor?: FormulaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormulaScalarFieldEnum | FormulaScalarFieldEnum[]
  }

  /**
   * Tag.posts
   */
  export type Tag$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    postType: string | null
    title: string | null
    slug: string | null
    caption: string | null
    description: string | null
    thumbnailUrl: string | null
    imageUrl: string | null
    imageAlt: string | null
    insight: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: string | null
    seoId: string | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    postType: string | null
    title: string | null
    slug: string | null
    caption: string | null
    description: string | null
    thumbnailUrl: string | null
    imageUrl: string | null
    imageAlt: string | null
    insight: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: string | null
    seoId: string | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    postType: number
    title: number
    slug: number
    caption: number
    description: number
    thumbnailUrl: number
    imageUrl: number
    imageAlt: number
    insight: number
    published: number
    createdAt: number
    updatedAt: number
    authorId: number
    seoId: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    postType?: true
    title?: true
    slug?: true
    caption?: true
    description?: true
    thumbnailUrl?: true
    imageUrl?: true
    imageAlt?: true
    insight?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    seoId?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    postType?: true
    title?: true
    slug?: true
    caption?: true
    description?: true
    thumbnailUrl?: true
    imageUrl?: true
    imageAlt?: true
    insight?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    seoId?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    postType?: true
    title?: true
    slug?: true
    caption?: true
    description?: true
    thumbnailUrl?: true
    imageUrl?: true
    imageAlt?: true
    insight?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    seoId?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    postType: string
    title: string
    slug: string
    caption: string | null
    description: string | null
    thumbnailUrl: string | null
    imageUrl: string | null
    imageAlt: string | null
    insight: string | null
    published: boolean
    createdAt: Date
    updatedAt: Date
    authorId: string
    seoId: string | null
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postType?: boolean
    title?: boolean
    slug?: boolean
    caption?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    insight?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    seoId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    tags?: boolean | Post$tagsArgs<ExtArgs>
    fonts?: boolean | Post$fontsArgs<ExtArgs>
    seo?: boolean | Post$seoArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postType?: boolean
    title?: boolean
    slug?: boolean
    caption?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    insight?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    seoId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    seo?: boolean | Post$seoArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postType?: boolean
    title?: boolean
    slug?: boolean
    caption?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    insight?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    seoId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    seo?: boolean | Post$seoArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    postType?: boolean
    title?: boolean
    slug?: boolean
    caption?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    insight?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    seoId?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postType" | "title" | "slug" | "caption" | "description" | "thumbnailUrl" | "imageUrl" | "imageAlt" | "insight" | "published" | "createdAt" | "updatedAt" | "authorId" | "seoId", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    tags?: boolean | Post$tagsArgs<ExtArgs>
    fonts?: boolean | Post$fontsArgs<ExtArgs>
    seo?: boolean | Post$seoArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    seo?: boolean | Post$seoArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    seo?: boolean | Post$seoArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      tags: Prisma.$TagPayload<ExtArgs>[]
      fonts: Prisma.$IngredientPayload<ExtArgs>[]
      seo: Prisma.$SeoModulePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      postType: string
      title: string
      slug: string
      caption: string | null
      description: string | null
      thumbnailUrl: string | null
      imageUrl: string | null
      imageAlt: string | null
      insight: string | null
      published: boolean
      createdAt: Date
      updatedAt: Date
      authorId: string
      seoId: string | null
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tags<T extends Post$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Post$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fonts<T extends Post$fontsArgs<ExtArgs> = {}>(args?: Subset<T, Post$fontsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    seo<T extends Post$seoArgs<ExtArgs> = {}>(args?: Subset<T, Post$seoArgs<ExtArgs>>): Prisma__SeoModuleClient<$Result.GetResult<Prisma.$SeoModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly postType: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly slug: FieldRef<"Post", 'String'>
    readonly caption: FieldRef<"Post", 'String'>
    readonly description: FieldRef<"Post", 'String'>
    readonly thumbnailUrl: FieldRef<"Post", 'String'>
    readonly imageUrl: FieldRef<"Post", 'String'>
    readonly imageAlt: FieldRef<"Post", 'String'>
    readonly insight: FieldRef<"Post", 'String'>
    readonly published: FieldRef<"Post", 'Boolean'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
    readonly authorId: FieldRef<"Post", 'String'>
    readonly seoId: FieldRef<"Post", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.tags
   */
  export type Post$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Post.fonts
   */
  export type Post$fontsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null
    where?: IngredientWhereInput
    orderBy?: IngredientOrderByWithRelationInput | IngredientOrderByWithRelationInput[]
    cursor?: IngredientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IngredientScalarFieldEnum | IngredientScalarFieldEnum[]
  }

  /**
   * Post.seo
   */
  export type Post$seoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoModule
     */
    select?: SeoModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeoModule
     */
    omit?: SeoModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeoModuleInclude<ExtArgs> | null
    where?: SeoModuleWhereInput
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    image: 'image',
    imageUrl: 'imageUrl',
    surname: 'surname',
    biography: 'biography'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const PermissionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum]


  export const FontAuthorScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    type: 'type',
    email: 'email',
    supportEmail: 'supportEmail',
    avatarUrl: 'avatarUrl',
    bannerUrl: 'bannerUrl',
    bio: 'bio',
    website: 'website',
    dafontProfileUrl: 'dafontProfileUrl',
    profileInfoUrl: 'profileInfoUrl',
    donation: 'donation',
    nationality: 'nationality',
    languagesSpoken: 'languagesSpoken',
    isVerified: 'isVerified',
    socialLinks: 'socialLinks',
    metrics: 'metrics',
    businessInfo: 'businessInfo',
    specialties: 'specialties',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FontAuthorScalarFieldEnum = (typeof FontAuthorScalarFieldEnum)[keyof typeof FontAuthorScalarFieldEnum]


  export const SeoModuleScalarFieldEnum: {
    id: 'id',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    keywords: 'keywords',
    ogTitle: 'ogTitle',
    ogDescription: 'ogDescription',
    ogImageUrl: 'ogImageUrl',
    ogImageAlt: 'ogImageAlt',
    twitterCard: 'twitterCard',
    twitterTitle: 'twitterTitle',
    twitterDescription: 'twitterDescription',
    twitterImageUrl: 'twitterImageUrl',
    twitterImageAlt: 'twitterImageAlt',
    canonicalUrl: 'canonicalUrl',
    noIndex: 'noIndex',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SeoModuleScalarFieldEnum = (typeof SeoModuleScalarFieldEnum)[keyof typeof SeoModuleScalarFieldEnum]


  export const FontVariantScalarFieldEnum: {
    id: 'id',
    fontFamilyName: 'fontFamilyName',
    weight: 'weight',
    style: 'style',
    woff2Url: 'woff2Url',
    label: 'label',
    ingredientId: 'ingredientId'
  };

  export type FontVariantScalarFieldEnum = (typeof FontVariantScalarFieldEnum)[keyof typeof FontVariantScalarFieldEnum]


  export const IngredientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    category: 'category',
    creator: 'creator',
    rating: 'rating',
    symbol: 'symbol',
    formula: 'formula',
    importedFrom: 'importedFrom',
    licenseType: 'licenseType',
    isVariable: 'isVariable',
    userRating: 'userRating',
    userRatingsCount: 'userRatingsCount',
    authorId: 'authorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IngredientScalarFieldEnum = (typeof IngredientScalarFieldEnum)[keyof typeof IngredientScalarFieldEnum]


  export const FormulaScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    slug: 'slug',
    fontCategory: 'fontCategory',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FormulaScalarFieldEnum = (typeof FormulaScalarFieldEnum)[keyof typeof FormulaScalarFieldEnum]


  export const PrescriptionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    imageUrl: 'imageUrl',
    insight: 'insight',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    primaryFontId: 'primaryFontId',
    secondaryFontId: 'secondaryFontId',
    seoId: 'seoId'
  };

  export type PrescriptionScalarFieldEnum = (typeof PrescriptionScalarFieldEnum)[keyof typeof PrescriptionScalarFieldEnum]


  export const AdminSettingsScalarFieldEnum: {
    id: 'id',
    siteLanguage: 'siteLanguage',
    siteTimezone: 'siteTimezone',
    maintenanceActive: 'maintenanceActive',
    maintenanceMessage: 'maintenanceMessage',
    letterTFontFamily: 'letterTFontFamily',
    letterTFontSizePercent: 'letterTFontSizePercent',
    logoLightModeColor: 'logoLightModeColor',
    logoDarkModeColor: 'logoDarkModeColor',
    heroWordmarkFonts: 'heroWordmarkFonts',
    heroWordmarkLoop: 'heroWordmarkLoop',
    heroWordmarkLoopSpeed: 'heroWordmarkLoopSpeed',
    marqueeActive: 'marqueeActive',
    marqueeText: 'marqueeText',
    marqueeType: 'marqueeType',
    marqueeTextColor: 'marqueeTextColor',
    marqueeBgColor: 'marqueeBgColor',
    popupActive: 'popupActive',
    popupImageUrl: 'popupImageUrl',
    popupHeadline: 'popupHeadline',
    popupMessage: 'popupMessage',
    popupCtaLabel: 'popupCtaLabel',
    popupCtaLink: 'popupCtaLink',
    popupFrequency: 'popupFrequency',
    popupFrequencyDays: 'popupFrequencyDays',
    emailProvider: 'emailProvider',
    gmailClientId: 'gmailClientId',
    gmailClientSecret: 'gmailClientSecret',
    gmailSenderName: 'gmailSenderName',
    gmailConnected: 'gmailConnected',
    gmailConnectedEmail: 'gmailConnectedEmail',
    gmailRefreshToken: 'gmailRefreshToken',
    smtpHost: 'smtpHost',
    smtpPort: 'smtpPort',
    smtpUser: 'smtpUser',
    smtpPassword: 'smtpPassword',
    smtpSecure: 'smtpSecure',
    smtpFromEmail: 'smtpFromEmail',
    smtpFromName: 'smtpFromName',
    smtpAuthType: 'smtpAuthType',
    smtpOauthClientId: 'smtpOauthClientId',
    smtpOauthClientSecret: 'smtpOauthClientSecret',
    smtpOauthRefreshToken: 'smtpOauthRefreshToken',
    smtpOauthAccessUrl: 'smtpOauthAccessUrl',
    resendApiKey: 'resendApiKey',
    resendFromEmail: 'resendFromEmail',
    resendFromName: 'resendFromName',
    credentialsVault: 'credentialsVault',
    integrationsConfig: 'integrationsConfig',
    notificationChannels: 'notificationChannels',
    slackWebhookUrl: 'slackWebhookUrl',
    require2fa: 'require2fa',
    sessionTimeoutMinutes: 'sessionTimeoutMinutes',
    ipAllowlist: 'ipAllowlist',
    auditRetentionDays: 'auditRetentionDays',
    cookieBannerActive: 'cookieBannerActive',
    cookieBannerText: 'cookieBannerText',
    privacyPolicyUrl: 'privacyPolicyUrl',
    termsOfServiceUrl: 'termsOfServiceUrl',
    gdprRequestEmail: 'gdprRequestEmail',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminSettingsScalarFieldEnum = (typeof AdminSettingsScalarFieldEnum)[keyof typeof AdminSettingsScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    postType: 'postType',
    title: 'title',
    slug: 'slug',
    caption: 'caption',
    description: 'description',
    thumbnailUrl: 'thumbnailUrl',
    imageUrl: 'imageUrl',
    imageAlt: 'imageAlt',
    insight: 'insight',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    authorId: 'authorId',
    seoId: 'seoId'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    image?: BytesNullableFilter<"User"> | Bytes | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    surname?: StringNullableFilter<"User"> | string | null
    biography?: StringNullableFilter<"User"> | string | null
    posts?: PostListRelationFilter
    roles?: RoleListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    surname?: SortOrderInput | SortOrder
    biography?: SortOrderInput | SortOrder
    posts?: PostOrderByRelationAggregateInput
    roles?: RoleOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    image?: BytesNullableFilter<"User"> | Bytes | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    surname?: StringNullableFilter<"User"> | string | null
    biography?: StringNullableFilter<"User"> | string | null
    posts?: PostListRelationFilter
    roles?: RoleListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    surname?: SortOrderInput | SortOrder
    biography?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    image?: BytesNullableWithAggregatesFilter<"User"> | Bytes | null
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    surname?: StringNullableWithAggregatesFilter<"User"> | string | null
    biography?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    permissions?: PermissionListRelationFilter
    users?: UserListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    permissions?: PermissionOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    permissions?: PermissionListRelationFilter
    users?: UserListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Role"> | string
    name?: StringWithAggregatesFilter<"Role"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type PermissionWhereInput = {
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    id?: StringFilter<"Permission"> | string
    name?: StringFilter<"Permission"> | string
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
    roles?: RoleListRelationFilter
  }

  export type PermissionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roles?: RoleOrderByRelationAggregateInput
  }

  export type PermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
    roles?: RoleListRelationFilter
  }, "id" | "name">

  export type PermissionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PermissionCountOrderByAggregateInput
    _max?: PermissionMaxOrderByAggregateInput
    _min?: PermissionMinOrderByAggregateInput
  }

  export type PermissionScalarWhereWithAggregatesInput = {
    AND?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    OR?: PermissionScalarWhereWithAggregatesInput[]
    NOT?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Permission"> | string
    name?: StringWithAggregatesFilter<"Permission"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
  }

  export type FontAuthorWhereInput = {
    AND?: FontAuthorWhereInput | FontAuthorWhereInput[]
    OR?: FontAuthorWhereInput[]
    NOT?: FontAuthorWhereInput | FontAuthorWhereInput[]
    id?: StringFilter<"FontAuthor"> | string
    slug?: StringFilter<"FontAuthor"> | string
    name?: StringFilter<"FontAuthor"> | string
    type?: StringFilter<"FontAuthor"> | string
    email?: StringFilter<"FontAuthor"> | string
    supportEmail?: StringNullableFilter<"FontAuthor"> | string | null
    avatarUrl?: StringNullableFilter<"FontAuthor"> | string | null
    bannerUrl?: StringNullableFilter<"FontAuthor"> | string | null
    bio?: StringNullableFilter<"FontAuthor"> | string | null
    website?: StringNullableFilter<"FontAuthor"> | string | null
    dafontProfileUrl?: StringNullableFilter<"FontAuthor"> | string | null
    profileInfoUrl?: StringNullableFilter<"FontAuthor"> | string | null
    donation?: StringNullableFilter<"FontAuthor"> | string | null
    nationality?: StringNullableFilter<"FontAuthor"> | string | null
    languagesSpoken?: StringNullableFilter<"FontAuthor"> | string | null
    isVerified?: BoolFilter<"FontAuthor"> | boolean
    socialLinks?: StringNullableFilter<"FontAuthor"> | string | null
    metrics?: StringNullableFilter<"FontAuthor"> | string | null
    businessInfo?: StringNullableFilter<"FontAuthor"> | string | null
    specialties?: StringNullableFilter<"FontAuthor"> | string | null
    status?: StringFilter<"FontAuthor"> | string
    createdAt?: DateTimeFilter<"FontAuthor"> | Date | string
    updatedAt?: DateTimeFilter<"FontAuthor"> | Date | string
    fonts?: IngredientListRelationFilter
  }

  export type FontAuthorOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    type?: SortOrder
    email?: SortOrder
    supportEmail?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    bannerUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    dafontProfileUrl?: SortOrderInput | SortOrder
    profileInfoUrl?: SortOrderInput | SortOrder
    donation?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    languagesSpoken?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    socialLinks?: SortOrderInput | SortOrder
    metrics?: SortOrderInput | SortOrder
    businessInfo?: SortOrderInput | SortOrder
    specialties?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fonts?: IngredientOrderByRelationAggregateInput
  }

  export type FontAuthorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: FontAuthorWhereInput | FontAuthorWhereInput[]
    OR?: FontAuthorWhereInput[]
    NOT?: FontAuthorWhereInput | FontAuthorWhereInput[]
    name?: StringFilter<"FontAuthor"> | string
    type?: StringFilter<"FontAuthor"> | string
    email?: StringFilter<"FontAuthor"> | string
    supportEmail?: StringNullableFilter<"FontAuthor"> | string | null
    avatarUrl?: StringNullableFilter<"FontAuthor"> | string | null
    bannerUrl?: StringNullableFilter<"FontAuthor"> | string | null
    bio?: StringNullableFilter<"FontAuthor"> | string | null
    website?: StringNullableFilter<"FontAuthor"> | string | null
    dafontProfileUrl?: StringNullableFilter<"FontAuthor"> | string | null
    profileInfoUrl?: StringNullableFilter<"FontAuthor"> | string | null
    donation?: StringNullableFilter<"FontAuthor"> | string | null
    nationality?: StringNullableFilter<"FontAuthor"> | string | null
    languagesSpoken?: StringNullableFilter<"FontAuthor"> | string | null
    isVerified?: BoolFilter<"FontAuthor"> | boolean
    socialLinks?: StringNullableFilter<"FontAuthor"> | string | null
    metrics?: StringNullableFilter<"FontAuthor"> | string | null
    businessInfo?: StringNullableFilter<"FontAuthor"> | string | null
    specialties?: StringNullableFilter<"FontAuthor"> | string | null
    status?: StringFilter<"FontAuthor"> | string
    createdAt?: DateTimeFilter<"FontAuthor"> | Date | string
    updatedAt?: DateTimeFilter<"FontAuthor"> | Date | string
    fonts?: IngredientListRelationFilter
  }, "id" | "slug">

  export type FontAuthorOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    type?: SortOrder
    email?: SortOrder
    supportEmail?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    bannerUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    dafontProfileUrl?: SortOrderInput | SortOrder
    profileInfoUrl?: SortOrderInput | SortOrder
    donation?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    languagesSpoken?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    socialLinks?: SortOrderInput | SortOrder
    metrics?: SortOrderInput | SortOrder
    businessInfo?: SortOrderInput | SortOrder
    specialties?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FontAuthorCountOrderByAggregateInput
    _max?: FontAuthorMaxOrderByAggregateInput
    _min?: FontAuthorMinOrderByAggregateInput
  }

  export type FontAuthorScalarWhereWithAggregatesInput = {
    AND?: FontAuthorScalarWhereWithAggregatesInput | FontAuthorScalarWhereWithAggregatesInput[]
    OR?: FontAuthorScalarWhereWithAggregatesInput[]
    NOT?: FontAuthorScalarWhereWithAggregatesInput | FontAuthorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FontAuthor"> | string
    slug?: StringWithAggregatesFilter<"FontAuthor"> | string
    name?: StringWithAggregatesFilter<"FontAuthor"> | string
    type?: StringWithAggregatesFilter<"FontAuthor"> | string
    email?: StringWithAggregatesFilter<"FontAuthor"> | string
    supportEmail?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    bannerUrl?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    bio?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    website?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    dafontProfileUrl?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    profileInfoUrl?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    donation?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    nationality?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    languagesSpoken?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    isVerified?: BoolWithAggregatesFilter<"FontAuthor"> | boolean
    socialLinks?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    metrics?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    businessInfo?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    specialties?: StringNullableWithAggregatesFilter<"FontAuthor"> | string | null
    status?: StringWithAggregatesFilter<"FontAuthor"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FontAuthor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FontAuthor"> | Date | string
  }

  export type SeoModuleWhereInput = {
    AND?: SeoModuleWhereInput | SeoModuleWhereInput[]
    OR?: SeoModuleWhereInput[]
    NOT?: SeoModuleWhereInput | SeoModuleWhereInput[]
    id?: StringFilter<"SeoModule"> | string
    metaTitle?: StringNullableFilter<"SeoModule"> | string | null
    metaDescription?: StringNullableFilter<"SeoModule"> | string | null
    keywords?: StringNullableFilter<"SeoModule"> | string | null
    ogTitle?: StringNullableFilter<"SeoModule"> | string | null
    ogDescription?: StringNullableFilter<"SeoModule"> | string | null
    ogImageUrl?: StringNullableFilter<"SeoModule"> | string | null
    ogImageAlt?: StringNullableFilter<"SeoModule"> | string | null
    twitterCard?: StringFilter<"SeoModule"> | string
    twitterTitle?: StringNullableFilter<"SeoModule"> | string | null
    twitterDescription?: StringNullableFilter<"SeoModule"> | string | null
    twitterImageUrl?: StringNullableFilter<"SeoModule"> | string | null
    twitterImageAlt?: StringNullableFilter<"SeoModule"> | string | null
    canonicalUrl?: StringNullableFilter<"SeoModule"> | string | null
    noIndex?: BoolFilter<"SeoModule"> | boolean
    createdAt?: DateTimeFilter<"SeoModule"> | Date | string
    updatedAt?: DateTimeFilter<"SeoModule"> | Date | string
    post?: XOR<PostNullableScalarRelationFilter, PostWhereInput> | null
    prescription?: XOR<PrescriptionNullableScalarRelationFilter, PrescriptionWhereInput> | null
  }

  export type SeoModuleOrderByWithRelationInput = {
    id?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    ogTitle?: SortOrderInput | SortOrder
    ogDescription?: SortOrderInput | SortOrder
    ogImageUrl?: SortOrderInput | SortOrder
    ogImageAlt?: SortOrderInput | SortOrder
    twitterCard?: SortOrder
    twitterTitle?: SortOrderInput | SortOrder
    twitterDescription?: SortOrderInput | SortOrder
    twitterImageUrl?: SortOrderInput | SortOrder
    twitterImageAlt?: SortOrderInput | SortOrder
    canonicalUrl?: SortOrderInput | SortOrder
    noIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    post?: PostOrderByWithRelationInput
    prescription?: PrescriptionOrderByWithRelationInput
  }

  export type SeoModuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SeoModuleWhereInput | SeoModuleWhereInput[]
    OR?: SeoModuleWhereInput[]
    NOT?: SeoModuleWhereInput | SeoModuleWhereInput[]
    metaTitle?: StringNullableFilter<"SeoModule"> | string | null
    metaDescription?: StringNullableFilter<"SeoModule"> | string | null
    keywords?: StringNullableFilter<"SeoModule"> | string | null
    ogTitle?: StringNullableFilter<"SeoModule"> | string | null
    ogDescription?: StringNullableFilter<"SeoModule"> | string | null
    ogImageUrl?: StringNullableFilter<"SeoModule"> | string | null
    ogImageAlt?: StringNullableFilter<"SeoModule"> | string | null
    twitterCard?: StringFilter<"SeoModule"> | string
    twitterTitle?: StringNullableFilter<"SeoModule"> | string | null
    twitterDescription?: StringNullableFilter<"SeoModule"> | string | null
    twitterImageUrl?: StringNullableFilter<"SeoModule"> | string | null
    twitterImageAlt?: StringNullableFilter<"SeoModule"> | string | null
    canonicalUrl?: StringNullableFilter<"SeoModule"> | string | null
    noIndex?: BoolFilter<"SeoModule"> | boolean
    createdAt?: DateTimeFilter<"SeoModule"> | Date | string
    updatedAt?: DateTimeFilter<"SeoModule"> | Date | string
    post?: XOR<PostNullableScalarRelationFilter, PostWhereInput> | null
    prescription?: XOR<PrescriptionNullableScalarRelationFilter, PrescriptionWhereInput> | null
  }, "id">

  export type SeoModuleOrderByWithAggregationInput = {
    id?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    ogTitle?: SortOrderInput | SortOrder
    ogDescription?: SortOrderInput | SortOrder
    ogImageUrl?: SortOrderInput | SortOrder
    ogImageAlt?: SortOrderInput | SortOrder
    twitterCard?: SortOrder
    twitterTitle?: SortOrderInput | SortOrder
    twitterDescription?: SortOrderInput | SortOrder
    twitterImageUrl?: SortOrderInput | SortOrder
    twitterImageAlt?: SortOrderInput | SortOrder
    canonicalUrl?: SortOrderInput | SortOrder
    noIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SeoModuleCountOrderByAggregateInput
    _max?: SeoModuleMaxOrderByAggregateInput
    _min?: SeoModuleMinOrderByAggregateInput
  }

  export type SeoModuleScalarWhereWithAggregatesInput = {
    AND?: SeoModuleScalarWhereWithAggregatesInput | SeoModuleScalarWhereWithAggregatesInput[]
    OR?: SeoModuleScalarWhereWithAggregatesInput[]
    NOT?: SeoModuleScalarWhereWithAggregatesInput | SeoModuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SeoModule"> | string
    metaTitle?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    metaDescription?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    keywords?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    ogTitle?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    ogDescription?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    ogImageUrl?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    ogImageAlt?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    twitterCard?: StringWithAggregatesFilter<"SeoModule"> | string
    twitterTitle?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    twitterDescription?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    twitterImageUrl?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    twitterImageAlt?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    canonicalUrl?: StringNullableWithAggregatesFilter<"SeoModule"> | string | null
    noIndex?: BoolWithAggregatesFilter<"SeoModule"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SeoModule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SeoModule"> | Date | string
  }

  export type FontVariantWhereInput = {
    AND?: FontVariantWhereInput | FontVariantWhereInput[]
    OR?: FontVariantWhereInput[]
    NOT?: FontVariantWhereInput | FontVariantWhereInput[]
    id?: StringFilter<"FontVariant"> | string
    fontFamilyName?: StringFilter<"FontVariant"> | string
    weight?: IntFilter<"FontVariant"> | number
    style?: StringFilter<"FontVariant"> | string
    woff2Url?: StringFilter<"FontVariant"> | string
    label?: StringFilter<"FontVariant"> | string
    ingredientId?: StringFilter<"FontVariant"> | string
    ingredient?: XOR<IngredientScalarRelationFilter, IngredientWhereInput>
  }

  export type FontVariantOrderByWithRelationInput = {
    id?: SortOrder
    fontFamilyName?: SortOrder
    weight?: SortOrder
    style?: SortOrder
    woff2Url?: SortOrder
    label?: SortOrder
    ingredientId?: SortOrder
    ingredient?: IngredientOrderByWithRelationInput
  }

  export type FontVariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FontVariantWhereInput | FontVariantWhereInput[]
    OR?: FontVariantWhereInput[]
    NOT?: FontVariantWhereInput | FontVariantWhereInput[]
    fontFamilyName?: StringFilter<"FontVariant"> | string
    weight?: IntFilter<"FontVariant"> | number
    style?: StringFilter<"FontVariant"> | string
    woff2Url?: StringFilter<"FontVariant"> | string
    label?: StringFilter<"FontVariant"> | string
    ingredientId?: StringFilter<"FontVariant"> | string
    ingredient?: XOR<IngredientScalarRelationFilter, IngredientWhereInput>
  }, "id">

  export type FontVariantOrderByWithAggregationInput = {
    id?: SortOrder
    fontFamilyName?: SortOrder
    weight?: SortOrder
    style?: SortOrder
    woff2Url?: SortOrder
    label?: SortOrder
    ingredientId?: SortOrder
    _count?: FontVariantCountOrderByAggregateInput
    _avg?: FontVariantAvgOrderByAggregateInput
    _max?: FontVariantMaxOrderByAggregateInput
    _min?: FontVariantMinOrderByAggregateInput
    _sum?: FontVariantSumOrderByAggregateInput
  }

  export type FontVariantScalarWhereWithAggregatesInput = {
    AND?: FontVariantScalarWhereWithAggregatesInput | FontVariantScalarWhereWithAggregatesInput[]
    OR?: FontVariantScalarWhereWithAggregatesInput[]
    NOT?: FontVariantScalarWhereWithAggregatesInput | FontVariantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FontVariant"> | string
    fontFamilyName?: StringWithAggregatesFilter<"FontVariant"> | string
    weight?: IntWithAggregatesFilter<"FontVariant"> | number
    style?: StringWithAggregatesFilter<"FontVariant"> | string
    woff2Url?: StringWithAggregatesFilter<"FontVariant"> | string
    label?: StringWithAggregatesFilter<"FontVariant"> | string
    ingredientId?: StringWithAggregatesFilter<"FontVariant"> | string
  }

  export type IngredientWhereInput = {
    AND?: IngredientWhereInput | IngredientWhereInput[]
    OR?: IngredientWhereInput[]
    NOT?: IngredientWhereInput | IngredientWhereInput[]
    id?: StringFilter<"Ingredient"> | string
    name?: StringFilter<"Ingredient"> | string
    slug?: StringFilter<"Ingredient"> | string
    category?: StringFilter<"Ingredient"> | string
    creator?: StringNullableFilter<"Ingredient"> | string | null
    rating?: StringFilter<"Ingredient"> | string
    symbol?: StringNullableFilter<"Ingredient"> | string | null
    formula?: StringNullableFilter<"Ingredient"> | string | null
    importedFrom?: StringNullableFilter<"Ingredient"> | string | null
    licenseType?: StringNullableFilter<"Ingredient"> | string | null
    isVariable?: BoolFilter<"Ingredient"> | boolean
    userRating?: FloatNullableFilter<"Ingredient"> | number | null
    userRatingsCount?: IntNullableFilter<"Ingredient"> | number | null
    authorId?: StringNullableFilter<"Ingredient"> | string | null
    createdAt?: DateTimeFilter<"Ingredient"> | Date | string
    updatedAt?: DateTimeFilter<"Ingredient"> | Date | string
    author?: XOR<FontAuthorNullableScalarRelationFilter, FontAuthorWhereInput> | null
    variants?: FontVariantListRelationFilter
    formulas?: FormulaListRelationFilter
    primaryPrescriptions?: PrescriptionListRelationFilter
    secondaryPrescriptions?: PrescriptionListRelationFilter
    tags?: TagListRelationFilter
    posts?: PostListRelationFilter
  }

  export type IngredientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    creator?: SortOrderInput | SortOrder
    rating?: SortOrder
    symbol?: SortOrderInput | SortOrder
    formula?: SortOrderInput | SortOrder
    importedFrom?: SortOrderInput | SortOrder
    licenseType?: SortOrderInput | SortOrder
    isVariable?: SortOrder
    userRating?: SortOrderInput | SortOrder
    userRatingsCount?: SortOrderInput | SortOrder
    authorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    author?: FontAuthorOrderByWithRelationInput
    variants?: FontVariantOrderByRelationAggregateInput
    formulas?: FormulaOrderByRelationAggregateInput
    primaryPrescriptions?: PrescriptionOrderByRelationAggregateInput
    secondaryPrescriptions?: PrescriptionOrderByRelationAggregateInput
    tags?: TagOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
  }

  export type IngredientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: IngredientWhereInput | IngredientWhereInput[]
    OR?: IngredientWhereInput[]
    NOT?: IngredientWhereInput | IngredientWhereInput[]
    name?: StringFilter<"Ingredient"> | string
    category?: StringFilter<"Ingredient"> | string
    creator?: StringNullableFilter<"Ingredient"> | string | null
    rating?: StringFilter<"Ingredient"> | string
    symbol?: StringNullableFilter<"Ingredient"> | string | null
    formula?: StringNullableFilter<"Ingredient"> | string | null
    importedFrom?: StringNullableFilter<"Ingredient"> | string | null
    licenseType?: StringNullableFilter<"Ingredient"> | string | null
    isVariable?: BoolFilter<"Ingredient"> | boolean
    userRating?: FloatNullableFilter<"Ingredient"> | number | null
    userRatingsCount?: IntNullableFilter<"Ingredient"> | number | null
    authorId?: StringNullableFilter<"Ingredient"> | string | null
    createdAt?: DateTimeFilter<"Ingredient"> | Date | string
    updatedAt?: DateTimeFilter<"Ingredient"> | Date | string
    author?: XOR<FontAuthorNullableScalarRelationFilter, FontAuthorWhereInput> | null
    variants?: FontVariantListRelationFilter
    formulas?: FormulaListRelationFilter
    primaryPrescriptions?: PrescriptionListRelationFilter
    secondaryPrescriptions?: PrescriptionListRelationFilter
    tags?: TagListRelationFilter
    posts?: PostListRelationFilter
  }, "id" | "slug">

  export type IngredientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    creator?: SortOrderInput | SortOrder
    rating?: SortOrder
    symbol?: SortOrderInput | SortOrder
    formula?: SortOrderInput | SortOrder
    importedFrom?: SortOrderInput | SortOrder
    licenseType?: SortOrderInput | SortOrder
    isVariable?: SortOrder
    userRating?: SortOrderInput | SortOrder
    userRatingsCount?: SortOrderInput | SortOrder
    authorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IngredientCountOrderByAggregateInput
    _avg?: IngredientAvgOrderByAggregateInput
    _max?: IngredientMaxOrderByAggregateInput
    _min?: IngredientMinOrderByAggregateInput
    _sum?: IngredientSumOrderByAggregateInput
  }

  export type IngredientScalarWhereWithAggregatesInput = {
    AND?: IngredientScalarWhereWithAggregatesInput | IngredientScalarWhereWithAggregatesInput[]
    OR?: IngredientScalarWhereWithAggregatesInput[]
    NOT?: IngredientScalarWhereWithAggregatesInput | IngredientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ingredient"> | string
    name?: StringWithAggregatesFilter<"Ingredient"> | string
    slug?: StringWithAggregatesFilter<"Ingredient"> | string
    category?: StringWithAggregatesFilter<"Ingredient"> | string
    creator?: StringNullableWithAggregatesFilter<"Ingredient"> | string | null
    rating?: StringWithAggregatesFilter<"Ingredient"> | string
    symbol?: StringNullableWithAggregatesFilter<"Ingredient"> | string | null
    formula?: StringNullableWithAggregatesFilter<"Ingredient"> | string | null
    importedFrom?: StringNullableWithAggregatesFilter<"Ingredient"> | string | null
    licenseType?: StringNullableWithAggregatesFilter<"Ingredient"> | string | null
    isVariable?: BoolWithAggregatesFilter<"Ingredient"> | boolean
    userRating?: FloatNullableWithAggregatesFilter<"Ingredient"> | number | null
    userRatingsCount?: IntNullableWithAggregatesFilter<"Ingredient"> | number | null
    authorId?: StringNullableWithAggregatesFilter<"Ingredient"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Ingredient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ingredient"> | Date | string
  }

  export type FormulaWhereInput = {
    AND?: FormulaWhereInput | FormulaWhereInput[]
    OR?: FormulaWhereInput[]
    NOT?: FormulaWhereInput | FormulaWhereInput[]
    id?: StringFilter<"Formula"> | string
    name?: StringFilter<"Formula"> | string
    description?: StringNullableFilter<"Formula"> | string | null
    slug?: StringFilter<"Formula"> | string
    fontCategory?: StringFilter<"Formula"> | string
    createdAt?: DateTimeFilter<"Formula"> | Date | string
    updatedAt?: DateTimeFilter<"Formula"> | Date | string
    fonts?: IngredientListRelationFilter
    tags?: TagListRelationFilter
  }

  export type FormulaOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    slug?: SortOrder
    fontCategory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fonts?: IngredientOrderByRelationAggregateInput
    tags?: TagOrderByRelationAggregateInput
  }

  export type FormulaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: FormulaWhereInput | FormulaWhereInput[]
    OR?: FormulaWhereInput[]
    NOT?: FormulaWhereInput | FormulaWhereInput[]
    name?: StringFilter<"Formula"> | string
    description?: StringNullableFilter<"Formula"> | string | null
    fontCategory?: StringFilter<"Formula"> | string
    createdAt?: DateTimeFilter<"Formula"> | Date | string
    updatedAt?: DateTimeFilter<"Formula"> | Date | string
    fonts?: IngredientListRelationFilter
    tags?: TagListRelationFilter
  }, "id" | "slug">

  export type FormulaOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    slug?: SortOrder
    fontCategory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FormulaCountOrderByAggregateInput
    _max?: FormulaMaxOrderByAggregateInput
    _min?: FormulaMinOrderByAggregateInput
  }

  export type FormulaScalarWhereWithAggregatesInput = {
    AND?: FormulaScalarWhereWithAggregatesInput | FormulaScalarWhereWithAggregatesInput[]
    OR?: FormulaScalarWhereWithAggregatesInput[]
    NOT?: FormulaScalarWhereWithAggregatesInput | FormulaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Formula"> | string
    name?: StringWithAggregatesFilter<"Formula"> | string
    description?: StringNullableWithAggregatesFilter<"Formula"> | string | null
    slug?: StringWithAggregatesFilter<"Formula"> | string
    fontCategory?: StringWithAggregatesFilter<"Formula"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Formula"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Formula"> | Date | string
  }

  export type PrescriptionWhereInput = {
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    id?: StringFilter<"Prescription"> | string
    name?: StringFilter<"Prescription"> | string
    slug?: StringFilter<"Prescription"> | string
    description?: StringNullableFilter<"Prescription"> | string | null
    imageUrl?: StringNullableFilter<"Prescription"> | string | null
    insight?: StringNullableFilter<"Prescription"> | string | null
    published?: BoolFilter<"Prescription"> | boolean
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    primaryFontId?: StringFilter<"Prescription"> | string
    secondaryFontId?: StringFilter<"Prescription"> | string
    seoId?: StringNullableFilter<"Prescription"> | string | null
    primaryFont?: XOR<IngredientScalarRelationFilter, IngredientWhereInput>
    secondaryFont?: XOR<IngredientScalarRelationFilter, IngredientWhereInput>
    tags?: TagListRelationFilter
    seo?: XOR<SeoModuleNullableScalarRelationFilter, SeoModuleWhereInput> | null
  }

  export type PrescriptionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    insight?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    primaryFontId?: SortOrder
    secondaryFontId?: SortOrder
    seoId?: SortOrderInput | SortOrder
    primaryFont?: IngredientOrderByWithRelationInput
    secondaryFont?: IngredientOrderByWithRelationInput
    tags?: TagOrderByRelationAggregateInput
    seo?: SeoModuleOrderByWithRelationInput
  }

  export type PrescriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    seoId?: string
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    name?: StringFilter<"Prescription"> | string
    description?: StringNullableFilter<"Prescription"> | string | null
    imageUrl?: StringNullableFilter<"Prescription"> | string | null
    insight?: StringNullableFilter<"Prescription"> | string | null
    published?: BoolFilter<"Prescription"> | boolean
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    primaryFontId?: StringFilter<"Prescription"> | string
    secondaryFontId?: StringFilter<"Prescription"> | string
    primaryFont?: XOR<IngredientScalarRelationFilter, IngredientWhereInput>
    secondaryFont?: XOR<IngredientScalarRelationFilter, IngredientWhereInput>
    tags?: TagListRelationFilter
    seo?: XOR<SeoModuleNullableScalarRelationFilter, SeoModuleWhereInput> | null
  }, "id" | "slug" | "seoId">

  export type PrescriptionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    insight?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    primaryFontId?: SortOrder
    secondaryFontId?: SortOrder
    seoId?: SortOrderInput | SortOrder
    _count?: PrescriptionCountOrderByAggregateInput
    _max?: PrescriptionMaxOrderByAggregateInput
    _min?: PrescriptionMinOrderByAggregateInput
  }

  export type PrescriptionScalarWhereWithAggregatesInput = {
    AND?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    OR?: PrescriptionScalarWhereWithAggregatesInput[]
    NOT?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Prescription"> | string
    name?: StringWithAggregatesFilter<"Prescription"> | string
    slug?: StringWithAggregatesFilter<"Prescription"> | string
    description?: StringNullableWithAggregatesFilter<"Prescription"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Prescription"> | string | null
    insight?: StringNullableWithAggregatesFilter<"Prescription"> | string | null
    published?: BoolWithAggregatesFilter<"Prescription"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
    primaryFontId?: StringWithAggregatesFilter<"Prescription"> | string
    secondaryFontId?: StringWithAggregatesFilter<"Prescription"> | string
    seoId?: StringNullableWithAggregatesFilter<"Prescription"> | string | null
  }

  export type AdminSettingsWhereInput = {
    AND?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    OR?: AdminSettingsWhereInput[]
    NOT?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    id?: StringFilter<"AdminSettings"> | string
    siteLanguage?: StringFilter<"AdminSettings"> | string
    siteTimezone?: StringFilter<"AdminSettings"> | string
    maintenanceActive?: BoolFilter<"AdminSettings"> | boolean
    maintenanceMessage?: StringNullableFilter<"AdminSettings"> | string | null
    letterTFontFamily?: StringNullableFilter<"AdminSettings"> | string | null
    letterTFontSizePercent?: IntFilter<"AdminSettings"> | number
    logoLightModeColor?: StringNullableFilter<"AdminSettings"> | string | null
    logoDarkModeColor?: StringNullableFilter<"AdminSettings"> | string | null
    heroWordmarkFonts?: StringNullableFilter<"AdminSettings"> | string | null
    heroWordmarkLoop?: BoolFilter<"AdminSettings"> | boolean
    heroWordmarkLoopSpeed?: FloatFilter<"AdminSettings"> | number
    marqueeActive?: BoolFilter<"AdminSettings"> | boolean
    marqueeText?: StringNullableFilter<"AdminSettings"> | string | null
    marqueeType?: StringFilter<"AdminSettings"> | string
    marqueeTextColor?: StringNullableFilter<"AdminSettings"> | string | null
    marqueeBgColor?: StringNullableFilter<"AdminSettings"> | string | null
    popupActive?: BoolFilter<"AdminSettings"> | boolean
    popupImageUrl?: StringNullableFilter<"AdminSettings"> | string | null
    popupHeadline?: StringNullableFilter<"AdminSettings"> | string | null
    popupMessage?: StringNullableFilter<"AdminSettings"> | string | null
    popupCtaLabel?: StringNullableFilter<"AdminSettings"> | string | null
    popupCtaLink?: StringNullableFilter<"AdminSettings"> | string | null
    popupFrequency?: StringFilter<"AdminSettings"> | string
    popupFrequencyDays?: IntFilter<"AdminSettings"> | number
    emailProvider?: StringFilter<"AdminSettings"> | string
    gmailClientId?: StringNullableFilter<"AdminSettings"> | string | null
    gmailClientSecret?: StringNullableFilter<"AdminSettings"> | string | null
    gmailSenderName?: StringNullableFilter<"AdminSettings"> | string | null
    gmailConnected?: BoolFilter<"AdminSettings"> | boolean
    gmailConnectedEmail?: StringNullableFilter<"AdminSettings"> | string | null
    gmailRefreshToken?: StringNullableFilter<"AdminSettings"> | string | null
    smtpHost?: StringNullableFilter<"AdminSettings"> | string | null
    smtpPort?: IntFilter<"AdminSettings"> | number
    smtpUser?: StringNullableFilter<"AdminSettings"> | string | null
    smtpPassword?: StringNullableFilter<"AdminSettings"> | string | null
    smtpSecure?: BoolFilter<"AdminSettings"> | boolean
    smtpFromEmail?: StringNullableFilter<"AdminSettings"> | string | null
    smtpFromName?: StringNullableFilter<"AdminSettings"> | string | null
    smtpAuthType?: StringFilter<"AdminSettings"> | string
    smtpOauthClientId?: StringNullableFilter<"AdminSettings"> | string | null
    smtpOauthClientSecret?: StringNullableFilter<"AdminSettings"> | string | null
    smtpOauthRefreshToken?: StringNullableFilter<"AdminSettings"> | string | null
    smtpOauthAccessUrl?: StringNullableFilter<"AdminSettings"> | string | null
    resendApiKey?: StringNullableFilter<"AdminSettings"> | string | null
    resendFromEmail?: StringNullableFilter<"AdminSettings"> | string | null
    resendFromName?: StringNullableFilter<"AdminSettings"> | string | null
    credentialsVault?: StringNullableFilter<"AdminSettings"> | string | null
    integrationsConfig?: StringNullableFilter<"AdminSettings"> | string | null
    notificationChannels?: StringNullableFilter<"AdminSettings"> | string | null
    slackWebhookUrl?: StringNullableFilter<"AdminSettings"> | string | null
    require2fa?: BoolFilter<"AdminSettings"> | boolean
    sessionTimeoutMinutes?: IntFilter<"AdminSettings"> | number
    ipAllowlist?: StringNullableFilter<"AdminSettings"> | string | null
    auditRetentionDays?: IntFilter<"AdminSettings"> | number
    cookieBannerActive?: BoolFilter<"AdminSettings"> | boolean
    cookieBannerText?: StringNullableFilter<"AdminSettings"> | string | null
    privacyPolicyUrl?: StringNullableFilter<"AdminSettings"> | string | null
    termsOfServiceUrl?: StringNullableFilter<"AdminSettings"> | string | null
    gdprRequestEmail?: StringNullableFilter<"AdminSettings"> | string | null
    createdAt?: DateTimeFilter<"AdminSettings"> | Date | string
    updatedAt?: DateTimeFilter<"AdminSettings"> | Date | string
  }

  export type AdminSettingsOrderByWithRelationInput = {
    id?: SortOrder
    siteLanguage?: SortOrder
    siteTimezone?: SortOrder
    maintenanceActive?: SortOrder
    maintenanceMessage?: SortOrderInput | SortOrder
    letterTFontFamily?: SortOrderInput | SortOrder
    letterTFontSizePercent?: SortOrder
    logoLightModeColor?: SortOrderInput | SortOrder
    logoDarkModeColor?: SortOrderInput | SortOrder
    heroWordmarkFonts?: SortOrderInput | SortOrder
    heroWordmarkLoop?: SortOrder
    heroWordmarkLoopSpeed?: SortOrder
    marqueeActive?: SortOrder
    marqueeText?: SortOrderInput | SortOrder
    marqueeType?: SortOrder
    marqueeTextColor?: SortOrderInput | SortOrder
    marqueeBgColor?: SortOrderInput | SortOrder
    popupActive?: SortOrder
    popupImageUrl?: SortOrderInput | SortOrder
    popupHeadline?: SortOrderInput | SortOrder
    popupMessage?: SortOrderInput | SortOrder
    popupCtaLabel?: SortOrderInput | SortOrder
    popupCtaLink?: SortOrderInput | SortOrder
    popupFrequency?: SortOrder
    popupFrequencyDays?: SortOrder
    emailProvider?: SortOrder
    gmailClientId?: SortOrderInput | SortOrder
    gmailClientSecret?: SortOrderInput | SortOrder
    gmailSenderName?: SortOrderInput | SortOrder
    gmailConnected?: SortOrder
    gmailConnectedEmail?: SortOrderInput | SortOrder
    gmailRefreshToken?: SortOrderInput | SortOrder
    smtpHost?: SortOrderInput | SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrderInput | SortOrder
    smtpPassword?: SortOrderInput | SortOrder
    smtpSecure?: SortOrder
    smtpFromEmail?: SortOrderInput | SortOrder
    smtpFromName?: SortOrderInput | SortOrder
    smtpAuthType?: SortOrder
    smtpOauthClientId?: SortOrderInput | SortOrder
    smtpOauthClientSecret?: SortOrderInput | SortOrder
    smtpOauthRefreshToken?: SortOrderInput | SortOrder
    smtpOauthAccessUrl?: SortOrderInput | SortOrder
    resendApiKey?: SortOrderInput | SortOrder
    resendFromEmail?: SortOrderInput | SortOrder
    resendFromName?: SortOrderInput | SortOrder
    credentialsVault?: SortOrderInput | SortOrder
    integrationsConfig?: SortOrderInput | SortOrder
    notificationChannels?: SortOrderInput | SortOrder
    slackWebhookUrl?: SortOrderInput | SortOrder
    require2fa?: SortOrder
    sessionTimeoutMinutes?: SortOrder
    ipAllowlist?: SortOrderInput | SortOrder
    auditRetentionDays?: SortOrder
    cookieBannerActive?: SortOrder
    cookieBannerText?: SortOrderInput | SortOrder
    privacyPolicyUrl?: SortOrderInput | SortOrder
    termsOfServiceUrl?: SortOrderInput | SortOrder
    gdprRequestEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    OR?: AdminSettingsWhereInput[]
    NOT?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    siteLanguage?: StringFilter<"AdminSettings"> | string
    siteTimezone?: StringFilter<"AdminSettings"> | string
    maintenanceActive?: BoolFilter<"AdminSettings"> | boolean
    maintenanceMessage?: StringNullableFilter<"AdminSettings"> | string | null
    letterTFontFamily?: StringNullableFilter<"AdminSettings"> | string | null
    letterTFontSizePercent?: IntFilter<"AdminSettings"> | number
    logoLightModeColor?: StringNullableFilter<"AdminSettings"> | string | null
    logoDarkModeColor?: StringNullableFilter<"AdminSettings"> | string | null
    heroWordmarkFonts?: StringNullableFilter<"AdminSettings"> | string | null
    heroWordmarkLoop?: BoolFilter<"AdminSettings"> | boolean
    heroWordmarkLoopSpeed?: FloatFilter<"AdminSettings"> | number
    marqueeActive?: BoolFilter<"AdminSettings"> | boolean
    marqueeText?: StringNullableFilter<"AdminSettings"> | string | null
    marqueeType?: StringFilter<"AdminSettings"> | string
    marqueeTextColor?: StringNullableFilter<"AdminSettings"> | string | null
    marqueeBgColor?: StringNullableFilter<"AdminSettings"> | string | null
    popupActive?: BoolFilter<"AdminSettings"> | boolean
    popupImageUrl?: StringNullableFilter<"AdminSettings"> | string | null
    popupHeadline?: StringNullableFilter<"AdminSettings"> | string | null
    popupMessage?: StringNullableFilter<"AdminSettings"> | string | null
    popupCtaLabel?: StringNullableFilter<"AdminSettings"> | string | null
    popupCtaLink?: StringNullableFilter<"AdminSettings"> | string | null
    popupFrequency?: StringFilter<"AdminSettings"> | string
    popupFrequencyDays?: IntFilter<"AdminSettings"> | number
    emailProvider?: StringFilter<"AdminSettings"> | string
    gmailClientId?: StringNullableFilter<"AdminSettings"> | string | null
    gmailClientSecret?: StringNullableFilter<"AdminSettings"> | string | null
    gmailSenderName?: StringNullableFilter<"AdminSettings"> | string | null
    gmailConnected?: BoolFilter<"AdminSettings"> | boolean
    gmailConnectedEmail?: StringNullableFilter<"AdminSettings"> | string | null
    gmailRefreshToken?: StringNullableFilter<"AdminSettings"> | string | null
    smtpHost?: StringNullableFilter<"AdminSettings"> | string | null
    smtpPort?: IntFilter<"AdminSettings"> | number
    smtpUser?: StringNullableFilter<"AdminSettings"> | string | null
    smtpPassword?: StringNullableFilter<"AdminSettings"> | string | null
    smtpSecure?: BoolFilter<"AdminSettings"> | boolean
    smtpFromEmail?: StringNullableFilter<"AdminSettings"> | string | null
    smtpFromName?: StringNullableFilter<"AdminSettings"> | string | null
    smtpAuthType?: StringFilter<"AdminSettings"> | string
    smtpOauthClientId?: StringNullableFilter<"AdminSettings"> | string | null
    smtpOauthClientSecret?: StringNullableFilter<"AdminSettings"> | string | null
    smtpOauthRefreshToken?: StringNullableFilter<"AdminSettings"> | string | null
    smtpOauthAccessUrl?: StringNullableFilter<"AdminSettings"> | string | null
    resendApiKey?: StringNullableFilter<"AdminSettings"> | string | null
    resendFromEmail?: StringNullableFilter<"AdminSettings"> | string | null
    resendFromName?: StringNullableFilter<"AdminSettings"> | string | null
    credentialsVault?: StringNullableFilter<"AdminSettings"> | string | null
    integrationsConfig?: StringNullableFilter<"AdminSettings"> | string | null
    notificationChannels?: StringNullableFilter<"AdminSettings"> | string | null
    slackWebhookUrl?: StringNullableFilter<"AdminSettings"> | string | null
    require2fa?: BoolFilter<"AdminSettings"> | boolean
    sessionTimeoutMinutes?: IntFilter<"AdminSettings"> | number
    ipAllowlist?: StringNullableFilter<"AdminSettings"> | string | null
    auditRetentionDays?: IntFilter<"AdminSettings"> | number
    cookieBannerActive?: BoolFilter<"AdminSettings"> | boolean
    cookieBannerText?: StringNullableFilter<"AdminSettings"> | string | null
    privacyPolicyUrl?: StringNullableFilter<"AdminSettings"> | string | null
    termsOfServiceUrl?: StringNullableFilter<"AdminSettings"> | string | null
    gdprRequestEmail?: StringNullableFilter<"AdminSettings"> | string | null
    createdAt?: DateTimeFilter<"AdminSettings"> | Date | string
    updatedAt?: DateTimeFilter<"AdminSettings"> | Date | string
  }, "id">

  export type AdminSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    siteLanguage?: SortOrder
    siteTimezone?: SortOrder
    maintenanceActive?: SortOrder
    maintenanceMessage?: SortOrderInput | SortOrder
    letterTFontFamily?: SortOrderInput | SortOrder
    letterTFontSizePercent?: SortOrder
    logoLightModeColor?: SortOrderInput | SortOrder
    logoDarkModeColor?: SortOrderInput | SortOrder
    heroWordmarkFonts?: SortOrderInput | SortOrder
    heroWordmarkLoop?: SortOrder
    heroWordmarkLoopSpeed?: SortOrder
    marqueeActive?: SortOrder
    marqueeText?: SortOrderInput | SortOrder
    marqueeType?: SortOrder
    marqueeTextColor?: SortOrderInput | SortOrder
    marqueeBgColor?: SortOrderInput | SortOrder
    popupActive?: SortOrder
    popupImageUrl?: SortOrderInput | SortOrder
    popupHeadline?: SortOrderInput | SortOrder
    popupMessage?: SortOrderInput | SortOrder
    popupCtaLabel?: SortOrderInput | SortOrder
    popupCtaLink?: SortOrderInput | SortOrder
    popupFrequency?: SortOrder
    popupFrequencyDays?: SortOrder
    emailProvider?: SortOrder
    gmailClientId?: SortOrderInput | SortOrder
    gmailClientSecret?: SortOrderInput | SortOrder
    gmailSenderName?: SortOrderInput | SortOrder
    gmailConnected?: SortOrder
    gmailConnectedEmail?: SortOrderInput | SortOrder
    gmailRefreshToken?: SortOrderInput | SortOrder
    smtpHost?: SortOrderInput | SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrderInput | SortOrder
    smtpPassword?: SortOrderInput | SortOrder
    smtpSecure?: SortOrder
    smtpFromEmail?: SortOrderInput | SortOrder
    smtpFromName?: SortOrderInput | SortOrder
    smtpAuthType?: SortOrder
    smtpOauthClientId?: SortOrderInput | SortOrder
    smtpOauthClientSecret?: SortOrderInput | SortOrder
    smtpOauthRefreshToken?: SortOrderInput | SortOrder
    smtpOauthAccessUrl?: SortOrderInput | SortOrder
    resendApiKey?: SortOrderInput | SortOrder
    resendFromEmail?: SortOrderInput | SortOrder
    resendFromName?: SortOrderInput | SortOrder
    credentialsVault?: SortOrderInput | SortOrder
    integrationsConfig?: SortOrderInput | SortOrder
    notificationChannels?: SortOrderInput | SortOrder
    slackWebhookUrl?: SortOrderInput | SortOrder
    require2fa?: SortOrder
    sessionTimeoutMinutes?: SortOrder
    ipAllowlist?: SortOrderInput | SortOrder
    auditRetentionDays?: SortOrder
    cookieBannerActive?: SortOrder
    cookieBannerText?: SortOrderInput | SortOrder
    privacyPolicyUrl?: SortOrderInput | SortOrder
    termsOfServiceUrl?: SortOrderInput | SortOrder
    gdprRequestEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminSettingsCountOrderByAggregateInput
    _avg?: AdminSettingsAvgOrderByAggregateInput
    _max?: AdminSettingsMaxOrderByAggregateInput
    _min?: AdminSettingsMinOrderByAggregateInput
    _sum?: AdminSettingsSumOrderByAggregateInput
  }

  export type AdminSettingsScalarWhereWithAggregatesInput = {
    AND?: AdminSettingsScalarWhereWithAggregatesInput | AdminSettingsScalarWhereWithAggregatesInput[]
    OR?: AdminSettingsScalarWhereWithAggregatesInput[]
    NOT?: AdminSettingsScalarWhereWithAggregatesInput | AdminSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminSettings"> | string
    siteLanguage?: StringWithAggregatesFilter<"AdminSettings"> | string
    siteTimezone?: StringWithAggregatesFilter<"AdminSettings"> | string
    maintenanceActive?: BoolWithAggregatesFilter<"AdminSettings"> | boolean
    maintenanceMessage?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    letterTFontFamily?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    letterTFontSizePercent?: IntWithAggregatesFilter<"AdminSettings"> | number
    logoLightModeColor?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    logoDarkModeColor?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    heroWordmarkFonts?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    heroWordmarkLoop?: BoolWithAggregatesFilter<"AdminSettings"> | boolean
    heroWordmarkLoopSpeed?: FloatWithAggregatesFilter<"AdminSettings"> | number
    marqueeActive?: BoolWithAggregatesFilter<"AdminSettings"> | boolean
    marqueeText?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    marqueeType?: StringWithAggregatesFilter<"AdminSettings"> | string
    marqueeTextColor?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    marqueeBgColor?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    popupActive?: BoolWithAggregatesFilter<"AdminSettings"> | boolean
    popupImageUrl?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    popupHeadline?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    popupMessage?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    popupCtaLabel?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    popupCtaLink?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    popupFrequency?: StringWithAggregatesFilter<"AdminSettings"> | string
    popupFrequencyDays?: IntWithAggregatesFilter<"AdminSettings"> | number
    emailProvider?: StringWithAggregatesFilter<"AdminSettings"> | string
    gmailClientId?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    gmailClientSecret?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    gmailSenderName?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    gmailConnected?: BoolWithAggregatesFilter<"AdminSettings"> | boolean
    gmailConnectedEmail?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    gmailRefreshToken?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    smtpHost?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    smtpPort?: IntWithAggregatesFilter<"AdminSettings"> | number
    smtpUser?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    smtpPassword?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    smtpSecure?: BoolWithAggregatesFilter<"AdminSettings"> | boolean
    smtpFromEmail?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    smtpFromName?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    smtpAuthType?: StringWithAggregatesFilter<"AdminSettings"> | string
    smtpOauthClientId?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    smtpOauthClientSecret?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    smtpOauthRefreshToken?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    smtpOauthAccessUrl?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    resendApiKey?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    resendFromEmail?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    resendFromName?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    credentialsVault?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    integrationsConfig?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    notificationChannels?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    slackWebhookUrl?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    require2fa?: BoolWithAggregatesFilter<"AdminSettings"> | boolean
    sessionTimeoutMinutes?: IntWithAggregatesFilter<"AdminSettings"> | number
    ipAllowlist?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    auditRetentionDays?: IntWithAggregatesFilter<"AdminSettings"> | number
    cookieBannerActive?: BoolWithAggregatesFilter<"AdminSettings"> | boolean
    cookieBannerText?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    privacyPolicyUrl?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    termsOfServiceUrl?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    gdprRequestEmail?: StringNullableWithAggregatesFilter<"AdminSettings"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminSettings"> | Date | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    description?: StringNullableFilter<"Tag"> | string | null
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    updatedAt?: DateTimeFilter<"Tag"> | Date | string
    prescriptions?: PrescriptionListRelationFilter
    ingredients?: IngredientListRelationFilter
    formulas?: FormulaListRelationFilter
    posts?: PostListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    prescriptions?: PrescriptionOrderByRelationAggregateInput
    ingredients?: IngredientOrderByRelationAggregateInput
    formulas?: FormulaOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    description?: StringNullableFilter<"Tag"> | string | null
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    updatedAt?: DateTimeFilter<"Tag"> | Date | string
    prescriptions?: PrescriptionListRelationFilter
    ingredients?: IngredientListRelationFilter
    formulas?: FormulaListRelationFilter
    posts?: PostListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
    description?: StringNullableWithAggregatesFilter<"Tag"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tag"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tag"> | Date | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    postType?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    slug?: StringFilter<"Post"> | string
    caption?: StringNullableFilter<"Post"> | string | null
    description?: StringNullableFilter<"Post"> | string | null
    thumbnailUrl?: StringNullableFilter<"Post"> | string | null
    imageUrl?: StringNullableFilter<"Post"> | string | null
    imageAlt?: StringNullableFilter<"Post"> | string | null
    insight?: StringNullableFilter<"Post"> | string | null
    published?: BoolFilter<"Post"> | boolean
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    authorId?: StringFilter<"Post"> | string
    seoId?: StringNullableFilter<"Post"> | string | null
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    tags?: TagListRelationFilter
    fonts?: IngredientListRelationFilter
    seo?: XOR<SeoModuleNullableScalarRelationFilter, SeoModuleWhereInput> | null
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    postType?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    caption?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imageAlt?: SortOrderInput | SortOrder
    insight?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    seoId?: SortOrderInput | SortOrder
    author?: UserOrderByWithRelationInput
    tags?: TagOrderByRelationAggregateInput
    fonts?: IngredientOrderByRelationAggregateInput
    seo?: SeoModuleOrderByWithRelationInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    seoId?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    postType?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    caption?: StringNullableFilter<"Post"> | string | null
    description?: StringNullableFilter<"Post"> | string | null
    thumbnailUrl?: StringNullableFilter<"Post"> | string | null
    imageUrl?: StringNullableFilter<"Post"> | string | null
    imageAlt?: StringNullableFilter<"Post"> | string | null
    insight?: StringNullableFilter<"Post"> | string | null
    published?: BoolFilter<"Post"> | boolean
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    authorId?: StringFilter<"Post"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    tags?: TagListRelationFilter
    fonts?: IngredientListRelationFilter
    seo?: XOR<SeoModuleNullableScalarRelationFilter, SeoModuleWhereInput> | null
  }, "id" | "slug" | "seoId">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    postType?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    caption?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imageAlt?: SortOrderInput | SortOrder
    insight?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    seoId?: SortOrderInput | SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    postType?: StringWithAggregatesFilter<"Post"> | string
    title?: StringWithAggregatesFilter<"Post"> | string
    slug?: StringWithAggregatesFilter<"Post"> | string
    caption?: StringNullableWithAggregatesFilter<"Post"> | string | null
    description?: StringNullableWithAggregatesFilter<"Post"> | string | null
    thumbnailUrl?: StringNullableWithAggregatesFilter<"Post"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Post"> | string | null
    imageAlt?: StringNullableWithAggregatesFilter<"Post"> | string | null
    insight?: StringNullableWithAggregatesFilter<"Post"> | string | null
    published?: BoolWithAggregatesFilter<"Post"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    authorId?: StringWithAggregatesFilter<"Post"> | string
    seoId?: StringNullableWithAggregatesFilter<"Post"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: Bytes | null
    imageUrl?: string | null
    surname?: string | null
    biography?: string | null
    posts?: PostCreateNestedManyWithoutAuthorInput
    roles?: RoleCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: Bytes | null
    imageUrl?: string | null
    surname?: string | null
    biography?: string | null
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUpdateManyWithoutAuthorNestedInput
    roles?: RoleUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    roles?: RoleUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: Bytes | null
    imageUrl?: string | null
    surname?: string | null
    biography?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoleCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: PermissionCreateNestedManyWithoutRolesInput
    users?: UserCreateNestedManyWithoutRolesInput
  }

  export type RoleUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: PermissionUncheckedCreateNestedManyWithoutRolesInput
    users?: UserUncheckedCreateNestedManyWithoutRolesInput
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: PermissionUpdateManyWithoutRolesNestedInput
    users?: UserUpdateManyWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: PermissionUncheckedUpdateManyWithoutRolesNestedInput
    users?: UserUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type RoleCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RoleCreateNestedManyWithoutPermissionsInput
  }

  export type PermissionUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RoleUncheckedCreateNestedManyWithoutPermissionsInput
  }

  export type PermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RoleUpdateManyWithoutPermissionsNestedInput
  }

  export type PermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RoleUncheckedUpdateManyWithoutPermissionsNestedInput
  }

  export type PermissionCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FontAuthorCreateInput = {
    id?: string
    slug: string
    name: string
    type?: string
    email: string
    supportEmail?: string | null
    avatarUrl?: string | null
    bannerUrl?: string | null
    bio?: string | null
    website?: string | null
    dafontProfileUrl?: string | null
    profileInfoUrl?: string | null
    donation?: string | null
    nationality?: string | null
    languagesSpoken?: string | null
    isVerified?: boolean
    socialLinks?: string | null
    metrics?: string | null
    businessInfo?: string | null
    specialties?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fonts?: IngredientCreateNestedManyWithoutAuthorInput
  }

  export type FontAuthorUncheckedCreateInput = {
    id?: string
    slug: string
    name: string
    type?: string
    email: string
    supportEmail?: string | null
    avatarUrl?: string | null
    bannerUrl?: string | null
    bio?: string | null
    website?: string | null
    dafontProfileUrl?: string | null
    profileInfoUrl?: string | null
    donation?: string | null
    nationality?: string | null
    languagesSpoken?: string | null
    isVerified?: boolean
    socialLinks?: string | null
    metrics?: string | null
    businessInfo?: string | null
    specialties?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fonts?: IngredientUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type FontAuthorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    supportEmail?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    dafontProfileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileInfoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    donation?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    languagesSpoken?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    businessInfo?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fonts?: IngredientUpdateManyWithoutAuthorNestedInput
  }

  export type FontAuthorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    supportEmail?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    dafontProfileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileInfoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    donation?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    languagesSpoken?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    businessInfo?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fonts?: IngredientUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type FontAuthorCreateManyInput = {
    id?: string
    slug: string
    name: string
    type?: string
    email: string
    supportEmail?: string | null
    avatarUrl?: string | null
    bannerUrl?: string | null
    bio?: string | null
    website?: string | null
    dafontProfileUrl?: string | null
    profileInfoUrl?: string | null
    donation?: string | null
    nationality?: string | null
    languagesSpoken?: string | null
    isVerified?: boolean
    socialLinks?: string | null
    metrics?: string | null
    businessInfo?: string | null
    specialties?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FontAuthorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    supportEmail?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    dafontProfileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileInfoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    donation?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    languagesSpoken?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    businessInfo?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FontAuthorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    supportEmail?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    dafontProfileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileInfoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    donation?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    languagesSpoken?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    businessInfo?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeoModuleCreateInput = {
    id?: string
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImageUrl?: string | null
    ogImageAlt?: string | null
    twitterCard?: string
    twitterTitle?: string | null
    twitterDescription?: string | null
    twitterImageUrl?: string | null
    twitterImageAlt?: string | null
    canonicalUrl?: string | null
    noIndex?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    post?: PostCreateNestedOneWithoutSeoInput
    prescription?: PrescriptionCreateNestedOneWithoutSeoInput
  }

  export type SeoModuleUncheckedCreateInput = {
    id?: string
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImageUrl?: string | null
    ogImageAlt?: string | null
    twitterCard?: string
    twitterTitle?: string | null
    twitterDescription?: string | null
    twitterImageUrl?: string | null
    twitterImageAlt?: string | null
    canonicalUrl?: string | null
    noIndex?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    post?: PostUncheckedCreateNestedOneWithoutSeoInput
    prescription?: PrescriptionUncheckedCreateNestedOneWithoutSeoInput
  }

  export type SeoModuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    ogTitle?: NullableStringFieldUpdateOperationsInput | string | null
    ogDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    twitterCard?: StringFieldUpdateOperationsInput | string
    twitterTitle?: NullableStringFieldUpdateOperationsInput | string | null
    twitterDescription?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    canonicalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    noIndex?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneWithoutSeoNestedInput
    prescription?: PrescriptionUpdateOneWithoutSeoNestedInput
  }

  export type SeoModuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    ogTitle?: NullableStringFieldUpdateOperationsInput | string | null
    ogDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    twitterCard?: StringFieldUpdateOperationsInput | string
    twitterTitle?: NullableStringFieldUpdateOperationsInput | string | null
    twitterDescription?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    canonicalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    noIndex?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUncheckedUpdateOneWithoutSeoNestedInput
    prescription?: PrescriptionUncheckedUpdateOneWithoutSeoNestedInput
  }

  export type SeoModuleCreateManyInput = {
    id?: string
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImageUrl?: string | null
    ogImageAlt?: string | null
    twitterCard?: string
    twitterTitle?: string | null
    twitterDescription?: string | null
    twitterImageUrl?: string | null
    twitterImageAlt?: string | null
    canonicalUrl?: string | null
    noIndex?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SeoModuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    ogTitle?: NullableStringFieldUpdateOperationsInput | string | null
    ogDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    twitterCard?: StringFieldUpdateOperationsInput | string
    twitterTitle?: NullableStringFieldUpdateOperationsInput | string | null
    twitterDescription?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    canonicalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    noIndex?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeoModuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    ogTitle?: NullableStringFieldUpdateOperationsInput | string | null
    ogDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    twitterCard?: StringFieldUpdateOperationsInput | string
    twitterTitle?: NullableStringFieldUpdateOperationsInput | string | null
    twitterDescription?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    canonicalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    noIndex?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FontVariantCreateInput = {
    id?: string
    fontFamilyName: string
    weight: number
    style: string
    woff2Url: string
    label: string
    ingredient: IngredientCreateNestedOneWithoutVariantsInput
  }

  export type FontVariantUncheckedCreateInput = {
    id?: string
    fontFamilyName: string
    weight: number
    style: string
    woff2Url: string
    label: string
    ingredientId: string
  }

  export type FontVariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fontFamilyName?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    style?: StringFieldUpdateOperationsInput | string
    woff2Url?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    ingredient?: IngredientUpdateOneRequiredWithoutVariantsNestedInput
  }

  export type FontVariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fontFamilyName?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    style?: StringFieldUpdateOperationsInput | string
    woff2Url?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    ingredientId?: StringFieldUpdateOperationsInput | string
  }

  export type FontVariantCreateManyInput = {
    id?: string
    fontFamilyName: string
    weight: number
    style: string
    woff2Url: string
    label: string
    ingredientId: string
  }

  export type FontVariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fontFamilyName?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    style?: StringFieldUpdateOperationsInput | string
    woff2Url?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type FontVariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fontFamilyName?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    style?: StringFieldUpdateOperationsInput | string
    woff2Url?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    ingredientId?: StringFieldUpdateOperationsInput | string
  }

  export type IngredientCreateInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author?: FontAuthorCreateNestedOneWithoutFontsInput
    variants?: FontVariantCreateNestedManyWithoutIngredientInput
    formulas?: FormulaCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionCreateNestedManyWithoutSecondaryFontInput
    tags?: TagCreateNestedManyWithoutIngredientsInput
    posts?: PostCreateNestedManyWithoutFontsInput
  }

  export type IngredientUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: FontVariantUncheckedCreateNestedManyWithoutIngredientInput
    formulas?: FormulaUncheckedCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutSecondaryFontInput
    tags?: TagUncheckedCreateNestedManyWithoutIngredientsInput
    posts?: PostUncheckedCreateNestedManyWithoutFontsInput
  }

  export type IngredientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: FontAuthorUpdateOneWithoutFontsNestedInput
    variants?: FontVariantUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUpdateManyWithoutIngredientsNestedInput
    posts?: PostUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: FontVariantUncheckedUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUncheckedUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUncheckedUpdateManyWithoutIngredientsNestedInput
    posts?: PostUncheckedUpdateManyWithoutFontsNestedInput
  }

  export type IngredientCreateManyInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IngredientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngredientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormulaCreateInput = {
    id?: string
    name: string
    description?: string | null
    slug: string
    fontCategory: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fonts?: IngredientCreateNestedManyWithoutFormulasInput
    tags?: TagCreateNestedManyWithoutFormulasInput
  }

  export type FormulaUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    slug: string
    fontCategory: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fonts?: IngredientUncheckedCreateNestedManyWithoutFormulasInput
    tags?: TagUncheckedCreateNestedManyWithoutFormulasInput
  }

  export type FormulaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    fontCategory?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fonts?: IngredientUpdateManyWithoutFormulasNestedInput
    tags?: TagUpdateManyWithoutFormulasNestedInput
  }

  export type FormulaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    fontCategory?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fonts?: IngredientUncheckedUpdateManyWithoutFormulasNestedInput
    tags?: TagUncheckedUpdateManyWithoutFormulasNestedInput
  }

  export type FormulaCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    slug: string
    fontCategory: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormulaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    fontCategory?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormulaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    fontCategory?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    primaryFont: IngredientCreateNestedOneWithoutPrimaryPrescriptionsInput
    secondaryFont: IngredientCreateNestedOneWithoutSecondaryPrescriptionsInput
    tags?: TagCreateNestedManyWithoutPrescriptionsInput
    seo?: SeoModuleCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    primaryFontId: string
    secondaryFontId: string
    seoId?: string | null
    tags?: TagUncheckedCreateNestedManyWithoutPrescriptionsInput
  }

  export type PrescriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFont?: IngredientUpdateOneRequiredWithoutPrimaryPrescriptionsNestedInput
    secondaryFont?: IngredientUpdateOneRequiredWithoutSecondaryPrescriptionsNestedInput
    tags?: TagUpdateManyWithoutPrescriptionsNestedInput
    seo?: SeoModuleUpdateOneWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFontId?: StringFieldUpdateOperationsInput | string
    secondaryFontId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: TagUncheckedUpdateManyWithoutPrescriptionsNestedInput
  }

  export type PrescriptionCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    primaryFontId: string
    secondaryFontId: string
    seoId?: string | null
  }

  export type PrescriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFontId?: StringFieldUpdateOperationsInput | string
    secondaryFontId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminSettingsCreateInput = {
    id?: string
    siteLanguage?: string
    siteTimezone?: string
    maintenanceActive?: boolean
    maintenanceMessage?: string | null
    letterTFontFamily?: string | null
    letterTFontSizePercent?: number
    logoLightModeColor?: string | null
    logoDarkModeColor?: string | null
    heroWordmarkFonts?: string | null
    heroWordmarkLoop?: boolean
    heroWordmarkLoopSpeed?: number
    marqueeActive?: boolean
    marqueeText?: string | null
    marqueeType?: string
    marqueeTextColor?: string | null
    marqueeBgColor?: string | null
    popupActive?: boolean
    popupImageUrl?: string | null
    popupHeadline?: string | null
    popupMessage?: string | null
    popupCtaLabel?: string | null
    popupCtaLink?: string | null
    popupFrequency?: string
    popupFrequencyDays?: number
    emailProvider?: string
    gmailClientId?: string | null
    gmailClientSecret?: string | null
    gmailSenderName?: string | null
    gmailConnected?: boolean
    gmailConnectedEmail?: string | null
    gmailRefreshToken?: string | null
    smtpHost?: string | null
    smtpPort?: number
    smtpUser?: string | null
    smtpPassword?: string | null
    smtpSecure?: boolean
    smtpFromEmail?: string | null
    smtpFromName?: string | null
    smtpAuthType?: string
    smtpOauthClientId?: string | null
    smtpOauthClientSecret?: string | null
    smtpOauthRefreshToken?: string | null
    smtpOauthAccessUrl?: string | null
    resendApiKey?: string | null
    resendFromEmail?: string | null
    resendFromName?: string | null
    credentialsVault?: string | null
    integrationsConfig?: string | null
    notificationChannels?: string | null
    slackWebhookUrl?: string | null
    require2fa?: boolean
    sessionTimeoutMinutes?: number
    ipAllowlist?: string | null
    auditRetentionDays?: number
    cookieBannerActive?: boolean
    cookieBannerText?: string | null
    privacyPolicyUrl?: string | null
    termsOfServiceUrl?: string | null
    gdprRequestEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminSettingsUncheckedCreateInput = {
    id?: string
    siteLanguage?: string
    siteTimezone?: string
    maintenanceActive?: boolean
    maintenanceMessage?: string | null
    letterTFontFamily?: string | null
    letterTFontSizePercent?: number
    logoLightModeColor?: string | null
    logoDarkModeColor?: string | null
    heroWordmarkFonts?: string | null
    heroWordmarkLoop?: boolean
    heroWordmarkLoopSpeed?: number
    marqueeActive?: boolean
    marqueeText?: string | null
    marqueeType?: string
    marqueeTextColor?: string | null
    marqueeBgColor?: string | null
    popupActive?: boolean
    popupImageUrl?: string | null
    popupHeadline?: string | null
    popupMessage?: string | null
    popupCtaLabel?: string | null
    popupCtaLink?: string | null
    popupFrequency?: string
    popupFrequencyDays?: number
    emailProvider?: string
    gmailClientId?: string | null
    gmailClientSecret?: string | null
    gmailSenderName?: string | null
    gmailConnected?: boolean
    gmailConnectedEmail?: string | null
    gmailRefreshToken?: string | null
    smtpHost?: string | null
    smtpPort?: number
    smtpUser?: string | null
    smtpPassword?: string | null
    smtpSecure?: boolean
    smtpFromEmail?: string | null
    smtpFromName?: string | null
    smtpAuthType?: string
    smtpOauthClientId?: string | null
    smtpOauthClientSecret?: string | null
    smtpOauthRefreshToken?: string | null
    smtpOauthAccessUrl?: string | null
    resendApiKey?: string | null
    resendFromEmail?: string | null
    resendFromName?: string | null
    credentialsVault?: string | null
    integrationsConfig?: string | null
    notificationChannels?: string | null
    slackWebhookUrl?: string | null
    require2fa?: boolean
    sessionTimeoutMinutes?: number
    ipAllowlist?: string | null
    auditRetentionDays?: number
    cookieBannerActive?: boolean
    cookieBannerText?: string | null
    privacyPolicyUrl?: string | null
    termsOfServiceUrl?: string | null
    gdprRequestEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteLanguage?: StringFieldUpdateOperationsInput | string
    siteTimezone?: StringFieldUpdateOperationsInput | string
    maintenanceActive?: BoolFieldUpdateOperationsInput | boolean
    maintenanceMessage?: NullableStringFieldUpdateOperationsInput | string | null
    letterTFontFamily?: NullableStringFieldUpdateOperationsInput | string | null
    letterTFontSizePercent?: IntFieldUpdateOperationsInput | number
    logoLightModeColor?: NullableStringFieldUpdateOperationsInput | string | null
    logoDarkModeColor?: NullableStringFieldUpdateOperationsInput | string | null
    heroWordmarkFonts?: NullableStringFieldUpdateOperationsInput | string | null
    heroWordmarkLoop?: BoolFieldUpdateOperationsInput | boolean
    heroWordmarkLoopSpeed?: FloatFieldUpdateOperationsInput | number
    marqueeActive?: BoolFieldUpdateOperationsInput | boolean
    marqueeText?: NullableStringFieldUpdateOperationsInput | string | null
    marqueeType?: StringFieldUpdateOperationsInput | string
    marqueeTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    marqueeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    popupActive?: BoolFieldUpdateOperationsInput | boolean
    popupImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    popupHeadline?: NullableStringFieldUpdateOperationsInput | string | null
    popupMessage?: NullableStringFieldUpdateOperationsInput | string | null
    popupCtaLabel?: NullableStringFieldUpdateOperationsInput | string | null
    popupCtaLink?: NullableStringFieldUpdateOperationsInput | string | null
    popupFrequency?: StringFieldUpdateOperationsInput | string
    popupFrequencyDays?: IntFieldUpdateOperationsInput | number
    emailProvider?: StringFieldUpdateOperationsInput | string
    gmailClientId?: NullableStringFieldUpdateOperationsInput | string | null
    gmailClientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    gmailSenderName?: NullableStringFieldUpdateOperationsInput | string | null
    gmailConnected?: BoolFieldUpdateOperationsInput | boolean
    gmailConnectedEmail?: NullableStringFieldUpdateOperationsInput | string | null
    gmailRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: IntFieldUpdateOperationsInput | number
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPassword?: NullableStringFieldUpdateOperationsInput | string | null
    smtpSecure?: BoolFieldUpdateOperationsInput | boolean
    smtpFromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFromName?: NullableStringFieldUpdateOperationsInput | string | null
    smtpAuthType?: StringFieldUpdateOperationsInput | string
    smtpOauthClientId?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthClientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthAccessUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resendApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    resendFromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    resendFromName?: NullableStringFieldUpdateOperationsInput | string | null
    credentialsVault?: NullableStringFieldUpdateOperationsInput | string | null
    integrationsConfig?: NullableStringFieldUpdateOperationsInput | string | null
    notificationChannels?: NullableStringFieldUpdateOperationsInput | string | null
    slackWebhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    require2fa?: BoolFieldUpdateOperationsInput | boolean
    sessionTimeoutMinutes?: IntFieldUpdateOperationsInput | number
    ipAllowlist?: NullableStringFieldUpdateOperationsInput | string | null
    auditRetentionDays?: IntFieldUpdateOperationsInput | number
    cookieBannerActive?: BoolFieldUpdateOperationsInput | boolean
    cookieBannerText?: NullableStringFieldUpdateOperationsInput | string | null
    privacyPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    termsOfServiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gdprRequestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteLanguage?: StringFieldUpdateOperationsInput | string
    siteTimezone?: StringFieldUpdateOperationsInput | string
    maintenanceActive?: BoolFieldUpdateOperationsInput | boolean
    maintenanceMessage?: NullableStringFieldUpdateOperationsInput | string | null
    letterTFontFamily?: NullableStringFieldUpdateOperationsInput | string | null
    letterTFontSizePercent?: IntFieldUpdateOperationsInput | number
    logoLightModeColor?: NullableStringFieldUpdateOperationsInput | string | null
    logoDarkModeColor?: NullableStringFieldUpdateOperationsInput | string | null
    heroWordmarkFonts?: NullableStringFieldUpdateOperationsInput | string | null
    heroWordmarkLoop?: BoolFieldUpdateOperationsInput | boolean
    heroWordmarkLoopSpeed?: FloatFieldUpdateOperationsInput | number
    marqueeActive?: BoolFieldUpdateOperationsInput | boolean
    marqueeText?: NullableStringFieldUpdateOperationsInput | string | null
    marqueeType?: StringFieldUpdateOperationsInput | string
    marqueeTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    marqueeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    popupActive?: BoolFieldUpdateOperationsInput | boolean
    popupImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    popupHeadline?: NullableStringFieldUpdateOperationsInput | string | null
    popupMessage?: NullableStringFieldUpdateOperationsInput | string | null
    popupCtaLabel?: NullableStringFieldUpdateOperationsInput | string | null
    popupCtaLink?: NullableStringFieldUpdateOperationsInput | string | null
    popupFrequency?: StringFieldUpdateOperationsInput | string
    popupFrequencyDays?: IntFieldUpdateOperationsInput | number
    emailProvider?: StringFieldUpdateOperationsInput | string
    gmailClientId?: NullableStringFieldUpdateOperationsInput | string | null
    gmailClientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    gmailSenderName?: NullableStringFieldUpdateOperationsInput | string | null
    gmailConnected?: BoolFieldUpdateOperationsInput | boolean
    gmailConnectedEmail?: NullableStringFieldUpdateOperationsInput | string | null
    gmailRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: IntFieldUpdateOperationsInput | number
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPassword?: NullableStringFieldUpdateOperationsInput | string | null
    smtpSecure?: BoolFieldUpdateOperationsInput | boolean
    smtpFromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFromName?: NullableStringFieldUpdateOperationsInput | string | null
    smtpAuthType?: StringFieldUpdateOperationsInput | string
    smtpOauthClientId?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthClientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthAccessUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resendApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    resendFromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    resendFromName?: NullableStringFieldUpdateOperationsInput | string | null
    credentialsVault?: NullableStringFieldUpdateOperationsInput | string | null
    integrationsConfig?: NullableStringFieldUpdateOperationsInput | string | null
    notificationChannels?: NullableStringFieldUpdateOperationsInput | string | null
    slackWebhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    require2fa?: BoolFieldUpdateOperationsInput | boolean
    sessionTimeoutMinutes?: IntFieldUpdateOperationsInput | number
    ipAllowlist?: NullableStringFieldUpdateOperationsInput | string | null
    auditRetentionDays?: IntFieldUpdateOperationsInput | number
    cookieBannerActive?: BoolFieldUpdateOperationsInput | boolean
    cookieBannerText?: NullableStringFieldUpdateOperationsInput | string | null
    privacyPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    termsOfServiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gdprRequestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingsCreateManyInput = {
    id?: string
    siteLanguage?: string
    siteTimezone?: string
    maintenanceActive?: boolean
    maintenanceMessage?: string | null
    letterTFontFamily?: string | null
    letterTFontSizePercent?: number
    logoLightModeColor?: string | null
    logoDarkModeColor?: string | null
    heroWordmarkFonts?: string | null
    heroWordmarkLoop?: boolean
    heroWordmarkLoopSpeed?: number
    marqueeActive?: boolean
    marqueeText?: string | null
    marqueeType?: string
    marqueeTextColor?: string | null
    marqueeBgColor?: string | null
    popupActive?: boolean
    popupImageUrl?: string | null
    popupHeadline?: string | null
    popupMessage?: string | null
    popupCtaLabel?: string | null
    popupCtaLink?: string | null
    popupFrequency?: string
    popupFrequencyDays?: number
    emailProvider?: string
    gmailClientId?: string | null
    gmailClientSecret?: string | null
    gmailSenderName?: string | null
    gmailConnected?: boolean
    gmailConnectedEmail?: string | null
    gmailRefreshToken?: string | null
    smtpHost?: string | null
    smtpPort?: number
    smtpUser?: string | null
    smtpPassword?: string | null
    smtpSecure?: boolean
    smtpFromEmail?: string | null
    smtpFromName?: string | null
    smtpAuthType?: string
    smtpOauthClientId?: string | null
    smtpOauthClientSecret?: string | null
    smtpOauthRefreshToken?: string | null
    smtpOauthAccessUrl?: string | null
    resendApiKey?: string | null
    resendFromEmail?: string | null
    resendFromName?: string | null
    credentialsVault?: string | null
    integrationsConfig?: string | null
    notificationChannels?: string | null
    slackWebhookUrl?: string | null
    require2fa?: boolean
    sessionTimeoutMinutes?: number
    ipAllowlist?: string | null
    auditRetentionDays?: number
    cookieBannerActive?: boolean
    cookieBannerText?: string | null
    privacyPolicyUrl?: string | null
    termsOfServiceUrl?: string | null
    gdprRequestEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteLanguage?: StringFieldUpdateOperationsInput | string
    siteTimezone?: StringFieldUpdateOperationsInput | string
    maintenanceActive?: BoolFieldUpdateOperationsInput | boolean
    maintenanceMessage?: NullableStringFieldUpdateOperationsInput | string | null
    letterTFontFamily?: NullableStringFieldUpdateOperationsInput | string | null
    letterTFontSizePercent?: IntFieldUpdateOperationsInput | number
    logoLightModeColor?: NullableStringFieldUpdateOperationsInput | string | null
    logoDarkModeColor?: NullableStringFieldUpdateOperationsInput | string | null
    heroWordmarkFonts?: NullableStringFieldUpdateOperationsInput | string | null
    heroWordmarkLoop?: BoolFieldUpdateOperationsInput | boolean
    heroWordmarkLoopSpeed?: FloatFieldUpdateOperationsInput | number
    marqueeActive?: BoolFieldUpdateOperationsInput | boolean
    marqueeText?: NullableStringFieldUpdateOperationsInput | string | null
    marqueeType?: StringFieldUpdateOperationsInput | string
    marqueeTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    marqueeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    popupActive?: BoolFieldUpdateOperationsInput | boolean
    popupImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    popupHeadline?: NullableStringFieldUpdateOperationsInput | string | null
    popupMessage?: NullableStringFieldUpdateOperationsInput | string | null
    popupCtaLabel?: NullableStringFieldUpdateOperationsInput | string | null
    popupCtaLink?: NullableStringFieldUpdateOperationsInput | string | null
    popupFrequency?: StringFieldUpdateOperationsInput | string
    popupFrequencyDays?: IntFieldUpdateOperationsInput | number
    emailProvider?: StringFieldUpdateOperationsInput | string
    gmailClientId?: NullableStringFieldUpdateOperationsInput | string | null
    gmailClientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    gmailSenderName?: NullableStringFieldUpdateOperationsInput | string | null
    gmailConnected?: BoolFieldUpdateOperationsInput | boolean
    gmailConnectedEmail?: NullableStringFieldUpdateOperationsInput | string | null
    gmailRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: IntFieldUpdateOperationsInput | number
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPassword?: NullableStringFieldUpdateOperationsInput | string | null
    smtpSecure?: BoolFieldUpdateOperationsInput | boolean
    smtpFromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFromName?: NullableStringFieldUpdateOperationsInput | string | null
    smtpAuthType?: StringFieldUpdateOperationsInput | string
    smtpOauthClientId?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthClientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthAccessUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resendApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    resendFromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    resendFromName?: NullableStringFieldUpdateOperationsInput | string | null
    credentialsVault?: NullableStringFieldUpdateOperationsInput | string | null
    integrationsConfig?: NullableStringFieldUpdateOperationsInput | string | null
    notificationChannels?: NullableStringFieldUpdateOperationsInput | string | null
    slackWebhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    require2fa?: BoolFieldUpdateOperationsInput | boolean
    sessionTimeoutMinutes?: IntFieldUpdateOperationsInput | number
    ipAllowlist?: NullableStringFieldUpdateOperationsInput | string | null
    auditRetentionDays?: IntFieldUpdateOperationsInput | number
    cookieBannerActive?: BoolFieldUpdateOperationsInput | boolean
    cookieBannerText?: NullableStringFieldUpdateOperationsInput | string | null
    privacyPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    termsOfServiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gdprRequestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteLanguage?: StringFieldUpdateOperationsInput | string
    siteTimezone?: StringFieldUpdateOperationsInput | string
    maintenanceActive?: BoolFieldUpdateOperationsInput | boolean
    maintenanceMessage?: NullableStringFieldUpdateOperationsInput | string | null
    letterTFontFamily?: NullableStringFieldUpdateOperationsInput | string | null
    letterTFontSizePercent?: IntFieldUpdateOperationsInput | number
    logoLightModeColor?: NullableStringFieldUpdateOperationsInput | string | null
    logoDarkModeColor?: NullableStringFieldUpdateOperationsInput | string | null
    heroWordmarkFonts?: NullableStringFieldUpdateOperationsInput | string | null
    heroWordmarkLoop?: BoolFieldUpdateOperationsInput | boolean
    heroWordmarkLoopSpeed?: FloatFieldUpdateOperationsInput | number
    marqueeActive?: BoolFieldUpdateOperationsInput | boolean
    marqueeText?: NullableStringFieldUpdateOperationsInput | string | null
    marqueeType?: StringFieldUpdateOperationsInput | string
    marqueeTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    marqueeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    popupActive?: BoolFieldUpdateOperationsInput | boolean
    popupImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    popupHeadline?: NullableStringFieldUpdateOperationsInput | string | null
    popupMessage?: NullableStringFieldUpdateOperationsInput | string | null
    popupCtaLabel?: NullableStringFieldUpdateOperationsInput | string | null
    popupCtaLink?: NullableStringFieldUpdateOperationsInput | string | null
    popupFrequency?: StringFieldUpdateOperationsInput | string
    popupFrequencyDays?: IntFieldUpdateOperationsInput | number
    emailProvider?: StringFieldUpdateOperationsInput | string
    gmailClientId?: NullableStringFieldUpdateOperationsInput | string | null
    gmailClientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    gmailSenderName?: NullableStringFieldUpdateOperationsInput | string | null
    gmailConnected?: BoolFieldUpdateOperationsInput | boolean
    gmailConnectedEmail?: NullableStringFieldUpdateOperationsInput | string | null
    gmailRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    smtpHost?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPort?: IntFieldUpdateOperationsInput | number
    smtpUser?: NullableStringFieldUpdateOperationsInput | string | null
    smtpPassword?: NullableStringFieldUpdateOperationsInput | string | null
    smtpSecure?: BoolFieldUpdateOperationsInput | boolean
    smtpFromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    smtpFromName?: NullableStringFieldUpdateOperationsInput | string | null
    smtpAuthType?: StringFieldUpdateOperationsInput | string
    smtpOauthClientId?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthClientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    smtpOauthAccessUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resendApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    resendFromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    resendFromName?: NullableStringFieldUpdateOperationsInput | string | null
    credentialsVault?: NullableStringFieldUpdateOperationsInput | string | null
    integrationsConfig?: NullableStringFieldUpdateOperationsInput | string | null
    notificationChannels?: NullableStringFieldUpdateOperationsInput | string | null
    slackWebhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    require2fa?: BoolFieldUpdateOperationsInput | boolean
    sessionTimeoutMinutes?: IntFieldUpdateOperationsInput | number
    ipAllowlist?: NullableStringFieldUpdateOperationsInput | string | null
    auditRetentionDays?: IntFieldUpdateOperationsInput | number
    cookieBannerActive?: BoolFieldUpdateOperationsInput | boolean
    cookieBannerText?: NullableStringFieldUpdateOperationsInput | string | null
    privacyPolicyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    termsOfServiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gdprRequestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionCreateNestedManyWithoutTagsInput
    ingredients?: IngredientCreateNestedManyWithoutTagsInput
    formulas?: FormulaCreateNestedManyWithoutTagsInput
    posts?: PostCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutTagsInput
    ingredients?: IngredientUncheckedCreateNestedManyWithoutTagsInput
    formulas?: FormulaUncheckedCreateNestedManyWithoutTagsInput
    posts?: PostUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUpdateManyWithoutTagsNestedInput
    ingredients?: IngredientUpdateManyWithoutTagsNestedInput
    formulas?: FormulaUpdateManyWithoutTagsNestedInput
    posts?: PostUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutTagsNestedInput
    ingredients?: IngredientUncheckedUpdateManyWithoutTagsNestedInput
    formulas?: FormulaUncheckedUpdateManyWithoutTagsNestedInput
    posts?: PostUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutPostsInput
    tags?: TagCreateNestedManyWithoutPostsInput
    fonts?: IngredientCreateNestedManyWithoutPostsInput
    seo?: SeoModuleCreateNestedOneWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    seoId?: string | null
    tags?: TagUncheckedCreateNestedManyWithoutPostsInput
    fonts?: IngredientUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    tags?: TagUpdateManyWithoutPostsNestedInput
    fonts?: IngredientUpdateManyWithoutPostsNestedInput
    seo?: SeoModuleUpdateOneWithoutPostNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: TagUncheckedUpdateManyWithoutPostsNestedInput
    fonts?: IngredientUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostCreateManyInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    seoId?: string | null
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BytesNullableFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | null
    notIn?: Bytes[] | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Bytes | null
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type RoleListRelationFilter = {
    every?: RoleWhereInput
    some?: RoleWhereInput
    none?: RoleWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrder
    imageUrl?: SortOrder
    surname?: SortOrder
    biography?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrder
    imageUrl?: SortOrder
    surname?: SortOrder
    biography?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrder
    imageUrl?: SortOrder
    surname?: SortOrder
    biography?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | null
    notIn?: Bytes[] | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Bytes | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type PermissionListRelationFilter = {
    every?: PermissionWhereInput
    some?: PermissionWhereInput
    none?: PermissionWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type PermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IngredientListRelationFilter = {
    every?: IngredientWhereInput
    some?: IngredientWhereInput
    none?: IngredientWhereInput
  }

  export type IngredientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FontAuthorCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    type?: SortOrder
    email?: SortOrder
    supportEmail?: SortOrder
    avatarUrl?: SortOrder
    bannerUrl?: SortOrder
    bio?: SortOrder
    website?: SortOrder
    dafontProfileUrl?: SortOrder
    profileInfoUrl?: SortOrder
    donation?: SortOrder
    nationality?: SortOrder
    languagesSpoken?: SortOrder
    isVerified?: SortOrder
    socialLinks?: SortOrder
    metrics?: SortOrder
    businessInfo?: SortOrder
    specialties?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FontAuthorMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    type?: SortOrder
    email?: SortOrder
    supportEmail?: SortOrder
    avatarUrl?: SortOrder
    bannerUrl?: SortOrder
    bio?: SortOrder
    website?: SortOrder
    dafontProfileUrl?: SortOrder
    profileInfoUrl?: SortOrder
    donation?: SortOrder
    nationality?: SortOrder
    languagesSpoken?: SortOrder
    isVerified?: SortOrder
    socialLinks?: SortOrder
    metrics?: SortOrder
    businessInfo?: SortOrder
    specialties?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FontAuthorMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    type?: SortOrder
    email?: SortOrder
    supportEmail?: SortOrder
    avatarUrl?: SortOrder
    bannerUrl?: SortOrder
    bio?: SortOrder
    website?: SortOrder
    dafontProfileUrl?: SortOrder
    profileInfoUrl?: SortOrder
    donation?: SortOrder
    nationality?: SortOrder
    languagesSpoken?: SortOrder
    isVerified?: SortOrder
    socialLinks?: SortOrder
    metrics?: SortOrder
    businessInfo?: SortOrder
    specialties?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PostNullableScalarRelationFilter = {
    is?: PostWhereInput | null
    isNot?: PostWhereInput | null
  }

  export type PrescriptionNullableScalarRelationFilter = {
    is?: PrescriptionWhereInput | null
    isNot?: PrescriptionWhereInput | null
  }

  export type SeoModuleCountOrderByAggregateInput = {
    id?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    keywords?: SortOrder
    ogTitle?: SortOrder
    ogDescription?: SortOrder
    ogImageUrl?: SortOrder
    ogImageAlt?: SortOrder
    twitterCard?: SortOrder
    twitterTitle?: SortOrder
    twitterDescription?: SortOrder
    twitterImageUrl?: SortOrder
    twitterImageAlt?: SortOrder
    canonicalUrl?: SortOrder
    noIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SeoModuleMaxOrderByAggregateInput = {
    id?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    keywords?: SortOrder
    ogTitle?: SortOrder
    ogDescription?: SortOrder
    ogImageUrl?: SortOrder
    ogImageAlt?: SortOrder
    twitterCard?: SortOrder
    twitterTitle?: SortOrder
    twitterDescription?: SortOrder
    twitterImageUrl?: SortOrder
    twitterImageAlt?: SortOrder
    canonicalUrl?: SortOrder
    noIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SeoModuleMinOrderByAggregateInput = {
    id?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    keywords?: SortOrder
    ogTitle?: SortOrder
    ogDescription?: SortOrder
    ogImageUrl?: SortOrder
    ogImageAlt?: SortOrder
    twitterCard?: SortOrder
    twitterTitle?: SortOrder
    twitterDescription?: SortOrder
    twitterImageUrl?: SortOrder
    twitterImageAlt?: SortOrder
    canonicalUrl?: SortOrder
    noIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IngredientScalarRelationFilter = {
    is?: IngredientWhereInput
    isNot?: IngredientWhereInput
  }

  export type FontVariantCountOrderByAggregateInput = {
    id?: SortOrder
    fontFamilyName?: SortOrder
    weight?: SortOrder
    style?: SortOrder
    woff2Url?: SortOrder
    label?: SortOrder
    ingredientId?: SortOrder
  }

  export type FontVariantAvgOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type FontVariantMaxOrderByAggregateInput = {
    id?: SortOrder
    fontFamilyName?: SortOrder
    weight?: SortOrder
    style?: SortOrder
    woff2Url?: SortOrder
    label?: SortOrder
    ingredientId?: SortOrder
  }

  export type FontVariantMinOrderByAggregateInput = {
    id?: SortOrder
    fontFamilyName?: SortOrder
    weight?: SortOrder
    style?: SortOrder
    woff2Url?: SortOrder
    label?: SortOrder
    ingredientId?: SortOrder
  }

  export type FontVariantSumOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FontAuthorNullableScalarRelationFilter = {
    is?: FontAuthorWhereInput | null
    isNot?: FontAuthorWhereInput | null
  }

  export type FontVariantListRelationFilter = {
    every?: FontVariantWhereInput
    some?: FontVariantWhereInput
    none?: FontVariantWhereInput
  }

  export type FormulaListRelationFilter = {
    every?: FormulaWhereInput
    some?: FormulaWhereInput
    none?: FormulaWhereInput
  }

  export type PrescriptionListRelationFilter = {
    every?: PrescriptionWhereInput
    some?: PrescriptionWhereInput
    none?: PrescriptionWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type FontVariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormulaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PrescriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IngredientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    creator?: SortOrder
    rating?: SortOrder
    symbol?: SortOrder
    formula?: SortOrder
    importedFrom?: SortOrder
    licenseType?: SortOrder
    isVariable?: SortOrder
    userRating?: SortOrder
    userRatingsCount?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IngredientAvgOrderByAggregateInput = {
    userRating?: SortOrder
    userRatingsCount?: SortOrder
  }

  export type IngredientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    creator?: SortOrder
    rating?: SortOrder
    symbol?: SortOrder
    formula?: SortOrder
    importedFrom?: SortOrder
    licenseType?: SortOrder
    isVariable?: SortOrder
    userRating?: SortOrder
    userRatingsCount?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IngredientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    creator?: SortOrder
    rating?: SortOrder
    symbol?: SortOrder
    formula?: SortOrder
    importedFrom?: SortOrder
    licenseType?: SortOrder
    isVariable?: SortOrder
    userRating?: SortOrder
    userRatingsCount?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IngredientSumOrderByAggregateInput = {
    userRating?: SortOrder
    userRatingsCount?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FormulaCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    fontCategory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormulaMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    fontCategory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormulaMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    fontCategory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SeoModuleNullableScalarRelationFilter = {
    is?: SeoModuleWhereInput | null
    isNot?: SeoModuleWhereInput | null
  }

  export type PrescriptionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    insight?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    primaryFontId?: SortOrder
    secondaryFontId?: SortOrder
    seoId?: SortOrder
  }

  export type PrescriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    insight?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    primaryFontId?: SortOrder
    secondaryFontId?: SortOrder
    seoId?: SortOrder
  }

  export type PrescriptionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    insight?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    primaryFontId?: SortOrder
    secondaryFontId?: SortOrder
    seoId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AdminSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    siteLanguage?: SortOrder
    siteTimezone?: SortOrder
    maintenanceActive?: SortOrder
    maintenanceMessage?: SortOrder
    letterTFontFamily?: SortOrder
    letterTFontSizePercent?: SortOrder
    logoLightModeColor?: SortOrder
    logoDarkModeColor?: SortOrder
    heroWordmarkFonts?: SortOrder
    heroWordmarkLoop?: SortOrder
    heroWordmarkLoopSpeed?: SortOrder
    marqueeActive?: SortOrder
    marqueeText?: SortOrder
    marqueeType?: SortOrder
    marqueeTextColor?: SortOrder
    marqueeBgColor?: SortOrder
    popupActive?: SortOrder
    popupImageUrl?: SortOrder
    popupHeadline?: SortOrder
    popupMessage?: SortOrder
    popupCtaLabel?: SortOrder
    popupCtaLink?: SortOrder
    popupFrequency?: SortOrder
    popupFrequencyDays?: SortOrder
    emailProvider?: SortOrder
    gmailClientId?: SortOrder
    gmailClientSecret?: SortOrder
    gmailSenderName?: SortOrder
    gmailConnected?: SortOrder
    gmailConnectedEmail?: SortOrder
    gmailRefreshToken?: SortOrder
    smtpHost?: SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrder
    smtpPassword?: SortOrder
    smtpSecure?: SortOrder
    smtpFromEmail?: SortOrder
    smtpFromName?: SortOrder
    smtpAuthType?: SortOrder
    smtpOauthClientId?: SortOrder
    smtpOauthClientSecret?: SortOrder
    smtpOauthRefreshToken?: SortOrder
    smtpOauthAccessUrl?: SortOrder
    resendApiKey?: SortOrder
    resendFromEmail?: SortOrder
    resendFromName?: SortOrder
    credentialsVault?: SortOrder
    integrationsConfig?: SortOrder
    notificationChannels?: SortOrder
    slackWebhookUrl?: SortOrder
    require2fa?: SortOrder
    sessionTimeoutMinutes?: SortOrder
    ipAllowlist?: SortOrder
    auditRetentionDays?: SortOrder
    cookieBannerActive?: SortOrder
    cookieBannerText?: SortOrder
    privacyPolicyUrl?: SortOrder
    termsOfServiceUrl?: SortOrder
    gdprRequestEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSettingsAvgOrderByAggregateInput = {
    letterTFontSizePercent?: SortOrder
    heroWordmarkLoopSpeed?: SortOrder
    popupFrequencyDays?: SortOrder
    smtpPort?: SortOrder
    sessionTimeoutMinutes?: SortOrder
    auditRetentionDays?: SortOrder
  }

  export type AdminSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    siteLanguage?: SortOrder
    siteTimezone?: SortOrder
    maintenanceActive?: SortOrder
    maintenanceMessage?: SortOrder
    letterTFontFamily?: SortOrder
    letterTFontSizePercent?: SortOrder
    logoLightModeColor?: SortOrder
    logoDarkModeColor?: SortOrder
    heroWordmarkFonts?: SortOrder
    heroWordmarkLoop?: SortOrder
    heroWordmarkLoopSpeed?: SortOrder
    marqueeActive?: SortOrder
    marqueeText?: SortOrder
    marqueeType?: SortOrder
    marqueeTextColor?: SortOrder
    marqueeBgColor?: SortOrder
    popupActive?: SortOrder
    popupImageUrl?: SortOrder
    popupHeadline?: SortOrder
    popupMessage?: SortOrder
    popupCtaLabel?: SortOrder
    popupCtaLink?: SortOrder
    popupFrequency?: SortOrder
    popupFrequencyDays?: SortOrder
    emailProvider?: SortOrder
    gmailClientId?: SortOrder
    gmailClientSecret?: SortOrder
    gmailSenderName?: SortOrder
    gmailConnected?: SortOrder
    gmailConnectedEmail?: SortOrder
    gmailRefreshToken?: SortOrder
    smtpHost?: SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrder
    smtpPassword?: SortOrder
    smtpSecure?: SortOrder
    smtpFromEmail?: SortOrder
    smtpFromName?: SortOrder
    smtpAuthType?: SortOrder
    smtpOauthClientId?: SortOrder
    smtpOauthClientSecret?: SortOrder
    smtpOauthRefreshToken?: SortOrder
    smtpOauthAccessUrl?: SortOrder
    resendApiKey?: SortOrder
    resendFromEmail?: SortOrder
    resendFromName?: SortOrder
    credentialsVault?: SortOrder
    integrationsConfig?: SortOrder
    notificationChannels?: SortOrder
    slackWebhookUrl?: SortOrder
    require2fa?: SortOrder
    sessionTimeoutMinutes?: SortOrder
    ipAllowlist?: SortOrder
    auditRetentionDays?: SortOrder
    cookieBannerActive?: SortOrder
    cookieBannerText?: SortOrder
    privacyPolicyUrl?: SortOrder
    termsOfServiceUrl?: SortOrder
    gdprRequestEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    siteLanguage?: SortOrder
    siteTimezone?: SortOrder
    maintenanceActive?: SortOrder
    maintenanceMessage?: SortOrder
    letterTFontFamily?: SortOrder
    letterTFontSizePercent?: SortOrder
    logoLightModeColor?: SortOrder
    logoDarkModeColor?: SortOrder
    heroWordmarkFonts?: SortOrder
    heroWordmarkLoop?: SortOrder
    heroWordmarkLoopSpeed?: SortOrder
    marqueeActive?: SortOrder
    marqueeText?: SortOrder
    marqueeType?: SortOrder
    marqueeTextColor?: SortOrder
    marqueeBgColor?: SortOrder
    popupActive?: SortOrder
    popupImageUrl?: SortOrder
    popupHeadline?: SortOrder
    popupMessage?: SortOrder
    popupCtaLabel?: SortOrder
    popupCtaLink?: SortOrder
    popupFrequency?: SortOrder
    popupFrequencyDays?: SortOrder
    emailProvider?: SortOrder
    gmailClientId?: SortOrder
    gmailClientSecret?: SortOrder
    gmailSenderName?: SortOrder
    gmailConnected?: SortOrder
    gmailConnectedEmail?: SortOrder
    gmailRefreshToken?: SortOrder
    smtpHost?: SortOrder
    smtpPort?: SortOrder
    smtpUser?: SortOrder
    smtpPassword?: SortOrder
    smtpSecure?: SortOrder
    smtpFromEmail?: SortOrder
    smtpFromName?: SortOrder
    smtpAuthType?: SortOrder
    smtpOauthClientId?: SortOrder
    smtpOauthClientSecret?: SortOrder
    smtpOauthRefreshToken?: SortOrder
    smtpOauthAccessUrl?: SortOrder
    resendApiKey?: SortOrder
    resendFromEmail?: SortOrder
    resendFromName?: SortOrder
    credentialsVault?: SortOrder
    integrationsConfig?: SortOrder
    notificationChannels?: SortOrder
    slackWebhookUrl?: SortOrder
    require2fa?: SortOrder
    sessionTimeoutMinutes?: SortOrder
    ipAllowlist?: SortOrder
    auditRetentionDays?: SortOrder
    cookieBannerActive?: SortOrder
    cookieBannerText?: SortOrder
    privacyPolicyUrl?: SortOrder
    termsOfServiceUrl?: SortOrder
    gdprRequestEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSettingsSumOrderByAggregateInput = {
    letterTFontSizePercent?: SortOrder
    heroWordmarkLoopSpeed?: SortOrder
    popupFrequencyDays?: SortOrder
    smtpPort?: SortOrder
    sessionTimeoutMinutes?: SortOrder
    auditRetentionDays?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    postType?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    caption?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    insight?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    seoId?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    postType?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    caption?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    insight?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    seoId?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    postType?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    caption?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    insight?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    seoId?: SortOrder
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type RoleCreateNestedManyWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput> | RoleCreateWithoutUsersInput[] | RoleUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput | RoleCreateOrConnectWithoutUsersInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type RoleUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput> | RoleCreateWithoutUsersInput[] | RoleUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput | RoleCreateOrConnectWithoutUsersInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBytesFieldUpdateOperationsInput = {
    set?: Bytes | null
  }

  export type PostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type RoleUpdateManyWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput> | RoleCreateWithoutUsersInput[] | RoleUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput | RoleCreateOrConnectWithoutUsersInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutUsersInput | RoleUpsertWithWhereUniqueWithoutUsersInput[]
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutUsersInput | RoleUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutUsersInput | RoleUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type RoleUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput> | RoleCreateWithoutUsersInput[] | RoleUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput | RoleCreateOrConnectWithoutUsersInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutUsersInput | RoleUpsertWithWhereUniqueWithoutUsersInput[]
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutUsersInput | RoleUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutUsersInput | RoleUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type PermissionCreateNestedManyWithoutRolesInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutRolesInput = {
    create?: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput> | UserCreateWithoutRolesInput[] | UserUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRolesInput | UserCreateOrConnectWithoutRolesInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PermissionUncheckedCreateNestedManyWithoutRolesInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRolesInput = {
    create?: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput> | UserCreateWithoutRolesInput[] | UserUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRolesInput | UserCreateOrConnectWithoutRolesInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PermissionUpdateManyWithoutRolesNestedInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    upsert?: PermissionUpsertWithWhereUniqueWithoutRolesInput | PermissionUpsertWithWhereUniqueWithoutRolesInput[]
    set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    update?: PermissionUpdateWithWhereUniqueWithoutRolesInput | PermissionUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: PermissionUpdateManyWithWhereWithoutRolesInput | PermissionUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
  }

  export type UserUpdateManyWithoutRolesNestedInput = {
    create?: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput> | UserCreateWithoutRolesInput[] | UserUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRolesInput | UserCreateOrConnectWithoutRolesInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRolesInput | UserUpsertWithWhereUniqueWithoutRolesInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRolesInput | UserUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRolesInput | UserUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PermissionUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    upsert?: PermissionUpsertWithWhereUniqueWithoutRolesInput | PermissionUpsertWithWhereUniqueWithoutRolesInput[]
    set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    update?: PermissionUpdateWithWhereUniqueWithoutRolesInput | PermissionUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: PermissionUpdateManyWithWhereWithoutRolesInput | PermissionUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput> | UserCreateWithoutRolesInput[] | UserUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRolesInput | UserCreateOrConnectWithoutRolesInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRolesInput | UserUpsertWithWhereUniqueWithoutRolesInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRolesInput | UserUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRolesInput | UserUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RoleCreateNestedManyWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type RoleUncheckedCreateNestedManyWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type RoleUpdateManyWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutPermissionsInput | RoleUpsertWithWhereUniqueWithoutPermissionsInput[]
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutPermissionsInput | RoleUpdateWithWhereUniqueWithoutPermissionsInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutPermissionsInput | RoleUpdateManyWithWhereWithoutPermissionsInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type RoleUncheckedUpdateManyWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutPermissionsInput | RoleUpsertWithWhereUniqueWithoutPermissionsInput[]
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutPermissionsInput | RoleUpdateWithWhereUniqueWithoutPermissionsInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutPermissionsInput | RoleUpdateManyWithWhereWithoutPermissionsInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type IngredientCreateNestedManyWithoutAuthorInput = {
    create?: XOR<IngredientCreateWithoutAuthorInput, IngredientUncheckedCreateWithoutAuthorInput> | IngredientCreateWithoutAuthorInput[] | IngredientUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutAuthorInput | IngredientCreateOrConnectWithoutAuthorInput[]
    createMany?: IngredientCreateManyAuthorInputEnvelope
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
  }

  export type IngredientUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<IngredientCreateWithoutAuthorInput, IngredientUncheckedCreateWithoutAuthorInput> | IngredientCreateWithoutAuthorInput[] | IngredientUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutAuthorInput | IngredientCreateOrConnectWithoutAuthorInput[]
    createMany?: IngredientCreateManyAuthorInputEnvelope
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IngredientUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<IngredientCreateWithoutAuthorInput, IngredientUncheckedCreateWithoutAuthorInput> | IngredientCreateWithoutAuthorInput[] | IngredientUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutAuthorInput | IngredientCreateOrConnectWithoutAuthorInput[]
    upsert?: IngredientUpsertWithWhereUniqueWithoutAuthorInput | IngredientUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: IngredientCreateManyAuthorInputEnvelope
    set?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    disconnect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    delete?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    update?: IngredientUpdateWithWhereUniqueWithoutAuthorInput | IngredientUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: IngredientUpdateManyWithWhereWithoutAuthorInput | IngredientUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: IngredientScalarWhereInput | IngredientScalarWhereInput[]
  }

  export type IngredientUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<IngredientCreateWithoutAuthorInput, IngredientUncheckedCreateWithoutAuthorInput> | IngredientCreateWithoutAuthorInput[] | IngredientUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutAuthorInput | IngredientCreateOrConnectWithoutAuthorInput[]
    upsert?: IngredientUpsertWithWhereUniqueWithoutAuthorInput | IngredientUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: IngredientCreateManyAuthorInputEnvelope
    set?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    disconnect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    delete?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    update?: IngredientUpdateWithWhereUniqueWithoutAuthorInput | IngredientUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: IngredientUpdateManyWithWhereWithoutAuthorInput | IngredientUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: IngredientScalarWhereInput | IngredientScalarWhereInput[]
  }

  export type PostCreateNestedOneWithoutSeoInput = {
    create?: XOR<PostCreateWithoutSeoInput, PostUncheckedCreateWithoutSeoInput>
    connectOrCreate?: PostCreateOrConnectWithoutSeoInput
    connect?: PostWhereUniqueInput
  }

  export type PrescriptionCreateNestedOneWithoutSeoInput = {
    create?: XOR<PrescriptionCreateWithoutSeoInput, PrescriptionUncheckedCreateWithoutSeoInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutSeoInput
    connect?: PrescriptionWhereUniqueInput
  }

  export type PostUncheckedCreateNestedOneWithoutSeoInput = {
    create?: XOR<PostCreateWithoutSeoInput, PostUncheckedCreateWithoutSeoInput>
    connectOrCreate?: PostCreateOrConnectWithoutSeoInput
    connect?: PostWhereUniqueInput
  }

  export type PrescriptionUncheckedCreateNestedOneWithoutSeoInput = {
    create?: XOR<PrescriptionCreateWithoutSeoInput, PrescriptionUncheckedCreateWithoutSeoInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutSeoInput
    connect?: PrescriptionWhereUniqueInput
  }

  export type PostUpdateOneWithoutSeoNestedInput = {
    create?: XOR<PostCreateWithoutSeoInput, PostUncheckedCreateWithoutSeoInput>
    connectOrCreate?: PostCreateOrConnectWithoutSeoInput
    upsert?: PostUpsertWithoutSeoInput
    disconnect?: PostWhereInput | boolean
    delete?: PostWhereInput | boolean
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutSeoInput, PostUpdateWithoutSeoInput>, PostUncheckedUpdateWithoutSeoInput>
  }

  export type PrescriptionUpdateOneWithoutSeoNestedInput = {
    create?: XOR<PrescriptionCreateWithoutSeoInput, PrescriptionUncheckedCreateWithoutSeoInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutSeoInput
    upsert?: PrescriptionUpsertWithoutSeoInput
    disconnect?: PrescriptionWhereInput | boolean
    delete?: PrescriptionWhereInput | boolean
    connect?: PrescriptionWhereUniqueInput
    update?: XOR<XOR<PrescriptionUpdateToOneWithWhereWithoutSeoInput, PrescriptionUpdateWithoutSeoInput>, PrescriptionUncheckedUpdateWithoutSeoInput>
  }

  export type PostUncheckedUpdateOneWithoutSeoNestedInput = {
    create?: XOR<PostCreateWithoutSeoInput, PostUncheckedCreateWithoutSeoInput>
    connectOrCreate?: PostCreateOrConnectWithoutSeoInput
    upsert?: PostUpsertWithoutSeoInput
    disconnect?: PostWhereInput | boolean
    delete?: PostWhereInput | boolean
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutSeoInput, PostUpdateWithoutSeoInput>, PostUncheckedUpdateWithoutSeoInput>
  }

  export type PrescriptionUncheckedUpdateOneWithoutSeoNestedInput = {
    create?: XOR<PrescriptionCreateWithoutSeoInput, PrescriptionUncheckedCreateWithoutSeoInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutSeoInput
    upsert?: PrescriptionUpsertWithoutSeoInput
    disconnect?: PrescriptionWhereInput | boolean
    delete?: PrescriptionWhereInput | boolean
    connect?: PrescriptionWhereUniqueInput
    update?: XOR<XOR<PrescriptionUpdateToOneWithWhereWithoutSeoInput, PrescriptionUpdateWithoutSeoInput>, PrescriptionUncheckedUpdateWithoutSeoInput>
  }

  export type IngredientCreateNestedOneWithoutVariantsInput = {
    create?: XOR<IngredientCreateWithoutVariantsInput, IngredientUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: IngredientCreateOrConnectWithoutVariantsInput
    connect?: IngredientWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IngredientUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<IngredientCreateWithoutVariantsInput, IngredientUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: IngredientCreateOrConnectWithoutVariantsInput
    upsert?: IngredientUpsertWithoutVariantsInput
    connect?: IngredientWhereUniqueInput
    update?: XOR<XOR<IngredientUpdateToOneWithWhereWithoutVariantsInput, IngredientUpdateWithoutVariantsInput>, IngredientUncheckedUpdateWithoutVariantsInput>
  }

  export type FontAuthorCreateNestedOneWithoutFontsInput = {
    create?: XOR<FontAuthorCreateWithoutFontsInput, FontAuthorUncheckedCreateWithoutFontsInput>
    connectOrCreate?: FontAuthorCreateOrConnectWithoutFontsInput
    connect?: FontAuthorWhereUniqueInput
  }

  export type FontVariantCreateNestedManyWithoutIngredientInput = {
    create?: XOR<FontVariantCreateWithoutIngredientInput, FontVariantUncheckedCreateWithoutIngredientInput> | FontVariantCreateWithoutIngredientInput[] | FontVariantUncheckedCreateWithoutIngredientInput[]
    connectOrCreate?: FontVariantCreateOrConnectWithoutIngredientInput | FontVariantCreateOrConnectWithoutIngredientInput[]
    createMany?: FontVariantCreateManyIngredientInputEnvelope
    connect?: FontVariantWhereUniqueInput | FontVariantWhereUniqueInput[]
  }

  export type FormulaCreateNestedManyWithoutFontsInput = {
    create?: XOR<FormulaCreateWithoutFontsInput, FormulaUncheckedCreateWithoutFontsInput> | FormulaCreateWithoutFontsInput[] | FormulaUncheckedCreateWithoutFontsInput[]
    connectOrCreate?: FormulaCreateOrConnectWithoutFontsInput | FormulaCreateOrConnectWithoutFontsInput[]
    connect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
  }

  export type PrescriptionCreateNestedManyWithoutPrimaryFontInput = {
    create?: XOR<PrescriptionCreateWithoutPrimaryFontInput, PrescriptionUncheckedCreateWithoutPrimaryFontInput> | PrescriptionCreateWithoutPrimaryFontInput[] | PrescriptionUncheckedCreateWithoutPrimaryFontInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPrimaryFontInput | PrescriptionCreateOrConnectWithoutPrimaryFontInput[]
    createMany?: PrescriptionCreateManyPrimaryFontInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type PrescriptionCreateNestedManyWithoutSecondaryFontInput = {
    create?: XOR<PrescriptionCreateWithoutSecondaryFontInput, PrescriptionUncheckedCreateWithoutSecondaryFontInput> | PrescriptionCreateWithoutSecondaryFontInput[] | PrescriptionUncheckedCreateWithoutSecondaryFontInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutSecondaryFontInput | PrescriptionCreateOrConnectWithoutSecondaryFontInput[]
    createMany?: PrescriptionCreateManySecondaryFontInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type TagCreateNestedManyWithoutIngredientsInput = {
    create?: XOR<TagCreateWithoutIngredientsInput, TagUncheckedCreateWithoutIngredientsInput> | TagCreateWithoutIngredientsInput[] | TagUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutIngredientsInput | TagCreateOrConnectWithoutIngredientsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutFontsInput = {
    create?: XOR<PostCreateWithoutFontsInput, PostUncheckedCreateWithoutFontsInput> | PostCreateWithoutFontsInput[] | PostUncheckedCreateWithoutFontsInput[]
    connectOrCreate?: PostCreateOrConnectWithoutFontsInput | PostCreateOrConnectWithoutFontsInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type FontVariantUncheckedCreateNestedManyWithoutIngredientInput = {
    create?: XOR<FontVariantCreateWithoutIngredientInput, FontVariantUncheckedCreateWithoutIngredientInput> | FontVariantCreateWithoutIngredientInput[] | FontVariantUncheckedCreateWithoutIngredientInput[]
    connectOrCreate?: FontVariantCreateOrConnectWithoutIngredientInput | FontVariantCreateOrConnectWithoutIngredientInput[]
    createMany?: FontVariantCreateManyIngredientInputEnvelope
    connect?: FontVariantWhereUniqueInput | FontVariantWhereUniqueInput[]
  }

  export type FormulaUncheckedCreateNestedManyWithoutFontsInput = {
    create?: XOR<FormulaCreateWithoutFontsInput, FormulaUncheckedCreateWithoutFontsInput> | FormulaCreateWithoutFontsInput[] | FormulaUncheckedCreateWithoutFontsInput[]
    connectOrCreate?: FormulaCreateOrConnectWithoutFontsInput | FormulaCreateOrConnectWithoutFontsInput[]
    connect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
  }

  export type PrescriptionUncheckedCreateNestedManyWithoutPrimaryFontInput = {
    create?: XOR<PrescriptionCreateWithoutPrimaryFontInput, PrescriptionUncheckedCreateWithoutPrimaryFontInput> | PrescriptionCreateWithoutPrimaryFontInput[] | PrescriptionUncheckedCreateWithoutPrimaryFontInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPrimaryFontInput | PrescriptionCreateOrConnectWithoutPrimaryFontInput[]
    createMany?: PrescriptionCreateManyPrimaryFontInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type PrescriptionUncheckedCreateNestedManyWithoutSecondaryFontInput = {
    create?: XOR<PrescriptionCreateWithoutSecondaryFontInput, PrescriptionUncheckedCreateWithoutSecondaryFontInput> | PrescriptionCreateWithoutSecondaryFontInput[] | PrescriptionUncheckedCreateWithoutSecondaryFontInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutSecondaryFontInput | PrescriptionCreateOrConnectWithoutSecondaryFontInput[]
    createMany?: PrescriptionCreateManySecondaryFontInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type TagUncheckedCreateNestedManyWithoutIngredientsInput = {
    create?: XOR<TagCreateWithoutIngredientsInput, TagUncheckedCreateWithoutIngredientsInput> | TagCreateWithoutIngredientsInput[] | TagUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutIngredientsInput | TagCreateOrConnectWithoutIngredientsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutFontsInput = {
    create?: XOR<PostCreateWithoutFontsInput, PostUncheckedCreateWithoutFontsInput> | PostCreateWithoutFontsInput[] | PostUncheckedCreateWithoutFontsInput[]
    connectOrCreate?: PostCreateOrConnectWithoutFontsInput | PostCreateOrConnectWithoutFontsInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FontAuthorUpdateOneWithoutFontsNestedInput = {
    create?: XOR<FontAuthorCreateWithoutFontsInput, FontAuthorUncheckedCreateWithoutFontsInput>
    connectOrCreate?: FontAuthorCreateOrConnectWithoutFontsInput
    upsert?: FontAuthorUpsertWithoutFontsInput
    disconnect?: FontAuthorWhereInput | boolean
    delete?: FontAuthorWhereInput | boolean
    connect?: FontAuthorWhereUniqueInput
    update?: XOR<XOR<FontAuthorUpdateToOneWithWhereWithoutFontsInput, FontAuthorUpdateWithoutFontsInput>, FontAuthorUncheckedUpdateWithoutFontsInput>
  }

  export type FontVariantUpdateManyWithoutIngredientNestedInput = {
    create?: XOR<FontVariantCreateWithoutIngredientInput, FontVariantUncheckedCreateWithoutIngredientInput> | FontVariantCreateWithoutIngredientInput[] | FontVariantUncheckedCreateWithoutIngredientInput[]
    connectOrCreate?: FontVariantCreateOrConnectWithoutIngredientInput | FontVariantCreateOrConnectWithoutIngredientInput[]
    upsert?: FontVariantUpsertWithWhereUniqueWithoutIngredientInput | FontVariantUpsertWithWhereUniqueWithoutIngredientInput[]
    createMany?: FontVariantCreateManyIngredientInputEnvelope
    set?: FontVariantWhereUniqueInput | FontVariantWhereUniqueInput[]
    disconnect?: FontVariantWhereUniqueInput | FontVariantWhereUniqueInput[]
    delete?: FontVariantWhereUniqueInput | FontVariantWhereUniqueInput[]
    connect?: FontVariantWhereUniqueInput | FontVariantWhereUniqueInput[]
    update?: FontVariantUpdateWithWhereUniqueWithoutIngredientInput | FontVariantUpdateWithWhereUniqueWithoutIngredientInput[]
    updateMany?: FontVariantUpdateManyWithWhereWithoutIngredientInput | FontVariantUpdateManyWithWhereWithoutIngredientInput[]
    deleteMany?: FontVariantScalarWhereInput | FontVariantScalarWhereInput[]
  }

  export type FormulaUpdateManyWithoutFontsNestedInput = {
    create?: XOR<FormulaCreateWithoutFontsInput, FormulaUncheckedCreateWithoutFontsInput> | FormulaCreateWithoutFontsInput[] | FormulaUncheckedCreateWithoutFontsInput[]
    connectOrCreate?: FormulaCreateOrConnectWithoutFontsInput | FormulaCreateOrConnectWithoutFontsInput[]
    upsert?: FormulaUpsertWithWhereUniqueWithoutFontsInput | FormulaUpsertWithWhereUniqueWithoutFontsInput[]
    set?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    disconnect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    delete?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    connect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    update?: FormulaUpdateWithWhereUniqueWithoutFontsInput | FormulaUpdateWithWhereUniqueWithoutFontsInput[]
    updateMany?: FormulaUpdateManyWithWhereWithoutFontsInput | FormulaUpdateManyWithWhereWithoutFontsInput[]
    deleteMany?: FormulaScalarWhereInput | FormulaScalarWhereInput[]
  }

  export type PrescriptionUpdateManyWithoutPrimaryFontNestedInput = {
    create?: XOR<PrescriptionCreateWithoutPrimaryFontInput, PrescriptionUncheckedCreateWithoutPrimaryFontInput> | PrescriptionCreateWithoutPrimaryFontInput[] | PrescriptionUncheckedCreateWithoutPrimaryFontInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPrimaryFontInput | PrescriptionCreateOrConnectWithoutPrimaryFontInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutPrimaryFontInput | PrescriptionUpsertWithWhereUniqueWithoutPrimaryFontInput[]
    createMany?: PrescriptionCreateManyPrimaryFontInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutPrimaryFontInput | PrescriptionUpdateWithWhereUniqueWithoutPrimaryFontInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutPrimaryFontInput | PrescriptionUpdateManyWithWhereWithoutPrimaryFontInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type PrescriptionUpdateManyWithoutSecondaryFontNestedInput = {
    create?: XOR<PrescriptionCreateWithoutSecondaryFontInput, PrescriptionUncheckedCreateWithoutSecondaryFontInput> | PrescriptionCreateWithoutSecondaryFontInput[] | PrescriptionUncheckedCreateWithoutSecondaryFontInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutSecondaryFontInput | PrescriptionCreateOrConnectWithoutSecondaryFontInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutSecondaryFontInput | PrescriptionUpsertWithWhereUniqueWithoutSecondaryFontInput[]
    createMany?: PrescriptionCreateManySecondaryFontInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutSecondaryFontInput | PrescriptionUpdateWithWhereUniqueWithoutSecondaryFontInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutSecondaryFontInput | PrescriptionUpdateManyWithWhereWithoutSecondaryFontInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type TagUpdateManyWithoutIngredientsNestedInput = {
    create?: XOR<TagCreateWithoutIngredientsInput, TagUncheckedCreateWithoutIngredientsInput> | TagCreateWithoutIngredientsInput[] | TagUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutIngredientsInput | TagCreateOrConnectWithoutIngredientsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutIngredientsInput | TagUpsertWithWhereUniqueWithoutIngredientsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutIngredientsInput | TagUpdateWithWhereUniqueWithoutIngredientsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutIngredientsInput | TagUpdateManyWithWhereWithoutIngredientsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type PostUpdateManyWithoutFontsNestedInput = {
    create?: XOR<PostCreateWithoutFontsInput, PostUncheckedCreateWithoutFontsInput> | PostCreateWithoutFontsInput[] | PostUncheckedCreateWithoutFontsInput[]
    connectOrCreate?: PostCreateOrConnectWithoutFontsInput | PostCreateOrConnectWithoutFontsInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutFontsInput | PostUpsertWithWhereUniqueWithoutFontsInput[]
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutFontsInput | PostUpdateWithWhereUniqueWithoutFontsInput[]
    updateMany?: PostUpdateManyWithWhereWithoutFontsInput | PostUpdateManyWithWhereWithoutFontsInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type FontVariantUncheckedUpdateManyWithoutIngredientNestedInput = {
    create?: XOR<FontVariantCreateWithoutIngredientInput, FontVariantUncheckedCreateWithoutIngredientInput> | FontVariantCreateWithoutIngredientInput[] | FontVariantUncheckedCreateWithoutIngredientInput[]
    connectOrCreate?: FontVariantCreateOrConnectWithoutIngredientInput | FontVariantCreateOrConnectWithoutIngredientInput[]
    upsert?: FontVariantUpsertWithWhereUniqueWithoutIngredientInput | FontVariantUpsertWithWhereUniqueWithoutIngredientInput[]
    createMany?: FontVariantCreateManyIngredientInputEnvelope
    set?: FontVariantWhereUniqueInput | FontVariantWhereUniqueInput[]
    disconnect?: FontVariantWhereUniqueInput | FontVariantWhereUniqueInput[]
    delete?: FontVariantWhereUniqueInput | FontVariantWhereUniqueInput[]
    connect?: FontVariantWhereUniqueInput | FontVariantWhereUniqueInput[]
    update?: FontVariantUpdateWithWhereUniqueWithoutIngredientInput | FontVariantUpdateWithWhereUniqueWithoutIngredientInput[]
    updateMany?: FontVariantUpdateManyWithWhereWithoutIngredientInput | FontVariantUpdateManyWithWhereWithoutIngredientInput[]
    deleteMany?: FontVariantScalarWhereInput | FontVariantScalarWhereInput[]
  }

  export type FormulaUncheckedUpdateManyWithoutFontsNestedInput = {
    create?: XOR<FormulaCreateWithoutFontsInput, FormulaUncheckedCreateWithoutFontsInput> | FormulaCreateWithoutFontsInput[] | FormulaUncheckedCreateWithoutFontsInput[]
    connectOrCreate?: FormulaCreateOrConnectWithoutFontsInput | FormulaCreateOrConnectWithoutFontsInput[]
    upsert?: FormulaUpsertWithWhereUniqueWithoutFontsInput | FormulaUpsertWithWhereUniqueWithoutFontsInput[]
    set?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    disconnect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    delete?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    connect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    update?: FormulaUpdateWithWhereUniqueWithoutFontsInput | FormulaUpdateWithWhereUniqueWithoutFontsInput[]
    updateMany?: FormulaUpdateManyWithWhereWithoutFontsInput | FormulaUpdateManyWithWhereWithoutFontsInput[]
    deleteMany?: FormulaScalarWhereInput | FormulaScalarWhereInput[]
  }

  export type PrescriptionUncheckedUpdateManyWithoutPrimaryFontNestedInput = {
    create?: XOR<PrescriptionCreateWithoutPrimaryFontInput, PrescriptionUncheckedCreateWithoutPrimaryFontInput> | PrescriptionCreateWithoutPrimaryFontInput[] | PrescriptionUncheckedCreateWithoutPrimaryFontInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPrimaryFontInput | PrescriptionCreateOrConnectWithoutPrimaryFontInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutPrimaryFontInput | PrescriptionUpsertWithWhereUniqueWithoutPrimaryFontInput[]
    createMany?: PrescriptionCreateManyPrimaryFontInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutPrimaryFontInput | PrescriptionUpdateWithWhereUniqueWithoutPrimaryFontInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutPrimaryFontInput | PrescriptionUpdateManyWithWhereWithoutPrimaryFontInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type PrescriptionUncheckedUpdateManyWithoutSecondaryFontNestedInput = {
    create?: XOR<PrescriptionCreateWithoutSecondaryFontInput, PrescriptionUncheckedCreateWithoutSecondaryFontInput> | PrescriptionCreateWithoutSecondaryFontInput[] | PrescriptionUncheckedCreateWithoutSecondaryFontInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutSecondaryFontInput | PrescriptionCreateOrConnectWithoutSecondaryFontInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutSecondaryFontInput | PrescriptionUpsertWithWhereUniqueWithoutSecondaryFontInput[]
    createMany?: PrescriptionCreateManySecondaryFontInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutSecondaryFontInput | PrescriptionUpdateWithWhereUniqueWithoutSecondaryFontInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutSecondaryFontInput | PrescriptionUpdateManyWithWhereWithoutSecondaryFontInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type TagUncheckedUpdateManyWithoutIngredientsNestedInput = {
    create?: XOR<TagCreateWithoutIngredientsInput, TagUncheckedCreateWithoutIngredientsInput> | TagCreateWithoutIngredientsInput[] | TagUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutIngredientsInput | TagCreateOrConnectWithoutIngredientsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutIngredientsInput | TagUpsertWithWhereUniqueWithoutIngredientsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutIngredientsInput | TagUpdateWithWhereUniqueWithoutIngredientsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutIngredientsInput | TagUpdateManyWithWhereWithoutIngredientsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutFontsNestedInput = {
    create?: XOR<PostCreateWithoutFontsInput, PostUncheckedCreateWithoutFontsInput> | PostCreateWithoutFontsInput[] | PostUncheckedCreateWithoutFontsInput[]
    connectOrCreate?: PostCreateOrConnectWithoutFontsInput | PostCreateOrConnectWithoutFontsInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutFontsInput | PostUpsertWithWhereUniqueWithoutFontsInput[]
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutFontsInput | PostUpdateWithWhereUniqueWithoutFontsInput[]
    updateMany?: PostUpdateManyWithWhereWithoutFontsInput | PostUpdateManyWithWhereWithoutFontsInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type IngredientCreateNestedManyWithoutFormulasInput = {
    create?: XOR<IngredientCreateWithoutFormulasInput, IngredientUncheckedCreateWithoutFormulasInput> | IngredientCreateWithoutFormulasInput[] | IngredientUncheckedCreateWithoutFormulasInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutFormulasInput | IngredientCreateOrConnectWithoutFormulasInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
  }

  export type TagCreateNestedManyWithoutFormulasInput = {
    create?: XOR<TagCreateWithoutFormulasInput, TagUncheckedCreateWithoutFormulasInput> | TagCreateWithoutFormulasInput[] | TagUncheckedCreateWithoutFormulasInput[]
    connectOrCreate?: TagCreateOrConnectWithoutFormulasInput | TagCreateOrConnectWithoutFormulasInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type IngredientUncheckedCreateNestedManyWithoutFormulasInput = {
    create?: XOR<IngredientCreateWithoutFormulasInput, IngredientUncheckedCreateWithoutFormulasInput> | IngredientCreateWithoutFormulasInput[] | IngredientUncheckedCreateWithoutFormulasInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutFormulasInput | IngredientCreateOrConnectWithoutFormulasInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
  }

  export type TagUncheckedCreateNestedManyWithoutFormulasInput = {
    create?: XOR<TagCreateWithoutFormulasInput, TagUncheckedCreateWithoutFormulasInput> | TagCreateWithoutFormulasInput[] | TagUncheckedCreateWithoutFormulasInput[]
    connectOrCreate?: TagCreateOrConnectWithoutFormulasInput | TagCreateOrConnectWithoutFormulasInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type IngredientUpdateManyWithoutFormulasNestedInput = {
    create?: XOR<IngredientCreateWithoutFormulasInput, IngredientUncheckedCreateWithoutFormulasInput> | IngredientCreateWithoutFormulasInput[] | IngredientUncheckedCreateWithoutFormulasInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutFormulasInput | IngredientCreateOrConnectWithoutFormulasInput[]
    upsert?: IngredientUpsertWithWhereUniqueWithoutFormulasInput | IngredientUpsertWithWhereUniqueWithoutFormulasInput[]
    set?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    disconnect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    delete?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    update?: IngredientUpdateWithWhereUniqueWithoutFormulasInput | IngredientUpdateWithWhereUniqueWithoutFormulasInput[]
    updateMany?: IngredientUpdateManyWithWhereWithoutFormulasInput | IngredientUpdateManyWithWhereWithoutFormulasInput[]
    deleteMany?: IngredientScalarWhereInput | IngredientScalarWhereInput[]
  }

  export type TagUpdateManyWithoutFormulasNestedInput = {
    create?: XOR<TagCreateWithoutFormulasInput, TagUncheckedCreateWithoutFormulasInput> | TagCreateWithoutFormulasInput[] | TagUncheckedCreateWithoutFormulasInput[]
    connectOrCreate?: TagCreateOrConnectWithoutFormulasInput | TagCreateOrConnectWithoutFormulasInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutFormulasInput | TagUpsertWithWhereUniqueWithoutFormulasInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutFormulasInput | TagUpdateWithWhereUniqueWithoutFormulasInput[]
    updateMany?: TagUpdateManyWithWhereWithoutFormulasInput | TagUpdateManyWithWhereWithoutFormulasInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type IngredientUncheckedUpdateManyWithoutFormulasNestedInput = {
    create?: XOR<IngredientCreateWithoutFormulasInput, IngredientUncheckedCreateWithoutFormulasInput> | IngredientCreateWithoutFormulasInput[] | IngredientUncheckedCreateWithoutFormulasInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutFormulasInput | IngredientCreateOrConnectWithoutFormulasInput[]
    upsert?: IngredientUpsertWithWhereUniqueWithoutFormulasInput | IngredientUpsertWithWhereUniqueWithoutFormulasInput[]
    set?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    disconnect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    delete?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    update?: IngredientUpdateWithWhereUniqueWithoutFormulasInput | IngredientUpdateWithWhereUniqueWithoutFormulasInput[]
    updateMany?: IngredientUpdateManyWithWhereWithoutFormulasInput | IngredientUpdateManyWithWhereWithoutFormulasInput[]
    deleteMany?: IngredientScalarWhereInput | IngredientScalarWhereInput[]
  }

  export type TagUncheckedUpdateManyWithoutFormulasNestedInput = {
    create?: XOR<TagCreateWithoutFormulasInput, TagUncheckedCreateWithoutFormulasInput> | TagCreateWithoutFormulasInput[] | TagUncheckedCreateWithoutFormulasInput[]
    connectOrCreate?: TagCreateOrConnectWithoutFormulasInput | TagCreateOrConnectWithoutFormulasInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutFormulasInput | TagUpsertWithWhereUniqueWithoutFormulasInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutFormulasInput | TagUpdateWithWhereUniqueWithoutFormulasInput[]
    updateMany?: TagUpdateManyWithWhereWithoutFormulasInput | TagUpdateManyWithWhereWithoutFormulasInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type IngredientCreateNestedOneWithoutPrimaryPrescriptionsInput = {
    create?: XOR<IngredientCreateWithoutPrimaryPrescriptionsInput, IngredientUncheckedCreateWithoutPrimaryPrescriptionsInput>
    connectOrCreate?: IngredientCreateOrConnectWithoutPrimaryPrescriptionsInput
    connect?: IngredientWhereUniqueInput
  }

  export type IngredientCreateNestedOneWithoutSecondaryPrescriptionsInput = {
    create?: XOR<IngredientCreateWithoutSecondaryPrescriptionsInput, IngredientUncheckedCreateWithoutSecondaryPrescriptionsInput>
    connectOrCreate?: IngredientCreateOrConnectWithoutSecondaryPrescriptionsInput
    connect?: IngredientWhereUniqueInput
  }

  export type TagCreateNestedManyWithoutPrescriptionsInput = {
    create?: XOR<TagCreateWithoutPrescriptionsInput, TagUncheckedCreateWithoutPrescriptionsInput> | TagCreateWithoutPrescriptionsInput[] | TagUncheckedCreateWithoutPrescriptionsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutPrescriptionsInput | TagCreateOrConnectWithoutPrescriptionsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type SeoModuleCreateNestedOneWithoutPrescriptionInput = {
    create?: XOR<SeoModuleCreateWithoutPrescriptionInput, SeoModuleUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: SeoModuleCreateOrConnectWithoutPrescriptionInput
    connect?: SeoModuleWhereUniqueInput
  }

  export type TagUncheckedCreateNestedManyWithoutPrescriptionsInput = {
    create?: XOR<TagCreateWithoutPrescriptionsInput, TagUncheckedCreateWithoutPrescriptionsInput> | TagCreateWithoutPrescriptionsInput[] | TagUncheckedCreateWithoutPrescriptionsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutPrescriptionsInput | TagCreateOrConnectWithoutPrescriptionsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type IngredientUpdateOneRequiredWithoutPrimaryPrescriptionsNestedInput = {
    create?: XOR<IngredientCreateWithoutPrimaryPrescriptionsInput, IngredientUncheckedCreateWithoutPrimaryPrescriptionsInput>
    connectOrCreate?: IngredientCreateOrConnectWithoutPrimaryPrescriptionsInput
    upsert?: IngredientUpsertWithoutPrimaryPrescriptionsInput
    connect?: IngredientWhereUniqueInput
    update?: XOR<XOR<IngredientUpdateToOneWithWhereWithoutPrimaryPrescriptionsInput, IngredientUpdateWithoutPrimaryPrescriptionsInput>, IngredientUncheckedUpdateWithoutPrimaryPrescriptionsInput>
  }

  export type IngredientUpdateOneRequiredWithoutSecondaryPrescriptionsNestedInput = {
    create?: XOR<IngredientCreateWithoutSecondaryPrescriptionsInput, IngredientUncheckedCreateWithoutSecondaryPrescriptionsInput>
    connectOrCreate?: IngredientCreateOrConnectWithoutSecondaryPrescriptionsInput
    upsert?: IngredientUpsertWithoutSecondaryPrescriptionsInput
    connect?: IngredientWhereUniqueInput
    update?: XOR<XOR<IngredientUpdateToOneWithWhereWithoutSecondaryPrescriptionsInput, IngredientUpdateWithoutSecondaryPrescriptionsInput>, IngredientUncheckedUpdateWithoutSecondaryPrescriptionsInput>
  }

  export type TagUpdateManyWithoutPrescriptionsNestedInput = {
    create?: XOR<TagCreateWithoutPrescriptionsInput, TagUncheckedCreateWithoutPrescriptionsInput> | TagCreateWithoutPrescriptionsInput[] | TagUncheckedCreateWithoutPrescriptionsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutPrescriptionsInput | TagCreateOrConnectWithoutPrescriptionsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutPrescriptionsInput | TagUpsertWithWhereUniqueWithoutPrescriptionsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutPrescriptionsInput | TagUpdateWithWhereUniqueWithoutPrescriptionsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutPrescriptionsInput | TagUpdateManyWithWhereWithoutPrescriptionsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type SeoModuleUpdateOneWithoutPrescriptionNestedInput = {
    create?: XOR<SeoModuleCreateWithoutPrescriptionInput, SeoModuleUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: SeoModuleCreateOrConnectWithoutPrescriptionInput
    upsert?: SeoModuleUpsertWithoutPrescriptionInput
    disconnect?: SeoModuleWhereInput | boolean
    delete?: SeoModuleWhereInput | boolean
    connect?: SeoModuleWhereUniqueInput
    update?: XOR<XOR<SeoModuleUpdateToOneWithWhereWithoutPrescriptionInput, SeoModuleUpdateWithoutPrescriptionInput>, SeoModuleUncheckedUpdateWithoutPrescriptionInput>
  }

  export type TagUncheckedUpdateManyWithoutPrescriptionsNestedInput = {
    create?: XOR<TagCreateWithoutPrescriptionsInput, TagUncheckedCreateWithoutPrescriptionsInput> | TagCreateWithoutPrescriptionsInput[] | TagUncheckedCreateWithoutPrescriptionsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutPrescriptionsInput | TagCreateOrConnectWithoutPrescriptionsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutPrescriptionsInput | TagUpsertWithWhereUniqueWithoutPrescriptionsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutPrescriptionsInput | TagUpdateWithWhereUniqueWithoutPrescriptionsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutPrescriptionsInput | TagUpdateManyWithWhereWithoutPrescriptionsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PrescriptionCreateNestedManyWithoutTagsInput = {
    create?: XOR<PrescriptionCreateWithoutTagsInput, PrescriptionUncheckedCreateWithoutTagsInput> | PrescriptionCreateWithoutTagsInput[] | PrescriptionUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutTagsInput | PrescriptionCreateOrConnectWithoutTagsInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type IngredientCreateNestedManyWithoutTagsInput = {
    create?: XOR<IngredientCreateWithoutTagsInput, IngredientUncheckedCreateWithoutTagsInput> | IngredientCreateWithoutTagsInput[] | IngredientUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutTagsInput | IngredientCreateOrConnectWithoutTagsInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
  }

  export type FormulaCreateNestedManyWithoutTagsInput = {
    create?: XOR<FormulaCreateWithoutTagsInput, FormulaUncheckedCreateWithoutTagsInput> | FormulaCreateWithoutTagsInput[] | FormulaUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: FormulaCreateOrConnectWithoutTagsInput | FormulaCreateOrConnectWithoutTagsInput[]
    connect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutTagsInput = {
    create?: XOR<PostCreateWithoutTagsInput, PostUncheckedCreateWithoutTagsInput> | PostCreateWithoutTagsInput[] | PostUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: PostCreateOrConnectWithoutTagsInput | PostCreateOrConnectWithoutTagsInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type PrescriptionUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<PrescriptionCreateWithoutTagsInput, PrescriptionUncheckedCreateWithoutTagsInput> | PrescriptionCreateWithoutTagsInput[] | PrescriptionUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutTagsInput | PrescriptionCreateOrConnectWithoutTagsInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type IngredientUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<IngredientCreateWithoutTagsInput, IngredientUncheckedCreateWithoutTagsInput> | IngredientCreateWithoutTagsInput[] | IngredientUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutTagsInput | IngredientCreateOrConnectWithoutTagsInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
  }

  export type FormulaUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<FormulaCreateWithoutTagsInput, FormulaUncheckedCreateWithoutTagsInput> | FormulaCreateWithoutTagsInput[] | FormulaUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: FormulaCreateOrConnectWithoutTagsInput | FormulaCreateOrConnectWithoutTagsInput[]
    connect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<PostCreateWithoutTagsInput, PostUncheckedCreateWithoutTagsInput> | PostCreateWithoutTagsInput[] | PostUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: PostCreateOrConnectWithoutTagsInput | PostCreateOrConnectWithoutTagsInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type PrescriptionUpdateManyWithoutTagsNestedInput = {
    create?: XOR<PrescriptionCreateWithoutTagsInput, PrescriptionUncheckedCreateWithoutTagsInput> | PrescriptionCreateWithoutTagsInput[] | PrescriptionUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutTagsInput | PrescriptionCreateOrConnectWithoutTagsInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutTagsInput | PrescriptionUpsertWithWhereUniqueWithoutTagsInput[]
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutTagsInput | PrescriptionUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutTagsInput | PrescriptionUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type IngredientUpdateManyWithoutTagsNestedInput = {
    create?: XOR<IngredientCreateWithoutTagsInput, IngredientUncheckedCreateWithoutTagsInput> | IngredientCreateWithoutTagsInput[] | IngredientUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutTagsInput | IngredientCreateOrConnectWithoutTagsInput[]
    upsert?: IngredientUpsertWithWhereUniqueWithoutTagsInput | IngredientUpsertWithWhereUniqueWithoutTagsInput[]
    set?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    disconnect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    delete?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    update?: IngredientUpdateWithWhereUniqueWithoutTagsInput | IngredientUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: IngredientUpdateManyWithWhereWithoutTagsInput | IngredientUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: IngredientScalarWhereInput | IngredientScalarWhereInput[]
  }

  export type FormulaUpdateManyWithoutTagsNestedInput = {
    create?: XOR<FormulaCreateWithoutTagsInput, FormulaUncheckedCreateWithoutTagsInput> | FormulaCreateWithoutTagsInput[] | FormulaUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: FormulaCreateOrConnectWithoutTagsInput | FormulaCreateOrConnectWithoutTagsInput[]
    upsert?: FormulaUpsertWithWhereUniqueWithoutTagsInput | FormulaUpsertWithWhereUniqueWithoutTagsInput[]
    set?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    disconnect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    delete?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    connect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    update?: FormulaUpdateWithWhereUniqueWithoutTagsInput | FormulaUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: FormulaUpdateManyWithWhereWithoutTagsInput | FormulaUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: FormulaScalarWhereInput | FormulaScalarWhereInput[]
  }

  export type PostUpdateManyWithoutTagsNestedInput = {
    create?: XOR<PostCreateWithoutTagsInput, PostUncheckedCreateWithoutTagsInput> | PostCreateWithoutTagsInput[] | PostUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: PostCreateOrConnectWithoutTagsInput | PostCreateOrConnectWithoutTagsInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutTagsInput | PostUpsertWithWhereUniqueWithoutTagsInput[]
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutTagsInput | PostUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: PostUpdateManyWithWhereWithoutTagsInput | PostUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type PrescriptionUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<PrescriptionCreateWithoutTagsInput, PrescriptionUncheckedCreateWithoutTagsInput> | PrescriptionCreateWithoutTagsInput[] | PrescriptionUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutTagsInput | PrescriptionCreateOrConnectWithoutTagsInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutTagsInput | PrescriptionUpsertWithWhereUniqueWithoutTagsInput[]
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutTagsInput | PrescriptionUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutTagsInput | PrescriptionUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type IngredientUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<IngredientCreateWithoutTagsInput, IngredientUncheckedCreateWithoutTagsInput> | IngredientCreateWithoutTagsInput[] | IngredientUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutTagsInput | IngredientCreateOrConnectWithoutTagsInput[]
    upsert?: IngredientUpsertWithWhereUniqueWithoutTagsInput | IngredientUpsertWithWhereUniqueWithoutTagsInput[]
    set?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    disconnect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    delete?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    update?: IngredientUpdateWithWhereUniqueWithoutTagsInput | IngredientUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: IngredientUpdateManyWithWhereWithoutTagsInput | IngredientUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: IngredientScalarWhereInput | IngredientScalarWhereInput[]
  }

  export type FormulaUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<FormulaCreateWithoutTagsInput, FormulaUncheckedCreateWithoutTagsInput> | FormulaCreateWithoutTagsInput[] | FormulaUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: FormulaCreateOrConnectWithoutTagsInput | FormulaCreateOrConnectWithoutTagsInput[]
    upsert?: FormulaUpsertWithWhereUniqueWithoutTagsInput | FormulaUpsertWithWhereUniqueWithoutTagsInput[]
    set?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    disconnect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    delete?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    connect?: FormulaWhereUniqueInput | FormulaWhereUniqueInput[]
    update?: FormulaUpdateWithWhereUniqueWithoutTagsInput | FormulaUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: FormulaUpdateManyWithWhereWithoutTagsInput | FormulaUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: FormulaScalarWhereInput | FormulaScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<PostCreateWithoutTagsInput, PostUncheckedCreateWithoutTagsInput> | PostCreateWithoutTagsInput[] | PostUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: PostCreateOrConnectWithoutTagsInput | PostCreateOrConnectWithoutTagsInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutTagsInput | PostUpsertWithWhereUniqueWithoutTagsInput[]
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutTagsInput | PostUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: PostUpdateManyWithWhereWithoutTagsInput | PostUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type TagCreateNestedManyWithoutPostsInput = {
    create?: XOR<TagCreateWithoutPostsInput, TagUncheckedCreateWithoutPostsInput> | TagCreateWithoutPostsInput[] | TagUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutPostsInput | TagCreateOrConnectWithoutPostsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type IngredientCreateNestedManyWithoutPostsInput = {
    create?: XOR<IngredientCreateWithoutPostsInput, IngredientUncheckedCreateWithoutPostsInput> | IngredientCreateWithoutPostsInput[] | IngredientUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutPostsInput | IngredientCreateOrConnectWithoutPostsInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
  }

  export type SeoModuleCreateNestedOneWithoutPostInput = {
    create?: XOR<SeoModuleCreateWithoutPostInput, SeoModuleUncheckedCreateWithoutPostInput>
    connectOrCreate?: SeoModuleCreateOrConnectWithoutPostInput
    connect?: SeoModuleWhereUniqueInput
  }

  export type TagUncheckedCreateNestedManyWithoutPostsInput = {
    create?: XOR<TagCreateWithoutPostsInput, TagUncheckedCreateWithoutPostsInput> | TagCreateWithoutPostsInput[] | TagUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutPostsInput | TagCreateOrConnectWithoutPostsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type IngredientUncheckedCreateNestedManyWithoutPostsInput = {
    create?: XOR<IngredientCreateWithoutPostsInput, IngredientUncheckedCreateWithoutPostsInput> | IngredientCreateWithoutPostsInput[] | IngredientUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutPostsInput | IngredientCreateOrConnectWithoutPostsInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type TagUpdateManyWithoutPostsNestedInput = {
    create?: XOR<TagCreateWithoutPostsInput, TagUncheckedCreateWithoutPostsInput> | TagCreateWithoutPostsInput[] | TagUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutPostsInput | TagCreateOrConnectWithoutPostsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutPostsInput | TagUpsertWithWhereUniqueWithoutPostsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutPostsInput | TagUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutPostsInput | TagUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type IngredientUpdateManyWithoutPostsNestedInput = {
    create?: XOR<IngredientCreateWithoutPostsInput, IngredientUncheckedCreateWithoutPostsInput> | IngredientCreateWithoutPostsInput[] | IngredientUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutPostsInput | IngredientCreateOrConnectWithoutPostsInput[]
    upsert?: IngredientUpsertWithWhereUniqueWithoutPostsInput | IngredientUpsertWithWhereUniqueWithoutPostsInput[]
    set?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    disconnect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    delete?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    update?: IngredientUpdateWithWhereUniqueWithoutPostsInput | IngredientUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: IngredientUpdateManyWithWhereWithoutPostsInput | IngredientUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: IngredientScalarWhereInput | IngredientScalarWhereInput[]
  }

  export type SeoModuleUpdateOneWithoutPostNestedInput = {
    create?: XOR<SeoModuleCreateWithoutPostInput, SeoModuleUncheckedCreateWithoutPostInput>
    connectOrCreate?: SeoModuleCreateOrConnectWithoutPostInput
    upsert?: SeoModuleUpsertWithoutPostInput
    disconnect?: SeoModuleWhereInput | boolean
    delete?: SeoModuleWhereInput | boolean
    connect?: SeoModuleWhereUniqueInput
    update?: XOR<XOR<SeoModuleUpdateToOneWithWhereWithoutPostInput, SeoModuleUpdateWithoutPostInput>, SeoModuleUncheckedUpdateWithoutPostInput>
  }

  export type TagUncheckedUpdateManyWithoutPostsNestedInput = {
    create?: XOR<TagCreateWithoutPostsInput, TagUncheckedCreateWithoutPostsInput> | TagCreateWithoutPostsInput[] | TagUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutPostsInput | TagCreateOrConnectWithoutPostsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutPostsInput | TagUpsertWithWhereUniqueWithoutPostsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutPostsInput | TagUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutPostsInput | TagUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type IngredientUncheckedUpdateManyWithoutPostsNestedInput = {
    create?: XOR<IngredientCreateWithoutPostsInput, IngredientUncheckedCreateWithoutPostsInput> | IngredientCreateWithoutPostsInput[] | IngredientUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: IngredientCreateOrConnectWithoutPostsInput | IngredientCreateOrConnectWithoutPostsInput[]
    upsert?: IngredientUpsertWithWhereUniqueWithoutPostsInput | IngredientUpsertWithWhereUniqueWithoutPostsInput[]
    set?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    disconnect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    delete?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    connect?: IngredientWhereUniqueInput | IngredientWhereUniqueInput[]
    update?: IngredientUpdateWithWhereUniqueWithoutPostsInput | IngredientUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: IngredientUpdateManyWithWhereWithoutPostsInput | IngredientUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: IngredientScalarWhereInput | IngredientScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBytesNullableFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | null
    notIn?: Bytes[] | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Bytes | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | null
    notIn?: Bytes[] | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Bytes | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PostCreateWithoutAuthorInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagCreateNestedManyWithoutPostsInput
    fonts?: IngredientCreateNestedManyWithoutPostsInput
    seo?: SeoModuleCreateNestedOneWithoutPostInput
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    seoId?: string | null
    tags?: TagUncheckedCreateNestedManyWithoutPostsInput
    fonts?: IngredientUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostCreateManyAuthorInputEnvelope = {
    data: PostCreateManyAuthorInput | PostCreateManyAuthorInput[]
  }

  export type RoleCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: PermissionCreateNestedManyWithoutRolesInput
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: PermissionUncheckedCreateNestedManyWithoutRolesInput
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutAuthorInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: StringFilter<"Post"> | string
    postType?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    slug?: StringFilter<"Post"> | string
    caption?: StringNullableFilter<"Post"> | string | null
    description?: StringNullableFilter<"Post"> | string | null
    thumbnailUrl?: StringNullableFilter<"Post"> | string | null
    imageUrl?: StringNullableFilter<"Post"> | string | null
    imageAlt?: StringNullableFilter<"Post"> | string | null
    insight?: StringNullableFilter<"Post"> | string | null
    published?: BoolFilter<"Post"> | boolean
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    authorId?: StringFilter<"Post"> | string
    seoId?: StringNullableFilter<"Post"> | string | null
  }

  export type RoleUpsertWithWhereUniqueWithoutUsersInput = {
    where: RoleWhereUniqueInput
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type RoleUpdateWithWhereUniqueWithoutUsersInput = {
    where: RoleWhereUniqueInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateManyWithWhereWithoutUsersInput = {
    where: RoleScalarWhereInput
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyWithoutUsersInput>
  }

  export type RoleScalarWhereInput = {
    AND?: RoleScalarWhereInput | RoleScalarWhereInput[]
    OR?: RoleScalarWhereInput[]
    NOT?: RoleScalarWhereInput | RoleScalarWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
  }

  export type PermissionCreateWithoutRolesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionUncheckedCreateWithoutRolesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionCreateOrConnectWithoutRolesInput = {
    where: PermissionWhereUniqueInput
    create: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput>
  }

  export type UserCreateWithoutRolesInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: Bytes | null
    imageUrl?: string | null
    surname?: string | null
    biography?: string | null
    posts?: PostCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutRolesInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: Bytes | null
    imageUrl?: string | null
    surname?: string | null
    biography?: string | null
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutRolesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
  }

  export type PermissionUpsertWithWhereUniqueWithoutRolesInput = {
    where: PermissionWhereUniqueInput
    update: XOR<PermissionUpdateWithoutRolesInput, PermissionUncheckedUpdateWithoutRolesInput>
    create: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput>
  }

  export type PermissionUpdateWithWhereUniqueWithoutRolesInput = {
    where: PermissionWhereUniqueInput
    data: XOR<PermissionUpdateWithoutRolesInput, PermissionUncheckedUpdateWithoutRolesInput>
  }

  export type PermissionUpdateManyWithWhereWithoutRolesInput = {
    where: PermissionScalarWhereInput
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyWithoutRolesInput>
  }

  export type PermissionScalarWhereInput = {
    AND?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
    OR?: PermissionScalarWhereInput[]
    NOT?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
    id?: StringFilter<"Permission"> | string
    name?: StringFilter<"Permission"> | string
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
  }

  export type UserUpsertWithWhereUniqueWithoutRolesInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
    create: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRolesInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
  }

  export type UserUpdateManyWithWhereWithoutRolesInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRolesInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    image?: BytesNullableFilter<"User"> | Bytes | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    surname?: StringNullableFilter<"User"> | string | null
    biography?: StringNullableFilter<"User"> | string | null
  }

  export type RoleCreateWithoutPermissionsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutRolesInput
  }

  export type RoleUncheckedCreateWithoutPermissionsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutRolesInput
  }

  export type RoleCreateOrConnectWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type RoleUpsertWithWhereUniqueWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    update: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type RoleUpdateWithWhereUniqueWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    data: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type RoleUpdateManyWithWhereWithoutPermissionsInput = {
    where: RoleScalarWhereInput
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyWithoutPermissionsInput>
  }

  export type IngredientCreateWithoutAuthorInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: FontVariantCreateNestedManyWithoutIngredientInput
    formulas?: FormulaCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionCreateNestedManyWithoutSecondaryFontInput
    tags?: TagCreateNestedManyWithoutIngredientsInput
    posts?: PostCreateNestedManyWithoutFontsInput
  }

  export type IngredientUncheckedCreateWithoutAuthorInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: FontVariantUncheckedCreateNestedManyWithoutIngredientInput
    formulas?: FormulaUncheckedCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutSecondaryFontInput
    tags?: TagUncheckedCreateNestedManyWithoutIngredientsInput
    posts?: PostUncheckedCreateNestedManyWithoutFontsInput
  }

  export type IngredientCreateOrConnectWithoutAuthorInput = {
    where: IngredientWhereUniqueInput
    create: XOR<IngredientCreateWithoutAuthorInput, IngredientUncheckedCreateWithoutAuthorInput>
  }

  export type IngredientCreateManyAuthorInputEnvelope = {
    data: IngredientCreateManyAuthorInput | IngredientCreateManyAuthorInput[]
  }

  export type IngredientUpsertWithWhereUniqueWithoutAuthorInput = {
    where: IngredientWhereUniqueInput
    update: XOR<IngredientUpdateWithoutAuthorInput, IngredientUncheckedUpdateWithoutAuthorInput>
    create: XOR<IngredientCreateWithoutAuthorInput, IngredientUncheckedCreateWithoutAuthorInput>
  }

  export type IngredientUpdateWithWhereUniqueWithoutAuthorInput = {
    where: IngredientWhereUniqueInput
    data: XOR<IngredientUpdateWithoutAuthorInput, IngredientUncheckedUpdateWithoutAuthorInput>
  }

  export type IngredientUpdateManyWithWhereWithoutAuthorInput = {
    where: IngredientScalarWhereInput
    data: XOR<IngredientUpdateManyMutationInput, IngredientUncheckedUpdateManyWithoutAuthorInput>
  }

  export type IngredientScalarWhereInput = {
    AND?: IngredientScalarWhereInput | IngredientScalarWhereInput[]
    OR?: IngredientScalarWhereInput[]
    NOT?: IngredientScalarWhereInput | IngredientScalarWhereInput[]
    id?: StringFilter<"Ingredient"> | string
    name?: StringFilter<"Ingredient"> | string
    slug?: StringFilter<"Ingredient"> | string
    category?: StringFilter<"Ingredient"> | string
    creator?: StringNullableFilter<"Ingredient"> | string | null
    rating?: StringFilter<"Ingredient"> | string
    symbol?: StringNullableFilter<"Ingredient"> | string | null
    formula?: StringNullableFilter<"Ingredient"> | string | null
    importedFrom?: StringNullableFilter<"Ingredient"> | string | null
    licenseType?: StringNullableFilter<"Ingredient"> | string | null
    isVariable?: BoolFilter<"Ingredient"> | boolean
    userRating?: FloatNullableFilter<"Ingredient"> | number | null
    userRatingsCount?: IntNullableFilter<"Ingredient"> | number | null
    authorId?: StringNullableFilter<"Ingredient"> | string | null
    createdAt?: DateTimeFilter<"Ingredient"> | Date | string
    updatedAt?: DateTimeFilter<"Ingredient"> | Date | string
  }

  export type PostCreateWithoutSeoInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutPostsInput
    tags?: TagCreateNestedManyWithoutPostsInput
    fonts?: IngredientCreateNestedManyWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutSeoInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    tags?: TagUncheckedCreateNestedManyWithoutPostsInput
    fonts?: IngredientUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutSeoInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutSeoInput, PostUncheckedCreateWithoutSeoInput>
  }

  export type PrescriptionCreateWithoutSeoInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    primaryFont: IngredientCreateNestedOneWithoutPrimaryPrescriptionsInput
    secondaryFont: IngredientCreateNestedOneWithoutSecondaryPrescriptionsInput
    tags?: TagCreateNestedManyWithoutPrescriptionsInput
  }

  export type PrescriptionUncheckedCreateWithoutSeoInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    primaryFontId: string
    secondaryFontId: string
    tags?: TagUncheckedCreateNestedManyWithoutPrescriptionsInput
  }

  export type PrescriptionCreateOrConnectWithoutSeoInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutSeoInput, PrescriptionUncheckedCreateWithoutSeoInput>
  }

  export type PostUpsertWithoutSeoInput = {
    update: XOR<PostUpdateWithoutSeoInput, PostUncheckedUpdateWithoutSeoInput>
    create: XOR<PostCreateWithoutSeoInput, PostUncheckedCreateWithoutSeoInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutSeoInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutSeoInput, PostUncheckedUpdateWithoutSeoInput>
  }

  export type PostUpdateWithoutSeoInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    tags?: TagUpdateManyWithoutPostsNestedInput
    fonts?: IngredientUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutSeoInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    tags?: TagUncheckedUpdateManyWithoutPostsNestedInput
    fonts?: IngredientUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PrescriptionUpsertWithoutSeoInput = {
    update: XOR<PrescriptionUpdateWithoutSeoInput, PrescriptionUncheckedUpdateWithoutSeoInput>
    create: XOR<PrescriptionCreateWithoutSeoInput, PrescriptionUncheckedCreateWithoutSeoInput>
    where?: PrescriptionWhereInput
  }

  export type PrescriptionUpdateToOneWithWhereWithoutSeoInput = {
    where?: PrescriptionWhereInput
    data: XOR<PrescriptionUpdateWithoutSeoInput, PrescriptionUncheckedUpdateWithoutSeoInput>
  }

  export type PrescriptionUpdateWithoutSeoInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFont?: IngredientUpdateOneRequiredWithoutPrimaryPrescriptionsNestedInput
    secondaryFont?: IngredientUpdateOneRequiredWithoutSecondaryPrescriptionsNestedInput
    tags?: TagUpdateManyWithoutPrescriptionsNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutSeoInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFontId?: StringFieldUpdateOperationsInput | string
    secondaryFontId?: StringFieldUpdateOperationsInput | string
    tags?: TagUncheckedUpdateManyWithoutPrescriptionsNestedInput
  }

  export type IngredientCreateWithoutVariantsInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author?: FontAuthorCreateNestedOneWithoutFontsInput
    formulas?: FormulaCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionCreateNestedManyWithoutSecondaryFontInput
    tags?: TagCreateNestedManyWithoutIngredientsInput
    posts?: PostCreateNestedManyWithoutFontsInput
  }

  export type IngredientUncheckedCreateWithoutVariantsInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    formulas?: FormulaUncheckedCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutSecondaryFontInput
    tags?: TagUncheckedCreateNestedManyWithoutIngredientsInput
    posts?: PostUncheckedCreateNestedManyWithoutFontsInput
  }

  export type IngredientCreateOrConnectWithoutVariantsInput = {
    where: IngredientWhereUniqueInput
    create: XOR<IngredientCreateWithoutVariantsInput, IngredientUncheckedCreateWithoutVariantsInput>
  }

  export type IngredientUpsertWithoutVariantsInput = {
    update: XOR<IngredientUpdateWithoutVariantsInput, IngredientUncheckedUpdateWithoutVariantsInput>
    create: XOR<IngredientCreateWithoutVariantsInput, IngredientUncheckedCreateWithoutVariantsInput>
    where?: IngredientWhereInput
  }

  export type IngredientUpdateToOneWithWhereWithoutVariantsInput = {
    where?: IngredientWhereInput
    data: XOR<IngredientUpdateWithoutVariantsInput, IngredientUncheckedUpdateWithoutVariantsInput>
  }

  export type IngredientUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: FontAuthorUpdateOneWithoutFontsNestedInput
    formulas?: FormulaUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUpdateManyWithoutIngredientsNestedInput
    posts?: PostUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    formulas?: FormulaUncheckedUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUncheckedUpdateManyWithoutIngredientsNestedInput
    posts?: PostUncheckedUpdateManyWithoutFontsNestedInput
  }

  export type FontAuthorCreateWithoutFontsInput = {
    id?: string
    slug: string
    name: string
    type?: string
    email: string
    supportEmail?: string | null
    avatarUrl?: string | null
    bannerUrl?: string | null
    bio?: string | null
    website?: string | null
    dafontProfileUrl?: string | null
    profileInfoUrl?: string | null
    donation?: string | null
    nationality?: string | null
    languagesSpoken?: string | null
    isVerified?: boolean
    socialLinks?: string | null
    metrics?: string | null
    businessInfo?: string | null
    specialties?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FontAuthorUncheckedCreateWithoutFontsInput = {
    id?: string
    slug: string
    name: string
    type?: string
    email: string
    supportEmail?: string | null
    avatarUrl?: string | null
    bannerUrl?: string | null
    bio?: string | null
    website?: string | null
    dafontProfileUrl?: string | null
    profileInfoUrl?: string | null
    donation?: string | null
    nationality?: string | null
    languagesSpoken?: string | null
    isVerified?: boolean
    socialLinks?: string | null
    metrics?: string | null
    businessInfo?: string | null
    specialties?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FontAuthorCreateOrConnectWithoutFontsInput = {
    where: FontAuthorWhereUniqueInput
    create: XOR<FontAuthorCreateWithoutFontsInput, FontAuthorUncheckedCreateWithoutFontsInput>
  }

  export type FontVariantCreateWithoutIngredientInput = {
    id?: string
    fontFamilyName: string
    weight: number
    style: string
    woff2Url: string
    label: string
  }

  export type FontVariantUncheckedCreateWithoutIngredientInput = {
    id?: string
    fontFamilyName: string
    weight: number
    style: string
    woff2Url: string
    label: string
  }

  export type FontVariantCreateOrConnectWithoutIngredientInput = {
    where: FontVariantWhereUniqueInput
    create: XOR<FontVariantCreateWithoutIngredientInput, FontVariantUncheckedCreateWithoutIngredientInput>
  }

  export type FontVariantCreateManyIngredientInputEnvelope = {
    data: FontVariantCreateManyIngredientInput | FontVariantCreateManyIngredientInput[]
  }

  export type FormulaCreateWithoutFontsInput = {
    id?: string
    name: string
    description?: string | null
    slug: string
    fontCategory: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagCreateNestedManyWithoutFormulasInput
  }

  export type FormulaUncheckedCreateWithoutFontsInput = {
    id?: string
    name: string
    description?: string | null
    slug: string
    fontCategory: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutFormulasInput
  }

  export type FormulaCreateOrConnectWithoutFontsInput = {
    where: FormulaWhereUniqueInput
    create: XOR<FormulaCreateWithoutFontsInput, FormulaUncheckedCreateWithoutFontsInput>
  }

  export type PrescriptionCreateWithoutPrimaryFontInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    secondaryFont: IngredientCreateNestedOneWithoutSecondaryPrescriptionsInput
    tags?: TagCreateNestedManyWithoutPrescriptionsInput
    seo?: SeoModuleCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateWithoutPrimaryFontInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    secondaryFontId: string
    seoId?: string | null
    tags?: TagUncheckedCreateNestedManyWithoutPrescriptionsInput
  }

  export type PrescriptionCreateOrConnectWithoutPrimaryFontInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutPrimaryFontInput, PrescriptionUncheckedCreateWithoutPrimaryFontInput>
  }

  export type PrescriptionCreateManyPrimaryFontInputEnvelope = {
    data: PrescriptionCreateManyPrimaryFontInput | PrescriptionCreateManyPrimaryFontInput[]
  }

  export type PrescriptionCreateWithoutSecondaryFontInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    primaryFont: IngredientCreateNestedOneWithoutPrimaryPrescriptionsInput
    tags?: TagCreateNestedManyWithoutPrescriptionsInput
    seo?: SeoModuleCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateWithoutSecondaryFontInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    primaryFontId: string
    seoId?: string | null
    tags?: TagUncheckedCreateNestedManyWithoutPrescriptionsInput
  }

  export type PrescriptionCreateOrConnectWithoutSecondaryFontInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutSecondaryFontInput, PrescriptionUncheckedCreateWithoutSecondaryFontInput>
  }

  export type PrescriptionCreateManySecondaryFontInputEnvelope = {
    data: PrescriptionCreateManySecondaryFontInput | PrescriptionCreateManySecondaryFontInput[]
  }

  export type TagCreateWithoutIngredientsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionCreateNestedManyWithoutTagsInput
    formulas?: FormulaCreateNestedManyWithoutTagsInput
    posts?: PostCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateWithoutIngredientsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutTagsInput
    formulas?: FormulaUncheckedCreateNestedManyWithoutTagsInput
    posts?: PostUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagCreateOrConnectWithoutIngredientsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutIngredientsInput, TagUncheckedCreateWithoutIngredientsInput>
  }

  export type PostCreateWithoutFontsInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutPostsInput
    tags?: TagCreateNestedManyWithoutPostsInput
    seo?: SeoModuleCreateNestedOneWithoutPostInput
  }

  export type PostUncheckedCreateWithoutFontsInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    seoId?: string | null
    tags?: TagUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutFontsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutFontsInput, PostUncheckedCreateWithoutFontsInput>
  }

  export type FontAuthorUpsertWithoutFontsInput = {
    update: XOR<FontAuthorUpdateWithoutFontsInput, FontAuthorUncheckedUpdateWithoutFontsInput>
    create: XOR<FontAuthorCreateWithoutFontsInput, FontAuthorUncheckedCreateWithoutFontsInput>
    where?: FontAuthorWhereInput
  }

  export type FontAuthorUpdateToOneWithWhereWithoutFontsInput = {
    where?: FontAuthorWhereInput
    data: XOR<FontAuthorUpdateWithoutFontsInput, FontAuthorUncheckedUpdateWithoutFontsInput>
  }

  export type FontAuthorUpdateWithoutFontsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    supportEmail?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    dafontProfileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileInfoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    donation?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    languagesSpoken?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    businessInfo?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FontAuthorUncheckedUpdateWithoutFontsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    supportEmail?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    dafontProfileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileInfoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    donation?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    languagesSpoken?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    businessInfo?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FontVariantUpsertWithWhereUniqueWithoutIngredientInput = {
    where: FontVariantWhereUniqueInput
    update: XOR<FontVariantUpdateWithoutIngredientInput, FontVariantUncheckedUpdateWithoutIngredientInput>
    create: XOR<FontVariantCreateWithoutIngredientInput, FontVariantUncheckedCreateWithoutIngredientInput>
  }

  export type FontVariantUpdateWithWhereUniqueWithoutIngredientInput = {
    where: FontVariantWhereUniqueInput
    data: XOR<FontVariantUpdateWithoutIngredientInput, FontVariantUncheckedUpdateWithoutIngredientInput>
  }

  export type FontVariantUpdateManyWithWhereWithoutIngredientInput = {
    where: FontVariantScalarWhereInput
    data: XOR<FontVariantUpdateManyMutationInput, FontVariantUncheckedUpdateManyWithoutIngredientInput>
  }

  export type FontVariantScalarWhereInput = {
    AND?: FontVariantScalarWhereInput | FontVariantScalarWhereInput[]
    OR?: FontVariantScalarWhereInput[]
    NOT?: FontVariantScalarWhereInput | FontVariantScalarWhereInput[]
    id?: StringFilter<"FontVariant"> | string
    fontFamilyName?: StringFilter<"FontVariant"> | string
    weight?: IntFilter<"FontVariant"> | number
    style?: StringFilter<"FontVariant"> | string
    woff2Url?: StringFilter<"FontVariant"> | string
    label?: StringFilter<"FontVariant"> | string
    ingredientId?: StringFilter<"FontVariant"> | string
  }

  export type FormulaUpsertWithWhereUniqueWithoutFontsInput = {
    where: FormulaWhereUniqueInput
    update: XOR<FormulaUpdateWithoutFontsInput, FormulaUncheckedUpdateWithoutFontsInput>
    create: XOR<FormulaCreateWithoutFontsInput, FormulaUncheckedCreateWithoutFontsInput>
  }

  export type FormulaUpdateWithWhereUniqueWithoutFontsInput = {
    where: FormulaWhereUniqueInput
    data: XOR<FormulaUpdateWithoutFontsInput, FormulaUncheckedUpdateWithoutFontsInput>
  }

  export type FormulaUpdateManyWithWhereWithoutFontsInput = {
    where: FormulaScalarWhereInput
    data: XOR<FormulaUpdateManyMutationInput, FormulaUncheckedUpdateManyWithoutFontsInput>
  }

  export type FormulaScalarWhereInput = {
    AND?: FormulaScalarWhereInput | FormulaScalarWhereInput[]
    OR?: FormulaScalarWhereInput[]
    NOT?: FormulaScalarWhereInput | FormulaScalarWhereInput[]
    id?: StringFilter<"Formula"> | string
    name?: StringFilter<"Formula"> | string
    description?: StringNullableFilter<"Formula"> | string | null
    slug?: StringFilter<"Formula"> | string
    fontCategory?: StringFilter<"Formula"> | string
    createdAt?: DateTimeFilter<"Formula"> | Date | string
    updatedAt?: DateTimeFilter<"Formula"> | Date | string
  }

  export type PrescriptionUpsertWithWhereUniqueWithoutPrimaryFontInput = {
    where: PrescriptionWhereUniqueInput
    update: XOR<PrescriptionUpdateWithoutPrimaryFontInput, PrescriptionUncheckedUpdateWithoutPrimaryFontInput>
    create: XOR<PrescriptionCreateWithoutPrimaryFontInput, PrescriptionUncheckedCreateWithoutPrimaryFontInput>
  }

  export type PrescriptionUpdateWithWhereUniqueWithoutPrimaryFontInput = {
    where: PrescriptionWhereUniqueInput
    data: XOR<PrescriptionUpdateWithoutPrimaryFontInput, PrescriptionUncheckedUpdateWithoutPrimaryFontInput>
  }

  export type PrescriptionUpdateManyWithWhereWithoutPrimaryFontInput = {
    where: PrescriptionScalarWhereInput
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyWithoutPrimaryFontInput>
  }

  export type PrescriptionScalarWhereInput = {
    AND?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
    OR?: PrescriptionScalarWhereInput[]
    NOT?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
    id?: StringFilter<"Prescription"> | string
    name?: StringFilter<"Prescription"> | string
    slug?: StringFilter<"Prescription"> | string
    description?: StringNullableFilter<"Prescription"> | string | null
    imageUrl?: StringNullableFilter<"Prescription"> | string | null
    insight?: StringNullableFilter<"Prescription"> | string | null
    published?: BoolFilter<"Prescription"> | boolean
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    primaryFontId?: StringFilter<"Prescription"> | string
    secondaryFontId?: StringFilter<"Prescription"> | string
    seoId?: StringNullableFilter<"Prescription"> | string | null
  }

  export type PrescriptionUpsertWithWhereUniqueWithoutSecondaryFontInput = {
    where: PrescriptionWhereUniqueInput
    update: XOR<PrescriptionUpdateWithoutSecondaryFontInput, PrescriptionUncheckedUpdateWithoutSecondaryFontInput>
    create: XOR<PrescriptionCreateWithoutSecondaryFontInput, PrescriptionUncheckedCreateWithoutSecondaryFontInput>
  }

  export type PrescriptionUpdateWithWhereUniqueWithoutSecondaryFontInput = {
    where: PrescriptionWhereUniqueInput
    data: XOR<PrescriptionUpdateWithoutSecondaryFontInput, PrescriptionUncheckedUpdateWithoutSecondaryFontInput>
  }

  export type PrescriptionUpdateManyWithWhereWithoutSecondaryFontInput = {
    where: PrescriptionScalarWhereInput
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyWithoutSecondaryFontInput>
  }

  export type TagUpsertWithWhereUniqueWithoutIngredientsInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutIngredientsInput, TagUncheckedUpdateWithoutIngredientsInput>
    create: XOR<TagCreateWithoutIngredientsInput, TagUncheckedCreateWithoutIngredientsInput>
  }

  export type TagUpdateWithWhereUniqueWithoutIngredientsInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutIngredientsInput, TagUncheckedUpdateWithoutIngredientsInput>
  }

  export type TagUpdateManyWithWhereWithoutIngredientsInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutIngredientsInput>
  }

  export type TagScalarWhereInput = {
    AND?: TagScalarWhereInput | TagScalarWhereInput[]
    OR?: TagScalarWhereInput[]
    NOT?: TagScalarWhereInput | TagScalarWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    description?: StringNullableFilter<"Tag"> | string | null
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    updatedAt?: DateTimeFilter<"Tag"> | Date | string
  }

  export type PostUpsertWithWhereUniqueWithoutFontsInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutFontsInput, PostUncheckedUpdateWithoutFontsInput>
    create: XOR<PostCreateWithoutFontsInput, PostUncheckedCreateWithoutFontsInput>
  }

  export type PostUpdateWithWhereUniqueWithoutFontsInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutFontsInput, PostUncheckedUpdateWithoutFontsInput>
  }

  export type PostUpdateManyWithWhereWithoutFontsInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutFontsInput>
  }

  export type IngredientCreateWithoutFormulasInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author?: FontAuthorCreateNestedOneWithoutFontsInput
    variants?: FontVariantCreateNestedManyWithoutIngredientInput
    primaryPrescriptions?: PrescriptionCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionCreateNestedManyWithoutSecondaryFontInput
    tags?: TagCreateNestedManyWithoutIngredientsInput
    posts?: PostCreateNestedManyWithoutFontsInput
  }

  export type IngredientUncheckedCreateWithoutFormulasInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: FontVariantUncheckedCreateNestedManyWithoutIngredientInput
    primaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutSecondaryFontInput
    tags?: TagUncheckedCreateNestedManyWithoutIngredientsInput
    posts?: PostUncheckedCreateNestedManyWithoutFontsInput
  }

  export type IngredientCreateOrConnectWithoutFormulasInput = {
    where: IngredientWhereUniqueInput
    create: XOR<IngredientCreateWithoutFormulasInput, IngredientUncheckedCreateWithoutFormulasInput>
  }

  export type TagCreateWithoutFormulasInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionCreateNestedManyWithoutTagsInput
    ingredients?: IngredientCreateNestedManyWithoutTagsInput
    posts?: PostCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateWithoutFormulasInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutTagsInput
    ingredients?: IngredientUncheckedCreateNestedManyWithoutTagsInput
    posts?: PostUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagCreateOrConnectWithoutFormulasInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutFormulasInput, TagUncheckedCreateWithoutFormulasInput>
  }

  export type IngredientUpsertWithWhereUniqueWithoutFormulasInput = {
    where: IngredientWhereUniqueInput
    update: XOR<IngredientUpdateWithoutFormulasInput, IngredientUncheckedUpdateWithoutFormulasInput>
    create: XOR<IngredientCreateWithoutFormulasInput, IngredientUncheckedCreateWithoutFormulasInput>
  }

  export type IngredientUpdateWithWhereUniqueWithoutFormulasInput = {
    where: IngredientWhereUniqueInput
    data: XOR<IngredientUpdateWithoutFormulasInput, IngredientUncheckedUpdateWithoutFormulasInput>
  }

  export type IngredientUpdateManyWithWhereWithoutFormulasInput = {
    where: IngredientScalarWhereInput
    data: XOR<IngredientUpdateManyMutationInput, IngredientUncheckedUpdateManyWithoutFormulasInput>
  }

  export type TagUpsertWithWhereUniqueWithoutFormulasInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutFormulasInput, TagUncheckedUpdateWithoutFormulasInput>
    create: XOR<TagCreateWithoutFormulasInput, TagUncheckedCreateWithoutFormulasInput>
  }

  export type TagUpdateWithWhereUniqueWithoutFormulasInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutFormulasInput, TagUncheckedUpdateWithoutFormulasInput>
  }

  export type TagUpdateManyWithWhereWithoutFormulasInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutFormulasInput>
  }

  export type IngredientCreateWithoutPrimaryPrescriptionsInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author?: FontAuthorCreateNestedOneWithoutFontsInput
    variants?: FontVariantCreateNestedManyWithoutIngredientInput
    formulas?: FormulaCreateNestedManyWithoutFontsInput
    secondaryPrescriptions?: PrescriptionCreateNestedManyWithoutSecondaryFontInput
    tags?: TagCreateNestedManyWithoutIngredientsInput
    posts?: PostCreateNestedManyWithoutFontsInput
  }

  export type IngredientUncheckedCreateWithoutPrimaryPrescriptionsInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: FontVariantUncheckedCreateNestedManyWithoutIngredientInput
    formulas?: FormulaUncheckedCreateNestedManyWithoutFontsInput
    secondaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutSecondaryFontInput
    tags?: TagUncheckedCreateNestedManyWithoutIngredientsInput
    posts?: PostUncheckedCreateNestedManyWithoutFontsInput
  }

  export type IngredientCreateOrConnectWithoutPrimaryPrescriptionsInput = {
    where: IngredientWhereUniqueInput
    create: XOR<IngredientCreateWithoutPrimaryPrescriptionsInput, IngredientUncheckedCreateWithoutPrimaryPrescriptionsInput>
  }

  export type IngredientCreateWithoutSecondaryPrescriptionsInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author?: FontAuthorCreateNestedOneWithoutFontsInput
    variants?: FontVariantCreateNestedManyWithoutIngredientInput
    formulas?: FormulaCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionCreateNestedManyWithoutPrimaryFontInput
    tags?: TagCreateNestedManyWithoutIngredientsInput
    posts?: PostCreateNestedManyWithoutFontsInput
  }

  export type IngredientUncheckedCreateWithoutSecondaryPrescriptionsInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: FontVariantUncheckedCreateNestedManyWithoutIngredientInput
    formulas?: FormulaUncheckedCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPrimaryFontInput
    tags?: TagUncheckedCreateNestedManyWithoutIngredientsInput
    posts?: PostUncheckedCreateNestedManyWithoutFontsInput
  }

  export type IngredientCreateOrConnectWithoutSecondaryPrescriptionsInput = {
    where: IngredientWhereUniqueInput
    create: XOR<IngredientCreateWithoutSecondaryPrescriptionsInput, IngredientUncheckedCreateWithoutSecondaryPrescriptionsInput>
  }

  export type TagCreateWithoutPrescriptionsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: IngredientCreateNestedManyWithoutTagsInput
    formulas?: FormulaCreateNestedManyWithoutTagsInput
    posts?: PostCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateWithoutPrescriptionsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: IngredientUncheckedCreateNestedManyWithoutTagsInput
    formulas?: FormulaUncheckedCreateNestedManyWithoutTagsInput
    posts?: PostUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagCreateOrConnectWithoutPrescriptionsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutPrescriptionsInput, TagUncheckedCreateWithoutPrescriptionsInput>
  }

  export type SeoModuleCreateWithoutPrescriptionInput = {
    id?: string
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImageUrl?: string | null
    ogImageAlt?: string | null
    twitterCard?: string
    twitterTitle?: string | null
    twitterDescription?: string | null
    twitterImageUrl?: string | null
    twitterImageAlt?: string | null
    canonicalUrl?: string | null
    noIndex?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    post?: PostCreateNestedOneWithoutSeoInput
  }

  export type SeoModuleUncheckedCreateWithoutPrescriptionInput = {
    id?: string
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImageUrl?: string | null
    ogImageAlt?: string | null
    twitterCard?: string
    twitterTitle?: string | null
    twitterDescription?: string | null
    twitterImageUrl?: string | null
    twitterImageAlt?: string | null
    canonicalUrl?: string | null
    noIndex?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    post?: PostUncheckedCreateNestedOneWithoutSeoInput
  }

  export type SeoModuleCreateOrConnectWithoutPrescriptionInput = {
    where: SeoModuleWhereUniqueInput
    create: XOR<SeoModuleCreateWithoutPrescriptionInput, SeoModuleUncheckedCreateWithoutPrescriptionInput>
  }

  export type IngredientUpsertWithoutPrimaryPrescriptionsInput = {
    update: XOR<IngredientUpdateWithoutPrimaryPrescriptionsInput, IngredientUncheckedUpdateWithoutPrimaryPrescriptionsInput>
    create: XOR<IngredientCreateWithoutPrimaryPrescriptionsInput, IngredientUncheckedCreateWithoutPrimaryPrescriptionsInput>
    where?: IngredientWhereInput
  }

  export type IngredientUpdateToOneWithWhereWithoutPrimaryPrescriptionsInput = {
    where?: IngredientWhereInput
    data: XOR<IngredientUpdateWithoutPrimaryPrescriptionsInput, IngredientUncheckedUpdateWithoutPrimaryPrescriptionsInput>
  }

  export type IngredientUpdateWithoutPrimaryPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: FontAuthorUpdateOneWithoutFontsNestedInput
    variants?: FontVariantUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUpdateManyWithoutFontsNestedInput
    secondaryPrescriptions?: PrescriptionUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUpdateManyWithoutIngredientsNestedInput
    posts?: PostUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUncheckedUpdateWithoutPrimaryPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: FontVariantUncheckedUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUncheckedUpdateManyWithoutFontsNestedInput
    secondaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUncheckedUpdateManyWithoutIngredientsNestedInput
    posts?: PostUncheckedUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUpsertWithoutSecondaryPrescriptionsInput = {
    update: XOR<IngredientUpdateWithoutSecondaryPrescriptionsInput, IngredientUncheckedUpdateWithoutSecondaryPrescriptionsInput>
    create: XOR<IngredientCreateWithoutSecondaryPrescriptionsInput, IngredientUncheckedCreateWithoutSecondaryPrescriptionsInput>
    where?: IngredientWhereInput
  }

  export type IngredientUpdateToOneWithWhereWithoutSecondaryPrescriptionsInput = {
    where?: IngredientWhereInput
    data: XOR<IngredientUpdateWithoutSecondaryPrescriptionsInput, IngredientUncheckedUpdateWithoutSecondaryPrescriptionsInput>
  }

  export type IngredientUpdateWithoutSecondaryPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: FontAuthorUpdateOneWithoutFontsNestedInput
    variants?: FontVariantUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUpdateManyWithoutPrimaryFontNestedInput
    tags?: TagUpdateManyWithoutIngredientsNestedInput
    posts?: PostUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUncheckedUpdateWithoutSecondaryPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: FontVariantUncheckedUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUncheckedUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutPrimaryFontNestedInput
    tags?: TagUncheckedUpdateManyWithoutIngredientsNestedInput
    posts?: PostUncheckedUpdateManyWithoutFontsNestedInput
  }

  export type TagUpsertWithWhereUniqueWithoutPrescriptionsInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutPrescriptionsInput, TagUncheckedUpdateWithoutPrescriptionsInput>
    create: XOR<TagCreateWithoutPrescriptionsInput, TagUncheckedCreateWithoutPrescriptionsInput>
  }

  export type TagUpdateWithWhereUniqueWithoutPrescriptionsInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutPrescriptionsInput, TagUncheckedUpdateWithoutPrescriptionsInput>
  }

  export type TagUpdateManyWithWhereWithoutPrescriptionsInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutPrescriptionsInput>
  }

  export type SeoModuleUpsertWithoutPrescriptionInput = {
    update: XOR<SeoModuleUpdateWithoutPrescriptionInput, SeoModuleUncheckedUpdateWithoutPrescriptionInput>
    create: XOR<SeoModuleCreateWithoutPrescriptionInput, SeoModuleUncheckedCreateWithoutPrescriptionInput>
    where?: SeoModuleWhereInput
  }

  export type SeoModuleUpdateToOneWithWhereWithoutPrescriptionInput = {
    where?: SeoModuleWhereInput
    data: XOR<SeoModuleUpdateWithoutPrescriptionInput, SeoModuleUncheckedUpdateWithoutPrescriptionInput>
  }

  export type SeoModuleUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    ogTitle?: NullableStringFieldUpdateOperationsInput | string | null
    ogDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    twitterCard?: StringFieldUpdateOperationsInput | string
    twitterTitle?: NullableStringFieldUpdateOperationsInput | string | null
    twitterDescription?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    canonicalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    noIndex?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneWithoutSeoNestedInput
  }

  export type SeoModuleUncheckedUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    ogTitle?: NullableStringFieldUpdateOperationsInput | string | null
    ogDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    twitterCard?: StringFieldUpdateOperationsInput | string
    twitterTitle?: NullableStringFieldUpdateOperationsInput | string | null
    twitterDescription?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    canonicalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    noIndex?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUncheckedUpdateOneWithoutSeoNestedInput
  }

  export type PrescriptionCreateWithoutTagsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    primaryFont: IngredientCreateNestedOneWithoutPrimaryPrescriptionsInput
    secondaryFont: IngredientCreateNestedOneWithoutSecondaryPrescriptionsInput
    seo?: SeoModuleCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateWithoutTagsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    primaryFontId: string
    secondaryFontId: string
    seoId?: string | null
  }

  export type PrescriptionCreateOrConnectWithoutTagsInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutTagsInput, PrescriptionUncheckedCreateWithoutTagsInput>
  }

  export type IngredientCreateWithoutTagsInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author?: FontAuthorCreateNestedOneWithoutFontsInput
    variants?: FontVariantCreateNestedManyWithoutIngredientInput
    formulas?: FormulaCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionCreateNestedManyWithoutSecondaryFontInput
    posts?: PostCreateNestedManyWithoutFontsInput
  }

  export type IngredientUncheckedCreateWithoutTagsInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: FontVariantUncheckedCreateNestedManyWithoutIngredientInput
    formulas?: FormulaUncheckedCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutSecondaryFontInput
    posts?: PostUncheckedCreateNestedManyWithoutFontsInput
  }

  export type IngredientCreateOrConnectWithoutTagsInput = {
    where: IngredientWhereUniqueInput
    create: XOR<IngredientCreateWithoutTagsInput, IngredientUncheckedCreateWithoutTagsInput>
  }

  export type FormulaCreateWithoutTagsInput = {
    id?: string
    name: string
    description?: string | null
    slug: string
    fontCategory: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fonts?: IngredientCreateNestedManyWithoutFormulasInput
  }

  export type FormulaUncheckedCreateWithoutTagsInput = {
    id?: string
    name: string
    description?: string | null
    slug: string
    fontCategory: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fonts?: IngredientUncheckedCreateNestedManyWithoutFormulasInput
  }

  export type FormulaCreateOrConnectWithoutTagsInput = {
    where: FormulaWhereUniqueInput
    create: XOR<FormulaCreateWithoutTagsInput, FormulaUncheckedCreateWithoutTagsInput>
  }

  export type PostCreateWithoutTagsInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutPostsInput
    fonts?: IngredientCreateNestedManyWithoutPostsInput
    seo?: SeoModuleCreateNestedOneWithoutPostInput
  }

  export type PostUncheckedCreateWithoutTagsInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    seoId?: string | null
    fonts?: IngredientUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutTagsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutTagsInput, PostUncheckedCreateWithoutTagsInput>
  }

  export type PrescriptionUpsertWithWhereUniqueWithoutTagsInput = {
    where: PrescriptionWhereUniqueInput
    update: XOR<PrescriptionUpdateWithoutTagsInput, PrescriptionUncheckedUpdateWithoutTagsInput>
    create: XOR<PrescriptionCreateWithoutTagsInput, PrescriptionUncheckedCreateWithoutTagsInput>
  }

  export type PrescriptionUpdateWithWhereUniqueWithoutTagsInput = {
    where: PrescriptionWhereUniqueInput
    data: XOR<PrescriptionUpdateWithoutTagsInput, PrescriptionUncheckedUpdateWithoutTagsInput>
  }

  export type PrescriptionUpdateManyWithWhereWithoutTagsInput = {
    where: PrescriptionScalarWhereInput
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyWithoutTagsInput>
  }

  export type IngredientUpsertWithWhereUniqueWithoutTagsInput = {
    where: IngredientWhereUniqueInput
    update: XOR<IngredientUpdateWithoutTagsInput, IngredientUncheckedUpdateWithoutTagsInput>
    create: XOR<IngredientCreateWithoutTagsInput, IngredientUncheckedCreateWithoutTagsInput>
  }

  export type IngredientUpdateWithWhereUniqueWithoutTagsInput = {
    where: IngredientWhereUniqueInput
    data: XOR<IngredientUpdateWithoutTagsInput, IngredientUncheckedUpdateWithoutTagsInput>
  }

  export type IngredientUpdateManyWithWhereWithoutTagsInput = {
    where: IngredientScalarWhereInput
    data: XOR<IngredientUpdateManyMutationInput, IngredientUncheckedUpdateManyWithoutTagsInput>
  }

  export type FormulaUpsertWithWhereUniqueWithoutTagsInput = {
    where: FormulaWhereUniqueInput
    update: XOR<FormulaUpdateWithoutTagsInput, FormulaUncheckedUpdateWithoutTagsInput>
    create: XOR<FormulaCreateWithoutTagsInput, FormulaUncheckedCreateWithoutTagsInput>
  }

  export type FormulaUpdateWithWhereUniqueWithoutTagsInput = {
    where: FormulaWhereUniqueInput
    data: XOR<FormulaUpdateWithoutTagsInput, FormulaUncheckedUpdateWithoutTagsInput>
  }

  export type FormulaUpdateManyWithWhereWithoutTagsInput = {
    where: FormulaScalarWhereInput
    data: XOR<FormulaUpdateManyMutationInput, FormulaUncheckedUpdateManyWithoutTagsInput>
  }

  export type PostUpsertWithWhereUniqueWithoutTagsInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutTagsInput, PostUncheckedUpdateWithoutTagsInput>
    create: XOR<PostCreateWithoutTagsInput, PostUncheckedCreateWithoutTagsInput>
  }

  export type PostUpdateWithWhereUniqueWithoutTagsInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutTagsInput, PostUncheckedUpdateWithoutTagsInput>
  }

  export type PostUpdateManyWithWhereWithoutTagsInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutTagsInput>
  }

  export type UserCreateWithoutPostsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: Bytes | null
    imageUrl?: string | null
    surname?: string | null
    biography?: string | null
    roles?: RoleCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: Bytes | null
    imageUrl?: string | null
    surname?: string | null
    biography?: string | null
    roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type TagCreateWithoutPostsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionCreateNestedManyWithoutTagsInput
    ingredients?: IngredientCreateNestedManyWithoutTagsInput
    formulas?: FormulaCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateWithoutPostsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutTagsInput
    ingredients?: IngredientUncheckedCreateNestedManyWithoutTagsInput
    formulas?: FormulaUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagCreateOrConnectWithoutPostsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutPostsInput, TagUncheckedCreateWithoutPostsInput>
  }

  export type IngredientCreateWithoutPostsInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author?: FontAuthorCreateNestedOneWithoutFontsInput
    variants?: FontVariantCreateNestedManyWithoutIngredientInput
    formulas?: FormulaCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionCreateNestedManyWithoutSecondaryFontInput
    tags?: TagCreateNestedManyWithoutIngredientsInput
  }

  export type IngredientUncheckedCreateWithoutPostsInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: FontVariantUncheckedCreateNestedManyWithoutIngredientInput
    formulas?: FormulaUncheckedCreateNestedManyWithoutFontsInput
    primaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPrimaryFontInput
    secondaryPrescriptions?: PrescriptionUncheckedCreateNestedManyWithoutSecondaryFontInput
    tags?: TagUncheckedCreateNestedManyWithoutIngredientsInput
  }

  export type IngredientCreateOrConnectWithoutPostsInput = {
    where: IngredientWhereUniqueInput
    create: XOR<IngredientCreateWithoutPostsInput, IngredientUncheckedCreateWithoutPostsInput>
  }

  export type SeoModuleCreateWithoutPostInput = {
    id?: string
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImageUrl?: string | null
    ogImageAlt?: string | null
    twitterCard?: string
    twitterTitle?: string | null
    twitterDescription?: string | null
    twitterImageUrl?: string | null
    twitterImageAlt?: string | null
    canonicalUrl?: string | null
    noIndex?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    prescription?: PrescriptionCreateNestedOneWithoutSeoInput
  }

  export type SeoModuleUncheckedCreateWithoutPostInput = {
    id?: string
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImageUrl?: string | null
    ogImageAlt?: string | null
    twitterCard?: string
    twitterTitle?: string | null
    twitterDescription?: string | null
    twitterImageUrl?: string | null
    twitterImageAlt?: string | null
    canonicalUrl?: string | null
    noIndex?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    prescription?: PrescriptionUncheckedCreateNestedOneWithoutSeoInput
  }

  export type SeoModuleCreateOrConnectWithoutPostInput = {
    where: SeoModuleWhereUniqueInput
    create: XOR<SeoModuleCreateWithoutPostInput, SeoModuleUncheckedCreateWithoutPostInput>
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: RoleUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: RoleUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type TagUpsertWithWhereUniqueWithoutPostsInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutPostsInput, TagUncheckedUpdateWithoutPostsInput>
    create: XOR<TagCreateWithoutPostsInput, TagUncheckedCreateWithoutPostsInput>
  }

  export type TagUpdateWithWhereUniqueWithoutPostsInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutPostsInput, TagUncheckedUpdateWithoutPostsInput>
  }

  export type TagUpdateManyWithWhereWithoutPostsInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutPostsInput>
  }

  export type IngredientUpsertWithWhereUniqueWithoutPostsInput = {
    where: IngredientWhereUniqueInput
    update: XOR<IngredientUpdateWithoutPostsInput, IngredientUncheckedUpdateWithoutPostsInput>
    create: XOR<IngredientCreateWithoutPostsInput, IngredientUncheckedCreateWithoutPostsInput>
  }

  export type IngredientUpdateWithWhereUniqueWithoutPostsInput = {
    where: IngredientWhereUniqueInput
    data: XOR<IngredientUpdateWithoutPostsInput, IngredientUncheckedUpdateWithoutPostsInput>
  }

  export type IngredientUpdateManyWithWhereWithoutPostsInput = {
    where: IngredientScalarWhereInput
    data: XOR<IngredientUpdateManyMutationInput, IngredientUncheckedUpdateManyWithoutPostsInput>
  }

  export type SeoModuleUpsertWithoutPostInput = {
    update: XOR<SeoModuleUpdateWithoutPostInput, SeoModuleUncheckedUpdateWithoutPostInput>
    create: XOR<SeoModuleCreateWithoutPostInput, SeoModuleUncheckedCreateWithoutPostInput>
    where?: SeoModuleWhereInput
  }

  export type SeoModuleUpdateToOneWithWhereWithoutPostInput = {
    where?: SeoModuleWhereInput
    data: XOR<SeoModuleUpdateWithoutPostInput, SeoModuleUncheckedUpdateWithoutPostInput>
  }

  export type SeoModuleUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    ogTitle?: NullableStringFieldUpdateOperationsInput | string | null
    ogDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    twitterCard?: StringFieldUpdateOperationsInput | string
    twitterTitle?: NullableStringFieldUpdateOperationsInput | string | null
    twitterDescription?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    canonicalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    noIndex?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescription?: PrescriptionUpdateOneWithoutSeoNestedInput
  }

  export type SeoModuleUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    ogTitle?: NullableStringFieldUpdateOperationsInput | string | null
    ogDescription?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    twitterCard?: StringFieldUpdateOperationsInput | string
    twitterTitle?: NullableStringFieldUpdateOperationsInput | string | null
    twitterDescription?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    twitterImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    canonicalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    noIndex?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescription?: PrescriptionUncheckedUpdateOneWithoutSeoNestedInput
  }

  export type PostCreateManyAuthorInput = {
    id?: string
    postType?: string
    title: string
    slug: string
    caption?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    imageUrl?: string | null
    imageAlt?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    seoId?: string | null
  }

  export type PostUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUpdateManyWithoutPostsNestedInput
    fonts?: IngredientUpdateManyWithoutPostsNestedInput
    seo?: SeoModuleUpdateOneWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: TagUncheckedUpdateManyWithoutPostsNestedInput
    fonts?: IngredientUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoleUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: PermissionUpdateManyWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: PermissionUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateManyWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoleUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateManyWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngredientCreateManyAuthorInput = {
    id?: string
    name: string
    slug: string
    category: string
    creator?: string | null
    rating: string
    symbol?: string | null
    formula?: string | null
    importedFrom?: string | null
    licenseType?: string | null
    isVariable?: boolean
    userRating?: number | null
    userRatingsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IngredientUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: FontVariantUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUpdateManyWithoutIngredientsNestedInput
    posts?: PostUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: FontVariantUncheckedUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUncheckedUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUncheckedUpdateManyWithoutIngredientsNestedInput
    posts?: PostUncheckedUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FontVariantCreateManyIngredientInput = {
    id?: string
    fontFamilyName: string
    weight: number
    style: string
    woff2Url: string
    label: string
  }

  export type PrescriptionCreateManyPrimaryFontInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    secondaryFontId: string
    seoId?: string | null
  }

  export type PrescriptionCreateManySecondaryFontInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageUrl?: string | null
    insight?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    primaryFontId: string
    seoId?: string | null
  }

  export type FontVariantUpdateWithoutIngredientInput = {
    id?: StringFieldUpdateOperationsInput | string
    fontFamilyName?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    style?: StringFieldUpdateOperationsInput | string
    woff2Url?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type FontVariantUncheckedUpdateWithoutIngredientInput = {
    id?: StringFieldUpdateOperationsInput | string
    fontFamilyName?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    style?: StringFieldUpdateOperationsInput | string
    woff2Url?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type FontVariantUncheckedUpdateManyWithoutIngredientInput = {
    id?: StringFieldUpdateOperationsInput | string
    fontFamilyName?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    style?: StringFieldUpdateOperationsInput | string
    woff2Url?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type FormulaUpdateWithoutFontsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    fontCategory?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUpdateManyWithoutFormulasNestedInput
  }

  export type FormulaUncheckedUpdateWithoutFontsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    fontCategory?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutFormulasNestedInput
  }

  export type FormulaUncheckedUpdateManyWithoutFontsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    fontCategory?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUpdateWithoutPrimaryFontInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    secondaryFont?: IngredientUpdateOneRequiredWithoutSecondaryPrescriptionsNestedInput
    tags?: TagUpdateManyWithoutPrescriptionsNestedInput
    seo?: SeoModuleUpdateOneWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutPrimaryFontInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    secondaryFontId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: TagUncheckedUpdateManyWithoutPrescriptionsNestedInput
  }

  export type PrescriptionUncheckedUpdateManyWithoutPrimaryFontInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    secondaryFontId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PrescriptionUpdateWithoutSecondaryFontInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFont?: IngredientUpdateOneRequiredWithoutPrimaryPrescriptionsNestedInput
    tags?: TagUpdateManyWithoutPrescriptionsNestedInput
    seo?: SeoModuleUpdateOneWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutSecondaryFontInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFontId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: TagUncheckedUpdateManyWithoutPrescriptionsNestedInput
  }

  export type PrescriptionUncheckedUpdateManyWithoutSecondaryFontInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFontId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagUpdateWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUpdateManyWithoutTagsNestedInput
    formulas?: FormulaUpdateManyWithoutTagsNestedInput
    posts?: PostUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutTagsNestedInput
    formulas?: FormulaUncheckedUpdateManyWithoutTagsNestedInput
    posts?: PostUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateManyWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutFontsInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    tags?: TagUpdateManyWithoutPostsNestedInput
    seo?: SeoModuleUpdateOneWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutFontsInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: TagUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateManyWithoutFontsInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IngredientUpdateWithoutFormulasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: FontAuthorUpdateOneWithoutFontsNestedInput
    variants?: FontVariantUpdateManyWithoutIngredientNestedInput
    primaryPrescriptions?: PrescriptionUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUpdateManyWithoutIngredientsNestedInput
    posts?: PostUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUncheckedUpdateWithoutFormulasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: FontVariantUncheckedUpdateManyWithoutIngredientNestedInput
    primaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUncheckedUpdateManyWithoutIngredientsNestedInput
    posts?: PostUncheckedUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUncheckedUpdateManyWithoutFormulasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpdateWithoutFormulasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUpdateManyWithoutTagsNestedInput
    ingredients?: IngredientUpdateManyWithoutTagsNestedInput
    posts?: PostUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateWithoutFormulasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutTagsNestedInput
    ingredients?: IngredientUncheckedUpdateManyWithoutTagsNestedInput
    posts?: PostUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateManyWithoutFormulasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpdateWithoutPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: IngredientUpdateManyWithoutTagsNestedInput
    formulas?: FormulaUpdateManyWithoutTagsNestedInput
    posts?: PostUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateWithoutPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: IngredientUncheckedUpdateManyWithoutTagsNestedInput
    formulas?: FormulaUncheckedUpdateManyWithoutTagsNestedInput
    posts?: PostUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateManyWithoutPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFont?: IngredientUpdateOneRequiredWithoutPrimaryPrescriptionsNestedInput
    secondaryFont?: IngredientUpdateOneRequiredWithoutSecondaryPrescriptionsNestedInput
    seo?: SeoModuleUpdateOneWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFontId?: StringFieldUpdateOperationsInput | string
    secondaryFontId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PrescriptionUncheckedUpdateManyWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryFontId?: StringFieldUpdateOperationsInput | string
    secondaryFontId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IngredientUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: FontAuthorUpdateOneWithoutFontsNestedInput
    variants?: FontVariantUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUpdateManyWithoutSecondaryFontNestedInput
    posts?: PostUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: FontVariantUncheckedUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUncheckedUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutSecondaryFontNestedInput
    posts?: PostUncheckedUpdateManyWithoutFontsNestedInput
  }

  export type IngredientUncheckedUpdateManyWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormulaUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    fontCategory?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fonts?: IngredientUpdateManyWithoutFormulasNestedInput
  }

  export type FormulaUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    fontCategory?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fonts?: IngredientUncheckedUpdateManyWithoutFormulasNestedInput
  }

  export type FormulaUncheckedUpdateManyWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    fontCategory?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    fonts?: IngredientUpdateManyWithoutPostsNestedInput
    seo?: SeoModuleUpdateOneWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
    fonts?: IngredientUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateManyWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    postType?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    insight?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    seoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUpdateManyWithoutTagsNestedInput
    ingredients?: IngredientUpdateManyWithoutTagsNestedInput
    formulas?: FormulaUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutTagsNestedInput
    ingredients?: IngredientUncheckedUpdateManyWithoutTagsNestedInput
    formulas?: FormulaUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateManyWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IngredientUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: FontAuthorUpdateOneWithoutFontsNestedInput
    variants?: FontVariantUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUpdateManyWithoutIngredientsNestedInput
  }

  export type IngredientUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: FontVariantUncheckedUpdateManyWithoutIngredientNestedInput
    formulas?: FormulaUncheckedUpdateManyWithoutFontsNestedInput
    primaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutPrimaryFontNestedInput
    secondaryPrescriptions?: PrescriptionUncheckedUpdateManyWithoutSecondaryFontNestedInput
    tags?: TagUncheckedUpdateManyWithoutIngredientsNestedInput
  }

  export type IngredientUncheckedUpdateManyWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: NullableStringFieldUpdateOperationsInput | string | null
    importedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    licenseType?: NullableStringFieldUpdateOperationsInput | string | null
    isVariable?: BoolFieldUpdateOperationsInput | boolean
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    userRatingsCount?: NullableIntFieldUpdateOperationsInput | number | null
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}