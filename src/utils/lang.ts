import {createI18n} from "vue-i18n";

const i18n = createI18n({
  locale: 'hu',
  legacy: false,
  globalInjection: true,
  messages: {
    hu: {
      true:'Igen',
      false:'Nem',
      mainPage: {
        quickActions: 'gyorsműveletek',
        companyData: 'cég adatai',
        ownData:'Személyes adatok'
      },
      sideMenu: {
        usersPage: 'Felhasználók',
        vehiclesPage: 'Járművek',
        reservationsPage: 'Foglalások',
        companiesPage: 'Cégek',
      },
      tableHeaders: {
        userTable: {
          id: 'Azonosító',
          name: 'Név',
          typeId: 'Típus',
          email: 'E-mail',
          disabled:'Zárolt'
        },
        vehicleTable: {
          id: 'Azonosító',
          seats: 'Ülések száma',
          description: 'Típus',
          type: 'Típus',
          color: 'Szín',
          available: 'Elérhető',
          insuranceId: 'Biztosítás azonosító',
          plateNumber: 'Rendszám',
        },
        companiesTable: {
          id: 'Azonosító',
          companyName: 'Név',
          officeAddress: 'Telephely cím',
          officeEmail: 'E-mail',
          officeTel: 'Telefonszám'
        },
        orderTable:{
          id: 'Azonosító',
          startDateTime: 'Foglalás időpontja',
          startAddress:'Indulási cím',
          finishDateTime:'Lezárás időpontja',
          destinationAddress:'Úticél'
        },
        reviewTable:{
          id: 'Azonosító',
          reviewer: 'értékelő ID',
          score:'pontszám',
          reviewText:'szöveg',
          createdAt:'létrehozás időpontja'
        }
      },
      toastMessages: {
        createSuccess: 'Sikeres létrehozás',
        createFail:'Sikertelen létrehozás',
        saveSuccess:'Sikeres mentés',
        saveFail:'Sikertelen mentés',
        deleteSuccess:'Sikeres törlés',
        deleteFail:'Sikertelen törlés',
        linkSuccess:'Sikeres összekötés',
        linkFail:'Sikertelen összekötés',
        unlinkSuccess:'Sikeres leválasztás',
        unlinkFail:'Sikertelen leválasztás',
        pleaseLogIn:'Kérjük,jelentkezzen be',
        logOutFail:'Sikertelen kijelentkezés',
        passwordResetSuccess:'Sikeres kérvényezés',
        passwordResetFail:'Sikertelen kérvényezés'
      },
      inputValidation:{
        requiredField:'Kötelező mező',
        formatError:'Hibás formátum',
        minLength:'Legalább {length} karakter hosszúnak kell lennie',
        minValue:'A minimum érték {minValue}',
        exactLength:'Az értéknek pontosan {length} karakter hosszúnak kell lennie',
        phoneFormat:'A megfelelő formátum: +xx xx xxx xxxx',
        minDate:'A dátumnak a mai napon után kell lennie',
        passwordMismatch:'Az új jelszó és az ismétlés nem egyezik!'
      }
    },
  }
})

export default i18n
