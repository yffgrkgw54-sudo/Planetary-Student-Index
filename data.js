// ========================================
// PLANETARY STUDENT TIMELINE DATA
// Structured for Network Visualization
// ========================================

const ERAS = {
    'foundational': { name: 'Foundational Period', start: 1857, end: 1899 },
    'formal-curriculum': { name: 'Formal Curriculum Development', start: 1900, end: 1919 },
    'consolidation': { name: 'Pedagogical Consolidation', start: 1920, end: 1949 },
    'philosophy-revolution': { name: 'Educational Philosophy Revolution', start: 1950, end: 1969 },
    'environmental-social': { name: 'Environmental and Social Consciousness', start: 1970, end: 1989 },
    'digital-revolution': { name: 'Digital Revolution in Pedagogy', start: 1990, end: 2009 },
    'contemporary': { name: 'Contemporary Pedagogical Innovation', start: 2000, end: 2019 },
    'emerging': { name: 'Emerging Pedagogical Frontiers', start: 2020, end: 2025 }
};

const FOCUS_AREAS = {
    'FA01': 'Curriculum',
    'FA02': 'Program Structure',
    'FA03': 'Studio Methods',
    'FA04': 'Technology',
    'FA05': 'Social Justice',
    'FA06': 'Collaboration'
};

const PEDAGOGICAL_PRIORITIES = {
    'PP01': 'The Discipline',
    'PP02': 'The Design Studio',
    'PP03': 'The Academic Program'
};

const ENTRY_TYPES = {
    'PD': 'Pedagogical Development',
    'ID': 'Institutional Development',
    'BIB': 'Theoretical Foundation'
};

