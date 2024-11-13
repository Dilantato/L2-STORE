const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión a MongoDB establecida correctamente');
        
        // Verificar la conexión
        const connection = mongoose.connection;
        connection.on('error', console.error.bind(console, 'Error de conexión:'));
        connection.once('open', () => {
            console.log('Base de datos conectada exitosamente');
        });
        
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;