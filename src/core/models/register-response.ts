export class RegisterResponse {
  success: boolean;
  message: string;
  body: any;
  constructor(message: string, success: boolean, body: any) {
    this.message = message;
    this.success = success;
    this.body = body;
  }
}
