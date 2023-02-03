export default class Guid
{
    public static readonly Empty : string = '00000000-0000-0000-0000-000000000000'

    public static isEmpty(value ?: string | null)
    {
        if (!value)
            return true

        if (value === Guid.Empty)
            return true

        return false
    }
}