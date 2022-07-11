import * as CommandDictionary from '../commands/index';
export const commands = [];
for (let commandKey of Object.getOwnPropertyNames(CommandDictionary)) {
    let module = CommandDictionary[commandKey];
    commands.push(Promise.resolve(module));
}
export default commands;
