require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    
    const client = await pool.connect();
    console.log('✅ Connected to database successfully');
    
    // Test basic query
    const result = await client.query('SELECT NOW()');
    console.log('✅ Query test successful:', result.rows[0]);
    
    // Check if bookings table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'bookings'
      );
    `);
    console.log('✅ Bookings table exists:', tableCheck.rows[0].exists);
    
    // Try to select from bookings table
    const bookingsResult = await client.query('SELECT COUNT(*) FROM bookings');
    console.log('✅ Bookings count:', bookingsResult.rows[0].count);
    
    client.release();
    console.log('✅ All tests passed!');
    
  } catch (err) {
    console.error('❌ Database test failed:', err);
  } finally {
    await pool.end();
  }
}

testConnection();