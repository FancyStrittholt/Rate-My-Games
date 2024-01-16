const client = require('./client');

async function dropTables() {
  try {
    console.log('Dropping All Tables...');
    await client.query(`
      DROP TABLE IF EXISTS games;
      DROP TABLE IF EXISTS leaderboard;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS votes;
      DROP TABLE IF EXISTS tags;
    `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Building All Tables...');
    await client.query(`
      CREATE TABLE games (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        developer VARCHAR(255) NOT NULL,
        publisher VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        link VARCHAR(255) NOT NULL
        );
      CREATE TABLE leaderboard (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) DEFAULT 'https://i.imgur.com/3J3wW9S.png'
        );
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email TEXT NOT NULL,
        token VARCHAR(255) NOT NULL
        );
      CREATE TABLE votes (
        id SERIAL PRIMARY KEY,
        userid INTEGER NOT NULL,
        gameid INTEGER NOT NULL
        );
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        gameid INTEGER NOT NULL
        );
      `);
  } catch (error) {
    throw error;
  }
}

async function createInitialData() {
  try {
    console.log('Creating Initial Data...');
    await client.query(`
    INSERT INTO games (name, developer, publisher, description, image, link)
    VALUES
      ('CSGO', 'Valve', 'Valve', 'For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.', 'CSGO.png', 'https://store.steampowered.com/app/730/CounterStrike_2/'),
      ('World of Warcraft', 'Blizzard', 'Blizzard', 'Prepare to descend beneath the surface of Azeroth to explore subterranean worlds full of hidden wonders, earn the trust of the new Earthen allied race, and face an ancient evil lurking in the darkness. For the HORDE!', 'WoW.png', 'https://worldofwarcraft.blizzard.com/en-us/'),
      ('Splitgate', '1047 Games', '1047 Games', 'Splitgate is a free to play, fast-paced multiplayer shooter that features player-controlled portals. This sci-fi shooter takes the FPS genre to a new dimension with its portal mechanics, delivering high-flying, multi-dimensional combat.', 'Splitgate.png', 'https://store.steampowered.com/app/677620/Splitgate/'),
      ('Fortnite', 'Epic Games', 'Epic Games', 'Create, play, and battle with friends for free in Fortnite. Be the last player standing in Battle Royale and Zero Build, experience a concert or live event, or discover over a million creator made games, including racing, parkour, zombie survival, and more. Each Fortnite island has an individual age rating so you can find the one thats right for you and your friends. Find it all in Fortnite ... Drop In.', 'Fortnite.png', 'https://store.epicgames.com/en-US/p/fortnite'),
      ('God of War', 'Santa Monica Studio', 'PlayStation','His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.', 'GodofWar.png', 'https://store.steampowered.com/app/1593500/God_of_War/'),
      ('Orna', 'Northern Forge', 'Northern Forge', 'In this unique GPS powered multiplayer RPG, enjoy turn-based combat, collect and upgrade your weapons and armor, compete in PvP battles, battle through dungeons, slay dragons, and claim real world landmarks online with your mobile device, wherever you are.', 'Orna.png', 'https://playorna.com/'),
      ('The Finals', 'Embark Studios', 'Embark Studios', 'Join THE FINALS, the world-famous, free-to-play, combat-centered game show! Fight alongside your teammates in virtual arenas that you can alter, exploit, and even destroy. Build your own playstyle in this first-person shooter to win escalating tournaments and lasting fame.', 'TheFinals.png', 'https://store.steampowered.com/app/2073850/THE_FINALS/'),
      ('Tombstone MMO', 'Well Bucket', 'Well Bucket', 'With a post-apocalyptic world thats been ravaged by beasts and overgrown by nature, Tombstone continues to thrill players with an adventure unlike any other. What secrets does this wasteland hold?', 'Tombstone.png', 'https://tombstonemmo.com/'),
      ('Core Keeper', 'Pugstorm', 'Fireshine Games', 'Explore an endless cavern of creatures, relics and resources in a mining sandbox adventure for 1-8 players. Mine, build, fight, craft and farm to unravel the mystery of the ancient Core.', 'CoreKeeper.png', 'https://store.steampowered.com/app/1621690/Core_Keeper/'),
      ('OSRS', 'Jagex Ltd', 'Jagex Ltd', 'The best retro fantasy MMORPG on the planet. Old School is RuneScape but… older! This is the open world you know and love, but as it was in 2007. Saying that, its even better than that Old School is shaped by you, its players, with regular new content, fixes and expansions voted for by the fans!', 'OSRS.png', 'https://store.steampowered.com/app/1343370/Old_School_RuneScape/'),
      ('Damascus', 'Team Teal', 'Team Teal', 'Damascus is a pixel-art MMORPG created by two guys. Create a unique character and explore the strange and fantastic world that is before you. Train any of your 19 different skills. Chat and trade with other players. Make friends and slay all sorts of Dragons!', 'Damascus.png', 'https://store.steampowered.com/app/1259000/Damascus/'),
      ('Shatterline', 'Frag Lab LLC', 'Frag Lab LLC', 'Get ready for the apocalypse! Shatterline is an intense free-to-play FPS with roguelike co-op PVE and PVP modes. Pick a unique operator, customize your look and weapons, and combat the alien plague!', 'Shatterline.png', 'https://store.steampowered.com/app/2087030/Shatterline/'),
      ('Valheim', 'Iron Gate AB', 'Coffee Stain Pulishing', 'A brutal exploration and survival game for 1-10 players, set in a procedurally-generated purgatory inspired by viking culture. Battle, build, and conquer your way to a saga worthy of Odins patronage!', 'Valheim.png', 'https://store.steampowered.com/app/892970/Valheim/'),
      ('Horizon-Zero Dawn', 'Guerrilla', 'PlayStation', 'Experience Aloys legendary quest to unravel the mysteries of a future Earth ruled by Machines. Use devastating tactical attacks against your prey and explore a majestic open world in this award-winning action RPG!', 'Horizon.png', 'https://store.steampowered.com/app/1151640/Horizon_Zero_Dawn_Complete_Edition/'),
      ('Dark Souls', 'QLOC', 'FromSoftware Inc', 'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all. Beautifully remastered, return to Lordran in stunning high-definition detail running at 60fps.', 'DarkSouls.png', 'https://store.steampowered.com/app/570940/DARK_SOULS_REMASTERED/'),
      ('Metal Gear Solid', 'Konami Computer Entertainment Japan', 'Konami', 'Players control Solid Snake, a soldier who infiltrates a nuclear weapons facility to neutralize the terrorist threat from FOXHOUND, a renegade special forces unit. Snake must liberate hostages and stop the terrorists from launching a nuclear strike.', 'MetalGearSolid.png', 'https://www.gog.com/en/game/metal_gear_solid'),
      ('Tomb Raider Legend', 'Crystal Dynamics', 'Crystal Dynamics', 'Follow Lara Croft down a path of discovery as she travels the globe to remote, exotic locales in search of one of historys greatest artifacts, that unleashes unwelcome figures from Laras mysterious past.', 'TombRaiderLegend.png', 'https://store.steampowered.com/app/7000/Tomb_Raider_Legend/'),
      ('Apex Legends', 'Respawn Entertainment', 'Electronic Arts', 'Apex Legends is the award-winning, free-to-play Hero Shooter from Respawn Entertainment. Master an ever-growing roster of legendary characters with powerful abilities, and experience strategic squad play and innovative gameplay in the next evolution of Hero Shooter and Battle Royale.', 'Apex.png', 'https://store.steampowered.com/app/1172470/Apex_Legends/'),
      ('Assasins Creed Origins', 'Ubisoft Montreal', 'Ubisoft', 'ASSASSINS CREED ORIGINS IS A NEW BEGINNING *The Discovery Tour by Assassins Creed: Ancient Egypt is available now as a free update!* Ancient Egypt, a land of majesty and intrigue, is disappearing in a ruthless fight for power.', 'AssasinsCreedOrigins.png', 'https://store.steampowered.com/app/582160/Assassins_Creed_Origins/'),
      ('Black Desert', 'Pearl Abyss', 'Pearl Abyss', 'Played by over 20 million Adventurers - Black Desert Online is an open-world, action MMORPG. Experience intense, action-packed combat, battle massive world bosses, fight alongside friends to siege and conquer castles, and train in professions such as fishing, trading, crafting, cooking, and more!', 'BlackDesert.png', 'https://store.steampowered.com/app/582660/Black_Desert/'),
      ('Cyberpunk 2077', 'CD PROJECT RED', 'CD PROJECT RED', 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.', 'Cyberpunk2077.png', 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/'),
      ('DayZ', 'Bohemia Interactive', 'Bohemia Interactive', 'How long can you survive a post-apocalyptic world? A land overrun with an infected "zombie" population, where you compete with other survivors for limited resources. Will you team up with strangers and stay strong together? Or play as a lone wolf to avoid betrayal? This is DayZ this is your story.', 'DayZ.png', 'https://store.steampowered.com/app/221100/DayZ/'),
      ('Deep Rock Galactic', 'Ghost Ship Games', 'Coffee Stain Publishing', 'Deep Rock Galactic is a 1-4 player co-op FPS featuring badass space Dwarves, 100% destructible environments, procedurally-generated caves, and endless hordes of alien monsters.', 'DeepRockGalactic.png', 'https://store.steampowered.com/app/548430/Deep_Rock_Galactic/'),
      ('Detroit: Become Human', 'Quantic Dream', 'Quantic Dream', 'Detroit: Become Human puts the destiny of both mankind and androids in your hands, taking you to a near future where machines have become more intelligent than humans. Every choice you make affects the outcome of the game, with one of the most intricately branching narratives ever created.', 'DetroitBecomeHuman.png', 'https://store.steampowered.com/app/1222140/Detroit_Become_Human/'),
      ('Dying Light', 'Techland', 'Techland', 'First-person action survival game set in a post-apocalyptic open world overrun by flesh-hungry zombies. Roam a city devastated by a mysterious virus epidemic. Scavenge for supplies, craft weapons, and face hordes of the infected.', 'DyingLight.png', 'https://store.steampowered.com/app/239140/Dying_Light/'),
      ('Eco', 'Strange Loop Games', 'Strange Loop Games', 'Build a civilization of real people, working together to advance society and stop a meteor, all without destroying the ecosystem in the process.', 'ECO.png', 'https://store.steampowered.com/app/382310/Eco/'),
      ('Elden Ring', 'FromSoftware Inc', 'FromSoftware Inc', 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.', 'EldenRing.png', 'https://store.steampowered.com/app/1245620/ELDEN_RING/'),
      ('Far Cry 5', 'Ubisoft Montreal', 'Ubisoft', 'Discover the open world of Hope County, Montana, besieged by a fanatical doomsday cult. Dive into the action solo or two-player co-op in the story campaign, use a vast arsenal of weapons and allies, and free Hope County from Joseph Seed and his cult.', 'FarCry5.png', 'https://store.steampowered.com/app/552520/Far_Cry_5/'),
      ('Golf With Your Friends', 'Blacklight Interactive', 'Team17', 'Why have friends if not to play Golf.. With Your Friends! Nothing is out of bounds as you take on courses filled with fast paced, exciting, simultaneous mini golf for up to 12 players!', 'GolfwithyourFriends.png', 'https://store.steampowered.com/app/431240/Golf_With_Your_Friends/'),
      ('Green Hell', 'Creepy Jar', 'Creepy Jar', 'Plunge into the open world survival simulation set in the extreme conditions of the uncharted Amazon jungle. Use real-life survival techniques to craft, hunt, fight and gather resources, set a makeshift shelter or raise a fortress. Tend your wounds and maintain mental health - alone or with friends.', 'GreenHell.png', 'https://store.steampowered.com/app/815370/Green_Hell/'),
      ('Gunfire Reborn', 'Duoyi Games', 'Duoyi Games', 'Gunfire Reborn is a level-based adventure game featuring FPS, Roguelite and RPG. Players can control heroes with various abilities to experience diverse Build gameplay, use various weapons to explore procedurally-generated levels. You can play the game alone, or join 4-player coop.', 'GunfireReborn.png', 'https://store.steampowered.com/app/1217060/Gunfire_Reborn/'),
      ('Hades', 'Supergiant Games', 'Supergiant Games', 'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.', 'Hades.png', 'https://store.steampowered.com/app/1145360/Hades/'),
      ('It Takes Two', 'Hazelight', 'Electronic Arts', 'Embark on the craziest journey of your life in It Takes Two. Invite a friend to join for free with Friends Pass and work together across a huge variety of gleefully disruptive gameplay challenges. Winner of GAME OF THE YEAR at the Game Awards 2021.', 'ItTakesTwo.png', 'https://store.steampowered.com/app/1426210/It_Takes_Two/'),
      ('Lord of the Rings Online', 'Standing Stone Games LLC', 'Standing Stone Games LLC', 'In The Lord of the Rings Online™, join the worlds greatest fellowship of players in the faithful online re-creation of J. R. R. Tolkiens legendary Middle-earth. From the crumbling, shadowed ruins of Weathertop to the ageless, golden wood of Lothlórien, immerse yourself in Middle-earth as you have never seen it before. Visit the peaceful, verdant fields of the Shire, brave the dark depths of the Mines of Moria, and raise a pint at the Prancing Pony in Bree!', 'LOTRO.png', 'https://store.steampowered.com/app/212500/The_Lord_of_the_Rings_Online/'),
      ('Lost Ark', 'Smilegate RPG', 'Amazon Games', 'Embark on an odyssey for the Lost Ark in a vast, vibrant world: explore new lands, seek out lost treasures, and test yourself in thrilling action combat in this action-packed free-to-play RPG.', 'LostArk.png', 'https://store.steampowered.com/app/1599340/Lost_Ark/'),
      ('New World', 'Amazon Games', 'Amazon Games', 'Explore a thrilling, open-world MMO filled with danger and opportunity where youll forge a new destiny on the supernatural island of Aeternum.', 'NewWorld.png', 'https://store.steampowered.com/app/1063730/New_World/'),
      ('Lunch Lady', 'Manic Mice', 'Manic Mice', 'Lunch Lady is a 1-4 player online co-op survival horror game. The school final exams are coming up and the best idea you and your friends had was to steal the test answers. Find all 10 pages and dont get caught by the murderous Lunch Lady!', 'LunchLady.png', 'https://store.steampowered.com/app/1571440/Lunch_Lady/'),
      ('Middle-Earth Shadow of War', 'Monolith Productions', 'WB Games', 'Experience an epic open-world brought to life by the award-winning Nemesis System. Forge a new Ring of Power, conquer Fortresses in massive battles and dominate Mordor with your personal orc army in Middle-earth™: Shadow of War™.', 'MiddleEarthSoW.png', 'https://store.steampowered.com/app/356190/Middleearth_Shadow_of_War/'),
      ('Minecraft Dungeons', 'Mojang Studios', 'Xbox Game Studios', 'An action-adventure game inspired by classic dungeon crawlers and set in the Minecraft universe. Battle iconic mobs, embark on treasure-stuffed missions, and collect legendary items all in the Ultimate Edition.', 'MCDungeons.png', 'https://www.minecraft.net/en-us/about-dungeons'),
      ('Mincreaft Legends', 'Mojang Studios', 'Xbox Game Studios', 'Discover the mysteries of Minecraft Legends, a new action strategy game. Explore a gentle land of rich resources and lush biomes on the brink of destruction. The ravaging piglins have arrived, and its up to you to inspire your allies and lead them in strategic battles to save the Overworld!', 'MCLegends.png', 'https://store.steampowered.com/app/1928870/Minecraft_Legends/'),
      ('Path of Exile', 'Grinding Gear Games', 'Grinding Gear Games', 'You are an Exile, struggling to survive on the dark continent of Wraeclast, as you fight to earn power that will allow you to exact your revenge against those who wronged you. Path of Exile is an online Action RPG set in a dark fantasy world. The game is completely free and will never be pay-to-win.', 'POE.png', 'https://store.steampowered.com/app/238960/Path_of_Exile/'),
      ('Phasmophobia', 'Kinetic Games', 'Kinetic Games', 'Phasmophobia is a 4 player online co-op psychological horror. Paranormal activity is on the rise and its up to you and your team to use all the ghost-hunting equipment at your disposal in order to gather as much evidence as you can.', 'Phasmophobia.png', 'https://store.steampowered.com/app/739630/Phasmophobia/'),
      ('Portal', 'Valve', 'Valve', 'Portal™ is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon and will offer gamers hours of unique gameplay.', 'Portal.png', 'https://store.steampowered.com/app/400/Portal/'),
      ('Red Dead Redemption 2', 'Rockstar Games', 'Rockstar Games', 'Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online.', 'RedDead2.png', 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/'),
      ('Remnant From the Ashes', 'Gunfire Games', 'Gearbox Publishing', 'The world has been thrown into chaos by an ancient evil from another dimension. As one of the last remnants of humanity, you must set out alone or alongside up to two other survivors to face down hordes of deadly enemies to try to carve a foothold, rebuild, and retake what was lost.', 'RemnantFTA.png', 'https://store.steampowered.com/app/617290/Remnant_From_the_Ashes/'),
      ('Rocket League', 'Psyonix LLC', 'Psyonix LLC', 'Rocket League is a high-powered hybrid of arcade-style soccer and vehicular mayhem with easy-to-understand controls and fluid, physics-driven competition. Rocket League includes casual and competitive Online Matches, a fully-featured offline Season Mode, special “Mutators” that let you change the rules entirely, hockey and basketball-inspired Extra Modes, and more than 500 trillion possible cosmetic customization combinations.', 'RocketLeague.png', 'https://store.steampowered.com/app/252950/Rocket_League/'),
      ('Rust', 'Facepunch Studios', 'Facepunch Studios', 'The only aim in Rust is to survive. Everything wants you to die - the islands wildlife and other inhabitants, the environment, other survivors. Do whatever it takes to last another night.', 'Rust.png', 'https://store.steampowered.com/app/252490/Rust/'),
      ('Starbound', 'Chucklefish', 'Chucklefish', 'Youve fled your home, only to find yourself lost in space with a damaged ship. Your only option is to beam down to the planet below, repair your ship and set off to explore the universe...', 'Starbound.png', 'https://store.steampowered.com/app/211820/Starbound/'),
      ('Terraria', 'ReLogic', 'ReLogic', 'Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!', 'Terraria.png', 'https://store.steampowered.com/app/105600/Terraria/'),
      ('Tiny Tinas Wonderlands', 'Gearbox Software', '2K', 'Embark on an epic adventure full of whimsy, wonder, and high powered weaponry! Roll your own multiclass hero then shoot, loot, slash, and cast on a quest to stop the Dragon Lord.', 'TinyTina.png', 'https://store.steampowered.com/app/1286680/Tiny_Tinas_Wonderlands/'),
      ('V Rising', 'Stunlock Studios', 'Stunlock Studios', 'Awaken as a vampire. Hunt for blood in nearby settlements to regain your strength and evade the scorching sun to survive. Raise your castle and thrive in an ever-changing open world full of mystery. Gain allies online and conquer the land of the living.', 'VRising.png', 'https://store.steampowered.com/app/1604030/V_Rising/'),
      ('Warframe', 'Digital Extremes', 'Digital Extremes', 'Awaken as an unstoppable warrior and battle alongside your friends in this story-driven free to play online action game', 'Warframe.png', 'https://store.steampowered.com/app/230410/Warframe/'),
      ('Warhammer Darktide', 'Fatshark', 'Fatshark', 'Take back the city of Tertium from hordes of bloodthirsty foes in this intense and brutal action shooter. Warhammer 40,000 Darktide is the new co op focused experience from the award winning team behind the Vermintide series. As Tertium falls, Rejects Will Rise.', 'Warhammer.png', 'https://store.steampowered.com/app/1361210/Warhammer_40000_Darktide/'),
      ('The Witcher Wild Hunt', 'CD PROJECT RED', 'CD PROJECT RED', 'The game takes place in a fictional fantasy world based on Slavic mythology. Players control Geralt of Rivia, a monster slayer for hire known as a Witcher, and search for his adopted daughter, who is on the run from the otherworldly Wild Hunt.', 'TheWitcherWildHunt.png', 'https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/'),
      ('Dinkum', 'James Brendon', 'James Brendon', 'Explore tropical eucalyptus forests, survive scorching deserts, relax at cool billabongs and discover scrubland filled with adorable Aussie inspired wildlife. Collect valuable resources by hunting, mining, fishing and foraging to expand and customise your town and attract new townsfolk and businesses.', 'Dinkum.png', 'https://store.steampowered.com/app/1062520/Dinkum/'),
      ('Palia', 'Singularity 6', 'Singularity 6', 'Palia is a massively multiplayer community simulation game set in a brand new high fantasy world with elements of open world adventure games, inspired by Animal Crossing and Stardew Valley. Its a cozy and welcoming world for fans of the community sim genre.', 'Palia.png', 'https://palia.com/'),
      ('Stardew Valley', 'ConcernedApe', 'ConcernedApe', 'Youve inherited your grandfathers old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?', 'Stardew.png', 'https://store.steampowered.com/app/413150/Stardew_Valley/'),
      ('Grand Theft Auto V', 'Rockstar North', 'Rockstar Games', 'Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.', 'GrandTheftV.png', 'https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/'),
      ('Baldurs Gate 3', 'Larian Studios', 'Larian Studios', 'Baldurs Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons & Dragons, where your choices shape a tale of fellowship and betrayal, survival and sacrifice, and the lure of absolute power.', 'BaldursGate3.png', 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/'),
      ('Lethal Company', 'Zeekers', 'Zeekers', 'A co-op horror about scavenging at abandoned moons to sell scrap to the Company.', 'LethalCompany.png', 'https://store.steampowered.com/app/1966720/Lethal_Company/')
        `);

        await client.query(`
        INSERT INTO tags (gameid, name)
        VALUES
          (1, 'FPS'),
          (1, 'Multiplayer'),
          (1, 'Action'), 
          (1, 'Free to Play'),
          (1, 'Strategy'),
          (2, 'MMO'),
          (2, 'Multiplayer'),
          (2, 'Open World'),
          (2, 'Fantasy'),
          (2, 'RPG'),
          (3, 'Free to Play'),
          (3, 'FPS'),
          (3, 'Multiplayer'),
          (4, 'Battle Royale'),
          (4, 'Multiplayer'),
          (4, 'Survival'),
          (5, 'Action'),
          (5, 'Single Player'),
          (5, 'Mythology'),
          (5, 'Fantasy'),
          (6, 'GPS'),
          (6, 'RPG'),
          (6, 'Multiplayer'),
          (6, 'Mobile'),
          (7, 'FPS'),
          (7, 'Multiplayer'),
          (7, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS'),
          (1, 'FPS');



            `);
    // await client.query(`
    //   INSERT INTO leaderboard (name, description, image)
    //     VALUES
    //     ('CSGO', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('World of Warcraft', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('Splitgate', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('Fortnite', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('God of War', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),Right
    //     ('Orna', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('The Finals', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('Tombstone MMO', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('Core Keeper', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('OSRS', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('Damascus', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('Shatterline', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('Valheim', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png'),
    //     ('Horizon-Zero Dawn', 'The best game ever!', 'https://i.imgur.com/3J3wW9S.png')`);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
