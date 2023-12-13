
import seedData from './seeders/fakerData';
async function seed() {
    await seedData();
}
seed();
