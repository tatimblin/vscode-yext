export enum Universe {
  Staging = 'staging',
  Production = 'production',
};

export interface Credentials {
  Name:         string,
  AccessCode:   string,
  BusinessId:   number,
  BusinessName: string,
  Env:          Universe,
}
