require('./helpers/polyfill');
import Application from './lib/application';

export { Application } from './lib/application';
export { Entity } from './lib/entity';
export { Controller } from './lib/controller';
export { Service } from './lib/service';
export * as Components from './components';
export default Application;

// const app = new Application
// const dbh = app.component(DbHandler);

// SELECT statement
/*const queryString = dbh.queryBuilder
  .select('*')
  .select('pathname, filename AS name')
  .select({ pathname: 'path', filename: 'name' })
  .select([
    'id',
    'filename',
    { pathname: 'path', filename: 'name' },
  ])
  .distinct()
  .from('image')
  .where(['id', '=', 172])
  .and(['update_time', '<', Date.now() - 3600])
  // .or()
  // .whereNot(['count_images', 'between', [0, 30]])
  .andNot(['filename', 'like', '%test'])
  .orNot(['dirname', 'in', ['./dist', './node_modules', './assets']])
  .orderBy('filename')
  .orderBy([ 'filename', 'update_time' ])
  .orderBy({
    filename: 'asc',
    update_time: 'desc',
  })
  .limit(10)
  .limit([5, 10])
  .build();*/

// INSERT statement
/*const queryString = dbh.queryBuilder
  .insert({
    gid: "4447996",
    dirname: "./files/tmp/",
    filename: "01",
    extension: ".jpg",
    href: "https://imagefap.com?img=01",
    uri: "https://imagefap.com/01.jpg",
  })
  .into('image')
  .build();*/

// UPDATE statement
/*const queryString = dbh.queryBuilder
  .update('image')
  .set({
    gid: "4447996",
    dirname: "./files/tmp/",
    filename: "02",
    extension: ".png",
    href: "https://imagefap.com?img=02",
    uri: "https://imagefap.com/02.png"
  })
  .where(['id', '=', 1])
  .build();*/

// DELETE statement
/*const queryString = dbh.queryBuilder
  .delete()
  .from('image')
  .where(['id', '=', 1])
  .build();*/

// console.log(queryString);