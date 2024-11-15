import { CreateEventDto } from "src/modules/event/dto/create-event.dto";

export class CreateUserDto {
  id?: number;
  fullName: string;
  pseudo?: string;
  phone?: string;
  email: string;
  password: string;
  gender?: string;
  verificationCode: string;
  city?: string;
  birthdate?: number;
  avatar?: string;
  voiceNote?: string;
  personality?: string;
  about?: string;
  motto?: string;
  typeAccount?: string;
  verified?: boolean;
  hobby?: string;

  events?: CreateEventDto[];
  createdAt?: number;
  updatedAt?: number;
}
export enum PERSONALITY {
  ARCHITECTE_INTJ = "ARCHITECTE_INTJ",
  LOGICIEN_INTP = "LOGICIEN_INTP",
  COMMANDANT_ENTJ = "COMMANDANT_ENTJ",
  INNOVATEUR_ENTP = "INNOVATEUR_ENTP",
  AVOCAT_INFJ = "AVOCAT_INFJ",
  MEDIATEUR_INFP = "MEDIATEUR_INFP",
  PROTAGONISTE_ENFJ = "PROTAGONISTE_ENFJ",
  INSPIRATEUR_ENFP = "INSPIRATEUR_ENFP",
  LOGICIEN_ISTJ = "LOGICIEN_ISTJ",
  DEFENSEUR_ISFJ = "DEFENSEUR_ISFJ",
  DIRECTEUR_ESTJ = "DIRECTEUR_ESTJ",
  CONSUL_ESFJ = "CONSUL_ESFJ",
  VIRTUOSE_ISTP = "VIRTUOSE_ISTP",
  AVENTURIER_ISFP = "AVENTURIER_ISFP",
  ENTREPRENEUR_ESTP = "ENTREPRENEUR_ESTP",
  AMUSEUR_ESFP = "AMUSEUR_ESFP",
  NULL = "NULL",
}
export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  DEMI_BOY = "DEMI_BOY",
  DEMI_GIRL = "DEMI_GIRL",
  TRANSGENRE = "TRANSGENRE",
  GENDER_FLUID = "GENDER_FLUID",
  NON_BINARY = "NON_BINARY",
  NULL = "NULL",
}
