export default function redirect() {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("link");
  if (keyword) {
    const keywordMap: { [key: string]: string } = {
      discord: "https://discord.gg/yUueAFyAmN",
      invite_miko:
        "https://discord.com/oauth2/authorize?client_id=1060061912710258699&permissions=10036764339318&integration_type=0&scope=applications.commands+bot",
      miko_support: "https://discord.gg/yUueAFyAmN",
      youtube: "https://www.youtube.com/@vve1_",
      github: "https://github.com/vorlie",
      site_source: "https://github.com/vorlie/vorlie",
      ohalink: "https://www.youtube.com/watch?v=xvFZjo5PgG0",
      anilist: "https://anilist.co/user/vorlie",
      lastfm: "https://www.last.fm/user/vorlie",
    };

    if (keywordMap[keyword]) {
      window.location.href = keywordMap[keyword];
    } else {
      console.error("Keyword not found in map");
    }
  }
}
