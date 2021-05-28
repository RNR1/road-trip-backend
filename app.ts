import { opine, json } from 'opine';
import { opineCors } from 'cors';
import { config } from 'dotenv';
import { connect } from 'db';
import { parse } from 'flags';
import { errorHandler, logger } from 'middleware';
import { auth } from 'routes';

config();
connect();
console.dir(Deno.env.toObject());
const port = Number(Deno.env.get('PORT'));
const { args } = Deno;
const argPort = parse(args).port ?? 8000;
const app = opine();

app.use(opineCors());
app.use(logger);
app.use(json());

app.use('/api/auth', auth);
app.use(errorHandler);
app.use(logger);

app.listen(argPort ?? port, () =>
	console.log(`server has started on port ${port} 🚀`)
);
