const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "users.json");
const POSTS_FILE = path.join(__dirname, "posts.json");
const COUNT = parseInt(process.argv[2], 10) || 20;

const loremTitles = [
  "Lorem Ipsum and the Art of Placeholder Text",
  "Dolor Sit Amet: A Deep Dive",
  "Consectetur Adipiscing: What It Really Means",
  "Sed Do Eiusmod Tempor and You",
  "Why Ut Labore et Dolore Matters",
  "Magna Aliqua: The Hidden Truth",
  "Ut Enim Ad Minim Veniam Explained",
  "Quis Nostrud Exercitation and Best Practices",
  "Ullamco Laboris: A Practical Guide",
  "Nisi Ut Aliquip Ex Ea Commodo",
  "Duis Aute Irure Dolor in Reprehenderit",
  "Voluptate Velit Esse Cillum Dolore",
  "Eu Fugiat Nulla Pariatur Revisited",
  "Excepteur Sint Occaecat Cupidatat Non Proident",
  "Sunt in Culpa Qui Officia Deserunt",
  "Mollit Anim Id Est Laborum Demystified",
  "Curabitur Pretium Tincidunt Lacus",
  "Nulla Gravida Orci a Odio",
  "Nullam Varius Turpis Hendrerit",
  "Pellentesque Dapibus Suscipit Ligula",
  "Donec Aliquet Augue Atque Nisi",
  "Fusce Fermentum Nullam Varius",
  "Aliquam Erat Volutpat Nam Dui",
  "Vivamus Pretium Ornare Erat",
  "Proin Tincidunt Magna Sed Risus",
];

const loremParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis molestie pretium placerat, arcu ante aliquet magna, sed ultrices diam risus sit amet velit. Duis lobortis massa imperdiet quam. Suspendisse potenti. Sed lectus. Integer euismod lacus luctus magna.",
  "Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi lacinia molestie dui. Praesent blandit laoreet nibh. Fusce convallis metus id felis luctus adipiscing.",
  "Pellentesque egestas neque sit amet convallis ullamcorper, felis imperdiet sodales metus, et condimentum sem libero nec magna. Nam porttitor scelerisque neque. Nullam nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Tassel eget nunc rhoncus adipiscing.",
  "Donec aliquet, tortor sed accumsan bibendum, erat ligula aliquet magna, vitae ornare odio metus a mi. Morbi ac orci et nisl hendrerit mollis. Vestibulum ut nisl. Aliquam erat volutpat. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Vestibulum facilisis purus nec arcu.",
  "Fusce fermentum. Nullam varius nulla vitae nibh viverra placerat. Nunc purus. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.",
  "Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.",
  "Vivamus pretium ornare erat. Aenean fermentum risus id tortor. Integer ullamcorper leo ut odio. Fusce lobortis lorem at ipsum semper sagittis. Vivamus sit amet semper lacus, in mollis libero. Etiam sit amet est vel lorem tempor posueresit.",
  "Proin tincidunt magna sed risus volutpat fringilla. Curabitur vitae nulla dapibus, ornare dolor in, gravida erat. Etiam porttitor finibus pretium. Nunc at lorem feugiat ante porttitor pharetra. Cras molestie elit at velit feugiat, vel lobortis risus feugiat.",
  "Suspendisse interdum consectetur libero id faucibus nisl. Nunc id cursus metus aliquam eleifend mi in nulla. Nisi lacus sed viverra tellus in hac habitasse platea. Egestas sed tempus urna et pharetra pharetra. Nunc aliquet bibendum enim facilisis gravida.",
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
}

const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
const existingPosts = JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));
const startId = existingPosts.reduce((max, p) => Math.max(max, p.id), 0) + 1;

const usedTitles = new Set(existingPosts.map((p) => p.title));
const availableTitles = loremTitles.filter((t) => !usedTitles.has(t));

const newPosts = [];
for (let i = 0; i < COUNT; i++) {
  const user = randomItem(users);
  const title =
    availableTitles.length > 0
      ? availableTitles.splice(
          Math.floor(Math.random() * availableTitles.length),
          1
        )[0]
      : `${randomItem(loremTitles)} (${startId + i})`;

  newPosts.push({
    id: startId + i,
    userId: user.id,
    username: user.username,
    title,
    content: randomItem(loremParagraphs),
    createdAt: randomDate(new Date("2026-01-01"), new Date()),
  });
}

const merged = [...existingPosts, ...newPosts];
fs.writeFileSync(POSTS_FILE, JSON.stringify(merged, null, 2));
console.log(`Added ${newPosts.length} posts. Total: ${merged.length}`);
