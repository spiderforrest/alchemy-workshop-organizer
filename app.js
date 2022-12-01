import { checkAuth, getWorkshops, logout } from './fetch-utils.js';

checkAuth();

const workshopsDiv = document.getElementById('workshops-div');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayWorkshops() {
    // fetch & reset
    const response = await getWorkshops();
    workshopsDiv.innerHTML = '';
    // iterate response, rendering
    for (const item of response) {
        // create
        console.log(item);
        const workshopDiv = document.createElement('div');
        const nameH = document.createElement('h3');
        const participantsDiv = document.createElement('div');
        // style
        workshopDiv.classList.add('workshop');
        participantsDiv.classList.add('participants');
        // propogate
        workshopDiv.textContent = item.name;
        // iterate participants, rendering
        for (const subItem of item.participants) {
            // create
            const participantDiv = document.createElement('div');
            // style
            participantDiv.classList.add('participant');
            // propogate
            participantDiv.textContent = subItem.name;
            // events
            // participantDiv.addEventListener('click', async () => {
            //     await removeParticpant();
            //     await displayWorkshops();
            // });
            // consolidate
            participantsDiv.append(participantDiv);
        }
        // consolidate
        workshopDiv.append(nameH, participantsDiv);
        workshopsDiv.append(workshopDiv);
    }
}

self.addEventListener('load', async () => {
    await displayWorkshops();
});
