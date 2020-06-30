import JsonObject from "./JsonObject";
/**
 * データロードの順番が重要になる場合に使用します
 * 関数を登録しますので、要求されるまえにこのオブジェクトを生成しておき、
 * このインスタンスが格納された変数を書き換えない様にしてください
 * @export
 * @abstract
 * @class DataManager
 * @extends {JsonObject}
 */
export default abstract class DataManager extends JsonObject {
    onLoaded: any[];
    _isLoaded: boolean;
    ON_CREATED: void;
    isLoaded(): boolean;
    addListener(func: any): void;
    /**
     * 保留していた関数を実行します
     * データのロードが終わったときに必ず呼び出してください
     * @memberof MapDataManager
     */
    endLoad(test?: string): void;
}