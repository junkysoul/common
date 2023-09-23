import postgres from 'postgres';

export const sql = postgres('postgres://postgres:@localhost:5432/postgres', {
    host                 : 'localhost',   // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : 'postgres',    // Name of database to connect to
    username             : 'postgres',    // Username of database user
    password             : '',            // Password of database user
});

