import { SessionEntity } from './entities/session';
import { User } from '../../user/entities/user.entity';
import { InvitePoc } from '../../user/entities/invite-poc.entity';
import { InviteVol } from '../../user/entities/invite-vol.entity';
import { PocRelation } from '../../user/entities/poc.entity';
import { VolRelation } from '../../user/entities/vol.entity';
import { Cohort } from '../../cohort/entities/cohort.entity';

const entities = [
  SessionEntity,
  User,
  InvitePoc,
  InviteVol,
  PocRelation,
  VolRelation,
  Cohort,
];
export default entities;

export { SessionEntity, User };
