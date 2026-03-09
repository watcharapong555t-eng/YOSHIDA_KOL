const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const DB_PATH = './points.json';

// ฟังก์ชันอ่านข้อมูล
function getPoints() {
    if (!fs.existsSync(DB_PATH)) return {};
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

// ฟังก์ชันบันทึกข้อมูล
function savePoints(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

client.once('ready', () => {
    console.log(`บอท ${client.user.tag} ออนไลน์และพร้อมนับแต้มแล้ว!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    let data = getPoints();
    let uid = message.author.id;

    // เริ่มต้นที่ 795
    if (data[uid] === undefined) {
        data[uid] = 795;
        savePoints(data);
    }

    // คำสั่ง: !บวกหนึ่ง
    if (message.content === '+1') {
        data[uid] += 1;
        savePoints(data);
        message.reply(`บวกให้แล้ว 1 แต้ม! ตอนนี้คุณมี ${data[uid]} แต้ม`);
    }

    // คำสั่ง: !บวกสาม
    else if (message.content === '+3') {
        data[uid] += 3;
        savePoints(data);
        message.reply(`บวกให้แล้ว 3 แต้ม! ตอนนี้คุณมี ${data[uid]} แต้ม`);
    }

    // คำสั่ง: !บวกห้า (เพิ่มใหม่)
    else if (message.content === '+5') {
        data[uid] += 5;
        savePoints(data);
        message.reply(`บวกให้แล้ว 5 แต้ม! ตอนนี้คุณมี ${data[uid]} แต้ม`);
    }

    // คำสั่ง: !เช็คแต้ม
    else if (message.content === '!เช็คแต้ม') {
        message.reply(`คุณมีแต้มสะสมทั้งหมด: ${data[uid]} แต้ม`);
    }
});

// ใส่ Token ของบอทที่นี่
client.login('MTQ4MDUyNjA3NDU1ODI4Mzg4Ng.GYvM-j.vKqdSOvhbQWMS65Iy6-sshI7MScgdCRSuzOM2w');