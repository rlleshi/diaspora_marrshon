// English text of the scandal case files, translated on 14 Nov 2026 from data/scandals.ts
// (glossary, exchange rates and the problems found in the Albanian text are in the
// translation notes, not in the app). Only text lives here: id, category, statusBucket,
// yearStart and each claim's verdict come from the Albanian record. scandalsFor() merges
// the two and fails the build if they drift apart, so edit both languages together.

import type { Locale } from "@/lib/content";
import { scandals, type Scandal, type ScandalClaim } from "@/data/scandals";

type ScandalText = Pick<
  Scandal,
  "title" | "period" | "teaser" | "redactedPhrase" | "narrative" | "status" | "verificationNotes" | "confidence" | "sources"
> & {
  claims: Pick<ScandalClaim, "claim" | "note">[];
};

const scandalsEnText: Record<string, ScandalText> = {
  "porti-durresit-eagle-hills": {
    "title": "The port of Durrës and the agreement with 'Eagle Hills' (Emaar) to relocate the port and build a zone of luxury apartments",
    "teaser": "The historic port's land was handed to the company 'Eagle Hills' for 13,000 apartments; the state holds only 33% of the capital.",
    "redactedPhrase": "33% of the capital",
    "narrative": [
      "In January 2023 the Rama government signed an agreement with the United Arab Emirates company 'Eagle Hills' (founded by Mohamed Alabbar, owner of Emaar Properties) to develop the 'Durrës Yachts & Marina' project on the land of the current port: a claimed investment of about €2 billion (first phase about €595 million) on about 450 hectares, with around 13,000 apartments, hotels and a marina, in which the state holds only 33% of the capital through the public company Albanian Seaports Development Company. The agreement was approved by a special law under a fast-tracked procedure in the Albanian parliament, without a documented competitive public tender; this was criticised for lack of transparency and competition even by the EU Commissioner for Enlargement himself, Oliver Varhelyi, and by 37 opposition MPs who challenged it before the Constitutional Court (November 2022). Former minister Eduard Halimi has claimed that 60% of 'Eagle Hills' is controlled through five companies registered in the Cayman Islands; the economist Pano Soko has estimated a risk of losses of up to €2 billion from relocating the port, plus about €150 million of land value transferred without full compensation (an economist's estimate, not an official figure). To replace the current port, a new port is planned at Porto Romano at a cost of about €399 million, entirely from the state budget; local urban planners and architects (Artan Kacani, Enea Papa) have raised doubts about seismic risk and the infrastructural unsuitability of the area. Further, on 30 June 2026 the Special Prosecution Office against Corruption and Organised Crime sent 8 defendants to trial over a different and separate scheme of forgery/alienation of state properties on the Durrës coast (about 687,798 m² of land, worth about €16.89 million); this case has no confirmed link to the Eagle Hills/state port company project and should not be confused with it."
    ],
    "status": "The Eagle Hills/state port company agreement has been signed and is being implemented; the tender for the new port at Porto Romano was still in progress according to reporting from August 2025. The opposition's constitutional challenge has not led (so far, according to the sources found) to the agreement being annulled. No known public investigation by the special prosecution office or by the Albanian Supreme Audit Institution specifically into the Eagle Hills/state port company contract itself was found; the documented criticism remains mainly political, economic, from civil society and from the EU, not criminal. The separate special prosecution case (30 June 2026, 8 defendants) concerns coastal property fraud in Durrës, but with no proven link to the port project.",
    "claims": [
      {
        "claim": "About €666 million in losses for the state, split into 124 million of public land + 400 million of building land + 84 million of infrastructure tax + 58.5 million of social housing fund removed from the budget",
        "note": "None of the sources searched (citizens.al, spak.gov.al, other searches in Albanian media) contains this breakdown or this specific sum. The sources found give other figures (e.g. the economist Pano Soko estimates about €150 million of transferred land value, or about 100 million from another estimate of €100/m² over about 1 million m²), but none of them supports the claimed breakdown or exact sum. The figure remains unverified."
      },
      {
        "claim": "The Durrës port land was turned into a zone of luxury apartments instead of the port being expanded as a cargo terminal",
        "note": "Confirmed by citizens.al: the 'Durrës Yachts & Marina' project with Eagle Hills provides for about 13,000 apartments, hotels (850 rooms) and a marina (280 yacht berths) on the land of the current port, while the commercial port function is planned to be relocated."
      },
      {
        "claim": "A plan for a new port at Porto Romano, questioned by experts",
        "note": "Confirmed: a planned cost of about €399 million from the state budget, with a tender opened in 2024. The urban planner Artan Kacani and the architect Enea Papa (quoted by citizens.al) have expressed doubts about the seismic risk and the readiness of the infrastructure."
      },
      {
        "claim": "The agreement was made without a transparent/competitive process",
        "note": "Approved by a special law under a fast-tracked procedure, without a documented public tender for the main project; explicitly criticised by the EU Commissioner Oliver Varhelyi and by the opposition (37 MPs, an appeal to the Constitutional Court, November 2022)."
      },
      {
        "claim": "The state keeps only a minority share of the profit, while it provides the land and finances the infrastructure",
        "note": "According to citizens.al, the state (through the state port company) holds 33% of the capital and a claimed profit of about €281 million is expected, while it provides the land and fully finances the new port (about 399 million); but the 'claimed profit' is based on projections by the private party, not on an independent audit."
      }
    ],
    "verificationNotes": "The most detailed piece of Albanian journalism on the project (citizens.al, 21 August 2025) discusses concrete figures of the Eagle Hills agreement (€2 billion total investment, €595 million for the first phase, €399 million for Porto Romano, a land valuation of around €150 million, €10–21.9 million of capital for the state port company) but mentions neither the figure of €666 million nor its breakdown into four budget items. Additional searches for the same figure gave no relevant result in Albanian or international media, and it remains undocumented in every journalistic or official source found.",
    "confidence": "medium",
    "sources": [
      "https://citizens.al/2025/08/21/porti-i-durresit-planet-vazhdojne-mes-paqartesise-dhe-perfitimeve-per-pak-njerez/",
      "https://citizens.al/2026/06/02/investitoret-strategjike-ligji-qe-u-dha-privateve-bregdetin/",
      "https://citizens.al/2026/01/22/darka-e-sazanit-si-u-vu-pasuria-publike-ne-tryeze/",
      "https://spak.gov.al/njoftim-per-shtyp-date-30-06-2026-spak-dergon-ne-gjyq-8-te-pandehur-per-nje-skeme-kriminale-te-falsifikimit-dhe-tjetersimit-te-pronave-ne-bregdetin-e-durresit/"
    ]
  },
  "koncesionet-shendetesise": {
    "title": "The health concessions (Check-Up, sterilisation, dialysis, laboratories) 2015–2025",
    "period": "2015–2025 (contracts signed in 2015; first investigations 2015–2019; indictment March 2024; case still at trial January 2025)",
    "teaser": "Private dialysis costs the state double the real price; the former health minister is already on trial.",
    "redactedPhrase": "double the real price",
    "narrative": [
      "Since 2015 the Rama government has awarded four health services as concessions/public-private partnerships (universal check-ups, sterilisation of surgical instruments, haemodialysis and hospital laboratories), with a total contract value of about 45.5 billion lek (about €376 million), of which about 22.3 billion lek (about €189 million) had been paid by the end of 2022, according to the \"Together for Life\"/SMART Balkans report (September 2025), based on audits by the Albanian Supreme Audit Institution. Repeated audits by the Supreme Audit Institution have documented extra payments for services not delivered or overbilled: for \"Check-Up\" an extra cost of 801 million lek (about €5.9 million) was found for 2015–2018 (168 million in 2018 alone, about €1.3 million) from expenditure that was not realised and VAT invoiced without justification, while for haemodialysis 103.5 million lek (about €950,000) was paid in 2023 for cases \"not performed\" or outside the projection. The most serious scandal in criminal terms remains the sterilisation concession (2015): the Special Prosecution Office against Corruption and Organised Crime registered the investigation as early as 2019/2020, issued 8 arrest warrants in August 2023 and on 30 March 2024 sent 9 defendants for trial (case no. 13/2020), including the former health minister Ilir Beqaj and the former deputy minister Klodian Rjepaj, charged with \"theft through abuse of office\" as a structured criminal group, forgery of documents and abuse of office; the Special Court of First Instance for Corruption and Organised Crime accepted the case for trial on 23 January 2025, with no final ruling to date. The medical laboratories concession (2020, projected value about 13 billion lek/$114 million over 10 years, awarded to a consortium with companies in Tirana and France and an entity registered in the Netherlands) is under active investigation by the special prosecution office for corruption, but with no indictment sent to trial so far."
    ],
    "status": "Partly in active court proceedings. Surgical instrument sterilisation concession: criminal case sent for trial by the special prosecution office (March 2024), accepted by the special court of first instance (January 2025), currently at trial (abbreviated procedure for 8 of the 9 defendants), WITHOUT a final verdict of guilt yet. Medical laboratories concession: under active investigation by the special prosecution office for corruption, with no indictment sent to trial to date. Check-Up concession: only audit findings by the state audit office on unjustified payments; no criminal proceedings registered with the special courts are on record. Dialysis concession: repeated state audit office findings of uncontrolled expenditure and payments for services not performed, with no separate criminal proceedings identified other than the one linked to sterilisation.",
    "claims": [
      {
        "claim": "The state pays private concessionaires fees above market prices (general overpayment)",
        "note": "Reports by the state audit office and by Together for Life/SMART Balkans document inflated costs and unexplained price increases (e.g. an 84% increase in the value of the sterilisation service in 2017, without justification). There are also direct comparisons with figures: for dialysis, the state reimburses private concessionaires 12,106 lek (about €110) per session, against 6,110 lek (about €56) for the same session in a tender opened by the Mother Teresa University Hospital Centre in 2023 (publik.al), roughly double; for the check-up, the winning operator received 1,537 lek (about €11) per check against 1,299 lek (about €9.3) in the second bid (transparency.com.al), around 18% more expensive."
      },
      {
        "claim": "Concessionaires are paid even for services not performed: the 'Check-Up' case",
        "note": "The state audit office (2019 audit of the 2018 budget) found 801 million lek (about €5.9 million) of extra cost in 2015–2018 (168 million in 2018 alone, about €1.3 million) from variable expenditure that was not realised and VAT invoiced for services not performed. The media (Pamfleti) reported over €6 million paid for tests not performed and unjustified VAT reimbursement. For dialysis, the state audit office in 2024 found payments of 103.5 million lek (about €950,000) for 'services not performed' in 2023 (9,241 cases below the projection, 1,557 above the projection)."
      },
      {
        "claim": "Rationing of care: limits on operations, tests refused once 'the monthly quota runs out'",
        "note": "After an extended search of citizens.al, reporter.al and the 57-page Together for Life/SMART Balkans report (September 2025), no source was found that specifically documents a monthly limit on operations or tests being refused after a 'quota'. The only related article (Citizens.al, 2017) mentions only that the check-up is done once a year regardless of medical need, which is not the same claim. It remains unconfirmed, not contradicted."
      },
      {
        "claim": "Dismantling of existing public capacity (public hospitals/laboratories) as a result of the concessions",
        "note": "None of the sources found (the state audit office, Together for Life, citizens.al, reporter.al, the special prosecution office) documents an explicit closure or dismantling of previous public capacity. The Together for Life report speaks of a 'risk to the system' and a loss of trust in the public sector, not of physical dismantling of capacity."
      },
      {
        "claim": "The surgical instrument sterilisation concession (2015): investigation, arrests, criminal charges",
        "note": "The special prosecution office registered criminal case no. 13/2020; issued 8 arrest warrants on 17 August 2023; on 30 March 2024 sent 9 defendants for trial (the former minister Ilir Beqaj, the former deputy minister Klodian Rjepaj, Ilir Rrapaj, Marsela Serjani, Saimir Kadiu, Petref Mersini, Arben Gjata, Genc Burazeri, Naile Ajazi) for 'theft through abuse of office as a structured criminal group', forgery of documents and abuse of office. The special court of first instance accepted the case for trial on 23 January 2025. Confirmed by the special prosecution office's official announcement and by citizens.al. By September 2025 (the date of the Together for Life report) there was still no final verdict of guilt."
      },
      {
        "claim": "The value of the haemodialysis concession about $86 million and of the sterilisation concession about $100 million (initial figures, 2015–2016)",
        "note": "Balkanweb (2016), cited in the Together for Life report, reported these figures as the values under investigation by the prosecution as early as December 2015."
      },
      {
        "claim": "The medical laboratories concession (2020): value about 13 billion lek/$114 million over 10 years, under corruption investigation",
        "note": "Reporter.al (26 January 2022), cited in the Together for Life report: the contract was awarded to the consortium Labopharma (Tirana)/Exalab (France)/AB Laboratory Solution B.V. (The Hague, Netherlands), operated by 'Laboratory Networks'. The state audit office has questioned the procedures and the special prosecution office is investigating for corruption, but by the date of the Together for Life report the case had not yet been sent to trial."
      }
    ],
    "verificationNotes": "The deputy dean of the Faculty of Medicine, Ilir Alimehmeti, describes the dialysis overpayment (around double the real price, according to publik.al) as an organised favouritism scheme, not mere inefficiency. The check-up price difference (around 18% above the second bid) applied to 600,000 checks a year, according to transparency.com.al. It should be stressed that the dialysis figure refers to the wider \"health packages\" scheme of the Compulsory Health Care Insurance Fund, which overlaps with, but is not identical to, the specific haemodialysis concession contract under investigation; both nevertheless belong to the same phenomenon: state payments to private providers above the real cost.",
    "confidence": "high",
    "sources": [
      "https://www.togetherforlife.org.al/wp-content/uploads/2025/09/Raportimi-i-korrupsionit-te-larte-ne-shendetesi-2014–2024.pdf (Together for Life/SMART Balkans report, September 2025, based on audits by the Albanian Supreme Audit Institution, on the special prosecution office and on the media)",
      "https://citizens.al/2022/12/28/raporti-shendetesia-me-koncension-i-kushton-miliarda-leke-taksapaguesve/",
      "https://citizens.al/2023/08/17/spak-leshon-8-urdher-arreste-per-koncesionin-e-sterilizimit/",
      "https://spak.gov.al/njoftim-per-shtyp-date-30-03-2024/ (official announcement of the special prosecution office)",
      "https://citizens.al/2017/10/24/programi-i-check-up-duhet-te-marre-fund-eshte-nje-humbje-e-madhe-parash-publike/",
      "reporter.al (26 January 2022, article on the laboratories concession, cited in the Together for Life report)",
      "balkanweb.com (2016, article on the investigation into the haemodialysis/sterilisation concessions, cited in the Together for Life report)",
      "Reports of the Albanian Supreme Audit Institution: 'Për zbatimin e buxhetit të shtetit për vitin 2017/2018' (On the implementation of the state budget for 2017/2018), 'Raporti Vjetor i Performancës KLSH 2024' (the audit institution's Annual Performance Report 2024), 'Raport përfundimtar auditimi performance - Shërbimi në Terapinë Renale Zëvendësuese... 2023' (Final performance audit report: the Renal Replacement Therapy Service... 2023) (cited in the Together for Life report)"
    ]
  },
  "inceneratoret": {
    "title": "The incinerators (Tirana, Fier, Elbasan)",
    "period": "2016–2026 (contracts 2016–2018; investigations and trials continue)",
    "teaser": "The Tirana plant reportedly never functioned; the former minister Lefter Koka spent four years in pre-trial detention.",
    "redactedPhrase": "four years in pre-trial detention",
    "narrative": [
      "The waste incinerator scheme in Tirana, Fier and Elbasan is one of the best-documented corruption cases under the Rama government. The former environment minister, Lefter Koka, was arrested by the Special Prosecution Office against Corruption and Organised Crime on 14 December 2021 and held in pre-trial detention for about four years, charged with corruption, abuse of office and money laundering in connection with rigged public tenders (the Fier contract alone is valued at about $30.5 million, around €28 million). In September 2023 he was convicted at first instance and sentenced to 6 years and 8 months in prison for the Fier case, and he was also convicted separately in the Elbasan case; that conviction was later upheld by the Supreme Court and is now final. The status of the Fier case remains procedurally open (it was sent back for retrial by the Court of Appeal in December 2024 and again by the Supreme Court in October 2025), with no final ruling in this case. The Tirana plant is reported never to have physically existed as a functioning facility, while some of the internationally wanted owners of the beneficiary companies kept receiving payments from the state treasury even after they had been declared fugitives."
    ],
    "status": "Convicted: the Elbasan case is final; the Fier case was sent back for retrial and has no final ruling.",
    "claims": [],
    "confidence": "high (cross-checked with Balkan Insight, Albanian Daily News, Shqiptarja.com, Politiko.al, Pamfleti.net, BalkanWeb, Shekulli, Hashtag.al, CNA.al, Panorama.al, RTSH)",
    "sources": [
      "https://freedomhouse.org/country/albania/nations-transit/2024",
      "https://en.wikipedia.org/wiki/Edi_Rama"
    ]
  },
  "oshee-kesh-borxhet": {
    "title": "The scandal of debts and abuses at the Electricity Distribution Operator and the Albanian Power Corporation",
    "teaser": "Unpaid bills owed to the state energy company rose from €9 million to €750 million within a decade.",
    "redactedPhrase": "€750 million",
    "narrative": [
      "Under the Rama government, unpaid bills owed by customers (households, businesses, institutions) to the Electricity Distribution Operator have risen sharply: from around €9 million in 2013, unpaid obligations reached €687 million in August 2022 and €750 million in 2023 (according to fastnewseconomy.com: 414 million from households, 176 million from off-budget institutions, 114 million from private businesses). These figures often circulate wrongly as \"the distributor's debt\", whereas they are obligations of customers TO the distributor, not debt of the company itself. The distributor's own debt to private power producers (hydropower plants) is markedly smaller: according to the final report of the Albanian Supreme Audit Institution (February 2025, based on audited financial statements up to 31 December 2023), it rose from 1.37 billion lek (about €11 million) in 2020 to 4.95 billion lek in 2023, around €40–50 million. Meanwhile, in April 2025 the distributor declared itself unable to repay around €500–620 million of debt to the Albanian Power Corporation itself (according to reports citing the audit institution); this part of the picture remains a genuine debt of the distributor. The Supreme Audit Institution has found distortion of the 2017–2020 financial statements and over this sought measures concerning the former energy minister Damian Gjiknuri as the representative of the state shareholder, not as someone facing criminal charges. Separately, a BalkanWeb report from News24's investigative programme \"Vetting\" describes suspicious tendering patterns on the Hungarian power exchange known as HUPX during 2020–2021, where purchase prices often doubled precisely on the days the tenders were announced. Independent data (based on the Energy Regulator Authority and regional exchanges, on the portal ndiqparate.al) confirm that in 2021 Albania paid on average around 80% more than the Hungarian exchange's average annual price. Journalistic investigations (the programme \"Vetting\", May 2024) have documented around €1.1 billion of losses/undeclared balances among the distributor, the power corporation and the Transmission System Operator for 2018–2023, a figure not officially confirmed by the state. The Special Prosecution Office against Corruption and Organised Crime has several active investigations, none closed with a publicly known indictment: on 24 January 2024 it searched the distributor's offices over a suspected bribery scheme to erase debts from the system (the phone of the administrator of the Universal Service Supplier, Elton Sevrani, was seized; he later left the post); former minister Gjiknuri was questioned by the special prosecution office in March 2024; the former director of the distributor (2014–2023), Ardian Çela, appeared at the special prosecution office in October 2024; the former director of the power corporation, Ergys Verdho, was summoned over suspicious tenders; and in October 2025 the special prosecution office carried out personal searches (office, home, phone) of the distributor's current administrator, Enea Karakaçi. To date none of these people appears to have been formally charged by a court decision or convicted; all remain under investigation or have been mentioned as linked to investigations without public details of any charges. The figure of €290 million of debt to private hydropower producers, reported by a single source (pamfleti.net) for purchases in 2022–2023 from 73 private hydropower plants, is markedly higher than what the audit institution's final report later found (about €40–50 million by the end of 2023); it is therefore not merely unconfirmed but contradicted by the official audit."
    ],
    "status": "Under active investigation by the special prosecution office in several separate, unclosed cases (searches, summonses for questioning, seizures of documents/phones from January 2024 to October 2025); administrative recommendations and findings by the state audit office against former minister Gjiknuri over distorted financial statements; so far there is no known public indictment or final conviction of any senior official in connection with the distributor scandal.",
    "claims": [
      {
        "claim": "Abusive billing",
        "note": "No clear source was found documenting 'abusive billing' of end consumers as a legally proven systematic practice. There is a special prosecution investigation (January 2024) into another scheme, related but different: erasing/removing customers' obligations (debts) from the system in exchange for bribes, i.e. manipulation in the opposite direction (artificially lowering the bills of some customers, not overbilling)."
      },
      {
        "claim": "'Technical' losses alleged to be systemic electricity theft by politically connected companies, covered by the taxpayer",
        "note": "Data were found on persistent non-technical losses (theft) over the years despite about €500 million of investment in infrastructure, and on suspected favouritism in tenders (the same winning companies right at 98–99% of the budget, other companies such as 'EN-EL' that took part but never won), according to the journalistic investigation 'Vetting'. But no independent source was found that directly links 'politically connected companies' to electricity theft disguised as technical losses; this remains an unconfirmed claim."
      },
      {
        "claim": "Customers owe the distributor €750 million in unpaid bills up to 2023",
        "note": "Confirmed by telegraf.al (May 2024) and the state audit office's final report (February 2025): €750 million are obligations of customers (not debt of the distributor itself) up to 2023, from over 564,000 debtors; timeline: 2013 about €9 million, 2022 €687 million (August)."
      },
      {
        "claim": "Suspicious price patterns in electricity purchases referenced to the Hungarian exchange (2020–2021)",
        "note": "Confirmed by the BalkanWeb report (News24's investigative programme \"Vetting\") with specific dates (e.g. on 2 July 2021 electricity was bought at €122.5/MWh against €75.9 the previous day, almost double within 24 hours) and by the independent analysis of energy regulator/regional exchange data (ndiqparate.al), which shows about 80% overpricing above the Hungarian exchange's average in 2021. The state audit office's finding concerning former minister Gjiknuri, as the representative of the state shareholder, relates to the distortion of the 2017–2020 financial statements, not to these purchases; it is an administrative audit finding, not a criminal charge or conviction."
      },
      {
        "claim": "The special prosecution office is investigating a bribery scheme to erase bills/obligations from the distributor's system",
        "note": "Confirmed by several media outlets (sot.com.al, hashtag.al, tiranapress.al, boldnews.al): a special prosecution search of the distributor's offices on 24 January 2024, seizure of the phone of the Universal Service Supplier administrator Elton Sevrani. The investigation remains open, with no publicly known outcome."
      }
    ],
    "confidence": "medium",
    "sources": [
      "https://www.balkanweb.com/klsh-kerkoi-masa-ndaj-gjiknurit-oshee-bente-tendera-per-blerje-energjie-kur-cmimi-rritej-ne-treg-loja-me-bursen-hupx-dhe-favorizimi-i-kompanive/",
      "https://telegraf.al/ekonomi/hetim-zyrtareve-te-oshee-borxhi-i-ndermarrjes-arrin-ne-750-milion-euro/",
      "https://telegraf.al/ekonomi/shteti-fundos-oshee-borxhi-arrin-687-mln-euro/",
      "https://rdnews.al/index.php/2024/05/02/si-u-zhduken-1-1-miliarde-euro-nga-oshee-kesh-dhe-ost/",
      "https://euronews.al/ish-kreu-i-oshee-paraqitet-ne-spak/",
      "https://sot.com.al/aktualitet/spak-zbarkon-ne-zyrat-e-oshee-sekuestrohen-dokumente-dhe-celularet-e-i638166/",
      "https://ndiqparate.al/?p=17086",
      "https://www.klsh.org.al/ (compliance audit report on the Albanian Power Corporation, the Electricity Distribution Operator and the Transmission System Operator, referred to by balkanweb.com)",
      "https://www.kapitali.al/bie-maksa-e-suksesit-energjetik-oshe-shpall-pamundesine-per-te-paguar-gjysme-miliarde-euro-borxhe-ndaj-kesh/",
      "pamfleti.net (the figure of €290 million of debt to 73 private hydropower plants, not verified by a second source)"
    ]
  },
  "becchetti-arbitrazhet": {
    "title": "International arbitrations lost by the Albanian state: the Becchetti/Agonset case",
    "teaser": "Five lost international arbitrations cost the state budget around €180 million.",
    "redactedPhrase": "€180 million",
    "narrative": [
      "According to Ministry of Finance data (September 2025, reported by CNA.al, Albeu.com and other media), the Albanian state has around €180 million in liabilities from five lost international arbitrations. The largest part (around 60% of the total, about €108–110 million in the original award) comes from the International Centre for Settlement of Investment Disputes case \"Hydro and others v. Albania\" (ARB/15/28), brought by the Italian entrepreneur Francesco Becchetti and other partners over the unlawful expropriation of their interests in the hydropower company Agonset; on 24 April 2019 the tribunal established the state's liability. The sum is not directly linked to the closure of any television station: Becchetti also had the channel Agon Channel/Channel One, shut down by the authorities around 2017–2018, a matter politically connected to, but legally separate from, the arbitration award. The figure of about €130–135 million mentioned in the media refers to the funds that Becchetti managed to freeze at Eurocontrol in Brussels (accounts of the state-owned company Albcontrol), grown over time by interest, as a means of enforcement after Albania refused to pay directly. Albania has contested the award in court (Paris, Brussels) with accusations of corruption/unlawful influence on the arbitral panel, but the Paris Court of Appeal (December 2025) and the Belgian courts have rejected these requests, leaving the liability in force; the former finance minister Arben Ahmetaj had declared in 2020 that Becchetti \"will get nothing\", a claim contested by the ministry's own official reports. In parallel, Albanian courts (Tirana, on appeal on 30 September 2025) have convicted Becchetti (together with associates) and sentenced him to 12 years in prison for theft through abuse of office, money laundering, forgery of documents and a VAT fraud scheme connected to the same hydropower project; according to the available indications the proceedings took place in absentia, while Becchetti claims that the prosecution was political revenge for his TV station's line critical of the Rama government."
    ],
    "status": "Partly closed, partly active: the international arbitration award (2019) has been definitively confirmed by the Paris Court of Appeal (December 2025) and by the Belgian courts and is being enforced by freezing state assets abroad; the Albanian criminal case against Becchetti has an appeal ruling (September 2025, 12 years in prison), but he himself remains abroad/internationally wanted.",
    "claims": [
      {
        "claim": "About €130 million from the Becchetti case alone",
        "note": "The original arbitration award (2019) was about €108–110 million (principal + costs), around 60% of the total; with interest, the sum frozen at Eurocontrol/Albcontrol reached about €130–135 million by the end of 2024. The figure of about €130 million is therefore approximately correct, but it represents the enforcement/interest stage, not the original amount of the award."
      },
      {
        "claim": "The sum is linked to the closure of Becchetti's television station (Agonset/Albania Screen)",
        "note": "Agonset is the name of the hydropower company (not a television company) for whose expropriation the arbitration award was made. Becchetti's television channel was called Agon Channel/Channel One and was closed separately by the Albanian authorities (about 2017–2018); the name 'Albania Screen' was not found in any verified source."
      },
      {
        "claim": "The funds were confiscated from state accounts abroad",
        "note": "Confirmed: Becchetti froze funds of Albcontrol (a state-owned company) at Eurocontrol in Brussels; the Belgian court ordered the funds to be transferred to Becchetti's representative, according to several media sources (5pyetjet.al/Dagospia, Tirana Times)."
      }
    ],
    "verificationNotes": "Monitor.al (7 November 2025) confirms that as of September 2025 the Ministry of Finance counted around €180 million in liabilities from five lost international arbitrations, in which the case \"Hydro and others v. Albania\" (Becchetti) accounts for around €108 million, or 60% of the total: \"the highest of the five lost cases\". FastNewsEconomy (October 2024) uses the figure of €181 million, taken from the Ministry of Finance's explanatory report attached to the 2025 draft budget. Several other Albanian sources (Mapo.al, Lapsi.al, Syri.net, Politiko.al) give similar figures (€179.6 million to €200 million), all citing the Ministry of Finance. The small variation in the figure reflects different reporting periods and the interest accumulated over time; no source contradicts the overall figure of around €180 million.",
    "confidence": "medium",
    "sources": [
      "https://citizens.al/2020/07/09/109-milion-euro-fatura-e-kripur-e-shtetit-shqiptar-ne-arbirtazh/",
      "https://icsid.worldbank.org/cases/case-database/case-detail?CaseNo=ARB/15/28",
      "https://www.tiranatimes.com/un-body-confirms-govt-is-to-pay-e110-million-in-damages-to-italian-investors/",
      "https://www.cna.al/aktualitet/arbitrazhet-qeveria-ka-180-milione-euro-detyrime-per-te-paguar-per-gj-i434707",
      "https://jusmundi.com/en/document/decision/en-hydro-s-r-l-costruzioni-s-r-l-francesco-becchetti-mauro-de-renzis-stefania-grigolon-liliana-condomitti-v-republic-of-albania-i-order-of-the-paris-court-of-appeal-dismissing-albania-s-set-aside-request-as-inadmissible-monday-1st-september-2025",
      "https://albeu.com/lajme/fatura-e-arbitrazhit-qendron-e-ngrire-shqiperia-ende-180-milione-euro-detyrime-te-pashlyera/835461/",
      "aktualitet.al: article on the ruling of the Paris Court of Appeal, December 2025",
      "euronews.al: article on Becchetti's criminal conviction in Albania"
    ]
  },
  "unaza-e-madhe-llogara": {
    "title": "The Great Ring Road and the Llogara Tunnel (the special prosecution investigation into the tenders under former deputy prime minister Balluku)",
    "period": "2018–2026 (active)",
    "teaser": "Special anti-corruption prosecutors are investigating 8 tenders for the Great Ring Road and the Llogara Tunnel; parliament rejected the former deputy prime minister's arrest with 82 votes.",
    "redactedPhrase": "82 votes",
    "narrative": [
      "This affair has two distinct layers. **The first** (2018): the company \"DH Albania\", described as a \"ghost\" firm with no real address, won public tenders worth around €30 million within two months (including Lot 1 of the New Ring Road, about €18 million), using forged documents with an alleged signature of a US official (Delaware). The Public Procurement Agency excluded the company; the Tirana court convicted its administrator, Avdjol Dobi (aged 26–28 according to the sources), in absentia and sentenced him to 6 months in prison; he has remained an international fugitive since 2018, while the investigation into officials of the Albanian Road Authority, the Transmission System Operator and the ministry themselves was closed without criminal charges at the time.",
      "**The second**, much broader (2025–2026): the Special Prosecution Office against Corruption and Organised Crime is investigating the former deputy prime minister and infrastructure minister, Belinda Balluku, for abuse of procedures in **all 7 lots of the Great Ring Road** (28.7 km, total cost about €433 million) **and** the tender of about €190 million for the **Llogara Tunnel** (a 2020–2021 procurement procedure with a limit fund of over 18.9 billion lek excluding VAT), 8 tenders in all. The prosecution's accusation rests on intercepted communications from 2021–2023 which, according to the prosecution, show prior coordination of the winners; 6 of the 7 Ring Road lots were won close to the maximum of the budget limit (94.5–96.1%). Balluku was formally declared a suspect on 31 October 2025 and suspended by the Special Court of First Instance for Corruption and Organised Crime (judge Erjon Çela), with a travel ban, around 19–20 November 2025; the Supreme Court rejected her appeal. Prime Minister Rama responded with two weeks of public attacks on the judicial system; the Constitutional Court initially \"froze\" the suspension (a partial procedural victory), but later, after the January hearing, kept the original suspension in force (February 2026). The leader of the Democratic Party's parliamentary group, Gazment Bardhi, publicly demanded Balluku's immediate removal and Rama's resignation; Prime Minister Rama dismissed Balluku from the government in a cabinet reshuffle on 26 February 2026. However, on **12 March 2026 the Albanian parliament**, with its Socialist majority (82 votes), **rejected the special prosecution office's request** to lift her immunity and arrest her; the case remains under active investigation, with no final criminal conviction to date. The former director of the road authority, Ervis (Evis) Berberi, has been in pre-trial detention since 2024 as a defendant/collaborator of justice in a broader corruption case inside the agency over the management of road tenders; so not all senior officials have escaped without consequences, even though Balluku herself has not yet been arrested.",
      "As for the Llogara Tunnel itself: besides the investigation into tender rigging, in January 2026, during heavy rain, several media outlets documented on video water leaking from the tunnel ceiling. The journalist Artan Hoxha (News24) cited a special prosecution file with statements by a Greek engineer who raised suspicions of missing reinforcement; the water resources expert Arduen Karagjozi (TV Klan) explained the phenomenon mainly as a natural geological effect with no immediate risk to stability. The event itself (the water leak) is confirmed; the exact cause (a structural defect versus a normal geological phenomenon) remains publicly unresolved, with no official statement from the road authority or the ministry."
    ],
    "status": "Under active investigation by the special prosecution office (2025–2026); Balluku dismissed from the government (February 2026) and suspended from state office, but not arrested after parliament's refusal (12 March 2026); the former road authority director Ervis Berberi in pre-trial detention as a collaborator of justice in a related case; only the administrator of DH Albania has a final criminal conviction (in absentia, 6 months).",
    "claims": [
      {
        "claim": "The forced eviction of over 600 families with police, tear gas and bulldozers in the 'public interest'",
        "note": "The use of police force and tear gas is confirmed (12 November 2019, the New Ring Road/Astir area: 33 houses demolished in one day, 13 injured, 10 arrested; further demolitions in January 2020 and March 2020). The total number of families/structures affected varies by source: citizens.al reports 317 properties (163 in the legalisation process) up to June 2024, while another article from the same source (January 2025) mentions 654 informal structures demolished in the northern section alone. No single official figure of 'over 600 families' verified by an authoritative source was found."
      },
      {
        "claim": "The first Ring Road tender (about €18 million) was won by a 'ghost' company with forged documents from the United States",
        "note": "Confirmed by several independent sources (report-tv.al, panorama.com.al, acp.al, standard.al, balkanweb.com, a reference to Voice of America): the company 'DH Albania' won Lot 1 (about €18 million, part of about €30 million in total across 2 tenders within 2 months, 2018), with forged documents that included an alleged signature of a US official (Delaware); the registered address turned out not to exist. The procurement agency excluded it from the tenders; the road authority filed a criminal complaint; only the company's administrator was convicted, not institutions or state officials."
      },
      {
        "claim": "The special prosecution office is investigating minister Balluku for predetermining the winners of seven other Ring Road tenders",
        "note": "Confirmed as an active special prosecution investigation/accusation (not a final conviction): the special prosecution office is investigating Balluku for abuse in all 7 lots of the Great Ring Road tenders (2021) plus the Llogara tunnel (some reports speak of 8 tenders in total), based on intercepted communications from 2021–2023 which, according to the prosecution, show that the winners were predetermined; 6 of the 7 tenders were won at 94.5–96.1% of the budget limit. Balluku was suspended and placed under a travel ban; on 12 March 2026 parliament rejected (82 votes) the special prosecution office's request for her arrest; the case remains open, with no final court ruling."
      },
      {
        "claim": "The road cost about 3 times as much as similar roads in the Balkans",
        "note": "The project's average cost was confirmed (about €433 million / 28.77 km ≈ €15 million/km, with segments of up to about €20 million/km in the northern section), but no article or direct comparative analysis with specific costs of similar regional roads was found to support the '3 times as much' figure. It is treated as an unverified claim."
      },
      {
        "claim": "A 26-year-old was sentenced to 6 months in prison (a fugitive); no official has been jailed yet",
        "note": "It is confirmed that Avdjol Dobi, the administrator of DH Albania (26 according to the initial arrest warrant, 28 according to later reports), was convicted in absentia and sentenced to 6 months in prison for forgery of documents and has been internationally wanted since 2018. The prosecution dropped the investigation into officials of the road authority/transmission operator/ministry in that specific case. However, the part 'no official has been jailed' no longer holds as an absolute generalisation for the whole Ring Road saga: the former road authority director, Ervis Berberi, has been in pre-trial detention since 2024 (as a collaborator of justice) in a broader corruption case at the agency, while Balluku herself has not been arrested/convicted."
      },
      {
        "claim": "Rama's public attacks on the judiciary and the partial procedural \"victory\" at the Constitutional Court",
        "note": "(a 2-1 vote during the initial verification; supported by DW headlines in Albanian, but with fewer independent sources than the rest of the case)."
      },
      {
        "claim": "Bardhi's demand for dismissal/resignation and Balluku's final dismissal (26 February 2026)",
        "note": ""
      }
    ],
    "verificationNotes": "As for the number of families affected by the demolitions: citizens.al confirms that the police used tear gas against protesters (November 2019), that 10 protesters were arrested (including the activist Ervin Goci) and 13 people received medical help, and that President Ilir Meta described the institutions' conduct as \"arrogance towards misery\". No source found, however, gives a total figure of \"over 600 families\", only figures for separate episodes (317 to 654, depending on the period and area). The qualitative core of the claim stands; the specific figure remains unconfirmed. On the water leak in the Llogara tunnel, the bulevardnews.com article (12 January 2026) confirms it directly, quoting: \"The Llogara Tunnel has started leaking water from the very first rains, posing a real risk to travellers' lives\", with photos; this is independent confirmation from Albanian media, not only from social networks.",
    "confidence": "high (the Balluku/special prosecution part) / medium (the additional details on the Ring Road and the tunnel)",
    "sources": [
      "https://gazetashqiptare.al/2025/12/29/nga-balluku-te-veliaj-e-akshi-birn-jo-te-paprekshem-rekorde-te-reja-ne-luften-kunder-korrupsionit-ne-2025-perplasjet-mes-pushtetit-politik-dhe-sistemit-te-drejtesise/",
      "https://www.reporter.al/2025/11/20/pezullimi-i-ballukut-nga-gjykata-kerkohet-doreheqja-e-kryeministrit-rama",
      "https://www.reporter.al/2025/11/20/pezullimi-i-ballukut-nga-gjykata-kerkohet-doreheqja-e-kryeministrit-rama",
      "https://citizens.al/2025/01/09/unaza-e-madhe-e-tiranes-u-hap-por-trafiku-mbeti/",
      "https://citizens.al/2024/06/11/1-dekade-premtime-per-unazen-e-madhe-te-tiranes/",
      "https://citizens.al/2025/12/17/sekret-hetimor-apo-bllokim-politik-kuvendi-mohon-dosjen-e-spak-per-ballukun/",
      "https://citizens.al/2019/11/12/reagimet-per-ngjarjet-tek-unaza-e-re-ndal-dhunes-dhe-arrogances-perballe-mjerimit/",
      "https://citizens.al/2020/03/05/unaza-e-re-rinisin-shembjet-e-ndertesave-ne-lotin-e-dyte/",
      "https://sq.wikipedia.org/wiki/Unaza_e_Madhe_e_Tiranës",
      "https://report-tv.al/lajm/unaza-e-re-arrsh-kallezon-ne-prokurori-dh-albania-per-falsifikim-dhe-mashtrim-dokumenti",
      "https://www.panorama.com.al/unaza-e-re-tenderi-me-dokumente-amerikane-te-falsifikuara-prokuroria-nis-verifikimet/",
      "https://acp.al/news/5776/skandali-i-unazes-se-madhe-kompania-fitoi-30-milione-euro-tendera-publike/",
      "https://www.standard.al/rasti-i-dh-albania-tenderat-kompani-fantazme-offshore-dhe-vendime-tavoline-ku-po-na-con-kryeministri/",
      "https://www.balkanweb.com/unaza-e-re-basha-voa-zbuloi-se-shteti-ka-falsifikuar-dokumentet/",
      "https://shqiptarja.com/lajm/dosja-balluku-spak-ne-verifikim-te-gjithe-tenderet-per-7-lotet-e-unazes-se-madhe-dyshime-se-u-paracaktuan-fituesit-priten-te-tjere-te-pandehur",
      "https://www.balkanweb.com/spak-akuze-te-re-per-ballukun-tenderi-i-unazes-se-madhe-si-perfituan-20-mln-euro-euroteorema-pevlaku-dhe-nova-construction-cfare-zbuluan-prokuroret/",
      "https://www.voxnews.al/aktualitet/fakte-dhe-prova-te-reja-belinda-balluku-nen-hetim-edhe-per-7-tendera--i106435",
      "https://tempull.com/index.php/2025/12/16/nga-tuneli-i-llogarase-te-unaza-e-madhe-8-tenderat-qe-spak-po-heton-ndaj-ballukut/",
      "https://www.balkanweb.com/en/scary-video-footage-of-the-Llogara-tunnel--water-is-flowing--the-citizen-is-ironic--the-Balluk-tunnel--the-Palloshi-tunnel-was-broken/ (9 January 2026)",
      "https://gazetareforma.com/pamje-tronditese-nga-tuneli-i-llogarase-rrjedhje-uji-nga-tavani-qytetari-ironizon-palloshi-u-shpu/",
      "https://tvklan.al/pse-rrodhi-uje-nga-tuneli-i-llogarase-eksperti-shpjegon-fenomenin-qe-u-be-viral",
      "https://albaniantimes.al/spak-names-deputy-pm-balluku-as-official-suspect-over-llogara-tunnel-tender/",
      "https://en.wikipedia.org/wiki/Llogara_Tunnel",
      "https://www.reporter.al/2025/11/10/tuneli-i-llogarase-nga-tenderat-e-manipuluar-te-pikepyetjet-mbi-cilesine-e-ndertimit/",
      "https://www.reuters.com/world/probe-into-corruption-heart-albanias-government-2026-02-19/",
      "https://europeanwesternbalkans.com/2026/02/27/indicted-deputy-pm-belinda-balluku-dismissed-by-rama-as-a-part-of-reshuffle/",
      "https://www.balkanweb.com/asnje-surprize-ps-behet-bllokade-per-imunitetin-e-ballukut-me-forcen-e-kartoneve-rrezon-ne-kuvend-kerkesen-e-spak-per-arrestimin-live/"
    ]
  },
  "bankers-petroleum": {
    "title": "Bankers Petroleum: suspected avoidance of tax obligations and unjustified VAT refunds at Patos-Marinzë",
    "period": "2004–2025 (the activity under investigation covers 2004–2024; the criminal proceedings began in December 2024 and were still active in December 2025)",
    "teaser": "Albania's main oil operator, bought for $442 million, is under investigation for systematically avoiding its tax obligations.",
    "redactedPhrase": "$442 million",
    "narrative": [
      "Bankers Petroleum (today owned by the Chinese company Geo-Jade, which bought it for $442 million in 2016) has been the main operator of the Patos-Marinzë oilfield since 2004, providing around 95% of Albania's crude oil production. In December 2024, following a criminal complaint by the General Directorate of Taxation, the Fier prosecution office and then the Special Prosecution Office against Corruption and Organised Crime/the Special Court of First Instance for Corruption and Organised Crime opened criminal investigations into the company and its managers, suspecting systematic avoidance of tax obligations during 2004–2024. According to the prosecution, the company made oil sales/exports worth around 532 billion lek (approximately €5.3 billion / $5.7–6 billion) but declared losses every year, totalling around 11.7 billion lek (about €91 million), thereby avoiding profit tax and, as the prosecution suspects, obtaining unjustified VAT refunds (no exact sum has been made public for this item alone). The former administrator Leonidha Çobo and the current CEO, the Chinese national Hongping (Huanqin) Xiao, have been detained/arrested and placed under precautionary measures, while several other people, mostly foreigners, have been declared wanted; by December 2025 the special court had extended the deadline for the investigations, with no indictment or final court ruling. In addition, in 2019 the Albanian Customs Administration had fined the company €120 million for unpaid excise duty of around €30 million on diluents (diesel/thinner) used in oil processing during 2014–2018; this is an administrative matter separate from the current criminal investigation into profit tax and VAT."
    ],
    "status": "Under active investigation by the special prosecution office/special court (initiated by the Fier prosecution office in December 2024); the former administrator and the current CEO under precautionary measures (arrest/wanted notice), several other people declared wanted; the special court has extended the investigation deadline to the end of 2025; still no formal indictment filed and no final court ruling. The separate excise case (2019) was closed with a customs fine, which the company contests.",
    "claims": [
      {
        "claim": "The company has paid zero profit tax, constantly declaring losses",
        "note": "The fact of the declarations (the company reported losses every year 2004–2024, totalling about 11.7 billion lek, or about €91 million) is well documented by citizens.al and euronews.al. But the legal conclusion that this constitutes unlawful tax avoidance remains an accusation by the special prosecution office/the Fier prosecution office, not a fact proven in court: the case is still under investigation, with no final court ruling."
      },
      {
        "claim": "VAT fraud amounting to millions of euros",
        "note": "The prosecution suspects 'unjustified VAT refunds' as part of the current investigation, but none of the sources consulted gives a specific sum for the VAT fraud alone. There is a separate case (2019) with a €120 million customs fine for €30 million of unpaid excise duty on oil diluents (2014–2018); this is excise/customs (not VAT) and should not be confused with the original claim."
      }
    ],
    "verificationNotes": "citizens.al (4 July 2025) also quotes the company's own claims ($4.5 billion of investment, over $730 million of mineral royalties paid) and the state's historical figures (around $220 million of dubious expenses, around $75 million of unpaid tax liabilities).",
    "confidence": "medium",
    "sources": [
      "https://citizens.al/2025/07/04/bankers-petroleum-nen-hetim-dyshohet-se-per-20-vite-shmangu-taksat/",
      "https://citizens.al/2025/09/05/naftetaret-e-bankers-petroleum-protestojne-per-paga-dhe-kushte-me-te-mira/",
      "https://euronews.al/gjkko-pranon-kerkesen-e-spak-zgjaten-hetimet-per-bankers-petroleum/",
      "https://euronews.al/arrestohet-ceo-dhe-ish-administratori-i-bankers-petroleum-albania/",
      "https://sq.wikipedia.org/wiki/Bankers_Petroleum"
    ]
  },
  "rruga-e-kombit": {
    "title": "Rruga e Kombit (the Nation's Road): the construction and maintenance concession awarded to the Kastrati-Salillari consortium",
    "teaser": "The Milot-Morinë motorway was handed over under a 30-year concession, with no public investigation into the contract itself.",
    "redactedPhrase": "30-year",
    "narrative": [
      "In December 2016 the Rama government approved (Council of Ministers decision no. 870 of 14 December 2016) the 30-year concession contract for the construction, operation and maintenance of the Milot-Morinë motorway (\"Rruga e Kombit\", the Nation's Road), won by the consortium \"Catalyst Viva Das General Contracting-Salillari-Bee Tech-Violiap Ateve-Kastrati\", with a reported initial value of over €300 million over 30 years; the contract entered into force on 9 September 2017, and the concession company \"Albanian Highway Concession\" is in practice run 50-50 by Shefqet Kastrati and Pëllumb Salillari. The value of the concession later rose: in 2018 the government decided on additional compensation of about €48.5 million for lowering the tolls in the Kukës area, bringing the overall value to around €350 million (exit.al, September 2018); this is the same Kastrati-Salillari concession, not a confusion with the neighbouring, cancelled Milot-Balldre concession (€364.7 million, 35 years); the duration remains 30 years, not 35. Investigative journalism (Vox News, Citizens.al) has documented contractual non-compliance: in 2022 only 6 of 12 obligations had been fulfilled by the concessionaire, and the road continues to be reported as having problems (rocks falling from the slopes, deficient protective netting, the application of a fixed exchange rate higher than the market rate). On 2 January 2026 more than 20 vehicles were involved in chain collisions on the Nation's Road because of ice, as the concessionaire's salt-spreading vehicles were not out on the road, according to Faktor.al, Telegraf.al and Mapo.al (the last with a verified publication date of 2 January 2026); several people were injured and taken to the hospital in Rrëshen, while some of those who suffered damage announced civil lawsuits against the concessionaire for compensation. In January 2026 the Special Prosecution Office against Corruption and Organised Crime searched the company \"Salillari\" as part of investigations into abuses in road tenders in general (suspected bribes of up to 20% of contract values), but there is no public evidence that this investigation specifically covers the Nation's Road contract. In parallel, the concession company has asked the state for around €10 million in compensation for damage to the toll plaza during the 2018 protests against the toll; the Ministry of Infrastructure and Energy has rejected this request as excessive. No person connected with this concession has a criminal charge proven by a final court ruling; the issues remain the subject of journalistic investigations and of special prosecution searches of Salillari's business in general, while individual civil lawsuits over the January 2026 accident are under way."
    ],
    "status": "Active concession contract (2017–2047, under the 30-year term); no charge or confirmed public investigation specifically into the Nation's Road contract itself, but the co-owning businessman Pëllumb Salillari is subject to special prosecution searches over other road tenders (January 2026); individual civil lawsuits against the concessionaire after the accident of 2 January 2026, still under way.",
    "claims": [
      {
        "claim": "The contract runs for 35 years",
        "note": "The official tender notice (February 2016) and the official website of the concessionaire itself, Albanian Highway Concession (ahc.al), refer to Council of Ministers decision no. 870 of 14 December 2016 and a 30-year concession for Milot-Morinë, not 35. The 35-year term instead matches the other, cancelled concession, Milot-Balldre."
      },
      {
        "claim": "An accident in January with about 20 cars crashing, which the media linked to the lack of salt from the concessionaire",
        "note": "At least 5–6 independent media outlets (Faktor.al, Telegraf.al, Mapo.al, Syri.net, Oranews.tv, TVKlan) reported chain collisions involving over 20 vehicles on the Nation's Road on 2 January 2026, which they linked to the ice and the lack of salt from the concessionaire; the exact date (Friday, 2 January 2026) was verified from Mapo.al's publication metadata."
      }
    ],
    "verificationNotes": "Another claim, by an activist movement, speaks of \"over €1 billion\", but it refers to the total historical cost of the whole road since its initial construction in 2006–2010 (not the specific value of the 2016–2018 concession contract) and therefore does not contradict the figure of €350 million.",
    "confidence": "medium",
    "sources": [
      "https://web.archive.org/web/20240710203836/https://www.reporter.al/2016/12/15/qeveria-miraton-kontraten-e-koncesionit-300-milione-euro-te-rruges-se-kombit/ (Balkan Investigative Reporting Network/Reporter.al, 15 December 2016, author Gjergj Erebara)",
      "https://ahc.al/sq/rrjeti/ (official website of the concessionaire Albanian Highway Concession)",
      "https://openprocurement.al/sq/concession/view/id/36 (Open Procurement Albania: the separate Milot-Balldre concession, cancelled in 2025)",
      "https://www.voxnews.al/investigim/qindra-miliona-euro-per-rrugen-e-kombit-por-kastrati-dhe-salillari-nu-i34829 (investigation into the contractual non-compliance)",
      "https://faktor.al/2026/01/02/salillari-harron-te-hedhe-kripe-ne-rrugen-e-kombit-20-makina-bejne-aksident/",
      "https://telegraf.al/sociale/rruga-e-kombit-si-varreze-makinash-fale-salillarit-mbi-20-makina-aksidentohen-qytetaret-padi-per-koncesionarin/",
      "https://mapo.al/shqiperi/kronike/aksidente-zinxhir-ne-rrugen-e-kombit-autoambulanca-autobusi-dhe-i7222777 (published 2 January 2026)",
      "https://telegraf.al/aktualitet/hetimet-per-abuzimet-me-rruget-spak-kontrolle-te-salillari/ (11 January 2026)",
      "https://www.standard.al/kastrati-dhe-salillari-kerkojne-10-milion-e-demshperblim-per-traun-te-rruga-e-kombit/",
      "https://citizens.al/2024/07/17/te-gjitha-rruget-te-cojne-te-oligarket-levizja-bashke-denoncon-projektet-infrastrukturore/",
      "https://sq.wikipedia.org/wiki/Rruga_e_Kombit"
    ]
  },
  "bashkia-tirane-veliaj": {
    "title": "Tirana Municipality: building permits, the mayor's trial and money laundering in construction",
    "period": "2016–2026 (the laundering figure of about €1.6 billion refers specifically to 2017–2019; the investigation/trial of Veliaj takes place in 2024–2026)",
    "teaser": "The mayor of Tirana was arrested and is on trial for corruption and money laundering, with no final ruling. A separate international study estimates about €1.6 billion laundered through construction in 2017–2019.",
    "redactedPhrase": "with no final ruling",
    "narrative": [
      "A study by the international organisation Global Initiative against Transnational Organized Crime, picked up by the Balkan Investigative Reporting Network/Balkan Insight, Tirana Times, citizens.al, European Pulse and other media, estimates that during 2017–2019 (and not 2016–2020, as is sometimes stated) around €1.6 billion was laundered through the construction/real-estate sector in Albania, mainly in Tirana: around €320 million in 2017, 570 million in 2018 and 500 million in 2019; the three years add up to around €1.39 billion, and the gap with the overall figure of 1.6 billion cited by the study is not explained by the sources consulted. According to the same study, of 141 companies that received building permits for blocks of over 6 storeys in Tirana in 2017–2019, around 59% could not justify the financial capacity to complete them, which is considered an indirect indicator of financing of unclear origin. This figure remains an estimate/analysis by an international non-profit organisation (not a judicial finding) and has also been used politically by the opposition (the Democratic Party) against the mayor, Erion Veliaj. In a related but separate development, in February 2025 Veliaj himself (mayor of Tirana since 2015, a Socialist close to Edi Rama) was arrested by the Special Prosecution Office against Corruption and Organised Crime on specific charges of corruption and money laundering, linked specifically to issuing building permits/public contracts in exchange for benefits of around €1.1 million, channelled, according to the prosecution, through non-profit organisations and the law firm of his wife, Ajola Xoxa. In July 2025 he was sent to trial on 13 charges (passive corruption, money laundering, concealment of assets), together with construction businessmen (Fusha, Palushi, AgiKons, Gerard-A, Kontakt) and the former MP Klotilda Bushka; the trial is still ongoing and Veliaj remains in pre-trial detention, with no final court ruling to date. In parallel, the special prosecution office is also investigating another international network (\"Caribbean-Adriatic\") for laundering drug money through large construction projects in Tirana and on the coast. The link between the construction boom and rising rents/housing prices in Tirana is often mentioned in commentary and analysis, but no specific quantitative study in the sources consulted quantifies this cause-and-effect link."
    ],
    "status": "The Global Initiative study: a non-judicial estimate/analysis, not contested to date by the government with public counter-figures. The Veliaj case: active court proceedings at the special prosecution office/court (sent to trial in July 2025, still without a final ruling, in pre-trial detention). The \"Caribbean-Adriatic\" network: active special prosecution investigation.",
    "claims": [
      {
        "claim": "Tirana Municipality has issued hundreds/thousands of building permits under the Socialist administration",
        "note": "Confirmed by numerous reports (citizens.al): e.g. over 1.8 million m² of permits in 2022 alone, a doubling of the permitted floor area in 2023; the volume of construction in Tirana was consistently high in 2015–2024."
      },
      {
        "claim": "A link between the construction boom in Tirana and rising rents/housing prices",
        "note": "The link is often mentioned in public discourse and is intuitively reasonable (high demand, continuously rising prices), but no specific quantitative/econometric study proving this cause-and-effect link was found in the sources consulted during the research."
      },
      {
        "claim": "59% of the companies that received building permits for blocks of over 6 storeys in Tirana (2017–2019) lacked justified financial capacity",
        "note": "Confirmed by two independent sources (invest-in-albania.org and tiranatimes.com), both citing the same Global Initiative study based on 141 companies analysed."
      },
      {
        "claim": "The mayor of Tirana is charged by the special prosecution office with money laundering and corruption in connection with building permits",
        "note": "Erion Veliaj (mayor since 2015) was arrested by the special prosecution office in February 2025 and sent to trial in July 2025 on 13 charges, including money laundering and passive corruption in connection with building permits/public contracts (about €1.1 million in alleged benefits). This is an investigation/charge brought by the special prosecution office, still without a final court ruling; it does not constitute legally proven guilt."
      }
    ],
    "verificationNotes": "The claim is phrased broadly (\"hundreds/thousands\" of permits), without an exact figure, but it finds converging support from several sources. citizens.al notes that during Veliaj's second term (2019–2023) the average reached one permit every 42 hours, which works out mathematically to over 830 permits in that four-year term alone. Data from the Institute of Statistics (picked up by citizens.al) show 339 building permits for new buildings in the second quarter of 2022 and 509 in the same quarter of 2023, with Tirana accounting for around 62% of the national permitted floor area in the first half of 2023. The Global Initiative study confirms at least 141 companies that received permits for blocks of over 6 storeys in Tirana in 2017–2019 alone, a small subset of all permits. No source contradicts the claim or suggests a much smaller number; there is, however, no single verifiable official cumulative total for the whole period 2015–2025.\n\nA wide-ranging investigation by the Balkan Investigative Reporting Network (\"The Albanian Files\", July 2026) documents an alleged pattern of irregular, politically facilitated approvals for high-rise and luxury developments in Tirana under the Rama government. It includes the 44-storey \"Sun Moon Star\" tower (architect Sam Chermayeff), which received a development permit from the National Territorial Council for exactly the 30,000 m² of floor area that the architect says an official of the Territorial Development Agency had promised him three months earlier; the Austrian architect Chris Precht, who says that Prime Minister Rama contacted him directly on Instagram and who then designed the \"Eden\" structure built inside the courtyard of the Prime Minister's Office; and the claim by the critic Fatos Lubonja that some projects, including a five-star resort linked to Jared Kushner, were planned on protected land before the legal changes that made this possible had even been approved, which he calls proof of \"state capture\". This strengthens the documented link between Tirana's construction boom and politically concentrated benefits; the investigation was cross-checked with the original English version on Balkan Insight (9 July 2026) and the Albanian version on Reporter.al.",
    "confidence": "medium",
    "sources": [
      "https://citizens.al/dosja-veliaj-hetimet-akuzat-dhe-faktet/",
      "https://citizens.al/spak-dergon-ne-gjyq-erion-veliajn-per-korrupsion-dhe-pastrim-parash/",
      "https://citizens.al/?s=pastrim+parash+ndertim+Tirana",
      "https://europeanpulse.eu/politics/construction-in-albania-a-magnet-for-money-laundering/",
      "https://invest-in-albania.org/e1-6-billion-laundered-in-real-estate-in-albania-during-2017-2019/",
      "https://www.tiranatimes.com/iffs-in-albania-drug-trafficking-public-procurement-as-prime-sources/",
      "https://www.voxnews.al/english/aktualitet/studimi-i-fondacionit-gjerman-ndertimi-ne-shqiperi-magnet-per-pastrim-i107033",
      "https://albaniandailynews.com/news/dp-berates-tirana-mayor-of-favoring-money-laundering-",
      "https://balkaninsight.com/2026/06/17/caribbean-to-adriatic-albanian-prosecutors-target-drug-money-and-construction-magnates/bi/",
      "https://balkaninsight.com/2026/06/18/report-professionals-fuel-money-laundering-in-western-balkans/bi/",
      "https://en.wikipedia.org/wiki/Erion_Veliaj"
    ]
  },
  "bregdeti-kushner": {
    "title": "Coastal land (Sazan, Zvërnec) and the tourism project linked to Jared Kushner",
    "period": "December 2023 to July 2026 (active, ongoing process)",
    "teaser": "Special anti-corruption prosecutors are investigating the allocation of land for the tourism project linked to Jared Kushner and seized about €128 million from a local company; there are no charges against Kushner or the project's companies.",
    "redactedPhrase": "€128 million",
    "narrative": [
      "Since the end of 2023 the company \"Atlantic Incubator Partners\", linked to Jared Kushner (Donald Trump's son-in-law, through the fund Affinity Partners), has proposed building a luxury tourist complex on Sazan island and on the Zvërnec peninsula, in partly protected areas (the Karaburun-Sazan National Marine Park and the Vjosë-Nartë Protected Landscape). The Albanian government changed the law on protected areas in 2024 and granted the project \"strategic investor\" status on 30 December 2024, while the declared value of the investment rose from about €930 million (2024) to as much as about €1.4–1.5 billion in later reports. The ownership structure appears complex and partly opaque, built through several Dutch companies (Dutch Trust Management, Universal Properties Projects, Blue Industries Investment Holding), with ultimate owners identified by investigative journalism as the Qatari Al-Khayyat brothers, through Qatar-based \"Sazan Development/Operations Holding\" structures. The Special Prosecution Office against Corruption and Organised Crime has opened an investigation into irregularities in the allocation of the land and conflict of interest and has seized around €128 million from the accounts of the company \"Albania Land Development\"; in parallel, members of the Dutch parliament have raised formal questions about the transparency of the financial structures. The areas reported for the project total around 565–695 hectares (45 ha of development zone on Sazan, out of the island's total area of 562 ha; around 400 ha fenced off in Vjosë-Nartë; and around 120–250 ha of territory in Zvërnec), less than the figure of \"over 1,000 hectares\" circulating publicly. Likewise, the claim that the land is passing \"through businessmen with court records for document forgery\" remains unverified: only an unnamed reference was found to a \"client\" of the Dutch administering firm who was excluded in 2025 from a tender in Tirana for forged documents, with no identification of the person and no confirmed link to this project. The civic protests of the \"Flamingo Revolution\", which began at the end of May 2026, are still continuing in July 2026 (over 50 days in a row), demanding the cancellation of the project and of the law that made it possible.",
      "**The wider context, the \"Flamingo Revolution\":** Since the end of May 2026 the project has sparked daily civic protests against the government, known as the \"Flamingo Revolution\": over 35 nights in a row by early July 2026 according to AP News, reaching the 50th day on 20 July 2026 according to Citizens.al, with protesters demanding Rama's resignation. The Member of the European Parliament Tineke Strik has warned that the project puts Albania's European integration process at risk. This is also connected to the Balkan Investigative Reporting Network's broader \"Albanian Files\" investigation (see the \"Tirana Municipality\" section above), which cites the Kushner case as an example of a wider pattern of \"state capture\" in the approval of developments on protected land."
    ],
    "status": "Under active investigation by the special prosecution office (seizure of about €128 million from the accounts of \"Albania Land Development\") and the subject of parliamentary questions in the Netherlands; no indictment or final conviction yet. The project is still in negotiation/official development (Rama's speech, April 2026), while the \"Flamingo Revolution\" protests are still active (July 2026).",
    "claims": [
      {
        "claim": "The project is linked to Jared Kushner (Donald Trump's son-in-law) and his company Affinity Partners",
        "note": "Confirmed by independent sources (citizens.al and euronews.al, from March 2024 onwards): Kushner visited Sazan/Zvërnec in 2021 and in July 2023 together with Ivanka Trump; in December 2023 he submitted a formal proposal through 'Atlantic Incubator Partners LLC'; the Albanian government granted it 'strategic investor' status on 30 December 2024. The declared investment rose from about €930 million (August 2024) to about €1.4–1.5 billion in later reports."
      },
      {
        "claim": "The land is being handed over through businessmen with court records for document forgery",
        "note": "No named businessman with a confirmed court record for document forgery directly linked to this land transfer was identified, despite searching several sources. The only related piece of information: the citizens.al investigation (21 June 2026) mentions that an unnamed client of the Dutch trust administration firm 'Dutch Trust Management' was excluded in 2025 from a public tender in Tirana for submitting forged documents; but the identity of this client and their direct link to the Sazan/Zvërnec project are not confirmed."
      },
      {
        "claim": "The 2026 'Flamingo Revolution' protests are linked to this project",
        "note": "Confirmed by many citizens.al articles: daily protests since the end of May 2026 (the 50th day on 20 July 2026), including protests in Tirana (31 May 2026, after the violence in Zvërnec), in the village of Rrjoll and a symbolic action on Sazan island itself (20 July 2026), demanding the cancellation of the project and of the law that made it possible."
      },
      {
        "claim": "There is an official investigation/judicial action related to the project",
        "note": "The special prosecution office has opened an investigation into irregularities in the distribution of the land and conflict of interest (citizens.al, 21 June 2026) and has seized around €128 million from the accounts of the company 'Albania Land Development' (citizens.al, 9 July 2026). In parallel, the Dutch MPs Luc Stultiens and Julian Bushoff of the party Progressief Nederland (PRO) have tabled parliamentary questions to the Dutch Ministry of Finance about the shell-company structures involved. No indictment or final court conviction has been reported so far against the individuals involved."
      }
    ],
    "verificationNotes": "citizens.al consistently reports (January and June 2025) that Sazan island has a total of around 562–570 hectares, of which only around 45–45.6 hectares (8%) are a construction zone given to the project. As for Zvërnec, an early citizens.al article (January 2025) had noted that \"the Investment Committee's decision no longer mentions Zvërnec\", but later reports (citizens.al, June to July 2026, \"the documents that reveal who is taking control of Zvërnec and Sazan\" and \"Fighting for Zvërnec\") show that Zvërnec has remained an active part of the project and of the dispute over it.",
    "confidence": "medium (later additional research) / high (the link to the \"Flamingo Revolution\" protests, cross-checked with AP News and The Guardian)",
    "sources": [
      "https://citizens.al/2025/01/16/nga-vizitor-ne-investitor-strategjik-si-e-siguroi-sazanin-jared-kushner/",
      "https://citizens.al/2025/06/27/kushner-dhe-sazani-qeveria-krijon-kompani-per-zhvillimin-e-resortit-luksoz/",
      "https://citizens.al/2025/05/17/kushner-rama-vucic-trekendesh-interesash-ne-kurriz-te-publikes/",
      "https://citizens.al/2026/07/10/ne-lufte-per-zvernecin/",
      "https://citizens.al/2026/06/21/hetimi-per-korrupsion-lidhur-me-resortin-shqiptar-te-dhendrit-te-trump-te-con-ne-holande/",
      "https://citizens.al/2026/06/08/dokumentet-qe-zbulojne-kush-po-e-merr-ne-kontroll-zvernecin-dhe-sazanin/",
      "https://citizens.al/2026/05/12/66385/ (The Zvërnec trust)",
      "https://citizens.al/2026/07/09/projekti-i-kushner-hetohet-edhe-ne-parlamentin-holandez/",
      "https://citizens.al/2026/07/20/revolucioni-flamingo-shkon-ne-sazan/",
      "https://citizens.al/2026/06/01/protesta-nga-zverneci-deri-ne-rrjoll-shqiptaret-po-thone-boll/",
      "https://citizens.al/2026/04/08/ligj-me-porosi-edhe-per-jared-kushner/",
      "https://euronews.al/rama-sazani-nuk-eshte-shitur-dhe-nuk-do-te-shitet-vijojne-negociatat-per-projektin-kushner/ (13 April 2026)",
      "https://euronews.al/shoqeroi-i-pari-ivanken-dhe-kushner-ne-shqiperi-auron-tare-nuk-e-dinin-ku-i-binte-sazani-dhe-zverneci/ (4 June 2026)",
      "https://euronews.al/sazani-kushton-930-mln-e-konfirmohet-projekti-i-kushner-do-ndertoje-hotel-dhe-vila/ (7 August 2024)",
      "https://euronews.al/projekti-per-sazanin-manjani-jared-kushner-ndermjetes-investimi-arab/ (16 January 2025)",
      "https://en.wikipedia.org/wiki/Sazan_Island (general reference, without details of the current investigations)",
      "https://apnews.com (5 July 2026, \"35th night in a row\")",
      "https://theguardian.com (1 July 2026)"
    ]
  },
  "akshi": {
    "title": "The National Agency for Information Society scandal: the special prosecution investigation into a \"structured criminal group\"",
    "teaser": "Special anti-corruption prosecutors are investigating the national technology agency for a 'structured criminal group'; the director resigns.",
    "redactedPhrase": "structured criminal group",
    "narrative": [
      "In December 2025 the Special Prosecution Office against Corruption and Organised Crime revealed an investigation into the National Agency for Information Society, the agency that runs the e-Albania platform and the state's critical data infrastructure, alleging the existence of a \"structured criminal group\" within its leadership. The former director general Mirlinda Karçanaj and the former deputy director Hava Delibashi were placed under \"house arrest\", while arrest warrants, still not executed, were issued for the businessmen Ergys Agasi and Ermal Beqiraj (Beqiri); other officials, including a deputy director of the Tirana police, were placed under a ban on leaving the country. The formal charges mentioned in the media include \"unlawful competition through violence\", \"breach of equality in public tenders\" (i.e. favouring/predetermining winners), \"unlawful deprivation of liberty\" (the alleged kidnapping of the businessman Gerond Meçe), participation in a structured criminal group and money laundering; no media confirmation of a specific formal charge of \"bribery/passive corruption\" was found. The special prosecution office seized assets (properties, bank accounts, villas) worth over €40 million, one of the largest seizures to date, and the investigation (also reported by the Balkan Investigative Reporting Network) covers at least 12 tender procedures; one article states that four companies linked to the group won tenders worth about €57 million within 9 months, while the companies linked to Beqiri received contracts with the agency of around 2.1 billion lek (about €21 million). The agency has managed around €537 million of funds from 2017 to date (€480 million executed through the treasury), with its annual budget growing from €5 million (2017) to €189 million (planned for 2026). No source was found that independently confirms the cumulative figure of \"over €150 million in suspicious tenders\"; a single article (Telegraf.al) mentions an extreme figure of €1.5 billion of \"unjust gain\" over 3 years, which does not match the agency's reported total budget and was not corroborated by any other source. The frequent outages of the e-Albania platform have been repeatedly documented by the media as a chronic problem. The case remains active and without a final court ruling: Karçanaj resigned around February 2026 and was replaced by Igli Tafa, while the precautionary measures have gone several times before the \"Special Appeal\" court (the Special Court of Appeal for Corruption and Organised Crime) without a final decision as of June 2026."
    ],
    "status": "Under active investigation by the special prosecution office (not a closed case, not a final conviction). Karçanaj and Delibashi under house arrest/restrictions; Agasi and Beqiraj subject to arrest warrants that have not been executed; the proceedings on the precautionary measures still before the special appeal court, with several postponements up to June 2026; Karçanaj has resigned from her post (February 2026).",
    "claims": [
      {
        "claim": "The system often goes 'offline', with outages in critical services",
        "note": "Numerous media report repeated outages of the e-Albania platform affecting citizens, businesses, health services and the mortgage register; several sources describe it as 'a serious failure of the information society agency'."
      },
      {
        "claim": "At the centre of special prosecution investigations into predetermined tenders, bribery and money laundering",
        "note": "The special prosecution office's case is confirmed (December 2025, by Tirana Times, Balkanweb, cna.al and others), with charges of breach of equality in public tenders (predetermining winners), money laundering, a structured criminal group and unlawful deprivation of liberty. No confirmation of a specific/formal charge of 'bribery' (passive corruption) was found in the sources accessed; the mechanism described is more coercion/violence against competitors than classic bribery."
      },
      {
        "claim": "A cumulative value of over €150 million in suspicious tenders",
        "note": "No source was found giving a single figure of about €150 million. Figures found: about €57 million in tenders for 4 companies in 9 months; about 2.1 billion lek (about €21 million) in contracts with companies linked to Beqiri; about €40 million in seized assets; a single source (Telegraf.al, not corroborated) mentions €1.5 billion of 'unjust gain' over 3 years, a figure that conflicts with the agency's reported total budget and is treated as implausible."
      }
    ],
    "confidence": "medium",
    "sources": [
      "https://www.tiranatimes.com/akshi-director-arrested-in-major-corruption-probe/",
      "https://www.tiranatimes.com/a-structured-criminal-group-inside-a-national-security-institutionthe-akshi-case/",
      "https://www.tiranatimes.com/opposition-protests-as-corruption-case-deepens-political-crisis/",
      "https://sot.com.al/aktualitet/kopshti-privat-i-familjes-rama-gazetarja-si-u-rrit-buxheti-i-akshi-t-me-38-here/",
      "https://politiko.al/e-tjera/dosja-e-akshi-4-kompani-ne-9-muaj-siguruan-tendera-ne-vleren-57-milione--i546698",
      "Balkanweb.com (series of articles, December 2025 to June 2026, on the National Agency for Information Society investigation, the €40 million seizures, the charges, the appeal)",
      "panorama.com.al: 'SPAK/BIRN file: fitimet marramendëse të kontraktorëve të AKSHI-t' (the special prosecution/Balkan Investigative Reporting Network file: the dizzying profits of the agency's contractors)",
      "albeu.com: the special prosecution file on the National Agency for Information Society, from the Balkan Investigative Reporting Network",
      "cna.al and voxnews.al (reports on Karçanaj's summonses to the special prosecution office, her resignation and the appointment of Igli Tafa)"
    ]
  },
  "ipard": {
    "title": "The scandal over EU agricultural funds (the programme known as IPARD)",
    "teaser": "EU agricultural funds under investigation for abuse; Brussels suspends part of the funding pending measures.",
    "redactedPhrase": "suspends part of the funding",
    "narrative": [
      "The European Anti-Fraud Office, after an investigation of around 2.5 years into the Agency for Agriculture and Rural Development, officially confirmed in June 2024 that around €33 million of the IPARD II funds (2014–2020), the second phase of the EU's pre-accession programme for agriculture and rural development, had been misused through contracts without competition, inflated prices and breaches of contractual rules; the figure was reported identically by citizens.al and by the Balkan Investigative Reporting Network/Balkan Insight (\"Albania Misused 33 million Euros of EU Funds\"). As a result, the European Commission suspended around €112 million of additional funding planned for the following phase, IPARD III, a programme with a total planned value of €146 million for Albania (2021–2027). The anti-fraud office described a scheme in which IPARD II applicants were obliged to pay a percentage of the grant to predetermined \"consulting\" companies, which then brokered the approval of contracts/projects, a claim confirmed by the anti-fraud office's own report and picked up by several Albanian media outlets. The anti-fraud office passed its findings to the Albanian judicial authorities; the Special Prosecution Office against Corruption and Organised Crime has registered criminal proceedings for abuse of the IPARD funds and between February and March 2026 summoned to testify the former agriculture minister Frida Krifca and Reni Ashiku, administrator of the consulting company \"Converse Management Consulting\"; both were summoned as suspects/witnesses in the investigation, and no officially confirmed indictment or arrest had been made public as of July 2026. The Ministry of Agriculture initially denied the accusations of corruption, describing them as standard EU procedures; the Albanian parliament later rejected the opposition's request for an interpellation of the current agriculture minister on this matter, citing the ongoing special prosecution investigation (a point supported by secondary media summaries, with lower reliability than the rest of this case). One Albanian source also mentions a figure of €138 million of \"abuse 2017–2021\", a figure that remains independently unverified."
    ],
    "status": "Under active investigation by the special prosecution office (criminal proceedings registered for abuse of the IPARD funds; testimony taken from the former minister Frida Krifca and the administrator of a consulting company in February to March 2026); no confirmed indictment or arrest as of July 2026. The EU has suspended part of the IPARD III funding pending Albanian anti-fraud measures.",
    "claims": [
      {
        "claim": "The EU blocked about €146 million of additional aid as a result of the fraud",
        "note": "The concrete amount suspended/blocked by the European Commission according to the anti-fraud office and citizens.al is €112 million (IPARD III funding). €146 million appears to be the total planned value of the IPARD III programme for Albania for 2021–2027, not the specific amount blocked; the two figures are often confused."
      },
      {
        "claim": "A scheme in which farmers/applicants were forced to give a percentage to government-linked 'consulting' companies",
        "note": "The anti-fraud office's own report (cited by citizens.al and voxnews.al) describes exactly this mechanism: IPARD II applicants were obliged to pay predetermined consulting companies part of the grant to ease approval. The specific link to 'the government' has not been proven as ownership or a formal institutional connection, but the special prosecution investigation is simultaneously examining the former agriculture minister Frida Krifca and the administrator of one of these consulting companies (Converse Management Consulting)."
      },
      {
        "claim": "There are concrete criminal/investigative consequences for officials",
        "note": "The special prosecution office has active criminal proceedings; the former minister Frida Krifca and Reni Ashiku (administrator of the consulting company Converse Management Consulting) were summoned to testify/for questioning in February to March 2026. There was still no officially confirmed indictment or arrest at the time of verification."
      }
    ],
    "verificationNotes": "All the independent sources checked (citizens.al, panorama.com.al, voxnews.al, balkanweb.com) cite the figure of €33 million, not 35 million; the citizens.al headline itself is \"EU confirms abuse of €33 million of IPARD funds, suspends another €112 million\". As for terminology, the official sources avoid the word \"theft\": citizens.al speaks of the government having \"misused\" the funds, and panorama.com.al quotes the deputy director of the anti-fraud office as saying that \"€33 million of funds have been identified as potentially misused\" and that \"serious irregularities\" were found, not \"theft\". The European Anti-Fraud Office is an administrative anti-fraud investigation office, not a judicial body; it reports misuse/irregularities, not \"proven theft\" in the criminal-law sense, which would require court proceedings that have not yet been completed. The wording \"the anti-fraud office proved the theft of about €35 million\" is therefore inaccurate both in its figure and in its characterisation.",
    "confidence": "medium",
    "sources": [
      "https://citizens.al/2024/06/21/be-konfirmon-abuzimin-me-33-milione-euro-me-fondet-e-ipard-pezullon-112-milione-euro-te-tjera/",
      "https://citizens.al/2023/07/19/be-i-pezullon-shqiperise-fondin-per-bujqesine-pas-dyshimeve-per-korrupsion/",
      "https://balkaninsight.com/2024/06/21/albania-misused-33-million-euros-of-eu-funds-anti-fraud-office-says/bi/",
      "https://balkaninsight.com/2023/08/31/corruption-path-how-albania-prosecutors-turned-blind-eye-to-suspected-misuse-of-eu-funds/bi/",
      "https://www.cna.al/denoncim/investigimi-i-plug-si-u-zbardh-vjedhja-e-fondeve-ipard-ii-be-pezullon-1-i441222",
      "https://infonews.al/vjedhja-e-fondeve-ipard-spak-drejt-arrestimeve",
      "https://www.voxnews.al/english/aktualitet/i-me-fondet-ipard-ish-ministrja-frida-krifca-deshmon-ne-spak-i112645",
      "https://www.cna.al/english/aktualitet/i-me-fondet-e-ipard-krifca-deshmon-ne-spak-i458605",
      "balkanweb.com, hashtag.al, kapitali.al, pamfleti.net, panorama.com.al (articles on the European Anti-Fraud Office, Reni Ashiku/Converse Management Consulting and the interpellation rejected in parliament)"
    ]
  },
  "aeroporti-vlores": {
    "title": "Vlorë airport: construction on an environmentally protected area and a tender under investigation by special anti-corruption prosecutors",
    "period": "2017–2026 (concession 2020–2021; construction still ongoing/blocked)",
    "teaser": "Construction on a protected bird area; special anti-corruption prosecutors named 7 tender evaluators as defendants.",
    "redactedPhrase": "7 tender evaluators",
    "narrative": [
      "Vlorë International Airport is being built at Akërni, inside the \"Vjosë-Nartë\" protected landscape (protected status since October 2004), part of the Emerald Network under the Bern Convention and a habitat for over 60 bird species protected by the EU Birds and Habitats Directives; since Albania is not yet an EU member, the area is not formally \"Natura 2000\" (as it is sometimes wrongly called), but it is a candidate for this status after accession and is protected by almost identical standards. The Standing Committee of the Bern Convention has asked the Albanian government several times (September 2023, December 2023 and again later) to suspend the works pending a new environmental impact assessment, requests that have not been respected, while the European Commission's reports on Albania have pointed out that the project conflicts with the EU Habitats and Birds Directives. The 35-year concession (around €104 million, with an additional risk of up to €138 million in state subsidies on guaranteed revenue) was awarded in 2021 to the consortium of Mabco Constructions (Swiss, owned by Behgjet Pacolli), YDA Group (Turkish, initially 40%) and 2A Group (from Kosovo); in September 2022 YDA Group unexpectedly left the project, selling its share for only €4,450, which has raised questions in the media about the Turkish company's real role in the tender. The Special Prosecution Office against Corruption and Organised Crime has had criminal proceedings registered over the concession contract since July 2025 (at the pre-investigation stage), and in April 2026 it formally notified seven members of the tender evaluation committee that they were defendants, on suspicion of having favoured the predetermination of the winner and breached equal treatment among competitors; the investigation documents that Mabco and YDA Group did not present convincing evidence (e.g. only a letter from the deputy prime minister of Kazakhstan, not concrete contractual proof) of experience in building air traffic control towers and terminals, as the tender's technical criteria required, and that audited balance sheets and the declaration of beneficial owners were missing. Environmental organisations (Protection and Preservation of Natural Environment in Albania, the Albanian Ornithological Society) have had the matter in court since November 2022; after several rejections of requests to suspend the works, the Court of Appeal sent the case back to the court of first instance for re-examination in November 2025. As of July 2026 the airport has not yet started regular commercial flights, while a new conflict between the shareholders (Mabco against 2A Group) has blocked decision-making and carries a risk of international arbitration."
    ],
    "status": "Under investigation by the special prosecution office: criminal proceedings registered since July 2025 (pre-investigation stage); on 11 April 2026 seven members of the evaluation committee were formally notified as defendants for breach of equality in the tender procedure; no full indictment or final court ruling yet. In parallel, active administrative court proceedings on the environmental case (the Court of Appeal sent it back for re-examination in November 2025) and a shareholder conflict that has blocked operations.",
    "claims": [
      {
        "claim": "The airport has been built on the \"Natura 2000\" protected area (Vjosë-Nartë), directly breaching EU environmental conventions",
        "note": "The Vjosë-Nartë area is a national protected landscape (category V, since 2004) and part of the Emerald Network (the Bern Convention's equivalent for countries that are not EU members) with over 60 bird species protected by the EU Birds/Habitats Directives; it is not yet officially 'Natura 2000' because Albania is not an EU member, but it is a candidate for this status. The Bern Convention committee has asked several times (2023–2024) for the works to be suspended, without being respected, and the European Commission's reports on Albania have assessed the project as conflicting with EU environmental directives; so the core of the claim is confirmed, while the 'Natura 2000' terminology is slightly inaccurate technically."
      },
      {
        "claim": "A suspicious concession tender with a Turkish company (YDA Group) with no previous experience in aviation",
        "note": "The special prosecution office has active criminal proceedings (pre-investigation since July 2025; defendants formally named from April 2026) on the suspicion that the tender was predetermined in favour of the Mabco-YDA-2A consortium. The investigation documents that Mabco and YDA did not present sufficient evidence for the required technical criteria (experience building control towers/terminals), but this is an ongoing investigation, not a final court ruling; no confirmation was found that YDA Group had NO infrastructure construction experience at all in general (it is a large Turkish construction company), only that it did not prove convincing documentation for the tender's specific criteria. YDA's withdrawal in 2022, selling its share for only €4,450, strengthens the suspicions about its formal role in the tender, according to several media outlets."
      }
    ],
    "verificationNotes": "Independent sources do not use the term \"Natura 2000\" for the Vjosë-Nartë area. English Wikipedia (\"Vlorë International Airport\") describes the area as a \"Protected Landscape\" and a \"candidate for the Emerald Network under the Bern Convention\". citizens.al (21 September 2023) calls the area the \"Vjosë-Nartë Protected Landscape (Category V)\" and links its protection to the Bern Convention (ratified by Albania in January 1999), not to any formal EU status. Albania is not yet an EU member, so there are no formal \"Natura 2000\" sites within its territory; these exist only in member states. The substance of the claim stands (the airport is being built in an ecologically important protected area, with a conflict documented by the EU regarding the Birds/Habitats Directives), but the specific legal label \"Natura 2000\" is technically inaccurate.",
    "confidence": "medium",
    "sources": [
      "https://citizens.al/2025/07/09/aeroporti-i-vlores-nen-hetim-nga-spak/",
      "https://citizens.al/2023/11/24/nente-mashtrimet-qe-kerkojne-te-besojme-per-aeroportin-nderkombetar-te-vlores/",
      "https://citizens.al/2023/09/14/konventa-e-bernes-kerkon-pezullimin-e-punimeve-per-aeroportin-e-vlores/",
      "https://citizens.al/2025/05/08/kur-natyra-perballet-me-betonin-cmimi-i-larte-i-aeroportit-te-vlores/",
      "https://citizens.al/2025/11/25/apeli-kthen-per-shqyrtim-ligjshmerine-e-aeroportit-te-vlores/",
      "https://citizens.al/2026/02/11/investitori-kryesor-jashte-vendimmarrjes-cfare-po-ndodh-me-aeroportin-e-vlores/",
      "https://en.wikipedia.org/wiki/Vlor%C3%AB_International_Airport",
      "https://sq.wikipedia.org/wiki/Aeroporti_i_Vlor%C3%ABs",
      "https://www.balkanweb.com/tenderi-i-aeroportit-te-vlores-i-paracaktuar-spak-nuk-dorezuan-bilancet-dhe-raportet-e-auditimit-si-u-favorizuan-mabco-costruksion-yda-group/"
    ]
  },
  "hecet-e-vegjel": {
    "title": "Small hydropower plants and river concessions (Vjosë, Valbonë, Lurë): suspicions of conflict of interest and nepotism",
    "period": "2013–2026 (the network of concessions began in 2005, under previous governments)",
    "teaser": "The number of active private hydropower plants rose from 80 in 2013 to 238 in 2024; dozens lie inside protected national parks.",
    "redactedPhrase": "from 80 in 2013 to 238 in 2024",
    "narrative": [
      "Under the Rama government the number of active private hydropower plants in Albania rose from 80 in 2013 to 238 in 2024, part of a wider network of around 621 concession contracts signed since 2005 (128 cancelled, about 493 still active), of which environmental organisations estimate that around 80 lie inside or near protected areas such as Valbonë and Lurë and, until it was declared a national park (March 2023), the Vjosë as well. In the Valbonë Valley, the company \"Dragobia Energy\" (100% owned by \"Gener 2\") kept operating the \"Dragobia\" and \"Çerem\" hydropower plants even after a Supreme Court decision (July 2021) that found \"serious, immediate and irreparable harm\" and ordered the contract suspended. In the case of the \"Borie\" hydropower plant (Lurë), the permit was approved by the National Territorial Council, chaired by Prime Minister Rama himself, only 27 days before the area was declared a national park. As for the specific claim about ministers' relatives, the research found no verified evidence of direct links at the national ministerial level; instead it found a case of nepotism at municipal level documented by investigative journalism (citizens.al): Fatos Malaj, the brother of the mayor of Mat municipality, Agron Malaj, holds the concession for the \"Madhesh\" hydropower plant through the company \"A.R.M-Albania\". The Special Prosecution Office against Corruption and Organised Crime is currently investigating the case of four hydropower plants in Kaçinar, Mirditë (the company \"Shpërdhaza-Energji\"), after the Lezhë court transferred jurisdiction (September 2025); residents allege forged signatures, permit deadlines being exceeded and the involvement of a \"structured criminal group\" with public officials; the investigation is still in progress, with no public formal charges to date. Disputes over some concessions (e.g. the Becchetti/Kalivaç case) have cost Albanian taxpayers around €109–140 million in international arbitration."
    ],
    "status": "Mixed: independent sources confirm the high number of concessions and the environmental damage in protected areas, as well as hydropower plants continuing to operate even after court decisions against them; the specific claim about \"ministers' relatives\" remains unconfirmed at national level (only a case of nepotism at municipal level was found); one case (the Kaçinar hydropower plants, Mirditë) is currently under active special prosecution investigation, with no publicly formalised charges.",
    "claims": [
      {
        "claim": "Hydropower plants damage protected rivers, specifically the Vjosë, Valbonë and Shushicë",
        "note": "Clearly confirmed for the Valbonë (Dragobia Energy continues to operate despite the 2021 Supreme Court decision on 'irreparable harm') and historically for the Vjosë (the threat of hydropower plants until it was declared a national park in 2023, including the Turkish-Albanian project 'Ayen ALB'). The Shushicë was not found documented by a dedicated source in this research (it belongs to the same river/environmental system as the Vjosë, according to general environmental reporting, but without a specific article verified here)."
      },
      {
        "claim": "Ministers' relatives have obtained hydropower concessions directly or through relatives",
        "note": "No source was found that directly links relatives of national ministers to hydropower concessions. Only one similar case was identified, but at a lower level: the brother of the mayor of Mat (not a minister) holds the concession for the \"Madhesh\" hydropower plant. The special prosecution office is also investigating the involvement of public officials (with no ministers' names made public) in the Kaçinar hydropower case; this is an active investigation, not a formalised charge."
      },
      {
        "claim": "Court decisions have cancelled/suspended hydropower concessions in protected areas, but the plants continue to operate",
        "note": "Verified for the Valbonë case: the Supreme Court (July 2021) suspended the concession contract for 'serious and irreparable harm', but according to the Energy Regulator Authority, the plants produced 45,131 MWh in the first half of 2022 alone, so they continued to operate."
      }
    ],
    "verificationNotes": "citizens.al (24 December 2025) reports that the number of active private hydropower plants rose from 80 in 2013 to 238 in 2024, with 211 commissioned over 15 years and 24 more under construction; the National Agency of Natural Resources reports over 150 further projects in the documentation process. Another citizens.al article (11 December 2025) adds 346 projects at the planning stage.",
    "confidence": "medium",
    "sources": [
      "https://citizens.al/2023/01/31/te-demshme-dhe-te-padobishme-rreth-1100-hidrocentrale-mbi-lumenjte-e-shqiperise-dhe-bosnje-hercegovines/",
      "https://citizens.al/2017/03/22/alarmi-i-ambeintalisteve-ndalni-hec-et-po-shkaterrohen-lumenjte-e-shqiperise/",
      "https://citizens.al/2020/07/31/ndertimi-i-nje-hidrocentrali-tjeter-ne-madhesh-te-matit-ngre-ne-kembe-banoret/",
      "https://citizens.al/2022/09/20/valbone-vendimet-e-gjykates-i-merr-lumi-hidrocentralet-vazhdojne-te-shesin-energji/",
      "https://citizens.al/2025/09/16/gjykata-e-lezhes-ia-kalon-spak-ut-ceshtjen-e-hec-eve-ne-kacinar/",
      "https://citizens.al/2020/07/09/109-milion-euro-fatura-e-kripur-e-shtetit-shqiptar-ne-arbirtazh/",
      "https://citizens.al/2020/09/03/hec-i-i-borjes-nje-tjeter-dige-ne-parkun-kombetar-lure-mali-i-dejes/",
      "https://en.wikipedia.org/wiki/Valbona_Valley_National_Park",
      "https://en.wikipedia.org/wiki/Vjosa"
    ]
  },
  "teatri-kombetar": {
    "title": "The demolition of the National Theatre and the handing of public land to the company 'Fusha' sh.p.k.",
    "period": "2018–2026 (demolition: 17 May 2020)",
    "teaser": "The historic theatre was demolished at night with 800 police officers; the Constitutional Court declared the transfer unconstitutional, after the fact.",
    "redactedPhrase": "800 police officers",
    "narrative": [
      "The historic National Theatre in Tirana was demolished in the early hours of 17 May 2020 (around 04:30), with around 800 police officers and special forces forcibly removing dozens of artists, activists and opposition figures who had occupied the building in protest; some of them were arrested. The project to replace the theatre originated in an unsolicited proposal (not an open competition) by the private company 'Fusha' sh.p.k. in 2018, which offered to build the new theatre in exchange for the right to erect towers on the surrounding public land. The special legal basis that enabled the deal was challenged in court by civil society: the Constitutional Court suspended the construction of the new theatre in July 2021 and in July 2022 (more than two years after the demolition) declared unconstitutional the acts that had enabled the transfer of the property from the state to Tirana Municipality; the demolition therefore took place before the question of the legality of the process had received a final court ruling. As for the land, the figure of around 9,000 m² mentioned in some unofficial sources was not exactly confirmed: according to the Albanian Wikipedia, the complex's original area was around 13,000 m² (the building itself about 7,000 m²), a single source not cross-verified; meanwhile, on 3 May 2023 the Tirana Municipal Council donated to 'Fusha' sh.p.k., without an open competition, another public plot of 1,266.6 m² on 'Abdi Toptani' street plus two buildings (801.4 m² and 183 m²), in exchange for 50% of the built floor area going to the municipality. In December 2023 the Territorial Development Agency approved a building permit for a 33-storey tower (initially reported publicly as 23 storeys) designed by the studio of the architect Bjarke Ingels, the same one who designed the new theatre; the agency kept the decision undisclosed for 8 months, until it was revealed under pressure from investigative journalism and the Information and Data Protection Commissioner. The construction of the new theatre remains unfinished even in 2025–2026 (more than 5 years after the demolition), with budgets changed several times (€30–36 million initially, later funding from Abu Dhabi, 4.8 billion lek or about €42 million). No active criminal investigation publicly confirmed by the Special Prosecution Office against Corruption and Organised Crime with concrete charges against named individuals was found in connection with this matter, even though civil society (the Alliance for the Theatre) has filed criminal complaints with the special prosecution office since 2020."
    ],
    "status": "The new theatre is still under construction (unfinished, more than 5 years after the demolition); the Constitutional Court declared unconstitutional (July 2022) the acts that enabled the transfer of the property, but the ruling came long after the original building had been demolished; there are no criminal proceedings publicly confirmed by the special prosecution office with formalised charges against named individuals.",
    "claims": [
      {
        "claim": "The National Theatre was demolished in 2020 without a final court ruling, amid protests",
        "note": "The demolition (17 May 2020) is confirmed by several independent sources (English Wikipedia, citizens.al). No evidence was found of a specific court order (e.g. from an administrative court) that was breached on the night of the demolition; what is confirmed is that the question of the constitutionality of the legal basis was still under review at the time: the Constitutional Court ruled only in 2021 (suspension) and 2022 (unconstitutionality), well after the demolition."
      },
      {
        "claim": "Around 800 police/special forces were used to disperse the protesters, with arrests",
        "note": "Confirmed by English Wikipedia and the citizens.al fact-checking article (28 July 2022), which describe a police operation at 04:30, with arrests and violence against journalists."
      },
      {
        "claim": "Public land of around 9,000 m² was given to 'Fusha' sh.p.k. without an open competition, for building towers",
        "note": "The absence of an open competition is confirmed (an unsolicited proposal by Fusha in 2018). But the figure of about 9,000 m² was not found exactly in any source checked: the sources give about 13,000 m² as the complex's original total area (a single source, the Albanian Wikipedia, not cross-confirmed) and 1,266.6 m² as a separate plot donated in May 2023 (confirmed by two sources: citizens.al and English Wikipedia). The claimed figure appears inaccurate or mixed up with different figures."
      },
      {
        "claim": "Construction of towers/apartment blocks (23 or 33 storeys) by Fusha on the land around the theatre",
        "note": "The Territorial Development Agency approved in December 2023 a building permit for a 33-storey tower (not 23 as initially reported), disclosed publicly only 8 months later; confirmed by citizens.al and cross-checked with English Wikipedia (33 storeys)."
      },
      {
        "claim": "The Constitutional Court declared the process (the property transfer) unconstitutional",
        "note": "July 2021: suspension of the construction; July 2022: declaration of unconstitutionality of the acts that enabled the transfer of the property from the state to the municipality; both reported by monitor.al/citizens.al, but the ruling came after the demolition, with no practical effect on the original building."
      },
      {
        "claim": "There is an active special prosecution investigation with specific criminal charges related to this matter",
        "note": "Only references to criminal complaints/reports filed by civil society with the special prosecution office since 2020 and 2023 were found; no public confirmation of an active criminal investigation with formal charges against named individuals was found."
      }
    ],
    "verificationNotes": "English Wikipedia (\"National Theatre of Albania\") confirms the demolition on 17 May 2020 at around 04:30, the broad protests by artists and citizens, the opposition of over 20 members of the European Parliament and of the Swedish, German and British embassies, and the forcible removal of the protesters by the police, without mentioning any court ruling that had authorised the demolition in advance. citizens.al confirms the same date and title, as well as the People's Advocate's calls for accountability and the position of the Albanian Supreme Audit Institution in favour of rebuilding on the original site. This matches the context: the Constitutional Court ruled only later (suspension in July 2021, declaration of unconstitutionality in July 2022), respectively more than a year and more than two years after the demolition.",
    "confidence": "medium",
    "sources": [
      "https://en.wikipedia.org/wiki/National_Theatre_of_Albania",
      "https://sq.wikipedia.org/wiki/Teatri_Kombëtar_i_Shqipërisë",
      "https://citizens.al/2025/05/17/5-vite-pa-teater-kombetar/",
      "https://citizens.al/2024/03/29/kulle-23-kateshe-pas-teatrit-bashkia-i-dhuron-fushes-1266-m2-toke-publike/",
      "https://citizens.al/2024/08/15/pas-8-muajsh-zbardhet-vendimi-i-kulles-pas-teatrit-me-10-kate-shtese/",
      "https://citizens.al/2022/07/28/perballe-faktet-dhe-premtimet-per-ceshtjen-e-teatrit-kombetar/",
      "https://citizens.al/2025/12/25/teatri-u-shemb-spektakli-vazhdon/"
    ]
  },
  "marina-limion": {
    "title": "The \"Marina Limion\"/Limion port scandal (Sarandë): the alienation of military property",
    "period": "2020–2026 (concession 2020; Begaj's complaint December 2021; investigation registered 2022; seizure February 2023; new searches October 2025; project still blocked May 2026)",
    "teaser": "265,000 m² of military land was granted as a concession for a private marina near Sarandë.",
    "redactedPhrase": "265,000 m²",
    "narrative": [
      "In 2020 an area of around 265,000 m² in Limion Bay near Sarandë (part of an auxiliary base of the Naval Force, property no. 696, included in the Armed Forces' deployment plan) was granted as a concession for building a tourist port/luxury marina, in favour of the interests of the businessmen Artan Dulaku and (according to some media) Shefqet Kastrati, through companies such as \"Concord Investment\"/\"Marina Bay Sarandë\". The Minister of Infrastructure and Energy, Belinda Balluku, is reported to have signed the acts that moved the concession forward (a letter on 13 January 2020, approval on 23 June 2020), despite the objections expressed by the Ministry of Defence, the Naval Command and the General Staff, which warned of a risk to national security. On 28 December 2021 the former deputy naval commander Artur Meçollari submitted to the Special Prosecution Office against Corruption and Organised Crime the complaint that raised the case, describing the handover of the base as a risk to national security and contrary to article 6 of law 125/2013, as it involved protected military property; some earlier sources (gijotina.com, balkanweb.com) had attributed the complaint to Bajram Begaj, then Chief of the General Staff (now President, since July 2022), but the later and more detailed reporting by reporter.al/the Balkan Investigative Reporting Network, consistent with other independent sources, identifies Meçollari as the complainant. The special prosecution investigation, registered as early as 2022 and led (according to the media) by the prosecutor Manjola Kajana, led to a decision on the preventive seizure of the property in February 2023, upheld at the appeal levels and also confirmed by the Constitutional Court/the Supreme Court; the seizure remains in force at least until May 2026, with the project still blocked and no construction activity on the ground. On 16 October 2025 the special prosecution office and the National Bureau of Investigation carried out new searches of the homes/offices of Artan Dulaku and the administrator Genard Kastrati, as well as of the former Chief of the General Staff (now a Socialist Party MP) Bardhyl Kollçaku, the administrator of the Electricity Distribution Operator Enea Karakaçi, an employee of the Ministry of Infrastructure and the former chief of staff of the former defence minister; the action was prompted by a 5-hour video testimony filed in September 2025 by the lawyer Arben Llangozi. As of July 2026 there is no publicly known indictment against anyone in this specific case; in parallel Balluku also faces another, broader special prosecution investigation/accusation over abuses in infrastructure tenders (alleged damage of around €50 million), for which she was temporarily suspended from office and reinstated after the Constitutional Court's ruling in December 2025; on 26 February 2026 Rama dismissed her from the government and on 12 March 2026 parliament refused the special prosecution office's request for her arrest. That case is related to, but distinct from, the Limion case."
    ],
    "status": "Under active investigation by the special prosecution office since 2022 (prosecutor Manjola Kajana, according to the media); the property under preventive seizure since February 2023, confirmed on appeal; new searches in October 2025; as of July 2026 there is no known public indictment of anyone involved.",
    "claims": [
      {
        "claim": "A tourist port handed over through a suspicious scheme involving the alienation of military property",
        "note": "Confirmed by several sources (balkanweb.com, gijotina.com, bulevardnews.com, albaniaweb.net): the concession included land of the Naval Force's auxiliary base (Limion), handed over despite the objection of the Ministry of Defence/Naval Command."
      },
      {
        "claim": "The matter ended up under special prosecution investigation",
        "note": "Investigation registered since 2022, still active in 2025–2026, with new searches (National Bureau of Investigation/special prosecution office) of several people on 16 October 2025; confirmed by bulevardnews.com and others."
      },
      {
        "claim": "A (temporary) seizure of the base",
        "note": "A preventive seizure decision issued by the special prosecution office in February 2023, upheld on appeal (and, according to albaniaweb.net, also by the Supreme Court); still in force in May 2026 according to the latest reporting found."
      },
      {
        "claim": "The area of the concession (and the value of the investment)",
        "note": "The sources give slightly different figures for the area (265,000 m² according to the special prosecution/National Bureau of Investigation case files vs. up to 323,000 m² according to another, less reliable source); the figure of about €200 million of investment was found only in a non-journalistic source (a satirical/meme page), so it is not considered verified and is not included as an established fact."
      },
      {
        "claim": "Minister Balluku's direct role in approving the concession (specific signatures, January/June 2020)",
        "note": "Minister Balluku's direct role is reported by secondary sources (balkanweb.com, the programme \"Vetting\"; gijotina.com), but it was not confirmed by a primary source or a court ruling."
      },
      {
        "claim": "The complaint to the special prosecution office on 28 December 2021 came from Bajram Begaj",
        "note": "gijotina.com and balkanweb.com attribute the complaint to Begaj (then Chief of the General Staff), with a letter number (8530/3) according to gijotina.com. But reporter.al/the Balkan Investigative Reporting Network (20 May 2026), the latest and most detailed source, attributes the complaint to the former deputy naval commander Artur Meçollari; this matches other independent reports on the origin of the special prosecution investigation into Limion, which also link the initial complaint to Meçollari. Begaj, as Commander-in-Chief, was later involved in related events (the dismissal of a Land Force commander in connection with the Limion base), which may have caused confusion among the earlier sources."
      }
    ],
    "verificationNotes": "Three mutually independent sources confirm the core of the claim. reporter.al/the Balkan Investigative Reporting Network (20 May 2026) describes the \"Limion Auxiliary Base\" (property no. 696) as a former naval base granted as a concession in 2020 to the Concord Investment/Kastrati Group consortium; it reports the complaint by the former deputy naval commander Artur Meçollari to the special prosecution office about a risk to national security; and it quotes the Supreme Court decision (2023) that upheld the preventive seizure, stating explicitly that \"Property no. 696 cannot be treated as ordinary state property\". voxnews.al speaks directly of \"the alienation of the Navy's properties and massive corruption involving them\". balkanweb.com links the name of the former deputy prime minister Balluku to the concession and also mentions the complaint to the special prosecution office attributed to President Begaj, an attribution that does not match the identification of Meçollari by reporter.al/the Balkan Investigative Reporting Network. All three sources agree on the main details of the scheme itself (property no. 696, the year 2020, the 2023 seizure) and confirm that the tourist port was handed over through a scheme now under criminal investigation for abuse of office, but they differ on the identity of the original complainant to the special prosecution office.",
    "confidence": "medium",
    "sources": [
      "https://balkanweb.com/skandali-me-mbetjet-e-rrezikshme-dhe-pronat-e-ushtrise-ish-kreu-i-forcave-te-armatosura-balluku-e-perfshire-ne-dhenien-e-bazes-se-marines-me-kompanine-marina-limion/",
      "https://bulevardnews.com/2025/10/17/hetimet-per-portin-e-limionit-spak-kontrolle-vartesve-te-ballukut-dhe-ish-drejtoreshes-se-xhackes/",
      "https://gijotina.com/si-iu-fal-porti-i-limionit-oligarkeve-begaj-dorezoi-ne-spak-dosjen-ndaj-ballukut/",
      "https://citizens.al/2025/12/15/rikthimi-i-ministres-balluku-ne-detyre-pritet-me-proteste-nga-levizja-bashke/",
      "https://www.albaniaweb.net/2026/05/20/planet-per-transformimin-e-porteve-te-jugut-mbeten-ne-leter/",
      "https://faktor.al/2026/02/11/kreu-i-levizjes-bashke-hedh-akuza-te-forta",
      "report-tv.al, boldnews.al, syri.net, botasot.al, publik.al, lajmifundit.al, sarandanews.net",
      "https://europeanwesternbalkans.com/2026/02/27/indicted-deputy-pm-belinda-balluku-dismissed-by-rama-as-a-part-of-reshuffle/",
      "https://www.balkanweb.com/asnje-surprize-ps-behet-bllokade-per-imunitetin-e-ballukut-me-forcen-e-kartoneve-rrezon-ne-kuvend-kerkesen-e-spak-per-arrestimin-live/"
    ]
  },
  "permbytjet-vlore-durres": {
    "title": "Repeated floods in Vlorë and Durrës: buildings without permits on drainage canals and institutional neglect",
    "period": "2015–2026 (main focus: October 2024 to February 2026)",
    "teaser": "Drainage canals left uncleaned for 15–30 years put Vlorë under water once again.",
    "redactedPhrase": "15–30 years",
    "narrative": [
      "Vlorë and Durrës have flooded repeatedly in recent years (2015, 2018, 2021, 4 October 2024, January 2025, January 2026), from a combination of causes: heavy rain, buildings without permits on drainage canals and a lack of maintenance of public infrastructure. The final thematic audit of the Albanian Supreme Audit Institution, published in 2025, on the massive flooding of Vlorë on 4 October 2024 found the main cause to be the failure to clean the drainage canals (some uncleaned for 15–30 years) and the city's drainage pumping station operating at only 45% of capacity because of problems with the power line; the report identified around 3,285 buildings without permits on irrigation/drainage/flood-protection infrastructure nationwide and made 20 findings and 23 recommendations, without identifying individual criminal responsibility. In Vlorë, the municipality has launched demolition campaigns against buildings without permits on the Naukë canal and in the Karabashe area (the first time after the floods of October 2018, the second in February 2026), offering rent vouchers to the residents affected. In Durrës, the floods of January 2025 damaged around 300 homes, while the floods of January 2026 in the Sukth area caused the death of Astrit Hysenaj, a 54-year-old employee of the Beach Enterprise, found drowned in a drainage canal, as well as damage to around 500 linear metres of the embankment of the Erzen river. The Durrës prosecution office seized (February 2026) the documentation of the project to rehabilitate the Erzen embankment and is investigating three possible criminal offences (\"destruction of property by flooding\", \"destruction of property through negligence\" and \"abuse of office\"), as the works are suspected of having been carried out without a technical study and without a building permit; the investigation continues and so far there is no publicly identified defendant and no formal charge. The audit institution's report estimates around $2.5 billion of economic losses from floods across the country over the last three decades; a separate estimate of about €300 million of agricultural damage relates to another, national flood in November 2024, not specifically to Vlorë or Durrës."
    ],
    "status": "Final state audit office audit published (not criminal proceedings); active criminal investigation by the Durrës prosecution office (not the Special Prosecution Office against Corruption and Organised Crime) into the Erzen embankment works, with no identified defendant; periodic administrative campaigns to demolish buildings without permits on drainage canals continue",
    "claims": [
      {
        "claim": "Vlorë and Durrës flood every year because of concreting/buildings without permits on the drainage systems/canals",
        "note": "Repeated floods are confirmed (2015, 2018, 2021, October 2024, January 2025, January 2026). Buildings without permits on canals are a documented factor in Vlorë (the Naukë canal, the Karabashe area), with demolition campaigns in 2018 and February 2026. But the state audit office's official audit of the main Vlorë flood (4 October 2024) links the main cause more to the failure to clean and maintain the existing canals and to the non-functioning pumping station than to buildings without permits alone; the two factors coexist."
      },
      {
        "claim": "Indirect damage of \"tens of millions of euros\" every winter from these floods",
        "note": "No source was found giving a specific annual figure of tens of millions of euros for Vlorë/Durrës. Only other, different figures were found: about $2.5 billion of national flood losses over 3 decades (the state audit office) and about €300 million of agricultural damage from another national flood in November 2024 (other regions)."
      },
      {
        "claim": "The state audit office has audited and confirmed institutional failures as a cause of the Vlorë flood of 4 October 2024",
        "note": "The state audit office's official 79-page report (November 2025), read directly: it finds a pumping station at 45% capacity, canals uncleaned for 15–30 years, a lack of investment by the Vlorë water supply and sewerage utility, an irregular transfer of infrastructure, 20 findings, 23 recommendations."
      },
      {
        "claim": "The prosecution has opened a criminal investigation into the works without a permit on the Erzen river embankment in Durrës, linked to the floods",
        "note": "Confirmed by several sources (abcnews.al, 5 February 2026; shqiptarja.com): seizure of documents, suspicion of works without a technical study and without a building permit, three criminal offences under investigation. Still no public defendant, and no involvement of the special prosecution office according to the sources consulted."
      },
      {
        "claim": "There has been a human victim of the floods in Durrës",
        "note": "Astrit Hysenaj, aged 54, an employee of the Durrës Beach Enterprise, was found dead in a drainage canal on 8 January 2026, according to voxnews.al, balkanweb.com, publik.al and euroalbania.al."
      }
    ],
    "verificationNotes": "TV Klan/Stop (4 October 2024) quotes the mayor of Vlorë, Ermal Dredha, directly linking buildings without permits to the blocking of the main canal after the flood of 4 October 2024. Euronews Albania confirms the same problem in Durrës, quoting the Territorial Protection Inspectorate as saying that the drainage canals \"turn out to be occupied by the perimeter walls of homes built without permits\". The basic mechanism of the claim (buildings without permits on drainage canals as a cause of the floods) is thus confirmed by numerous sources, not only by the state audit office's report. It should be stressed, however, that the causes are multiple, not only buildings without permits: the prefect of Durrës attributed the flood of 29 January mainly to heavy rain (92 mm in 3–4 hours) plus canals blocked by urban waste. The floods are frequent and recurrent, especially in 2024–2026, but not necessarily every calendar year without exception, as the wording of the claim implies.",
    "confidence": "medium",
    "sources": [
      "https://www.klsh.org.al/wp-content/uploads/2025/11/Raport-Permbytjet-ne-Vlore-per-web-1-1.pdf (final thematic audit report of the Albanian Supreme Audit Institution: official source)",
      "https://opennews.al/vlore-nis-prishja-e-ndertimeve-pa-leje-mbi-kanalet-per-te-parandaluar-permbytjet/",
      "https://www.reporter.al/2025/01/30/uji-mori-perpara-gjithcka-kanalizimet-problematike-permbytin-qindra-banesa-ne-durres/",
      "https://abcnews.al/permbytjet-ne-durres-nderhyrja-ne-argjinaturen-e-lumit-erzen/",
      "https://shqiptarja.com/lajm/prokuroria-e-durresit-nis-hetimet-per-permbytjet-dyshime-per-vepren-penale-shkaterrimi-i-prones",
      "https://rtsh.al/rehabilitimi-i-kanalit-kullues-ne-vlore-nderhyrja-per-te-parandaluar-permbytjet-sfide-mbeten-ndertimet-pa-leje/"
    ]
  },
  "reforma-territoriale": {
    "title": "Territorial reform, \"strategic investor\" status and the privatisation of coastal/public land (2015–2026)",
    "period": "2015–2026 (ongoing process)",
    "teaser": "'Strategic investor' status eased the conversion of 1.6 million m² on the southern coast from public land into private property.",
    "redactedPhrase": "1.6 million m²",
    "narrative": [
      "Since the 2015 law \"On strategic investments\" (extended several times, currently until 2027), a Strategic Investment Committee chaired by the Prime Minister grants private projects \"strategic investor\" status, easing the use and urban-planning reconversion of public, agricultural and especially coastal land \"in the national interest\". According to a journalistic investigation by citizens.al, by 2023 around 1.6 million m² of land on the southern coast (out of a national total of 5.8 million m²) had been transferred to such investors, while only 2 of the 44 approved projects represented entirely foreign investment; in January 2022 the Council of Ministers removed large areas (around 20% of the protected territory) from \"protected area\" status, opening the way for developments such as those in Ksamil and Manastir Bay. Concrete documented cases include \"Kepi i Stillos\" (Cape Stillo) near Butrint (636 villas, status obtained in 2021, according to secondary sources) and Gener 2's \"Blue Borgo\" project in Rrjoll/Velipojë (€280 million, 146 hectares, a former protected area reclassified in 2024 for \"excellence tourism\"), where local residents report forged ownership documents without yet having received a response from the prosecution. The largest and most current case is the multi-billion-dollar project on Sazan island and the Zvërnec shore (Vlorë), linked to the firm of Jared Kushner (the son-in-law of the former US president Donald Trump), for which the government significantly reduced the protected area of the Karaburun-Sazan National Marine Park; according to documents of the Special Prosecution Office against Corruption and Organised Crime reported by Reuters (June to July 2026), the Miami-based businessman Artur Shehu is under investigation, with an arrest warrant, for cocaine trafficking, money laundering and forging/artificially enlarging property titles in connection with the sale of the land for around €110 million to the local developer, a sum that was ordered frozen; Reuters and the special prosecution office stress explicitly that there are no charges against Kushner or the project's companies and that there is no evidence that the investors knew of the illegal origin of the money. The status remains pending: the special prosecution investigation continues without an indictment or final court ruling, while the projects mentioned above have prompted continuing protests, criminal complaints from affected residents and criticism from the EU (ambassador Silvio Gonzato) and from international environmental organisations over the lack of transparency in the selection of \"strategic investors\"."
    ],
    "status": "Active/open special prosecution investigation into the most important case (Sazan/Zvërnec); no indictment or final court ruling yet. The legal mechanism itself (\"strategic investor\") is still in force (extended until 2027).",
    "claims": [
      {
        "claim": "Of 44 projects approved as strategic investments, only 2 were entirely foreign investment",
        "note": "Single source: citizens.al, a reliable investigative outlet, but with no independent second confirmation."
      },
      {
        "claim": "In January 2022 the Council of Ministers removed around 20% of the protected territory from 'protected area' status with two decisions",
        "note": "Reported by citizens.al; consistent with the known concrete cases (Ksamil, Manastir Bay), without direct access to the original Council of Ministers decisions themselves."
      },
      {
        "claim": "The 'Kepi i Stillos' project near Butrint (636 villas) received (potential) strategic investor status in February 2021",
        "note": "Found only through secondary sources (dosja.al, tellalli.al, pamfleti.net); the primary articles were not accessed directly."
      },
      {
        "claim": "Gener 2's 'Blue Borgo' project in Rrjoll/Velipojë: €280 million, 146 hectares, a former protected area declassified for 'excellence tourism' after the 2024 legal change",
        "note": "Confirmed by citizens.al (9 February 2026); residents report forged ownership documents, with a criminal complaint to the special prosecution office since 2025, still unanswered."
      },
      {
        "claim": "The Sazan/Zvërnec project linked to Jared Kushner is valued at up to $4–4.7 billion (the purchase of the island around €1.4 billion)",
        "note": "The figure comes from the English Wikipedia summary and secondary articles, not from an official financial document."
      },
      {
        "claim": "The special prosecution office opened a criminal investigation (June 2026) into how the property titles in the Sazan/Zvërnec area were obtained and how the area lost its protected status",
        "note": "Confirmed by independent sources: Eastern Herald (7 June 2026), Reuters (reported by VoxNews.al and WHTC.com, July 2026), Wikipedia."
      },
      {
        "claim": "The Miami-based businessman Artur Shehu is under investigation/an arrest warrant for cocaine trafficking, money laundering and forging property titles; about €110 million from the sale of the land for the project was frozen by order; there are no charges against Kushner or the project's companies",
        "note": "Reuters reporting (the journalists Fatos Bytyci and Edward McAllister), republished by VoxNews.al and WHTC.com; both sources match in detail."
      },
      {
        "claim": "The Karaburun-Sazan Marine Park (a protected area since 2010) was reduced by over 5,000 hectares to make the project possible",
        "note": "According to the Wikipedia summary, based on reporting by Mother Jones (June 2026) and others."
      }
    ],
    "verificationNotes": "The citizens.al figures (5.8 million m² in total, of which about 1.6 million m² on the southern coast) match exactly between the 2023 article and the 2026 one; no source outside this outlet was found reproducing the same figures, but citizens.al remains a primary journalistic source that has been consistent over time.",
    "confidence": "medium",
    "sources": [
      "https://citizens.al/2026/06/02/investitoret-strategjike-ligji-qe-u-dha-privateve-bregdetin/",
      "https://citizens.al/2023/08/09/betonizimi-i-jugut-ligji-per-investimet-strategjike-i-dha-5-8-milion-m2-toke-kompanive-afer-qeverise/",
      "https://citizens.al/2023/03/16/ish-pronaret-ne-proteste-bregdeti-po-shitet-tek-investitoret-strategjike/",
      "https://citizens.al/2026/02/09/perplasja-per-bregdetin-e-rrjollit-ne-velipoje/",
      "https://en.wikipedia.org/wiki/Sazan_Island_Resort",
      "https://www.voxnews.al/aktualitet/reuters-per-zvernecin-biznesmeni-qe-i-shiti-token-kushner-ne-hetim-dy-i120444 (Reuters reporting)",
      "https://whtc.com/2026/07/11/businessman-who-sold-land-for-kushner-resort-in-albania-suspected-of-faking-the-deeds/ (Reuters/AP reporting)",
      "https://easternherald.com/2026/06/07/albania-spak-investigation-kushner-resort-land-titles-sazan/",
      "https://albanianpost.com/kompania-e-lidhur-me-projektin-e-kushner-nuk-jemi-nen-hetim/"
    ]
  },
  "patronazhistet": {
    "title": "The party canvassers (\"patronazhistë\") scandal: a database of about 910,000 citizens (April 2021)",
    "teaser": "A secret database with 910,061 voter records was revealed two weeks before the elections; no one was convicted.",
    "redactedPhrase": "910,061",
    "narrative": [
      "On 11 April 2021 the news site Lapsi.al published an investigation into a database with 910,061 rows of data on voters in Tirana county, which included phone numbers, addresses, workplaces and, according to the report, also political orientation/affiliation, kept by around 9,027 \"patronazhistë\" (party canvassers) linked to the Socialist Party, many of whom worked in the central/local public administration or in state-owned enterprises. The revelation came two weeks before the parliamentary elections of 25 April 2021. The Socialist Party publicly admitted that it held voter lists, but claimed that the version leaked to the media contained unauthorised additions (e.g. ID numbers). The Democratic Party filed a criminal complaint and the Special Prosecution Office against Corruption and Organised Crime sought the seizure of Lapsi.al's servers and devices to identify the source; this move was first blocked by the European Court of Human Rights (an interim measure under article 39, 22 April 2021) and later definitively overturned by the Supreme Court of Albania (24 December 2021), which protected the confidentiality of the journalistic source of the journalists Andi Bushati and Armand Shkullaku. According to the Albanian Wikipedia, 162 citizens sued the Socialist Party for breach of personal data protection, while Amnesty International (2021/22 report) described the matter as a breach of the privacy of nearly 900,000 citizens and as a threat to press freedom because of the special prosecution office's attempt against the media. Some media (reported through secondary searches, not a direct reading of the primary source) have suggested that the special prosecution office closed/archived the criminal investigation, claiming the absence of the elements of a criminal offence under the current Criminal Code; none of the sources consulted reports any criminal conviction or formal charge against any official or party leader in connection with the collection/use of the database itself to date (July 2026)."
    ],
    "status": "Closed/with no publicly known criminal outcome: according to some media reports (not verified directly in a primary source) the special prosecution office found no \"elements of a criminal offence\" and the investigation was archived; there is no confirmed conviction or formal charge against individuals or the Socialist Party for the database scandal itself. The special prosecution office's attempt to seize Lapsi.al's servers was definitively rejected by the Supreme Court (December 2021). There are 162 individual civil lawsuits against the Socialist Party for personal data breaches, but their final outcome was not found documented in the sources consulted.",
    "claims": [
      {
        "claim": "The data included phone, identity card, workplace, political affiliation",
        "note": "Numerous sources (the Albanian Wikipedia, citizens.al) confirm 'phone numbers, addresses, workplaces and political affiliation/orientation', but none mentions the identity card field; the Socialist Party admitted holding the list but explicitly denied that the ID numbers were part of the original database, describing them as unauthorised additions in the leaked version."
      },
      {
        "claim": "Taken from state institutions (the civil registry, the National Agency for Information Society, the tax authorities)",
        "note": "The citizens.al article (22 April 2021) mentions the Prime Minister's Office, the Ministry of the Interior, the National Agency for Information Society, the civil registry and the tax authorities as institutions involved/referred to in connection with the origin of the data."
      },
      {
        "claim": "Used by the Socialist Party for the 2021 election campaign",
        "note": "The revelation came two weeks before the elections of 25 April 2021; the existence of the network of 9,027 'patronazhistë' who monitored voters' political orientation is confirmed by many sources, although Edi Rama himself characterised the canvassing system as a 'normal' party organisational practice, not as a systematic violation."
      },
      {
        "claim": "The special prosecution office found no criminal offence and no one was convicted",
        "note": "The part \"no one was convicted\" is strongly supported by the total absence of reports of any conviction or formal charge over five years or more, up to July 2026. The part that the special prosecution office \"found no criminal offence\" was found only through secondary sources (dosja.al, gazetareforma.al) and was not confirmed by a complete primary source; it needs further verification if used as a central fact."
      },
      {
        "claim": "The special prosecution office tried to seize Lapsi.al's servers",
        "note": "Confirmed in detail by citizens.al (the decision of judge Iliriana Olldashi, 18 April 2021) and euronews.al (the Supreme Court decision of 24 December 2021 against the special prosecution office, in favour of the journalists Andi Bushati and Armand Shkullaku); the intervention of the European Court of Human Rights (interim measure, 22 April 2021) is likewise confirmed."
      },
      {
        "claim": "162 citizens sued the Socialist Party",
        "note": "The figure is mentioned in the Albanian Wikipedia article on the scandal, but no independent second source was found to confirm the exact figure or the final outcome of the lawsuits; it remains based on a single source."
      }
    ],
    "confidence": "medium",
    "sources": [
      "https://sq.wikipedia.org/wiki/Skandali_i_patronazhist%C3%ABve",
      "https://citizens.al/2021/04/22/gjykata-evropiane-rrezon-vendimin-e-spak-ut-per-sekuestrimin-e-lapsi-al-pas-skandalit-me-patronazhistet/",
      "https://citizens.al/2022/03/31/raporti-i-amnesty-international-denon-patronazhistet-rrjedhjen-e-pagave-dhe-shkeljet-e-te-drejtave-te-njeriut/",
      "https://citizens.al/2023/01/27/nje-ferme-klikimesh-aplikacioni-qe-shperblen-me-pike-pelqimin-dhe-shperndarjen-e-postimeve-te-partise-socialiste/",
      "https://citizens.al/2026/03/19/patronazhi-politik-motor-korrupsioni-thote-raporti/",
      "https://euronews.al/patronazhistet-gjykata-e-larte-u-jep-te-drejte-gazetareve/",
      "https://euronews.al/skandali-i-pagerrjedhjes-alibeaj-spak-duhet-te-kishte-hetuar-patronazhistet/",
      "https://euronews.al/vokshi-drejtuar-brahos-a-keni-hetuar-per-patronazhistet-qe-vezhgojne-spak-un/"
    ]
  },
  "homeland-justice": {
    "title": "The \"Homeland Justice\" cyberattack on Albania (July 2022 onwards)",
    "teaser": "Iranian hackers disabled the state's online services for several days, with consequences that lasted for years; Albania broke off relations with Iran.",
    "redactedPhrase": "for years",
    "narrative": [
      "On 15 July 2022 Albanian government systems, including the e-Albania portal, were hit by a destructive cyberattack (a combination of ransomware and wiper malware) that the US agencies the Cybersecurity and Infrastructure Security Agency and the FBI, as well as Microsoft, officially attributed to Iranian state actors calling themselves \"HomeLand Justice\", linked to Iran's Ministry of Intelligence and Security. According to the FBI and cybersecurity agency investigation (advisory AA22-264A), the hackers had uninterrupted access to Albanian networks for around 14 months (approximately since May 2021) before the destructive strike, continuously harvesting official emails; e-Albania was partly restored four days later (around 1,118 of 1,225 online services). On 9 September 2022 a second wave hit the border-control system known as TIMS, and on 7 September 2022 Prime Minister Edi Rama announced the severing of diplomatic relations with Iran and the expulsion of the embassy staff within 24 hours, the first case worldwide of a state breaking off diplomatic relations because of a cyberattack. Through a Telegram channel the group has published official emails (including those of the former head of the State Police and of the director of the State Intelligence Service, Helidon Bendo) and a list of the intelligence service's employees; the main alleged motive is revenge for Albania's sheltering of Iranian dissidents of the Mujahedin-e Khalq. In 2025 an undercover FBI agent bought through Telegram databases with the ID numbers, names, dates of birth and addresses of Albanian citizens that the hackers were still selling, showing that the leaks continued for years without a full damage assessment or reissuing of documents by the authorities, and new attacks linked to the same group have also been reported in 2026. Well confirmed are the institutional/official emails (including those of the former head of the State Police and of the intelligence service's director) and large databases of citizens' personal data."
    ],
    "status": "An attack officially confirmed by the Albanian government, by the cybersecurity agency/FBI (United States) and by Microsoft as the work of Iranian state actors; it does not amount to an accusation of corruption against Albanian officials, but it shows a failure of state cybersecurity and a lack of subsequent assessment/repair by the authorities. In the United States there has been legal action/an FBI operation (2025) concerning the further sale of the stolen data; in Albania there have been no public court proceedings against officials over institutional responsibility for the system's weaknesses.",
    "claims": [
      {
        "claim": "A cyberattack by the Iranian group \"Homeland Justice\" in July 2022",
        "note": "Confirmed by the joint advisory of the cybersecurity agency and the FBI (AA22-264A, September 2022), by Microsoft and by the statements of Prime Minister Edi Rama (7 September 2022); date of the destructive attack: 15 July 2022."
      },
      {
        "claim": "The attack \"paralysed the state's digital services for weeks\"",
        "note": "e-Albania was partly restored within 4 days (1,118/1,225 services), not within 'weeks' as the claim says; however, the damage/data leaks and the subsequent waves (September to October 2022, and even up to 2026 according to BalkanInsight) extended the real impact by months to years beyond the portal's initial technical recovery."
      },
      {
        "claim": "The alleged leak of cabinet (Council of Ministers) documents",
        "note": "The sources consulted (BalkanInsight/the Balkan Investigative Reporting Network, the cybersecurity agency/FBI, Panorama) confirm the theft/leak of institutional and official emails (e.g. of the former head of the police), but none of them specifically mentions 'cabinet documents' as a separate category."
      },
      {
        "claim": "Leak of State Intelligence Service documents",
        "note": "Sources were found (BalkanWeb, Panorama, ODINT, OCNAL, cross-checked) reporting the publication of the email and personal data of the intelligence service's director, Helidon Bendo, and of a list of the service's employees."
      },
      {
        "claim": "Leak of the party canvassers' (\"patronazhistë\") lists",
        "note": "No independent source (media, the cybersecurity agency/FBI or judicial) was found that links the 'Homeland Justice' attack specifically to a leak of 'patronazhistë lists'; direct searches for this term gave no relevant results. It may be a confusion with other data leaks (e.g. electoral/clientelism databases) unrelated to this attack."
      },
      {
        "claim": "Leak of citizens' personal data",
        "note": "Widely confirmed: ID numbers, names, dates of birth and addresses from the e-Albania database and the identity card register; in 2025 they were still being sold via Telegram, according to the FBI's undercover operation (reported by BalkanInsight, April 2026)."
      },
      {
        "claim": "The attribution to Iran and the severing of diplomatic relations",
        "note": "Prime Minister Rama announced on 7 September 2022 the severing of diplomatic relations with Iran and the expulsion of the diplomatic staff within 24 hours; the cybersecurity agency/FBI/Microsoft linked the group to Iran's intelligence ministry; the alleged motive relates to the sheltering of the Mujahedin-e Khalq (the Ashraf-3 camp) in Albania."
      }
    ],
    "verificationNotes": "Several independent English Wikipedia articles strongly confirm the claim. The article \"Iran and state-sponsored terrorism\" describes the destructive cyberattack of July 2022 by the group \"HomeLand Justice\", mentions that the FBI investigation found initial access around 14 months before the attack, that the group claimed responsibility on 18 July, that there was a second wave in September 2022 with similar malware, and that Albania formally severed diplomatic relations with Iran by ordering the Iranian embassy staff to leave. Other independent articles (\"Cyberwarfare and Iran\", \"Handala Hack Team\") refer to the same attack and diplomatic consequence. These details fully match the reporting of the cybersecurity agency, the FBI and Microsoft.",
    "confidence": "high",
    "sources": [
      "https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-264a (CISA/FBI Joint Advisory: 'Iranian State Actors Conduct Cyber Operations Against the Government of Albania')",
      "https://balkaninsight.com/2022/09/07/albania-freezes-diplomatic-ties-with-iran-over-cyber-attacks/ (Balkan Investigative Reporting Network/BalkanInsight)",
      "https://balkaninsight.com/2022/09/22/fbi-iranian-hackers-accessed-albanian-systems-over-year-ago/ (Balkan Investigative Reporting Network/BalkanInsight)",
      "https://balkaninsight.com/2022/12/01/timeline-iranian-hacker-attack-on-government-sites/ (Balkan Investigative Reporting Network/BalkanInsight)",
      "https://balkaninsight.com/2026/04/22/failure-in-prevention-iran-linked-hackers-stolen-albanian-data-and-an-fbi-sting/bi/ (Balkan Investigative Reporting Network/BalkanInsight)",
      "https://en.panorama.com.al/kemi-kartat-id-dhe-databazen-e-e-albania-sulmet-kibernetike-iraniane-si-i-bleu-agjenti-i-fbi-se-te-dhenat-e-shqiptareve-me-bitcoin-nga-homeland-justice-zbardhen/ (Panorama.al)",
      "https://en.wikipedia.org/wiki/Iran_and_state-sponsored_terrorism (corroborating context, not a primary source)",
      "https://citizens.al/?s=Homeland+Justice (additional reference on the successive personal data leaks)"
    ]
  },
  "tims-sulmi-iranian": {
    "title": "The Iranian cyberattack on the border-control system known as TIMS (September 2022)",
    "teaser": "The same hacker group hit the border-control system only weeks after the first attack.",
    "redactedPhrase": "weeks after the first attack",
    "narrative": [
      "On 9–10 September 2022, only a few days after Albania had broken off diplomatic relations with Iran (7 September 2022) in response to the July cyberattack on the e-Albania portal, the TIMS border-control system was hit by the same group of hackers, self-identified as 'Homeland Justice' and linked to Iran by the Albanian government and by the US firm Mandiant. The Ministry of the Interior itself shut down the system as a precautionary security measure at all border crossings (Rinas, Kakavijë, Kapshticë, the ports of Durrës and Vlorë), causing long queues; at Rinas up to 14 counters were set up for the manual (handwritten) registration of travellers, while the system was fully restored within around 24 hours at all border crossings (shqiptarja.com; BalkanInsight/the Balkan Investigative Reporting Network). The hackers claimed publicly, through Telegram, that they had obtained border entry-exit data and offered it for sale for Bitcoin; on 19 September 2022 they specifically published full data from the system on the former director general of the police, Gledis Nano, including passport photos from various years, his driving licence and his entry-exit data for 2004–2022. Other media also reported the publication, by the same group, of a list of people wanted by the police in Vlorë and Tirana, not officially confirmed by the authorities and without a fully verified exact date. Importantly, the mass publication of the passports of around 162,000 Albanian citizens by the same group took place later, in June 2024 (not in September 2022), so the claim about 'passport photos' on a large scale appears to mix up two different episodes of the same hacker group. The Tirana prosecution office ordered a restriction on media publication of the leaked data, an order criticised by journalists' organisations as 'absurd and dangerous' for press freedom. Since the perpetrators operate from outside Albania, there have been no arrests or criminal convictions in the country; the United States later imposed sanctions on Iranian officials linked to the cyber operations against Albania."
    ],
    "status": "A foreign attack confirmed by the Albanian government and by Mandiant's analysis; no specific perpetrator has been arrested or tried in Albania (the group operates from abroad). Albania has broken off diplomatic relations with Iran; the United States has imposed sanctions on Iranian officials linked to the operation. The case was initially handled by the Tirana District Prosecution Office (not the Special Prosecution Office against Corruption and Organised Crime, as it concerns not domestic corruption but a foreign state cyberattack).",
    "claims": [
      {
        "claim": "A complete failure of the TIMS system at all border crossings",
        "note": "Confirmed by the Ministry of the Interior and several media outlets (top-channel.tv, abcnews.al, balkanweb.com): the system was shut down as a precaution at Rinas, Kakavijë, Kapshticë and the ports of Durrës and Vlorë on the night of 9–10 September 2022. Initial sources had spoken of about 3 days for restoration, but later verification (shqiptarja.com, BalkanInsight/the Balkan Investigative Reporting Network) shows full restoration within around 24 hours."
      },
      {
        "claim": "A return to registration by hand/pen at Rinas",
        "note": "top-channel.tv and abcnews.al report the addition of up to 14 counters for the manual registration of travellers at Rinas during the outage."
      },
      {
        "claim": "The hackers published citizens' entry-exit movements",
        "note": "The hackers claimed on Telegram that they had border entry-exit data and offered it for sale (voxnews.al). A concrete, verified publication was found for the 2004–2022 entry-exit data of one identified individual (the former police director Gledis Nano, 19 September 2022); no confirmation was found of a mass publication of ordinary citizens' movements from this specific wave of attacks."
      },
      {
        "claim": "The hackers published a list of people suspected by the police",
        "note": "Some media (360grade.al and others) report the publication by 'Homeland Justice' of a list of people wanted by the police in Vlorë and Tirana, as part of the same wave of attacks/leaks; the exact date of this specific publication was not established with full certainty in the sources consulted, and there is no official confirmation from the police."
      },
      {
        "claim": "The attack was carried out by/is attributed to Iran, the same 'hand' as the July attack on e-Albania",
        "note": "The Ministry of the Interior declared that the attack came from the same source as the attack of 15 July 2022; the Albanian government and the firm Mandiant linked the attribution to Iran (Wikipedia: Albania-Iran relations); Albania had broken off diplomatic relations with Iran on 7 September 2022, before this specific attack on TIMS."
      }
    ],
    "verificationNotes": "Shqiptarja.com reports that the TIMS system was restored \"at all points\" within around 24 hours, listing eight specific border crossings: Rinas Airport, Kapshticë, Kakavijë, Han i Hotit, Muriqan, Morinë and the ports of Durrës and Vlorë, an even fuller list than the one known earlier. BalkanInsight/the Balkan Investigative Reporting Network (12 September 2022) independently confirms that the attack \"caused long queues at border crossings over the weekend, where the registration of citizens and vehicles entering and leaving the country had to be done by hand\", confirmation of a systemic, not partial, outage. citizens.al confirms that the TIMS system was attacked around 9 September 2022, as part of a documented pattern of five cyberattacks on Albanian systems within 14 months. All the sources found are consistent with a complete, nationwide shutdown of the TIMS system, followed by manual registration and restoration within around 24 hours.",
    "confidence": "high",
    "sources": [
      "https://citizens.al/2022/09/12/pasiguri-kibernetike-te-dhenat-personale-u-sulmuan-pese-here-ne-14-muaj/",
      "https://citizens.al/2022/09/20/urdhri-i-prokurorise-per-ndalimin-e-publikimeve-mbi-sulmin-kibernetik-pritet-me-shqetesim-nga-gazetaret/",
      "https://en.wikipedia.org/wiki/Albania%E2%80%93Iran_relations",
      "https://shqiptarja.com/lajm/rama-irani-ka-sulmuar-mbrwmw-sistemin-tims-nw-shqipwri",
      "https://www.balkanweb.com/sulmi-kibernetik-ne-sistemin-tims-ja-si-paraqitet-situata-ne-aeroportin-e-rinasit-dhe-pikat-kufitare-ne-vend/",
      "https://www.voxnews.al/aktualitet/dosjet-e-tims-dalin-ne-shitje-autoret-e-it-kibernetik-kemi-hyrje--i19214",
      "https://360grade.al/554766/hakerat-hapin-thesin-publikojne-listen-e-personave-ne-kerkim-nga-policia-vlore-dhe-tirane/",
      "https://360grade.al/554717/pasaporten-pjesetaret-e-familjes-numri-i-telefonit-dhe-hyrje-daljet-ne-kufi-hakerat-publikojne-te-dhenat-personale-te-gledis-nanos/",
      "https://gazetasi.al/pas-kartave-te-identitetit-hakerat-iraniane-nxjerrin-edhe-pasaportat-e-shqiptareve/",
      "https://top-channel.tv/2022/09/10/sulmi-kibernetik-ndaj-sistemit-tims-shtohen-sportelet-per-regjistrimin-manual-ne-aeroportin-e-rinasit/",
      "https://abcnews.al/sulmi-ndaj-tims-reagon-ministria-e-brendshme-cfare-po-ndodh-aktualisht-ne-aeroportin-e-rinasit/"
    ]
  },
  "tims-vjedhja-muca": {
    "title": "The alleged export of the border database known as TIMS by the State Police's IT director (August 2023)",
    "period": "August 2023 onwards (court proceedings active as of July 2026)",
    "teaser": "The police IT director is charged with exporting the biometric border database to external disks; he denies the charges and the trial continues.",
    "redactedPhrase": "external disks",
    "narrative": [
      "Ervin Muça, then director of Technology and Information at the State Police, is charged with having organised on 2 August 2023 the unauthorised export of the TIMS database (the system that records border entries and exits, biometric data and information on criminal events) to external disks, using a subordinate's credentials to enter the server premises at night. The incident caused concern at the US Embassy, which on 17 August 2023, through the chargé d'affaires Martin McDowell, formally asked the interior minister, Taulant Balla, for a swift investigation and offered technical assistance. The case led to the creation of a parliamentary inquiry committee, chaired by the Democratic Party MP Ervin Salianji, which after around four months of work produced a majority report (the Socialist Party) and a minority report (the Democratic Party, which claimed, without this being criminally proven, that the data might have been used by criminal groups). The Tirana prosecution office (not the Special Prosecution Office against Corruption and Organised Crime, as is sometimes claimed) placed Muça under house arrest on 9 April 2024 and suspended him from duty; in March 2025 it completed the investigation and sent him to trial on charges of \"unauthorised computer access\" and \"abuse of office\". The investigation also revealed that Muça did not meet the required criteria for the post (security clearance, training) and was working, without declaring it, as an external adviser to the State Cadastre Agency. Muça denies the charges, calling the operation a routine technical \"backup\"; the Tirana court and the Court of Appeal have upheld the house arrest measure, but as of July 2026 no final court ruling was found; the proceedings remain active. The former head of the inquiry committee, Salianji (currently himself in prison over other matters), has publicly demanded that the special prosecution office take over the investigation, suggesting that the body for high-level corruption has so far not been the one leading this case."
    ],
    "status": "Active court proceedings, brought not by the special prosecution office but by the Tirana prosecution office; Ervin Muça was sent to trial in March 2025 on charges of 'unauthorised computer access' and 'abuse of office' and is under house arrest (a measure upheld by the Court of Appeal); as of July 2026 there is no final court ruling. He denies the charges.",
    "claims": [
      {
        "claim": "A police IT head linked to the name \"Muça\" was caught trying to copy the TIMS database",
        "note": "Full name: Ervin Muça, then director of Technology and Information at the State Police. Confirmed by shqiptarja.com, top-channel.tv, boldnews.al, pamfleti.net, voxnews.al and others: he is charged with having ordered/carried out on 2 August 2023 the export of the TIMS database to external disks at night, using a subordinate's credentials to enter the server premises. It was not, however, a case of being \"caught in the act\": the incident was discovered days later through the subordinate's report, and the charge/arrest came only in April 2024, after the prosecution's investigation."
      },
      {
        "claim": "The copying was done to external disks without authorisation",
        "note": "Many independent sources describe the same thing: export/copying of the TIMS database to an 'external hard disk', at night, outside normal protocols."
      },
      {
        "claim": "The case alarmed the US Embassy",
        "note": "On 17 August 2023 the US Embassy's chargé d'affaires, Martin McDowell, met the interior minister Taulant Balla, expressed concern about the interference with TIMS (including data on US citizens) and asked for a swift investigation, also offering technical assistance."
      },
      {
        "claim": "The case led to a parliamentary inquiry committee",
        "note": "A parliamentary inquiry committee was set up, chaired by the Democratic Party MP Ervin Salianji; after about 4 months of work two separate reports were produced (the Socialist Party majority and the Democratic Party minority); the Democratic Party report claimed (without this being criminally proven) that the data were used by criminal groups."
      },
      {
        "claim": "The case led to criminal prosecution",
        "note": "The Tirana prosecution office (not the special prosecution office) placed Muça under house arrest on 9 April 2024 and suspended him from duty; in March 2025 it completed the investigation and sent him to trial on charges of 'unauthorised computer access' and 'abuse of office'. The Tirana court and the Court of Appeal have upheld the house arrest measure. As of this verification (July 2026) no final court ruling/conviction was found."
      },
      {
        "claim": "The case is handled by the special prosecution office",
        "note": "The sources show that the investigation/indictment was carried out by the Tirana prosecution office (an ordinary prosecution office), not the special prosecution office. The former head of the inquiry committee himself, Salianji, has publicly demanded that the special prosecution office take over the investigation, which suggests that so far it has not been the main investigating body in this case."
      }
    ],
    "verificationNotes": "Several mutually independent Albanian media outlets (Balkanweb, voxnews.al, cna.al, Pamfleti, Albanian Daily News) confirm the core fact: Ervin Muça, IT director of the State Police, was charged and investigated over the unauthorised export/copying of the TIMS database, with a house arrest measure imposed on 9 April 2024.",
    "confidence": "medium",
    "sources": [
      "shqiptarja.com: 'Eksportoi bazën e të dhënave TIMS, Prokuroria e Tiranës kërkon arrest shtëpie për drejtorin e IT-së në Policinë e Shtetit, Ervin Muça' (He exported the TIMS database: the Tirana prosecution office requests house arrest for the State Police IT director, Ervin Muça)",
      "top-channel.tv (26 March 2025): 'Hetimi i Prokurorisë për drejtorin e IT-së në Policinë e Shtetit, Salianji: historia mafioze që e dokumentoi komisioni TIMS' (The prosecution's investigation into the State Police IT director; Salianji: the mafia story documented by the TIMS committee)",
      "boldnews.al (7 August 2023): 'PD nxjerr detajet: Si dhe kush i vodhi të dhënat e TIMS-it në Polici' (The Democratic Party reveals the details: how, and by whom, the TIMS data were stolen at the police)",
      "pamfleti.net: 'Akuzohet se vodhi të dhënat nga TIMS, Ervin Muça shkon në SPAK/Prokurori' (Accused of stealing the TIMS data, Ervin Muça goes to the special prosecution office/prosecution)",
      "voxnews.al: 'Kopjimi i të dhënave të TIMS, çfarë provuan ekspertët mbi kompjuterin e Ervin Muças' (The copying of the TIMS data: what the experts tested on Ervin Muça's computer)",
      "Reports on the US Embassy's meeting (Martin McDowell) with the minister Taulant Balla, 17 August 2023: kohajone.com, cna.al, faktor.al",
      "Reports on the parliamentary inquiry committee chaired by Ervin Salianji and its majority/minority reports"
    ]
  },
  "fondet-rindertimit-termeti": {
    "title": "The scandal over the reconstruction funds after the earthquake of 26 November 2019",
    "period": "February 2020 onwards (2026)",
    "teaser": "Of the €1.15 billion pledged after the earthquake, the state audit office found 16 violations, including a lack of documentation on how the funds were used.",
    "redactedPhrase": "16 violations",
    "narrative": [
      "After the devastating earthquake of 26 November 2019, €1.15 billion was pledged by the EU, member states and other organisations at the international donors' conference in Brussels (17 February 2020), a figure confirmed by international sources (Reuters, Euractiv, Tirana Times). An audit by the Albanian Supreme Audit Institution, published in November 2021 and covering the period from January 2020 to April 2021, found 16 violations at the Ministry of Reconstruction, among them a lack of documentation on how the donations were used and the approval of two grant projects without the proper procedure being followed; the report gives no consolidated figure for economic damage. According to an analysis by Open Data Albania (reported by Telegraf.al, 2023), of around €900 million of reconstruction contracts (around 600 million from the municipalities, 300 million from the Albanian Development Fund), the top 30 winning companies take around 42% of the total value, some of them linked to former mayors (e.g. \"Kevin Construction\" of Safet Gjici, former mayor of Kukës) and to MPs; these are journalistic/analytical findings, not a court or administrative decision. A comparable sum (about €650 million / 72.3 billion lek) in tenders without an open competition was found only within a broader journalistic investigation into Albanian public procurement in general, not limited to the reconstruction fund. The Democratic Party MP Arbi Agalliu has publicly called for an investigation into the Albanian Development Fund's tenders; the Special Prosecution Office against Corruption and Organised Crime has active investigations into public procurement in general (e.g. the case of the former deputy prime minister Belinda Balluku, linked mainly to the Llogara tunnel tender), but no criminal proceedings opened specifically over the reconstruction fund were identified. Several media outlets (BoldNews, Standard.al, A2 News, Drita TV) reported in 2023–2024 that tens to hundreds of families in Durrës remain without rent subsidies and/or have been forced to return to buildings declared uninhabitable, almost five years after the earthquake, while the Democratic Party (a political, not an institutional, source) has claimed a higher figure of around 2,500 families affected in Durrës alone. Investigative journalism (Reporter.al) and Open Data Albania have also documented a visible concentration of reconstruction fund disbursements in election campaign periods (April 2021, December 2022 to January 2023), which has been raised as a concern about possible electoral use of public funds, without yet being the subject of a confirmed criminal investigation or court ruling for this specific purpose."
    ],
    "status": "Partly verified / under media and institutional scrutiny, with no confirmed criminal proceedings specifically over the reconstruction fund; some state audit office findings are official (administrative audit), others are journalistic/civil-society analyses (Open Data Albania, Reporter.al) or political accusations (the Democratic Party)",
    "claims": [
      {
        "claim": "About €650 million of the allocated funds distributed through restricted tenders/without competition",
        "note": "No source was found that specifically links the figure of €650 million to the reconstruction fund. A similar figure (€650 million / 72.3 billion lek) appears in reporting on Albanian public procurement in general (not only reconstruction), possibly the source of the confusion. The verified data for reconstruction specifically: about €900 million of contracts in total, with 30 leading companies taking about 42% of the value (Open Data Albania/Telegraf.al)."
      },
      {
        "claim": "The state audit office has found violations in the management of the reconstruction funds",
        "note": "State audit office audit (November 2021, period January 2020 to April 2021): 16 violations/recommendations at the Ministry of Reconstruction, mainly a lack of documentation and incomplete procedures; no specific figure for economic damage in the articles found."
      },
      {
        "claim": "The special prosecution office has opened investigations into the reconstruction fund",
        "note": "Only political calls (the Democratic Party/the MP Agalliu) to the special prosecution office to open an investigation into the Albanian Development Fund's tenders were found, plus special prosecution investigations into public procurement in general (the Balluku case, linked mainly to the Llogara tunnel). No criminal proceedings opened specifically over the earthquake reconstruction fund were confirmed."
      },
      {
        "claim": "Hundreds of families in Durrës/Krujë still on rent subsidies, without a home",
        "note": "The media (BoldNews, Standard.al, A2News, Drita TV, 2023–2024) confirm families still without a home/rent subsidy 4–5 years after the earthquake (reported numbers from about 40–150 up to the Democratic Party's claim of 2,500 in Durrës); the specific figure of 'hundreds' is reasonable, but it varies by time/source, and part of the higher numbers comes from political statements by the opposition, not independent verification."
      },
      {
        "claim": "Part of the reconstruction funds used for election campaigning",
        "note": "Reporter.al and Open Data Albania have documented a concentration of the reconstruction fund's financial disbursements in campaign periods (April 2021; December 2022 to January 2023), a suggestive data pattern raised as a journalistic concern, but not legal/judicial proof of unlawful electoral use."
      }
    ],
    "verificationNotes": "Tirana Times confirms that the international donors' conference was held on 17 February 2020 in Brussels (organised by the European Commission) and raised €1.15 billion (400 million in grants plus 750 million in soft loans at an interest rate below 2%), exceeding the damage estimate of €1.08 billion. The contributors listed include the EU institutions and member states (around €400 million together), the United States (around $5 million), Serbia, Montenegro, Turkey, Israel and Switzerland. English Wikipedia likewise confirms the figure of €1.15 billion, citing the European Commission's official press release on the conference.",
    "confidence": "medium",
    "sources": [
      "https://citizens.al/2022/11/02/pritja-e-gjate-per-rindertimin-banoret-e-durresit-mbeten-pa-shtepi-dhe-bonus-qiraje/",
      "https://euronews.al/rindertimi-klsh-gjen-16-shkelje-ministria-pa-projekte-e-dokumente/",
      "https://telegraf.al/politike/edhe-rindertimi-ne-spak-perfituan-kompanit-e-ish-kryebashkiakeve/",
      "https://boldnews.al/2024/02/25/familjet-pa-bonus-qiraje-rikthehen-ne-pallatet-e-pabanueshme-ne-durres/",
      "https://www.standard.al/familjet-pa-bonus-qiraje-rikthehen-ne-pallatet-e-pabanueshme-ne-durres/",
      "https://a2news.com/shqiperia/sociale/5-vjet-pas-it-ne-durres-ende-pa-shtepi-dhe-pa-bonus-qira-i1117672",
      "https://drita.tv/pd-2500-familje-ne-durres-pa-bonus-qiraje-prej-1-viti/",
      "https://www.cna.al/english/aktualitet/spak-njofton-akuzen-per-belinda-ballukun-i444618",
      "Reuters/Euractiv/Tirana Times coverage of Brussels donor conference, 17 February 2020 (1.15 billion euro pledge); retrieved via search aggregation, original outlet URLs not individually captured",
      "ABC News Albania: 'Tenderat e FSHZH-së, Agalliu: SPAK të hetojë urgjentisht' (The Albanian Development Fund's tenders; Agalliu: the special prosecution office must investigate urgently); title/content retrieved via search aggregation, exact URL not individually captured"
    ]
  },
  "rrjedhja-pagave-targave": {
    "title": "The personal data leak scandal: salaries and car number plates (December 2021)",
    "teaser": "The data of 637,138 employees (salaries, positions, IDs) spread massively on WhatsApp within a single night.",
    "redactedPhrase": "637,138 employees",
    "narrative": [
      "On 22 December 2021 the personal data of 637,138 citizens (public and private sector employees), including ID card numbers, names, workplaces, salaries, positions and working hours, spread massively on WhatsApp and social networks, according to citizens.al's reporting. Two days later, on 24 December, a second database with the number plates, models and owners of vehicles in Albania also became public, confirmed by euronews.al, which quoted the chief prosecutor of Tirana, Elisabeta Imeraj, promising that the culprit would be found. The same day the IT director of the National Agency for Information Society resigned, while the Tirana prosecution office opened an investigation for \"abuse of office\" and \"unlawful interference with a computer system\", questioning employees of the institutions involved; the Commissioner for the Right to Information and Protection of Personal Data also opened an administrative investigation. President Ilir Meta described the incident as a \"flagrant violation\" of human rights and dignity, the opposition (the Democratic Party, Sali Berisha) used the scandal to call protests, accusing the government, while the European Commission listed the leak as a concern in its February 2022 reporting on Albania. The only well-documented related incident involving leaked phone numbers is the earlier one, of April 2021, when the data (including phone numbers and political preferences) of 910,000 Tirana voters were published (a different scandal, linked to the Socialist Party's lists of \"patronazhistë\", its party canvassers); a third wave of leaks specifically within December 2021 does not appear in the sources checked, including a citizens.al summary article from September 2022 on 5 cyberattacks in 14 months. No final public outcome of the criminal investigation was found in the sources consulted (neither formal official charges nor arrests or convictions), so concrete criminal responsibility remains unclear/publicly unresolved to date."
    ],
    "status": "Investigation opened by the Tirana prosecution office (abuse of office / unlawful computer interference) and by the data protection commissioner; the IT director of the information society agency resigned; no formal charge, arrest or public conviction was found as the final result of the investigation in the sources consulted; status unclear/publicly unresolved.",
    "claims": [
      {
        "claim": "A few days later, a leak of the number plates of all vehicles in Albania",
        "note": "euronews.al (24 December 2021) confirms the publication of a database with vehicles' number plates, models, owners and personal ID numbers, two days after the salary leak; the chief prosecutor of Tirana announced an active investigation."
      },
      {
        "claim": "A subsequent leak of the phone numbers of thousands of citizens, as part of the same December 2021 wave",
        "note": "None of the sources consulted (citizens.al, euronews.al, including the citizens.al summary of September 2022 on 5 cyberattacks in 14 months) reports a separate leak of phone numbers within this specific wave. There may be confusion with the April 2021 leak of 910,000 Tirana voters, which included phone numbers, but that is a different, earlier incident."
      },
      {
        "claim": "The resignation of the information society agency's IT director and the opening of an investigation by the prosecution",
        "note": "euronews.al reports the resignation of Ervin Muça (IT director, National Agency for Information Society) on 24 December 2021 and the start of the questioning of employees by the Tirana prosecution office."
      },
      {
        "claim": "The final legal outcome of the investigation (charges/convictions)",
        "note": "No announcement of formal charges, arrests or convictions resulting from the investigation was found in the available sources; it cannot be confirmed whether the case was closed, archived or is still in progress."
      }
    ],
    "verificationNotes": "A follow-up citizens.al article (30 December 2021) reports the reaction of the Albanian Media Council and the Albanian Helsinki Committee, which described the incident as a \"massive violation of privacy\". The government spokesperson contested this interpretation, claiming that the document was a compilation of fragmented data from different periods, not a direct export from the database; but this does not refute the number of people, the nature of the data or the means of dissemination.",
    "confidence": "medium",
    "sources": [
      "https://citizens.al/2021/12/22/tjeter-rrjedhje-e-te-dhenave-personale-publikohen-pagat-e-637-mije-qytetareve/",
      "https://citizens.al/2021/12/30/listat-e-pagave-kshm-i-ben-thirrje-mediave-per-te-ruajtur-balancen-mes-interesit-publik-dhe-privatesise/",
      "https://euronews.al/skandali-me-pagerrjedhjen-dhe-te-dhenat-per-targat-kryeprokurorja-e-tiranes-autori-do-te-gjendet/",
      "https://citizens.al/2022/09/12/pasiguri-kibernetike-te-dhenat-personale-u-sulmuan-pese-here-ne-14-muaj/",
      "https://euronews.al/?s=pagerrjedhja (series of articles, December 2021 to February 2022)"
    ]
  },
  "fondet-covid": {
    "title": "The COVID funds scandal: international financing, secret contracting and tenders without competition",
    "period": "2020–2021 (the COVID emergency financing and procurement); subsequent investigations/cases up to 2023–2024",
    "teaser": "The government declared COVID procurement a 'state secret'; 177 tenders were awarded without public competition.",
    "redactedPhrase": "177 tenders",
    "narrative": [
      "During the COVID-19 pandemic Albania received international financing on the scale of hundreds of millions of euros: around €174 million from the International Monetary Fund (Rapid Financing Instrument, April 2020, also linked to the 2019 earthquake), €180 million of macro-financial assistance from the EU (2021) and additional loans/grants from the World Bank for the health emergency and economic recovery. In parallel, the Rama government approved by Council of Ministers decision (no. 203/2020, 242/2020) the classification of COVID public purchases as \"secret contracting\" in the \"essential interest of the state\", a decision criticised by the Albanian Institute of Science (a partner of the Balkan Investigative Reporting Network) as unconstitutional and non-transparent. The reporter.al investigation (June 2020), confirmed by standard.al and dosja.al, found that about €8.9 million (1.1 billion lek) was procured by 113 public institutions through 177 tenders by direct negotiation without public announcement between 12 March and 15 May 2020, most of them with only 1–2 bids, including specific contracts such as one worth about €2.8 million with Farma Net Albania/Euromed for protective equipment. As additional context (not part of the COVID emergency tenders themselves): in August 2023 the Special Prosecution Office against Corruption and Organised Crime arrested the former deputy health minister Klodian Rjepaj and the businessman Ilir Rrapaj in connection with the medical equipment sterilisation concession (about €100 million), on charges of abuse of office and forgery of documents; the case is still before the courts, with no final ruling."
    ],
    "status": "Partly verified/mixed: the lack of transparency (secret contracting by Council of Ministers decision) and the procurement without public competition during COVID (about €8.9 million) are well documented by investigative journalism and civil society organisations; international financing on the scale of \"hundreds of millions of euros\" is confirmed at aggregate level. Related but separate cases in the health sector (the sterilisation concession) have been in active court proceedings brought by the special prosecution office since 2023, with no final court ruling yet.",
    "claims": [
      {
        "claim": "Debt of hundreds of millions of euros during the pandemic from the EU, the International Monetary Fund and the World Bank",
        "note": "The IMF approved $190.5 million (about €174 million) on 10 April 2020 through the Rapid Financing Instrument, explicitly for the combined consequences of the November 2019 earthquake AND COVID (not COVID alone). The EU gave €180 million of macro-financial assistance (2 tranches of 90 million, March and November 2021), part of a €3 billion regional package. The World Bank financed at least €15 million in April 2020 plus an additional $80 million in December 2020, in health emergency and economic recovery programmes. In total, the international financing/debt clearly exceeds 'hundreds of millions of euros', confirming the scale of the claim."
      },
      {
        "claim": "Lack of transparency in public procurement during COVID",
        "note": "The government approved Council of Ministers decisions no. 203/2020 and 242/2020, which classified public purchases for COVID as 'secret contracting' on the basis of the 'essential interest of the state'. The Albanian Institute of Science (a partner of the Balkan Investigative Reporting Network) criticised this as unconstitutional and non-transparent, because it eliminated public calls for interest and competition."
      },
      {
        "claim": "Tenders for masks/disinfectants/ventilators without competition at inflated prices",
        "note": "It is confirmed by numerous sources (reporter.al, standard.al, dosja.al) that about €8.9 million (1.1 billion lek) was procured by 113 state institutions through 177 tenders by direct negotiation without public announcement (12 March to 15 May 2020), most with only 1–2 bids. A specific contract of about €2.8 million (Farma Net Albania/Euromed, 21 March 2020) for protective equipment was also identified. Specific claims of drastically inflated prices for ventilators (e.g. the figure of about €2,000 vs about €6,400 per unit, linked to the special prosecution office) remain not fully confirmed and are not treated as established fact."
      },
      {
        "claim": "COVID aid/funds ended up with firms linked to the Socialist Party, according to the Albanian Supreme Audit Institution and the Balkan Investigative Reporting Network",
        "note": "No concrete source was found that links winning firms in the COVID tenders by name to the Socialist Party in the way claimed. The state audit office has carried out audits of the Ministry of Health's COVID spending, finding managerial weaknesses and procurement problems, but no publicly specified finding about \"firms linked to the Socialist Party\" was found. This part of the claim remains unverified."
      },
      {
        "claim": "Additional context: corruption in the health sector during/after the COVID period (not necessarily part of the specific emergency tenders)",
        "note": "In August 2023 the special prosecution office arrested the former deputy health minister Klodian Rjepaj and the businessman Ilir Rrapaj in connection with the medical equipment sterilisation concession (about €100 million, 10 years), on charges of abuse of office and forgery of documents. This is a separate long-term health concession case and not part of the specific COVID emergency tenders discussed above, but it is relevant as context for corruption in health during/after the pandemic period."
      }
    ],
    "verificationNotes": "The cumulative international financing (detailed in claims[]) clearly exceeds \"hundreds of millions of euros\". The nature of the financing (loans/emergency instruments, not pure grants) makes the description as \"debt\" accurate. The additional contextual claims (firms linked to the Socialist Party according to the state audit office/the Balkan Investigative Reporting Network, inflated ventilator prices) remain unverified and are not included in this conclusion, which covers only the international financing figure.",
    "confidence": "medium",
    "sources": [
      "https://www.standard.al/tendera-pa-shpallje-institucionet-prokuruan-8-9-milione-euro-gjate-epidemise/",
      "https://ais.al/new/en/purchases-for-covid-19-situation",
      "https://www.reporter.al/2020/06/03/tendere-pa-shpallje-institucionet-prokuruan-8-9-milion-euro-gjate-epidemise/ (the original source of the investigation, referred to by standard.al and dosja.al)",
      "IMF Press Release 20/166 (imf.org): approval of a $190.5 million Rapid Financing Instrument for Albania, April 2020 (verified through a direct quotation found in search)",
      "European Commission, Neighbourhood/Enlargement press release on €180 million of macro-financial assistance for Albania",
      "Albanian Supreme Audit Institution (klsh.org.al): references to audits of the Ministry of Health's COVID spending (identified through search; the full report was not read directly)",
      "Multiple reports on the special prosecution case over the sterilisation concession (Klodian Rjepaj / Ilir Rrapaj, 2023)"
    ]
  },
  "klement-balili": {
    "title": "Klement Balili, the \"Escobar of the Balkans\": a former transport director declared internationally wanted for drug trafficking",
    "period": "2013 (appointment); May 2016 (declared wanted); January 2019 (surrender); about 2024 (release on probation)",
    "teaser": "The 'Escobar of the Balkans' was a state director appointed as a political reward; he gave himself up after almost 3 years on the run.",
    "redactedPhrase": "almost 3 years",
    "narrative": [
      "Klement Balili was appointed director general of Road Transport in Sarandë after the 2013 elections, a post that, according to his own statements, was a reward for his contribution to the election campaign of the Socialist Movement for Integration, Edi Rama's coalition ally at the time. In May 2016 a court in Athens declared him internationally wanted for drug trafficking, structured criminal group and money laundering, while the Greek media dubbed him \"the Escobar of the Balkans\"; he was dismissed from his public post after the investigations were opened. Balili remained a fugitive for around 2 years and 8 months (close to 3 years), surrendering voluntarily on 15 January 2019 near the Shijan Bridge, between Delvinë and Finiq, precisely the area where the opposition (the Democratic Party) claimed he moved about freely; this claim remains a political accusation that has not been independently verified by any court. The media reported that the police failed 13–15 times to catch him during this period, with publicly repeated suspicions of information being leaked from inside the police structures, but no individual responsibility has been officially established for \"staged operations\". The quantity of drugs trafficked is reported differently by different sources: some speak of a load of about 700 kg of cannabis, others of 650–678 kg in the case of the seizure on Zakynthos, while the court charges and other summaries speak of loads of over 500 kg per voyage and a cumulative total of up to 1.6 tonnes; the figure of \"about 700 kg\" circulating in the media is within the reported range, but it is not the only or the definitive figure. The Serious Crimes Court sentenced him to 15 years in prison, reduced to 10 years because of the abbreviated trial; the Court of Appeal and the Supreme Court upheld the ruling, so this is one of the cases with a final criminal conviction (not merely under investigation). The Special Court of First Instance for Corruption and Organised Crime confiscated around 22 properties (around 16–17 apartments in Sarandë, land and buildings) under the anti-mafia law, with about 40% of the assets passing to the state; according to media sources (not fully verified officially), some properties were later returned to him through a disputed court ruling. Balili was released on probation after approximately 5 years in prison (around 2024) and later appeared publicly at Socialist Party victory celebrations in Sarandë, which revived the accusations of continuing political ties."
    ],
    "status": "Final criminal conviction (by a final ruling) for international drug trafficking, structured criminal group and money laundering: 10 years in prison (from 15 years initially); released on probation after about 5 years, according to media reports from 2025. The accusations of political protection and \"theatrical\" police operations remain media/political claims, not proven by any official decision.",
    "claims": [
      {
        "claim": "Former director of Transport in Sarandë",
        "note": "Confirmed by many sources (politiko.al, zeriamerikes.com/Voice of America, sarandaweb.net): he was appointed director after the 2013 elections and dismissed when the drug trafficking investigations began."
      },
      {
        "claim": "Wanted by the Greek police for drug trafficking (about 700 kg of cannabis)",
        "note": "The international wanted notice from the Athens court is fully confirmed. The quantity of about 700 kg is mentioned by some sources (shqiptarja.com, jpost.com) for a specific load, but other sources give different figures (650–678 kg for the Zakynthos case; court statements mention loads of over 500 kg per voyage; a cumulative total of up to 1.6 tonnes according to some summaries). There is no single confirmed official figure as 'the total'."
      },
      {
        "claim": "He moved about freely in the Delvinë area while wanted",
        "note": "It is an accusation raised publicly by the Democratic Party (the opposition) and the media, indirectly supported by the fact that he surrendered precisely in the Delvinë-Finiq area, but no independent judicial or investigative confirmation was found of free movement during the 3 years he was wanted."
      },
      {
        "claim": "'Theatrical' police operations with information leaked in advance",
        "note": "Several media sources (tpz.al, telegrafi.com and others) report 13–15 failed police operations and repeated suspicions of information leaks ('dekonspirim') from inside the police, but there is no official or judicial finding confirming them as staged ('theatrical') or identifying specific culprits."
      }
    ],
    "verificationNotes": "politiko.al publishes a direct interview with Balili himself, in which he explains that he became regional transport director for the Sarandë-Delvinë area after the 2013 elections as a \"reward\" for his contribution to the Socialist Movement for Integration's campaign. dritare.net and fax.al independently confirm the same fact, likewise linking the appointment to a political reward after the campaign. Since Balili himself confirms this and several different media report it with consistent details, the claim \"former Director of Transport in Sarandë, appointed as a political reward\" is considered well established.",
    "confidence": "medium",
    "sources": [
      "exit.al: 'What Do We Know So Far About Klement Balili Turning Himself In' (exit.al/en/what-do-we-knowabout-klement-balili-turning-himself-in-so-far/)",
      "exit.al: 'Albanian \"Balkans\" Escobar Klement Balili Surrenders' (exit.al/en/albanian-balkans-escobar-klement-balili-surrenders/)",
      "politiko.al: 'Klement Balili: Si u bëra drejtor i Transporteve pas zgjedhjeve' (Klement Balili: how I became director of Transport after the elections)",
      "zeriamerikes.com (Voice of America's Albanian service): 'Shkarkohet Drejtori Transporteve në Sarandë, Klement Balili' (The director of Transport in Sarandë, Klement Balili, is dismissed)",
      "sarandaweb.net: 'Shkarkohet drejtori i transportve në Sarandë: Klement Balili të hetohet...' (The director of transport in Sarandë is dismissed: Klement Balili should be investigated...)",
      "dritare.net: 'PD: Kremend Balili, baroni i drogës dhe drejtor i Transportit të Sarandës' (Democratic Party: Kremend Balili, the drug baron and director of Transport of Sarandë)",
      "tpz.al: reporting on 13 failed police operations",
      "telegrafi.com: reporting on the search by the US Drug Enforcement Administration and the failed operations",
      "shqiptarja.com: details on the quantity of drugs and the sentence",
      "balkanweb.com, mapo.al, oranews.tv: reports on the sentence, the appeal and the confiscation of assets by the special anti-corruption court",
      "jpost.com: reporting on the international case"
    ]
  },
  "dosja-habilaj": {
    "title": "The Habilaj file",
    "period": "2013–2022",
    "teaser": "Rama's former interior minister was convicted of abuse of office by a final ruling; he was acquitted of drug trafficking.",
    "redactedPhrase": "abuse of office",
    "narrative": [
      "Saimir Tahiri, Rama's interior minister from 2013 to 2017, was convicted (at first instance in 2019, made final on appeal on 4 February 2022) and sentenced to 3 years and 4 months in prison for abuse of office, in connection with his relations with the Habilaj family's drug trafficking network to Italy. He was acquitted of the more serious charges of direct trafficking and organised crime. The ruling is confirmed by numerous independent sources (Koha.net, VoxNews.al, Gazeta Tema, Sarandanews, Kallxo.com, RDNews.al), all reporting the same February 2022 ruling of the Special Court of Appeal for Corruption and Organised Crime."
    ],
    "status": "Convicted (final, February 2022).",
    "claims": [],
    "confidence": "high",
    "sources": [
      "https://en.wikipedia.org/wiki/Edi_Rama"
    ]
  },
  "dosja-339": {
    "title": "File 339: the intercepts on alleged links between organised crime and vote-buying for the Socialist Party in Durrës (2017 elections)",
    "period": "2017 (the events); public revelations 2018–2019; developments up to 2021 (no independent confirmation of the status after 2021 was found)",
    "teaser": "Published intercepts suggested vote-buying with the help of a criminal group in Durrës; no senior political figure was charged.",
    "redactedPhrase": "no senior political figure",
    "narrative": [
      "\"File 339\" (and its offshoot 339/1) is an investigation by the Serious Crimes Prosecution Office, initially launched as an operation against the drug trafficking of the group of the brothers Astrit and Altin Avdylaj (based in Shijak), which produced phone intercepts in which cooperation is alleged between this criminal group and Socialist Party officials to control/buy votes in the parliamentary elections of June 2017, mainly in Durrës but, according to journalistic investigations, also in Kavajë, Lezhë and Dibër. Part of these intercepts was reported to have been published by the German newspaper Bild, which several Albanian media outlets mentioned (e.g. ABC News, with a headline stating \"according to BILD\"), and the same file was also investigated independently by the Balkan Investigative Reporting Network/Balkan Insight and Voice of America. The former mayor of Durrës, Vangjush Dako (Socialist Party), appears in the intercepts, recorded in conversations with the Avdylaj brothers, including a phone call after the elections in which a wish is expressed to meet them \"to thank them\"; Dako was questioned as a person with knowledge of the facts in May 2019 and denied any link to vote-buying, saying that he had not won the elections in this way; he has not been formally charged in this specific file. In October 2018 it was reported that around 44 people were involved in the investigation, but according to an investigation by Lapsi.al (2021, the only source found for this detail), the file was narrowed considerably over time and only around 21 low-level election commissioners from two villages in Shijak ended up formally charged, while the main political and criminal figures were not prosecuted for vote-buying. Dako was declared \"persona non grata\" by the US State Department in July 2019 for \"involvement in significant corruption\" (most sources do not causally link this decision to File 339 specifically, although the Transparency International database mentions it within the same case description) and was arrested by the Special Prosecution Office against Corruption and Organised Crime in June 2023, but over a different matter (abuse of office in connection with building permits and the seafront promenade project in Currila), not for vote-buying. The matter remains politically contested: voices close to the government (e.g. Mero Baze/Gazeta Tema) describe the file as \"political propaganda\" because, in their view, it has not produced any criminal conviction of the main figures, while the opposition and part of civil society present it as evidence of links between organised crime and the Socialist Party's local structures."
    ],
    "status": "Unfinished/narrowed: no main political or criminal figure has been convicted or formally charged with vote-buying under File 339; only some low-level commissioners were prosecuted (according to one source, Lapsi.al 2021). Vangjush Dako was questioned only as a \"person with knowledge of the facts\" in 2019 and was not charged with vote-buying; since June 2023 he has been charged by the special prosecution office, but over a different matter, not File 339.",
    "claims": [
      {
        "claim": "Published phone intercepts suggest a role for the Avdylaj group in buying votes for the Socialist Party in Durrës in the 2017 elections",
        "note": "Confirmed by numerous independent sources: the Balkan Investigative Reporting Network/Balkan Insight (28 October 2018), Voice of America (citing the network's investigation), ABC News Albania, Shqiptarja.com, Gazeta Si, TV Klan, Balkanweb. The mayor of Durrës, Vangjush Dako, appears in the intercepts in contact with the brothers Astrit and Altin Avdylaj; the investigation also touches Kavajë, Lezhë and Dibër."
      },
      {
        "claim": "The audio/recordings were published by the German newspaper Bild",
        "note": "The ABC News Albania headline says so explicitly ('...according to BILD') and this is repeated by several Albanian media outlets. I could not open the original Bild.de article directly for first-hand verification (a technical limitation of the search tool); the confirmation comes from secondary Albanian sources that refer to Bild, not from Bild's own site."
      },
      {
        "claim": "Around 44 people were involved in the investigation/charged (October 2018)",
        "note": "The number 44 is reported by the Voice of America article (citing the Balkan Investigative Reporting Network); no other source repeats exactly this figure, although Transparency International reports close, but not identical, figures for the same time (October 2018): 27 members of the clan arrested and 25 people charged with drug trafficking and related offences."
      },
      {
        "claim": "Only about 21 low-level election commissioners ended up formally charged, not the main figures",
        "note": "This detail comes from a single investigative article (Lapsi.al, March 2021); no independent second source was found confirming the figure or the exact outcome of the file."
      },
      {
        "claim": "Vangjush Dako was convicted or formally charged with vote-buying",
        "note": "According to all the sources found (2018–2021), Dako was questioned only as a 'person with knowledge of the facts' in May 2019 and was not formally charged in this file; he denies any involvement. His arrest by the special prosecution office in June 2023 relates to a different matter (abuse of office over building permits/the seafront promenade), not to the 2017 vote-buying."
      }
    ],
    "verificationNotes": "Transparency International, in its database of corruption cases, describes the case almost word for word as the claim does: the intercepts revealed that the Avdylaj clan was involved in buying votes and intimidating state and municipal employees in the Durrës district in exchange for securing votes for the Socialist Party during the June 2017 elections. The same source reports that in October 2018 27 members of the clan were arrested and 25 people were charged with drug trafficking and related offences, while Vangjush Dako was not formally charged but was declared non grata by the United States. ABC News (abcnews.al) published the full transcripts of the intercepts, in which Astrit Avdylaj is quoted promising a \"10 to 0\" result for the Socialist Party in exchange for favours. The same material was reported independently by balkanweb.com, oranews.tv, vizionplus.tv, shqiptarja.com and other media. The reported debates (whether Dako personally should have been prosecuted, the political characterisation of the case) are matters of interpretation and do not contradict the existence of the intercepts themselves or the clan's involvement.",
    "confidence": "medium",
    "sources": [
      "https://abcnews.al/cfare-permbajtje-ka-dosja-339-1-i-klanit-avdylaj-sipas-bild/",
      "https://www.gazetasi.al/dosja-339-vangjush-dako-deshmon-5-ore-te-krimet-e-renda/",
      "https://balkanweb.com/dosja-339-1-dalin-emrat-e-personave-qe-do-shkojne-ne-gjykim/",
      "https://lapsi.al/2021/03/16/historia-si-e-varrosi-drejtesia-e-re-dosjen-3391/",
      "https://www.gazetatema.net/2019/03/03/miti-i-dosjes-339-nje-propagande-politike/",
      "https://www.zeriamerikes.com/a/4765322.html",
      "https://balkaninsight.com/2018/10/26/investigation-over-drug-trafficking-exposes-vote-buying-episodes-10-26-2018/bi/",
      "https://sq.wikipedia.org/wiki/Vangjush_Dako"
    ]
  },
  "kanabisi-pas-lazaratit": {
    "title": "The return and spread of cannabis cultivation across Albania after Lazarat (2015–2021)",
    "period": "2014–2021 (main focus 2015–2019)",
    "teaser": "After the destruction of Lazarat, cannabis cultivation spread over hundreds of new hectares across the country.",
    "redactedPhrase": "hundreds of new hectares",
    "narrative": [
      "After the police operation of June 2014 that destroyed the large plantations of Lazarat, cannabis cultivation did not disappear but, according to the annual official aerial monitoring reports (not satellite monitoring, as the Albanian sources stress) of Italy's financial police, the Guardia di Finanza, it spread into smaller plots in many parts of the country. The verified data from these reports show: around 323 hectares identified in 2013, a fall to around 44.7 hectares in 2015 and a return to around 213.4 hectares in 2016 (around 169 hectares more than in 2015), a figure that the interior minister of the time, Saimir Tahiri, presented as a success by unfairly comparing it with 2013 rather than with 2015, which the media criticised as manipulation of statistics. The official Guardia di Finanza figure for 2016 (213.4 hectares) is around 23–24 times lower than the figure of over 5,000 hectares that often circulates for the same year, which is not found to be supported by any official or journalistic source. Some Albanian media (koha.net, November 2017) have reported a much higher figure, 1,971 hectares, for 2017; this conflicts with other reports (Voice of America/boldnews.al, December 2021, which describes the 37 hectares of 2021 as the largest area since 2016, implying that every year from 2017 to 2020 had less than 37 ha), an unresolved contradiction between sources. After the new law-enforcement campaign of 2017–2018 (including the involvement of the army under the new interior minister Fatmir Xhafaj), the 2018 monitoring found only 0.8 hectares under cultivation in the whole country, despite around 200 hours of flights. The characterisation of Albania as Europe's main cannabis supplier during this period is widely repeated in the international/regional media, but it rests more on reputation and qualitative analysis than on a single verifiable market-share figure; the often-cited figure of around 900 tonnes / €4.5 billion of annual production was found to be linked to a 2013 estimate (before the Lazarat operation), not specifically to 2016."
    ],
    "status": "No single court case or investigation by the Special Prosecution Office against Corruption and Organised Crime devoted specifically to this subject as a whole has been identified (the special prosecution office was created in 2019, after the main period described); this is mainly a matter of failed/contested public policy, documented by official Italian reports and by media criticism of the Rama government and former minister Tahiri, alongside numerous individual criminal cases against particular growers/traffickers (outside the scope of this summary).",
    "claims": [
      {
        "claim": "Over 5,000 hectares planted with cannabis were documented in 2016 by the Guardia di Finanza",
        "note": "Two independent Albanian sources (standard.al and sot.com.al), citing the same official Guardia di Finanza report presented by the interior minister Saimir Tahiri in October 2016, give the figure of 213.4 hectares for 2016, around 23–24 times lower than 5,000. No source found (Albanian or international) supports the figure of 5,000+ hectares for 2016."
      },
      {
        "claim": "The monitoring was done with Guardia di Finanza satellites",
        "note": "The Albanian sources found (standard.al, koha.net, gazetatema.net) consistently describe aerial monitoring with aircraft/flights (e.g. 200 flight hours, 53 missions), not satellites. The exact methodology (satellite versus aircraft) was not confirmed by an accessible original Italian source."
      },
      {
        "claim": "Cultivation spread to all of Albania's counties after the destruction of Lazarat",
        "note": "The dispersal of cultivation into many scattered plots is confirmed (88 plots identified in the 683,249 ha scanned in 2017), but no source found specifies explicitly that every county in the country was affected; it is a reasonable generalisation based on the reported geographical distribution, not an officially verified figure."
      },
      {
        "claim": "Albania became Europe's main cannabis supplier",
        "note": "A characterisation widely repeated in the international media (e.g. cannabisnow.com calls Albania 'Europe's top producer of illicit-market cannabis') and in the country's international reputation in that period, but no single, uncontested figure for its share of the European market was found that would precisely quantify the claim."
      },
      {
        "claim": "Total annual production reached around 900 tonnes, worth around €4.5 billion",
        "note": "This figure, also cited in English Wikipedia, traces back to a blog post (Sensi Seeds, 2013) that refers to the Italian financial police, with no directly accessible primary document; and it refers to the situation in 2013 (before the 2014 Lazarat operation), not specifically to 2016 as claimed."
      }
    ],
    "verificationNotes": "Several sources converge on the official Guardia di Finanza figure of around 210–213.4 hectares for 2016, far from the claim of \"over 5,000 hectares\". tvklan.al cites the figure of 213.4 hectares (2,086 plots); gazetatema.net confirms 323 hectares for 2013 and around 210 for 2016; exit.al (citing Balkan Insight, The Economist, Tirana Times) gives 44.7 hectares for 2015 and 213 hectares for 2016. No source, Albanian or international, supports the figure of \"over 5,000 hectares\" for 2016; all the data found are around 23–24 times lower than the claim.",
    "confidence": "medium",
    "sources": [
      "https://www.standard.al/raporti-i-guardia-di-finanza-rrezon-tahirin-ne-shqiperi-u-mbollen-169-hektare-kanabis-me-shume-se-ne-2015/",
      "https://sot.com.al/politike/raporti-i-guardia-di-finanza-rrezon-tahirin-ne-shqiperi-u-mbollen-169-hektare-kanabis-me/",
      "https://www.koha.net/arberi/sivjet-ne-shqiperi-u-evidentuan-88-parcela-ose-1971-hektare-me-kanabis",
      "https://www.gazetatema.net/2019/02/13/raporti-guardia-di-finanza-200-ore-fluturime-vetem-0-8-hektare-ne-gjithe-vendin/",
      "https://boldnews.al/2021/12/10/zeri-i-amerikes-mbi-37-hektare-jane-perdorur-per-te-kultivuar-lende-narkotike-ne-shqiperi/",
      "https://en.wikipedia.org/wiki/Cannabis_in_Albania",
      "https://cannabisnow.com/cannabis-in-the-balkans-from-criminals-to-capitalists/",
      "http://www.balkaninsight.com/en/article/report-cannabis-growth-mounts-in-albania"
    ]
  },
  "dosja-xibraka": {
    "title": "The \"Xibraka\" file: the cocaine laboratory (2015)",
    "teaser": "Albania's first cocaine laboratory; the opposition alleged a link to the prime minister's brother, but special anti-corruption prosecutors found no evidence and closed the investigation into him.",
    "redactedPhrase": "found no evidence",
    "narrative": [
      "In January 2015 the Albanian police, in cooperation with the German police, discovered in the village of Xibrakë (Elbasan) what the media described as the first cocaine-processing laboratory found in Albania, around a year after Edi Rama came to power. Around 100 kg of narcotic substance were seized (according to some reports, about 19 kg of pure cocaine plus additional mixed quantities), along with weapons and money in several currencies, and around 10–11 people were arrested, among them Ermal Hoxha (a relative of the former dictator Enver Hoxha) and two Colombian nationals (identified in the press as Cezar Gutiérrez/Avila and Valter/Juan Moreno). Genci Xhixha, considered by the prosecution to be the group's organiser and financier, was declared wanted, was later convicted in absentia (around 8 years and some months) and, according to the latest verifiable sources (2024 to early 2025), remains at large, with suspicions that he is living in Cuba. In March 2024 the opposition MP Gazment Bardhi publicly revealed data from the border database known as TIMS according to which a vehicle (plate AA653DM) used by members of the criminal group had also been recorded as used by Olsi Rama, the brother of Prime Minister Edi Rama, raising accusations of possible links to the trafficking; Olsi Rama appeared voluntarily twice at the Special Prosecution Office against Corruption and Organised Crime (2024) and gave explanations as a person with knowledge of the facts. On 10 January 2025 the special prosecution office announced that the investigation had found no evidence or facts linking Olsi Rama to the cocaine trafficking and closed this branch of the case, returning the file to the General Directorate of the State Police for other perpetrators not yet identified."
    ],
    "status": "Partly closed: the trial of those arrested in 2015 ended in convictions (some appealed up to the Supreme Court); Genci Xhixha remains convicted in absentia, has still not been arrested and is wanted. The special prosecution office's separate investigation into Olsi Rama was closed on 10 January 2025 without charges, after it was declared that no evidence linking him to the trafficking had been found; there was never any formal charge against him.",
    "claims": [
      {
        "claim": "January 2015: the discovery of the first cocaine laboratory in Albania, in Xibrakë (Elbasan)",
        "note": "Confirmed by shqiptarja.com, balkanweb.com, botasot.info and other sources; the operation was carried out on 13–14 January 2015 in cooperation with the German police; the press has described it as the first laboratory of this kind discovered in the country."
      },
      {
        "claim": "About 100 kg of pure cocaine seized",
        "note": "The figure of 100 kg is widely repeated in the media, but as the total quantity seized, not as pure cocaine: Top-Channel.tv and standard.al explicitly describe it as \"mixed cocaine\". One source (balkanweb.com) breaks it down into about 19.4 kg of pure cocaine, about 77.7 kg of suspected substance and about 19.8 kg of cutting agents (total about 117 kg). The claim that the whole quantity of 100 kg was pure cocaine is not supported by the sources."
      },
      {
        "claim": "About 10 people arrested, including Ermal Hoxha (a relative of Enver Hoxha) and two Colombian chemists",
        "note": "The number of people arrested varies from 8 to 11 depending on the source (11 detained initially, 10 remained in pre-trial detention); Ermal Hoxha is widely confirmed as a 'nip' (grandson or nephew)/relative of Enver Hoxha; two Colombian nationals are confirmed (the names vary slightly between sources: Cezar Gutiérrez/Avila, Valter/Juan Moreno)."
      },
      {
        "claim": "The head of the group, Genci Xhixha, was declared wanted and was never caught",
        "note": "Confirmed by many sources (2015–2025): Xhixha was convicted in absentia (about 8 years and 7–8 months) and remains at large according to the latest verifiable sources (early 2025); he is suspected of living in Cuba. No reliable confirmation of an arrest was found up to the time of the research."
      },
      {
        "claim": "An alleged link between Olsi Rama (Edi Rama's brother) and the Xibrakë group through a shared vehicle",
        "note": "The opposition's accusation (Gazment Bardhi, March 2024), based on border database data on the shared use of the vehicle AA653DM, is widely documented in the media (syri.net, lapsi.al, balkanweb, dosja.al). The factual/criminal link itself remains unconfirmed: on 10 January 2025 the special prosecution office announced that it had found no evidence linking Olsi Rama to the cocaine trafficking and closed this investigation."
      }
    ],
    "verificationNotes": "Top-Channel.tv (14 January 2015) and standard.al (15 January 2015) confirm the discovery of the laboratory in the village of Xibrakë (Elbasan), over 100 kg of mixed cocaine and 8 people arrested, among them Ermal Hoxha. Gazeta Si and 360 Gradë confirm the same main details (the date, the quantity, the people involved, Genci Xhixha on the run) and explicitly use the wording \"the first cocaine laboratory discovered in Albania only 1 year after Edi Rama came to power\". The exact date of the operation is reported slightly differently depending on the source (13 or 14 January 2015), but the month (January 2015) is consistent across all sources.",
    "confidence": "medium",
    "sources": [
      "https://shqiptarja.com/lajm/kokaina-e-xibrakes-ermal-hoxha-dhe-genci-xhixha-kerkojne-pafajesi",
      "https://shqiptarja.com/lajm/laboratori-i-kokaines-ne-xibrake-gjykata-e-larte-refuzon-ermal-hoxhen-spranohet-rekursi",
      "https://www.balkanweb.com/laboratori-i-kokaines-ne-xibrake-policia-u-zbulua-pas-pergjimeve-te-ilir-hysenit/",
      "https://www.balkanweb.com/kokaina-genci-xhixha-u-denoncua-ne-2011-en-per-pastrim-parash-tani-jeton-ne-kube/",
      "https://www.botasot.info/shqiperia/362780/genci-xhixha-kapobanda-e-kokaines-qe-i-shpetoi-policise/",
      "https://kohajone.com/aktualitet/genci-xhixha-miliona-euro-transaksione-nga-kuba-dhe-kanadaja-drejt-panamse/",
      "https://top-channel.tv/2022/03/29/ne-ndjekje-te-trafikantit-prokuroria-zbulon-fakte-te-reja-per-genci-xhixhen-e-dosjes-xibraka/",
      "https://lapsi.al/2024/03/28/kokaina-e-xibrakes-si-u-dekonspirua-policia-per-genci-xhixhen/",
      "https://syri.net/politike/675703/dokumentet-prokuroria-olsi-rama-dhe-genci-xhixha-perdornin-te-njejten-makine/",
      "https://www.balkanweb.com/en/kryeministri-i-marre-peng-nga-trafiku-i-kokaines-bardhi-denoncon-olsi-rama-lidhje-me-laboratorin-e-droges-ne-xibrake/",
      "https://euronews.al/olsi-rama-paraqitet-ne-prokurorine-e-posacme/",
      "https://www.reporter.al/2025/01/10/spak-thote-se-nuk-gjeti-prova-per-perfshirjen-e-olsi-rames-ne-dosjen-xibraka/",
      "https://www.pp.gov.al/Media/Njoftime_per_Shtyp/Prokuroria_per_Krime_te_Renda_dergon_per_gjykim_dosjen_Xibraka.html"
    ]
  },
  "vdekja-ardit-gjoklaj": {
    "title": "The death of Ardit Gjoklaj at the Sharrë landfill (7 August 2016)",
    "period": "August 2016 to June 2023 (the event: 7 August 2016; court proceedings: 2016–2018 and later; vetting review reopened: 2023)",
    "teaser": "The 17-year-old died at the Sharrë landfill, where according to the media he worked without a contract; the charges were rejected by the court.",
    "redactedPhrase": "without a contract",
    "narrative": [
      "On 7 August 2016 Ardit Gjoklaj, aged 17, born in Tropojë and living in Tirana, was found dead at the Sharrë landfill (Tirana); he worked for the private company \"3R sh.p.k.\" (a subcontractor for sorting/recycling waste at the landfill, later renamed \"Alb Tech Plast\"). The media and the family denounced the employment as irregular (no proper contract, no safety measures), while the initial examination linked the death to injuries from one of the company's excavators. The prosecution initially charged several employees (the excavator operator, the shift supervisor and the technical director) with breaching workplace safety rules causing death; the Democratic Party also filed a criminal complaint against the mayor, Erion Veliaj (abuse of office, illegal employment and so on), a complaint that did not lead to his prosecution. On 17 April 2018 the Tirana court (decision no. 1170) acquitted the shift supervisor and convicted the excavator operator only of driving a vehicle without a licence (2 years in prison, considered served through pre-trial detention), finding that the forensic evidence (absence of traces of blood/tissue at the scene, the nature of the wounds) cast doubt on whether the death really occurred where the body was found or somewhere else, and criticising the prosecution itself for an \"incomplete and selective\" investigation. The prosecution appealed this ruling, seeking prison sentences for the defendants, while the investigation into the company's director remained suspended. In June 2023 the Independent Qualification Commission reopened the review of this file as part of the vetting of the prosecutor Julian Zonja, who had led the initial investigation, raising further questions about its quality. According to the most recent sources found (2023), there appears to have been no final criminal conviction for Gjoklaj's death, and its exact circumstances remain legally unresolved."
    ],
    "status": "Unfinished proceedings / no final justice: the initial charges were rejected by the Tirana court (April 2018), a ruling appealed by the prosecution; the investigation into the company's director remains suspended; in June 2023 the vetting commission reopened the review of the file during the vetting of the prosecutor Julian Zonja. No source was found confirming a final criminal conviction or an appeal ruling later than April 2018.",
    "claims": [
      {
        "claim": "Employed illegally (a minor, without a contract, without safety measures) by the company 3R sh.p.k.",
        "note": "The company name '3R sh.p.k.' (later 'Alb Tech Plast') is confirmed by several sources. The claims of employment without a contract/without safety measures are repeated in the media and were included in the Democratic Party's criminal complaint against Veliaj (article 170/a), but no court ruling was found that officially confirms the exact conditions of Gjoklaj's employment specifically."
      },
      {
        "claim": "He was found dead among the waste with severe wounds from heavy machinery (an excavator)",
        "note": "The initial reports (2016) and the family said that the body had been 'mangled by the excavator'; but the ruling of the Tirana court (April 2018) found forensic evidence (absence of blood/tissue at the scene, the nature of the wounds) that cast doubt on whether the injuries really came from the excavator at that location, leaving open the possibility that the death occurred somewhere else. So the exact mechanism of death remains contested/legally unresolved, not an established fact."
      },
      {
        "claim": "There has still been no justice in the case",
        "note": "Up to the most recent source found (June 2023), there is no final conviction; the main charges were rejected at first instance (2018), the prosecution's appeal was not found to have been concluded in the available sources, and the Independent Qualification Commission reopened the review of the file in 2023, raising questions about the quality of the investigation."
      }
    ],
    "confidence": "medium",
    "sources": [
      "https://www.reporter.al/2018/05/17/vdekja-e-ardit-gjoklajt-gjykata-akuza-prokurorise-per-hetime-selektive/",
      "https://shqiptarja.com/lajm/vendimi-i-gjykates-ardit-gjoklaj-mund-te-jete-vrare-jashte-landfillit-te-sharres-ja-dyshimet",
      "https://abcnews.al/vendimi-i-gjykates-ardit-gjoklaj-mund-te-jete-vrare-jashte-landfillit/",
      "https://www.balkanweb.com/vdekja-e-17-vjecarit-ne-landfillin-e-sharres-pd-kallezon-veliajn/",
      "https://dritare.net/vdekja-e-ardit-gjoklajt-ne-sharre-apeli-le-ne-burg-pergjegjesin-e-turnit/",
      "https://droni.al/2019/08/07/3-vjet-nga-vrasja-e-ardit-gjoklajt-zhupa-veliaj-shpetoi-dhe-pasuroi-me-taksat-tona-fusha-sh-p-k/",
      "https://droni.al/2019/10/21/dokumenti-rilicensohet-kompania-ku-u-vra-ardit-gjoklaj-pd-denoncon-klosin-i-dha-leje-edurim-teqjas/",
      "https://droni.al/2021/08/07/5-vjet-nga-vrasja-e-ardit-gjoklajt-ina-zhupa-mos-flisni-per-reforme-ne-drejtesi-kur-vrasesi-i-arditit-eshte-i-lire/",
      "https://boldnews.al/2023/06/19/hetimet-per-vdekjen-e-ardit-gjoklajt-rihapin-vetingun-e-prokurorit-julian-zonja/",
      "https://www.panorama.com.al/vdekja-e-ardit-gjoklajt-ne-sharre-prokuroria-kunder-gjykates-burg-per-dy-te-akuzuarit/"
    ]
  },
  "vrasja-klodian-rasha": {
    "title": "The killing of Klodian Rasha by the police officer Nevaldo Hajdaraj (8 December 2020)",
    "period": "8 December 2020 to 3 July 2025 (court proceedings closed)",
    "teaser": "The police officer who killed the 25-year-old as he ran away was convicted by a final ruling and sentenced to 12 years in prison.",
    "redactedPhrase": "12 years in prison",
    "narrative": [
      "On the night of 8 December 2020, on \"Dritan Hoxha\" street in Laprakë, Tirana, during the anti-COVID restrictions, an officer of the police special unit \"Shqiponjat\" (the Eagles), Nevaldo Hajdaraj, shot and killed 25-year-old Klodian Rasha, who was running away after failing to stop when called by the police; according to video evidence, the young man was hit as he was fleeing, suffering wounds to the shoulder and the head. A few hours after the incident a pistol was found around 100–200 metres from the scene, which according to the forensic examination did not belong to Rasha (it bore none of his fingerprints or DNA); this element raised suspicions of an attempt to present the case as self-defence and contributed to the prosecution changing the initial charge (exceeding the limits of necessary self-defence) to \"intentional homicide\". No sources were found reporting that any colleague of Hajdaraj was formally charged or convicted of concealing/tampering with evidence in connection with the gun found; a colleague present that night was temporarily suspended and then reinstated, with no criminal investigation against him confirmed. On 14 July 2021 the Tirana court convicted Hajdaraj of intentional homicide and sentenced him to 15 years in prison, a sentence that, thanks to the abbreviated trial (a 1/3 reduction), was in practice applied as 10 years. The Court of Appeal later increased the base sentence to 18 years (around March 2022), which with the same 1/3 reduction became an effective 12 years in prison. On 3 July 2025 the Supreme Court rejected both Hajdaraj's appeal and that of the prosecution, definitively upholding the 12-year prison sentence. The incident sparked large protests in several cities and led to the resignation of the interior minister, Sandër Lleshaj, on 10 December 2020."
    ],
    "status": "Court proceedings closed with a final ruling: Nevaldo Hajdaraj has been convicted by a final ruling (Supreme Court, July 2025) and sentenced to 12 years in prison for intentional homicide. No other person (a fellow officer) appears to have been publicly charged over the alleged cover-up/tampering with evidence.",
    "claims": [
      {
        "claim": "The 25-year-old was shot in the back with two bullets by Nevaldo Hajdaraj, an officer of the \"Shqiponjat\" (Eagles) unit, in Laprakë during the anti-COVID restrictions",
        "note": "The date, location, unit and context (the COVID restrictions) are confirmed by numerous sources (the Albanian and English Wikipedia, euronews.al). The video evidence and the number of two bullets are confirmed; he was shot as he was running away. According to a direct quotation from the Albanian Wikipedia, the wounds were \"one in the shoulder and one in the head\", not in the back as the claim literally says; the specific location of the wounds does not exactly match this description, although it remains consistent with the fact that he was hit while fleeing."
      },
      {
        "claim": "He was sentenced to 10 years in prison, reduced to about 6.7 years with the 1/3 reduction of the abbreviated trial",
        "note": "The actual sequence, according to abcnews.al and Wikipedia (English, citing Reuters/Euronews/Top Channel): the Tirana court (14 July 2021) gave a base of 15 years → 10 years effective after the 1/3 reduction. The Court of Appeal (around March 2022) INCREASED the base to 18 years → 12 years effective after the same reduction. The Supreme Court (3 July 2025) definitively upheld the 12-year sentence. So the \"10 years\" figure was only the first-instance ruling (not final) and was not reduced further to 6.7 years; on the contrary, the final sentence was increased to 12 years."
      },
      {
        "claim": "There was an attempt to cover up the crime by planting another gun at the scene",
        "note": "The finding of a pistol about 100–200 metres from the scene that turned out not to be Rasha's (with none of his fingerprints/DNA) is confirmed, a fact reported by euronews.al and included in the Wikipedia timeline. This raised suspicions of fabricated evidence to justify self-defence, but no source found confirms that it was officially established (e.g. by a criminal charge) who placed the gun there or that it was part of an organised \"cover-up\"; it remains a journalistic suspicion/interpretation, not a fact proven in court."
      },
      {
        "claim": "The colleagues involved in the cover-up have not been touched/convicted",
        "note": "No source was found reporting a criminal charge or conviction against any colleague of Hajdaraj for covering up the crime. It was found only that a colleague who was present was briefly suspended after the incident and reinstated after the investigation found no prior connection between Hajdaraj and the victim (a separate matter from that of the gun). The absence of reports of colleagues being prosecuted does not prove the claim itself, but it is consistent with it; it is considered unconfirmed in the absence of further sources."
      }
    ],
    "confidence": "medium",
    "sources": [
      "https://en.wikipedia.org/wiki/Murder_of_Klodian_Rasha",
      "https://sq.wikipedia.org/wiki/Klodian_Rasha",
      "https://euronews.al/prokuroria-kerkon-20-vite-burg-per-nevaldo-hajdaraj-denimi-jepet-pas-dy-javesh/",
      "https://euronews.al/vrasja-e-klodian-rashes-gjykim-i-shkurtuar-per-ish-efektivin-nevaldo-hajdarajn/",
      "https://euronews.al/polici-nevaldo-hajdaraj-kerkon-gjykim-te-shkurtuar-per-vrasjen-e-klodian-rashes/",
      "https://euronews.al/pistoleta-nuk-ishte-e-klodjan-rashes-nevaldo-hajdaraj-akuzohet-per-vrasje-me-dashje/",
      "https://euronews.al/hetimet-per-klodian-rashen-vijojne-nuk-kishte-njohje-me-efektivin-rikthehet-ne-detyre-kolegu-i-hajdarajt/",
      "https://abcnews.al/vrasja-e-klodian-rashes-gjykata-denon-me-15-vite-burg-nevaldo-hajdaraj-perfiton-nga-gjykimi-i-shkurtuar/",
      "https://abcnews.al/12-vite-burg-per-nevaldo-hajdarajn-babai-i-klodian-rashes-jam-perballe-nje-padrejtesie/",
      "https://abcnews.al/vrau-klodian-rashen-gjykata-e-larte-rrezon-rekursin-e-nevaldo-hajdaraj-mbetet-ne-fuqi-denimi-me-12-vjet-burg/",
      "https://citizens.al/2020/12/09/drejtesi-per-klodianin-tirana-perfshihet-nga-protestat-pas-vrasjes-se-te-riut-nga-policia/",
      "https://citizens.al/2020/12/21/policia-shkeli-te-drejtat-e-njeriut-gjate-shoqerimeve-ne-protestat-per-vrasjen-e-klodian-rashes/",
      "https://euronews.al/gazetari-i-euronews-albania-tregon-detajet-nga-pamjet-filmike-te-nates-kur-u-vra-klodian-rasha/"
    ]
  },
  "hidrocentrali-skavices": {
    "title": "The Skavica hydropower plant: the contract with Bechtel without an open tender",
    "teaser": "A special law handed the contract for the giant hydropower plant to the US company Bechtel without any open tender.",
    "redactedPhrase": "without any open tender",
    "narrative": [
      "In July 2021 the Albanian Power Corporation signed the Phase 1 contract for the Skavica hydropower plant (around 210 MW) on the Black Drin river, in Dibër district, with the US company Bechtel Infrastructure. The contract was made possible by special law no. 38/2021 passed by the Albanian parliament, which named Bechtel directly and established a \"special negotiation procedure\", eliminating open competitive tendering; this is confirmed by the official website of the Ministry of Infrastructure and Energy and by the international organisation CEE Bankwatch Network, which compares this method with the one later used for the National Theatre (a law declared unconstitutional in that case by the Constitutional Court). The initial cost estimate (Sogreah study, 2011) was around 662–664 million euros/dollars, while according to an Ernst & Young report cited by the environmental organisation \"Stop Skavica\", the cost had reached around €1.3 billion by 2024. According to municipal data and satellite analyses cited by Bankwatch, the project would flood around 35 villages and isolate over 100 others, affecting around 20,000 residents and up to 2,636 houses in the Dibër valley. Three organisations, including the Albanian Helsinki Committee, challenged law no. 38/2021 before the Constitutional Court; in January 2024 the Court ruled that parliament and the Council of Ministers had not guaranteed public participation and the right to environmental information when the law was approved, but it did not strike down the law, leaving the contract in force. The area lies in the same region where the devastating earthquake of 30 November 1967 occurred (magnitude about 6.6, epicentre in the village of Prodan, Dibër), although no source explicitly links the location of the dam to that specific epicentre; residents have expressed a documented concern (according to Bankwatch) about the risk of earthquakes induced by filling the reservoir. The project's official documents mention difficulties in managing the cascade of dams during heavy rainfall, but not a risk of chain damage to the downstream dams of Fierzë, Koman and Vau i Dejës. To date no information has been found about any criminal investigation by the Special Prosecution Office against Corruption and Organised Crime into this contract; the opposition to it remains mainly in the form of legal and constitutional battles and civic protests."
    ],
    "status": "The contract and the special law remain in force after the Constitutional Court's ruling (January 2024); there is no publicly known criminal investigation by the special prosecution office; active legal and civic opposition continues (court proceedings/protests)",
    "claims": [
      {
        "claim": "The government signed the contract with Bechtel without any tendering procedure",
        "note": "Confirmed by the official website of the Ministry of Infrastructure (infrastruktura.gov.al) and by CEE Bankwatch Network: special law no. 38/2021 named Bechtel directly and created a 'special negotiation procedure', eliminating open competitive procurement/tendering. The Phase 1 contract was signed on 5 July 2021 between the Albanian Power Corporation and Bechtel Infrastructure."
      },
      {
        "claim": "A seismically active area near the epicentre of the devastating 1967 earthquake",
        "note": "The 1967 earthquake itself (magnitude about 6.6, 30 November 1967, epicentre the village of Prodan, Dibër) is confirmed by historical sources (the Albanian Wikipedia, Shqipopedia, Dosja.al) and occurred in the same region (Dibër) as the Skavica project. However, no source found during the research states explicitly that the specific location of the dam is 'near' that epicentre. There is another concern, documented by Bankwatch: local residents express fear of 'triggering earthquakes' by filling the reservoir (reservoir-induced seismicity), a technically different matter from proximity to the 1967 epicentre."
      },
      {
        "claim": "A risk of a domino chain reaction in the downstream dams (Fierzë, Koman, Vau i Dejës) in the event of damage",
        "note": "No source (journalism, NGO, official document) making this specific claim was found during the research. The feasibility study document (Western Balkans Investment Framework) mentions only operational difficulties in managing the Fierzë-Koman-Vau i Dejës cascade during heavy rainfall (an operational flood risk), not a scenario of chain damage/collapse of the dams. This part of the claim should be treated as unverified."
      }
    ],
    "verificationNotes": "citizens.al writes explicitly: \"The contract for the preliminary works was awarded to the US company Bechtel in July 2021, without any tendering procedure\", fully matching the claim. The same source confirms that this was followed by special law no. 38/2021, which named the company directly through a \"special negotiation procedure\".",
    "confidence": "medium",
    "sources": [
      "https://www.infrastruktura.gov.al/hec-skavica-nenshkruhet-kontrata-e-fazes-1-mes-kesh-dhe-bechtel/",
      "https://bankwatch.org/project/skavica-hydropower-plant-albania",
      "https://citizens.al/2024/01/30/gjykata-kushtetuese-qeveria-nuk-u-konsultua-me-publikun-per-projektin-skavica/",
      "https://citizens.al/2023/12/12/skavica-ne-gjykaten-kushtetuese/",
      "https://citizens.al/2022/04/19/skavica-hidrocentrali-qe-fundos-nen-uje-dibren/",
      "https://stopskavica.org/skavica-dam-a-billion-euro-burden-disguised-as-progress/",
      "https://opencorporates.al/documents/dokumenta/1730471544ligj%20nr.%2038%2C%20dt.%2028.1.2021.pdf",
      "https://startnews.al/2023/02/04/skavica-pikepyetjet-e-nje-hidrocentrali/",
      "https://sq.wikipedia.org/wiki/Tërmeti_në_Dibër_dhe_Librazhd",
      "https://wbif.eu/technicalassistancegrants/WB17-ALB-ENE-03"
    ]
  }
};

