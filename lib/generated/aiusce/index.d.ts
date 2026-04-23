
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
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Candidatura
 * 
 */
export type Candidatura = $Result.DefaultSelection<Prisma.$CandidaturaPayload>
/**
 * Model OrganizacaoCandidata
 * 
 */
export type OrganizacaoCandidata = $Result.DefaultSelection<Prisma.$OrganizacaoCandidataPayload>
/**
 * Model Candidato
 * 
 */
export type Candidato = $Result.DefaultSelection<Prisma.$CandidatoPayload>
/**
 * Model Eleitor
 * 
 */
export type Eleitor = $Result.DefaultSelection<Prisma.$EleitorPayload>
/**
 * Model OrganizacaoEleitora
 * 
 */
export type OrganizacaoEleitora = $Result.DefaultSelection<Prisma.$OrganizacaoEleitoraPayload>
/**
 * Model Procurador
 * 
 */
export type Procurador = $Result.DefaultSelection<Prisma.$ProcuradorPayload>
/**
 * Model Arquivo
 * 
 */
export type Arquivo = $Result.DefaultSelection<Prisma.$ArquivoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Permissao: {
  DEV: 'DEV',
  ADM: 'ADM',
  USR: 'USR'
};

export type Permissao = (typeof Permissao)[keyof typeof Permissao]


export const TipoUsuario: {
  INTERNO: 'INTERNO',
  EXTERNO: 'EXTERNO'
};

export type TipoUsuario = (typeof TipoUsuario)[keyof typeof TipoUsuario]


export const Segmento: {
  ONG_CULTURAL: 'ONG_CULTURAL',
  ENTIDADE_URB_AMB: 'ENTIDADE_URB_AMB'
};

export type Segmento = (typeof Segmento)[keyof typeof Segmento]


export const TipoInscricao: {
  CANDIDATO: 'CANDIDATO',
  ELEITOR: 'ELEITOR'
};

export type TipoInscricao = (typeof TipoInscricao)[keyof typeof TipoInscricao]


export const TipoCandidato: {
  TITULAR: 'TITULAR',
  SUPLENTE: 'SUPLENTE'
};

export type TipoCandidato = (typeof TipoCandidato)[keyof typeof TipoCandidato]


export const Genero: {
  MASCULINO: 'MASCULINO',
  FEMININO: 'FEMININO',
  OUTRO: 'OUTRO'
};

export type Genero = (typeof Genero)[keyof typeof Genero]


export const Status: {
  EM_ANALISE: 'EM_ANALISE',
  DEFERIDO: 'DEFERIDO',
  INDEFERIDO: 'INDEFERIDO',
  AGUARDANDO_DOCUMENTACAO: 'AGUARDANDO_DOCUMENTACAO'
};

export type Status = (typeof Status)[keyof typeof Status]


export const CategoriaArquivo: {
  CAND_ENT_REQUERIMENTO: 'CAND_ENT_REQUERIMENTO',
  CAND_ENT_DECLARACAO_ATUACAO: 'CAND_ENT_DECLARACAO_ATUACAO',
  CAND_ENT_ESTATUTO: 'CAND_ENT_ESTATUTO',
  CAND_ENT_ATA_ELEICAO: 'CAND_ENT_ATA_ELEICAO',
  CAND_ENT_CNPJ: 'CAND_ENT_CNPJ',
  CAND_ENT_DECLARACAO_IDONEIDADE: 'CAND_ENT_DECLARACAO_IDONEIDADE',
  CAND_REP_IDENTIDADE: 'CAND_REP_IDENTIDADE',
  CAND_REP_TITULO_ELEITOR: 'CAND_REP_TITULO_ELEITOR',
  CAND_REP_CPF: 'CAND_REP_CPF',
  CAND_REP_FOTO: 'CAND_REP_FOTO',
  CAND_REP_NAO_IMPEDIMENTO: 'CAND_REP_NAO_IMPEDIMENTO',
  CAND_CHAPA_REQUERIMENTO: 'CAND_CHAPA_REQUERIMENTO',
  ELEIT_ENT_REQUERIMENTO: 'ELEIT_ENT_REQUERIMENTO',
  ELEIT_ENT_DECLARACAO_ATUACAO: 'ELEIT_ENT_DECLARACAO_ATUACAO',
  ELEIT_ENT_ESTATUTO: 'ELEIT_ENT_ESTATUTO',
  ELEIT_ENT_ATA_ELEICAO: 'ELEIT_ENT_ATA_ELEICAO',
  ELEIT_ENT_CNPJ: 'ELEIT_ENT_CNPJ',
  ELEIT_ENT_DECLARACAO_IDONEIDADE: 'ELEIT_ENT_DECLARACAO_IDONEIDADE',
  ELEIT_REP_IDENTIDADE: 'ELEIT_REP_IDENTIDADE',
  ELEIT_REP_TITULO_ELEITOR: 'ELEIT_REP_TITULO_ELEITOR',
  ELEIT_REP_CPF: 'ELEIT_REP_CPF',
  ELEIT_PROC_PROCURACAO: 'ELEIT_PROC_PROCURACAO',
  ELEIT_PROC_REQUERIMENTO: 'ELEIT_PROC_REQUERIMENTO',
  COMPLEMENTAR: 'COMPLEMENTAR'
};

export type CategoriaArquivo = (typeof CategoriaArquivo)[keyof typeof CategoriaArquivo]

}

export type Permissao = $Enums.Permissao

export const Permissao: typeof $Enums.Permissao

export type TipoUsuario = $Enums.TipoUsuario

export const TipoUsuario: typeof $Enums.TipoUsuario

export type Segmento = $Enums.Segmento

export const Segmento: typeof $Enums.Segmento

export type TipoInscricao = $Enums.TipoInscricao

export const TipoInscricao: typeof $Enums.TipoInscricao

export type TipoCandidato = $Enums.TipoCandidato

export const TipoCandidato: typeof $Enums.TipoCandidato

export type Genero = $Enums.Genero

export const Genero: typeof $Enums.Genero

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type CategoriaArquivo = $Enums.CategoriaArquivo

export const CategoriaArquivo: typeof $Enums.CategoriaArquivo

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
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
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
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
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candidatura`: Exposes CRUD operations for the **Candidatura** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Candidaturas
    * const candidaturas = await prisma.candidatura.findMany()
    * ```
    */
  get candidatura(): Prisma.CandidaturaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizacaoCandidata`: Exposes CRUD operations for the **OrganizacaoCandidata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizacaoCandidata
    * const organizacaoCandidata = await prisma.organizacaoCandidata.findMany()
    * ```
    */
  get organizacaoCandidata(): Prisma.OrganizacaoCandidataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candidato`: Exposes CRUD operations for the **Candidato** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Candidatoes
    * const candidatoes = await prisma.candidato.findMany()
    * ```
    */
  get candidato(): Prisma.CandidatoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eleitor`: Exposes CRUD operations for the **Eleitor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Eleitors
    * const eleitors = await prisma.eleitor.findMany()
    * ```
    */
  get eleitor(): Prisma.EleitorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizacaoEleitora`: Exposes CRUD operations for the **OrganizacaoEleitora** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizacaoEleitoras
    * const organizacaoEleitoras = await prisma.organizacaoEleitora.findMany()
    * ```
    */
  get organizacaoEleitora(): Prisma.OrganizacaoEleitoraDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.procurador`: Exposes CRUD operations for the **Procurador** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Procuradors
    * const procuradors = await prisma.procurador.findMany()
    * ```
    */
  get procurador(): Prisma.ProcuradorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.arquivo`: Exposes CRUD operations for the **Arquivo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Arquivos
    * const arquivos = await prisma.arquivo.findMany()
    * ```
    */
  get arquivo(): Prisma.ArquivoDelegate<ExtArgs, ClientOptions>;
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
    Usuario: 'Usuario',
    Candidatura: 'Candidatura',
    OrganizacaoCandidata: 'OrganizacaoCandidata',
    Candidato: 'Candidato',
    Eleitor: 'Eleitor',
    OrganizacaoEleitora: 'OrganizacaoEleitora',
    Procurador: 'Procurador',
    Arquivo: 'Arquivo'
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
      modelProps: "usuario" | "candidatura" | "organizacaoCandidata" | "candidato" | "eleitor" | "organizacaoEleitora" | "procurador" | "arquivo"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Candidatura: {
        payload: Prisma.$CandidaturaPayload<ExtArgs>
        fields: Prisma.CandidaturaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandidaturaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidaturaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandidaturaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidaturaPayload>
          }
          findFirst: {
            args: Prisma.CandidaturaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidaturaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandidaturaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidaturaPayload>
          }
          findMany: {
            args: Prisma.CandidaturaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidaturaPayload>[]
          }
          create: {
            args: Prisma.CandidaturaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidaturaPayload>
          }
          createMany: {
            args: Prisma.CandidaturaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CandidaturaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidaturaPayload>
          }
          update: {
            args: Prisma.CandidaturaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidaturaPayload>
          }
          deleteMany: {
            args: Prisma.CandidaturaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandidaturaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CandidaturaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidaturaPayload>
          }
          aggregate: {
            args: Prisma.CandidaturaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandidatura>
          }
          groupBy: {
            args: Prisma.CandidaturaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandidaturaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandidaturaCountArgs<ExtArgs>
            result: $Utils.Optional<CandidaturaCountAggregateOutputType> | number
          }
        }
      }
      OrganizacaoCandidata: {
        payload: Prisma.$OrganizacaoCandidataPayload<ExtArgs>
        fields: Prisma.OrganizacaoCandidataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizacaoCandidataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoCandidataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizacaoCandidataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoCandidataPayload>
          }
          findFirst: {
            args: Prisma.OrganizacaoCandidataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoCandidataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizacaoCandidataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoCandidataPayload>
          }
          findMany: {
            args: Prisma.OrganizacaoCandidataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoCandidataPayload>[]
          }
          create: {
            args: Prisma.OrganizacaoCandidataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoCandidataPayload>
          }
          createMany: {
            args: Prisma.OrganizacaoCandidataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrganizacaoCandidataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoCandidataPayload>
          }
          update: {
            args: Prisma.OrganizacaoCandidataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoCandidataPayload>
          }
          deleteMany: {
            args: Prisma.OrganizacaoCandidataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizacaoCandidataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizacaoCandidataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoCandidataPayload>
          }
          aggregate: {
            args: Prisma.OrganizacaoCandidataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizacaoCandidata>
          }
          groupBy: {
            args: Prisma.OrganizacaoCandidataGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizacaoCandidataGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizacaoCandidataCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizacaoCandidataCountAggregateOutputType> | number
          }
        }
      }
      Candidato: {
        payload: Prisma.$CandidatoPayload<ExtArgs>
        fields: Prisma.CandidatoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandidatoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandidatoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatoPayload>
          }
          findFirst: {
            args: Prisma.CandidatoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandidatoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatoPayload>
          }
          findMany: {
            args: Prisma.CandidatoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatoPayload>[]
          }
          create: {
            args: Prisma.CandidatoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatoPayload>
          }
          createMany: {
            args: Prisma.CandidatoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CandidatoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatoPayload>
          }
          update: {
            args: Prisma.CandidatoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatoPayload>
          }
          deleteMany: {
            args: Prisma.CandidatoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandidatoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CandidatoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatoPayload>
          }
          aggregate: {
            args: Prisma.CandidatoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandidato>
          }
          groupBy: {
            args: Prisma.CandidatoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandidatoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandidatoCountArgs<ExtArgs>
            result: $Utils.Optional<CandidatoCountAggregateOutputType> | number
          }
        }
      }
      Eleitor: {
        payload: Prisma.$EleitorPayload<ExtArgs>
        fields: Prisma.EleitorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EleitorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EleitorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EleitorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EleitorPayload>
          }
          findFirst: {
            args: Prisma.EleitorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EleitorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EleitorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EleitorPayload>
          }
          findMany: {
            args: Prisma.EleitorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EleitorPayload>[]
          }
          create: {
            args: Prisma.EleitorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EleitorPayload>
          }
          createMany: {
            args: Prisma.EleitorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EleitorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EleitorPayload>
          }
          update: {
            args: Prisma.EleitorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EleitorPayload>
          }
          deleteMany: {
            args: Prisma.EleitorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EleitorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EleitorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EleitorPayload>
          }
          aggregate: {
            args: Prisma.EleitorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEleitor>
          }
          groupBy: {
            args: Prisma.EleitorGroupByArgs<ExtArgs>
            result: $Utils.Optional<EleitorGroupByOutputType>[]
          }
          count: {
            args: Prisma.EleitorCountArgs<ExtArgs>
            result: $Utils.Optional<EleitorCountAggregateOutputType> | number
          }
        }
      }
      OrganizacaoEleitora: {
        payload: Prisma.$OrganizacaoEleitoraPayload<ExtArgs>
        fields: Prisma.OrganizacaoEleitoraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizacaoEleitoraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoEleitoraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizacaoEleitoraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoEleitoraPayload>
          }
          findFirst: {
            args: Prisma.OrganizacaoEleitoraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoEleitoraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizacaoEleitoraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoEleitoraPayload>
          }
          findMany: {
            args: Prisma.OrganizacaoEleitoraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoEleitoraPayload>[]
          }
          create: {
            args: Prisma.OrganizacaoEleitoraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoEleitoraPayload>
          }
          createMany: {
            args: Prisma.OrganizacaoEleitoraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrganizacaoEleitoraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoEleitoraPayload>
          }
          update: {
            args: Prisma.OrganizacaoEleitoraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoEleitoraPayload>
          }
          deleteMany: {
            args: Prisma.OrganizacaoEleitoraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizacaoEleitoraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizacaoEleitoraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoEleitoraPayload>
          }
          aggregate: {
            args: Prisma.OrganizacaoEleitoraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizacaoEleitora>
          }
          groupBy: {
            args: Prisma.OrganizacaoEleitoraGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizacaoEleitoraGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizacaoEleitoraCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizacaoEleitoraCountAggregateOutputType> | number
          }
        }
      }
      Procurador: {
        payload: Prisma.$ProcuradorPayload<ExtArgs>
        fields: Prisma.ProcuradorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcuradorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcuradorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcuradorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcuradorPayload>
          }
          findFirst: {
            args: Prisma.ProcuradorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcuradorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcuradorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcuradorPayload>
          }
          findMany: {
            args: Prisma.ProcuradorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcuradorPayload>[]
          }
          create: {
            args: Prisma.ProcuradorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcuradorPayload>
          }
          createMany: {
            args: Prisma.ProcuradorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProcuradorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcuradorPayload>
          }
          update: {
            args: Prisma.ProcuradorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcuradorPayload>
          }
          deleteMany: {
            args: Prisma.ProcuradorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcuradorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProcuradorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcuradorPayload>
          }
          aggregate: {
            args: Prisma.ProcuradorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcurador>
          }
          groupBy: {
            args: Prisma.ProcuradorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcuradorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcuradorCountArgs<ExtArgs>
            result: $Utils.Optional<ProcuradorCountAggregateOutputType> | number
          }
        }
      }
      Arquivo: {
        payload: Prisma.$ArquivoPayload<ExtArgs>
        fields: Prisma.ArquivoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArquivoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArquivoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArquivoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArquivoPayload>
          }
          findFirst: {
            args: Prisma.ArquivoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArquivoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArquivoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArquivoPayload>
          }
          findMany: {
            args: Prisma.ArquivoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArquivoPayload>[]
          }
          create: {
            args: Prisma.ArquivoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArquivoPayload>
          }
          createMany: {
            args: Prisma.ArquivoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ArquivoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArquivoPayload>
          }
          update: {
            args: Prisma.ArquivoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArquivoPayload>
          }
          deleteMany: {
            args: Prisma.ArquivoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArquivoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArquivoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArquivoPayload>
          }
          aggregate: {
            args: Prisma.ArquivoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArquivo>
          }
          groupBy: {
            args: Prisma.ArquivoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArquivoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArquivoCountArgs<ExtArgs>
            result: $Utils.Optional<ArquivoCountAggregateOutputType> | number
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
    usuario?: UsuarioOmit
    candidatura?: CandidaturaOmit
    organizacaoCandidata?: OrganizacaoCandidataOmit
    candidato?: CandidatoOmit
    eleitor?: EleitorOmit
    organizacaoEleitora?: OrganizacaoEleitoraOmit
    procurador?: ProcuradorOmit
    arquivo?: ArquivoOmit
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
   * Count Type CandidaturaCountOutputType
   */

  export type CandidaturaCountOutputType = {
    candidatos: number
    arquivos: number
  }

  export type CandidaturaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidatos?: boolean | CandidaturaCountOutputTypeCountCandidatosArgs
    arquivos?: boolean | CandidaturaCountOutputTypeCountArquivosArgs
  }

  // Custom InputTypes
  /**
   * CandidaturaCountOutputType without action
   */
  export type CandidaturaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidaturaCountOutputType
     */
    select?: CandidaturaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CandidaturaCountOutputType without action
   */
  export type CandidaturaCountOutputTypeCountCandidatosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidatoWhereInput
  }

  /**
   * CandidaturaCountOutputType without action
   */
  export type CandidaturaCountOutputTypeCountArquivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArquivoWhereInput
  }


  /**
   * Count Type OrganizacaoCandidataCountOutputType
   */

  export type OrganizacaoCandidataCountOutputType = {
    arquivos: number
  }

  export type OrganizacaoCandidataCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    arquivos?: boolean | OrganizacaoCandidataCountOutputTypeCountArquivosArgs
  }

  // Custom InputTypes
  /**
   * OrganizacaoCandidataCountOutputType without action
   */
  export type OrganizacaoCandidataCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidataCountOutputType
     */
    select?: OrganizacaoCandidataCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizacaoCandidataCountOutputType without action
   */
  export type OrganizacaoCandidataCountOutputTypeCountArquivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArquivoWhereInput
  }


  /**
   * Count Type CandidatoCountOutputType
   */

  export type CandidatoCountOutputType = {
    arquivos: number
  }

  export type CandidatoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    arquivos?: boolean | CandidatoCountOutputTypeCountArquivosArgs
  }

  // Custom InputTypes
  /**
   * CandidatoCountOutputType without action
   */
  export type CandidatoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidatoCountOutputType
     */
    select?: CandidatoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CandidatoCountOutputType without action
   */
  export type CandidatoCountOutputTypeCountArquivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArquivoWhereInput
  }


  /**
   * Count Type EleitorCountOutputType
   */

  export type EleitorCountOutputType = {
    membros: number
    arquivos: number
  }

  export type EleitorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    membros?: boolean | EleitorCountOutputTypeCountMembrosArgs
    arquivos?: boolean | EleitorCountOutputTypeCountArquivosArgs
  }

  // Custom InputTypes
  /**
   * EleitorCountOutputType without action
   */
  export type EleitorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EleitorCountOutputType
     */
    select?: EleitorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EleitorCountOutputType without action
   */
  export type EleitorCountOutputTypeCountMembrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EleitorWhereInput
  }

  /**
   * EleitorCountOutputType without action
   */
  export type EleitorCountOutputTypeCountArquivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArquivoWhereInput
  }


  /**
   * Count Type OrganizacaoEleitoraCountOutputType
   */

  export type OrganizacaoEleitoraCountOutputType = {
    arquivos: number
  }

  export type OrganizacaoEleitoraCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    arquivos?: boolean | OrganizacaoEleitoraCountOutputTypeCountArquivosArgs
  }

  // Custom InputTypes
  /**
   * OrganizacaoEleitoraCountOutputType without action
   */
  export type OrganizacaoEleitoraCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitoraCountOutputType
     */
    select?: OrganizacaoEleitoraCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizacaoEleitoraCountOutputType without action
   */
  export type OrganizacaoEleitoraCountOutputTypeCountArquivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArquivoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    tipo: $Enums.TipoUsuario | null
    nome: string | null
    email: string | null
    login: string | null
    permissao: $Enums.Permissao | null
    status: boolean | null
    senha: string | null
    primeiroAcesso: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    tipo: $Enums.TipoUsuario | null
    nome: string | null
    email: string | null
    login: string | null
    permissao: $Enums.Permissao | null
    status: boolean | null
    senha: string | null
    primeiroAcesso: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    tipo: number
    nome: number
    email: number
    login: number
    permissao: number
    status: number
    senha: number
    primeiroAcesso: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    tipo?: true
    nome?: true
    email?: true
    login?: true
    permissao?: true
    status?: true
    senha?: true
    primeiroAcesso?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    tipo?: true
    nome?: true
    email?: true
    login?: true
    permissao?: true
    status?: true
    senha?: true
    primeiroAcesso?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    tipo?: true
    nome?: true
    email?: true
    login?: true
    permissao?: true
    status?: true
    senha?: true
    primeiroAcesso?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    tipo: $Enums.TipoUsuario
    nome: string
    email: string
    login: string | null
    permissao: $Enums.Permissao | null
    status: boolean
    senha: string | null
    primeiroAcesso: boolean
    criadoEm: Date
    atualizadoEm: Date
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    nome?: boolean
    email?: boolean
    login?: boolean
    permissao?: boolean
    status?: boolean
    senha?: boolean
    primeiroAcesso?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    candidatura?: boolean | Usuario$candidaturaArgs<ExtArgs>
    eleitor?: boolean | Usuario$eleitorArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>



  export type UsuarioSelectScalar = {
    id?: boolean
    tipo?: boolean
    nome?: boolean
    email?: boolean
    login?: boolean
    permissao?: boolean
    status?: boolean
    senha?: boolean
    primeiroAcesso?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipo" | "nome" | "email" | "login" | "permissao" | "status" | "senha" | "primeiroAcesso" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidatura?: boolean | Usuario$candidaturaArgs<ExtArgs>
    eleitor?: boolean | Usuario$eleitorArgs<ExtArgs>
  }

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      candidatura: Prisma.$CandidaturaPayload<ExtArgs> | null
      eleitor: Prisma.$EleitorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipo: $Enums.TipoUsuario
      nome: string
      email: string
      login: string | null
      permissao: $Enums.Permissao | null
      status: boolean
      senha: string | null
      primeiroAcesso: boolean
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
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
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidatura<T extends Usuario$candidaturaArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$candidaturaArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    eleitor<T extends Usuario$eleitorArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$eleitorArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly tipo: FieldRef<"Usuario", 'TipoUsuario'>
    readonly nome: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly login: FieldRef<"Usuario", 'String'>
    readonly permissao: FieldRef<"Usuario", 'Permissao'>
    readonly status: FieldRef<"Usuario", 'Boolean'>
    readonly senha: FieldRef<"Usuario", 'String'>
    readonly primeiroAcesso: FieldRef<"Usuario", 'Boolean'>
    readonly criadoEm: FieldRef<"Usuario", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.candidatura
   */
  export type Usuario$candidaturaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    where?: CandidaturaWhereInput
  }

  /**
   * Usuario.eleitor
   */
  export type Usuario$eleitorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    where?: EleitorWhereInput
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Candidatura
   */

  export type AggregateCandidatura = {
    _count: CandidaturaCountAggregateOutputType | null
    _min: CandidaturaMinAggregateOutputType | null
    _max: CandidaturaMaxAggregateOutputType | null
  }

  export type CandidaturaMinAggregateOutputType = {
    id: string | null
    tipoInscricao: $Enums.TipoInscricao | null
    status: $Enums.Status | null
    oculto: boolean | null
    motivoIndeferimento: string | null
    usuarioId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CandidaturaMaxAggregateOutputType = {
    id: string | null
    tipoInscricao: $Enums.TipoInscricao | null
    status: $Enums.Status | null
    oculto: boolean | null
    motivoIndeferimento: string | null
    usuarioId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CandidaturaCountAggregateOutputType = {
    id: number
    tipoInscricao: number
    status: number
    oculto: number
    motivoIndeferimento: number
    usuarioId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type CandidaturaMinAggregateInputType = {
    id?: true
    tipoInscricao?: true
    status?: true
    oculto?: true
    motivoIndeferimento?: true
    usuarioId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CandidaturaMaxAggregateInputType = {
    id?: true
    tipoInscricao?: true
    status?: true
    oculto?: true
    motivoIndeferimento?: true
    usuarioId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CandidaturaCountAggregateInputType = {
    id?: true
    tipoInscricao?: true
    status?: true
    oculto?: true
    motivoIndeferimento?: true
    usuarioId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type CandidaturaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidatura to aggregate.
     */
    where?: CandidaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidaturas to fetch.
     */
    orderBy?: CandidaturaOrderByWithRelationInput | CandidaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandidaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidaturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Candidaturas
    **/
    _count?: true | CandidaturaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandidaturaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandidaturaMaxAggregateInputType
  }

  export type GetCandidaturaAggregateType<T extends CandidaturaAggregateArgs> = {
        [P in keyof T & keyof AggregateCandidatura]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandidatura[P]>
      : GetScalarType<T[P], AggregateCandidatura[P]>
  }




  export type CandidaturaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidaturaWhereInput
    orderBy?: CandidaturaOrderByWithAggregationInput | CandidaturaOrderByWithAggregationInput[]
    by: CandidaturaScalarFieldEnum[] | CandidaturaScalarFieldEnum
    having?: CandidaturaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandidaturaCountAggregateInputType | true
    _min?: CandidaturaMinAggregateInputType
    _max?: CandidaturaMaxAggregateInputType
  }

  export type CandidaturaGroupByOutputType = {
    id: string
    tipoInscricao: $Enums.TipoInscricao
    status: $Enums.Status
    oculto: boolean
    motivoIndeferimento: string | null
    usuarioId: string
    criadoEm: Date
    atualizadoEm: Date
    _count: CandidaturaCountAggregateOutputType | null
    _min: CandidaturaMinAggregateOutputType | null
    _max: CandidaturaMaxAggregateOutputType | null
  }

  type GetCandidaturaGroupByPayload<T extends CandidaturaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandidaturaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandidaturaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandidaturaGroupByOutputType[P]>
            : GetScalarType<T[P], CandidaturaGroupByOutputType[P]>
        }
      >
    >


  export type CandidaturaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipoInscricao?: boolean
    status?: boolean
    oculto?: boolean
    motivoIndeferimento?: boolean
    usuarioId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    organizacao?: boolean | Candidatura$organizacaoArgs<ExtArgs>
    candidatos?: boolean | Candidatura$candidatosArgs<ExtArgs>
    arquivos?: boolean | Candidatura$arquivosArgs<ExtArgs>
    _count?: boolean | CandidaturaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidatura"]>



  export type CandidaturaSelectScalar = {
    id?: boolean
    tipoInscricao?: boolean
    status?: boolean
    oculto?: boolean
    motivoIndeferimento?: boolean
    usuarioId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type CandidaturaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipoInscricao" | "status" | "oculto" | "motivoIndeferimento" | "usuarioId" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["candidatura"]>
  export type CandidaturaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    organizacao?: boolean | Candidatura$organizacaoArgs<ExtArgs>
    candidatos?: boolean | Candidatura$candidatosArgs<ExtArgs>
    arquivos?: boolean | Candidatura$arquivosArgs<ExtArgs>
    _count?: boolean | CandidaturaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CandidaturaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Candidatura"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      organizacao: Prisma.$OrganizacaoCandidataPayload<ExtArgs> | null
      candidatos: Prisma.$CandidatoPayload<ExtArgs>[]
      arquivos: Prisma.$ArquivoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipoInscricao: $Enums.TipoInscricao
      status: $Enums.Status
      oculto: boolean
      motivoIndeferimento: string | null
      usuarioId: string
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["candidatura"]>
    composites: {}
  }

  type CandidaturaGetPayload<S extends boolean | null | undefined | CandidaturaDefaultArgs> = $Result.GetResult<Prisma.$CandidaturaPayload, S>

  type CandidaturaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CandidaturaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandidaturaCountAggregateInputType | true
    }

  export interface CandidaturaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Candidatura'], meta: { name: 'Candidatura' } }
    /**
     * Find zero or one Candidatura that matches the filter.
     * @param {CandidaturaFindUniqueArgs} args - Arguments to find a Candidatura
     * @example
     * // Get one Candidatura
     * const candidatura = await prisma.candidatura.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandidaturaFindUniqueArgs>(args: SelectSubset<T, CandidaturaFindUniqueArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Candidatura that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CandidaturaFindUniqueOrThrowArgs} args - Arguments to find a Candidatura
     * @example
     * // Get one Candidatura
     * const candidatura = await prisma.candidatura.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandidaturaFindUniqueOrThrowArgs>(args: SelectSubset<T, CandidaturaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidatura that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidaturaFindFirstArgs} args - Arguments to find a Candidatura
     * @example
     * // Get one Candidatura
     * const candidatura = await prisma.candidatura.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandidaturaFindFirstArgs>(args?: SelectSubset<T, CandidaturaFindFirstArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidatura that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidaturaFindFirstOrThrowArgs} args - Arguments to find a Candidatura
     * @example
     * // Get one Candidatura
     * const candidatura = await prisma.candidatura.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandidaturaFindFirstOrThrowArgs>(args?: SelectSubset<T, CandidaturaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Candidaturas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidaturaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Candidaturas
     * const candidaturas = await prisma.candidatura.findMany()
     * 
     * // Get first 10 Candidaturas
     * const candidaturas = await prisma.candidatura.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candidaturaWithIdOnly = await prisma.candidatura.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandidaturaFindManyArgs>(args?: SelectSubset<T, CandidaturaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Candidatura.
     * @param {CandidaturaCreateArgs} args - Arguments to create a Candidatura.
     * @example
     * // Create one Candidatura
     * const Candidatura = await prisma.candidatura.create({
     *   data: {
     *     // ... data to create a Candidatura
     *   }
     * })
     * 
     */
    create<T extends CandidaturaCreateArgs>(args: SelectSubset<T, CandidaturaCreateArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Candidaturas.
     * @param {CandidaturaCreateManyArgs} args - Arguments to create many Candidaturas.
     * @example
     * // Create many Candidaturas
     * const candidatura = await prisma.candidatura.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandidaturaCreateManyArgs>(args?: SelectSubset<T, CandidaturaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Candidatura.
     * @param {CandidaturaDeleteArgs} args - Arguments to delete one Candidatura.
     * @example
     * // Delete one Candidatura
     * const Candidatura = await prisma.candidatura.delete({
     *   where: {
     *     // ... filter to delete one Candidatura
     *   }
     * })
     * 
     */
    delete<T extends CandidaturaDeleteArgs>(args: SelectSubset<T, CandidaturaDeleteArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Candidatura.
     * @param {CandidaturaUpdateArgs} args - Arguments to update one Candidatura.
     * @example
     * // Update one Candidatura
     * const candidatura = await prisma.candidatura.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandidaturaUpdateArgs>(args: SelectSubset<T, CandidaturaUpdateArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Candidaturas.
     * @param {CandidaturaDeleteManyArgs} args - Arguments to filter Candidaturas to delete.
     * @example
     * // Delete a few Candidaturas
     * const { count } = await prisma.candidatura.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandidaturaDeleteManyArgs>(args?: SelectSubset<T, CandidaturaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidaturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidaturaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Candidaturas
     * const candidatura = await prisma.candidatura.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandidaturaUpdateManyArgs>(args: SelectSubset<T, CandidaturaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Candidatura.
     * @param {CandidaturaUpsertArgs} args - Arguments to update or create a Candidatura.
     * @example
     * // Update or create a Candidatura
     * const candidatura = await prisma.candidatura.upsert({
     *   create: {
     *     // ... data to create a Candidatura
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Candidatura we want to update
     *   }
     * })
     */
    upsert<T extends CandidaturaUpsertArgs>(args: SelectSubset<T, CandidaturaUpsertArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Candidaturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidaturaCountArgs} args - Arguments to filter Candidaturas to count.
     * @example
     * // Count the number of Candidaturas
     * const count = await prisma.candidatura.count({
     *   where: {
     *     // ... the filter for the Candidaturas we want to count
     *   }
     * })
    **/
    count<T extends CandidaturaCountArgs>(
      args?: Subset<T, CandidaturaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandidaturaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Candidatura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidaturaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CandidaturaAggregateArgs>(args: Subset<T, CandidaturaAggregateArgs>): Prisma.PrismaPromise<GetCandidaturaAggregateType<T>>

    /**
     * Group by Candidatura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidaturaGroupByArgs} args - Group by arguments.
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
      T extends CandidaturaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandidaturaGroupByArgs['orderBy'] }
        : { orderBy?: CandidaturaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CandidaturaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandidaturaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Candidatura model
   */
  readonly fields: CandidaturaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Candidatura.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandidaturaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    organizacao<T extends Candidatura$organizacaoArgs<ExtArgs> = {}>(args?: Subset<T, Candidatura$organizacaoArgs<ExtArgs>>): Prisma__OrganizacaoCandidataClient<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    candidatos<T extends Candidatura$candidatosArgs<ExtArgs> = {}>(args?: Subset<T, Candidatura$candidatosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    arquivos<T extends Candidatura$arquivosArgs<ExtArgs> = {}>(args?: Subset<T, Candidatura$arquivosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Candidatura model
   */
  interface CandidaturaFieldRefs {
    readonly id: FieldRef<"Candidatura", 'String'>
    readonly tipoInscricao: FieldRef<"Candidatura", 'TipoInscricao'>
    readonly status: FieldRef<"Candidatura", 'Status'>
    readonly oculto: FieldRef<"Candidatura", 'Boolean'>
    readonly motivoIndeferimento: FieldRef<"Candidatura", 'String'>
    readonly usuarioId: FieldRef<"Candidatura", 'String'>
    readonly criadoEm: FieldRef<"Candidatura", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Candidatura", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Candidatura findUnique
   */
  export type CandidaturaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    /**
     * Filter, which Candidatura to fetch.
     */
    where: CandidaturaWhereUniqueInput
  }

  /**
   * Candidatura findUniqueOrThrow
   */
  export type CandidaturaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    /**
     * Filter, which Candidatura to fetch.
     */
    where: CandidaturaWhereUniqueInput
  }

  /**
   * Candidatura findFirst
   */
  export type CandidaturaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    /**
     * Filter, which Candidatura to fetch.
     */
    where?: CandidaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidaturas to fetch.
     */
    orderBy?: CandidaturaOrderByWithRelationInput | CandidaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidaturas.
     */
    cursor?: CandidaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidaturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidaturas.
     */
    distinct?: CandidaturaScalarFieldEnum | CandidaturaScalarFieldEnum[]
  }

  /**
   * Candidatura findFirstOrThrow
   */
  export type CandidaturaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    /**
     * Filter, which Candidatura to fetch.
     */
    where?: CandidaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidaturas to fetch.
     */
    orderBy?: CandidaturaOrderByWithRelationInput | CandidaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidaturas.
     */
    cursor?: CandidaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidaturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidaturas.
     */
    distinct?: CandidaturaScalarFieldEnum | CandidaturaScalarFieldEnum[]
  }

  /**
   * Candidatura findMany
   */
  export type CandidaturaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    /**
     * Filter, which Candidaturas to fetch.
     */
    where?: CandidaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidaturas to fetch.
     */
    orderBy?: CandidaturaOrderByWithRelationInput | CandidaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Candidaturas.
     */
    cursor?: CandidaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidaturas.
     */
    skip?: number
    distinct?: CandidaturaScalarFieldEnum | CandidaturaScalarFieldEnum[]
  }

  /**
   * Candidatura create
   */
  export type CandidaturaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    /**
     * The data needed to create a Candidatura.
     */
    data: XOR<CandidaturaCreateInput, CandidaturaUncheckedCreateInput>
  }

  /**
   * Candidatura createMany
   */
  export type CandidaturaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Candidaturas.
     */
    data: CandidaturaCreateManyInput | CandidaturaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Candidatura update
   */
  export type CandidaturaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    /**
     * The data needed to update a Candidatura.
     */
    data: XOR<CandidaturaUpdateInput, CandidaturaUncheckedUpdateInput>
    /**
     * Choose, which Candidatura to update.
     */
    where: CandidaturaWhereUniqueInput
  }

  /**
   * Candidatura updateMany
   */
  export type CandidaturaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Candidaturas.
     */
    data: XOR<CandidaturaUpdateManyMutationInput, CandidaturaUncheckedUpdateManyInput>
    /**
     * Filter which Candidaturas to update
     */
    where?: CandidaturaWhereInput
    /**
     * Limit how many Candidaturas to update.
     */
    limit?: number
  }

  /**
   * Candidatura upsert
   */
  export type CandidaturaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    /**
     * The filter to search for the Candidatura to update in case it exists.
     */
    where: CandidaturaWhereUniqueInput
    /**
     * In case the Candidatura found by the `where` argument doesn't exist, create a new Candidatura with this data.
     */
    create: XOR<CandidaturaCreateInput, CandidaturaUncheckedCreateInput>
    /**
     * In case the Candidatura was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandidaturaUpdateInput, CandidaturaUncheckedUpdateInput>
  }

  /**
   * Candidatura delete
   */
  export type CandidaturaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    /**
     * Filter which Candidatura to delete.
     */
    where: CandidaturaWhereUniqueInput
  }

  /**
   * Candidatura deleteMany
   */
  export type CandidaturaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidaturas to delete
     */
    where?: CandidaturaWhereInput
    /**
     * Limit how many Candidaturas to delete.
     */
    limit?: number
  }

  /**
   * Candidatura.organizacao
   */
  export type Candidatura$organizacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    where?: OrganizacaoCandidataWhereInput
  }

  /**
   * Candidatura.candidatos
   */
  export type Candidatura$candidatosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    where?: CandidatoWhereInput
    orderBy?: CandidatoOrderByWithRelationInput | CandidatoOrderByWithRelationInput[]
    cursor?: CandidatoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandidatoScalarFieldEnum | CandidatoScalarFieldEnum[]
  }

  /**
   * Candidatura.arquivos
   */
  export type Candidatura$arquivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    where?: ArquivoWhereInput
    orderBy?: ArquivoOrderByWithRelationInput | ArquivoOrderByWithRelationInput[]
    cursor?: ArquivoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArquivoScalarFieldEnum | ArquivoScalarFieldEnum[]
  }

  /**
   * Candidatura without action
   */
  export type CandidaturaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
  }


  /**
   * Model OrganizacaoCandidata
   */

  export type AggregateOrganizacaoCandidata = {
    _count: OrganizacaoCandidataCountAggregateOutputType | null
    _min: OrganizacaoCandidataMinAggregateOutputType | null
    _max: OrganizacaoCandidataMaxAggregateOutputType | null
  }

  export type OrganizacaoCandidataMinAggregateOutputType = {
    id: string | null
    razaoSocial: string | null
    cnpj: string | null
    segmento: $Enums.Segmento | null
    dataAbertura: Date | null
    sede: string | null
    repNome: string | null
    repCpf: string | null
    emailEntidade: string | null
    telefone: string | null
    formaChapa: boolean | null
    cnpjChapa: string | null
    candidaturaId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type OrganizacaoCandidataMaxAggregateOutputType = {
    id: string | null
    razaoSocial: string | null
    cnpj: string | null
    segmento: $Enums.Segmento | null
    dataAbertura: Date | null
    sede: string | null
    repNome: string | null
    repCpf: string | null
    emailEntidade: string | null
    telefone: string | null
    formaChapa: boolean | null
    cnpjChapa: string | null
    candidaturaId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type OrganizacaoCandidataCountAggregateOutputType = {
    id: number
    razaoSocial: number
    cnpj: number
    segmento: number
    dataAbertura: number
    sede: number
    repNome: number
    repCpf: number
    emailEntidade: number
    telefone: number
    formaChapa: number
    cnpjChapa: number
    candidaturaId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type OrganizacaoCandidataMinAggregateInputType = {
    id?: true
    razaoSocial?: true
    cnpj?: true
    segmento?: true
    dataAbertura?: true
    sede?: true
    repNome?: true
    repCpf?: true
    emailEntidade?: true
    telefone?: true
    formaChapa?: true
    cnpjChapa?: true
    candidaturaId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type OrganizacaoCandidataMaxAggregateInputType = {
    id?: true
    razaoSocial?: true
    cnpj?: true
    segmento?: true
    dataAbertura?: true
    sede?: true
    repNome?: true
    repCpf?: true
    emailEntidade?: true
    telefone?: true
    formaChapa?: true
    cnpjChapa?: true
    candidaturaId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type OrganizacaoCandidataCountAggregateInputType = {
    id?: true
    razaoSocial?: true
    cnpj?: true
    segmento?: true
    dataAbertura?: true
    sede?: true
    repNome?: true
    repCpf?: true
    emailEntidade?: true
    telefone?: true
    formaChapa?: true
    cnpjChapa?: true
    candidaturaId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type OrganizacaoCandidataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizacaoCandidata to aggregate.
     */
    where?: OrganizacaoCandidataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizacaoCandidata to fetch.
     */
    orderBy?: OrganizacaoCandidataOrderByWithRelationInput | OrganizacaoCandidataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizacaoCandidataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizacaoCandidata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizacaoCandidata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizacaoCandidata
    **/
    _count?: true | OrganizacaoCandidataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizacaoCandidataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizacaoCandidataMaxAggregateInputType
  }

  export type GetOrganizacaoCandidataAggregateType<T extends OrganizacaoCandidataAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizacaoCandidata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizacaoCandidata[P]>
      : GetScalarType<T[P], AggregateOrganizacaoCandidata[P]>
  }




  export type OrganizacaoCandidataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizacaoCandidataWhereInput
    orderBy?: OrganizacaoCandidataOrderByWithAggregationInput | OrganizacaoCandidataOrderByWithAggregationInput[]
    by: OrganizacaoCandidataScalarFieldEnum[] | OrganizacaoCandidataScalarFieldEnum
    having?: OrganizacaoCandidataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizacaoCandidataCountAggregateInputType | true
    _min?: OrganizacaoCandidataMinAggregateInputType
    _max?: OrganizacaoCandidataMaxAggregateInputType
  }

  export type OrganizacaoCandidataGroupByOutputType = {
    id: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date
    sede: string
    repNome: string
    repCpf: string
    emailEntidade: string
    telefone: string | null
    formaChapa: boolean
    cnpjChapa: string | null
    candidaturaId: string
    criadoEm: Date
    atualizadoEm: Date
    _count: OrganizacaoCandidataCountAggregateOutputType | null
    _min: OrganizacaoCandidataMinAggregateOutputType | null
    _max: OrganizacaoCandidataMaxAggregateOutputType | null
  }

  type GetOrganizacaoCandidataGroupByPayload<T extends OrganizacaoCandidataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizacaoCandidataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizacaoCandidataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizacaoCandidataGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizacaoCandidataGroupByOutputType[P]>
        }
      >
    >


  export type OrganizacaoCandidataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    segmento?: boolean
    dataAbertura?: boolean
    sede?: boolean
    repNome?: boolean
    repCpf?: boolean
    emailEntidade?: boolean
    telefone?: boolean
    formaChapa?: boolean
    cnpjChapa?: boolean
    candidaturaId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    candidatura?: boolean | CandidaturaDefaultArgs<ExtArgs>
    arquivos?: boolean | OrganizacaoCandidata$arquivosArgs<ExtArgs>
    _count?: boolean | OrganizacaoCandidataCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizacaoCandidata"]>



  export type OrganizacaoCandidataSelectScalar = {
    id?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    segmento?: boolean
    dataAbertura?: boolean
    sede?: boolean
    repNome?: boolean
    repCpf?: boolean
    emailEntidade?: boolean
    telefone?: boolean
    formaChapa?: boolean
    cnpjChapa?: boolean
    candidaturaId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type OrganizacaoCandidataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "razaoSocial" | "cnpj" | "segmento" | "dataAbertura" | "sede" | "repNome" | "repCpf" | "emailEntidade" | "telefone" | "formaChapa" | "cnpjChapa" | "candidaturaId" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["organizacaoCandidata"]>
  export type OrganizacaoCandidataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidatura?: boolean | CandidaturaDefaultArgs<ExtArgs>
    arquivos?: boolean | OrganizacaoCandidata$arquivosArgs<ExtArgs>
    _count?: boolean | OrganizacaoCandidataCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrganizacaoCandidataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizacaoCandidata"
    objects: {
      candidatura: Prisma.$CandidaturaPayload<ExtArgs>
      arquivos: Prisma.$ArquivoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      razaoSocial: string
      cnpj: string
      segmento: $Enums.Segmento
      dataAbertura: Date
      sede: string
      repNome: string
      repCpf: string
      emailEntidade: string
      telefone: string | null
      formaChapa: boolean
      cnpjChapa: string | null
      candidaturaId: string
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["organizacaoCandidata"]>
    composites: {}
  }

  type OrganizacaoCandidataGetPayload<S extends boolean | null | undefined | OrganizacaoCandidataDefaultArgs> = $Result.GetResult<Prisma.$OrganizacaoCandidataPayload, S>

  type OrganizacaoCandidataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizacaoCandidataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizacaoCandidataCountAggregateInputType | true
    }

  export interface OrganizacaoCandidataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizacaoCandidata'], meta: { name: 'OrganizacaoCandidata' } }
    /**
     * Find zero or one OrganizacaoCandidata that matches the filter.
     * @param {OrganizacaoCandidataFindUniqueArgs} args - Arguments to find a OrganizacaoCandidata
     * @example
     * // Get one OrganizacaoCandidata
     * const organizacaoCandidata = await prisma.organizacaoCandidata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizacaoCandidataFindUniqueArgs>(args: SelectSubset<T, OrganizacaoCandidataFindUniqueArgs<ExtArgs>>): Prisma__OrganizacaoCandidataClient<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrganizacaoCandidata that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizacaoCandidataFindUniqueOrThrowArgs} args - Arguments to find a OrganizacaoCandidata
     * @example
     * // Get one OrganizacaoCandidata
     * const organizacaoCandidata = await prisma.organizacaoCandidata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizacaoCandidataFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizacaoCandidataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizacaoCandidataClient<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizacaoCandidata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoCandidataFindFirstArgs} args - Arguments to find a OrganizacaoCandidata
     * @example
     * // Get one OrganizacaoCandidata
     * const organizacaoCandidata = await prisma.organizacaoCandidata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizacaoCandidataFindFirstArgs>(args?: SelectSubset<T, OrganizacaoCandidataFindFirstArgs<ExtArgs>>): Prisma__OrganizacaoCandidataClient<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizacaoCandidata that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoCandidataFindFirstOrThrowArgs} args - Arguments to find a OrganizacaoCandidata
     * @example
     * // Get one OrganizacaoCandidata
     * const organizacaoCandidata = await prisma.organizacaoCandidata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizacaoCandidataFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizacaoCandidataFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizacaoCandidataClient<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrganizacaoCandidata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoCandidataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizacaoCandidata
     * const organizacaoCandidata = await prisma.organizacaoCandidata.findMany()
     * 
     * // Get first 10 OrganizacaoCandidata
     * const organizacaoCandidata = await prisma.organizacaoCandidata.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizacaoCandidataWithIdOnly = await prisma.organizacaoCandidata.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizacaoCandidataFindManyArgs>(args?: SelectSubset<T, OrganizacaoCandidataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrganizacaoCandidata.
     * @param {OrganizacaoCandidataCreateArgs} args - Arguments to create a OrganizacaoCandidata.
     * @example
     * // Create one OrganizacaoCandidata
     * const OrganizacaoCandidata = await prisma.organizacaoCandidata.create({
     *   data: {
     *     // ... data to create a OrganizacaoCandidata
     *   }
     * })
     * 
     */
    create<T extends OrganizacaoCandidataCreateArgs>(args: SelectSubset<T, OrganizacaoCandidataCreateArgs<ExtArgs>>): Prisma__OrganizacaoCandidataClient<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrganizacaoCandidata.
     * @param {OrganizacaoCandidataCreateManyArgs} args - Arguments to create many OrganizacaoCandidata.
     * @example
     * // Create many OrganizacaoCandidata
     * const organizacaoCandidata = await prisma.organizacaoCandidata.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizacaoCandidataCreateManyArgs>(args?: SelectSubset<T, OrganizacaoCandidataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrganizacaoCandidata.
     * @param {OrganizacaoCandidataDeleteArgs} args - Arguments to delete one OrganizacaoCandidata.
     * @example
     * // Delete one OrganizacaoCandidata
     * const OrganizacaoCandidata = await prisma.organizacaoCandidata.delete({
     *   where: {
     *     // ... filter to delete one OrganizacaoCandidata
     *   }
     * })
     * 
     */
    delete<T extends OrganizacaoCandidataDeleteArgs>(args: SelectSubset<T, OrganizacaoCandidataDeleteArgs<ExtArgs>>): Prisma__OrganizacaoCandidataClient<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrganizacaoCandidata.
     * @param {OrganizacaoCandidataUpdateArgs} args - Arguments to update one OrganizacaoCandidata.
     * @example
     * // Update one OrganizacaoCandidata
     * const organizacaoCandidata = await prisma.organizacaoCandidata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizacaoCandidataUpdateArgs>(args: SelectSubset<T, OrganizacaoCandidataUpdateArgs<ExtArgs>>): Prisma__OrganizacaoCandidataClient<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrganizacaoCandidata.
     * @param {OrganizacaoCandidataDeleteManyArgs} args - Arguments to filter OrganizacaoCandidata to delete.
     * @example
     * // Delete a few OrganizacaoCandidata
     * const { count } = await prisma.organizacaoCandidata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizacaoCandidataDeleteManyArgs>(args?: SelectSubset<T, OrganizacaoCandidataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizacaoCandidata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoCandidataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizacaoCandidata
     * const organizacaoCandidata = await prisma.organizacaoCandidata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizacaoCandidataUpdateManyArgs>(args: SelectSubset<T, OrganizacaoCandidataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrganizacaoCandidata.
     * @param {OrganizacaoCandidataUpsertArgs} args - Arguments to update or create a OrganizacaoCandidata.
     * @example
     * // Update or create a OrganizacaoCandidata
     * const organizacaoCandidata = await prisma.organizacaoCandidata.upsert({
     *   create: {
     *     // ... data to create a OrganizacaoCandidata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizacaoCandidata we want to update
     *   }
     * })
     */
    upsert<T extends OrganizacaoCandidataUpsertArgs>(args: SelectSubset<T, OrganizacaoCandidataUpsertArgs<ExtArgs>>): Prisma__OrganizacaoCandidataClient<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrganizacaoCandidata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoCandidataCountArgs} args - Arguments to filter OrganizacaoCandidata to count.
     * @example
     * // Count the number of OrganizacaoCandidata
     * const count = await prisma.organizacaoCandidata.count({
     *   where: {
     *     // ... the filter for the OrganizacaoCandidata we want to count
     *   }
     * })
    **/
    count<T extends OrganizacaoCandidataCountArgs>(
      args?: Subset<T, OrganizacaoCandidataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizacaoCandidataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizacaoCandidata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoCandidataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizacaoCandidataAggregateArgs>(args: Subset<T, OrganizacaoCandidataAggregateArgs>): Prisma.PrismaPromise<GetOrganizacaoCandidataAggregateType<T>>

    /**
     * Group by OrganizacaoCandidata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoCandidataGroupByArgs} args - Group by arguments.
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
      T extends OrganizacaoCandidataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizacaoCandidataGroupByArgs['orderBy'] }
        : { orderBy?: OrganizacaoCandidataGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizacaoCandidataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizacaoCandidataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizacaoCandidata model
   */
  readonly fields: OrganizacaoCandidataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizacaoCandidata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizacaoCandidataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidatura<T extends CandidaturaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidaturaDefaultArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    arquivos<T extends OrganizacaoCandidata$arquivosArgs<ExtArgs> = {}>(args?: Subset<T, OrganizacaoCandidata$arquivosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the OrganizacaoCandidata model
   */
  interface OrganizacaoCandidataFieldRefs {
    readonly id: FieldRef<"OrganizacaoCandidata", 'String'>
    readonly razaoSocial: FieldRef<"OrganizacaoCandidata", 'String'>
    readonly cnpj: FieldRef<"OrganizacaoCandidata", 'String'>
    readonly segmento: FieldRef<"OrganizacaoCandidata", 'Segmento'>
    readonly dataAbertura: FieldRef<"OrganizacaoCandidata", 'DateTime'>
    readonly sede: FieldRef<"OrganizacaoCandidata", 'String'>
    readonly repNome: FieldRef<"OrganizacaoCandidata", 'String'>
    readonly repCpf: FieldRef<"OrganizacaoCandidata", 'String'>
    readonly emailEntidade: FieldRef<"OrganizacaoCandidata", 'String'>
    readonly telefone: FieldRef<"OrganizacaoCandidata", 'String'>
    readonly formaChapa: FieldRef<"OrganizacaoCandidata", 'Boolean'>
    readonly cnpjChapa: FieldRef<"OrganizacaoCandidata", 'String'>
    readonly candidaturaId: FieldRef<"OrganizacaoCandidata", 'String'>
    readonly criadoEm: FieldRef<"OrganizacaoCandidata", 'DateTime'>
    readonly atualizadoEm: FieldRef<"OrganizacaoCandidata", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrganizacaoCandidata findUnique
   */
  export type OrganizacaoCandidataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    /**
     * Filter, which OrganizacaoCandidata to fetch.
     */
    where: OrganizacaoCandidataWhereUniqueInput
  }

  /**
   * OrganizacaoCandidata findUniqueOrThrow
   */
  export type OrganizacaoCandidataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    /**
     * Filter, which OrganizacaoCandidata to fetch.
     */
    where: OrganizacaoCandidataWhereUniqueInput
  }

  /**
   * OrganizacaoCandidata findFirst
   */
  export type OrganizacaoCandidataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    /**
     * Filter, which OrganizacaoCandidata to fetch.
     */
    where?: OrganizacaoCandidataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizacaoCandidata to fetch.
     */
    orderBy?: OrganizacaoCandidataOrderByWithRelationInput | OrganizacaoCandidataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizacaoCandidata.
     */
    cursor?: OrganizacaoCandidataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizacaoCandidata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizacaoCandidata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizacaoCandidata.
     */
    distinct?: OrganizacaoCandidataScalarFieldEnum | OrganizacaoCandidataScalarFieldEnum[]
  }

  /**
   * OrganizacaoCandidata findFirstOrThrow
   */
  export type OrganizacaoCandidataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    /**
     * Filter, which OrganizacaoCandidata to fetch.
     */
    where?: OrganizacaoCandidataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizacaoCandidata to fetch.
     */
    orderBy?: OrganizacaoCandidataOrderByWithRelationInput | OrganizacaoCandidataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizacaoCandidata.
     */
    cursor?: OrganizacaoCandidataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizacaoCandidata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizacaoCandidata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizacaoCandidata.
     */
    distinct?: OrganizacaoCandidataScalarFieldEnum | OrganizacaoCandidataScalarFieldEnum[]
  }

  /**
   * OrganizacaoCandidata findMany
   */
  export type OrganizacaoCandidataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    /**
     * Filter, which OrganizacaoCandidata to fetch.
     */
    where?: OrganizacaoCandidataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizacaoCandidata to fetch.
     */
    orderBy?: OrganizacaoCandidataOrderByWithRelationInput | OrganizacaoCandidataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizacaoCandidata.
     */
    cursor?: OrganizacaoCandidataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizacaoCandidata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizacaoCandidata.
     */
    skip?: number
    distinct?: OrganizacaoCandidataScalarFieldEnum | OrganizacaoCandidataScalarFieldEnum[]
  }

  /**
   * OrganizacaoCandidata create
   */
  export type OrganizacaoCandidataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizacaoCandidata.
     */
    data: XOR<OrganizacaoCandidataCreateInput, OrganizacaoCandidataUncheckedCreateInput>
  }

  /**
   * OrganizacaoCandidata createMany
   */
  export type OrganizacaoCandidataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizacaoCandidata.
     */
    data: OrganizacaoCandidataCreateManyInput | OrganizacaoCandidataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizacaoCandidata update
   */
  export type OrganizacaoCandidataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizacaoCandidata.
     */
    data: XOR<OrganizacaoCandidataUpdateInput, OrganizacaoCandidataUncheckedUpdateInput>
    /**
     * Choose, which OrganizacaoCandidata to update.
     */
    where: OrganizacaoCandidataWhereUniqueInput
  }

  /**
   * OrganizacaoCandidata updateMany
   */
  export type OrganizacaoCandidataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizacaoCandidata.
     */
    data: XOR<OrganizacaoCandidataUpdateManyMutationInput, OrganizacaoCandidataUncheckedUpdateManyInput>
    /**
     * Filter which OrganizacaoCandidata to update
     */
    where?: OrganizacaoCandidataWhereInput
    /**
     * Limit how many OrganizacaoCandidata to update.
     */
    limit?: number
  }

  /**
   * OrganizacaoCandidata upsert
   */
  export type OrganizacaoCandidataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizacaoCandidata to update in case it exists.
     */
    where: OrganizacaoCandidataWhereUniqueInput
    /**
     * In case the OrganizacaoCandidata found by the `where` argument doesn't exist, create a new OrganizacaoCandidata with this data.
     */
    create: XOR<OrganizacaoCandidataCreateInput, OrganizacaoCandidataUncheckedCreateInput>
    /**
     * In case the OrganizacaoCandidata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizacaoCandidataUpdateInput, OrganizacaoCandidataUncheckedUpdateInput>
  }

  /**
   * OrganizacaoCandidata delete
   */
  export type OrganizacaoCandidataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    /**
     * Filter which OrganizacaoCandidata to delete.
     */
    where: OrganizacaoCandidataWhereUniqueInput
  }

  /**
   * OrganizacaoCandidata deleteMany
   */
  export type OrganizacaoCandidataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizacaoCandidata to delete
     */
    where?: OrganizacaoCandidataWhereInput
    /**
     * Limit how many OrganizacaoCandidata to delete.
     */
    limit?: number
  }

  /**
   * OrganizacaoCandidata.arquivos
   */
  export type OrganizacaoCandidata$arquivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    where?: ArquivoWhereInput
    orderBy?: ArquivoOrderByWithRelationInput | ArquivoOrderByWithRelationInput[]
    cursor?: ArquivoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArquivoScalarFieldEnum | ArquivoScalarFieldEnum[]
  }

  /**
   * OrganizacaoCandidata without action
   */
  export type OrganizacaoCandidataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
  }


  /**
   * Model Candidato
   */

  export type AggregateCandidato = {
    _count: CandidatoCountAggregateOutputType | null
    _min: CandidatoMinAggregateOutputType | null
    _max: CandidatoMaxAggregateOutputType | null
  }

  export type CandidatoMinAggregateOutputType = {
    id: string | null
    tipoCandidato: $Enums.TipoCandidato | null
    nome: string | null
    nomeSocial: string | null
    nomeEmpresa: string | null
    genero: $Enums.Genero | null
    dataNascimento: Date | null
    cpf: string | null
    tituloEleitor: string | null
    domicilioEleitoral: string | null
    email: string | null
    telefone: string | null
    candidaturaId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CandidatoMaxAggregateOutputType = {
    id: string | null
    tipoCandidato: $Enums.TipoCandidato | null
    nome: string | null
    nomeSocial: string | null
    nomeEmpresa: string | null
    genero: $Enums.Genero | null
    dataNascimento: Date | null
    cpf: string | null
    tituloEleitor: string | null
    domicilioEleitoral: string | null
    email: string | null
    telefone: string | null
    candidaturaId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CandidatoCountAggregateOutputType = {
    id: number
    tipoCandidato: number
    nome: number
    nomeSocial: number
    nomeEmpresa: number
    genero: number
    dataNascimento: number
    cpf: number
    tituloEleitor: number
    domicilioEleitoral: number
    email: number
    telefone: number
    candidaturaId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type CandidatoMinAggregateInputType = {
    id?: true
    tipoCandidato?: true
    nome?: true
    nomeSocial?: true
    nomeEmpresa?: true
    genero?: true
    dataNascimento?: true
    cpf?: true
    tituloEleitor?: true
    domicilioEleitoral?: true
    email?: true
    telefone?: true
    candidaturaId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CandidatoMaxAggregateInputType = {
    id?: true
    tipoCandidato?: true
    nome?: true
    nomeSocial?: true
    nomeEmpresa?: true
    genero?: true
    dataNascimento?: true
    cpf?: true
    tituloEleitor?: true
    domicilioEleitoral?: true
    email?: true
    telefone?: true
    candidaturaId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CandidatoCountAggregateInputType = {
    id?: true
    tipoCandidato?: true
    nome?: true
    nomeSocial?: true
    nomeEmpresa?: true
    genero?: true
    dataNascimento?: true
    cpf?: true
    tituloEleitor?: true
    domicilioEleitoral?: true
    email?: true
    telefone?: true
    candidaturaId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type CandidatoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidato to aggregate.
     */
    where?: CandidatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidatoes to fetch.
     */
    orderBy?: CandidatoOrderByWithRelationInput | CandidatoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandidatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidatoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidatoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Candidatoes
    **/
    _count?: true | CandidatoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandidatoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandidatoMaxAggregateInputType
  }

  export type GetCandidatoAggregateType<T extends CandidatoAggregateArgs> = {
        [P in keyof T & keyof AggregateCandidato]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandidato[P]>
      : GetScalarType<T[P], AggregateCandidato[P]>
  }




  export type CandidatoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidatoWhereInput
    orderBy?: CandidatoOrderByWithAggregationInput | CandidatoOrderByWithAggregationInput[]
    by: CandidatoScalarFieldEnum[] | CandidatoScalarFieldEnum
    having?: CandidatoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandidatoCountAggregateInputType | true
    _min?: CandidatoMinAggregateInputType
    _max?: CandidatoMaxAggregateInputType
  }

  export type CandidatoGroupByOutputType = {
    id: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial: string | null
    nomeEmpresa: string | null
    genero: $Enums.Genero
    dataNascimento: Date
    cpf: string
    tituloEleitor: string | null
    domicilioEleitoral: string | null
    email: string
    telefone: string | null
    candidaturaId: string
    criadoEm: Date
    atualizadoEm: Date
    _count: CandidatoCountAggregateOutputType | null
    _min: CandidatoMinAggregateOutputType | null
    _max: CandidatoMaxAggregateOutputType | null
  }

  type GetCandidatoGroupByPayload<T extends CandidatoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandidatoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandidatoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandidatoGroupByOutputType[P]>
            : GetScalarType<T[P], CandidatoGroupByOutputType[P]>
        }
      >
    >


  export type CandidatoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipoCandidato?: boolean
    nome?: boolean
    nomeSocial?: boolean
    nomeEmpresa?: boolean
    genero?: boolean
    dataNascimento?: boolean
    cpf?: boolean
    tituloEleitor?: boolean
    domicilioEleitoral?: boolean
    email?: boolean
    telefone?: boolean
    candidaturaId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    candidatura?: boolean | CandidaturaDefaultArgs<ExtArgs>
    arquivos?: boolean | Candidato$arquivosArgs<ExtArgs>
    eleitor?: boolean | Candidato$eleitorArgs<ExtArgs>
    _count?: boolean | CandidatoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidato"]>



  export type CandidatoSelectScalar = {
    id?: boolean
    tipoCandidato?: boolean
    nome?: boolean
    nomeSocial?: boolean
    nomeEmpresa?: boolean
    genero?: boolean
    dataNascimento?: boolean
    cpf?: boolean
    tituloEleitor?: boolean
    domicilioEleitoral?: boolean
    email?: boolean
    telefone?: boolean
    candidaturaId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type CandidatoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipoCandidato" | "nome" | "nomeSocial" | "nomeEmpresa" | "genero" | "dataNascimento" | "cpf" | "tituloEleitor" | "domicilioEleitoral" | "email" | "telefone" | "candidaturaId" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["candidato"]>
  export type CandidatoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidatura?: boolean | CandidaturaDefaultArgs<ExtArgs>
    arquivos?: boolean | Candidato$arquivosArgs<ExtArgs>
    eleitor?: boolean | Candidato$eleitorArgs<ExtArgs>
    _count?: boolean | CandidatoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CandidatoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Candidato"
    objects: {
      candidatura: Prisma.$CandidaturaPayload<ExtArgs>
      arquivos: Prisma.$ArquivoPayload<ExtArgs>[]
      eleitor: Prisma.$EleitorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipoCandidato: $Enums.TipoCandidato
      nome: string
      nomeSocial: string | null
      nomeEmpresa: string | null
      genero: $Enums.Genero
      dataNascimento: Date
      cpf: string
      tituloEleitor: string | null
      domicilioEleitoral: string | null
      email: string
      telefone: string | null
      candidaturaId: string
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["candidato"]>
    composites: {}
  }

  type CandidatoGetPayload<S extends boolean | null | undefined | CandidatoDefaultArgs> = $Result.GetResult<Prisma.$CandidatoPayload, S>

  type CandidatoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CandidatoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandidatoCountAggregateInputType | true
    }

  export interface CandidatoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Candidato'], meta: { name: 'Candidato' } }
    /**
     * Find zero or one Candidato that matches the filter.
     * @param {CandidatoFindUniqueArgs} args - Arguments to find a Candidato
     * @example
     * // Get one Candidato
     * const candidato = await prisma.candidato.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandidatoFindUniqueArgs>(args: SelectSubset<T, CandidatoFindUniqueArgs<ExtArgs>>): Prisma__CandidatoClient<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Candidato that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CandidatoFindUniqueOrThrowArgs} args - Arguments to find a Candidato
     * @example
     * // Get one Candidato
     * const candidato = await prisma.candidato.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandidatoFindUniqueOrThrowArgs>(args: SelectSubset<T, CandidatoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandidatoClient<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidato that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidatoFindFirstArgs} args - Arguments to find a Candidato
     * @example
     * // Get one Candidato
     * const candidato = await prisma.candidato.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandidatoFindFirstArgs>(args?: SelectSubset<T, CandidatoFindFirstArgs<ExtArgs>>): Prisma__CandidatoClient<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidato that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidatoFindFirstOrThrowArgs} args - Arguments to find a Candidato
     * @example
     * // Get one Candidato
     * const candidato = await prisma.candidato.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandidatoFindFirstOrThrowArgs>(args?: SelectSubset<T, CandidatoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandidatoClient<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Candidatoes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidatoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Candidatoes
     * const candidatoes = await prisma.candidato.findMany()
     * 
     * // Get first 10 Candidatoes
     * const candidatoes = await prisma.candidato.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candidatoWithIdOnly = await prisma.candidato.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandidatoFindManyArgs>(args?: SelectSubset<T, CandidatoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Candidato.
     * @param {CandidatoCreateArgs} args - Arguments to create a Candidato.
     * @example
     * // Create one Candidato
     * const Candidato = await prisma.candidato.create({
     *   data: {
     *     // ... data to create a Candidato
     *   }
     * })
     * 
     */
    create<T extends CandidatoCreateArgs>(args: SelectSubset<T, CandidatoCreateArgs<ExtArgs>>): Prisma__CandidatoClient<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Candidatoes.
     * @param {CandidatoCreateManyArgs} args - Arguments to create many Candidatoes.
     * @example
     * // Create many Candidatoes
     * const candidato = await prisma.candidato.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandidatoCreateManyArgs>(args?: SelectSubset<T, CandidatoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Candidato.
     * @param {CandidatoDeleteArgs} args - Arguments to delete one Candidato.
     * @example
     * // Delete one Candidato
     * const Candidato = await prisma.candidato.delete({
     *   where: {
     *     // ... filter to delete one Candidato
     *   }
     * })
     * 
     */
    delete<T extends CandidatoDeleteArgs>(args: SelectSubset<T, CandidatoDeleteArgs<ExtArgs>>): Prisma__CandidatoClient<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Candidato.
     * @param {CandidatoUpdateArgs} args - Arguments to update one Candidato.
     * @example
     * // Update one Candidato
     * const candidato = await prisma.candidato.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandidatoUpdateArgs>(args: SelectSubset<T, CandidatoUpdateArgs<ExtArgs>>): Prisma__CandidatoClient<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Candidatoes.
     * @param {CandidatoDeleteManyArgs} args - Arguments to filter Candidatoes to delete.
     * @example
     * // Delete a few Candidatoes
     * const { count } = await prisma.candidato.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandidatoDeleteManyArgs>(args?: SelectSubset<T, CandidatoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidatoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidatoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Candidatoes
     * const candidato = await prisma.candidato.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandidatoUpdateManyArgs>(args: SelectSubset<T, CandidatoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Candidato.
     * @param {CandidatoUpsertArgs} args - Arguments to update or create a Candidato.
     * @example
     * // Update or create a Candidato
     * const candidato = await prisma.candidato.upsert({
     *   create: {
     *     // ... data to create a Candidato
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Candidato we want to update
     *   }
     * })
     */
    upsert<T extends CandidatoUpsertArgs>(args: SelectSubset<T, CandidatoUpsertArgs<ExtArgs>>): Prisma__CandidatoClient<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Candidatoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidatoCountArgs} args - Arguments to filter Candidatoes to count.
     * @example
     * // Count the number of Candidatoes
     * const count = await prisma.candidato.count({
     *   where: {
     *     // ... the filter for the Candidatoes we want to count
     *   }
     * })
    **/
    count<T extends CandidatoCountArgs>(
      args?: Subset<T, CandidatoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandidatoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Candidato.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidatoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CandidatoAggregateArgs>(args: Subset<T, CandidatoAggregateArgs>): Prisma.PrismaPromise<GetCandidatoAggregateType<T>>

    /**
     * Group by Candidato.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidatoGroupByArgs} args - Group by arguments.
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
      T extends CandidatoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandidatoGroupByArgs['orderBy'] }
        : { orderBy?: CandidatoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CandidatoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandidatoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Candidato model
   */
  readonly fields: CandidatoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Candidato.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandidatoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidatura<T extends CandidaturaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidaturaDefaultArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    arquivos<T extends Candidato$arquivosArgs<ExtArgs> = {}>(args?: Subset<T, Candidato$arquivosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    eleitor<T extends Candidato$eleitorArgs<ExtArgs> = {}>(args?: Subset<T, Candidato$eleitorArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Candidato model
   */
  interface CandidatoFieldRefs {
    readonly id: FieldRef<"Candidato", 'String'>
    readonly tipoCandidato: FieldRef<"Candidato", 'TipoCandidato'>
    readonly nome: FieldRef<"Candidato", 'String'>
    readonly nomeSocial: FieldRef<"Candidato", 'String'>
    readonly nomeEmpresa: FieldRef<"Candidato", 'String'>
    readonly genero: FieldRef<"Candidato", 'Genero'>
    readonly dataNascimento: FieldRef<"Candidato", 'DateTime'>
    readonly cpf: FieldRef<"Candidato", 'String'>
    readonly tituloEleitor: FieldRef<"Candidato", 'String'>
    readonly domicilioEleitoral: FieldRef<"Candidato", 'String'>
    readonly email: FieldRef<"Candidato", 'String'>
    readonly telefone: FieldRef<"Candidato", 'String'>
    readonly candidaturaId: FieldRef<"Candidato", 'String'>
    readonly criadoEm: FieldRef<"Candidato", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Candidato", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Candidato findUnique
   */
  export type CandidatoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    /**
     * Filter, which Candidato to fetch.
     */
    where: CandidatoWhereUniqueInput
  }

  /**
   * Candidato findUniqueOrThrow
   */
  export type CandidatoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    /**
     * Filter, which Candidato to fetch.
     */
    where: CandidatoWhereUniqueInput
  }

  /**
   * Candidato findFirst
   */
  export type CandidatoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    /**
     * Filter, which Candidato to fetch.
     */
    where?: CandidatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidatoes to fetch.
     */
    orderBy?: CandidatoOrderByWithRelationInput | CandidatoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidatoes.
     */
    cursor?: CandidatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidatoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidatoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidatoes.
     */
    distinct?: CandidatoScalarFieldEnum | CandidatoScalarFieldEnum[]
  }

  /**
   * Candidato findFirstOrThrow
   */
  export type CandidatoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    /**
     * Filter, which Candidato to fetch.
     */
    where?: CandidatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidatoes to fetch.
     */
    orderBy?: CandidatoOrderByWithRelationInput | CandidatoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidatoes.
     */
    cursor?: CandidatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidatoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidatoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidatoes.
     */
    distinct?: CandidatoScalarFieldEnum | CandidatoScalarFieldEnum[]
  }

  /**
   * Candidato findMany
   */
  export type CandidatoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    /**
     * Filter, which Candidatoes to fetch.
     */
    where?: CandidatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidatoes to fetch.
     */
    orderBy?: CandidatoOrderByWithRelationInput | CandidatoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Candidatoes.
     */
    cursor?: CandidatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidatoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidatoes.
     */
    skip?: number
    distinct?: CandidatoScalarFieldEnum | CandidatoScalarFieldEnum[]
  }

  /**
   * Candidato create
   */
  export type CandidatoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    /**
     * The data needed to create a Candidato.
     */
    data: XOR<CandidatoCreateInput, CandidatoUncheckedCreateInput>
  }

  /**
   * Candidato createMany
   */
  export type CandidatoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Candidatoes.
     */
    data: CandidatoCreateManyInput | CandidatoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Candidato update
   */
  export type CandidatoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    /**
     * The data needed to update a Candidato.
     */
    data: XOR<CandidatoUpdateInput, CandidatoUncheckedUpdateInput>
    /**
     * Choose, which Candidato to update.
     */
    where: CandidatoWhereUniqueInput
  }

  /**
   * Candidato updateMany
   */
  export type CandidatoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Candidatoes.
     */
    data: XOR<CandidatoUpdateManyMutationInput, CandidatoUncheckedUpdateManyInput>
    /**
     * Filter which Candidatoes to update
     */
    where?: CandidatoWhereInput
    /**
     * Limit how many Candidatoes to update.
     */
    limit?: number
  }

  /**
   * Candidato upsert
   */
  export type CandidatoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    /**
     * The filter to search for the Candidato to update in case it exists.
     */
    where: CandidatoWhereUniqueInput
    /**
     * In case the Candidato found by the `where` argument doesn't exist, create a new Candidato with this data.
     */
    create: XOR<CandidatoCreateInput, CandidatoUncheckedCreateInput>
    /**
     * In case the Candidato was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandidatoUpdateInput, CandidatoUncheckedUpdateInput>
  }

  /**
   * Candidato delete
   */
  export type CandidatoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    /**
     * Filter which Candidato to delete.
     */
    where: CandidatoWhereUniqueInput
  }

  /**
   * Candidato deleteMany
   */
  export type CandidatoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidatoes to delete
     */
    where?: CandidatoWhereInput
    /**
     * Limit how many Candidatoes to delete.
     */
    limit?: number
  }

  /**
   * Candidato.arquivos
   */
  export type Candidato$arquivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    where?: ArquivoWhereInput
    orderBy?: ArquivoOrderByWithRelationInput | ArquivoOrderByWithRelationInput[]
    cursor?: ArquivoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArquivoScalarFieldEnum | ArquivoScalarFieldEnum[]
  }

  /**
   * Candidato.eleitor
   */
  export type Candidato$eleitorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    where?: EleitorWhereInput
  }

  /**
   * Candidato without action
   */
  export type CandidatoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
  }


  /**
   * Model Eleitor
   */

  export type AggregateEleitor = {
    _count: EleitorCountAggregateOutputType | null
    _min: EleitorMinAggregateOutputType | null
    _max: EleitorMaxAggregateOutputType | null
  }

  export type EleitorMinAggregateOutputType = {
    id: string | null
    status: $Enums.Status | null
    oculto: boolean | null
    usuarioId: string | null
    candidatoId: string | null
    eleitorPaiId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type EleitorMaxAggregateOutputType = {
    id: string | null
    status: $Enums.Status | null
    oculto: boolean | null
    usuarioId: string | null
    candidatoId: string | null
    eleitorPaiId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type EleitorCountAggregateOutputType = {
    id: number
    status: number
    oculto: number
    usuarioId: number
    candidatoId: number
    eleitorPaiId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type EleitorMinAggregateInputType = {
    id?: true
    status?: true
    oculto?: true
    usuarioId?: true
    candidatoId?: true
    eleitorPaiId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type EleitorMaxAggregateInputType = {
    id?: true
    status?: true
    oculto?: true
    usuarioId?: true
    candidatoId?: true
    eleitorPaiId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type EleitorCountAggregateInputType = {
    id?: true
    status?: true
    oculto?: true
    usuarioId?: true
    candidatoId?: true
    eleitorPaiId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type EleitorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Eleitor to aggregate.
     */
    where?: EleitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eleitors to fetch.
     */
    orderBy?: EleitorOrderByWithRelationInput | EleitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EleitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eleitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eleitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Eleitors
    **/
    _count?: true | EleitorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EleitorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EleitorMaxAggregateInputType
  }

  export type GetEleitorAggregateType<T extends EleitorAggregateArgs> = {
        [P in keyof T & keyof AggregateEleitor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEleitor[P]>
      : GetScalarType<T[P], AggregateEleitor[P]>
  }




  export type EleitorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EleitorWhereInput
    orderBy?: EleitorOrderByWithAggregationInput | EleitorOrderByWithAggregationInput[]
    by: EleitorScalarFieldEnum[] | EleitorScalarFieldEnum
    having?: EleitorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EleitorCountAggregateInputType | true
    _min?: EleitorMinAggregateInputType
    _max?: EleitorMaxAggregateInputType
  }

  export type EleitorGroupByOutputType = {
    id: string
    status: $Enums.Status
    oculto: boolean
    usuarioId: string | null
    candidatoId: string | null
    eleitorPaiId: string | null
    criadoEm: Date
    atualizadoEm: Date
    _count: EleitorCountAggregateOutputType | null
    _min: EleitorMinAggregateOutputType | null
    _max: EleitorMaxAggregateOutputType | null
  }

  type GetEleitorGroupByPayload<T extends EleitorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EleitorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EleitorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EleitorGroupByOutputType[P]>
            : GetScalarType<T[P], EleitorGroupByOutputType[P]>
        }
      >
    >


  export type EleitorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    oculto?: boolean
    usuarioId?: boolean
    candidatoId?: boolean
    eleitorPaiId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | Eleitor$usuarioArgs<ExtArgs>
    candidato?: boolean | Eleitor$candidatoArgs<ExtArgs>
    eleitorPai?: boolean | Eleitor$eleitorPaiArgs<ExtArgs>
    membros?: boolean | Eleitor$membrosArgs<ExtArgs>
    organizacao?: boolean | Eleitor$organizacaoArgs<ExtArgs>
    procurador?: boolean | Eleitor$procuradorArgs<ExtArgs>
    arquivos?: boolean | Eleitor$arquivosArgs<ExtArgs>
    _count?: boolean | EleitorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eleitor"]>



  export type EleitorSelectScalar = {
    id?: boolean
    status?: boolean
    oculto?: boolean
    usuarioId?: boolean
    candidatoId?: boolean
    eleitorPaiId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type EleitorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "oculto" | "usuarioId" | "candidatoId" | "eleitorPaiId" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["eleitor"]>
  export type EleitorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | Eleitor$usuarioArgs<ExtArgs>
    candidato?: boolean | Eleitor$candidatoArgs<ExtArgs>
    eleitorPai?: boolean | Eleitor$eleitorPaiArgs<ExtArgs>
    membros?: boolean | Eleitor$membrosArgs<ExtArgs>
    organizacao?: boolean | Eleitor$organizacaoArgs<ExtArgs>
    procurador?: boolean | Eleitor$procuradorArgs<ExtArgs>
    arquivos?: boolean | Eleitor$arquivosArgs<ExtArgs>
    _count?: boolean | EleitorCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EleitorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Eleitor"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs> | null
      candidato: Prisma.$CandidatoPayload<ExtArgs> | null
      eleitorPai: Prisma.$EleitorPayload<ExtArgs> | null
      membros: Prisma.$EleitorPayload<ExtArgs>[]
      organizacao: Prisma.$OrganizacaoEleitoraPayload<ExtArgs> | null
      procurador: Prisma.$ProcuradorPayload<ExtArgs> | null
      arquivos: Prisma.$ArquivoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.Status
      oculto: boolean
      usuarioId: string | null
      candidatoId: string | null
      eleitorPaiId: string | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["eleitor"]>
    composites: {}
  }

  type EleitorGetPayload<S extends boolean | null | undefined | EleitorDefaultArgs> = $Result.GetResult<Prisma.$EleitorPayload, S>

  type EleitorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EleitorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EleitorCountAggregateInputType | true
    }

  export interface EleitorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Eleitor'], meta: { name: 'Eleitor' } }
    /**
     * Find zero or one Eleitor that matches the filter.
     * @param {EleitorFindUniqueArgs} args - Arguments to find a Eleitor
     * @example
     * // Get one Eleitor
     * const eleitor = await prisma.eleitor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EleitorFindUniqueArgs>(args: SelectSubset<T, EleitorFindUniqueArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Eleitor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EleitorFindUniqueOrThrowArgs} args - Arguments to find a Eleitor
     * @example
     * // Get one Eleitor
     * const eleitor = await prisma.eleitor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EleitorFindUniqueOrThrowArgs>(args: SelectSubset<T, EleitorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Eleitor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EleitorFindFirstArgs} args - Arguments to find a Eleitor
     * @example
     * // Get one Eleitor
     * const eleitor = await prisma.eleitor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EleitorFindFirstArgs>(args?: SelectSubset<T, EleitorFindFirstArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Eleitor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EleitorFindFirstOrThrowArgs} args - Arguments to find a Eleitor
     * @example
     * // Get one Eleitor
     * const eleitor = await prisma.eleitor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EleitorFindFirstOrThrowArgs>(args?: SelectSubset<T, EleitorFindFirstOrThrowArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Eleitors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EleitorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eleitors
     * const eleitors = await prisma.eleitor.findMany()
     * 
     * // Get first 10 Eleitors
     * const eleitors = await prisma.eleitor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eleitorWithIdOnly = await prisma.eleitor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EleitorFindManyArgs>(args?: SelectSubset<T, EleitorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Eleitor.
     * @param {EleitorCreateArgs} args - Arguments to create a Eleitor.
     * @example
     * // Create one Eleitor
     * const Eleitor = await prisma.eleitor.create({
     *   data: {
     *     // ... data to create a Eleitor
     *   }
     * })
     * 
     */
    create<T extends EleitorCreateArgs>(args: SelectSubset<T, EleitorCreateArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Eleitors.
     * @param {EleitorCreateManyArgs} args - Arguments to create many Eleitors.
     * @example
     * // Create many Eleitors
     * const eleitor = await prisma.eleitor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EleitorCreateManyArgs>(args?: SelectSubset<T, EleitorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Eleitor.
     * @param {EleitorDeleteArgs} args - Arguments to delete one Eleitor.
     * @example
     * // Delete one Eleitor
     * const Eleitor = await prisma.eleitor.delete({
     *   where: {
     *     // ... filter to delete one Eleitor
     *   }
     * })
     * 
     */
    delete<T extends EleitorDeleteArgs>(args: SelectSubset<T, EleitorDeleteArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Eleitor.
     * @param {EleitorUpdateArgs} args - Arguments to update one Eleitor.
     * @example
     * // Update one Eleitor
     * const eleitor = await prisma.eleitor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EleitorUpdateArgs>(args: SelectSubset<T, EleitorUpdateArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Eleitors.
     * @param {EleitorDeleteManyArgs} args - Arguments to filter Eleitors to delete.
     * @example
     * // Delete a few Eleitors
     * const { count } = await prisma.eleitor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EleitorDeleteManyArgs>(args?: SelectSubset<T, EleitorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eleitors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EleitorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eleitors
     * const eleitor = await prisma.eleitor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EleitorUpdateManyArgs>(args: SelectSubset<T, EleitorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Eleitor.
     * @param {EleitorUpsertArgs} args - Arguments to update or create a Eleitor.
     * @example
     * // Update or create a Eleitor
     * const eleitor = await prisma.eleitor.upsert({
     *   create: {
     *     // ... data to create a Eleitor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Eleitor we want to update
     *   }
     * })
     */
    upsert<T extends EleitorUpsertArgs>(args: SelectSubset<T, EleitorUpsertArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Eleitors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EleitorCountArgs} args - Arguments to filter Eleitors to count.
     * @example
     * // Count the number of Eleitors
     * const count = await prisma.eleitor.count({
     *   where: {
     *     // ... the filter for the Eleitors we want to count
     *   }
     * })
    **/
    count<T extends EleitorCountArgs>(
      args?: Subset<T, EleitorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EleitorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Eleitor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EleitorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EleitorAggregateArgs>(args: Subset<T, EleitorAggregateArgs>): Prisma.PrismaPromise<GetEleitorAggregateType<T>>

    /**
     * Group by Eleitor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EleitorGroupByArgs} args - Group by arguments.
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
      T extends EleitorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EleitorGroupByArgs['orderBy'] }
        : { orderBy?: EleitorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EleitorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEleitorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Eleitor model
   */
  readonly fields: EleitorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Eleitor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EleitorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends Eleitor$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, Eleitor$usuarioArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    candidato<T extends Eleitor$candidatoArgs<ExtArgs> = {}>(args?: Subset<T, Eleitor$candidatoArgs<ExtArgs>>): Prisma__CandidatoClient<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    eleitorPai<T extends Eleitor$eleitorPaiArgs<ExtArgs> = {}>(args?: Subset<T, Eleitor$eleitorPaiArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    membros<T extends Eleitor$membrosArgs<ExtArgs> = {}>(args?: Subset<T, Eleitor$membrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    organizacao<T extends Eleitor$organizacaoArgs<ExtArgs> = {}>(args?: Subset<T, Eleitor$organizacaoArgs<ExtArgs>>): Prisma__OrganizacaoEleitoraClient<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    procurador<T extends Eleitor$procuradorArgs<ExtArgs> = {}>(args?: Subset<T, Eleitor$procuradorArgs<ExtArgs>>): Prisma__ProcuradorClient<$Result.GetResult<Prisma.$ProcuradorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    arquivos<T extends Eleitor$arquivosArgs<ExtArgs> = {}>(args?: Subset<T, Eleitor$arquivosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Eleitor model
   */
  interface EleitorFieldRefs {
    readonly id: FieldRef<"Eleitor", 'String'>
    readonly status: FieldRef<"Eleitor", 'Status'>
    readonly oculto: FieldRef<"Eleitor", 'Boolean'>
    readonly usuarioId: FieldRef<"Eleitor", 'String'>
    readonly candidatoId: FieldRef<"Eleitor", 'String'>
    readonly eleitorPaiId: FieldRef<"Eleitor", 'String'>
    readonly criadoEm: FieldRef<"Eleitor", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Eleitor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Eleitor findUnique
   */
  export type EleitorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    /**
     * Filter, which Eleitor to fetch.
     */
    where: EleitorWhereUniqueInput
  }

  /**
   * Eleitor findUniqueOrThrow
   */
  export type EleitorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    /**
     * Filter, which Eleitor to fetch.
     */
    where: EleitorWhereUniqueInput
  }

  /**
   * Eleitor findFirst
   */
  export type EleitorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    /**
     * Filter, which Eleitor to fetch.
     */
    where?: EleitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eleitors to fetch.
     */
    orderBy?: EleitorOrderByWithRelationInput | EleitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eleitors.
     */
    cursor?: EleitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eleitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eleitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eleitors.
     */
    distinct?: EleitorScalarFieldEnum | EleitorScalarFieldEnum[]
  }

  /**
   * Eleitor findFirstOrThrow
   */
  export type EleitorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    /**
     * Filter, which Eleitor to fetch.
     */
    where?: EleitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eleitors to fetch.
     */
    orderBy?: EleitorOrderByWithRelationInput | EleitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eleitors.
     */
    cursor?: EleitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eleitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eleitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eleitors.
     */
    distinct?: EleitorScalarFieldEnum | EleitorScalarFieldEnum[]
  }

  /**
   * Eleitor findMany
   */
  export type EleitorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    /**
     * Filter, which Eleitors to fetch.
     */
    where?: EleitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eleitors to fetch.
     */
    orderBy?: EleitorOrderByWithRelationInput | EleitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Eleitors.
     */
    cursor?: EleitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eleitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eleitors.
     */
    skip?: number
    distinct?: EleitorScalarFieldEnum | EleitorScalarFieldEnum[]
  }

  /**
   * Eleitor create
   */
  export type EleitorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    /**
     * The data needed to create a Eleitor.
     */
    data?: XOR<EleitorCreateInput, EleitorUncheckedCreateInput>
  }

  /**
   * Eleitor createMany
   */
  export type EleitorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Eleitors.
     */
    data: EleitorCreateManyInput | EleitorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Eleitor update
   */
  export type EleitorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    /**
     * The data needed to update a Eleitor.
     */
    data: XOR<EleitorUpdateInput, EleitorUncheckedUpdateInput>
    /**
     * Choose, which Eleitor to update.
     */
    where: EleitorWhereUniqueInput
  }

  /**
   * Eleitor updateMany
   */
  export type EleitorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Eleitors.
     */
    data: XOR<EleitorUpdateManyMutationInput, EleitorUncheckedUpdateManyInput>
    /**
     * Filter which Eleitors to update
     */
    where?: EleitorWhereInput
    /**
     * Limit how many Eleitors to update.
     */
    limit?: number
  }

  /**
   * Eleitor upsert
   */
  export type EleitorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    /**
     * The filter to search for the Eleitor to update in case it exists.
     */
    where: EleitorWhereUniqueInput
    /**
     * In case the Eleitor found by the `where` argument doesn't exist, create a new Eleitor with this data.
     */
    create: XOR<EleitorCreateInput, EleitorUncheckedCreateInput>
    /**
     * In case the Eleitor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EleitorUpdateInput, EleitorUncheckedUpdateInput>
  }

  /**
   * Eleitor delete
   */
  export type EleitorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    /**
     * Filter which Eleitor to delete.
     */
    where: EleitorWhereUniqueInput
  }

  /**
   * Eleitor deleteMany
   */
  export type EleitorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Eleitors to delete
     */
    where?: EleitorWhereInput
    /**
     * Limit how many Eleitors to delete.
     */
    limit?: number
  }

  /**
   * Eleitor.usuario
   */
  export type Eleitor$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * Eleitor.candidato
   */
  export type Eleitor$candidatoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    where?: CandidatoWhereInput
  }

  /**
   * Eleitor.eleitorPai
   */
  export type Eleitor$eleitorPaiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    where?: EleitorWhereInput
  }

  /**
   * Eleitor.membros
   */
  export type Eleitor$membrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    where?: EleitorWhereInput
    orderBy?: EleitorOrderByWithRelationInput | EleitorOrderByWithRelationInput[]
    cursor?: EleitorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EleitorScalarFieldEnum | EleitorScalarFieldEnum[]
  }

  /**
   * Eleitor.organizacao
   */
  export type Eleitor$organizacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    where?: OrganizacaoEleitoraWhereInput
  }

  /**
   * Eleitor.procurador
   */
  export type Eleitor$procuradorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
    where?: ProcuradorWhereInput
  }

  /**
   * Eleitor.arquivos
   */
  export type Eleitor$arquivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    where?: ArquivoWhereInput
    orderBy?: ArquivoOrderByWithRelationInput | ArquivoOrderByWithRelationInput[]
    cursor?: ArquivoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArquivoScalarFieldEnum | ArquivoScalarFieldEnum[]
  }

  /**
   * Eleitor without action
   */
  export type EleitorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
  }


  /**
   * Model OrganizacaoEleitora
   */

  export type AggregateOrganizacaoEleitora = {
    _count: OrganizacaoEleitoraCountAggregateOutputType | null
    _min: OrganizacaoEleitoraMinAggregateOutputType | null
    _max: OrganizacaoEleitoraMaxAggregateOutputType | null
  }

  export type OrganizacaoEleitoraMinAggregateOutputType = {
    id: string | null
    razaoSocial: string | null
    cnpj: string | null
    segmento: $Enums.Segmento | null
    dataAbertura: Date | null
    sede: string | null
    repNome: string | null
    repCpf: string | null
    repTituloEleitor: string | null
    repDomicilio: string | null
    emailEntidade: string | null
    telefone: string | null
    eleitorId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type OrganizacaoEleitoraMaxAggregateOutputType = {
    id: string | null
    razaoSocial: string | null
    cnpj: string | null
    segmento: $Enums.Segmento | null
    dataAbertura: Date | null
    sede: string | null
    repNome: string | null
    repCpf: string | null
    repTituloEleitor: string | null
    repDomicilio: string | null
    emailEntidade: string | null
    telefone: string | null
    eleitorId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type OrganizacaoEleitoraCountAggregateOutputType = {
    id: number
    razaoSocial: number
    cnpj: number
    segmento: number
    dataAbertura: number
    sede: number
    repNome: number
    repCpf: number
    repTituloEleitor: number
    repDomicilio: number
    emailEntidade: number
    telefone: number
    eleitorId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type OrganizacaoEleitoraMinAggregateInputType = {
    id?: true
    razaoSocial?: true
    cnpj?: true
    segmento?: true
    dataAbertura?: true
    sede?: true
    repNome?: true
    repCpf?: true
    repTituloEleitor?: true
    repDomicilio?: true
    emailEntidade?: true
    telefone?: true
    eleitorId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type OrganizacaoEleitoraMaxAggregateInputType = {
    id?: true
    razaoSocial?: true
    cnpj?: true
    segmento?: true
    dataAbertura?: true
    sede?: true
    repNome?: true
    repCpf?: true
    repTituloEleitor?: true
    repDomicilio?: true
    emailEntidade?: true
    telefone?: true
    eleitorId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type OrganizacaoEleitoraCountAggregateInputType = {
    id?: true
    razaoSocial?: true
    cnpj?: true
    segmento?: true
    dataAbertura?: true
    sede?: true
    repNome?: true
    repCpf?: true
    repTituloEleitor?: true
    repDomicilio?: true
    emailEntidade?: true
    telefone?: true
    eleitorId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type OrganizacaoEleitoraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizacaoEleitora to aggregate.
     */
    where?: OrganizacaoEleitoraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizacaoEleitoras to fetch.
     */
    orderBy?: OrganizacaoEleitoraOrderByWithRelationInput | OrganizacaoEleitoraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizacaoEleitoraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizacaoEleitoras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizacaoEleitoras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizacaoEleitoras
    **/
    _count?: true | OrganizacaoEleitoraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizacaoEleitoraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizacaoEleitoraMaxAggregateInputType
  }

  export type GetOrganizacaoEleitoraAggregateType<T extends OrganizacaoEleitoraAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizacaoEleitora]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizacaoEleitora[P]>
      : GetScalarType<T[P], AggregateOrganizacaoEleitora[P]>
  }




  export type OrganizacaoEleitoraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizacaoEleitoraWhereInput
    orderBy?: OrganizacaoEleitoraOrderByWithAggregationInput | OrganizacaoEleitoraOrderByWithAggregationInput[]
    by: OrganizacaoEleitoraScalarFieldEnum[] | OrganizacaoEleitoraScalarFieldEnum
    having?: OrganizacaoEleitoraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizacaoEleitoraCountAggregateInputType | true
    _min?: OrganizacaoEleitoraMinAggregateInputType
    _max?: OrganizacaoEleitoraMaxAggregateInputType
  }

  export type OrganizacaoEleitoraGroupByOutputType = {
    id: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date
    sede: string
    repNome: string
    repCpf: string
    repTituloEleitor: string | null
    repDomicilio: string | null
    emailEntidade: string
    telefone: string | null
    eleitorId: string
    criadoEm: Date
    atualizadoEm: Date
    _count: OrganizacaoEleitoraCountAggregateOutputType | null
    _min: OrganizacaoEleitoraMinAggregateOutputType | null
    _max: OrganizacaoEleitoraMaxAggregateOutputType | null
  }

  type GetOrganizacaoEleitoraGroupByPayload<T extends OrganizacaoEleitoraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizacaoEleitoraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizacaoEleitoraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizacaoEleitoraGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizacaoEleitoraGroupByOutputType[P]>
        }
      >
    >


  export type OrganizacaoEleitoraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    segmento?: boolean
    dataAbertura?: boolean
    sede?: boolean
    repNome?: boolean
    repCpf?: boolean
    repTituloEleitor?: boolean
    repDomicilio?: boolean
    emailEntidade?: boolean
    telefone?: boolean
    eleitorId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    eleitor?: boolean | EleitorDefaultArgs<ExtArgs>
    arquivos?: boolean | OrganizacaoEleitora$arquivosArgs<ExtArgs>
    _count?: boolean | OrganizacaoEleitoraCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizacaoEleitora"]>



  export type OrganizacaoEleitoraSelectScalar = {
    id?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    segmento?: boolean
    dataAbertura?: boolean
    sede?: boolean
    repNome?: boolean
    repCpf?: boolean
    repTituloEleitor?: boolean
    repDomicilio?: boolean
    emailEntidade?: boolean
    telefone?: boolean
    eleitorId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type OrganizacaoEleitoraOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "razaoSocial" | "cnpj" | "segmento" | "dataAbertura" | "sede" | "repNome" | "repCpf" | "repTituloEleitor" | "repDomicilio" | "emailEntidade" | "telefone" | "eleitorId" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["organizacaoEleitora"]>
  export type OrganizacaoEleitoraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eleitor?: boolean | EleitorDefaultArgs<ExtArgs>
    arquivos?: boolean | OrganizacaoEleitora$arquivosArgs<ExtArgs>
    _count?: boolean | OrganizacaoEleitoraCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrganizacaoEleitoraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizacaoEleitora"
    objects: {
      eleitor: Prisma.$EleitorPayload<ExtArgs>
      arquivos: Prisma.$ArquivoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      razaoSocial: string
      cnpj: string
      segmento: $Enums.Segmento
      dataAbertura: Date
      sede: string
      repNome: string
      repCpf: string
      repTituloEleitor: string | null
      repDomicilio: string | null
      emailEntidade: string
      telefone: string | null
      eleitorId: string
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["organizacaoEleitora"]>
    composites: {}
  }

  type OrganizacaoEleitoraGetPayload<S extends boolean | null | undefined | OrganizacaoEleitoraDefaultArgs> = $Result.GetResult<Prisma.$OrganizacaoEleitoraPayload, S>

  type OrganizacaoEleitoraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizacaoEleitoraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizacaoEleitoraCountAggregateInputType | true
    }

  export interface OrganizacaoEleitoraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizacaoEleitora'], meta: { name: 'OrganizacaoEleitora' } }
    /**
     * Find zero or one OrganizacaoEleitora that matches the filter.
     * @param {OrganizacaoEleitoraFindUniqueArgs} args - Arguments to find a OrganizacaoEleitora
     * @example
     * // Get one OrganizacaoEleitora
     * const organizacaoEleitora = await prisma.organizacaoEleitora.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizacaoEleitoraFindUniqueArgs>(args: SelectSubset<T, OrganizacaoEleitoraFindUniqueArgs<ExtArgs>>): Prisma__OrganizacaoEleitoraClient<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrganizacaoEleitora that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizacaoEleitoraFindUniqueOrThrowArgs} args - Arguments to find a OrganizacaoEleitora
     * @example
     * // Get one OrganizacaoEleitora
     * const organizacaoEleitora = await prisma.organizacaoEleitora.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizacaoEleitoraFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizacaoEleitoraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizacaoEleitoraClient<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizacaoEleitora that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoEleitoraFindFirstArgs} args - Arguments to find a OrganizacaoEleitora
     * @example
     * // Get one OrganizacaoEleitora
     * const organizacaoEleitora = await prisma.organizacaoEleitora.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizacaoEleitoraFindFirstArgs>(args?: SelectSubset<T, OrganizacaoEleitoraFindFirstArgs<ExtArgs>>): Prisma__OrganizacaoEleitoraClient<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizacaoEleitora that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoEleitoraFindFirstOrThrowArgs} args - Arguments to find a OrganizacaoEleitora
     * @example
     * // Get one OrganizacaoEleitora
     * const organizacaoEleitora = await prisma.organizacaoEleitora.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizacaoEleitoraFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizacaoEleitoraFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizacaoEleitoraClient<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrganizacaoEleitoras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoEleitoraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizacaoEleitoras
     * const organizacaoEleitoras = await prisma.organizacaoEleitora.findMany()
     * 
     * // Get first 10 OrganizacaoEleitoras
     * const organizacaoEleitoras = await prisma.organizacaoEleitora.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizacaoEleitoraWithIdOnly = await prisma.organizacaoEleitora.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizacaoEleitoraFindManyArgs>(args?: SelectSubset<T, OrganizacaoEleitoraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrganizacaoEleitora.
     * @param {OrganizacaoEleitoraCreateArgs} args - Arguments to create a OrganizacaoEleitora.
     * @example
     * // Create one OrganizacaoEleitora
     * const OrganizacaoEleitora = await prisma.organizacaoEleitora.create({
     *   data: {
     *     // ... data to create a OrganizacaoEleitora
     *   }
     * })
     * 
     */
    create<T extends OrganizacaoEleitoraCreateArgs>(args: SelectSubset<T, OrganizacaoEleitoraCreateArgs<ExtArgs>>): Prisma__OrganizacaoEleitoraClient<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrganizacaoEleitoras.
     * @param {OrganizacaoEleitoraCreateManyArgs} args - Arguments to create many OrganizacaoEleitoras.
     * @example
     * // Create many OrganizacaoEleitoras
     * const organizacaoEleitora = await prisma.organizacaoEleitora.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizacaoEleitoraCreateManyArgs>(args?: SelectSubset<T, OrganizacaoEleitoraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrganizacaoEleitora.
     * @param {OrganizacaoEleitoraDeleteArgs} args - Arguments to delete one OrganizacaoEleitora.
     * @example
     * // Delete one OrganizacaoEleitora
     * const OrganizacaoEleitora = await prisma.organizacaoEleitora.delete({
     *   where: {
     *     // ... filter to delete one OrganizacaoEleitora
     *   }
     * })
     * 
     */
    delete<T extends OrganizacaoEleitoraDeleteArgs>(args: SelectSubset<T, OrganizacaoEleitoraDeleteArgs<ExtArgs>>): Prisma__OrganizacaoEleitoraClient<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrganizacaoEleitora.
     * @param {OrganizacaoEleitoraUpdateArgs} args - Arguments to update one OrganizacaoEleitora.
     * @example
     * // Update one OrganizacaoEleitora
     * const organizacaoEleitora = await prisma.organizacaoEleitora.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizacaoEleitoraUpdateArgs>(args: SelectSubset<T, OrganizacaoEleitoraUpdateArgs<ExtArgs>>): Prisma__OrganizacaoEleitoraClient<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrganizacaoEleitoras.
     * @param {OrganizacaoEleitoraDeleteManyArgs} args - Arguments to filter OrganizacaoEleitoras to delete.
     * @example
     * // Delete a few OrganizacaoEleitoras
     * const { count } = await prisma.organizacaoEleitora.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizacaoEleitoraDeleteManyArgs>(args?: SelectSubset<T, OrganizacaoEleitoraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizacaoEleitoras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoEleitoraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizacaoEleitoras
     * const organizacaoEleitora = await prisma.organizacaoEleitora.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizacaoEleitoraUpdateManyArgs>(args: SelectSubset<T, OrganizacaoEleitoraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrganizacaoEleitora.
     * @param {OrganizacaoEleitoraUpsertArgs} args - Arguments to update or create a OrganizacaoEleitora.
     * @example
     * // Update or create a OrganizacaoEleitora
     * const organizacaoEleitora = await prisma.organizacaoEleitora.upsert({
     *   create: {
     *     // ... data to create a OrganizacaoEleitora
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizacaoEleitora we want to update
     *   }
     * })
     */
    upsert<T extends OrganizacaoEleitoraUpsertArgs>(args: SelectSubset<T, OrganizacaoEleitoraUpsertArgs<ExtArgs>>): Prisma__OrganizacaoEleitoraClient<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrganizacaoEleitoras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoEleitoraCountArgs} args - Arguments to filter OrganizacaoEleitoras to count.
     * @example
     * // Count the number of OrganizacaoEleitoras
     * const count = await prisma.organizacaoEleitora.count({
     *   where: {
     *     // ... the filter for the OrganizacaoEleitoras we want to count
     *   }
     * })
    **/
    count<T extends OrganizacaoEleitoraCountArgs>(
      args?: Subset<T, OrganizacaoEleitoraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizacaoEleitoraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizacaoEleitora.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoEleitoraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizacaoEleitoraAggregateArgs>(args: Subset<T, OrganizacaoEleitoraAggregateArgs>): Prisma.PrismaPromise<GetOrganizacaoEleitoraAggregateType<T>>

    /**
     * Group by OrganizacaoEleitora.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoEleitoraGroupByArgs} args - Group by arguments.
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
      T extends OrganizacaoEleitoraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizacaoEleitoraGroupByArgs['orderBy'] }
        : { orderBy?: OrganizacaoEleitoraGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizacaoEleitoraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizacaoEleitoraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizacaoEleitora model
   */
  readonly fields: OrganizacaoEleitoraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizacaoEleitora.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizacaoEleitoraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eleitor<T extends EleitorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EleitorDefaultArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    arquivos<T extends OrganizacaoEleitora$arquivosArgs<ExtArgs> = {}>(args?: Subset<T, OrganizacaoEleitora$arquivosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the OrganizacaoEleitora model
   */
  interface OrganizacaoEleitoraFieldRefs {
    readonly id: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly razaoSocial: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly cnpj: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly segmento: FieldRef<"OrganizacaoEleitora", 'Segmento'>
    readonly dataAbertura: FieldRef<"OrganizacaoEleitora", 'DateTime'>
    readonly sede: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly repNome: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly repCpf: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly repTituloEleitor: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly repDomicilio: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly emailEntidade: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly telefone: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly eleitorId: FieldRef<"OrganizacaoEleitora", 'String'>
    readonly criadoEm: FieldRef<"OrganizacaoEleitora", 'DateTime'>
    readonly atualizadoEm: FieldRef<"OrganizacaoEleitora", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrganizacaoEleitora findUnique
   */
  export type OrganizacaoEleitoraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    /**
     * Filter, which OrganizacaoEleitora to fetch.
     */
    where: OrganizacaoEleitoraWhereUniqueInput
  }

  /**
   * OrganizacaoEleitora findUniqueOrThrow
   */
  export type OrganizacaoEleitoraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    /**
     * Filter, which OrganizacaoEleitora to fetch.
     */
    where: OrganizacaoEleitoraWhereUniqueInput
  }

  /**
   * OrganizacaoEleitora findFirst
   */
  export type OrganizacaoEleitoraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    /**
     * Filter, which OrganizacaoEleitora to fetch.
     */
    where?: OrganizacaoEleitoraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizacaoEleitoras to fetch.
     */
    orderBy?: OrganizacaoEleitoraOrderByWithRelationInput | OrganizacaoEleitoraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizacaoEleitoras.
     */
    cursor?: OrganizacaoEleitoraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizacaoEleitoras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizacaoEleitoras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizacaoEleitoras.
     */
    distinct?: OrganizacaoEleitoraScalarFieldEnum | OrganizacaoEleitoraScalarFieldEnum[]
  }

  /**
   * OrganizacaoEleitora findFirstOrThrow
   */
  export type OrganizacaoEleitoraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    /**
     * Filter, which OrganizacaoEleitora to fetch.
     */
    where?: OrganizacaoEleitoraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizacaoEleitoras to fetch.
     */
    orderBy?: OrganizacaoEleitoraOrderByWithRelationInput | OrganizacaoEleitoraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizacaoEleitoras.
     */
    cursor?: OrganizacaoEleitoraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizacaoEleitoras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizacaoEleitoras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizacaoEleitoras.
     */
    distinct?: OrganizacaoEleitoraScalarFieldEnum | OrganizacaoEleitoraScalarFieldEnum[]
  }

  /**
   * OrganizacaoEleitora findMany
   */
  export type OrganizacaoEleitoraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    /**
     * Filter, which OrganizacaoEleitoras to fetch.
     */
    where?: OrganizacaoEleitoraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizacaoEleitoras to fetch.
     */
    orderBy?: OrganizacaoEleitoraOrderByWithRelationInput | OrganizacaoEleitoraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizacaoEleitoras.
     */
    cursor?: OrganizacaoEleitoraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizacaoEleitoras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizacaoEleitoras.
     */
    skip?: number
    distinct?: OrganizacaoEleitoraScalarFieldEnum | OrganizacaoEleitoraScalarFieldEnum[]
  }

  /**
   * OrganizacaoEleitora create
   */
  export type OrganizacaoEleitoraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizacaoEleitora.
     */
    data: XOR<OrganizacaoEleitoraCreateInput, OrganizacaoEleitoraUncheckedCreateInput>
  }

  /**
   * OrganizacaoEleitora createMany
   */
  export type OrganizacaoEleitoraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizacaoEleitoras.
     */
    data: OrganizacaoEleitoraCreateManyInput | OrganizacaoEleitoraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizacaoEleitora update
   */
  export type OrganizacaoEleitoraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizacaoEleitora.
     */
    data: XOR<OrganizacaoEleitoraUpdateInput, OrganizacaoEleitoraUncheckedUpdateInput>
    /**
     * Choose, which OrganizacaoEleitora to update.
     */
    where: OrganizacaoEleitoraWhereUniqueInput
  }

  /**
   * OrganizacaoEleitora updateMany
   */
  export type OrganizacaoEleitoraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizacaoEleitoras.
     */
    data: XOR<OrganizacaoEleitoraUpdateManyMutationInput, OrganizacaoEleitoraUncheckedUpdateManyInput>
    /**
     * Filter which OrganizacaoEleitoras to update
     */
    where?: OrganizacaoEleitoraWhereInput
    /**
     * Limit how many OrganizacaoEleitoras to update.
     */
    limit?: number
  }

  /**
   * OrganizacaoEleitora upsert
   */
  export type OrganizacaoEleitoraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizacaoEleitora to update in case it exists.
     */
    where: OrganizacaoEleitoraWhereUniqueInput
    /**
     * In case the OrganizacaoEleitora found by the `where` argument doesn't exist, create a new OrganizacaoEleitora with this data.
     */
    create: XOR<OrganizacaoEleitoraCreateInput, OrganizacaoEleitoraUncheckedCreateInput>
    /**
     * In case the OrganizacaoEleitora was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizacaoEleitoraUpdateInput, OrganizacaoEleitoraUncheckedUpdateInput>
  }

  /**
   * OrganizacaoEleitora delete
   */
  export type OrganizacaoEleitoraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    /**
     * Filter which OrganizacaoEleitora to delete.
     */
    where: OrganizacaoEleitoraWhereUniqueInput
  }

  /**
   * OrganizacaoEleitora deleteMany
   */
  export type OrganizacaoEleitoraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizacaoEleitoras to delete
     */
    where?: OrganizacaoEleitoraWhereInput
    /**
     * Limit how many OrganizacaoEleitoras to delete.
     */
    limit?: number
  }

  /**
   * OrganizacaoEleitora.arquivos
   */
  export type OrganizacaoEleitora$arquivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    where?: ArquivoWhereInput
    orderBy?: ArquivoOrderByWithRelationInput | ArquivoOrderByWithRelationInput[]
    cursor?: ArquivoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArquivoScalarFieldEnum | ArquivoScalarFieldEnum[]
  }

  /**
   * OrganizacaoEleitora without action
   */
  export type OrganizacaoEleitoraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
  }


  /**
   * Model Procurador
   */

  export type AggregateProcurador = {
    _count: ProcuradorCountAggregateOutputType | null
    _min: ProcuradorMinAggregateOutputType | null
    _max: ProcuradorMaxAggregateOutputType | null
  }

  export type ProcuradorMinAggregateOutputType = {
    id: string | null
    nome: string | null
    cpf: string | null
    tituloEleitor: string | null
    eleitorId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type ProcuradorMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    cpf: string | null
    tituloEleitor: string | null
    eleitorId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type ProcuradorCountAggregateOutputType = {
    id: number
    nome: number
    cpf: number
    tituloEleitor: number
    eleitorId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type ProcuradorMinAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    tituloEleitor?: true
    eleitorId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type ProcuradorMaxAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    tituloEleitor?: true
    eleitorId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type ProcuradorCountAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    tituloEleitor?: true
    eleitorId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type ProcuradorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Procurador to aggregate.
     */
    where?: ProcuradorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procuradors to fetch.
     */
    orderBy?: ProcuradorOrderByWithRelationInput | ProcuradorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcuradorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procuradors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procuradors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Procuradors
    **/
    _count?: true | ProcuradorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcuradorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcuradorMaxAggregateInputType
  }

  export type GetProcuradorAggregateType<T extends ProcuradorAggregateArgs> = {
        [P in keyof T & keyof AggregateProcurador]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcurador[P]>
      : GetScalarType<T[P], AggregateProcurador[P]>
  }




  export type ProcuradorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcuradorWhereInput
    orderBy?: ProcuradorOrderByWithAggregationInput | ProcuradorOrderByWithAggregationInput[]
    by: ProcuradorScalarFieldEnum[] | ProcuradorScalarFieldEnum
    having?: ProcuradorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcuradorCountAggregateInputType | true
    _min?: ProcuradorMinAggregateInputType
    _max?: ProcuradorMaxAggregateInputType
  }

  export type ProcuradorGroupByOutputType = {
    id: string
    nome: string
    cpf: string
    tituloEleitor: string | null
    eleitorId: string
    criadoEm: Date
    atualizadoEm: Date
    _count: ProcuradorCountAggregateOutputType | null
    _min: ProcuradorMinAggregateOutputType | null
    _max: ProcuradorMaxAggregateOutputType | null
  }

  type GetProcuradorGroupByPayload<T extends ProcuradorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcuradorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcuradorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcuradorGroupByOutputType[P]>
            : GetScalarType<T[P], ProcuradorGroupByOutputType[P]>
        }
      >
    >


  export type ProcuradorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cpf?: boolean
    tituloEleitor?: boolean
    eleitorId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    eleitor?: boolean | EleitorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["procurador"]>



  export type ProcuradorSelectScalar = {
    id?: boolean
    nome?: boolean
    cpf?: boolean
    tituloEleitor?: boolean
    eleitorId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type ProcuradorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "cpf" | "tituloEleitor" | "eleitorId" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["procurador"]>
  export type ProcuradorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eleitor?: boolean | EleitorDefaultArgs<ExtArgs>
  }

  export type $ProcuradorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Procurador"
    objects: {
      eleitor: Prisma.$EleitorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      cpf: string
      tituloEleitor: string | null
      eleitorId: string
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["procurador"]>
    composites: {}
  }

  type ProcuradorGetPayload<S extends boolean | null | undefined | ProcuradorDefaultArgs> = $Result.GetResult<Prisma.$ProcuradorPayload, S>

  type ProcuradorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcuradorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcuradorCountAggregateInputType | true
    }

  export interface ProcuradorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Procurador'], meta: { name: 'Procurador' } }
    /**
     * Find zero or one Procurador that matches the filter.
     * @param {ProcuradorFindUniqueArgs} args - Arguments to find a Procurador
     * @example
     * // Get one Procurador
     * const procurador = await prisma.procurador.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcuradorFindUniqueArgs>(args: SelectSubset<T, ProcuradorFindUniqueArgs<ExtArgs>>): Prisma__ProcuradorClient<$Result.GetResult<Prisma.$ProcuradorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Procurador that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcuradorFindUniqueOrThrowArgs} args - Arguments to find a Procurador
     * @example
     * // Get one Procurador
     * const procurador = await prisma.procurador.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcuradorFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcuradorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcuradorClient<$Result.GetResult<Prisma.$ProcuradorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Procurador that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcuradorFindFirstArgs} args - Arguments to find a Procurador
     * @example
     * // Get one Procurador
     * const procurador = await prisma.procurador.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcuradorFindFirstArgs>(args?: SelectSubset<T, ProcuradorFindFirstArgs<ExtArgs>>): Prisma__ProcuradorClient<$Result.GetResult<Prisma.$ProcuradorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Procurador that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcuradorFindFirstOrThrowArgs} args - Arguments to find a Procurador
     * @example
     * // Get one Procurador
     * const procurador = await prisma.procurador.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcuradorFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcuradorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcuradorClient<$Result.GetResult<Prisma.$ProcuradorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Procuradors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcuradorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Procuradors
     * const procuradors = await prisma.procurador.findMany()
     * 
     * // Get first 10 Procuradors
     * const procuradors = await prisma.procurador.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const procuradorWithIdOnly = await prisma.procurador.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcuradorFindManyArgs>(args?: SelectSubset<T, ProcuradorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcuradorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Procurador.
     * @param {ProcuradorCreateArgs} args - Arguments to create a Procurador.
     * @example
     * // Create one Procurador
     * const Procurador = await prisma.procurador.create({
     *   data: {
     *     // ... data to create a Procurador
     *   }
     * })
     * 
     */
    create<T extends ProcuradorCreateArgs>(args: SelectSubset<T, ProcuradorCreateArgs<ExtArgs>>): Prisma__ProcuradorClient<$Result.GetResult<Prisma.$ProcuradorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Procuradors.
     * @param {ProcuradorCreateManyArgs} args - Arguments to create many Procuradors.
     * @example
     * // Create many Procuradors
     * const procurador = await prisma.procurador.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcuradorCreateManyArgs>(args?: SelectSubset<T, ProcuradorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Procurador.
     * @param {ProcuradorDeleteArgs} args - Arguments to delete one Procurador.
     * @example
     * // Delete one Procurador
     * const Procurador = await prisma.procurador.delete({
     *   where: {
     *     // ... filter to delete one Procurador
     *   }
     * })
     * 
     */
    delete<T extends ProcuradorDeleteArgs>(args: SelectSubset<T, ProcuradorDeleteArgs<ExtArgs>>): Prisma__ProcuradorClient<$Result.GetResult<Prisma.$ProcuradorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Procurador.
     * @param {ProcuradorUpdateArgs} args - Arguments to update one Procurador.
     * @example
     * // Update one Procurador
     * const procurador = await prisma.procurador.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcuradorUpdateArgs>(args: SelectSubset<T, ProcuradorUpdateArgs<ExtArgs>>): Prisma__ProcuradorClient<$Result.GetResult<Prisma.$ProcuradorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Procuradors.
     * @param {ProcuradorDeleteManyArgs} args - Arguments to filter Procuradors to delete.
     * @example
     * // Delete a few Procuradors
     * const { count } = await prisma.procurador.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcuradorDeleteManyArgs>(args?: SelectSubset<T, ProcuradorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Procuradors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcuradorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Procuradors
     * const procurador = await prisma.procurador.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcuradorUpdateManyArgs>(args: SelectSubset<T, ProcuradorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Procurador.
     * @param {ProcuradorUpsertArgs} args - Arguments to update or create a Procurador.
     * @example
     * // Update or create a Procurador
     * const procurador = await prisma.procurador.upsert({
     *   create: {
     *     // ... data to create a Procurador
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Procurador we want to update
     *   }
     * })
     */
    upsert<T extends ProcuradorUpsertArgs>(args: SelectSubset<T, ProcuradorUpsertArgs<ExtArgs>>): Prisma__ProcuradorClient<$Result.GetResult<Prisma.$ProcuradorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Procuradors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcuradorCountArgs} args - Arguments to filter Procuradors to count.
     * @example
     * // Count the number of Procuradors
     * const count = await prisma.procurador.count({
     *   where: {
     *     // ... the filter for the Procuradors we want to count
     *   }
     * })
    **/
    count<T extends ProcuradorCountArgs>(
      args?: Subset<T, ProcuradorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcuradorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Procurador.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcuradorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProcuradorAggregateArgs>(args: Subset<T, ProcuradorAggregateArgs>): Prisma.PrismaPromise<GetProcuradorAggregateType<T>>

    /**
     * Group by Procurador.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcuradorGroupByArgs} args - Group by arguments.
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
      T extends ProcuradorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcuradorGroupByArgs['orderBy'] }
        : { orderBy?: ProcuradorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProcuradorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcuradorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Procurador model
   */
  readonly fields: ProcuradorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Procurador.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcuradorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eleitor<T extends EleitorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EleitorDefaultArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Procurador model
   */
  interface ProcuradorFieldRefs {
    readonly id: FieldRef<"Procurador", 'String'>
    readonly nome: FieldRef<"Procurador", 'String'>
    readonly cpf: FieldRef<"Procurador", 'String'>
    readonly tituloEleitor: FieldRef<"Procurador", 'String'>
    readonly eleitorId: FieldRef<"Procurador", 'String'>
    readonly criadoEm: FieldRef<"Procurador", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Procurador", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Procurador findUnique
   */
  export type ProcuradorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
    /**
     * Filter, which Procurador to fetch.
     */
    where: ProcuradorWhereUniqueInput
  }

  /**
   * Procurador findUniqueOrThrow
   */
  export type ProcuradorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
    /**
     * Filter, which Procurador to fetch.
     */
    where: ProcuradorWhereUniqueInput
  }

  /**
   * Procurador findFirst
   */
  export type ProcuradorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
    /**
     * Filter, which Procurador to fetch.
     */
    where?: ProcuradorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procuradors to fetch.
     */
    orderBy?: ProcuradorOrderByWithRelationInput | ProcuradorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Procuradors.
     */
    cursor?: ProcuradorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procuradors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procuradors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Procuradors.
     */
    distinct?: ProcuradorScalarFieldEnum | ProcuradorScalarFieldEnum[]
  }

  /**
   * Procurador findFirstOrThrow
   */
  export type ProcuradorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
    /**
     * Filter, which Procurador to fetch.
     */
    where?: ProcuradorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procuradors to fetch.
     */
    orderBy?: ProcuradorOrderByWithRelationInput | ProcuradorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Procuradors.
     */
    cursor?: ProcuradorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procuradors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procuradors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Procuradors.
     */
    distinct?: ProcuradorScalarFieldEnum | ProcuradorScalarFieldEnum[]
  }

  /**
   * Procurador findMany
   */
  export type ProcuradorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
    /**
     * Filter, which Procuradors to fetch.
     */
    where?: ProcuradorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procuradors to fetch.
     */
    orderBy?: ProcuradorOrderByWithRelationInput | ProcuradorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Procuradors.
     */
    cursor?: ProcuradorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procuradors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procuradors.
     */
    skip?: number
    distinct?: ProcuradorScalarFieldEnum | ProcuradorScalarFieldEnum[]
  }

  /**
   * Procurador create
   */
  export type ProcuradorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
    /**
     * The data needed to create a Procurador.
     */
    data: XOR<ProcuradorCreateInput, ProcuradorUncheckedCreateInput>
  }

  /**
   * Procurador createMany
   */
  export type ProcuradorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Procuradors.
     */
    data: ProcuradorCreateManyInput | ProcuradorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Procurador update
   */
  export type ProcuradorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
    /**
     * The data needed to update a Procurador.
     */
    data: XOR<ProcuradorUpdateInput, ProcuradorUncheckedUpdateInput>
    /**
     * Choose, which Procurador to update.
     */
    where: ProcuradorWhereUniqueInput
  }

  /**
   * Procurador updateMany
   */
  export type ProcuradorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Procuradors.
     */
    data: XOR<ProcuradorUpdateManyMutationInput, ProcuradorUncheckedUpdateManyInput>
    /**
     * Filter which Procuradors to update
     */
    where?: ProcuradorWhereInput
    /**
     * Limit how many Procuradors to update.
     */
    limit?: number
  }

  /**
   * Procurador upsert
   */
  export type ProcuradorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
    /**
     * The filter to search for the Procurador to update in case it exists.
     */
    where: ProcuradorWhereUniqueInput
    /**
     * In case the Procurador found by the `where` argument doesn't exist, create a new Procurador with this data.
     */
    create: XOR<ProcuradorCreateInput, ProcuradorUncheckedCreateInput>
    /**
     * In case the Procurador was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcuradorUpdateInput, ProcuradorUncheckedUpdateInput>
  }

  /**
   * Procurador delete
   */
  export type ProcuradorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
    /**
     * Filter which Procurador to delete.
     */
    where: ProcuradorWhereUniqueInput
  }

  /**
   * Procurador deleteMany
   */
  export type ProcuradorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Procuradors to delete
     */
    where?: ProcuradorWhereInput
    /**
     * Limit how many Procuradors to delete.
     */
    limit?: number
  }

  /**
   * Procurador without action
   */
  export type ProcuradorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurador
     */
    select?: ProcuradorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Procurador
     */
    omit?: ProcuradorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcuradorInclude<ExtArgs> | null
  }


  /**
   * Model Arquivo
   */

  export type AggregateArquivo = {
    _count: ArquivoCountAggregateOutputType | null
    _avg: ArquivoAvgAggregateOutputType | null
    _sum: ArquivoSumAggregateOutputType | null
    _min: ArquivoMinAggregateOutputType | null
    _max: ArquivoMaxAggregateOutputType | null
  }

  export type ArquivoAvgAggregateOutputType = {
    tamanho: number | null
  }

  export type ArquivoSumAggregateOutputType = {
    tamanho: number | null
  }

  export type ArquivoMinAggregateOutputType = {
    id: string | null
    nome: string | null
    tipo: string | null
    tamanho: number | null
    caminho: string | null
    categoria: $Enums.CategoriaArquivo | null
    candidaturaId: string | null
    candidatoId: string | null
    orgCandidataId: string | null
    eleitorId: string | null
    orgEleitoraId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type ArquivoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    tipo: string | null
    tamanho: number | null
    caminho: string | null
    categoria: $Enums.CategoriaArquivo | null
    candidaturaId: string | null
    candidatoId: string | null
    orgCandidataId: string | null
    eleitorId: string | null
    orgEleitoraId: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type ArquivoCountAggregateOutputType = {
    id: number
    nome: number
    tipo: number
    tamanho: number
    caminho: number
    categoria: number
    candidaturaId: number
    candidatoId: number
    orgCandidataId: number
    eleitorId: number
    orgEleitoraId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type ArquivoAvgAggregateInputType = {
    tamanho?: true
  }

  export type ArquivoSumAggregateInputType = {
    tamanho?: true
  }

  export type ArquivoMinAggregateInputType = {
    id?: true
    nome?: true
    tipo?: true
    tamanho?: true
    caminho?: true
    categoria?: true
    candidaturaId?: true
    candidatoId?: true
    orgCandidataId?: true
    eleitorId?: true
    orgEleitoraId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type ArquivoMaxAggregateInputType = {
    id?: true
    nome?: true
    tipo?: true
    tamanho?: true
    caminho?: true
    categoria?: true
    candidaturaId?: true
    candidatoId?: true
    orgCandidataId?: true
    eleitorId?: true
    orgEleitoraId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type ArquivoCountAggregateInputType = {
    id?: true
    nome?: true
    tipo?: true
    tamanho?: true
    caminho?: true
    categoria?: true
    candidaturaId?: true
    candidatoId?: true
    orgCandidataId?: true
    eleitorId?: true
    orgEleitoraId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type ArquivoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Arquivo to aggregate.
     */
    where?: ArquivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Arquivos to fetch.
     */
    orderBy?: ArquivoOrderByWithRelationInput | ArquivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArquivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Arquivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Arquivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Arquivos
    **/
    _count?: true | ArquivoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArquivoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArquivoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArquivoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArquivoMaxAggregateInputType
  }

  export type GetArquivoAggregateType<T extends ArquivoAggregateArgs> = {
        [P in keyof T & keyof AggregateArquivo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArquivo[P]>
      : GetScalarType<T[P], AggregateArquivo[P]>
  }




  export type ArquivoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArquivoWhereInput
    orderBy?: ArquivoOrderByWithAggregationInput | ArquivoOrderByWithAggregationInput[]
    by: ArquivoScalarFieldEnum[] | ArquivoScalarFieldEnum
    having?: ArquivoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArquivoCountAggregateInputType | true
    _avg?: ArquivoAvgAggregateInputType
    _sum?: ArquivoSumAggregateInputType
    _min?: ArquivoMinAggregateInputType
    _max?: ArquivoMaxAggregateInputType
  }

  export type ArquivoGroupByOutputType = {
    id: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId: string | null
    candidatoId: string | null
    orgCandidataId: string | null
    eleitorId: string | null
    orgEleitoraId: string | null
    criadoEm: Date
    atualizadoEm: Date
    _count: ArquivoCountAggregateOutputType | null
    _avg: ArquivoAvgAggregateOutputType | null
    _sum: ArquivoSumAggregateOutputType | null
    _min: ArquivoMinAggregateOutputType | null
    _max: ArquivoMaxAggregateOutputType | null
  }

  type GetArquivoGroupByPayload<T extends ArquivoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArquivoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArquivoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArquivoGroupByOutputType[P]>
            : GetScalarType<T[P], ArquivoGroupByOutputType[P]>
        }
      >
    >


  export type ArquivoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    tipo?: boolean
    tamanho?: boolean
    caminho?: boolean
    categoria?: boolean
    candidaturaId?: boolean
    candidatoId?: boolean
    orgCandidataId?: boolean
    eleitorId?: boolean
    orgEleitoraId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    candidatura?: boolean | Arquivo$candidaturaArgs<ExtArgs>
    candidato?: boolean | Arquivo$candidatoArgs<ExtArgs>
    orgCandidata?: boolean | Arquivo$orgCandidataArgs<ExtArgs>
    eleitor?: boolean | Arquivo$eleitorArgs<ExtArgs>
    orgEleitora?: boolean | Arquivo$orgEleitoraArgs<ExtArgs>
  }, ExtArgs["result"]["arquivo"]>



  export type ArquivoSelectScalar = {
    id?: boolean
    nome?: boolean
    tipo?: boolean
    tamanho?: boolean
    caminho?: boolean
    categoria?: boolean
    candidaturaId?: boolean
    candidatoId?: boolean
    orgCandidataId?: boolean
    eleitorId?: boolean
    orgEleitoraId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type ArquivoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "tipo" | "tamanho" | "caminho" | "categoria" | "candidaturaId" | "candidatoId" | "orgCandidataId" | "eleitorId" | "orgEleitoraId" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["arquivo"]>
  export type ArquivoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidatura?: boolean | Arquivo$candidaturaArgs<ExtArgs>
    candidato?: boolean | Arquivo$candidatoArgs<ExtArgs>
    orgCandidata?: boolean | Arquivo$orgCandidataArgs<ExtArgs>
    eleitor?: boolean | Arquivo$eleitorArgs<ExtArgs>
    orgEleitora?: boolean | Arquivo$orgEleitoraArgs<ExtArgs>
  }

  export type $ArquivoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Arquivo"
    objects: {
      candidatura: Prisma.$CandidaturaPayload<ExtArgs> | null
      candidato: Prisma.$CandidatoPayload<ExtArgs> | null
      orgCandidata: Prisma.$OrganizacaoCandidataPayload<ExtArgs> | null
      eleitor: Prisma.$EleitorPayload<ExtArgs> | null
      orgEleitora: Prisma.$OrganizacaoEleitoraPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      tipo: string
      tamanho: number
      caminho: string
      categoria: $Enums.CategoriaArquivo
      candidaturaId: string | null
      candidatoId: string | null
      orgCandidataId: string | null
      eleitorId: string | null
      orgEleitoraId: string | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["arquivo"]>
    composites: {}
  }

  type ArquivoGetPayload<S extends boolean | null | undefined | ArquivoDefaultArgs> = $Result.GetResult<Prisma.$ArquivoPayload, S>

  type ArquivoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArquivoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArquivoCountAggregateInputType | true
    }

  export interface ArquivoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Arquivo'], meta: { name: 'Arquivo' } }
    /**
     * Find zero or one Arquivo that matches the filter.
     * @param {ArquivoFindUniqueArgs} args - Arguments to find a Arquivo
     * @example
     * // Get one Arquivo
     * const arquivo = await prisma.arquivo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArquivoFindUniqueArgs>(args: SelectSubset<T, ArquivoFindUniqueArgs<ExtArgs>>): Prisma__ArquivoClient<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Arquivo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArquivoFindUniqueOrThrowArgs} args - Arguments to find a Arquivo
     * @example
     * // Get one Arquivo
     * const arquivo = await prisma.arquivo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArquivoFindUniqueOrThrowArgs>(args: SelectSubset<T, ArquivoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArquivoClient<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Arquivo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArquivoFindFirstArgs} args - Arguments to find a Arquivo
     * @example
     * // Get one Arquivo
     * const arquivo = await prisma.arquivo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArquivoFindFirstArgs>(args?: SelectSubset<T, ArquivoFindFirstArgs<ExtArgs>>): Prisma__ArquivoClient<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Arquivo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArquivoFindFirstOrThrowArgs} args - Arguments to find a Arquivo
     * @example
     * // Get one Arquivo
     * const arquivo = await prisma.arquivo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArquivoFindFirstOrThrowArgs>(args?: SelectSubset<T, ArquivoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArquivoClient<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Arquivos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArquivoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Arquivos
     * const arquivos = await prisma.arquivo.findMany()
     * 
     * // Get first 10 Arquivos
     * const arquivos = await prisma.arquivo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const arquivoWithIdOnly = await prisma.arquivo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArquivoFindManyArgs>(args?: SelectSubset<T, ArquivoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Arquivo.
     * @param {ArquivoCreateArgs} args - Arguments to create a Arquivo.
     * @example
     * // Create one Arquivo
     * const Arquivo = await prisma.arquivo.create({
     *   data: {
     *     // ... data to create a Arquivo
     *   }
     * })
     * 
     */
    create<T extends ArquivoCreateArgs>(args: SelectSubset<T, ArquivoCreateArgs<ExtArgs>>): Prisma__ArquivoClient<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Arquivos.
     * @param {ArquivoCreateManyArgs} args - Arguments to create many Arquivos.
     * @example
     * // Create many Arquivos
     * const arquivo = await prisma.arquivo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArquivoCreateManyArgs>(args?: SelectSubset<T, ArquivoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Arquivo.
     * @param {ArquivoDeleteArgs} args - Arguments to delete one Arquivo.
     * @example
     * // Delete one Arquivo
     * const Arquivo = await prisma.arquivo.delete({
     *   where: {
     *     // ... filter to delete one Arquivo
     *   }
     * })
     * 
     */
    delete<T extends ArquivoDeleteArgs>(args: SelectSubset<T, ArquivoDeleteArgs<ExtArgs>>): Prisma__ArquivoClient<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Arquivo.
     * @param {ArquivoUpdateArgs} args - Arguments to update one Arquivo.
     * @example
     * // Update one Arquivo
     * const arquivo = await prisma.arquivo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArquivoUpdateArgs>(args: SelectSubset<T, ArquivoUpdateArgs<ExtArgs>>): Prisma__ArquivoClient<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Arquivos.
     * @param {ArquivoDeleteManyArgs} args - Arguments to filter Arquivos to delete.
     * @example
     * // Delete a few Arquivos
     * const { count } = await prisma.arquivo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArquivoDeleteManyArgs>(args?: SelectSubset<T, ArquivoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Arquivos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArquivoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Arquivos
     * const arquivo = await prisma.arquivo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArquivoUpdateManyArgs>(args: SelectSubset<T, ArquivoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Arquivo.
     * @param {ArquivoUpsertArgs} args - Arguments to update or create a Arquivo.
     * @example
     * // Update or create a Arquivo
     * const arquivo = await prisma.arquivo.upsert({
     *   create: {
     *     // ... data to create a Arquivo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Arquivo we want to update
     *   }
     * })
     */
    upsert<T extends ArquivoUpsertArgs>(args: SelectSubset<T, ArquivoUpsertArgs<ExtArgs>>): Prisma__ArquivoClient<$Result.GetResult<Prisma.$ArquivoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Arquivos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArquivoCountArgs} args - Arguments to filter Arquivos to count.
     * @example
     * // Count the number of Arquivos
     * const count = await prisma.arquivo.count({
     *   where: {
     *     // ... the filter for the Arquivos we want to count
     *   }
     * })
    **/
    count<T extends ArquivoCountArgs>(
      args?: Subset<T, ArquivoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArquivoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Arquivo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArquivoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArquivoAggregateArgs>(args: Subset<T, ArquivoAggregateArgs>): Prisma.PrismaPromise<GetArquivoAggregateType<T>>

    /**
     * Group by Arquivo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArquivoGroupByArgs} args - Group by arguments.
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
      T extends ArquivoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArquivoGroupByArgs['orderBy'] }
        : { orderBy?: ArquivoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArquivoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArquivoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Arquivo model
   */
  readonly fields: ArquivoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Arquivo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArquivoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidatura<T extends Arquivo$candidaturaArgs<ExtArgs> = {}>(args?: Subset<T, Arquivo$candidaturaArgs<ExtArgs>>): Prisma__CandidaturaClient<$Result.GetResult<Prisma.$CandidaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    candidato<T extends Arquivo$candidatoArgs<ExtArgs> = {}>(args?: Subset<T, Arquivo$candidatoArgs<ExtArgs>>): Prisma__CandidatoClient<$Result.GetResult<Prisma.$CandidatoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    orgCandidata<T extends Arquivo$orgCandidataArgs<ExtArgs> = {}>(args?: Subset<T, Arquivo$orgCandidataArgs<ExtArgs>>): Prisma__OrganizacaoCandidataClient<$Result.GetResult<Prisma.$OrganizacaoCandidataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    eleitor<T extends Arquivo$eleitorArgs<ExtArgs> = {}>(args?: Subset<T, Arquivo$eleitorArgs<ExtArgs>>): Prisma__EleitorClient<$Result.GetResult<Prisma.$EleitorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    orgEleitora<T extends Arquivo$orgEleitoraArgs<ExtArgs> = {}>(args?: Subset<T, Arquivo$orgEleitoraArgs<ExtArgs>>): Prisma__OrganizacaoEleitoraClient<$Result.GetResult<Prisma.$OrganizacaoEleitoraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Arquivo model
   */
  interface ArquivoFieldRefs {
    readonly id: FieldRef<"Arquivo", 'String'>
    readonly nome: FieldRef<"Arquivo", 'String'>
    readonly tipo: FieldRef<"Arquivo", 'String'>
    readonly tamanho: FieldRef<"Arquivo", 'Int'>
    readonly caminho: FieldRef<"Arquivo", 'String'>
    readonly categoria: FieldRef<"Arquivo", 'CategoriaArquivo'>
    readonly candidaturaId: FieldRef<"Arquivo", 'String'>
    readonly candidatoId: FieldRef<"Arquivo", 'String'>
    readonly orgCandidataId: FieldRef<"Arquivo", 'String'>
    readonly eleitorId: FieldRef<"Arquivo", 'String'>
    readonly orgEleitoraId: FieldRef<"Arquivo", 'String'>
    readonly criadoEm: FieldRef<"Arquivo", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Arquivo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Arquivo findUnique
   */
  export type ArquivoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    /**
     * Filter, which Arquivo to fetch.
     */
    where: ArquivoWhereUniqueInput
  }

  /**
   * Arquivo findUniqueOrThrow
   */
  export type ArquivoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    /**
     * Filter, which Arquivo to fetch.
     */
    where: ArquivoWhereUniqueInput
  }

  /**
   * Arquivo findFirst
   */
  export type ArquivoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    /**
     * Filter, which Arquivo to fetch.
     */
    where?: ArquivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Arquivos to fetch.
     */
    orderBy?: ArquivoOrderByWithRelationInput | ArquivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Arquivos.
     */
    cursor?: ArquivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Arquivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Arquivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Arquivos.
     */
    distinct?: ArquivoScalarFieldEnum | ArquivoScalarFieldEnum[]
  }

  /**
   * Arquivo findFirstOrThrow
   */
  export type ArquivoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    /**
     * Filter, which Arquivo to fetch.
     */
    where?: ArquivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Arquivos to fetch.
     */
    orderBy?: ArquivoOrderByWithRelationInput | ArquivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Arquivos.
     */
    cursor?: ArquivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Arquivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Arquivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Arquivos.
     */
    distinct?: ArquivoScalarFieldEnum | ArquivoScalarFieldEnum[]
  }

  /**
   * Arquivo findMany
   */
  export type ArquivoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    /**
     * Filter, which Arquivos to fetch.
     */
    where?: ArquivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Arquivos to fetch.
     */
    orderBy?: ArquivoOrderByWithRelationInput | ArquivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Arquivos.
     */
    cursor?: ArquivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Arquivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Arquivos.
     */
    skip?: number
    distinct?: ArquivoScalarFieldEnum | ArquivoScalarFieldEnum[]
  }

  /**
   * Arquivo create
   */
  export type ArquivoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    /**
     * The data needed to create a Arquivo.
     */
    data: XOR<ArquivoCreateInput, ArquivoUncheckedCreateInput>
  }

  /**
   * Arquivo createMany
   */
  export type ArquivoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Arquivos.
     */
    data: ArquivoCreateManyInput | ArquivoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Arquivo update
   */
  export type ArquivoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    /**
     * The data needed to update a Arquivo.
     */
    data: XOR<ArquivoUpdateInput, ArquivoUncheckedUpdateInput>
    /**
     * Choose, which Arquivo to update.
     */
    where: ArquivoWhereUniqueInput
  }

  /**
   * Arquivo updateMany
   */
  export type ArquivoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Arquivos.
     */
    data: XOR<ArquivoUpdateManyMutationInput, ArquivoUncheckedUpdateManyInput>
    /**
     * Filter which Arquivos to update
     */
    where?: ArquivoWhereInput
    /**
     * Limit how many Arquivos to update.
     */
    limit?: number
  }

  /**
   * Arquivo upsert
   */
  export type ArquivoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    /**
     * The filter to search for the Arquivo to update in case it exists.
     */
    where: ArquivoWhereUniqueInput
    /**
     * In case the Arquivo found by the `where` argument doesn't exist, create a new Arquivo with this data.
     */
    create: XOR<ArquivoCreateInput, ArquivoUncheckedCreateInput>
    /**
     * In case the Arquivo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArquivoUpdateInput, ArquivoUncheckedUpdateInput>
  }

  /**
   * Arquivo delete
   */
  export type ArquivoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
    /**
     * Filter which Arquivo to delete.
     */
    where: ArquivoWhereUniqueInput
  }

  /**
   * Arquivo deleteMany
   */
  export type ArquivoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Arquivos to delete
     */
    where?: ArquivoWhereInput
    /**
     * Limit how many Arquivos to delete.
     */
    limit?: number
  }

  /**
   * Arquivo.candidatura
   */
  export type Arquivo$candidaturaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidatura
     */
    select?: CandidaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidatura
     */
    omit?: CandidaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidaturaInclude<ExtArgs> | null
    where?: CandidaturaWhereInput
  }

  /**
   * Arquivo.candidato
   */
  export type Arquivo$candidatoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidato
     */
    select?: CandidatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidato
     */
    omit?: CandidatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidatoInclude<ExtArgs> | null
    where?: CandidatoWhereInput
  }

  /**
   * Arquivo.orgCandidata
   */
  export type Arquivo$orgCandidataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCandidata
     */
    select?: OrganizacaoCandidataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoCandidata
     */
    omit?: OrganizacaoCandidataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoCandidataInclude<ExtArgs> | null
    where?: OrganizacaoCandidataWhereInput
  }

  /**
   * Arquivo.eleitor
   */
  export type Arquivo$eleitorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eleitor
     */
    select?: EleitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eleitor
     */
    omit?: EleitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EleitorInclude<ExtArgs> | null
    where?: EleitorWhereInput
  }

  /**
   * Arquivo.orgEleitora
   */
  export type Arquivo$orgEleitoraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoEleitora
     */
    select?: OrganizacaoEleitoraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizacaoEleitora
     */
    omit?: OrganizacaoEleitoraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoEleitoraInclude<ExtArgs> | null
    where?: OrganizacaoEleitoraWhereInput
  }

  /**
   * Arquivo without action
   */
  export type ArquivoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Arquivo
     */
    select?: ArquivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Arquivo
     */
    omit?: ArquivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArquivoInclude<ExtArgs> | null
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


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    tipo: 'tipo',
    nome: 'nome',
    email: 'email',
    login: 'login',
    permissao: 'permissao',
    status: 'status',
    senha: 'senha',
    primeiroAcesso: 'primeiroAcesso',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const CandidaturaScalarFieldEnum: {
    id: 'id',
    tipoInscricao: 'tipoInscricao',
    status: 'status',
    oculto: 'oculto',
    motivoIndeferimento: 'motivoIndeferimento',
    usuarioId: 'usuarioId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type CandidaturaScalarFieldEnum = (typeof CandidaturaScalarFieldEnum)[keyof typeof CandidaturaScalarFieldEnum]


  export const OrganizacaoCandidataScalarFieldEnum: {
    id: 'id',
    razaoSocial: 'razaoSocial',
    cnpj: 'cnpj',
    segmento: 'segmento',
    dataAbertura: 'dataAbertura',
    sede: 'sede',
    repNome: 'repNome',
    repCpf: 'repCpf',
    emailEntidade: 'emailEntidade',
    telefone: 'telefone',
    formaChapa: 'formaChapa',
    cnpjChapa: 'cnpjChapa',
    candidaturaId: 'candidaturaId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type OrganizacaoCandidataScalarFieldEnum = (typeof OrganizacaoCandidataScalarFieldEnum)[keyof typeof OrganizacaoCandidataScalarFieldEnum]


  export const CandidatoScalarFieldEnum: {
    id: 'id',
    tipoCandidato: 'tipoCandidato',
    nome: 'nome',
    nomeSocial: 'nomeSocial',
    nomeEmpresa: 'nomeEmpresa',
    genero: 'genero',
    dataNascimento: 'dataNascimento',
    cpf: 'cpf',
    tituloEleitor: 'tituloEleitor',
    domicilioEleitoral: 'domicilioEleitoral',
    email: 'email',
    telefone: 'telefone',
    candidaturaId: 'candidaturaId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type CandidatoScalarFieldEnum = (typeof CandidatoScalarFieldEnum)[keyof typeof CandidatoScalarFieldEnum]


  export const EleitorScalarFieldEnum: {
    id: 'id',
    status: 'status',
    oculto: 'oculto',
    usuarioId: 'usuarioId',
    candidatoId: 'candidatoId',
    eleitorPaiId: 'eleitorPaiId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type EleitorScalarFieldEnum = (typeof EleitorScalarFieldEnum)[keyof typeof EleitorScalarFieldEnum]


  export const OrganizacaoEleitoraScalarFieldEnum: {
    id: 'id',
    razaoSocial: 'razaoSocial',
    cnpj: 'cnpj',
    segmento: 'segmento',
    dataAbertura: 'dataAbertura',
    sede: 'sede',
    repNome: 'repNome',
    repCpf: 'repCpf',
    repTituloEleitor: 'repTituloEleitor',
    repDomicilio: 'repDomicilio',
    emailEntidade: 'emailEntidade',
    telefone: 'telefone',
    eleitorId: 'eleitorId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type OrganizacaoEleitoraScalarFieldEnum = (typeof OrganizacaoEleitoraScalarFieldEnum)[keyof typeof OrganizacaoEleitoraScalarFieldEnum]


  export const ProcuradorScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cpf: 'cpf',
    tituloEleitor: 'tituloEleitor',
    eleitorId: 'eleitorId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type ProcuradorScalarFieldEnum = (typeof ProcuradorScalarFieldEnum)[keyof typeof ProcuradorScalarFieldEnum]


  export const ArquivoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    tipo: 'tipo',
    tamanho: 'tamanho',
    caminho: 'caminho',
    categoria: 'categoria',
    candidaturaId: 'candidaturaId',
    candidatoId: 'candidatoId',
    orgCandidataId: 'orgCandidataId',
    eleitorId: 'eleitorId',
    orgEleitoraId: 'orgEleitoraId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type ArquivoScalarFieldEnum = (typeof ArquivoScalarFieldEnum)[keyof typeof ArquivoScalarFieldEnum]


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


  export const UsuarioOrderByRelevanceFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    login: 'login',
    senha: 'senha'
  };

  export type UsuarioOrderByRelevanceFieldEnum = (typeof UsuarioOrderByRelevanceFieldEnum)[keyof typeof UsuarioOrderByRelevanceFieldEnum]


  export const CandidaturaOrderByRelevanceFieldEnum: {
    id: 'id',
    motivoIndeferimento: 'motivoIndeferimento',
    usuarioId: 'usuarioId'
  };

  export type CandidaturaOrderByRelevanceFieldEnum = (typeof CandidaturaOrderByRelevanceFieldEnum)[keyof typeof CandidaturaOrderByRelevanceFieldEnum]


  export const OrganizacaoCandidataOrderByRelevanceFieldEnum: {
    id: 'id',
    razaoSocial: 'razaoSocial',
    cnpj: 'cnpj',
    sede: 'sede',
    repNome: 'repNome',
    repCpf: 'repCpf',
    emailEntidade: 'emailEntidade',
    telefone: 'telefone',
    cnpjChapa: 'cnpjChapa',
    candidaturaId: 'candidaturaId'
  };

  export type OrganizacaoCandidataOrderByRelevanceFieldEnum = (typeof OrganizacaoCandidataOrderByRelevanceFieldEnum)[keyof typeof OrganizacaoCandidataOrderByRelevanceFieldEnum]


  export const CandidatoOrderByRelevanceFieldEnum: {
    id: 'id',
    nome: 'nome',
    nomeSocial: 'nomeSocial',
    nomeEmpresa: 'nomeEmpresa',
    cpf: 'cpf',
    tituloEleitor: 'tituloEleitor',
    domicilioEleitoral: 'domicilioEleitoral',
    email: 'email',
    telefone: 'telefone',
    candidaturaId: 'candidaturaId'
  };

  export type CandidatoOrderByRelevanceFieldEnum = (typeof CandidatoOrderByRelevanceFieldEnum)[keyof typeof CandidatoOrderByRelevanceFieldEnum]


  export const EleitorOrderByRelevanceFieldEnum: {
    id: 'id',
    usuarioId: 'usuarioId',
    candidatoId: 'candidatoId',
    eleitorPaiId: 'eleitorPaiId'
  };

  export type EleitorOrderByRelevanceFieldEnum = (typeof EleitorOrderByRelevanceFieldEnum)[keyof typeof EleitorOrderByRelevanceFieldEnum]


  export const OrganizacaoEleitoraOrderByRelevanceFieldEnum: {
    id: 'id',
    razaoSocial: 'razaoSocial',
    cnpj: 'cnpj',
    sede: 'sede',
    repNome: 'repNome',
    repCpf: 'repCpf',
    repTituloEleitor: 'repTituloEleitor',
    repDomicilio: 'repDomicilio',
    emailEntidade: 'emailEntidade',
    telefone: 'telefone',
    eleitorId: 'eleitorId'
  };

  export type OrganizacaoEleitoraOrderByRelevanceFieldEnum = (typeof OrganizacaoEleitoraOrderByRelevanceFieldEnum)[keyof typeof OrganizacaoEleitoraOrderByRelevanceFieldEnum]


  export const ProcuradorOrderByRelevanceFieldEnum: {
    id: 'id',
    nome: 'nome',
    cpf: 'cpf',
    tituloEleitor: 'tituloEleitor',
    eleitorId: 'eleitorId'
  };

  export type ProcuradorOrderByRelevanceFieldEnum = (typeof ProcuradorOrderByRelevanceFieldEnum)[keyof typeof ProcuradorOrderByRelevanceFieldEnum]


  export const ArquivoOrderByRelevanceFieldEnum: {
    id: 'id',
    nome: 'nome',
    tipo: 'tipo',
    caminho: 'caminho',
    candidaturaId: 'candidaturaId',
    candidatoId: 'candidatoId',
    orgCandidataId: 'orgCandidataId',
    eleitorId: 'eleitorId',
    orgEleitoraId: 'orgEleitoraId'
  };

  export type ArquivoOrderByRelevanceFieldEnum = (typeof ArquivoOrderByRelevanceFieldEnum)[keyof typeof ArquivoOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'TipoUsuario'
   */
  export type EnumTipoUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoUsuario'>
    


  /**
   * Reference to a field of type 'Permissao'
   */
  export type EnumPermissaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Permissao'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'TipoInscricao'
   */
  export type EnumTipoInscricaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoInscricao'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Segmento'
   */
  export type EnumSegmentoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Segmento'>
    


  /**
   * Reference to a field of type 'TipoCandidato'
   */
  export type EnumTipoCandidatoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoCandidato'>
    


  /**
   * Reference to a field of type 'Genero'
   */
  export type EnumGeneroFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Genero'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'CategoriaArquivo'
   */
  export type EnumCategoriaArquivoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategoriaArquivo'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    tipo?: EnumTipoUsuarioFilter<"Usuario"> | $Enums.TipoUsuario
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    login?: StringNullableFilter<"Usuario"> | string | null
    permissao?: EnumPermissaoNullableFilter<"Usuario"> | $Enums.Permissao | null
    status?: BoolFilter<"Usuario"> | boolean
    senha?: StringNullableFilter<"Usuario"> | string | null
    primeiroAcesso?: BoolFilter<"Usuario"> | boolean
    criadoEm?: DateTimeFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeFilter<"Usuario"> | Date | string
    candidatura?: XOR<CandidaturaNullableScalarRelationFilter, CandidaturaWhereInput> | null
    eleitor?: XOR<EleitorNullableScalarRelationFilter, EleitorWhereInput> | null
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    tipo?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    login?: SortOrderInput | SortOrder
    permissao?: SortOrderInput | SortOrder
    status?: SortOrder
    senha?: SortOrderInput | SortOrder
    primeiroAcesso?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    candidatura?: CandidaturaOrderByWithRelationInput
    eleitor?: EleitorOrderByWithRelationInput
    _relevance?: UsuarioOrderByRelevanceInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    login?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    tipo?: EnumTipoUsuarioFilter<"Usuario"> | $Enums.TipoUsuario
    nome?: StringFilter<"Usuario"> | string
    permissao?: EnumPermissaoNullableFilter<"Usuario"> | $Enums.Permissao | null
    status?: BoolFilter<"Usuario"> | boolean
    senha?: StringNullableFilter<"Usuario"> | string | null
    primeiroAcesso?: BoolFilter<"Usuario"> | boolean
    criadoEm?: DateTimeFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeFilter<"Usuario"> | Date | string
    candidatura?: XOR<CandidaturaNullableScalarRelationFilter, CandidaturaWhereInput> | null
    eleitor?: XOR<EleitorNullableScalarRelationFilter, EleitorWhereInput> | null
  }, "id" | "email" | "login">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    tipo?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    login?: SortOrderInput | SortOrder
    permissao?: SortOrderInput | SortOrder
    status?: SortOrder
    senha?: SortOrderInput | SortOrder
    primeiroAcesso?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    tipo?: EnumTipoUsuarioWithAggregatesFilter<"Usuario"> | $Enums.TipoUsuario
    nome?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    login?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    permissao?: EnumPermissaoNullableWithAggregatesFilter<"Usuario"> | $Enums.Permissao | null
    status?: BoolWithAggregatesFilter<"Usuario"> | boolean
    senha?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    primeiroAcesso?: BoolWithAggregatesFilter<"Usuario"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type CandidaturaWhereInput = {
    AND?: CandidaturaWhereInput | CandidaturaWhereInput[]
    OR?: CandidaturaWhereInput[]
    NOT?: CandidaturaWhereInput | CandidaturaWhereInput[]
    id?: StringFilter<"Candidatura"> | string
    tipoInscricao?: EnumTipoInscricaoFilter<"Candidatura"> | $Enums.TipoInscricao
    status?: EnumStatusFilter<"Candidatura"> | $Enums.Status
    oculto?: BoolFilter<"Candidatura"> | boolean
    motivoIndeferimento?: StringNullableFilter<"Candidatura"> | string | null
    usuarioId?: StringFilter<"Candidatura"> | string
    criadoEm?: DateTimeFilter<"Candidatura"> | Date | string
    atualizadoEm?: DateTimeFilter<"Candidatura"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    organizacao?: XOR<OrganizacaoCandidataNullableScalarRelationFilter, OrganizacaoCandidataWhereInput> | null
    candidatos?: CandidatoListRelationFilter
    arquivos?: ArquivoListRelationFilter
  }

  export type CandidaturaOrderByWithRelationInput = {
    id?: SortOrder
    tipoInscricao?: SortOrder
    status?: SortOrder
    oculto?: SortOrder
    motivoIndeferimento?: SortOrderInput | SortOrder
    usuarioId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    organizacao?: OrganizacaoCandidataOrderByWithRelationInput
    candidatos?: CandidatoOrderByRelationAggregateInput
    arquivos?: ArquivoOrderByRelationAggregateInput
    _relevance?: CandidaturaOrderByRelevanceInput
  }

  export type CandidaturaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    usuarioId?: string
    AND?: CandidaturaWhereInput | CandidaturaWhereInput[]
    OR?: CandidaturaWhereInput[]
    NOT?: CandidaturaWhereInput | CandidaturaWhereInput[]
    tipoInscricao?: EnumTipoInscricaoFilter<"Candidatura"> | $Enums.TipoInscricao
    status?: EnumStatusFilter<"Candidatura"> | $Enums.Status
    oculto?: BoolFilter<"Candidatura"> | boolean
    motivoIndeferimento?: StringNullableFilter<"Candidatura"> | string | null
    criadoEm?: DateTimeFilter<"Candidatura"> | Date | string
    atualizadoEm?: DateTimeFilter<"Candidatura"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    organizacao?: XOR<OrganizacaoCandidataNullableScalarRelationFilter, OrganizacaoCandidataWhereInput> | null
    candidatos?: CandidatoListRelationFilter
    arquivos?: ArquivoListRelationFilter
  }, "id" | "usuarioId">

  export type CandidaturaOrderByWithAggregationInput = {
    id?: SortOrder
    tipoInscricao?: SortOrder
    status?: SortOrder
    oculto?: SortOrder
    motivoIndeferimento?: SortOrderInput | SortOrder
    usuarioId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: CandidaturaCountOrderByAggregateInput
    _max?: CandidaturaMaxOrderByAggregateInput
    _min?: CandidaturaMinOrderByAggregateInput
  }

  export type CandidaturaScalarWhereWithAggregatesInput = {
    AND?: CandidaturaScalarWhereWithAggregatesInput | CandidaturaScalarWhereWithAggregatesInput[]
    OR?: CandidaturaScalarWhereWithAggregatesInput[]
    NOT?: CandidaturaScalarWhereWithAggregatesInput | CandidaturaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Candidatura"> | string
    tipoInscricao?: EnumTipoInscricaoWithAggregatesFilter<"Candidatura"> | $Enums.TipoInscricao
    status?: EnumStatusWithAggregatesFilter<"Candidatura"> | $Enums.Status
    oculto?: BoolWithAggregatesFilter<"Candidatura"> | boolean
    motivoIndeferimento?: StringNullableWithAggregatesFilter<"Candidatura"> | string | null
    usuarioId?: StringWithAggregatesFilter<"Candidatura"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Candidatura"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Candidatura"> | Date | string
  }

  export type OrganizacaoCandidataWhereInput = {
    AND?: OrganizacaoCandidataWhereInput | OrganizacaoCandidataWhereInput[]
    OR?: OrganizacaoCandidataWhereInput[]
    NOT?: OrganizacaoCandidataWhereInput | OrganizacaoCandidataWhereInput[]
    id?: StringFilter<"OrganizacaoCandidata"> | string
    razaoSocial?: StringFilter<"OrganizacaoCandidata"> | string
    cnpj?: StringFilter<"OrganizacaoCandidata"> | string
    segmento?: EnumSegmentoFilter<"OrganizacaoCandidata"> | $Enums.Segmento
    dataAbertura?: DateTimeFilter<"OrganizacaoCandidata"> | Date | string
    sede?: StringFilter<"OrganizacaoCandidata"> | string
    repNome?: StringFilter<"OrganizacaoCandidata"> | string
    repCpf?: StringFilter<"OrganizacaoCandidata"> | string
    emailEntidade?: StringFilter<"OrganizacaoCandidata"> | string
    telefone?: StringNullableFilter<"OrganizacaoCandidata"> | string | null
    formaChapa?: BoolFilter<"OrganizacaoCandidata"> | boolean
    cnpjChapa?: StringNullableFilter<"OrganizacaoCandidata"> | string | null
    candidaturaId?: StringFilter<"OrganizacaoCandidata"> | string
    criadoEm?: DateTimeFilter<"OrganizacaoCandidata"> | Date | string
    atualizadoEm?: DateTimeFilter<"OrganizacaoCandidata"> | Date | string
    candidatura?: XOR<CandidaturaScalarRelationFilter, CandidaturaWhereInput>
    arquivos?: ArquivoListRelationFilter
  }

  export type OrganizacaoCandidataOrderByWithRelationInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    segmento?: SortOrder
    dataAbertura?: SortOrder
    sede?: SortOrder
    repNome?: SortOrder
    repCpf?: SortOrder
    emailEntidade?: SortOrder
    telefone?: SortOrderInput | SortOrder
    formaChapa?: SortOrder
    cnpjChapa?: SortOrderInput | SortOrder
    candidaturaId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    candidatura?: CandidaturaOrderByWithRelationInput
    arquivos?: ArquivoOrderByRelationAggregateInput
    _relevance?: OrganizacaoCandidataOrderByRelevanceInput
  }

  export type OrganizacaoCandidataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cnpj?: string
    candidaturaId?: string
    AND?: OrganizacaoCandidataWhereInput | OrganizacaoCandidataWhereInput[]
    OR?: OrganizacaoCandidataWhereInput[]
    NOT?: OrganizacaoCandidataWhereInput | OrganizacaoCandidataWhereInput[]
    razaoSocial?: StringFilter<"OrganizacaoCandidata"> | string
    segmento?: EnumSegmentoFilter<"OrganizacaoCandidata"> | $Enums.Segmento
    dataAbertura?: DateTimeFilter<"OrganizacaoCandidata"> | Date | string
    sede?: StringFilter<"OrganizacaoCandidata"> | string
    repNome?: StringFilter<"OrganizacaoCandidata"> | string
    repCpf?: StringFilter<"OrganizacaoCandidata"> | string
    emailEntidade?: StringFilter<"OrganizacaoCandidata"> | string
    telefone?: StringNullableFilter<"OrganizacaoCandidata"> | string | null
    formaChapa?: BoolFilter<"OrganizacaoCandidata"> | boolean
    cnpjChapa?: StringNullableFilter<"OrganizacaoCandidata"> | string | null
    criadoEm?: DateTimeFilter<"OrganizacaoCandidata"> | Date | string
    atualizadoEm?: DateTimeFilter<"OrganizacaoCandidata"> | Date | string
    candidatura?: XOR<CandidaturaScalarRelationFilter, CandidaturaWhereInput>
    arquivos?: ArquivoListRelationFilter
  }, "id" | "cnpj" | "candidaturaId">

  export type OrganizacaoCandidataOrderByWithAggregationInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    segmento?: SortOrder
    dataAbertura?: SortOrder
    sede?: SortOrder
    repNome?: SortOrder
    repCpf?: SortOrder
    emailEntidade?: SortOrder
    telefone?: SortOrderInput | SortOrder
    formaChapa?: SortOrder
    cnpjChapa?: SortOrderInput | SortOrder
    candidaturaId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: OrganizacaoCandidataCountOrderByAggregateInput
    _max?: OrganizacaoCandidataMaxOrderByAggregateInput
    _min?: OrganizacaoCandidataMinOrderByAggregateInput
  }

  export type OrganizacaoCandidataScalarWhereWithAggregatesInput = {
    AND?: OrganizacaoCandidataScalarWhereWithAggregatesInput | OrganizacaoCandidataScalarWhereWithAggregatesInput[]
    OR?: OrganizacaoCandidataScalarWhereWithAggregatesInput[]
    NOT?: OrganizacaoCandidataScalarWhereWithAggregatesInput | OrganizacaoCandidataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrganizacaoCandidata"> | string
    razaoSocial?: StringWithAggregatesFilter<"OrganizacaoCandidata"> | string
    cnpj?: StringWithAggregatesFilter<"OrganizacaoCandidata"> | string
    segmento?: EnumSegmentoWithAggregatesFilter<"OrganizacaoCandidata"> | $Enums.Segmento
    dataAbertura?: DateTimeWithAggregatesFilter<"OrganizacaoCandidata"> | Date | string
    sede?: StringWithAggregatesFilter<"OrganizacaoCandidata"> | string
    repNome?: StringWithAggregatesFilter<"OrganizacaoCandidata"> | string
    repCpf?: StringWithAggregatesFilter<"OrganizacaoCandidata"> | string
    emailEntidade?: StringWithAggregatesFilter<"OrganizacaoCandidata"> | string
    telefone?: StringNullableWithAggregatesFilter<"OrganizacaoCandidata"> | string | null
    formaChapa?: BoolWithAggregatesFilter<"OrganizacaoCandidata"> | boolean
    cnpjChapa?: StringNullableWithAggregatesFilter<"OrganizacaoCandidata"> | string | null
    candidaturaId?: StringWithAggregatesFilter<"OrganizacaoCandidata"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"OrganizacaoCandidata"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"OrganizacaoCandidata"> | Date | string
  }

  export type CandidatoWhereInput = {
    AND?: CandidatoWhereInput | CandidatoWhereInput[]
    OR?: CandidatoWhereInput[]
    NOT?: CandidatoWhereInput | CandidatoWhereInput[]
    id?: StringFilter<"Candidato"> | string
    tipoCandidato?: EnumTipoCandidatoFilter<"Candidato"> | $Enums.TipoCandidato
    nome?: StringFilter<"Candidato"> | string
    nomeSocial?: StringNullableFilter<"Candidato"> | string | null
    nomeEmpresa?: StringNullableFilter<"Candidato"> | string | null
    genero?: EnumGeneroFilter<"Candidato"> | $Enums.Genero
    dataNascimento?: DateTimeFilter<"Candidato"> | Date | string
    cpf?: StringFilter<"Candidato"> | string
    tituloEleitor?: StringNullableFilter<"Candidato"> | string | null
    domicilioEleitoral?: StringNullableFilter<"Candidato"> | string | null
    email?: StringFilter<"Candidato"> | string
    telefone?: StringNullableFilter<"Candidato"> | string | null
    candidaturaId?: StringFilter<"Candidato"> | string
    criadoEm?: DateTimeFilter<"Candidato"> | Date | string
    atualizadoEm?: DateTimeFilter<"Candidato"> | Date | string
    candidatura?: XOR<CandidaturaScalarRelationFilter, CandidaturaWhereInput>
    arquivos?: ArquivoListRelationFilter
    eleitor?: XOR<EleitorNullableScalarRelationFilter, EleitorWhereInput> | null
  }

  export type CandidatoOrderByWithRelationInput = {
    id?: SortOrder
    tipoCandidato?: SortOrder
    nome?: SortOrder
    nomeSocial?: SortOrderInput | SortOrder
    nomeEmpresa?: SortOrderInput | SortOrder
    genero?: SortOrder
    dataNascimento?: SortOrder
    cpf?: SortOrder
    tituloEleitor?: SortOrderInput | SortOrder
    domicilioEleitoral?: SortOrderInput | SortOrder
    email?: SortOrder
    telefone?: SortOrderInput | SortOrder
    candidaturaId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    candidatura?: CandidaturaOrderByWithRelationInput
    arquivos?: ArquivoOrderByRelationAggregateInput
    eleitor?: EleitorOrderByWithRelationInput
    _relevance?: CandidatoOrderByRelevanceInput
  }

  export type CandidatoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cpf?: string
    AND?: CandidatoWhereInput | CandidatoWhereInput[]
    OR?: CandidatoWhereInput[]
    NOT?: CandidatoWhereInput | CandidatoWhereInput[]
    tipoCandidato?: EnumTipoCandidatoFilter<"Candidato"> | $Enums.TipoCandidato
    nome?: StringFilter<"Candidato"> | string
    nomeSocial?: StringNullableFilter<"Candidato"> | string | null
    nomeEmpresa?: StringNullableFilter<"Candidato"> | string | null
    genero?: EnumGeneroFilter<"Candidato"> | $Enums.Genero
    dataNascimento?: DateTimeFilter<"Candidato"> | Date | string
    tituloEleitor?: StringNullableFilter<"Candidato"> | string | null
    domicilioEleitoral?: StringNullableFilter<"Candidato"> | string | null
    email?: StringFilter<"Candidato"> | string
    telefone?: StringNullableFilter<"Candidato"> | string | null
    candidaturaId?: StringFilter<"Candidato"> | string
    criadoEm?: DateTimeFilter<"Candidato"> | Date | string
    atualizadoEm?: DateTimeFilter<"Candidato"> | Date | string
    candidatura?: XOR<CandidaturaScalarRelationFilter, CandidaturaWhereInput>
    arquivos?: ArquivoListRelationFilter
    eleitor?: XOR<EleitorNullableScalarRelationFilter, EleitorWhereInput> | null
  }, "id" | "cpf">

  export type CandidatoOrderByWithAggregationInput = {
    id?: SortOrder
    tipoCandidato?: SortOrder
    nome?: SortOrder
    nomeSocial?: SortOrderInput | SortOrder
    nomeEmpresa?: SortOrderInput | SortOrder
    genero?: SortOrder
    dataNascimento?: SortOrder
    cpf?: SortOrder
    tituloEleitor?: SortOrderInput | SortOrder
    domicilioEleitoral?: SortOrderInput | SortOrder
    email?: SortOrder
    telefone?: SortOrderInput | SortOrder
    candidaturaId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: CandidatoCountOrderByAggregateInput
    _max?: CandidatoMaxOrderByAggregateInput
    _min?: CandidatoMinOrderByAggregateInput
  }

  export type CandidatoScalarWhereWithAggregatesInput = {
    AND?: CandidatoScalarWhereWithAggregatesInput | CandidatoScalarWhereWithAggregatesInput[]
    OR?: CandidatoScalarWhereWithAggregatesInput[]
    NOT?: CandidatoScalarWhereWithAggregatesInput | CandidatoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Candidato"> | string
    tipoCandidato?: EnumTipoCandidatoWithAggregatesFilter<"Candidato"> | $Enums.TipoCandidato
    nome?: StringWithAggregatesFilter<"Candidato"> | string
    nomeSocial?: StringNullableWithAggregatesFilter<"Candidato"> | string | null
    nomeEmpresa?: StringNullableWithAggregatesFilter<"Candidato"> | string | null
    genero?: EnumGeneroWithAggregatesFilter<"Candidato"> | $Enums.Genero
    dataNascimento?: DateTimeWithAggregatesFilter<"Candidato"> | Date | string
    cpf?: StringWithAggregatesFilter<"Candidato"> | string
    tituloEleitor?: StringNullableWithAggregatesFilter<"Candidato"> | string | null
    domicilioEleitoral?: StringNullableWithAggregatesFilter<"Candidato"> | string | null
    email?: StringWithAggregatesFilter<"Candidato"> | string
    telefone?: StringNullableWithAggregatesFilter<"Candidato"> | string | null
    candidaturaId?: StringWithAggregatesFilter<"Candidato"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Candidato"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Candidato"> | Date | string
  }

  export type EleitorWhereInput = {
    AND?: EleitorWhereInput | EleitorWhereInput[]
    OR?: EleitorWhereInput[]
    NOT?: EleitorWhereInput | EleitorWhereInput[]
    id?: StringFilter<"Eleitor"> | string
    status?: EnumStatusFilter<"Eleitor"> | $Enums.Status
    oculto?: BoolFilter<"Eleitor"> | boolean
    usuarioId?: StringNullableFilter<"Eleitor"> | string | null
    candidatoId?: StringNullableFilter<"Eleitor"> | string | null
    eleitorPaiId?: StringNullableFilter<"Eleitor"> | string | null
    criadoEm?: DateTimeFilter<"Eleitor"> | Date | string
    atualizadoEm?: DateTimeFilter<"Eleitor"> | Date | string
    usuario?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
    candidato?: XOR<CandidatoNullableScalarRelationFilter, CandidatoWhereInput> | null
    eleitorPai?: XOR<EleitorNullableScalarRelationFilter, EleitorWhereInput> | null
    membros?: EleitorListRelationFilter
    organizacao?: XOR<OrganizacaoEleitoraNullableScalarRelationFilter, OrganizacaoEleitoraWhereInput> | null
    procurador?: XOR<ProcuradorNullableScalarRelationFilter, ProcuradorWhereInput> | null
    arquivos?: ArquivoListRelationFilter
  }

  export type EleitorOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    oculto?: SortOrder
    usuarioId?: SortOrderInput | SortOrder
    candidatoId?: SortOrderInput | SortOrder
    eleitorPaiId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    candidato?: CandidatoOrderByWithRelationInput
    eleitorPai?: EleitorOrderByWithRelationInput
    membros?: EleitorOrderByRelationAggregateInput
    organizacao?: OrganizacaoEleitoraOrderByWithRelationInput
    procurador?: ProcuradorOrderByWithRelationInput
    arquivos?: ArquivoOrderByRelationAggregateInput
    _relevance?: EleitorOrderByRelevanceInput
  }

  export type EleitorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    usuarioId?: string
    candidatoId?: string
    AND?: EleitorWhereInput | EleitorWhereInput[]
    OR?: EleitorWhereInput[]
    NOT?: EleitorWhereInput | EleitorWhereInput[]
    status?: EnumStatusFilter<"Eleitor"> | $Enums.Status
    oculto?: BoolFilter<"Eleitor"> | boolean
    eleitorPaiId?: StringNullableFilter<"Eleitor"> | string | null
    criadoEm?: DateTimeFilter<"Eleitor"> | Date | string
    atualizadoEm?: DateTimeFilter<"Eleitor"> | Date | string
    usuario?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
    candidato?: XOR<CandidatoNullableScalarRelationFilter, CandidatoWhereInput> | null
    eleitorPai?: XOR<EleitorNullableScalarRelationFilter, EleitorWhereInput> | null
    membros?: EleitorListRelationFilter
    organizacao?: XOR<OrganizacaoEleitoraNullableScalarRelationFilter, OrganizacaoEleitoraWhereInput> | null
    procurador?: XOR<ProcuradorNullableScalarRelationFilter, ProcuradorWhereInput> | null
    arquivos?: ArquivoListRelationFilter
  }, "id" | "usuarioId" | "candidatoId">

  export type EleitorOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    oculto?: SortOrder
    usuarioId?: SortOrderInput | SortOrder
    candidatoId?: SortOrderInput | SortOrder
    eleitorPaiId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: EleitorCountOrderByAggregateInput
    _max?: EleitorMaxOrderByAggregateInput
    _min?: EleitorMinOrderByAggregateInput
  }

  export type EleitorScalarWhereWithAggregatesInput = {
    AND?: EleitorScalarWhereWithAggregatesInput | EleitorScalarWhereWithAggregatesInput[]
    OR?: EleitorScalarWhereWithAggregatesInput[]
    NOT?: EleitorScalarWhereWithAggregatesInput | EleitorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Eleitor"> | string
    status?: EnumStatusWithAggregatesFilter<"Eleitor"> | $Enums.Status
    oculto?: BoolWithAggregatesFilter<"Eleitor"> | boolean
    usuarioId?: StringNullableWithAggregatesFilter<"Eleitor"> | string | null
    candidatoId?: StringNullableWithAggregatesFilter<"Eleitor"> | string | null
    eleitorPaiId?: StringNullableWithAggregatesFilter<"Eleitor"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Eleitor"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Eleitor"> | Date | string
  }

  export type OrganizacaoEleitoraWhereInput = {
    AND?: OrganizacaoEleitoraWhereInput | OrganizacaoEleitoraWhereInput[]
    OR?: OrganizacaoEleitoraWhereInput[]
    NOT?: OrganizacaoEleitoraWhereInput | OrganizacaoEleitoraWhereInput[]
    id?: StringFilter<"OrganizacaoEleitora"> | string
    razaoSocial?: StringFilter<"OrganizacaoEleitora"> | string
    cnpj?: StringFilter<"OrganizacaoEleitora"> | string
    segmento?: EnumSegmentoFilter<"OrganizacaoEleitora"> | $Enums.Segmento
    dataAbertura?: DateTimeFilter<"OrganizacaoEleitora"> | Date | string
    sede?: StringFilter<"OrganizacaoEleitora"> | string
    repNome?: StringFilter<"OrganizacaoEleitora"> | string
    repCpf?: StringFilter<"OrganizacaoEleitora"> | string
    repTituloEleitor?: StringNullableFilter<"OrganizacaoEleitora"> | string | null
    repDomicilio?: StringNullableFilter<"OrganizacaoEleitora"> | string | null
    emailEntidade?: StringFilter<"OrganizacaoEleitora"> | string
    telefone?: StringNullableFilter<"OrganizacaoEleitora"> | string | null
    eleitorId?: StringFilter<"OrganizacaoEleitora"> | string
    criadoEm?: DateTimeFilter<"OrganizacaoEleitora"> | Date | string
    atualizadoEm?: DateTimeFilter<"OrganizacaoEleitora"> | Date | string
    eleitor?: XOR<EleitorScalarRelationFilter, EleitorWhereInput>
    arquivos?: ArquivoListRelationFilter
  }

  export type OrganizacaoEleitoraOrderByWithRelationInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    segmento?: SortOrder
    dataAbertura?: SortOrder
    sede?: SortOrder
    repNome?: SortOrder
    repCpf?: SortOrder
    repTituloEleitor?: SortOrderInput | SortOrder
    repDomicilio?: SortOrderInput | SortOrder
    emailEntidade?: SortOrder
    telefone?: SortOrderInput | SortOrder
    eleitorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    eleitor?: EleitorOrderByWithRelationInput
    arquivos?: ArquivoOrderByRelationAggregateInput
    _relevance?: OrganizacaoEleitoraOrderByRelevanceInput
  }

  export type OrganizacaoEleitoraWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cnpj?: string
    eleitorId?: string
    AND?: OrganizacaoEleitoraWhereInput | OrganizacaoEleitoraWhereInput[]
    OR?: OrganizacaoEleitoraWhereInput[]
    NOT?: OrganizacaoEleitoraWhereInput | OrganizacaoEleitoraWhereInput[]
    razaoSocial?: StringFilter<"OrganizacaoEleitora"> | string
    segmento?: EnumSegmentoFilter<"OrganizacaoEleitora"> | $Enums.Segmento
    dataAbertura?: DateTimeFilter<"OrganizacaoEleitora"> | Date | string
    sede?: StringFilter<"OrganizacaoEleitora"> | string
    repNome?: StringFilter<"OrganizacaoEleitora"> | string
    repCpf?: StringFilter<"OrganizacaoEleitora"> | string
    repTituloEleitor?: StringNullableFilter<"OrganizacaoEleitora"> | string | null
    repDomicilio?: StringNullableFilter<"OrganizacaoEleitora"> | string | null
    emailEntidade?: StringFilter<"OrganizacaoEleitora"> | string
    telefone?: StringNullableFilter<"OrganizacaoEleitora"> | string | null
    criadoEm?: DateTimeFilter<"OrganizacaoEleitora"> | Date | string
    atualizadoEm?: DateTimeFilter<"OrganizacaoEleitora"> | Date | string
    eleitor?: XOR<EleitorScalarRelationFilter, EleitorWhereInput>
    arquivos?: ArquivoListRelationFilter
  }, "id" | "cnpj" | "eleitorId">

  export type OrganizacaoEleitoraOrderByWithAggregationInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    segmento?: SortOrder
    dataAbertura?: SortOrder
    sede?: SortOrder
    repNome?: SortOrder
    repCpf?: SortOrder
    repTituloEleitor?: SortOrderInput | SortOrder
    repDomicilio?: SortOrderInput | SortOrder
    emailEntidade?: SortOrder
    telefone?: SortOrderInput | SortOrder
    eleitorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: OrganizacaoEleitoraCountOrderByAggregateInput
    _max?: OrganizacaoEleitoraMaxOrderByAggregateInput
    _min?: OrganizacaoEleitoraMinOrderByAggregateInput
  }

  export type OrganizacaoEleitoraScalarWhereWithAggregatesInput = {
    AND?: OrganizacaoEleitoraScalarWhereWithAggregatesInput | OrganizacaoEleitoraScalarWhereWithAggregatesInput[]
    OR?: OrganizacaoEleitoraScalarWhereWithAggregatesInput[]
    NOT?: OrganizacaoEleitoraScalarWhereWithAggregatesInput | OrganizacaoEleitoraScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrganizacaoEleitora"> | string
    razaoSocial?: StringWithAggregatesFilter<"OrganizacaoEleitora"> | string
    cnpj?: StringWithAggregatesFilter<"OrganizacaoEleitora"> | string
    segmento?: EnumSegmentoWithAggregatesFilter<"OrganizacaoEleitora"> | $Enums.Segmento
    dataAbertura?: DateTimeWithAggregatesFilter<"OrganizacaoEleitora"> | Date | string
    sede?: StringWithAggregatesFilter<"OrganizacaoEleitora"> | string
    repNome?: StringWithAggregatesFilter<"OrganizacaoEleitora"> | string
    repCpf?: StringWithAggregatesFilter<"OrganizacaoEleitora"> | string
    repTituloEleitor?: StringNullableWithAggregatesFilter<"OrganizacaoEleitora"> | string | null
    repDomicilio?: StringNullableWithAggregatesFilter<"OrganizacaoEleitora"> | string | null
    emailEntidade?: StringWithAggregatesFilter<"OrganizacaoEleitora"> | string
    telefone?: StringNullableWithAggregatesFilter<"OrganizacaoEleitora"> | string | null
    eleitorId?: StringWithAggregatesFilter<"OrganizacaoEleitora"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"OrganizacaoEleitora"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"OrganizacaoEleitora"> | Date | string
  }

  export type ProcuradorWhereInput = {
    AND?: ProcuradorWhereInput | ProcuradorWhereInput[]
    OR?: ProcuradorWhereInput[]
    NOT?: ProcuradorWhereInput | ProcuradorWhereInput[]
    id?: StringFilter<"Procurador"> | string
    nome?: StringFilter<"Procurador"> | string
    cpf?: StringFilter<"Procurador"> | string
    tituloEleitor?: StringNullableFilter<"Procurador"> | string | null
    eleitorId?: StringFilter<"Procurador"> | string
    criadoEm?: DateTimeFilter<"Procurador"> | Date | string
    atualizadoEm?: DateTimeFilter<"Procurador"> | Date | string
    eleitor?: XOR<EleitorScalarRelationFilter, EleitorWhereInput>
  }

  export type ProcuradorOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    tituloEleitor?: SortOrderInput | SortOrder
    eleitorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    eleitor?: EleitorOrderByWithRelationInput
    _relevance?: ProcuradorOrderByRelevanceInput
  }

  export type ProcuradorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cpf?: string
    eleitorId?: string
    AND?: ProcuradorWhereInput | ProcuradorWhereInput[]
    OR?: ProcuradorWhereInput[]
    NOT?: ProcuradorWhereInput | ProcuradorWhereInput[]
    nome?: StringFilter<"Procurador"> | string
    tituloEleitor?: StringNullableFilter<"Procurador"> | string | null
    criadoEm?: DateTimeFilter<"Procurador"> | Date | string
    atualizadoEm?: DateTimeFilter<"Procurador"> | Date | string
    eleitor?: XOR<EleitorScalarRelationFilter, EleitorWhereInput>
  }, "id" | "cpf" | "eleitorId">

  export type ProcuradorOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    tituloEleitor?: SortOrderInput | SortOrder
    eleitorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: ProcuradorCountOrderByAggregateInput
    _max?: ProcuradorMaxOrderByAggregateInput
    _min?: ProcuradorMinOrderByAggregateInput
  }

  export type ProcuradorScalarWhereWithAggregatesInput = {
    AND?: ProcuradorScalarWhereWithAggregatesInput | ProcuradorScalarWhereWithAggregatesInput[]
    OR?: ProcuradorScalarWhereWithAggregatesInput[]
    NOT?: ProcuradorScalarWhereWithAggregatesInput | ProcuradorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Procurador"> | string
    nome?: StringWithAggregatesFilter<"Procurador"> | string
    cpf?: StringWithAggregatesFilter<"Procurador"> | string
    tituloEleitor?: StringNullableWithAggregatesFilter<"Procurador"> | string | null
    eleitorId?: StringWithAggregatesFilter<"Procurador"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Procurador"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Procurador"> | Date | string
  }

  export type ArquivoWhereInput = {
    AND?: ArquivoWhereInput | ArquivoWhereInput[]
    OR?: ArquivoWhereInput[]
    NOT?: ArquivoWhereInput | ArquivoWhereInput[]
    id?: StringFilter<"Arquivo"> | string
    nome?: StringFilter<"Arquivo"> | string
    tipo?: StringFilter<"Arquivo"> | string
    tamanho?: IntFilter<"Arquivo"> | number
    caminho?: StringFilter<"Arquivo"> | string
    categoria?: EnumCategoriaArquivoFilter<"Arquivo"> | $Enums.CategoriaArquivo
    candidaturaId?: StringNullableFilter<"Arquivo"> | string | null
    candidatoId?: StringNullableFilter<"Arquivo"> | string | null
    orgCandidataId?: StringNullableFilter<"Arquivo"> | string | null
    eleitorId?: StringNullableFilter<"Arquivo"> | string | null
    orgEleitoraId?: StringNullableFilter<"Arquivo"> | string | null
    criadoEm?: DateTimeFilter<"Arquivo"> | Date | string
    atualizadoEm?: DateTimeFilter<"Arquivo"> | Date | string
    candidatura?: XOR<CandidaturaNullableScalarRelationFilter, CandidaturaWhereInput> | null
    candidato?: XOR<CandidatoNullableScalarRelationFilter, CandidatoWhereInput> | null
    orgCandidata?: XOR<OrganizacaoCandidataNullableScalarRelationFilter, OrganizacaoCandidataWhereInput> | null
    eleitor?: XOR<EleitorNullableScalarRelationFilter, EleitorWhereInput> | null
    orgEleitora?: XOR<OrganizacaoEleitoraNullableScalarRelationFilter, OrganizacaoEleitoraWhereInput> | null
  }

  export type ArquivoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    tamanho?: SortOrder
    caminho?: SortOrder
    categoria?: SortOrder
    candidaturaId?: SortOrderInput | SortOrder
    candidatoId?: SortOrderInput | SortOrder
    orgCandidataId?: SortOrderInput | SortOrder
    eleitorId?: SortOrderInput | SortOrder
    orgEleitoraId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    candidatura?: CandidaturaOrderByWithRelationInput
    candidato?: CandidatoOrderByWithRelationInput
    orgCandidata?: OrganizacaoCandidataOrderByWithRelationInput
    eleitor?: EleitorOrderByWithRelationInput
    orgEleitora?: OrganizacaoEleitoraOrderByWithRelationInput
    _relevance?: ArquivoOrderByRelevanceInput
  }

  export type ArquivoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArquivoWhereInput | ArquivoWhereInput[]
    OR?: ArquivoWhereInput[]
    NOT?: ArquivoWhereInput | ArquivoWhereInput[]
    nome?: StringFilter<"Arquivo"> | string
    tipo?: StringFilter<"Arquivo"> | string
    tamanho?: IntFilter<"Arquivo"> | number
    caminho?: StringFilter<"Arquivo"> | string
    categoria?: EnumCategoriaArquivoFilter<"Arquivo"> | $Enums.CategoriaArquivo
    candidaturaId?: StringNullableFilter<"Arquivo"> | string | null
    candidatoId?: StringNullableFilter<"Arquivo"> | string | null
    orgCandidataId?: StringNullableFilter<"Arquivo"> | string | null
    eleitorId?: StringNullableFilter<"Arquivo"> | string | null
    orgEleitoraId?: StringNullableFilter<"Arquivo"> | string | null
    criadoEm?: DateTimeFilter<"Arquivo"> | Date | string
    atualizadoEm?: DateTimeFilter<"Arquivo"> | Date | string
    candidatura?: XOR<CandidaturaNullableScalarRelationFilter, CandidaturaWhereInput> | null
    candidato?: XOR<CandidatoNullableScalarRelationFilter, CandidatoWhereInput> | null
    orgCandidata?: XOR<OrganizacaoCandidataNullableScalarRelationFilter, OrganizacaoCandidataWhereInput> | null
    eleitor?: XOR<EleitorNullableScalarRelationFilter, EleitorWhereInput> | null
    orgEleitora?: XOR<OrganizacaoEleitoraNullableScalarRelationFilter, OrganizacaoEleitoraWhereInput> | null
  }, "id">

  export type ArquivoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    tamanho?: SortOrder
    caminho?: SortOrder
    categoria?: SortOrder
    candidaturaId?: SortOrderInput | SortOrder
    candidatoId?: SortOrderInput | SortOrder
    orgCandidataId?: SortOrderInput | SortOrder
    eleitorId?: SortOrderInput | SortOrder
    orgEleitoraId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: ArquivoCountOrderByAggregateInput
    _avg?: ArquivoAvgOrderByAggregateInput
    _max?: ArquivoMaxOrderByAggregateInput
    _min?: ArquivoMinOrderByAggregateInput
    _sum?: ArquivoSumOrderByAggregateInput
  }

  export type ArquivoScalarWhereWithAggregatesInput = {
    AND?: ArquivoScalarWhereWithAggregatesInput | ArquivoScalarWhereWithAggregatesInput[]
    OR?: ArquivoScalarWhereWithAggregatesInput[]
    NOT?: ArquivoScalarWhereWithAggregatesInput | ArquivoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Arquivo"> | string
    nome?: StringWithAggregatesFilter<"Arquivo"> | string
    tipo?: StringWithAggregatesFilter<"Arquivo"> | string
    tamanho?: IntWithAggregatesFilter<"Arquivo"> | number
    caminho?: StringWithAggregatesFilter<"Arquivo"> | string
    categoria?: EnumCategoriaArquivoWithAggregatesFilter<"Arquivo"> | $Enums.CategoriaArquivo
    candidaturaId?: StringNullableWithAggregatesFilter<"Arquivo"> | string | null
    candidatoId?: StringNullableWithAggregatesFilter<"Arquivo"> | string | null
    orgCandidataId?: StringNullableWithAggregatesFilter<"Arquivo"> | string | null
    eleitorId?: StringNullableWithAggregatesFilter<"Arquivo"> | string | null
    orgEleitoraId?: StringNullableWithAggregatesFilter<"Arquivo"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Arquivo"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Arquivo"> | Date | string
  }

  export type UsuarioCreateInput = {
    id?: string
    tipo?: $Enums.TipoUsuario
    nome: string
    email: string
    login?: string | null
    permissao?: $Enums.Permissao | null
    status?: boolean
    senha?: string | null
    primeiroAcesso?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura?: CandidaturaCreateNestedOneWithoutUsuarioInput
    eleitor?: EleitorCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    tipo?: $Enums.TipoUsuario
    nome: string
    email: string
    login?: string | null
    permissao?: $Enums.Permissao | null
    status?: boolean
    senha?: string | null
    primeiroAcesso?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura?: CandidaturaUncheckedCreateNestedOneWithoutUsuarioInput
    eleitor?: EleitorUncheckedCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    permissao?: NullableEnumPermissaoFieldUpdateOperationsInput | $Enums.Permissao | null
    status?: BoolFieldUpdateOperationsInput | boolean
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    primeiroAcesso?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneWithoutUsuarioNestedInput
    eleitor?: EleitorUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    permissao?: NullableEnumPermissaoFieldUpdateOperationsInput | $Enums.Permissao | null
    status?: BoolFieldUpdateOperationsInput | boolean
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    primeiroAcesso?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUncheckedUpdateOneWithoutUsuarioNestedInput
    eleitor?: EleitorUncheckedUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: string
    tipo?: $Enums.TipoUsuario
    nome: string
    email: string
    login?: string | null
    permissao?: $Enums.Permissao | null
    status?: boolean
    senha?: string | null
    primeiroAcesso?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    permissao?: NullableEnumPermissaoFieldUpdateOperationsInput | $Enums.Permissao | null
    status?: BoolFieldUpdateOperationsInput | boolean
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    primeiroAcesso?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    permissao?: NullableEnumPermissaoFieldUpdateOperationsInput | $Enums.Permissao | null
    status?: BoolFieldUpdateOperationsInput | boolean
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    primeiroAcesso?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidaturaCreateInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutCandidaturaInput
    organizacao?: OrganizacaoCandidataCreateNestedOneWithoutCandidaturaInput
    candidatos?: CandidatoCreateNestedManyWithoutCandidaturaInput
    arquivos?: ArquivoCreateNestedManyWithoutCandidaturaInput
  }

  export type CandidaturaUncheckedCreateInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    usuarioId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao?: OrganizacaoCandidataUncheckedCreateNestedOneWithoutCandidaturaInput
    candidatos?: CandidatoUncheckedCreateNestedManyWithoutCandidaturaInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutCandidaturaInput
  }

  export type CandidaturaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutCandidaturaNestedInput
    organizacao?: OrganizacaoCandidataUpdateOneWithoutCandidaturaNestedInput
    candidatos?: CandidatoUpdateManyWithoutCandidaturaNestedInput
    arquivos?: ArquivoUpdateManyWithoutCandidaturaNestedInput
  }

  export type CandidaturaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoCandidataUncheckedUpdateOneWithoutCandidaturaNestedInput
    candidatos?: CandidatoUncheckedUpdateManyWithoutCandidaturaNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutCandidaturaNestedInput
  }

  export type CandidaturaCreateManyInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    usuarioId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CandidaturaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidaturaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizacaoCandidataCreateInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    emailEntidade: string
    telefone?: string | null
    formaChapa?: boolean
    cnpjChapa?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura: CandidaturaCreateNestedOneWithoutOrganizacaoInput
    arquivos?: ArquivoCreateNestedManyWithoutOrgCandidataInput
  }

  export type OrganizacaoCandidataUncheckedCreateInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    emailEntidade: string
    telefone?: string | null
    formaChapa?: boolean
    cnpjChapa?: string | null
    candidaturaId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutOrgCandidataInput
  }

  export type OrganizacaoCandidataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    formaChapa?: BoolFieldUpdateOperationsInput | boolean
    cnpjChapa?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneRequiredWithoutOrganizacaoNestedInput
    arquivos?: ArquivoUpdateManyWithoutOrgCandidataNestedInput
  }

  export type OrganizacaoCandidataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    formaChapa?: BoolFieldUpdateOperationsInput | boolean
    cnpjChapa?: NullableStringFieldUpdateOperationsInput | string | null
    candidaturaId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    arquivos?: ArquivoUncheckedUpdateManyWithoutOrgCandidataNestedInput
  }

  export type OrganizacaoCandidataCreateManyInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    emailEntidade: string
    telefone?: string | null
    formaChapa?: boolean
    cnpjChapa?: string | null
    candidaturaId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrganizacaoCandidataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    formaChapa?: BoolFieldUpdateOperationsInput | boolean
    cnpjChapa?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizacaoCandidataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    formaChapa?: BoolFieldUpdateOperationsInput | boolean
    cnpjChapa?: NullableStringFieldUpdateOperationsInput | string | null
    candidaturaId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidatoCreateInput = {
    id?: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial?: string | null
    nomeEmpresa?: string | null
    genero: $Enums.Genero
    dataNascimento: Date | string
    cpf: string
    tituloEleitor?: string | null
    domicilioEleitoral?: string | null
    email: string
    telefone?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura: CandidaturaCreateNestedOneWithoutCandidatosInput
    arquivos?: ArquivoCreateNestedManyWithoutCandidatoInput
    eleitor?: EleitorCreateNestedOneWithoutCandidatoInput
  }

  export type CandidatoUncheckedCreateInput = {
    id?: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial?: string | null
    nomeEmpresa?: string | null
    genero: $Enums.Genero
    dataNascimento: Date | string
    cpf: string
    tituloEleitor?: string | null
    domicilioEleitoral?: string | null
    email: string
    telefone?: string | null
    candidaturaId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutCandidatoInput
    eleitor?: EleitorUncheckedCreateNestedOneWithoutCandidatoInput
  }

  export type CandidatoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneRequiredWithoutCandidatosNestedInput
    arquivos?: ArquivoUpdateManyWithoutCandidatoNestedInput
    eleitor?: EleitorUpdateOneWithoutCandidatoNestedInput
  }

  export type CandidatoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    candidaturaId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    arquivos?: ArquivoUncheckedUpdateManyWithoutCandidatoNestedInput
    eleitor?: EleitorUncheckedUpdateOneWithoutCandidatoNestedInput
  }

  export type CandidatoCreateManyInput = {
    id?: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial?: string | null
    nomeEmpresa?: string | null
    genero: $Enums.Genero
    dataNascimento: Date | string
    cpf: string
    tituloEleitor?: string | null
    domicilioEleitoral?: string | null
    email: string
    telefone?: string | null
    candidaturaId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CandidatoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidatoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    candidaturaId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EleitorCreateInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutEleitorInput
    candidato?: CandidatoCreateNestedOneWithoutEleitorInput
    eleitorPai?: EleitorCreateNestedOneWithoutMembrosInput
    membros?: EleitorCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoCreateNestedManyWithoutEleitorInput
  }

  export type EleitorUncheckedCreateInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    usuarioId?: string | null
    candidatoId?: string | null
    eleitorPaiId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    membros?: EleitorUncheckedCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraUncheckedCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorUncheckedCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutEleitorInput
  }

  export type EleitorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutEleitorNestedInput
    candidato?: CandidatoUpdateOneWithoutEleitorNestedInput
    eleitorPai?: EleitorUpdateOneWithoutMembrosNestedInput
    membros?: EleitorUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUpdateManyWithoutEleitorNestedInput
  }

  export type EleitorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorPaiId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    membros?: EleitorUncheckedUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUncheckedUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUncheckedUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutEleitorNestedInput
  }

  export type EleitorCreateManyInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    usuarioId?: string | null
    candidatoId?: string | null
    eleitorPaiId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type EleitorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EleitorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorPaiId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizacaoEleitoraCreateInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    repTituloEleitor?: string | null
    repDomicilio?: string | null
    emailEntidade: string
    telefone?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    eleitor: EleitorCreateNestedOneWithoutOrganizacaoInput
    arquivos?: ArquivoCreateNestedManyWithoutOrgEleitoraInput
  }

  export type OrganizacaoEleitoraUncheckedCreateInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    repTituloEleitor?: string | null
    repDomicilio?: string | null
    emailEntidade: string
    telefone?: string | null
    eleitorId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutOrgEleitoraInput
  }

  export type OrganizacaoEleitoraUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    repTituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    repDomicilio?: NullableStringFieldUpdateOperationsInput | string | null
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    eleitor?: EleitorUpdateOneRequiredWithoutOrganizacaoNestedInput
    arquivos?: ArquivoUpdateManyWithoutOrgEleitoraNestedInput
  }

  export type OrganizacaoEleitoraUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    repTituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    repDomicilio?: NullableStringFieldUpdateOperationsInput | string | null
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    arquivos?: ArquivoUncheckedUpdateManyWithoutOrgEleitoraNestedInput
  }

  export type OrganizacaoEleitoraCreateManyInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    repTituloEleitor?: string | null
    repDomicilio?: string | null
    emailEntidade: string
    telefone?: string | null
    eleitorId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrganizacaoEleitoraUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    repTituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    repDomicilio?: NullableStringFieldUpdateOperationsInput | string | null
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizacaoEleitoraUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    repTituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    repDomicilio?: NullableStringFieldUpdateOperationsInput | string | null
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcuradorCreateInput = {
    id?: string
    nome: string
    cpf: string
    tituloEleitor?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    eleitor: EleitorCreateNestedOneWithoutProcuradorInput
  }

  export type ProcuradorUncheckedCreateInput = {
    id?: string
    nome: string
    cpf: string
    tituloEleitor?: string | null
    eleitorId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ProcuradorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    eleitor?: EleitorUpdateOneRequiredWithoutProcuradorNestedInput
  }

  export type ProcuradorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcuradorCreateManyInput = {
    id?: string
    nome: string
    cpf: string
    tituloEleitor?: string | null
    eleitorId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ProcuradorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcuradorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoCreateInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura?: CandidaturaCreateNestedOneWithoutArquivosInput
    candidato?: CandidatoCreateNestedOneWithoutArquivosInput
    orgCandidata?: OrganizacaoCandidataCreateNestedOneWithoutArquivosInput
    eleitor?: EleitorCreateNestedOneWithoutArquivosInput
    orgEleitora?: OrganizacaoEleitoraCreateNestedOneWithoutArquivosInput
  }

  export type ArquivoUncheckedCreateInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId?: string | null
    candidatoId?: string | null
    orgCandidataId?: string | null
    eleitorId?: string | null
    orgEleitoraId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneWithoutArquivosNestedInput
    candidato?: CandidatoUpdateOneWithoutArquivosNestedInput
    orgCandidata?: OrganizacaoCandidataUpdateOneWithoutArquivosNestedInput
    eleitor?: EleitorUpdateOneWithoutArquivosNestedInput
    orgEleitora?: OrganizacaoEleitoraUpdateOneWithoutArquivosNestedInput
  }

  export type ArquivoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidaturaId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    orgCandidataId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: NullableStringFieldUpdateOperationsInput | string | null
    orgEleitoraId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoCreateManyInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId?: string | null
    candidatoId?: string | null
    orgCandidataId?: string | null
    eleitorId?: string | null
    orgEleitoraId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidaturaId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    orgCandidataId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: NullableStringFieldUpdateOperationsInput | string | null
    orgEleitoraId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumTipoUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[]
    notIn?: $Enums.TipoUsuario[]
    not?: NestedEnumTipoUsuarioFilter<$PrismaModel> | $Enums.TipoUsuario
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
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPermissaoNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Permissao | EnumPermissaoFieldRefInput<$PrismaModel> | null
    in?: $Enums.Permissao[] | null
    notIn?: $Enums.Permissao[] | null
    not?: NestedEnumPermissaoNullableFilter<$PrismaModel> | $Enums.Permissao | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type CandidaturaNullableScalarRelationFilter = {
    is?: CandidaturaWhereInput | null
    isNot?: CandidaturaWhereInput | null
  }

  export type EleitorNullableScalarRelationFilter = {
    is?: EleitorWhereInput | null
    isNot?: EleitorWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UsuarioOrderByRelevanceInput = {
    fields: UsuarioOrderByRelevanceFieldEnum | UsuarioOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    login?: SortOrder
    permissao?: SortOrder
    status?: SortOrder
    senha?: SortOrder
    primeiroAcesso?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    login?: SortOrder
    permissao?: SortOrder
    status?: SortOrder
    senha?: SortOrder
    primeiroAcesso?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    login?: SortOrder
    permissao?: SortOrder
    status?: SortOrder
    senha?: SortOrder
    primeiroAcesso?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumTipoUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[]
    notIn?: $Enums.TipoUsuario[]
    not?: NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.TipoUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoUsuarioFilter<$PrismaModel>
    _max?: NestedEnumTipoUsuarioFilter<$PrismaModel>
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
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPermissaoNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Permissao | EnumPermissaoFieldRefInput<$PrismaModel> | null
    in?: $Enums.Permissao[] | null
    notIn?: $Enums.Permissao[] | null
    not?: NestedEnumPermissaoNullableWithAggregatesFilter<$PrismaModel> | $Enums.Permissao | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPermissaoNullableFilter<$PrismaModel>
    _max?: NestedEnumPermissaoNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumTipoInscricaoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoInscricao | EnumTipoInscricaoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoInscricao[]
    notIn?: $Enums.TipoInscricao[]
    not?: NestedEnumTipoInscricaoFilter<$PrismaModel> | $Enums.TipoInscricao
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type OrganizacaoCandidataNullableScalarRelationFilter = {
    is?: OrganizacaoCandidataWhereInput | null
    isNot?: OrganizacaoCandidataWhereInput | null
  }

  export type CandidatoListRelationFilter = {
    every?: CandidatoWhereInput
    some?: CandidatoWhereInput
    none?: CandidatoWhereInput
  }

  export type ArquivoListRelationFilter = {
    every?: ArquivoWhereInput
    some?: ArquivoWhereInput
    none?: ArquivoWhereInput
  }

  export type CandidatoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArquivoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CandidaturaOrderByRelevanceInput = {
    fields: CandidaturaOrderByRelevanceFieldEnum | CandidaturaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CandidaturaCountOrderByAggregateInput = {
    id?: SortOrder
    tipoInscricao?: SortOrder
    status?: SortOrder
    oculto?: SortOrder
    motivoIndeferimento?: SortOrder
    usuarioId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CandidaturaMaxOrderByAggregateInput = {
    id?: SortOrder
    tipoInscricao?: SortOrder
    status?: SortOrder
    oculto?: SortOrder
    motivoIndeferimento?: SortOrder
    usuarioId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CandidaturaMinOrderByAggregateInput = {
    id?: SortOrder
    tipoInscricao?: SortOrder
    status?: SortOrder
    oculto?: SortOrder
    motivoIndeferimento?: SortOrder
    usuarioId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EnumTipoInscricaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoInscricao | EnumTipoInscricaoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoInscricao[]
    notIn?: $Enums.TipoInscricao[]
    not?: NestedEnumTipoInscricaoWithAggregatesFilter<$PrismaModel> | $Enums.TipoInscricao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoInscricaoFilter<$PrismaModel>
    _max?: NestedEnumTipoInscricaoFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type EnumSegmentoFilter<$PrismaModel = never> = {
    equals?: $Enums.Segmento | EnumSegmentoFieldRefInput<$PrismaModel>
    in?: $Enums.Segmento[]
    notIn?: $Enums.Segmento[]
    not?: NestedEnumSegmentoFilter<$PrismaModel> | $Enums.Segmento
  }

  export type CandidaturaScalarRelationFilter = {
    is?: CandidaturaWhereInput
    isNot?: CandidaturaWhereInput
  }

  export type OrganizacaoCandidataOrderByRelevanceInput = {
    fields: OrganizacaoCandidataOrderByRelevanceFieldEnum | OrganizacaoCandidataOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrganizacaoCandidataCountOrderByAggregateInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    segmento?: SortOrder
    dataAbertura?: SortOrder
    sede?: SortOrder
    repNome?: SortOrder
    repCpf?: SortOrder
    emailEntidade?: SortOrder
    telefone?: SortOrder
    formaChapa?: SortOrder
    cnpjChapa?: SortOrder
    candidaturaId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type OrganizacaoCandidataMaxOrderByAggregateInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    segmento?: SortOrder
    dataAbertura?: SortOrder
    sede?: SortOrder
    repNome?: SortOrder
    repCpf?: SortOrder
    emailEntidade?: SortOrder
    telefone?: SortOrder
    formaChapa?: SortOrder
    cnpjChapa?: SortOrder
    candidaturaId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type OrganizacaoCandidataMinOrderByAggregateInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    segmento?: SortOrder
    dataAbertura?: SortOrder
    sede?: SortOrder
    repNome?: SortOrder
    repCpf?: SortOrder
    emailEntidade?: SortOrder
    telefone?: SortOrder
    formaChapa?: SortOrder
    cnpjChapa?: SortOrder
    candidaturaId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EnumSegmentoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Segmento | EnumSegmentoFieldRefInput<$PrismaModel>
    in?: $Enums.Segmento[]
    notIn?: $Enums.Segmento[]
    not?: NestedEnumSegmentoWithAggregatesFilter<$PrismaModel> | $Enums.Segmento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSegmentoFilter<$PrismaModel>
    _max?: NestedEnumSegmentoFilter<$PrismaModel>
  }

  export type EnumTipoCandidatoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCandidato | EnumTipoCandidatoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCandidato[]
    notIn?: $Enums.TipoCandidato[]
    not?: NestedEnumTipoCandidatoFilter<$PrismaModel> | $Enums.TipoCandidato
  }

  export type EnumGeneroFilter<$PrismaModel = never> = {
    equals?: $Enums.Genero | EnumGeneroFieldRefInput<$PrismaModel>
    in?: $Enums.Genero[]
    notIn?: $Enums.Genero[]
    not?: NestedEnumGeneroFilter<$PrismaModel> | $Enums.Genero
  }

  export type CandidatoOrderByRelevanceInput = {
    fields: CandidatoOrderByRelevanceFieldEnum | CandidatoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CandidatoCountOrderByAggregateInput = {
    id?: SortOrder
    tipoCandidato?: SortOrder
    nome?: SortOrder
    nomeSocial?: SortOrder
    nomeEmpresa?: SortOrder
    genero?: SortOrder
    dataNascimento?: SortOrder
    cpf?: SortOrder
    tituloEleitor?: SortOrder
    domicilioEleitoral?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    candidaturaId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CandidatoMaxOrderByAggregateInput = {
    id?: SortOrder
    tipoCandidato?: SortOrder
    nome?: SortOrder
    nomeSocial?: SortOrder
    nomeEmpresa?: SortOrder
    genero?: SortOrder
    dataNascimento?: SortOrder
    cpf?: SortOrder
    tituloEleitor?: SortOrder
    domicilioEleitoral?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    candidaturaId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CandidatoMinOrderByAggregateInput = {
    id?: SortOrder
    tipoCandidato?: SortOrder
    nome?: SortOrder
    nomeSocial?: SortOrder
    nomeEmpresa?: SortOrder
    genero?: SortOrder
    dataNascimento?: SortOrder
    cpf?: SortOrder
    tituloEleitor?: SortOrder
    domicilioEleitoral?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    candidaturaId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EnumTipoCandidatoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCandidato | EnumTipoCandidatoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCandidato[]
    notIn?: $Enums.TipoCandidato[]
    not?: NestedEnumTipoCandidatoWithAggregatesFilter<$PrismaModel> | $Enums.TipoCandidato
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoCandidatoFilter<$PrismaModel>
    _max?: NestedEnumTipoCandidatoFilter<$PrismaModel>
  }

  export type EnumGeneroWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Genero | EnumGeneroFieldRefInput<$PrismaModel>
    in?: $Enums.Genero[]
    notIn?: $Enums.Genero[]
    not?: NestedEnumGeneroWithAggregatesFilter<$PrismaModel> | $Enums.Genero
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGeneroFilter<$PrismaModel>
    _max?: NestedEnumGeneroFilter<$PrismaModel>
  }

  export type UsuarioNullableScalarRelationFilter = {
    is?: UsuarioWhereInput | null
    isNot?: UsuarioWhereInput | null
  }

  export type CandidatoNullableScalarRelationFilter = {
    is?: CandidatoWhereInput | null
    isNot?: CandidatoWhereInput | null
  }

  export type EleitorListRelationFilter = {
    every?: EleitorWhereInput
    some?: EleitorWhereInput
    none?: EleitorWhereInput
  }

  export type OrganizacaoEleitoraNullableScalarRelationFilter = {
    is?: OrganizacaoEleitoraWhereInput | null
    isNot?: OrganizacaoEleitoraWhereInput | null
  }

  export type ProcuradorNullableScalarRelationFilter = {
    is?: ProcuradorWhereInput | null
    isNot?: ProcuradorWhereInput | null
  }

  export type EleitorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EleitorOrderByRelevanceInput = {
    fields: EleitorOrderByRelevanceFieldEnum | EleitorOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EleitorCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    oculto?: SortOrder
    usuarioId?: SortOrder
    candidatoId?: SortOrder
    eleitorPaiId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EleitorMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    oculto?: SortOrder
    usuarioId?: SortOrder
    candidatoId?: SortOrder
    eleitorPaiId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EleitorMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    oculto?: SortOrder
    usuarioId?: SortOrder
    candidatoId?: SortOrder
    eleitorPaiId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EleitorScalarRelationFilter = {
    is?: EleitorWhereInput
    isNot?: EleitorWhereInput
  }

  export type OrganizacaoEleitoraOrderByRelevanceInput = {
    fields: OrganizacaoEleitoraOrderByRelevanceFieldEnum | OrganizacaoEleitoraOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrganizacaoEleitoraCountOrderByAggregateInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    segmento?: SortOrder
    dataAbertura?: SortOrder
    sede?: SortOrder
    repNome?: SortOrder
    repCpf?: SortOrder
    repTituloEleitor?: SortOrder
    repDomicilio?: SortOrder
    emailEntidade?: SortOrder
    telefone?: SortOrder
    eleitorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type OrganizacaoEleitoraMaxOrderByAggregateInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    segmento?: SortOrder
    dataAbertura?: SortOrder
    sede?: SortOrder
    repNome?: SortOrder
    repCpf?: SortOrder
    repTituloEleitor?: SortOrder
    repDomicilio?: SortOrder
    emailEntidade?: SortOrder
    telefone?: SortOrder
    eleitorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type OrganizacaoEleitoraMinOrderByAggregateInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    segmento?: SortOrder
    dataAbertura?: SortOrder
    sede?: SortOrder
    repNome?: SortOrder
    repCpf?: SortOrder
    repTituloEleitor?: SortOrder
    repDomicilio?: SortOrder
    emailEntidade?: SortOrder
    telefone?: SortOrder
    eleitorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ProcuradorOrderByRelevanceInput = {
    fields: ProcuradorOrderByRelevanceFieldEnum | ProcuradorOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProcuradorCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    tituloEleitor?: SortOrder
    eleitorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ProcuradorMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    tituloEleitor?: SortOrder
    eleitorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ProcuradorMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    tituloEleitor?: SortOrder
    eleitorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
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

  export type EnumCategoriaArquivoFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaArquivo | EnumCategoriaArquivoFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaArquivo[]
    notIn?: $Enums.CategoriaArquivo[]
    not?: NestedEnumCategoriaArquivoFilter<$PrismaModel> | $Enums.CategoriaArquivo
  }

  export type ArquivoOrderByRelevanceInput = {
    fields: ArquivoOrderByRelevanceFieldEnum | ArquivoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ArquivoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    tamanho?: SortOrder
    caminho?: SortOrder
    categoria?: SortOrder
    candidaturaId?: SortOrder
    candidatoId?: SortOrder
    orgCandidataId?: SortOrder
    eleitorId?: SortOrder
    orgEleitoraId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ArquivoAvgOrderByAggregateInput = {
    tamanho?: SortOrder
  }

  export type ArquivoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    tamanho?: SortOrder
    caminho?: SortOrder
    categoria?: SortOrder
    candidaturaId?: SortOrder
    candidatoId?: SortOrder
    orgCandidataId?: SortOrder
    eleitorId?: SortOrder
    orgEleitoraId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ArquivoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    tamanho?: SortOrder
    caminho?: SortOrder
    categoria?: SortOrder
    candidaturaId?: SortOrder
    candidatoId?: SortOrder
    orgCandidataId?: SortOrder
    eleitorId?: SortOrder
    orgEleitoraId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ArquivoSumOrderByAggregateInput = {
    tamanho?: SortOrder
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

  export type EnumCategoriaArquivoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaArquivo | EnumCategoriaArquivoFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaArquivo[]
    notIn?: $Enums.CategoriaArquivo[]
    not?: NestedEnumCategoriaArquivoWithAggregatesFilter<$PrismaModel> | $Enums.CategoriaArquivo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoriaArquivoFilter<$PrismaModel>
    _max?: NestedEnumCategoriaArquivoFilter<$PrismaModel>
  }

  export type CandidaturaCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<CandidaturaCreateWithoutUsuarioInput, CandidaturaUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: CandidaturaCreateOrConnectWithoutUsuarioInput
    connect?: CandidaturaWhereUniqueInput
  }

  export type EleitorCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<EleitorCreateWithoutUsuarioInput, EleitorUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutUsuarioInput
    connect?: EleitorWhereUniqueInput
  }

  export type CandidaturaUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<CandidaturaCreateWithoutUsuarioInput, CandidaturaUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: CandidaturaCreateOrConnectWithoutUsuarioInput
    connect?: CandidaturaWhereUniqueInput
  }

  export type EleitorUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<EleitorCreateWithoutUsuarioInput, EleitorUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutUsuarioInput
    connect?: EleitorWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumTipoUsuarioFieldUpdateOperationsInput = {
    set?: $Enums.TipoUsuario
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumPermissaoFieldUpdateOperationsInput = {
    set?: $Enums.Permissao | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CandidaturaUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<CandidaturaCreateWithoutUsuarioInput, CandidaturaUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: CandidaturaCreateOrConnectWithoutUsuarioInput
    upsert?: CandidaturaUpsertWithoutUsuarioInput
    disconnect?: CandidaturaWhereInput | boolean
    delete?: CandidaturaWhereInput | boolean
    connect?: CandidaturaWhereUniqueInput
    update?: XOR<XOR<CandidaturaUpdateToOneWithWhereWithoutUsuarioInput, CandidaturaUpdateWithoutUsuarioInput>, CandidaturaUncheckedUpdateWithoutUsuarioInput>
  }

  export type EleitorUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<EleitorCreateWithoutUsuarioInput, EleitorUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutUsuarioInput
    upsert?: EleitorUpsertWithoutUsuarioInput
    disconnect?: EleitorWhereInput | boolean
    delete?: EleitorWhereInput | boolean
    connect?: EleitorWhereUniqueInput
    update?: XOR<XOR<EleitorUpdateToOneWithWhereWithoutUsuarioInput, EleitorUpdateWithoutUsuarioInput>, EleitorUncheckedUpdateWithoutUsuarioInput>
  }

  export type CandidaturaUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<CandidaturaCreateWithoutUsuarioInput, CandidaturaUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: CandidaturaCreateOrConnectWithoutUsuarioInput
    upsert?: CandidaturaUpsertWithoutUsuarioInput
    disconnect?: CandidaturaWhereInput | boolean
    delete?: CandidaturaWhereInput | boolean
    connect?: CandidaturaWhereUniqueInput
    update?: XOR<XOR<CandidaturaUpdateToOneWithWhereWithoutUsuarioInput, CandidaturaUpdateWithoutUsuarioInput>, CandidaturaUncheckedUpdateWithoutUsuarioInput>
  }

  export type EleitorUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<EleitorCreateWithoutUsuarioInput, EleitorUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutUsuarioInput
    upsert?: EleitorUpsertWithoutUsuarioInput
    disconnect?: EleitorWhereInput | boolean
    delete?: EleitorWhereInput | boolean
    connect?: EleitorWhereUniqueInput
    update?: XOR<XOR<EleitorUpdateToOneWithWhereWithoutUsuarioInput, EleitorUpdateWithoutUsuarioInput>, EleitorUncheckedUpdateWithoutUsuarioInput>
  }

  export type UsuarioCreateNestedOneWithoutCandidaturaInput = {
    create?: XOR<UsuarioCreateWithoutCandidaturaInput, UsuarioUncheckedCreateWithoutCandidaturaInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCandidaturaInput
    connect?: UsuarioWhereUniqueInput
  }

  export type OrganizacaoCandidataCreateNestedOneWithoutCandidaturaInput = {
    create?: XOR<OrganizacaoCandidataCreateWithoutCandidaturaInput, OrganizacaoCandidataUncheckedCreateWithoutCandidaturaInput>
    connectOrCreate?: OrganizacaoCandidataCreateOrConnectWithoutCandidaturaInput
    connect?: OrganizacaoCandidataWhereUniqueInput
  }

  export type CandidatoCreateNestedManyWithoutCandidaturaInput = {
    create?: XOR<CandidatoCreateWithoutCandidaturaInput, CandidatoUncheckedCreateWithoutCandidaturaInput> | CandidatoCreateWithoutCandidaturaInput[] | CandidatoUncheckedCreateWithoutCandidaturaInput[]
    connectOrCreate?: CandidatoCreateOrConnectWithoutCandidaturaInput | CandidatoCreateOrConnectWithoutCandidaturaInput[]
    createMany?: CandidatoCreateManyCandidaturaInputEnvelope
    connect?: CandidatoWhereUniqueInput | CandidatoWhereUniqueInput[]
  }

  export type ArquivoCreateNestedManyWithoutCandidaturaInput = {
    create?: XOR<ArquivoCreateWithoutCandidaturaInput, ArquivoUncheckedCreateWithoutCandidaturaInput> | ArquivoCreateWithoutCandidaturaInput[] | ArquivoUncheckedCreateWithoutCandidaturaInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutCandidaturaInput | ArquivoCreateOrConnectWithoutCandidaturaInput[]
    createMany?: ArquivoCreateManyCandidaturaInputEnvelope
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
  }

  export type OrganizacaoCandidataUncheckedCreateNestedOneWithoutCandidaturaInput = {
    create?: XOR<OrganizacaoCandidataCreateWithoutCandidaturaInput, OrganizacaoCandidataUncheckedCreateWithoutCandidaturaInput>
    connectOrCreate?: OrganizacaoCandidataCreateOrConnectWithoutCandidaturaInput
    connect?: OrganizacaoCandidataWhereUniqueInput
  }

  export type CandidatoUncheckedCreateNestedManyWithoutCandidaturaInput = {
    create?: XOR<CandidatoCreateWithoutCandidaturaInput, CandidatoUncheckedCreateWithoutCandidaturaInput> | CandidatoCreateWithoutCandidaturaInput[] | CandidatoUncheckedCreateWithoutCandidaturaInput[]
    connectOrCreate?: CandidatoCreateOrConnectWithoutCandidaturaInput | CandidatoCreateOrConnectWithoutCandidaturaInput[]
    createMany?: CandidatoCreateManyCandidaturaInputEnvelope
    connect?: CandidatoWhereUniqueInput | CandidatoWhereUniqueInput[]
  }

  export type ArquivoUncheckedCreateNestedManyWithoutCandidaturaInput = {
    create?: XOR<ArquivoCreateWithoutCandidaturaInput, ArquivoUncheckedCreateWithoutCandidaturaInput> | ArquivoCreateWithoutCandidaturaInput[] | ArquivoUncheckedCreateWithoutCandidaturaInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutCandidaturaInput | ArquivoCreateOrConnectWithoutCandidaturaInput[]
    createMany?: ArquivoCreateManyCandidaturaInputEnvelope
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
  }

  export type EnumTipoInscricaoFieldUpdateOperationsInput = {
    set?: $Enums.TipoInscricao
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type UsuarioUpdateOneRequiredWithoutCandidaturaNestedInput = {
    create?: XOR<UsuarioCreateWithoutCandidaturaInput, UsuarioUncheckedCreateWithoutCandidaturaInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCandidaturaInput
    upsert?: UsuarioUpsertWithoutCandidaturaInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutCandidaturaInput, UsuarioUpdateWithoutCandidaturaInput>, UsuarioUncheckedUpdateWithoutCandidaturaInput>
  }

  export type OrganizacaoCandidataUpdateOneWithoutCandidaturaNestedInput = {
    create?: XOR<OrganizacaoCandidataCreateWithoutCandidaturaInput, OrganizacaoCandidataUncheckedCreateWithoutCandidaturaInput>
    connectOrCreate?: OrganizacaoCandidataCreateOrConnectWithoutCandidaturaInput
    upsert?: OrganizacaoCandidataUpsertWithoutCandidaturaInput
    disconnect?: OrganizacaoCandidataWhereInput | boolean
    delete?: OrganizacaoCandidataWhereInput | boolean
    connect?: OrganizacaoCandidataWhereUniqueInput
    update?: XOR<XOR<OrganizacaoCandidataUpdateToOneWithWhereWithoutCandidaturaInput, OrganizacaoCandidataUpdateWithoutCandidaturaInput>, OrganizacaoCandidataUncheckedUpdateWithoutCandidaturaInput>
  }

  export type CandidatoUpdateManyWithoutCandidaturaNestedInput = {
    create?: XOR<CandidatoCreateWithoutCandidaturaInput, CandidatoUncheckedCreateWithoutCandidaturaInput> | CandidatoCreateWithoutCandidaturaInput[] | CandidatoUncheckedCreateWithoutCandidaturaInput[]
    connectOrCreate?: CandidatoCreateOrConnectWithoutCandidaturaInput | CandidatoCreateOrConnectWithoutCandidaturaInput[]
    upsert?: CandidatoUpsertWithWhereUniqueWithoutCandidaturaInput | CandidatoUpsertWithWhereUniqueWithoutCandidaturaInput[]
    createMany?: CandidatoCreateManyCandidaturaInputEnvelope
    set?: CandidatoWhereUniqueInput | CandidatoWhereUniqueInput[]
    disconnect?: CandidatoWhereUniqueInput | CandidatoWhereUniqueInput[]
    delete?: CandidatoWhereUniqueInput | CandidatoWhereUniqueInput[]
    connect?: CandidatoWhereUniqueInput | CandidatoWhereUniqueInput[]
    update?: CandidatoUpdateWithWhereUniqueWithoutCandidaturaInput | CandidatoUpdateWithWhereUniqueWithoutCandidaturaInput[]
    updateMany?: CandidatoUpdateManyWithWhereWithoutCandidaturaInput | CandidatoUpdateManyWithWhereWithoutCandidaturaInput[]
    deleteMany?: CandidatoScalarWhereInput | CandidatoScalarWhereInput[]
  }

  export type ArquivoUpdateManyWithoutCandidaturaNestedInput = {
    create?: XOR<ArquivoCreateWithoutCandidaturaInput, ArquivoUncheckedCreateWithoutCandidaturaInput> | ArquivoCreateWithoutCandidaturaInput[] | ArquivoUncheckedCreateWithoutCandidaturaInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutCandidaturaInput | ArquivoCreateOrConnectWithoutCandidaturaInput[]
    upsert?: ArquivoUpsertWithWhereUniqueWithoutCandidaturaInput | ArquivoUpsertWithWhereUniqueWithoutCandidaturaInput[]
    createMany?: ArquivoCreateManyCandidaturaInputEnvelope
    set?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    disconnect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    delete?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    update?: ArquivoUpdateWithWhereUniqueWithoutCandidaturaInput | ArquivoUpdateWithWhereUniqueWithoutCandidaturaInput[]
    updateMany?: ArquivoUpdateManyWithWhereWithoutCandidaturaInput | ArquivoUpdateManyWithWhereWithoutCandidaturaInput[]
    deleteMany?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
  }

  export type OrganizacaoCandidataUncheckedUpdateOneWithoutCandidaturaNestedInput = {
    create?: XOR<OrganizacaoCandidataCreateWithoutCandidaturaInput, OrganizacaoCandidataUncheckedCreateWithoutCandidaturaInput>
    connectOrCreate?: OrganizacaoCandidataCreateOrConnectWithoutCandidaturaInput
    upsert?: OrganizacaoCandidataUpsertWithoutCandidaturaInput
    disconnect?: OrganizacaoCandidataWhereInput | boolean
    delete?: OrganizacaoCandidataWhereInput | boolean
    connect?: OrganizacaoCandidataWhereUniqueInput
    update?: XOR<XOR<OrganizacaoCandidataUpdateToOneWithWhereWithoutCandidaturaInput, OrganizacaoCandidataUpdateWithoutCandidaturaInput>, OrganizacaoCandidataUncheckedUpdateWithoutCandidaturaInput>
  }

  export type CandidatoUncheckedUpdateManyWithoutCandidaturaNestedInput = {
    create?: XOR<CandidatoCreateWithoutCandidaturaInput, CandidatoUncheckedCreateWithoutCandidaturaInput> | CandidatoCreateWithoutCandidaturaInput[] | CandidatoUncheckedCreateWithoutCandidaturaInput[]
    connectOrCreate?: CandidatoCreateOrConnectWithoutCandidaturaInput | CandidatoCreateOrConnectWithoutCandidaturaInput[]
    upsert?: CandidatoUpsertWithWhereUniqueWithoutCandidaturaInput | CandidatoUpsertWithWhereUniqueWithoutCandidaturaInput[]
    createMany?: CandidatoCreateManyCandidaturaInputEnvelope
    set?: CandidatoWhereUniqueInput | CandidatoWhereUniqueInput[]
    disconnect?: CandidatoWhereUniqueInput | CandidatoWhereUniqueInput[]
    delete?: CandidatoWhereUniqueInput | CandidatoWhereUniqueInput[]
    connect?: CandidatoWhereUniqueInput | CandidatoWhereUniqueInput[]
    update?: CandidatoUpdateWithWhereUniqueWithoutCandidaturaInput | CandidatoUpdateWithWhereUniqueWithoutCandidaturaInput[]
    updateMany?: CandidatoUpdateManyWithWhereWithoutCandidaturaInput | CandidatoUpdateManyWithWhereWithoutCandidaturaInput[]
    deleteMany?: CandidatoScalarWhereInput | CandidatoScalarWhereInput[]
  }

  export type ArquivoUncheckedUpdateManyWithoutCandidaturaNestedInput = {
    create?: XOR<ArquivoCreateWithoutCandidaturaInput, ArquivoUncheckedCreateWithoutCandidaturaInput> | ArquivoCreateWithoutCandidaturaInput[] | ArquivoUncheckedCreateWithoutCandidaturaInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutCandidaturaInput | ArquivoCreateOrConnectWithoutCandidaturaInput[]
    upsert?: ArquivoUpsertWithWhereUniqueWithoutCandidaturaInput | ArquivoUpsertWithWhereUniqueWithoutCandidaturaInput[]
    createMany?: ArquivoCreateManyCandidaturaInputEnvelope
    set?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    disconnect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    delete?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    update?: ArquivoUpdateWithWhereUniqueWithoutCandidaturaInput | ArquivoUpdateWithWhereUniqueWithoutCandidaturaInput[]
    updateMany?: ArquivoUpdateManyWithWhereWithoutCandidaturaInput | ArquivoUpdateManyWithWhereWithoutCandidaturaInput[]
    deleteMany?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
  }

  export type CandidaturaCreateNestedOneWithoutOrganizacaoInput = {
    create?: XOR<CandidaturaCreateWithoutOrganizacaoInput, CandidaturaUncheckedCreateWithoutOrganizacaoInput>
    connectOrCreate?: CandidaturaCreateOrConnectWithoutOrganizacaoInput
    connect?: CandidaturaWhereUniqueInput
  }

  export type ArquivoCreateNestedManyWithoutOrgCandidataInput = {
    create?: XOR<ArquivoCreateWithoutOrgCandidataInput, ArquivoUncheckedCreateWithoutOrgCandidataInput> | ArquivoCreateWithoutOrgCandidataInput[] | ArquivoUncheckedCreateWithoutOrgCandidataInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutOrgCandidataInput | ArquivoCreateOrConnectWithoutOrgCandidataInput[]
    createMany?: ArquivoCreateManyOrgCandidataInputEnvelope
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
  }

  export type ArquivoUncheckedCreateNestedManyWithoutOrgCandidataInput = {
    create?: XOR<ArquivoCreateWithoutOrgCandidataInput, ArquivoUncheckedCreateWithoutOrgCandidataInput> | ArquivoCreateWithoutOrgCandidataInput[] | ArquivoUncheckedCreateWithoutOrgCandidataInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutOrgCandidataInput | ArquivoCreateOrConnectWithoutOrgCandidataInput[]
    createMany?: ArquivoCreateManyOrgCandidataInputEnvelope
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
  }

  export type EnumSegmentoFieldUpdateOperationsInput = {
    set?: $Enums.Segmento
  }

  export type CandidaturaUpdateOneRequiredWithoutOrganizacaoNestedInput = {
    create?: XOR<CandidaturaCreateWithoutOrganizacaoInput, CandidaturaUncheckedCreateWithoutOrganizacaoInput>
    connectOrCreate?: CandidaturaCreateOrConnectWithoutOrganizacaoInput
    upsert?: CandidaturaUpsertWithoutOrganizacaoInput
    connect?: CandidaturaWhereUniqueInput
    update?: XOR<XOR<CandidaturaUpdateToOneWithWhereWithoutOrganizacaoInput, CandidaturaUpdateWithoutOrganizacaoInput>, CandidaturaUncheckedUpdateWithoutOrganizacaoInput>
  }

  export type ArquivoUpdateManyWithoutOrgCandidataNestedInput = {
    create?: XOR<ArquivoCreateWithoutOrgCandidataInput, ArquivoUncheckedCreateWithoutOrgCandidataInput> | ArquivoCreateWithoutOrgCandidataInput[] | ArquivoUncheckedCreateWithoutOrgCandidataInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutOrgCandidataInput | ArquivoCreateOrConnectWithoutOrgCandidataInput[]
    upsert?: ArquivoUpsertWithWhereUniqueWithoutOrgCandidataInput | ArquivoUpsertWithWhereUniqueWithoutOrgCandidataInput[]
    createMany?: ArquivoCreateManyOrgCandidataInputEnvelope
    set?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    disconnect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    delete?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    update?: ArquivoUpdateWithWhereUniqueWithoutOrgCandidataInput | ArquivoUpdateWithWhereUniqueWithoutOrgCandidataInput[]
    updateMany?: ArquivoUpdateManyWithWhereWithoutOrgCandidataInput | ArquivoUpdateManyWithWhereWithoutOrgCandidataInput[]
    deleteMany?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
  }

  export type ArquivoUncheckedUpdateManyWithoutOrgCandidataNestedInput = {
    create?: XOR<ArquivoCreateWithoutOrgCandidataInput, ArquivoUncheckedCreateWithoutOrgCandidataInput> | ArquivoCreateWithoutOrgCandidataInput[] | ArquivoUncheckedCreateWithoutOrgCandidataInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutOrgCandidataInput | ArquivoCreateOrConnectWithoutOrgCandidataInput[]
    upsert?: ArquivoUpsertWithWhereUniqueWithoutOrgCandidataInput | ArquivoUpsertWithWhereUniqueWithoutOrgCandidataInput[]
    createMany?: ArquivoCreateManyOrgCandidataInputEnvelope
    set?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    disconnect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    delete?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    update?: ArquivoUpdateWithWhereUniqueWithoutOrgCandidataInput | ArquivoUpdateWithWhereUniqueWithoutOrgCandidataInput[]
    updateMany?: ArquivoUpdateManyWithWhereWithoutOrgCandidataInput | ArquivoUpdateManyWithWhereWithoutOrgCandidataInput[]
    deleteMany?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
  }

  export type CandidaturaCreateNestedOneWithoutCandidatosInput = {
    create?: XOR<CandidaturaCreateWithoutCandidatosInput, CandidaturaUncheckedCreateWithoutCandidatosInput>
    connectOrCreate?: CandidaturaCreateOrConnectWithoutCandidatosInput
    connect?: CandidaturaWhereUniqueInput
  }

  export type ArquivoCreateNestedManyWithoutCandidatoInput = {
    create?: XOR<ArquivoCreateWithoutCandidatoInput, ArquivoUncheckedCreateWithoutCandidatoInput> | ArquivoCreateWithoutCandidatoInput[] | ArquivoUncheckedCreateWithoutCandidatoInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutCandidatoInput | ArquivoCreateOrConnectWithoutCandidatoInput[]
    createMany?: ArquivoCreateManyCandidatoInputEnvelope
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
  }

  export type EleitorCreateNestedOneWithoutCandidatoInput = {
    create?: XOR<EleitorCreateWithoutCandidatoInput, EleitorUncheckedCreateWithoutCandidatoInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutCandidatoInput
    connect?: EleitorWhereUniqueInput
  }

  export type ArquivoUncheckedCreateNestedManyWithoutCandidatoInput = {
    create?: XOR<ArquivoCreateWithoutCandidatoInput, ArquivoUncheckedCreateWithoutCandidatoInput> | ArquivoCreateWithoutCandidatoInput[] | ArquivoUncheckedCreateWithoutCandidatoInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutCandidatoInput | ArquivoCreateOrConnectWithoutCandidatoInput[]
    createMany?: ArquivoCreateManyCandidatoInputEnvelope
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
  }

  export type EleitorUncheckedCreateNestedOneWithoutCandidatoInput = {
    create?: XOR<EleitorCreateWithoutCandidatoInput, EleitorUncheckedCreateWithoutCandidatoInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutCandidatoInput
    connect?: EleitorWhereUniqueInput
  }

  export type EnumTipoCandidatoFieldUpdateOperationsInput = {
    set?: $Enums.TipoCandidato
  }

  export type EnumGeneroFieldUpdateOperationsInput = {
    set?: $Enums.Genero
  }

  export type CandidaturaUpdateOneRequiredWithoutCandidatosNestedInput = {
    create?: XOR<CandidaturaCreateWithoutCandidatosInput, CandidaturaUncheckedCreateWithoutCandidatosInput>
    connectOrCreate?: CandidaturaCreateOrConnectWithoutCandidatosInput
    upsert?: CandidaturaUpsertWithoutCandidatosInput
    connect?: CandidaturaWhereUniqueInput
    update?: XOR<XOR<CandidaturaUpdateToOneWithWhereWithoutCandidatosInput, CandidaturaUpdateWithoutCandidatosInput>, CandidaturaUncheckedUpdateWithoutCandidatosInput>
  }

  export type ArquivoUpdateManyWithoutCandidatoNestedInput = {
    create?: XOR<ArquivoCreateWithoutCandidatoInput, ArquivoUncheckedCreateWithoutCandidatoInput> | ArquivoCreateWithoutCandidatoInput[] | ArquivoUncheckedCreateWithoutCandidatoInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutCandidatoInput | ArquivoCreateOrConnectWithoutCandidatoInput[]
    upsert?: ArquivoUpsertWithWhereUniqueWithoutCandidatoInput | ArquivoUpsertWithWhereUniqueWithoutCandidatoInput[]
    createMany?: ArquivoCreateManyCandidatoInputEnvelope
    set?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    disconnect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    delete?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    update?: ArquivoUpdateWithWhereUniqueWithoutCandidatoInput | ArquivoUpdateWithWhereUniqueWithoutCandidatoInput[]
    updateMany?: ArquivoUpdateManyWithWhereWithoutCandidatoInput | ArquivoUpdateManyWithWhereWithoutCandidatoInput[]
    deleteMany?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
  }

  export type EleitorUpdateOneWithoutCandidatoNestedInput = {
    create?: XOR<EleitorCreateWithoutCandidatoInput, EleitorUncheckedCreateWithoutCandidatoInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutCandidatoInput
    upsert?: EleitorUpsertWithoutCandidatoInput
    disconnect?: EleitorWhereInput | boolean
    delete?: EleitorWhereInput | boolean
    connect?: EleitorWhereUniqueInput
    update?: XOR<XOR<EleitorUpdateToOneWithWhereWithoutCandidatoInput, EleitorUpdateWithoutCandidatoInput>, EleitorUncheckedUpdateWithoutCandidatoInput>
  }

  export type ArquivoUncheckedUpdateManyWithoutCandidatoNestedInput = {
    create?: XOR<ArquivoCreateWithoutCandidatoInput, ArquivoUncheckedCreateWithoutCandidatoInput> | ArquivoCreateWithoutCandidatoInput[] | ArquivoUncheckedCreateWithoutCandidatoInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutCandidatoInput | ArquivoCreateOrConnectWithoutCandidatoInput[]
    upsert?: ArquivoUpsertWithWhereUniqueWithoutCandidatoInput | ArquivoUpsertWithWhereUniqueWithoutCandidatoInput[]
    createMany?: ArquivoCreateManyCandidatoInputEnvelope
    set?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    disconnect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    delete?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    update?: ArquivoUpdateWithWhereUniqueWithoutCandidatoInput | ArquivoUpdateWithWhereUniqueWithoutCandidatoInput[]
    updateMany?: ArquivoUpdateManyWithWhereWithoutCandidatoInput | ArquivoUpdateManyWithWhereWithoutCandidatoInput[]
    deleteMany?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
  }

  export type EleitorUncheckedUpdateOneWithoutCandidatoNestedInput = {
    create?: XOR<EleitorCreateWithoutCandidatoInput, EleitorUncheckedCreateWithoutCandidatoInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutCandidatoInput
    upsert?: EleitorUpsertWithoutCandidatoInput
    disconnect?: EleitorWhereInput | boolean
    delete?: EleitorWhereInput | boolean
    connect?: EleitorWhereUniqueInput
    update?: XOR<XOR<EleitorUpdateToOneWithWhereWithoutCandidatoInput, EleitorUpdateWithoutCandidatoInput>, EleitorUncheckedUpdateWithoutCandidatoInput>
  }

  export type UsuarioCreateNestedOneWithoutEleitorInput = {
    create?: XOR<UsuarioCreateWithoutEleitorInput, UsuarioUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutEleitorInput
    connect?: UsuarioWhereUniqueInput
  }

  export type CandidatoCreateNestedOneWithoutEleitorInput = {
    create?: XOR<CandidatoCreateWithoutEleitorInput, CandidatoUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: CandidatoCreateOrConnectWithoutEleitorInput
    connect?: CandidatoWhereUniqueInput
  }

  export type EleitorCreateNestedOneWithoutMembrosInput = {
    create?: XOR<EleitorCreateWithoutMembrosInput, EleitorUncheckedCreateWithoutMembrosInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutMembrosInput
    connect?: EleitorWhereUniqueInput
  }

  export type EleitorCreateNestedManyWithoutEleitorPaiInput = {
    create?: XOR<EleitorCreateWithoutEleitorPaiInput, EleitorUncheckedCreateWithoutEleitorPaiInput> | EleitorCreateWithoutEleitorPaiInput[] | EleitorUncheckedCreateWithoutEleitorPaiInput[]
    connectOrCreate?: EleitorCreateOrConnectWithoutEleitorPaiInput | EleitorCreateOrConnectWithoutEleitorPaiInput[]
    createMany?: EleitorCreateManyEleitorPaiInputEnvelope
    connect?: EleitorWhereUniqueInput | EleitorWhereUniqueInput[]
  }

  export type OrganizacaoEleitoraCreateNestedOneWithoutEleitorInput = {
    create?: XOR<OrganizacaoEleitoraCreateWithoutEleitorInput, OrganizacaoEleitoraUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: OrganizacaoEleitoraCreateOrConnectWithoutEleitorInput
    connect?: OrganizacaoEleitoraWhereUniqueInput
  }

  export type ProcuradorCreateNestedOneWithoutEleitorInput = {
    create?: XOR<ProcuradorCreateWithoutEleitorInput, ProcuradorUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: ProcuradorCreateOrConnectWithoutEleitorInput
    connect?: ProcuradorWhereUniqueInput
  }

  export type ArquivoCreateNestedManyWithoutEleitorInput = {
    create?: XOR<ArquivoCreateWithoutEleitorInput, ArquivoUncheckedCreateWithoutEleitorInput> | ArquivoCreateWithoutEleitorInput[] | ArquivoUncheckedCreateWithoutEleitorInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutEleitorInput | ArquivoCreateOrConnectWithoutEleitorInput[]
    createMany?: ArquivoCreateManyEleitorInputEnvelope
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
  }

  export type EleitorUncheckedCreateNestedManyWithoutEleitorPaiInput = {
    create?: XOR<EleitorCreateWithoutEleitorPaiInput, EleitorUncheckedCreateWithoutEleitorPaiInput> | EleitorCreateWithoutEleitorPaiInput[] | EleitorUncheckedCreateWithoutEleitorPaiInput[]
    connectOrCreate?: EleitorCreateOrConnectWithoutEleitorPaiInput | EleitorCreateOrConnectWithoutEleitorPaiInput[]
    createMany?: EleitorCreateManyEleitorPaiInputEnvelope
    connect?: EleitorWhereUniqueInput | EleitorWhereUniqueInput[]
  }

  export type OrganizacaoEleitoraUncheckedCreateNestedOneWithoutEleitorInput = {
    create?: XOR<OrganizacaoEleitoraCreateWithoutEleitorInput, OrganizacaoEleitoraUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: OrganizacaoEleitoraCreateOrConnectWithoutEleitorInput
    connect?: OrganizacaoEleitoraWhereUniqueInput
  }

  export type ProcuradorUncheckedCreateNestedOneWithoutEleitorInput = {
    create?: XOR<ProcuradorCreateWithoutEleitorInput, ProcuradorUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: ProcuradorCreateOrConnectWithoutEleitorInput
    connect?: ProcuradorWhereUniqueInput
  }

  export type ArquivoUncheckedCreateNestedManyWithoutEleitorInput = {
    create?: XOR<ArquivoCreateWithoutEleitorInput, ArquivoUncheckedCreateWithoutEleitorInput> | ArquivoCreateWithoutEleitorInput[] | ArquivoUncheckedCreateWithoutEleitorInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutEleitorInput | ArquivoCreateOrConnectWithoutEleitorInput[]
    createMany?: ArquivoCreateManyEleitorInputEnvelope
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
  }

  export type UsuarioUpdateOneWithoutEleitorNestedInput = {
    create?: XOR<UsuarioCreateWithoutEleitorInput, UsuarioUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutEleitorInput
    upsert?: UsuarioUpsertWithoutEleitorInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutEleitorInput, UsuarioUpdateWithoutEleitorInput>, UsuarioUncheckedUpdateWithoutEleitorInput>
  }

  export type CandidatoUpdateOneWithoutEleitorNestedInput = {
    create?: XOR<CandidatoCreateWithoutEleitorInput, CandidatoUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: CandidatoCreateOrConnectWithoutEleitorInput
    upsert?: CandidatoUpsertWithoutEleitorInput
    disconnect?: CandidatoWhereInput | boolean
    delete?: CandidatoWhereInput | boolean
    connect?: CandidatoWhereUniqueInput
    update?: XOR<XOR<CandidatoUpdateToOneWithWhereWithoutEleitorInput, CandidatoUpdateWithoutEleitorInput>, CandidatoUncheckedUpdateWithoutEleitorInput>
  }

  export type EleitorUpdateOneWithoutMembrosNestedInput = {
    create?: XOR<EleitorCreateWithoutMembrosInput, EleitorUncheckedCreateWithoutMembrosInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutMembrosInput
    upsert?: EleitorUpsertWithoutMembrosInput
    disconnect?: EleitorWhereInput | boolean
    delete?: EleitorWhereInput | boolean
    connect?: EleitorWhereUniqueInput
    update?: XOR<XOR<EleitorUpdateToOneWithWhereWithoutMembrosInput, EleitorUpdateWithoutMembrosInput>, EleitorUncheckedUpdateWithoutMembrosInput>
  }

  export type EleitorUpdateManyWithoutEleitorPaiNestedInput = {
    create?: XOR<EleitorCreateWithoutEleitorPaiInput, EleitorUncheckedCreateWithoutEleitorPaiInput> | EleitorCreateWithoutEleitorPaiInput[] | EleitorUncheckedCreateWithoutEleitorPaiInput[]
    connectOrCreate?: EleitorCreateOrConnectWithoutEleitorPaiInput | EleitorCreateOrConnectWithoutEleitorPaiInput[]
    upsert?: EleitorUpsertWithWhereUniqueWithoutEleitorPaiInput | EleitorUpsertWithWhereUniqueWithoutEleitorPaiInput[]
    createMany?: EleitorCreateManyEleitorPaiInputEnvelope
    set?: EleitorWhereUniqueInput | EleitorWhereUniqueInput[]
    disconnect?: EleitorWhereUniqueInput | EleitorWhereUniqueInput[]
    delete?: EleitorWhereUniqueInput | EleitorWhereUniqueInput[]
    connect?: EleitorWhereUniqueInput | EleitorWhereUniqueInput[]
    update?: EleitorUpdateWithWhereUniqueWithoutEleitorPaiInput | EleitorUpdateWithWhereUniqueWithoutEleitorPaiInput[]
    updateMany?: EleitorUpdateManyWithWhereWithoutEleitorPaiInput | EleitorUpdateManyWithWhereWithoutEleitorPaiInput[]
    deleteMany?: EleitorScalarWhereInput | EleitorScalarWhereInput[]
  }

  export type OrganizacaoEleitoraUpdateOneWithoutEleitorNestedInput = {
    create?: XOR<OrganizacaoEleitoraCreateWithoutEleitorInput, OrganizacaoEleitoraUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: OrganizacaoEleitoraCreateOrConnectWithoutEleitorInput
    upsert?: OrganizacaoEleitoraUpsertWithoutEleitorInput
    disconnect?: OrganizacaoEleitoraWhereInput | boolean
    delete?: OrganizacaoEleitoraWhereInput | boolean
    connect?: OrganizacaoEleitoraWhereUniqueInput
    update?: XOR<XOR<OrganizacaoEleitoraUpdateToOneWithWhereWithoutEleitorInput, OrganizacaoEleitoraUpdateWithoutEleitorInput>, OrganizacaoEleitoraUncheckedUpdateWithoutEleitorInput>
  }

  export type ProcuradorUpdateOneWithoutEleitorNestedInput = {
    create?: XOR<ProcuradorCreateWithoutEleitorInput, ProcuradorUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: ProcuradorCreateOrConnectWithoutEleitorInput
    upsert?: ProcuradorUpsertWithoutEleitorInput
    disconnect?: ProcuradorWhereInput | boolean
    delete?: ProcuradorWhereInput | boolean
    connect?: ProcuradorWhereUniqueInput
    update?: XOR<XOR<ProcuradorUpdateToOneWithWhereWithoutEleitorInput, ProcuradorUpdateWithoutEleitorInput>, ProcuradorUncheckedUpdateWithoutEleitorInput>
  }

  export type ArquivoUpdateManyWithoutEleitorNestedInput = {
    create?: XOR<ArquivoCreateWithoutEleitorInput, ArquivoUncheckedCreateWithoutEleitorInput> | ArquivoCreateWithoutEleitorInput[] | ArquivoUncheckedCreateWithoutEleitorInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutEleitorInput | ArquivoCreateOrConnectWithoutEleitorInput[]
    upsert?: ArquivoUpsertWithWhereUniqueWithoutEleitorInput | ArquivoUpsertWithWhereUniqueWithoutEleitorInput[]
    createMany?: ArquivoCreateManyEleitorInputEnvelope
    set?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    disconnect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    delete?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    update?: ArquivoUpdateWithWhereUniqueWithoutEleitorInput | ArquivoUpdateWithWhereUniqueWithoutEleitorInput[]
    updateMany?: ArquivoUpdateManyWithWhereWithoutEleitorInput | ArquivoUpdateManyWithWhereWithoutEleitorInput[]
    deleteMany?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
  }

  export type EleitorUncheckedUpdateManyWithoutEleitorPaiNestedInput = {
    create?: XOR<EleitorCreateWithoutEleitorPaiInput, EleitorUncheckedCreateWithoutEleitorPaiInput> | EleitorCreateWithoutEleitorPaiInput[] | EleitorUncheckedCreateWithoutEleitorPaiInput[]
    connectOrCreate?: EleitorCreateOrConnectWithoutEleitorPaiInput | EleitorCreateOrConnectWithoutEleitorPaiInput[]
    upsert?: EleitorUpsertWithWhereUniqueWithoutEleitorPaiInput | EleitorUpsertWithWhereUniqueWithoutEleitorPaiInput[]
    createMany?: EleitorCreateManyEleitorPaiInputEnvelope
    set?: EleitorWhereUniqueInput | EleitorWhereUniqueInput[]
    disconnect?: EleitorWhereUniqueInput | EleitorWhereUniqueInput[]
    delete?: EleitorWhereUniqueInput | EleitorWhereUniqueInput[]
    connect?: EleitorWhereUniqueInput | EleitorWhereUniqueInput[]
    update?: EleitorUpdateWithWhereUniqueWithoutEleitorPaiInput | EleitorUpdateWithWhereUniqueWithoutEleitorPaiInput[]
    updateMany?: EleitorUpdateManyWithWhereWithoutEleitorPaiInput | EleitorUpdateManyWithWhereWithoutEleitorPaiInput[]
    deleteMany?: EleitorScalarWhereInput | EleitorScalarWhereInput[]
  }

  export type OrganizacaoEleitoraUncheckedUpdateOneWithoutEleitorNestedInput = {
    create?: XOR<OrganizacaoEleitoraCreateWithoutEleitorInput, OrganizacaoEleitoraUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: OrganizacaoEleitoraCreateOrConnectWithoutEleitorInput
    upsert?: OrganizacaoEleitoraUpsertWithoutEleitorInput
    disconnect?: OrganizacaoEleitoraWhereInput | boolean
    delete?: OrganizacaoEleitoraWhereInput | boolean
    connect?: OrganizacaoEleitoraWhereUniqueInput
    update?: XOR<XOR<OrganizacaoEleitoraUpdateToOneWithWhereWithoutEleitorInput, OrganizacaoEleitoraUpdateWithoutEleitorInput>, OrganizacaoEleitoraUncheckedUpdateWithoutEleitorInput>
  }

  export type ProcuradorUncheckedUpdateOneWithoutEleitorNestedInput = {
    create?: XOR<ProcuradorCreateWithoutEleitorInput, ProcuradorUncheckedCreateWithoutEleitorInput>
    connectOrCreate?: ProcuradorCreateOrConnectWithoutEleitorInput
    upsert?: ProcuradorUpsertWithoutEleitorInput
    disconnect?: ProcuradorWhereInput | boolean
    delete?: ProcuradorWhereInput | boolean
    connect?: ProcuradorWhereUniqueInput
    update?: XOR<XOR<ProcuradorUpdateToOneWithWhereWithoutEleitorInput, ProcuradorUpdateWithoutEleitorInput>, ProcuradorUncheckedUpdateWithoutEleitorInput>
  }

  export type ArquivoUncheckedUpdateManyWithoutEleitorNestedInput = {
    create?: XOR<ArquivoCreateWithoutEleitorInput, ArquivoUncheckedCreateWithoutEleitorInput> | ArquivoCreateWithoutEleitorInput[] | ArquivoUncheckedCreateWithoutEleitorInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutEleitorInput | ArquivoCreateOrConnectWithoutEleitorInput[]
    upsert?: ArquivoUpsertWithWhereUniqueWithoutEleitorInput | ArquivoUpsertWithWhereUniqueWithoutEleitorInput[]
    createMany?: ArquivoCreateManyEleitorInputEnvelope
    set?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    disconnect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    delete?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    update?: ArquivoUpdateWithWhereUniqueWithoutEleitorInput | ArquivoUpdateWithWhereUniqueWithoutEleitorInput[]
    updateMany?: ArquivoUpdateManyWithWhereWithoutEleitorInput | ArquivoUpdateManyWithWhereWithoutEleitorInput[]
    deleteMany?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
  }

  export type EleitorCreateNestedOneWithoutOrganizacaoInput = {
    create?: XOR<EleitorCreateWithoutOrganizacaoInput, EleitorUncheckedCreateWithoutOrganizacaoInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutOrganizacaoInput
    connect?: EleitorWhereUniqueInput
  }

  export type ArquivoCreateNestedManyWithoutOrgEleitoraInput = {
    create?: XOR<ArquivoCreateWithoutOrgEleitoraInput, ArquivoUncheckedCreateWithoutOrgEleitoraInput> | ArquivoCreateWithoutOrgEleitoraInput[] | ArquivoUncheckedCreateWithoutOrgEleitoraInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutOrgEleitoraInput | ArquivoCreateOrConnectWithoutOrgEleitoraInput[]
    createMany?: ArquivoCreateManyOrgEleitoraInputEnvelope
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
  }

  export type ArquivoUncheckedCreateNestedManyWithoutOrgEleitoraInput = {
    create?: XOR<ArquivoCreateWithoutOrgEleitoraInput, ArquivoUncheckedCreateWithoutOrgEleitoraInput> | ArquivoCreateWithoutOrgEleitoraInput[] | ArquivoUncheckedCreateWithoutOrgEleitoraInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutOrgEleitoraInput | ArquivoCreateOrConnectWithoutOrgEleitoraInput[]
    createMany?: ArquivoCreateManyOrgEleitoraInputEnvelope
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
  }

  export type EleitorUpdateOneRequiredWithoutOrganizacaoNestedInput = {
    create?: XOR<EleitorCreateWithoutOrganizacaoInput, EleitorUncheckedCreateWithoutOrganizacaoInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutOrganizacaoInput
    upsert?: EleitorUpsertWithoutOrganizacaoInput
    connect?: EleitorWhereUniqueInput
    update?: XOR<XOR<EleitorUpdateToOneWithWhereWithoutOrganizacaoInput, EleitorUpdateWithoutOrganizacaoInput>, EleitorUncheckedUpdateWithoutOrganizacaoInput>
  }

  export type ArquivoUpdateManyWithoutOrgEleitoraNestedInput = {
    create?: XOR<ArquivoCreateWithoutOrgEleitoraInput, ArquivoUncheckedCreateWithoutOrgEleitoraInput> | ArquivoCreateWithoutOrgEleitoraInput[] | ArquivoUncheckedCreateWithoutOrgEleitoraInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutOrgEleitoraInput | ArquivoCreateOrConnectWithoutOrgEleitoraInput[]
    upsert?: ArquivoUpsertWithWhereUniqueWithoutOrgEleitoraInput | ArquivoUpsertWithWhereUniqueWithoutOrgEleitoraInput[]
    createMany?: ArquivoCreateManyOrgEleitoraInputEnvelope
    set?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    disconnect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    delete?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    update?: ArquivoUpdateWithWhereUniqueWithoutOrgEleitoraInput | ArquivoUpdateWithWhereUniqueWithoutOrgEleitoraInput[]
    updateMany?: ArquivoUpdateManyWithWhereWithoutOrgEleitoraInput | ArquivoUpdateManyWithWhereWithoutOrgEleitoraInput[]
    deleteMany?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
  }

  export type ArquivoUncheckedUpdateManyWithoutOrgEleitoraNestedInput = {
    create?: XOR<ArquivoCreateWithoutOrgEleitoraInput, ArquivoUncheckedCreateWithoutOrgEleitoraInput> | ArquivoCreateWithoutOrgEleitoraInput[] | ArquivoUncheckedCreateWithoutOrgEleitoraInput[]
    connectOrCreate?: ArquivoCreateOrConnectWithoutOrgEleitoraInput | ArquivoCreateOrConnectWithoutOrgEleitoraInput[]
    upsert?: ArquivoUpsertWithWhereUniqueWithoutOrgEleitoraInput | ArquivoUpsertWithWhereUniqueWithoutOrgEleitoraInput[]
    createMany?: ArquivoCreateManyOrgEleitoraInputEnvelope
    set?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    disconnect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    delete?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    connect?: ArquivoWhereUniqueInput | ArquivoWhereUniqueInput[]
    update?: ArquivoUpdateWithWhereUniqueWithoutOrgEleitoraInput | ArquivoUpdateWithWhereUniqueWithoutOrgEleitoraInput[]
    updateMany?: ArquivoUpdateManyWithWhereWithoutOrgEleitoraInput | ArquivoUpdateManyWithWhereWithoutOrgEleitoraInput[]
    deleteMany?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
  }

  export type EleitorCreateNestedOneWithoutProcuradorInput = {
    create?: XOR<EleitorCreateWithoutProcuradorInput, EleitorUncheckedCreateWithoutProcuradorInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutProcuradorInput
    connect?: EleitorWhereUniqueInput
  }

  export type EleitorUpdateOneRequiredWithoutProcuradorNestedInput = {
    create?: XOR<EleitorCreateWithoutProcuradorInput, EleitorUncheckedCreateWithoutProcuradorInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutProcuradorInput
    upsert?: EleitorUpsertWithoutProcuradorInput
    connect?: EleitorWhereUniqueInput
    update?: XOR<XOR<EleitorUpdateToOneWithWhereWithoutProcuradorInput, EleitorUpdateWithoutProcuradorInput>, EleitorUncheckedUpdateWithoutProcuradorInput>
  }

  export type CandidaturaCreateNestedOneWithoutArquivosInput = {
    create?: XOR<CandidaturaCreateWithoutArquivosInput, CandidaturaUncheckedCreateWithoutArquivosInput>
    connectOrCreate?: CandidaturaCreateOrConnectWithoutArquivosInput
    connect?: CandidaturaWhereUniqueInput
  }

  export type CandidatoCreateNestedOneWithoutArquivosInput = {
    create?: XOR<CandidatoCreateWithoutArquivosInput, CandidatoUncheckedCreateWithoutArquivosInput>
    connectOrCreate?: CandidatoCreateOrConnectWithoutArquivosInput
    connect?: CandidatoWhereUniqueInput
  }

  export type OrganizacaoCandidataCreateNestedOneWithoutArquivosInput = {
    create?: XOR<OrganizacaoCandidataCreateWithoutArquivosInput, OrganizacaoCandidataUncheckedCreateWithoutArquivosInput>
    connectOrCreate?: OrganizacaoCandidataCreateOrConnectWithoutArquivosInput
    connect?: OrganizacaoCandidataWhereUniqueInput
  }

  export type EleitorCreateNestedOneWithoutArquivosInput = {
    create?: XOR<EleitorCreateWithoutArquivosInput, EleitorUncheckedCreateWithoutArquivosInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutArquivosInput
    connect?: EleitorWhereUniqueInput
  }

  export type OrganizacaoEleitoraCreateNestedOneWithoutArquivosInput = {
    create?: XOR<OrganizacaoEleitoraCreateWithoutArquivosInput, OrganizacaoEleitoraUncheckedCreateWithoutArquivosInput>
    connectOrCreate?: OrganizacaoEleitoraCreateOrConnectWithoutArquivosInput
    connect?: OrganizacaoEleitoraWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCategoriaArquivoFieldUpdateOperationsInput = {
    set?: $Enums.CategoriaArquivo
  }

  export type CandidaturaUpdateOneWithoutArquivosNestedInput = {
    create?: XOR<CandidaturaCreateWithoutArquivosInput, CandidaturaUncheckedCreateWithoutArquivosInput>
    connectOrCreate?: CandidaturaCreateOrConnectWithoutArquivosInput
    upsert?: CandidaturaUpsertWithoutArquivosInput
    disconnect?: CandidaturaWhereInput | boolean
    delete?: CandidaturaWhereInput | boolean
    connect?: CandidaturaWhereUniqueInput
    update?: XOR<XOR<CandidaturaUpdateToOneWithWhereWithoutArquivosInput, CandidaturaUpdateWithoutArquivosInput>, CandidaturaUncheckedUpdateWithoutArquivosInput>
  }

  export type CandidatoUpdateOneWithoutArquivosNestedInput = {
    create?: XOR<CandidatoCreateWithoutArquivosInput, CandidatoUncheckedCreateWithoutArquivosInput>
    connectOrCreate?: CandidatoCreateOrConnectWithoutArquivosInput
    upsert?: CandidatoUpsertWithoutArquivosInput
    disconnect?: CandidatoWhereInput | boolean
    delete?: CandidatoWhereInput | boolean
    connect?: CandidatoWhereUniqueInput
    update?: XOR<XOR<CandidatoUpdateToOneWithWhereWithoutArquivosInput, CandidatoUpdateWithoutArquivosInput>, CandidatoUncheckedUpdateWithoutArquivosInput>
  }

  export type OrganizacaoCandidataUpdateOneWithoutArquivosNestedInput = {
    create?: XOR<OrganizacaoCandidataCreateWithoutArquivosInput, OrganizacaoCandidataUncheckedCreateWithoutArquivosInput>
    connectOrCreate?: OrganizacaoCandidataCreateOrConnectWithoutArquivosInput
    upsert?: OrganizacaoCandidataUpsertWithoutArquivosInput
    disconnect?: OrganizacaoCandidataWhereInput | boolean
    delete?: OrganizacaoCandidataWhereInput | boolean
    connect?: OrganizacaoCandidataWhereUniqueInput
    update?: XOR<XOR<OrganizacaoCandidataUpdateToOneWithWhereWithoutArquivosInput, OrganizacaoCandidataUpdateWithoutArquivosInput>, OrganizacaoCandidataUncheckedUpdateWithoutArquivosInput>
  }

  export type EleitorUpdateOneWithoutArquivosNestedInput = {
    create?: XOR<EleitorCreateWithoutArquivosInput, EleitorUncheckedCreateWithoutArquivosInput>
    connectOrCreate?: EleitorCreateOrConnectWithoutArquivosInput
    upsert?: EleitorUpsertWithoutArquivosInput
    disconnect?: EleitorWhereInput | boolean
    delete?: EleitorWhereInput | boolean
    connect?: EleitorWhereUniqueInput
    update?: XOR<XOR<EleitorUpdateToOneWithWhereWithoutArquivosInput, EleitorUpdateWithoutArquivosInput>, EleitorUncheckedUpdateWithoutArquivosInput>
  }

  export type OrganizacaoEleitoraUpdateOneWithoutArquivosNestedInput = {
    create?: XOR<OrganizacaoEleitoraCreateWithoutArquivosInput, OrganizacaoEleitoraUncheckedCreateWithoutArquivosInput>
    connectOrCreate?: OrganizacaoEleitoraCreateOrConnectWithoutArquivosInput
    upsert?: OrganizacaoEleitoraUpsertWithoutArquivosInput
    disconnect?: OrganizacaoEleitoraWhereInput | boolean
    delete?: OrganizacaoEleitoraWhereInput | boolean
    connect?: OrganizacaoEleitoraWhereUniqueInput
    update?: XOR<XOR<OrganizacaoEleitoraUpdateToOneWithWhereWithoutArquivosInput, OrganizacaoEleitoraUpdateWithoutArquivosInput>, OrganizacaoEleitoraUncheckedUpdateWithoutArquivosInput>
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumTipoUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[]
    notIn?: $Enums.TipoUsuario[]
    not?: NestedEnumTipoUsuarioFilter<$PrismaModel> | $Enums.TipoUsuario
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
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPermissaoNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Permissao | EnumPermissaoFieldRefInput<$PrismaModel> | null
    in?: $Enums.Permissao[] | null
    notIn?: $Enums.Permissao[] | null
    not?: NestedEnumPermissaoNullableFilter<$PrismaModel> | $Enums.Permissao | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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
    search?: string
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

  export type NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[]
    notIn?: $Enums.TipoUsuario[]
    not?: NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.TipoUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoUsuarioFilter<$PrismaModel>
    _max?: NestedEnumTipoUsuarioFilter<$PrismaModel>
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
    search?: string
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

  export type NestedEnumPermissaoNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Permissao | EnumPermissaoFieldRefInput<$PrismaModel> | null
    in?: $Enums.Permissao[] | null
    notIn?: $Enums.Permissao[] | null
    not?: NestedEnumPermissaoNullableWithAggregatesFilter<$PrismaModel> | $Enums.Permissao | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPermissaoNullableFilter<$PrismaModel>
    _max?: NestedEnumPermissaoNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumTipoInscricaoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoInscricao | EnumTipoInscricaoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoInscricao[]
    notIn?: $Enums.TipoInscricao[]
    not?: NestedEnumTipoInscricaoFilter<$PrismaModel> | $Enums.TipoInscricao
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedEnumTipoInscricaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoInscricao | EnumTipoInscricaoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoInscricao[]
    notIn?: $Enums.TipoInscricao[]
    not?: NestedEnumTipoInscricaoWithAggregatesFilter<$PrismaModel> | $Enums.TipoInscricao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoInscricaoFilter<$PrismaModel>
    _max?: NestedEnumTipoInscricaoFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedEnumSegmentoFilter<$PrismaModel = never> = {
    equals?: $Enums.Segmento | EnumSegmentoFieldRefInput<$PrismaModel>
    in?: $Enums.Segmento[]
    notIn?: $Enums.Segmento[]
    not?: NestedEnumSegmentoFilter<$PrismaModel> | $Enums.Segmento
  }

  export type NestedEnumSegmentoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Segmento | EnumSegmentoFieldRefInput<$PrismaModel>
    in?: $Enums.Segmento[]
    notIn?: $Enums.Segmento[]
    not?: NestedEnumSegmentoWithAggregatesFilter<$PrismaModel> | $Enums.Segmento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSegmentoFilter<$PrismaModel>
    _max?: NestedEnumSegmentoFilter<$PrismaModel>
  }

  export type NestedEnumTipoCandidatoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCandidato | EnumTipoCandidatoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCandidato[]
    notIn?: $Enums.TipoCandidato[]
    not?: NestedEnumTipoCandidatoFilter<$PrismaModel> | $Enums.TipoCandidato
  }

  export type NestedEnumGeneroFilter<$PrismaModel = never> = {
    equals?: $Enums.Genero | EnumGeneroFieldRefInput<$PrismaModel>
    in?: $Enums.Genero[]
    notIn?: $Enums.Genero[]
    not?: NestedEnumGeneroFilter<$PrismaModel> | $Enums.Genero
  }

  export type NestedEnumTipoCandidatoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCandidato | EnumTipoCandidatoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCandidato[]
    notIn?: $Enums.TipoCandidato[]
    not?: NestedEnumTipoCandidatoWithAggregatesFilter<$PrismaModel> | $Enums.TipoCandidato
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoCandidatoFilter<$PrismaModel>
    _max?: NestedEnumTipoCandidatoFilter<$PrismaModel>
  }

  export type NestedEnumGeneroWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Genero | EnumGeneroFieldRefInput<$PrismaModel>
    in?: $Enums.Genero[]
    notIn?: $Enums.Genero[]
    not?: NestedEnumGeneroWithAggregatesFilter<$PrismaModel> | $Enums.Genero
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGeneroFilter<$PrismaModel>
    _max?: NestedEnumGeneroFilter<$PrismaModel>
  }

  export type NestedEnumCategoriaArquivoFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaArquivo | EnumCategoriaArquivoFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaArquivo[]
    notIn?: $Enums.CategoriaArquivo[]
    not?: NestedEnumCategoriaArquivoFilter<$PrismaModel> | $Enums.CategoriaArquivo
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

  export type NestedEnumCategoriaArquivoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoriaArquivo | EnumCategoriaArquivoFieldRefInput<$PrismaModel>
    in?: $Enums.CategoriaArquivo[]
    notIn?: $Enums.CategoriaArquivo[]
    not?: NestedEnumCategoriaArquivoWithAggregatesFilter<$PrismaModel> | $Enums.CategoriaArquivo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoriaArquivoFilter<$PrismaModel>
    _max?: NestedEnumCategoriaArquivoFilter<$PrismaModel>
  }

  export type CandidaturaCreateWithoutUsuarioInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao?: OrganizacaoCandidataCreateNestedOneWithoutCandidaturaInput
    candidatos?: CandidatoCreateNestedManyWithoutCandidaturaInput
    arquivos?: ArquivoCreateNestedManyWithoutCandidaturaInput
  }

  export type CandidaturaUncheckedCreateWithoutUsuarioInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao?: OrganizacaoCandidataUncheckedCreateNestedOneWithoutCandidaturaInput
    candidatos?: CandidatoUncheckedCreateNestedManyWithoutCandidaturaInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutCandidaturaInput
  }

  export type CandidaturaCreateOrConnectWithoutUsuarioInput = {
    where: CandidaturaWhereUniqueInput
    create: XOR<CandidaturaCreateWithoutUsuarioInput, CandidaturaUncheckedCreateWithoutUsuarioInput>
  }

  export type EleitorCreateWithoutUsuarioInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidato?: CandidatoCreateNestedOneWithoutEleitorInput
    eleitorPai?: EleitorCreateNestedOneWithoutMembrosInput
    membros?: EleitorCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoCreateNestedManyWithoutEleitorInput
  }

  export type EleitorUncheckedCreateWithoutUsuarioInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    candidatoId?: string | null
    eleitorPaiId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    membros?: EleitorUncheckedCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraUncheckedCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorUncheckedCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutEleitorInput
  }

  export type EleitorCreateOrConnectWithoutUsuarioInput = {
    where: EleitorWhereUniqueInput
    create: XOR<EleitorCreateWithoutUsuarioInput, EleitorUncheckedCreateWithoutUsuarioInput>
  }

  export type CandidaturaUpsertWithoutUsuarioInput = {
    update: XOR<CandidaturaUpdateWithoutUsuarioInput, CandidaturaUncheckedUpdateWithoutUsuarioInput>
    create: XOR<CandidaturaCreateWithoutUsuarioInput, CandidaturaUncheckedCreateWithoutUsuarioInput>
    where?: CandidaturaWhereInput
  }

  export type CandidaturaUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: CandidaturaWhereInput
    data: XOR<CandidaturaUpdateWithoutUsuarioInput, CandidaturaUncheckedUpdateWithoutUsuarioInput>
  }

  export type CandidaturaUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoCandidataUpdateOneWithoutCandidaturaNestedInput
    candidatos?: CandidatoUpdateManyWithoutCandidaturaNestedInput
    arquivos?: ArquivoUpdateManyWithoutCandidaturaNestedInput
  }

  export type CandidaturaUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoCandidataUncheckedUpdateOneWithoutCandidaturaNestedInput
    candidatos?: CandidatoUncheckedUpdateManyWithoutCandidaturaNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutCandidaturaNestedInput
  }

  export type EleitorUpsertWithoutUsuarioInput = {
    update: XOR<EleitorUpdateWithoutUsuarioInput, EleitorUncheckedUpdateWithoutUsuarioInput>
    create: XOR<EleitorCreateWithoutUsuarioInput, EleitorUncheckedCreateWithoutUsuarioInput>
    where?: EleitorWhereInput
  }

  export type EleitorUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: EleitorWhereInput
    data: XOR<EleitorUpdateWithoutUsuarioInput, EleitorUncheckedUpdateWithoutUsuarioInput>
  }

  export type EleitorUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidato?: CandidatoUpdateOneWithoutEleitorNestedInput
    eleitorPai?: EleitorUpdateOneWithoutMembrosNestedInput
    membros?: EleitorUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUpdateManyWithoutEleitorNestedInput
  }

  export type EleitorUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorPaiId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    membros?: EleitorUncheckedUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUncheckedUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUncheckedUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutEleitorNestedInput
  }

  export type UsuarioCreateWithoutCandidaturaInput = {
    id?: string
    tipo?: $Enums.TipoUsuario
    nome: string
    email: string
    login?: string | null
    permissao?: $Enums.Permissao | null
    status?: boolean
    senha?: string | null
    primeiroAcesso?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    eleitor?: EleitorCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutCandidaturaInput = {
    id?: string
    tipo?: $Enums.TipoUsuario
    nome: string
    email: string
    login?: string | null
    permissao?: $Enums.Permissao | null
    status?: boolean
    senha?: string | null
    primeiroAcesso?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    eleitor?: EleitorUncheckedCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutCandidaturaInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutCandidaturaInput, UsuarioUncheckedCreateWithoutCandidaturaInput>
  }

  export type OrganizacaoCandidataCreateWithoutCandidaturaInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    emailEntidade: string
    telefone?: string | null
    formaChapa?: boolean
    cnpjChapa?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    arquivos?: ArquivoCreateNestedManyWithoutOrgCandidataInput
  }

  export type OrganizacaoCandidataUncheckedCreateWithoutCandidaturaInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    emailEntidade: string
    telefone?: string | null
    formaChapa?: boolean
    cnpjChapa?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutOrgCandidataInput
  }

  export type OrganizacaoCandidataCreateOrConnectWithoutCandidaturaInput = {
    where: OrganizacaoCandidataWhereUniqueInput
    create: XOR<OrganizacaoCandidataCreateWithoutCandidaturaInput, OrganizacaoCandidataUncheckedCreateWithoutCandidaturaInput>
  }

  export type CandidatoCreateWithoutCandidaturaInput = {
    id?: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial?: string | null
    nomeEmpresa?: string | null
    genero: $Enums.Genero
    dataNascimento: Date | string
    cpf: string
    tituloEleitor?: string | null
    domicilioEleitoral?: string | null
    email: string
    telefone?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    arquivos?: ArquivoCreateNestedManyWithoutCandidatoInput
    eleitor?: EleitorCreateNestedOneWithoutCandidatoInput
  }

  export type CandidatoUncheckedCreateWithoutCandidaturaInput = {
    id?: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial?: string | null
    nomeEmpresa?: string | null
    genero: $Enums.Genero
    dataNascimento: Date | string
    cpf: string
    tituloEleitor?: string | null
    domicilioEleitoral?: string | null
    email: string
    telefone?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutCandidatoInput
    eleitor?: EleitorUncheckedCreateNestedOneWithoutCandidatoInput
  }

  export type CandidatoCreateOrConnectWithoutCandidaturaInput = {
    where: CandidatoWhereUniqueInput
    create: XOR<CandidatoCreateWithoutCandidaturaInput, CandidatoUncheckedCreateWithoutCandidaturaInput>
  }

  export type CandidatoCreateManyCandidaturaInputEnvelope = {
    data: CandidatoCreateManyCandidaturaInput | CandidatoCreateManyCandidaturaInput[]
    skipDuplicates?: boolean
  }

  export type ArquivoCreateWithoutCandidaturaInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidato?: CandidatoCreateNestedOneWithoutArquivosInput
    orgCandidata?: OrganizacaoCandidataCreateNestedOneWithoutArquivosInput
    eleitor?: EleitorCreateNestedOneWithoutArquivosInput
    orgEleitora?: OrganizacaoEleitoraCreateNestedOneWithoutArquivosInput
  }

  export type ArquivoUncheckedCreateWithoutCandidaturaInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidatoId?: string | null
    orgCandidataId?: string | null
    eleitorId?: string | null
    orgEleitoraId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoCreateOrConnectWithoutCandidaturaInput = {
    where: ArquivoWhereUniqueInput
    create: XOR<ArquivoCreateWithoutCandidaturaInput, ArquivoUncheckedCreateWithoutCandidaturaInput>
  }

  export type ArquivoCreateManyCandidaturaInputEnvelope = {
    data: ArquivoCreateManyCandidaturaInput | ArquivoCreateManyCandidaturaInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutCandidaturaInput = {
    update: XOR<UsuarioUpdateWithoutCandidaturaInput, UsuarioUncheckedUpdateWithoutCandidaturaInput>
    create: XOR<UsuarioCreateWithoutCandidaturaInput, UsuarioUncheckedCreateWithoutCandidaturaInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutCandidaturaInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutCandidaturaInput, UsuarioUncheckedUpdateWithoutCandidaturaInput>
  }

  export type UsuarioUpdateWithoutCandidaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    permissao?: NullableEnumPermissaoFieldUpdateOperationsInput | $Enums.Permissao | null
    status?: BoolFieldUpdateOperationsInput | boolean
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    primeiroAcesso?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    eleitor?: EleitorUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutCandidaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    permissao?: NullableEnumPermissaoFieldUpdateOperationsInput | $Enums.Permissao | null
    status?: BoolFieldUpdateOperationsInput | boolean
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    primeiroAcesso?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    eleitor?: EleitorUncheckedUpdateOneWithoutUsuarioNestedInput
  }

  export type OrganizacaoCandidataUpsertWithoutCandidaturaInput = {
    update: XOR<OrganizacaoCandidataUpdateWithoutCandidaturaInput, OrganizacaoCandidataUncheckedUpdateWithoutCandidaturaInput>
    create: XOR<OrganizacaoCandidataCreateWithoutCandidaturaInput, OrganizacaoCandidataUncheckedCreateWithoutCandidaturaInput>
    where?: OrganizacaoCandidataWhereInput
  }

  export type OrganizacaoCandidataUpdateToOneWithWhereWithoutCandidaturaInput = {
    where?: OrganizacaoCandidataWhereInput
    data: XOR<OrganizacaoCandidataUpdateWithoutCandidaturaInput, OrganizacaoCandidataUncheckedUpdateWithoutCandidaturaInput>
  }

  export type OrganizacaoCandidataUpdateWithoutCandidaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    formaChapa?: BoolFieldUpdateOperationsInput | boolean
    cnpjChapa?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    arquivos?: ArquivoUpdateManyWithoutOrgCandidataNestedInput
  }

  export type OrganizacaoCandidataUncheckedUpdateWithoutCandidaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    formaChapa?: BoolFieldUpdateOperationsInput | boolean
    cnpjChapa?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    arquivos?: ArquivoUncheckedUpdateManyWithoutOrgCandidataNestedInput
  }

  export type CandidatoUpsertWithWhereUniqueWithoutCandidaturaInput = {
    where: CandidatoWhereUniqueInput
    update: XOR<CandidatoUpdateWithoutCandidaturaInput, CandidatoUncheckedUpdateWithoutCandidaturaInput>
    create: XOR<CandidatoCreateWithoutCandidaturaInput, CandidatoUncheckedCreateWithoutCandidaturaInput>
  }

  export type CandidatoUpdateWithWhereUniqueWithoutCandidaturaInput = {
    where: CandidatoWhereUniqueInput
    data: XOR<CandidatoUpdateWithoutCandidaturaInput, CandidatoUncheckedUpdateWithoutCandidaturaInput>
  }

  export type CandidatoUpdateManyWithWhereWithoutCandidaturaInput = {
    where: CandidatoScalarWhereInput
    data: XOR<CandidatoUpdateManyMutationInput, CandidatoUncheckedUpdateManyWithoutCandidaturaInput>
  }

  export type CandidatoScalarWhereInput = {
    AND?: CandidatoScalarWhereInput | CandidatoScalarWhereInput[]
    OR?: CandidatoScalarWhereInput[]
    NOT?: CandidatoScalarWhereInput | CandidatoScalarWhereInput[]
    id?: StringFilter<"Candidato"> | string
    tipoCandidato?: EnumTipoCandidatoFilter<"Candidato"> | $Enums.TipoCandidato
    nome?: StringFilter<"Candidato"> | string
    nomeSocial?: StringNullableFilter<"Candidato"> | string | null
    nomeEmpresa?: StringNullableFilter<"Candidato"> | string | null
    genero?: EnumGeneroFilter<"Candidato"> | $Enums.Genero
    dataNascimento?: DateTimeFilter<"Candidato"> | Date | string
    cpf?: StringFilter<"Candidato"> | string
    tituloEleitor?: StringNullableFilter<"Candidato"> | string | null
    domicilioEleitoral?: StringNullableFilter<"Candidato"> | string | null
    email?: StringFilter<"Candidato"> | string
    telefone?: StringNullableFilter<"Candidato"> | string | null
    candidaturaId?: StringFilter<"Candidato"> | string
    criadoEm?: DateTimeFilter<"Candidato"> | Date | string
    atualizadoEm?: DateTimeFilter<"Candidato"> | Date | string
  }

  export type ArquivoUpsertWithWhereUniqueWithoutCandidaturaInput = {
    where: ArquivoWhereUniqueInput
    update: XOR<ArquivoUpdateWithoutCandidaturaInput, ArquivoUncheckedUpdateWithoutCandidaturaInput>
    create: XOR<ArquivoCreateWithoutCandidaturaInput, ArquivoUncheckedCreateWithoutCandidaturaInput>
  }

  export type ArquivoUpdateWithWhereUniqueWithoutCandidaturaInput = {
    where: ArquivoWhereUniqueInput
    data: XOR<ArquivoUpdateWithoutCandidaturaInput, ArquivoUncheckedUpdateWithoutCandidaturaInput>
  }

  export type ArquivoUpdateManyWithWhereWithoutCandidaturaInput = {
    where: ArquivoScalarWhereInput
    data: XOR<ArquivoUpdateManyMutationInput, ArquivoUncheckedUpdateManyWithoutCandidaturaInput>
  }

  export type ArquivoScalarWhereInput = {
    AND?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
    OR?: ArquivoScalarWhereInput[]
    NOT?: ArquivoScalarWhereInput | ArquivoScalarWhereInput[]
    id?: StringFilter<"Arquivo"> | string
    nome?: StringFilter<"Arquivo"> | string
    tipo?: StringFilter<"Arquivo"> | string
    tamanho?: IntFilter<"Arquivo"> | number
    caminho?: StringFilter<"Arquivo"> | string
    categoria?: EnumCategoriaArquivoFilter<"Arquivo"> | $Enums.CategoriaArquivo
    candidaturaId?: StringNullableFilter<"Arquivo"> | string | null
    candidatoId?: StringNullableFilter<"Arquivo"> | string | null
    orgCandidataId?: StringNullableFilter<"Arquivo"> | string | null
    eleitorId?: StringNullableFilter<"Arquivo"> | string | null
    orgEleitoraId?: StringNullableFilter<"Arquivo"> | string | null
    criadoEm?: DateTimeFilter<"Arquivo"> | Date | string
    atualizadoEm?: DateTimeFilter<"Arquivo"> | Date | string
  }

  export type CandidaturaCreateWithoutOrganizacaoInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutCandidaturaInput
    candidatos?: CandidatoCreateNestedManyWithoutCandidaturaInput
    arquivos?: ArquivoCreateNestedManyWithoutCandidaturaInput
  }

  export type CandidaturaUncheckedCreateWithoutOrganizacaoInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    usuarioId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatos?: CandidatoUncheckedCreateNestedManyWithoutCandidaturaInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutCandidaturaInput
  }

  export type CandidaturaCreateOrConnectWithoutOrganizacaoInput = {
    where: CandidaturaWhereUniqueInput
    create: XOR<CandidaturaCreateWithoutOrganizacaoInput, CandidaturaUncheckedCreateWithoutOrganizacaoInput>
  }

  export type ArquivoCreateWithoutOrgCandidataInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura?: CandidaturaCreateNestedOneWithoutArquivosInput
    candidato?: CandidatoCreateNestedOneWithoutArquivosInput
    eleitor?: EleitorCreateNestedOneWithoutArquivosInput
    orgEleitora?: OrganizacaoEleitoraCreateNestedOneWithoutArquivosInput
  }

  export type ArquivoUncheckedCreateWithoutOrgCandidataInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId?: string | null
    candidatoId?: string | null
    eleitorId?: string | null
    orgEleitoraId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoCreateOrConnectWithoutOrgCandidataInput = {
    where: ArquivoWhereUniqueInput
    create: XOR<ArquivoCreateWithoutOrgCandidataInput, ArquivoUncheckedCreateWithoutOrgCandidataInput>
  }

  export type ArquivoCreateManyOrgCandidataInputEnvelope = {
    data: ArquivoCreateManyOrgCandidataInput | ArquivoCreateManyOrgCandidataInput[]
    skipDuplicates?: boolean
  }

  export type CandidaturaUpsertWithoutOrganizacaoInput = {
    update: XOR<CandidaturaUpdateWithoutOrganizacaoInput, CandidaturaUncheckedUpdateWithoutOrganizacaoInput>
    create: XOR<CandidaturaCreateWithoutOrganizacaoInput, CandidaturaUncheckedCreateWithoutOrganizacaoInput>
    where?: CandidaturaWhereInput
  }

  export type CandidaturaUpdateToOneWithWhereWithoutOrganizacaoInput = {
    where?: CandidaturaWhereInput
    data: XOR<CandidaturaUpdateWithoutOrganizacaoInput, CandidaturaUncheckedUpdateWithoutOrganizacaoInput>
  }

  export type CandidaturaUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutCandidaturaNestedInput
    candidatos?: CandidatoUpdateManyWithoutCandidaturaNestedInput
    arquivos?: ArquivoUpdateManyWithoutCandidaturaNestedInput
  }

  export type CandidaturaUncheckedUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatos?: CandidatoUncheckedUpdateManyWithoutCandidaturaNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutCandidaturaNestedInput
  }

  export type ArquivoUpsertWithWhereUniqueWithoutOrgCandidataInput = {
    where: ArquivoWhereUniqueInput
    update: XOR<ArquivoUpdateWithoutOrgCandidataInput, ArquivoUncheckedUpdateWithoutOrgCandidataInput>
    create: XOR<ArquivoCreateWithoutOrgCandidataInput, ArquivoUncheckedCreateWithoutOrgCandidataInput>
  }

  export type ArquivoUpdateWithWhereUniqueWithoutOrgCandidataInput = {
    where: ArquivoWhereUniqueInput
    data: XOR<ArquivoUpdateWithoutOrgCandidataInput, ArquivoUncheckedUpdateWithoutOrgCandidataInput>
  }

  export type ArquivoUpdateManyWithWhereWithoutOrgCandidataInput = {
    where: ArquivoScalarWhereInput
    data: XOR<ArquivoUpdateManyMutationInput, ArquivoUncheckedUpdateManyWithoutOrgCandidataInput>
  }

  export type CandidaturaCreateWithoutCandidatosInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutCandidaturaInput
    organizacao?: OrganizacaoCandidataCreateNestedOneWithoutCandidaturaInput
    arquivos?: ArquivoCreateNestedManyWithoutCandidaturaInput
  }

  export type CandidaturaUncheckedCreateWithoutCandidatosInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    usuarioId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao?: OrganizacaoCandidataUncheckedCreateNestedOneWithoutCandidaturaInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutCandidaturaInput
  }

  export type CandidaturaCreateOrConnectWithoutCandidatosInput = {
    where: CandidaturaWhereUniqueInput
    create: XOR<CandidaturaCreateWithoutCandidatosInput, CandidaturaUncheckedCreateWithoutCandidatosInput>
  }

  export type ArquivoCreateWithoutCandidatoInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura?: CandidaturaCreateNestedOneWithoutArquivosInput
    orgCandidata?: OrganizacaoCandidataCreateNestedOneWithoutArquivosInput
    eleitor?: EleitorCreateNestedOneWithoutArquivosInput
    orgEleitora?: OrganizacaoEleitoraCreateNestedOneWithoutArquivosInput
  }

  export type ArquivoUncheckedCreateWithoutCandidatoInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId?: string | null
    orgCandidataId?: string | null
    eleitorId?: string | null
    orgEleitoraId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoCreateOrConnectWithoutCandidatoInput = {
    where: ArquivoWhereUniqueInput
    create: XOR<ArquivoCreateWithoutCandidatoInput, ArquivoUncheckedCreateWithoutCandidatoInput>
  }

  export type ArquivoCreateManyCandidatoInputEnvelope = {
    data: ArquivoCreateManyCandidatoInput | ArquivoCreateManyCandidatoInput[]
    skipDuplicates?: boolean
  }

  export type EleitorCreateWithoutCandidatoInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutEleitorInput
    eleitorPai?: EleitorCreateNestedOneWithoutMembrosInput
    membros?: EleitorCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoCreateNestedManyWithoutEleitorInput
  }

  export type EleitorUncheckedCreateWithoutCandidatoInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    usuarioId?: string | null
    eleitorPaiId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    membros?: EleitorUncheckedCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraUncheckedCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorUncheckedCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutEleitorInput
  }

  export type EleitorCreateOrConnectWithoutCandidatoInput = {
    where: EleitorWhereUniqueInput
    create: XOR<EleitorCreateWithoutCandidatoInput, EleitorUncheckedCreateWithoutCandidatoInput>
  }

  export type CandidaturaUpsertWithoutCandidatosInput = {
    update: XOR<CandidaturaUpdateWithoutCandidatosInput, CandidaturaUncheckedUpdateWithoutCandidatosInput>
    create: XOR<CandidaturaCreateWithoutCandidatosInput, CandidaturaUncheckedCreateWithoutCandidatosInput>
    where?: CandidaturaWhereInput
  }

  export type CandidaturaUpdateToOneWithWhereWithoutCandidatosInput = {
    where?: CandidaturaWhereInput
    data: XOR<CandidaturaUpdateWithoutCandidatosInput, CandidaturaUncheckedUpdateWithoutCandidatosInput>
  }

  export type CandidaturaUpdateWithoutCandidatosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutCandidaturaNestedInput
    organizacao?: OrganizacaoCandidataUpdateOneWithoutCandidaturaNestedInput
    arquivos?: ArquivoUpdateManyWithoutCandidaturaNestedInput
  }

  export type CandidaturaUncheckedUpdateWithoutCandidatosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoCandidataUncheckedUpdateOneWithoutCandidaturaNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutCandidaturaNestedInput
  }

  export type ArquivoUpsertWithWhereUniqueWithoutCandidatoInput = {
    where: ArquivoWhereUniqueInput
    update: XOR<ArquivoUpdateWithoutCandidatoInput, ArquivoUncheckedUpdateWithoutCandidatoInput>
    create: XOR<ArquivoCreateWithoutCandidatoInput, ArquivoUncheckedCreateWithoutCandidatoInput>
  }

  export type ArquivoUpdateWithWhereUniqueWithoutCandidatoInput = {
    where: ArquivoWhereUniqueInput
    data: XOR<ArquivoUpdateWithoutCandidatoInput, ArquivoUncheckedUpdateWithoutCandidatoInput>
  }

  export type ArquivoUpdateManyWithWhereWithoutCandidatoInput = {
    where: ArquivoScalarWhereInput
    data: XOR<ArquivoUpdateManyMutationInput, ArquivoUncheckedUpdateManyWithoutCandidatoInput>
  }

  export type EleitorUpsertWithoutCandidatoInput = {
    update: XOR<EleitorUpdateWithoutCandidatoInput, EleitorUncheckedUpdateWithoutCandidatoInput>
    create: XOR<EleitorCreateWithoutCandidatoInput, EleitorUncheckedCreateWithoutCandidatoInput>
    where?: EleitorWhereInput
  }

  export type EleitorUpdateToOneWithWhereWithoutCandidatoInput = {
    where?: EleitorWhereInput
    data: XOR<EleitorUpdateWithoutCandidatoInput, EleitorUncheckedUpdateWithoutCandidatoInput>
  }

  export type EleitorUpdateWithoutCandidatoInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutEleitorNestedInput
    eleitorPai?: EleitorUpdateOneWithoutMembrosNestedInput
    membros?: EleitorUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUpdateManyWithoutEleitorNestedInput
  }

  export type EleitorUncheckedUpdateWithoutCandidatoInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorPaiId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    membros?: EleitorUncheckedUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUncheckedUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUncheckedUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutEleitorNestedInput
  }

  export type UsuarioCreateWithoutEleitorInput = {
    id?: string
    tipo?: $Enums.TipoUsuario
    nome: string
    email: string
    login?: string | null
    permissao?: $Enums.Permissao | null
    status?: boolean
    senha?: string | null
    primeiroAcesso?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura?: CandidaturaCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutEleitorInput = {
    id?: string
    tipo?: $Enums.TipoUsuario
    nome: string
    email: string
    login?: string | null
    permissao?: $Enums.Permissao | null
    status?: boolean
    senha?: string | null
    primeiroAcesso?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura?: CandidaturaUncheckedCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutEleitorInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutEleitorInput, UsuarioUncheckedCreateWithoutEleitorInput>
  }

  export type CandidatoCreateWithoutEleitorInput = {
    id?: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial?: string | null
    nomeEmpresa?: string | null
    genero: $Enums.Genero
    dataNascimento: Date | string
    cpf: string
    tituloEleitor?: string | null
    domicilioEleitoral?: string | null
    email: string
    telefone?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura: CandidaturaCreateNestedOneWithoutCandidatosInput
    arquivos?: ArquivoCreateNestedManyWithoutCandidatoInput
  }

  export type CandidatoUncheckedCreateWithoutEleitorInput = {
    id?: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial?: string | null
    nomeEmpresa?: string | null
    genero: $Enums.Genero
    dataNascimento: Date | string
    cpf: string
    tituloEleitor?: string | null
    domicilioEleitoral?: string | null
    email: string
    telefone?: string | null
    candidaturaId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutCandidatoInput
  }

  export type CandidatoCreateOrConnectWithoutEleitorInput = {
    where: CandidatoWhereUniqueInput
    create: XOR<CandidatoCreateWithoutEleitorInput, CandidatoUncheckedCreateWithoutEleitorInput>
  }

  export type EleitorCreateWithoutMembrosInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutEleitorInput
    candidato?: CandidatoCreateNestedOneWithoutEleitorInput
    eleitorPai?: EleitorCreateNestedOneWithoutMembrosInput
    organizacao?: OrganizacaoEleitoraCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoCreateNestedManyWithoutEleitorInput
  }

  export type EleitorUncheckedCreateWithoutMembrosInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    usuarioId?: string | null
    candidatoId?: string | null
    eleitorPaiId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao?: OrganizacaoEleitoraUncheckedCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorUncheckedCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutEleitorInput
  }

  export type EleitorCreateOrConnectWithoutMembrosInput = {
    where: EleitorWhereUniqueInput
    create: XOR<EleitorCreateWithoutMembrosInput, EleitorUncheckedCreateWithoutMembrosInput>
  }

  export type EleitorCreateWithoutEleitorPaiInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutEleitorInput
    candidato?: CandidatoCreateNestedOneWithoutEleitorInput
    membros?: EleitorCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoCreateNestedManyWithoutEleitorInput
  }

  export type EleitorUncheckedCreateWithoutEleitorPaiInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    usuarioId?: string | null
    candidatoId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    membros?: EleitorUncheckedCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraUncheckedCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorUncheckedCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutEleitorInput
  }

  export type EleitorCreateOrConnectWithoutEleitorPaiInput = {
    where: EleitorWhereUniqueInput
    create: XOR<EleitorCreateWithoutEleitorPaiInput, EleitorUncheckedCreateWithoutEleitorPaiInput>
  }

  export type EleitorCreateManyEleitorPaiInputEnvelope = {
    data: EleitorCreateManyEleitorPaiInput | EleitorCreateManyEleitorPaiInput[]
    skipDuplicates?: boolean
  }

  export type OrganizacaoEleitoraCreateWithoutEleitorInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    repTituloEleitor?: string | null
    repDomicilio?: string | null
    emailEntidade: string
    telefone?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    arquivos?: ArquivoCreateNestedManyWithoutOrgEleitoraInput
  }

  export type OrganizacaoEleitoraUncheckedCreateWithoutEleitorInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    repTituloEleitor?: string | null
    repDomicilio?: string | null
    emailEntidade: string
    telefone?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutOrgEleitoraInput
  }

  export type OrganizacaoEleitoraCreateOrConnectWithoutEleitorInput = {
    where: OrganizacaoEleitoraWhereUniqueInput
    create: XOR<OrganizacaoEleitoraCreateWithoutEleitorInput, OrganizacaoEleitoraUncheckedCreateWithoutEleitorInput>
  }

  export type ProcuradorCreateWithoutEleitorInput = {
    id?: string
    nome: string
    cpf: string
    tituloEleitor?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ProcuradorUncheckedCreateWithoutEleitorInput = {
    id?: string
    nome: string
    cpf: string
    tituloEleitor?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ProcuradorCreateOrConnectWithoutEleitorInput = {
    where: ProcuradorWhereUniqueInput
    create: XOR<ProcuradorCreateWithoutEleitorInput, ProcuradorUncheckedCreateWithoutEleitorInput>
  }

  export type ArquivoCreateWithoutEleitorInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura?: CandidaturaCreateNestedOneWithoutArquivosInput
    candidato?: CandidatoCreateNestedOneWithoutArquivosInput
    orgCandidata?: OrganizacaoCandidataCreateNestedOneWithoutArquivosInput
    orgEleitora?: OrganizacaoEleitoraCreateNestedOneWithoutArquivosInput
  }

  export type ArquivoUncheckedCreateWithoutEleitorInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId?: string | null
    candidatoId?: string | null
    orgCandidataId?: string | null
    orgEleitoraId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoCreateOrConnectWithoutEleitorInput = {
    where: ArquivoWhereUniqueInput
    create: XOR<ArquivoCreateWithoutEleitorInput, ArquivoUncheckedCreateWithoutEleitorInput>
  }

  export type ArquivoCreateManyEleitorInputEnvelope = {
    data: ArquivoCreateManyEleitorInput | ArquivoCreateManyEleitorInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutEleitorInput = {
    update: XOR<UsuarioUpdateWithoutEleitorInput, UsuarioUncheckedUpdateWithoutEleitorInput>
    create: XOR<UsuarioCreateWithoutEleitorInput, UsuarioUncheckedCreateWithoutEleitorInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutEleitorInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutEleitorInput, UsuarioUncheckedUpdateWithoutEleitorInput>
  }

  export type UsuarioUpdateWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    permissao?: NullableEnumPermissaoFieldUpdateOperationsInput | $Enums.Permissao | null
    status?: BoolFieldUpdateOperationsInput | boolean
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    primeiroAcesso?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    login?: NullableStringFieldUpdateOperationsInput | string | null
    permissao?: NullableEnumPermissaoFieldUpdateOperationsInput | $Enums.Permissao | null
    status?: BoolFieldUpdateOperationsInput | boolean
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    primeiroAcesso?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUncheckedUpdateOneWithoutUsuarioNestedInput
  }

  export type CandidatoUpsertWithoutEleitorInput = {
    update: XOR<CandidatoUpdateWithoutEleitorInput, CandidatoUncheckedUpdateWithoutEleitorInput>
    create: XOR<CandidatoCreateWithoutEleitorInput, CandidatoUncheckedCreateWithoutEleitorInput>
    where?: CandidatoWhereInput
  }

  export type CandidatoUpdateToOneWithWhereWithoutEleitorInput = {
    where?: CandidatoWhereInput
    data: XOR<CandidatoUpdateWithoutEleitorInput, CandidatoUncheckedUpdateWithoutEleitorInput>
  }

  export type CandidatoUpdateWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneRequiredWithoutCandidatosNestedInput
    arquivos?: ArquivoUpdateManyWithoutCandidatoNestedInput
  }

  export type CandidatoUncheckedUpdateWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    candidaturaId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    arquivos?: ArquivoUncheckedUpdateManyWithoutCandidatoNestedInput
  }

  export type EleitorUpsertWithoutMembrosInput = {
    update: XOR<EleitorUpdateWithoutMembrosInput, EleitorUncheckedUpdateWithoutMembrosInput>
    create: XOR<EleitorCreateWithoutMembrosInput, EleitorUncheckedCreateWithoutMembrosInput>
    where?: EleitorWhereInput
  }

  export type EleitorUpdateToOneWithWhereWithoutMembrosInput = {
    where?: EleitorWhereInput
    data: XOR<EleitorUpdateWithoutMembrosInput, EleitorUncheckedUpdateWithoutMembrosInput>
  }

  export type EleitorUpdateWithoutMembrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutEleitorNestedInput
    candidato?: CandidatoUpdateOneWithoutEleitorNestedInput
    eleitorPai?: EleitorUpdateOneWithoutMembrosNestedInput
    organizacao?: OrganizacaoEleitoraUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUpdateManyWithoutEleitorNestedInput
  }

  export type EleitorUncheckedUpdateWithoutMembrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorPaiId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoEleitoraUncheckedUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUncheckedUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutEleitorNestedInput
  }

  export type EleitorUpsertWithWhereUniqueWithoutEleitorPaiInput = {
    where: EleitorWhereUniqueInput
    update: XOR<EleitorUpdateWithoutEleitorPaiInput, EleitorUncheckedUpdateWithoutEleitorPaiInput>
    create: XOR<EleitorCreateWithoutEleitorPaiInput, EleitorUncheckedCreateWithoutEleitorPaiInput>
  }

  export type EleitorUpdateWithWhereUniqueWithoutEleitorPaiInput = {
    where: EleitorWhereUniqueInput
    data: XOR<EleitorUpdateWithoutEleitorPaiInput, EleitorUncheckedUpdateWithoutEleitorPaiInput>
  }

  export type EleitorUpdateManyWithWhereWithoutEleitorPaiInput = {
    where: EleitorScalarWhereInput
    data: XOR<EleitorUpdateManyMutationInput, EleitorUncheckedUpdateManyWithoutEleitorPaiInput>
  }

  export type EleitorScalarWhereInput = {
    AND?: EleitorScalarWhereInput | EleitorScalarWhereInput[]
    OR?: EleitorScalarWhereInput[]
    NOT?: EleitorScalarWhereInput | EleitorScalarWhereInput[]
    id?: StringFilter<"Eleitor"> | string
    status?: EnumStatusFilter<"Eleitor"> | $Enums.Status
    oculto?: BoolFilter<"Eleitor"> | boolean
    usuarioId?: StringNullableFilter<"Eleitor"> | string | null
    candidatoId?: StringNullableFilter<"Eleitor"> | string | null
    eleitorPaiId?: StringNullableFilter<"Eleitor"> | string | null
    criadoEm?: DateTimeFilter<"Eleitor"> | Date | string
    atualizadoEm?: DateTimeFilter<"Eleitor"> | Date | string
  }

  export type OrganizacaoEleitoraUpsertWithoutEleitorInput = {
    update: XOR<OrganizacaoEleitoraUpdateWithoutEleitorInput, OrganizacaoEleitoraUncheckedUpdateWithoutEleitorInput>
    create: XOR<OrganizacaoEleitoraCreateWithoutEleitorInput, OrganizacaoEleitoraUncheckedCreateWithoutEleitorInput>
    where?: OrganizacaoEleitoraWhereInput
  }

  export type OrganizacaoEleitoraUpdateToOneWithWhereWithoutEleitorInput = {
    where?: OrganizacaoEleitoraWhereInput
    data: XOR<OrganizacaoEleitoraUpdateWithoutEleitorInput, OrganizacaoEleitoraUncheckedUpdateWithoutEleitorInput>
  }

  export type OrganizacaoEleitoraUpdateWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    repTituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    repDomicilio?: NullableStringFieldUpdateOperationsInput | string | null
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    arquivos?: ArquivoUpdateManyWithoutOrgEleitoraNestedInput
  }

  export type OrganizacaoEleitoraUncheckedUpdateWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    repTituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    repDomicilio?: NullableStringFieldUpdateOperationsInput | string | null
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    arquivos?: ArquivoUncheckedUpdateManyWithoutOrgEleitoraNestedInput
  }

  export type ProcuradorUpsertWithoutEleitorInput = {
    update: XOR<ProcuradorUpdateWithoutEleitorInput, ProcuradorUncheckedUpdateWithoutEleitorInput>
    create: XOR<ProcuradorCreateWithoutEleitorInput, ProcuradorUncheckedCreateWithoutEleitorInput>
    where?: ProcuradorWhereInput
  }

  export type ProcuradorUpdateToOneWithWhereWithoutEleitorInput = {
    where?: ProcuradorWhereInput
    data: XOR<ProcuradorUpdateWithoutEleitorInput, ProcuradorUncheckedUpdateWithoutEleitorInput>
  }

  export type ProcuradorUpdateWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcuradorUncheckedUpdateWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoUpsertWithWhereUniqueWithoutEleitorInput = {
    where: ArquivoWhereUniqueInput
    update: XOR<ArquivoUpdateWithoutEleitorInput, ArquivoUncheckedUpdateWithoutEleitorInput>
    create: XOR<ArquivoCreateWithoutEleitorInput, ArquivoUncheckedCreateWithoutEleitorInput>
  }

  export type ArquivoUpdateWithWhereUniqueWithoutEleitorInput = {
    where: ArquivoWhereUniqueInput
    data: XOR<ArquivoUpdateWithoutEleitorInput, ArquivoUncheckedUpdateWithoutEleitorInput>
  }

  export type ArquivoUpdateManyWithWhereWithoutEleitorInput = {
    where: ArquivoScalarWhereInput
    data: XOR<ArquivoUpdateManyMutationInput, ArquivoUncheckedUpdateManyWithoutEleitorInput>
  }

  export type EleitorCreateWithoutOrganizacaoInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutEleitorInput
    candidato?: CandidatoCreateNestedOneWithoutEleitorInput
    eleitorPai?: EleitorCreateNestedOneWithoutMembrosInput
    membros?: EleitorCreateNestedManyWithoutEleitorPaiInput
    procurador?: ProcuradorCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoCreateNestedManyWithoutEleitorInput
  }

  export type EleitorUncheckedCreateWithoutOrganizacaoInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    usuarioId?: string | null
    candidatoId?: string | null
    eleitorPaiId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    membros?: EleitorUncheckedCreateNestedManyWithoutEleitorPaiInput
    procurador?: ProcuradorUncheckedCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutEleitorInput
  }

  export type EleitorCreateOrConnectWithoutOrganizacaoInput = {
    where: EleitorWhereUniqueInput
    create: XOR<EleitorCreateWithoutOrganizacaoInput, EleitorUncheckedCreateWithoutOrganizacaoInput>
  }

  export type ArquivoCreateWithoutOrgEleitoraInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura?: CandidaturaCreateNestedOneWithoutArquivosInput
    candidato?: CandidatoCreateNestedOneWithoutArquivosInput
    orgCandidata?: OrganizacaoCandidataCreateNestedOneWithoutArquivosInput
    eleitor?: EleitorCreateNestedOneWithoutArquivosInput
  }

  export type ArquivoUncheckedCreateWithoutOrgEleitoraInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId?: string | null
    candidatoId?: string | null
    orgCandidataId?: string | null
    eleitorId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoCreateOrConnectWithoutOrgEleitoraInput = {
    where: ArquivoWhereUniqueInput
    create: XOR<ArquivoCreateWithoutOrgEleitoraInput, ArquivoUncheckedCreateWithoutOrgEleitoraInput>
  }

  export type ArquivoCreateManyOrgEleitoraInputEnvelope = {
    data: ArquivoCreateManyOrgEleitoraInput | ArquivoCreateManyOrgEleitoraInput[]
    skipDuplicates?: boolean
  }

  export type EleitorUpsertWithoutOrganizacaoInput = {
    update: XOR<EleitorUpdateWithoutOrganizacaoInput, EleitorUncheckedUpdateWithoutOrganizacaoInput>
    create: XOR<EleitorCreateWithoutOrganizacaoInput, EleitorUncheckedCreateWithoutOrganizacaoInput>
    where?: EleitorWhereInput
  }

  export type EleitorUpdateToOneWithWhereWithoutOrganizacaoInput = {
    where?: EleitorWhereInput
    data: XOR<EleitorUpdateWithoutOrganizacaoInput, EleitorUncheckedUpdateWithoutOrganizacaoInput>
  }

  export type EleitorUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutEleitorNestedInput
    candidato?: CandidatoUpdateOneWithoutEleitorNestedInput
    eleitorPai?: EleitorUpdateOneWithoutMembrosNestedInput
    membros?: EleitorUpdateManyWithoutEleitorPaiNestedInput
    procurador?: ProcuradorUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUpdateManyWithoutEleitorNestedInput
  }

  export type EleitorUncheckedUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorPaiId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    membros?: EleitorUncheckedUpdateManyWithoutEleitorPaiNestedInput
    procurador?: ProcuradorUncheckedUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutEleitorNestedInput
  }

  export type ArquivoUpsertWithWhereUniqueWithoutOrgEleitoraInput = {
    where: ArquivoWhereUniqueInput
    update: XOR<ArquivoUpdateWithoutOrgEleitoraInput, ArquivoUncheckedUpdateWithoutOrgEleitoraInput>
    create: XOR<ArquivoCreateWithoutOrgEleitoraInput, ArquivoUncheckedCreateWithoutOrgEleitoraInput>
  }

  export type ArquivoUpdateWithWhereUniqueWithoutOrgEleitoraInput = {
    where: ArquivoWhereUniqueInput
    data: XOR<ArquivoUpdateWithoutOrgEleitoraInput, ArquivoUncheckedUpdateWithoutOrgEleitoraInput>
  }

  export type ArquivoUpdateManyWithWhereWithoutOrgEleitoraInput = {
    where: ArquivoScalarWhereInput
    data: XOR<ArquivoUpdateManyMutationInput, ArquivoUncheckedUpdateManyWithoutOrgEleitoraInput>
  }

  export type EleitorCreateWithoutProcuradorInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutEleitorInput
    candidato?: CandidatoCreateNestedOneWithoutEleitorInput
    eleitorPai?: EleitorCreateNestedOneWithoutMembrosInput
    membros?: EleitorCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoCreateNestedManyWithoutEleitorInput
  }

  export type EleitorUncheckedCreateWithoutProcuradorInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    usuarioId?: string | null
    candidatoId?: string | null
    eleitorPaiId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    membros?: EleitorUncheckedCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraUncheckedCreateNestedOneWithoutEleitorInput
    arquivos?: ArquivoUncheckedCreateNestedManyWithoutEleitorInput
  }

  export type EleitorCreateOrConnectWithoutProcuradorInput = {
    where: EleitorWhereUniqueInput
    create: XOR<EleitorCreateWithoutProcuradorInput, EleitorUncheckedCreateWithoutProcuradorInput>
  }

  export type EleitorUpsertWithoutProcuradorInput = {
    update: XOR<EleitorUpdateWithoutProcuradorInput, EleitorUncheckedUpdateWithoutProcuradorInput>
    create: XOR<EleitorCreateWithoutProcuradorInput, EleitorUncheckedCreateWithoutProcuradorInput>
    where?: EleitorWhereInput
  }

  export type EleitorUpdateToOneWithWhereWithoutProcuradorInput = {
    where?: EleitorWhereInput
    data: XOR<EleitorUpdateWithoutProcuradorInput, EleitorUncheckedUpdateWithoutProcuradorInput>
  }

  export type EleitorUpdateWithoutProcuradorInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutEleitorNestedInput
    candidato?: CandidatoUpdateOneWithoutEleitorNestedInput
    eleitorPai?: EleitorUpdateOneWithoutMembrosNestedInput
    membros?: EleitorUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUpdateManyWithoutEleitorNestedInput
  }

  export type EleitorUncheckedUpdateWithoutProcuradorInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorPaiId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    membros?: EleitorUncheckedUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUncheckedUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutEleitorNestedInput
  }

  export type CandidaturaCreateWithoutArquivosInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutCandidaturaInput
    organizacao?: OrganizacaoCandidataCreateNestedOneWithoutCandidaturaInput
    candidatos?: CandidatoCreateNestedManyWithoutCandidaturaInput
  }

  export type CandidaturaUncheckedCreateWithoutArquivosInput = {
    id?: string
    tipoInscricao: $Enums.TipoInscricao
    status?: $Enums.Status
    oculto?: boolean
    motivoIndeferimento?: string | null
    usuarioId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao?: OrganizacaoCandidataUncheckedCreateNestedOneWithoutCandidaturaInput
    candidatos?: CandidatoUncheckedCreateNestedManyWithoutCandidaturaInput
  }

  export type CandidaturaCreateOrConnectWithoutArquivosInput = {
    where: CandidaturaWhereUniqueInput
    create: XOR<CandidaturaCreateWithoutArquivosInput, CandidaturaUncheckedCreateWithoutArquivosInput>
  }

  export type CandidatoCreateWithoutArquivosInput = {
    id?: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial?: string | null
    nomeEmpresa?: string | null
    genero: $Enums.Genero
    dataNascimento: Date | string
    cpf: string
    tituloEleitor?: string | null
    domicilioEleitoral?: string | null
    email: string
    telefone?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura: CandidaturaCreateNestedOneWithoutCandidatosInput
    eleitor?: EleitorCreateNestedOneWithoutCandidatoInput
  }

  export type CandidatoUncheckedCreateWithoutArquivosInput = {
    id?: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial?: string | null
    nomeEmpresa?: string | null
    genero: $Enums.Genero
    dataNascimento: Date | string
    cpf: string
    tituloEleitor?: string | null
    domicilioEleitoral?: string | null
    email: string
    telefone?: string | null
    candidaturaId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    eleitor?: EleitorUncheckedCreateNestedOneWithoutCandidatoInput
  }

  export type CandidatoCreateOrConnectWithoutArquivosInput = {
    where: CandidatoWhereUniqueInput
    create: XOR<CandidatoCreateWithoutArquivosInput, CandidatoUncheckedCreateWithoutArquivosInput>
  }

  export type OrganizacaoCandidataCreateWithoutArquivosInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    emailEntidade: string
    telefone?: string | null
    formaChapa?: boolean
    cnpjChapa?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    candidatura: CandidaturaCreateNestedOneWithoutOrganizacaoInput
  }

  export type OrganizacaoCandidataUncheckedCreateWithoutArquivosInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    emailEntidade: string
    telefone?: string | null
    formaChapa?: boolean
    cnpjChapa?: string | null
    candidaturaId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrganizacaoCandidataCreateOrConnectWithoutArquivosInput = {
    where: OrganizacaoCandidataWhereUniqueInput
    create: XOR<OrganizacaoCandidataCreateWithoutArquivosInput, OrganizacaoCandidataUncheckedCreateWithoutArquivosInput>
  }

  export type EleitorCreateWithoutArquivosInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutEleitorInput
    candidato?: CandidatoCreateNestedOneWithoutEleitorInput
    eleitorPai?: EleitorCreateNestedOneWithoutMembrosInput
    membros?: EleitorCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorCreateNestedOneWithoutEleitorInput
  }

  export type EleitorUncheckedCreateWithoutArquivosInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    usuarioId?: string | null
    candidatoId?: string | null
    eleitorPaiId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    membros?: EleitorUncheckedCreateNestedManyWithoutEleitorPaiInput
    organizacao?: OrganizacaoEleitoraUncheckedCreateNestedOneWithoutEleitorInput
    procurador?: ProcuradorUncheckedCreateNestedOneWithoutEleitorInput
  }

  export type EleitorCreateOrConnectWithoutArquivosInput = {
    where: EleitorWhereUniqueInput
    create: XOR<EleitorCreateWithoutArquivosInput, EleitorUncheckedCreateWithoutArquivosInput>
  }

  export type OrganizacaoEleitoraCreateWithoutArquivosInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    repTituloEleitor?: string | null
    repDomicilio?: string | null
    emailEntidade: string
    telefone?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    eleitor: EleitorCreateNestedOneWithoutOrganizacaoInput
  }

  export type OrganizacaoEleitoraUncheckedCreateWithoutArquivosInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    segmento: $Enums.Segmento
    dataAbertura: Date | string
    sede: string
    repNome: string
    repCpf: string
    repTituloEleitor?: string | null
    repDomicilio?: string | null
    emailEntidade: string
    telefone?: string | null
    eleitorId: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrganizacaoEleitoraCreateOrConnectWithoutArquivosInput = {
    where: OrganizacaoEleitoraWhereUniqueInput
    create: XOR<OrganizacaoEleitoraCreateWithoutArquivosInput, OrganizacaoEleitoraUncheckedCreateWithoutArquivosInput>
  }

  export type CandidaturaUpsertWithoutArquivosInput = {
    update: XOR<CandidaturaUpdateWithoutArquivosInput, CandidaturaUncheckedUpdateWithoutArquivosInput>
    create: XOR<CandidaturaCreateWithoutArquivosInput, CandidaturaUncheckedCreateWithoutArquivosInput>
    where?: CandidaturaWhereInput
  }

  export type CandidaturaUpdateToOneWithWhereWithoutArquivosInput = {
    where?: CandidaturaWhereInput
    data: XOR<CandidaturaUpdateWithoutArquivosInput, CandidaturaUncheckedUpdateWithoutArquivosInput>
  }

  export type CandidaturaUpdateWithoutArquivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutCandidaturaNestedInput
    organizacao?: OrganizacaoCandidataUpdateOneWithoutCandidaturaNestedInput
    candidatos?: CandidatoUpdateManyWithoutCandidaturaNestedInput
  }

  export type CandidaturaUncheckedUpdateWithoutArquivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoInscricao?: EnumTipoInscricaoFieldUpdateOperationsInput | $Enums.TipoInscricao
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    motivoIndeferimento?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoCandidataUncheckedUpdateOneWithoutCandidaturaNestedInput
    candidatos?: CandidatoUncheckedUpdateManyWithoutCandidaturaNestedInput
  }

  export type CandidatoUpsertWithoutArquivosInput = {
    update: XOR<CandidatoUpdateWithoutArquivosInput, CandidatoUncheckedUpdateWithoutArquivosInput>
    create: XOR<CandidatoCreateWithoutArquivosInput, CandidatoUncheckedCreateWithoutArquivosInput>
    where?: CandidatoWhereInput
  }

  export type CandidatoUpdateToOneWithWhereWithoutArquivosInput = {
    where?: CandidatoWhereInput
    data: XOR<CandidatoUpdateWithoutArquivosInput, CandidatoUncheckedUpdateWithoutArquivosInput>
  }

  export type CandidatoUpdateWithoutArquivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneRequiredWithoutCandidatosNestedInput
    eleitor?: EleitorUpdateOneWithoutCandidatoNestedInput
  }

  export type CandidatoUncheckedUpdateWithoutArquivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    candidaturaId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    eleitor?: EleitorUncheckedUpdateOneWithoutCandidatoNestedInput
  }

  export type OrganizacaoCandidataUpsertWithoutArquivosInput = {
    update: XOR<OrganizacaoCandidataUpdateWithoutArquivosInput, OrganizacaoCandidataUncheckedUpdateWithoutArquivosInput>
    create: XOR<OrganizacaoCandidataCreateWithoutArquivosInput, OrganizacaoCandidataUncheckedCreateWithoutArquivosInput>
    where?: OrganizacaoCandidataWhereInput
  }

  export type OrganizacaoCandidataUpdateToOneWithWhereWithoutArquivosInput = {
    where?: OrganizacaoCandidataWhereInput
    data: XOR<OrganizacaoCandidataUpdateWithoutArquivosInput, OrganizacaoCandidataUncheckedUpdateWithoutArquivosInput>
  }

  export type OrganizacaoCandidataUpdateWithoutArquivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    formaChapa?: BoolFieldUpdateOperationsInput | boolean
    cnpjChapa?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneRequiredWithoutOrganizacaoNestedInput
  }

  export type OrganizacaoCandidataUncheckedUpdateWithoutArquivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    formaChapa?: BoolFieldUpdateOperationsInput | boolean
    cnpjChapa?: NullableStringFieldUpdateOperationsInput | string | null
    candidaturaId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EleitorUpsertWithoutArquivosInput = {
    update: XOR<EleitorUpdateWithoutArquivosInput, EleitorUncheckedUpdateWithoutArquivosInput>
    create: XOR<EleitorCreateWithoutArquivosInput, EleitorUncheckedCreateWithoutArquivosInput>
    where?: EleitorWhereInput
  }

  export type EleitorUpdateToOneWithWhereWithoutArquivosInput = {
    where?: EleitorWhereInput
    data: XOR<EleitorUpdateWithoutArquivosInput, EleitorUncheckedUpdateWithoutArquivosInput>
  }

  export type EleitorUpdateWithoutArquivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutEleitorNestedInput
    candidato?: CandidatoUpdateOneWithoutEleitorNestedInput
    eleitorPai?: EleitorUpdateOneWithoutMembrosNestedInput
    membros?: EleitorUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUpdateOneWithoutEleitorNestedInput
  }

  export type EleitorUncheckedUpdateWithoutArquivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorPaiId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    membros?: EleitorUncheckedUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUncheckedUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUncheckedUpdateOneWithoutEleitorNestedInput
  }

  export type OrganizacaoEleitoraUpsertWithoutArquivosInput = {
    update: XOR<OrganizacaoEleitoraUpdateWithoutArquivosInput, OrganizacaoEleitoraUncheckedUpdateWithoutArquivosInput>
    create: XOR<OrganizacaoEleitoraCreateWithoutArquivosInput, OrganizacaoEleitoraUncheckedCreateWithoutArquivosInput>
    where?: OrganizacaoEleitoraWhereInput
  }

  export type OrganizacaoEleitoraUpdateToOneWithWhereWithoutArquivosInput = {
    where?: OrganizacaoEleitoraWhereInput
    data: XOR<OrganizacaoEleitoraUpdateWithoutArquivosInput, OrganizacaoEleitoraUncheckedUpdateWithoutArquivosInput>
  }

  export type OrganizacaoEleitoraUpdateWithoutArquivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    repTituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    repDomicilio?: NullableStringFieldUpdateOperationsInput | string | null
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    eleitor?: EleitorUpdateOneRequiredWithoutOrganizacaoNestedInput
  }

  export type OrganizacaoEleitoraUncheckedUpdateWithoutArquivosInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    segmento?: EnumSegmentoFieldUpdateOperationsInput | $Enums.Segmento
    dataAbertura?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: StringFieldUpdateOperationsInput | string
    repNome?: StringFieldUpdateOperationsInput | string
    repCpf?: StringFieldUpdateOperationsInput | string
    repTituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    repDomicilio?: NullableStringFieldUpdateOperationsInput | string | null
    emailEntidade?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidatoCreateManyCandidaturaInput = {
    id?: string
    tipoCandidato: $Enums.TipoCandidato
    nome: string
    nomeSocial?: string | null
    nomeEmpresa?: string | null
    genero: $Enums.Genero
    dataNascimento: Date | string
    cpf: string
    tituloEleitor?: string | null
    domicilioEleitoral?: string | null
    email: string
    telefone?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoCreateManyCandidaturaInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidatoId?: string | null
    orgCandidataId?: string | null
    eleitorId?: string | null
    orgEleitoraId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CandidatoUpdateWithoutCandidaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    arquivos?: ArquivoUpdateManyWithoutCandidatoNestedInput
    eleitor?: EleitorUpdateOneWithoutCandidatoNestedInput
  }

  export type CandidatoUncheckedUpdateWithoutCandidaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    arquivos?: ArquivoUncheckedUpdateManyWithoutCandidatoNestedInput
    eleitor?: EleitorUncheckedUpdateOneWithoutCandidatoNestedInput
  }

  export type CandidatoUncheckedUpdateManyWithoutCandidaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoCandidato?: EnumTipoCandidatoFieldUpdateOperationsInput | $Enums.TipoCandidato
    nome?: StringFieldUpdateOperationsInput | string
    nomeSocial?: NullableStringFieldUpdateOperationsInput | string | null
    nomeEmpresa?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: EnumGeneroFieldUpdateOperationsInput | $Enums.Genero
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cpf?: StringFieldUpdateOperationsInput | string
    tituloEleitor?: NullableStringFieldUpdateOperationsInput | string | null
    domicilioEleitoral?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoUpdateWithoutCandidaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidato?: CandidatoUpdateOneWithoutArquivosNestedInput
    orgCandidata?: OrganizacaoCandidataUpdateOneWithoutArquivosNestedInput
    eleitor?: EleitorUpdateOneWithoutArquivosNestedInput
    orgEleitora?: OrganizacaoEleitoraUpdateOneWithoutArquivosNestedInput
  }

  export type ArquivoUncheckedUpdateWithoutCandidaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    orgCandidataId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: NullableStringFieldUpdateOperationsInput | string | null
    orgEleitoraId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoUncheckedUpdateManyWithoutCandidaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    orgCandidataId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: NullableStringFieldUpdateOperationsInput | string | null
    orgEleitoraId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoCreateManyOrgCandidataInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId?: string | null
    candidatoId?: string | null
    eleitorId?: string | null
    orgEleitoraId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoUpdateWithoutOrgCandidataInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneWithoutArquivosNestedInput
    candidato?: CandidatoUpdateOneWithoutArquivosNestedInput
    eleitor?: EleitorUpdateOneWithoutArquivosNestedInput
    orgEleitora?: OrganizacaoEleitoraUpdateOneWithoutArquivosNestedInput
  }

  export type ArquivoUncheckedUpdateWithoutOrgCandidataInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidaturaId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: NullableStringFieldUpdateOperationsInput | string | null
    orgEleitoraId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoUncheckedUpdateManyWithoutOrgCandidataInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidaturaId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: NullableStringFieldUpdateOperationsInput | string | null
    orgEleitoraId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoCreateManyCandidatoInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId?: string | null
    orgCandidataId?: string | null
    eleitorId?: string | null
    orgEleitoraId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoUpdateWithoutCandidatoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneWithoutArquivosNestedInput
    orgCandidata?: OrganizacaoCandidataUpdateOneWithoutArquivosNestedInput
    eleitor?: EleitorUpdateOneWithoutArquivosNestedInput
    orgEleitora?: OrganizacaoEleitoraUpdateOneWithoutArquivosNestedInput
  }

  export type ArquivoUncheckedUpdateWithoutCandidatoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidaturaId?: NullableStringFieldUpdateOperationsInput | string | null
    orgCandidataId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: NullableStringFieldUpdateOperationsInput | string | null
    orgEleitoraId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoUncheckedUpdateManyWithoutCandidatoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidaturaId?: NullableStringFieldUpdateOperationsInput | string | null
    orgCandidataId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: NullableStringFieldUpdateOperationsInput | string | null
    orgEleitoraId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EleitorCreateManyEleitorPaiInput = {
    id?: string
    status?: $Enums.Status
    oculto?: boolean
    usuarioId?: string | null
    candidatoId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoCreateManyEleitorInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId?: string | null
    candidatoId?: string | null
    orgCandidataId?: string | null
    orgEleitoraId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type EleitorUpdateWithoutEleitorPaiInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutEleitorNestedInput
    candidato?: CandidatoUpdateOneWithoutEleitorNestedInput
    membros?: EleitorUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUpdateManyWithoutEleitorNestedInput
  }

  export type EleitorUncheckedUpdateWithoutEleitorPaiInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    membros?: EleitorUncheckedUpdateManyWithoutEleitorPaiNestedInput
    organizacao?: OrganizacaoEleitoraUncheckedUpdateOneWithoutEleitorNestedInput
    procurador?: ProcuradorUncheckedUpdateOneWithoutEleitorNestedInput
    arquivos?: ArquivoUncheckedUpdateManyWithoutEleitorNestedInput
  }

  export type EleitorUncheckedUpdateManyWithoutEleitorPaiInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    oculto?: BoolFieldUpdateOperationsInput | boolean
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoUpdateWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneWithoutArquivosNestedInput
    candidato?: CandidatoUpdateOneWithoutArquivosNestedInput
    orgCandidata?: OrganizacaoCandidataUpdateOneWithoutArquivosNestedInput
    orgEleitora?: OrganizacaoEleitoraUpdateOneWithoutArquivosNestedInput
  }

  export type ArquivoUncheckedUpdateWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidaturaId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    orgCandidataId?: NullableStringFieldUpdateOperationsInput | string | null
    orgEleitoraId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoUncheckedUpdateManyWithoutEleitorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidaturaId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    orgCandidataId?: NullableStringFieldUpdateOperationsInput | string | null
    orgEleitoraId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoCreateManyOrgEleitoraInput = {
    id?: string
    nome: string
    tipo: string
    tamanho: number
    caminho: string
    categoria: $Enums.CategoriaArquivo
    candidaturaId?: string | null
    candidatoId?: string | null
    orgCandidataId?: string | null
    eleitorId?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ArquivoUpdateWithoutOrgEleitoraInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    candidatura?: CandidaturaUpdateOneWithoutArquivosNestedInput
    candidato?: CandidatoUpdateOneWithoutArquivosNestedInput
    orgCandidata?: OrganizacaoCandidataUpdateOneWithoutArquivosNestedInput
    eleitor?: EleitorUpdateOneWithoutArquivosNestedInput
  }

  export type ArquivoUncheckedUpdateWithoutOrgEleitoraInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidaturaId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    orgCandidataId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArquivoUncheckedUpdateManyWithoutOrgEleitoraInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    tamanho?: IntFieldUpdateOperationsInput | number
    caminho?: StringFieldUpdateOperationsInput | string
    categoria?: EnumCategoriaArquivoFieldUpdateOperationsInput | $Enums.CategoriaArquivo
    candidaturaId?: NullableStringFieldUpdateOperationsInput | string | null
    candidatoId?: NullableStringFieldUpdateOperationsInput | string | null
    orgCandidataId?: NullableStringFieldUpdateOperationsInput | string | null
    eleitorId?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
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