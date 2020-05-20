import Sidebar from "./Sidebar";
import Country from "../Country";
import Flag from "../Flag";
import * as PIXI from "pixi.js";
import Button from "./Button";
import MainScene from "../Scenes/MainScene";
import Dialog from "./Dialog";
import War from "../DiplomaticTies/War";
import GameManager from "../GameManager";
import Resource from "../Resources";
import HorizontalBox from "./HorizontalBox";
import SpriteButton from "./SpriteButton";
import DivisionTemplate from "../DivisionTemplate";
import DivisionInfo from "../DivisionInfo";
import DivisionSprite from "../DivisionSprite";
import SelectScene from "../Scenes/SelectScene";

export default class DebugSidebar extends Sidebar {
  constructor(scene: MainScene) {
    super("デバッグ");
    const button = new Button("NONE");
    button.on("click", () => {});
    this.addPart(button);
  }
}
