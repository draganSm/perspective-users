import { app } from './common/app';
import { environment } from './common/environment';

const port = environment.port || 3111;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
