import mongoose from 'mongoose';

//obervação: como estamos trabalhando com outro servidor (MongoDB onde temos código, lógica diferentes) onde não faz parte desse temos que declarar ele 
//assíncrono. por que precisamos primeiro que ele acesse o banco de dados na nuvem e depois o código normal volta a funcionar. se de certo ele vem pro then se não pra o catch
const connectDatabase = () => {
    console.log("wait connecting to the database");

    mongoose.connect("mongodb+srv://fabricio:fabricio@cluster0.xv0badm.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongo Atlas Connected")).catch((error) => console.log(error));
}

export default connectDatabase;