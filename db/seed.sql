-- DEEP SEA HACKATHON SEED DATA
-- Last Updated: April 19, 2026

INSERT INTO trash_catalog (id, zone_name, item_name, impact_fact, required_unlock_depth, image_url) VALUES
-- Sunlight Zone (0–200m)
(1,  'Sunlight', 'Single-Use Plastic Bag',             'Sea turtles mistake plastic bags for jellyfish, causing fatal intestinal blockages.',                                                                          15,   'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/plastic-bag.png'),
(2,  'Sunlight', 'Aluminium Soda Can',                 'Discarded cans leach aluminium oxide into shallow waters, disrupting coral reef chemistry.',                                                                   40,   'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/aluminum-can.png'),
(3,  'Sunlight', 'Disposable Cigarette Lighter',       'Lighters contain butane and flint compounds that slowly release toxic heavy metals as they degrade.',                                                          80,   'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/lighter.png'),
(4,  'Sunlight', 'Polystyrene Foam Cup',               'Styrofoam never fully biodegrades and breaks into microbeads ingested by juvenile fish.',                                                                      120,  'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/styrofoam-cup.png'),
(5,  'Sunlight', 'Tangled Fishing Line (Monofilament)','A single discarded monofilament line can entangle and drown seabirds and marine mammals for decades.',                                                         180,  'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/fishing-line.png'),

-- Twilight Zone (200–1,000m)
(6,  'Twilight', 'Lost Crab Pot (Ghost Trap)',         'Abandoned crab pots continue "ghost fishing," trapping and killing crustaceans indefinitely.',                                                                 350,  'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/crab-trap2.png'),
(7,  'Twilight', 'Rubber Car Tyre Fragment',           'Tyre rubber leaches 6PPD-quinone, a chemical lethal to coho salmon even at trace concentrations.',                                                            600,   'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/rubber-tire.png'),
(8,  'Twilight', 'Discarded Scuba Tank',               'Corroding steel tanks release iron and valve compounds that alter local oxygen levels in the water column.',                                                   800,  'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/suba-tank.png'),
(9,  'Twilight', 'Plastic Shipping Strap',             'Rigid polypropylene strapping bands are nearly invisible to marine life and cause severe laceration injuries.',                                                950,  'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/shipping-strap.png'),

-- Midnight Zone (1,000–4,000m)
(10, 'Midnight', 'Sunken Cargo Container',             'A single lost shipping container can smother several square metres of deep-sea chemosynthetic habitat for centuries.',                                         2200, 'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/metal-container.png'),
(11, 'Midnight', 'Discarded Medical Waste Barrel',     'Pre-1980s ocean-dumped medical waste barrels still leach pathogens and pharmaceutical compounds into abyssal sediment.',                                       3100, 'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/medical-waste.png'),
(12, 'Midnight', 'Deep-Sea Trawl Net Fragment',        'Lost trawl net mesh continues trapping deep-water species like grenadier fish and crustaceans with no mechanism for release.',                                3800, 'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/trawl-net.png'),

-- Abyssal Zone (4,000–6,000m)
(13, 'Abyssal',  'Plastic Detergent Bottle',           'Surfactant residues in detergent bottles disrupt the lipid-based cell membranes of pressure-adapted abyssal bacteria.',                                       4700, 'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/plastic-detergent.png'),
(14, 'Abyssal',  'Corroded Lead Fishing Weight',       'Lead sinkers gradually dissolve in cold abyssal water, poisoning the sediment layer that deep-feeding organisms rely on.',                                    5500, 'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/fishing-weight.png'),

-- Hadal Zone (6,000–11,000m)
(15, 'Hadal',    'Polyethylene Microplastic Pellet',   'Microplastics have been found in the guts of amphipods at 10,890m depth in the Mariana Trench, the deepest confirmed plastic contamination on Earth.',       9200, 'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/microplastics.png');


