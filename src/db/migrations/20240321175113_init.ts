import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    await trx.schema.createTable('role', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('slug').notNullable();
    });
    await trx.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('phone_number').nullable();
      table.integer('role_id').unsigned().notNullable();
      table.foreign('role_id').references('role.id').onDelete('CASCADE');
    });

    await trx.schema.createTable('category', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('slug').unique().notNullable();
    });
    await trx.schema.createTable('property', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.integer('pincode').notNullable();
      table.integer('category_id').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();
      table
        .foreign('category_id')
        .references('category.id')
        .onDelete('CASCADE');
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    });
    await trx.schema.createTable('wishlist', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.integer('property_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table
        .foreign('property_id')
        .references('property.id')
        .onDelete('CASCADE');
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    await trx.schema.dropTable('wishlist');
    await trx.schema.dropTable('property');
    await trx.schema.dropTable('category');
    await trx.schema.dropTable('users');
    await trx.schema.dropTable('role');
  });
}
