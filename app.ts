import { opine, json } from 'opine';
import { opineCors } from 'cors';
import { config } from 'dotenv';
import { connect } from 'db';
import { errorHandler, logger } from 'middleware';
import { auth } from 'routes';

config();
connect();

const app = opine();

app.use(opineCors());
app.use(logger);
app.use(json());

app.use('/api/auth', auth);
app.get('/', (_, res) =>
	res.send('Road trip API, you are probably not looking for us.')
);
app.use(errorHandler);
app.use(logger);

if (import.meta.main) {
	const port = Number(Deno.env.get('PORT'));
	app.listen(port, () => console.log(`Server started on port ${port}`));
}

export default app;
