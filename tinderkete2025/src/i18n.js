import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Nabegatzailearen hizkuntza deteketatzen du
  .use(initReactI18next) // React-ekin bateratu
  .init({
    fallbackLng: 'eu',
    lng: localStorage.getItem('language') || 'eu',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
    },
    resources: {
        en: {
          translation: {
            "erreserbak": {
              "header": "Reservation",
              "description": "You can book trinquets or frontons in the reservation area!",
              "sportType": "Sport Type",
              "playerCount": "Player Count",
              "location": "Location",
              "time": "Time",
              "date" : "Date",
              "isPublic": "Make it public",
              "submit": "Submit",
              "yourReservations": "Your Reservations",
              "public": "Public",
              "private": "Private",
              "notLoggedInMessage" : "Not logged in? Check in now!",
              "price": "Price",
              "noReservations": "No reservations",
              "itzuli": "Go back"
            },
            "login":{
              "password" : "Password",
              "noAccount" : "Don't have an account?",
              "emailHolder" : "Enter email",
              "passHolder" : "Enter password",
              "register" : "Register",
              "email": "Email",
              "emailRequired" : "You mast enter an email.",
              "emailInvalid" : "You must enter an '@' sign at the email address.",
              "loginTitle": "Login",
              "loginButton": "Enter",
              "accountNotActivated": "The user does not exist",
              "passwordRequired":"Password is required",
              "invalidCredentials": "Invalid credentials",
              "somethingWentWrong": "Something went wrong",

              
            },
            "footer":{
              "ref" : "CONTACT",
              "esaldi" : '"More than sport, real ties!"',
              "esaldi2" : "In Tinderkete, we combine passion and tradition. Are you ready for the next challenge?",
            },
            "mapak": {
              "header": "Frontons and Trinquets",
              "description": "Choose a field type to view the location of Google Maps.",
              "google":"Open on Google Maps",
              "frontoiak":"Frontons",
              "trinketeak":"Trinquets",
            },
            "nav": {
              "nav1": "About us",
              "nav2": "Reservations",
              "nav3": "Tournaments",
              "nav4": "Matches",
              "nav5": "Maps",
              "nav6": "Products",
              "nav7": "Contact",
              "nav8": "Air quality",
              "sidebar1" : "Profile",
              "sidebar2" : "Chat",
              "navadmin1" : "Create Tournaments",
              "navadmin3" : "Users",
              "navadmin2" : "Create New Map"        
            },
            "airearenKalitatea": {
                "titulua" : "Air quality by province",
                "county" : "County",
                "start_date": "Start Date",
                "end_date" : "End date",
                "language": "Language",
                "parametroa": "Parameter",
                "balorea": "Value",
                "unitatea": "Unit",
                "aire_kalitatea": "Air quality",
                "fetch_data" : "Send"      
            },
            "partidak": {
              "header": "Matches",
              "description": "Choose which match you want to register for.",
              "public": "Public",
              "private": "Private",
              "frontoia":"Frontons",
              "trinketea":"Trinquets",
              "minutu":"minutes",
              "apuntatu": "Sign up",
              "popupHeader" : "Sign up for the game!",
              "itxi" : "Close",
              "libre" : "Free",
            },    
            "gutaz": {
              "main" : "Our aim is to encourage the practice of Basque sports by young people. Play on the fronton and trinquets easily, creating open or closed groups and booking places. Meet the big fans and start participating!",
              "section" : "Get to know the Web",
              "section2" : "Our goal is to provide a professional platform to make Basque sports easier.",
              "grid1" : "Lezo Fronton",
              "grid1-1" : "Make your reservation and play in a historic place, always available.",
              "grid2" : "Game Teams",
              "grid2-2" : "Create and join the teams, meet the other players and start playing.",
              "grid3" : "Urnieta Fronton",
              "grid3-3" : "Book easy and enjoy a fronton that combines modernity and tradition.",
              "grid4" : "Trinquets",
              "grid4-4" : "Know the magic of ratchet: tradition and sport come together between walls that tell stories and challenges.",
              "grid5" : "Products",
              "grid5-5" : "Check out our selection of the only products designed to improve, enhance and transform your level.",
              "komunitatea" : "Join the Community!",
              "komunitatea2" : "You want to find friends to play Basque sports? Register today and start your experience!",
              "register" : "Register now"
            },
            "kontaktua": {
              "header" : "Contact with us.",
              "header2" : "Don't stop thinking!",
              "izena" : " Put your first name",
              "izenap" : "Put yout first and last name",
              "abizena" : "Put yout last name",
              "email" : "Email",
              "emailp" : "Write your email",
              "telefonoa" : "Phone number",
              "telefonoap" : "Write your phone number",
              "mezua" : "Message",
              "mezuap" : "Write your message",
              "bidali" : "Send",
              "ongiBidali": "Your message has been successfully sent"
            },
            "produktCard": {
              "prezioa" : "Prize:",
              "erosi" : "Buy"
            },
            "produkt":{
              "header" : "Products",
              "header2" : "Best training and products!",
              "iritziak" : "Customer opinions",
              "entrenatzaile" : "Trainer Oihan",
              "pala" : "Pala",
              "pelotak" : "Frontenis Balls"
            },
            "txapelketa": {
              "header" : "Tournaments!",
              "header2" : "Take part in the most fun tournaments in the country!",
            },
            "eventcard": {
              "prezioa" : "Price:",
              "jokalariak" : "Players:",
              "partaideak" : "Participants: ",
              "apuntatu" : "Book in",
              "noParticipants" : "No participants"
            },
            "register": {
              "header" : "Register",
              "izena" : " First name",
              "izenap" : "Put yout first name",
              "abizena" : "Last name",
              "abizenap" : "Put yout last name",
              "email" : "Email",
              "emailp" : "Write your email",
              "pasahitza" : "Password",
              "pasahitzap" : "Write your password",
              "jaitozedata" : "Birth Date",
              "bidali" : "Register",
              "kontua" : "Have an account?",
              "pasahitzaBaieztatu1": "Confirm password",
              "pasahitzaBaieztatu2": "Confirm password",
              "pasahitzaGaizki":"Passwords do not match",
              "adinezNagusi":"The user must be of legal age",
              "erabilOngi":"User successfully created",
              "datuGaizki":"Some data was entered incorrectly",
            },
            "txapelketa1": {
              "title" : "Fronton tournament!",
              "location" : "Fronton",
              "date" : "23 September",
              "description" : "Awards, music, games...",
      
            },
            "txapelketa2": {
              "title" : "Trinquets tournament!",
              "location" : "Trinquets",
              "date" : "12 October",
              "description" : "Awards, music, games...",
      
            },
            "txapelketa3": {
              "title" : "Frontonis tournament!",
              "location" : "Big Fronton",
              "date" : "5 November",
              "description" : "Interesting games and great atmosphere!",
            },
            "profila": {
              "header" : "Profile",
              "header2" : "View and edit your user's information.",
              "izena" : "Name",
              "abizena" : "Surnames",
              "email" : "Email",
              "jaiotzedata" : "Date of birth",
              "jaioterria" : "Place of birth",
              "telefonoa" : "Phone number",
              "gorde" : "Save"
            },
            "hasieraAdmin": {
              "header" : "Application Management Control Panel",
            },
            "mapakSortu": {
              "header" : "Mapak kudeatzeko gunea",
              "subHeader" : "Gune honetan Frontoi eta Trinketeen mapak sor eta kudeatu ditzakezu.",
              "izena" : "Izena",
              "mota" : "Mota",
              "iframe" : "Iframe",
              "url" : "URL",
              "bidali" : "Bidali"
            },
            "perfila": {
              "errorea" : "Error editing profile data",
              "argazkia" :"Change profile picture",
              "editatu": "Edit profile",
              "1": "First names",
              "2": "Date of Birth",
              "3": "Town",
              "4": "Phone",
              "aktualizatu": "Profile updated successfully",
              "errore1": "An error occurred while updating data:",
              "errore2": "Error updating:",
            }
          }
        },
        eu: {
          translation: {
            "erreserbak": {
              "header": "Erreserbak",
              "description": "Erreserbak egiteko gunean trinkete edo frontoiak erreserba ditzazkezu!",
              "sportType": "Zelai mota",
              "playerCount": "Jokalari kopurua",
              "location": "Kokalekua",
              "time": "Ordua",
              "date" : "Data",
              "isPublic": "Publikoa egin",
              "submit": "Sartu",
              "yourReservations": "Zure Erreserbak",
              "public": "Publikoa",
              "private": "Pribatua",
              "notLoggedInMessage" : "Ez zaude logeatuta? Logeatu orain!",
              "price": "Prezioa",
              "noReservations": "Ez duzu erreserbarik",
              "itzuli": "Itzuli"

            },
            "login":{
              "email" : "Emaila",
              "password" : "Pasahitza",
              "noAccount" : "Konturik ez?",
              "emailHolder" : "Sartu emaila",
              "passHolder" : "Sartu pasahitza",
              "register" : "Erregistratu",
              "email" : "Emaila",
              "emailRequired" : "Posta elektroniko bat sartu behar duzu.",
              "emailInvalid" : "Posta elektronikoaren helbidean '@' zeinu bat sartu behar duzu.",
              "loginTitle": "Login",
              "loginButton": "Sartu",
              "accountNotActivated": "Erabiltzailea ez da existitzen",
              "passwordRequired":"Pasahitza derrigorrezkoa da",
              "invalidCredentials": "Datuak gaizki sartu dira",
              "somethingWentWrong":"Errorea gertatu da",
              
            },
            "footer":{
              "ref" : "KONTAKTUA",
              "esaldi" : '"Kirola baino gehiago, benetako loturak!"',
              "esaldi2" : "Tinderketen, pasioa eta tradizioa batzen ditugu. Prest zaude hurrengo erronkarako?",
            },
            "mapak": {
              "header": "Frontoiak eta Trinketeak",
              "description": "Aukeratu kantxa mota bat Google Mapsen kokapena ikusteko.",
              "google":"Google Mapsen Ireki",
              "frontoiak":"Frontoiak",
              "trinketeak":"Trinketeak",
            },
            "nav": {
              "nav1": "Gutaz",
              "nav2": "Erreserbak",
              "nav3": "Txapelketak",
              "nav4": "Partiduak",
              "nav5": "Mapa",
              "nav6": "Produktuak",
              "nav7": "Kontaktua",
              "nav8": "Airearen kalitatea",
              "sidebar1" : "Profila",
              "sidebar2" : "Txat-a",
              "navadmin1" : "Txapelketak Kudeatu",
              "navadmin3" : "Erabiltzaileak Kudeatu",
              "navadmin2" : "Mapak kudeatu"   
            },
            "airearenKalitatea": {
                "titulua" : "Airearen kalitatea probintziko",
                "county" : "Probintzia",
                "start_date": "Hasiera data",
                "end_date" : "Bukaera data",
                "language": "Hizkuntza",
                "parametroa": "Parametroa",
                "balorea": "Balorea",
                "unitatea": "Unitatea",
                "aire_kalitatea": "Aire kalitatea",
                "fetch_data" : "Bidali"
                  
            },
            "partidak": {
              "header": "Partidak",
              "description": "Aukeratu zein partidatan izena eman nahi duzun.",
              "public": "Publikoak",
              "private": "Pribatuak",
              "frontoia":"Frontoia",
              "trinketea":"Trinketea",
              "minutu":"minutu",
              "apuntatu": "Apuntatu",
              "trinketeak":"Trinketeak",  
              "popupHeader" : "Partidan izena eman dezu!",
              "itxi" : "Itxi",
              "libre" : "Libre",
            },
            "gutaz": {
              "main" : "Gazteek euskal kirolak praktikatzearen ohitura sustatzea da gure helburua. Jolastu frontoian eta trinketean erraz, talde irekiak edo itxiak sortuz eta tokiak erreserbatuz. Ezagutu zale amorratuak eta hasi parte hartzen!",
              "section" : "Ezagutu Webgunea",
              "section2" : "Gure helburua da euskal kirolak errazago egiteko plataforma profesional bat eskaintzea.",
              "grid1" : "Lezo Frontoia",
              "grid1-1" : "Egin zure erreserba eta jolastu leku historiko batean, beti eskuragarri.",
              "grid2" : "Partida Taldeak",
              "grid2-2" : "Sortu eta batu taldeetan, ezagutu beste jokalariak eta hasi jolasten.",
              "grid3" : "Urnieta Frontoia",
              "grid3-3" : "Erreserbatu erraz eta gozatu modernitate eta tradizioa uztartzen dituen frontoian.",
              "grid4" : "Trinketeak",
              "grid4-4" : "Ezagutu trinketeko magia: tradizioak eta kirolak bat egiten dute istorioak eta erronkak kontatzen dituzten pareten artean.",
              "grid5" : "Produktuak",
              "grid5-5" : "Aztertu gure aukeraketa: zure maila hobetzeko, nabarmentzeko eta eraldatzeko diseinatutako produktu bakarrak.",
              "komunitatea" : "Bat egin komunitatearekin!",
              "komunitatea2" : "Euskal kirola egiteko lagunak aurkitu nahi dituzu? Erregistratu gaur eta ekin zure esperientziari!",
              "register" : "Erregistratu orain"
            },
            "kontaktua": {
              "header" : "Jarri gurekin kontaktuan.",
              "header2" : "Ez gelditu gogoekin!",
              "izena" : "Izen abizenak",
              "izenap" : "Sartu izen abizenak",
              "email" : "Email-a",
              "emailp" : "Idatzi email-a",
              "telefonoa" : "Telefonoa",
              "telefonoap" : "Idatzi telefonoa",
              "mezua" : "Mezua",
              "mezuap" : "Idatzi mezu bat",
              "bidali" : "Bidali",
              "ongiBidali": "Zure mezua ongi bidali da"
            },
            "produktCard": {
              "prezioa" : "Prezioa:",
              "erosi" : "Erosi"
            },
            "produkt": {
              "header" : "Produktuak",
              "header2" : "Entranamendu eta produktu hoberenak!",
              "iritziak" : "Bezeroen iritziak",
              "entrenatzaile" : "Oihan entrenatzailea",
              "pala" : "Pala",
              "pelotak" : "Fronteniseko pelotak",
            },
            "txapelketa":{
              "header" : "Txapelketak!",
              "header2" : "Herrialdeko txapelketa diebrtigarrienetan parte hartu!"
            },
            "eventcard": {
              "prezioa" : "Prezioa:",
              "jokalariak" : "Jokalariak:",
              "partaideak" : "Partaideak: ",
              "apuntatu" : "Izena eman",
              "noParticipants" : "Ez dago parte-hartzailerik"
            },
            "register": {
              "header" : "Erregistratu",
              "izena" : "Izena",
              "izenap" : "Sartu izena",
              "abizena" : "Abizenak",
              "abizenap" : "Sartu abizenak",
              "email" : "Email-a",
              "emailp" : "Idatzi email-a",
              "pasahitza" : "Pasahitza",
              "pasahitzap" : "Sartu pasahitza",
              "jaitozedata" : "Jaiotze Data",
              "bidali" : "Erregistratu",
              "kontua" : "Kontu bat baduzu?",
              "pasahitzaBaieztatu1": "Sartu berriro pasahitza",
              "pasahitzaBaieztatu2": "Baieztatu pasahitza",
              "pasahitzaGaizki":"Pasahitzak ez dira bat etorri",
              "adinezNagusi":"Erabiltzailea adinez nagusia izan behar da",
              "erabilOngi":"Erabiltzailea ongi sortu da",
              "datuGaizki":"Daturenbat gaizki sartu da",
            },
            "txapelketa1": {
              "title" : "Frontoi Txapelketa!",
              "location" : "Frontoia",
              "date" : "Irailak 23",
              "description" : "Sariak, musika, jokoak",
            },
            "txapelketa2": {
              "title" : "Trinkete Txapelketa!",
              "location" : "Trinkete",
              "date" : "Urriak 12",
              "description" : "Sariak, musika, jokoak",
            },
            "txapelketa3": {
              "title" : "Frontenis Txapelketa!",
              "location" : "Pista Handia",
              "date" : "Azaroak 5",
              "description" : "Partida interesgarriak eta giro aparta!",
            },
            "profila": {
              "header" : "Profila",
              "header2" : "Ikusi eta editatu zure erabiltzailearen informazioa.",
              "izena" : "Izena",
              "abizena" : "Abizenak",
              "email" : "Email",
              "jaiotzedata" : "Jaiotze Data",
              "jaioterria" : "Jaioterria",
              "telefonoa" : "Telefonoa",
              "gorde" : "Gorde"
            },
            "hasieraAdmin": {
              "header" : "Aplikazioa Kudeatzeko Kontrol Panela",
            },
            "mapakSortu": {
              "header" : "Mapak kudeatzeko gunea",
              "subHeader" : "Gune honetan Frontoi eta Trinketeen mapak sor eta kudeatu ditzakezu.",
              "izena" : "Izena",
              "mota" : "Mota",
              "iframe" : "Iframe",
              "url" : "URL",
              "bidali" : "Bidali"
            },
            "perfila": {
              "errorea" : "Errore bat gertatu da profilaren datuak editatzean",
              "argazkia": "Argazkia aldatu",
              "editatu": "Profila editatu",
              "1": "Izen abizenak",
              "2": "Jaiotze data",
              "3": "Jaioterria",
              "4": "Telefonoa",
              "aktualizatu": "Profila behar bezala eguneratu da",
              "errore1": "Errore bat gertatu da datuak eguneratzean:",
              "errore2": "Errorea eguneratzean:",
            }
          }
        }
      },
      
    lng: localStorage.getItem('i18nextLng') || 'eu', // LocalStorage-eko hizkuntza kargatzen du eta defektuz euskara
    fallbackLng: 'eu', // Defektuzko hizkuntza ez badu autatutakoa aurkitzen
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
