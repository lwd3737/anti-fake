
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
 * Model YoutubeVideo
 * 
 */
export type YoutubeVideo = $Result.DefaultSelection<Prisma.$YoutubeVideoPayload>
/**
 * Model FactCheckSession
 * 
 */
export type FactCheckSession = $Result.DefaultSelection<Prisma.$FactCheckSessionPayload>
/**
 * Model Claim
 * 
 */
export type Claim = $Result.DefaultSelection<Prisma.$ClaimPayload>
/**
 * Model ClaimVerification
 * 
 */
export type ClaimVerification = $Result.DefaultSelection<Prisma.$ClaimVerificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AuthProvider: {
  GOOGLE: 'GOOGLE'
};

export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider]


export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ContentType: {
  YOUTUBE_VIDEO: 'YOUTUBE_VIDEO'
};

export type ContentType = (typeof ContentType)[keyof typeof ContentType]


export const Verdict: {
  TRUE: 'TRUE',
  MOSTLY_TRUE: 'MOSTLY_TRUE',
  MIXED: 'MIXED',
  MOSTLY_FALSE: 'MOSTLY_FALSE',
  FALSE: 'FALSE',
  UNKNOWN: 'UNKNOWN'
};

export type Verdict = (typeof Verdict)[keyof typeof Verdict]

}

export type AuthProvider = $Enums.AuthProvider

export const AuthProvider: typeof $Enums.AuthProvider

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ContentType = $Enums.ContentType

export const ContentType: typeof $Enums.ContentType

export type Verdict = $Enums.Verdict

