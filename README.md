# barber-shop

## Aperture straordinarie: attivazione

La terza scheda di `/calendario` gestisce le aperture su date normalmente chiuse, sempre in ora italiana. Gli orari sono a scatti di 30 minuti, con pausa automatica 13:00–14:00. I blocchi manuali continuano a prevalere e modificare o annullare un'apertura non modifica le prenotazioni già registrate.

Prima di pubblicare il nuovo frontend:

1. In Firebase Authentication, abilita l'accesso **Email/password** e crea l'account del titolare, se non esiste già. Copia il suo UID dalla console Firebase. Non salvare la password nel progetto.
2. In Firestore, crea il documento `openingAdmins/<UID>` con il campo booleano `enabled: true`. La gestione del ruolo rimane riservata alla console Firebase.
3. Integra nelle regole Firestore già in produzione la funzione e i due blocchi `match` di [firestore.special-openings.rules](client/firestore.special-openings.rules), dentro il blocco `match /databases/{database}/documents`. Il file è un riferimento per i due percorsi nuovi: **non sostituire** l'intero set di regole con questo file. Se esistono regole generiche, verifica che non concedano scrittura anche su `calendarSettings/specialOpenings` o `openingAdmins`: [i permessi di regole sovrapposte si sommano](https://firebase.google.com/docs/rules/rules-behavior#overlapping_match_statements). Conserva i permessi esistenti di `bookings` e `blockedDates`.
4. Verifica che il calendario pubblico possa leggere il documento degli orari e che solo l'account abilitato possa modificarlo. Poi pubblica il frontend (Firebase Hosting). Il controllo dei nuovi orari in conferma è nella nuova versione del sito: per la verifica, ricarica le pagine già aperte.

Non serve creare il documento `calendarSettings/specialOpenings` a mano: al primo salvataggio contiene la mappa `openings`, indicizzata con la data completa `AAAA-MM-GG` e gli orari `from` e `to` in minuti. Finché il documento non esiste, viene conservata l'apertura del 28/12/2026 già impostata nel codice. Una volta salvate le impostazioni, anche una mappa vuota è valida: non cancellare il documento intero per rimuovere un'apertura.
