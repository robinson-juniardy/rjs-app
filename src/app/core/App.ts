import { C_Providers } from "../config/database";
import mssql from "mssql";
import mysql from "mysql";
import { FetchBuilder, RefBuilder } from "../utils/builder/fetchBuilder";
import { IColumn } from "./types";

/**
 * @author Robby Juniardi
 *
 * @description core of Model operation that can extends on custom class
 */
export abstract class Model {
  /**
   * @author Robby Juniardi
   *
   * @description fetch data query builder
   *
   * @param this children class that extended from Model class
   *
   * @param column properties of children Model class
   *
   * @param expresssion given options setting for additional query like where condition | order by |  etc
   *
   * @returns return array data from database according your query
   */

  public static async fetch<M extends Model>(
    this: new (...args: any[]) => M,
    column?: IColumn<M>,
    expresssion?: {
      /**
       * @author Robby Juniardi
       *
       * @param where can select properties of model as column in Array, also custom condirion in Array string
       *
       * @param value provide value of selected model property
       */
      condition?: Array<{
        where: Array<keyof M> | Array<string>;
        value: Array<string | number>;
      }>;
      /**
       * @author Robby Juniardi
       *
       * @param column Array list properties of model as column
       *
       * @param type can select type of order - ASC | DESC
       */
      orderBy?: {
        column: Array<keyof M>;
        type: "ASC" | "DESC";
      };

      join?: Array<any>;
    }
  ) {
    const builder = FetchBuilder({
      column: column,
      condition: expresssion.condition,
      order: expresssion.orderBy,
      tablename: (this as any)?.tablename as string,
      join: expresssion.join,
    });

    if (C_Providers.provider === "sqlserver") {
      return mssql.connect(C_Providers.config).then((pool) => {
        return pool
          .request()
          .query(builder)
          .then((result) => {
            return result.recordset;
          });
      });
    } else if (C_Providers.provider === "mysql") {
      return mysql
        .createConnection(C_Providers.config)
        .query(builder, function (error, results, fields) {
          if (error) throw error;
          return results;
        });
    } else {
      throw new Error(
        "Database Configuration Provider is not defined !!! please set it on dir /config/database.ts !!!"
      );
    }
  }
}

export function InstanceRef<R, T>(
  references: new (...args: any[]) => R,
  target: new (...args: any[]) => T,
  keyPairs: {
    refKey: keyof R;
    targetKey: keyof T;
  },
  type: "LEFT" | "RIGHT" | "INNER"
) {
  let builder = RefBuilder({
    references: references,
    target: target,
    keyPairs: keyPairs,
    type: type,
  });

  return builder;
}

export function Mix<R>(ref: new (...args: any[]) => R, column: Array<keyof R>) {
  return column;
}

export function MixWithSerializer<R>(
  ref: new (...args: any[]) => R,
  column: Array<{
    serialize?: string;
    name: keyof R;
  }>
) {
  return column;
}
