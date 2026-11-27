# barber-shop

## Accesso al calendario del titolare

L'indirizzo `/calendario` richiede un solo accesso prima di mostrare Prenotazioni, Blocco date e Aperture straordinarie. L'opzione **Ricorda questo dispositivo** conserva l'accesso nello stesso browser anche dopo averlo chiuso. Su un dispositivo condiviso, togli la spunta o usa **Esci**. I clienti continuano a prenotare senza accedere.

Prima di pubblicare questa modifica, verifica l'accesso con l'account del titolare. Se già funziona in Aperture straordinarie, non serve un secondo account. Altrimenti:

1. In Firebase Authentication, abilita l'accesso **Email/password** e crea l'account del titolare, se non esiste già. Copia il suo UID dalla console Firebase. Non salvare la password nel progetto.
2. In Firestore, crea il documento `openingAdmins/<UID>` con il campo booleano `enabled: true`. La gestione del ruolo rimane riservata alla console Firebase.
3. Integra nelle regole Firestore già in produzione la funzione e i due blocchi `match` di [firestore.special-openings.rules](client/firestore.special-openings.rules), dentro il blocco `match /databases/{database}/documents`. Il file è un riferimento per i due percorsi nuovi: **non sostituire** l'intero set di regole con questo file. Se esistono regole generiche, verifica che non concedano scrittura anche su `calendarSettings/specialOpenings` o `openingAdmins`: [i permessi di regole sovrapposte si sommano](https://firebase.google.com/docs/rules/rules-behavior#overlapping_match_statements). Conserva i permessi esistenti di `bookings` e `blockedDates`.
4. Verifica che il calendario pubblico possa leggere il documento degli orari e che solo l'account abilitato possa modificarlo. Pubblica il frontend (Firebase Hosting) dopo la verifica.

Il login protegge l'accesso alla pagina; non modifica le regole già in uso per `bookings` e `blockedDates`. Il calendario pubblico usa i documenti delle prenotazioni per leggere gli orari occupati. Per proteggere i recapiti anche nel database, separa i soli orari occupati dai dati dei clienti prima di restringere la lettura delle prenotazioni.

## Aperture straordinarie

La terza scheda gestisce le aperture su date normalmente chiuse, sempre in ora italiana. Gli orari sono a scatti di 30 minuti, con pausa automatica 13:00–14:00. I blocchi manuali continuano a prevalere e modificare o annullare un'apertura non modifica le prenotazioni già registrate.

Non serve creare il documento `calendarSettings/specialOpenings` a mano: al primo salvataggio contiene la mappa `openings`, indicizzata con la data completa `AAAA-MM-GG` e gli orari `from` e `to` in minuti. Finché il documento non esiste, viene conservata l'apertura del 28/12/2026 già impostata nel codice. Una volta salvate le impostazioni, anche una mappa vuota è valida: non cancellare il documento intero per rimuovere un'apertura.
