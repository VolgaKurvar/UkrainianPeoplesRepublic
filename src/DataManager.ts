import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTie";
import War from "./War";
import MyEvent from "./Events/Event";
import Event from "./Events/Event";

export default class DataManager {
  public countries: Map<String, Country> = new Map<String, Country>();
  public provinces: Map<String, Province> = new Map<String, Province>();
  public diplomacy: Array<DiplomaticTie> = new Array<DiplomaticTie>();
  public events: Array<MyEvent> = new Array<MyEvent>();
  constructor() {}

  public load(json: Object) {
    //国読み込み
    for (const id in json["countries"]) {
      this.countries.set(id, new Country(id, json["countries"][id]));
    }
    console.log("countries loaded:", this.countries);

    //プロヴィンス読み込み
    for (const id in json["provinces"]) {
      this.provinces.set(id, new Province(id, json["provinces"][id]));
    }
    console.log("provinces loaded:", this.provinces);

    //外交読込
    for (const tie in json["diplomacy"]) {
      switch (tie["type"]) {
        case "war":
          this.diplomacy.push(
            new War(
              this.countries.get(tie["root"]),
              this.countries.get(tie["target"])
            )
          );
          break;
        default:
          console.log("diplomacy load error:", tie);
      }
    }
    console.log("diplomacy loaded:", this.diplomacy);

    //イベント読込
    this.events = json["events"].map((eventObject: Object) => {
      const event = new Event();
      Object.assign(event, eventObject);
      return event;
    });

    console.log("events loaded:", this.events);
  }

  public download() {
    console.log(Object.entries(this));
    const json = JSON.stringify(this, (key, value) => {
      if (value instanceof Map) return Object.fromEntries(value);
      if (key === "owner") return value.id;
      if (key === "color") return value.toString(16);
      if (key === "id" && typeof value === "number") return value.toString(16);
      return value;
    });

    const blob = new Blob([json], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.json";
    a.click();
  }
}