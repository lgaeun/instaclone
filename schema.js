//bring all queries, typeDefs, mutations alltogether
import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

//loadFileSync: default export를 가져온다. export를 하지 않으면 error 발생.
//anyfolder/anyfilename.typeDefs.js
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations}.js` //this is called glob! (=pattern language)
);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
