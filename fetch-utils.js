const SUPABASE_URL = 'https://njqdydcjmajdjmyztzov.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcWR5ZGNqbWFqZGpteXp0em92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwMjAsImV4cCI6MTk4MzY4NDAyMH0.r6bSNSp-6Ts4GRV3-pnwjFMUWdUGlWU4EiIWbDqrTXU';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('./auth');
}

export async function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./workshops');
    }
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

/* Data functions */
function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export async function getWorkshops() {
    // fetch all workshops and their bunnies
    const response = await client
        .from('workshops')
        .select('*, participants (*)')
        .match({ 'participants.user_id': client.auth.session().user.id });
    return checkError(response);
}
