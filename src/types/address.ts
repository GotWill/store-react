export type Address = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
};

export type AdaptedAddress = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

export interface AdressFromFirestore extends AdaptedAddress {
  id?: string;
  zipCode: string;
  phone: string;
  complement?: string;
  isHabilty?: boolean;
  number: number;
  destination: string
  type: "HOME" | "WORKER" 
}
