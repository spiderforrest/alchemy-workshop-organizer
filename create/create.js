import { createParticipant, getWorkshops, checkAuth, logout } from '../fetch-utils.js';

const form = document.querySelector('.participant-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // get input
    const formData = new FormData(form);
    const name = formData.get('participant-name');
    const workshop = formData.get('workshop-id');
    // send to backend
    await createParticipant({ name: name, workshop_id: workshop });
    // go home
    location.replace('../');
});

self.addEventListener('load', async () => {
    // dom
    const workshopSelect = document.getElementById('workshop-selector');
    // fetch
    const response = await getWorkshops();
    // iterate response, rendering
    for (const item of response) {
        // create
        const option = document.createElement('option');
        // propogate
        option.textContent = item.name;
        option.value = item.id;
        // consolidate
        workshopSelect.append(option);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
