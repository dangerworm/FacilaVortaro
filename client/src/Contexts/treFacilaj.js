// En la listo enestas du tipoj de vortoj:
//
// - Vortoj finiĝantaj per streketo bezonas vortoklasan finaĵon (-o, -a, -i, -e)
// - Vortoj sen streketoj estas uzeblaj sen finaĵo
//
// Prefiksoj kaj sufiksoj povus esti en la ĉefa listo laŭ tipo 1, sed
// por konveno ili estas listigitaj en apartaj listoj sube.

export const vortaroTreFacilaj = [
  "aĉet-",
  "adres-",
  "afer-",
  "ag-",
  "aĝ-",
  "akcept-",
  "akv-",
  "al",
  "ali-",
  "alt-",
  "am-",
  "amik-",
  "ankaŭ",
  "ankoraŭ",
  "anstataŭ",
  "antaŭ",
  "apart-",
  "aper-",
  "april-",
  "apud",
  "arb-",
  "art-",
  "artikol-",
  "asoci-",
  "atend-",
  "aŭ",
  "aŭd-",
  "aŭgust-",
  "aŭskult-",
  "aŭtobus-",
  "aŭto",
  "aŭtomobil-",
  "aŭtun-",
  "baldaŭ",
  "bel-",
  "best-",
  "bezon-",
  "bicikl-",
  "bild-",
  "bird-",
  "bon-",
  "bril-",
  "bus-",
  "cel-",
  "cent",
  "cert-",
  "ĉambr-",
  "ĉar",
  "ĉe",
  "ĉef-",
  "ĉi",
  "ĉiam",
  "ĉiel-",
  "ĉio", "ĉion",
  "ĉirkaŭ",
  "ĉiu", "ĉiun", "ĉiuj", "ĉiujn",
  "ĉu",
  "da",
  "dank-",
  "daŭr-",
  "de",
  "decembr-",
  "decid-",
  "dek",
  "dekstr-",
  "demand-",
  "dev-",
  "dezir-",
  "dik-",
  "dimanĉ-",
  "dir-",
  "direkt-",
  "divers-",
  "do",
  "dolĉ-",
  "dom-",
  "don-",
  "dorm-",
  "du",
  "dum",
  "eĉ",
  "eduk-",
  "edz-",
  "ekster",
  "ekzempl-",
  "ekzist-",
  "el",
  "elekt-",
  "elektr-",
  "en",
  "esper-",
  "est-",
  "facil-",
  "fak-",
  "fakt-",
  "fal-",
  "famili-",
  "far-",
  "februar-",
  "feliĉ-",
  "fenestr-",
  "ferm-",
  "fest-",
  "fil-",
  "film-",
  "fin-",
  "fiŝ-",
  "flank-",
  "flor-",
  "flug-",
  "foj-",
  "for",
  "forges-",
  "form-",
  "fort-",
  "fot-",
  "frap-",
  "frat-",
  "fraŭl-",
  "fru-",
  "frukt-",
  "funkci-",
  "gazet-",
  "glas-",
  "grand-",
  "grav-",
  "grup-",
  "ĝeneral-",
  "ĝi",
  "ĝis",
  "ĝust-",
  "hav-",
  "hejm-",
  "help-",
  "hieraŭ",
  "histori-",
  "hodiaŭ",
  "hom-",
  "hor-",
  "hotel-",
  "iam",
  "ide-",
  "ili",
  "infan-",
  "inform-",
  "instru-",
  "inter",
  "interes-",
  "invit-",
  "io", "ion",
  "iom",
  "ir-",
  "iu", "iun", "iuj", "iujn",
  "jam",
  "januar-",
  "jar-",
  "je",
  "jen",
  "jes",
  "juli-",
  "jun-",
  "juni-",
  "ĵaŭd-",
  "ĵet-",
  "kaf-",
  "kaj",
  "kalkul-",
  "kamp-",
  "kant-",
  "kapt-",
  "kar-",
  "kart-",
  "kaŝ-",
  "kaŭz-",
  "ke",
  "kelk-",
  "kia", "kian", "kiaj", "kiajn",
  "kial",
  "kiam",
  "kie", "kien",
  "kiel",
  "kies",
  "kio", "kion",
  "kiom",
  "kiu", "kiun", "kiuj", "kiujn",
  "klar-",
  "klas-",
  "klub-",
  "knab-",
  "kolekt-",
  "kolor-",
  "komenc-",
  "komerc-",
  "kompren-",
  "komun-",
  "kon-",
  "kongres-",
  "konsent-",
  "konsil-",
  "konstru-",
  "kontakt-",
  "kontent-",
  "kontraŭ",
  "korp-",
  "kost-",
  "kred-",
  "kresk-",
  "krom",
  "kuir-",
  "kultur-",
  "kun",
  "kurs-",
  "kuŝ-",
  "kvar",
  "kvin",
  "la",
  "labor-",
  "lag-",
  "lakt-",
  "land-",
  "larĝ-",
  "las-",
  "last-",
  "lav-",
  "lecion-",
  "leg-",
  "lern-",
  "leter-",
  "lev-",
  "li",
  "liber-",
  "libr-",
  "lig-",
  "lingv-",
  "literatur-",
  "loĝ-",
  "lok-",
  "long-",
  "lud-",
  "lund-",
  "maj-",
  "man-",
  "manĝ-",
  "manier-",
  "mank-",
  "mar-",
  "mard-",
  "mark-",
  "mart-",
  "maŝin-",
  "maten-",
  "mem",
  "membr-",
  "memor-",
  "merkred-",
  "met-",
  "metod-",
  "mez-",
  "mi",
  "mil",
  "milion-",
  "milit-",
  "minut-",
  "mir-",
  "mon-",
  "monat-",
  "mond-",
  "mont-",
  "montr-",
  "morgaŭ",
  "mort-",
  "mov-",
  "mult-",
  "muzik-",
  "naci-",
  "nask-",
  "natur-",
  "naŭ",
  "ne",
  "neces-",
  "neniam",
  "nenio", "nenion",
  "neniu", "neniun", "neniuj", "neniujn",
  "ni",
  "nokt-",
  "nom-",
  "nov-",
  "novembr-",
  "nul-",
  "numer-",
  "nun",
  "nur",
  "ofic-",
  "oft-",
  "ok",
  "okaz-",
  "oktobr-",
  "okup-",
  "ol",
  "oni",
  "opini-",
  "ordinar-",
  "organiz-",
  "pac-",
  "pag-",
  "paĝ-",
  "pan-",
  "paper-",
  "pardon-",
  "park-",
  "parol-",
  "part-",
  "patr-",
  "pec-",
  "pend-",
  "pens-",
  "per",
  "perd-",
  "permes-",
  "person-",
  "pet-",
  "plaĉ-",
  "plej",
  "plen-",
  "plezur-",
  "pli",
  "plu",
  "plur-",
  "pluv-",
  "poem-",
  "popol-",
  "por",
  "pord-",
  "port-",
  "post",
  "poŝt-",
  "pov-",
  "prefer-",
  "pren-",
  "prepar-",
  "pres-",
  "preskaŭ",
  "pret-",
  "prezent-",
  "prezid-",
  "pri",
  "printemp-",
  "pro",
  "problem-",
  "produkt-",
  "proksim-",
  "propr-",
  "prov-",
  "publik-",
  "pur-",
  "radi-",
  "rajt-",
  "rakont-",
  "rapid-",
  "raport-",
  "redakt-",
  "region-",
  "regul-",
  "rekomend-",
  "renkont-",
  "respond-",
  "rest-",
  "ret-",
  "revu-",
  "ricev-",
  "riĉ-",
  "rid-",
  "rigard-",
  "rilat-",
  "rimark-",
  "ripet-",
  "river-",
  "riz-",
  "romp-",
  "sabat-",
  "salon-",
  "salut-",
  "sam-",
  "san-",
  "sci-",
  "scienc-",
  "se",
  "sed",
  "seĝ-",
  "sekv-",
  "semajn-",
  "sen",
  "send-",
  "sent-",
  "sep",
  "septembr-",
  "serĉ-",
  "serv-",
  "ses",
  "si",
  "sid-",
  "signif-",
  "simil-",
  "simpl-",
  "sinjor-",
  "situaci-",
  "skatol-",
  "skrib-",
  "sol-",
  "somer-",
  "son-",
  "special-",
  "spert-",
  "sport-",
  "staci-",
  "star-",
  "strat-",
  "stud-",
  "student-",
  "sub",
  "sufiĉ-",
  "sukces-",
  "suker-",
  "sun-",
  "super",
  "supr-",
  "sur",
  "ŝajn-",
  "ŝanĝ-",
  "ŝat-",
  "ŝip-",
  "ŝtat-",
  "tabl-",
  "tag-",
  "tamen",
  "te-",
  "telefon-",
  "televid-",
  "tem-",
  "temp-",
  "ten-",
  "ter-",
  "tia", "tian", "tiaj", "tiajn",
  "tial",
  "tiam",
  "tie", "tien",
  "tiel",
  "tim-",
  "tio", "tion",
  "tiom",
  "tiu", "tiun", "tiuj", "tiujn",
  "tra",
  "traduk-",
  "tranĉ-",
  "trans",
  "tre",
  "tri",
  "trink-",
  "tro",
  "trov-",
  "tuj",
  "turn-",
  "tut-",
  "universal-",
  "universitat-",
  "unu",
  "urb-",
  "util-",
  "uz-",
  "vagon-",
  "valor-",
  "varm-",
  "ven-",
  "vend-",
  "vendred-",
  "ver-",
  "verk-",
  "vesper-",
  "vest-",
  "vetur-",
  "vi",
  "viand-",
  "vid-",
  "vilaĝ-",
  "vintr-",
  "vir-",
  "viv-",
  "vizit-",
  "voj-",
  "vojaĝ-",
  "vol-",
  "vort-",
  "zorg-",
];

export const personajPronomoj = [
  "mi",
  "vi",
  "li",
  "ŝi",
  "ĝi",
  "ni",
  "ili",
  "si",
];

export const prefiksojTreFacilaj = [
  "ge",
  "mal",
  "re",
];

export const sufiksojTreFacilaj = [
  "ad",
  "aĵ",
  "an",
  "ar",
  "ebl",
  "eg",
  "ej",
  "et",
  "ig",
  "iĝ",
  "il",
  "in",
  "ist",
  "uj",
  "ul",
];
