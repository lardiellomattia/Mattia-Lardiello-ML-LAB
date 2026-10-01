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
