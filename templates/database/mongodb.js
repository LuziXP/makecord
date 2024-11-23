import mongoose from 'mongoose';

export async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/discordbot');
        console.log('MongoDB bağlantısı başarılı!');
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error);
        process.exit(1);
    }
}

// Örnek bir model
const exampleSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    data: mongoose.Schema.Types.Mixed
});

export const Example = mongoose.model('Example', exampleSchema);
