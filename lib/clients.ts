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
};

export const CLIENTS: Client[] = [
  { name: "Allegiance Education", category: "Edtech" },
  { name: "Tax2Win", category: "Fintech" },
  { name: "Yug Vaastra", category: "D2C" },
  { name: "Tolaram Group", category: "D2C" },
  { name: "Jaipur Health Festival", category: "Healthcare" },
  { name: "Provess Healthcare", category: "Healthcare" },
  { name: "The Wellness Clinic", category: "Healthcare" },
  { name: "MySchool", category: "Edtech" },
  { name: "Anand Niketan Group of Schools", category: "Edtech" },
  { name: "CamberEdu", category: "Edtech" },
  { name: "Tagore Engineering College", category: "Edtech" },
  { name: "Unlock Career", category: "Edtech" },
  { name: "Shiksha Setu", category: "Edtech" },
  { name: "IgmGuru", category: "Edtech" },
  { name: "Legend Systems", category: "Tech" },
  { name: "WooCom Pro", category: "Tech" },
  { name: "iToks", category: "Tech" },
  { name: "DNS Pointers", category: "B2B" },
  { name: "CRM Pointers", category: "B2B" },
  { name: "Backtech", category: "Tech" },
  { name: "TheFabricLibrary", category: "D2C" },
  { name: "Basta", category: "D2C" },
  { name: "Brands Inc.", category: "D2C" },
  { name: "Modernwala's", category: "D2C" },
  { name: "AVS Groups", category: "D2C" },
  { name: "Pearl Spytech", category: "Tech" },
  { name: "Wealth Wisdom Consultants", category: "B2B" },
  { name: "Quincy Financial", category: "Fintech" },
  { name: "Civil Wallet", category: "Fintech" },
  { name: "Apex Bank Co-op", category: "Fintech" },
  { name: "Rajasthan State Co-operative Bank", category: "Fintech" },
  { name: "TG Consultancy", category: "B2B" },
  { name: "Schege", category: "B2B" },
  { name: "Upturn Health", category: "B2B" },
  { name: "TC Consultancy", category: "B2B" },
  { name: "Trueline Technologies", category: "Tech" },
  { name: "Volimy", category: "D2C" },
  { name: "Mission TEE", category: "Public" },
  { name: "Amrutam", category: "D2C" },
  { name: "Nutrition Simplified", category: "Healthcare" },
  { name: "PureEarth", category: "Public" },
  { name: "Reliable Media", category: "Media" },
  { name: "Politician Biodata", category: "Public" },
  { name: "Panchayati", category: "Public" },
  { name: "Satya", category: "Media" },
  { name: "THAAR Corp", category: "B2B" },
  { name: "RES — Rajasthan Engineering Colleges Society", category: "Public" },
  { name: "The Examiners", category: "Edtech" },
  { name: "MasterChef Rajasthan", category: "Media" },
  { name: "A2Z Smart Spaces", category: "Real Estate" },
  { name: "My Smart Webhost", category: "Tech" },
  { name: "MyWebsiteMart", category: "Tech" },
  { name: "Submerch.eu", category: "D2C" },
  { name: "HSDRC", category: "Public" },
  { name: "Haecce", category: "B2B" },
  { name: "Fashioner Bodice", category: "D2C" },
  { name: "Little-Pockets", category: "D2C" },
  { name: "Just Health & Wellness", category: "B2B" },
  { name: "Global Health & Wellness Festival", category: "B2B" },
  { name: "Bal Sansar Sansthan", category: "B2B" },
  { name: "Jungle Sting", category: "B2B" },
  { name: "DOR Care", category: "B2B" },
  { name: "Atal Library", category: "B2B" },
  { name: "Upjay Foundation", category: "B2B" },
  { name: "Urnik Restro", category: "B2B" },
  { name: "Yogscape", category: "B2B" },
  { name: "Bits n Bites", category: "B2B" },
  { name: "CivilWallet", category: "B2B" },
  { name: "Symbol of Safety", category: "B2B" },
  { name: "White Eduicots Pvt Ltd", category: "B2B" },
  { name: "GoodTenent", category: "B2B" },
  { name: "Liaison360", category: "B2B" },
  { name: "ELE Infotech", category: "B2B" },
  { name: "Haecce", category: "B2B" },
  { name: "Lumere", category: "B2B" },
  { name: "Mynsha Learning", category: "B2B" },
  { name: "Pink Eudicots", category: "B2B" },
  { name: "Pragyatah", category: "B2B" },
  { name: "Quincy", category: "B2B" },
  { name: "Regional Passport Office - Jaipur", category: "B2B" },
  { name: "RR Gurukul", category: "B2B" },
  { name: "Survi Ramming Mass", category: "B2B" },
  { name: "Team Phoenix", category: "B2B" },
  { name: "TechZu Software", category: "B2B" },
  { name: "The Rainbow Threads", category: "B2B" },
  { name: "The Wash Hut", category: "B2B" },
];
