import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const validators = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  uuid: faker.datatype.uuid(),
}));

export default validators;
