import dotenv from 'dotenv';

dotenv.config();

async function loadNames() {
    try {
        const response = await fetch('https://api.ton.sh/getCoinPrice');
        const names = await response.json();
        console.log(names);
    } catch (e) {
        console.log(e)
    }
  // logs [{ name: 'Joker'}, { name: 'Batman' }]
}
loadNames();
