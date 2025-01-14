import mongose from 'mongoose'

async function dataBaseConnection () {
  try{
    await mongose.connect(process.env.MONGO_URI)
      console.log("Mongo conneted")
  }catch(e){
    console.error("Error conection to Mongo" + e.message);
    process.exit(1)
  }
}
export default dataBaseConnection