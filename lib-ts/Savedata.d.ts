import Country from "./Country";
import Province from "./Province";
import DiplomaticTie from "./DiplomaticTies/DiplomaticTie";
import Event from "./Events/Event";
import Combat from "./Combat";
import Jsonable from "./Jsonable";
import DivisionTemplate from "./DivisionTemplate";
import MapDataManager from "./MapDataManager";
import SetDataManager from "./SetDataManager";
export default class Savedata implements Jsonable {
    private _countries;
    private _provinces;
    private _diplomacy;
    private _events;
    private _combats;
    private _templates;
    private _cultures;
    private set countries(value);
    getCountries(): Map<string, Country>;
    getCountry(id: string): Country;
    private set templates(value);
    getTemplates(): MapDataManager<string, DivisionTemplate>;
    private set provinces(value);
    setProvince(id: string, province: Province): void;
    getProvinces(): MapDataManager<string, Province>;
    private set diplomacy(value);
    addDiplomacy(diplomacy: DiplomaticTie): void;
    removeDiplomacy(diplomacy: DiplomaticTie): void;
    private set events(value);
    getEvents(): Event[];
    private set combats(value);
    addCombat(combat: Combat): void;
    removeCombat(combat: Combat): void;
    getCombats(): Combat[];
    load(json: object): void;
    toJSON(): any;
    private set cultures(value);
    getCultures(): SetDataManager<string>;
    download(): void;
}
