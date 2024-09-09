// updateLanyard.ts
import { fetchPresence } from './lanyard';
import { displayNavbar } from '../lanyard/navbar';
import { displayPresence } from '../lanyard/presence';


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

setInterval(updatePresence, 1000000);
setInterval(updateNavbar, 1000000);