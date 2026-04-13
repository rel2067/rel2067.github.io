// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
let globalLevel = localStorage.getItem('lr_level') || 'beginner';
let openArticleId = null;
const PER_PAGE = 6;
const currentPage = { browse: 1 };

// ═══════════════════════════════════════════════════════
// EDITIONS
// ═══════════════════════════════════════════════════════
const editions = [
  {
    number: 1,
    label: "Edition 1",
    date: "April 2026",
    articleIds: [5, 1, 2, 3, 4]
  }
];

// ═══════════════════════════════════════════════════════
// ARTICLES DATA
// specialty is always an array
// ═══════════════════════════════════════════════════════
const articles = [

  {id:1, specialty:["Pharmacology", "Basic Science"], year:"2006", date:"Sep 2006",
    takeaway:"A topical drug that bypasses a broken tanning receptor can chemically induce protective pigmentation — and may reduce UV-related skin cancer risk.",
    title:"Topical drug rescue strategy and skin protection based on the role of Mc1r in UV-induced tanning",
    journal:"Nature", journalShort:"Nature",
    volume:"443:340–344",
    doi:"10.1038/nature05098", sourceUrl:"https://www.nature.com/articles/nature05098",
    authors:"D'Orazio JA, Nobuhisa T, Cui R, Arya M, Spry M, Wakamatsu K, Igras V, Kunisada T, Granter SR, Nishimura EK, Ito S, Fisher DE",
    tags:[{label:"Pharmacology",cls:"blue"},{label:"Basic Science Study",cls:"green"}], isNew:false,
    keyPoints:[
      "UV light triggers MSH release from keratinocytes, which normally signals melanocytes to produce protective pigment via the MC1R receptor",
      "Many fair-skinned individuals carry MC1R variants that block this signal, leaving them unable to tan in response to UV exposure",
      "Topical forskolin — a cyclic AMP agonist — restored eumelanin production in MC1R-deficient mice without any UV exposure",
      "Chemically induced pigmentation reduced UV-associated cutaneous DNA damage and tumor development in cancer-prone mice",
      "These findings suggest a potential topical strategy to induce protective tanning in individuals who cannot do so naturally"
    ],
    summaries:{
      beginner:"Sunburn and skin cancer are far more common in fair-skinned people, and scientists have long suspected that the inability to tan plays a central role. When skin is exposed to UV light, it normally responds by producing melanin — the dark pigment that acts as a natural sunscreen. This process depends on a molecular chain reaction: UV light prompts skin cells to release a hormone called MSH, which binds to a receptor called MC1R on pigment-producing cells, triggering melanin production. Many people with red or blonde hair have faulty versions of MC1R that break this chain. Researchers set out to ask whether there was a way to chemically restart the process, bypassing the broken receptor entirely. Working in mice engineered to have defective MC1R, they applied a compound called forskolin directly to the skin. Forskolin activates a signaling molecule — cyclic AMP — that sits downstream of the MC1R receptor, essentially skipping the broken step. The result was striking: the treated mice developed deep, eumelanin-rich tanning without any UV exposure at all. More importantly, this chemically induced pigmentation meaningfully reduced UV-caused DNA damage and slowed tumor development in cancer-prone animals. The findings point toward the possibility of a topical drug that could give sun-protective pigmentation to people who cannot tan naturally.",
      intermediate:"This study investigated whether pharmacological activation of the cyclic AMP (cAMP) pathway could restore protective melanin production in mice with loss-of-function variants of the melanocortin 1 receptor (MC1R), a common genetic trait in fair-skinned, UV-sensitive individuals. UV irradiation was confirmed to induce MSH expression in keratinocytes but failed to stimulate pigmentation in Mc1r e/e mice, which lack functional MC1R. Topical application of forskolin — a direct adenylyl cyclase activator that elevates intracellular cAMP — rescued eumelanin production in these mice independent of UV exposure, demonstrating that the downstream pigmentation machinery remained intact despite defective receptor signaling. This chemically induced tanning was then tested for functional protection in xeroderma pigmentosum complementation group C (XPC)-deficient mice, a model of extreme UV susceptibility. Forskolin-treated animals showed significantly reduced cutaneous DNA damage and delayed tumor formation under chronic UV exposure. The study establishes that MC1R-independent cAMP activation is sufficient to drive protective pigmentation, suggesting that small-molecule topical agents could provide sun protection for individuals with nonfunctional MC1R variants.",
      pro:"This study addressed a mechanistic gap in UV photoprotection by asking whether cAMP pathway activation downstream of MC1R could reconstitute eumelanin production in a genetically defined mouse model of impaired tanning. Mc1r e/e mice — carrying an inactivating MC1R allele analogous to human red/blonde hair variants — failed to mount a pigmentation response to UV despite normal keratinocyte-derived MSH induction, confirming that the defect is receptor-level rather than ligand-level. Topical forskolin, an adenylyl cyclase agonist that bypasses MC1R to directly elevate intracellular cAMP, rescued eumelanin deposition in Mc1r e/e mice without UV, establishing proof-of-concept for receptor-independent pigmentation rescue. Functional endpoints in XPC-deficient mice — a model with severely compromised nucleotide excision repair and consequent UV hypersensitivity — demonstrated that forskolin-induced pigmentation conferred meaningful reductions in cyclobutane pyrimidine dimer formation and delayed UV-driven tumor onset under chronic irradiation protocols. These data mechanistically decouple tanning from UV exposure and define a pharmacological strategy — topical small-molecule cAMP agonism — as a candidate chemopreventive approach targeting MC1R loss-of-function, which is one of the most prevalent genetic risk factors for cutaneous melanoma in populations of European ancestry."
    },
    context:"MC1R loss-of-function variants are among the most common genetic risk factors for melanoma and non-melanoma skin cancer in fair-skinned populations, yet no approved topical strategy exists to restore protective pigmentation in affected individuals. This study provides the first demonstration that pharmacological cAMP activation can substitute for defective MC1R signaling to generate photoprotective eumelanin, opening a credible therapeutic avenue that has influenced ongoing work on MC1R-targeted skin cancer prevention.",
    limitations:"All experiments were conducted in murine models; the pharmacokinetics, safety, and pigmentation efficacy of topical forskolin in human skin have not been established in this study. The XPC-deficient mouse represents an extreme model of UV susceptibility that may not accurately reflect the cancer risk dynamics in the broader fair-skinned human population. Long-term safety and the reversibility of chemically induced pigmentation were not evaluated."
  },

  {id:2, specialty:["Basic Science"], year:"1961", date:"Oct 1961",
    takeaway:"Nirenberg and Matthaei's cell-free experiment cracked open the genetic code, demonstrating for the first time that RNA sequences directly dictate which amino acids are built into proteins.",
    title:"The dependence of cell-free protein synthesis in E. coli upon naturally occurring or synthetic polyribonucleotides",
    journal:"Proceedings of the National Academy of Sciences", journalShort:"PNAS",
    volume:"47(10):1588–1602",
    doi:"10.1073/pnas.47.10.1588", sourceUrl:"https://www.pnas.org/doi/10.1073/pnas.47.10.1588",
    authors:"Nirenberg MW, Matthaei JH",
    tags:[{label:"Basic Science",cls:"blue"},{label:"Basic Science Study",cls:"green"}], isNew:false,
    keyPoints:[
      "Nirenberg and Matthaei developed a cell-free E. coli system capable of synthesizing proteins from added RNA templates",
      "Synthetic polyuridylic acid (poly-U RNA) directed the incorporation of phenylalanine — and only phenylalanine — into protein chains",
      "This established that UUU (a string of uracil bases) codes for phenylalanine, the first codon-amino acid assignment ever decoded",
      "The experiment proved that the sequence of bases in RNA directly determines the sequence of amino acids in proteins",
      "This work launched the systematic decipherment of the full genetic code, earning Nirenberg a share of the 1968 Nobel Prize in Physiology or Medicine"
    ],
    summaries:{
      beginner:"By 1961, scientists knew that DNA held the blueprint of life and that proteins were the molecular machines that carried out its instructions — but the language connecting them was completely unknown. How did a strand of DNA tell a cell which amino acids to string together into a protein? Nirenberg and Matthaei devised a beautifully simple experiment to find out. They created a cell-free soup from bacterial cells — essentially all the protein-building machinery of a living cell, without the cell itself. Into this soup they added a synthetic strand of RNA made entirely of one repeated unit: uracil. This artificial message, called poly-U, had no natural counterpart, but the cellular machinery treated it like a real instruction. The result was a protein chain made up entirely of one amino acid: phenylalanine. The conclusion was both elegant and revolutionary — a sequence of three uracil bases in RNA codes specifically for phenylalanine. It was the first word of the genetic code ever read. This single experiment broke open a field, launching a global race to decode every codon, and ultimately revealing the complete molecular dictionary that all living things use to translate genes into proteins.",
      intermediate:"In 1961, the mechanism by which nucleic acid sequence information is translated into protein sequence remained unknown. Nirenberg and Matthaei used an E. coli cell-free translation system — containing ribosomes, transfer RNAs, and all necessary enzymatic factors — to test whether exogenous RNA could template protein synthesis. Addition of synthetic polyuridylic acid (poly-U) to this system produced a polypeptide composed exclusively of phenylalanine, demonstrating that UUU functions as a codon specifying phenylalanine. Critically, this result held regardless of the cellular origin of the protein-synthetic machinery, confirming a universal decoding mechanism. The study established the first codon-amino acid correspondence and validated the general principle that RNA base sequence directly encodes amino acid sequence. It set the methodological and conceptual foundation for the systematic decoding of the complete 64-codon genetic code accomplished over the following years.",
      pro:"This landmark study established the experimental framework for genetic code decipherment by exploiting an E. coli cell-free translation system to interrogate the coding capacity of defined RNA sequences. Nirenberg and Matthaei demonstrated that cell-free extracts — containing endogenous ribosomes, aminoacyl-tRNA synthetases, tRNAs, and translation factors — retained template-dependent protein synthesis activity when supplemented with exogenous RNA. Using synthetic polyuridylic acid as the sole mRNA template, they showed exclusive incorporation of radiolabeled phenylalanine into acid-insoluble polypeptide, establishing UUU as the codon for phenylalanine — the first codon-amino acid pairing experimentally determined. Control experiments with poly-A and poly-C revealed distinct incorporation patterns, indicating template specificity rather than nonspecific stimulation. The work refuted prevailing uncertainty about whether RNA sequence was truly sufficient to specify amino acid identity and provided the definitive experimental tool — cell-free translation with synthetic polynucleotides — that Nirenberg, Khorana, and colleagues subsequently deployed to decode all 64 codons. Nirenberg received a share of the 1968 Nobel Prize in Physiology or Medicine for this achievement."
    },
    context:"At the time of publication, the central dogma — that genetic information flows from DNA to RNA to protein — was accepted in outline but its molecular mechanics were almost entirely opaque. This experiment provided the first empirical entry point into codon-amino acid relationships and catalyzed the complete decipherment of the genetic code within five years, fundamentally transforming biology, medicine, and our understanding of heredity itself.",
    limitations:"The study used a bacterial cell-free system, and the universality of the code across all organisms — while subsequently confirmed — was not directly demonstrated here. Poly-U is an artificial, homopolymeric template with no natural counterpart, so this experiment addressed only the simplest possible codon rather than the mixed-sequence coding found in real genes. The mechanistic details of ribosome function and aminoacyl-tRNA recognition remained to be established by later work."
  },

  {id:3, specialty:["Pharmacology", "Diseases / Pathology"], year:"2025", date:"May 2025",
    takeaway:"Physicians designed and delivered a patient-specific CRISPR base-editing therapy for a dying infant with a rare metabolic disease — in just six months — marking a new era for personalized genetic medicine.",
    title:"Patient-Specific In Vivo Gene Editing to Treat a Rare Genetic Disease",
    journal:"New England Journal of Medicine", journalShort:"N Engl J Med",
    volume:"392(22):2235–2243",
    doi:"10.1056/NEJMoa2504747", sourceUrl:"https://www.nejm.org/doi/10.1056/NEJMoa2504747",
    authors:"Musunuru K, Ahrens-Nicklas RC, Gazzara MR, Hoshino A, Leonard CJ, Sabatini MD, Shenker JI, Sherrill EK, Urnov FD, Zuccaro MV, Kleinstiver BP, Ghosh S",
    tags:[{label:"Pharmacology",cls:"blue"},{label:"Case Study",cls:"green"}], isNew:true,
    keyPoints:[
      "A neonate was diagnosed with severe carbamoyl-phosphate synthetase 1 (CPS1) deficiency, a urea cycle disorder carrying ~50% early-infant mortality",
      "A patient-specific adenine base editor delivered via lipid nanoparticles was custom-designed and manufactured in under six months",
      "After two infusions at ages 7 and 8 months, the patient tolerated increased dietary protein and required only half the prior dose of nitrogen-scavenger medication",
      "No serious adverse events were observed despite concurrent viral illnesses during the treatment period",
      "This represents the first reported in vivo CRISPR-based therapy designed and delivered for a single patient's unique mutation"
    ],
    summaries:{
      beginner:"Every so often, a case in medicine changes what we believe is possible. This is one of them. A newborn was diagnosed with a disease called CPS1 deficiency — a severe disorder of the urea cycle, the body's system for eliminating toxic ammonia from protein breakdown. Without treatment, the ammonia builds up and damages the brain. About half of affected infants do not survive their first year. Standard management involves severely restricting dietary protein and using drugs to help excrete nitrogen, but these measures are inadequate for severe cases. Faced with a mutation that had never been treated before, a team of physicians and scientists at Children's Hospital of Philadelphia and the University of Pennsylvania took an extraordinary step: they designed a custom gene-editing therapy specifically for this one patient, from scratch, in just six months. The therapy used a CRISPR-based tool called a base editor, delivered in lipid nanoparticles — the same type of carrier used in COVID-19 vaccines — to correct the specific DNA typo in the patient's liver cells. After two infusions, the infant was able to eat more protein and needed far less medication to control ammonia levels. No serious side effects occurred. This single case, while not a clinical trial, signals that the era of truly personalized genetic medicine — designed for one patient's exact mutation — may be arriving.",
      intermediate:"This n-of-1 case report describes the development and first clinical application of a patient-specific in vivo adenine base editing therapy for a neonate with severe CPS1 deficiency caused by a private loss-of-function mutation. CPS1 catalyzes the committed step of the hepatic urea cycle; complete deficiency leads to hyperammonemia, neurological injury, and early death. After regulatory approval was obtained, the patient received two infusions of a lipid nanoparticle (LNP)-delivered adenine base editor (k-abe) at approximately 7 and 8 months of age. Preclinical validation was performed using a Rosa26 knock-in mouse model harboring the patient-specific CPS1 Q335X variant and primary human hepatocytes. In the 7 weeks following the initial infusion, the patient tolerated increased protein intake and achieved a reduction in nitrogen-scavenger medication to approximately half the baseline dose. Plasma ammonia, glutamine, and liver enzyme levels were monitored continuously. No serious adverse events were attributed to treatment, including through concurrent viral illnesses. This case represents the first demonstration that a bespoke in vivo CRISPR therapy can be developed and delivered for an individual patient's unique pathogenic variant within a clinically relevant timeframe.",
      pro:"This report presents the first n-of-1 in vivo CRISPR base editing case, in which a patient-specific adenine base editor was designed, manufactured, and clinically administered within approximately six months of diagnosis in an infant with severe CPS1 deficiency. CPS1 encodes carbamoyl phosphate synthetase 1, the rate-limiting enzyme of the hepatic urea cycle; biallelic loss of function causes neonatal hyperammonemia with an estimated 50% early-infant mortality. A private heterozygous CPS1 Q335X nonsense variant was identified and a corresponding LNP-delivered adenine base editor (k-abe) was developed using a patient-specific single-guide RNA. Preclinical efficacy was established in Rosa26-Q335X knock-in mice, demonstrating hepatic correction of the variant, and off-target editing was assessed at 21 high-priority nominated sites in primary human hepatocytes with no significant off-target adenine-to-guanine conversions detected. The patient received two infusions and, within 7 weeks of the first dose, demonstrated meaningful reductions in nitrogen-scavenger medication requirements and improved dietary protein tolerance without hyperammonemia. Liver function tests remained acceptable through concurrent rhinoviral and gastrointestinal viral illnesses. As of the reporting date, three total doses had been administered without serious adverse events. This study provides proof-of-concept that individualized in vivo base editing — using lipid nanoparticle delivery targeting the liver — is feasible at clinical scale and within a therapeutically viable development timeline, with implications for the broader class of ultra-rare monogenic diseases for which no approved therapy exists."
    },
    context:"Most gene therapies to date have targeted diseases shared by enough patients to justify large-scale development pipelines. CPS1 deficiency is so rare that a conventional drug development path is not viable. This case establishes that personalized, mutation-specific gene editing can be developed and deployed in a clinically meaningful timeframe, fundamentally reframing the boundary of what constitutes a treatable disease and raising serious policy and access questions about the scalability of bespoke genetic medicine.",
    limitations:"This is a single patient report with a very short follow-up window; long-term durability of editing correction, sustained clinical benefit, and late adverse effects remain unknown. As an n-of-1 study, no control condition exists and conclusions about efficacy versus natural disease trajectory cannot be formally drawn. The six-month development timeline and academic-institutional infrastructure required for this case may not be replicable at scale without substantial systemic investment."
  },

  {id:4, specialty:["Basic Science"], year:"1958", date:"Jul 1958",
    takeaway:"Meselson and Stahl's density-gradient experiment proved that DNA replicates semiconservatively — each new strand is built alongside one original strand — resolving one of molecular biology's most fundamental open questions.",
    title:"The Replication of DNA in Escherichia coli",
    journal:"Proceedings of the National Academy of Sciences", journalShort:"PNAS",
    volume:"44(7):671–682",
    doi:"10.1073/pnas.44.7.671", sourceUrl:"https://www.pnas.org/doi/full/10.1073/pnas.44.7.671",
    authors:"Meselson M, Stahl FW",
    tags:[{label:"Basic Science",cls:"blue"},{label:"Basic Science Study",cls:"green"}], isNew:false,
    keyPoints:[
      "Three competing models existed for how DNA copies itself: conservative, semiconservative, and dispersive replication",
      "Bacteria were grown in heavy nitrogen (¹⁵N) then shifted to normal nitrogen (¹⁴N), allowing newly synthesized DNA to be tracked by density",
      "After one replication cycle, all DNA showed hybrid density — exactly halfway between heavy and light — supporting semiconservative replication",
      "After two cycles, equal amounts of hybrid and fully light DNA appeared, ruling out both conservative and dispersive models",
      "The experiment is widely regarded as one of the most elegant in the history of biology and directly validated the Watson-Crick double helix model"
    ],
    summaries:{
      beginner:"When Watson and Crick described the double helix structure of DNA in 1953, their model immediately suggested a beautiful idea: because the two strands are complementary, each could serve as a template for building a new copy. But this was just a hypothesis. Scientists had three competing theories for how DNA might actually duplicate itself. In the conservative model, the original double helix would stay intact and produce an entirely new copy beside it. In the semiconservative model, the two strands would separate, each serving as a template for a new partner. In the dispersive model, the DNA would be fragmented and reshuffled in an unpredictable way. In 1958, Matthew Meselson and Franklin Stahl devised one of the most elegant experiments in biology to find out which was true. They grew bacteria for many generations in a nutrient medium containing a heavy form of nitrogen, so that all of the bacteria's DNA was marked as heavy. Then they switched the bacteria to normal, lighter nitrogen and allowed them to replicate. After one round of replication, they isolated the DNA and separated it by weight using a spinning tube filled with a dense salt solution. Every piece of DNA landed at exactly the midpoint — neither fully heavy nor fully light — precisely what the semiconservative model predicted. After a second round, half the DNA was at the midpoint and half was fully light. The result was unambiguous: DNA replicates semiconservatively, each new molecule consisting of one old strand and one newly synthesized strand.",
      intermediate:"By 1958, the semiconservative model of DNA replication was theoretically favored based on the Watson-Crick double helix, but had not been experimentally verified. Meselson and Stahl developed a cesium chloride (CsCl) equilibrium density-gradient centrifugation method to physically separate DNA molecules of differing densities. E. coli was cultured for multiple generations in ¹⁵N-containing medium, producing uniformly heavy DNA. Cultures were then transferred to ¹⁴N medium and allowed to replicate. After one generation, all recovered DNA banded at a single intermediate density — consistent with a hybrid molecule containing one ¹⁵N strand and one ¹⁴N strand. After two generations, two bands appeared: one at hybrid density and one at the lighter ¹⁴N position, in approximately equal proportions. This pattern matched exclusively the predictions of the semiconservative model, eliminating the conservative model and the dispersive model. The study provided direct physical evidence that each daughter DNA molecule retains one parental strand, validating the molecular logic implicit in the Watson-Crick structure.",
      pro:"The Meselson-Stahl experiment resolved the mechanism of DNA replication through a quantitative physical chemistry approach that remains a model of experimental design. The authors established ¹⁵N metabolic labeling in E. coli grown through multiple generations in ¹⁵NH₄Cl-supplemented medium, achieving complete isotopic substitution of cellular DNA. Cesium chloride equilibrium density-gradient ultracentrifugation allowed resolution of ¹⁵N-DNA, ¹⁴N-DNA, and hybrid ¹⁵N/¹⁴N-DNA as discrete bands by their buoyant density. Transfer to ¹⁴N medium followed by sampling at defined cell-doubling intervals produced results fully consistent with the semiconservative model: a single hybrid band after one doubling, and equimolar hybrid and light-density bands after two doublings. Conservative replication would have yielded a persistent heavy parental band alongside a new light band; dispersive replication would have produced continuous density shifts without discrete banding. The findings provided direct experimental confirmation of the mechanism implicit in the Watson-Crick antiparallel complementary strand model, linking structure to function in a single definitive experiment. The paper is routinely cited as one of the most elegantly designed experiments in twentieth-century biology and established equilibrium density-gradient centrifugation as a fundamental tool in molecular biology."
    },
    context:"Five years after the double helix model was published, its replication mechanism remained unproven. The Meselson-Stahl experiment provided the critical physical evidence connecting DNA structure to function, completing the evidentiary foundation of modern molecular biology. It also established cesium chloride density-gradient centrifugation as a technique that would later be instrumental in virology, genomics, and the study of chromatin.",
    limitations:"The experiment was conducted in a single bacterial species under controlled laboratory growth conditions, and direct extension to eukaryotic chromosomal replication — which involves additional complexity including histones, multiple origins, and chromatin structure — required further independent investigation. The study demonstrated semiconservative replication at the level of whole DNA molecules but did not resolve the mechanistic details of strand separation, primer synthesis, or polymerase function, which were established by subsequent biochemical work."
  },

  {id:5, specialty:["Nutrition", "Cognitive Health"], year:"2025", date:"Sep 2025",
    takeaway:"Curcumin — the bioactive compound in turmeric — targets multiple molecular pathways implicated in neurodegeneration, with emerging clinical evidence suggesting neuroprotective effects in Alzheimer's disease and beyond.",
    title:"The Neuroprotective Role of Curcumin: From Molecular Pathways to Clinical Translation—A Narrative Review",
    journal:"Nutrients", journalShort:"Nutrients",
    volume:"17(17):2884",
    doi:"10.3390/nu17172884", sourceUrl:"https://pmc.ncbi.nlm.nih.gov/articles/PMC12430471/",
    authors:"Lehoczki A, Fekete M, Jarecsny T, Zábó V, Szappanos Á, Csípő T, Lipécz Á, Major D, Fazekas-Pongor V, Varga P, Varga JT",
    tags:[{label:"Nutrition",cls:"blue"},{label:"Review",cls:"green"}], isNew:false,
    keyPoints:[
      "Curcumin is a polyphenolic compound derived from turmeric with well-characterized anti-inflammatory and antioxidant properties",
      "It modulates multiple pathways relevant to neurodegeneration, including NF-κB signaling, amyloid-beta aggregation, and oxidative stress responses",
      "Clinical trials show some evidence of cognitive benefit and amyloid reduction, though results are inconsistent across studies",
      "A major barrier to clinical use is curcumin's poor bioavailability — it is rapidly metabolized and poorly absorbed in standard oral formulations",
      "Novel delivery systems including nanoparticles, liposomes, and piperine co-administration are being explored to improve curcumin's therapeutic potential"
    ],
    summaries:{
      beginner:"Turmeric has been a staple of traditional medicine for centuries, but modern researchers are now taking a close scientific look at what it might actually do inside the brain. The active compound in turmeric — curcumin — is a bright yellow polyphenol that has drawn interest for its ability to fight inflammation and protect cells from oxidative damage. Both of these processes are deeply implicated in diseases like Alzheimer's, Parkinson's, and other conditions where neurons gradually deteriorate. This review pulls together what is currently known about curcumin's effects on the brain, from laboratory findings to early human trials. In cell and animal experiments, curcumin has been shown to interfere with several harmful processes at once: it suppresses inflammatory signals, reduces the buildup of toxic amyloid-beta plaques associated with Alzheimer's disease, and shields neurons from oxidative stress. Some small clinical trials in people with Alzheimer's or mild cognitive impairment have shown encouraging results in cognitive tests and biomarkers. The challenge, however, is that curcumin is very difficult to absorb from food or standard supplements — most of it is broken down before it reaches the brain. Researchers are actively developing new formulations, including nanoparticle delivery systems, to overcome this limitation. The picture that emerges is of a compound with genuine therapeutic promise that has not yet been fully unlocked.",
      intermediate:"This narrative review synthesizes preclinical and clinical evidence on curcumin's neuroprotective mechanisms and its translational potential in neurodegenerative disease. Curcumin, the principal bioactive curcuminoid in Curcuma longa, exerts pleiotropic effects relevant to neurodegeneration. At the molecular level, it inhibits NF-κB activation — a central transcription factor driving neuroinflammation — and suppresses downstream pro-inflammatory cytokine production including IL-1β, IL-6, and TNF-α. It also directly interferes with amyloid-beta (Aβ) peptide aggregation and tau hyperphosphorylation, two hallmark pathological processes in Alzheimer's disease, as well as α-synuclein aggregation relevant to Parkinson's disease. Antioxidant activity is mediated in part through Nrf2 pathway activation, upregulating endogenous cytoprotective enzymes. Despite robust in vitro and animal model data, translation to human clinical outcomes has been inconsistent. Randomized controlled trials in Alzheimer's patients and cognitively normal aging populations have shown variable effects on cognition and biomarker endpoints. A major impediment is curcumin's low bioavailability — driven by poor aqueous solubility, rapid hepatic metabolism, and limited blood-brain barrier penetration. Emerging formulation strategies including piperine co-supplementation, lipid-based carriers, and nanoparticle encapsulation show promise for improving absorption and CNS delivery.",
      pro:"This narrative review synthesizes mechanistic and clinical data on curcumin's neuroprotective activity, with emphasis on molecular targets relevant to the pathophysiology of Alzheimer's disease, Parkinson's disease, and related neurodegenerative conditions. Curcumin's pleiotropy encompasses NF-κB pathway suppression, direct inhibition of Aβ oligomerization and fibril formation, attenuation of tau phosphorylation via GSK-3β modulation, Nrf2-mediated antioxidant gene induction, and modulation of autophagy-lysosomal clearance pathways. Mitochondrial protective effects have also been reported in the context of rotenone and Aβ-induced oxidative stress models. Despite this mechanistic breadth, clinical translation has been hampered primarily by pharmacokinetic limitations: curcumin undergoes rapid phase II conjugation in the intestinal mucosa and liver, exhibits poor aqueous solubility, and achieves negligible blood-brain barrier penetration at conventional oral doses. Randomized controlled trials reviewed here show heterogeneous outcomes in Alzheimer's and mild cognitive impairment populations, with some reporting improvements in cognitive composite scores and reductions in cerebrospinal fluid or PET-based Aβ burden, while others show null effects — variability attributable in part to differences in formulation, dose, and patient selection. The review highlights advanced delivery platforms — lipid nanoparticles, phospholipid complexes, self-emulsifying drug delivery systems, and piperine-mediated CYP3A4 inhibition — as the primary frontier for improving the therapeutic index of curcumin. The authors note that next-generation curcumin analogs with improved metabolic stability represent a parallel investigational avenue."
    },
    context:"Neurodegenerative diseases represent one of the largest unmet needs in medicine, and most approved treatments remain symptomatic rather than disease-modifying. Curcumin is one of a small number of natural compounds with documented multi-target activity across the major pathological mechanisms of neurodegeneration. A comprehensive review of its molecular pharmacology and clinical trial evidence is timely given rapid growth in nanoformulation research and increasing patient interest in dietary neuroprotection strategies.",
    limitations:"As a narrative review, this study is subject to selection bias in the literature included and does not employ systematic meta-analytic methodology. The clinical trials summarized vary widely in curcumin formulation, dose, duration, and patient population, making cross-study comparison difficult. Most human trials to date have been small, short in duration, and conducted in heterogeneous populations, limiting the strength of conclusions about clinical efficacy."
  },

];

