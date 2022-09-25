import ICredentialsDto from "./ICredentialsDto";

export default interface ICredentialsDtoPasswordHidden extends ICredentialsDto {
    isPasswordHidden: boolean,
    password: string
}