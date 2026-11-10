// Topic tags let visitors filter the Resources page across the ten categories below.
// Filters combine as OR within a tag group and AND across groups (e.g. "Europe" + "Security & Conflict").
export const tagGroups = [
    {
        label: "Subject",
        tags: [
            { id: "democracy", label: "Democracy & Governance" },
            { id: "diplomacy", label: "Diplomacy & Foreign Policy" },
            { id: "security", label: "Security & Conflict" },
            { id: "economics", label: "Economics & Development" },
            { id: "environment", label: "Environment, Energy & Food" },
            { id: "health", label: "Global Health" },
            { id: "rights", label: "Migration & Human Rights" },
            { id: "society", label: "Population & Public Opinion" },
            { id: "media", label: "Media Literacy" },
        ],
    },
    {
        label: "Region",
        tags: [
            { id: "americas", label: "Americas" },
            { id: "asia", label: "Asia & Pacific" },
            { id: "europe", label: "Europe" },
            { id: "middle-east", label: "Middle East" },
        ],
    },
    {
        label: "Format",
        tags: [
            { id: "newsletters", label: "Newsletters" },
            { id: "podcasts", label: "Podcasts" },
        ],
    },
] as const;

export type TagId = (typeof tagGroups)[number]["tags"][number]["id"];
export const tagLabels = Object.fromEntries(tagGroups.flatMap((group) => group.tags.map((tag) => [tag.id, tag.label]))) as Record<TagId, string>;

export type Resource = { name: string; href?: string; desc?: string; tags?: TagId[] }; // no href = shown without a link
export type ResourceGroup = { title: string; items: Resource[] };
export type ResourceTopic = { id: string; title: string; intro?: string; items: Resource[]; groups?: ResourceGroup[] };

