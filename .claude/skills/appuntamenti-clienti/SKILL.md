---
name: appuntamenti-clienti
description: Prende, sposta, disdice e controlla gli appuntamenti dei clienti di ML LAB su Google Calendar (sedute PT numerate, consulenze, check, serie ricorrenti), trova orari liberi e prepara il messaggio di conferma per il cliente. Usala ogni volta che Mattia chiede di fissare, prenotare, spostare, annullare o vedere un appuntamento, di sapere quando un cliente ha la prossima PT, a che seduta del pacchetto è, quali buchi ha in agenda, o di mettere in calendario le sedute di un cliente per settimane/mesi — anche se non dice "appuntamento" ("mettimi Giulia martedì alle 18", "sposta Marco a giovedì", "quante PT ha ancora Sara?").
---

# Appuntamenti clienti — ML LAB

Gestisci l'agenda di Mattia Lardiello (studio ML LAB, Bovolone) su **Google Calendar** tramite i
tool `mcp__Google_Calendar__*`. Se non sono caricati, caricali con
`ToolSearch` → `select:mcp__Google_Calendar__list_events,mcp__Google_Calendar__create_event,mcp__Google_Calendar__update_event,mcp__Google_Calendar__delete_event,mcp__Google_Calendar__search_events,mcp__Google_Calendar__get_event,mcp__Google_Calendar__suggest_time`.
Se il connettore Google Calendar non è collegato, dillo e fermati: non inventare appuntamenti.

Il gestionale (`ml-lab-gestionale.html`) legge lo stesso calendario e **conta le sedute dai titoli**:
se rispetti le convenzioni qui sotto, ogni appuntamento che crei finisce da solo nella cartella del
cliente, nelle sedute e nelle finanze.

## Convenzioni (non cambiarle)

| Cosa | Valore |
|---|---|
| Fuso orario | `Europe/Rome` — passa sempre `timeZone: "Europe/Rome"` e orari locali `YYYY-MM-DDTHH:MM:00` |
| Luogo predefinito | `ML LAB di Mattia Lardiello, Via Maria Goretti, 6/A, 37051 Bovolone VR, Italia` |
| Durata predefinita | la durata abituale del cliente (mediana delle ultime sedute); se non c'è storico, 60 min |
| Seduta personal | `{n}a PT {Nome}` → es. `3a PT Giulia Rossi` |
| Seduta di coppia | `{n}a PT {Nome1} + {n2}a {Nome2}` → es. `3a PT Giovanna + 2a Matilde` |
| Consulenza | `Consulenza {Nome}` (titolo che **inizia** con "Consulenza", senza numero) |
| Altri appuntamenti | testo libero senza "Na PT" (es. `Check Marco`) — l'app non li conta come PT |
| Pasti | gli eventi che iniziano con `Pasto` non sono impegni: ignorali nei conflitti |
| Colori | `colorId` Google 1–11; riusa il colore dell'ultima seduta del cliente se ne ha uno |

Usa il nome **come compare nei titoli già esistenti** del cliente (stessa grafia, con o senza cognome):
è così che l'app riconosce la persona. Niente altri numeri nel titolo oltre a quello della seduta.

### Numerazione delle PT
- Il numero è la seduta dentro il pacchetto (pacchetti tipici da 10, 12, 20…).
- Trova l'**ultima PT già in agenda** del cliente (anche futura) e prosegui da lì: `n + 1`.
- A fine pacchetto si riparte da 1 (`10a` → `1a`) — ma **chiedi conferma**: di solito significa
  che il cliente deve rinnovare il pacchetto, e Mattia potrebbe volerlo sapere.
- Se non conosci la dimensione del pacchetto e non si deduce dai titoli (es. `4a PT di 10`), chiedila.

## Come lavorare

### 1. Ricostruisci il cliente prima di toccare l'agenda
Cerca gli appuntamenti del cliente con `search_events` (per nome) o `list_events` sugli ultimi
~6 mesi e i prossimi ~3. Da lì ricavi:
- ultima PT fatta e ultima PT in agenda (numero e data), PT future già fissate;
- giorni/orari abituali, durata abituale, luogo, colore;
- email del cliente dagli invitati (`attendees` che non sono `self`).