export const Verdict: typeof $Enums.Verdict

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
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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
   * `prisma.youtubeVideo`: Exposes CRUD operations for the **YoutubeVideo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more YoutubeVideos
    * const youtubeVideos = await prisma.youtubeVideo.findMany()
    * ```
    */
  get youtubeVideo(): Prisma.YoutubeVideoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.factCheckSession`: Exposes CRUD operations for the **FactCheckSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FactCheckSessions
    * const factCheckSessions = await prisma.factCheckSession.findMany()
    * ```
    */
  get factCheckSession(): Prisma.FactCheckSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.claim`: Exposes CRUD operations for the **Claim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Claims
    * const claims = await prisma.claim.findMany()
    * ```
    */
  get claim(): Prisma.ClaimDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.claimVerification`: Exposes CRUD operations for the **ClaimVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClaimVerifications
    * const claimVerifications = await prisma.claimVerification.findMany()
    * ```
    */
  get claimVerification(): Prisma.ClaimVerificationDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    YoutubeVideo: 'YoutubeVideo',
    FactCheckSession: 'FactCheckSession',
    Claim: 'Claim',
    ClaimVerification: 'ClaimVerification'
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
      modelProps: "user" | "youtubeVideo" | "factCheckSession" | "claim" | "claimVerification"
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
      YoutubeVideo: {
        payload: Prisma.$YoutubeVideoPayload<ExtArgs>
        fields: Prisma.YoutubeVideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.YoutubeVideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.YoutubeVideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload>
          }
          findFirst: {
            args: Prisma.YoutubeVideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.YoutubeVideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload>
          }
          findMany: {
            args: Prisma.YoutubeVideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload>[]
          }
          create: {
            args: Prisma.YoutubeVideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload>
          }
          createMany: {
            args: Prisma.YoutubeVideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.YoutubeVideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload>[]
          }
          delete: {
            args: Prisma.YoutubeVideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload>
          }
          update: {
            args: Prisma.YoutubeVideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload>
          }
          deleteMany: {
            args: Prisma.YoutubeVideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.YoutubeVideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.YoutubeVideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload>[]
          }
          upsert: {
            args: Prisma.YoutubeVideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YoutubeVideoPayload>
          }
          aggregate: {
            args: Prisma.YoutubeVideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateYoutubeVideo>
          }
          groupBy: {
            args: Prisma.YoutubeVideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<YoutubeVideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.YoutubeVideoCountArgs<ExtArgs>
            result: $Utils.Optional<YoutubeVideoCountAggregateOutputType> | number
          }
        }
      }
      FactCheckSession: {
        payload: Prisma.$FactCheckSessionPayload<ExtArgs>
        fields: Prisma.FactCheckSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FactCheckSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FactCheckSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload>
          }
          findFirst: {
            args: Prisma.FactCheckSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FactCheckSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload>
          }
          findMany: {
            args: Prisma.FactCheckSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload>[]
          }
          create: {
            args: Prisma.FactCheckSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload>
          }
          createMany: {
            args: Prisma.FactCheckSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FactCheckSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload>[]
          }
          delete: {
            args: Prisma.FactCheckSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload>
          }
          update: {
            args: Prisma.FactCheckSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload>
          }
          deleteMany: {
            args: Prisma.FactCheckSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FactCheckSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FactCheckSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload>[]
          }
          upsert: {
            args: Prisma.FactCheckSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FactCheckSessionPayload>
          }
          aggregate: {
            args: Prisma.FactCheckSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFactCheckSession>
          }
          groupBy: {
            args: Prisma.FactCheckSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FactCheckSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.FactCheckSessionCountArgs<ExtArgs>
            result: $Utils.Optional<FactCheckSessionCountAggregateOutputType> | number
          }
        }
      }
      Claim: {
        payload: Prisma.$ClaimPayload<ExtArgs>
        fields: Prisma.ClaimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          findFirst: {
            args: Prisma.ClaimFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          findMany: {
            args: Prisma.ClaimFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          create: {
            args: Prisma.ClaimCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          createMany: {
            args: Prisma.ClaimCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          delete: {
            args: Prisma.ClaimDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          update: {
            args: Prisma.ClaimUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          deleteMany: {
            args: Prisma.ClaimDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClaimUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          upsert: {
            args: Prisma.ClaimUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          aggregate: {
            args: Prisma.ClaimAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaim>
          }
          groupBy: {
            args: Prisma.ClaimGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaimGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimCountArgs<ExtArgs>
            result: $Utils.Optional<ClaimCountAggregateOutputType> | number
          }
        }
      }
      ClaimVerification: {
        payload: Prisma.$ClaimVerificationPayload<ExtArgs>
        fields: Prisma.ClaimVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload>
          }
          findFirst: {
            args: Prisma.ClaimVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload>
          }
          findMany: {
            args: Prisma.ClaimVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload>[]
          }
          create: {
            args: Prisma.ClaimVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload>
          }
          createMany: {
            args: Prisma.ClaimVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload>[]
          }
          delete: {
            args: Prisma.ClaimVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload>
          }
          update: {
            args: Prisma.ClaimVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload>
          }
          deleteMany: {
            args: Prisma.ClaimVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClaimVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload>[]
          }
          upsert: {
            args: Prisma.ClaimVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimVerificationPayload>
          }
          aggregate: {
            args: Prisma.ClaimVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaimVerification>
          }
          groupBy: {
            args: Prisma.ClaimVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaimVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<ClaimVerificationCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
    youtubeVideo?: YoutubeVideoOmit
    factCheckSession?: FactCheckSessionOmit
    claim?: ClaimOmit
    claimVerification?: ClaimVerificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
    factCheckSessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    factCheckSessions?: boolean | UserCountOutputTypeCountFactCheckSessionsArgs
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
  export type UserCountOutputTypeCountFactCheckSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FactCheckSessionWhereInput
  }


  /**
   * Count Type FactCheckSessionCountOutputType
   */

  export type FactCheckSessionCountOutputType = {
    claimVerifications: number
    claims: number
  }

  export type FactCheckSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claimVerifications?: boolean | FactCheckSessionCountOutputTypeCountClaimVerificationsArgs
    claims?: boolean | FactCheckSessionCountOutputTypeCountClaimsArgs
  }

  // Custom InputTypes
  /**
   * FactCheckSessionCountOutputType without action
   */
  export type FactCheckSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSessionCountOutputType
     */
    select?: FactCheckSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FactCheckSessionCountOutputType without action
   */
  export type FactCheckSessionCountOutputTypeCountClaimVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimVerificationWhereInput
  }

  /**
   * FactCheckSessionCountOutputType without action
   */
  export type FactCheckSessionCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
  }


  /**
   * Count Type ClaimCountOutputType
   */

  export type ClaimCountOutputType = {
    claimVerifications: number
  }

  export type ClaimCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claimVerifications?: boolean | ClaimCountOutputTypeCountClaimVerificationsArgs
  }

  // Custom InputTypes
  /**
   * ClaimCountOutputType without action
   */
  export type ClaimCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimCountOutputType
     */
    select?: ClaimCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClaimCountOutputType without action
   */
  export type ClaimCountOutputTypeCountClaimVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimVerificationWhereInput
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
    provider: $Enums.AuthProvider | null
    providerSub: string | null
    email: string | null
    role: $Enums.Role | null
    refreshToken: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.AuthProvider | null
    providerSub: string | null
    email: string | null
    role: $Enums.Role | null
    refreshToken: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    provider: number
    providerSub: number
    email: number
    role: number
    refreshToken: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    provider?: true
    providerSub?: true
    email?: true
    role?: true
    refreshToken?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    provider?: true
    providerSub?: true
    email?: true
    role?: true
    refreshToken?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    provider?: true
    providerSub?: true
    email?: true
    role?: true
    refreshToken?: true
    createdAt?: true
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
    provider: $Enums.AuthProvider
    providerSub: string
    email: string
    role: $Enums.Role
    refreshToken: string | null
    createdAt: Date
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
    provider?: boolean
    providerSub?: boolean
    email?: boolean
    role?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    factCheckSessions?: boolean | User$factCheckSessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerSub?: boolean
    email?: boolean
    role?: boolean
    refreshToken?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerSub?: boolean
    email?: boolean
    role?: boolean
    refreshToken?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    provider?: boolean
    providerSub?: boolean
    email?: boolean
    role?: boolean
    refreshToken?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "providerSub" | "email" | "role" | "refreshToken" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    factCheckSessions?: boolean | User$factCheckSessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      factCheckSessions: Prisma.$FactCheckSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.AuthProvider
      providerSub: string
      email: string
      role: $Enums.Role
      refreshToken: string | null
      createdAt: Date
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
    factCheckSessions<T extends User$factCheckSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$factCheckSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly provider: FieldRef<"User", 'AuthProvider'>
    readonly providerSub: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly refreshToken: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
    skipDuplicates?: boolean
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
    skipDuplicates?: boolean
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
   * User.factCheckSessions
   */
  export type User$factCheckSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
    where?: FactCheckSessionWhereInput
    orderBy?: FactCheckSessionOrderByWithRelationInput | FactCheckSessionOrderByWithRelationInput[]
    cursor?: FactCheckSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FactCheckSessionScalarFieldEnum | FactCheckSessionScalarFieldEnum[]
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
   * Model YoutubeVideo
   */

  export type AggregateYoutubeVideo = {
    _count: YoutubeVideoCountAggregateOutputType | null
    _min: YoutubeVideoMinAggregateOutputType | null
    _max: YoutubeVideoMaxAggregateOutputType | null
  }

  export type YoutubeVideoMinAggregateOutputType = {
    id: string | null
    title: string | null
    channelId: string | null
    channelName: string | null
    thumbnailUrl: string | null
    publishedAt: Date | null
    updatedAt: Date | null
  }

  export type YoutubeVideoMaxAggregateOutputType = {
    id: string | null
    title: string | null
    channelId: string | null
    channelName: string | null
    thumbnailUrl: string | null
    publishedAt: Date | null
    updatedAt: Date | null
  }

  export type YoutubeVideoCountAggregateOutputType = {
    id: number
    title: number
    channelId: number
    channelName: number
    thumbnailUrl: number
    publishedAt: number
    updatedAt: number
    _all: number
  }


  export type YoutubeVideoMinAggregateInputType = {
    id?: true
    title?: true
    channelId?: true
    channelName?: true
    thumbnailUrl?: true
    publishedAt?: true
    updatedAt?: true
  }

  export type YoutubeVideoMaxAggregateInputType = {
    id?: true
    title?: true
    channelId?: true
    channelName?: true
    thumbnailUrl?: true
    publishedAt?: true
    updatedAt?: true
  }

  export type YoutubeVideoCountAggregateInputType = {
    id?: true
    title?: true
    channelId?: true
    channelName?: true
    thumbnailUrl?: true
    publishedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type YoutubeVideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which YoutubeVideo to aggregate.
     */
    where?: YoutubeVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeVideos to fetch.
     */
    orderBy?: YoutubeVideoOrderByWithRelationInput | YoutubeVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: YoutubeVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned YoutubeVideos
    **/
    _count?: true | YoutubeVideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: YoutubeVideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: YoutubeVideoMaxAggregateInputType
  }

  export type GetYoutubeVideoAggregateType<T extends YoutubeVideoAggregateArgs> = {
        [P in keyof T & keyof AggregateYoutubeVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateYoutubeVideo[P]>
      : GetScalarType<T[P], AggregateYoutubeVideo[P]>
  }




  export type YoutubeVideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: YoutubeVideoWhereInput
    orderBy?: YoutubeVideoOrderByWithAggregationInput | YoutubeVideoOrderByWithAggregationInput[]
    by: YoutubeVideoScalarFieldEnum[] | YoutubeVideoScalarFieldEnum
    having?: YoutubeVideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: YoutubeVideoCountAggregateInputType | true
    _min?: YoutubeVideoMinAggregateInputType
    _max?: YoutubeVideoMaxAggregateInputType
  }

  export type YoutubeVideoGroupByOutputType = {
    id: string
    title: string
    channelId: string
    channelName: string
    thumbnailUrl: string
    publishedAt: Date
    updatedAt: Date
    _count: YoutubeVideoCountAggregateOutputType | null
    _min: YoutubeVideoMinAggregateOutputType | null
    _max: YoutubeVideoMaxAggregateOutputType | null
  }

  type GetYoutubeVideoGroupByPayload<T extends YoutubeVideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<YoutubeVideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof YoutubeVideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], YoutubeVideoGroupByOutputType[P]>
            : GetScalarType<T[P], YoutubeVideoGroupByOutputType[P]>
        }
      >
    >


  export type YoutubeVideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    channelId?: boolean
    channelName?: boolean
    thumbnailUrl?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["youtubeVideo"]>

  export type YoutubeVideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    channelId?: boolean
    channelName?: boolean
    thumbnailUrl?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["youtubeVideo"]>

  export type YoutubeVideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    channelId?: boolean
    channelName?: boolean
    thumbnailUrl?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["youtubeVideo"]>

  export type YoutubeVideoSelectScalar = {
    id?: boolean
    title?: boolean
    channelId?: boolean
    channelName?: boolean
    thumbnailUrl?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
  }

  export type YoutubeVideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "channelId" | "channelName" | "thumbnailUrl" | "publishedAt" | "updatedAt", ExtArgs["result"]["youtubeVideo"]>

  export type $YoutubeVideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "YoutubeVideo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      channelId: string
      channelName: string
      thumbnailUrl: string
      publishedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["youtubeVideo"]>
    composites: {}
  }

  type YoutubeVideoGetPayload<S extends boolean | null | undefined | YoutubeVideoDefaultArgs> = $Result.GetResult<Prisma.$YoutubeVideoPayload, S>

  type YoutubeVideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<YoutubeVideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: YoutubeVideoCountAggregateInputType | true
    }

  export interface YoutubeVideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['YoutubeVideo'], meta: { name: 'YoutubeVideo' } }
    /**
     * Find zero or one YoutubeVideo that matches the filter.
     * @param {YoutubeVideoFindUniqueArgs} args - Arguments to find a YoutubeVideo
     * @example
     * // Get one YoutubeVideo
     * const youtubeVideo = await prisma.youtubeVideo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends YoutubeVideoFindUniqueArgs>(args: SelectSubset<T, YoutubeVideoFindUniqueArgs<ExtArgs>>): Prisma__YoutubeVideoClient<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one YoutubeVideo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {YoutubeVideoFindUniqueOrThrowArgs} args - Arguments to find a YoutubeVideo
     * @example
     * // Get one YoutubeVideo
     * const youtubeVideo = await prisma.youtubeVideo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends YoutubeVideoFindUniqueOrThrowArgs>(args: SelectSubset<T, YoutubeVideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__YoutubeVideoClient<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first YoutubeVideo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeVideoFindFirstArgs} args - Arguments to find a YoutubeVideo
     * @example
     * // Get one YoutubeVideo
     * const youtubeVideo = await prisma.youtubeVideo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends YoutubeVideoFindFirstArgs>(args?: SelectSubset<T, YoutubeVideoFindFirstArgs<ExtArgs>>): Prisma__YoutubeVideoClient<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first YoutubeVideo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeVideoFindFirstOrThrowArgs} args - Arguments to find a YoutubeVideo
     * @example
     * // Get one YoutubeVideo
     * const youtubeVideo = await prisma.youtubeVideo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends YoutubeVideoFindFirstOrThrowArgs>(args?: SelectSubset<T, YoutubeVideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__YoutubeVideoClient<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more YoutubeVideos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeVideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all YoutubeVideos
     * const youtubeVideos = await prisma.youtubeVideo.findMany()
     * 
     * // Get first 10 YoutubeVideos
     * const youtubeVideos = await prisma.youtubeVideo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const youtubeVideoWithIdOnly = await prisma.youtubeVideo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends YoutubeVideoFindManyArgs>(args?: SelectSubset<T, YoutubeVideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a YoutubeVideo.
     * @param {YoutubeVideoCreateArgs} args - Arguments to create a YoutubeVideo.
     * @example
     * // Create one YoutubeVideo
     * const YoutubeVideo = await prisma.youtubeVideo.create({
     *   data: {
     *     // ... data to create a YoutubeVideo
     *   }
     * })
     * 
     */
    create<T extends YoutubeVideoCreateArgs>(args: SelectSubset<T, YoutubeVideoCreateArgs<ExtArgs>>): Prisma__YoutubeVideoClient<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many YoutubeVideos.
     * @param {YoutubeVideoCreateManyArgs} args - Arguments to create many YoutubeVideos.
     * @example
     * // Create many YoutubeVideos
     * const youtubeVideo = await prisma.youtubeVideo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends YoutubeVideoCreateManyArgs>(args?: SelectSubset<T, YoutubeVideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many YoutubeVideos and returns the data saved in the database.
     * @param {YoutubeVideoCreateManyAndReturnArgs} args - Arguments to create many YoutubeVideos.
     * @example
     * // Create many YoutubeVideos
     * const youtubeVideo = await prisma.youtubeVideo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many YoutubeVideos and only return the `id`
     * const youtubeVideoWithIdOnly = await prisma.youtubeVideo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends YoutubeVideoCreateManyAndReturnArgs>(args?: SelectSubset<T, YoutubeVideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a YoutubeVideo.
     * @param {YoutubeVideoDeleteArgs} args - Arguments to delete one YoutubeVideo.
     * @example
     * // Delete one YoutubeVideo
     * const YoutubeVideo = await prisma.youtubeVideo.delete({
     *   where: {
     *     // ... filter to delete one YoutubeVideo
     *   }
     * })
     * 
     */
    delete<T extends YoutubeVideoDeleteArgs>(args: SelectSubset<T, YoutubeVideoDeleteArgs<ExtArgs>>): Prisma__YoutubeVideoClient<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one YoutubeVideo.
     * @param {YoutubeVideoUpdateArgs} args - Arguments to update one YoutubeVideo.
     * @example
     * // Update one YoutubeVideo
     * const youtubeVideo = await prisma.youtubeVideo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends YoutubeVideoUpdateArgs>(args: SelectSubset<T, YoutubeVideoUpdateArgs<ExtArgs>>): Prisma__YoutubeVideoClient<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more YoutubeVideos.
     * @param {YoutubeVideoDeleteManyArgs} args - Arguments to filter YoutubeVideos to delete.
     * @example
     * // Delete a few YoutubeVideos
     * const { count } = await prisma.youtubeVideo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends YoutubeVideoDeleteManyArgs>(args?: SelectSubset<T, YoutubeVideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YoutubeVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeVideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many YoutubeVideos
     * const youtubeVideo = await prisma.youtubeVideo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends YoutubeVideoUpdateManyArgs>(args: SelectSubset<T, YoutubeVideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YoutubeVideos and returns the data updated in the database.
     * @param {YoutubeVideoUpdateManyAndReturnArgs} args - Arguments to update many YoutubeVideos.
     * @example
     * // Update many YoutubeVideos
     * const youtubeVideo = await prisma.youtubeVideo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more YoutubeVideos and only return the `id`
     * const youtubeVideoWithIdOnly = await prisma.youtubeVideo.updateManyAndReturn({
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
    updateManyAndReturn<T extends YoutubeVideoUpdateManyAndReturnArgs>(args: SelectSubset<T, YoutubeVideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one YoutubeVideo.
     * @param {YoutubeVideoUpsertArgs} args - Arguments to update or create a YoutubeVideo.
     * @example
     * // Update or create a YoutubeVideo
     * const youtubeVideo = await prisma.youtubeVideo.upsert({
     *   create: {
     *     // ... data to create a YoutubeVideo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the YoutubeVideo we want to update
     *   }
     * })
     */
    upsert<T extends YoutubeVideoUpsertArgs>(args: SelectSubset<T, YoutubeVideoUpsertArgs<ExtArgs>>): Prisma__YoutubeVideoClient<$Result.GetResult<Prisma.$YoutubeVideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of YoutubeVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeVideoCountArgs} args - Arguments to filter YoutubeVideos to count.
     * @example
     * // Count the number of YoutubeVideos
     * const count = await prisma.youtubeVideo.count({
     *   where: {
     *     // ... the filter for the YoutubeVideos we want to count
     *   }
     * })
    **/
    count<T extends YoutubeVideoCountArgs>(
      args?: Subset<T, YoutubeVideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], YoutubeVideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a YoutubeVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeVideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends YoutubeVideoAggregateArgs>(args: Subset<T, YoutubeVideoAggregateArgs>): Prisma.PrismaPromise<GetYoutubeVideoAggregateType<T>>

    /**
     * Group by YoutubeVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeVideoGroupByArgs} args - Group by arguments.
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
      T extends YoutubeVideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: YoutubeVideoGroupByArgs['orderBy'] }
        : { orderBy?: YoutubeVideoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, YoutubeVideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetYoutubeVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the YoutubeVideo model
   */
  readonly fields: YoutubeVideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for YoutubeVideo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__YoutubeVideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the YoutubeVideo model
   */
  interface YoutubeVideoFieldRefs {
    readonly id: FieldRef<"YoutubeVideo", 'String'>
    readonly title: FieldRef<"YoutubeVideo", 'String'>
    readonly channelId: FieldRef<"YoutubeVideo", 'String'>
    readonly channelName: FieldRef<"YoutubeVideo", 'String'>
    readonly thumbnailUrl: FieldRef<"YoutubeVideo", 'String'>
    readonly publishedAt: FieldRef<"YoutubeVideo", 'DateTime'>
    readonly updatedAt: FieldRef<"YoutubeVideo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * YoutubeVideo findUnique
   */
  export type YoutubeVideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * Filter, which YoutubeVideo to fetch.
     */
    where: YoutubeVideoWhereUniqueInput
  }

  /**
   * YoutubeVideo findUniqueOrThrow
   */
  export type YoutubeVideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * Filter, which YoutubeVideo to fetch.
     */
    where: YoutubeVideoWhereUniqueInput
  }

  /**
   * YoutubeVideo findFirst
   */
  export type YoutubeVideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * Filter, which YoutubeVideo to fetch.
     */
    where?: YoutubeVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeVideos to fetch.
     */
    orderBy?: YoutubeVideoOrderByWithRelationInput | YoutubeVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YoutubeVideos.
     */
    cursor?: YoutubeVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YoutubeVideos.
     */
    distinct?: YoutubeVideoScalarFieldEnum | YoutubeVideoScalarFieldEnum[]
  }

  /**
   * YoutubeVideo findFirstOrThrow
   */
  export type YoutubeVideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * Filter, which YoutubeVideo to fetch.
     */
    where?: YoutubeVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeVideos to fetch.
     */
    orderBy?: YoutubeVideoOrderByWithRelationInput | YoutubeVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YoutubeVideos.
     */
    cursor?: YoutubeVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YoutubeVideos.
     */
    distinct?: YoutubeVideoScalarFieldEnum | YoutubeVideoScalarFieldEnum[]
  }

  /**
   * YoutubeVideo findMany
   */
  export type YoutubeVideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * Filter, which YoutubeVideos to fetch.
     */
    where?: YoutubeVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeVideos to fetch.
     */
    orderBy?: YoutubeVideoOrderByWithRelationInput | YoutubeVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing YoutubeVideos.
     */
    cursor?: YoutubeVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeVideos.
     */
    skip?: number
    distinct?: YoutubeVideoScalarFieldEnum | YoutubeVideoScalarFieldEnum[]
  }

  /**
   * YoutubeVideo create
   */
  export type YoutubeVideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * The data needed to create a YoutubeVideo.
     */
    data: XOR<YoutubeVideoCreateInput, YoutubeVideoUncheckedCreateInput>
  }

  /**
   * YoutubeVideo createMany
   */
  export type YoutubeVideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many YoutubeVideos.
     */
    data: YoutubeVideoCreateManyInput | YoutubeVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * YoutubeVideo createManyAndReturn
   */
  export type YoutubeVideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * The data used to create many YoutubeVideos.
     */
    data: YoutubeVideoCreateManyInput | YoutubeVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * YoutubeVideo update
   */
  export type YoutubeVideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * The data needed to update a YoutubeVideo.
     */
    data: XOR<YoutubeVideoUpdateInput, YoutubeVideoUncheckedUpdateInput>
    /**
     * Choose, which YoutubeVideo to update.
     */
    where: YoutubeVideoWhereUniqueInput
  }

  /**
   * YoutubeVideo updateMany
   */
  export type YoutubeVideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update YoutubeVideos.
     */
    data: XOR<YoutubeVideoUpdateManyMutationInput, YoutubeVideoUncheckedUpdateManyInput>
    /**
     * Filter which YoutubeVideos to update
     */
    where?: YoutubeVideoWhereInput
    /**
     * Limit how many YoutubeVideos to update.
     */
    limit?: number
  }

  /**
   * YoutubeVideo updateManyAndReturn
   */
  export type YoutubeVideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * The data used to update YoutubeVideos.
     */
    data: XOR<YoutubeVideoUpdateManyMutationInput, YoutubeVideoUncheckedUpdateManyInput>
    /**
     * Filter which YoutubeVideos to update
     */
    where?: YoutubeVideoWhereInput
    /**
     * Limit how many YoutubeVideos to update.
     */
    limit?: number
  }

  /**
   * YoutubeVideo upsert
   */
  export type YoutubeVideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * The filter to search for the YoutubeVideo to update in case it exists.
     */
    where: YoutubeVideoWhereUniqueInput
    /**
     * In case the YoutubeVideo found by the `where` argument doesn't exist, create a new YoutubeVideo with this data.
     */
    create: XOR<YoutubeVideoCreateInput, YoutubeVideoUncheckedCreateInput>
    /**
     * In case the YoutubeVideo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<YoutubeVideoUpdateInput, YoutubeVideoUncheckedUpdateInput>
  }

  /**
   * YoutubeVideo delete
   */
  export type YoutubeVideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
    /**
     * Filter which YoutubeVideo to delete.
     */
    where: YoutubeVideoWhereUniqueInput
  }

  /**
   * YoutubeVideo deleteMany
   */
  export type YoutubeVideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which YoutubeVideos to delete
     */
    where?: YoutubeVideoWhereInput
    /**
     * Limit how many YoutubeVideos to delete.
     */
    limit?: number
  }

  /**
   * YoutubeVideo without action
   */
  export type YoutubeVideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YoutubeVideo
     */
    select?: YoutubeVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YoutubeVideo
     */
    omit?: YoutubeVideoOmit<ExtArgs> | null
  }


  /**
   * Model FactCheckSession
   */

  export type AggregateFactCheckSession = {
    _count: FactCheckSessionCountAggregateOutputType | null
    _avg: FactCheckSessionAvgAggregateOutputType | null
    _sum: FactCheckSessionSumAggregateOutputType | null
    _min: FactCheckSessionMinAggregateOutputType | null
    _max: FactCheckSessionMaxAggregateOutputType | null
  }

  export type FactCheckSessionAvgAggregateOutputType = {
    id: number | null
  }

  export type FactCheckSessionSumAggregateOutputType = {
    id: number | null
  }

  export type FactCheckSessionMinAggregateOutputType = {
    id: number | null
    userId: string | null
    contentType: $Enums.ContentType | null
    contentId: string | null
  }

  export type FactCheckSessionMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    contentType: $Enums.ContentType | null
    contentId: string | null
  }

  export type FactCheckSessionCountAggregateOutputType = {
    id: number
    userId: number
    contentType: number
    contentId: number
    _all: number
  }


  export type FactCheckSessionAvgAggregateInputType = {
    id?: true
  }

  export type FactCheckSessionSumAggregateInputType = {
    id?: true
  }

  export type FactCheckSessionMinAggregateInputType = {
    id?: true
    userId?: true
    contentType?: true
    contentId?: true
  }

  export type FactCheckSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    contentType?: true
    contentId?: true
  }

  export type FactCheckSessionCountAggregateInputType = {
    id?: true
    userId?: true
    contentType?: true
    contentId?: true
    _all?: true
  }

  export type FactCheckSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FactCheckSession to aggregate.
     */
    where?: FactCheckSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FactCheckSessions to fetch.
     */
    orderBy?: FactCheckSessionOrderByWithRelationInput | FactCheckSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FactCheckSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FactCheckSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FactCheckSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FactCheckSessions
    **/
    _count?: true | FactCheckSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FactCheckSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FactCheckSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FactCheckSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FactCheckSessionMaxAggregateInputType
  }

  export type GetFactCheckSessionAggregateType<T extends FactCheckSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateFactCheckSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFactCheckSession[P]>
      : GetScalarType<T[P], AggregateFactCheckSession[P]>
  }




  export type FactCheckSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FactCheckSessionWhereInput
    orderBy?: FactCheckSessionOrderByWithAggregationInput | FactCheckSessionOrderByWithAggregationInput[]
    by: FactCheckSessionScalarFieldEnum[] | FactCheckSessionScalarFieldEnum
    having?: FactCheckSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FactCheckSessionCountAggregateInputType | true
    _avg?: FactCheckSessionAvgAggregateInputType
    _sum?: FactCheckSessionSumAggregateInputType
    _min?: FactCheckSessionMinAggregateInputType
    _max?: FactCheckSessionMaxAggregateInputType
  }

  export type FactCheckSessionGroupByOutputType = {
    id: number
    userId: string
    contentType: $Enums.ContentType
    contentId: string
    _count: FactCheckSessionCountAggregateOutputType | null
    _avg: FactCheckSessionAvgAggregateOutputType | null
    _sum: FactCheckSessionSumAggregateOutputType | null
    _min: FactCheckSessionMinAggregateOutputType | null
    _max: FactCheckSessionMaxAggregateOutputType | null
  }

  type GetFactCheckSessionGroupByPayload<T extends FactCheckSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FactCheckSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FactCheckSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FactCheckSessionGroupByOutputType[P]>
            : GetScalarType<T[P], FactCheckSessionGroupByOutputType[P]>
        }
      >
    >


  export type FactCheckSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    contentType?: boolean
    contentId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    claimVerifications?: boolean | FactCheckSession$claimVerificationsArgs<ExtArgs>
    claims?: boolean | FactCheckSession$claimsArgs<ExtArgs>
    _count?: boolean | FactCheckSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["factCheckSession"]>

  export type FactCheckSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    contentType?: boolean
    contentId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["factCheckSession"]>

  export type FactCheckSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    contentType?: boolean
    contentId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["factCheckSession"]>

  export type FactCheckSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    contentType?: boolean
    contentId?: boolean
  }

  export type FactCheckSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "contentType" | "contentId", ExtArgs["result"]["factCheckSession"]>
  export type FactCheckSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    claimVerifications?: boolean | FactCheckSession$claimVerificationsArgs<ExtArgs>
    claims?: boolean | FactCheckSession$claimsArgs<ExtArgs>
    _count?: boolean | FactCheckSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FactCheckSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FactCheckSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FactCheckSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FactCheckSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      claimVerifications: Prisma.$ClaimVerificationPayload<ExtArgs>[]
      claims: Prisma.$ClaimPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      contentType: $Enums.ContentType
      contentId: string
    }, ExtArgs["result"]["factCheckSession"]>
    composites: {}
  }

  type FactCheckSessionGetPayload<S extends boolean | null | undefined | FactCheckSessionDefaultArgs> = $Result.GetResult<Prisma.$FactCheckSessionPayload, S>

  type FactCheckSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FactCheckSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FactCheckSessionCountAggregateInputType | true
    }

  export interface FactCheckSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FactCheckSession'], meta: { name: 'FactCheckSession' } }
    /**
     * Find zero or one FactCheckSession that matches the filter.
     * @param {FactCheckSessionFindUniqueArgs} args - Arguments to find a FactCheckSession
     * @example
     * // Get one FactCheckSession
     * const factCheckSession = await prisma.factCheckSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FactCheckSessionFindUniqueArgs>(args: SelectSubset<T, FactCheckSessionFindUniqueArgs<ExtArgs>>): Prisma__FactCheckSessionClient<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FactCheckSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FactCheckSessionFindUniqueOrThrowArgs} args - Arguments to find a FactCheckSession
     * @example
     * // Get one FactCheckSession
     * const factCheckSession = await prisma.factCheckSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FactCheckSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, FactCheckSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FactCheckSessionClient<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FactCheckSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactCheckSessionFindFirstArgs} args - Arguments to find a FactCheckSession
     * @example
     * // Get one FactCheckSession
     * const factCheckSession = await prisma.factCheckSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FactCheckSessionFindFirstArgs>(args?: SelectSubset<T, FactCheckSessionFindFirstArgs<ExtArgs>>): Prisma__FactCheckSessionClient<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FactCheckSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactCheckSessionFindFirstOrThrowArgs} args - Arguments to find a FactCheckSession
     * @example
     * // Get one FactCheckSession
     * const factCheckSession = await prisma.factCheckSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FactCheckSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, FactCheckSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__FactCheckSessionClient<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FactCheckSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactCheckSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FactCheckSessions
     * const factCheckSessions = await prisma.factCheckSession.findMany()
     * 
     * // Get first 10 FactCheckSessions
     * const factCheckSessions = await prisma.factCheckSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const factCheckSessionWithIdOnly = await prisma.factCheckSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FactCheckSessionFindManyArgs>(args?: SelectSubset<T, FactCheckSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FactCheckSession.
     * @param {FactCheckSessionCreateArgs} args - Arguments to create a FactCheckSession.
     * @example
     * // Create one FactCheckSession
     * const FactCheckSession = await prisma.factCheckSession.create({
     *   data: {
     *     // ... data to create a FactCheckSession
     *   }
     * })
     * 
     */
    create<T extends FactCheckSessionCreateArgs>(args: SelectSubset<T, FactCheckSessionCreateArgs<ExtArgs>>): Prisma__FactCheckSessionClient<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FactCheckSessions.
     * @param {FactCheckSessionCreateManyArgs} args - Arguments to create many FactCheckSessions.
     * @example
     * // Create many FactCheckSessions
     * const factCheckSession = await prisma.factCheckSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FactCheckSessionCreateManyArgs>(args?: SelectSubset<T, FactCheckSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FactCheckSessions and returns the data saved in the database.
     * @param {FactCheckSessionCreateManyAndReturnArgs} args - Arguments to create many FactCheckSessions.
     * @example
     * // Create many FactCheckSessions
     * const factCheckSession = await prisma.factCheckSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FactCheckSessions and only return the `id`
     * const factCheckSessionWithIdOnly = await prisma.factCheckSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FactCheckSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, FactCheckSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FactCheckSession.
     * @param {FactCheckSessionDeleteArgs} args - Arguments to delete one FactCheckSession.
     * @example
     * // Delete one FactCheckSession
     * const FactCheckSession = await prisma.factCheckSession.delete({
     *   where: {
     *     // ... filter to delete one FactCheckSession
     *   }
     * })
     * 
     */
    delete<T extends FactCheckSessionDeleteArgs>(args: SelectSubset<T, FactCheckSessionDeleteArgs<ExtArgs>>): Prisma__FactCheckSessionClient<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FactCheckSession.
     * @param {FactCheckSessionUpdateArgs} args - Arguments to update one FactCheckSession.
     * @example
     * // Update one FactCheckSession
     * const factCheckSession = await prisma.factCheckSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FactCheckSessionUpdateArgs>(args: SelectSubset<T, FactCheckSessionUpdateArgs<ExtArgs>>): Prisma__FactCheckSessionClient<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FactCheckSessions.
     * @param {FactCheckSessionDeleteManyArgs} args - Arguments to filter FactCheckSessions to delete.
     * @example
     * // Delete a few FactCheckSessions
     * const { count } = await prisma.factCheckSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FactCheckSessionDeleteManyArgs>(args?: SelectSubset<T, FactCheckSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FactCheckSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactCheckSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FactCheckSessions
     * const factCheckSession = await prisma.factCheckSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FactCheckSessionUpdateManyArgs>(args: SelectSubset<T, FactCheckSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FactCheckSessions and returns the data updated in the database.
     * @param {FactCheckSessionUpdateManyAndReturnArgs} args - Arguments to update many FactCheckSessions.
     * @example
     * // Update many FactCheckSessions
     * const factCheckSession = await prisma.factCheckSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FactCheckSessions and only return the `id`
     * const factCheckSessionWithIdOnly = await prisma.factCheckSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends FactCheckSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, FactCheckSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FactCheckSession.
     * @param {FactCheckSessionUpsertArgs} args - Arguments to update or create a FactCheckSession.
     * @example
     * // Update or create a FactCheckSession
     * const factCheckSession = await prisma.factCheckSession.upsert({
     *   create: {
     *     // ... data to create a FactCheckSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FactCheckSession we want to update
     *   }
     * })
     */
    upsert<T extends FactCheckSessionUpsertArgs>(args: SelectSubset<T, FactCheckSessionUpsertArgs<ExtArgs>>): Prisma__FactCheckSessionClient<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FactCheckSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactCheckSessionCountArgs} args - Arguments to filter FactCheckSessions to count.
     * @example
     * // Count the number of FactCheckSessions
     * const count = await prisma.factCheckSession.count({
     *   where: {
     *     // ... the filter for the FactCheckSessions we want to count
     *   }
     * })
    **/
    count<T extends FactCheckSessionCountArgs>(
      args?: Subset<T, FactCheckSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FactCheckSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FactCheckSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactCheckSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FactCheckSessionAggregateArgs>(args: Subset<T, FactCheckSessionAggregateArgs>): Prisma.PrismaPromise<GetFactCheckSessionAggregateType<T>>

    /**
     * Group by FactCheckSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactCheckSessionGroupByArgs} args - Group by arguments.
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
      T extends FactCheckSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FactCheckSessionGroupByArgs['orderBy'] }
        : { orderBy?: FactCheckSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FactCheckSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFactCheckSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FactCheckSession model
   */
  readonly fields: FactCheckSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FactCheckSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FactCheckSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    claimVerifications<T extends FactCheckSession$claimVerificationsArgs<ExtArgs> = {}>(args?: Subset<T, FactCheckSession$claimVerificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    claims<T extends FactCheckSession$claimsArgs<ExtArgs> = {}>(args?: Subset<T, FactCheckSession$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the FactCheckSession model
   */
  interface FactCheckSessionFieldRefs {
    readonly id: FieldRef<"FactCheckSession", 'Int'>
    readonly userId: FieldRef<"FactCheckSession", 'String'>
    readonly contentType: FieldRef<"FactCheckSession", 'ContentType'>
    readonly contentId: FieldRef<"FactCheckSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FactCheckSession findUnique
   */
  export type FactCheckSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
    /**
     * Filter, which FactCheckSession to fetch.
     */
    where: FactCheckSessionWhereUniqueInput
  }

  /**
   * FactCheckSession findUniqueOrThrow
   */
  export type FactCheckSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
    /**
     * Filter, which FactCheckSession to fetch.
     */
    where: FactCheckSessionWhereUniqueInput
  }

  /**
   * FactCheckSession findFirst
   */
  export type FactCheckSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
    /**
     * Filter, which FactCheckSession to fetch.
     */
    where?: FactCheckSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FactCheckSessions to fetch.
     */
    orderBy?: FactCheckSessionOrderByWithRelationInput | FactCheckSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FactCheckSessions.
     */
    cursor?: FactCheckSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FactCheckSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FactCheckSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FactCheckSessions.
     */
    distinct?: FactCheckSessionScalarFieldEnum | FactCheckSessionScalarFieldEnum[]
  }

  /**
   * FactCheckSession findFirstOrThrow
   */
  export type FactCheckSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
    /**
     * Filter, which FactCheckSession to fetch.
     */
    where?: FactCheckSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FactCheckSessions to fetch.
     */
    orderBy?: FactCheckSessionOrderByWithRelationInput | FactCheckSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FactCheckSessions.
     */
    cursor?: FactCheckSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FactCheckSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FactCheckSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FactCheckSessions.
     */
    distinct?: FactCheckSessionScalarFieldEnum | FactCheckSessionScalarFieldEnum[]
  }

  /**
   * FactCheckSession findMany
   */
  export type FactCheckSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
    /**
     * Filter, which FactCheckSessions to fetch.
     */
    where?: FactCheckSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FactCheckSessions to fetch.
     */
    orderBy?: FactCheckSessionOrderByWithRelationInput | FactCheckSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FactCheckSessions.
     */
    cursor?: FactCheckSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FactCheckSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FactCheckSessions.
     */
    skip?: number
    distinct?: FactCheckSessionScalarFieldEnum | FactCheckSessionScalarFieldEnum[]
  }

  /**
   * FactCheckSession create
   */
  export type FactCheckSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a FactCheckSession.
     */
    data: XOR<FactCheckSessionCreateInput, FactCheckSessionUncheckedCreateInput>
  }

  /**
   * FactCheckSession createMany
   */
  export type FactCheckSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FactCheckSessions.
     */
    data: FactCheckSessionCreateManyInput | FactCheckSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FactCheckSession createManyAndReturn
   */
  export type FactCheckSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * The data used to create many FactCheckSessions.
     */
    data: FactCheckSessionCreateManyInput | FactCheckSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FactCheckSession update
   */
  export type FactCheckSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a FactCheckSession.
     */
    data: XOR<FactCheckSessionUpdateInput, FactCheckSessionUncheckedUpdateInput>
    /**
     * Choose, which FactCheckSession to update.
     */
    where: FactCheckSessionWhereUniqueInput
  }

  /**
   * FactCheckSession updateMany
   */
  export type FactCheckSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FactCheckSessions.
     */
    data: XOR<FactCheckSessionUpdateManyMutationInput, FactCheckSessionUncheckedUpdateManyInput>
    /**
     * Filter which FactCheckSessions to update
     */
    where?: FactCheckSessionWhereInput
    /**
     * Limit how many FactCheckSessions to update.
     */
    limit?: number
  }

  /**
   * FactCheckSession updateManyAndReturn
   */
  export type FactCheckSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * The data used to update FactCheckSessions.
     */
    data: XOR<FactCheckSessionUpdateManyMutationInput, FactCheckSessionUncheckedUpdateManyInput>
    /**
     * Filter which FactCheckSessions to update
     */
    where?: FactCheckSessionWhereInput
    /**
     * Limit how many FactCheckSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FactCheckSession upsert
   */
  export type FactCheckSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the FactCheckSession to update in case it exists.
     */
    where: FactCheckSessionWhereUniqueInput
    /**
     * In case the FactCheckSession found by the `where` argument doesn't exist, create a new FactCheckSession with this data.
     */
    create: XOR<FactCheckSessionCreateInput, FactCheckSessionUncheckedCreateInput>
    /**
     * In case the FactCheckSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FactCheckSessionUpdateInput, FactCheckSessionUncheckedUpdateInput>
  }

  /**
   * FactCheckSession delete
   */
  export type FactCheckSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
    /**
     * Filter which FactCheckSession to delete.
     */
    where: FactCheckSessionWhereUniqueInput
  }

  /**
   * FactCheckSession deleteMany
   */
  export type FactCheckSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FactCheckSessions to delete
     */
    where?: FactCheckSessionWhereInput
    /**
     * Limit how many FactCheckSessions to delete.
     */
    limit?: number
  }

  /**
   * FactCheckSession.claimVerifications
   */
  export type FactCheckSession$claimVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    where?: ClaimVerificationWhereInput
    orderBy?: ClaimVerificationOrderByWithRelationInput | ClaimVerificationOrderByWithRelationInput[]
    cursor?: ClaimVerificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimVerificationScalarFieldEnum | ClaimVerificationScalarFieldEnum[]
  }

  /**
   * FactCheckSession.claims
   */
  export type FactCheckSession$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    cursor?: ClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * FactCheckSession without action
   */
  export type FactCheckSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactCheckSession
     */
    select?: FactCheckSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FactCheckSession
     */
    omit?: FactCheckSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FactCheckSessionInclude<ExtArgs> | null
  }


  /**
   * Model Claim
   */

  export type AggregateClaim = {
    _count: ClaimCountAggregateOutputType | null
    _avg: ClaimAvgAggregateOutputType | null
    _sum: ClaimSumAggregateOutputType | null
    _min: ClaimMinAggregateOutputType | null
    _max: ClaimMaxAggregateOutputType | null
  }

  export type ClaimAvgAggregateOutputType = {
    factCheckSessionId: number | null
    index: number | null
  }

  export type ClaimSumAggregateOutputType = {
    factCheckSessionId: number | null
    index: number | null
  }

  export type ClaimMinAggregateOutputType = {
    id: string | null
    factCheckSessionId: number | null
    index: number | null
    content: string | null
    detectionReason: string | null
    createdAt: Date | null
  }

  export type ClaimMaxAggregateOutputType = {
    id: string | null
    factCheckSessionId: number | null
    index: number | null
    content: string | null
    detectionReason: string | null
    createdAt: Date | null
  }

  export type ClaimCountAggregateOutputType = {
    id: number
    factCheckSessionId: number
    index: number
    content: number
    detectionReason: number
    createdAt: number
    _all: number
  }


  export type ClaimAvgAggregateInputType = {
    factCheckSessionId?: true
    index?: true
  }

  export type ClaimSumAggregateInputType = {
    factCheckSessionId?: true
    index?: true
  }

  export type ClaimMinAggregateInputType = {
    id?: true
    factCheckSessionId?: true
    index?: true
    content?: true
    detectionReason?: true
    createdAt?: true
  }

  export type ClaimMaxAggregateInputType = {
    id?: true
    factCheckSessionId?: true
    index?: true
    content?: true
    detectionReason?: true
    createdAt?: true
  }

  export type ClaimCountAggregateInputType = {
    id?: true
    factCheckSessionId?: true
    index?: true
    content?: true
    detectionReason?: true
    createdAt?: true
    _all?: true
  }

  export type ClaimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Claim to aggregate.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Claims
    **/
    _count?: true | ClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimMaxAggregateInputType
  }

  export type GetClaimAggregateType<T extends ClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaim[P]>
      : GetScalarType<T[P], AggregateClaim[P]>
  }




  export type ClaimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithAggregationInput | ClaimOrderByWithAggregationInput[]
    by: ClaimScalarFieldEnum[] | ClaimScalarFieldEnum
    having?: ClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimCountAggregateInputType | true
    _avg?: ClaimAvgAggregateInputType
    _sum?: ClaimSumAggregateInputType
    _min?: ClaimMinAggregateInputType
    _max?: ClaimMaxAggregateInputType
  }

  export type ClaimGroupByOutputType = {
    id: string
    factCheckSessionId: number
    index: number
    content: string
    detectionReason: string
    createdAt: Date
    _count: ClaimCountAggregateOutputType | null
    _avg: ClaimAvgAggregateOutputType | null
    _sum: ClaimSumAggregateOutputType | null
    _min: ClaimMinAggregateOutputType | null
    _max: ClaimMaxAggregateOutputType | null
  }

  type GetClaimGroupByPayload<T extends ClaimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimGroupByOutputType[P]>
        }
      >
    >


  export type ClaimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    factCheckSessionId?: boolean
    index?: boolean
    content?: boolean
    detectionReason?: boolean
    createdAt?: boolean
    faactCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
    claimVerifications?: boolean | Claim$claimVerificationsArgs<ExtArgs>
    _count?: boolean | ClaimCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claim"]>

  export type ClaimSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    factCheckSessionId?: boolean
    index?: boolean
    content?: boolean
    detectionReason?: boolean
    createdAt?: boolean
    faactCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claim"]>

  export type ClaimSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    factCheckSessionId?: boolean
    index?: boolean
    content?: boolean
    detectionReason?: boolean
    createdAt?: boolean
    faactCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claim"]>

  export type ClaimSelectScalar = {
    id?: boolean
    factCheckSessionId?: boolean
    index?: boolean
    content?: boolean
    detectionReason?: boolean
    createdAt?: boolean
  }

  export type ClaimOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "factCheckSessionId" | "index" | "content" | "detectionReason" | "createdAt", ExtArgs["result"]["claim"]>
  export type ClaimInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faactCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
    claimVerifications?: boolean | Claim$claimVerificationsArgs<ExtArgs>
    _count?: boolean | ClaimCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClaimIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faactCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
  }
  export type ClaimIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faactCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
  }

  export type $ClaimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Claim"
    objects: {
      faactCheckSession: Prisma.$FactCheckSessionPayload<ExtArgs>
      claimVerifications: Prisma.$ClaimVerificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      factCheckSessionId: number
      index: number
      content: string
      detectionReason: string
      createdAt: Date
    }, ExtArgs["result"]["claim"]>
    composites: {}
  }

  type ClaimGetPayload<S extends boolean | null | undefined | ClaimDefaultArgs> = $Result.GetResult<Prisma.$ClaimPayload, S>

  type ClaimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClaimFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClaimCountAggregateInputType | true
    }

  export interface ClaimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Claim'], meta: { name: 'Claim' } }
    /**
     * Find zero or one Claim that matches the filter.
     * @param {ClaimFindUniqueArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaimFindUniqueArgs>(args: SelectSubset<T, ClaimFindUniqueArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Claim that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClaimFindUniqueOrThrowArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaimFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaimFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Claim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindFirstArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaimFindFirstArgs>(args?: SelectSubset<T, ClaimFindFirstArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Claim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindFirstOrThrowArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaimFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaimFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Claims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Claims
     * const claims = await prisma.claim.findMany()
     * 
     * // Get first 10 Claims
     * const claims = await prisma.claim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimWithIdOnly = await prisma.claim.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClaimFindManyArgs>(args?: SelectSubset<T, ClaimFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Claim.
     * @param {ClaimCreateArgs} args - Arguments to create a Claim.
     * @example
     * // Create one Claim
     * const Claim = await prisma.claim.create({
     *   data: {
     *     // ... data to create a Claim
     *   }
     * })
     * 
     */
    create<T extends ClaimCreateArgs>(args: SelectSubset<T, ClaimCreateArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Claims.
     * @param {ClaimCreateManyArgs} args - Arguments to create many Claims.
     * @example
     * // Create many Claims
     * const claim = await prisma.claim.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaimCreateManyArgs>(args?: SelectSubset<T, ClaimCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Claims and returns the data saved in the database.
     * @param {ClaimCreateManyAndReturnArgs} args - Arguments to create many Claims.
     * @example
     * // Create many Claims
     * const claim = await prisma.claim.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Claims and only return the `id`
     * const claimWithIdOnly = await prisma.claim.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaimCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaimCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Claim.
     * @param {ClaimDeleteArgs} args - Arguments to delete one Claim.
     * @example
     * // Delete one Claim
     * const Claim = await prisma.claim.delete({
     *   where: {
     *     // ... filter to delete one Claim
     *   }
     * })
     * 
     */
    delete<T extends ClaimDeleteArgs>(args: SelectSubset<T, ClaimDeleteArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Claim.
     * @param {ClaimUpdateArgs} args - Arguments to update one Claim.
     * @example
     * // Update one Claim
     * const claim = await prisma.claim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaimUpdateArgs>(args: SelectSubset<T, ClaimUpdateArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Claims.
     * @param {ClaimDeleteManyArgs} args - Arguments to filter Claims to delete.
     * @example
     * // Delete a few Claims
     * const { count } = await prisma.claim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaimDeleteManyArgs>(args?: SelectSubset<T, ClaimDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Claims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Claims
     * const claim = await prisma.claim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaimUpdateManyArgs>(args: SelectSubset<T, ClaimUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Claims and returns the data updated in the database.
     * @param {ClaimUpdateManyAndReturnArgs} args - Arguments to update many Claims.
     * @example
     * // Update many Claims
     * const claim = await prisma.claim.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Claims and only return the `id`
     * const claimWithIdOnly = await prisma.claim.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClaimUpdateManyAndReturnArgs>(args: SelectSubset<T, ClaimUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Claim.
     * @param {ClaimUpsertArgs} args - Arguments to update or create a Claim.
     * @example
     * // Update or create a Claim
     * const claim = await prisma.claim.upsert({
     *   create: {
     *     // ... data to create a Claim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Claim we want to update
     *   }
     * })
     */
    upsert<T extends ClaimUpsertArgs>(args: SelectSubset<T, ClaimUpsertArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Claims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimCountArgs} args - Arguments to filter Claims to count.
     * @example
     * // Count the number of Claims
     * const count = await prisma.claim.count({
     *   where: {
     *     // ... the filter for the Claims we want to count
     *   }
     * })
    **/
    count<T extends ClaimCountArgs>(
      args?: Subset<T, ClaimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Claim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClaimAggregateArgs>(args: Subset<T, ClaimAggregateArgs>): Prisma.PrismaPromise<GetClaimAggregateType<T>>

    /**
     * Group by Claim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimGroupByArgs} args - Group by arguments.
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
      T extends ClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimGroupByArgs['orderBy'] }
        : { orderBy?: ClaimGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Claim model
   */
  readonly fields: ClaimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Claim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    faactCheckSession<T extends FactCheckSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FactCheckSessionDefaultArgs<ExtArgs>>): Prisma__FactCheckSessionClient<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    claimVerifications<T extends Claim$claimVerificationsArgs<ExtArgs> = {}>(args?: Subset<T, Claim$claimVerificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Claim model
   */
  interface ClaimFieldRefs {
    readonly id: FieldRef<"Claim", 'String'>
    readonly factCheckSessionId: FieldRef<"Claim", 'Int'>
    readonly index: FieldRef<"Claim", 'Int'>
    readonly content: FieldRef<"Claim", 'String'>
    readonly detectionReason: FieldRef<"Claim", 'String'>
    readonly createdAt: FieldRef<"Claim", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Claim findUnique
   */
  export type ClaimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim findUniqueOrThrow
   */
  export type ClaimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim findFirst
   */
  export type ClaimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Claims.
     */
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim findFirstOrThrow
   */
  export type ClaimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Claims.
     */
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim findMany
   */
  export type ClaimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claims to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim create
   */
  export type ClaimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data needed to create a Claim.
     */
    data: XOR<ClaimCreateInput, ClaimUncheckedCreateInput>
  }

  /**
   * Claim createMany
   */
  export type ClaimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Claims.
     */
    data: ClaimCreateManyInput | ClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Claim createManyAndReturn
   */
  export type ClaimCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * The data used to create many Claims.
     */
    data: ClaimCreateManyInput | ClaimCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Claim update
   */
  export type ClaimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data needed to update a Claim.
     */
    data: XOR<ClaimUpdateInput, ClaimUncheckedUpdateInput>
    /**
     * Choose, which Claim to update.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim updateMany
   */
  export type ClaimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Claims.
     */
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyInput>
    /**
     * Filter which Claims to update
     */
    where?: ClaimWhereInput
    /**
     * Limit how many Claims to update.
     */
    limit?: number
  }

  /**
   * Claim updateManyAndReturn
   */
  export type ClaimUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * The data used to update Claims.
     */
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyInput>
    /**
     * Filter which Claims to update
     */
    where?: ClaimWhereInput
    /**
     * Limit how many Claims to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Claim upsert
   */
  export type ClaimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The filter to search for the Claim to update in case it exists.
     */
    where: ClaimWhereUniqueInput
    /**
     * In case the Claim found by the `where` argument doesn't exist, create a new Claim with this data.
     */
    create: XOR<ClaimCreateInput, ClaimUncheckedCreateInput>
    /**
     * In case the Claim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimUpdateInput, ClaimUncheckedUpdateInput>
  }

  /**
   * Claim delete
   */
  export type ClaimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter which Claim to delete.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim deleteMany
   */
  export type ClaimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Claims to delete
     */
    where?: ClaimWhereInput
    /**
     * Limit how many Claims to delete.
     */
    limit?: number
  }

  /**
   * Claim.claimVerifications
   */
  export type Claim$claimVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    where?: ClaimVerificationWhereInput
    orderBy?: ClaimVerificationOrderByWithRelationInput | ClaimVerificationOrderByWithRelationInput[]
    cursor?: ClaimVerificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimVerificationScalarFieldEnum | ClaimVerificationScalarFieldEnum[]
  }

  /**
   * Claim without action
   */
  export type ClaimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
  }


  /**
   * Model ClaimVerification
   */

  export type AggregateClaimVerification = {
    _count: ClaimVerificationCountAggregateOutputType | null
    _avg: ClaimVerificationAvgAggregateOutputType | null
    _sum: ClaimVerificationSumAggregateOutputType | null
    _min: ClaimVerificationMinAggregateOutputType | null
    _max: ClaimVerificationMaxAggregateOutputType | null
  }

  export type ClaimVerificationAvgAggregateOutputType = {
    factCheckSessionId: number | null
  }

  export type ClaimVerificationSumAggregateOutputType = {
    factCheckSessionId: number | null
  }

  export type ClaimVerificationMinAggregateOutputType = {
    id: string | null
    factCheckSessionId: number | null
    claimId: string | null
    verdict: $Enums.Verdict | null
    verdictReason: string | null
    createdAt: Date | null
  }

  export type ClaimVerificationMaxAggregateOutputType = {
    id: string | null
    factCheckSessionId: number | null
    claimId: string | null
    verdict: $Enums.Verdict | null
    verdictReason: string | null
    createdAt: Date | null
  }

  export type ClaimVerificationCountAggregateOutputType = {
    id: number
    factCheckSessionId: number
    claimId: number
    verdict: number
    verdictReason: number
    evidence: number
    createdAt: number
    _all: number
  }


  export type ClaimVerificationAvgAggregateInputType = {
    factCheckSessionId?: true
  }

  export type ClaimVerificationSumAggregateInputType = {
    factCheckSessionId?: true
  }

  export type ClaimVerificationMinAggregateInputType = {
    id?: true
    factCheckSessionId?: true
    claimId?: true
    verdict?: true
    verdictReason?: true
    createdAt?: true
  }

  export type ClaimVerificationMaxAggregateInputType = {
    id?: true
    factCheckSessionId?: true
    claimId?: true
    verdict?: true
    verdictReason?: true
    createdAt?: true
  }

  export type ClaimVerificationCountAggregateInputType = {
    id?: true
    factCheckSessionId?: true
    claimId?: true
    verdict?: true
    verdictReason?: true
    evidence?: true
    createdAt?: true
    _all?: true
  }

  export type ClaimVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimVerification to aggregate.
     */
    where?: ClaimVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimVerifications to fetch.
     */
    orderBy?: ClaimVerificationOrderByWithRelationInput | ClaimVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClaimVerifications
    **/
    _count?: true | ClaimVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaimVerificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaimVerificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimVerificationMaxAggregateInputType
  }

  export type GetClaimVerificationAggregateType<T extends ClaimVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateClaimVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaimVerification[P]>
      : GetScalarType<T[P], AggregateClaimVerification[P]>
  }




  export type ClaimVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimVerificationWhereInput
    orderBy?: ClaimVerificationOrderByWithAggregationInput | ClaimVerificationOrderByWithAggregationInput[]
    by: ClaimVerificationScalarFieldEnum[] | ClaimVerificationScalarFieldEnum
    having?: ClaimVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimVerificationCountAggregateInputType | true
    _avg?: ClaimVerificationAvgAggregateInputType
    _sum?: ClaimVerificationSumAggregateInputType
    _min?: ClaimVerificationMinAggregateInputType
    _max?: ClaimVerificationMaxAggregateInputType
  }

  export type ClaimVerificationGroupByOutputType = {
    id: string
    factCheckSessionId: number
    claimId: string
    verdict: $Enums.Verdict
    verdictReason: string
    evidence: JsonValue
    createdAt: Date
    _count: ClaimVerificationCountAggregateOutputType | null
    _avg: ClaimVerificationAvgAggregateOutputType | null
    _sum: ClaimVerificationSumAggregateOutputType | null
    _min: ClaimVerificationMinAggregateOutputType | null
    _max: ClaimVerificationMaxAggregateOutputType | null
  }

  type GetClaimVerificationGroupByPayload<T extends ClaimVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimVerificationGroupByOutputType[P]>
        }
      >
    >


  export type ClaimVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    factCheckSessionId?: boolean
    claimId?: boolean
    verdict?: boolean
    verdictReason?: boolean
    evidence?: boolean
    createdAt?: boolean
    factCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
    claim?: boolean | ClaimDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimVerification"]>

  export type ClaimVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    factCheckSessionId?: boolean
    claimId?: boolean
    verdict?: boolean
    verdictReason?: boolean
    evidence?: boolean
    createdAt?: boolean
    factCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
    claim?: boolean | ClaimDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimVerification"]>

  export type ClaimVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    factCheckSessionId?: boolean
    claimId?: boolean
    verdict?: boolean
    verdictReason?: boolean
    evidence?: boolean
    createdAt?: boolean
    factCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
    claim?: boolean | ClaimDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimVerification"]>

  export type ClaimVerificationSelectScalar = {
    id?: boolean
    factCheckSessionId?: boolean
    claimId?: boolean
    verdict?: boolean
    verdictReason?: boolean
    evidence?: boolean
    createdAt?: boolean
  }

  export type ClaimVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "factCheckSessionId" | "claimId" | "verdict" | "verdictReason" | "evidence" | "createdAt", ExtArgs["result"]["claimVerification"]>
  export type ClaimVerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    factCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
    claim?: boolean | ClaimDefaultArgs<ExtArgs>
  }
  export type ClaimVerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    factCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
    claim?: boolean | ClaimDefaultArgs<ExtArgs>
  }
  export type ClaimVerificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    factCheckSession?: boolean | FactCheckSessionDefaultArgs<ExtArgs>
    claim?: boolean | ClaimDefaultArgs<ExtArgs>
  }

  export type $ClaimVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClaimVerification"
    objects: {
      factCheckSession: Prisma.$FactCheckSessionPayload<ExtArgs>
      claim: Prisma.$ClaimPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      factCheckSessionId: number
      claimId: string
      verdict: $Enums.Verdict
      verdictReason: string
      evidence: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["claimVerification"]>
    composites: {}
  }

  type ClaimVerificationGetPayload<S extends boolean | null | undefined | ClaimVerificationDefaultArgs> = $Result.GetResult<Prisma.$ClaimVerificationPayload, S>

  type ClaimVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClaimVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClaimVerificationCountAggregateInputType | true
    }

  export interface ClaimVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClaimVerification'], meta: { name: 'ClaimVerification' } }
    /**
     * Find zero or one ClaimVerification that matches the filter.
     * @param {ClaimVerificationFindUniqueArgs} args - Arguments to find a ClaimVerification
     * @example
     * // Get one ClaimVerification
     * const claimVerification = await prisma.claimVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaimVerificationFindUniqueArgs>(args: SelectSubset<T, ClaimVerificationFindUniqueArgs<ExtArgs>>): Prisma__ClaimVerificationClient<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClaimVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClaimVerificationFindUniqueOrThrowArgs} args - Arguments to find a ClaimVerification
     * @example
     * // Get one ClaimVerification
     * const claimVerification = await prisma.claimVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaimVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaimVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaimVerificationClient<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimVerificationFindFirstArgs} args - Arguments to find a ClaimVerification
     * @example
     * // Get one ClaimVerification
     * const claimVerification = await prisma.claimVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaimVerificationFindFirstArgs>(args?: SelectSubset<T, ClaimVerificationFindFirstArgs<ExtArgs>>): Prisma__ClaimVerificationClient<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimVerificationFindFirstOrThrowArgs} args - Arguments to find a ClaimVerification
     * @example
     * // Get one ClaimVerification
     * const claimVerification = await prisma.claimVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaimVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaimVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaimVerificationClient<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClaimVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClaimVerifications
     * const claimVerifications = await prisma.claimVerification.findMany()
     * 
     * // Get first 10 ClaimVerifications
     * const claimVerifications = await prisma.claimVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimVerificationWithIdOnly = await prisma.claimVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClaimVerificationFindManyArgs>(args?: SelectSubset<T, ClaimVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClaimVerification.
     * @param {ClaimVerificationCreateArgs} args - Arguments to create a ClaimVerification.
     * @example
     * // Create one ClaimVerification
     * const ClaimVerification = await prisma.claimVerification.create({
     *   data: {
     *     // ... data to create a ClaimVerification
     *   }
     * })
     * 
     */
    create<T extends ClaimVerificationCreateArgs>(args: SelectSubset<T, ClaimVerificationCreateArgs<ExtArgs>>): Prisma__ClaimVerificationClient<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClaimVerifications.
     * @param {ClaimVerificationCreateManyArgs} args - Arguments to create many ClaimVerifications.
     * @example
     * // Create many ClaimVerifications
     * const claimVerification = await prisma.claimVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaimVerificationCreateManyArgs>(args?: SelectSubset<T, ClaimVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClaimVerifications and returns the data saved in the database.
     * @param {ClaimVerificationCreateManyAndReturnArgs} args - Arguments to create many ClaimVerifications.
     * @example
     * // Create many ClaimVerifications
     * const claimVerification = await prisma.claimVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClaimVerifications and only return the `id`
     * const claimVerificationWithIdOnly = await prisma.claimVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaimVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaimVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClaimVerification.
     * @param {ClaimVerificationDeleteArgs} args - Arguments to delete one ClaimVerification.
     * @example
     * // Delete one ClaimVerification
     * const ClaimVerification = await prisma.claimVerification.delete({
     *   where: {
     *     // ... filter to delete one ClaimVerification
     *   }
     * })
     * 
     */
    delete<T extends ClaimVerificationDeleteArgs>(args: SelectSubset<T, ClaimVerificationDeleteArgs<ExtArgs>>): Prisma__ClaimVerificationClient<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClaimVerification.
     * @param {ClaimVerificationUpdateArgs} args - Arguments to update one ClaimVerification.
     * @example
     * // Update one ClaimVerification
     * const claimVerification = await prisma.claimVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaimVerificationUpdateArgs>(args: SelectSubset<T, ClaimVerificationUpdateArgs<ExtArgs>>): Prisma__ClaimVerificationClient<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClaimVerifications.
     * @param {ClaimVerificationDeleteManyArgs} args - Arguments to filter ClaimVerifications to delete.
     * @example
     * // Delete a few ClaimVerifications
     * const { count } = await prisma.claimVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaimVerificationDeleteManyArgs>(args?: SelectSubset<T, ClaimVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClaimVerifications
     * const claimVerification = await prisma.claimVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaimVerificationUpdateManyArgs>(args: SelectSubset<T, ClaimVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimVerifications and returns the data updated in the database.
     * @param {ClaimVerificationUpdateManyAndReturnArgs} args - Arguments to update many ClaimVerifications.
     * @example
     * // Update many ClaimVerifications
     * const claimVerification = await prisma.claimVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClaimVerifications and only return the `id`
     * const claimVerificationWithIdOnly = await prisma.claimVerification.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClaimVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, ClaimVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClaimVerification.
     * @param {ClaimVerificationUpsertArgs} args - Arguments to update or create a ClaimVerification.
     * @example
     * // Update or create a ClaimVerification
     * const claimVerification = await prisma.claimVerification.upsert({
     *   create: {
     *     // ... data to create a ClaimVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClaimVerification we want to update
     *   }
     * })
     */
    upsert<T extends ClaimVerificationUpsertArgs>(args: SelectSubset<T, ClaimVerificationUpsertArgs<ExtArgs>>): Prisma__ClaimVerificationClient<$Result.GetResult<Prisma.$ClaimVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClaimVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimVerificationCountArgs} args - Arguments to filter ClaimVerifications to count.
     * @example
     * // Count the number of ClaimVerifications
     * const count = await prisma.claimVerification.count({
     *   where: {
     *     // ... the filter for the ClaimVerifications we want to count
     *   }
     * })
    **/
    count<T extends ClaimVerificationCountArgs>(
      args?: Subset<T, ClaimVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClaimVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClaimVerificationAggregateArgs>(args: Subset<T, ClaimVerificationAggregateArgs>): Prisma.PrismaPromise<GetClaimVerificationAggregateType<T>>

    /**
     * Group by ClaimVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimVerificationGroupByArgs} args - Group by arguments.
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
      T extends ClaimVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimVerificationGroupByArgs['orderBy'] }
        : { orderBy?: ClaimVerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClaimVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClaimVerification model
   */
  readonly fields: ClaimVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClaimVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    factCheckSession<T extends FactCheckSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FactCheckSessionDefaultArgs<ExtArgs>>): Prisma__FactCheckSessionClient<$Result.GetResult<Prisma.$FactCheckSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    claim<T extends ClaimDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClaimDefaultArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ClaimVerification model
   */
  interface ClaimVerificationFieldRefs {
    readonly id: FieldRef<"ClaimVerification", 'String'>
    readonly factCheckSessionId: FieldRef<"ClaimVerification", 'Int'>
    readonly claimId: FieldRef<"ClaimVerification", 'String'>
    readonly verdict: FieldRef<"ClaimVerification", 'Verdict'>
    readonly verdictReason: FieldRef<"ClaimVerification", 'String'>
    readonly evidence: FieldRef<"ClaimVerification", 'Json'>
    readonly createdAt: FieldRef<"ClaimVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClaimVerification findUnique
   */
  export type ClaimVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    /**
     * Filter, which ClaimVerification to fetch.
     */
    where: ClaimVerificationWhereUniqueInput
  }

  /**
   * ClaimVerification findUniqueOrThrow
   */
  export type ClaimVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    /**
     * Filter, which ClaimVerification to fetch.
     */
    where: ClaimVerificationWhereUniqueInput
  }

  /**
   * ClaimVerification findFirst
   */
  export type ClaimVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    /**
     * Filter, which ClaimVerification to fetch.
     */
    where?: ClaimVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimVerifications to fetch.
     */
    orderBy?: ClaimVerificationOrderByWithRelationInput | ClaimVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimVerifications.
     */
    cursor?: ClaimVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimVerifications.
     */
    distinct?: ClaimVerificationScalarFieldEnum | ClaimVerificationScalarFieldEnum[]
  }

  /**
   * ClaimVerification findFirstOrThrow
   */
  export type ClaimVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    /**
     * Filter, which ClaimVerification to fetch.
     */
    where?: ClaimVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimVerifications to fetch.
     */
    orderBy?: ClaimVerificationOrderByWithRelationInput | ClaimVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimVerifications.
     */
    cursor?: ClaimVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimVerifications.
     */
    distinct?: ClaimVerificationScalarFieldEnum | ClaimVerificationScalarFieldEnum[]
  }

  /**
   * ClaimVerification findMany
   */
  export type ClaimVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    /**
     * Filter, which ClaimVerifications to fetch.
     */
    where?: ClaimVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimVerifications to fetch.
     */
    orderBy?: ClaimVerificationOrderByWithRelationInput | ClaimVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClaimVerifications.
     */
    cursor?: ClaimVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimVerifications.
     */
    skip?: number
    distinct?: ClaimVerificationScalarFieldEnum | ClaimVerificationScalarFieldEnum[]
  }

  /**
   * ClaimVerification create
   */
  export type ClaimVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a ClaimVerification.
     */
    data: XOR<ClaimVerificationCreateInput, ClaimVerificationUncheckedCreateInput>
  }

  /**
   * ClaimVerification createMany
   */
  export type ClaimVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClaimVerifications.
     */
    data: ClaimVerificationCreateManyInput | ClaimVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClaimVerification createManyAndReturn
   */
  export type ClaimVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many ClaimVerifications.
     */
    data: ClaimVerificationCreateManyInput | ClaimVerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimVerification update
   */
  export type ClaimVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a ClaimVerification.
     */
    data: XOR<ClaimVerificationUpdateInput, ClaimVerificationUncheckedUpdateInput>
    /**
     * Choose, which ClaimVerification to update.
     */
    where: ClaimVerificationWhereUniqueInput
  }

  /**
   * ClaimVerification updateMany
   */
  export type ClaimVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClaimVerifications.
     */
    data: XOR<ClaimVerificationUpdateManyMutationInput, ClaimVerificationUncheckedUpdateManyInput>
    /**
     * Filter which ClaimVerifications to update
     */
    where?: ClaimVerificationWhereInput
    /**
     * Limit how many ClaimVerifications to update.
     */
    limit?: number
  }

  /**
   * ClaimVerification updateManyAndReturn
   */
  export type ClaimVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * The data used to update ClaimVerifications.
     */
    data: XOR<ClaimVerificationUpdateManyMutationInput, ClaimVerificationUncheckedUpdateManyInput>
    /**
     * Filter which ClaimVerifications to update
     */
    where?: ClaimVerificationWhereInput
    /**
     * Limit how many ClaimVerifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimVerification upsert
   */
  export type ClaimVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the ClaimVerification to update in case it exists.
     */
    where: ClaimVerificationWhereUniqueInput
    /**
     * In case the ClaimVerification found by the `where` argument doesn't exist, create a new ClaimVerification with this data.
     */
    create: XOR<ClaimVerificationCreateInput, ClaimVerificationUncheckedCreateInput>
    /**
     * In case the ClaimVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimVerificationUpdateInput, ClaimVerificationUncheckedUpdateInput>
  }

  /**
   * ClaimVerification delete
   */
  export type ClaimVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
    /**
     * Filter which ClaimVerification to delete.
     */
    where: ClaimVerificationWhereUniqueInput
  }

  /**
   * ClaimVerification deleteMany
   */
  export type ClaimVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimVerifications to delete
     */
    where?: ClaimVerificationWhereInput
    /**
     * Limit how many ClaimVerifications to delete.
     */
    limit?: number
  }

  /**
   * ClaimVerification without action
   */
  export type ClaimVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimVerification
     */
    select?: ClaimVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimVerification
     */
    omit?: ClaimVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimVerificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    providerSub: 'providerSub',
    email: 'email',
    role: 'role',
    refreshToken: 'refreshToken',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const YoutubeVideoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    channelId: 'channelId',
    channelName: 'channelName',
    thumbnailUrl: 'thumbnailUrl',
    publishedAt: 'publishedAt',
    updatedAt: 'updatedAt'
  };

  export type YoutubeVideoScalarFieldEnum = (typeof YoutubeVideoScalarFieldEnum)[keyof typeof YoutubeVideoScalarFieldEnum]


  export const FactCheckSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    contentType: 'contentType',
    contentId: 'contentId'
  };

  export type FactCheckSessionScalarFieldEnum = (typeof FactCheckSessionScalarFieldEnum)[keyof typeof FactCheckSessionScalarFieldEnum]


  export const ClaimScalarFieldEnum: {
    id: 'id',
    factCheckSessionId: 'factCheckSessionId',
    index: 'index',
    content: 'content',
    detectionReason: 'detectionReason',
    createdAt: 'createdAt'
  };

  export type ClaimScalarFieldEnum = (typeof ClaimScalarFieldEnum)[keyof typeof ClaimScalarFieldEnum]


  export const ClaimVerificationScalarFieldEnum: {
    id: 'id',
    factCheckSessionId: 'factCheckSessionId',
    claimId: 'claimId',
    verdict: 'verdict',
    verdictReason: 'verdictReason',
    evidence: 'evidence',
    createdAt: 'createdAt'
  };

  export type ClaimVerificationScalarFieldEnum = (typeof ClaimVerificationScalarFieldEnum)[keyof typeof ClaimVerificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AuthProvider'
   */
  export type EnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider'>
    


  /**
   * Reference to a field of type 'AuthProvider[]'
   */
  export type ListEnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ContentType'
   */
  export type EnumContentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContentType'>
    


  /**
   * Reference to a field of type 'ContentType[]'
   */
  export type ListEnumContentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContentType[]'>
    


  /**
   * Reference to a field of type 'Verdict'
   */
  export type EnumVerdictFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Verdict'>
    


  /**
   * Reference to a field of type 'Verdict[]'
   */
  export type ListEnumVerdictFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Verdict[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    provider?: EnumAuthProviderFilter<"User"> | $Enums.AuthProvider
    providerSub?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    refreshToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    factCheckSessions?: FactCheckSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerSub?: SortOrder
    email?: SortOrder
    role?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    factCheckSessions?: FactCheckSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    provider_providerSub?: UserProviderProviderSubCompoundUniqueInput
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    provider?: EnumAuthProviderFilter<"User"> | $Enums.AuthProvider
    providerSub?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    refreshToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    factCheckSessions?: FactCheckSessionListRelationFilter
  }, "id" | "email" | "provider_providerSub">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerSub?: SortOrder
    email?: SortOrder
    role?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    provider?: EnumAuthProviderWithAggregatesFilter<"User"> | $Enums.AuthProvider
    providerSub?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    refreshToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type YoutubeVideoWhereInput = {
    AND?: YoutubeVideoWhereInput | YoutubeVideoWhereInput[]
    OR?: YoutubeVideoWhereInput[]
    NOT?: YoutubeVideoWhereInput | YoutubeVideoWhereInput[]
    id?: StringFilter<"YoutubeVideo"> | string
    title?: StringFilter<"YoutubeVideo"> | string
    channelId?: StringFilter<"YoutubeVideo"> | string
    channelName?: StringFilter<"YoutubeVideo"> | string
    thumbnailUrl?: StringFilter<"YoutubeVideo"> | string
    publishedAt?: DateTimeFilter<"YoutubeVideo"> | Date | string
    updatedAt?: DateTimeFilter<"YoutubeVideo"> | Date | string
  }

  export type YoutubeVideoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    thumbnailUrl?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YoutubeVideoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    channelId?: string
    AND?: YoutubeVideoWhereInput | YoutubeVideoWhereInput[]
    OR?: YoutubeVideoWhereInput[]
    NOT?: YoutubeVideoWhereInput | YoutubeVideoWhereInput[]
    title?: StringFilter<"YoutubeVideo"> | string
    channelName?: StringFilter<"YoutubeVideo"> | string
    thumbnailUrl?: StringFilter<"YoutubeVideo"> | string
    publishedAt?: DateTimeFilter<"YoutubeVideo"> | Date | string
    updatedAt?: DateTimeFilter<"YoutubeVideo"> | Date | string
  }, "id" | "channelId">

  export type YoutubeVideoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    thumbnailUrl?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: YoutubeVideoCountOrderByAggregateInput
    _max?: YoutubeVideoMaxOrderByAggregateInput
    _min?: YoutubeVideoMinOrderByAggregateInput
  }

  export type YoutubeVideoScalarWhereWithAggregatesInput = {
    AND?: YoutubeVideoScalarWhereWithAggregatesInput | YoutubeVideoScalarWhereWithAggregatesInput[]
    OR?: YoutubeVideoScalarWhereWithAggregatesInput[]
    NOT?: YoutubeVideoScalarWhereWithAggregatesInput | YoutubeVideoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"YoutubeVideo"> | string
    title?: StringWithAggregatesFilter<"YoutubeVideo"> | string
    channelId?: StringWithAggregatesFilter<"YoutubeVideo"> | string
    channelName?: StringWithAggregatesFilter<"YoutubeVideo"> | string
    thumbnailUrl?: StringWithAggregatesFilter<"YoutubeVideo"> | string
    publishedAt?: DateTimeWithAggregatesFilter<"YoutubeVideo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"YoutubeVideo"> | Date | string
  }

  export type FactCheckSessionWhereInput = {
    AND?: FactCheckSessionWhereInput | FactCheckSessionWhereInput[]
    OR?: FactCheckSessionWhereInput[]
    NOT?: FactCheckSessionWhereInput | FactCheckSessionWhereInput[]
    id?: IntFilter<"FactCheckSession"> | number
    userId?: StringFilter<"FactCheckSession"> | string
    contentType?: EnumContentTypeFilter<"FactCheckSession"> | $Enums.ContentType
    contentId?: StringFilter<"FactCheckSession"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    claimVerifications?: ClaimVerificationListRelationFilter
    claims?: ClaimListRelationFilter
  }

  export type FactCheckSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    contentType?: SortOrder
    contentId?: SortOrder
    user?: UserOrderByWithRelationInput
    claimVerifications?: ClaimVerificationOrderByRelationAggregateInput
    claims?: ClaimOrderByRelationAggregateInput
  }

  export type FactCheckSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    contentType_contentId?: FactCheckSessionContentTypeContentIdCompoundUniqueInput
    AND?: FactCheckSessionWhereInput | FactCheckSessionWhereInput[]
    OR?: FactCheckSessionWhereInput[]
    NOT?: FactCheckSessionWhereInput | FactCheckSessionWhereInput[]
    userId?: StringFilter<"FactCheckSession"> | string
    contentType?: EnumContentTypeFilter<"FactCheckSession"> | $Enums.ContentType
    contentId?: StringFilter<"FactCheckSession"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    claimVerifications?: ClaimVerificationListRelationFilter
    claims?: ClaimListRelationFilter
  }, "id" | "contentType_contentId">

  export type FactCheckSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    contentType?: SortOrder
    contentId?: SortOrder
    _count?: FactCheckSessionCountOrderByAggregateInput
    _avg?: FactCheckSessionAvgOrderByAggregateInput
    _max?: FactCheckSessionMaxOrderByAggregateInput
    _min?: FactCheckSessionMinOrderByAggregateInput
    _sum?: FactCheckSessionSumOrderByAggregateInput
  }

  export type FactCheckSessionScalarWhereWithAggregatesInput = {
    AND?: FactCheckSessionScalarWhereWithAggregatesInput | FactCheckSessionScalarWhereWithAggregatesInput[]
    OR?: FactCheckSessionScalarWhereWithAggregatesInput[]
    NOT?: FactCheckSessionScalarWhereWithAggregatesInput | FactCheckSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FactCheckSession"> | number
    userId?: StringWithAggregatesFilter<"FactCheckSession"> | string
    contentType?: EnumContentTypeWithAggregatesFilter<"FactCheckSession"> | $Enums.ContentType
    contentId?: StringWithAggregatesFilter<"FactCheckSession"> | string
  }

  export type ClaimWhereInput = {
    AND?: ClaimWhereInput | ClaimWhereInput[]
    OR?: ClaimWhereInput[]
    NOT?: ClaimWhereInput | ClaimWhereInput[]
    id?: StringFilter<"Claim"> | string
    factCheckSessionId?: IntFilter<"Claim"> | number
    index?: IntFilter<"Claim"> | number
    content?: StringFilter<"Claim"> | string
    detectionReason?: StringFilter<"Claim"> | string
    createdAt?: DateTimeFilter<"Claim"> | Date | string
    faactCheckSession?: XOR<FactCheckSessionScalarRelationFilter, FactCheckSessionWhereInput>
    claimVerifications?: ClaimVerificationListRelationFilter
  }

  export type ClaimOrderByWithRelationInput = {
    id?: SortOrder
    factCheckSessionId?: SortOrder
    index?: SortOrder
    content?: SortOrder
    detectionReason?: SortOrder
    createdAt?: SortOrder
    faactCheckSession?: FactCheckSessionOrderByWithRelationInput
    claimVerifications?: ClaimVerificationOrderByRelationAggregateInput
  }

  export type ClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClaimWhereInput | ClaimWhereInput[]
    OR?: ClaimWhereInput[]
    NOT?: ClaimWhereInput | ClaimWhereInput[]
    factCheckSessionId?: IntFilter<"Claim"> | number
    index?: IntFilter<"Claim"> | number
    content?: StringFilter<"Claim"> | string
    detectionReason?: StringFilter<"Claim"> | string
    createdAt?: DateTimeFilter<"Claim"> | Date | string
    faactCheckSession?: XOR<FactCheckSessionScalarRelationFilter, FactCheckSessionWhereInput>
    claimVerifications?: ClaimVerificationListRelationFilter
  }, "id">

  export type ClaimOrderByWithAggregationInput = {
    id?: SortOrder
    factCheckSessionId?: SortOrder
    index?: SortOrder
    content?: SortOrder
    detectionReason?: SortOrder
    createdAt?: SortOrder
    _count?: ClaimCountOrderByAggregateInput
    _avg?: ClaimAvgOrderByAggregateInput
    _max?: ClaimMaxOrderByAggregateInput
    _min?: ClaimMinOrderByAggregateInput
    _sum?: ClaimSumOrderByAggregateInput
  }

  export type ClaimScalarWhereWithAggregatesInput = {
    AND?: ClaimScalarWhereWithAggregatesInput | ClaimScalarWhereWithAggregatesInput[]
    OR?: ClaimScalarWhereWithAggregatesInput[]
    NOT?: ClaimScalarWhereWithAggregatesInput | ClaimScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Claim"> | string
    factCheckSessionId?: IntWithAggregatesFilter<"Claim"> | number
    index?: IntWithAggregatesFilter<"Claim"> | number
    content?: StringWithAggregatesFilter<"Claim"> | string
    detectionReason?: StringWithAggregatesFilter<"Claim"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Claim"> | Date | string
  }

  export type ClaimVerificationWhereInput = {
    AND?: ClaimVerificationWhereInput | ClaimVerificationWhereInput[]
    OR?: ClaimVerificationWhereInput[]
    NOT?: ClaimVerificationWhereInput | ClaimVerificationWhereInput[]
    id?: StringFilter<"ClaimVerification"> | string
    factCheckSessionId?: IntFilter<"ClaimVerification"> | number
    claimId?: StringFilter<"ClaimVerification"> | string
    verdict?: EnumVerdictFilter<"ClaimVerification"> | $Enums.Verdict
    verdictReason?: StringFilter<"ClaimVerification"> | string
    evidence?: JsonFilter<"ClaimVerification">
    createdAt?: DateTimeFilter<"ClaimVerification"> | Date | string
    factCheckSession?: XOR<FactCheckSessionScalarRelationFilter, FactCheckSessionWhereInput>
    claim?: XOR<ClaimScalarRelationFilter, ClaimWhereInput>
  }

  export type ClaimVerificationOrderByWithRelationInput = {
    id?: SortOrder
    factCheckSessionId?: SortOrder
    claimId?: SortOrder
    verdict?: SortOrder
    verdictReason?: SortOrder
    evidence?: SortOrder
    createdAt?: SortOrder
    factCheckSession?: FactCheckSessionOrderByWithRelationInput
    claim?: ClaimOrderByWithRelationInput
  }

  export type ClaimVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClaimVerificationWhereInput | ClaimVerificationWhereInput[]
    OR?: ClaimVerificationWhereInput[]
    NOT?: ClaimVerificationWhereInput | ClaimVerificationWhereInput[]
    factCheckSessionId?: IntFilter<"ClaimVerification"> | number
    claimId?: StringFilter<"ClaimVerification"> | string
    verdict?: EnumVerdictFilter<"ClaimVerification"> | $Enums.Verdict
    verdictReason?: StringFilter<"ClaimVerification"> | string
    evidence?: JsonFilter<"ClaimVerification">
    createdAt?: DateTimeFilter<"ClaimVerification"> | Date | string
    factCheckSession?: XOR<FactCheckSessionScalarRelationFilter, FactCheckSessionWhereInput>
    claim?: XOR<ClaimScalarRelationFilter, ClaimWhereInput>
  }, "id">

  export type ClaimVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    factCheckSessionId?: SortOrder
    claimId?: SortOrder
    verdict?: SortOrder
    verdictReason?: SortOrder
    evidence?: SortOrder
    createdAt?: SortOrder
    _count?: ClaimVerificationCountOrderByAggregateInput
    _avg?: ClaimVerificationAvgOrderByAggregateInput
    _max?: ClaimVerificationMaxOrderByAggregateInput
    _min?: ClaimVerificationMinOrderByAggregateInput
    _sum?: ClaimVerificationSumOrderByAggregateInput
  }

  export type ClaimVerificationScalarWhereWithAggregatesInput = {
    AND?: ClaimVerificationScalarWhereWithAggregatesInput | ClaimVerificationScalarWhereWithAggregatesInput[]
    OR?: ClaimVerificationScalarWhereWithAggregatesInput[]
    NOT?: ClaimVerificationScalarWhereWithAggregatesInput | ClaimVerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClaimVerification"> | string
    factCheckSessionId?: IntWithAggregatesFilter<"ClaimVerification"> | number
    claimId?: StringWithAggregatesFilter<"ClaimVerification"> | string
    verdict?: EnumVerdictWithAggregatesFilter<"ClaimVerification"> | $Enums.Verdict
    verdictReason?: StringWithAggregatesFilter<"ClaimVerification"> | string
    evidence?: JsonWithAggregatesFilter<"ClaimVerification">
    createdAt?: DateTimeWithAggregatesFilter<"ClaimVerification"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    provider: $Enums.AuthProvider
    providerSub: string
    email: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    factCheckSessions?: FactCheckSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    provider: $Enums.AuthProvider
    providerSub: string
    email: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    factCheckSessions?: FactCheckSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSub?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    factCheckSessions?: FactCheckSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSub?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    factCheckSessions?: FactCheckSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    provider: $Enums.AuthProvider
    providerSub: string
    email: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSub?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSub?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YoutubeVideoCreateInput = {
    id?: string
    title: string
    channelId: string
    channelName: string
    thumbnailUrl: string
    publishedAt: Date | string
    updatedAt?: Date | string
  }

  export type YoutubeVideoUncheckedCreateInput = {
    id?: string
    title: string
    channelId: string
    channelName: string
    thumbnailUrl: string
    publishedAt: Date | string
    updatedAt?: Date | string
  }

  export type YoutubeVideoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YoutubeVideoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YoutubeVideoCreateManyInput = {
    id?: string
    title: string
    channelId: string
    channelName: string
    thumbnailUrl: string
    publishedAt: Date | string
    updatedAt?: Date | string
  }

  export type YoutubeVideoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YoutubeVideoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FactCheckSessionCreateInput = {
    contentType: $Enums.ContentType
    contentId: string
    user: UserCreateNestedOneWithoutFactCheckSessionsInput
    claimVerifications?: ClaimVerificationCreateNestedManyWithoutFactCheckSessionInput
    claims?: ClaimCreateNestedManyWithoutFaactCheckSessionInput
  }

  export type FactCheckSessionUncheckedCreateInput = {
    id?: number
    userId: string
    contentType: $Enums.ContentType
    contentId: string
    claimVerifications?: ClaimVerificationUncheckedCreateNestedManyWithoutFactCheckSessionInput
    claims?: ClaimUncheckedCreateNestedManyWithoutFaactCheckSessionInput
  }

  export type FactCheckSessionUpdateInput = {
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutFactCheckSessionsNestedInput
    claimVerifications?: ClaimVerificationUpdateManyWithoutFactCheckSessionNestedInput
    claims?: ClaimUpdateManyWithoutFaactCheckSessionNestedInput
  }

  export type FactCheckSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
    claimVerifications?: ClaimVerificationUncheckedUpdateManyWithoutFactCheckSessionNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutFaactCheckSessionNestedInput
  }

  export type FactCheckSessionCreateManyInput = {
    id?: number
    userId: string
    contentType: $Enums.ContentType
    contentId: string
  }

  export type FactCheckSessionUpdateManyMutationInput = {
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
  }

  export type FactCheckSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
  }

  export type ClaimCreateInput = {
    id?: string
    index: number
    content: string
    detectionReason: string
    createdAt?: Date | string
    faactCheckSession: FactCheckSessionCreateNestedOneWithoutClaimsInput
    claimVerifications?: ClaimVerificationCreateNestedManyWithoutClaimInput
  }

  export type ClaimUncheckedCreateInput = {
    id?: string
    factCheckSessionId: number
    index: number
    content: string
    detectionReason: string
    createdAt?: Date | string
    claimVerifications?: ClaimVerificationUncheckedCreateNestedManyWithoutClaimInput
  }

  export type ClaimUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    detectionReason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faactCheckSession?: FactCheckSessionUpdateOneRequiredWithoutClaimsNestedInput
    claimVerifications?: ClaimVerificationUpdateManyWithoutClaimNestedInput
  }

  export type ClaimUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    factCheckSessionId?: IntFieldUpdateOperationsInput | number
    index?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    detectionReason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimVerifications?: ClaimVerificationUncheckedUpdateManyWithoutClaimNestedInput
  }

  export type ClaimCreateManyInput = {
    id?: string
    factCheckSessionId: number
    index: number
    content: string
    detectionReason: string
    createdAt?: Date | string
  }

  export type ClaimUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    detectionReason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    factCheckSessionId?: IntFieldUpdateOperationsInput | number
    index?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    detectionReason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimVerificationCreateInput = {
    id?: string
    verdict: $Enums.Verdict
    verdictReason: string
    evidence: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    factCheckSession: FactCheckSessionCreateNestedOneWithoutClaimVerificationsInput
    claim: ClaimCreateNestedOneWithoutClaimVerificationsInput
  }

  export type ClaimVerificationUncheckedCreateInput = {
    id?: string
    factCheckSessionId: number
    claimId: string
    verdict: $Enums.Verdict
    verdictReason: string
    evidence: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    verdict?: EnumVerdictFieldUpdateOperationsInput | $Enums.Verdict
    verdictReason?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    factCheckSession?: FactCheckSessionUpdateOneRequiredWithoutClaimVerificationsNestedInput
    claim?: ClaimUpdateOneRequiredWithoutClaimVerificationsNestedInput
  }

  export type ClaimVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    factCheckSessionId?: IntFieldUpdateOperationsInput | number
    claimId?: StringFieldUpdateOperationsInput | string
    verdict?: EnumVerdictFieldUpdateOperationsInput | $Enums.Verdict
    verdictReason?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimVerificationCreateManyInput = {
    id?: string
    factCheckSessionId: number
    claimId: string
    verdict: $Enums.Verdict
    verdictReason: string
    evidence: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    verdict?: EnumVerdictFieldUpdateOperationsInput | $Enums.Verdict
    verdictReason?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    factCheckSessionId?: IntFieldUpdateOperationsInput | number
    claimId?: StringFieldUpdateOperationsInput | string
    verdict?: EnumVerdictFieldUpdateOperationsInput | $Enums.Verdict
    verdictReason?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderFilter<$PrismaModel> | $Enums.AuthProvider
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FactCheckSessionListRelationFilter = {
    every?: FactCheckSessionWhereInput
    some?: FactCheckSessionWhereInput
    none?: FactCheckSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FactCheckSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserProviderProviderSubCompoundUniqueInput = {
    provider: $Enums.AuthProvider
    providerSub: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerSub?: SortOrder
    email?: SortOrder
    role?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerSub?: SortOrder
    email?: SortOrder
    role?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerSub?: SortOrder
    email?: SortOrder
    role?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type YoutubeVideoCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    thumbnailUrl?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YoutubeVideoMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    thumbnailUrl?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YoutubeVideoMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    thumbnailUrl?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumContentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentType | EnumContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContentTypeFilter<$PrismaModel> | $Enums.ContentType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ClaimVerificationListRelationFilter = {
    every?: ClaimVerificationWhereInput
    some?: ClaimVerificationWhereInput
    none?: ClaimVerificationWhereInput
  }

  export type ClaimListRelationFilter = {
    every?: ClaimWhereInput
    some?: ClaimWhereInput
    none?: ClaimWhereInput
  }

  export type ClaimVerificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClaimOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FactCheckSessionContentTypeContentIdCompoundUniqueInput = {
    contentType: $Enums.ContentType
    contentId: string
  }

  export type FactCheckSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    contentType?: SortOrder
    contentId?: SortOrder
  }

  export type FactCheckSessionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FactCheckSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    contentType?: SortOrder
    contentId?: SortOrder
  }

  export type FactCheckSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    contentType?: SortOrder
    contentId?: SortOrder
  }

  export type FactCheckSessionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type EnumContentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentType | EnumContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContentTypeWithAggregatesFilter<$PrismaModel> | $Enums.ContentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContentTypeFilter<$PrismaModel>
    _max?: NestedEnumContentTypeFilter<$PrismaModel>
  }

  export type FactCheckSessionScalarRelationFilter = {
    is?: FactCheckSessionWhereInput
    isNot?: FactCheckSessionWhereInput
  }

  export type ClaimCountOrderByAggregateInput = {
    id?: SortOrder
    factCheckSessionId?: SortOrder
    index?: SortOrder
    content?: SortOrder
    detectionReason?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimAvgOrderByAggregateInput = {
    factCheckSessionId?: SortOrder
    index?: SortOrder
  }

  export type ClaimMaxOrderByAggregateInput = {
    id?: SortOrder
    factCheckSessionId?: SortOrder
    index?: SortOrder
    content?: SortOrder
    detectionReason?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimMinOrderByAggregateInput = {
    id?: SortOrder
    factCheckSessionId?: SortOrder
    index?: SortOrder
    content?: SortOrder
    detectionReason?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimSumOrderByAggregateInput = {
    factCheckSessionId?: SortOrder
    index?: SortOrder
  }

  export type EnumVerdictFilter<$PrismaModel = never> = {
    equals?: $Enums.Verdict | EnumVerdictFieldRefInput<$PrismaModel>
    in?: $Enums.Verdict[] | ListEnumVerdictFieldRefInput<$PrismaModel>
    notIn?: $Enums.Verdict[] | ListEnumVerdictFieldRefInput<$PrismaModel>
    not?: NestedEnumVerdictFilter<$PrismaModel> | $Enums.Verdict
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ClaimScalarRelationFilter = {
    is?: ClaimWhereInput
    isNot?: ClaimWhereInput
  }

  export type ClaimVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    factCheckSessionId?: SortOrder
    claimId?: SortOrder
    verdict?: SortOrder
    verdictReason?: SortOrder
    evidence?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimVerificationAvgOrderByAggregateInput = {
    factCheckSessionId?: SortOrder
  }

  export type ClaimVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    factCheckSessionId?: SortOrder
    claimId?: SortOrder
    verdict?: SortOrder
    verdictReason?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    factCheckSessionId?: SortOrder
    claimId?: SortOrder
    verdict?: SortOrder
    verdictReason?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimVerificationSumOrderByAggregateInput = {
    factCheckSessionId?: SortOrder
  }

  export type EnumVerdictWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Verdict | EnumVerdictFieldRefInput<$PrismaModel>
    in?: $Enums.Verdict[] | ListEnumVerdictFieldRefInput<$PrismaModel>
    notIn?: $Enums.Verdict[] | ListEnumVerdictFieldRefInput<$PrismaModel>
    not?: NestedEnumVerdictWithAggregatesFilter<$PrismaModel> | $Enums.Verdict
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerdictFilter<$PrismaModel>
    _max?: NestedEnumVerdictFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FactCheckSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<FactCheckSessionCreateWithoutUserInput, FactCheckSessionUncheckedCreateWithoutUserInput> | FactCheckSessionCreateWithoutUserInput[] | FactCheckSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FactCheckSessionCreateOrConnectWithoutUserInput | FactCheckSessionCreateOrConnectWithoutUserInput[]
    createMany?: FactCheckSessionCreateManyUserInputEnvelope
    connect?: FactCheckSessionWhereUniqueInput | FactCheckSessionWhereUniqueInput[]
  }

  export type FactCheckSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FactCheckSessionCreateWithoutUserInput, FactCheckSessionUncheckedCreateWithoutUserInput> | FactCheckSessionCreateWithoutUserInput[] | FactCheckSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FactCheckSessionCreateOrConnectWithoutUserInput | FactCheckSessionCreateOrConnectWithoutUserInput[]
    createMany?: FactCheckSessionCreateManyUserInputEnvelope
    connect?: FactCheckSessionWhereUniqueInput | FactCheckSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAuthProviderFieldUpdateOperationsInput = {
    set?: $Enums.AuthProvider
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FactCheckSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<FactCheckSessionCreateWithoutUserInput, FactCheckSessionUncheckedCreateWithoutUserInput> | FactCheckSessionCreateWithoutUserInput[] | FactCheckSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FactCheckSessionCreateOrConnectWithoutUserInput | FactCheckSessionCreateOrConnectWithoutUserInput[]
    upsert?: FactCheckSessionUpsertWithWhereUniqueWithoutUserInput | FactCheckSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FactCheckSessionCreateManyUserInputEnvelope
    set?: FactCheckSessionWhereUniqueInput | FactCheckSessionWhereUniqueInput[]
    disconnect?: FactCheckSessionWhereUniqueInput | FactCheckSessionWhereUniqueInput[]
    delete?: FactCheckSessionWhereUniqueInput | FactCheckSessionWhereUniqueInput[]
    connect?: FactCheckSessionWhereUniqueInput | FactCheckSessionWhereUniqueInput[]
    update?: FactCheckSessionUpdateWithWhereUniqueWithoutUserInput | FactCheckSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FactCheckSessionUpdateManyWithWhereWithoutUserInput | FactCheckSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FactCheckSessionScalarWhereInput | FactCheckSessionScalarWhereInput[]
  }

  export type FactCheckSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FactCheckSessionCreateWithoutUserInput, FactCheckSessionUncheckedCreateWithoutUserInput> | FactCheckSessionCreateWithoutUserInput[] | FactCheckSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FactCheckSessionCreateOrConnectWithoutUserInput | FactCheckSessionCreateOrConnectWithoutUserInput[]
    upsert?: FactCheckSessionUpsertWithWhereUniqueWithoutUserInput | FactCheckSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FactCheckSessionCreateManyUserInputEnvelope
    set?: FactCheckSessionWhereUniqueInput | FactCheckSessionWhereUniqueInput[]
    disconnect?: FactCheckSessionWhereUniqueInput | FactCheckSessionWhereUniqueInput[]
    delete?: FactCheckSessionWhereUniqueInput | FactCheckSessionWhereUniqueInput[]
    connect?: FactCheckSessionWhereUniqueInput | FactCheckSessionWhereUniqueInput[]
    update?: FactCheckSessionUpdateWithWhereUniqueWithoutUserInput | FactCheckSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FactCheckSessionUpdateManyWithWhereWithoutUserInput | FactCheckSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FactCheckSessionScalarWhereInput | FactCheckSessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFactCheckSessionsInput = {
    create?: XOR<UserCreateWithoutFactCheckSessionsInput, UserUncheckedCreateWithoutFactCheckSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFactCheckSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type ClaimVerificationCreateNestedManyWithoutFactCheckSessionInput = {
    create?: XOR<ClaimVerificationCreateWithoutFactCheckSessionInput, ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput> | ClaimVerificationCreateWithoutFactCheckSessionInput[] | ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput[]
    connectOrCreate?: ClaimVerificationCreateOrConnectWithoutFactCheckSessionInput | ClaimVerificationCreateOrConnectWithoutFactCheckSessionInput[]
    createMany?: ClaimVerificationCreateManyFactCheckSessionInputEnvelope
    connect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
  }

  export type ClaimCreateNestedManyWithoutFaactCheckSessionInput = {
    create?: XOR<ClaimCreateWithoutFaactCheckSessionInput, ClaimUncheckedCreateWithoutFaactCheckSessionInput> | ClaimCreateWithoutFaactCheckSessionInput[] | ClaimUncheckedCreateWithoutFaactCheckSessionInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutFaactCheckSessionInput | ClaimCreateOrConnectWithoutFaactCheckSessionInput[]
    createMany?: ClaimCreateManyFaactCheckSessionInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type ClaimVerificationUncheckedCreateNestedManyWithoutFactCheckSessionInput = {
    create?: XOR<ClaimVerificationCreateWithoutFactCheckSessionInput, ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput> | ClaimVerificationCreateWithoutFactCheckSessionInput[] | ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput[]
    connectOrCreate?: ClaimVerificationCreateOrConnectWithoutFactCheckSessionInput | ClaimVerificationCreateOrConnectWithoutFactCheckSessionInput[]
    createMany?: ClaimVerificationCreateManyFactCheckSessionInputEnvelope
    connect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
  }

  export type ClaimUncheckedCreateNestedManyWithoutFaactCheckSessionInput = {
    create?: XOR<ClaimCreateWithoutFaactCheckSessionInput, ClaimUncheckedCreateWithoutFaactCheckSessionInput> | ClaimCreateWithoutFaactCheckSessionInput[] | ClaimUncheckedCreateWithoutFaactCheckSessionInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutFaactCheckSessionInput | ClaimCreateOrConnectWithoutFaactCheckSessionInput[]
    createMany?: ClaimCreateManyFaactCheckSessionInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type EnumContentTypeFieldUpdateOperationsInput = {
    set?: $Enums.ContentType
  }

  export type UserUpdateOneRequiredWithoutFactCheckSessionsNestedInput = {
    create?: XOR<UserCreateWithoutFactCheckSessionsInput, UserUncheckedCreateWithoutFactCheckSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFactCheckSessionsInput
    upsert?: UserUpsertWithoutFactCheckSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFactCheckSessionsInput, UserUpdateWithoutFactCheckSessionsInput>, UserUncheckedUpdateWithoutFactCheckSessionsInput>
  }

  export type ClaimVerificationUpdateManyWithoutFactCheckSessionNestedInput = {
    create?: XOR<ClaimVerificationCreateWithoutFactCheckSessionInput, ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput> | ClaimVerificationCreateWithoutFactCheckSessionInput[] | ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput[]
    connectOrCreate?: ClaimVerificationCreateOrConnectWithoutFactCheckSessionInput | ClaimVerificationCreateOrConnectWithoutFactCheckSessionInput[]
    upsert?: ClaimVerificationUpsertWithWhereUniqueWithoutFactCheckSessionInput | ClaimVerificationUpsertWithWhereUniqueWithoutFactCheckSessionInput[]
    createMany?: ClaimVerificationCreateManyFactCheckSessionInputEnvelope
    set?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    disconnect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    delete?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    connect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    update?: ClaimVerificationUpdateWithWhereUniqueWithoutFactCheckSessionInput | ClaimVerificationUpdateWithWhereUniqueWithoutFactCheckSessionInput[]
    updateMany?: ClaimVerificationUpdateManyWithWhereWithoutFactCheckSessionInput | ClaimVerificationUpdateManyWithWhereWithoutFactCheckSessionInput[]
    deleteMany?: ClaimVerificationScalarWhereInput | ClaimVerificationScalarWhereInput[]
  }

  export type ClaimUpdateManyWithoutFaactCheckSessionNestedInput = {
    create?: XOR<ClaimCreateWithoutFaactCheckSessionInput, ClaimUncheckedCreateWithoutFaactCheckSessionInput> | ClaimCreateWithoutFaactCheckSessionInput[] | ClaimUncheckedCreateWithoutFaactCheckSessionInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutFaactCheckSessionInput | ClaimCreateOrConnectWithoutFaactCheckSessionInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutFaactCheckSessionInput | ClaimUpsertWithWhereUniqueWithoutFaactCheckSessionInput[]
    createMany?: ClaimCreateManyFaactCheckSessionInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutFaactCheckSessionInput | ClaimUpdateWithWhereUniqueWithoutFaactCheckSessionInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutFaactCheckSessionInput | ClaimUpdateManyWithWhereWithoutFaactCheckSessionInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClaimVerificationUncheckedUpdateManyWithoutFactCheckSessionNestedInput = {
    create?: XOR<ClaimVerificationCreateWithoutFactCheckSessionInput, ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput> | ClaimVerificationCreateWithoutFactCheckSessionInput[] | ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput[]
    connectOrCreate?: ClaimVerificationCreateOrConnectWithoutFactCheckSessionInput | ClaimVerificationCreateOrConnectWithoutFactCheckSessionInput[]
    upsert?: ClaimVerificationUpsertWithWhereUniqueWithoutFactCheckSessionInput | ClaimVerificationUpsertWithWhereUniqueWithoutFactCheckSessionInput[]
    createMany?: ClaimVerificationCreateManyFactCheckSessionInputEnvelope
    set?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    disconnect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    delete?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    connect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    update?: ClaimVerificationUpdateWithWhereUniqueWithoutFactCheckSessionInput | ClaimVerificationUpdateWithWhereUniqueWithoutFactCheckSessionInput[]
    updateMany?: ClaimVerificationUpdateManyWithWhereWithoutFactCheckSessionInput | ClaimVerificationUpdateManyWithWhereWithoutFactCheckSessionInput[]
    deleteMany?: ClaimVerificationScalarWhereInput | ClaimVerificationScalarWhereInput[]
  }

  export type ClaimUncheckedUpdateManyWithoutFaactCheckSessionNestedInput = {
    create?: XOR<ClaimCreateWithoutFaactCheckSessionInput, ClaimUncheckedCreateWithoutFaactCheckSessionInput> | ClaimCreateWithoutFaactCheckSessionInput[] | ClaimUncheckedCreateWithoutFaactCheckSessionInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutFaactCheckSessionInput | ClaimCreateOrConnectWithoutFaactCheckSessionInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutFaactCheckSessionInput | ClaimUpsertWithWhereUniqueWithoutFaactCheckSessionInput[]
    createMany?: ClaimCreateManyFaactCheckSessionInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutFaactCheckSessionInput | ClaimUpdateWithWhereUniqueWithoutFaactCheckSessionInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutFaactCheckSessionInput | ClaimUpdateManyWithWhereWithoutFaactCheckSessionInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type FactCheckSessionCreateNestedOneWithoutClaimsInput = {
    create?: XOR<FactCheckSessionCreateWithoutClaimsInput, FactCheckSessionUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: FactCheckSessionCreateOrConnectWithoutClaimsInput
    connect?: FactCheckSessionWhereUniqueInput
  }

  export type ClaimVerificationCreateNestedManyWithoutClaimInput = {
    create?: XOR<ClaimVerificationCreateWithoutClaimInput, ClaimVerificationUncheckedCreateWithoutClaimInput> | ClaimVerificationCreateWithoutClaimInput[] | ClaimVerificationUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: ClaimVerificationCreateOrConnectWithoutClaimInput | ClaimVerificationCreateOrConnectWithoutClaimInput[]
    createMany?: ClaimVerificationCreateManyClaimInputEnvelope
    connect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
  }

  export type ClaimVerificationUncheckedCreateNestedManyWithoutClaimInput = {
    create?: XOR<ClaimVerificationCreateWithoutClaimInput, ClaimVerificationUncheckedCreateWithoutClaimInput> | ClaimVerificationCreateWithoutClaimInput[] | ClaimVerificationUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: ClaimVerificationCreateOrConnectWithoutClaimInput | ClaimVerificationCreateOrConnectWithoutClaimInput[]
    createMany?: ClaimVerificationCreateManyClaimInputEnvelope
    connect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
  }

  export type FactCheckSessionUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<FactCheckSessionCreateWithoutClaimsInput, FactCheckSessionUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: FactCheckSessionCreateOrConnectWithoutClaimsInput
    upsert?: FactCheckSessionUpsertWithoutClaimsInput
    connect?: FactCheckSessionWhereUniqueInput
    update?: XOR<XOR<FactCheckSessionUpdateToOneWithWhereWithoutClaimsInput, FactCheckSessionUpdateWithoutClaimsInput>, FactCheckSessionUncheckedUpdateWithoutClaimsInput>
  }

  export type ClaimVerificationUpdateManyWithoutClaimNestedInput = {
    create?: XOR<ClaimVerificationCreateWithoutClaimInput, ClaimVerificationUncheckedCreateWithoutClaimInput> | ClaimVerificationCreateWithoutClaimInput[] | ClaimVerificationUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: ClaimVerificationCreateOrConnectWithoutClaimInput | ClaimVerificationCreateOrConnectWithoutClaimInput[]
    upsert?: ClaimVerificationUpsertWithWhereUniqueWithoutClaimInput | ClaimVerificationUpsertWithWhereUniqueWithoutClaimInput[]
    createMany?: ClaimVerificationCreateManyClaimInputEnvelope
    set?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    disconnect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    delete?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    connect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    update?: ClaimVerificationUpdateWithWhereUniqueWithoutClaimInput | ClaimVerificationUpdateWithWhereUniqueWithoutClaimInput[]
    updateMany?: ClaimVerificationUpdateManyWithWhereWithoutClaimInput | ClaimVerificationUpdateManyWithWhereWithoutClaimInput[]
    deleteMany?: ClaimVerificationScalarWhereInput | ClaimVerificationScalarWhereInput[]
  }

  export type ClaimVerificationUncheckedUpdateManyWithoutClaimNestedInput = {
    create?: XOR<ClaimVerificationCreateWithoutClaimInput, ClaimVerificationUncheckedCreateWithoutClaimInput> | ClaimVerificationCreateWithoutClaimInput[] | ClaimVerificationUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: ClaimVerificationCreateOrConnectWithoutClaimInput | ClaimVerificationCreateOrConnectWithoutClaimInput[]
    upsert?: ClaimVerificationUpsertWithWhereUniqueWithoutClaimInput | ClaimVerificationUpsertWithWhereUniqueWithoutClaimInput[]
    createMany?: ClaimVerificationCreateManyClaimInputEnvelope
    set?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    disconnect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    delete?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    connect?: ClaimVerificationWhereUniqueInput | ClaimVerificationWhereUniqueInput[]
    update?: ClaimVerificationUpdateWithWhereUniqueWithoutClaimInput | ClaimVerificationUpdateWithWhereUniqueWithoutClaimInput[]
    updateMany?: ClaimVerificationUpdateManyWithWhereWithoutClaimInput | ClaimVerificationUpdateManyWithWhereWithoutClaimInput[]
    deleteMany?: ClaimVerificationScalarWhereInput | ClaimVerificationScalarWhereInput[]
  }

  export type FactCheckSessionCreateNestedOneWithoutClaimVerificationsInput = {
    create?: XOR<FactCheckSessionCreateWithoutClaimVerificationsInput, FactCheckSessionUncheckedCreateWithoutClaimVerificationsInput>
    connectOrCreate?: FactCheckSessionCreateOrConnectWithoutClaimVerificationsInput
    connect?: FactCheckSessionWhereUniqueInput
  }

  export type ClaimCreateNestedOneWithoutClaimVerificationsInput = {
    create?: XOR<ClaimCreateWithoutClaimVerificationsInput, ClaimUncheckedCreateWithoutClaimVerificationsInput>
    connectOrCreate?: ClaimCreateOrConnectWithoutClaimVerificationsInput
    connect?: ClaimWhereUniqueInput
  }

  export type EnumVerdictFieldUpdateOperationsInput = {
    set?: $Enums.Verdict
  }

  export type FactCheckSessionUpdateOneRequiredWithoutClaimVerificationsNestedInput = {
    create?: XOR<FactCheckSessionCreateWithoutClaimVerificationsInput, FactCheckSessionUncheckedCreateWithoutClaimVerificationsInput>
    connectOrCreate?: FactCheckSessionCreateOrConnectWithoutClaimVerificationsInput
    upsert?: FactCheckSessionUpsertWithoutClaimVerificationsInput
    connect?: FactCheckSessionWhereUniqueInput
    update?: XOR<XOR<FactCheckSessionUpdateToOneWithWhereWithoutClaimVerificationsInput, FactCheckSessionUpdateWithoutClaimVerificationsInput>, FactCheckSessionUncheckedUpdateWithoutClaimVerificationsInput>
  }

  export type ClaimUpdateOneRequiredWithoutClaimVerificationsNestedInput = {
    create?: XOR<ClaimCreateWithoutClaimVerificationsInput, ClaimUncheckedCreateWithoutClaimVerificationsInput>
    connectOrCreate?: ClaimCreateOrConnectWithoutClaimVerificationsInput
    upsert?: ClaimUpsertWithoutClaimVerificationsInput
    connect?: ClaimWhereUniqueInput
    update?: XOR<XOR<ClaimUpdateToOneWithWhereWithoutClaimVerificationsInput, ClaimUpdateWithoutClaimVerificationsInput>, ClaimUncheckedUpdateWithoutClaimVerificationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderFilter<$PrismaModel> | $Enums.AuthProvider
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumContentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentType | EnumContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContentTypeFilter<$PrismaModel> | $Enums.ContentType
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumContentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentType | EnumContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContentTypeWithAggregatesFilter<$PrismaModel> | $Enums.ContentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContentTypeFilter<$PrismaModel>
    _max?: NestedEnumContentTypeFilter<$PrismaModel>
  }

  export type NestedEnumVerdictFilter<$PrismaModel = never> = {
    equals?: $Enums.Verdict | EnumVerdictFieldRefInput<$PrismaModel>
    in?: $Enums.Verdict[] | ListEnumVerdictFieldRefInput<$PrismaModel>
    notIn?: $Enums.Verdict[] | ListEnumVerdictFieldRefInput<$PrismaModel>
    not?: NestedEnumVerdictFilter<$PrismaModel> | $Enums.Verdict
  }

  export type NestedEnumVerdictWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Verdict | EnumVerdictFieldRefInput<$PrismaModel>
    in?: $Enums.Verdict[] | ListEnumVerdictFieldRefInput<$PrismaModel>
    notIn?: $Enums.Verdict[] | ListEnumVerdictFieldRefInput<$PrismaModel>
    not?: NestedEnumVerdictWithAggregatesFilter<$PrismaModel> | $Enums.Verdict
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerdictFilter<$PrismaModel>
    _max?: NestedEnumVerdictFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FactCheckSessionCreateWithoutUserInput = {
    contentType: $Enums.ContentType
    contentId: string
    claimVerifications?: ClaimVerificationCreateNestedManyWithoutFactCheckSessionInput
    claims?: ClaimCreateNestedManyWithoutFaactCheckSessionInput
  }

  export type FactCheckSessionUncheckedCreateWithoutUserInput = {
    id?: number
    contentType: $Enums.ContentType
    contentId: string
    claimVerifications?: ClaimVerificationUncheckedCreateNestedManyWithoutFactCheckSessionInput
    claims?: ClaimUncheckedCreateNestedManyWithoutFaactCheckSessionInput
  }

  export type FactCheckSessionCreateOrConnectWithoutUserInput = {
    where: FactCheckSessionWhereUniqueInput
    create: XOR<FactCheckSessionCreateWithoutUserInput, FactCheckSessionUncheckedCreateWithoutUserInput>
  }

  export type FactCheckSessionCreateManyUserInputEnvelope = {
    data: FactCheckSessionCreateManyUserInput | FactCheckSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FactCheckSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: FactCheckSessionWhereUniqueInput
    update: XOR<FactCheckSessionUpdateWithoutUserInput, FactCheckSessionUncheckedUpdateWithoutUserInput>
    create: XOR<FactCheckSessionCreateWithoutUserInput, FactCheckSessionUncheckedCreateWithoutUserInput>
  }

  export type FactCheckSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: FactCheckSessionWhereUniqueInput
    data: XOR<FactCheckSessionUpdateWithoutUserInput, FactCheckSessionUncheckedUpdateWithoutUserInput>
  }

  export type FactCheckSessionUpdateManyWithWhereWithoutUserInput = {
    where: FactCheckSessionScalarWhereInput
    data: XOR<FactCheckSessionUpdateManyMutationInput, FactCheckSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type FactCheckSessionScalarWhereInput = {
    AND?: FactCheckSessionScalarWhereInput | FactCheckSessionScalarWhereInput[]
    OR?: FactCheckSessionScalarWhereInput[]
    NOT?: FactCheckSessionScalarWhereInput | FactCheckSessionScalarWhereInput[]
    id?: IntFilter<"FactCheckSession"> | number
    userId?: StringFilter<"FactCheckSession"> | string
    contentType?: EnumContentTypeFilter<"FactCheckSession"> | $Enums.ContentType
    contentId?: StringFilter<"FactCheckSession"> | string
  }

  export type UserCreateWithoutFactCheckSessionsInput = {
    id?: string
    provider: $Enums.AuthProvider
    providerSub: string
    email: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutFactCheckSessionsInput = {
    id?: string
    provider: $Enums.AuthProvider
    providerSub: string
    email: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutFactCheckSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFactCheckSessionsInput, UserUncheckedCreateWithoutFactCheckSessionsInput>
  }

  export type ClaimVerificationCreateWithoutFactCheckSessionInput = {
    id?: string
    verdict: $Enums.Verdict
    verdictReason: string
    evidence: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    claim: ClaimCreateNestedOneWithoutClaimVerificationsInput
  }

  export type ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput = {
    id?: string
    claimId: string
    verdict: $Enums.Verdict
    verdictReason: string
    evidence: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimVerificationCreateOrConnectWithoutFactCheckSessionInput = {
    where: ClaimVerificationWhereUniqueInput
    create: XOR<ClaimVerificationCreateWithoutFactCheckSessionInput, ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput>
  }

  export type ClaimVerificationCreateManyFactCheckSessionInputEnvelope = {
    data: ClaimVerificationCreateManyFactCheckSessionInput | ClaimVerificationCreateManyFactCheckSessionInput[]
    skipDuplicates?: boolean
  }

  export type ClaimCreateWithoutFaactCheckSessionInput = {
    id?: string
    index: number
    content: string
    detectionReason: string
    createdAt?: Date | string
    claimVerifications?: ClaimVerificationCreateNestedManyWithoutClaimInput
  }

  export type ClaimUncheckedCreateWithoutFaactCheckSessionInput = {
    id?: string
    index: number
    content: string
    detectionReason: string
    createdAt?: Date | string
    claimVerifications?: ClaimVerificationUncheckedCreateNestedManyWithoutClaimInput
  }

  export type ClaimCreateOrConnectWithoutFaactCheckSessionInput = {
    where: ClaimWhereUniqueInput
    create: XOR<ClaimCreateWithoutFaactCheckSessionInput, ClaimUncheckedCreateWithoutFaactCheckSessionInput>
  }

  export type ClaimCreateManyFaactCheckSessionInputEnvelope = {
    data: ClaimCreateManyFaactCheckSessionInput | ClaimCreateManyFaactCheckSessionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFactCheckSessionsInput = {
    update: XOR<UserUpdateWithoutFactCheckSessionsInput, UserUncheckedUpdateWithoutFactCheckSessionsInput>
    create: XOR<UserCreateWithoutFactCheckSessionsInput, UserUncheckedCreateWithoutFactCheckSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFactCheckSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFactCheckSessionsInput, UserUncheckedUpdateWithoutFactCheckSessionsInput>
  }

  export type UserUpdateWithoutFactCheckSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSub?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutFactCheckSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSub?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimVerificationUpsertWithWhereUniqueWithoutFactCheckSessionInput = {
    where: ClaimVerificationWhereUniqueInput
    update: XOR<ClaimVerificationUpdateWithoutFactCheckSessionInput, ClaimVerificationUncheckedUpdateWithoutFactCheckSessionInput>
    create: XOR<ClaimVerificationCreateWithoutFactCheckSessionInput, ClaimVerificationUncheckedCreateWithoutFactCheckSessionInput>
  }

  export type ClaimVerificationUpdateWithWhereUniqueWithoutFactCheckSessionInput = {
    where: ClaimVerificationWhereUniqueInput
    data: XOR<ClaimVerificationUpdateWithoutFactCheckSessionInput, ClaimVerificationUncheckedUpdateWithoutFactCheckSessionInput>
  }

  export type ClaimVerificationUpdateManyWithWhereWithoutFactCheckSessionInput = {
    where: ClaimVerificationScalarWhereInput
    data: XOR<ClaimVerificationUpdateManyMutationInput, ClaimVerificationUncheckedUpdateManyWithoutFactCheckSessionInput>
  }

  export type ClaimVerificationScalarWhereInput = {
    AND?: ClaimVerificationScalarWhereInput | ClaimVerificationScalarWhereInput[]
    OR?: ClaimVerificationScalarWhereInput[]
    NOT?: ClaimVerificationScalarWhereInput | ClaimVerificationScalarWhereInput[]
    id?: StringFilter<"ClaimVerification"> | string
    factCheckSessionId?: IntFilter<"ClaimVerification"> | number
    claimId?: StringFilter<"ClaimVerification"> | string
    verdict?: EnumVerdictFilter<"ClaimVerification"> | $Enums.Verdict
    verdictReason?: StringFilter<"ClaimVerification"> | string
    evidence?: JsonFilter<"ClaimVerification">
    createdAt?: DateTimeFilter<"ClaimVerification"> | Date | string
  }

  export type ClaimUpsertWithWhereUniqueWithoutFaactCheckSessionInput = {
    where: ClaimWhereUniqueInput
    update: XOR<ClaimUpdateWithoutFaactCheckSessionInput, ClaimUncheckedUpdateWithoutFaactCheckSessionInput>
    create: XOR<ClaimCreateWithoutFaactCheckSessionInput, ClaimUncheckedCreateWithoutFaactCheckSessionInput>
  }

  export type ClaimUpdateWithWhereUniqueWithoutFaactCheckSessionInput = {
    where: ClaimWhereUniqueInput
    data: XOR<ClaimUpdateWithoutFaactCheckSessionInput, ClaimUncheckedUpdateWithoutFaactCheckSessionInput>
  }

  export type ClaimUpdateManyWithWhereWithoutFaactCheckSessionInput = {
    where: ClaimScalarWhereInput
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyWithoutFaactCheckSessionInput>
  }

  export type ClaimScalarWhereInput = {
    AND?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
    OR?: ClaimScalarWhereInput[]
    NOT?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
    id?: StringFilter<"Claim"> | string
    factCheckSessionId?: IntFilter<"Claim"> | number
    index?: IntFilter<"Claim"> | number
    content?: StringFilter<"Claim"> | string
    detectionReason?: StringFilter<"Claim"> | string
    createdAt?: DateTimeFilter<"Claim"> | Date | string
  }

  export type FactCheckSessionCreateWithoutClaimsInput = {
    contentType: $Enums.ContentType
    contentId: string
    user: UserCreateNestedOneWithoutFactCheckSessionsInput
    claimVerifications?: ClaimVerificationCreateNestedManyWithoutFactCheckSessionInput
  }

  export type FactCheckSessionUncheckedCreateWithoutClaimsInput = {
    id?: number
    userId: string
    contentType: $Enums.ContentType
    contentId: string
    claimVerifications?: ClaimVerificationUncheckedCreateNestedManyWithoutFactCheckSessionInput
  }

  export type FactCheckSessionCreateOrConnectWithoutClaimsInput = {
    where: FactCheckSessionWhereUniqueInput
    create: XOR<FactCheckSessionCreateWithoutClaimsInput, FactCheckSessionUncheckedCreateWithoutClaimsInput>
  }

  export type ClaimVerificationCreateWithoutClaimInput = {
    id?: string
    verdict: $Enums.Verdict
    verdictReason: string
    evidence: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    factCheckSession: FactCheckSessionCreateNestedOneWithoutClaimVerificationsInput
  }

  export type ClaimVerificationUncheckedCreateWithoutClaimInput = {
    id?: string
    factCheckSessionId: number
    verdict: $Enums.Verdict
    verdictReason: string
    evidence: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimVerificationCreateOrConnectWithoutClaimInput = {
    where: ClaimVerificationWhereUniqueInput
    create: XOR<ClaimVerificationCreateWithoutClaimInput, ClaimVerificationUncheckedCreateWithoutClaimInput>
  }

  export type ClaimVerificationCreateManyClaimInputEnvelope = {
    data: ClaimVerificationCreateManyClaimInput | ClaimVerificationCreateManyClaimInput[]
    skipDuplicates?: boolean
  }

  export type FactCheckSessionUpsertWithoutClaimsInput = {
    update: XOR<FactCheckSessionUpdateWithoutClaimsInput, FactCheckSessionUncheckedUpdateWithoutClaimsInput>
    create: XOR<FactCheckSessionCreateWithoutClaimsInput, FactCheckSessionUncheckedCreateWithoutClaimsInput>
    where?: FactCheckSessionWhereInput
  }

  export type FactCheckSessionUpdateToOneWithWhereWithoutClaimsInput = {
    where?: FactCheckSessionWhereInput
    data: XOR<FactCheckSessionUpdateWithoutClaimsInput, FactCheckSessionUncheckedUpdateWithoutClaimsInput>
  }

  export type FactCheckSessionUpdateWithoutClaimsInput = {
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutFactCheckSessionsNestedInput
    claimVerifications?: ClaimVerificationUpdateManyWithoutFactCheckSessionNestedInput
  }

  export type FactCheckSessionUncheckedUpdateWithoutClaimsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
    claimVerifications?: ClaimVerificationUncheckedUpdateManyWithoutFactCheckSessionNestedInput
  }

  export type ClaimVerificationUpsertWithWhereUniqueWithoutClaimInput = {
    where: ClaimVerificationWhereUniqueInput
    update: XOR<ClaimVerificationUpdateWithoutClaimInput, ClaimVerificationUncheckedUpdateWithoutClaimInput>
    create: XOR<ClaimVerificationCreateWithoutClaimInput, ClaimVerificationUncheckedCreateWithoutClaimInput>
  }

  export type ClaimVerificationUpdateWithWhereUniqueWithoutClaimInput = {
    where: ClaimVerificationWhereUniqueInput
    data: XOR<ClaimVerificationUpdateWithoutClaimInput, ClaimVerificationUncheckedUpdateWithoutClaimInput>
  }

  export type ClaimVerificationUpdateManyWithWhereWithoutClaimInput = {
    where: ClaimVerificationScalarWhereInput
    data: XOR<ClaimVerificationUpdateManyMutationInput, ClaimVerificationUncheckedUpdateManyWithoutClaimInput>
  }

  export type FactCheckSessionCreateWithoutClaimVerificationsInput = {
    contentType: $Enums.ContentType
    contentId: string
    user: UserCreateNestedOneWithoutFactCheckSessionsInput
    claims?: ClaimCreateNestedManyWithoutFaactCheckSessionInput
  }

  export type FactCheckSessionUncheckedCreateWithoutClaimVerificationsInput = {
    id?: number
    userId: string
    contentType: $Enums.ContentType
    contentId: string
    claims?: ClaimUncheckedCreateNestedManyWithoutFaactCheckSessionInput
  }

  export type FactCheckSessionCreateOrConnectWithoutClaimVerificationsInput = {
    where: FactCheckSessionWhereUniqueInput
    create: XOR<FactCheckSessionCreateWithoutClaimVerificationsInput, FactCheckSessionUncheckedCreateWithoutClaimVerificationsInput>
  }

  export type ClaimCreateWithoutClaimVerificationsInput = {
    id?: string
    index: number
    content: string
    detectionReason: string
    createdAt?: Date | string
    faactCheckSession: FactCheckSessionCreateNestedOneWithoutClaimsInput
  }

  export type ClaimUncheckedCreateWithoutClaimVerificationsInput = {
    id?: string
    factCheckSessionId: number
    index: number
    content: string
    detectionReason: string
    createdAt?: Date | string
  }

  export type ClaimCreateOrConnectWithoutClaimVerificationsInput = {
    where: ClaimWhereUniqueInput
    create: XOR<ClaimCreateWithoutClaimVerificationsInput, ClaimUncheckedCreateWithoutClaimVerificationsInput>
  }

  export type FactCheckSessionUpsertWithoutClaimVerificationsInput = {
    update: XOR<FactCheckSessionUpdateWithoutClaimVerificationsInput, FactCheckSessionUncheckedUpdateWithoutClaimVerificationsInput>
    create: XOR<FactCheckSessionCreateWithoutClaimVerificationsInput, FactCheckSessionUncheckedCreateWithoutClaimVerificationsInput>
    where?: FactCheckSessionWhereInput
  }

  export type FactCheckSessionUpdateToOneWithWhereWithoutClaimVerificationsInput = {
    where?: FactCheckSessionWhereInput
    data: XOR<FactCheckSessionUpdateWithoutClaimVerificationsInput, FactCheckSessionUncheckedUpdateWithoutClaimVerificationsInput>
  }

  export type FactCheckSessionUpdateWithoutClaimVerificationsInput = {
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutFactCheckSessionsNestedInput
    claims?: ClaimUpdateManyWithoutFaactCheckSessionNestedInput
  }

  export type FactCheckSessionUncheckedUpdateWithoutClaimVerificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
    claims?: ClaimUncheckedUpdateManyWithoutFaactCheckSessionNestedInput
  }

  export type ClaimUpsertWithoutClaimVerificationsInput = {
    update: XOR<ClaimUpdateWithoutClaimVerificationsInput, ClaimUncheckedUpdateWithoutClaimVerificationsInput>
    create: XOR<ClaimCreateWithoutClaimVerificationsInput, ClaimUncheckedCreateWithoutClaimVerificationsInput>
    where?: ClaimWhereInput
  }

  export type ClaimUpdateToOneWithWhereWithoutClaimVerificationsInput = {
    where?: ClaimWhereInput
    data: XOR<ClaimUpdateWithoutClaimVerificationsInput, ClaimUncheckedUpdateWithoutClaimVerificationsInput>
  }

  export type ClaimUpdateWithoutClaimVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    detectionReason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faactCheckSession?: FactCheckSessionUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type ClaimUncheckedUpdateWithoutClaimVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    factCheckSessionId?: IntFieldUpdateOperationsInput | number
    index?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    detectionReason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FactCheckSessionCreateManyUserInput = {
    id?: number
    contentType: $Enums.ContentType
    contentId: string
  }

  export type FactCheckSessionUpdateWithoutUserInput = {
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
    claimVerifications?: ClaimVerificationUpdateManyWithoutFactCheckSessionNestedInput
    claims?: ClaimUpdateManyWithoutFaactCheckSessionNestedInput
  }

  export type FactCheckSessionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
    claimVerifications?: ClaimVerificationUncheckedUpdateManyWithoutFactCheckSessionNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutFaactCheckSessionNestedInput
  }

  export type FactCheckSessionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    contentType?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    contentId?: StringFieldUpdateOperationsInput | string
  }

  export type ClaimVerificationCreateManyFactCheckSessionInput = {
    id?: string
    claimId: string
    verdict: $Enums.Verdict
    verdictReason: string
    evidence: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimCreateManyFaactCheckSessionInput = {
    id?: string
    index: number
    content: string
    detectionReason: string
    createdAt?: Date | string
  }

  export type ClaimVerificationUpdateWithoutFactCheckSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    verdict?: EnumVerdictFieldUpdateOperationsInput | $Enums.Verdict
    verdictReason?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claim?: ClaimUpdateOneRequiredWithoutClaimVerificationsNestedInput
  }

  export type ClaimVerificationUncheckedUpdateWithoutFactCheckSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    claimId?: StringFieldUpdateOperationsInput | string
    verdict?: EnumVerdictFieldUpdateOperationsInput | $Enums.Verdict
    verdictReason?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimVerificationUncheckedUpdateManyWithoutFactCheckSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    claimId?: StringFieldUpdateOperationsInput | string
    verdict?: EnumVerdictFieldUpdateOperationsInput | $Enums.Verdict
    verdictReason?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimUpdateWithoutFaactCheckSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    detectionReason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimVerifications?: ClaimVerificationUpdateManyWithoutClaimNestedInput
  }

  export type ClaimUncheckedUpdateWithoutFaactCheckSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    detectionReason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimVerifications?: ClaimVerificationUncheckedUpdateManyWithoutClaimNestedInput
  }

  export type ClaimUncheckedUpdateManyWithoutFaactCheckSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    detectionReason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimVerificationCreateManyClaimInput = {
    id?: string
    factCheckSessionId: number
    verdict: $Enums.Verdict
    verdictReason: string
    evidence: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimVerificationUpdateWithoutClaimInput = {
    id?: StringFieldUpdateOperationsInput | string
    verdict?: EnumVerdictFieldUpdateOperationsInput | $Enums.Verdict
    verdictReason?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    factCheckSession?: FactCheckSessionUpdateOneRequiredWithoutClaimVerificationsNestedInput
  }

  export type ClaimVerificationUncheckedUpdateWithoutClaimInput = {
    id?: StringFieldUpdateOperationsInput | string
    factCheckSessionId?: IntFieldUpdateOperationsInput | number
    verdict?: EnumVerdictFieldUpdateOperationsInput | $Enums.Verdict
    verdictReason?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimVerificationUncheckedUpdateManyWithoutClaimInput = {
    id?: StringFieldUpdateOperationsInput | string
    factCheckSessionId?: IntFieldUpdateOperationsInput | number
    verdict?: EnumVerdictFieldUpdateOperationsInput | $Enums.Verdict
    verdictReason?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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