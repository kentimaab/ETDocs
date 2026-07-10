# Videooptimering via GPU eller Adaptiva videoströmmar

Beskrivning av när och hur hårdvaruavkodning via GPU respektive Adaptiva videoströmmar kan användas i Ethiris VMS.

## Inledning

Genom att använda GPU (Graphics Processing Unit) för avkodning av video avlastas datorns CPU, vilket ger högre prestanda och möjlighet att visa fler kameror på samma hårdvara.

**Adaptiva videoströmmar** är ett koncept som infördes i Ethiris VMS version 13.2. Det innebär att man för en och samma kamera kan definiera flera videoströmmar med olika upplösning. Ethiris Server skickar automatiskt den bäst lämpade strömmen till klienter baserat på aktuell storlek på kameravyn och optimeringsinställningar i klienten.

## Förutsättningar

### Videoavkodning på GPU

**Ethiris VMS:**

- Version: **11.2** eller senare
- Licensnivå: **Advanced/Universal nivå 5** eller högre

**Kameror:**

- Kameratyp: Alla
- Videokomprimeringsformat: **H.264** eller **H.265**
- Videoupplösning:
    - H.265: Max **8 192 × 8 192** (från version 14.2; tidigare max 4 096 × 4 096)
    - H.264: Max **4 096 × 4 096**

**Rekommenderade grafikkort (testade med Ethiris VMS):**

- Intel generation 6 CPU eller senare med Intel HD Graphics 530 eller senare
- NVIDIA:
    - GT 1030
    - GTX 1050 / 1050 Ti
    - GTX 1630¹
    - GTX 1650¹
    - T600¹

¹ Dessa grafikkort stödjer avkodning av H.265 med högre kvalitet och är att föredra.

### Adaptiva videoströmmar

**Ethiris VMS:**

- Version: **13.2** eller senare
- Licensnivå: **Advanced/Universal nivå 5** eller högre

**Kameror:**

- Kameratyp: Ej 360-kameror
- Videokomprimeringsformat: Alla
- Videoupplösning: Alla

## Stöd per sammanhang

| Sammanhang | GPU-avkodning | Adaptiva strömmar |
|------------|:-------------:|:-----------------:|
| **Ethiris Client** | | |
| Live | Ja | Ja |
| Videospelaren | Ja | Ej relevant |
| Instant replay | Ja | Nej |
| Minivideospelare | Nej | Ej relevant |
| Export till AVI | Nej | Ej relevant |
| **Ethiris Mobile** | | |
| Live | Nej | Ja |
| Videospelaren | Nej | Ej relevant |
| **Ethiris Server** | | |
| Motion detection | Nej | Nej |
| Transcoding till Ethiris Mobile | Ja | Ja |
| **Ethiris SDK** | | |
| Live | Ja | Ja |
| Inspelad video | Ja | Ej relevant |
| **Ethiris ActiveX** | | |
| Live | Nej | Nej |
| **WideQuick EthirisView** | | |
| Live | Nej | Nej |
| Inspelad video | Nej | Nej |
| **Ethiris Viewer** | | |
| Uppspelning | Ja | Ej relevant |
