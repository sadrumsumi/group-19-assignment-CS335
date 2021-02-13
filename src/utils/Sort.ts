export class Sort {
  /** */
  static async data(data: Array<Object>): Promise<any> {
    data.sort((a, b) => {
      return a["position"] - b["position"];
    });
    return Promise.resolve(data);
  }

  /** */
}
