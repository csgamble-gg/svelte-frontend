import type { OperationStore } from '@urql/svelte';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: any;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: any;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: any;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: any;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: any;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: any;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: any;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: any;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: any;
  /** Floats that will have a value less than 0. */
  NegativeFloat: any;
  /** Integers that will have a value less than 0. */
  NegativeInt: any;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: any;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: any;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
  /** Represents NULL values */
  Void: any;
};

export type AvailableBalances = {
  __typename?: 'AvailableBalances';
  amount: Scalars['Float'];
  balance: Balance;
};

export type Balance = {
  __typename?: 'Balance';
  amount: Scalars['Float'];
  currency: CurrencyEnum;
};

export type Bet = {
  __typename?: 'Bet';
  _id: Scalars['ID'];
  amount: Scalars['Float'];
  currency: CurrencyEnum;
  gameId: Scalars['ID'];
  selections: Array<Scalars['Int']>;
  user: UserInfo;
};

export type BuyJackpotTicketInput = {
  gameId: Scalars['ID'];
  ticketAmounts: Scalars['Int'];
};

export type BuyJackpotTicketMutationResult = {
  __typename?: 'BuyJackpotTicketMutationResult';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Case = {
  __typename?: 'Case';
  _id: Scalars['ID'];
  image: Scalars['String'];
  items: Array<CaseSkins>;
  name: Scalars['String'];
  price: Scalars['Float'];
  slots: Array<Skin>;
  slug: Scalars['String'];
};

export enum CaseGroup {
  Featured = 'FEATURED',
  New = 'NEW',
  Popular = 'POPULAR'
}

export type CaseSkins = {
  __typename?: 'CaseSkins';
  _id: Scalars['ID'];
  gunType?: Maybe<Scalars['String']>;
  iconUrl: Scalars['String'];
  knifeType?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  odds: Scalars['Float'];
  rarity: Scalars['String'];
  rarityColor: Scalars['String'];
  skinName: Scalars['String'];
  skins: Array<Skin>;
};

export type CashoutCrashBetMutationResult = {
  __typename?: 'CashoutCrashBetMutationResult';
  success: Scalars['Boolean'];
};

export type CrashBet = {
  __typename?: 'CrashBet';
  _id: Scalars['ID'];
  amount: Scalars['Float'];
  currency: CurrencyEnum;
  gameId: Scalars['ID'];
  payoutMultiplier?: Maybe<Scalars['Float']>;
  totalWin?: Maybe<Scalars['Float']>;
  user: UserInfo;
};

export type CrashGame = {
  __typename?: 'CrashGame';
  _id: Scalars['ID'];
  createdAt: Scalars['Date'];
  elapsed: Scalars['Int'];
  gameId: Scalars['String'];
  multiplier: Scalars['Float'];
  startsAt: Scalars['DateTime'];
  status: Scalars['String'];
};

export type CrashInitial = {
  __typename?: 'CrashInitial';
  cashedIn: Array<Maybe<CrashBet>>;
  cashedOut: Array<Maybe<CrashBet>>;
  crashGame: CrashGame;
  currentBet?: Maybe<CrashBet>;
  pastGames: Array<CrashGame>;
};

export type CrashSubscriptionResult = {
  __typename?: 'CrashSubscriptionResult';
  cashedIn?: Maybe<Array<CrashBet>>;
  cashedOut?: Maybe<Array<Maybe<CrashBet>>>;
  crashGame: CrashGame;
};

export type CreateBetInput = {
  betAmount: Scalars['Float'];
  currency: CurrencyEnum;
  gameId: Scalars['String'];
  selections: Array<Scalars['Int']>;
};

export type CreateBetMutationResult = {
  __typename?: 'CreateBetMutationResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type CreateCrashBetInput = {
  betAmount: Scalars['Float'];
  currency: CurrencyEnum;
  gameId: Scalars['String'];
};

export type CreateCrashBetMutationResult = {
  __typename?: 'CreateCrashBetMutationResult';
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type CreateJackpotGameInput = {
  expireDate: Scalars['Date'];
  jackpotType: Scalars['String'];
  prize: Scalars['ID'];
};

export type CreatedGameResult = {
  __typename?: 'CreatedGameResult';
  game: Game;
};

export enum CurrencyEnum {
  Btc = 'btc',
  Eth = 'eth'
}

export type Game = {
  __typename?: 'Game';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  gameId: Scalars['String'];
  gameType: Scalars['String'];
  rollValue?: Maybe<Scalars['Float']>;
  status: Scalars['String'];
};

export type GameSecrets = {
  __typename?: 'GameSecrets';
  hashedServerSeed: Scalars['String'];
  publicHash: Scalars['String'];
  serverSeed: Scalars['String'];
};

export type GameUnion = CrashGame | RouletteGame;

export type GetBetsForGameInput = {
  gameId: Scalars['String'];
};

export type GetCasesInput = {
  group?: InputMaybe<CaseGroup>;
  name?: InputMaybe<Scalars['String']>;
};

export type GetLatestGameInput = {
  gameType: Scalars['String'];
};

export type GetRecentGamesInput = {
  gameType: Scalars['String'];
  limit: Scalars['Int'];
};

export type GetSkinsInput = {
  knifeType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  quality?: InputMaybe<Scalars['String']>;
  rarity?: InputMaybe<Scalars['String']>;
  skinName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  weaponType?: InputMaybe<Scalars['String']>;
};

export type JackpotGame = {
  __typename?: 'JackpotGame';
  expireDate: Scalars['Date'];
  gameNumber: Scalars['Int'];
  gameType: Scalars['String'];
  jackpotType: Scalars['String'];
  prize: Prize;
  purchasedTickets: Scalars['Int'];
  secrets: GameSecrets;
};

export type JackpotGameMutationResult = {
  __typename?: 'JackpotGameMutationResult';
  game: JackpotGame;
  message: Scalars['String'];
};

export type JackpotGameUpdatedResult = {
  __typename?: 'JackpotGameUpdatedResult';
  ticketPurchase: Scalars['Boolean'];
};

export type LatestGame = {
  __typename?: 'LatestGame';
  currentBets: Array<Maybe<Bet>>;
  game: RouletteGame;
};

export type Mutation = {
  __typename?: 'Mutation';
  buyJackpotTicket: BuyJackpotTicketMutationResult;
  cashoutCrashBet: CashoutCrashBetMutationResult;
  createBet: CreateBetMutationResult;
  createCrashBet: CreateCrashBetMutationResult;
  createJackpotGame: JackpotGameMutationResult;
  minusBalance: Scalars['Boolean'];
  openCase: OpenCaseMutationResult;
};


export type MutationBuyJackpotTicketArgs = {
  input: BuyJackpotTicketInput;
};


export type MutationCreateBetArgs = {
  input: CreateBetInput;
};


export type MutationCreateCrashBetArgs = {
  input: CreateCrashBetInput;
};


export type MutationCreateJackpotGameArgs = {
  input: CreateJackpotGameInput;
};


export type MutationOpenCaseArgs = {
  input: OpenCaseInput;
};

export type OpenCaseInput = {
  caseId: Scalars['ID'];
  currency: CurrencyEnum;
};

export type OpenCaseMutationResult = {
  __typename?: 'OpenCaseMutationResult';
  message: Scalars['String'];
};

export type Prize = {
  __typename?: 'Prize';
  skin: Skin;
};

export type Query = {
  __typename?: 'Query';
  crashInitial: CrashInitial;
  getBetsForGame: Array<Bet>;
  getCase?: Maybe<Case>;
  getCases: Array<Case>;
  getCurrentUser?: Maybe<User>;
  getJackpots: Array<Maybe<JackpotGame>>;
  getLatestGame: LatestGame;
  getPaginatedUsers: Array<Maybe<User>>;
  getRecentGames: Array<GameUnion>;
  getSkinQualities: Array<Scalars['String']>;
  getSkins: Array<Maybe<Skin>>;
  rouletteInitial: RouletteIntitial;
  testError: Scalars['Boolean'];
  userInventory: Array<Maybe<Skin>>;
  userWallets: Array<UserWallet>;
};


export type QueryGetBetsForGameArgs = {
  input: GetBetsForGameInput;
};


export type QueryGetCaseArgs = {
  slug: Scalars['String'];
};


export type QueryGetCasesArgs = {
  input?: InputMaybe<GetCasesInput>;
};


export type QueryGetLatestGameArgs = {
  input: GetLatestGameInput;
};


export type QueryGetRecentGamesArgs = {
  input: GetRecentGamesInput;
};


export type QueryGetSkinsArgs = {
  input?: InputMaybe<GetSkinsInput>;
};


export type QueryUserInventoryArgs = {
  input: UserInventoryInput;
};

export type RouletteBets = {
  __typename?: 'RouletteBets';
  blue: Array<Maybe<Bet>>;
  orange: Array<Maybe<Bet>>;
  purple: Array<Maybe<Bet>>;
};

export type RouletteGame = {
  __typename?: 'RouletteGame';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  gameId: Scalars['String'];
  rollValue?: Maybe<Scalars['Float']>;
  startsAt: Scalars['DateTime'];
  status: Scalars['String'];
};

export type RouletteIntitial = {
  __typename?: 'RouletteIntitial';
  currentBets: RouletteBets;
  pastGames: Array<RouletteGame>;
  rouletteGame: RouletteGame;
};

export type RouletteSubscriptionResult = {
  __typename?: 'RouletteSubscriptionResult';
  currentBets: RouletteBets;
  rouletteGame: RouletteGame;
};

export type Skin = {
  __typename?: 'Skin';
  _id: Scalars['ID'];
  gunType?: Maybe<Scalars['String']>;
  iconUrl: Scalars['String'];
  iconUrlLarge: Scalars['String'];
  knifeType?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  odds: Scalars['Float'];
  price: Scalars['Float'];
  quality?: Maybe<Scalars['String']>;
  rarity: Scalars['String'];
  rarityColor: Scalars['String'];
  rollMax: Scalars['Int'];
  rollMin: Scalars['Int'];
  skinName?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  weaponType?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  availableBalances: AvailableBalances;
  betCreated: Bet;
  caseOpened: Skin;
  crashGame?: Maybe<CrashSubscriptionResult>;
  rouletteGame: RouletteSubscriptionResult;
  userError: UserErrorSubscription;
  userEvent: UserEventResult;
};

export type UpdatedGameResult = {
  __typename?: 'UpdatedGameResult';
  game: Game;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  balance: Scalars['Float'];
  createdAt: Scalars['String'];
  displayName: Scalars['String'];
  inventory: Array<Maybe<Skin>>;
  steamID: Scalars['String'];
  wallets: Array<UserWallet>;
};

export type UserErrorSubscription = {
  __typename?: 'UserErrorSubscription';
  message: Scalars['String'];
};

export type UserEventResult = {
  __typename?: 'UserEventResult';
  type: Scalars['String'];
  user: User;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  _id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
};

export type UserInventoryInput = {
  limit?: InputMaybe<Scalars['Int']>;
};

export type UserWallet = {
  __typename?: 'UserWallet';
  balance: Scalars['Float'];
  type: CurrencyEnum;
};

export type CrashSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CrashSubscriptionSubscription = { __typename?: 'Subscription', crashGame?: { __typename?: 'CrashSubscriptionResult', crashGame: { __typename?: 'CrashGame', _id: string, status: string, elapsed: number, multiplier: number, startsAt: any, gameId: string }, cashedIn?: Array<{ __typename?: 'CrashBet', _id: string, totalWin?: number | null | undefined, payoutMultiplier?: number | null | undefined, amount: number, currency: CurrencyEnum, user: { __typename?: 'UserInfo', _id: string, avatar?: string | null | undefined, displayName: string } }> | null | undefined, cashedOut?: Array<{ __typename?: 'CrashBet', _id: string, totalWin?: number | null | undefined, payoutMultiplier?: number | null | undefined, amount: number, currency: CurrencyEnum, user: { __typename?: 'UserInfo', _id: string, avatar?: string | null | undefined, displayName: string } } | null | undefined> | null | undefined } | null | undefined };

export type CrashInitialQueryVariables = Exact<{ [key: string]: never; }>;


export type CrashInitialQuery = { __typename?: 'Query', crashInitial: { __typename?: 'CrashInitial', crashGame: { __typename?: 'CrashGame', _id: string, status: string, startsAt: any, elapsed: number, gameId: string }, cashedIn: Array<{ __typename?: 'CrashBet', _id: string, totalWin?: number | null | undefined, payoutMultiplier?: number | null | undefined, amount: number, currency: CurrencyEnum, user: { __typename?: 'UserInfo', _id: string, avatar?: string | null | undefined, displayName: string } } | null | undefined>, cashedOut: Array<{ __typename?: 'CrashBet', _id: string, totalWin?: number | null | undefined, payoutMultiplier?: number | null | undefined, amount: number, currency: CurrencyEnum, user: { __typename?: 'UserInfo', _id: string, avatar?: string | null | undefined, displayName: string } } | null | undefined>, pastGames: Array<{ __typename?: 'CrashGame', _id: string, multiplier: number }>, currentBet?: { __typename?: 'CrashBet', _id: string, amount: number, currency: CurrencyEnum, gameId: string } | null | undefined } };

export type CreateCrashBetMutationVariables = Exact<{
  input: CreateCrashBetInput;
}>;


export type CreateCrashBetMutation = { __typename?: 'Mutation', createCrashBet: { __typename?: 'CreateCrashBetMutationResult', success: boolean, user?: { __typename?: 'User', _id: string, balance: number } | null | undefined } };

export type CashoutCrashBetMutationVariables = Exact<{ [key: string]: never; }>;


export type CashoutCrashBetMutation = { __typename?: 'Mutation', cashoutCrashBet: { __typename?: 'CashoutCrashBetMutationResult', success: boolean } };

export type AllCasesQueryVariables = Exact<{
  input?: InputMaybe<GetCasesInput>;
}>;


export type AllCasesQuery = { __typename?: 'Query', getCases: Array<{ __typename?: 'Case', _id: string, name: string, price: number, slug: string, image: string }> };

export type SingleCaseQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type SingleCaseQuery = { __typename?: 'Query', getCase?: { __typename?: 'Case', _id: string, name: string, price: number, slug: string, image: string, items: Array<{ __typename?: 'CaseSkins', _id: string, odds: number, name: string, rarity: string, rarityColor: string, gunType?: string | null | undefined, knifeType?: string | null | undefined, iconUrl: string, skinName: string, skins: Array<{ __typename?: 'Skin', _id: string, name: string, iconUrl: string, type?: string | null | undefined, weaponType?: string | null | undefined, rarity: string, rarityColor: string, quality?: string | null | undefined, gunType?: string | null | undefined, knifeType?: string | null | undefined, price: number, skinName?: string | null | undefined, odds: number }> }>, slots: Array<{ __typename?: 'Skin', _id: string, iconUrl: string, skinName?: string | null | undefined, gunType?: string | null | undefined, knifeType?: string | null | undefined, price: number, quality?: string | null | undefined, name: string, odds: number }> } | null | undefined };

export type OpenCaseMutationVariables = Exact<{
  input: OpenCaseInput;
}>;


export type OpenCaseMutation = { __typename?: 'Mutation', openCase: { __typename?: 'OpenCaseMutationResult', message: string } };

export type UnboxingSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UnboxingSubscriptionSubscription = { __typename?: 'Subscription', caseOpened: { __typename?: 'Skin', _id: string, name: string, iconUrl: string, type?: string | null | undefined, weaponType?: string | null | undefined, rarity: string, rarityColor: string, quality?: string | null | undefined, gunType?: string | null | undefined, knifeType?: string | null | undefined, price: number, skinName?: string | null | undefined } };

export type UserInfoFragment = { __typename?: 'UserInfo', _id: string, displayName: string, avatar?: string | null | undefined };

export type RouletteInitialQueryVariables = Exact<{ [key: string]: never; }>;


export type RouletteInitialQuery = { __typename?: 'Query', rouletteInitial: { __typename?: 'RouletteIntitial', rouletteGame: { __typename?: 'RouletteGame', _id: string, createdAt: any, gameId: string, rollValue?: number | null | undefined, startsAt: any, status: string }, currentBets: { __typename?: 'RouletteBets', orange: Array<{ __typename?: 'Bet', _id: string, amount: number, gameId: string, selections: Array<number>, currency: CurrencyEnum, user: { __typename?: 'UserInfo', _id: string, displayName: string, avatar?: string | null | undefined } } | null | undefined>, purple: Array<{ __typename?: 'Bet', _id: string, amount: number, gameId: string, selections: Array<number>, currency: CurrencyEnum, user: { __typename?: 'UserInfo', _id: string, displayName: string, avatar?: string | null | undefined } } | null | undefined>, blue: Array<{ __typename?: 'Bet', _id: string, amount: number, gameId: string, selections: Array<number>, currency: CurrencyEnum, user: { __typename?: 'UserInfo', _id: string, displayName: string, avatar?: string | null | undefined } } | null | undefined> }, pastGames: Array<{ __typename?: 'RouletteGame', _id: string, createdAt: any, gameId: string, rollValue?: number | null | undefined }> } };

export type CreateBetMutationVariables = Exact<{
  input: CreateBetInput;
}>;


export type CreateBetMutation = { __typename?: 'Mutation', createBet: { __typename?: 'CreateBetMutationResult', success: boolean, error?: string | null | undefined, user?: { __typename?: 'User', _id: string, balance: number } | null | undefined } };

export type RouletteGameSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RouletteGameSubscription = { __typename?: 'Subscription', rouletteGame: { __typename?: 'RouletteSubscriptionResult', rouletteGame: { __typename?: 'RouletteGame', _id: string, gameId: string, rollValue?: number | null | undefined, status: string, createdAt: any, startsAt: any }, currentBets: { __typename?: 'RouletteBets', orange: Array<{ __typename?: 'Bet', _id: string, amount: number, currency: CurrencyEnum, gameId: string, selections: Array<number>, user: { __typename?: 'UserInfo', _id: string, displayName: string, avatar?: string | null | undefined } } | null | undefined>, purple: Array<{ __typename?: 'Bet', _id: string, amount: number, currency: CurrencyEnum, gameId: string, selections: Array<number>, user: { __typename?: 'UserInfo', _id: string, displayName: string, avatar?: string | null | undefined } } | null | undefined>, blue: Array<{ __typename?: 'Bet', _id: string, amount: number, currency: CurrencyEnum, gameId: string, selections: Array<number>, user: { __typename?: 'UserInfo', _id: string, displayName: string, avatar?: string | null | undefined } } | null | undefined> } } };

export type ErrorSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ErrorSubscription = { __typename?: 'Subscription', userError: { __typename?: 'UserErrorSubscription', message: string } };

export type UserEventSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UserEventSubscription = { __typename?: 'Subscription', userEvent: { __typename?: 'UserEventResult', user: { __typename?: 'User', _id: string, balance: number } } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', _id: string, displayName: string, avatar?: string | null | undefined, wallets: Array<{ __typename?: 'UserWallet', type: CurrencyEnum, balance: number }> } | null | undefined };

export type UserInventoryQueryVariables = Exact<{
  input: UserInventoryInput;
}>;


export type UserInventoryQuery = { __typename?: 'Query', userInventory: Array<{ __typename?: 'Skin', _id: string, quality?: string | null | undefined, name: string, price: number, iconUrl: string } | null | undefined> };

export type UserWalletsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserWalletsQuery = { __typename?: 'Query', userWallets: Array<{ __typename?: 'UserWallet', type: CurrencyEnum, balance: number }> };

export type AvailableBalancesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AvailableBalancesSubscription = { __typename?: 'Subscription', availableBalances: { __typename?: 'AvailableBalances', amount: number, balance: { __typename?: 'Balance', amount: number, currency: CurrencyEnum } } };

export const UserInfoFragmentDoc = gql`
    fragment UserInfo on UserInfo {
  _id
  displayName
  avatar
}
    `;
export const CrashSubscriptionDocument = gql`
    subscription CrashSubscription {
  crashGame {
    crashGame {
      _id
      status
      elapsed
      multiplier
      startsAt
      gameId
    }
    cashedIn {
      _id
      user {
        _id
        avatar
        displayName
      }
      totalWin
      payoutMultiplier
      amount
      currency
    }
    cashedOut {
      _id
      user {
        _id
        avatar
        displayName
      }
      totalWin
      payoutMultiplier
      amount
      currency
    }
  }
}
    `;
export const CrashInitialDocument = gql`
    query CrashInitial {
  crashInitial {
    crashGame {
      _id
      status
      startsAt
      elapsed
      gameId
    }
    cashedIn {
      _id
      user {
        _id
        avatar
        displayName
      }
      totalWin
      payoutMultiplier
      amount
      currency
    }
    cashedOut {
      _id
      user {
        _id
        avatar
        displayName
      }
      totalWin
      payoutMultiplier
      amount
      currency
    }
    pastGames {
      _id
      multiplier
    }
    currentBet {
      _id
      amount
      currency
      gameId
    }
  }
}
    `;
export const CreateCrashBetDocument = gql`
    mutation CreateCrashBet($input: CreateCrashBetInput!) {
  createCrashBet(input: $input) {
    success
    user {
      _id
      balance
    }
  }
}
    `;
export const CashoutCrashBetDocument = gql`
    mutation CashoutCrashBet {
  cashoutCrashBet {
    success
  }
}
    `;
export const AllCasesDocument = gql`
    query AllCases($input: GetCasesInput) {
  getCases(input: $input) {
    _id
    name
    price
    slug
    image
  }
}
    `;
export const SingleCaseDocument = gql`
    query SingleCase($slug: String!) {
  getCase(slug: $slug) {
    _id
    name
    price
    slug
    image
    items {
      _id
      odds
      name
      rarity
      rarityColor
      gunType
      knifeType
      iconUrl
      skinName
      skins {
        _id
        name
        iconUrl
        type
        weaponType
        rarity
        rarityColor
        quality
        gunType
        knifeType
        price
        skinName
        odds
      }
    }
    slots {
      _id
      iconUrl
      skinName
      gunType
      knifeType
      price
      quality
      name
      odds
    }
  }
}
    `;
export const OpenCaseDocument = gql`
    mutation OpenCase($input: OpenCaseInput!) {
  openCase(input: $input) {
    message
  }
}
    `;
export const UnboxingSubscriptionDocument = gql`
    subscription UnboxingSubscription {
  caseOpened {
    _id
    name
    iconUrl
    type
    weaponType
    rarity
    rarityColor
    quality
    gunType
    knifeType
    price
    skinName
  }
}
    `;
export const RouletteInitialDocument = gql`
    query RouletteInitial {
  rouletteInitial {
    rouletteGame {
      _id
      createdAt
      gameId
      rollValue
      startsAt
      status
    }
    currentBets {
      orange {
        _id
        amount
        gameId
        selections
        currency
        user {
          ...UserInfo
        }
      }
      purple {
        _id
        amount
        gameId
        selections
        currency
        user {
          ...UserInfo
        }
      }
      blue {
        _id
        amount
        gameId
        selections
        currency
        user {
          ...UserInfo
        }
      }
    }
    pastGames {
      _id
      createdAt
      gameId
      rollValue
    }
  }
}
    ${UserInfoFragmentDoc}`;
export const CreateBetDocument = gql`
    mutation createBet($input: CreateBetInput!) {
  createBet(input: $input) {
    success
    error
    user {
      _id
      balance
    }
  }
}
    `;
export const RouletteGameDocument = gql`
    subscription RouletteGame {
  rouletteGame {
    rouletteGame {
      _id
      gameId
      rollValue
      status
      createdAt
      startsAt
    }
    currentBets {
      orange {
        _id
        amount
        currency
        gameId
        selections
        user {
          ...UserInfo
        }
      }
      purple {
        _id
        amount
        currency
        gameId
        selections
        user {
          ...UserInfo
        }
      }
      blue {
        _id
        amount
        currency
        gameId
        selections
        user {
          ...UserInfo
        }
      }
    }
  }
}
    ${UserInfoFragmentDoc}`;
export const ErrorDocument = gql`
    subscription Error {
  userError {
    message
  }
}
    `;
export const UserEventDocument = gql`
    subscription UserEvent {
  userEvent {
    user {
      _id
      balance
    }
  }
}
    `;
export const CurrentUserDocument = gql`
    query CurrentUser {
  getCurrentUser {
    _id
    displayName
    avatar
    wallets {
      type
      balance
    }
  }
}
    `;
export const UserInventoryDocument = gql`
    query UserInventory($input: UserInventoryInput!) {
  userInventory(input: $input) {
    _id
    quality
    name
    price
    iconUrl
  }
}
    `;
export const UserWalletsDocument = gql`
    query UserWallets {
  userWallets {
    type
    balance
  }
}
    `;
export const AvailableBalancesDocument = gql`
    subscription AvailableBalances {
  availableBalances {
    amount
    balance {
      amount
      currency
    }
  }
}
    `;
export type CrashSubscriptionSubscriptionStore = OperationStore<CrashSubscriptionSubscription, CrashSubscriptionSubscriptionVariables>;
export type CrashInitialQueryStore = OperationStore<CrashInitialQuery, CrashInitialQueryVariables>;
export type CreateCrashBetMutationStore = OperationStore<CreateCrashBetMutation, CreateCrashBetMutationVariables>;
export type CashoutCrashBetMutationStore = OperationStore<CashoutCrashBetMutation, CashoutCrashBetMutationVariables>;
export type AllCasesQueryStore = OperationStore<AllCasesQuery, AllCasesQueryVariables>;
export type SingleCaseQueryStore = OperationStore<SingleCaseQuery, SingleCaseQueryVariables>;
export type OpenCaseMutationStore = OperationStore<OpenCaseMutation, OpenCaseMutationVariables>;
export type UnboxingSubscriptionSubscriptionStore = OperationStore<UnboxingSubscriptionSubscription, UnboxingSubscriptionSubscriptionVariables>;
export type RouletteInitialQueryStore = OperationStore<RouletteInitialQuery, RouletteInitialQueryVariables>;
export type CreateBetMutationStore = OperationStore<CreateBetMutation, CreateBetMutationVariables>;
export type RouletteGameSubscriptionStore = OperationStore<RouletteGameSubscription, RouletteGameSubscriptionVariables>;
export type ErrorSubscriptionStore = OperationStore<ErrorSubscription, ErrorSubscriptionVariables>;
export type UserEventSubscriptionStore = OperationStore<UserEventSubscription, UserEventSubscriptionVariables>;
export type CurrentUserQueryStore = OperationStore<CurrentUserQuery, CurrentUserQueryVariables>;
export type UserInventoryQueryStore = OperationStore<UserInventoryQuery, UserInventoryQueryVariables>;
export type UserWalletsQueryStore = OperationStore<UserWalletsQuery, UserWalletsQueryVariables>;
export type AvailableBalancesSubscriptionStore = OperationStore<AvailableBalancesSubscription, AvailableBalancesSubscriptionVariables>;