// ═══════════════════════════════════════════════════════
// CATEGORY METADATA
// ═══════════════════════════════════════════════════════
const categoryMeta = {
  "Exercise":             { icon:"🏋️",  desc:"Physical activity & performance" },
  "Nutrition":            { icon:"🥗",  desc:"Diet, food, & metabolic health" },
  "Basic Science":        { icon:"🔬",  desc:"Fundamental biology & mechanisms" },
  "Cognitive Health":     { icon:"🧠",  desc:"Brain function, memory & mental wellness" },
  "Pharmacology":         { icon:"💊",  desc:"Drugs, dosing & therapeutic targets" },
  "Diseases / Pathology": { icon:"🩺",  desc:"Disease processes & clinical conditions" }
};

// ═══════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════
function getCategories(a) {
  if (Array.isArray(a.specialty)) return a.specialty;
  if (a.specialty) return [a.specialty];
  return [];
}

function getArticleById(id) {
  return articles.find(a => a.id === id);
}

function getEditionArticles(edition) {
  return edition.articleIds.map(id => getArticleById(id)).filter(Boolean);
}

// ═══════════════════════════════════════════════════════
// LEVEL PERSISTENCE
// ═══════════════════════════════════════════════════════
function applyLevel(level) {
  globalLevel = level;
  localStorage.setItem('lr_level', level);
  document.querySelectorAll('.level-btn').forEach(b => {
    b.classList.remove('active','beginner','intermediate','pro');
    if (b.dataset.level === level) b.classList.add('active', level);
  });
  document.querySelectorAll('.modal-level-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.level === level)
  );
}

