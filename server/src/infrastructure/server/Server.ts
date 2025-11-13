import { App } from "./App";

export class Server {
  private port: number;

  constructor(port: number) {
    this.port = port;
  }

  public start(): void {
    const appInstance = new App();
    const app = appInstance.getApp();

    app.listen(this.port, () => {
      console.log(`🚀 Server running on Port:${this.port}`);
    });
  }
}