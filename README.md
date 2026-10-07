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
App separata per il profilo Instagram, pubblicata come Artifact a sé:
- **Panoramica** — follower, contenuti pubblicati, copertura, engagement e salvataggi rispetto al periodo
  precedente; formato, pilastro e giorno migliori; costanza settimanale rispetto all'obiettivo.
- **Contenuti** — monitoraggio di ogni post/reel. Import del CSV di Meta Business Suite
  (Insights › Contenuti › Esporta, colonne in italiano o inglese; reimportare aggiorna senza doppioni).
- **Idee** — pipeline Idea › Da registrare › In montaggio › Programmato › Pubblicato, con Claude che
  propone idee e scrive script, caption e hashtag.
- **Calendario** — piano editoriale mensile. **Spunti** — hook, domande dei clienti, trend.

Capacità usate: `db` (documenti `app/posts`, `app/ideas`, `app/spunti`, `app/crescita`, `app/settings`),
`sample`, `downloads`. Non c'è un collegamento diretto alle API di Instagram: i dati entrano dal CSV di Meta.
