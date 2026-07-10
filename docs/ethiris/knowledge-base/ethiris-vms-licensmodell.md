# Ethiris VMS licensmodell

Förklaring av Ethiris VMS licensmodell avseende antal kameralicenser som räknas.

## Inledning

Licenskostnaden för Ethiris VMS baseras på två faktorer: **aktuell licensnivå** och **antal kameror**. För att förstå hur många kameror som räknas – dvs antalet kameralicenser som konfigurationen använder – behöver man känna till begreppen *fysiska kameror*, *logiska kameror* och *videoströmmar*.

## Definitioner

### Fysisk kamera

En **fysisk kamera** är en unik kombination av IP-adress och port i Ethiris konfiguration, t.ex. IP-adress `192.168.31.18` och port `554`. I de flesta fall används RTSP och då är det port 554 som gäller.

Grundprincipen: **varje fysisk kamera kostar en kameralicens.**

### Logisk kamera

En **logisk kamera** är ett unikt kameranamn i Ethiris konfiguration. Flera logiska kameror kan definieras för samma fysiska kamera (samma IP-adress och port).

Med licensnivå **Extended eller Universal nivå 3** eller högre kan man lägga upp **2 × antalet kameralicenser** som logiska kameror. Exempel: 10 kameralicenser → max 20 logiska kameror, men fortfarande max 10 fysiska kameror.

### Videoström

En **videoström** är en namngiven definition av upplösning, bildfrekvens och videokomprimeringsformat för en viss logisk kamera.

Med licensnivå **Advanced eller Universal nivå 5** eller högre kan man lägga upp obegränsat antal videoströmmar per logisk kamera utan extra kameralicenskostnad. För lägre nivåer är max en videoström per logisk kamera.

## Maxbegränsningar per typ

| Typ | Licenskrav | Maxbegränsning |
|-----|-----------|----------------|
| Fysisk kamera | – | Antal kameralicenser i aktuell licenskod |
| Logisk kamera | Extended eller Universal nivå 3 | 2 × antal kameralicenser |
| Videoström | Advanced eller Universal nivå 5 | Ingen gräns |

## Antal kameralicenser

### Traditionell licensmodell (engångsavgift)

Med **Free, Basic** eller **Universal nivå 1–2** räknas varje rad i kameralistan som en fysisk kamera och kostar en kameralicens.

Med **Extended eller Universal nivå 3** eller högre kan flera logiska kameror definieras per fysisk kamera.

Exempel med Extended-licens för 7 kameror: max 7 fysiska kameror och max 14 logiska kameror (2 × 7).

### Universallicens (prenumerationsmodell)

Med **Universal** räknar systemet ut antalet kameralicenser baserat på aktuell konfiguration. Fakturering sker per kvartal i efterhand.

Med **Universal nivå 3 eller högre** beräknas antalet kameralicenser som det **största värdet** av:
- Antal fysiska kameror, eller
- Antal logiska kameror / 2 (avrundat uppåt)

**Exempel (Universal nivå 3+):**

| Fysiska kameror | Logiska kameror | Kameralicenser |
|:-:|:-:|:-:|
| 12 | 16 | 12 |
| 12 | 24 | 12 |
| 12 | 25 | 13 |
| 12 | 30 | 15 |

Med **Advanced eller Universal nivå 5** eller högre påverkar antalet videoströmmar inte beräkningen av kameralicenser.

### Flytande kameralicenser (Universal nivå 6)

Med Universal nivå 6 kan man definiera fler kameror i konfigurationen än det antal man anger under **Max samtidiga aktiva fysiska kameror**. Siffran fungerar som ett tak för fakturering – om konfigurationen innehåller färre kameror faktureras endast de faktiska kamerorna.

Inställningen görs i **Universalfliken** för servern i Ethiris Admin, där man också kan se aktuellt antal fysiska kameror, logiska kameror och kameralicenser som används.