export const resourceTopics: ResourceTopic[] = [
    {
        id: "democracy",
        title: "Democracy",
        items: [
            { name: "Journal of Democracy", href: "https://www.journalofdemocracy.org/", desc: "Recognized by the New York Times and The Wall Street Journal as an influential international forum for scholarly analysis and competing democratic viewpoints. Website has free content; Journal requires paid subscription.", tags: ["democracy"] },
            { name: "National Endowment for Democracy", href: "https://www.ned.org/", desc: "Dedicated to strengthening of democratic institutions around the world through current news, resources, intellectual exchange, and grants.", tags: ["democracy", "rights"] },
            { name: "Renew Democracy Initiative", href: "https://rdi.org/", desc: "Provides information to increase understanding of democracy’s importance in our lives in the U.S. as well as globally, includes a weekly newsletter.", tags: ["democracy", "newsletters"] },
        ],
    },
    {
        id: "directories",
        title: "Directories of International Resources",
        items: [
            { name: "Library of Congress – Globalization Resource Guide", href: "https://guides.loc.gov/globalization", tags: ["economics"] },
            { name: "The WWW Virtual Library: International Affairs Resources", href: "http://www2.etown.edu/vl/", tags: ["diplomacy"] },
        ],
    },
    {
        id: "foreign-affairs",
        title: "Foreign Affairs – General",
        items: [
            { name: "Foreign Affairs", href: "https://www.foreignaffairs.com/", desc: "Access to its magazine and broad foreign affairs content with a paid subscription, or sign up for one of its five newsletters.", tags: ["diplomacy", "newsletters"] },
            { name: "Foreign Policy", href: "https://foreignpolicy.com/", desc: "Access to its magazine, podcasts, special reports for a paid subscription or sign up for any of its eight different newsletters that provide global analysis, reports and news.", tags: ["diplomacy", "newsletters", "podcasts"] },
            { name: "Geopolitical Futures", href: "https://geopoliticalfutures.com/", desc: "Publication dedicated to explaining and predicting the course of the international system.", tags: ["diplomacy", "security"] },
            { name: "US Department of State", href: "https://www.state.gov/", desc: "Provides information on foreign affairs policy issues, fact sheets on foreign countries, travel advisories and much more.", tags: ["diplomacy"] },
            { name: "World Affairs Journal", desc: "Leading journal published in India that seeks to provide the Asian and developing world perspective on issues of global significance.", tags: ["diplomacy", "asia"] },
        ],
    },
    {
        id: "research",
        title: "Global Research, Policy, and/or Information Sharing Organizations",
        items: [
            { name: "Arab Gulf States Institute in Washington", href: "https://agsiw.org/", desc: "Provides expert analysis on economic, energy, environmental, security and political dimensions of Gulf Arab states and their relations with US and other countries.", tags: ["economics", "environment", "security", "middle-east"] },
            { name: "Arena, Stavros Niarchos Foundation (SNF) Agora Institute (Johns Hopkins)", href: "https://snfagora.jhu.edu/", desc: "Creates and disseminates best practice information for overcoming disinformation and polarization.", tags: ["democracy", "media"] },
            { name: "Atlantic Council", href: "https://www.atlanticcouncil.org/", desc: "Publishes papers and promotes engagement to shape policy choices and strategies to create a more free, secure and prosperous world.", tags: ["diplomacy", "security"] },
            { name: "Australian Institute of International Affairs", href: "https://www.internationalaffairs.org.au/", desc: "Australia’s longest-existing private research institute on politics and international relations (it is precluded by its constitution from taking political positions on international affairs). It holds more than 150 events annually, most of which are accessible online, and publishes a Journal of International Affairs, papers and articles.", tags: ["diplomacy", "asia"] },
            { name: "Bank for International Settlements", href: "https://www.bis.org/", desc: "Serves as bank for central banks to support monetary and financial stability. Website includes research publications, speeches and statistical data.", tags: ["economics"] },
            { name: "Brookings International Affairs", href: "https://www.brookings.edu/programs/foreign-policy/", desc: "Brings together more than 300 leading experts in government and academia from across the world to provide analysis on international issues.", tags: ["diplomacy"] },
            { name: "Brookings Center for Middle East Policy", href: "https://www.brookings.edu/centers/center-for-middle-east-policy/", desc: "Conducts research to illuminate the issues shaping U.S. policy toward the Middle East and major trends affecting the lives of the people who live there, with an emphasis on sources of instability across the region.", tags: ["security", "diplomacy", "middle-east"] },
            { name: "Carnegie Endowment for International Peace", href: "https://carnegieendowment.org/", desc: "Generates strategic ideas, independent analysis, supports diplomacy, and trains next generation international scholar-practitioners to address most difficult global problems and safeguard peace.", tags: ["diplomacy", "security"] },
            { name: "Cato Institute", href: "https://www.cato.org/", desc: "Promotes understanding of benefits of market-liberal policies, open global economy, and principled/restrained foreign policy.", tags: ["economics", "diplomacy"] },
            { name: "Centre for Economic Policy Research", href: "https://cepr.org/", desc: "Europe’s leading network of Economic Policy Researchers.", tags: ["economics", "europe"] },
            { name: "Center for Strategic and International Studies (CSIS)", href: "https://www.csis.org/", desc: "Dedicated to advancing ideas to address the world’s greatest challenges.", tags: ["security", "diplomacy"] },
            { name: "Centre for the Study of Globalisation and Regionalisation (University of Warwick)", href: "https://warwick.ac.uk/fac/soc/pais/research/csgr/", desc: "Advances research and analysis of the changing dynamics of global (dis-)order.", tags: ["economics", "diplomacy", "europe"] },
            { name: "Chatham House", href: "https://www.chathamhouse.org/", desc: "Independent policy institute that helps people, societies and governments understand and adapt to seismic global issues. They provide thought leadership through networks of policy experts, research, and publications (International Affairs, Journal of Cyber Policy, The World Today) and podcasts (Undercurrents). You can also subscribe to their newsletter.", tags: ["diplomacy", "europe", "newsletters", "podcasts"] },
            { name: "Council on Foreign Relations (CFR)", href: "https://www.cfr.org/", desc: "Provides information and analysis to help people better understand the world and foreign policy choices facing the U.S. and other countries. See also: US Foreign Policy.", tags: ["diplomacy"] },
            { name: "Economic Policy Institute: Trade and Globalization", href: "https://www.epi.org/research/trade-and-globalization/", desc: "Researches economic benefits of trade agreements, curbing currency manipulation and other unfair trade practices.", tags: ["economics"] },
            { name: "George C. Marshall European Center for Security Studies", href: "https://www.marshallcenter.org/", desc: "Addresses regional and transnational security issues for U.S. and German defense services.", tags: ["security", "europe"] },
            { name: "German Marshall Fund of the United States (GMF)", href: "https://www.gmfus.org/", desc: "Policy organization committed to the idea that the U.S. and Europe are stronger together, and works on issues critical to transatlantic interests in the 21st century.", tags: ["diplomacy", "europe"] },
            { name: "Hoover Institution (Stanford University)", href: "https://www.hoover.org/", desc: "Research center dedicated to generating policy ideas that promote economic opportunity and prosperity and safeguard peace for America and all mankind.", tags: ["economics", "security"] },
            { name: "Institute of International and European Affairs", href: "https://www.iiea.com/", desc: "Ireland’s leading think tank of European and International affairs.", tags: ["diplomacy", "europe"] },
            { name: "Institute for War & Peace Reporting", href: "https://iwpr.net/", desc: "Gives voice to people at the front lines of conflict and transition in countries around the world to help them drive change. Includes videos, reports and newsletter.", tags: ["security", "rights", "newsletters"] },
            { name: "International Migration Institute", href: "https://www.migrationinstitute.org/", desc: "Advance thinking on migration as an intrinsic part of global change and development. Website includes working papers, data and research.", tags: ["rights"] },
            { name: "McCain Institute for International Leadership", href: "https://www.mccaininstitute.org/", desc: "Provides reports, podcasts, blogs and action groups to secure democracy, defend human rights, protect the vulnerable and advance character-driven leadership at home and around the world.", tags: ["democracy", "rights", "podcasts"] },
            { name: "National Bureau of Economic Research", href: "https://www.nber.org/", desc: "Economic research that is primarily U.S. focused, but includes some international issues.", tags: ["economics"] },
            { name: "Peterson Institute for International Economics", href: "https://www.piie.com/", desc: "Dedicated to strengthening prosperity and human welfare in the global economy through expert analysis and practical policy solutions.", tags: ["economics"] },
            { name: "Pew Research Center", href: "https://www.pewresearch.org/", desc: "“Fact tank” that informs the public about issues, attitudes and trends shaping the world – their role is nonpartisan and nonadvocacy.", tags: ["society"] },
            { name: "RAND Corporation – International Affairs", href: "https://www.rand.org/topics/international-affairs.html", desc: "Research cuts across a range of global issues that include economies and trade, diplomacy, global health, nation building, and regional security and stability.", tags: ["security", "economics", "health", "diplomacy"] },
            { name: "The American Academy of Diplomacy", href: "https://www.academyofdiplomacy.org/", desc: "Provides publications to strengthen U.S. diplomacy and enhance public appreciation of its critical role in advancing national interests.", tags: ["diplomacy"] },
            { name: "The Washington Institute for Near East Policy", href: "https://www.washingtoninstitute.org/", desc: "Conducts research and sponsors policy debates to advance a balanced and realistic understanding of American interests in the Middle East and to promote policies that secure them.", tags: ["diplomacy", "middle-east"] },
            { name: "United States Institute of Peace", href: "https://www.usip.org/", desc: "Links research, policy, training, analysis and direct action to support those working to build a more peaceful, inclusive world.", tags: ["security", "diplomacy"] },
            { name: "Woodrow Wilson International Center", href: "https://www.wilsoncenter.org/", desc: "Policy forum for tackling global issues through independent research and open dialogue. In 2019, named #1 regional studies think tank in the world.", tags: ["diplomacy"] },
            { name: "World Economic Forum: Strategic Intelligence", href: "https://intelligence.weforum.org/", desc: "Provides analysis of issues and forces driving transformational change across economies, industries and global issues.", tags: ["economics"] },
        ],
    },
    {
        id: "data",
        title: "International Data",
        items: [
            { name: "Armed Conflict Database (Uppsala University)", href: "https://ucdp.uu.se/", desc: "Good source for data going back to 1970s on conflict-affected countries.", tags: ["security"] },
            { name: "Central Intelligence Agency World Factbook", href: "https://www.cia.gov/the-world-factbook/", desc: "Provides basic intelligence on government, economy, energy, environment, military, terrorism and transnational issues for 266 world entities.", tags: ["economics", "environment", "security"] },
            { name: "Earth System Research Laboratory / Global Monitoring Laboratory", href: "https://gml.noaa.gov/ccgg/trends/", desc: "A dataset on average rise in CO2 levels and causes.", tags: ["environment"] },
            { name: "Atlas of Economic Complexity", href: "https://atlas.hks.harvard.edu/", desc: "Harvard Growth Lab’s research and data visualization tool to understand the economic dynamics and new growth opportunities for every country worldwide.", tags: ["economics"] },
            { name: "Gapminder", href: "https://www.gapminder.org/", desc: "Mitigates systematic misconceptions about important global trends with reliable data.", tags: ["economics", "health", "society"] },
            { name: "Institute for Health Metrics and Evaluation (University of Washington)", href: "https://www.healthdata.org/", desc: "Provides comparable measurement of the world’s most important health problems.", tags: ["health"] },
            { name: "International Energy Agency", href: "https://www.iea.org/data-and-statistics", desc: "Provides data on energy production and consumption by country.", tags: ["environment"] },
            { name: "World Economic Forum", href: "https://www.weforum.org/", desc: "3D map of the world population.", tags: ["society"] },
            { name: "OECD Aid Database", href: "https://www.oecd.org/dac/", desc: "Provides high level overviews of countries as well as sector specific data.", tags: ["economics"] },
            { name: "Pew Research Center Global Indicators Database", href: "https://www.pewresearch.org/global/database/", desc: "Contains data from over 600,000 interviews in 69 countries with tools to query data by question topic and region/country.", tags: ["society"] },
            { name: "Statista", href: "https://www.statista.com/chartoftheday/", desc: "Provides daily infographics that tell global stories visually.", tags: ["society"] },
            { name: "Transparency International’s Corruption Perceptions Index", href: "https://www.transparency.org/en/cpi", desc: "Gives a measure of corruption based on surveys with real businesses and investors.", tags: ["democracy", "economics"] },
        ],
        groups: [
            {
                title: "International Monetary Fund (IMF)",
                items: [
                    { name: "International Monetary Fund Data Site", href: "https://data.imf.org/", desc: "Comprehensive economic, finance, investment and climate data by country.", tags: ["economics", "environment"] },
                    { name: "World Economic Outlook Data Site", href: "https://www.imf.org/en/Publications/WEO/weo-database", desc: "Provides major economic indicators for all countries and qualitative information on key political and economic developments.", tags: ["economics"] },
                ],
            },
            {
                title: "United Nations Databases",
                items: [
                    { name: "Food and Agriculture Organization", href: "https://www.fao.org/faostat/", desc: "Provides access to food and agriculture statistics by sectors for over 245 countries and territories from 1961 to most recent year.", tags: ["environment"] },
                    { name: "UNDP Human Development Index (HDI)", href: "https://hdr.undp.org/data-center/human-development-index", desc: "Explore human development data from around the world using integrative tools.", tags: ["economics", "health"] },
                    { name: "UNESCO Institute for Statistics", href: "https://uis.unesco.org/", desc: "Data on UN’s sustainable development goals by country and theme.", tags: ["economics", "society"] },
                    { name: "World Health Organization", href: "https://www.who.int/data", desc: "Offers information and data on global health that includes health indicators by country and maps on major health topics.", tags: ["health"] },
                ],
            },
            {
                title: "World Bank Group Indicators",
                items: [
                    { name: "World Bank Group indicators", href: "https://data.worldbank.org/indicator", desc: "Useful index of international comparisons on gross national income per capita, life expectancy, education, and other indicators.", tags: ["economics", "health"] },
                    { name: "Country Policy and Institutional Assessment (CPIA)", href: "https://databank.worldbank.org/source/country-policy-and-institutional-assessment", desc: "Provides a series of 16 measures on country performance in implementing policies that promote economic growth and poverty reduction.", tags: ["economics", "democracy"] },
                    { name: "Business Enabling Environment", href: "https://www.worldbank.org/en/businessready", desc: "Currently being formulated using new approach to assessing business and investment climates in economies worldwide following discontinuation of Doing Business Report.", tags: ["economics"] },
                    { name: "World Development Indicators (WDI)", href: "https://databank.worldbank.org/source/world-development-indicators", desc: "A huge collection of national data on hundreds of indicators for every country in the world.", tags: ["economics"] },
                ],
            },
        ],
    },
    {
        id: "blogs",
        title: "International Relations Blogs",
        items: [
            { name: "AsianPolyGlotView", href: "https://asianpolyglotview.com/", desc: "Blog offers news and views on a variety of topics such as macro-economies, finance, international relations and public policy for U.S., China, Japan and Korea.", tags: ["economics", "diplomacy", "asia"] },
            { name: "Ethics & International Affairs", href: "https://www.ethicsandinternationalaffairs.org/", desc: "Through its publications integrates rigorous thinking about principles of justice and morality into discussions of current policy developments, global institutional arrangements, and the conduct of important global actors.", tags: ["diplomacy", "rights"] },
            { name: "Global Issues", href: "https://www.globalissues.org/", desc: "Global social, political, economic and environmental issues.", tags: ["economics", "environment", "rights"] },
            { name: "OpenCanada.org / International Affairs Explained", href: "https://opencanada.org/", desc: "Publication of the Canadian International Council, the Centre for International Governance Innovation and the Bill Graham Centre. They produce content to explain, analyze and tell stories about the increasingly complex world of foreign policy and international affairs.", tags: ["diplomacy", "americas"] },
            { name: "Spheres of Influence", href: "https://spheresofinfluence.ca/", desc: "A youth-based publication dedicated to highlighting under-reported stories, amplifying marginalized voices, and analyzing global affairs.", tags: ["rights"] },
            { name: "VoxEU", href: "https://cepr.org/voxeu", desc: "Research and commentary by leading economists.", tags: ["economics", "europe"] },
        ],
    },
    {
        id: "news",
        title: "Major News Sources with Global Coverage",
        items: [
            { name: "Agence France-Presse", href: "https://www.afp.com/en", desc: "Global news agency.", tags: ["europe"] },
            { name: "Al Jazeera", href: "https://www.aljazeera.com/", desc: "International news on less-covered regions and topics from 60 bureaus around the world.", tags: ["middle-east"] },
            { name: "Amanpour & Co.", href: "https://www.pbs.org/wnet/amanpour-and-company/", desc: "In-depth conversations with global thought leaders and cultural influencers on issues impacting the world.", tags: ["diplomacy"] },
            { name: "BBC News Online", href: "https://www.bbc.com/news/world", tags: ["europe"] },
            { name: "CNN Interactive – World News", href: "https://www.cnn.com/world" },
            { name: "Canadian Broadcasting Corporation", href: "https://www.cbc.ca/news/world", tags: ["americas"] },
            { name: "The Economist", href: "https://www.economist.com/", desc: "Global news weekly from London.", tags: ["economics", "europe"] },
            { name: "Economist Graphic Detail", href: "https://www.economist.com/graphic-detail", desc: "Charts, maps and infographics from The Economist.", tags: ["economics"] },
            { name: "Euronews", href: "https://www.euronews.com/", desc: "Leading European news source, including international news.", tags: ["europe"] },
            { name: "International Business Times", href: "https://www.ibtimes.com/", desc: "Global business, political and cultural news.", tags: ["economics"] },
            { name: "Inter Press Service", href: "https://www.ipsnews.net/", desc: "News and views on global regions and topics." },
            { name: "Le Monde Diplomatique", href: "https://mondediplo.com/", desc: "English-language edition of world-renowned French language newspaper.", tags: ["diplomacy", "europe"] },
            { name: "Overseas Security Advisory Council", href: "https://www.osac.gov/", desc: "U.S. State Department reporting on security related news and advisories.", tags: ["security"] },
            { name: "PBS World News", href: "https://www.pbs.org/newshour/world" },
            { name: "Pulitzer Center on Crisis Reporting", href: "https://pulitzercenter.org/", desc: "Supports independent international journalism by focusing on under-reported topics.", tags: ["rights"] },
            { name: "Reuters", href: "https://www.reuters.com/world/", desc: "Top world and business news.", tags: ["economics"] },
            { name: "Wall Street Journal World Section", href: "https://www.wsj.com/world", tags: ["economics"] },
            { name: "Washington Post World Section", href: "https://www.washingtonpost.com/world/" },
            { name: "World Politics Review", href: "https://www.worldpoliticsreview.com/", tags: ["diplomacy"] },
        ],
    },
    {
        id: "maps",
        title: "Maps",
        items: [
            { name: "CIA World Factbook Maps", href: "https://www.cia.gov/the-world-factbook/maps/", desc: "Provides 26 physical and political world and regional maps in PDF format." },
            { name: "IMF Data Mapper", href: "https://www.imf.org/external/datamapper/", desc: "Maps and Excel data files on Real GDP growth by country.", tags: ["economics"] },
            { name: "Maps of the World", href: "https://www.mapsofworld.com/", desc: "Provides online maps and authorizes individuals to reproduce them as long as they cite the source." },
            { name: "National Geographic MapMaker", href: "https://mapmaker.nationalgeographic.org/", desc: "Enables individuals to explore Earth’s interconnected systems through a collection of curated base maps, data layers, and annotation tools. Covers topics such as cities of the world, population density, drought, human footprint, asylum seeker origins and journeys.", tags: ["environment", "rights", "society"] },
            { name: "National Geographic Maps", href: "https://www.nationalgeographic.com/maps", desc: "A source of maps, globes and atlases for purchase." },
            { name: "Worldmapper", href: "https://worldmapper.org/", desc: "A collection of world maps comparing countries of the world on specific topics (economy, education, health, environment).", tags: ["economics", "health", "environment"] },
        ],
    },
    {
        id: "understanding",
        title: "Understanding What You Are Reading",
        intro: "There is no such thing as un-biased news – what’s important is to understand what you are reading in context of the bias so you can get the whole story.",
        items: [
            { name: "AllSides", href: "https://www.allsides.com/", desc: "Explicitly presents news on global issues from the left, center and right.", tags: ["media"] },
            { name: "The Factual", href: "https://www.thefactual.com/", desc: "Analyzes 10,000 stories a day from 2,000 sources to determine how informative they are.", tags: ["media"] },
        ],
    },
    {
        id: "waca",
        title: "World Affairs Councils of America",
        items: [
            { name: "World Affairs Councils of America", href: "https://www.worldaffairscouncils.org/", desc: "Great source of information on other WAC councils and to access their newsletter and podcasts.", tags: ["newsletters", "podcasts"] },
        ],
    },
];
