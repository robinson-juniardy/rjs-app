import { IColumn } from "../../core/types";
import { SELECT, FROM, ORDER } from "./dictionary";

interface IBuilder<M> {
  tablename: string;
  column: IColumn<M>;
  condition: Array<{
    where: Array<keyof M> | Array<string>;
    value: Array<string | number>;
  }>;
  order: {
    column: Array<keyof M>;
    type: "ASC" | "DESC";
  };
  join: Array<any>;
}

interface IRef<R, T> {
  references: new (...args: any[]) => R;
  target: new (...args: any[]) => T;
  keyPairs: {
    refKey: keyof R;
    targetKey: keyof T;
  };
  type: "LEFT" | "RIGHT" | "INNER";
}

// prettier-ignore
export function FetchBuilder<M>(loader: IBuilder<M>): string {

  let payload      : string = "" as string;

  let joinPayload: string = "" as string;
  
  let columnpayload: string[]

  for (let value of loader.join) {
    joinPayload+= `${value}\n`
  }

  if (loader.column.columnType === "self") {
    
  }

  let builder = payload.concat(SELECT, "\n", "column", FROM, "\n",loader.tablename, "\n", loader.join ? joinPayload : '',loader.order ? `${ORDER} ${loader.order.column} ${loader.order.type}` : "");
  
  return builder;
}

export function RefBuilder<R, T>(loader: IRef<R, T>): string {
  const refKey = loader.keyPairs.refKey as string;
  const targetKey = loader.keyPairs.targetKey as string;
  const payload = `${loader.type} JOIN ${
    (loader.references as any).tablename
  } ON ${(loader.references as any).tablename}.${refKey} = ${
    (loader.target as any).tablename
  }.${targetKey}`;
  return payload;
}
