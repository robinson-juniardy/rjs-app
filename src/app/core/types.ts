type TMixColumn = Array<any>;
type TStandardColumn<M> = Array<keyof M>;
type TSerializeColum<M> = {
  name: keyof M;
  serialize: string;
};
type IMixColumn<R> =
  | {
      serialize: true;
      props: TSerializeColum<R>;
    }
  | {
      serialize: false;
      props: Array<keyof R>;
    };

export type IColumn<M> =
  | {
      columnType: "mix";
      column: TMixColumn;
    }
  | {
      columnType: "self";
      column: TStandardColumn<M>;
    }
  | {
      columnType: "serializer";
      column: TSerializeColum<M>;
    };