// Timeline entries structured as nodes
const timelineEntries = [
    {
        id: 1,
        year: 1857,
        location: 'New York, NY, USA',
        title: 'Collaborative Design Philosophy',
        description: 'Olmsted and Vaux establish collaborative design methodology through Central Park competition, creating foundational philosophy that design emerges from partnership rather than individual genius.',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'Olmsted Network. (2023). Frederick Law Olmsted. https://olmsted.org/frederick-law-olmsted/',
        tags: ['womens-education']
    },
    {
        id: 2,
        year: 1862,
        location: 'United States',
        title: 'Land-Grant Education Framework',
        description: 'Morrill Act establishes land grant colleges, creating framework for agricultural and technical education that includes landscape studies.',
        types: ['ID'],
        priorities: ['PP01'],
        focusAreas: ['FA01', 'FA06'],
        citation: 'National Park Service. (n.d.). The Olmsted firm - college campuses. https://www.nps.gov/articles/000/olmsted-college-campuses.htm'
    },
    {
        id: 3,
        year: 1863,
        location: 'Michigan, USA',
        title: 'Integration of Landscape Gardening into Agricultural Curriculum',
        description: 'Michigan State offers landscape gardening courses and integrates landscape gardening into agricultural curriculum, establishing educational philosophy that landscape design must be grounded in horticultural and agricultural knowledge.',
        types: ['PD'],
        priorities: ['PP01'],
        focusAreas: ['FA01'],
        citation: 'Steiner, F., & Brooks, K. (n.d.). Charles Parker Halligan\'s impact on the MSU Landscape Architecture program.'
    },
    {
        id: 4,
        year: 1868,
        location: 'Illinois, USA',
        title: 'Garden Architecture Pedagogy',
        description: 'University of Illinois begins teaching landscape gardening/garden architecture as part of agricultural curriculum, establishing terminology and pedagogical framework within agricultural education.',
        types: ['PD'],
        priorities: ['PP01', 'PP03'],
        focusAreas: ['FA01'],
        citation: 'Steiner, F., & Brooks, K. (n.d.). Charles Parker Halligan\'s impact on the MSU Landscape Architecture program.'
    },
    {
        id: 5,
        year: 1870,
        location: 'Hampton, VA, USA',
        title: 'Black Land-Grant Institution',
        description: 'Hampton Normal and Agricultural Institute chartered as land-grant school, creating first institution serving both Black and Indigenous students with landscape-focused agricultural curriculum, establishing precedent for racialized landscape education.',
        types: ['ID'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'Dümpelmann, S. (2022). "Let All Be Educated Alike Up to a Certain Point." Places Journal.',
        tags: ['black-institutions']
    },
    {
        id: 6,
        year: 1871,
        location: 'Kansas/Iowa, USA',
        title: 'Agricultural Integration Model',
        description: 'Kansas State and Iowa State begin landscape gardening courses, establishing model of landscape education within agricultural colleges.',
        types: ['ID'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'Cornell AAP. (n.d.). History of the Department of Architecture.'
    },
    {
        id: 7,
        year: 1874,
        location: 'Versailles, France',
        title: 'Formal Garden Design Pedagogy',
        description: 'Landscape design first taught at Versailles, establishing European pedagogical tradition emphasizing geometric design principles and classical compositional methods.',
        types: ['PD'],
        priorities: ['PP02'],
        focusAreas: ['FA04'],
        citation: 'ResearchGate. (2023). What are the main pillars of Landscape architecture education programs?'
    },
    {
        id: 8,
        year: 1878,
        location: 'Hampton, VA, USA',
        title: 'Indigenous Student Integration',
        description: 'Hampton Institute matriculates first class of Indigenous students (fifteen members of Kiowa and Cheyenne tribes), establishing forced assimilationist educational model that suppresses Indigenous gardening traditions while teaching European landscape design principles.',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA01'],
        citation: 'Dümpelmann, S. (2022). "Let All Be Educated Alike Up to a Certain Point." Places Journal.',
        connections: [5],
        tags: ['indigenous', 'black-institutions']
    },
    {
        id: 9,
        year: 1884,
        location: 'Michigan, USA',
        title: 'Horticulture-Landscape Gardening Department',
        description: 'Liberty Hyde Bailey establishes first "Horticulture and Landscape Gardening Department" at Michigan State, creating curriculum philosophy integrating scientific plant knowledge with design principles.',
        types: ['PD'],
        priorities: ['PP01'],
        focusAreas: ['FA01'],
        citation: 'Steiner, F., & Brooks, K. (n.d.). Charles Parker Halligan\'s impact on the MSU Landscape Architecture program.',
        connections: [3]
    },
    {
        id: 10,
        year: 1887,
        location: 'United States',
        title: 'Federal Agricultural Research Framework',
        description: 'Hatch Act allocates federal funds for land-grant colleges to establish agricultural experiment stations, but systematically excludes Black institutions from funding, creating racialized hierarchy in landscape and agricultural education.',
        types: ['ID'],
        priorities: ['PP03'],
        focusAreas: ['FA01'],
        citation: 'Dümpelmann, S. (2022). "Let All Be Educated Alike Up to a Certain Point." Places Journal.',
        connections: [2, 5],
        tags: ['black-institutions']
    },
    {
        id: 11,
        year: 1888,
        location: 'Ithaca, NY, USA',
        title: 'Practical-Experimental Philosophy',
        description: 'Liberty Hyde Bailey arrives at Cornell to provide systematic instruction in landscape design, developing "Practical and Experimental Horticulture" curriculum and establishing educational philosophy emphasizing hands-on learning and scientific experimentation.',
        types: ['PD'],
        priorities: ['PP02'],
        focusAreas: ['FA03'],
        citation: 'Cornell CALS. (n.d.). History of the department.',
        connections: [9]
    },
    {
        id: 12,
        year: 1890,
        location: 'United States',
        title: 'Separate-But-Equal Education',
        description: 'Second Morrill Act requires states to establish separate land-grant institutions for people of color, institutionalizing "separate-but-equal" policy that confines Black institutions to landscape gardening\'s rural emphases while white institutions develop urban landscape architecture programs.',
        types: ['ID'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'Dümpelmann, S. (2022). "Let All Be Educated Alike Up to a Certain Point." Places Journal.',
        connections: [2, 5, 10],
        tags: ['black-institutions']
    },
    {
        id: 13,
        year: 1890,
        location: 'United States',
        title: 'Apprenticeship Learning Model',
        description: 'Olmsted firm develops apprenticeship training methodology, establishing tradition of learning through direct mentorship and project-based experience.',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'Library of Congress. (n.d.). Frederick Law Olmsted timeline.',
        connections: [1]
    },
    {
        id: 14,
        year: 1893,
        location: 'Cambridge, MA, USA',
        title: 'Professional Course Philosophy',
        description: 'Harvard University offers nation\'s first professional course in landscape architecture, establishing curriculum philosophy that landscape design requires formal academic training beyond apprenticeship.',
        types: ['PD'],
        priorities: ['PP01'],
        focusAreas: ['FA02'],
        citation: 'Harvard Graduate School of Design. (2025). Harvard Graduate School of Design - Wikipedia.',
        connections: [13]
    },
    {
        id: 15,
        year: 1894,
        location: 'Massachusetts, USA',
        title: 'Olmsted-Washington Educational Alliance',
        description: 'Frederick Law Olmsted Sr. meets Booker T. Washington during Washington\'s summer sojourn in Massachusetts, offering consultation on Tuskegee campus design and establishing precedent for white landscape architects\' involvement in Black institutional development.',
        types: ['ID'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'Dümpelmann, S. (2022). "Let All Be Educated Alike Up to a Certain Point." Places Journal.',
        connections: [1, 5],
        tags: ['black-institutions']
    },
    {
        id: 16,
        year: 1898,
        location: 'Ithaca, NY, USA',
        title: 'Inclusive Education Philosophy & Professional Integration',
        description: 'David Williston becomes first professionally-trained Black landscape architect in the United States, studying under Liberty Hyde Bailey, demonstrating educational philosophy of inclusivity and merit-based access to landscape architecture education. Williston will later establish landscape gardening programs at Tuskegee Institute (1902-1929).',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'Cornell Chronicle. (2018). First African-American landscape architect launched career at Cornell.',
        connections: [9, 11, 15],
        tags: ['black-institutions', 'lineage']
    },
    {
        id: 17,
        year: 1900,
        location: 'Cambridge, MA, USA',
        title: 'Graduate Education Philosophy & First Graduate Program',
        description: 'Frederick Law Olmsted Jr. establishes world\'s first landscape architecture program at Harvard University, creating educational philosophy that professional competence requires systematic academic study and model for professional education.',
        types: ['PD'],
        priorities: ['PP01'],
        focusAreas: ['FA02'],
        citation: 'Library of Congress. (n.d.). Frederick Law Olmsted timeline.',
        connections: [1, 14]
    },
    {
        id: 18,
        year: 1900,
        location: 'Cambridge, MA, USA',
        title: 'Academic Structure',
        description: 'Harvard establishes Charles Eliot Professorship, creating first endowed chair in landscape architecture.',
        types: ['ID'],
        priorities: ['PP01'],
        focusAreas: ['FA02'],
        citation: 'PCAD. (n.d.). Frederick Law Olmsted Jr.',
        connections: [17]
    },
    {
        id: 19,
        year: 1901,
        location: 'Groton, MA, USA',
        title: "Women's Professional Education & Hands-On Learning",
        description: 'Judith Motley Low establishes Lowthorpe School of Landscape Architecture, Gardening, and Horticulture for Women, creating first professional training exclusively for women in landscape architecture. Curriculum emphasizes practical garden work and residential design.',
        types: ['PD'],
        priorities: ['PP01'],
        focusAreas: ['FA02'],
        citation: 'Lowthorpe School of Landscape Architecture. (2023). Wikipedia.',
        tags: ['womens-education']
    },
    {
        id: 20,
        year: 1902,
        location: 'Tuskegee, AL, USA',
        title: 'Black Landscape Architecture Leadership',
        description: 'David Augustus Williston hired as chief landscape gardener at Tuskegee Normal and Industrial Institute, establishing first professional landscape architecture position at a Black institution and creating campus as design-build laboratory for students.',
        types: ['PD'],
        priorities: ['PP01'],
        focusAreas: ['FA02'],
        citation: 'Dümpelmann, S. (2022). "Let All Be Educated Alike Up to a Certain Point." Places Journal.',
        connections: [16, 15],
        tags: ['black-institutions', 'lineage']
    },
    {
        id: 21,
        year: 1904,
        location: 'Ithaca, NY, USA',
        title: '"Outdoor Art" Curriculum',
        description: 'Cornell formally establishes undergraduate landscape architecture department under Liberty Hyde Bailey at founding of College of Agriculture, creating "Outdoor Art Group" curriculum and educational philosophy emphasizing landscape architecture as artistic practice requiring aesthetic development.',
        types: ['PD'],
        priorities: ['PP01'],
        focusAreas: ['FA01'],
        citation: 'Cornell CALS. (n.d.). History of the department.',
        connections: [11, 9]
    },
    {
        id: 22,
        year: 1906,
        location: 'Tuskegee, AL, USA',
        title: 'Community Extension Pedagogy',
        description: 'Tuskegee launches "Movable School" extension service in collaboration with George Washington Carver, with women extension agents providing instruction in vegetable raising, home improvement, and yard beautification, establishing community-engaged landscape education model.',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'Dümpelmann, S. (2022). "Let All Be Educated Alike Up to a Certain Point." Places Journal.',
        connections: [20],
        tags: ['black-institutions']
    },
    {
        id: 23,
        year: 1909,
        location: 'Ithaca, NY, USA',
        title: 'Field-Based Learning Methodology',
        description: 'Bryant Fleming establishes "Trips of Inspection" methodology at Cornell, pioneering field-based learning still used today, creating systematic field study methodology emphasizing direct observation and site-based learning.',
        types: ['PD'],
        priorities: ['PP02'],
        focusAreas: ['FA03'],
        citation: 'Cornell CALS. (n.d.). History of the department.',
        connections: [21]
    },
    {
        id: 24,
        year: 1915,
        location: 'Cambridge, MA, USA',
        title: "Women's Graduate Training & Collaborative Learning Philosophy",
        description: 'Cambridge School of Architecture and Landscape Architecture for Women founded by Henry Atherton Frost, establishing first graduate training for women coordinating architecture and landscape architecture under single faculty.',
        types: ['ID'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'Cambridge School of Architecture and Landscape Architecture. (2024). Wikipedia.',
        connections: [19],
        tags: ['womens-education']
    },
    {
        id: 25,
        year: 1917,
        location: 'Cambridge, MA, USA',
        title: 'Comprehensive Textbook Pedagogy',
        description: 'Henry Vincent Hubbard and Theodora Kimball publish "An Introduction to the Study of Landscape Design" (New York: MacMillan Company), first comprehensive educational textbook, establishing systematic written curriculum and codifying Beaux Arts educational philosophy.',
        types: ['PD'],
        priorities: ['PP01'],
        focusAreas: ['FA01'],
        citation: 'Hohmann, H. (2006). Theodora Kimball Hubbard and the "intellectualization" of landscape architecture, 1911-1935.',
        connections: [17, 18]
    },
    {
        id: 26,
        year: 1919,
        location: 'Ås, Norway',
        title: 'European Pioneer & Curriculum Model',
        description: 'Norwegian University of Life Sciences establishes first academic landscape architecture program in Europe with three-year course structure and systematic curriculum, creating European model.',
        types: ['ID'],
        priorities: ['PP01'],
        focusAreas: ['FA02'],
        citation: 'ECLAS Conference. (2019). Lessons from the past, visions for the future.'
    },
    {
        id: 27,
        year: 1942,
        location: 'Cambridge, MA, USA',
        title: "Women's Education Closure - Harvard Opens to Women",
        description: 'Cambridge School closes due to financial difficulties as Harvard opens to women, marking end of separate women\'s education but establishing lasting pedagogical influence.',
        types: ['ID'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'Cambridge School of Architecture and Landscape Architecture. (2024). Wikipedia.',
        connections: [24, 19],
        tags: ['womens-education']
    },
    {
        id: 28,
        year: 1954,
        location: 'Philadelphia, PA, USA',
        title: 'Revolutionary Pedagogy & Ecological Education Philosophy',
        description: 'Ian McHarg becomes assistant professor at University of Pennsylvania School of Fine Arts, establishing Department of Landscape Architecture and MLA program, introducing revolutionary educational philosophy emphasizing ecological science as design foundation.',
        types: ['PD'],
        priorities: ['PP01', 'PP03'],
        focusAreas: ['FA01', 'FA06'],
        citation: 'TCLF. (n.d.). Ian McHarg.'
    },
    {
        id: 29,
        year: 1959,
        location: 'Philadelphia, PA, USA',
        title: '"Man and Environment" Course',
        description: 'McHarg initiates interdisciplinary course bringing theologians and scientists to discuss human-environment relationships, establishing educational philosophy emphasizing values and ethics in design.',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA05', 'FA06'],
        citation: 'The McHarg Center. (n.d.). Ian L. McHarg.',
        connections: [28]
    },
    {
        id: 30,
        year: 1968,
        location: 'Global',
        title: 'Critical Pedagogy Foundation',
        description: 'Paulo Freire\'s pedagogical philosophy emerges, establishing critical pedagogy as foundation for educational liberation and transformative learning that will later influence landscape architecture education.',
        types: ['BIB'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'Freire, P. (1968). Pedagogy of the oppressed. Continuum.',
        tags: ['theoretical-foundation']
    },
    {
        id: 31,
        year: 1969,
        location: 'Philadelphia, PA, USA',
        title: '"Design with Nature" Pedagogy',
        description: 'McHarg publishes "Design with Nature," establishing ecological design as educational foundation and revolutionizing landscape architecture pedagogy globally, codifying ecological design methodology.',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'McHarg, I. (2025). Ian McHarg - Wikipedia.',
        connections: [28, 29]
    },
    {
        id: 32,
        year: 1973,
        location: 'Global',
        title: 'Resilience Thinking Foundation',
        description: 'C.S. Holling\'s work on ecological resilience establishes theoretical foundation for resilience thinking that will later transform landscape architecture pedagogy toward adaptive and flexible design approaches.',
        types: ['BIB'],
        priorities: ['PP02'],
        focusAreas: ['FA04', 'FA05'],
        citation: 'Holling, C. S. (1973). Resilience and stability of ecological systems. Annual Review of Ecology and Systematics.',
        tags: ['theoretical-foundation']
    },
    {
        id: 33,
        year: 1980,
        location: 'London, UK',
        title: 'Feminist Collaborative Pedagogy',
        description: 'Matrix Feminist Design Co-operative established as architectural practice and educational collective, creating non-hierarchical learning model and challenging patriarchal design education.',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'Matrix Feminist Design Co-operative. (2025). Wikipedia.',
        tags: ['womens-education']
    },
    {
        id: 34,
        year: 1988,
        location: 'Global',
        title: 'Feminist Epistemology Foundation',
        description: 'Donna Haraway\'s concept of situated knowledges emerges, establishing feminist epistemological framework that challenges objective knowledge claims and will later influence participatory and community-engaged design pedagogies.',
        types: ['BIB'],
        priorities: ['PP01'],
        focusAreas: ['FA02'],
        citation: 'Haraway, D. (1988). Situated knowledges: The science question in feminism and the privilege of partial perspective. Feminist Studies.',
        tags: ['theoretical-foundation', 'womens-education']
    },
    {
        id: 35,
        year: 1989,
        location: 'West Berlin, Germany',
        title: 'European Collaborative Pedagogy',
        description: 'First Europe-wide meeting of landscape architecture schools initiates systematic collaborative pedagogy across national boundaries, establishing collaborative educational philosophy and cross-cultural learning methodology.',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'Jørgensen, K. (2020). Teaching landscape architecture: a discipline comes of age. Landscape Research.'
    },
    {
        id: 36,
        year: 1990,
        location: 'Global',
        title: 'Commons Governance Framework',
        description: 'Elinor Ostrom\'s foundational work on governing the commons establishes theoretical framework for collective resource management that will later influence participatory design and community-engaged pedagogy in landscape architecture.',
        types: ['BIB'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'Ostrom, E. (1990). Governing the commons: The evolution of institutions for collective action. Cambridge University Press.',
        tags: ['theoretical-foundation']
    },
    {
        id: 37,
        year: 1990,
        location: 'Europe',
        title: 'ECLAS Educational Organization',
        description: 'European Council of Landscape Architecture Schools (ECLAS) established to foster educational collaboration and scholarship development, founding to "foster and develop scholarship in landscape architecture throughout Europe."',
        types: ['ID'],
        priorities: ['PP02'],
        focusAreas: ['FA02'],
        citation: 'ELASA. (1995). ECLAS.',
        connections: [35]
    },
    {
        id: 38,
        year: 1994,
        location: 'Global',
        title: 'Transgressive Pedagogy Framework',
        description: 'bell hooks\' work on teaching to transgress establishes a critical pedagogical framework emphasizing education as practice of freedom, creating foundation for later social justice and decolonizing approaches in landscape architecture education.',
        types: ['BIB'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'hooks, b. (1994). Teaching to transgress: Education as the practice of freedom. Routledge.',
        connections: [30],
        tags: ['theoretical-foundation']
    },
    {
        id: 39,
        year: 1997,
        location: 'Cambridge, MA, USA',
        title: 'Landscape Urbanism Emergence',
        description: 'Charles Waldheim begins theorizing landscape urbanism at Harvard Graduate School of Design, establishing landscape architecture as medium for contemporary urbanism and challenging traditional disciplinary boundaries.',
        types: ['PD'],
        priorities: ['PP01'],
        focusAreas: ['FA02'],
        citation: 'Waldheim, C. (Ed.). (2006). The landscape urbanism reader. Princeton Architectural Press.',
        connections: [17]
    },
    {
        id: 40,
        year: 2000,
        location: 'Global',
        title: 'Environmental Phenomenology Foundation',
        description: 'Tim Ingold\'s work on perception of environment begins to establish theoretical framework for embodied and experiential understanding of landscape that will later influence field-based learning and phenomenological approaches in design education.',
        types: ['BIB'],
        priorities: ['PP01'],
        focusAreas: ['FA02'],
        citation: 'Ingold, T. (2000). The perception of the environment: Essays on livelihood, dwelling and skill. Routledge.',
        tags: ['theoretical-foundation']
    },
    {
        id: 41,
        year: 2005,
        location: 'Global',
        title: 'Critical Spatial and Social Justice Pedagogies',
        description: 'Doreen Massey\'s work on spatial theory establishes understanding of space as relational and politically constructed, creating theoretical foundation that will later influence critical spatial pedagogies and social justice approaches.',
        types: ['BIB'],
        priorities: ['PP02', 'PP03'],
        focusAreas: ['FA04', 'FA05'],
        citation: 'Massey, D. (2005). For space. SAGE Publications.',
        tags: ['theoretical-foundation']
    },
    {
        id: 42,
        year: 2006,
        location: 'Europe',
        title: 'JoLA Academic Publishing',
        description: 'Journal of Landscape Architecture (JoLA) founded by ECLAS, establishing peer-reviewed scholarly communication platform for landscape architecture education research.',
        types: ['PD'],
        priorities: ['PP02'],
        focusAreas: ['FA03', 'FA04'],
        citation: 'Jørgensen, K. (2020). Teaching landscape architecture: a discipline comes of age.',
        connections: [37]
    },
    {
        id: 43,
        year: 2007,
        location: 'Global',
        title: 'New Materialist Foundations',
        description: 'Karen Barad\'s agential realism establishes framework for understanding matter as agential and relational, creating foundation for later new materialist approaches to landscape pedagogy that understand landscapes as active participants in design processes.',
        types: ['BIB'],
        priorities: ['PP01'],
        focusAreas: ['FA02'],
        citation: 'Barad, K. (2007). Meeting the universe halfway: Quantum physics and the entanglement of matter and meaning. Duke University Press.',
        tags: ['theoretical-foundation']
    },
    {
        id: 44,
        year: 2010,
        location: 'Global',
        title: 'Vibrant Matter Theory',
        description: 'Jane Bennett\'s work on vibrant matter establishes theoretical foundation for understanding matter as lively and agential, creating conceptual framework that will later influence landscape architecture pedagogy toward more-than-human design approaches.',
        types: ['BIB'],
        priorities: ['PP02'],
        focusAreas: ['FA03'],
        citation: 'Bennett, J. (2010). Vibrant matter: A political ecology of things. Duke University Press.',
        connections: [43],
        tags: ['theoretical-foundation']
    },
    {
        id: 45,
        year: 2010,
        location: 'Europe',
        title: 'Studio-Based Educational Standards',
        description: 'ECLAS publishes guidance document recommending minimum 50% studio-based project teaching, establishing European educational standards and hands-on learning as fundamental educational philosophy.',
        types: ['PD'],
        priorities: ['PP02'],
        focusAreas: ['FA04'],
        citation: 'Jørgensen, K. (2020). Teaching landscape architecture: a discipline comes of age.',
        connections: [37, 42]
    },
    {
        id: 46,
        year: 2011,
        location: 'Global',
        title: 'Slow Violence Theory',
        description: 'Rob Nixon\'s concept of slow violence establishes framework for understanding gradual environmental and social harm that will later influence environmental justice pedagogy and community-engaged design education.',
        types: ['BIB'],
        priorities: ['PP02', 'PP03'],
        focusAreas: ['FA06'],
        citation: 'Nixon, R. (2011). Slow violence and the environmentalism of the poor. Harvard University Press.',
        tags: ['theoretical-foundation']
    },
    {
        id: 47,
        year: 2013,
        location: 'Global',
        title: 'Indigenous Knowledge Systems',
        description: 'Robin Wall Kimmerer\'s work on braiding sweetgrass establishes framework for integrating indigenous knowledge systems with scientific knowledge, creating educational foundation that will later influence decolonizing pedagogies.',
        types: ['BIB'],
        priorities: ['PP02'],
        focusAreas: ['FA03'],
        citation: 'Kimmerer, R. W. (2013). Braiding sweetgrass: Indigenous wisdom, scientific knowledge and the teachings of plants. Milkweed Editions.',
        tags: ['theoretical-foundation', 'indigenous']
    },
    {
        id: 48,
        year: 2015,
        location: 'Global',
        title: 'Multispecies Thinking Foundation',
        description: 'Anna Tsing\'s work on multispecies thinking establishes theoretical framework for understanding life in capitalist ruins and more-than-human collaboration that will later influence multispecies design pedagogies.',
        types: ['BIB'],
        priorities: ['PP02'],
        focusAreas: ['FA03'],
        citation: 'Tsing, A. L. (2015). The mushroom at the end of the world: On the possibility of life in capitalist ruins. Princeton University Press.',
        connections: [44],
        tags: ['theoretical-foundation']
    },
    {
        id: 49,
        year: 2015,
        location: 'Global',
        title: '"Cheap Nature" Critical Framework',
        description: 'Jason W. Moore\'s theorization of "cheap nature" as capitalism\'s strategy for appropriating unpaid work from human and extra-human nature influences landscape architecture pedagogy, establishing critical framework for understanding how capitalist accumulation depends on rendering landscapes artificially "cheap."',
        types: ['BIB'],
        priorities: ['PP01', 'PP03'],
        focusAreas: ['FA05', 'FA06'],
        citation: 'Moore, J. W. (2015). Capitalism in the web of life: Ecology and the accumulation of capital. Verso.',
        tags: ['theoretical-foundation']
    },
    {
        id: 50,
        year: 2016,
        location: 'Global',
        title: 'Multispecies Collaboration Framework',
        description: 'Donna Haraway\'s work on staying with the trouble establishes framework for multispecies collaboration and symbiogenesis that will later influence more-than-human design pedagogies and interspecies thinking.',
        types: ['BIB'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'Haraway, D. (2016). Staying with the trouble: Making kin in the Chthulucene. Duke University Press.',
        connections: [34, 48],
        tags: ['theoretical-foundation']
    },
    {
        id: 51,
        year: 2016,
        location: 'Philadelphia, PA, USA',
        title: 'New Landscape Declaration',
        description: 'Landscape Architecture Foundation convenes "New Landscape Declaration: A Summit on Landscape Architecture and the Future" with over 700 landscape architects to reflect on 50 years of professional evolution and forge new vision emphasizing collaborative solutions, environmental justice, and expanded global practice.',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'Wooten, N. (2016). The New Landscape Declaration: Looking Back Over the Past 50 Years. The Dirt.',
        connections: [31]
    },
    {
        id: 52,
        year: 2017,
        location: 'Global',
        title: 'Pluriversal Design Philosophy',
        description: 'Arturo Escobar\'s work on designs for the pluriverse establishes theoretical framework for decolonial design that recognizes multiple worlds and ways of knowing, creating foundation for later decolonizing pedagogies.',
        types: ['BIB'],
        priorities: ['PP02'],
        focusAreas: ['FA03'],
        citation: 'Escobar, A. (2017). Designs for the pluriverse: Radical interdependence, autonomy, and the making of worlds. Duke University Press.',
        connections: [47],
        tags: ['theoretical-foundation']
    },
    {
        id: 53,
        year: 2017,
        location: 'Philadelphia, PA, USA',
        title: 'McHarg Center Launch',
        description: 'University of Pennsylvania launches Ian L. McHarg Center for Urbanism and Ecology, integrating transdisciplinary research with educational mission and establishing "transdisciplinary platform for collaborative research."',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'McHarg, I. (2025). Ian McHarg - Wikipedia.',
        connections: [28, 31]
    },
    {
        id: 54,
        year: 2020,
        location: 'Cambridge, MA, USA',
        title: 'Climate by Design Requirement',
        description: 'Harvard Graduate School of Design mandates "Climate by Design" as required course for all Master in Landscape Architecture degree candidates, establishing climate crisis as foundational pedagogical framework.',
        types: ['PD'],
        priorities: ['PP02'],
        focusAreas: ['FA03'],
        citation: 'Harvard Graduate School of Design. (2020). Climate by Design - Fall 2020.',
        connections: [17, 39]
    },
    {
        id: 55,
        year: 2020,
        location: 'Global',
        title: 'Design Justice Framework',
        description: 'Sasha Costanza-Chock\'s work on design justice establishes framework for community-led design practices that will later influence participatory and justice-oriented pedagogies in landscape architecture education.',
        types: ['BIB'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'Costanza-Chock, S. (2020). Design justice: Community-led practices to build the worlds we need.',
        connections: [38, 36],
        tags: ['theoretical-foundation']
    },
    {
        id: 56,
        year: 2020,
        location: 'Global',
        title: 'Remote Learning Innovation',
        description: 'COVID-19 pandemic accelerates development of hybrid and remote studio methodologies, fundamentally altering landscape architecture education delivery.',
        types: ['PD'],
        priorities: ['PP03'],
        focusAreas: ['FA06'],
        citation: 'Contemporary educational development based on pandemic response.'
    },
    {
        id: 57,
        year: 2021,
        location: 'Global',
        title: 'Decolonial Environmentalism',
        description: 'Max Liboiron\'s work on pollution as colonialism establishes framework connecting environmental degradation to colonial structures, creating theoretical foundation for environmental justice and decolonizing pedagogies.',
        types: ['BIB'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'Liboiron, M. (2021). Pollution is colonialism. Duke University Press.',
        connections: [47, 52],
        tags: ['theoretical-foundation']
    },
    {
        id: 58,
        year: 2022,
        location: 'Australia',
        title: 'Climate Studio Pedagogy',
        description: 'Publication of "Designing Landscape Architectural Education: Studio Ecologies for Unpredictable Futures" establishes framework for climate-responsive studio pedagogies.',
        types: ['BIB'],
        priorities: ['PP02'],
        focusAreas: ['FA03', 'FA04'],
        citation: 'Designing Landscape Architectural Education: Studio Ecologies for Unpredictable Futures. (2022). Routledge.',
        connections: [54]
    },
    {
        id: 59,
        year: 2022,
        location: 'Global',
        title: 'Pedagogical Innovation for Crises',
        description: 'Emerging pedagogical frameworks for broken worlds establish educational approaches that address converging crises, creating foundation for climate and social justice pedagogies.',
        types: ['BIB'],
        priorities: ['PP03'],
        focusAreas: ['FA05'],
        citation: 'Cephas, J., Marjanović, I., & Miljački, A. (Eds.). (2022). Pedagogies for a broken world. Journal of Architectural Education.',
        tags: ['theoretical-foundation']
    },
    {
        id: 60,
        year: 2023,
        location: 'Global',
        title: 'Indigenous Worldings Pedagogy',
        description: 'Emergence of Indigenous Worldings pedagogical frameworks in higher education, establishing systematic integration of indigenous cosmologies and epistemologies into design education curricula.',
        types: ['BIB'],
        priorities: ['PP02', 'PP03'],
        focusAreas: ['FA03', 'FA05'],
        citation: 'Indigenous Worldings (Syllabus). (2023). Princeton University.',
        connections: [47, 52],
        tags: ['theoretical-foundation', 'indigenous']
    },
    {
        id: 61,
        year: 2024,
        location: 'Global',
        title: 'Geologic Life Pedagogies',
        description: 'Kathryn Yusoff\'s work on geologic life establishes pedagogical framework connecting geophysics of race to environmental design education, addressing inhuman intimacies and colonial geology in landscape pedagogy.',
        types: ['BIB'],
        priorities: ['PP02', 'PP03'],
        focusAreas: ['FA03', 'FA05'],
        citation: 'Yusoff, K. (2024). Geologic life: Inhuman intimacies and the geophysics of race. Duke University Press.',
        connections: [57],
        tags: ['theoretical-foundation']
    },
    {
        id: 62,
        year: 2025,
        location: 'Global',
        title: 'Multispecies Design Education',
        description: 'Studios systematically incorporate more-than-human perspectives and multispecies design methodologies, designing for all life forms and curricula begin systematically incorporating more-than-human perspectives.',
        types: ['PD'],
        priorities: ['PP02'],
        focusAreas: ['FA03'],
        citation: 'Contemporary educational development in multispecies design.',
        connections: [48, 50]
    },
    {
        id: 63,
        year: 2025,
        location: 'Global',
        title: 'Post-Anthropocene Pedagogy',
        description: 'Curriculum development emphasizing design in the context of planetary-scale environmental change, addressing the end of human-dominated earth systems.',
        types: ['PD'],
        priorities: ['PP02'],
        focusAreas: ['FA03'],
        citation: 'Contemporary educational development in planetary thinking.',
        connections: [54, 62]
    }
];

// Generate connections based on shared attributes and explicit lineage
function generateConnections() {
    const connections = [];
    const entries = timelineEntries;
    
    // Add explicit connections from data
    entries.forEach(entry => {
        if (entry.connections) {
            entry.connections.forEach(targetId => {
                connections.push({
                    source: entry.id,
                    target: targetId,
                    type: entry.tags?.includes('lineage') ? 'lineage' : 'explicit'
                });
            });
        }
    });
    
    // Generate thematic connections based on shared Focus Areas
    for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
            const entry1 = entries[i];
            const entry2 = entries[j];
            
            // Check for shared focus areas
            const sharedFA = entry1.focusAreas.filter(fa => entry2.focusAreas.includes(fa));
            
            // Check for shared pedagogical priorities
            const sharedPP = entry1.priorities.filter(pp => entry2.priorities.includes(pp));
            
            // Check for shared types
            const sharedTypes = entry1.types.filter(t => entry2.types.includes(t));
            
            // Strong thematic connection: shares 2+ focus areas or same type + priority
            if (sharedFA.length >= 2 || (sharedTypes.length > 0 && sharedPP.length > 0 && sharedFA.length > 0)) {
                // Check if connection doesn't already exist
                const exists = connections.some(c => 
                    (c.source === entry1.id && c.target === entry2.id) ||
                    (c.source === entry2.id && c.target === entry1.id)
                );
                
                if (!exists) {
                    connections.push({
                        source: entry1.id,
                        target: entry2.id,
                        type: 'thematic',
                        strength: sharedFA.length + sharedPP.length * 0.5
                    });
                }
            }
        }
    }
    
    return connections;
}

// BIB entries as theoretical anchors
function getTheoreticalFoundations() {
    return timelineEntries.filter(e => e.types.includes('BIB'));
}

// Export data
const networkData = {
    nodes: timelineEntries,
    links: generateConnections(),
    eras: ERAS,
    focusAreas: FOCUS_AREAS,
    priorities: PEDAGOGICAL_PRIORITIES,
    entryTypes: ENTRY_TYPES,
    theoreticalFoundations: getTheoreticalFoundations()
};
