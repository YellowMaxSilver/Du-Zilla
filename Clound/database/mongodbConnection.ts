import { MongoClient, ServerApiVersion, Db } from "mongodb";

const uri = "mongodb+srv://yellowmaxanimation_db_user:Q3CG5dB42vPoqk2m@cluster0.11nqbco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbInstance: Db;

export async function connectDB(): Promise<Db> {
    if (dbInstance) {
    return dbInstance; // Retorna a instância se já estiver conectada
  }

  try {
    await client.connect();
    console.log("Conectado ao MongoDB!");
    
    // Armazena e retorna a instância do DB
    const dbName = "Du-zila"; // Substitua pelo nome do seu DB
    dbInstance = client.db(dbName);
    return dbInstance;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    // Em produção, você pode relançar o erro ou encerrar o processo:
    process.exit(1); 
  }
}

//exports = { connectDB, client }