export type Json = JsonArray | JsonObject;

export type JsonValue = string | number | boolean | null | undefined | JsonArray | JsonObject | ToJson;

export type JsonArray = JsonValue[];

export interface JsonObject {
  [x: string]: JsonValue;
}

export interface ToJson {
  toJSON(...args: unknown[]): Exclude<JsonValue, ToJson>;
}

export default Json;
