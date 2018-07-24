import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import {myGraphQLSchema} from './graphql';
import resolver from './resolver';

const app = new koa();
const router = new koaRouter();
const port = 3000;

// koaBody is needed just for POST.
app.use(koaBody());

router.post('/graphql', graphqlKoa({ schema: myGraphQLSchema, rootValue: resolver}));
router.get('/graphql', graphqlKoa({ schema: myGraphQLSchema }));

// Setup the /graphiql route to show the GraphiQL UI
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql'}));

app.use(router.routes());
app.use(router.allowedMethods());


function runServer() {
	return new Promise((resolve) => {
		const server = app.listen(port, () => {
			const address = server.address();
			const url = `http://${address.address}:${address.port}`;
			console.log(`Server listening on ${url}`);
			resolve(url);
		});
	});
}

if (require.main === module) {
	runServer();
}

module.exports = runServer;