function switchLevel(level) {
  applyLevel(level);
  if (openArticleId !== null) {
    const a = getArticleById(openArticleId);
    if (a) updateModalContent(a, level);
  }
  if (typeof rerenderCards === 'function') rerenderCards();
}

// ═══════════════════════════════════════════════════════
// CARD HTML
// ═══════════════════════════════════════════════════════
function cardHTML(a, index) {
  const sum = a.summaries[globalLevel] || '';
  const delay = index * 60;
  return `<article class="card" style="animation-delay:${delay}ms" onclick="openModal(${a.id})">
    <div class="card-header">
      <div class="card-tags">${a.tags.map(t=>`<span class="tag ${t.cls}">${t.label}</span>`).join('')}${a.isNew?'<span class="new-badge">NEW</span>':''}</div>
      <span class="card-date">${a.date}</span>
    </div>
    <div class="card-body">
      <div class="card-journal">${a.journalShort} · ${a.volume}</div>
      <div class="card-takeaway">${a.takeaway}</div>
      <div class="card-real-title">${a.title}</div>
      <div class="card-summary">${sum}</div>
    </div>
    <div class="card-footer">
      <span class="card-authors">${a.authors}</span>
      <span class="read-more">Read more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
    </div>
  </article>`;
}

function featuredCardHTML(a) {
  const sum = a.summaries[globalLevel] || '';
  return `<article class="featured-card" onclick="openModal(${a.id})">
    <div class="featured-left">
      <div class="card-tags">${a.tags.map(t=>`<span class="tag ${t.cls}">${t.label}</span>`).join('')}${a.isNew?'<span class="new-badge">NEW</span>':''}</div>
      <div class="featured-takeaway">${a.takeaway}</div>
      <div class="featured-real-title">${a.title}</div>
      <div class="featured-meta">${a.journalShort} · ${a.volume} · ${a.date}</div>
    </div>
    <div class="featured-right">
      <div class="featured-summary">${sum}</div>
      <div class="featured-authors">${a.authors}</div>
      <span class="featured-cta">Read more →</span>
    </div>
  </article>`;
}

