import type { CommandModule } from 'yargs'
import type { GlobalArgs } from '../types/arguments'
import * as CommandDictionary from '../commands/index'

type CommandDictType = typeof CommandDictionary
type CommandDictKey = keyof CommandDictType

export const commands : Promise<CommandModule<GlobalArgs, GlobalArgs>>[] = []
for (let commandKey of Object.getOwnPropertyNames(CommandDictionary))
{
    let module : CommandModule<GlobalArgs,GlobalArgs> = CommandDictionary[commandKey as CommandDictKey]
    commands.push(Promise.resolve(module))
}

export default commands