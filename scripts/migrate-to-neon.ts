import pg from "pg";

const REPLIT_DB = process.env.DATABASE_URL;
const NEON_DB = process.env.NEON_DATABASE_URL;

if (!REPLIT_DB || !NEON_DB) {
  console.error("Both DATABASE_URL and NEON_DATABASE_URL are required");
  process.exit(1);
}

const replitPool = new pg.Pool({ connectionString: REPLIT_DB });
const neonPool = new pg.Pool({ connectionString: NEON_DB });

async function getTableSchema(tableName: string): Promise<string | null> {
  try {
    const { rows } = await replitPool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = $1 AND table_schema = 'public'
      ORDER BY ordinal_position
    `, [tableName]);
    
    if (rows.length === 0) return null;
    
    const columns = rows.map((col: any) => {
      let type = col.data_type;
      if (type === 'integer' && col.column_default?.includes('nextval')) {
        type = 'SERIAL';
      } else if (type === 'character varying') {
        type = 'TEXT';
      } else if (type === 'ARRAY') {
        type = 'TEXT[]';
      }
      
      let def = '';
      if (type !== 'SERIAL' && col.column_default && !col.column_default.includes('nextval')) {
        def = ` DEFAULT ${col.column_default}`;
      }
      
      const nullable = col.is_nullable === 'NO' && type !== 'SERIAL' ? ' NOT NULL' : '';
      
      return `"${col.column_name}" ${type}${nullable}${def}`;
    });
    
    const pkResult = await replitPool.query(`
      SELECT a.attname
      FROM pg_index i
      JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
      WHERE i.indrelid = $1::regclass AND i.indisprimary
    `, [tableName]);
    
    let pk = '';
    if (pkResult.rows.length > 0) {
      pk = `, PRIMARY KEY ("${pkResult.rows[0].attname}")`;
    }
    
    return `CREATE TABLE IF NOT EXISTS "${tableName}" (${columns.join(', ')}${pk})`;
  } catch (error) {
    console.error(`Error getting schema for ${tableName}:`, error);
    return null;
  }
}

const tables = [
  "adhkar",
  "duas", 
  "hadiths",
  "benefits",
  "quran_surahs",
  "reciters",
  "daily_ward",
  "verification_hadiths",
  "bukhari_hadiths",
  "muslim_hadiths",
  "site_stats"
];

async function createTableInNeon(tableName: string) {
  const schema = await getTableSchema(tableName);
  if (!schema) {
    console.log(`  Could not get schema for ${tableName}`);
    return false;
  }
  
  try {
    await neonPool.query(schema);
    console.log(`  Created table ${tableName}`);
    return true;
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      console.log(`  Table ${tableName} already exists`);
      return true;
    }
    console.error(`  Error creating ${tableName}:`, error.message);
    return false;
  }
}

async function migrateTable(tableName: string) {
  console.log(`Migrating ${tableName}...`);
  
  try {
    const { rows } = await replitPool.query(`SELECT * FROM ${tableName}`);
    
    if (rows.length === 0) {
      console.log(`  No data in ${tableName}`);
      return;
    }
    
    console.log(`  Found ${rows.length} rows`);
    
    const created = await createTableInNeon(tableName);
    if (!created) return;
    
    await neonPool.query(`DELETE FROM "${tableName}"`);
    
    const columns = Object.keys(rows[0]);
    const batchSize = 100;
    
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const values: any[] = [];
      const placeholders: string[] = [];
      
      batch.forEach((row, batchIdx) => {
        const rowPlaceholders: string[] = [];
        columns.forEach((col, colIdx) => {
          values.push(row[col]);
          rowPlaceholders.push(`$${batchIdx * columns.length + colIdx + 1}`);
        });
        placeholders.push(`(${rowPlaceholders.join(", ")})`);
      });
      
      const query = `INSERT INTO "${tableName}" (${columns.map(c => `"${c}"`).join(", ")}) VALUES ${placeholders.join(", ")} ON CONFLICT DO NOTHING`;
      
      await neonPool.query(query, values);
      console.log(`  Inserted ${Math.min(i + batchSize, rows.length)}/${rows.length}`);
    }
    
    console.log(`  Done migrating ${tableName}`);
  } catch (error: any) {
    console.error(`  Error migrating ${tableName}:`, error.message);
  }
}

async function main() {
  console.log("Starting migration from Replit to Neon...\n");
  
  try {
    await neonPool.query("SELECT 1");
    console.log("Connected to Neon successfully\n");
  } catch (error: any) {
    console.error("Failed to connect to Neon:", error.message);
    process.exit(1);
  }
  
  for (const table of tables) {
    await migrateTable(table);
    console.log("");
  }
  
  console.log("Migration complete!");
  
  await replitPool.end();
  await neonPool.end();
}

main().catch(console.error);
