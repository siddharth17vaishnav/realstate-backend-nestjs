import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    await trx.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('phone_number').nullable();
      table.enum('role', ['admin', 'user']).notNullable();
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
