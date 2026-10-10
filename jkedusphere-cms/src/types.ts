export type Env = {
  Bindings: { DB: D1Database; SETUP_KEY?: string };
  Variables: { user: { id: number; email: string } };
};
