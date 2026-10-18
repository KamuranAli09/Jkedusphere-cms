// Polity notes. To edit: change the text inside source below, then redeploy.
// Format: "@unit Title" starts a group. "## Topic title {#anchor-id}" starts a topic (the anchor is the link: /polity#anchor-id).
// Also: ### and #### subheadings, "- " bullets, "1. " lists, | tables |, > quotes, **bold**, *italic*, ==highlight==, [text](url).
// Boxes: a line ":::tip" (or key, jk, mem, new, note), optional title after it, text, then ":::" on its own line.
// Do not use backticks or dollar-brace in the text.
import type { Subject } from './notes';

export const POLITY: Subject = {
  slug: 'polity',
  short: 'Polity',
  h1: 'Indian Polity Notes',
  title: 'Indian Polity Notes for JKPSC, JKSSB and UPSC | JKEdusphere',
  description: 'Free topic-wise Indian Polity notes with a J&K corner: Constitution, Fundamental Rights, Parliament, Governor, Article 370, panchayats and more.',
  intro: 'Topic-wise notes for JKPSC, JKSSB, J&K Police and UPSC. Pick a topic from the list, or tap a heading to copy its link.',
  published: '2026-10-18',
  updated: '2026-10-18',
  source: String.raw`
@unit Foundations of the Constitution

## Historical Background {#historical-background}

Many ideas in our Constitution did not appear overnight. A Governor-General, a federal structure, provincial autonomy, public service commissions, even the three lists of powers all grew out of British-era laws. Read the Acts in order and remember the one new idea each of them added.

### From the Company to the Crown (1773 to 1858)

| Act | What it did |
|---|---|
| **Regulating Act, 1773** | First step by the British Parliament to control the East India Company. Governor of Bengal became ==Governor-General of Bengal== (Warren Hastings the first). Executive Council of four. Supreme Court at Calcutta (1774). Company servants barred from private trade. |
| **Pitt's India Act, 1784** | Dual control: Court of Directors for trade and a ==Board of Control== for political affairs. Company territories were called "British possessions in India". |
| **Charter Act, 1813** | Ended the Company's trade monopoly (except tea and the China trade). ₹1 lakh a year for education. Christian missionaries allowed. |
| **Charter Act, 1833** | Governor-General of Bengal became ==Governor-General of India== (Lord William Bentinck the first). Law member added (Macaulay). Company stopped being a trading body. |
| **Charter Act, 1853** | Last Charter Act. Legislative and executive functions of the Governor-General's Council separated. Open competition for the civil service introduced. |
| **Government of India Act, 1858** | After the Revolt of 1857 the Company's rule ended and power passed to the ==Crown==. Governor-General became ==Viceroy== (Lord Canning the first). Secretary of State for India with a Council of 15 members. |

### Slow opening of the councils (1861 to 1919)

| Act | What it did |
|---|---|
| **Indian Councils Act, 1861** | Portfolio system started. Indians were nominated to the Viceroy's Legislative Council for the first time. Legislative powers of Bombay and Madras restored. Viceroy got power to issue ordinances. |
| **Indian Councils Act, 1892** | More non-official members. Indirect election began (by nomination on recommendation). Members could discuss the budget and ask questions. |
| **Indian Councils Act, 1909 (Morley-Minto)** | ==Separate electorates for Muslims== (Lord Minto is called the father of communal electorate). Satyendra Prasad Sinha became the first Indian in the Viceroy's Executive Council. |
| **Government of India Act, 1919 (Montagu-Chelmsford)** | ==Dyarchy in the provinces==: Transferred subjects (education, health, local government, agriculture) under Indian ministers and Reserved subjects (law and order, finance, land revenue) under the Governor. Bicameral Central legislature. Direct elections on a large scale. Separate electorates extended to Sikhs, Indian Christians, Anglo-Indians and Europeans. Central and provincial budgets separated. |

### The road to 1935

- **1927:** Simon Commission, with no Indian member, was boycotted ("Simon, go back").
- **1928:** Nehru Report (Motilal Nehru), the first attempt by Indians to draft a constitution. It asked for Dominion Status and a list of rights.
- **1930 to 32:** Three Round Table Conferences in London.
- **1932:** Communal Award (Ramsay MacDonald) gave separate electorates to the depressed classes. Gandhi fasted and the Poona Pact (Gandhi and Ambedkar) gave them reserved seats in the general electorate instead.

### Government of India Act, 1935

The longest and most detailed Act so far, and the main source of our Constitution's administrative provisions.

- Proposed an ==All-India Federation== of provinces and princely states (it never came into being because the princes did not join).
- ==Provincial autonomy==: dyarchy ended in the provinces. Governors acted on the advice of ministers responsible to the legislature.
- Dyarchy introduced at the Centre (this part never started).
- Three lists: **Federal, Provincial and Concurrent**. Residuary powers with the Governor-General.
- Federal Court (1937), Reserve Bank of India (1935), Federal and Provincial Public Service Commissions.
- Burma separated from India (1937). Sind and Orissa created as new provinces.
- Franchise widened to about 10 per cent of the population.

### Towards independence (1940 to 1947)

- **1940:** August Offer. **1942:** Cripps Mission and Quit India Movement.
- **1946:** ==Cabinet Mission== (Pethick-Lawrence, Stafford Cripps, A.V. Alexander) proposed a Constituent Assembly and an interim government.
- **3 June 1947:** Mountbatten Plan (partition).
- **Indian Independence Act, 1947** (passed July 1947, in force 15 August 1947): created two independent dominions, India and Pakistan. The British Crown gave up control over the princely states, which could join either dominion. The Constituent Assemblies became the legislatures. The post of Secretary of State for India was abolished, and the 1935 Act continued as the interim constitution.

:::tip
Examiners love "first" questions: first Indian law member (Sinha, 1909), first Governor-General of India (Bentinck, 1833), first Viceroy (Canning, 1858), first Act to introduce dyarchy (1919), Act that created the Federal Court and RBI (1935).
:::

:::mem Memory trick
Charter Acts: **13, 33, 53** (trade ends, India-wide Governor-General, last Charter). Councils Acts: **61, 92, 09**. Then **1919** (dyarchy), **1935** (federation, autonomy), **1947** (independence).
:::

Read the full article: [Historical Background of the Indian Constitution (1773 to 1947)](/historical-background-of-indian-constitution-british-acts-1773-1947).

## Making of the Constitution {#making-of-constitution}

### Idea and formation of the Constituent Assembly

- **M.N. Roy** first suggested a Constituent Assembly in 1934. The Congress demanded it officially in 1935. The British accepted the idea in principle in the August Offer (1940).
- The **Cabinet Mission Plan (1946)** gave it shape. Members were elected indirectly by the provincial assemblies, so it was not elected on adult franchise.
- Strength: **389 members**. That was 296 from British India (292 from the provinces and 4 from chief commissioner provinces) and 93 from the princely states.
- In the elections of 1946 the Congress won 208 and the Muslim League 73 of the 296 seats. The Muslim League boycotted the Assembly.
- After Partition, strength fell to **299** (229 from provinces and 70 from princely states).
- 15 women were members, among them Sarojini Naidu, Hansa Mehta, Durgabai Deshmukh, Rajkumari Amrit Kaur, Sucheta Kripalani, Vijaya Lakshmi Pandit and Begum Aizaz Rasul.

### Key dates

| Date | Event |
|---|---|
| 9 Dec 1946 | First meeting. **Dr Sachchidananda Sinha** (oldest member) was temporary President. |
| 11 Dec 1946 | **Dr Rajendra Prasad** elected permanent President. H.C. Mukherjee became Vice-President. |
| 13 Dec 1946 | **Objectives Resolution** moved by Jawaharlal Nehru. Adopted on 22 Jan 1947. It became the base of the Preamble. |
| 22 Jul 1947 | National Flag adopted. |
| 29 Aug 1947 | **Drafting Committee** set up under **Dr B.R. Ambedkar**. |
| Feb 1948 | Draft Constitution published (315 Articles, 8 Schedules). |
| 26 Nov 1949 | Constitution **adopted** by the Assembly (now celebrated as Constitution Day or Samvidhan Divas). Some provisions came into force at once. |
| 24 Jan 1950 | 284 members signed the Constitution. Jana Gana Mana adopted as National Anthem. |
| 26 Jan 1950 | **Constitution came into force.** The date honours Purna Swaraj Day of 1930. |

The whole work took **2 years, 11 months and 18 days**, in 11 sessions. About 7,600 amendments were proposed to the draft and about 2,400 were actually discussed.

### The Drafting Committee (7 members)

B.R. Ambedkar (Chairman), N. Gopalaswami Ayyangar, Alladi Krishnaswamy Ayyar, K.M. Munshi, Syed Mohammad Saadullah, B.L. Mitter (later replaced by N. Madhava Rau) and D.P. Khaitan (died, replaced by T.T. Krishnamachari). **B.N. Rau** was the Constitutional Adviser and prepared the first draft.

### Other important committees

| Committee | Chairman |
|---|---|
| Union Powers Committee | Jawaharlal Nehru |
| Union Constitution Committee | Jawaharlal Nehru |
| Provincial Constitution Committee | Sardar Vallabhbhai Patel |
| Advisory Committee on Fundamental Rights, Minorities and Tribal Areas | Sardar Vallabhbhai Patel |
| Rules of Procedure Committee | Dr Rajendra Prasad |
| States Committee | Jawaharlal Nehru |
| Ad hoc Committee on the National Flag | Dr Rajendra Prasad |

### What came into force on 26 November 1949

Articles on citizenship, elections, the provisional Parliament and some temporary provisions: **Arts 5, 6, 7, 8, 9, 60, 324, 366, 367, 379, 380, 388, 391, 392 and 393**. The rest began on 26 January 1950.

The Assembly also worked as the **Provisional Parliament** until the first general election of 1951-52. G.V. Mavalankar was its Speaker and later the first Speaker of the Lok Sabha.

### Size of the Constitution

| | Original (1950) | Now |
|---|---|---|
| Articles | 395 | about 448 |
| Parts | 22 | 25 |
| Schedules | 8 | 12 |

Four Parts have been added (IVA, IXA, IXB, XIVA) and Part VII was repealed. That makes 22 + 4 - 1 = 25.

:::key Fun facts
- The original copies were handwritten in italic calligraphy by **Prem Behari Narain Raizada** and decorated by artists of Shantiniketan led by **Nandalal Bose**.
- Ambedkar called Art 32 "the very soul of the Constitution". In the Assembly he also said the Constitution was a document for both peace time and war time.
:::

:::jk J&K corner
J&K was represented in the Constituent Assembly by four members who joined in June 1949: **Sheikh Mohammad Abdullah, Mirza Mohammad Afzal Beg, Maulana Mohammad Sayeed Masoodi and Moti Ram Baigra**. The state then had its own Constituent Assembly (1951-57) that framed the J&K Constitution.
:::

Read the full article: [Making of the Indian Constitution: Constituent Assembly, Committees and Drafting Process](/making-of-the-indian-constitution-constituent-assembly-committees-and).

## Salient Features and Sources {#salient-features}

### Main features

1. **Lengthiest written constitution** in the world.
2. **Borrowed from many sources**, but adapted to Indian needs.
3. **Blend of rigidity and flexibility.** Some parts can be amended by a simple majority, some by a special majority, and some also need approval of half of the states.
4. **Federal system with a unitary bias.** Art 1 calls India a "Union of States". Ambedkar called it an "indestructible Union of destructible States". Single citizenship, an integrated judiciary, all-India services, emergency powers and a Governor appointed by the Centre pull towards the Centre.
5. **Parliamentary form of government** at both Centre and States. The real executive is the Council of Ministers, which is collectively responsible to the lower house.
6. **Synthesis of parliamentary sovereignty and judicial supremacy.** Courts can test laws against the Constitution (judicial review), but Parliament can amend the Constitution.
7. **Fundamental Rights (Part III), Directive Principles (Part IV) and Fundamental Duties (Part IVA).**
8. **Independent and integrated judiciary** with the Supreme Court at the top.
9. **Secular state.** No official religion, and equal respect for all faiths.
10. **Universal adult franchise** from age 18 (61st Amendment, 1988).
11. **Single citizenship.** There is no separate state citizenship.
12. **Independent bodies** such as the Election Commission, CAG, UPSC and Finance Commission.
13. **Emergency provisions** (national, state and financial).
14. **Three-tier government** after the 73rd and 74th Amendments (Panchayats and Municipalities).
15. **Cooperative societies** got constitutional status through the 97th Amendment (2011).

### Sources of the Constitution

| Source | Features borrowed |
|---|---|
| **Government of India Act, 1935** | Federal scheme, Governor's office, judiciary, public service commissions, emergency provisions, administrative details |
| **United Kingdom** | Parliamentary government, rule of law, single citizenship, cabinet system, prerogative writs, bicameralism, law-making procedure, Speaker |
| **United States** | Fundamental Rights, independence of judiciary, judicial review, impeachment of the President, removal of Supreme Court and High Court judges, post of Vice-President |
| **Ireland** | Directive Principles, nomination of Rajya Sabha members, method of electing the President |
| **Canada** | Federation with a strong Centre, residuary powers with the Centre, appointment of Governors by the Centre, advisory jurisdiction of the Supreme Court |
| **Australia** | Concurrent List, freedom of trade and commerce, joint sitting of the two houses |
| **Germany (Weimar)** | Suspension of Fundamental Rights during an Emergency |
| **USSR** | Fundamental Duties, ideal of justice (social, economic, political) in the Preamble |
| **France** | Republic, ideals of liberty, equality and fraternity |
| **South Africa** | Procedure for amending the Constitution, election of Rajya Sabha members |
| **Japan** | "Procedure established by law" (Art 21) |

:::tip
A common trap: the idea of the **Preamble** (We, the People) comes from the USA, the **language** of the Preamble from Australia, the **ideals** from France, and the **ideal of justice** from the USSR. Also remember that India's "Directive Principles" come from **Ireland**, not the UK.
:::

Read the full article: [Salient Features of the Indian Constitution](/salient-features-of-indian-constitution-key-characteristics-and-sources).

## The Preamble {#preamble}

### Text

> We, the people of India, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; in our Constituent Assembly this twenty-sixth day of November, 1949, do hereby adopt, enact and give to ourselves this Constitution.

### Source and nature

- Based on the **Objectives Resolution** drafted by Nehru and adopted in 1947.
- It is the *introduction* to the Constitution. It is **not enforceable** in court and is **not a source of power** or a limit on power.
- It tells us the source of authority ("We, the people"), the nature of the State, the objectives, and the date of adoption.
- K.M. Munshi called it the "horoscope of our Sovereign Democratic Republic". Ernest Barker called it the "key-note of the Constitution". Thakur Das Bhargava called it the "soul of the Constitution".

### Key words

| Word | Meaning |
|---|---|
| **Sovereign** | India is free from external control and decides its internal and foreign affairs itself. |
| **Socialist** | Added by the **42nd Amendment (1976)**. It means democratic socialism, which aims to end poverty, ignorance, disease and inequality of opportunity. |
| **Secular** | Added by the 42nd Amendment. The State has no religion and treats all religions equally (Arts 25 to 28). |
| **Democratic** | Government gets its authority from the people. Includes political, social and economic democracy. |
| **Republic** | The head of State (President) is elected and not hereditary. |
| **Justice** | Social, economic and political. |
| **Liberty** | Of thought, expression, belief, faith and worship. |
| **Equality** | Of status and of opportunity. |
| **Fraternity** | Assures the dignity of the individual and, after the 42nd Amendment, the "unity and integrity of the Nation". |

### Is the Preamble part of the Constitution?

| Case | Year | Held |
|---|---|---|
| **In re Berubari Union** | 1960 | Preamble is **not** a part of the Constitution. |
| **Kesavananda Bharati** | 1973 | Preamble **is** part of the Constitution. It can be amended, but the basic features cannot be destroyed. |
| **LIC of India case** | 1995 | Preamble is an **integral part** of the Constitution. |

The Preamble has been amended **only once**, by the 42nd Amendment (1976), which added "socialist", "secular" and "integrity".

:::tip
Question to expect: "Which words were added by the 42nd Amendment?" Answer: Socialist, Secular, Integrity.
:::

Read the full article: [Preamble of the Indian Constitution: Meaning, Keywords, Amendments and Important Cases](/preamble-of-the-indian-constitution-meaning-keywords-amendments-and).

## The Union and its Territory {#union-and-territory}

### Articles 1 to 4 (Part I)

- **Art 1:** "India, that is Bharat, shall be a Union of States." The territory of India includes States, Union Territories and any territory acquired later.
- **Art 2:** Parliament may admit or establish **new States** (for example Sikkim in 1975).
- **Art 3:** Parliament may form a new State from an existing one, merge States, change boundaries, or change names.
- **Art 4:** Laws under Arts 2 and 3 are **not constitutional amendments** under Art 368. A simple majority is enough.

### Procedure under Art 3

1. A Bill can be introduced only on the **President's recommendation**.
2. The President refers it to the **State Legislature** concerned for its views. These views are **not binding**.
3. Parliament passes it by a **simple majority**.

:::key Berubari case
In the **Berubari Union case (1960)** the Supreme Court held that Parliament cannot give away Indian territory under Art 3. A **constitutional amendment (Art 368)** is needed. The 9th Amendment (1960) and the 100th Amendment (2015, land boundary agreement with Bangladesh) followed from this.
:::

### Reorganisation of States

- **Dhar Commission (1948):** rejected language as the basis. **JVP Committee (1948):** (Jawaharlal, Vallabhbhai, Pattabhi Sitaramayya) also advised against it.
- After Potti Sriramulu's death in a fast (1952), **Andhra State** was formed (1953), the first linguistic state.
- **States Reorganisation Commission (1953)** under Fazl Ali, with K.M. Panikkar and H.N. Kunzru as members. It accepted language with safeguards.
- **States Reorganisation Act, 1956** and the **7th Amendment** created 14 States and 6 Union Territories and ended the old A, B, C and D categories.

### Later States

| Year | State |
|---|---|
| 1960 | Maharashtra and Gujarat (from Bombay) |
| 1963 | Nagaland (13th Amendment) |
| 1966 | Haryana (from Punjab) |
| 1971 | Himachal Pradesh |
| 1972 | Manipur, Meghalaya, Tripura |
| 1975 | Sikkim (22nd State, 36th Amendment) |
| 1987 | Mizoram, Arunachal Pradesh, Goa |
| 2000 | Chhattisgarh, Uttarakhand, Jharkhand |
| 2014 | **Telangana** (29th State) |

### Present position

India has **28 States and 8 Union Territories**. The J&K Reorganisation Act, 2019 turned the State of J&K into two Union Territories from **31 October 2019**: J&K (with a legislature) and Ladakh (without one). In 2020 Dadra and Nagar Haveli and Daman and Diu were merged into one UT, which brought the number of UTs to 8.

**Union Territories:** Andaman and Nicobar Islands, Chandigarh, Dadra and Nagar Haveli and Daman and Diu, Delhi, **Jammu and Kashmir**, **Ladakh**, Lakshadweep, Puducherry.

## Citizenship {#citizenship}

### Constitutional provisions (Part II, Arts 5 to 11)

| Article | Provision |
|---|---|
| **5** | Citizens at the commencement (26 Jan 1950): domiciled in India and born here, or a parent born here, or ordinarily resident for 5 years. |
| **6** | Persons who migrated from Pakistan to India. |
| **7** | Persons who migrated to Pakistan after 1 March 1947 but came back. |
| **8** | Persons of Indian origin living abroad. |
| **9** | Person voluntarily acquiring foreign citizenship **cannot** be an Indian citizen. |
| **10** | Continuance of citizenship. |
| **11** | **Parliament** can make laws on citizenship. |

India has **single citizenship**. A person is a citizen of India, not of a State.

### Citizenship Act, 1955: how it is acquired

1. **By birth.** Born in India on or after 26 Jan 1950 but before 1 July 1987: a citizen. From 1 July 1987 to 2 Dec 2004: if either parent was a citizen at the time of birth. From **3 Dec 2004:** both parents citizens, or one parent a citizen and the other not an illegal migrant.
2. **By descent.** Born outside India, with a citizen parent (registered at an Indian consulate).
3. **By registration.** Persons of Indian origin, spouses of citizens and others, as laid down in the Act.
4. **By naturalisation.** Long residence: 11 years out of the last 14 years (and 12 months immediately before applying). The 2019 amendment reduced this to **5 years** for the groups named below.
5. **By incorporation of territory.** For example Goa (1961), Puducherry (1962) and Sikkim (1975).

### How it is lost

- **Renunciation:** voluntarily, by declaration.
- **Termination:** automatically when a person voluntarily acquires another country's citizenship.
- **Deprivation:** by the Government, for example if citizenship was obtained by fraud.

### Citizenship (Amendment) Act, 2019

Gives a path to citizenship to Hindus, Sikhs, Buddhists, Jains, Parsis and Christians from **Afghanistan, Bangladesh and Pakistan** who entered India on or before **31 December 2014**. It reduces the required residence from 11 years to 5 years for them. It does not apply to Sixth Schedule tribal areas of Assam, Meghalaya, Mizoram and Tripura, or to areas under the Inner Line Permit. The Rules were notified in March 2024.

### Overseas Citizen of India (OCI)

Introduced by the 2005 amendment (the PIO and OCI categories were merged in 2015). An OCI gets a life-long visa and several economic benefits but is **not a citizen**. An OCI cannot vote or hold constitutional offices.

:::jk J&K corner
Until August 2019 **Article 35A** allowed the State legislature to define "permanent residents" (State Subjects) and give them special rights in jobs, land and scholarships. Article 35A and Art 370 were removed in 2019. Since 2020, a **domicile certificate** is issued under the J&K Grant of Domicile Certificate Rules (generally on 15 years of residence, or 7 years of study with Class 10 or 12 examination in J&K, and certain other categories). See the J&K units for details.
:::

## Parts, Schedules and Languages at a Glance {#parts-schedules}

### The 12 Schedules

| Schedule | Subject |
|---|---|
| **1st** | Names and territories of States and Union Territories |
| **2nd** | Salaries and allowances of the President, Governors, Speakers, judges, CAG |
| **3rd** | Forms of oaths and affirmations |
| **4th** | Allocation of Rajya Sabha seats |
| **5th** | Administration of Scheduled Areas and Scheduled Tribes |
| **6th** | Administration of tribal areas in Assam, Meghalaya, Tripura and Mizoram |
| **7th** | Union, State and Concurrent Lists |
| **8th** | Recognised languages (22) |
| **9th** | Laws protected from challenge (added by the 1st Amendment, land reforms) |
| **10th** | Anti-defection law (52nd Amendment, 1985) |
| **11th** | Powers of Panchayats, 29 subjects (73rd Amendment) |
| **12th** | Powers of Municipalities, 18 subjects (74th Amendment) |

### Important Parts

| Part | Subject | Articles |
|---|---|---|
| I | The Union and its territory | 1 to 4 |
| II | Citizenship | 5 to 11 |
| III | Fundamental Rights | 12 to 35 |
| IV | Directive Principles | 36 to 51 |
| IVA | Fundamental Duties | 51A |
| V | The Union (President, Parliament, Supreme Court, CAG) | 52 to 151 |
| VI | The States (Governor, Legislature, High Courts) | 152 to 237 |
| VIII | Union Territories | 239 to 242 |
| IX | Panchayats | 243 to 243O |
| IXA | Municipalities | 243P to 243ZG |
| IXB | Co-operative societies | 243ZH to 243ZT |
| X | Scheduled and Tribal Areas | 244 to 244A |
| XI | Centre-State relations | 245 to 263 |
| XII | Finance, property, contracts | 264 to 300A |
| XIV | Services under the Union and States | 308 to 323 |
| XIVA | Tribunals | 323A to 323B |
| XV | Elections | 324 to 329A |
| XVII | Official language | 343 to 351 |
| XVIII | Emergency provisions | 352 to 360 |
| XX | Amendment of the Constitution | 368 |
| XXI | Temporary, transitional and special provisions | 369 to 392 |

### The 22 languages of the Eighth Schedule

Assamese, Bengali, **Bodo**, **Dogri**, Gujarati, Hindi, Kannada, **Kashmiri**, **Konkani**, **Maithili**, Malayalam, **Manipuri**, Marathi, **Nepali**, Odia, Punjabi, Sanskrit, **Santhali**, **Sindhi**, Tamil, Telugu, Urdu.

- Original: 14 languages.
- Sindhi added by the **21st Amendment (1967)**.
- Konkani, Manipuri and Nepali added by the **71st Amendment (1992)**.
- Bodo, Dogri, Maithili and Santhali added by the **92nd Amendment (2003)**.

:::jk J&K corner
Kashmiri and Dogri are both in the Eighth Schedule. Under the **J&K Official Languages Act, 2020**, the official languages of J&K are Urdu, Hindi, English, Kashmiri and Dogri.
:::

:::tip
Art 343 makes **Hindi in Devanagari script** the official language of the Union. Art 351 is the Directive to promote Hindi. Art 345 lets a State adopt its own official language.
:::

@unit Rights, Duties and Amendment

## Fundamental Rights {#fundamental-rights}

Part III (**Arts 12 to 35**) is called the Magna Carta of India. These rights are **justiciable**: if one is violated, you can go straight to the Supreme Court (Art 32) or a High Court (Art 226). They were borrowed from the US Bill of Rights. Ambedkar called Art 32 "the very soul of the Constitution".

### Art 12 and Art 13

- **Art 12:** "State" includes the Government and Parliament of India, the Government and Legislature of each State, and all local and other authorities within India or under the control of the Government of India.
- **Art 13:** Any law (including ordinances, bye-laws, rules, customs) that is inconsistent with or takes away a Fundamental Right is **void** to that extent. This is the basis of **judicial review**.
- **Doctrine of eclipse:** an old law that conflicts with a right is not dead but "eclipsed". It revives if the conflict is removed.
- **Doctrine of severability:** only the offending part of a law is struck down.
- Fundamental Rights **cannot be waived** by a citizen.

### The six groups

| Group | Articles |
|---|---|
| Right to Equality | 14 to 18 |
| Right to Freedom | 19 to 22 |
| Right against Exploitation | 23 to 24 |
| Right to Freedom of Religion | 25 to 28 |
| Cultural and Educational Rights | 29 to 30 |
| Right to Constitutional Remedies | 32 |

The **Right to Property** (old Art 31) was removed from this list by the **44th Amendment (1978)**. It is now only a legal right under **Art 300A** in Part XII.

### Right to Equality (Arts 14 to 18)

- **Art 14:** equality before law (British idea) and equal protection of the laws (American idea). Available to **all persons**. Reasonable classification is allowed if it has an intelligible differentia and a rational link to the aim. In *E.P. Royappa* (1974) the Court held that **arbitrariness** violates Art 14.
- **Art 15:** no discrimination on grounds of religion, race, caste, sex or place of birth. Special provisions allowed for women and children, for SEBCs/SCs/STs (15(4), added by the 1st Amendment, 1951), for admission to educational institutions (15(5), 93rd Amendment, 2005) and for economically weaker sections (15(6), 103rd Amendment, 2019).
- **Art 16:** equality of opportunity in public employment. No ineligibility on grounds of religion, race, caste, sex, descent, place of birth or residence. **16(3)** lets Parliament prescribe a residence requirement. **16(4)** allows reservation for backward classes not adequately represented. **16(4A)** promotions for SC/ST. **16(6)** EWS.
- **Art 17:** **abolition of untouchability.** Punishable under the Protection of Civil Rights Act, 1955 and the SC/ST (Prevention of Atrocities) Act, 1989.
- **Art 18:** abolition of titles. The State cannot confer titles except military and academic distinctions. Bharat Ratna and Padma awards are not "titles" (*Balaji Raghavan*, 1996).

### Right to Freedom (Arts 19 to 22)

**Art 19(1)** gives six freedoms to **citizens only**: (a) speech and expression, (b) assemble peaceably and without arms, (c) form associations, unions or co-operative societies, (d) move freely throughout India, (e) reside and settle in any part of India, (g) practise any profession or carry on any occupation, trade or business. Clause (f), the right to acquire property, was deleted in 1978. Reasonable restrictions are allowed by Art 19(2) to (6). Grounds for restricting speech: sovereignty and integrity of India, security of the State, friendly relations with foreign States, public order, decency or morality, contempt of court, defamation and incitement to an offence.

- **Art 20:** protection in respect of conviction: no ex post facto criminal law, no double jeopardy, no compulsion to be a witness against oneself.
- **Art 21:** "No person shall be deprived of his life or personal liberty except according to procedure established by law." In *A.K. Gopalan* (1950) this was read narrowly. In ==Maneka Gandhi (1978)== the Court held that the procedure must be **fair, just and reasonable**. This opened the door to many new rights: privacy (*Puttaswamy*, 2017), livelihood (*Olga Tellis*, 1985), speedy trial, free legal aid, dignity, a clean environment and health.
- **Art 21A:** free and compulsory education for children aged **6 to 14** (86th Amendment, 2002). The Right to Education Act came into force in April 2010.
- **Art 22:** rights of an arrested person: to be told the grounds, to consult a lawyer, and to be produced before a magistrate within **24 hours**. These do not apply to enemy aliens or to persons held under **preventive detention**. Preventive detention beyond **3 months** needs approval of an Advisory Board of High Court judges.

### Right against Exploitation (Arts 23 and 24)

- **Art 23:** prohibits traffic in human beings, *begar* and other forced labour. Works against private persons too.
- **Art 24:** no child below **14** to work in a factory, mine or any hazardous job.

### Freedom of Religion (Arts 25 to 28)

- **Art 25:** freedom of conscience and the right to profess, practise and propagate religion, subject to public order, morality and health.
- **Art 26:** freedom to manage religious affairs. **Art 27:** no one can be forced to pay taxes for promoting any religion. **Art 28:** no religious instruction in State-funded institutions.

### Cultural and Educational Rights (Arts 29 and 30)

- **Art 29:** any section of citizens with a distinct language, script or culture can conserve it. No denial of admission on grounds of religion, race, caste or language.
- **Art 30:** **minorities** (religious or linguistic) can establish and administer educational institutions of their choice.

### Right to Constitutional Remedies (Art 32)

The right to move the Supreme Court for enforcement of Fundamental Rights. The Supreme Court (Art 32) and High Courts (Art 226) can issue **writs**. Art 226 is wider because a High Court can also issue them for "any other purpose".

| Writ | Meaning | Use |
|---|---|---|
| **Habeas Corpus** | "to have the body" | Produce a person detained illegally. Can be issued against private persons too. |
| **Mandamus** | "we command" | Orders a public official to do a public duty. Not against the President, Governors or private persons. |
| **Prohibition** | "to forbid" | Higher court stops a lower court from exceeding jurisdiction. Issued **while the case is going on**. |
| **Certiorari** | "to be certified" | Quashes an order already passed by a lower court. Issued **after the order**. |
| **Quo Warranto** | "by what authority" | Challenges a person holding a public office without legal right. |

**Art 33:** Parliament can limit rights of the armed forces. **Art 34:** limits during martial law. **Art 35:** Only Parliament (not States) can make laws to give effect to certain Fundamental Rights.

### Who gets which right

| Only citizens | Citizens and non-citizens |
|---|---|
| Arts 15, 16, 19, 29, 30 | Arts 14, 20, 21, 21A, 22, 23, 24, 25 to 28, 32 |

### Reservation: key cases

- **Champakam Dorairajan (1951)** led to the first amendment adding Art 15(4).
- **Indra Sawhney (1992):** upheld 27 per cent OBC reservation, set the **50 per cent ceiling**, introduced the **creamy layer** for OBCs, and held that reservation applies at initial appointment.
- **Janhit Abhiyan (2022):** the Supreme Court (3:2) upheld the **10 per cent EWS quota** (103rd Amendment).
- **Maratha Reservation case (2021):** Maharashtra's quota was struck down for crossing the 50 per cent limit.

:::key During Emergency
**Art 358** automatically suspends Art 19 when an Emergency is declared on the ground of war or external aggression. **Art 359** allows the President to suspend enforcement of other rights, but **Arts 20 and 21 can never be suspended** (44th Amendment).
:::

:::jk J&K corner
- **Anuradha Bhasin v Union of India (2020):** the Supreme Court, hearing the J&K internet shutdown, held that freedom of speech and trade over the internet is protected by Art 19. Indefinite shutdown is not allowed and orders must be reasoned, proportionate and reviewable.
- The J&K **Public Safety Act, 1978** is the preventive detention law of the Union Territory.
:::

:::tip
Remember the pairs: Prohibition (during the case) and Certiorari (after the order). Art 20, 21 are available even in an Emergency. Art 19 is for citizens only.
:::

Read the full article: [Fundamental Rights in the Indian Constitution (Articles 12 to 35)](/fundamental-rights-in-indian-constitution-articles-12-35-cornerstones-of).

## Directive Principles of State Policy {#dpsp}

Part IV (**Arts 36 to 51**) lists goals that the State should follow while making laws and policies. The idea comes from the **Irish Constitution**. They are **non-justiciable**: a court cannot force the State to implement them (Art 37). Still, the Constitution calls them "fundamental in the governance of the country". Granville Austin called Fundamental Rights and Directive Principles "the conscience of the Constitution".

### Three types

| Type | Based on | Examples |
|---|---|---|
| **Socialistic** | Socialist ideas | Art 38 (social order and reduction of inequalities), 39 (equal livelihood, equal pay, no concentration of wealth), 39A (free legal aid), 41 (right to work, education, public assistance), 42 (just conditions of work, maternity relief), 43 (living wage), 43A (workers in management), 47 (nutrition, public health, prohibition) |
| **Gandhian** | Gandhian ideas | Art 40 (village panchayats), 43 (cottage industries), 43B (co-operative societies), 46 (SC, ST and weaker sections), 47 (prohibition), 48 (cow and cattle protection, modern agriculture) |
| **Liberal-intellectual** | Liberal ideas | Art 44 (Uniform Civil Code), 45 (early childhood care and education), 48A (environment), 49 (protection of monuments), 50 (separation of judiciary from executive), 51 (international peace) |

### Amendments to Part IV

- **42nd Amendment (1976):** added Arts 39A, 43A and 48A, and changed 39(f).
- **44th Amendment (1978):** added Art 38(2) on reducing inequalities of income, status and opportunities.
- **86th Amendment (2002):** changed Art 45 to early childhood care for children below 6 (education 6 to 14 became a Fundamental Right under Art 21A).
- **97th Amendment (2011):** added Art 43B (co-operative societies).

### Fundamental Rights versus Directive Principles

| Fundamental Rights | Directive Principles |
|---|---|
| Justiciable | Non-justiciable |
| Negative: restrict the State | Positive: direct the State to act |
| Political democracy | Social and economic democracy |
| Automatically enforceable | Need laws to be implemented |
| From the USA | From Ireland |

### Conflict between the two

- **Champakam Dorairajan (1951):** Fundamental Rights prevail.
- **Kesavananda Bharati (1973):** both are complementary.
- **Minerva Mills (1980):** harmony and balance between the two is part of the **basic structure**. Giving DPSPs total primacy over rights (42nd Amendment) was struck down.
- **Art 31C** (25th Amendment): laws made to implement Art 39(b) and (c) cannot be challenged for violating Arts 14 and 19.

### Directives outside Part IV

Art 335 (claims of SC/ST to services), Art 350A (mother tongue in primary education) and Art 351 (development of Hindi).

:::key Uniform Civil Code (Art 44)
Goa has had a common civil code since Portuguese times. **Uttarakhand** became the first State after Independence to pass a UCC law (2024). Related cases: *Shah Bano* (1985), *Sarla Mudgal* (1995), *Shayara Bano* (2017, triple talaq held unconstitutional).
:::

## Fundamental Duties {#fundamental-duties}

- Added by the **42nd Amendment (1976)** on the recommendation of the **Swaran Singh Committee**. Placed in **Part IVA, Art 51A**.
- Idea taken from the **USSR** Constitution.
- Originally **10** duties. The **86th Amendment (2002)** added the 11th.
- Duties apply to **citizens only** and are **non-justiciable**. No law directly punishes their breach, but some laws support them, for example the Prevention of Insults to National Honour Act, 1971.

### The 11 duties

It is the duty of every citizen to:

1. Abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem.
2. Cherish and follow the noble ideals that inspired the national struggle for freedom.
3. Uphold and protect the sovereignty, unity and integrity of India.
4. Defend the country and render national service when called upon.
5. Promote harmony and the spirit of common brotherhood, and renounce practices derogatory to the dignity of women.
6. Value and preserve the rich heritage of our composite culture.
7. Protect and improve the natural environment, including forests, lakes, rivers and wildlife, and have compassion for living creatures.
8. Develop scientific temper, humanism and the spirit of inquiry and reform.
9. Safeguard public property and abjure violence.
10. Strive towards excellence in all spheres of individual and collective activity.
11. A parent or guardian must provide opportunities for education to a child between the ages of **6 and 14**. (86th Amendment)

:::mem Memory trick
**10 + 1 = 11.** The 42nd Amendment gave 10, the 86th added the one about education. They sit in Part **IV-A**, Article **51A**. The **Verma Committee (1999)** worked on how to put them into practice.
:::

## Amendment of the Constitution and Basic Structure {#amendment-basic-structure}

### Procedure (Art 368, Part XX)

| Type | Used for | Required |
|---|---|---|
| **Simple majority** (outside Art 368) | New States and boundaries (Arts 2 to 4), Legislative Councils (Art 169), citizenship, delimitation, official language, Fifth and Sixth Schedules, salaries of MPs and others | Ordinary majority in each House |
| **Special majority** | Most provisions, including Fundamental Rights and Directive Principles | Majority of the **total membership** of each House **and** two-thirds of members **present and voting** |
| **Special majority and ratification** | Federal provisions: election of the President, executive and legislative powers of Centre and States, Supreme Court and High Courts, Seventh Schedule, representation of States in Parliament, Art 368 itself | Special majority **and** approval by **half of the State legislatures** |

- A Bill to amend the Constitution can be introduced **only in Parliament** (either House), not in State Legislatures. Prior permission of the President is not needed.
- There is **no joint sitting** for such a Bill.
- The President **must give assent** (24th Amendment, 1971).

### The long fight over the amending power

| Case | Year | Held |
|---|---|---|
| **Shankari Prasad** | 1951 | Parliament can amend any part, including Fundamental Rights. |
| **Sajjan Singh** | 1965 | Same view again. |
| **Golaknath** | 1967 | Parliament **cannot** amend Fundamental Rights. |
| **24th Amendment** | 1971 | Parliament's power to amend any part restored. |
| **Kesavananda Bharati** | 1973 | 13 judges, 7:6. Parliament can amend any part but **cannot alter the "basic structure"**. |
| **Indira Gandhi v Raj Narain** | 1975 | Free and fair elections are part of the basic structure. |
| **Minerva Mills** | 1980 | Limited amending power is itself basic structure. Clauses added by the 42nd Amendment were struck down. |
| **I.R. Coelho** | 2007 | Laws placed in the Ninth Schedule after 24 April 1973 can be reviewed by courts. |
| **NJAC case** | 2015 | 99th Amendment and the National Judicial Appointments Commission struck down. |

### Basic structure (examples)

The doctrine is not written in the Constitution. It has been built up case by case. Features held to be part of it include: supremacy of the Constitution, sovereign democratic republic, secularism, separation of powers, federalism, judicial review, rule of law, free and fair elections, independence of the judiciary, harmony between Fundamental Rights and Directive Principles, and the limited power of Parliament to amend.

### Important amendments

| Amendment | Year | Subject |
|---|---|---|
| 1st | 1951 | Ninth Schedule added, reasonable restrictions on speech widened, Art 15(4) |
| 7th | 1956 | Reorganisation of States |
| 24th, 25th | 1971 | Amending power, Art 31C |
| 26th | 1971 | Privy purses abolished |
| 36th | 1975 | Sikkim became a State |
| 42nd | 1976 | "Mini-Constitution": Socialist, Secular, Integrity, Fundamental Duties |
| 44th | 1978 | Property removed from Fundamental Rights, Emergency safeguards |
| 52nd | 1985 | Anti-defection law, Tenth Schedule |
| 61st | 1988 | Voting age reduced from 21 to 18 |
| 69th | 1991 | Delhi became National Capital Territory |
| 73rd, 74th | 1992 | Panchayats and Municipalities |
| 86th | 2002 | Right to education (Art 21A) |
| 91st | 2003 | Limit on size of ministries, stricter anti-defection |
| 97th | 2011 | Co-operative societies |
| 99th | 2014 | NJAC (struck down in 2015) |
| 101st | 2016 | Goods and Services Tax |
| 102nd | 2018 | Constitutional status to the National Commission for Backward Classes |
| 103rd | 2019 | 10 per cent EWS reservation |
| 104th | 2019 | SC/ST reservation in legislatures extended to 2030, Anglo-Indian nomination ended |
| 105th | 2021 | States' power to identify SEBCs restored |
| 106th | 2023 | One-third reservation for women (Nari Shakti Vandan Adhiniyam) |

:::new Recent update
The **106th Amendment** was brought into force by a notification on **16 April 2026**, but the reservation cannot be applied until seats are redrawn after the next Census. A further Bill, the **Constitution (131st Amendment) Bill, 2026**, to speed this up and apply it from 2029 was **defeated in the Lok Sabha on 17 April 2026** (298 for, 230 against), because it could not get the required two-thirds of members present and voting. (Bill numbers count all proposals. Acts are numbered separately, which is why the Act is the 106th.)
:::

:::tip
Memorise three numbers: **13** judges, **7:6**, **1973** for Kesavananda Bharati. Basic structure was coined by the Court, and the idea is traced to the German jurist Dietrich Conrad. Nani Palkhivala argued for the petitioners.
:::

@unit The Union Government

## The President of India {#president}

The President is the **head of State** and the formal head of the Union executive (Arts 52 to 62). India follows the British model: the President is a constitutional head who acts on the advice of the Council of Ministers headed by the Prime Minister.

### Election (Arts 54 and 55)

- Chosen by an **Electoral College** made up of the **elected** members of both Houses of Parliament and the **elected** members of the Legislative Assemblies of States, including **Delhi and Puducherry** (70th Amendment, 1992). **Nominated members and members of Legislative Councils do not vote.**
- System: **proportional representation by means of the single transferable vote**, with a **secret ballot**.
- Value of votes is fixed so that States and the Union have equal weight. Value of an MLA's vote = population of the State (1971 Census) divided by (number of elected MLAs x 1000). Value of an MP's vote = total value of all MLAs' votes divided by the number of elected MPs.
- A candidate needs **50 proposers and 50 seconders** and a security deposit of ₹15,000.
- Disputes about the election are decided only by the **Supreme Court** (Art 71).

### Qualifications and term

- Citizen of India, at least **35 years** old, qualified to be a Lok Sabha member, and must not hold an office of profit.
- Term: **5 years** (Art 56). Can be re-elected any number of times. Continues in office until the successor takes charge.
- Oath is administered by the **Chief Justice of India**.
- Salary: ₹5 lakh per month (since 2018).

### Removal: impeachment (Art 61)

- Only on the ground of **"violation of the Constitution"**.
- Charge can start in **either House** with a notice signed by at least **one-fourth** of its members, given 14 days earlier.
- The House must pass it by **two-thirds of its total membership**. Then the other House investigates, and if it also passes it by a two-thirds majority of its total membership, the President stands removed.
- Elected and nominated members of Parliament both take part. State legislatures do not.
- No President has ever been impeached.

### Vacancy

A new election must be held within **6 months** (Art 62). Meanwhile the **Vice-President** acts as President (Art 65). If he is unavailable, the Chief Justice of India (or the senior-most Supreme Court judge) acts, as happened in 1969 with Justice M. Hidayatullah.

### Powers

| Type | Examples |
|---|---|
| **Executive** | All executive action is in his name. Appoints PM, Ministers, Governors, judges, Attorney General, CAG, Election Commissioners. Supreme Commander of the armed forces. |
| **Legislative** | Summons, prorogues and addresses Parliament. Can dissolve the Lok Sabha. Nominates **12 members** to the Rajya Sabha. Gives assent to Bills. |
| **Ordinance (Art 123)** | When Parliament is not in session. Must be approved within **six weeks of reassembly** or it lapses. |
| **Financial** | Money Bills need his recommendation. Sets up the Finance Commission every 5 years. Controls the Contingency Fund. |
| **Judicial (Art 72)** | **Pardon, reprieve, respite, remission and commutation**. Covers court-martial sentences and the death sentence. |
| **Emergency** | Arts 352, 356 and 360. |

### Veto power

- **Absolute veto:** withholds assent (the Bill dies).
- **Suspensive veto:** returns a Bill (except a Money Bill) for reconsideration. If Parliament passes it again, he must give assent.
- **Pocket veto:** takes no action at all. The Constitution gives no time limit. (Example: the Indian Post Office (Amendment) Bill, 1986, by President Zail Singh.)

### Constitutional limits

- **Art 74:** He **must** act on the advice of the Council of Ministers (42nd Amendment). He may ask it to reconsider the advice **once** (44th Amendment), but must then act on the new advice.
- Courts cannot inquire into the advice given to the President.

### Presidents of India

| No. | Name | Facts |
|---|---|---|
| 1 | Dr Rajendra Prasad | Only person to serve **two terms** (1950 to 1962). |
| 2 | Dr S. Radhakrishnan | Former Vice-President. |
| 3 | Dr Zakir Husain | First to **die in office** (1969). First Muslim President. |
| 4 | V.V. Giri | Acted as President, then elected as an independent. |
| 5 | Fakhruddin Ali Ahmed | Second to die in office (1977). |
| 6 | Neelam Sanjiva Reddy | Elected **unopposed**. |
| 7 | Giani Zail Singh | First Sikh President. |
| 8 | R. Venkataraman | |
| 9 | Dr Shankar Dayal Sharma | |
| 10 | K.R. Narayanan | First Dalit President. |
| 11 | Dr A.P.J. Abdul Kalam | |
| 12 | Pratibha Patil | **First woman** President. |
| 13 | Pranab Mukherjee | |
| 14 | Ram Nath Kovind | |
| 15 | **Droupadi Murmu** | In office since 25 July 2022. First President from a tribal community. |

:::tip
Common traps: the President is elected by **elected** members only. **Legislative Council members never vote**, but Delhi and Puducherry MLAs do. Impeachment needs **14 days' notice** and **one-fourth** signatures to start and **two-thirds of total membership** to pass.
:::

## The Vice-President {#vice-president}

### Election and term (Arts 63 to 71)

- Elected by an Electoral College of **all members of both Houses of Parliament** (elected and nominated). **State legislatures do not take part.**
- Same system: proportional representation by single transferable vote, secret ballot.
- Qualifications: Indian citizen, **35 years**, qualified to be a Rajya Sabha member, no office of profit.
- Term: **5 years**. Disputes decided by the Supreme Court.

### Role

- **Ex-officio Chairman of the Rajya Sabha** (Art 64). He has no vote except a casting vote in a tie. He draws his salary (₹4 lakh a month) as Chairman.
- **Acts as President** during a vacancy (for up to 6 months) or when the President is absent or ill. While doing so he does not preside over the Rajya Sabha.

### Removal (Art 67)

Only by a resolution of the **Rajya Sabha** passed by an **effective majority** (a majority of all the then members) and agreed to by the **Lok Sabha**, after **14 days'** notice. No grounds need be stated. It is not impeachment.

:::key Present office-holder
**C.P. Radhakrishnan** is the **15th** Vice-President. He took office in September 2025 after Jagdeep Dhankhar resigned in July 2025.
:::

:::tip
Six Vice-Presidents later became President: Radhakrishnan, Zakir Husain, V.V. Giri, R. Venkataraman, Shankar Dayal Sharma and K.R. Narayanan. India's first Vice-President was **Dr S. Radhakrishnan**, who was also the first Chairman of the Rajya Sabha.
:::

## Prime Minister and Council of Ministers {#prime-minister}

### Appointment (Art 74 and Art 75)

- Art 74: There shall be a Council of Ministers with the **Prime Minister at the head** to aid and advise the President.
- The **President appoints the PM**, and the other ministers on the PM's advice. Usually the leader of the majority party or coalition in the Lok Sabha.
- The PM may belong to either House.
- A minister who is not a member of either House for **six consecutive months** ceases to be a minister.
- The Council is **collectively responsible to the Lok Sabha** (Art 75(3)). Individual ministers hold office **during the pleasure of the President** (on the PM's advice).

### Size of the Council (91st Amendment, 2003)

Total number of ministers, including the PM, cannot be more than **15 per cent of the Lok Sabha's strength** (about 81 for 543 seats). In a State the minimum is 12 (Art 164(1A)).

### Three ranks

1. **Cabinet Ministers:** heads of important ministries. The Cabinet is the real decision-making body. The word "Cabinet" was inserted into the text only by the **44th Amendment (1978)** in Art 352.
2. **Ministers of State** (with independent charge, or attached to a Cabinet Minister).
3. **Deputy Ministers** (no longer appointed in practice).

### Powers of the Prime Minister

- Chairs the Cabinet and recommends the allocation of portfolios.
- Link between the President and the Cabinet (Art 78 makes it his duty to give the President information).
- Leader of the Lok Sabha. Chairs the NITI Aayog and several Cabinet committees.
- His resignation or death **dissolves the Council of Ministers**.
- Called "first among equals" (primus inter pares) and the "keystone of the Cabinet arch".

### Principles of responsibility

- **Collective responsibility:** if the Lok Sabha passes a no-confidence motion, the whole Council must resign. All ministers publicly support Cabinet decisions.
- **Individual responsibility:** a minister can be removed by the PM without losing the whole Council.
- There is **no legal responsibility** in India: orders of the President do not need a minister's counter-signature, unlike in Britain.

### No-confidence motion

Moved only in the **Lok Sabha** (Rule 198). It needs the support of **50 members** to be admitted. Rajya Sabha cannot remove the government.

:::tip
The longest-serving Prime Minister is **Jawaharlal Nehru** (1947 to 1964). **Charan Singh** is the only PM who never faced Parliament. **Morarji Desai** was the first non-Congress PM.
:::

Read the full article: [Prime Minister of India: Complete Notes with 15 PYQs](/prime-minister-of-india-complete-notes-with-15-pyqs-upsc-jkssb-jkpsc).

## Parliament: Structure and Powers {#parliament}

Parliament (Part V, Chapter II) is made up of the **President, Lok Sabha (House of the People) and Rajya Sabha (Council of States)**.

### Lok Sabha and Rajya Sabha compared

| | Lok Sabha | Rajya Sabha |
|---|---|---|
| **Nature** | Lower, popular house | Upper house, represents States and UTs |
| **Maximum strength** | **550** (530 from States, 20 from UTs) | **250** (238 elected, 12 nominated) |
| **Present strength** | **543** | **245** (233 elected, 12 nominated) |
| **Election** | Directly, by adult citizens | Indirectly, by elected MLAs through single transferable vote |
| **Term** | **5 years** (can be dissolved earlier) | **Permanent**: one-third retire every **2 years**, member's term is **6 years** |
| **Minimum age** | **25 years** | **30 years** |
| **Presiding officer** | Speaker | Vice-President (Chairman) |
| **Dissolved?** | Yes | **Never** |

- During a **National Emergency** the Lok Sabha's term can be extended by **one year at a time** (Art 83(2)).
- The seats of States in the Lok Sabha are still allocated on the **1971 Census** (frozen until the first Census taken after 2026, by the 84th Amendment).
- 12 members of the Rajya Sabha are nominated by the President from persons with special knowledge in literature, science, art and social service.
- The Rajya Sabha election is by **open ballot** and a candidate no longer has to be a resident of the State (changes of 2003).

### Qualifications and disqualifications

Citizen of India, minimum age, takes the oath, and registered as a voter. Disqualified (Art 102) if: holding an office of profit, unsound mind, undischarged insolvent, not a citizen, disqualified by law, or **defection** (Tenth Schedule). Under *Lily Thomas v Union of India (2013)* a member convicted and sentenced to **2 years or more** is disqualified immediately.

### Presiding officers

- **Speaker** (and Deputy Speaker) elected by the Lok Sabha from among its members. Votes only to break a tie. Decides whether a Bill is a **Money Bill**. Decides disqualification cases under the anti-defection law. **G.V. Mavalankar** was the first Speaker. **Meira Kumar** was the first woman Speaker.
- **Chairman and Deputy Chairman** of the Rajya Sabha. The Deputy Chairman is elected from among its members.

### Sessions

- Three regular sessions: **Budget** (Feb to May), **Monsoon** (July to Aug) and **Winter** (Nov to Dec).
- Not more than **six months** can pass between two sessions (Art 85).
- **Quorum** is one-tenth of the total members (Art 100).
- **Adjournment** (by the presiding officer) differs from **prorogation** (by the President) and **dissolution** (Lok Sabha only, by the President).

### What happens to Bills when the Lok Sabha is dissolved

| Bill | Lapses? |
|---|---|
| Pending in Lok Sabha | **Lapses** |
| Passed by Lok Sabha, pending in Rajya Sabha | **Lapses** |
| Passed by Rajya Sabha, pending in Lok Sabha | **Lapses** |
| Pending in Rajya Sabha, not passed by Lok Sabha | **Does not lapse** |
| Passed by both Houses, awaiting assent | Does not lapse |
| Returned by the President for reconsideration | Does not lapse |

### Special powers of the Rajya Sabha

- **Art 249:** by a **two-thirds** resolution it can authorise Parliament to make laws on a **State List** subject in the national interest (for up to one year at a time).
- **Art 312:** to create a **new All-India Service**.
- Money Bills: it can only **recommend** changes within 14 days.

### Joint sitting (Art 108)

Held when the two Houses disagree on an **ordinary or financial Bill**. Called by the **President**, chaired by the **Speaker**. A simple majority decides. It **cannot** be used for Money Bills or Constitution Amendment Bills. Held only **three times**: the Dowry Prohibition Bill (1961), the Banking Service Commission (Repeal) Bill (1978) and the **Prevention of Terrorism Bill, POTA (2002)**.

### Parliamentary devices

| Device | Meaning |
|---|---|
| **Question Hour** | First hour of a sitting, for questions to ministers (starred, unstarred, short-notice). |
| **Zero Hour** | Starts at about noon, matters raised without notice. An Indian innovation. |
| **Adjournment motion** | Lok Sabha only: to discuss an urgent matter of public importance. Needs the support of 50 members. |
| **Calling attention** | Minister's attention drawn to an urgent matter. |
| **No-confidence motion** | Lok Sabha only. |
| **Censure motion** | Criticises specific policy. |
| **Cut motions** | Reduce a demand for grants: policy cut, economy cut and token cut. |
| **Closure** | Simple, by compartments, **kangaroo** and **guillotine**. |

### Privileges (Art 105)

Freedom of speech in Parliament, and no court action for anything said or any vote given. In *P.V. Narasimha Rao (1998)* the Supreme Court held that MPs taking a bribe to vote were protected. A seven-judge bench **overruled** this in *Sita Soren v Union of India (March 2024)*: bribery is not protected by privilege.

:::new Recent facts
- Lok Sabha **Speaker: Om Birla** (second term since June 2024). The post of **Deputy Speaker** has been vacant since 2019. **Leader of Opposition: Rahul Gandhi** (since 2024, the first LoP since 2014).
- Allocation of seats has been frozen on the 1971 Census. The next Census (2027) will be used for any fresh delimitation.
:::

## Bills, the Budget and Parliamentary Committees {#bills-budget-committees}

### Types of Bills

| Bill | Where introduced | Key points |
|---|---|---|
| **Ordinary Bill** | Either House | Needs both Houses. Joint sitting possible. |
| **Money Bill** (Art 110) | **Lok Sabha only**, on the President's recommendation | The Speaker certifies it. The Rajya Sabha can only recommend changes within **14 days**, and the Lok Sabha may reject them. No joint sitting. Deals only with tax, borrowing, Consolidated Fund. |
| **Financial Bill** (Art 117) | Lok Sabha only (Category I) or either House (Category II) | Contains money provisions but is not a pure Money Bill. Rajya Sabha has equal powers. |
| **Constitution Amendment Bill** (Art 368) | Either House | Special majority. No joint sitting. |

### Stages of an ordinary Bill

1. **First reading:** introduction.
2. **Second reading:** general discussion, committee stage, clause-by-clause (report stage).
3. **Third reading:** final vote.
4. The same in the other House. Then **assent** by the President (Art 111).

Private Members' Bills are taken up on **Fridays**.

### The Budget

- **Art 112:** the "Annual Financial Statement". Presented by the Finance Minister in the Lok Sabha, normally on **1 February**. The Railway Budget was merged with it in **2017**. The financial year is April to March.
- Stages: presentation, general discussion, scrutiny by standing committees, **voting on Demands for Grants** (Lok Sabha only), **Appropriation Bill**, **Finance Bill**.
- **Vote on Account (Art 116):** advance grant for part of the year, usually before a general election.
- **Consolidated Fund of India (Art 266(1)):** all revenues and loans. Money can be spent from it only with Parliament's approval.
- **Expenditure "charged"** on it (not voted): salaries of the President, judges, CAG, Chairman of the Rajya Sabha, Speaker, UPSC Chairman, and debt charges.
- **Public Account (Art 266(2)):** deposits, provident funds. **Contingency Fund (Art 267):** advance money for unforeseen expenses, controlled by the President.
- The FRBM Act, 2003 sets deficit targets.

### Parliamentary committees

| Committee | Members | Notes |
|---|---|---|
| **Public Accounts Committee (PAC)** | 22 (15 LS, 7 RS) | Examines the CAG's audit reports. Chair is traditionally from the **opposition**. Oldest financial committee (1921). |
| **Estimates Committee** | 30 (all from Lok Sabha) | Largest committee. Called the "continuous economy committee". Set up in 1950. |
| **Committee on Public Undertakings (COPU)** | 22 (15 LS, 7 RS) | Set up in 1964 on the Krishna Menon Committee's advice. |
| **Departmentally Related Standing Committees** | 24 committees, 31 members each (21 LS, 10 RS) | Scrutinise ministry budgets and Bills. Started 1993. |
| **Joint Parliamentary Committee (JPC)** | Set up as needed | Ad hoc, for specific issues. |

:::tip
The **PAC** is the only financial committee with Rajya Sabha members and an opposition chairman. **Estimates Committee** has only Lok Sabha members. "CAG is the friend, philosopher and guide of the PAC."
:::

## The Supreme Court {#supreme-court}

The Supreme Court (Part V, Chapter IV, Arts 124 to 147) is the highest court and the guardian of the Constitution. It succeeded the **Federal Court (1937)** and was inaugurated on **28 January 1950**. It sits in **Delhi**.

### Composition and appointment

- **Chief Justice of India plus 33 other judges** (34 in all, since 2019).
- Judges are appointed by the **President**, in practice through the **Collegium** system: the CJI and the four senior-most judges.
- **Three Judges Cases:** *S.P. Gupta* (1981, executive primacy), *Supreme Court Advocates-on-Record Association* (1993, collegium born, CJI primacy), and the *Third Judges Case* (1998, collegium of five).
- The **99th Amendment and the NJAC** to replace the collegium were struck down in **2015**.
- Qualifications: Indian citizen and either a High Court judge for 5 years, or an advocate of a High Court for 10 years, or a distinguished jurist in the President's opinion.
- Retirement at **65 years**. A retired judge cannot practise in any court in India.

### Removal (Art 124(4))

On the ground of **proved misbehaviour or incapacity**. An address passed by each House by a **majority of total membership and two-thirds of those present and voting**, under the **Judges (Inquiry) Act, 1968**. No judge has ever been removed.

### Jurisdiction

| Type | Article | Meaning |
|---|---|---|
| **Original** | **131** | **Exclusive**: disputes between the Centre and States, or between States. |
| **Writ** | **32** | To enforce Fundamental Rights. Concurrent with High Courts. |
| **Appellate** | 132 to 134, **136** | Appeals from High Courts. **Art 136** is the **special leave petition** (SLP). |
| **Advisory** | **143** | The President can seek its opinion. The opinion is not binding. |
| **Review** | 137 | Of its own judgments. |
| **Curative petition** | | A last remedy (*Rupa Ashok Hurra*, 2002). |
| **Record court** | 129 | Can punish for contempt. |
| **Complete justice** | **142** | Orders necessary for complete justice in any case. |
| **Binding law** | **141** | Law declared by it binds all courts. |

### Public Interest Litigation

Any public-spirited person can approach the Court on behalf of those who cannot. It began in the late 1970s (*Hussainara Khatoon*, 1979, about undertrial prisoners) with Justices **P.N. Bhagwati** and **V.R. Krishna Iyer**. The Court also accepts letters as petitions ("epistolary jurisdiction").

### Other courts and justice delivery

- **Lok Adalats:** under the Legal Services Authorities Act, 1987.
- **Gram Nyayalayas:** Act of 2008.
- **Tribunals:** Arts 323A and 323B (42nd Amendment). In *L. Chandra Kumar* (1997), tribunal decisions were made subject to High Court review.

:::new Recent
**Chief Justice of India: Justice Surya Kant**, the 53rd CJI, sworn in on **24 November 2025**. Tenure up to 9 February 2027.
:::

:::tip
Original jurisdiction under Art 131 is **exclusive** to the Supreme Court. Writ jurisdiction under Art 32 is **concurrent** with High Courts under Art 226. The CJI is also called the "Master of the Roster".
:::

@unit The State Government

## The Governor {#governor}

The Governor (Part VI, Arts 153 to 162) is the **head of the State executive**. Art 153 says there shall be a Governor for each State, and the 7th Amendment (1956) allows **one Governor for two or more States**.

### Appointment and term

- Appointed by the **President** by warrant under his hand and seal (Art 155). He is **not elected**. The model was borrowed from **Canada**.
- Qualifications (Art 157): citizen of India, at least **35 years** old, and not a member of Parliament or a State Legislature or holder of an office of profit.
- Term: **5 years** (Art 156), but he holds office **during the pleasure of the President**. He can be transferred or removed at any time. In *B.P. Singhal v Union of India (2010)* the Supreme Court held that removal cannot be arbitrary or without a compelling reason.
- Oath is administered by the **Chief Justice of the High Court** of the State.
- Resigns to the President.

### Powers

| Type | Examples |
|---|---|
| **Executive** (Art 154) | Appoints the Chief Minister and, on his advice, other ministers. Appoints the Advocate General, State Election Commissioner and members of the State Public Service Commission. Consulted on appointment of High Court judges. |
| **Legislative** | Summons, prorogues and addresses the Legislature. Dissolves the Assembly. Nominates **one** Anglo-Indian member (provision ended in 2020) and members of the Legislative Council. |
| **Financial** | Money Bills only with his prior recommendation. Controls the **Contingency Fund** of the State. Sets up the State Finance Commission every 5 years (Art 243I). |
| **Judicial (Art 161)** | Can **pardon, reprieve, respite, remit or commute** sentences for offences against State law. **He cannot pardon a death sentence** (only suspend, remit or commute it). He cannot pardon a court-martial sentence. |
| **Ordinance (Art 213)** | When the Legislature is not in session. Must be approved within **six weeks of reassembly**. |

### Discretionary powers

The Governor must generally act on the advice of the Council of Ministers (Art 163), but may act **in his discretion** in some cases:

- Appointing a Chief Minister when no party has a clear majority.
- **Reserving** a Bill for the President.
- Recommending **President's Rule** (Art 356).
- Dismissing a ministry that has lost the confidence of the House, or dissolving the Assembly.
- Special responsibilities for some States (Arts 371 and the Sixth Schedule): for example Assam, Nagaland.

### Art 200: assent to Bills

The Governor may:

1. **Give assent**,
2. **Withhold assent**, or return a non-Money Bill with a message, or
3. **Reserve** it for the President.

If the Legislature passes the returned Bill again, **he must give assent**. The Constitution fixes no time limit for acting, which led to disputes with several States.

:::new Presidential Reference, Nov 2025
In a reference under Art 143, a five-judge Constitution Bench of the Supreme Court said that **courts cannot lay down fixed deadlines or "deemed assent"** for Governors or the President on State Bills. Governors have **only the three options** above (assent, return, reserve). They cannot sit on a Bill indefinitely, and **prolonged unexplained inaction can be examined by courts in a limited way**. Check the exact wording before using it in a mains answer.
:::

### Commissions on the Governor's role

- **Sarkaria Commission (1983 to 1988):** Governor should be an eminent person from outside the State, not active in politics, and should have a fixed five-year term.
- **Punchhi Commission (2007 to 2010):** removal only by a resolution of the State Legislature and Governor's discretion limited.
- **Bommai (1994):** the Governor's report for President's Rule is subject to judicial review.
- **Rameshwar Prasad (2006):** dissolving a Bihar Assembly on a Governor's report was held unconstitutional.

:::tip
Articles to remember: **153** (office), **155** (appointment), **156** (term), **161** (pardon), **163** (aid and advice), **200** (assent), **213** (ordinance), **356** (report on failure of constitutional machinery). A Governor **cannot pardon a death sentence**, though the President can.
:::

:::jk Jammu and Kashmir
Before 2019 the Governor of J&K was appointed by the President in consultation with the **Chief Minister**, an exception under the old Constitution of Jammu and Kashmir. Since 31 October 2019 the Union Territory is headed by a **Lieutenant Governor**. The LG is an administrator under Art 239 and is not a Governor in the constitutional sense.
:::

## Chief Minister and Council of Ministers {#chief-ministers}

### Appointment (Arts 163 and 164)

- The **Governor appoints** the Chief Minister, usually the leader of the majority party or coalition in the Assembly. The CM may be a member of **either House**, or not a member at all. In that case he must become a member within **6 months**.
- Other ministers are appointed by the Governor **on the advice of the CM**.
- Ministers hold office **during the pleasure of the Governor**. The Council is **collectively responsible** to the **Legislative Assembly** (Art 164(2)).
- The Governor administers the oath of office and secrecy.

### Size (91st Amendment, 2003)

- The Council, including the CM, cannot exceed **15 per cent** of the total Assembly strength.
- The **minimum is 12** ministers (Art 164(1A)). The exception is Delhi (10 per cent) and J&K (the J&K Reorganisation Act also limits ministers to 10 per cent).
- A member disqualified under the **Tenth Schedule** cannot become a minister (Art 164(1B)).

### Powers and functions of the Chief Minister

- Head of the Council of Ministers. Recommends the **allocation of portfolios**.
- Link between the Governor and the Council (Art 167): he must give the Governor all information about decisions of the Council.
- Leader of the House. Chairs the **State Planning Board** and other bodies. Is also an ex-officio member of the **NITI Aayog Governing Council** and the **Zonal Council**.
- Resignation or death of the CM **dissolves the Council**.

### Mnemonic: Union versus State

| Feature | President / PM | Governor / CM |
|---|---|---|
| Nature of head | Elected indirectly | Appointed by Centre |
| Council responsible to | Lok Sabha | Legislative Assembly |
| Discretion | Almost none | Some |
| Size limit | 15 per cent of LS | 15 per cent of Assembly (min 12) |

### Landmark facts

- **Sucheta Kripalani** (Uttar Pradesh, 1963) was India's **first woman Chief Minister**.
- **Sheikh Abdullah** was the first Prime Minister of J&K (from 1948). The title was changed to Chief Minister in 1965.
- *B.R. Kapur v State of Tamil Nadu (2001)*: a person convicted and sentenced for a crime cannot be appointed CM even if the Governor wants to appoint him.
- *S.R. Bommai v Union of India (1994)*: floor test is the way to test a ministry's majority. Secularism is part of the basic structure.

:::jk J&K Chief Ministers
Since the first elections after 2019, **Omar Abdullah** (National Conference) has been the Chief Minister of the **Union Territory** of J&K. He took oath on **16 October 2024**. The J&K Legislative Assembly has **90 elected seats** plus **5 nominated** by the Lieutenant Governor.
:::

## State Legislature {#state-legislature}

### Structure (Arts 168 to 212)

The State Legislature consists of the **Governor and the Legislative Assembly (Vidhan Sabha)**. Six States also have a **Legislative Council (Vidhan Parishad)**: **Andhra Pradesh, Telangana, Bihar, Karnataka, Maharashtra, Uttar Pradesh**. The State has a Council **only if** the Assembly passes a resolution by a **special majority** and Parliament passes a law (Art 169). Parliament can abolish it the same way.

### Legislative Assembly and Council compared

| | Assembly | Council |
|---|---|---|
| **Strength** | **60 to 500** (Art 170). Goa, Sikkim, Mizoram have fewer than 60. | Not more than **one-third** of the Assembly, and not less than **40** (Art 171). |
| **Election** | Direct, adult franchise | **Indirect**: 1/3 by local bodies, 1/3 by MLAs, 1/12 graduates, 1/12 teachers, 1/6 nominated by the Governor |
| **Term** | **5 years** | **Permanent**: one-third retire every 2 years. Term of a member is **6 years**. |
| **Minimum age** | **25** | **30** |
| **Presiding officer** | Speaker | Chairman |

- The Assembly's term can be extended by one year at a time during a National Emergency.
- **Jammu and Kashmir** had a Legislative Council of 36 seats until it was abolished in 2019.

### Legislative powers

- The Legislature can make laws on the **State List** and the **Concurrent List** (Seventh Schedule). A State law on a Concurrent subject is void if it conflicts with a Union law, except where the President has given assent (Art 254).
- **Money Bills** (Art 198) originate only in the **Legislative Assembly** and need the Governor's recommendation. The Council can only recommend changes within **14 days**.
- For an ordinary Bill the Council is much weaker than Rajya Sabha: the Assembly can **override** the Council's amendments, and there is **no joint sitting**. The Council can only **delay a Bill by three months** (first time) or **one month** (second time).

### Privileges

Freedom of speech in the House (Art 194) and immunity from court action for what is said. Similar to those of Parliament.

### Disqualification and the Tenth Schedule

Members are disqualified for **defection** under the **Tenth Schedule** (52nd Amendment, 1985). The **Speaker** decides. In *Kihoto Hollohan (1992)* the decision was made subject to judicial review.

### Sessions and officers

- Not more than **six months** between two sessions. Quorum: 10 members or one-tenth of the House, whichever is more.
- The **Speaker** of the Assembly is elected by its members. The first Speaker of the J&K Assembly after 2024 was **Abdul Rahim Rather**.
- The **Advocate General** (Art 165) is the State's chief legal adviser.

:::tip
For the exam, remember the **six Council States** and that **Jammu and Kashmir lost its Council in 2019**. The Council has **no say in the Money Bill**. The **Legislative Council cannot be dissolved** but may be abolished.
:::

## The High Court {#high-court}

The High Court (Part VI, Chapter V, Arts 214 to 231) is the highest court of a State. India has **25 High Courts**. Parliament can set up a common High Court for two or more States (Art 231). Calcutta (1862), Bombay and Madras are the oldest.

### Composition and appointment

- A **Chief Justice** and as many judges as the President decides.
- Judges are appointed by the **President**, after consulting the **CJI, the Governor and the Chief Justice of the High Court**. In practice the **collegium** of the High Court and the Supreme Court decides.
- Qualifications (Art 217): Indian citizen, **10 years** of judicial office or an advocate of a High Court for **10 years**.
- Retirement age: **62 years** (Supreme Court judges retire at 65).
- Removal: same as a Supreme Court judge (an address by Parliament, Art 124(4)).
- A permanent judge cannot practise in any court other than the Supreme Court and other High Courts.

### Jurisdiction

| Type | Meaning |
|---|---|
| **Original** | Matters of will, marriage, divorce, admiralty, company law, contempt of court. Also election petitions. |
| **Writ (Art 226)** | **Wider** than the Supreme Court's: for Fundamental Rights **and for any other purpose**. |
| **Appellate** | Civil and criminal appeals from subordinate courts. |
| **Supervisory (Art 227)** | Over all courts and tribunals in its territory (except military). |
| **Court of record** | Can punish for its own contempt. |
| **Power of transfer (Art 228)** | Can withdraw a case involving a constitutional question from a lower court. |

:::key Art 32 versus Art 226
Art 32 is itself a Fundamental Right and the Court **must** grant it. Art 226 is not a Fundamental Right, and the High Court has **discretion**. Art 226 covers **"any other purpose"** and so is **wider** than Art 32.
:::

### Subordinate courts (Part VI, Chapter VI)

- **District Judges** are appointed by the **Governor**, in consultation with the High Court (Art 233).
- Other judicial officers are appointed by the Governor after consulting the State Public Service Commission and the High Court.
- Control over subordinate courts is with the **High Court** (Art 235).
- **Lok Adalats**, **Family Courts**, **Gram Nyayalayas** and **Tribunals** supplement the courts.

:::jk High Court of Jammu & Kashmir and Ladakh
Since 31 October 2019 the single **High Court of Jammu & Kashmir and Ladakh** serves both Union Territories. It has **two seats**, **Srinagar** and **Jammu**, and the Court has traditionally sat at each for part of the year. It was first established in **1928** by the Maharaja.
:::

@unit Federalism and Local Government

## Centre-State Relations {#centre-state-relations}

India is described in Art 1 as a **"Union of States"**, not a federation of States. The Constitution is **federal in form with a strong unitary bias** (K.C. Wheare called it "quasi-federal"). In *S.R. Bommai (1994)* the Supreme Court held that **federalism is part of the basic structure**.

### Legislative relations (Part XI, Arts 245 to 255)

The **Seventh Schedule** divides subjects into three lists:

| List | Subjects | Who legislates |
|---|---|---|
| **Union List** | **100** (originally 97) | Parliament only. Defence, foreign affairs, banking, railways, atomic energy. |
| **State List** | **61** (originally 66) | State Legislature. Police, public order, public health, agriculture, land, local government. |
| **Concurrent List** | **52** (originally 47) | Both, but Union law prevails (Art 254). Criminal law, education, forests, marriage, trade unions. |

- **Residuary subjects** (Art 248) belong to Parliament. This follows **Canada**, unlike the USA and Australia.
- The **42nd Amendment (1976)** moved **five subjects** from the State List to the Concurrent List: **education, forests, weights and measures, protection of wild animals and birds, administration of justice**.
- The **101st Amendment (2016)** added Art 246A: both Parliament and States can make laws on **goods and services tax**.

### Parliament can legislate on the State List when

1. The **Rajya Sabha** passes a resolution by a **two-thirds** majority that it is in the **national interest** (Art 249).
2. A **National Emergency** is in force (Art 250).
3. **Two or more States** request it (Art 252).
4. To implement a **treaty** or international agreement (Art 253).
5. **President's Rule** is in force in a State (Art 356).

### Administrative relations (Arts 256 to 263)

- States must exercise their executive power so as not to impede Union laws, and the Union can give directions (Art 256 and 257).
- **All-India Services** (IAS, IPS, IFoS) are controlled by the Union but serve the States. A new one can be created under Art 312 by a Rajya Sabha resolution.
- **Inter-State Council (Art 263):** set up on the Sarkaria Commission's advice in **1990**.
- **Zonal Councils:** statutory bodies set up under the **States Reorganisation Act, 1956**. There are **five**: Northern, Central, Eastern, Western, Southern. The Union Home Minister chairs each. The **North Eastern Council** is separate.
- Inter-State water disputes: Art 262, and the Inter-State Water Disputes Act, 1956 (Ravi-Beas, Cauvery, Krishna).
- **Goods and Services Tax Council (Art 279A):** a constitutional body chaired by the Union Finance Minister. The Union has **one-third** of the votes and the States together **two-thirds**. A decision needs **three-fourths** of the votes cast.

### Financial relations (Arts 268 to 293)

- Taxes in the Union List (income tax except on agriculture, customs, corporation tax) go to the Centre. State List taxes (land revenue, tax on agricultural income, State excise, stamp duties) go to the States.
- **Art 280:** the **Finance Commission** is set up by the President every **five years** and recommends how the divisible pool of taxes is shared.
- **Art 275:** grants-in-aid to States in need. **Art 282:** discretionary grants.
- The **15th Finance Commission** (chair **N.K. Singh**) covered 2021-22 to 2025-26 and fixed the States' share of the divisible pool at **41 per cent**. The **16th Finance Commission** is headed by **Dr Arvind Panagariya** and covers **2026-27 to 2030-31**.
- The **Planning Commission** (extra-constitutional) was replaced by **NITI Aayog** on **1 January 2015**.

### Committees on Centre-State relations

| Commission | Year | Key point |
|---|---|---|
| **Rajamannar Committee** | 1969 | Tamil Nadu: wanted more State autonomy. |
| **Sarkaria Commission** | 1983 to 1988 | Cooperative federalism, Inter-State Council, residuary taxation. |
| **Punchhi Commission** | 2007 to 2010 | Governor's role and 'cooperative federalism'. |

:::tip
Learn the numbers: **100, 61, 52** (Union, State, Concurrent). Education moved to the Concurrent List by the **42nd Amendment (1976)**. **Art 246A** is the GST article. **Art 279A** is the GST Council.
:::

## Emergency Provisions {#emergency-provisions}

Part XVIII (Arts 352 to 360) allows the Union to take extraordinary powers. The model is the **Weimar Constitution of Germany**. The Fundamental Rights suspension borrows from it too.

### Three kinds of emergency

| Type | Article | Ground |
|---|---|---|
| **National Emergency** | **352** | **War, external aggression, or armed rebellion** (changed from "internal disturbance" by the 44th Amendment, 1978). |
| **State Emergency, President's Rule** | **356** | **Failure of constitutional machinery** in a State. |
| **Financial Emergency** | **360** | Threat to the financial stability or credit of India. |

### National Emergency (Art 352)

- Proclaimed by the **President** only on the **written advice of the Union Cabinet** (44th Amendment). It can apply to the whole of India or a part.
- Must be approved by **both Houses** by a **special majority** (a majority of total membership and two-thirds of those present and voting) within **one month** (earlier: two months). Without such approval it ends.
- Valid for **six months** at a time. It can be extended **without a time limit** by a resolution passed every six months.
- Ends by revocation by the President. The **Lok Sabha** must revoke it by a **simple majority** if **one-tenth** of its members request a special sitting.
- **Effects:**
  - The Union can make laws on **State List** subjects and give directions to States.
  - **Art 358:** Art 19 is **automatically suspended** for a **war or external aggression** emergency only.
  - **Art 359:** the President may suspend the **enforcement** of Fundamental Rights (except **Art 20 and Art 21**, per the 44th Amendment).
  - The life of Lok Sabha can be extended by **one year at a time**.
- **Declared three times:** **1962** (China war), **1971** (Pakistan war) and **1975 to 1977** (internal disturbance, the only one on this ground, by Indira Gandhi). Only the **1975 Emergency** was criticised as a misuse.

### President's Rule (Art 356)

- Applied if the **President** is satisfied, on a **Governor's report or otherwise**, that the State cannot be run according to the Constitution. Art 365 also allows it when a State ignores Union directions.
- Must be approved by **both Houses within two months** by a **simple majority**.
- Period: **six months**, extendable up to **three years** at six-month intervals. After **one year**, further extension needs (i) a national emergency in force and (ii) the **Election Commission's** certificate that elections cannot be held (**44th Amendment**).
- Effect: the President assumes the State's executive functions. The **Legislature is suspended or dissolved**. Parliament makes laws for the State, and the **High Court is unaffected**.
- *S.R. Bommai v Union of India (1994)*: **judicially reviewable**. Majority must be tested on the floor. The courts can restore a dismissed government.
- **Article 355** is the duty of the Union to protect States from external aggression and internal disturbance.

:::jk President's Rule in J&K
Under the old J&K Constitution a different route applied: **Governor's Rule** under Section 92 for up to six months, and after that **President's Rule**. Governor's Rule was imposed in **2018** (after the PDP-BJP alliance broke). It was followed by President's Rule in December 2018, which lasted until the Union Territory was created in 2019.
:::

### Financial Emergency (Art 360)

- Approved by both Houses within **two months** by a **simple majority**. It continues until revoked, with no outer time limit.
- The Union can direct States to reduce **salaries** of all persons, including High Court and Supreme Court judges.
- **Never declared** so far.

:::key
**Differences to remember:** National Emergency is approved in **1 month**, by a **special majority**. President's Rule and Financial Emergency are approved in **2 months**, by a **simple majority**. The **44th Amendment** replaced "internal disturbance" with "**armed rebellion**".
:::

## Panchayati Raj {#panchayati-raj}

### Evolution

- **Balwant Rai Mehta Committee (1957):** recommended a **three-tier** system (village, block, district) with **democratic decentralisation**. Rajasthan adopted it first (**Nagaur, 2 October 1959**).
- **Ashok Mehta Committee (1977):** two-tier system.
- **G.V.K. Rao (1985)** and **L.M. Singhvi (1986)** committees: proposed constitutional status.
- **73rd Amendment Act (1992)**, in force from **24 April 1993** (**National Panchayati Raj Day**): **Part IX** (Arts 243 to 243O) and the **Eleventh Schedule** (29 subjects).

### Main provisions

- **Gram Sabha**: all adult voters in the village area (Art 243A).
- **Three tiers**: village, intermediate (block) and district. States with population **below 20 lakh** need not have the intermediate tier.
- **Direct elections** at all levels. The chairperson of a village panchayat is chosen as the State law decides.
- **Reservation:** for **SCs and STs** in proportion to their population, and **not less than one-third** of seats for **women** (many States now give 50 per cent).
- **Term: five years.** If dissolved early, election within **six months**.
- **State Election Commission** (Art 243K) conducts elections. **State Finance Commission** (Art 243I) is set up **every five years** to review finances.
- **Exemptions:** Panchayats do not apply to Nagaland, Meghalaya, Mizoram, the Scheduled Areas and certain hill areas. **PESA Act, 1996** extends them to the Fifth Schedule areas.

### Panchayats at a glance

| Tier | Head | Notes |
|---|---|---|
| **Village** | **Sarpanch** | Gram Panchayat |
| **Block** | Panchayat Samiti Pramukh | Intermediate |
| **District** | Zila Parishad Chairman | Top |

:::new Latest
Many States have increased reservation for women to **50 per cent**. **Bihar** was the first State to do so (2006).
:::

:::jk Panchayati Raj in J&K
J&K did not apply the 73rd Amendment until 2019. The **J&K Panchayati Raj Act, 1989** was the earlier law. After the **Reorganisation**, the 73rd Amendment applies. In **2020**, the Centre created **District Development Councils (DDCs)**: **one for each of the 20 districts** (10 in Jammu division and 10 in Kashmir division), each with **14 elected members**, so **280 seats** in all. The first DDC elections were held in **December 2020**. A DDC is directly elected and heads the district tier.
:::

## Urban Local Bodies {#urban-local-bodies}

### 74th Amendment Act (1992)

- In force from **1 June 1993**. Added **Part IXA** (Arts 243P to 243ZG) and the **Twelfth Schedule** (**18 subjects**).
- Three types of municipalities:
  - **Nagar Panchayat** for a transitional area.
  - **Municipal Council** for a smaller urban area.
  - **Municipal Corporation** for a larger urban area.
- **Direct elections.** Seats **reserved** for SCs, STs and not less than **one-third for women**.
- **Term: five years.** Elections within 6 months of dissolution.
- **Ward Committees** in towns with population above **3 lakh** (Art 243S).
- **District Planning Committee** (Art 243ZD) and **Metropolitan Planning Committee** (Art 243ZE).

### Other forms of urban bodies

Cantonment Boards, Town Area Committees, Notified Area Committees, Township, Port Trust and Special Purpose Agency.

### History

- **1688**: first municipal corporation in **Madras**.
- **Lord Ripon's Resolution (1882)**: the "**Magna Carta of local self-government**". Lord Ripon is called the "**Father of local self-government in India**".
- Local government is a **State subject** (Entry 5, List II).

### Panchayats and Municipalities compared

| | Panchayats | Municipalities |
|---|---|---|
| Amendment | **73rd** | **74th** |
| Part | **IX** | **IXA** |
| Schedule | **Eleventh** (29 subjects) | **Twelfth** (18 subjects) |
| Came into force | 24 April 1993 | 1 June 1993 |

:::tip
Mnemonic: **73-Panchayat-29-Eleventh** and **74-Municipality-18-Twelfth**.
:::

## Union Territories and Special Provisions {#union-territories}

### Union Territories (Part VIII, Arts 239 to 242)

- India has **8 Union Territories**: Delhi (National Capital Territory), Puducherry, Jammu and Kashmir, Ladakh, Chandigarh, Andaman and Nicobar Islands, Lakshadweep, and Dadra and Nagar Haveli and Daman and Diu (merged in January 2020).
- Administered by the **President** through an **Administrator** (Art 239). In Andaman and Nicobar, Delhi, Puducherry, J&K and Ladakh this officer is a **Lieutenant Governor**. Chandigarh has an Administrator.
- **Parliament** can make laws on any matter for a UT, including State List subjects (Art 246(4)).

### Delhi (Art 239AA)

- **69th Amendment (1991):** gave Delhi the status of **National Capital Territory** with a Legislative Assembly of **70 members** and a Council of Ministers.
- The Assembly cannot legislate on **public order, police and land**.
- In *Government of NCT of Delhi v Union of India (2018)*, the Supreme Court held that the Lieutenant Governor must act on the Council's advice, except on the three reserved subjects. In **2023** a Constitution Bench held that the elected government has control of **services**. Parliament then passed the **Government of NCT of Delhi (Amendment) Act, 2023**, which reversed this by creating the **National Capital Civil Service Authority**.

### Puducherry

Has a Legislative Assembly (Art 239A, 14th Amendment, 1962) with **33 members** (30 elected, 3 nominated).

### Jammu and Kashmir

The **Jammu and Kashmir Reorganisation Act, 2019** made J&K a Union Territory **with a Legislature**. See the [J&K unit](#accession-and-instrument) for details.

### Ladakh

A UT **without** a legislature. Leh and Kashmir (Kargil) are administered by **Autonomous Hill Development Councils** (LAHDC).

### Special provisions for some States (Arts 371 to 371J)

| Article | State | Highlight |
|---|---|---|
| **371** | Maharashtra and Gujarat | Development boards for Vidarbha, Marathwada, Saurashtra and Kutch. |
| **371A** | **Nagaland** | Parliament's laws on Naga customary law, land need the State Assembly's consent. |
| **371B** | Assam | Committee of tribal members. |
| **371C** | **Manipur** | Hill Areas Committee. |
| **371D, 371E** | **Andhra Pradesh and Telangana** | Equal opportunity in public employment. |
| **371F** | **Sikkim** | Merger in 1975. |
| **371G** | **Mizoram** | Mizo customary law and land protected. |
| **371H** | **Arunachal Pradesh** | Governor's special responsibility for law and order. |
| **371I** | Goa | |
| **371J** | **Karnataka** | Hyderabad-Karnataka region (now Kalyana Karnataka). |

### Fifth and Sixth Schedules

- **Fifth Schedule:** administration of Scheduled Areas and Scheduled Tribes in all States **except Assam, Meghalaya, Tripura and Mizoram**.
- **Sixth Schedule:** tribal areas of those four States, with **Autonomous District Councils** and Regional Councils. Ladakh has demanded Sixth Schedule status.

:::tip
**Delhi** has a Legislature but cannot legislate on **police, public order and land**. **Chandigarh** has no legislature. **Ladakh** is a UT without a legislature. The **Union Territories were reduced** from 9 to 8 after Dadra and Nagar Haveli merged with Daman and Diu in 2020.
:::

@unit Constitutional and Other Bodies

## Election Commission and Electoral System {#election-commission}

### The Election Commission of India (Art 324, Part XV)

- A **permanent constitutional body** set up on **25 January 1950** (celebrated as **National Voters' Day**). It superintends, directs and controls elections to **Parliament, State Legislatures, and the offices of President and Vice-President**. It does **not** conduct local body elections (the **State Election Commissions** do that).
- Composition: a **Chief Election Commissioner (CEC)** and such other Election Commissioners as the President fixes. Since **1993** it has been a **three-member** body.
- Decisions are taken by **majority**.
- The **CEC and ECs** are appointed under the **Chief Election Commissioner and Other Election Commissioners (Appointment, Conditions of Service and Term of Office) Act, 2023**, by the President on the recommendation of a **selection committee**: the **Prime Minister** (chair), a **Union Cabinet Minister** nominated by the PM, and the **Leader of Opposition in the Lok Sabha**. This replaced the interim order in *Anoop Baranwal v Union of India (2023)*, which had named the **CJI** instead of a Cabinet Minister.
- Term: **six years** or until age **65**, whichever is earlier.
- Removal: the **CEC** can be removed only in the manner and on the grounds of a **Supreme Court judge**. Other Election Commissioners can be removed only on the CEC's recommendation.
- **Sukumar Sen** was the first CEC. **T.N. Seshan** (1990 to 1996) made the Commission strong and brought in the **Model Code of Conduct** and the voter ID card.

### Electoral laws

| Law | Subject |
|---|---|
| **Representation of the People Act, 1950** | Electoral rolls, delimitation of constituencies, seat allocation. |
| **Representation of the People Act, 1951** | Conduct of elections, qualifications and disqualifications, election offences and disputes. |
| **Delimitation Act** | Delimitation Commission (**Art 82 and 170**). Its orders are **final** and cannot be challenged in court. |

### Features of the system

- **First past the post** (simple plurality) for the Lok Sabha and the Assemblies.
- Proportional representation by single transferable vote for the **President, Vice-President, Rajya Sabha and Legislative Councils**.
- Voting age **18 years** (61st Amendment, 1988).
- **Reserved constituencies** for SCs and STs.
- **NOTA** (None of the Above) was introduced after *PUCL v Union of India (2013)*.
- **EVMs and VVPATs**: EVMs first used on a trial basis in Kerala in **1982**. VVPATs came into wider use from 2013.
- **Model Code of Conduct**: a voluntary code, not a statute. Applies from the announcement of the election schedule.
- **Recognition of parties:** the EC recognises **national and State parties** and allots symbols.
- Disputes about the election of an MP or MLA go to the **High Court** by an **election petition**.

### Anti-defection law (Tenth Schedule)

- Added by the **52nd Amendment (1985)**. A member is disqualified if he **voluntarily gives up** membership of his party, or votes or abstains against the party whip.
- The **91st Amendment (2003)** removed the **one-third split** exception and kept the **two-thirds merger** exception.
- The **Speaker or Chairman** decides. In *Kihoto Hollohan (1992)* the Court held this decision is subject to judicial review.

### Electoral bonds

In **February 2024** (*Association for Democratic Reforms v Union of India*) a five-judge Constitution Bench held the **electoral bonds scheme unconstitutional** because it violated the voter's right to information under Art 19(1)(a). Companies' donations without limit were also struck down.

### Delimitation

- **Delimitation Commissions** were set up in 1952, 1962, 1972 and 2002.
- The **84th Amendment (2001)** froze the allocation of seats until the **first Census after 2026**.
- The **Women's Reservation Act (106th Amendment, 2023)** reserves **one-third of seats** for women in the Lok Sabha and Assemblies, but it comes into effect only **after the next Census and delimitation**.

:::jk Delimitation in J&K
The **Delimitation Commission (2020 to 2022)**, headed by Justice **Ranjana Prakash Desai**, increased the Assembly seats in J&K from **83 to 90** (Jammu 37 to 43, Kashmir 46 to 47) and, for the first time, **reserved 9 seats for Scheduled Tribes** and provided for **5 nominated members** (Kashmiri migrants and displaced persons from PoK, including women), chosen by the Lieutenant Governor. 24 seats remain vacant for Pakistan-occupied Kashmir.
:::

:::new Recent
The Commission carried out a **Special Intensive Revision (SIR)** of electoral rolls in 2025 and 2026. Read the latest Supreme Court orders before using it in an answer.
:::

:::tip
The EC does **not** conduct panchayat or municipal elections. The **Delimitation Commission's** orders cannot be questioned in any court. **Art 324** is the main article.
:::

## Public Service Commissions {#public-service-commissions}

### Union Public Service Commission (Part XIV, Arts 315 to 323)

- A constitutional body (Art 315). The first Public Service Commission was set up in **1926** (Lee Commission recommendation) and it became the **UPSC** in **1950**.
- Composition: a **Chairman** and members, appointed by the **President**. Normally **one-half** must be persons with **10 years'** government experience. The Constitution fixes no number.
- Term: **6 years** or up to **age 65**, whichever is earlier. Not eligible for reappointment.
- Removal: only by the **President**, on the ground of **misbehaviour** after an inquiry by the **Supreme Court** (Art 317), or for insolvency or other grounds specified.
- Salary and expenses are **charged on the Consolidated Fund** of India.
- Functions: conducts examinations for **All-India Services** and Central Services; advises on recruitment rules, promotions and disciplinary matters (Art 320). Its advice is **not binding** on the government.
- **Annual report** is laid before Parliament (Art 323).

### State Public Service Commission (SPSC)

- Chairman and members are appointed by the **Governor**, but they can be **removed only by the President** (for misbehaviour after a Supreme Court inquiry).
- Term: **6 years** or **age 62**, whichever is earlier.
- Reports to the **Governor**, who places it before the State Legislature.
- A **Joint State Public Service Commission** can be set up by Parliament for two or more States (Art 315).

### Commission, board and other bodies

| Body | Role |
|---|---|
| **UPSC** | Civil Services, Indian Forest Service, and other all-India exams. |
| **Staff Selection Commission** | Group B and C posts. Non-constitutional. |
| **State PSC** | State services. |

:::jk JKPSC and JKSSB
- The **Jammu and Kashmir Public Service Commission (JKPSC)** conducts the **Combined Competitive (Mains and Prelims)** for the J&K Administrative Service (**JKAS**), J&K Police Service (**JKPS**) and other gazetted posts. Its constitutional status continues under **Art 315 and 316** since 2019.
- The **Jammu and Kashmir Services Selection Board (JKSSB)** recruits non-gazetted staff: **Naib Tehsildar**, **Junior Assistant**, **Constable** and others. It is a statutory body.
:::

:::tip
UPSC members: appointed by **President**. State PSC members: appointed by the **Governor**, removed by the **President**. Retirement: **UPSC 65, SPSC 62**.
:::

## Finance Commission, CAG and the Attorney General {#finance-commission-cag-ag}

### Finance Commission (Art 280)

- Constituted by the **President every five years** (or earlier). A chairman and **four other members**.
- Recommends: the **distribution of the net proceeds of taxes** between the Union and the States; the principles governing **grants-in-aid** (Art 275); measures to **augment the Consolidated Fund** of a State to supplement the resources of **Panchayats and Municipalities** (on the basis of the State Finance Commission).
- Its recommendations are **advisory**. The government lays the report before Parliament with an **explanatory memorandum**.
- **First Finance Commission:** 1951, headed by **K.C. Neogy**.
- The **16th Finance Commission** is headed by **Dr Arvind Panagariya** and covers **2026-27 to 2030-31**.

### Comptroller and Auditor General (Arts 148 to 151)

- Head of the **Indian Audit and Accounts Department** and the "**guardian of the public purse**". Dr **Ambedkar** called the CAG "**the most important officer under the Constitution**".
- Appointed by the **President**. Term: **six years** or **age 65**, whichever is earlier. Removed in the same way as a **Supreme Court judge**.
- After retirement the CAG cannot hold any other office under the government.
- Audits all receipts and expenditure of the **Union, States and bodies** substantially financed by them. Submits reports to the President, who lays them before Parliament. The **Public Accounts Committee** examines them.
- The CAG audits **government companies** and, in some cases, **local bodies**.
- A CAG **is not** a member of the Cabinet and has no power to disallow expenditure. He only **points out irregularity**.
- **V. Narahari Rao** was the first CAG (1948).

### Attorney General of India (Art 76)

- The **first law officer** of the Government. Appointed by the **President**. He must be qualified to be a **Supreme Court judge**.
- Holds office **during the pleasure of the President**. Has the right to speak in Parliament but **not to vote**.
- He is **not** a government employee and not debarred from private practice, but he must not advise against the Government of India.
- **Solicitor General** and Additional Solicitor Generals assist (not constitutional posts).
- At the State level: the **Advocate General** (Art 165), appointed by the Governor.

:::tip
The CAG and the CEC are removed like a **Supreme Court judge**. The **UPSC Chairman** and members are removed by the **President after a Supreme Court inquiry**. The **Attorney General** serves at the **pleasure of the President**.
:::

## NITI Aayog, NHRC and Other Bodies {#other-bodies}

### Constitutional bodies (specifically mentioned in the Constitution)

| Body | Article |
|---|---|
| Election Commission | 324 |
| UPSC, State PSCs | 315 |
| Finance Commission | 280 |
| **GST Council** | 279A |
| **National Commission for Scheduled Castes** | 338 |
| **National Commission for Scheduled Tribes** | 338A |
| **National Commission for Backward Classes** | 338B (102nd Amendment, 2018) |
| **Special Officer for Linguistic Minorities** | 350B |
| CAG | 148 |
| Attorney General | 76 |
| Advocate General | 165 |

### Statutory bodies

- **NITI Aayog** (National Institution for Transforming India): set up on **1 January 2015** by a Cabinet resolution (an **extra-constitutional, non-statutory** body). Chair: **Prime Minister**. It replaced the **Planning Commission** (1950). It has a Governing Council of all CMs and LGs.
- **National Human Rights Commission (NHRC):** set up under the **Protection of Human Rights Act, 1993**. Chair is a **former Chief Justice of India**. Recommendations are **advisory**. State Human Rights Commissions have a chair who was a **High Court Chief Justice**.
- **Central Information Commission (CIC):** under the **Right to Information Act, 2005**. Appointed by the President. Chaired by the **Chief Information Commissioner**.
- **Central Vigilance Commission (CVC):** statutory since **2003**, set up in **1964** on the **Santhanam Committee**'s advice. Advises on corruption in Central government.
- **Lokpal and Lokayuktas Act, 2013:** Lokpal is an anti-corruption ombudsman. The Chair is a former CJI or Supreme Court judge. It covers the **Prime Minister** with some limits. **Justice P.C. Ghose** was the first Lokpal (2019).
- **National Green Tribunal (NGT):** under the **NGT Act, 2010**. Headquarters in **Delhi**. It is a specialised body for environmental disputes and follows the principles of natural justice rather than the Code of Civil Procedure.
- **Central Bureau of Investigation (CBI):** created in 1963. Not statutory, derived from the **Delhi Special Police Establishment Act, 1946**.
- **National Investigation Agency (NIA):** NIA Act, 2008, after the Mumbai attacks.
- **Competition Commission of India (CCI):** Competition Act, 2002.
- **SEBI** (1992) and **TRAI** (1997) are other statutory regulators.

### Co-operative societies

The **97th Amendment (2011)** gave constitutional status to co-operative societies (Right to form co-operatives under Art 19(1)(c), DPSP Art 43B, and Part IXB). In *Union of India v Rajendra N. Shah (2021)* the Supreme Court held **Part IXB** valid only for **multi-State** co-operative societies. It was struck down for others because the Amendment lacked **ratification by half of the States**.

:::tip
**NITI Aayog** and **Planning Commission** are neither constitutional nor statutory. The **NCBC** got **constitutional status** by the **102nd Amendment (2018)**, as Art 338B. The **NHRC** is a **statutory** body.
:::

:::note
Some of the above articles and amendments are often confused in exams. Check the official bare Act when preparing for a mains answer.
:::

@unit Jammu and Kashmir

## Accession and the Instrument of Accession {#accession-and-instrument}

### Before 1947

- Jammu and Kashmir was a **princely State** under the **Dogra** dynasty. By the **Treaty of Amritsar (1846)** the British sold the Valley and surrounding areas to **Gulab Singh** for 75 lakh rupees. He became the first Maharaja.
- The last ruler was **Maharaja Hari Singh** (1925 to 1949).
- The **Indian Independence Act, 1947** ended British paramountcy and allowed princely States to **accede to India or Pakistan**.

### Events of 1947

| Date | Event |
|---|---|
| **Aug 1947** | Hari Singh signs a **Standstill Agreement** with Pakistan. India does not sign one. |
| **22 Oct 1947** | Tribal raiders from Pakistan enter the State. |
| **26 Oct 1947** | The Maharaja signs the **Instrument of Accession** to India. |
| **27 Oct 1947** | **Lord Mountbatten**, Governor-General, accepts it. Indian troops are flown to Srinagar. |
| **1 Jan 1948** | India takes the matter to the **UN Security Council**. |
| **1 Jan 1949** | **Ceasefire** (the Line of Control later follows the **Karachi Agreement, 1949** and the **Simla Agreement, 1972**). |

- The Instrument gave India control only of **defence, external affairs and communications**. It was the **same** as the one signed by other princely States.
- Mountbatten's letter said the people would be consulted once the law and order was restored. This is the "**reference to the people**" India has cited.
- **Sheikh Abdullah** became the head of the emergency administration in **October 1947** and Prime Minister in **1948**.

### Key points

- **Art 1** lists J&K as one of the States of India since 1950.
- Maharaja Hari Singh stepped aside in **1949**, and his son **Karan Singh** became **Regent**, then **Sadr-i-Riyasat** (1952).
- The **Constituent Assembly of J&K** was elected in **1951**. It adopted the **Constitution of J&K** on **17 November 1956**, which came into force on **26 January 1957**.

:::tip
The **Instrument of Accession** was signed on **26 October 1947** and accepted on **27 October 1947**. This is a favourite exam trap.
:::

## Article 370 and Article 35A {#article-370-and-35a}

### What Article 370 said

**Art 370** was in **Part XXI** ("Temporary, Transitional and Special Provisions") of the Constitution, adopted on **17 October 1949** on the initiative of **N. Gopalaswami Ayyangar**, a Minister without portfolio in the Union government.

- Parliament's power to make laws for J&K was **limited** to the Union and Concurrent List matters in the Instrument of Accession, and others only with the **concurrence of the State government**.
- Art 1 and Art 370 applied automatically. The **President** could extend other provisions by an order, with the State government's concurrence.
- Art 370(3): the President could **declare it inoperative** only on the recommendation of the **Constituent Assembly of J&K**, which had ceased to exist in **1957**.

### How it was eroded

| Year | Step |
|---|---|
| **1952** | **Delhi Agreement** between Nehru and Sheikh Abdullah. Hereditary monarchy ended. Residents became citizens of India. |
| **1953** | Sheikh Abdullah dismissed and arrested. |
| **1954** | **Constitution (Application to J&K) Order**, which introduced **Art 35A** and extended Union jurisdiction and Fundamental Rights. |
| **1964/65** | **Titles** "Sadr-i-Riyasat" and "Prime Minister" changed to **Governor** and **Chief Minister**. Arts 356 and 357 extended. |
| **1975** | **Indira-Sheikh Accord**. Sheikh Abdullah returned as Chief Minister. |

### Article 35A

- Added by the **Presidential Order of 1954** under Art 370(1)(d). It was **not** passed under the amendment procedure of Art 368 of the Constitution.
- It gave the J&K Legislature the power to define "**permanent residents**" and give them special rights in **government jobs, property, scholarships and settlement**. It dated back to the **State Subject** notifications of the Maharaja in **1927 and 1932**.
- It was criticised for **excluding women who married non-residents** (their rights lapsed). The J&K High Court held in **2002** (*State v Dr Susheela Sawhney*) that the daughter's rights do not lapse.

### Special features of the old J&K

- Its **own Constitution (1957)** and **flag**.
- A **six-year** Assembly term.
- **Emergency under Art 360** could not be proclaimed. A **national emergency** needed the State's concurrence if on grounds of internal disturbance.
- **Directive Principles** did not apply and **no Union law on State matters** without concurrence.
- **Residuary powers** were with the State.

:::key
Art 370(1)(c) said Art 1 and Art 370 apply to J&K. **Everything else** needed a **Presidential Order** with the State government's concurrence. This is the clause used in 2019.
:::

## The 5 August 2019 Changes {#august-2019}

On **5 August 2019**, the Government of India rendered Art 370 inoperative and re-organised the State. It happened in **four steps**:

1. **Constitution (Application to Jammu and Kashmir) Order, 2019 (C.O. 272)**, issued by the **President** on **5 August 2019** with the **Governor's concurrence** (J&K was then under **President's Rule**, so the Governor's consent was treated as the State government's). It applied **all provisions** of the Constitution to J&K and amended **Art 367** so that "**Constituent Assembly**" in Art 370(3) was read as "**Legislative Assembly**".
2. The **Rajya Sabha** passed the recommendation (a **statutory resolution**) to the President to declare **Art 370(3)** inoperative, followed by the **Lok Sabha** (**6 August**).
3. **C.O. 273 (6 August 2019):** the President declared that, with effect from **6 August 2019**, **all clauses of Art 370 cease to operate** except **clause 1**, which continued to apply the Constitution to J&K.
4. **Jammu and Kashmir Reorganisation Act, 2019:** passed by both Houses on **5 and 6 August 2019**, with the Presidential assent on **9 August**. It came into force on **31 October 2019**, the birth anniversary of **Sardar Patel**.

### Result

- J&K became a **Union Territory with a Legislature** (the first of its kind after Puducherry and Delhi).
- **Ladakh** became a **separate Union Territory without a Legislature**.
- **Art 35A** ceased to exist. Hundreds of Central laws were applied to J&K.
- Reservation for **SC/ST/OBC** and the **Right to Education** now apply in J&K.

### Supreme Court verdict (11 December 2023)

In **In Re: Article 370 of the Constitution**, a five-judge Constitution Bench headed by **CJI D.Y. Chandrachud** unanimously upheld the abrogation:

- Art 370 was a **temporary provision**.
- J&K did **not retain sovereignty** after joining India. The Instrument of Accession and the Maharaja's Proclamation of 1948 made the whole State part of India.
- The President could issue **C.O. 272** and **C.O. 273**. The use of Art 370(1)(d) was valid.
- The Court did not decide on the validity of the **Reorganisation** of the State into two UTs in detail, but it noted that the **Solicitor General** had said **statehood will be restored**. It directed the **Election Commission** to hold Assembly elections by **30 September 2024** and asked for statehood to be restored "**as soon as possible**".
- It upheld **Ladakh** as a UT. It left the question of whether Parliament can turn a **State into a UT** open for a later case.
- It recommended a **Truth and Reconciliation Commission** to look into human rights violations since the 1980s.

:::tip
The Constitution Bench of 2023 was headed by **Chandrachud** and had **Justices Kaul, Khanna, Gavai and Surya Kant**. Remember "**C.O. 272, then C.O. 273**".
:::

## J&K Today: UT Structure {#jk-today}

### Reorganisation Act, 2019: key provisions

- **Lieutenant Governor** (Art 239 and 239A) appointed by the President as head of the UT.
- **Legislative Assembly** of **114** seats: **90** are filled by election after the 2022 delimitation and **24** are kept vacant for Pakistan-occupied Kashmir. The LG can also **nominate 5** members.
- **Ministers** limited to **10 per cent** of the strength of the Assembly.
- **Public order and police** are with the **Lieutenant Governor**, as in Delhi. The LG has a **discretion** and **business rules**. The **July 2024** amendments to the **Business Rules** gave the LG more power over **transfers of All India Service officers**, public order and prosecution.
- **Four Rajya Sabha** seats and **five Lok Sabha seats** (Baramulla, Srinagar, Anantnag-Rajouri, Udhampur, Jammu). **Ladakh** has one Lok Sabha seat.
- **High Court** of J&K and Ladakh is common.
- Several State bodies, such as the **State Human Rights Commission** and the **Accountability Commission**, were abolished, and Central laws now apply.
- The **Legislative Council** was abolished.

### Domicile law

- **J&K Grant of Domicile Certificate (Procedure) Rules, 2020** (reservation under **Art 16**): a person is a **domicile** if they have lived in J&K for **15 years**, or studied for **7 years** and appeared in the **Class 10 or 12** exams in the UT, or are registered as a **migrant**, and for the children of Central government officials who served for **10 years**.
- It applies to **jobs** and **land ownership** (any Indian can now buy non-agricultural land).
- **Daughters** married outside no longer lose their rights.

### Elections of 2024

- Assembly elections were held in **three phases** (18 September, 25 September and 1 October 2024). It was the **first** in the Union Territory and the first since **2014**. Results on **8 October 2024**.
- The **National Conference** led an alliance with the **Congress** and formed the government. **Omar Abdullah** took oath as Chief Minister on **16 October 2024**.
- **Sakina Itoo** was a Cabinet Minister. The **BJP** is the main opposition party.
- The **Lieutenant Governor** is **Manoj Sinha** (since August 2020). In September 2026 he went on leave and the Delhi LG, **V.K. Saxena**, held additional charge. Check for the latest.

### Statehood

Statehood was promised by the Union Home Minister in Parliament in **2019** and in the Supreme Court in **2023**. The J&K Assembly passed a **resolution** seeking restoration in **October 2024**. Statehood has **not** been restored as of the time of writing.

:::new Where things stand
As of **October 2026** J&K remains a **Union Territory**. Check the news before writing an exam answer on statehood.
:::

:::jk Why it matters for the exam
Expect questions on **Art 370 and 35A**, **C.O. 272 and 273**, the **Reorganisation Act, 2019**, **domicile rules**, the **number of seats** and the **2023 Supreme Court verdict**. JKSSB and JKPSC papers often ask for the **date** and the **text** of the provisions.
:::

Practise with our free test: [Polity Foundation Mock Test for JKPSC](/polity-foundation-mock-test-jkpsc).

@unit Quick Revision

## Landmark Supreme Court Cases {#landmark-cases}

| Case | Year | Principle |
|---|---|---|
| **Shankari Prasad v Union of India** | 1951 | Parliament can amend Fundamental Rights under Art 368. |
| **Sajjan Singh v State of Rajasthan** | 1965 | Same view as Shankari Prasad. |
| **Golaknath v State of Punjab** | 1967 | Fundamental Rights cannot be amended. Overruled later. |
| **Kesavananda Bharati v State of Kerala** | 1973 | **Basic structure doctrine** (7:6). Parliament can amend any part but not destroy the basic structure. |
| **Indira Gandhi v Raj Narain** | 1975 | Free and fair elections are part of the basic structure. |
| **Minerva Mills v Union of India** | 1980 | Balance between Fundamental Rights and DPSP is basic structure. Limited amending power is itself basic. |
| **Maneka Gandhi v Union of India** | 1978 | Art 21 needs a **fair, just and reasonable** procedure. Arts 14, 19 and 21 are linked. |
| **A.K. Gopalan v State of Madras** | 1950 | Narrow reading of Art 21 (overruled by Maneka Gandhi). |
| **A.D.M. Jabalpur v Shivkant Shukla** | 1976 | The *Habeas Corpus* case. Overruled by *Puttaswamy* in 2017. |
| **Indra Sawhney v Union of India** | 1992 | **Mandal case.** 27 per cent OBC reservation upheld. **50 per cent ceiling.** Creamy layer excluded. |
| **S.R. Bommai v Union of India** | 1994 | President's Rule is judicially reviewable. Federalism and secularism are basic features. |
| **Vishaka v State of Rajasthan** | 1997 | Guidelines on sexual harassment at the workplace. |
| **L. Chandra Kumar v Union of India** | 1997 | Tribunals are subject to High Court review. Judicial review is basic structure. |
| **Kihoto Hollohan v Zachillhu** | 1992 | Tenth Schedule valid. Speaker's decision is reviewable. |
| **Lily Thomas v Union of India** | 2013 | A convicted legislator (2 years or more) is disqualified immediately. |
| **Shreya Singhal v Union of India** | 2015 | Section 66A of the IT Act struck down. |
| **Supreme Court Advocates-on-Record v Union of India** | 1993 and 2015 | Collegium system. NJAC struck down (2015). |
| **K.S. Puttaswamy v Union of India** | 2017 | **Right to privacy** is a Fundamental Right. |
| **Navtej Singh Johar v Union of India** | 2018 | Section 377 decriminalised for consenting adults. |
| **Joseph Shine v Union of India** | 2018 | Adultery law struck down. |
| **Supriyo v Union of India** | 2023 | Same-sex marriage: no right to marry, left to Parliament. |
| **Anuradha Bhasin v Union of India** | 2020 | Internet access can be restricted only by a reasoned, proportionate order. |
| **In re: Article 370** | 2023 | Abrogation of Art 370 upheld. |
| **Association for Democratic Reforms (Electoral Bonds)** | 2024 | Electoral bonds scheme unconstitutional. |
| **Sita Soren v Union of India** | 2024 | Bribery is not protected by parliamentary privilege. |

## Key Articles Cheat Sheet {#key-articles}

| Article | Subject |
|---|---|
| **1** | India, that is Bharat, a Union of States |
| **3** | Formation of new States |
| **5 to 11** | Citizenship |
| **12 to 35** | Fundamental Rights (Part III) |
| **14** | Equality before law |
| **15, 16** | No discrimination, equality in public employment |
| **17** | Abolition of untouchability |
| **19** | Six freedoms |
| **21** | Life and personal liberty |
| **21A** | Right to education (6 to 14 years) |
| **23, 24** | Ban on forced labour, child labour (below 14 in hazardous work) |
| **25 to 28** | Freedom of religion |
| **32** | Constitutional remedies |
| **36 to 51** | DPSP (Part IV) |
| **44** | Uniform Civil Code |
| **48A** | Environment |
| **50** | Separation of judiciary from executive |
| **51A** | Fundamental Duties (Part IVA) |
| **52, 53** | President |
| **61** | Impeachment of the President |
| **63** | Vice-President |
| **74** | Council of Ministers |
| **75** | Other provisions about ministers |
| **79** | Parliament |
| **110** | Money Bill |
| **112** | Budget |
| **123** | President's ordinance |
| **124** | Supreme Court |
| **126** | Acting Chief Justice |
| **143** | Advisory jurisdiction |
| **148** | CAG |
| **153** | Governor |
| **163** | Governor aided by Council of Ministers |
| **169** | Legislative Council |
| **213** | Governor's ordinance |
| **214** | High Courts |
| **226** | High Court writs |
| **243** | Panchayats |
| **243P** | Municipalities |
| **245 to 255** | Legislative relations |
| **263** | Inter-State Council |
| **280** | Finance Commission |
| **300A** | Right to property |
| **312** | All-India Services |
| **315** | PSCs |
| **324** | Election Commission |
| **338** | NCSC |
| **352** | National Emergency |
| **356** | President's Rule |
| **360** | Financial Emergency |
| **368** | Amendment |

### Fundamental Rights (six groups)

1. Right to **Equality** (Arts 14 to 18)
2. Right to **Freedom** (Arts 19 to 22)
3. Right against **Exploitation** (Arts 23 and 24)
4. Right to **Freedom of Religion** (Arts 25 to 28)
5. **Cultural and Educational** Rights (Arts 29 and 30)
6. Right to **Constitutional Remedies** (Art 32)

The **Right to Property** (Art 31) was removed from Part III in 1978 (44th Amendment) and is now a legal right under **Art 300A**.

## Numbers to Remember {#numbers}

| Fact | Number |
|---|---|
| Original Articles / Parts / Schedules | **395 / 22 / 8** |
| Present Articles / Parts / Schedules | **About 470 / 25 / 12** |
| Time taken to frame | **2 years, 11 months, 18 days** |
| Members of the Constituent Assembly | **389** (after Partition: **299**) |
| First meeting / Adoption / Commencement | **9 Dec 1946 / 26 Nov 1949 / 26 Jan 1950** |
| Chairman of the Drafting Committee | **Dr B.R. Ambedkar** |
| Lok Sabha / Rajya Sabha | **543 / 245** (maximum 550 / 250) |
| Minimum age: Lok Sabha, Rajya Sabha, President | **25 / 30 / 35** |
| Minimum age of a Governor | **35** |
| Term of the President / Lok Sabha / Rajya Sabha member | **5 / 5 / 6 years** |
| Judges of the Supreme Court | **34** (CJI plus 33) |
| Retirement: Supreme Court / High Court | **65 / 62** |
| Fundamental Duties | **11** |
| Subjects: Union / State / Concurrent | **100 / 61 / 52** |
| Eleventh Schedule / Twelfth Schedule | **29 / 18** |
| Maximum ministers | **15 per cent** of the House |
| Time to approve National Emergency | **1 month** |
| Time to approve President's Rule | **2 months** |
| Maximum duration of President's Rule | **3 years** |
| Number of High Courts | **25** |
| Number of States / UTs | **28 / 8** |
| J&K Assembly | **90 elected** (plus 5 nominated, 24 kept vacant) |

### Constitutional Amendments to remember

| Amendment | Subject |
|---|---|
| **1st (1951)** | Ninth Schedule. Reasonable restrictions on speech. |
| **7th (1956)** | Reorganisation of States. |
| **42nd (1976)** | "Mini Constitution". Socialist, Secular, Integrity added. Fundamental Duties. |
| **44th (1978)** | Right to property removed from Part III. Safeguards on Emergency. |
| **52nd (1985)** | Anti-defection law. |
| **61st (1988)** | Voting age 21 to 18. |
| **73rd and 74th (1992)** | Panchayats and Municipalities. |
| **86th (2002)** | Right to education, Art 21A. |
| **91st (2003)** | Council of ministers size, anti-defection tightened. |
| **101st (2016)** | GST. |
| **102nd (2018)** | National Commission for Backward Classes. |
| **103rd (2019)** | 10 per cent EWS reservation (upheld in *Janhit Abhiyan*, 2022). |
| **104th (2019)** | SC/ST seat reservation extended to 2030. Anglo-Indian nomination ended. |
| **106th (2023)** | Women's reservation. |

## Current Office-Holders {#office-holders}

:::note As of October 2026
Offices change. Check each name before using it in a written answer.
:::

| Office | Name |
|---|---|
| **President** | **Droupadi Murmu** |
| **Vice-President** | **C.P. Radhakrishnan** |
| **Prime Minister** | **Narendra Modi** |
| **Chief Justice of India** | **Surya Kant** |
| **Lok Sabha Speaker** | **Om Birla** |
| **Leader of Opposition (Lok Sabha)** | **Rahul Gandhi** |
| **Chief Election Commissioner** | **Gyanesh Kumar** |
| **Chair, 16th Finance Commission** | **Arvind Panagariya** |
| **Chief Minister of J&K** | **Omar Abdullah** |
| **Lieutenant Governor of J&K** | **Manoj Sinha** (on leave in September 2026) |

:::mem Memory aid
**P**resident, **V**ice-President, **P**M, **C**JI, **S**peaker: five names that come up in nearly every GK paper. Revise them the week before the exam.
:::

## Keep Practising {#practise}

The best way to test these notes is to attempt questions. Try the free [Polity Foundation Mock Test](/polity-foundation-mock-test-jkpsc), read the [Prime Minister notes](/prime-minister-of-india-complete-notes-with-15-pyqs-upsc-jkssb-jkpsc), or join our Telegram channel for daily updates.
`,
};
