INSERT INTO trash_catalog (id, zone_name, item_name, impact_fact, required_unlock_depth, image_url) VALUES
-- Sunlight Zone (0–200m)
(1,  'Sunlight', 'Single-Use Plastic Bag',             'Sea turtles mistake plastic bags for jellyfish, causing fatal intestinal blockages.',                                                                          15,   NULL),
(2,  'Sunlight', 'Aluminium Soda Can',                 'Discarded cans leach aluminium oxide into shallow waters, disrupting coral reef chemistry.',                                                                   40,   NULL),
(3,  'Sunlight', 'Disposable Cigarette Lighter',       'Lighters contain butane and flint compounds that slowly release toxic heavy metals as they degrade.',                                                          80,   NULL),
(4,  'Sunlight', 'Polystyrene Foam Cup',               'Styrofoam never fully biodegrades and breaks into microbeads ingested by juvenile fish.',                                                                      120,  NULL),
(5,  'Sunlight', 'Tangled Fishing Line (Monofilament)','A single discarded monofilament line can entangle and drown seabirds and marine mammals for decades.',                                                         180,  NULL),

-- Twilight Zone (200–1,000m)
(6,  'Twilight', 'Lost Crab Pot (Ghost Trap)',         'Abandoned crab pots continue "ghost fishing," trapping and killing crustaceans indefinitely.',                                                                 350,  NULL),
(7,  'Twilight', 'Rubber Car Tyre Fragment',           'Tyre rubber leaches 6PPD-quinone, a chemical lethal to coho salmon even at trace concentrations.',                                                            600,  NULL),
(8,  'Twilight', 'Discarded Scuba Tank',               'Corroding steel tanks release iron and valve compounds that alter local oxygen levels in the water column.',                                                   800,  NULL),
(9,  'Twilight', 'Plastic Shipping Strap',             'Rigid polypropylene strapping bands are nearly invisible to marine life and cause severe laceration injuries.',                                                950,  NULL),

-- Midnight Zone (1,000–4,000m)
(10, 'Midnight', 'Sunken Cargo Container',             'A single lost shipping container can smother several square metres of deep-sea chemosynthetic habitat for centuries.',                                         2200, NULL),
(11, 'Midnight', 'Discarded Medical Waste Barrel',     'Pre-1980s ocean-dumped medical waste barrels still leach pathogens and pharmaceutical compounds into abyssal sediment.',                                       3100, NULL),
(12, 'Midnight', 'Deep-Sea Trawl Net Fragment',        'Lost trawl net mesh continues trapping deep-water species like grenadier fish and crustaceans with no mechanism for release.',                                3800, NULL),

-- Abyssal Zone (4,000–6,000m)
(13, 'Abyssal',  'Plastic Detergent Bottle',           'Surfactant residues in detergent bottles disrupt the lipid-based cell membranes of pressure-adapted abyssal bacteria.',                                       4700, NULL),
(14, 'Abyssal',  'Corroded Lead Fishing Weight',       'Lead sinkers gradually dissolve in cold abyssal water, poisoning the sediment layer that deep-feeding organisms rely on.',                                    5500, NULL),

-- Hadal Zone (6,000–11,000m)
(15, 'Hadal',    'Polyethylene Microplastic Pellet',   'Microplastics have been found in the guts of amphipods at 10,890m depth in the Mariana Trench, the deepest confirmed plastic contamination on Earth.',       9200, NULL);