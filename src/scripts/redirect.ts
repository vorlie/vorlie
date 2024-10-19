export default function redirect() {

    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('link');
    if (keyword) {

        const keywordMap: { [key: string]: string } = {
            discord: 'https://discord.gg/ujYCjUwu6U',
            miko_support: 'https://discord.gg/yUueAFyAmN',
            youtube: 'https://www.youtube.com/@vve1_',
            github: 'https://github.com/vorlie',
            site_source: 'https://github.com/vorlie/vorlie',
            ohalink: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
        };

        if (keywordMap[keyword]) {
            window.location.href = keywordMap[keyword];
        } else {
            console.error('Keyword not found in map');
        }
    }
}