INSERT INTO marine_life (trash_id, common_name, scientific_name, zone_name, how_affected, image_url) VALUES
-- Sunlight Zone
-- (1) Single-Use Plastic Bag → Loggerhead Sea Turtle
(1,  'Loggerhead Sea Turtle',      'Caretta caretta',              'Sunlight', 'Mistakes floating plastic bags for jellyfish prey; ingestion causes fatal intestinal blockages and internal gas buildup.',                                'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/loggerhead-turtle.png'),
-- (2) Aluminium Soda Can → Staghorn Coral
(2,  'Staghorn Coral',             'Acropora cervicornis',         'Sunlight', 'Aluminium oxide leached from corroding cans raises local pH toxicity, bleaching coral polyps and halting calcium carbonate growth.',                     'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/STAGHORN-CORAL.png'),
-- (3) Disposable Cigarette Lighter → Bottlenose Dolphin
(3,  'Bottlenose Dolphin',         'Tursiops truncatus',           'Sunlight', 'Heavy metals released from degrading lighters bioaccumulate up the food chain, impairing dolphin immune and reproductive systems.',                      'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/dolphin_bottlenose.png'),
-- (4) Polystyrene Foam Cup → Yellowfin Tuna (juvenile)
(4,  'Yellowfin Tuna',             'Thunnus albacares',            'Sunlight', 'Juvenile tuna ingest polystyrene microbeads alongside zooplankton, causing gut blockages and transferring toxic styrene compounds into tissue.',          'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/yellowfin-tuna.png'),
-- (4) Tangled Fishing Line → California Sea Lion
(5, 'California Sea Lion',         'Zalophus californianus',       'Sunlight', 'Discarded monofilament fishing line wraps around necks and flippers as sea lions swim and play near the surface, causing deep lacerations and strangulation as the animal grows.', 'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/sea-lion.png');

-- Twilight Zone
-- (6) Lost Crab Pot → Dungeness Crab
(6,  'Dungeness Crab',             'Metacarcinus magister',        'Twilight', 'Enters ghost traps attracted by bait scent or trapped prey and cannot escape, leading to starvation and death that baits further crabs.',               'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/crab2.png'),
-- (7) Rubber Car Tyre Fragment → Coho Salmon
(7,  'Coho Salmon',                'Oncorhynchus kisutch',         'Twilight', '6PPD-quinone leached from tyre rubber causes acute mortality in coho salmon at concentrations as low as 0.8 micrograms per litre.',                      'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/coho-salmon.png'),
-- (8) Discarded Scuba Tank → Lanternfish
(8,  'Lanternfish',                'Myctophum punctatum',          'Twilight', 'Corroding tanks alter dissolved oxygen and iron levels along vertical migration routes, disrupting the diel migration patterns lanternfish depend on.',   'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/lanternfish2.png'),
-- (9) Plastic Shipping Strap → Sperm Whale
(9,  'Sperm Whale',                'Physeter macrocephalus',       'Twilight', 'Rigid strapping bands encountered during deep dives cause severe mouth and flipper lacerations, and accumulate in stomachs alongside other ingested debris.', 'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/sperm-whale.png'),
 
-- Midnight Zone
-- (10) Sunken Cargo Container → Dumbo Octopus
(10, 'Dumbo Octopus',              'Grimpoteuthis boylei',         'Midnight', 'Containers smother soft sediment hunting grounds and chemosynthetic vent communities that dumbo octopuses rely on for shelter and prey.',                'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/dumbo_octopus.png'),
-- (11) Discarded Medical Waste Barrel → Sea Cucumber
(11, 'Sea Cucumber',               'Scotoplanes globosa',          'Midnight', 'Feeds directly on abyssal sediment and accumulates pharmaceutical compounds and pathogens leached from degrading medical waste barrels.',                'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/sea-cucumber.png'),
-- (12) Deep-Sea Trawl Net Fragment → Roundnose Grenadier
(12, 'Roundnose Grenadier',        'Coryphaenoides rupestris',     'Midnight', 'Slow-moving deep-water fish become entangled in lost trawl mesh with no means of escape, contributing to population declines already stressed by overfishing.', 'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/grenadier.png'),
 
-- Abyssal Zone
-- (13) Plastic Detergent Bottle → Abyssal Sea Cucumber (Holothurian)
(13, 'Abyssal Holothurian',        'Benthodytes sanguinolenta',    'Abyssal',  'Surfactants from detergent residue disrupt the lipid membranes of the bacteria these deposit feeders consume, removing a critical food source.',          'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/abyssal.png'),
-- (14) Corroded Lead Fishing Weight → Polychaete Worm
(14, 'Polychaete Worm',            'Glycera dibranchiata',         'Abyssal',  'Deposit-feeding worms ingest lead-contaminated sediment directly, accumulating neurotoxic lead compounds that impair reproduction and larval survival.',  'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/polychaete.png'),
 
-- Hadal Zone
-- (15) Polyethylene Microplastic Pellet → Amphipod
(15, 'Hadal Amphipod',             'Hirondellea gigas',            'Hadal',    'Scavenging amphipods at depths exceeding 10,000m have been found with microplastic fragments in their digestive tracts, confirming the deepest known plastic contamination on Earth.', 'https://xragmlmrgzsgbq5z.public.blob.vercel-storage.com/hadal-amphipod.png');