// ═══════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════
function openModal(id) {
  const a = getArticleById(id);
  if (!a) return;
  openArticleId = id;
  document.getElementById('modal-tags').innerHTML = a.tags.map(t=>`<span class="tag ${t.cls}">${t.label}</span>`).join('');
  document.getElementById('modal-title').textContent = a.takeaway;
  document.getElementById('modal-subtitle').textContent = a.title;
  document.getElementById('modal-meta').innerHTML = `${a.journal} &nbsp;·&nbsp; ${a.volume} &nbsp;·&nbsp; ${a.date}<br>${a.authors}`;
  const levels = ['beginner','intermediate','pro'];
  document.getElementById('modal-level-tabs').innerHTML = levels.map(l =>
    `<button class="modal-level-btn${l===globalLevel?' active':''}" data-level="${l}" onclick="switchLevel('${l}')">${l.charAt(0).toUpperCase()+l.slice(1)}</button>`
  ).join('');
  updateModalContent(a, globalLevel);
  document.getElementById('modal-doi').textContent = `DOI: ${a.doi}`;
  document.getElementById('modal-pubmed').href = a.sourceUrl;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateModalContent(a, level) {
  document.getElementById('modal-summary').textContent = a.summaries[level] || '';
  const kpSec = document.getElementById('modal-keypoints-section');
  const kp    = document.getElementById('modal-keypoints');
  if (a.keyPoints?.length) { kpSec.style.display=''; kp.innerHTML = a.keyPoints.map(p=>`<li>${p}</li>`).join(''); }
  else kpSec.style.display='none';
  const ctxSec = document.getElementById('modal-context-section');
  const ctx    = document.getElementById('modal-context');
  if (a.context) { ctxSec.style.display=''; ctx.textContent = a.context; } else ctxSec.style.display='none';
  const limSec = document.getElementById('modal-limitations-section');
  const lim    = document.getElementById('modal-limitations');
  if (a.limitations) { limSec.style.display=''; lim.textContent = a.limitations; } else limSec.style.display='none';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  openArticleId = null;
}
function closeModalOutside(e) { if (e.target === document.getElementById('modal-overlay')) closeModal(); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.addEventListener('DOMContentLoaded', () => applyLevel(globalLevel));
