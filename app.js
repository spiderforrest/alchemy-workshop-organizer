import { checkAuth, getWorkshops, logout, removeParticipant } from './fetch-utils.js';

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
            const p = document.createElement('p');
            const removeButton = document.createElement('button');
            // style
            participantDiv.classList.add('participant');
            // propogate
            p.textContent = subItem.name;
            removeButton.textContent = 'Remove';
            // events
            removeButton.addEventListener('click', async () => {
                await removeParticipant(subItem.id);
                await displayWorkshops();
            });
            // consolidate
            participantsDiv.append(p, removeButton);
        }
        // consolidate
        workshopDiv.append(nameH, participantsDiv);
        workshopsDiv.append(workshopDiv);
    }
}

self.addEventListener('load', async () => {
    await displayWorkshops();
});