function mergeEnglish(base: Scandal): Scandal {
  const text = scandalsEnText[base.id];
  const problems: string[] = [];
  if (!text) {
    problems.push("no English text");
  } else {
    if (text.claims.length !== base.claims.length) problems.push("claims count differs");
    if (text.narrative.length !== base.narrative.length) problems.push("narrative paragraphs differ");
    if (text.sources.length !== base.sources.length) problems.push("sources count differs");
    if ((text.period === undefined) !== (base.period === undefined)) problems.push("period present in one language only");
    if ((text.verificationNotes === undefined) !== (base.verificationNotes === undefined))
      problems.push("verification notes present in one language only");
    if (!text.teaser.includes(text.redactedPhrase)) problems.push("redacted phrase not found in the teaser");
  }
  if (problems.length > 0 || !text) {
    throw new Error(`data/scandals-en.ts is out of step with data/scandals.ts for "${base.id}": ${problems.join("; ")}`);
  }
  return {
    ...base,
    ...text,
    claims: base.claims.map((claim, i) => ({ ...claim, ...text.claims[i] })),
  };
}

const unknownIds = Object.keys(scandalsEnText).filter((id) => !scandals.some((s) => s.id === id));
if (unknownIds.length > 0) {
  throw new Error(`data/scandals-en.ts has case files that data/scandals.ts lacks: ${unknownIds.join(", ")}`);
}

const scandalsEn: Scandal[] = scandals.map(mergeEnglish);

/** The case files in the page's language: Albanian is the original, English the translation. */
export function scandalsFor(locale: Locale): Scandal[] {
  return locale === "en" ? scandalsEn : scandals;
}
