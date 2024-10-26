// updateLanyard.ts
import { fetchPresence } from './lanyard';
import { displayNavbar } from './navbar';
import { displayPresence } from './presence';


const updatePresence = async (): Promise<void> => {
    const lanyardData = await fetchPresence();
    displayPresence(lanyardData);
};
const updateNavbar = async (): Promise<void> => {
    const lanyardData = await fetchPresence();
    displayNavbar(lanyardData);
};

updatePresence();
updateNavbar();

setInterval(updatePresence, 1000);
setInterval(updateNavbar, 60000);