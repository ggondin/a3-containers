export interface ApiResponse {
  SUCCESS: boolean;
  ERROR: string;
  OBJECT: {
    CHAVE: string;
  };
}

export interface CreateContainer {
  SUCCESS: boolean;
  ERROR: string;
}

export interface ContainerResponse {
  CHAVE: string;
  TIPO: string;
  OS: string;
  ARMADOR: string;
  DATA: string;
  CONTAINER: string;
  CNTR_TYPE: string;
  DEPOT: string;
  DEPOSITO: string;
  TERMINAL: string;
  TAG: string;
}

export interface ContainerSaidaBody {
  CHAVE: string;
  TIPO: string;
  OS: string;
  ARMADOR: string;
  DATA: string;
  CONTAINER: string;
  DEPOT: string;
  DEPOSITO: string;
  TERMINAL: string;
}

export interface ValidatorTag {
  TAG: string;
  DEPOT: string;
  CHAVE: string;
}
