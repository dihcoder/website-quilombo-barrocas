export default async function loadLanguageFile(language) {
    try {
        const response = await fetch(`../langs/${language}.json`);
        return await response.json();
    } catch (error) {
        return console.error('Error loading language file:', error);
    }
}