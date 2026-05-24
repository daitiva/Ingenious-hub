/**
 * Client roster — pulled from the live ingenioushub.com Our Clients wall.
 * Categorized for industry filtering and editorial groupings.
 */

export type Client = {
  name: string;
  category:
    | "Edtech"
    | "D2C"
    | "B2C"
    | "Fintech"
    | "B2B"
    | "Healthcare"
    | "Media"
    | "Real Estate"
    | "Public"
    | "Tech";
  /** Public root domain (no scheme, no www). Used by <ClientLogo> as an
   *  auto-sourced fallback via Google's favicon service when no local
   *  verified asset is present. Leave undefined if the brand has no public
   *  site or the mapping isn't confirmed. */
  domain?: string;
};

export const CLIENTS: Client[] = [
  { name: "A2Z Smart Spaces", category: "Real Estate", domain: "a2zsmartservices.com" },
  { name: "Allegiance Education", category: "Edtech", domain: "allegianceedu.com" },
  { name: "Amrutam", category: "D2C", domain: "amrutam.global" },
  { name: "Anand Niketan Group of Schools", category: "Edtech", domain: "anandniketan.com" },
  { name: "Apex Bank Co-op", category: "Fintech" },
  { name: "Atal Library", category: "B2B" },
  { name: "AVS Groups", category: "D2C" },
  { name: "Backtech", category: "Tech", domain: "backtech.in" },
  { name: "Bal Sansar Sansthan", category: "B2B" },
  { name: "Basta", category: "D2C", domain: "basta.co.in" },
  { name: "Bits n Bites", category: "B2B" },
  { name: "Brands Inc.", category: "D2C" },
  { name: "CamberEdu", category: "Edtech", domain: "camberedu.com" },
  { name: "Civil Wallet", category: "Fintech", domain: "civilwallet.com" },
  { name: "CivilWallet", category: "B2B" },
  { name: "CRM Pointers", category: "B2B", domain: "crmpointers.com" },
  { name: "DNS Pointers", category: "B2B", domain: "dnspointers.com" },
  { name: "DOR Care", category: "B2B" },
  { name: "ELE Infotech", category: "B2B" },
  { name: "Fashioner Bodice", category: "D2C" },
  { name: "Global Health & Wellness Festival", category: "B2B" },
  { name: "GoodTenent", category: "B2B" },
  { name: "Haecce", category: "B2B" },
  { name: "Haecce", category: "B2B" },
  { name: "HSDRC", category: "Public" },
  { name: "IgmGuru", category: "Edtech", domain: "igmguru.com" },
  { name: "iToks", category: "Tech" },
  { name: "Jaipur Health Festival", category: "Healthcare" },
  { name: "Jungle Sting", category: "B2B" },
  { name: "Just Health & Wellness", category: "B2B" },
  { name: "Legend Systems", category: "Tech" },
  { name: "Liaison360", category: "B2B" },
  { name: "Little-Pockets", category: "D2C" },
  { name: "Lumere", category: "B2B" },
  { name: "MasterChef Rajasthan", category: "Media" },
  { name: "Mission TEE", category: "Public" },
  { name: "Modernwala's", category: "D2C", domain: "modernwala.com" },
  { name: "My Smart Webhost", category: "Tech", domain: "mysmartwebhost.com" },
  { name: "Mynsha Learning", category: "B2B" },
  { name: "MySchool", category: "Edtech" },
  { name: "MyWebsiteMart", category: "Tech", domain: "mywebsitemart.com" },
  { name: "Nutrition Simplified", category: "Healthcare" },
  { name: "Panchayati", category: "Public" },
  { name: "Pearl Spytech", category: "Tech", domain: "pearlspytech.com" },
  { name: "Pink Eudicots", category: "B2B" },
  { name: "Politician Biodata", category: "Public" },
  { name: "Pragyatah", category: "B2B" },
  { name: "Provess Healthcare", category: "Healthcare" },
  { name: "PureEarth", category: "Public", domain: "pureearth.org" },
  { name: "Quincy", category: "B2B" },
  { name: "Quincy Financial", category: "Fintech" },
  { name: "Rajasthan State Co-operative Bank", category: "Fintech", domain: "rscb.org.in" },
  { name: "Regional Passport Office - Jaipur", category: "B2B" },
  { name: "Reliable Media", category: "Media" },
  { name: "RES — Rajasthan Engineering Colleges Society", category: "Public" },
  { name: "RR Gurukul", category: "B2B" },
  { name: "Satya", category: "Media" },
  { name: "Schege", category: "B2B" },
  { name: "Shiksha Setu", category: "Edtech", domain: "shikshasetu.com" },
  { name: "Submerch.eu", category: "D2C" },
  { name: "Survi Ramming Mass", category: "B2B" },
  { name: "Symbol of Safety", category: "B2B" },
  { name: "Tagore Engineering College", category: "Edtech", domain: "tagore-engg.ac.in" },
  { name: "Tax2Win", category: "Fintech", domain: "tax2win.in" },
  { name: "TC Consultancy", category: "B2B" },
  { name: "Team Phoenix", category: "B2B" },
  { name: "TechZu Software", category: "B2B" },
  { name: "TG Consultancy", category: "B2B" },
  { name: "THAAR Corp", category: "B2B" },
  { name: "The Examiners", category: "Edtech" },
  { name: "The Rainbow Threads", category: "B2B" },
  { name: "The Wash Hut", category: "B2B" },
  { name: "The Wellness Clinic", category: "Healthcare" },
  { name: "TheFabricLibrary", category: "D2C", domain: "thefabriclibrary.in" },
  { name: "Tolaram Group", category: "D2C", domain: "tolaram.com" },
  { name: "Trueline Technologies", category: "Tech" },
  { name: "Unlock Career", category: "Edtech", domain: "unlockcareer.com" },
  { name: "Upjay Foundation", category: "B2B" },
  { name: "Upturn Health", category: "B2B" },
  { name: "Urnik Restro", category: "B2B" },
  { name: "Volimy", category: "D2C", domain: "volimy.com" },
  { name: "Wealth Wisdom Consultants", category: "B2B" },
  { name: "White Eduicots Pvt Ltd", category: "B2B" },
  { name: "WooCom Pro", category: "Tech", domain: "woocompro.com" },
  { name: "Yogscape", category: "B2B" },
  { name: "Yug Vaastra", category: "D2C", domain: "yugvaastra.com" },
];
