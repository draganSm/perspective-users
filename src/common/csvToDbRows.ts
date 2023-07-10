import { zipObj } from 'ramda';

export const csvToDbRows = (csv: string) => {
    const [firstLine, ...rest] = csv.split('\n');
    const [_, ...fields] = firstLine.split(','); // skip id
    return rest.map(it => {
        const [_, ...values] = it.split(','); // skip id
        return zipObj(fields, values)
    })
}