Se il nome è ambiguo (due "Marco"), elenca i candidati e chiedi quale.

### 2. Controlla la disponibilità
Prima di proporre o creare qualcosa, leggi l'agenda del periodo con `list_events` e verifica:
- **sovrapposizioni** con altri eventi a orario (escludi i `Pasto…` e gli eventi che Mattia ha rifiutato);
- **festivi italiani** (Capodanno, Epifania, Pasqua e Pasquetta, 25 aprile, 1 maggio, 2 giugno,
  Ferragosto, Ognissanti, 8 dicembre, 24–26 e 31 dicembre): non fissare nulla senza conferma esplicita.

Quando Mattia chiede "quando posso mettere X?" o lo slot è occupato, proponi **2–3 alternative**
vicine agli orari abituali del cliente (`suggest_time` può aiutare). Non spostare mai altri
appuntamenti per fare spazio.

### 3. Mostra un riepilogo e aspetta il via libera
Non creare, modificare o cancellare nulla senza conferma. Presenta una tabella come questa:

```
Giulia Rossi — 4 appuntamenti (mar/gio 18:00, 60 min, ML LAB)
  mar 20 ott 18:00  5a PT Giulia Rossi
  gio 22 ott 18:00  6a PT Giulia Rossi
  mar 27 ott 18:00  7a PT Giulia Rossi   ⚠ c'è già: Consulenza Luca 17:30–18:30
  gio 29 ott 18:00  8a PT Giulia Rossi
Invito a: giulia@example.com  ·  Procedo?
```

Se Mattia toglie una data, rinumera le successive.

### 4. Esegui
- **Nuovo**: `create_event` con `summary`, `startTime`, `endTime`, `timeZone`, `location`,
  `colorId`, eventuali `attendees` (email del cliente) e `addGoogleMeetUrl: true` solo per sedute online.
- **Serie** (es. "tutti i martedì e giovedì fino a Natale", "le prossime 10 PT"): crea un evento
  **per ogni data**, non un evento ricorrente — ogni seduta deve avere il suo numero nel titolo.
- **Sposta**: `update_event` sullo stesso `eventId` (mai cancellare e ricreare: si perdono invitati e risposte).
- **Disdici**: `delete_event` solo dopo conferma. Poi chiedi se rinumerare le PT future del cliente
  (es. tolta la 6a, la 7a diventa 6a…) e, se sì, aggiornale con `update_event`.
- Se ci sono invitati, chiedi se avvisarli (`notificationLevel`); di default sì per creazioni e spostamenti.

Riporta l'esito evento per evento: creati, falliti (con il motivo), saltati.

### 5. Messaggio per il cliente
Dopo ogni prenotazione/spostamento/disdetta offri un messaggio pronto da incollare su WhatsApp,
breve e cordiale, in italiano, firmato Mattia. Esempio:

> Ciao Giulia! Ti confermo le prossime sedute in ML LAB: martedì 20 e giovedì 22 ottobre alle 18:00.
> Se hai imprevisti avvisami almeno 24 ore prima. A presto, Mattia 💪

## Domande frequenti da gestire senza creare nulla
- **"Quando ha la prossima PT X?"** → prossimo evento PT futuro del cliente.
- **"A che seduta è X / quante gliene restano?"** → ultima PT fatta, ultima in agenda, rimanenti del pacchetto.
- **"Chi devo ancora fissare?"** → clienti con PT nelle ultime 3–4 settimane ma nessuna PT futura.
- **"Com'è la mia settimana?"** → agenda giorno per giorno, con i buchi liberi in orario di lavoro.

## Regole di sicurezza
- Mai creare, spostare o cancellare senza una conferma esplicita nel messaggio corrente.
- Mai toccare eventi che non sono del cliente in questione.
- Non scrivere dati sanitari o note private nella descrizione degli eventi: gli invitati la vedono.
- Non salvare dati dei clienti nel repository (vedi `README.md`).
