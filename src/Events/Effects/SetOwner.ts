import Effect from "./Effect";
import Country from "../../Country";
import GameManager from "../../GameManager";
import Province from "../../Province";
import MainScene from "../../Scenes/MainScene";
import * as PIXI from "pixi.js";
import JsonType from "../../Utils/JsonType";

export default class SetOwner extends Effect {
  private type = this.constructor.name;
  private _root: Country;
  private _provinces: Array<Province> = new Array<Province>();

  public activate() {
    this._provinces.forEach((province) => {
      province.setOwner(this._root);
    });
  }

  set root(countryId: string) {
    this._root = GameManager.instance.data.getCountry(countryId);
  }

  set provinces(provinceIds: Array<string>) {
    this._provinces = provinceIds.map((provinceId) => {
      if (provinceId.substr(0, 1) != "#") provinceId = "#" + provinceId; //#ついてないやつにつける data.json更新後削除
      const province = GameManager.instance.data.getProvinces().get(provinceId);
      //console.log(province);
      return province;
    });
  }

  replacer(key: string, value: any, type: JsonType) {
    try {
      if (value instanceof Country) return [key, value.id];
      if (value instanceof Array) {
        return [
          key,
          value.map((province: Province) => {
            return province.getId();
          }),
        ];
      }
      return [key, value];
    } catch (error) {
      console.log("Fatal Error at", this);

      return [key, value];
    }
  }
}
