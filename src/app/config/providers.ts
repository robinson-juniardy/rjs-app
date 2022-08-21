type IMysqlProvider = {
  host: string;
  user: string;
  password: string;
  database: string;
};

type ISqlServerProvider = {
  user: string;
  password: string;
  database: string;
  server: string;
  pool?: {
    max: number;
    min: number;
    idleTimeoutMillis: number;
  };
  parseJSON?: boolean;
  options?: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
};

export type IProvider =
  | {
      provider: "mysql";
      config: IMysqlProvider;
    }
  | {
      provider: "sqlserver";
      config: ISqlServerProvider;
    };
