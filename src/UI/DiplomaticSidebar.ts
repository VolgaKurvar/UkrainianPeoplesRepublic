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
import VerticalBox from "./VerticalBox";

export default class DiplomaticSidebar extends Sidebar {
  private readonly FLAG_HEIGHT: number = 80;
  private scene: MainScene;
  private readonly DIPLOMACY_HEIGHT: number = 40;

  constructor(scene: MainScene, target: Country) {
    super("外交");

    this.scene = scene;

    //let uiHeight = this.contentHeight;

    //相手国の国旗を表示
    const flag = new Flag(target);
    this.addPart(flag);
    //flag.scale.set(this.FLAG_HEIGHT / flag.height);
    //flag.anchor.set(0.5, 0.5);
    //flag.position.set(this.width / 2, uiHeight + flag.height / 2);
    //this.addChild(flag);
    //uiHeight += flag.height;

    //国名
    const text = new PIXI.Text(
      target.name,
      new PIXI.TextStyle({ fill: 0xffffff })
    );
    //text.anchor.set(0.5, 0);
    //text.position.set(this.width / 2, uiHeight + 10);
    //text.width = Math.min(text.width, this.width - 10);
    //this.addChild(text);
    this.addPart(text);
    //uiHeight += text.height + 20;

    //横に並べるbox
    const alignBox = new HorizontalBox(this.width, this.height - this.uiHeight);
    this.addPart(alignBox);
    //外交関係ボックス
    const relationsBox = new VerticalBox(alignBox.width / 2, alignBox.height);
    alignBox.addPart(relationsBox);
    //const relationsBox = new PIXI.Graphics();
    //relationsBox.beginFill(0x1f1f1f);
    //relationsBox.position.set(5, uiHeight);
    //relationsBox.drawRect(
    //  0,
    //  0,
    //  this.width / 2 - 10,
    //  this.height - uiHeight - 5
    //);
    //this.addChild(relationsBox);

    //外交関係を表示
    for (const tie of target.getDiplomacy()) {
      if (tie instanceof War) {
        const warIcon = new PIXI.Sprite(
          GameManager.instance.game.loader.resources[Resource.war].texture
        );
        warIcon.scale.set(this.DIPLOMACY_HEIGHT / warIcon.height);
        relationsBox.addChild(warIcon);
        const warTarget =
          tie.getTarget() === target ? tie.getRoot() : tie.getTarget();
        const flag = new Flag(warTarget);
        flag.scale.set(this.DIPLOMACY_HEIGHT / flag.height);
        flag.position.set(relationsBox.width * 0.5, 0);
        flag.on("click", () => this.scene.openDiplomacySidebar(warTarget));
        relationsBox.addChild(flag);
      }
    }

    //アクションボックス
    /*
    const actionBox = new PIXI.Graphics();
    actionBox.beginFill(0x1f1f1f);
    actionBox.position.set(relationsBox.width + 10, uiHeight);
    actionBox.drawRect(0, 0, this.width / 2 - 5, this.height - uiHeight - 5);
    this.addChild(actionBox);*/
    const actionBox = new VerticalBox(alignBox.width / 2, alignBox.height);
    alignBox.addPart(actionBox);

    //外交アクション追加
    const declareWar = new Button("宣戦布告", actionBox.width);
    declareWar.on("click", () => {
      if (this.scene.getMyCountry() === target) {
        this.scene.addChild(
          new Dialog("エラー", "自国に宣戦布告することはできません！")
        );
        return;
      }
      if (this.scene.getMyCountry().hasWarWith(target)) return;
      const war = new War(this.scene.getMyCountry(), target);
      GameManager.instance.data.diplomacy.push(war);
      this.scene.openDiplomacySidebar(target);
      war.activate();
    });
    actionBox.addChild(declareWar);
  }
}
