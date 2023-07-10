/* istanbul ignore file */

import type { Knex } from 'knex';

import { csvToDbRows } from '../src/common/csvToDbRows';

// used https://www.mockaroo.com/ to generate these data
const csv = `id,first_name,last_name,email,address,zip_code,city,country
1,Sanders,Warham,swarham0@ebay.co.uk,177 Valley Edge Point,11111,Huanshan,China
2,Reeba,Jemison,rjemison1@artisteer.com,9 Vidon Circle,11111,Calebasses,Mauritius
3,Arden,Simcoe,asimcoe2@amazon.co.uk,7560 Jenna Drive,11111,San Francisco,Philippines
4,Izzy,Hehir,ihehir3@un.org,7 Johnson Place,11111,Lantian,China
5,Otha,Dineges,odineges4@nbcnews.com,75023 Del Mar Avenue,11111,Guansheng,China
6,Kenn,Rodda,krodda5@networkadvertising.org,7 Loftsgordon Court,11111,Xincheng,China
7,Saunderson,Butterfill,sbutterfill6@china.com.cn,66 Killdeer Hill,60340,Lazaro Cardenas,Mexico
8,Hillie,Lowndes,hlowndes7@statcounter.com,6 Meadow Valley Junction,11111,Seseng,Indonesia
9,Hadlee,Caberas,hcaberas8@dedecms.com,85268 Graceland Junction,11111,Kurayoshi,Japan
10,Dora,Egiloff,degiloff9@smugmug.com,833 Ilene Trail,64136,Kansas City,United States
11,Raynard,Salmon,rsalmona@foxnews.com,3175 Melody Avenue,11111,Agualva de Cima,Portugal
12,Daffi,Roddick,droddickb@hhs.gov,555 Prairieview Circle,11111,Pedro Betancourt,Cuba
13,Svend,Longman,slongmanc@google.com.hk,51565 Oriole Crossing,55340,Águas Belas,Brazil
14,Anderea,Thexton,athextond@cnet.com,98300 Monica Center,11111,Khūgyāṉī,Afghanistan
15,Sharity,Bumphries,sbumphriese@jigsy.com,8 Vidon Trail,28254,São Pedro de Trafaria,Portugal
16,Ingrim,Gladebeck,igladebeckf@ftc.gov,2256 Service Hill,11111,Koror,Palau
17,Gillie,Ezele,gezeleg@123-reg.co.uk,603 Crowley Parkway,11111,Banyuresmi,Indonesia
18,Ernst,Boddie,eboddieh@studiopress.com,80 Messerschmidt Trail,53230,Phatthana Nikhom,Thailand
19,Boyd,Hollyman,bhollymani@artisteer.com,34336 Randy Street,11111,Kouqian,China
20,Roxine,de Juares,rdejuaresj@altervista.org,566 Onsgard Crossing,11111,Tegalagung,Indonesia`;

exports.up = async function (knex: Knex) {
  await knex('users').insert(csvToDbRows(csv));
  await knex.raw(`
  UPDATE users
  SET
  created_at = current_timestamp + (random() * interval '365 days'),
  updated_at = created_at + (random() * interval '7 days');
  `);
};

exports.down = function (knex: Knex) {
  return knex('users').truncate();
};
