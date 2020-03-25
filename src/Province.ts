import Country from "./Country";
import GameManager from "./GameManager";

export default class Province {
  public id: number;
  public owner: Country;
  constructor(id: string, obj: any) {
    this.id = parseInt(id, 16);
    this.owner = GameManager.instance.data.countries.get(obj.Owner);
    console.log("try", obj.Owner, this.owner);
  }

  public toJson(): string {
    return `"${this.id.toString(16)}":{"Owner":"${this.owner.id}"},`;
  }
}
