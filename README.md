# ML LAB — Gestionale

Gestionale web (file HTML unico) per lo studio ML LAB: percorsi coaching, visite, sedute personal,
nutrizione, allenamento, appuntamenti (Google Calendar), promemoria, finanze e assistente AI.

Gira come Artifact su claude.ai e usa le capacità della piattaforma:
- `db` — sincronizzazione tra dispositivi (documento `app/state`)
- `mcp` — Google Calendar e Google Drive (backup `ML LAB - backup.json`)
- `downloads` — esportazione PDF/CSV
- `sample` — assistente Claude

Fuori da claude.ai i dati restano solo in `localStorage` del browser.

## Dati dei clienti
Il repository contiene **solo il codice**. I dati (backup JSON, CSV, PDF) non vanno mai committati:
sono esclusi da `.gitignore`.

## Allenamento
Protocolli (mesocicli › workout › esercizi) con data di inizio della settimana 1: l'app calcola
mesociclo e settimana in corso, li mostra nella cartella del cliente e segnala in **Oggi** i mesocicli
che finiscono entro 7 giorni. L'assistente ha lo strumento `allenamento`
(elenca, dettaglio, assegna, nuovo, inizio).

## Contenuti Instagram (`ml-lab-contenuti.html`)
App separata per il profilo Instagram, pubblicata come Artifact a sé. Ogni contenuto ha una sola scheda,
dall'idea ai numeri: titolo, hook, testo, argomento, formato, tipo di video, ospite, CTA, fase, data,
visualizzazioni e altre metriche, clienti portati, contenuto collegato e «cosa ho imparato».
- **Panoramica** — visualizzazioni medie, top/sotto soglia, clienti portati, follower; «cosa fa la differenza»
  per argomento, ospite, tipo di video, formato e CTA; semaforo e obiettivo del mese.
- **Archivio** — schede o tabella con filtri. Import CSV dall'export Notion (Title, Argomento, Ospite,
  Stato post, Testo, Visualizzazioni, Note) o da Meta Business Suite; reimportare aggiorna senza doppioni.
- **Idee** — pipeline Idea › Da registrare › In montaggio › Programmato › Pubblicato; Claude propone idee e scrive script.
- **Calendario**, **Playbook** (regole del profilo e lezioni dalle note, aggiornabili con Claude), **Spunti**.

Semaforo automatico dalle visualizzazioni: 🔴 sotto 1.000, 🟢 da 1.000, 🟣 da 3.500 (soglie in Impostazioni).

Backup: «Backup su Drive» (Archivio o Impostazioni) salva i contenuti nel Foglio Google «ML LAB Contenuti - backup»
nella cartella «App social backup» su Google Drive. Il connettore non modifica file esistenti: ogni backup crea il
foglio aggiornato e mette il precedente nel cestino.

Capacità usate: `mcp` (Google Drive: search_files, create_file, trash_file), `db` (un documento per contenuto in `contenuti/`, più `app/settings`, `app/playbook`,
`app/spunti`, `app/crescita`), `sample`, `downloads`.
