export default class Command {
    static instance: Command;
    constructor();
    execute(arg: string): void;
}
