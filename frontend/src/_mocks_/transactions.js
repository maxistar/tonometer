import faker from 'faker';
// ----------------------------------------------------------------------

const transactions = [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    uuid: faker.datatype.uuid(),
}));

export default transactions;
