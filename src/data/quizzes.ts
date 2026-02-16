export type QuizItem = {
  id: number;
  name: string;
  detail: string;
  tags: string[];
};

export type QuizProfile = {
  title: string;
  description: string;
  traits: string[];
  matchTags: string[];
};

export type Quiz = {
  id: string;
  title: string;
  subtitle: string;
  items: QuizItem[];
  profiles: Record<string, QuizProfile>;
};

export const quizzes: Quiz[] = [
  // ── FOOD ──────────────────────────────────────────────────

  {
    id: "cooking-style",
    title: "What's Your Cooking Style?",
    subtitle:
      "Pick the dishes you'd love to cook and we'll reveal your kitchen personality.",
    items: [
      { id: 1, name: "Slow-Braised Short Ribs", detail: "Low and slow, 6 hours", tags: ["patient", "comfort", "classic"] },
      { id: 2, name: "Stir-Fried Noodles", detail: "Wok hei in 5 minutes", tags: ["fast", "improviser", "asian"] },
      { id: 3, name: "Sourdough Bread", detail: "3-day fermentation", tags: ["patient", "perfectionist", "science"] },
      { id: 4, name: "Cheese Toastie", detail: "Butter, bread, cheese, done", tags: ["fast", "comfort", "minimal"] },
      { id: 5, name: "Beef Wellington", detail: "Puff pastry, duxelles, fillet", tags: ["perfectionist", "showstopper", "classic"] },
      { id: 6, name: "Fridge Clearance Frittata", detail: "Whatever needs using up", tags: ["improviser", "thrifty", "fast"] },
      { id: 7, name: "Pasta Carbonara", detail: "Eggs, guanciale, pecorino", tags: ["classic", "perfectionist", "italian"] },
      { id: 8, name: "Thai Green Curry", detail: "From-scratch paste", tags: ["adventurous", "patient", "asian"] },
      { id: 9, name: "Beans on Toast", detail: "The British classic", tags: ["comfort", "fast", "minimal"] },
      { id: 10, name: "Croissants", detail: "Laminated dough, 2 days", tags: ["perfectionist", "patient", "science"] },
      { id: 11, name: "Fish Finger Sandwich", detail: "Tartare sauce, soft white bread", tags: ["comfort", "fast", "minimal"] },
      { id: 12, name: "Paella", detail: "Saffron, seafood, socarrat", tags: ["showstopper", "patient", "adventurous"] },
      { id: 13, name: "Leftover Fried Rice", detail: "Day-old rice, soy, eggs", tags: ["improviser", "thrifty", "fast"] },
      { id: 14, name: "Macarons", detail: "Meringue, ganache, precision", tags: ["perfectionist", "showstopper", "science"] },
      { id: 15, name: "Shakshuka", detail: "Spiced tomato, eggs, crusty bread", tags: ["improviser", "adventurous", "comfort"] },
      { id: 16, name: "Roast Chicken", detail: "Sunday lunch centrepiece", tags: ["classic", "comfort", "patient"] },
      { id: 17, name: "Ceviche", detail: "Raw fish, citrus, chilli", tags: ["adventurous", "minimal", "science"] },
      { id: 18, name: "Homemade Ramen", detail: "12-hour bone broth", tags: ["patient", "perfectionist", "asian"] },
      { id: 19, name: "Pantry Pasta", detail: "Tinned tomatoes and whatever's there", tags: ["improviser", "thrifty", "fast"] },
      { id: 20, name: "Crème Brûlée", detail: "Custard, blowtorch, crack", tags: ["showstopper", "science", "classic"] },
      { id: 21, name: "Tacos al Pastor", detail: "Marinated pork, pineapple, salsa", tags: ["adventurous", "patient", "showstopper"] },
      { id: 22, name: "Omelette", detail: "Three eggs, butter, 90 seconds", tags: ["fast", "minimal", "classic"] },
      { id: 23, name: "Kimchi", detail: "Fermented cabbage, weeks of waiting", tags: ["patient", "science", "adventurous"] },
      { id: 24, name: "Banoffee Pie", detail: "Biscuit base, toffee, banana, cream", tags: ["comfort", "showstopper", "thrifty"] },
      { id: 25, name: "Dumplings from Scratch", detail: "Hand-folded, pan-fried", tags: ["patient", "perfectionist", "asian"] },
    ],
    profiles: {
      improviser: {
        title: "The Improviser",
        description:
          "You open the fridge and see possibilities, not problems. Recipes are suggestions, measurements are guidelines, and your best dishes are the ones you made up on the spot. You trust your instincts and aren't afraid to throw in a splash of 'this might work.'",
        traits: ["Creative under pressure", "Hates food waste", "Never follows a recipe exactly", "Thrives on spontaneity"],
        matchTags: ["improviser", "thrifty", "fast"],
      },
      perfectionist: {
        title: "The Perfectionist",
        description:
          "You weigh your flour, temper your chocolate, and wouldn't dream of skipping a step. Your kitchen is your laboratory and every dish is a chance to get closer to the platonic ideal. Other people say 'good enough' — you say 'one more try.'",
        traits: ["Precision-driven", "Loves technique", "Owns a digital scale", "Finds calm in repetition"],
        matchTags: ["perfectionist", "science", "patient"],
      },
      comfortKing: {
        title: "The Comfort King",
        description:
          "You cook to make people feel at home. Your signature dishes are warm, familiar, and designed to be eaten on the sofa. You believe the best meals are the ones that make you close your eyes and sigh. Michelin stars are overrated; seconds are not.",
        traits: ["Feeds people's souls", "Nostalgic palate", "Generous portions", "Believes butter is always the answer"],
        matchTags: ["comfort", "classic", "minimal"],
      },
      adventurer: {
        title: "The Flavour Adventurer",
        description:
          "Your spice rack is a world atlas and your shopping list reads like a travel itinerary. You'd rather try a new ingredient than make the same dish twice. If it's fermented, smoked, or unfamiliar, you're already reaching for your chopsticks.",
        traits: ["Fearless palate", "Loves spice shops", "Collects hot sauces", "First to order the weird thing"],
        matchTags: ["adventurous", "asian", "science"],
      },
      showstopper: {
        title: "The Showstopper",
        description:
          "You don't just cook — you perform. Every dinner party is a production, every plate is composed, and you live for the moment someone takes a bite and their eyes go wide. You'd rather spend all day on one spectacular dish than knock out five easy ones.",
        traits: ["Lives for the 'wow'", "Plates like a restaurant", "Plans menus weeks ahead", "Owns a blowtorch"],
        matchTags: ["showstopper", "perfectionist", "patient"],
      },
    },
  },

  {
    id: "cuisine-passport",
    title: "What's Your Cuisine Passport?",
    subtitle:
      "Pick the dishes that make your heart sing and we'll stamp your culinary passport.",
    items: [
      { id: 1, name: "Pho", detail: "Vietnamese, aromatic broth, herbs", tags: ["asian", "comforting", "aromatic"] },
      { id: 2, name: "Fish and Chips", detail: "British, crispy batter, mushy peas", tags: ["european", "comforting", "traditional"] },
      { id: 3, name: "Mole Poblano", detail: "Mexican, chocolate, chilli, spice", tags: ["latin", "complex", "adventurous"] },
      { id: 4, name: "Margherita Pizza", detail: "Italian, tomato, mozzarella, basil", tags: ["european", "traditional", "simple"] },
      { id: 5, name: "Bibimbap", detail: "Korean, rice, veg, gochujang", tags: ["asian", "balanced", "colourful"] },
      { id: 6, name: "Tagine", detail: "Moroccan, slow-cooked, preserved lemon", tags: ["african", "aromatic", "comforting"] },
      { id: 7, name: "Sushi Omakase", detail: "Japanese, chef's choice, precise", tags: ["asian", "refined", "adventurous"] },
      { id: 8, name: "Moussaka", detail: "Greek, aubergine, béchamel, lamb", tags: ["european", "comforting", "traditional"] },
      { id: 9, name: "Cacio e Pepe", detail: "Roman, pecorino, black pepper", tags: ["european", "simple", "traditional"] },
      { id: 10, name: "Jerk Chicken", detail: "Jamaican, scotch bonnet, allspice", tags: ["caribbean", "bold", "aromatic"] },
      { id: 11, name: "Peking Duck", detail: "Chinese, crispy skin, pancakes", tags: ["asian", "refined", "complex"] },
      { id: 12, name: "Ceviche", detail: "Peruvian, raw fish, lime, aji", tags: ["latin", "adventurous", "simple"] },
      { id: 13, name: "Butter Chicken", detail: "Indian, creamy, tomato, spice", tags: ["asian", "comforting", "aromatic"] },
      { id: 14, name: "Croissant", detail: "French, laminated, buttery, flaky", tags: ["european", "refined", "traditional"] },
      { id: 15, name: "Pad Thai", detail: "Thai, tamarind, peanuts, lime", tags: ["asian", "balanced", "bold"] },
      { id: 16, name: "Empanadas", detail: "Argentine, stuffed pastry, chimichurri", tags: ["latin", "comforting", "bold"] },
      { id: 17, name: "Ramen", detail: "Japanese, tonkotsu, 12-hour broth", tags: ["asian", "complex", "comforting"] },
      { id: 18, name: "Falafel Wrap", detail: "Middle Eastern, chickpeas, tahini", tags: ["african", "simple", "balanced"] },
      { id: 19, name: "Pierogi", detail: "Polish, stuffed dumplings, sour cream", tags: ["european", "comforting", "traditional"] },
      { id: 20, name: "Bún Chả", detail: "Vietnamese, grilled pork, noodles, herbs", tags: ["asian", "aromatic", "balanced"] },
      { id: 21, name: "Jollof Rice", detail: "West African, tomato, spice, debate", tags: ["african", "bold", "comforting"] },
      { id: 22, name: "Elote", detail: "Mexican, grilled corn, mayo, chilli", tags: ["latin", "bold", "simple"] },
      { id: 23, name: "Khachapuri", detail: "Georgian, cheese bread, egg", tags: ["european", "comforting", "adventurous"] },
      { id: 24, name: "Rendang", detail: "Indonesian, slow-cooked, coconut, spice", tags: ["asian", "complex", "aromatic"] },
      { id: 25, name: "Bangers and Mash", detail: "British, sausages, gravy, mash", tags: ["european", "comforting", "traditional"] },
    ],
    profiles: {
      globetrotter: {
        title: "The Globetrotter",
        description:
          "Your palate has no borders. You eat your way around the world without leaving your kitchen, and you're as comfortable with chopsticks as you are with a fork. If there's a cuisine you haven't tried, it's only because you haven't found it yet.",
        traits: ["Adventurous eater", "Loves markets abroad", "Wide flavour range", "Passport full of food memories"],
        matchTags: ["asian", "latin", "african", "caribbean", "adventurous"],
      },
      traditionalist: {
        title: "The Traditionalist",
        description:
          "You believe the classics are classics for a reason. A perfectly executed roast, a proper pizza, a croissant with real butter — these are the dishes that matter. You respect tradition because you know how hard it is to get the simple things right.",
        traits: ["Respects authenticity", "Values technique", "Prefers the original", "Believes in simplicity"],
        matchTags: ["traditional", "european", "simple"],
      },
      fusionArtist: {
        title: "The Fusion Artist",
        description:
          "You see connections between cuisines that others miss. Korean tacos? Miso caramel? Japanese-Italian? You love the creative collision of flavours from different traditions and believe the best dishes are often the ones that break the rules.",
        traits: ["Creative combinations", "Sees patterns across cuisines", "Rule breaker", "Flavour innovator"],
        matchTags: ["bold", "complex", "adventurous"],
      },
      comfortSeeker: {
        title: "The Comfort Seeker",
        description:
          "You eat with your heart. Whether it's a steaming bowl of pho or a plate of bangers and mash, you're drawn to dishes that feel like a warm hug. For you, the best food in the world is the food that makes you feel at home.",
        traits: ["Eats for the soul", "Loves brothy things", "Nostalgic palate", "Values warmth over novelty"],
        matchTags: ["comforting", "aromatic", "balanced"],
      },
      connoisseur: {
        title: "The Connoisseur",
        description:
          "You appreciate the finer things. An omakase counter, a Michelin-starred tasting menu, a perfectly aged cheese — you seek out dishes that represent the pinnacle of their tradition. You eat not just for pleasure, but for the craft.",
        traits: ["Appreciates mastery", "Quality over quantity", "Seeks the best version", "Refined palate"],
        matchTags: ["refined", "complex", "colourful"],
      },
    },
  },

  // ── LITERATURE ─────────────────────────────────────────────

  {
    id: "reading-personality",
    title: "What's Your Reading Personality?",
    subtitle:
      "Pick the books you've read (or would love to read) from The Times' 25 Greatest Books of the 21st Century.",
    items: [
      { id: 1, name: "White Teeth", detail: "Zadie Smith, 2000", tags: ["multicultural", "social", "contemporary"] },
      { id: 2, name: "The Amber Spyglass", detail: "Philip Pullman, 2000", tags: ["fantasy", "genre-bender", "philosophical"] },
      { id: 3, name: "English Passengers", detail: "Matthew Kneale, 2000", tags: ["historical", "dark-humor", "colonial"] },
      { id: 4, name: "Any Human Heart", detail: "William Boyd, 2002", tags: ["character-study", "life-story", "humorous"] },
      { id: 5, name: "The Curious Incident of the Dog in the Night-Time", detail: "Mark Haddon, 2003", tags: ["experimental", "unique-voice", "genre-bender"] },
      { id: 6, name: "Notes on a Scandal", detail: "Zoë Heller, 2003", tags: ["psychological", "class", "social"] },
      { id: 7, name: "1983", detail: "David Peace, 2003", tags: ["gritty", "experimental", "social"] },
      { id: 8, name: "Mother's Milk", detail: "Edward St Aubyn, 2006", tags: ["character-study", "dark-humor", "family"] },
      { id: 9, name: "Brooklyn", detail: "Colm Tóibín, 2009", tags: ["emotional", "immigrant", "family"] },
      { id: 10, name: "A Girl Is a Half-Formed Thing", detail: "Eimear McBride, 2013", tags: ["experimental", "challenging", "literary"] },
      { id: 11, name: "Outline", detail: "Rachel Cusk, 2014", tags: ["experimental", "autofiction", "literary"] },
      { id: 12, name: "The Green Road", detail: "Anne Enright, 2015", tags: ["family", "emotional", "contemporary"] },
      { id: 13, name: "Days Without End", detail: "Sebastian Barry, 2016", tags: ["historical", "love-story", "sweeping"] },
      { id: 14, name: "Golden Hill", detail: "Francis Spufford, 2016", tags: ["historical", "adventure", "literary"] },
      { id: 15, name: "Conversations with Friends", detail: "Sally Rooney, 2017", tags: ["contemporary", "relationships", "emotional"] },
      { id: 16, name: "The Silence of the Girls", detail: "Pat Barker, 2018", tags: ["historical", "feminist", "social"] },
      { id: 17, name: "Now We Shall Be Entirely Free", detail: "Andrew Miller, 2018", tags: ["historical", "thriller", "atmospheric"] },
      { id: 18, name: "Milkman", detail: "Anna Burns, 2018", tags: ["experimental", "political", "literary"] },
      { id: 19, name: "Shuggie Bain", detail: "Douglas Stuart, 2020", tags: ["character-study", "emotional", "working-class"] },
      { id: 20, name: "The Bee Sting", detail: "Paul Murray, 2023", tags: ["family", "tragicomic", "contemporary"] },
      { id: 21, name: "Never Let Me Go", detail: "Kazuo Ishiguro, 2005", tags: ["genre-bender", "philosophical", "emotional"] },
      { id: 22, name: "Atonement", detail: "Ian McEwan, 2001", tags: ["emotional", "historical", "love-story"] },
      { id: 23, name: "Small Things Like These", detail: "Claire Keegan, 2021", tags: ["emotional", "moral", "contemporary"] },
      { id: 24, name: "The Line of Beauty", detail: "Alan Hollinghurst, 2004", tags: ["class", "political", "social"] },
      { id: 25, name: "Bring Up the Bodies", detail: "Hilary Mantel, 2012", tags: ["historical", "political", "masterful"] },
    ],
    profiles: {
      explorer: {
        title: "The Literary Explorer",
        description:
          "You're drawn to books that push boundaries and challenge conventional storytelling. You appreciate experimental narrative techniques, linguistic innovation, and authors who aren't afraid to make demands of their readers. You see reading as an intellectual adventure.",
        traits: ["Intellectually curious", "Appreciates innovation", "Enjoys challenging reads", "Values artistic expression"],
        matchTags: ["experimental", "literary", "challenging"],
      },
      wanderer: {
        title: "The Historical Wanderer",
        description:
          "You love being transported to different times and places through meticulously researched historical fiction. You're fascinated by how the past illuminates the present, and you appreciate authors who can make history feel immediate and alive.",
        traits: ["Loves historical detail", "Enjoys time travel through books", "Appreciates research", "Connects past to present"],
        matchTags: ["historical", "sweeping", "atmospheric"],
      },
      realist: {
        title: "The Emotional Realist",
        description:
          "You're drawn to stories that explore the complexities of human relationships and family dynamics. You appreciate nuanced character development and aren't afraid of books that might make you cry. You read to understand the human condition.",
        traits: ["Emotionally engaged", "Values character depth", "Appreciates family stories", "Seeks human connection"],
        matchTags: ["emotional", "family", "relationships"],
      },
      bender: {
        title: "The Genre Bender",
        description:
          "You're attracted to books that blur the lines between literary fiction and genre writing. You enjoy stories that use elements of science fiction, fantasy, or mystery to explore deeper philosophical questions about what it means to be human.",
        traits: ["Open to genre mixing", "Enjoys philosophical depth", "Appreciates creative storytelling", "Questions reality"],
        matchTags: ["genre-bender", "philosophical", "fantasy"],
      },
      observer: {
        title: "The Social Observer",
        description:
          "You're fascinated by novels that examine society, class, and political systems. You appreciate authors who can dissect social dynamics with both wit and insight, revealing uncomfortable truths about how we live together.",
        traits: ["Socially conscious", "Appreciates social commentary", "Values political insight", "Enjoys satire"],
        matchTags: ["social", "political", "class"],
      },
      chronicler: {
        title: "The Character Chronicler",
        description:
          "You're most engaged by books that follow characters through significant portions of their lives. You love psychological depth, character development, and the way great authors can make you feel like you truly know someone by the final page.",
        traits: ["Character-focused", "Enjoys psychological depth", "Appreciates life stories", "Values character growth"],
        matchTags: ["character-study", "life-story", "psychological"],
      },
    },
  },

  // ── FILM ───────────────────────────────────────────────────

  {
    id: "cinema-soul",
    title: "What's Your Cinema Soul?",
    subtitle:
      "Pick the films that have stayed with you and we'll reveal what kind of filmgoer you really are.",
    items: [
      { id: 1, name: "In the Mood for Love", detail: "Wong Kar-wai, 2000", tags: ["arthouse", "romantic", "visual"] },
      { id: 2, name: "The Lord of the Rings", detail: "Peter Jackson, 2001–2003", tags: ["epic", "genre", "spectacle"] },
      { id: 3, name: "Spirited Away", detail: "Hayao Miyazaki, 2001", tags: ["animated", "genre", "visual"] },
      { id: 4, name: "City of God", detail: "Fernando Meirelles, 2002", tags: ["gritty", "social", "world"] },
      { id: 5, name: "Eternal Sunshine of the Spotless Mind", detail: "Michel Gondry, 2004", tags: ["romantic", "genre", "psychological"] },
      { id: 6, name: "No Country for Old Men", detail: "Coen Brothers, 2007", tags: ["thriller", "philosophical", "american"] },
      { id: 7, name: "There Will Be Blood", detail: "Paul Thomas Anderson, 2007", tags: ["epic", "american", "psychological"] },
      { id: 8, name: "The Dark Knight", detail: "Christopher Nolan, 2008", tags: ["genre", "spectacle", "thriller"] },
      { id: 9, name: "Parasite", detail: "Bong Joon-ho, 2019", tags: ["social", "thriller", "world"] },
      { id: 10, name: "Moonlight", detail: "Barry Jenkins, 2016", tags: ["intimate", "social", "visual"] },
      { id: 11, name: "Mad Max: Fury Road", detail: "George Miller, 2015", tags: ["spectacle", "genre", "visual"] },
      { id: 12, name: "The Grand Budapest Hotel", detail: "Wes Anderson, 2014", tags: ["arthouse", "comedy", "visual"] },
      { id: 13, name: "Drive", detail: "Nicolas Winding Refn, 2011", tags: ["arthouse", "thriller", "visual"] },
      { id: 14, name: "12 Years a Slave", detail: "Steve McQueen, 2013", tags: ["historical", "social", "epic"] },
      { id: 15, name: "The Social Network", detail: "David Fincher, 2010", tags: ["american", "psychological", "contemporary"] },
      { id: 16, name: "Amour", detail: "Michael Haneke, 2012", tags: ["arthouse", "intimate", "world"] },
      { id: 17, name: "Arrival", detail: "Denis Villeneuve, 2016", tags: ["genre", "philosophical", "intimate"] },
      { id: 18, name: "Portrait of a Lady on Fire", detail: "Céline Sciamma, 2019", tags: ["arthouse", "romantic", "world"] },
      { id: 19, name: "Get Out", detail: "Jordan Peele, 2017", tags: ["genre", "social", "american"] },
      { id: 20, name: "The Banshees of Inisherin", detail: "Martin McDonagh, 2022", tags: ["comedy", "philosophical", "intimate"] },
      { id: 21, name: "Everything Everywhere All at Once", detail: "Daniels, 2022", tags: ["genre", "spectacle", "comedy"] },
      { id: 22, name: "Pan's Labyrinth", detail: "Guillermo del Toro, 2006", tags: ["genre", "world", "visual"] },
      { id: 23, name: "Whiplash", detail: "Damien Chazelle, 2014", tags: ["intimate", "psychological", "american"] },
      { id: 24, name: "Under the Skin", detail: "Jonathan Glazer, 2013", tags: ["arthouse", "genre", "philosophical"] },
      { id: 25, name: "The Act of Killing", detail: "Joshua Oppenheimer, 2012", tags: ["documentary", "world", "gritty"] },
    ],
    profiles: {
      aesthete: {
        title: "The Aesthete",
        description:
          "You watch films with your eyes wide open. Composition, colour palette, lighting — you notice what others miss. For you, cinema is a visual art first and foremost, and the best films are the ones that make every frame feel like a painting.",
        traits: ["Visually driven", "Appreciates cinematography", "Drawn to beauty", "Finds meaning in images"],
        matchTags: ["arthouse", "visual", "world"],
      },
      thrill: {
        title: "The Edge-of-Seater",
        description:
          "You go to the cinema to feel something. Tension, surprise, the grip of a story you can't look away from — that's what you're after. You love a film that keeps you guessing and punishes you for blinking.",
        traits: ["Loves suspense", "Appreciates plot craft", "Lives for twists", "High engagement"],
        matchTags: ["thriller", "psychological", "gritty"],
      },
      blockbuster: {
        title: "The Spectacle Lover",
        description:
          "You believe cinema should be bigger than life. Epic scope, stunning set pieces, and the kind of ambition that fills an IMAX screen — that's your sweet spot. You don't just watch films, you experience them.",
        traits: ["Loves scale", "Appreciates spectacle", "Cinema as event", "Drawn to ambition"],
        matchTags: ["spectacle", "epic", "genre"],
      },
      humanist: {
        title: "The Humanist",
        description:
          "You're drawn to films about real people in real situations. The quieter the drama, the louder it hits you. You believe the most powerful stories are the ones that hold a mirror up to how we actually live, love, and fail.",
        traits: ["Values authenticity", "Emotionally engaged", "Prefers character to plot", "Finds beauty in the ordinary"],
        matchTags: ["intimate", "social", "romantic"],
      },
      cosmopolitan: {
        title: "The Cosmopolitan",
        description:
          "Your watchlist reads like a world cinema festival programme. You seek out films from every continent, in every language, because you know the best stories aren't all told in English. Subtitles are not a barrier — they're an invitation.",
        traits: ["Seeks world cinema", "Broad cultural taste", "Loves discovery", "Anti-parochial"],
        matchTags: ["world", "documentary", "historical"],
      },
    },
  },

  // ── MUSIC ──────────────────────────────────────────────────

  {
    id: "music-dna",
    title: "What's Your Music DNA?",
    subtitle:
      "Pick the albums and artists that define your taste and we'll decode your musical identity.",
    items: [
      { id: 1, name: "Radiohead — Kid A", detail: "Electronic reinvention, 2000", tags: ["experimental", "electronic", "cerebral"] },
      { id: 2, name: "Amy Winehouse — Back to Black", detail: "Soul, heartbreak, 2006", tags: ["soul", "classic", "emotional"] },
      { id: 3, name: "Kendrick Lamar — To Pimp a Butterfly", detail: "Jazz-rap opus, 2015", tags: ["hiphop", "political", "experimental"] },
      { id: 4, name: "Adele — 21", detail: "Power ballads, 2011", tags: ["pop", "emotional", "classic"] },
      { id: 5, name: "Arcade Fire — Funeral", detail: "Anthemic indie, 2004", tags: ["indie", "emotional", "anthemic"] },
      { id: 6, name: "Beyoncé — Lemonade", detail: "Visual album, 2016", tags: ["pop", "political", "genre-crossing"] },
      { id: 7, name: "Arctic Monkeys — Whatever People Say I Am", detail: "Sheffield guitar debut, 2006", tags: ["indie", "guitar", "british"] },
      { id: 8, name: "Daft Punk — Discovery", detail: "French house masterpiece, 2001", tags: ["electronic", "dance", "pop"] },
      { id: 9, name: "Frank Ocean — Blonde", detail: "Introspective R&B, 2016", tags: ["soul", "experimental", "intimate"] },
      { id: 10, name: "The Strokes — Is This It", detail: "NYC garage revival, 2001", tags: ["indie", "guitar", "classic"] },
      { id: 11, name: "Burial — Untrue", detail: "Dubstep ambient, 2007", tags: ["electronic", "atmospheric", "cerebral"] },
      { id: 12, name: "Taylor Swift — Folklore", detail: "Indie pivot, 2020", tags: ["pop", "intimate", "anthemic"] },
      { id: 13, name: "Fela Kuti — Best Of", detail: "Afrobeat originator", tags: ["world", "political", "dance"] },
      { id: 14, name: "LCD Soundsystem — Sound of Silver", detail: "Dance-rock, 2007", tags: ["electronic", "indie", "dance"] },
      { id: 15, name: "Bon Iver — For Emma, Forever Ago", detail: "Cabin folk, 2007", tags: ["intimate", "atmospheric", "emotional"] },
      { id: 16, name: "Kanye West — My Beautiful Dark Twisted Fantasy", detail: "Maximalist hip-hop, 2010", tags: ["hiphop", "genre-crossing", "anthemic"] },
      { id: 17, name: "PJ Harvey — Let England Shake", detail: "War and landscape, 2011", tags: ["guitar", "political", "british"] },
      { id: 18, name: "Tyler, the Creator — Igor", detail: "Genre-bending pop, 2019", tags: ["hiphop", "experimental", "genre-crossing"] },
      { id: 19, name: "Billie Eilish — When We All Fall Asleep", detail: "Dark bedroom pop, 2019", tags: ["pop", "atmospheric", "intimate"] },
      { id: 20, name: "The National — Boxer", detail: "Literary rock, 2007", tags: ["indie", "cerebral", "emotional"] },
      { id: 21, name: "D'Angelo — Voodoo", detail: "Neo-soul landmark, 2000", tags: ["soul", "classic", "genre-crossing"] },
      { id: 22, name: "Massive Attack — Mezzanine", detail: "Trip-hop darkness, 1998", tags: ["electronic", "atmospheric", "cerebral"] },
      { id: 23, name: "Sufjan Stevens — Carrie & Lowell", detail: "Grief folk, 2015", tags: ["intimate", "emotional", "atmospheric"] },
      { id: 24, name: "Little Simz — Sometimes I Might Be Introvert", detail: "UK rap, 2021", tags: ["hiphop", "british", "anthemic"] },
      { id: 25, name: "Khruangbin — Con Todo El Mundo", detail: "Thai-funk-soul, 2018", tags: ["world", "dance", "atmospheric"] },
    ],
    profiles: {
      headphones: {
        title: "The Headphones Hermit",
        description:
          "Music is a private experience for you. You listen closely, deeply, and preferably alone. You notice the production details, the buried harmonies, the way a song builds. You don't need a crowd — you need a good pair of headphones and an hour.",
        traits: ["Deep listener", "Production nerd", "Values atmosphere", "Prefers albums to playlists"],
        matchTags: ["atmospheric", "cerebral", "intimate"],
      },
      dancefloor: {
        title: "The Dancefloor Convert",
        description:
          "Music lives in your body. You feel the beat before you hear the melody, and your favourite tracks are the ones that make a room move. Whether it's a festival, a club, or your kitchen, you believe music should make you dance.",
        traits: ["Beat-driven", "Loves live music", "Moves first, thinks later", "Energy over lyrics"],
        matchTags: ["electronic", "dance", "pop"],
      },
      crate: {
        title: "The Crate Digger",
        description:
          "You live for the deep cut, the B-side, the album nobody else has heard. You'd rather spend a Saturday in a record shop than at a gig, and your recommendations come with a paragraph of context. Music history is your happy place.",
        traits: ["Obsessive collector", "Loves context", "Values originality", "Anti-mainstream"],
        matchTags: ["experimental", "world", "classic"],
      },
      anthemist: {
        title: "The Anthemist",
        description:
          "You want music that makes you feel something enormous. The soaring chorus, the emotional crescendo, the song that makes a stadium sing as one — that's your church. You believe the best music is the kind that gives you goosebumps.",
        traits: ["Lives for the chorus", "Emotional listener", "Loves a big moment", "Sings along always"],
        matchTags: ["anthemic", "emotional", "indie"],
      },
      activist: {
        title: "The Sonic Activist",
        description:
          "For you, music is never just music. It's a voice, a protest, a mirror held up to society. You're drawn to artists who have something to say, and you believe the best songs change the way people think.",
        traits: ["Lyrics-first listener", "Values authenticity", "Music as message", "Drawn to outsiders"],
        matchTags: ["political", "hiphop", "guitar"],
      },
    },
  },

  // ── TRAVEL ─────────────────────────────────────────────────

  {
    id: "travel-style",
    title: "What's Your Travel Style?",
    subtitle:
      "Pick the travel experiences that excite you and we'll reveal what kind of traveller you are.",
    items: [
      { id: 1, name: "Night train across Europe", detail: "Sleeper berth, border crossings, coffee at dawn", tags: ["slow", "romantic", "european"] },
      { id: 2, name: "Street food tour in Bangkok", detail: "Stall to stall, eating everything", tags: ["adventurous", "food", "immersive"] },
      { id: 3, name: "Five-star hotel with a view", detail: "Robe, room service, zero plans", tags: ["luxury", "comfort", "curated"] },
      { id: 4, name: "Backpacking through Southeast Asia", detail: "Hostel to hostel, no itinerary", tags: ["adventurous", "budget", "spontaneous"] },
      { id: 5, name: "A week in a Tuscan farmhouse", detail: "Wine, olive oil, long lunches", tags: ["slow", "food", "european"] },
      { id: 6, name: "Museum marathon in a new city", detail: "Gallery, gallery, coffee, gallery", tags: ["cultural", "curated", "urban"] },
      { id: 7, name: "Hiking the Camino de Santiago", detail: "Weeks of walking, thinking, simplicity", tags: ["active", "slow", "spiritual"] },
      { id: 8, name: "Road trip with no destination", detail: "Just drive, stop when it looks good", tags: ["spontaneous", "adventurous", "romantic"] },
      { id: 9, name: "Ryokan in rural Japan", detail: "Tatami, onsen, silence", tags: ["cultural", "luxury", "immersive"] },
      { id: 10, name: "Surfing in Portugal", detail: "Waves, seafood, sunburn", tags: ["active", "spontaneous", "european"] },
      { id: 11, name: "Architecture tour of a city", detail: "Brutalist, Art Deco, Gothic — all of it", tags: ["cultural", "urban", "curated"] },
      { id: 12, name: "Camping under the stars", detail: "Fire, sleeping bag, no signal", tags: ["active", "budget", "spiritual"] },
      { id: 13, name: "Christmas markets in Vienna", detail: "Mulled wine, strudel, fairy lights", tags: ["comfort", "european", "food"] },
      { id: 14, name: "Volunteering abroad", detail: "Making yourself useful somewhere new", tags: ["immersive", "spiritual", "budget"] },
      { id: 15, name: "A villa with friends", detail: "Pool, barbecue, arguments about music", tags: ["comfort", "spontaneous", "food"] },
      { id: 16, name: "Solo trip to a city you've never been", detail: "Nobody's schedule but yours", tags: ["urban", "spontaneous", "cultural"] },
      { id: 17, name: "Safari in East Africa", detail: "Wildlife, landscape, sundowners", tags: ["adventurous", "luxury", "immersive"] },
      { id: 18, name: "Literary pilgrimage", detail: "Joyce's Dublin, Hemingway's Paris", tags: ["cultural", "slow", "curated"] },
      { id: 19, name: "Island hopping in Greece", detail: "Ferry, beach, taverna, repeat", tags: ["spontaneous", "comfort", "european"] },
      { id: 20, name: "Learning to cook in Oaxaca", detail: "Markets, mole, mezcal", tags: ["immersive", "food", "cultural"] },
      { id: 21, name: "Northern Lights in Iceland", detail: "Cold, dark, worth it", tags: ["adventurous", "spiritual", "active"] },
      { id: 22, name: "Boutique hotel in Marrakech", detail: "Riad, courtyard, mint tea", tags: ["luxury", "curated", "immersive"] },
      { id: 23, name: "Weekend in a bookshop town", detail: "Hay-on-Wye, browsing for hours", tags: ["slow", "cultural", "comfort"] },
      { id: 24, name: "Motorbiking through Vietnam", detail: "Chaos, beauty, noodle stops", tags: ["adventurous", "active", "spontaneous"] },
      { id: 25, name: "Writing retreat somewhere remote", detail: "Cabin, silence, deadline", tags: ["slow", "spiritual", "romantic"] },
    ],
    profiles: {
      wanderer: {
        title: "The Wanderer",
        description:
          "You travel without a plan and like it that way. The best moments are the unscripted ones — the restaurant a local pointed you to, the detour that became the highlight, the wrong turn that led somewhere perfect. You trust the road.",
        traits: ["Spontaneous", "Hates itineraries", "Follows instinct", "Collects stories, not photos"],
        matchTags: ["spontaneous", "adventurous", "romantic"],
      },
      culturalist: {
        title: "The Culturalist",
        description:
          "You travel to learn. Every trip is a chance to understand how other people live, what they've built, and why it matters. Museums, architecture, history, food — you want the full picture, and you'll read the guidebook cover to cover.",
        traits: ["Curious mind", "Loves museums", "Researches before going", "Travels to understand"],
        matchTags: ["cultural", "curated", "urban"],
      },
      slowTraveller: {
        title: "The Slow Traveller",
        description:
          "You'd rather spend a week in one place than three days in three cities. You want to learn the neighbourhood, find a regular coffee spot, and live somewhere instead of just visiting. Speed is the enemy of experience.",
        traits: ["Depth over breadth", "Hates rushing", "Loves routine abroad", "Settles in quickly"],
        matchTags: ["slow", "food", "european"],
      },
      explorer: {
        title: "The Explorer",
        description:
          "You're drawn to the places that are hard to reach. Deserts, mountains, jungles, islands — the further from the familiar, the more alive you feel. You don't travel to relax; you travel to be changed.",
        traits: ["Seeks the remote", "Physically active", "Thrives outside comfort zone", "Light packer"],
        matchTags: ["active", "spiritual", "budget"],
      },
      luxurist: {
        title: "The Luxurist",
        description:
          "You believe travel should be a treat, not an endurance test. The right hotel, the perfect restaurant, a well-planned itinerary — you travel to enjoy the best of what a place has to offer, and you see nothing wrong with a little indulgence.",
        traits: ["Appreciates quality", "Values comfort", "Plans carefully", "Believes travel is a reward"],
        matchTags: ["luxury", "comfort", "immersive"],
      },
    },
  },

  // ── ART ────────────────────────────────────────────────────

  {
    id: "art-eye",
    title: "What's Your Art Eye?",
    subtitle:
      "Pick the works and movements that stop you in your tracks and we'll reveal your gallery personality.",
    items: [
      { id: 1, name: "Monet's Water Lilies", detail: "Impressionism, light on water", tags: ["impressionist", "nature", "serene"] },
      { id: 2, name: "Banksy's street art", detail: "Stencils, subversion, walls", tags: ["contemporary", "political", "accessible"] },
      { id: 3, name: "Rothko's colour fields", detail: "Standing in front, feeling everything", tags: ["abstract", "emotional", "immersive"] },
      { id: 4, name: "Vermeer's Girl with a Pearl Earring", detail: "Quiet, luminous, perfect", tags: ["classical", "intimate", "craft"] },
      { id: 5, name: "Kusama's Infinity Rooms", detail: "Dots, mirrors, the infinite", tags: ["contemporary", "immersive", "spectacle"] },
      { id: 6, name: "Picasso's Guernica", detail: "War, anguish, cubism", tags: ["modern", "political", "emotional"] },
      { id: 7, name: "Hokusai's Great Wave", detail: "Ukiyo-e, power, precision", tags: ["classical", "nature", "craft"] },
      { id: 8, name: "Hockney's pool paintings", detail: "California light, flatness, joy", tags: ["modern", "accessible", "serene"] },
      { id: 9, name: "Frida Kahlo's self-portraits", detail: "Pain, identity, defiance", tags: ["modern", "emotional", "intimate"] },
      { id: 10, name: "Ai Weiwei's installations", detail: "Dissidence, scale, provocation", tags: ["contemporary", "political", "spectacle"] },
      { id: 11, name: "Turner's seascapes", detail: "Storm, light, the sublime", tags: ["impressionist", "nature", "emotional"] },
      { id: 12, name: "Basquiat's crowns and skulls", detail: "Raw, urgent, electric", tags: ["contemporary", "emotional", "accessible"] },
      { id: 13, name: "Caravaggio's chiaroscuro", detail: "Drama, darkness, divinity", tags: ["classical", "craft", "immersive"] },
      { id: 14, name: "Yoko Ono's instruction pieces", detail: "Imagine, participate, question", tags: ["conceptual", "political", "intimate"] },
      { id: 15, name: "Edward Hopper's Nighthawks", detail: "Loneliness, diners, city light", tags: ["modern", "intimate", "serene"] },
      { id: 16, name: "Olafur Eliasson's Weather Project", detail: "Sun in the Turbine Hall", tags: ["contemporary", "immersive", "spectacle"] },
      { id: 17, name: "Klimt's The Kiss", detail: "Gold leaf, intimacy, decoration", tags: ["modern", "intimate", "craft"] },
      { id: 18, name: "Duchamp's Fountain", detail: "A urinal that changed everything", tags: ["conceptual", "modern", "political"] },
      { id: 19, name: "Georgia O'Keeffe's flowers", detail: "Scale, colour, New Mexico", tags: ["modern", "nature", "serene"] },
      { id: 20, name: "Anish Kapoor's sculptures", detail: "Voids, reflection, scale", tags: ["contemporary", "abstract", "spectacle"] },
      { id: 21, name: "Rembrandt's self-portraits", detail: "Ageing, honesty, mastery", tags: ["classical", "intimate", "craft"] },
      { id: 22, name: "Mondrian's grids", detail: "Primary colours, right angles, purity", tags: ["abstract", "modern", "conceptual"] },
      { id: 23, name: "Grayson Perry's pots", detail: "Craft, class, commentary", tags: ["contemporary", "accessible", "political"] },
      { id: 24, name: "The Sistine Chapel ceiling", detail: "Michelangelo, sacred, overwhelming", tags: ["classical", "immersive", "craft"] },
      { id: 25, name: "Marina Abramović's performances", detail: "Endurance, presence, confrontation", tags: ["conceptual", "emotional", "spectacle"] },
    ],
    profiles: {
      classicist: {
        title: "The Classicist",
        description:
          "You believe art peaked somewhere between Caravaggio and Vermeer. You appreciate technique, mastery, and the kind of skill that takes a lifetime to develop. A gallery, for you, is a place of quiet reverence.",
        traits: ["Values craftsmanship", "Appreciates tradition", "Patient observer", "Respects mastery"],
        matchTags: ["classical", "craft", "intimate"],
      },
      feeler: {
        title: "The Feeler",
        description:
          "Art hits you in the gut. You don't analyse it first — you feel it. A Rothko makes you cry, a Kahlo makes you ache, and you judge every artwork by one question: did it move me?",
        traits: ["Emotionally led", "Trusts instinct", "Values expression", "Art as therapy"],
        matchTags: ["emotional", "immersive", "abstract"],
      },
      provocateur: {
        title: "The Provocateur",
        description:
          "You think art should challenge, disrupt, and occasionally outrage. You love the artists who break rules, question power, and make people uncomfortable. If nobody's arguing about it, is it really art?",
        traits: ["Loves controversy", "Values ideas over beauty", "Anti-establishment", "Intellectually driven"],
        matchTags: ["political", "conceptual", "contemporary"],
      },
      flâneur: {
        title: "The Flâneur",
        description:
          "You wander through galleries the way you wander through cities — open, unhurried, delighted by whatever catches your eye. You don't need to understand art to enjoy it. You just need to be present.",
        traits: ["Open to anything", "Relaxed observer", "Values surprise", "No pretension"],
        matchTags: ["accessible", "serene", "nature"],
      },
      spectator: {
        title: "The Experience Seeker",
        description:
          "You want art you can walk into, be surrounded by, and lose yourself in. Immersive installations, monumental sculptures, light shows — you believe art should be an event, not just something on a wall.",
        traits: ["Loves immersion", "Drawn to scale", "Wants the wow factor", "Art as experience"],
        matchTags: ["spectacle", "immersive", "contemporary"],
      },
    },
  },
];
