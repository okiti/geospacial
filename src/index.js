import app from './config/app';
import vars from './config/vars';
import { log } from './utils/logger';
import './database';

app.set('port', vars.port || 8080);
export default app.listen(app.get('port'), '0.0.0.0', () => {
  log.info(`App listening on port ${vars.port}`);
});
