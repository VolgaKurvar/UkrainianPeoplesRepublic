import DiplomaticTie from "./DiplomaticTie";

export default class Country {
  public id: string;
  public color: number;
  public name: string;
  public flag: string;
  private diplomaticTies: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  constructor(id: string, obj: any) {
    this.id = id;
    this.color = parseInt(obj.color, 16);
    this.name = obj.name;
    this.flag = obj.flag;
  }

  public addDiplomaticRelation(tie: DiplomaticTie) {
    this.diplomaticTies.push(tie);
  }

  public getDiplomacy() {
    return this.diplomaticTies;
  }

  public toJson(): string {
    return (
      `"${this.id}":{` +
      [
        `"name":"${this.name}"`,
        `"color":"${this.color.toString(16)}"`,
        `"flag":"${this.flag}"`,
      ].join(",") +
      "}"
    );
  }
}
